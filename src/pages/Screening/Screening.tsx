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

import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";

import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AnnotationsModule from "highcharts/modules/annotations";
import { RoutedIdParam } from "../../utilities/RoutingHelpers";
import { reducerPerOperation } from "./functionality/ScreeningBehavior";
import { useFirebaseCollectionTyped } from "../../firebase/hooks/useFirebaseCollection";
import {
  CommonDisplayHeadingStyle,
  CommonPanelWidth,
} from "../../utilities/FormHelpers";
import { PerformanceDataInterface } from "../intervention/types/InterventionTypes";

require("highcharts/modules/annotations")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
AnnotationsModule(Highcharts);

export default function Screening() {
  const { id } = useParams<RoutedIdParam>();
  const { user, adminFlag } = useAuthorizationContext();
  const [chartOptions, setChartOptions] = useState({});

  // Limit scope if not an admin
  const queryString =
    user && !adminFlag ? ["creator", "==", user.uid] : undefined;
  const orderString = undefined;

  const { documents: additionDocuments } =
    useFirebaseCollectionTyped<PerformanceDataInterface>({
      collectionString: `performances/Addition/${id}`,
      queryString,
      orderString,
    });

  const { documents: subtractionDocuments } =
    useFirebaseCollectionTyped<PerformanceDataInterface>({
      collectionString: `performances/Subtraction/${id}`,
      queryString,
      orderString,
    });

  const { documents: multiplicationDocuments } =
    useFirebaseCollectionTyped<PerformanceDataInterface>({
      collectionString: `performances/Multiplication/${id}`,
      queryString,
      orderString,
    });

  const { documents: divisionDocuments } =
    useFirebaseCollectionTyped<PerformanceDataInterface>({
      collectionString: `performances/Division/${id}`,
      queryString,
      orderString,
    });

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
      <div style={CommonPanelWidth}>
        <h2 style={CommonDisplayHeadingStyle}>
          Benchmark Scores (Overall Fluency)
        </h2>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <br></br>
    </>
  );
}
