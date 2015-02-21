var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Story = React.createClass({displayName: "Story",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "data")
	},

	render: function() {
		return (
				React.createElement("div", null, 
					React.createElement("h1", null, this.state.data.title), 
					React.createElement("p", {dangerouslySetInnerHTML: {__html: (this.state.data.text || "")}})
				)
		);
	}

});

module.exports = Story;