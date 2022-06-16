# Notes App UI

Notes App UI is a application for creating, removing, listing and reading notes.

## Requirements

Uses
* Node v18.1.0
* npm v8.8.0.
* React v18.1.0
* Webpack v5.73.0
* Babel v7.18.5

## Useful Node commands

The project makes use of node and its package manager to help you out carrying some common tasks such as building the project or running it.

### Install dependencies

```
$ npm install
```

### Run the tests

```
$ npm test
```

### Build the application

```
$ npm run build
```

### Run the application

```
$ npm start
```

## Starting the app

Notes App UI uses [Notes App web application](https://github.com/SamMolina/note-app) as backend. For ensuring a correct execution, it is necessary to start it locally.

Befor running the npm start command is necessary to run the build command.

## Components

Notes App UI uses [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) components and custom components using [Styled Components](https://styled-components.com/docs). For further reference visit the documentation.

## Routing

Notes App UI uses Client Side Rendering with the library [react-router-dom](https://www.npmjs.com/package/react-router-dom). The routes are defined inside App component, and the navigation bar inside of NavBar component.

## Testing

At the present, Notes App UI has only unit tests, and uses: [jest](https://jestjs.io/) as testing framework with [react testing library](https://testing-library.com/docs/) for testing UI components.
