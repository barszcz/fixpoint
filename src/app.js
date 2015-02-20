var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = require('./hn');

var FrontPage = require('./frontpage');

var App = React.createClass({

	render: function() {
		return (
			<div>
				<header>
					<h1>Fixpoint</h1>
				</header>

				<RouteHandler/>
			</div>
		);
	}

});

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={FrontPage}/>
	</Route>
	);


Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler/>, document.body);
});