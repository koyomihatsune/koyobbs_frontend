describe("Test post", () => {
  beforeEach(() => {
    // Provide a stub auth for each login required test.
    cy.intercept("GET", "http://localhost:9000/api/authtest", {
      fixture: "AuthStub",
    }).as("getAuth");
  });

  it("Create a new post success", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    cy.wait(1000);
    // Click to New Post button start creating a new Post
    cy.get(".fui-Button", { timeout: 10000 }).contains("New Post").click();
    // Click on image to upload image file
    cy.get(
      '[style="padding-top: 30px; position: relative;"] > .fui-Image'
    ).click();
    // Upload image file using SelectFile
    // force is used to force selectFile because the input is hidden.
    cy.get("input[type=file]").selectFile(
      ["cypress/fixtures/images/oriental-fantasy-wallpaper.jpg"],
      { force: true }
    );
    // Fill title and content.
    cy.get("#titleField").type("something");
    cy.get("#contentField").type("content");
    // Submit form.
    cy.get(".fui-Button").contains("Submit").click();
    //Check created post success.
    cy.get(".fui-Text").should("contain", "Post created successfully.");
  });

  it("Create a new post dismiss", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    cy.wait(1000);
    // Click to New Post button start creating a new Post
    cy.get(".fui-Button", { timeout: 10000 }).contains("New Post").click();
    // Click on image to upload image file
    cy.get(
      '[style="padding-top: 30px; position: relative;"] > .fui-Image'
    ).click();
    // Upload image file using SelectFile
    // force is used to force selectFile because the input is hidden.
    cy.get("input[type=file]").selectFile(
      ["cypress/fixtures/images/oriental-fantasy-wallpaper.jpg"],
      { force: true }
    );
    // Fill title and content.
    cy.get("#titleField").type("something");
    cy.get("#contentField").type("content");
    // Submit form.
    cy.get(".fui-Button").contains("Dismiss").click();
    cy.url().should("not.contain", "/post");
  });

  it("Edit a post dismiss", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    // Click to own Post button to perform a Post
    const username = "RandomPerson1";
    cy.get(".fui-Card")
      .children()
      .should("contain", username)
      .and("contain", "something")
      .first()
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // Edit post.
    cy.get(".fui-Button").contains("Edit").click();
    cy.get("#titleField").clear().type("edited");
    cy.get(".fui-Button").contains("Dismiss").click();
    //Check edit post success.
    cy.url().should("not.contain", "/post");
  });

  it("Edit a post reset", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    // Click to own Post button to perform a Post
    const username = "RandomPerson1";
    cy.get(".fui-Card")
      .children()
      .should("contain", username)
      .and("contain", "something")
      .first()
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // Edit post.
    cy.get(".fui-Button").contains("Edit").click();
    cy.get("#titleField").clear().type("edited");
    cy.get(".fui-Button").contains("Reset").click();
    //Check edit reset success.
    cy.url().should("contain", "/post");
  });

  it("Edit a post success", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    // Click to own Post button to perform a Post
    const username = "RandomPerson1";
    cy.get(".fui-Card")
      .children()
      .should("contain", username)
      .and("contain", "something")
      .first()
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // Edit post.
    cy.get(".fui-Button").contains("Edit").click();
    cy.get("#titleField").clear().type("edited");
    cy.get(".fui-Button").contains("Save").click();
    //Check edit post success.
    cy.get(".fui-Text").should("contain", "Post edited updated successfully.");
  });

  it("Remove a post", function () {
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://127.0.0.1:5173/");
    cy.wait(["@getAuth"]);
    // Click to own Post button to perform a Post
    const username = "RandomPerson1";
    cy.get(".fui-Card")
      .contains(username)
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // Delete post.
    cy.get(".fui-Button").contains("Delete").click();
    //Check delete post success.
    cy.get(".fui-Text").should("contain", "Post deleted successfully.");
  });
});
