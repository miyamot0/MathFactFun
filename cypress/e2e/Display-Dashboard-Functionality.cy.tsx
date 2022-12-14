/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as authUser from "../fixtures/auth-user.json";

describe("Student Dashboard, after authenticating", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should render after login", () => {
    const totalKids = 1;

    const { email, password } = authUser;
    cy.login(email, password);

    cy.visit("/dashboard");

    const studentCards = cy.get("div.student-list-card");

    studentCards.should("have.length", totalKids);

    cy.contains("Student Dashboard");
  });

  it("Should work with filter list", () => {
    const filterButtons = cy.get("button.student-filter-btn");

    filterButtons.each((btn) => {
      cy.wrap(btn).click().wait(100);
    });

    filterButtons.filter(":contains(Mine)").click();
  });

  it("Should redirect to individual student page [No ADMIN]", () => {
    cy.get("div.student-list-card").within((card) => {
      cy.wrap(card).get("a").should("have.length", 1).wait(100).click();
    });
  });
});
