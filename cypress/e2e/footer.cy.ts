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

  it("has footer links", () => {
    cy.get("footer").contains("Docs").should("have.attr", "href", "#");
    cy.get("footer").contains("API").should("have.attr", "href", "#");
    cy.get("footer").contains("Help").should("have.attr", "href", "#");
    cy.get("footer").contains("Community").should("have.attr", "href", "#");
  });

  it("displays logo", () => {
    cy.get("footer")
      .find("img")
      .should("have.attr", "src", "/icons/logo-small.svg");
  });
});
