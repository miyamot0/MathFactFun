/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as authUser from "../fixtures/auth-user.json";

const globalDelayInterval = 250;

function addLambda(a: number, b: number) {
  return a + b;
}

function subtrackLambda(a: number, b: number) {
  return a - b;
}

function multiplicationLambda(a: number, b: number) {
  return a * b;
}

function divisionLambda(a: number, b: number) {
  return a / b;
}

function pursueSequence(
  lambda: (a: number, b: number) => number,
  n: number,
  delay: number
) {
  cy.wait(delay);

  const body = cy.get("body");

  let advanceButton: any;
  advanceButton = body.find(".global-btn").contains("Start").first();

  advanceButton.click();

  for (let count = 0; count < n; count++) {
    cy.wait(delay);

    let topValue = "";
    let botValue = "";

    const step1 = cy
      .get("div.block2")
      .invoke("text")
      .then((str) => {
        topValue += str.toString();
      });
    const step2 = cy
      .get("div.block3")
      .invoke("text")
      .then((str) => {
        topValue += str.toString();
      });

    const step3 = cy
      .get("div.block5")
      .invoke("text")
      .then((str) => {
        botValue += str.toString();
      });
    const step4 = cy
      .get("div.block6")
      .invoke("text")
      .then((str) => {
        botValue += str.toString();
      });

    const step5 = () => {
      const top = parseInt(topValue);
      const bot = parseInt(botValue);
      const ans = lambda(top, bot).toString();
      const ansArray = [...ans];

      console.log(`Completed N of testing problems: ${count}`);

      ansArray.forEach((val: string) => {
        advanceButton = body.type(val).wait(delay);
      });

      advanceButton.click();
    };

    step1.then(() => {
      step2.then(() => {
        step3.then(() => {
          step4.then(() => {
            step5();
          });
        });
      });
    });
  }
}

describe("Benchmark Dashboard, after authenticating", () => {
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

  it("Should navigate to appropriate interface", () => {
    const allBenchmarks = 4;
    const delayPoint = 2000;

    cy.get("div.student-list-card")
      .find(".student-list-tail-item")
      .first()
      .click();

    let benchmarkCards = cy.get("div.benchmark-list-card");
    benchmarkCards.should("have.length", allBenchmarks);

    // Addition check

    cy.get("div.benchmark-list-card")
      .contains("Addition-Sums to 18")
      .should("have.length", 1)
      .and("have.attr", "href");

    cy.get("div.benchmark-list-card").contains("Addition-Sums to 18").click();

    cy.url()
      .should("contain", "Addition")
      .wait(delayPoint)
      .go("back")
      .wait(delayPoint);

    benchmarkCards = cy.get("div.benchmark-list-card");
    // Subtraction check

    cy.get("div.benchmark-list-card")
      .contains("Subtraction-Lessing From 18")
      .should("have.length", 1)
      .and("have.attr", "href");

    cy.get("div.benchmark-list-card")
      .contains("Subtraction-Lessing From 18")
      .click();

    cy.url()
      .should("contain", "Subtraction")
      .wait(delayPoint)
      .go("back")
      .wait(delayPoint);

    benchmarkCards = cy.get("div.benchmark-list-card");

    // Multiplication check

    cy.get("div.benchmark-list-card")
      .contains("Multiplication-Single Digit")
      .should("have.length", 1)
      .and("have.attr", "href");

    cy.get("div.benchmark-list-card")
      .contains("Multiplication-Single Digit")
      .click();

    cy.url()
      .should("contain", "Multiplication")
      .wait(delayPoint)
      .go("back")
      .wait(delayPoint);

    benchmarkCards = cy.get("div.benchmark-list-card");

    // Division check

    cy.get("div.benchmark-list-card")
      .contains("Division-Single Digit")
      .should("have.length", 1)
      .and("have.attr", "href");

    cy.get("div.benchmark-list-card").contains("Division-Single Digit").click();

    cy.url()
      .should("contain", "Division")
      .wait(delayPoint)
      .go("back")
      .wait(delayPoint);
  });

  it("Should interface with addition appropriately", () => {
    cy.visit("/dashboard");
    cy.contains("Student Dashboard");
    cy.get("div.student-list-card")
      .find(".student-list-tail-item")
      .first()
      .click();

    let benchmarkCards = cy.get("div.benchmark-list-card");

    benchmarkCards
      .should("contain", "Addition-Sums to 18")
      .contains("Addition-Sums to 18")
      .click();

    pursueSequence(addLambda, 12, globalDelayInterval);
  });

  it("Should interface with subtraction appropriately", () => {
    cy.visit("/dashboard");
    cy.contains("Student Dashboard");
    cy.get("div.student-list-card")
      .find(".student-list-tail-item")
      .first()
      .click();

    let benchmarkCards = cy.get("div.benchmark-list-card");

    // Addition check

    benchmarkCards
      .should("contain", "Subtraction-Lessing From 18")
      .contains("Subtraction-Lessing From 18")
      .click();

    pursueSequence(subtrackLambda, 23, globalDelayInterval);
  });

  it("Should interface with multiplication appropriately", () => {
    cy.visit("/dashboard");
    cy.contains("Student Dashboard");
    cy.get("div.student-list-card")
      .find(".student-list-tail-item")
      .first()
      .click();

    let benchmarkCards = cy.get("div.benchmark-list-card");

    // Addition check

    benchmarkCards
      .should("contain", "Multiplication-Single Digit")
      .contains("Multiplication-Single Digit")
      .click();

    pursueSequence(multiplicationLambda, 12, globalDelayInterval);
  });

  it("Should interface with division appropriately", () => {
    cy.visit("/dashboard");
    cy.contains("Student Dashboard");
    cy.get("div.student-list-card")
      .find(".student-list-tail-item")
      .first()
      .click();

    let benchmarkCards = cy.get("div.benchmark-list-card");

    benchmarkCards
      .should("contain", "Division-Single Digit")
      .contains("Division-Single Digit")
      .click();

    pursueSequence(divisionLambda, 21, 500);
  });
});
