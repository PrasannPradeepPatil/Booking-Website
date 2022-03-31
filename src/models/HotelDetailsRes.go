package models

type HotelDetailsRes struct {
	City      string `gorm:"not_null" form:"City" json:"City"`
	State     string `gorm:"not_null" form:"State" json:"State"`
	HotelName string `gorm:"not_null" form:"Hotelname" json:"Hotelname"`
	Rating    string `gorm:"not_null" form:"Rating" json:"Rating"`
	Address   string `gorm:"not_null" form:"Address" json:"Address"`
	Amenities string `gorm:"not_null" form:"Amenities" json:"Amenities"`
}
