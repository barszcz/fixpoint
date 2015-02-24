var HN = require('./hn');
var InfoLine = require('./infoline');


var Headline = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {story: {}};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.itemId), "story");
	},

	commentsCount: function() {
		var queue = this.state.story.kids || [];
		var count = 0;
		while (queue.length > 0) {
			var next = HN.child("item").child(queue.shift());
			queue.concat(next.kids);
			count++;
		}
		return count;
	},

	render: function() {
		var story = this.state.story;
		var commentsCount = story.kids ? story.kids.length : 0;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.itemId;
		var url = story.url || commentsUrl;
		var domain = url.match(/https?:\/\/([^\/]+)/)[1];

		return (
			<div className="frontpage-story">
				<h3><a href={url} target="_blank">{story.title}</a> ({domain})</h3>
				<InfoLine data={story} />
			</div>
		);
	}
});

module.exports = Headline;