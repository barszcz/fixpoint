var HN = require('./hn');
var Router = window.ReactRouter;
var TransitionGroup = require('./timeout-transition-group');

var Story = React.createClass({

	mixins: [ReactFireMixin, Router.State],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		var id = this.getParams().itemId;
		this.bindAsObject(HN.child("item").child(this.getParams().itemId), "data")
	},

	render: function() {
		return (
			<TransitionGroup enterTimeout={5000} leaveTimeout={5000} transitionName="fade">
				<div>
					<h1>{this.state.data.title}</h1>
				</div>
			</TransitionGroup>
		);
	}

});

module.exports = Story;