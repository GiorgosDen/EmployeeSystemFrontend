# EmployeeSystemFront
This repository has the React page from the Employee System project. The Employee System project represents a simple app to manage the employees of a company, and this repository has the frontend program where the user can interact with the system, but without the 2 other parts this "page" is useless.

## About Front
This project was developed in Visual Studio Code using the Vite with typescript. The page is not a big deal, but it serves the main goal which is the provide a functional page to use APIs from Back, that interact with the database. In other words, this repository has a page which is a piece of a bigger project. 

This page has been used  by 3 user types: The Director, the Assistant, and the User. These roles have a hierarchy with the Director on top, after the Assistant, and at the end the User. When a user logs in, has 2 minutes to manage the employees until must re-login again. 

The System's functions in association with the roles are:
View Employee List: Every user has the permission
Add a new Employee: The Director and Assistant have the permission
Update an existing Employee: The Director and Assistant have permission
Delete an existing Employee: Only the Director has permission

The page runs locally at the address: http://localhost:5173/.

## Notes
The system has some imperfections as the timer which stops if the user changes the page and allows to add freely employee data, but these issues will be fixed soon.
