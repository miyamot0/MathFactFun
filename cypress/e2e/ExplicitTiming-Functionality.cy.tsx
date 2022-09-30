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

  it("Should successfully log in, select ET", () => {
    const { email, password } = authUser;
    cy.login(email, password);

    cy.visit(`/student/${authUser["student-uid"]}`);

    cy.contains("Student Settings");

    cy.get("button.global-btn")
      .contains("Student Settings")
      .should("have.length", 1)
      .wait(1000)
      .click()
      .wait(2000);

    cy.get('input[role="combobox"]')
      .should("have.length", 7)
      .eq(4)
      .wait(1000)
      .click()
      .wait(2000);

    //0 No current intervention
    //1 CCC
    //2 TP
    //3 ET
    cy.get("#react-select-6-option-3").wait(1000).click().wait(2000);

    cy.get('input[role="combobox"]').eq(5).wait(1000).click().wait(2000);

    //0 Feedback every time
    //1 No feedback
    cy.get("#react-select-7-option-0").wait(1000).click().wait(2000);

    cy.get("button.global-btn")
      .contains("Edit Student")
      .wait(1000)
      .click()
      .wait(5000);
  });

  it("Click button to enter into ET", () => {
    cy.visit(`/practice`).wait(1000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion; Advance=Type", () => {
    const advanceButton = cy.wait(1000).get("button.global-btn").eq(0).click();

    advanceButton.type("1").wait(1000);
    advanceButton.type("4").wait(1000);
    advanceButton.wait(500).click();

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).click();

    advanceButton.type("1").wait(1000);
    advanceButton.type("3").wait(1000);
    advanceButton.wait(500).click();

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).click().wait(5000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion; Advance=Space", () => {
    const advanceButton = cy.wait(1000).get("button.global-btn").eq(0).click();

    advanceButton.type("1").wait(1000);
    advanceButton.type("4").wait(1000);
    advanceButton.wait(500).type(" ");

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).type(" ");

    advanceButton.type("1").wait(1000);
    advanceButton.type("3").wait(1000);
    advanceButton.wait(500).type(" ");

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).type(" ").wait(5000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion, testing error; Advance=Space", () => {
    const advanceButton = cy.wait(1000).get("button.global-btn").eq(0).click();

    // 13 wrong, 14 correct
    advanceButton.type("1").wait(1000);
    advanceButton.type("3").wait(1000);
    advanceButton.wait(500).type(" ").wait(1000);
    cy.get("button.modal-close").eq(0).click({ force: true });

    advanceButton.type("1").wait(1000);
    advanceButton.type("4").wait(1000);
    advanceButton.wait(500).type(" ");

    // 7 wrong, 8 correct
    advanceButton.type("7").wait(1000);
    advanceButton.wait(500).type(" ").wait(1000);
    cy.get("button.modal-close").eq(0).click({ force: true });

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).type(" ");

    advanceButton.type("1").wait(1000);
    advanceButton.type("3").wait(1000);
    advanceButton.wait(500).type(" ");

    advanceButton.type("8").wait(1000);
    advanceButton.wait(500).type(" ").wait(5000);
  });
});
