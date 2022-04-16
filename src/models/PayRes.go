package models

type PayRes struct {
	Status    string `gorm:"not_null" form:"Status" json:"status"`
	OtpCode   string `gorm:"not_null" form:"OtpCode" json:"otpCode"`
	ErrorCode string `gorm:"not_null" form:"ErrorCode" json:"errorCode"`
	
}
