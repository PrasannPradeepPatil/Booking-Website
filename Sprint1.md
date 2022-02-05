# Booking Website

## Sprint 1

### Group Members:
- Pranali Suhas Narkar
- Prasann Pradeep Patil
- Manish Alluri
- Ahamad Shaik


### Sprint 1 overview

In the first sprint, we have created the "Flights" page which consists of header section, flights search box and the flights listing page.

User Stories Dashboard for Sprint 1: -
https://github.com/PrasannPradeepPatil/Booking-Website/projects/1?card_filter_query=label%3A%22sprint+1%22



### Completed Features: -
1. Header Section: We have added navbar for header section of our website which has links to Flights, Hotels and Car rentals page.

![Header](/Images/Header.PNG)

2. Flight Search Box: We have added Search box which will take inputs namely source airport, destination, type of trip, start and end date.

![Flight Search Box](/Images/Flight-search.PNG)


3.	Flight Listing: Based on user input in the Flight Search Box, flight listing is displaying which consists of cost, source, destination, start time and end time.

![Flight Listing](/Images/Flight-Listing.PNG)


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


### How to run the frontend application: -
npm install
-- This will install all the necessary node modules.

ng serve
This will start the webserver.

### How to run the backend application: -
go build
-- This will build all the existing go files in the src folder.

go run main.go
-- Sets up and hosts the APIs on a localhost server and also eshtablishes connection to the database.


### Demo video link
Frontend - https://youtu.be/TrescVcsmzU

Backend - https://tinyurl.com/2s48k6b4
