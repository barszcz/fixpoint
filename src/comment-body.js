var React = require('react');

var CommentBody = React.createClass({

	render: function() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.text}}/>
		);
	}

});

module.exports = CommentBody;