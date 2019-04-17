This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Navigate to root directory of app, and run `yarn install` (or `npm install`)

## To run the app

From the root of the app, run `yarn start` (or `npm start`) and navigate to http://localhost:3000/

## Best practive questions

1. How would you improve your state management as you add new stateful components such as customer
information and charts?

This really depends on how the app evolves. If we use something like graphql/relay, the state we have to manage is relatively simple (possibly just a user token or id), with user specific data being declaratively specified in individual components, and response data being managed by the relay store.

For a non-graphql implementation, we would probably need to manage larger, more nested data structures manually. For this, there are a few
options, but most involve a centralized store of some sort (e.g. redux) that individual components can "connect" to.

Assuming no server rendering, this would look something like this:
- On load, the client reads a user token from a cookie or local storage
- The client uses this token to request user-specific data from the server, and feeds this data to the component tree
- The store is populated with the data provided in the response
- The store might be need to be updated in response to user actions. For example, a user clicks a button that opens a charts. This can be achieved using "actions" in flux implementations, or, in other implementations, something like a setter or direct write
- Some actions might cause the UI to need additional data from the server. At this point, if you're using redux, you'll want to use thunks or sagas to coordinate user actions and corresponding data fetching
- Other actions might require writes to the server. Ideally, the response from these write requests will provide data to update the client's store and keep it in sync with server state. This would also be a use case for thunks and/or sagas.

2. How would you organize your styles as your application grows?

The technique I'm most familiar with is to couple components with their respective styles, which I am already doing. However there are a few things that would improve readability, enforce standardization, and limit the size of generated css assets:

Short-term improvements:
- Use SCSS (or something similar). This allows developers to set variables and import shared styles when necessary. The immediate impact is improved readability and expressiveness
- Centralize colors, fonts, spacing, and other styles that need to be standardized across the application. This can be achieved using SCSS variables and mixins, which are imported by components' SCSS files
- Use something like webpack-extract-text-plugin that traverses the component tree and compiles css assets using only css files that are referenced in components. This prevents unused styles from bloating generated css assets. If we need multiple entry points for our app for different pages, this would also help us generate css files for each page that do not include styles from other pages.

Medium/long-term improvements
- Use webpack (or something similar) code chunking to lazy load components and their respective styles. This can reduce the size of the css assets sent to the client on page load, which in turn reduces time the app takes to become responsive to user actions. Low-hanging fruit for lazy loading includes components that initially render "below the fold" (i.e. outside the viewport) and components that are only needed after specific user actions (e.g. a modal that opens when the user clicks a button)
