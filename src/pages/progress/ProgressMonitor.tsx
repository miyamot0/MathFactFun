/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseCollectionTyped } from "../../firebase/hooks/useFirebaseCollection";
import { useAuthorizationContext } from "../../context/hooks/useAuthorizationContext";
import { GetApproachStringFromLabel } from "../../utilities/LabelHelper";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AnnotationsModule from "highcharts/modules/annotations";
import { RoutedStudentProgressSet } from "./interfaces/ProgressInterfaces";
import {
  getPrimaryProgressChartData,
  getSecondaryProgressChartData,
  prepareItemLevelCalculations,
  prepareOverallCalculations,
} from "./helpers/ProgressHelpers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/annotations")(Highcharts);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/accessibility")(Highcharts);
AnnotationsModule(Highcharts);

import {
  CommonDisplayHeadingStyle,
  CommonPanelWidth,
} from "../../utilities/FormHelpers";
import { PerformanceDataInterface } from "../intervention/interfaces/InterventionInterfaces";

export default function ProgressMonitor() {
  const { id, target, method, aim } = useParams<RoutedStudentProgressSet>();
  const { user, adminFlag } = useAuthorizationContext();

  const { documents } = useFirebaseCollectionTyped<PerformanceDataInterface>({
    collectionString: `performances/${target}/${id}`,
    queryString: user && !adminFlag ? ["creator", "==", user.uid] : undefined,
    orderString: undefined,
  });

  const [chartOptions, setChartOptions] = useState({
    mainChart: {},
    itemChart: {},
  });

  useEffect(() => {
    if (documents) {
      const overallCalculations = prepareOverallCalculations(documents, aim);

      const itemLevelCalculations = prepareItemLevelCalculations(
        overallCalculations,
        target
      );

      setChartOptions({
        mainChart: getPrimaryProgressChartData(overallCalculations, aim),
        itemChart: getSecondaryProgressChartData(itemLevelCalculations, target),
      });
    }
  }, [documents, aim, target, method]);

  return (
    <>
      <div style={CommonPanelWidth} className="progress-monitor-page">
        <h2 style={CommonDisplayHeadingStyle}>
          Current Progress (Overall Fluency/{GetApproachStringFromLabel(method)}
          )
        </h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions.mainChart}
        />
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
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions.itemChart}
        />
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
