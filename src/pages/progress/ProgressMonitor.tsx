/**
 * Progress file
 */

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseCollection } from "../../firebase/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";
import {
  OnlyUnique,
  Sum,
  GetApproachStringFromLabel,
} from "../../utilities/LabelHelper";

import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AnnotationsModule from "highcharts/modules/annotations";
import { PerformanceDataInterface } from "../../models/PerformanceModel";
import { FactDataInterface } from "../../models/FactEntryModel";

require("highcharts/modules/annotations")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
AnnotationsModule(Highcharts);

const PanelWidth = {
  minHeight: "600px",
};

const HeadingStyle = {
  fontSize: "1.25em",
  color: "var(--heading-style-color)",
  display: "block",
  marginBottom: "6px",
};

/** modifyDate
 *
 * Modify the date to standardize for days
 *
 * @param {Date} newDate Raw date object
 * @returns {Date} Amended date object
 */
function modifyDate(newDate: Date = new Date()): Date {
  let modDate = newDate;
  modDate.setHours(0);
  modDate.setMinutes(0);
  modDate.setSeconds(0);

  return modDate;
}

/** getMappedColor
 *
 * Map for chart
 *
 * @param {Float} accuracy Accuracy numbers
 * @returns {String} Color for marker
 */
function getMappedColor(accuracy): "red" | "orange" | "green" {
  if (accuracy < 50) {
    return "red";
  } else if (accuracy < 80) {
    return "orange";
  } else {
    return "green";
  }
}

/** getMappedMarker
 *
 * Map for chart
 *
 * @param {*} latency Latency numbers
 * @returns {String} Shape for marker
 * @returns
 */
function getMappedMarker(
  latency
): "circle" | "triangle" | "diamond" | "square" {
  if (latency < 5) {
    return "circle";
  } else if (latency < 10) {
    return "triangle";
  } else if (latency < 15) {
    return "diamond";
  } else {
    return "square";
  }
}

export default function ProgressMonitor() {
  const { id, target, method, aim } = useParams();
  const { user, adminFlag } = useAuthorizationContext();

  // Limit scope if not an admin
  const queryString = user && !adminFlag ? ["creator", "==", user.uid] : null;
  const orderString = null;

  const { documents } = useFirebaseCollection(
    `performances/${target}/${id}`,
    queryString,
    orderString
  );
  const [chartOptions, setChartOptions] = useState({});
  const [itemChartOptions, setItemChartOptions] = useState({});

  useEffect(() => {
    if (documents) {
      // Generate object from document collection
      const mappedDocument = (documents as PerformanceDataInterface[]).map((doc) => {
        return {
          Items: doc.entries,
          Date: new Date(doc.dateTimeStart),
          ShortDate: new Date(doc.dateTimeStart).toLocaleDateString("en-US"),
          Errors: doc.errCount,
          DigitsCorrect: doc.correctDigits,
          DigitsCorrectInitial: doc.nCorrectInitial,
          DigitsTotal: doc.totalDigits,
          SessionDuration: doc.sessionDuration,
          Method: doc.method,
        };
      });

      // Bring together all performances, by day
      const aggregatePerformancesDaily = mappedDocument
        .map((obj) => obj.ShortDate)
        .filter(OnlyUnique)
        .sort()
        .map((date) => {
          let relevantData = mappedDocument.filter(
            (obj) => obj.ShortDate === date
          );

          let totalDigitsCorr = relevantData
            .map((obj) => obj.DigitsCorrect)
            .reduce(Sum);
          let totalDigits = relevantData
            .map((obj) => obj.DigitsTotal)
            .reduce(Sum);
          let totalTime =
            relevantData.map((obj) => obj.SessionDuration).reduce(Sum) / 60.0;

          return {
            Date: date,
            DCPM: totalDigitsCorr / totalTime,
            Accuracy: (totalDigitsCorr / totalDigits) * 100,
          };
        })
        .sort(
          (a, b) =>
            moment(b.Date).toDate().valueOf() -
            moment(a.Date).toDate().valueOf()
        );

      // Extract all dates
      const dateArr = mappedDocument.map((d) => d.Date);
      const maxDate = modifyDate(new Date(Math.max.apply(null, dateArr)));
      const minDate = modifyDate(new Date(Math.min.apply(null, dateArr)));

      // Extract max for y-axis
      let maxYAxis = Math.ceil(
        Math.max.apply(
          null,
          aggregatePerformancesDaily.map((obj) => obj.DCPM)
        )
      );

      // Extend out, if aim line exceeds current max
      maxYAxis = maxYAxis < parseInt(aim) ? parseInt(aim) + 1 : maxYAxis + 1;

      setChartOptions({
        chart: {
          height: "600px",
        },
        title: {
          text: null,
        },
        series: {
          name: "Digits Correct Per Minute",
          data: aggregatePerformancesDaily.map((obj) => {
            return {
              x: moment(obj.Date).toDate().getTime(),
              y: Math.round(obj.DCPM * 100) / 100,
            };
          }),
          type: "line",
        },
        xAxis: {
          type: "datetime",
          minTickInterval: 24 * 3600 * 1000,
        },
        yAxis: {
          title: {
            text: "Digits Correct/Minute (DCPM)",
          },
          min: 0,
          max: maxYAxis,
        },
        annotations: [
          {
            draggable: "",
            shapeOptions: {
              type: "path",
              dashStyle: "Solid",
              strokeWidth: 1,
              stroke: "red",
              fill: "red",
            },
            shapes: [
              {
                type: "path",
                points: [
                  {
                    x: minDate.getTime(),
                    y: parseInt(aim),
                    xAxis: 0,
                    yAxis: 0,
                  },
                  {
                    x: maxDate.getTime(),
                    y: parseInt(aim),
                    xAxis: 0,
                    yAxis: 0,
                  },
                ],
              },
            ],
          },
        ],
      });

      // Extract items from document collection
      const itemSummaries = mappedDocument
        //.filter((obj) => obj.Method === method)
        .map((items) => items.Items);

      // Flatten list to array of objects
      const flatItemSummaries: FactDataInterface[] = [].concat(...itemSummaries);

      // Extract unique problems targeted
      const uniqueMathFacts = flatItemSummaries
        .map((obj) => obj.factString)
        .filter(OnlyUnique)
        .sort();

      // Map properties based on facts in collection
      const uniqueQuants = uniqueMathFacts.map((itemString) => {
        // Select matching performances from array of objects
        const relevantPerformances = flatItemSummaries.filter(
          (obj) => obj.factString === itemString
        );

        // Sum problems correctly copied
        const itemsCorrect = relevantPerformances
          .map((item) => (item.factCorrect ? 1.0 : 0.0) as number)
          .reduce(Sum);

        // Sum latency to correct responding
        const itemLatency = relevantPerformances
          .map((item) => Math.abs(item.latencySeconds))
          .reduce(Sum);

        // Construct object for plotting
        return {
          FactString: itemString,
          X: parseInt(itemString.split(GetOperatorFromLabel(target))[0]),
          Y: parseInt(
            itemString.split(GetOperatorFromLabel(target))[1].split("=")[0]
          ),
          Latency: itemLatency / relevantPerformances.length,
          AverageCorrect: (itemsCorrect / relevantPerformances.length) * 100,
          Correct: itemsCorrect,
          Total: relevantPerformances.length,
        };
      });

      setItemChartOptions({
        title: {
          text: null,
        },
        chart: {
          type: "scatter",
          zoomType: "xy",
          height: "600px",
        },
        tooltip: {
          formatter: function () {
            return (
              "Problem: " +
              this.x +
              GetOperatorFromLabel(target) +
              this.y +
              "</b>"
            );
          },
        },
        series: {
          name: "Item Metrics",
          data: uniqueQuants.map((item) => {
            return {
              x: item.X,
              y: item.Y,
              marker: {
                symbol: getMappedMarker(item.Latency),
                fillColor: getMappedColor(item.AverageCorrect),
                radius: item.Total > 5 ? 5 + 1 : item.Total + 1,
              },
            };
          }),
        },
        yAxis: {
          title: {
            text: "Magnitude Change",
          },
          min: 0,
          gridLineWidth: 1,
        },
        xAxis: {
          title: {
            text: "Base Value",
          },
          min: 0,
          gridLineWidth: 1,
        },
      });
    }
  }, [documents, aim, target, method]);

  return (
    <>
      <div style={PanelWidth}>
        <h2 style={HeadingStyle}>
          Current Progress (Overall Fluency/{GetApproachStringFromLabel(method)}
          )
        </h2>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <br></br>

      <div style={PanelWidth}>
        <h2 style={HeadingStyle}>
          Current Progress (Item-level Performance/
          {GetApproachStringFromLabel(method)})
        </h2>
        <HighchartsReact highcharts={Highcharts} options={itemChartOptions} />
        <p>
          Latency Legend: Circle (&lt;5s), Triange (&lt;10s), Diamond (&lt;15s),
          otherwise Square
        </p>
        <p>Accuracy Legend: Red (&lt;50%), Orange (&lt;80%), otherwise Green</p>
        <p>Size Legend: Max Size (&gt;4 OTRs), otherwise Smaller Size</p>
      </div>
      <br></br>
    </>
  );
}
