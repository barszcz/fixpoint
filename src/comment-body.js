var React = require('react');

var CommentBody = React.createClass({

	render: function() {
		return (
			// dangerouslySetInnerHTML because I'm trusting HN's API
			<div dangerouslySetInnerHTML={{__html: this.props.text}}/>
		);
	}

});

module.exports = CommentBody;