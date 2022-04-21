package models

type SearchRes struct {
	Flightnumber           string `gorm:"primary key;not_null" form:"flightNumber" json:"flightNumber"`
	Flightname             string `gorm:"primary key;not_null" form:"flightName" json:"flightName"`
	Departuretime          string `gorm:"not_null" form:"departureTime" json:"departureTime"`
	Arrivaltime            string `gorm:"not_null" form:"arrivalTime" json:"arrivalTime"`
	Sourceairport          string `gorm:"not_null" form:"sourceAirport" json:"sourceAirport"`
	Sourceairportcode      string `gorm:"not_null" form:"sourceAirportCode" json:"sourceAirportCode"`
	Destinationairportcode string `gorm:"not_null" form:"destinationAirportCode" json:"destinationAirportCode"`
	Destinationairport     string `gorm:"not_null" form:"destinationAirport" json:"destinationAirport"`
	Price                  int    `gorm:"not_null" form:"price" json:"price"`
	Duration               int    `gorm:"not_null" form:"duration" json:"duration"`
	Id                     string `gorm:"not_null" form:"Id" json:"id"`
	Sourcecity             string `gorm:"not_null" form:"SourceCity" json:"sourceCity"`
	Destinationcity        string `gorm:"not_null" form:"DestinationCity" json:"destinationCity"`
}
