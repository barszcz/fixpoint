var React = require('react/addons');
var Moment = require('moment');

var InfoLine = React.createClass({

	getDefaultProps: function() {
		return { isComment: false };
	},

	render: function() {
		var data = this.props.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var time = Moment.unix(data.time).fromNow();

		if (this.props.isComment) {
			return (
				<h4><strong>{data.by}</strong> {time} </h4>
			);
		} else {	
			return (
				<h4>Submitted by <strong>{data.by}</strong> {time} - {data.score} points - <a href={data.id}>{commentsCount} comments</a></h4>
			);
		}
	}

});

module.exports = InfoLine;