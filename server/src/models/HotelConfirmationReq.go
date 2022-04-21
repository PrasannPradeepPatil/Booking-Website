package models

type HotelConfirmationReq struct {
	CodeStatus   string
	BookingDates string
	CustomerName string
	EmailAdd     string
	MobileNumber string
	HotelName    string
	City         string
	State        string
	ID           string
}
