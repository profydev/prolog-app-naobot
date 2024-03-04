describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("footer exists", () => {
    cy.get("footer").should("exist");
  });

  it("displays version", () => {
    cy.get("footer").contains("Version");
  });
});
