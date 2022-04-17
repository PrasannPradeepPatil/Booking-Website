package models

type RoundTripSearchRes struct {
	Flightnumber             string `gorm:"primary key;not_null" form:"flightNumber" json:"flightNumber"`
	ReFlightnumber           string `gorm:"primary key;not_null" form:"ReflightNumber" json:"reFlightNumber"`
	Flightname               string `gorm:"primary key;not_null" form:"flightName" json:"flightName"`
	ReFlightname             string `gorm:"primary key;not_null" form:"ReflightName" json:"reFlightName"`
	Departuretime            string `gorm:"not_null" form:"departureTime" json:"departureTime"`
	ReDeparturetime          string `gorm:"not_null" form:"RedepartureTime" json:"reDepartureTime"`
	Arrivaltime              string `gorm:"not_null" form:"arrivalTime" json:"arrivalTime"`
	ReArrivaltime            string `gorm:"not_null" form:"RearrivalTime" json:"reArrivalTime"`
	Sourceairport            string `gorm:"not_null" form:"sourceAirport" json:"sourceAirport"`
	ReSourceairport          string `gorm:"not_null" form:"ResourceAirport" json:"reSourceAirport"`
	Sourceairportcode        string `gorm:"not_null" form:"sourceAirportCode" json:"sourceAirportCode"`
	ReSourceairportcode      string `gorm:"not_null" form:"ResourceAirportCode" json:"reSourceAirportCode"`
	Destinationairportcode   string `gorm:"not_null" form:"destinationAirportCode" json:"destinationAirportCode"`
	ReDestinationairportcode string `gorm:"not_null" form:"RedestinationAirportCode" json:"reDestinationAirportCode"`
	Destinationairport       string `gorm:"not_null" form:"destinationAirport" json:"destinationAirport"`
	ReDestinationairport     string `gorm:"not_null" form:"RedestinationAirport" json:"reDestinationAirport"`
	Price                    int    `gorm:"not_null" form:"price" json:"price"`
	RePrice                  int    `gorm:"not_null" form:"Reprice" json:"rePrice"`
	Duration                 int    `gorm:"not_null" form:"duration" json:"duration"`
	ReDuration               int    `gorm:"not_null" form:"Reduration" json:"reDuration"`
	Id                       string `gorm:"not_null" form:"Id" json:"id"`
	ReId                     string `gorm:"not_null" form:"ReId" json:"reId"`
	Sourcecity               string `gorm:"not_null" form:"SourceCity" json:"sourceCity"`
	ReSourcecity             string `gorm:"not_null" form:"ReSourceCity" json:"reSourceCity"`
	Destinationcity          string `gorm:"not_null" form:"DestinationCity" json:"destinationCity"`
	ReDestinationcity        string `gorm:"not_null" form:"ReDestinationCity" json:"reDestinationCity"`
}
