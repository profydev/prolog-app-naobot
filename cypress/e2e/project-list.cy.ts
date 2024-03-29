import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import { ProjectStatus } from "@api/projects.types";
import type { Project } from "@api/projects.types";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusNames = {
        [ProjectStatus.info]: "stable",
        [ProjectStatus.warning]: "warning",
        [ProjectStatus.error]: "critical",
      };
      const statusColorNames = {
        [ProjectStatus.info]: "success",
        [ProjectStatus.warning]: "warning",
        [ProjectStatus.error]: "error",
      };

      // get all project cards
      cy.get("ul[class*='project-list']")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(statusNames[(mockProjects[index] as Project).status]),
          );
          cy.wrap($el)
            .find(
              `div[class*='badge_${
                statusColorNames[(mockProjects[index] as Project).status]
              }']`,
            )
            .should(
              "have.text",
              capitalize(statusNames[(mockProjects[index] as Project).status]),
            );
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("displays error message when projects aren't fetched", () => {
      cy.intercept(
        {
          method: "GET",
          url: "https://prolog-api.profy.dev/project",
        },
        {
          forceNetworkError: true,
        },
      ).as("getNetworkFailure");

      cy.visit("http://localhost:3000/dashboard");
      cy.wait(10000);
      cy.contains("There was a problem while loading the project data").should(
        "be.visible",
      );
      cy.contains("Try again").click();

      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      }).as("getProjects");

      cy.wait("@getProjects");
    });

    it("shows loading indicator when fetch is pending", () => {
      cy.intercept({
        method: "GET",
        url: "https://prolog-api.profy.dev/project",
      }).as("getProjects");

      cy.visit("http://localhost:3000/dashboard");
      cy.get(".loading img")
        .should("have.attr", "src")
        .should("equal", "/icons/loading-circle.svg");

      cy.wait("@getProjects");
    });
  });
});
