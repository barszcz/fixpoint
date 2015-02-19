var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = new Firebase("https://hacker-news.firebaseio.com/v0");

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
			React.createElement("div", null, 
				React.createElement("h3", null, React.createElement("a", {href: url, target: "_blank"}, story.title)), 
				React.createElement("p", null, "Submitted by ", story.by, " - ", story.score, " points - ", React.createElement("a", {href: commentsUrl, target: "_blank"}, commentsCount, " comments"))
			)
		);
	}
})

var routes = (
	React.createElement(Route, {name: "app", path: "/", handler: App}, 
		React.createElement(DefaultRoute, {handler: FrontPage})
	)
	);


Router.run(routes, function(Handler) {
	React.render(React.createElement(Handler, null), document.body);
});

// module.exports = {App: App, FrontPage: FrontPage, Headline: Headline}