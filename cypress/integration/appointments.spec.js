describe("Appointments test", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    /*
     * actions to book an interview
     */
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones", {
      delay: 100,
    });
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();

    /*
     * sees the booked appointment
     */
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    /*
     * actions to edit an interview
     */
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Leopold Silvers", { delay: 100 });
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();

    /*
     * sees the edited appointment
     */
    cy.contains(".appointment__card--show", "Leopold Silvers");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    /*
     * actions to cancel an interview
     */
    cy.get("[alt=Delete]").click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");

    /*
     * sees that the appointment slot is empty
     */
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
