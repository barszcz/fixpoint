var React = require('react/addons');
var RouterMixin = require('react-mini-router').RouterMixin;
var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;

var FrontPage = require('./frontpage');
var Story = require('./story');
var User = require('./user');

var App = React.createClass({

	mixins: [RouterMixin],

	routes: {
		'/': 'frontPage',
		'/:itemId': 'story',
		'/user/:userId': 'user'
	},

	render: function() {
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

	user: function(userId) {
		return <User userId={userId} key={userId}/>
	},

});

React.render(<App/>, document.body);