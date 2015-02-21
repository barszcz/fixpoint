var RouterMixin = require('react-mini-router').RouterMixin;
// var DefaultRoute = Router.DefaultRoute;
// var Link = Router.Link;
// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;
var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;

var FrontPage = require('./frontpage');
var Story = require('./story');

var App = React.createClass({

	mixins: [RouterMixin],

	routes: {
		'/': 'frontPage',
		'/:itemId': 'story'
	},

	render: function() {
		// var Handler = this.getRouteHandler();
		return (
			<div>
				<header>
					<h1><a href="/">Fixpoint</a></h1>
				</header>
				<TransitionGroup transitionName="fade">
					{this.renderCurrentRoute()}
				</TransitionGroup>
			</div>
		);
	},

	frontPage: function() {
		return <FrontPage key={0}/>;
	},

	story: function(itemId) {
		return <Story storyId={itemId} key={itemId}/>
	}

});

// var routes = (
// 	<Route name="app" path="/" handler={App}>
// 		<Route name="story" path=":itemId" handler={Story}/>
// 		<DefaultRoute handler={FrontPage}/>
// 	</Route>
// 	);


// Router.run(routes, function(Handler) {
	React.render(<App/>, document.body);
// });