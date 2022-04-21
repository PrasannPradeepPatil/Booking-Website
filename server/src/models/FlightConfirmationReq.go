package models

type FlightConfirmationReq struct {
	CodeStatus   string
	BookingDates string
	CustomerName string
	EmailAdd     string
	MobileNumber string
	Source       string
	Destination  string
	ID           string
}
