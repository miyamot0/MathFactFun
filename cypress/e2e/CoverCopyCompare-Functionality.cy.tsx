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

  it("Should successfully log in, select CCC", () => {
    cy.viewport(1920, 1080);

    const { email, password } = authUser;
    cy.login(email, password);
  });

  it("Should successfully log in, select CCC", () => {
    cy.visit(`/student/${authUser["student-uid"]}`);

    cy.contains("Student Settings");

    cy.get("button.global-btn")
      .contains("Student Settings")
      .should("have.length", 1)
      .wait(250)
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
    cy.get("#react-select-6-option-1").wait(250).click().wait(2000);

    cy.get('input[role="combobox"]').eq(5).wait(1000).click().wait(2000);

    //0 Feedback every time
    //1 No feedback
    cy.get("#react-select-7-option-0").wait(250).click().wait(2000);

    cy.get("button.global-btn").contains("Edit Student").wait(250).click();
  });

  it("Click button to enter into CCC", () => {
    cy.visit(`/practice`).wait(1000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion; Advance=Type", () => {
    cy.get("li.clickable-li-ccc")
      .should("have.length", 4)
      .eq(0)
      .click({ force: true })
      .wait(500);

    const advanceButton = cy
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .wait(1000);

    ["7", "+", "7", "=", "1", "4"].forEach((val: string) => {
      advanceButton.type(val).wait(250);
    });

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .click()
      .wait(1000)
      .click();

    cy.get("li.clickable-li-ccc").eq(0).click({ force: true }).wait(500);

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .wait(1000);

    ["3", "+", "5", "=", "8"].forEach((val: string) => {
      advanceButton.type(val).wait(250);
    });

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .click()
      .wait(1000)
      .click();

    cy.get("li.clickable-li-ccc").eq(0).click({ force: true }).wait(500);

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .wait(1000);

    ["6", "+", "7", "=", "1", "3"].forEach((val: string) => {
      advanceButton.type(val).wait(250);
    });

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .click()
      .wait(1000)
      .click();

    cy.get("li.clickable-li-ccc").eq(0).click({ force: true }).wait(500);

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .wait(1000);

    ["5", "+", "3", "=", "8"].forEach((val: string) => {
      advanceButton.type(val).wait(250);
    });

    advanceButton
      .wait(1000)
      .get("button.global-btn")
      .should("have.length", 1)
      .eq(0)
      .click()
      .wait(1000)
      .click()
      .wait(5000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion; Advance=Space", () => {
    const spaceKeyEvent = {
      key: " ",
      keyCode: 32,
      which: 32,
    };

    const delaySpace = 1000;

    cy.get("li.clickable-li-ccc")
      .should("have.length", 4)
      .wait(1000)
      .eq(0)
      .click({ force: true })
      .wait(1000);

    const advanceButton = cy.get("body").wait(2000);

    advanceButton.trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "1", keyCode: 97, which: 97 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "4", keyCode: 52, which: 52 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "5", keyCode: 53, which: 53 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "8", keyCode: 56, which: 56 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "6", keyCode: 54, which: 54 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "1", keyCode: 97, which: 97 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "5", keyCode: 53, which: 53 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "8", keyCode: 56, which: 56 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(5000);

    cy.get("div.practice-list-card")
      .eq(0)
      .within((card) => {
        cy.wrap(card).get("a").should("have.length", 1).wait(1000).click();
      });
  });

  it("Appropriate Completion, testing error; Advance=Space", () => {
    const spaceKeyEvent = {
      key: " ",
      keyCode: 32,
      which: 32,
    };

    const delaySpace = 1000;

    cy.get("li.clickable-li-ccc")
      .should("have.length", 4)
      .wait(1000)
      .eq(0)
      .click({ force: true })
      .wait(1000);

    const advanceButton = cy.get("body").wait(2000);

    advanceButton.trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "1", keyCode: 97, which: 97 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    cy.get("button.modal-close").eq(0).click({ force: true });
    advanceButton.wait(delaySpace).trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "1", keyCode: 97, which: 97 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "4", keyCode: 52, which: 52 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "5", keyCode: 53, which: 53 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "8", keyCode: 56, which: 56 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "6", keyCode: 54, which: 54 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "7", keyCode: 55, which: 55 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "1", keyCode: 97, which: 97 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);

    advanceButton
      .trigger("keydown", { key: "5", keyCode: 53, which: 53 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "+", keyCode: 107, which: 107 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "3", keyCode: 51, which: 51 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "=", keyCode: 187, which: 187 })
      .wait(250);
    advanceButton
      .trigger("keydown", { key: "8", keyCode: 56, which: 56 })
      .wait(250);
    advanceButton
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent)
      .wait(delaySpace)
      .trigger("keydown", spaceKeyEvent);
  });
});
