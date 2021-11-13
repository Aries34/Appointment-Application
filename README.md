# ------------------APPOINMENT APPLICATION------------------
- Appointment Application is a sophisticated web service that allows a user to book an appoinment with an organisation. It also allows multiple organisations to create time slots for their clients.

## What the API does
---
- Allows organizations to create a time slot for an appoinment 
- Allows clients to book an appointment corresponding to the time slot provided by the organisation

## Entities(Roles) 
- organisation
- client


## What an organisation can do
- Create an account
- Perform CRUD operations on times slots
- View bookings by clients 

## What a client can do
- Create an account
- View all time slots created by organisations
- Book an appointment with an organisation

## Technology, Tools, Programming language, frameworks used:
---
- Java Script
- Node JS
- Postman 
- MongoDB
- NPM modules:
   - jsonwebtoken
   - express
   - mongodb
   - mongoose
   - validator
   - bcrypt

## Third-party Web-services:

- [Sendgrid Email Delievery Service](www.sendgrid.com)

## ENDPOINTS
---

## Organization
 - POST: Create account -> /api/v1/user
 - POST: User login -> /api/v1/userLogin
 - GET: View user profile details ->/api/v1/user/me  ***NOTE: (PATCH AND DELETE) to perform other crud operations on this endpoint***
 - POST: Create time slot -> /api/v1/slot
 - GET: Get or fetch all time slot -> /api/v1/slot || /api/v1/slot/:id
 - PATCH: Update time slot created -> /api/v1/slot/:id
 - DELETE: Delete time slot created -> /api/v1/slot/:id
 - GET: View bookings by client -> /api/v1/books
 - POST: Logout from current account -> /api/v1/userLogout

## Client
- POST: Create account -> /api/v1/user
- POST: User login -> /api/v1/userLogin
- GET: View user profile details ->
- GET: Get or fetch all time slot -> /api/v1/slot || /api/v1/slot/:id
- POST: Creat an appointment -> /api/v1/slot/book/:id ***NOTE: YOU HAVE TO FETCH AN ID FROM A SPECIFIC SLOT***
- POST: Logout from current account -> /api/v1/userLogout



>> Created with love by Deezy