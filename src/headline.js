var HN = require('./hn');

var Headline = React.createClass({

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
			<div className="frontpage-story">
				<h3><a href={url} target="_blank">{story.title}</a></h3>
				<p>Submitted by {story.by} - {story.score} points - <a href={commentsUrl} target="_blank">{commentsCount} comments</a></p>
			</div>
		);
	}
});

module.exports = Headline;