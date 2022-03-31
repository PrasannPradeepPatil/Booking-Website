package models

type Search struct {
	Flightname         string `gorm:"primary key;not_null" form:"flightNumber" json:"flightnumber"`
	Departuretime      string `gorm:"not_null" form:"departureTime" json:"departuretime"`
	Arrivaltime        string `gorm:"not_null" form:"arrivalTime" json:"arrivaltime"`
	Sourceairport      string `gorm:"not_null" form:"sourceAirport" json:"sourceairport"`
	Destinationairport string `gorm:"not_null" form:"destinationAirport" json:"destinationairport"`
	Price              string `gorm:"not_null" form:"price" json:"price"`
	Duration           string `gorm:"not_null" form:"duration" json:"duration"`
	Airlineid          string `gorm:"not_null" form:"airlineID" json:"airlineid"`
	Sourcecity         string `gorm:"not_null" form:"SourceCity" json:"SourceCity"`
	Destinationcity    string `gorm:"not_null" form:"DestinationCity" json:"DestinationCity"`
}
