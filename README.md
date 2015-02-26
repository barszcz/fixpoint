# [Fixpoint](http://fixpoint.jfbarszcz.com)

Fixpoint is a [React.js](http://facebook.github.io/react)-based [Hacker News](http://news.ycombinator.com) reader.

## Features

- Fully single-page
- Implements front page and story comments page functionality
- Updates in real-time
- Front page is searchable/filterable
- Fast as heck, thanks to React's virtual DOM diffing engine

## Technical Details
- In addition to React, uses the [react-mini-router](https://github.com/larrymyers/react-mini-router) and [Moment.js](http://momentjs.com) libraries
- Uses HN's Firebase API as its backend, allowing the app to be hosted on Github Pages
- Real-time updates were easy to implement thanks to Firebase's architecture and the [ReactFire](https://github.com/firebase/reactfire) hooks for React

## TODO
- User pages
- Front page pagination
- Correct comment counts (currently only shows top-level comment count, since I didn't feel like writing an async recursive algorithm to traverse the comment tree)