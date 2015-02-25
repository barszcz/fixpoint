var React = require('react');
var HN = require('./hn');
var InfoLine = require('./infoline');


var Headline = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: this.props.initialData || {}};
	},

	componentWillMount: function() {
		var firebase = HN.child("item").child(this.props.itemId);
		firebase.once("value", function(res) {
			var data = res.val();
			this.props.onMount(this.props.itemId, data)
		}.bind(this));
		this.bindAsObject(firebase, "data");
	},

	commentsCount: function() {
		var queue = this.state.data.kids || [];
		var count = 0;
		while (queue.length > 0) {
			var next = HN.child("item").child(queue.shift());
			queue.concat(next.kids);
			count++;
		}
		return count;
	},

	render: function() {
		var data = this.state.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.itemId;
		var url = data.url || commentsUrl;
		var domain = url.match(/https?:\/\/([^\/]+)/)[1];

		return (
			<div className="frontpage-story">
				<h2 className="score">{data.score}</h2>
				<h3><a href={url} target="_blank">{data.title}</a> ({domain})</h3>
				<InfoLine data={data} />
			</div>
		);
	}
});

module.exports = Headline;