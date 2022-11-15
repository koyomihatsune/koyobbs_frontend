describe("Test Signup", () => {
  it("Sign up success", () => {
    const { email, username, password } = createRandomAccount();
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    //Click create one to redirect to sign-up page.
    cy.get("a").contains("Create one").click();
    cy.url().should("include", "/register");
    // Type email to sign up
    cy.get("input[name=email]").type(email);
    // Type username to sign up
    cy.get("input[name=username]").type(username);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    cy.on("window:alert", (str) => {
      expect(str).to.contains(`has been registered successfully.`);
    });
  });

  it("Sign up fail: Username has existed", () => {
    const { email, password } = createRandomAccount();
    const username = "RandomPerson1";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    //Click create one to redirect to sign-up page.
    cy.get("a").contains("Create one").click();
    cy.url().should("include", "/register");
    // Type email to sign up
    cy.get("input[name=email]").type(email);
    // Type username to sign up
    cy.get("input[name=username]").type(username);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    cy.on("window:alert", (str) => {
      expect(str).to.contains(`Username has existed`);
    });
  });

  it("Sign up fail: Email has existed", () => {
    const { username, password } = createRandomAccount();
    const email = "RandomPerson1@gmail.com";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    //Click create one to redirect to sign-up page.
    cy.get("a").contains("Create one").click();
    cy.url().should("include", "/register");
    // Type email to sign up
    cy.get("input[name=email]").type(email);
    // Type username to sign up
    cy.get("input[name=username]").type(username);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    cy.on("window:alert", (str) => {
      expect(str).to.contains(`Email has existed`);
    });
  });

  it("Sign up fail: Invalid email format", () => {
    const { username, password } = createRandomAccount();
    const email = "1111111";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    //Click create one to redirect to sign-up page.
    cy.get("a").contains("Create one").click();
    cy.url().should("include", "/register");
    // Type email to sign up
    cy.get("input[name=email]").type(email);
    // Type username to sign up
    cy.get("input[name=username]").type(username);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    // check form
    cy.get("form > .fui-Text").should(
      "contain",
      "Email should have form aaa@bbb.xyz"
    );
  });
  it("Sign up fail: Invalid password format", () => {
    const { email, username } = createRandomAccount();
    const password = "1111111";
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click login button to redirect to login page.
    cy.get("a > .fui-Button").contains("Login").click();
    // Check login page.
    cy.url().should("include", "/login");
    //Click create one to redirect to sign-up page.
    cy.get("a").contains("Create one").click();
    cy.url().should("include", "/register");
    // Type email to sign up
    cy.get("input[name=email]").type(email);
    // Type username to sign up
    cy.get("input[name=username]").type(username);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);
    // check form
    cy.get("form > .fui-Text").should(
      "contain",
      "Password length must be within range (8~20 characters) with letters, numbers and special symbols."
    );
  });
});

function createRandomAccount() {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var string = "";
  for (var i = 0; i < 10; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  const email = string + "@domain.com";
  const password = string + "@" + "1";
  const username = string;
  return {
    password: password,
    username: username,
    email: email,
  };
}
