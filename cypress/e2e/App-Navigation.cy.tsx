/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as authUser from "../fixtures/auth-user.json";

describe("Basic Navigation, after authenticating", () => {
  let sideLinks: Cypress.Chainable<JQuery<HTMLElement>>;
  const nSideElements = 5;

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should successfully log in", () => {
    const { email, password } = authUser;
    cy.login(email, password);
    // Probe the landing page
    cy.visit("/login");
  });

  it("Should land on the welcome/landing page, once authenticated", () => {
    cy.contains("Welcome");
  });

  it("Should display modal and dismiss as appropriate", () => {
    const navbarLinks = cy.get("div.navbar > ul > li");

    navbarLinks.first().click();

    cy.wait(100).get("div.navbar-modal").should("exist");

    const closeButton = cy.get("button.modal-close");

    closeButton.first().wait(100).click();

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);
    sideLinks.next().first().click();
  });

  it("Arrives at information, authenticated", () => {
    // Probe the information page
    cy.wait(2000).contains("Information and Start-up Guide");

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);

    sideLinks.next().next().first().click();
  });

  it("Arrives at Student Dashboard, authenticated", () => {
    // Probe the information page
    cy.wait(2000).contains("Student Dashboard");

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);

    sideLinks.next().next().next().first().click();
  });

  // TODO: clicks for each button

  it("Arrives at Practice Dashboard, authenticated", () => {
    // Probe the information page
    cy.wait(2000).contains("Intervention Dashboard");

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);

    sideLinks.next().next().next().next().first().click();
  });

  // TODO: clicks for each button

  it("Arrives at Create Student Page, authenticated", () => {
    // Probe the information page
    cy.wait(2000).contains("Add a new student");

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);

    sideLinks.next().next().next().next().first().click();
  });

  // TODO: entry for form

  it("Logs out, closes site", () => {
    // Probe the information page

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", nSideElements);

    const closeButton = cy.get(".logout");

    closeButton.wait(100).click();
  });
});
