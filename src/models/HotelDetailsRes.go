package models

type HotelDetailsRes struct {
	City          string `gorm:"not_null" form:"City" json:"City"`
	State         string `gorm:"not_null" form:"State" json:"State"`
	HotelName     string `gorm:"not_null" form:"Hotelname" json:"Hotelname"`
	Rating        string `gorm:"not_null" form:"Rating" json:"Rating"`
	StandardPrice string `gorm:"not_null" form:"StandardPrice" json:"StandardPrice"`
	Address       string `gorm:"not_null" form:"Address" json:"Address"`
	Amenities     string `gorm:"not_null" form:"Amenities" json:"Amenities"`
}
