/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Progress file
 */

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthorizationContext } from "../../context/useAuthorizationContext";
import {
  useFirebaseCollectionAddition,
  useFirebaseCollectionDivision,
  useFirebaseCollectionMultiplication,
  useFirebaseCollectionSubtraction,
} from "../../firebase/useFirebaseCollectionsAcademic";
import { OnlyUnique, Sum } from "../../utilities/LabelHelper";

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

function reducerPerOperation(doc: PerformanceDataInterface[] | undefined) {
  const mappedDocument = doc!.map((doc) => {
    return {
      Items: doc.entries as FactDataInterface[],
      Date: new Date(doc.dateTimeStart!),
      ShortDate: new Date(doc.dateTimeStart!).toLocaleDateString("en-US"),
      Errors: doc.errCount,
      DigitsCorrect: doc.correctDigits,
      DigitsCorrectInitial: doc.nCorrectInitial,
      DigitsTotal: doc.totalDigits,
      SessionDuration: doc.sessionDuration,
      Method: doc.method,
    };
  });

  return mappedDocument
    .map((obj) => obj.ShortDate)
    .filter(OnlyUnique)
    .sort()
    .map((date) => {
      // Pull in relevant content by date
      let relevantData = mappedDocument.filter((obj) => obj.ShortDate === date);

      let totalDigitsCorr = relevantData
        .map((obj) => obj.DigitsCorrect)
        .reduce(Sum);
      let totalDigits = relevantData.map((obj) => obj.DigitsTotal).reduce(Sum);
      let totalTime = relevantData.map((obj) => obj.SessionDuration).reduce(Sum) / 60.0;

      return {
        Date: date,
        DCPM: totalDigitsCorr / totalTime,
        Accuracy: (totalDigitsCorr / totalDigits) * 100,
      };
    })
    .sort(
      (a, b) => moment(b.Date).toDate().valueOf() - moment(a.Date).toDate().valueOf()
    );
}

interface RoutedStudentSet {
  id?: string;
};

export default function Screening() {
  const { id } = useParams<RoutedStudentSet>();
  const { user, adminFlag } = useAuthorizationContext();
  const [chartOptions, setChartOptions] = useState({});

  // Limit scope if not an admin
  const queryString = user && !adminFlag ? ["creator", "==", user.uid] : undefined;
  const orderString = undefined;

  const { additionDocuments } = useFirebaseCollectionAddition(
    id!,
    queryString,
    orderString
  );
  const { subtractionDocuments } = useFirebaseCollectionSubtraction(
    id!,
    queryString,
    orderString
  );
  const { multiplicationDocuments } = useFirebaseCollectionMultiplication(
    id!,
    queryString,
    orderString
  );
  const { divisionDocuments } = useFirebaseCollectionDivision(
    id!,
    queryString,
    orderString
  );

  useEffect(() => {
    if (
      additionDocuments &&
      subtractionDocuments &&
      multiplicationDocuments &&
      divisionDocuments
    ) {
      const additionR = reducerPerOperation(additionDocuments);
      const subtractionR = reducerPerOperation(subtractionDocuments);
      const multiplicationR = reducerPerOperation(multiplicationDocuments);
      const divisionR = reducerPerOperation(divisionDocuments);

      setChartOptions({
        chart: {
          height: "600px",
        },
        title: {
          text: null,
        },
        series: [
          {
            name: "Addition (DCPM)",
            data: additionR.map((obj) => {
              return {
                x: moment(obj.Date).toDate().getTime(),
                y: Math.round(obj.DCPM * 100) / 100,
              };
            }),
            type: "line",
          },
          {
            name: "Subtraction (DCPM)",
            data: subtractionR.map((obj) => {
              return {
                x: moment(obj.Date).toDate().getTime(),
                y: Math.round(obj.DCPM * 100) / 100,
              };
            }),
            type: "line",
          },
          {
            name: "Multiplication (DCPM)",
            data: multiplicationR.map((obj) => {
              return {
                x: moment(obj.Date).toDate().getTime(),
                y: Math.round(obj.DCPM * 100) / 100,
              };
            }),
            type: "line",
          },
          {
            name: "Division (DCPM)",
            data: divisionR.map((obj) => {
              return {
                x: moment(obj.Date).toDate().getTime(),
                y: Math.round(obj.DCPM * 100) / 100,
              };
            }),
            type: "line",
          },
        ],
        xAxis: {
          type: "datetime",
          minTickInterval: 24 * 3600 * 1000,
        },
        yAxis: {
          title: {
            text: "Digits Correct/Minute (DCPM)",
          },
          min: 0,
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
          },
        ],
      });
    }
  }, [
    additionDocuments,
    subtractionDocuments,
    multiplicationDocuments,
    divisionDocuments,
  ]);

  return (
    <>
      <div style={PanelWidth}>
        <h2 style={HeadingStyle}>Benchmark Scores (Overall Fluency)</h2>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <br></br>
    </>
  );
}
