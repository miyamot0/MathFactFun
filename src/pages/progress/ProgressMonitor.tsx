/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Progress monitor
 */

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseCollectionTyped } from "../../firebase/hooks/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import { GetOperatorFromLabel } from "../../utilities/LabelHelper";
import {
  OnlyUnique,
  GetApproachStringFromLabel,
} from "../../utilities/LabelHelper";

import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AnnotationsModule from "highcharts/modules/annotations";
import { RoutedStudentProgressSet } from "./types/ProgressTypes";
import {
  aggregateItemLevelPerformances,
  aggregatePerformances,
  getMappedColor,
  getMappedMarker,
  modifyDate,
  remapPerformances,
} from "./functionality/ProgressBehavior";
import { FactDataInterface } from "../setcreator/types/SetCreatorTypes";

require("highcharts/modules/annotations")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
AnnotationsModule(Highcharts);

import {
  CommonDisplayHeadingStyle,
  CommonPanelWidth,
} from "../../utilities/FormHelpers";
import { PerformanceDataInterface } from "../intervention/types/InterventionTypes";

export default function ProgressMonitor() {
  const { id, target, method, aim } = useParams<RoutedStudentProgressSet>();
  const { user, adminFlag } = useAuthorizationContext();

  // Limit scope if not an admin
  const queryString =
    user && !adminFlag ? ["creator", "==", user.uid] : undefined;
  const orderString = undefined;

  const { documents } = useFirebaseCollectionTyped<PerformanceDataInterface>({
    collectionString: `performances/${target}/${id}`,
    queryString,
    orderString,
  });

  const [chartOptions, setChartOptions] = useState({});
  const [itemChartOptions, setItemChartOptions] = useState({});

  useEffect(() => {
    if (!target && !aim && parseInt(aim) !== null) {
      return;
    }

    if (documents) {
      // Generate object from document collection
      const mappedDocument = remapPerformances(documents);

      // Bring together all performances, by day
      const aggregatePerformancesDaily = aggregatePerformances(mappedDocument);

      // Extract all dates
      const dateArr = mappedDocument.map((d) => d.Date.getTime());
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
      const itemSummaries = mappedDocument.map(({ Items }) => Items);

      const flatItemSummaries: FactDataInterface[] = itemSummaries.reduce(
        (accumulator, value) => accumulator.concat(value)
      );

      // Extract unique problems targeted
      const uniqueMathFacts = flatItemSummaries
        .map((obj) => obj.factString)
        .filter(OnlyUnique)
        .sort();

      // Map properties based on facts in collection
      const uniqueQuants = aggregateItemLevelPerformances(
        uniqueMathFacts,
        flatItemSummaries,
        target
      );

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
          formatter: function (this: Highcharts.Point): string {
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
      <div style={CommonPanelWidth}>
        <h2 style={CommonDisplayHeadingStyle}>
          Current Progress (Overall Fluency/{GetApproachStringFromLabel(method)}
          )
        </h2>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <br></br>

      <div
        style={{
          minHeight: "600px",
        }}
      >
        <h2 style={CommonDisplayHeadingStyle}>
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
