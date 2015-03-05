var React = require('react');
var HN = require('./hn');
var Headline = require('./headline');
// var TransitionGroup = React.addons.CSSTransitionGroup;

var FrontPage = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			storyIds: [],
			searchField: '',
		};
	},

	componentWillMount: function() {
		// HN changed their API so top stories now has 500 stories. 
		// Limiting them to top 100 until I get pagination working
		this.bindAsArray(HN.child("topstories").limitToFirst(100), "storyIds");
	},

	componentDidMount: function() {
		document.title = "Fixpoint | A Hacker News reader";
	},

	_handleChange: function() {
		this.setState({searchField: event.target.value});
	},


	_buildStories: function() {
		return this.state.storyIds.map(function(id) {
			return (<Headline key={id} itemId={id} searchString={this.state.searchField}/>);
		}, this);

	},

	render: function() {

		var stories = this._buildStories();

		var spinner = <div className="spinner"><i className="fa fa-cog fa-spin"></i></div>

		return (
			<div>
				<input type="text" onChange={this._handleChange} value={this.state.searchField} tabIndex="1" />
				{stories.length === 0 ? spinner : stories}
			</div>
			);
	},


});

module.exports = FrontPage;