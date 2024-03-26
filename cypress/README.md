# Set Up

Clone down the [cypress-examples](https://github.com/ashiruhammed/QT-APP) respository:

```sh
git clone https://github.com/ashiruhammed/QT-APP
```

## Getting started

First and foremost, install your dependencies.

```
npm install
```

```
npm run db:setup
```

Finally, spin up the server.

```
npm start
```

## Running the tests

You can run the tests using the following command. **Note**: You must have completed the following steps and have the server up and running.

```
npx cypress open
```

### Check if the user is valid

```js
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
```

### Check if there is atleast two questions on the page

```js
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
```

### Check the popup window

```js
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
```

### Check for adding the questions (questions, minimum option and maximum option)

```js
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
```
