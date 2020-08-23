# Redux Jest Playground
A playground for unit testing a hypothetical bug-tracking `redux` app using `jest`. All API calls have been mocked using `axios-mock-adapter`. I have the code for the real `express` server that is supposed to run in the backend.

## File Structure

```
src
├── index.js             
├── math.js               
├── math.spec.js             
└── store
    ├── api.js
    ├── bugs.js
    ├── configureStore.js
    ├── entities.js
    ├── members.js
    ├── middleware
    │   ├── api.js
    │   ├── logger.js
    │   └── toastify.js
    ├── projects.js
    ├── reducer.js
    └── tests
        └── bugs.spec.js
```

### Important Files


| File | Description |
|--|--|
| `index.js` | Entry Point for the app |
| `math.js` | Dummy module that performs basic math functions  |
| `math.spec.js` | Tests said dummy module |
| `api.js ` | Registers the actions to be used by the `api` middleware |
| `bugs.js ` | Redux Slice for performing various CRUD operations on Bugs. Also includes a handful of selectors and other functions |
| `bugs.spec.js ` | Tests the reducers, selectors and other functions from `bugs.js` |


### Instructions

1. Installing dependencies
In order to run the app, run the following in the terminal,

```
npm i
```

2. Running `jest`

Simply run, 

```
npm run test
```

which will launch jest and reload automatically on any changes made to the codebase.

For starters, you can familiarize yourself to the workflow by adding some more functions to `math.js` and writing tests for them in `math.spec.js`.

If you want to move to the `redux` part of the application, an easy place to start would be the `bugs.js` module. Try to reach 100% coverage if you can! 😁

To run the `redux` app and `jest` `concurrently`, run 

```
npm run dev
```
 
in the terminal. Really helps to debug while testing.
