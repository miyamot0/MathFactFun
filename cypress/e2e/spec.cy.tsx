import * as authUser from "../fixtures/auth-user.json";

describe("empty spec", () => {
  it("passes", () => {
    const { email, password } = authUser;
    cy.login(email, password);
    cy.visit("/login");
  });
});
