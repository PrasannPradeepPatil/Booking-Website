package models

type EmailRes struct {
	OtpCode     string `gorm:"not_null" form:"OtpCode" json:"OtpCode"`
	EmailStatus string `gorm:"not_null" form:"EmailStatus" json:"EmailStatus"`
	ErrorCode   string `gorm:"not_null" form:"ErrorCode" json:"ErrorCode"`
}
