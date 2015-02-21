var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = require('./hn');
var TransitionGroup = require('./timeout-transition-group');

var FrontPage = require('./frontpage');
var Story = require('./story');

var App = React.createClass({displayName: "App",

	mixins: [Router.RouteHandlerMixin],

	render: function() {
		// var Handler = this.getRouteHandler();
		return (
			React.createElement("div", null, 
				React.createElement("header", null, 
					React.createElement("h1", null, React.createElement(Link, {to: "app"}, "Fixpoint"))
				), 
				React.createElement(TransitionGroup, {enterTimeout: 5000, leaveTimeout: 5000, transitionName: "fade"}, 
					React.createElement(RouteHandler, null)
				)
			)
		);
	}

});

var routes = (
	React.createElement(Route, {name: "app", path: "/", handler: App}, 
		React.createElement(Route, {name: "story", path: ":itemId", handler: Story}), 
		React.createElement(DefaultRoute, {handler: FrontPage})
	)
	);


Router.run(routes, function(Handler) {
	React.render(React.createElement(Handler, null), document.body);
});