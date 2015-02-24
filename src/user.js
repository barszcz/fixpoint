var React = require('react');
var HN = require('./hn');

var User = React.createClass({

	mixins: [ReactFireMixin],

	componentWillMount: function() {
		this.bindAsObject(HN.child("user").child(this.props.userId), "data");
	},

	render: function() {
		return (
			<div className="user">
				<h2>
					{this.props.userId}
				</h2>
			</div>
		);
	}

});

module.exports = User;