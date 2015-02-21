var HN = require('./hn');
var Headline = require('./headline');
var TransitionGroup = require('./timeout-transition-group');


var FrontPage = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return { topstories: []};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "topstories");
	},
	
	render: function() {
		
		var stories = this.state.topstories.map(function(id) {
			var story = HN.child("item").child(id);
			return (
				<Headline key={id} storyId={id}/>
			);
		});
		
		return (
			<div>
			<TransitionGroup enterTimeout={5000} leaveTimeout={5000} transitionName="fade">
				{stories}
			</TransitionGroup>
			</div>
			);
	}

});

module.exports = FrontPage;