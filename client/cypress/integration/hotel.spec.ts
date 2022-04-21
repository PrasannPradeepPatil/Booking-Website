describe("Landing page", () => {
    it("Visiting our Landing page", () => {
      cy.visit("/");
      cy.contains("Booking.com");
    });
  });

  describe("Hotel page", () => {
    it("Visiting our Hotel page", () => {
      cy.get("a[name='hotels']").click();
      cy.get("input[name='State']").invoke('attr', 'placeholder').should('contain', 'Hotel State');
    });
  });


  describe("Hotel page", () => {
    it.only("Search Hotels", () => {
      cy.visit("/hotels");
      cy.get("input[name='State']").type("Florida")
      cy.get("input[name='City']").type("Gainesville")
      cy.get('button[id="flightSearch"]').click();
    });
  

  it.only("Selects a hotel", () => {
    cy.get("a[name='selectHotel']").eq(1).click();
    cy.get("button[name='selectHotel']").click();
  });

  it.only("Enters guest Information", () => {
    cy.get("input[id='staticEmail']").type("prasannpatil98@gmail.com")
    cy.get("input[id='inputContact']").type("999999999")
    cy.get("input[id='validationDefault01']").type("Prasann")
    cy.get("input[id='validationDefault02']").type("Patil")
    cy.get("select").select("Male")
    cy.get("input[id='invalidCheck2']").click()
    cy.get("button[type='submit']").click()
  });

  it.only("Enters Credit Card Information", () => {
    cy.get("input[name='address']").type("Univeristy of Florida")
    cy.get("input[name='City']").type("Gainesville")
    cy.get("input[id='State']").type("Florida")
    cy.get("input[id='zip']").type("32601")
    cy.get("input[name='cardname']").type("Prasann")
    cy.get("input[name='cardnumber']").type("1569-1234-5678-2091")
    cy.get("input[id='expmonth']").type("March")
    cy.get("input[id='expyear']").type("2023")
    cy.get("input[id='cvv']").type("123")
  });

});