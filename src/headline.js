var React = require('react/addons');
var HN = require('./hn');
var InfoLine = require('./infoline');


var Headline = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		var firebase = HN.child("item").child(this.props.itemId);
		this.bindAsObject(firebase, "data");
	},

	_commentsCount: function() {
		// not currently in use, may rewrite as DFS
		var queue = this.state.data.kids || [];
		var count = 0;
		while (queue.length > 0) {
			var next = HN.child("item").child(queue.shift());
			queue.concat(next.kids);
			count++;
		}
		return count;
	},

	_shouldHide: function() {
		if (this.state.data === {}) return true;
		var str = this.props.searchString;
		if (str === '') return false;
		var re = new RegExp(str, 'i');
		return (this.state.data.title.search(re) === -1);
	},

	render: function() {
		var data = this.state.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.itemId;
		var url = data.url || commentsUrl;
		var domain = url.match(/https?:\/\/([^\/]+)/)[1];

		var cx = React.addons.classSet;

		var classes = cx({
			'frontpage-story': true,
			'hide': this._shouldHide()
		})

		return (
			<div className={classes}>
				<h2 className="score">{data.score}</h2>
				<h3><a href={url} target="_blank">{data.title}</a> ({domain})</h3>
				<InfoLine data={data} />
			</div>
		);
	}
});

module.exports = Headline;