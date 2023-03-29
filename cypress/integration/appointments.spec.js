describe("Appointments test", () => {
  beforeEach(() => {
    // reset database test
    cy.request("GET", "/api/debug/reset");

    // visits the root of the web server
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    // clicks the add button
    cy.get("[alt=Add]").first().click();

    // enters student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // clicks the save button
    cy.contains("Save").click();

    // sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty
  });
});
