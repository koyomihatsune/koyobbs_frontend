describe("Login with UI", () => {
  it("sets auth cookie when logging in via form submission", () => {
    const email = "RandomPerson1@gmail.com";
    const password = "123456A?";
    const username = "RandomPerson1";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    // Type email and password to login
    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    // Check username after logined
    cy.get('[id="ShapeColorPivot_/me"]').should("contain", username).click();
    // Logout
    cy.contains("Logout").click();
  });

  it("Login fail", () => {
    const email = "RandomPerson1@gmail.com";
    const password = "123456A";
    const username = "RandomPerson1";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    // Type email and password to login
    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    // Check username after logined fail
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Wrong password.`);
    });
  });
});

describe("Login without UI", () => {
  beforeEach(() => {
    // Provide a stub auth for each login required test.
    cy.intercept("GET", "http://localhost:9000/api/authtest", {
      fixture: "AuthStub",
    }).as("getAuth");
  });

  it("logs in programmatically without using the UI", function () {
    const email = "RandomPerson1@gmail.com";
    const password = "123456A?";
    const username = "RandomPerson1";
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    // Check username after logined
    cy.get('[id="ShapeColorPivot_/me"]').should("contain", username).click();
    // Logout
    cy.contains("Logout").click();
  });
});
