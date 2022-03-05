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
    cy.get('button[id="flightSearch"]').click();
  });


  it.only("Selects a flight", () => {
    cy.get("a[name='seeFlight']").eq(0).click();
    cy.get("button[name='selectFlight']").click();
  });

  it.only("Enters passenger Information", () => {
    cy.get("input[id='staticEmail']").type("pnarkar19@gmail.com")
    cy.get("input[id='inputContact']").type("999999999")
    cy.get("input[id='validationDefault01']").type("Pranali")
    cy.get("input[id='validationDefault02']").type("Narkar")
    cy.get("select").select("Female")
    cy.get("input[id='invalidCheck2']").click()

  });
});
