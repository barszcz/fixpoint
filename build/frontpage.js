var HN = require('./hn');
var Headline = require('./headline');
var TransitionGroup = React.addons.CSSTransitionGroup;


var FrontPage = React.createClass({displayName: "FrontPage",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {topstories: []};
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
			React.createElement(TransitionGroup, {transitionName: "fade"}, 
				stories
			)
			)
			);
	}

});

module.exports = FrontPage;