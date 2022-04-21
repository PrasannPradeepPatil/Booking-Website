package models

type HotelDetailsRes struct {
	City          string `gorm:"not_null" form:"City" json:"city"`
	State         string `gorm:"not_null" form:"State" json:"state"`
	HotelName     string `gorm:"not_null" form:"Hotelname" json:"hotelName"`
	Rating        string `gorm:"not_null" form:"Rating" json:"rating"`
	Standardprice string `gorm:"not_null" form:"StandardPrice" json:"standardPrice"`
	Address       string `gorm:"not_null" form:"Address" json:"address"`
	Amenities     string `gorm:"not_null" form:"Amenities" json:"amenities"`
	ID            string `gorm:"not_null" form:"ID" json:"id"`
}
