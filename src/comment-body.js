var React = require('react/addons');

var CommentBody = React.createClass({

	render: function() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.text}}/>
		);
	}

});

module.exports = CommentBody;