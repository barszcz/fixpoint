var Moment = require('moment');

var InfoLine = React.createClass({displayName: "InfoLine",

	getDefaultProps: function() {
		return { isComment: false };
	},

	render: function() {
		var data = this.props.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var time = Moment.unix(data.time).fromNow();

		if (this.props.isComment) {
			return (
				React.createElement("h4", null, React.createElement("strong", null, data.by), " ", time, " ")
			);
		} else {	
			return (
				React.createElement("h4", null, "Submitted by ", React.createElement("strong", null, data.by), " ", time, " - ", data.score, " points - ", React.createElement("a", {href: data.id}, commentsCount, " comments"))
			);
		}
	}

});

module.exports = InfoLine;