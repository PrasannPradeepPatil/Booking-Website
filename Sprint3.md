# Booking Website

## Sprint 3

### Group Members:
#### Front End:
- Pranali Suhas Narkar
- Prasann Pradeep Patil
#### Backend:
- Manish Alluri
- Ahamad Shaik


### Sprint 3 overview

In the third sprint, we have modified the "Flights" pafe to handle certaing edge case and made beautification of the page.
We also started the "hotels" page.We implemented the hotel-search , hotel-listing and started with the hotels-filter components. 

 

User Stories Dashboard for Sprint 3: -
https://github.com/PrasannPradeepPatil/Booking-Website/projects/1?card_filter_query=label%3A%22sprint+3%22



### Completed Features: -
1. Payment-stage-3 component: This is the third stage of the payment's page that we implemented. This will take the user information and based on the information entered in input which will be sent to backend. The bacend will send the required response and will make the appropriate payment 
![Payment-Stage-3 Component](/Images/flight-listing-filter.PNG)

2. Hotels-search : We have implemented the hotel-search component with input fields like hotel location, start date and end date. The user will hit the seqarch button which will return a list of hotels at the input location and available within th input date range.

![Hotel-Search Component](/Images/flight-listing-filter.PNG)

3. Hotels-listing component: This component displays the list of the hotels that were returned by the backend based on the 
hotel-search inputs. The lists display the hotel image along with some hotel details returned by the backend.

![Hotel-Search Component](/Images/flight-listing-filter.PNG)

4. Hotel-filter component : We have started the implementation of hotel filter component. This component sends some filter details to the backend which will return the hotel lists satisfying the filter criteria.


### How to run the frontend application: -
npm install
-- This will install all the necessary node modules.

ng serve
This will start the webserver.

#### Backend API's: -

#### Payment API

Functionality: 
Returns the payment status, and otp code by triggering an email API 
used for authenticating customer. The OTP is used at front end for authorization.

Calling Conditions:
1. When the customer clicks on checkout button after entering the required 
information needed for payment, this API is triggered.
2. This API triggers email API with the email type as FOTP.
3. This returns the payment status representing the status of the mail sent to 
the customer, OTP if mail is successfully sent to authenticate at the front end 
and an error code in case of any errors.
4. Few predefined errors will be provided at the end of document.

Development URI: http://localhost:8080/booking/payment

Input fields:
1. CustomerName
    a. datatype: String
    b. Mandatory field status: mandatory field in the input request.
    c. Mandatory field value: mandatory value
2. MobileNumber
    a. datatype: String or numeric
    b. Mandatory field status: mandatory field in the input request.
    c. Mandatory field value: mandatory value

3. EmailAdd
    a. datatype: String
    b. Mandatory field status: mandatory field in the input request.
    c. Mandatory field value: mandatory value.

Output fields: The output is a json having the following fields.
1. Status
    a. datatype: String
    b. Mandatory field status: Mandatory field in the response
    c. Mandatory field value: mandatory value (SUCCESS/FAILED)
2. OtpCode
    a. datatype: String or numeric
    b. Mandatory field status: Mandatory field in the response
    c. Mandatory field value: not mandatory, given only if status is SUCCESS.
3. ErrorCode
    a. datatype: String
    b. Mandatory field status: Mandatory field in the response
    c. Mandatory field value: null if status is SUCCESS else returns error code.

Sample Request Format:
{
 "CustomerName":"xxxxxxx xxxxx",
 "MobileNumber":"xxxxxxxxxx",
 "EmailAdd":"xxxxxxxxxx@gmail.com",
}
Sample response Format:
{
 "Status": "SUCCESS",
 "OtpCode": "160901",
 "ErrorCode": ""
}


#### Hotel Search API


### How to run the backend application: -
go build
-- This will build all the existing go files in the src folder.

go run main.go
-- Sets up and hosts the APIs on a localhost server and also eshtablishes connection to the database.


### Demo video link
Demo - https://www.youtube.com/watch?v=iezFnKQA6Ts

