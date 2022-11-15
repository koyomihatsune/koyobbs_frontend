describe("Open a post test", () => {
  it("Visit website without login and open a post, then back to home page", () => {
    // Visit website
    cy.visit("http://127.0.0.1:5173");
    // Get card and click to redirect to post page.
    cy.get(".fui-Card")
      .children()
      .first()
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);
    // After have been in post page, click back to board button to back to home page.
    cy.wait(500);
    cy.contains("Back to Board").click();
  });
});

describe("Open profile Test", () => {
  it("Visit website without login and open profile board", () => {
    // Visit website
    cy.visit("http://127.0.0.1:5173/");
    // Click profile to redirect to profile page.
    cy.get('[id="ShapeColorPivot_/me"]').click();
    // After have been in profile page ,check it is in not logged in status by checking fui-Text.
    cy.wait(500);
    cy.get(".fui-Text").should(
      "contain",
      "Log in or register to write post and view your own profile"
    );
  });
});
