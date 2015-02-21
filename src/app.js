var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = require('./hn');
var TransitionGroup = require('./timeout-transition-group');

var FrontPage = require('./frontpage');
var Story = require('./story');

var App = React.createClass({

	mixins: [Router.RouteHandlerMixin],

	render: function() {
		// var Handler = this.getRouteHandler();
		return (
			<div>
				<header>
					<h1><Link to="app">Fixpoint</Link></h1>
				</header>
				<TransitionGroup enterTimeout={5000} leaveTimeout={5000} transitionName="fade">
					<RouteHandler/>
				</TransitionGroup>
			</div>
		);
	}

});

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="story" path=":itemId" handler={Story}/>
		<DefaultRoute handler={FrontPage}/>
	</Route>
	);


Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.body);
});