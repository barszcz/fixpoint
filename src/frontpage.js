var HN = require('./hn');
var Headline = require('./headline');

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
				{stories}
			</div>
			);
	}

});

module.exports = FrontPage;