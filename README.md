# Bookworm Library App
An app that lets you keep track of the books you're reading. Inspired by an [Odin Project assignment](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library). This is my first full-stack application :)

![Demo image showing a sample library](/demo.png)

## Features
- Client side: Add/edit/delete books, switch between different "shelves" or libraries
- Server side: Save users/libraries/books to database. Authenticate users and API routes using [Auth0](https://auth0.com/docs/libraries#introduction).
- Sign in with a username and password, or with a Google login
- Protected API routes (`/api/book`, `/api/library`, `/api/user`) setup with Express, to add/edit/delete books and libraries, and get user data (see `/server/routes   ` folder)
- Icons from Font Awesome

### Stack / Technologies used
- Server: Node.js and Express
- Database: MongoDB
- Client: React and Typescript
- Authentication: Auth0

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---
## Setup/build
You will need to first setup MongoDB and Auth0, as well as the relevant Environment Variables:

(todo)

Then, you can run the following scripts.

### In the root directory:

#### `npm install`
Installs the necessary dependencies for the server app.

#### `npm start`
Starts the Express server.

### In the `/client` directory:

#### `npm install`
Installs the necessary dependencies for the client app.

#### `npm start`

Runs the client app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

