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
		document.title = this.state.data.title + " | Fixpoint";
	},

	render: function() {
		var data = this.state.data;
		var commentsCount = data.kids ? data.kids.length : 0;
		var url = data.url || "https://news.ycombinator.com/item?id=" + this.props.itemId;
		var storyText;
		if (data.text) {
			// dangerouslySetInnerHTML because I'm trusting HN's API
			storyText = <div className="story-text" dangerouslySetInnerHTML={{__html: (data.text || "")}} />
		}

		var comments = data.kids && data.kids.map(function(id) {
			return (
				<Comment key={id} itemId={id}/>
			);
		});

		return (
				<div className="story">
					<h2><a href={url} target="_blank">{data.title}</a></h2>
					<InfoLine data={data} />
					{storyText}
					<h3>Comments</h3>
					{comments}
				</div>
		);
	}

});

module.exports = Story;