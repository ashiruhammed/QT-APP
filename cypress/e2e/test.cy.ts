import { CiFloppyDisk } from "react-icons/ci";

let token: string;

describe("Application Logic", () => {
  describe("Authentication Login", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.intercept("POST", "https://qt.organogram.app/token", (req) => {
        req.headers["email"] = "hammedashiru989@gmail.com";
      }).as("signup");
    });

    it("should check if user is logged in else log the user", () => {
      if (!cy.getCookie("token")) {
        cy.visit("/signup");
        cy.get("input").should("exist").type("hammedashiru8988@gmail.com");
        cy.get("form").submit();

        cy.wait("@signup").then((req) => {
          if (req.response?.body.token) {
            cy.visit("/");
            cy.setCookie("token", req.response.body.token);
          }
        });
      }
    });

    it("check if there exist at least two question on the page and other logic", () => {
      cy.visit("/signup");
      cy.get("input").should("exist").type("hammedashiru8988@gmail.com");
      cy.get("form").submit();
      cy.wait("@signup").then((req) => {
        if (req.response?.body.token) {
          cy.visit("/");
          cy.intercept("GET", "https://qt.organogram.app/questions", (res) => {
            res.headers["Token"] = req.response?.body.token;
          }).then((req) => {
            if (req === null)
              cy.get('[data-testid="question"]').should("have.length", 2);

            if (req) {
              cy.get('[data-testid="question"]').should("exist");
            }
          });
        }
      });
    });

    it("should check the popup window", () => {
      cy.visit("/signup");
      cy.get("input").should("exist").type("hammedashiru8988@gmail.com");
      cy.get("form").submit();

      cy.wait("@signup").then((req) => {
        if (req.response?.body.token) {
          cy.visit("/");
          cy.get('[data-testid="question"]').should("exist");
          cy.get('[data-testid="showPopup"]').click();
          cy.get('[data-testid="addQuestionModal"]').should("exist");
        }
      });
    });

    it("should check adding the questions", () => {
      cy.visit("/signup");
      cy.get("input").should("exist").type("hammedashiru8988@gmail.com");
      cy.get("form").submit();

      cy.wait("@signup").then((req) => {
        if (req.response?.body.token) {
          cy.visit("/");
          cy.get('[data-testid="question"]').should("exist");
          cy.get('[data-testid="showPopup"]').click();

          cy.get('[data-testid="inputQuestion"]').type("I need to go home");
          if (
            cy.get('[data-testid="options"]').should("have.length.below", 3) ||
            cy.get('[data-testid="options"]').should("have.length.above", 5)
          )
            cy.get('[data-testid="addNewQuestion"]').should("be.disabled");
        }
      });
    });
  });
});
