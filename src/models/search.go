package models

type Search struct {
	FlightNumber       string `gorm:"primary key;not_null" form:"flightNumber" json:"flightnumber"`
	DepartureTime      string `gorm:"not_null" form:"departureTime" json:"departuretime"`
	ArrivalTime        string `gorm:"not_null" form:"arrivalTime" json:"arrivaltime"`
	SourceAirport      string `gorm:"not_null" form:"sourceAirport" json:"sourceairport"`
	DestinationAirport string `gorm:"not_null" form:"destinationAirport" json:"destinationairport"`
	Price              string `gorm:"not_null" form:"price" json:"price"`
	Duration           string `gorm:"not_null" form:"duration" json:"duration"`
	AirlineID          string `gorm:"not_null" form:"airlineID" json:"airlineid"`
}
