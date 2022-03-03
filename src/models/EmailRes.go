package models

type EmailRes struct {
	Code        string `gorm:"not_null" form:"Code" json:"Code"`
	EmailStatus string `gorm:"not_null" form:"EmailStatus" json:"EmailStatus"`
}
