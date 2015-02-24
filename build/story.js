var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;
var Comment = require('./comment');
var InfoLine = require('./infoline');

var Story = React.createClass({displayName: "Story",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.itemId), "data")
	},

	render: function() {
		var data = this.state.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var comments = data.kids && data.kids.map(function(id) {
			return (
				React.createElement(Comment, {key: id, itemId: id})
			);
		});

		// dangerouslySetInnerHTML because I'm trusting HN's API
		return (
				React.createElement("div", {className: "story"}, 
					React.createElement("h2", null, data.title), 
					React.createElement(InfoLine, {data: data}), 
					React.createElement("p", {dangerouslySetInnerHTML: {__html: (data.text || "")}}), 
					React.createElement("h3", null, "Comments"), 
					comments
				)
		);
	}

});

module.exports = Story;