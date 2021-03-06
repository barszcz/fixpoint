var React = require('react');
var Moment = require('moment');

var InfoLine = React.createClass({

	getDefaultProps: function() {
		return { isComment: false };
	},

	render: function() {
		var data = this.props.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var time = Moment.unix(data.time).fromNow();
		var parent = data.parent && <a href={data.parent}>(parent)</a>;

		if (this.props.isComment) {
			return (
				<h4><strong>{data.by}</strong> <a href={data.id}>{time}</a> </h4>
			);
		} else {	
			return (
				<h4>Submitted by <strong>{data.by}</strong> <a href={data.id}>{time}</a> - {data.score} points - <a href={data.id}>{commentsCount} comments</a> {parent}</h4>
			);
		}
	}

});

module.exports = InfoLine;