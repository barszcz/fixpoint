var HN = require('./hn');
var Router = window.ReactRouter;
var TransitionGroup = require('./timeout-transition-group');

var Story = React.createClass({displayName: "Story",

	mixins: [ReactFireMixin, Router.State],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		var id = this.getParams().itemId;
		this.bindAsObject(HN.child("item").child(this.getParams().itemId), "data")
	},

	render: function() {
		return (
			React.createElement(TransitionGroup, {enterTimeout: 5000, leaveTimeout: 5000, transitionName: "fade"}, 
				React.createElement("div", null, 
					React.createElement("h1", null, this.state.data.title)
				)
			)
		);
	}

});

module.exports = Story;