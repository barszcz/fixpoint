var RouterMixin = ReactMiniRouter.RouterMixin;
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
		'/:itemId': 'story',
	},

	render: function() {
		// var Handler = this.getRouteHandler();
		return (
			<div>
				<header>
					<h1><a href="/">Fixpoint</a></h1>
				</header>
				<main>
				<TransitionGroup transitionName="fade">
					{this.renderCurrentRoute()}
				</TransitionGroup>
				</main>
			</div>
		);
	},

	frontPage: function() {
		return <FrontPage key={0}/>;
	},

	story: function(itemId) {
		return <Story itemId={itemId} key={itemId}/>
	},

	// user: function(userId) {
	// 	return <User userId={userId} key={userId}/>
	// };

});

React.render(<App/>, document.body);