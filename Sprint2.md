# Booking Website

## Sprint 2

### Group Members:
- Pranali Suhas Narkar
- Prasann Pradeep Patil
- Manish Alluri
- Ahamad Shaik


### Sprint 2 overview

In the second sprint, we have continued with the "Flights" page which consists of flight-listing-filter component, flights-listing's details component and flight-payments components. We also have implemented automation testing using cypress. 

User Stories Dashboard for Sprint 1: -
https://github.com/PrasannPradeepPatil/Booking-Website/projects/1?card_filter_query=label%3A%22sprint+2%22



### Completed Features: -
1. Flight-listing-filter component: We have added the filters for the flight listing. Based on the filter our multiple flights will be filtered.

![Flight Listing Filter](/Images/flight-listing-filter.PNG)

2. Flight-listing's detail component: We have created a pop up animation which shows all the details of the flight in a pop-up and we can then proceed with that selected flight
![Flight Listing Details](/Images/flight-listing-details.PNG)


3.	Flight Payment Stage1:Once we have selected our desired flight we are redirected to payment stage 1 where we select the ticket type
![Flight Payment Stage1](/Images/flight-payment-stage1.PNG)

4.	Flight Payment Stage2:Once we have selected our tcket type we are redirected to payment stage 2 where we enter the user details like name, email, contack and proceed 
![Flight Payment Stage2](/Images/flight-payment-stage2.PNG)

5. Automation testing: We have performed automating testing with help of cypress where we simulate a user and run through our website to test various scenarios.
![Automation Testing 1](/Images/Automation-Testing1.PNG)

### How to run the frontend application: -
npm install
-- This will install all the necessary node modules.

ng serve
This will start the webserver.

Backend: -

4. Search Button API call implementation to retrieve search results from the user which is the major API on the Homepage of the Flights section

5. Airport Search API that would be needed to check for the various airports based on the user input before the search button could be clicked.

6. Database setup and configuration with the APIs using gorm in GOlang to store and retrieve the results after a request is received by hitting the API.

7. Verifying the API request and response mechanisms by testing using Postman and hosting on a localserver using GOlang.

### How to run the backend application: -
go build
-- This will build all the existing go files in the src folder.

go run main.go
-- Sets up and hosts the APIs on a localhost server and also eshtablishes connection to the database.


### Demo video link
Demo - https://www.youtube.com/watch?v=iezFnKQA6Ts

