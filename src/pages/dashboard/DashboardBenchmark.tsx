/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Dashboard for showing benchmarking needs
 */

import React from "react";
import { useParams } from "react-router-dom";
import { useFirebaseDocument } from "../../firebase/useFirebaseDocument";
import BenchmarkList from "../../components/BenchmarkList";

// styles
import "./Dashboards.css";
import { StudentDataInterface } from "../../models/StudentModel";

interface RoutedTeacherSet {
  id?: string;
};

export default function DashboardBenchmark() {
  const { id } = useParams<RoutedTeacherSet>();
  const { documentError, document } = useFirebaseDocument("students", id);

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading benchmark data...</div>;
  }

  return (
    <div>
      <h2 className="global-page-title">
        Benchmark Dashboard: {(document as StudentDataInterface).name}
      </h2>
      {documentError && <p className="error">{documentError}</p>}
      {document && <BenchmarkList student={(document as StudentDataInterface)} />}
    </div>
  );
}
