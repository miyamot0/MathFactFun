/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import BenchmarkList from "./subcomponents/BenchmarkList";
import { useParams } from "react-router-dom";
import { useFirebaseDocumentTyped } from "../../firebase/hooks/useFirebaseDocument";
import { RoutedIdParam } from "../../interfaces/RoutingInterfaces";
import { StudentDataInterface } from "../student/interfaces/StudentInterfaces";
import {
  dashboardGenerateError,
  dashboardLoadingError,
} from "./helpers/DashboardHelpers";

// styles
import "./styles/Dashboards.css";

export default function DashboardBenchmark() {
  const { id } = useParams<RoutedIdParam>();

  const { document, documentError } =
    useFirebaseDocumentTyped<StudentDataInterface>({
      collectionString: "students",
      idString: id,
    });

  if (documentError) {
    return dashboardGenerateError(documentError);
  } else if (document !== null && documentError === undefined) {
    return (
      <div>
        <h2 className="global-page-title">
          Benchmark Dashboard: {document.name}
        </h2>
        <BenchmarkList student={document} />
      </div>
    );
  }
  else {
    return dashboardLoadingError(documentError);
  }
}
