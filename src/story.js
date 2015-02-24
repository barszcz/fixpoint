var React = require('react');
var HN = require('./hn');
// var TransitionGroup = React.addons.CSSTransitionGroup;
var Comment = require('./comment');
var InfoLine = require('./infoline');

var Story = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.itemId), "data")
	},

	componentDidMount: function() {
		window.scroll(0,0);
	},

	render: function() {
		var data = this.state.data;
		var x = 3;
		var commentsCount = data.kids ? data.kids.length : 0;
		var comments = data.kids && data.kids.map(function(id) {
			return (
				<Comment key={id} itemId={id}/>
			);
		});

		// dangerouslySetInnerHTML because I'm trusting HN's API, this is a test
		return (
				<div className="story">
					<h2>{data.title}</h2>
					<InfoLine data={data} />
					<p dangerouslySetInnerHTML={{__html: (data.text || "")}} />
					<h3>Comments</h3>
					{comments}
				</div>
		);
	}

});

module.exports = Story;