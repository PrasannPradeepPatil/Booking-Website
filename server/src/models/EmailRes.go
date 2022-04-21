package models

type EmailRes struct {
	OtpCode     string `gorm:"not_null" form:"OtpCode" json:"otpCode"`
	EmailStatus string `gorm:"not_null" form:"EmailStatus" json:"emailStatus"`
	ErrorCode   string `gorm:"not_null" form:"ErrorCode" json:"errorCode"`
}
