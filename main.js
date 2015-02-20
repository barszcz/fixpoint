(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = require('./hn');

var FrontPage = require('./frontpage');

var App = React.createClass({displayName: "App",

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("header", null, 
					React.createElement("h1", null, "Fixpoint")
				), 

				React.createElement(RouteHandler, null)
			)
		);
	}

});

var routes = (
	React.createElement(Route, {name: "app", path: "/", handler: App}, 
		React.createElement(DefaultRoute, {handler: FrontPage})
	)
	);


Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(React.createElement(Handler, null), document.body);
});
},{"./frontpage":2,"./hn":4}],2:[function(require,module,exports){
var HN = require('./hn');
var Headline = require('./headline');

var FrontPage = React.createClass({displayName: "FrontPage",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return { topstories: []};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "topstories");
	},
	
	render: function() {
		
		var stories = this.state.topstories.map(function(id) {
			var story = HN.child("item").child(id);
			return (
				React.createElement(Headline, {key: id, storyId: id})
			);
		});
		
		return (
			React.createElement("div", null, 
				stories
			)
			);
	}

});

module.exports = FrontPage;
},{"./headline":3,"./hn":4}],3:[function(require,module,exports){
var HN = require('./hn');

var Headline = React.createClass({displayName: "Headline",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {story: {} };
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "story");
	},

	render: function() {
		var story = this.state.story;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.storyId;
		var commentsCount = story.kids ? story.kids.length : 0;
		var url = story.url || commentsUrl;
		return (
			React.createElement("div", {className: "frontpage-story"}, 
				React.createElement("h3", null, React.createElement("a", {href: url, target: "_blank"}, story.title)), 
				React.createElement("p", null, "Submitted by ", story.by, " - ", story.score, " points - ", React.createElement("a", {href: commentsUrl, target: "_blank"}, commentsCount, " comments"))
			)
		);
	}
});

module.exports = Headline;
},{"./hn":4}],4:[function(require,module,exports){
module.exports = new Firebase("https://hacker-news.firebaseio.com/v0");
},{}]},{},[1]);
