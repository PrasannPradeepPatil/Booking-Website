package models

type CitySearchRes struct {
	City  string `gorm:"not_null" form:"City" json:"city"`
	State string `gorm:"not_null" form:"State" json:"state"`
}
