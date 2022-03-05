// describe('My First Test', () => {
//   it('Visits the initial project page', () => {
//     cy.visit('/')
//     cy.contains('Welcome')
//     cy.contains('sandbox app is running!')
//   })
// });


describe("Flight page", () => {
  it("Visiting our landing flight page", () => {
    cy.visit("/");
    cy.contains("Booking.com");
  });
});

describe("Flight page", () => {
  it.only("Search Flights", () => {
    cy.visit("/");
    cy.get("input[name='sourceAirport']").type("GNV")
    cy.get("a[name='sourceSuggestions']").eq(0).click();
    cy.get("input[name='destinationAirport']").type("LAX")
    cy.get('button[type="submit"]').click();
  });


  it.only("Selects a flight", () => {
    cy.get("a[name='seeFlight']").eq(0).click();
    cy.get("button[name='selectFlight']").click();
  });

  it.only("Enters passenger Informartion", () => {
    cy.get("input[id='staticEmail']").type("pnarkar19@gmail.com")
    cy.get("input[id='inputContact']").type("999999999")
    cy.get("input[id='validationDefault01']").type("Pranali")
    cy.get("input[id='validationDefault02']").type("Narkar")
    cy.get("select").select("Female")
    cy.get("input[id='invalidCheck2']").click()

  });

  it.only("Select Ticket Type", () => {
    cy.get("div[id='economy']").click()
    cy.get("button[name='next']").click()
  });
});
