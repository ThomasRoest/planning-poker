describe("Basic tests", () => {
  it("should create a session", () => {
    cy.visit("/");
    cy.findByText("Create new session");

    cy.findByPlaceholderText("Title").click().type("cypress session");
    cy.findByPlaceholderText("Username").click().type("cypress username");

    cy.findByText("create new session").click();

    cy.findByText("cypress session");

    cy.findByText("5 points").click();
  });
});
