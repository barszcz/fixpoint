var React = require('react');
var HN = require('./hn');
var Headline = require('./headline');
// var TransitionGroup = React.addons.CSSTransitionGroup;

var FrontPage = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			topstories: [],
			searchField: '',
			stories: {}
		};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "topstories");
	},

	handleChange: function() {
		this.setState({searchField: event.target.value});
	},
	
	sendTitle: function(id, story) {
		var stories = this.state.stories;
		stories[id] = story;
		this.setState({
			stories: stories
		});
		// console.log(this.state.titles)
	},


	buildStories: function() {
		return this.state.topstories.map(function(id) {
			return (
				<Headline key={id} itemId={id} initialData={this.state.stories[id]} onMount={this.sendTitle}/>
			);
		}.bind(this));
	},

	render: function() {

		var filteredStories = this.buildStories().filter(function(story) {
			if (this.state.searchField === '') return true;
			var re = new RegExp(this.state.searchField, 'i');
			var title = this.state.stories[story.props.itemId];
			return (!title || title.title.search(re) !== -1);
		}.bind(this));

		return (
			<div>
				<input type="text" onChange={this.handleChange} value={this.state.searchField} />
				{filteredStories}
			</div>
			);
	},


});

module.exports = FrontPage;