package models

type SrchArptAPI struct {
	CityName    string `gorm:"not_null" form:"cityName" json:"cityname"`
	AirportCode string `gorm:"not_null" form:"airportCode" json:"airportcode"`
	AirportName string `gorm:"not_null" form:"airportName" json:"airportname"`
	CountryName string `gorm:"not_null" form:"countryName" json:"countryname"`
}
