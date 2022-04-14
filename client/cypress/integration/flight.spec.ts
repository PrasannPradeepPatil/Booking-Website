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

  it.only("Select Ticket Type", () => {
    cy.get("div[id='economy']").click()
    cy.get("button[name='next']").click()
  });

  it.only("Enters passenger Information", () => {
    cy.get("input[id='staticEmail']").type("pnarkar19@gmail.com")
    cy.get("input[id='inputContact']").type("999999999")
    cy.get("input[id='validationDefault01']").type("Pranali")
    cy.get("input[id='validationDefault02']").type("Narkar")
    cy.get("select").select("Female")
    cy.get("input[id='invalidCheck2']").click()
    cy.get("button[type='submit']").click()
  });

  it.only("Enters Credit Card Information", () => {
    cy.get("input[name='address']").type("Univeristy of Florida")
    cy.get("input[name='City']").type("Gainesville")
    cy.get("input[id='State']").type("Florida")
    cy.get("input[id='zip']").type("32601")
    cy.get("input[name='cardname']").type("Pranali")
    cy.get("input[name='cardnumber']").type("1569-1234-5678-2091")
    cy.get("input[id='expmonth']").type("March")
    cy.get("input[id='expyear']").type("2023")
    cy.get("input[id='cvv']").type("123")
    cy.get("input[id='paynow']").click()
  });

});
