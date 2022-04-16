package models

type FlightDetailsResp struct {
	Sourceairport          string `gorm:"not_null" form:"sourceairport" json:"sourceAirport"`
	Destinationairport     string `gorm:"not_null" form:"Destinationairport" json:"destinationAirport"`
	Sourcecity             string `gorm:"not_null" form:"Sourcecity" json:"sourceCity"`
	Destinationcity        string `gorm:"not_null" form:"Destinationcity" json:"destinationCity"`
	Sourceairportcode      string `gorm:"not_null" form:"Sourceairportcode" json:"sourceAirportCode"`
	Destinationairportcode string `gorm:"not_null" form:"Destinationairportcode" json:"destinationAirportCode"`
	Flightnumber           string `gorm:"not_null" form:"Flightnumber" json:"flightNumber"`
	Departuretime          string `gorm:"not_null" form:"Departuretime" json:"departureTime"`
	Arrivaltime            string `gorm:"not_null" form:"Arrivaltime" json:"arrivalTime"`
	Price                  string `gorm:"not_null" form:"Price" json:"price"`
	Duration               string `gorm:"not_null" form:"Duration" json:"duration"`
	Flightname             string `gorm:"not_null" form:"Flightname" json:"flightName"`
	Boardingtime           string `gorm:"not_null" form:"Boardingtime" json:"boardingTime"`
	ID                     string `gorm:"not_null" form:"ID" json:"id"`
}
