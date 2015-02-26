var React = require('react/addons');
var RouterMixin = require('react-mini-router').RouterMixin;
var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;
window.React = React;

var FrontPage = require('./frontpage');
var Story = require('./story');
var User = require('./user');

var App = React.createClass({

	mixins: [RouterMixin],

	routes: {
		'/': 'frontPage',
		'/:itemId': 'story',
		'/user/:userId': 'user',
	},

	// getInitialState: function() {
	// 	return {
	// 		mounted: false
	// 	};
	// },

	// componentDidMount: function() {
	// 	this.setState({
	// 		mounted: true
	// 	});
	// },

	render: function() {
		var child;
		// if (this.state.mounted) {
		// 	child = this.renderCurrentRoute();
		// }
		return (
			<div>
				<header>
					<h1><a href="#">Fixpoint</a></h1>
				</header>
				<main>
					{this.renderCurrentRoute()}
				</main>
			</div>
		);
	},

	frontPage: function() {
		return <FrontPage key="frontPage"/>;
	},

	story: function(itemId) {
		return <Story itemId={itemId} key="story"/>
	},

	user: function(userId) {
		return <User userId={userId} key={userId}/>
	},

});

React.render(<App />, document.body);