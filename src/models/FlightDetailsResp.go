package models

type FlightDetailsResp struct {
	Sourceairport          string `gorm:"not_null" form:"sourceairport" json:"sourceairport"`
	Destinationairport     string `gorm:"not_null" form:"Destinationairport" json:"Destinationairport"`
	Sourcecity             string `gorm:"not_null" form:"Sourcecity" json:"Sourcecity"`
	Destinationcity        string `gorm:"not_null" form:"Destinationcity" json:"Destinationcity"`
	Sourceairportcode      string `gorm:"not_null" form:"Sourceairportcode" json:"Sourceairportcode"`
	Destinationairportcode string `gorm:"not_null" form:"Destinationairportcode" json:"Destinationairportcode"`
	Flightnumber           string `gorm:"not_null" form:"Flightnumber" json:"Flightnumber"`
	Departuretime          string `gorm:"not_null" form:"Departuretime" json:"Departuretime"`
	Arrivaltime            string `gorm:"not_null" form:"Arrivaltime" json:"Arrivaltime"`
	Price                  string `gorm:"not_null" form:"Price" json:"Price"`
	Duration               string `gorm:"not_null" form:"Duration" json:"Duration"`
	Flightname             string `gorm:"not_null" form:"Flightname" json:"Flightname"`
	Boardingtime           string `gorm:"not_null" form:"Boardingtime" json:"Boardingtime"`
	Checkinluggage         string `gorm:"not_null" form:"Checkinluggage" json:"Checkinluggage"`
	Cabin                  string `gorm:"not_null" form:"Cabin" json:"Cabin"`
	Cancellation           string `gorm:"not_null" form:"Cancellation" json:"Cancellation"`
}
