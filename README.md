# Xtra: a non-exploitative Medium

`iHaveNoIdeaWhatImDoingDog.gif`

* client must be run at localhost:3000 for authentication to work.
* client expects server to run at localhost:8888. that is set as its proxy.

## Project Status

### Authentication:

Currently using Auth0 for authentication.

Callback (`./containers/profile/SignInCallback`) functions for _the most part_. When a SignIn() action/reducer is fired (right now this takes place in `./containers/nav/metanav/MetaNavContainer.js`) the user is sent to Auth0 to be authorized. They are returned to the SignInCallback component by Auth0 and are checked against the Mongo `people` collection to see if they are a new user. The check is made with the unique profile.sub, which is returned from Auth0. If they are new, they are presented with a form to enter a username, which must be unique as it is used in the URI for posts (xtra.org/@:user/:story). If they pick a username that already exists in the collection, they will get an error message and can try again. If they pick a new username, they will obviously get a success message, have their information submitted to the database, and set in state.

**A couple things that need to happen:**

1. the JWT returned by Auth0 is already logged in the database, but there needs to be a mechanism to check their current tokens against the expected tokens stored in MongoDB when the user tries to submit or access privileged information. I'm not so concerned about spoofing as long as it doesn't touch the server. However, if client tokens don't match the server tokens users should have their profile state removed from redux, and the persistantState removed from localStorage. Currently tokens are checked for validity in the `./util/store.js` using a middleware I crudely authored. This is also where state is set to localStorage and where rehydration takes place (following a tutorial by Dan Abramov).

2. `./containers/profile/SignInCallback.js` does not fully use the action/reducer for profiles. This means there is a duplicate instantiation of the class Auth0 provides for authentication. It doesn't break anything, but it's ugly and against best practices and needs to be refactored.

### Containers

#### home/Home.js

Very simple. Renders two different sets of components based on user status (logged in / logged out). Note that if anything gets fucked up in localstorage, i have gotten undefined errors in the app. Clearing local storage fixes it, but there should clearly be additional handling to prevent this from happening.

#### nav/metanav and nav/topicnav

Metanav and Topicnav also have conditional logic based on user status. Metanav provides log in and log out functionality, as well as the withRouter link to create a new story. TopicNav is just a simple navigation element. In the future I would like it to organize stories by Topic. I have not developed any handling for topics because I don't want to dig a deep hole for no reason, but I am trying to make space for it in terms of client architecture.

#### profile/SignInCallback and profile/SignOutCallback

I wrote about these in **Authentication** section (above). The only thing I would add is that all usage of `profile` on the react side is to designate a `person` who is logged in. There is no `profile` designation on the Express side.   

#### story/...

`StoryCreateContainer.js` is where I have put most of my energy.

`StoryContainer.js` and its associated components and API calls to Express are outdated, but the authoring is really nice. Currently it stores draft to localStorage and recalls them, but there is no submission coded for sending to Express yet.

`TextMenuContainer.js` is the popup menu that appears when a user highlights text in the editor (Medium style).

Emojis are really cool but can not be inserted inline into a headline element and I do not know why.

There is also drag and drop support for images. Images are saved as data objects in redux and persist in localStorage. I do not know if it is acceptable to store images as data in MongoDB, but I assume not.

#### people/...

There is no container for people handling. All that exists are the outdated components.

### Components

The only components that I am happy with are `./components/messages/*` and `./components/profile/CreateUsername.js`. Both people and stories components need to be refactored as containers. However, they are still hooked up to router, and function in a very basic way.

### Util

* `localstorage.js` handles setting to localStorage and rehydrating state from it.
* router is pretty basic
* store is also pretty basic, except for its calls to `localstorage.js` & the middleware I wrote to authenticate users. The reasoning behind writing this logic as middleware is that I don't want to have to call authentication actions/reducers in every component, and I don't want to have to pass these down as ...props from the router, either. I am lazy and that looks really ugly.

### Storybook
I have been playing around with Storybook and have made a couple stories for the app. I still don't really know how to use Jest or test my stories at all.
