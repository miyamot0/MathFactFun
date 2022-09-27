import * as authUser from "../fixtures/auth-user.json";

describe("After authenticating, should arrive at landing page", () => {
  let sideLinks: Cypress.Chainable<JQuery<HTMLElement>>;

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Arrives at landing, authenticated", () => {
    const { email, password } = authUser;
    cy.login(email, password);

    // Probe the landing page
    cy.visit("/login");
    cy.contains("Welcome");

    sideLinks = cy.get("nav.links > ul > li");
    sideLinks.should("have.length", 5);
    // First link is home page
  });

  it("Arrives at landing, authenticated", () => {
    // Probe the information page
    sideLinks.next().first().click();
    cy.contains("Information and Start-up Guide");
  });
});
