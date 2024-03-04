describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get(":not(footer) > nav")
        .contains("Projects")
        .should("have.attr", "href", "/dashboard");

      cy.get(":not(footer) > nav")
        .contains("Issues")
        .should("have.attr", "href", "/dashboard/issues");

      cy.get(":not(footer) > nav")
        .contains("Alerts")
        .should("have.attr", "href", "/dashboard/alerts");

      cy.get(":not(footer) > nav")
        .contains("Users")
        .should("have.attr", "href", "/dashboard/users");

      cy.get(":not(footer) > nav")
        .contains("Settings")
        .should("have.attr", "href", "/dashboard/settings");
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get(":not(footer) > nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get(":not(footer) > nav")
        .find("a")
        .should("have.length", 6)
        .eq(1)
        .click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get(":not(footer) > nav").contains("Issues").should("not.exist");
    });

    function parseMailto(mailtoString: string) {
      const [mailto, params] = mailtoString.split("?");
      const recipient = mailto.split(":")[1];
      const result: { [index: string]: string } = { recipient };
      params.split("&").forEach((param: string) => {
        const [key, encoded] = param.split("=");
        result[key] = decodeURIComponent(encoded);
      });
      return result;
    }

    it("support opens mail client", () => {
      cy.get(":not(footer) > nav")
        .contains("Support")
        .should("have.attr", "href")
        .should("be.a", "string")
        .as("mailtoString");
      cy.get<string>("@mailtoString")
        .then(parseMailto)
        .then(console.log)
        .should("deep.equal", {
          recipient: "support@prolog-app.com",
          subject: "Support Request:",
        });
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport(":not(footer) > nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport(":not(footer) > nav");

      // check that all links are rendered
      cy.get(":not(footer) > nav").find("a").should("have.length", 6);

      // Support button should be rendered but Collapse button not
      cy.get(":not(footer) > nav").contains("Support").should("exist");
      cy.get(":not(footer) > nav")
        .contains("Collapse")
        .should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport(":not(footer) > nav");
    });
  });
});
