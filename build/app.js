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