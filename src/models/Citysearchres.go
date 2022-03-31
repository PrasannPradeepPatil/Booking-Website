package models

type CitySearchRes struct {
	City  string `gorm:"not_null" form:"City" json:"City"`
	State string `gorm:"not_null" form:"State" json:"State"`
}
