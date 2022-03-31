package models

type HotelPayRes struct {
	Status    string `gorm:"not_null" form:"Status" json:"Status"`
	OtpCode   string `gorm:"not_null" form:"OtpCode" json:"OtpCode"`
	ErrorCode string `gorm:"not_null" form:"ErrorCode" json:"ErrorCode"`
}
