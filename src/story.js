var HN = require('./hn');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Story = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "data")
	},

	render: function() {
		return (
				<div>
					<h1>{this.state.data.title}</h1>
					// I'm trusting HN to not send down malicious HTML
					<p dangerouslySetInnerHTML={{__html: (this.state.data.text || "")}} />
				</div>
		);
	}

});

module.exports = Story;