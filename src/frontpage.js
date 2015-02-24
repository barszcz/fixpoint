var React = require('react');
var HN = require('./hn');
var Headline = require('./headline');
// var TransitionGroup = React.addons.CSSTransitionGroup;

var FrontPage = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {topstories: []};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "topstories");
	},
	
	render: function() {
		
		var stories = this.state.topstories.map(function(id) {
			// var story = HN.child("item").child(id);
			return (
				<Headline key={id} itemId={id}/>
			);
		});
		
		return (
			<div>
				{stories}
			</div>
			);
	}

});

module.exports = FrontPage;