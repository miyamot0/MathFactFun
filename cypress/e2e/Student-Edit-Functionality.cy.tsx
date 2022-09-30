/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as authUser from "../fixtures/auth-user.json";

describe("Basic Navigation, after authenticating", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should successfully log in", () => {
    const { email, password } = authUser;
    cy.login(email, password);

    cy.visit(`/student/${authUser["student-uid"]}`);

    cy.contains("Student Settings");
  });

  it("Should navigate successfully to areas", () => {
    cy.get("button.global-btn")
      .contains("Overall Math")
      .should("have.length", 1)
      .click()
      .wait(2000);

    cy.contains("Benchmark Scores (Overall Fluency)").go("back").wait(1000);

    cy.get("button.global-btn")
      .contains("Intervention-specific Targets")
      .should("have.length", 1)
      .click()
      .wait(2000);

    cy.contains("Current Progress").go("back").wait(1000);

    cy.get("button.global-btn")
      .contains("Student Settings")
      .should("have.length", 1)
      .click()
      .wait(2000);

    cy.contains("Edit current student").go("back").wait(1000);

    cy.get("button.global-btn")
      .contains("Targeted Item Sets")
      .should("have.length", 1)
      .click()
      .wait(2000);

    cy.contains("Item Set:").go("back").wait(1000);
  });
});
