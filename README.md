# Population Management API



An simple application for managing population data 

# Description

**** is a backend application built with node Express and mongo

# Table of Contents

- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Database and ORM](#database-and-orm)
- [Testing](#testing)
- [License](#license)

## Setup


### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
[MongoDB](https://www.mongodb.com//) - A non SQL database management system 
- [Mongoose](https://mongoosejs.com) - A promise-based ORM for Mongo NodeJS


### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Install and setup [MongoDB](https://www.mongodb.com//)

- Clone the repository by running the command
  ```
  git clone https://github.com/hope-uwa/Population
  -Management-System.git```
- Run `cd Population-Management-System` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  yarn install or npm install
  ```
- Create a `.env` file in the root of your directory using the `.env.example` file in the repository

- To start the app on localhost run `yarn run dev or npm run dev`

# API Endpoints

<table>

<tr><th>VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>




<tr><td>POST</td> <td>api/v1/locations</td> <td> Add a location</td></tr>

<tr><td>DELETE</td> <td>api/v1/locations/:locationId</td> <td>Delete a location</td></tr>

<tr><td>GET</td> <td>api/v1/locations/:locationId</td> <td>Get a location</td></tr>

<tr><td>PUT</td> <td>api/v1/locations/:locationId</td> <td>Update a location</td></tr>

<tr><td>GET</td> <td>api/v1/locations/:locationId/tree/</td> <td>Get the tree of a location</td></tr>

</table>
