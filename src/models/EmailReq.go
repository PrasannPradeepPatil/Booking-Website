package models

type EmailReq struct {
	EmailAdd        string
	CustomerName    string
	MailType        string
	Source          string
	Destination     string
	BookingCity     string
	DateOfBooking   string
	ReferenceNumber string
}
