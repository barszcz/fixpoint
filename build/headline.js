var HN = require('./hn');

var Headline = React.createClass({displayName: "Headline",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {story: {} };
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "story");
	},

	render: function() {
		var story = this.state.story;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.storyId;
		var commentsCount = story.kids ? story.kids.length : 0;
		var url = story.url || commentsUrl;
		return (
			React.createElement("div", {className: "frontpage-story"}, 
				React.createElement("h3", null, React.createElement("a", {href: url, target: "_blank"}, story.title)), 
				React.createElement("p", null, "Submitted by ", story.by, " - ", story.score, " points - ", React.createElement("a", {href: commentsUrl, target: "_blank"}, commentsCount, " comments"))
			)
		);
	}
});

module.exports = Headline;