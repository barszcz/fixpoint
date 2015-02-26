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
			stories: {},
			mounted: false
		};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "topstories");
	},

	componentDidMount: function() {
		this.setState({mounted: true});
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

		var stories = this.buildStories();

		var filteredStories = stories.filter(function(story) {
			if (this.state.searchField === '') return true;
			var re = new RegExp(this.state.searchField, 'i');
			var title = this.state.stories[story.props.itemId];
			return (!title || title.title.search(re) !== -1);
		}.bind(this));

		var spinner = <div className="spinner"><i className="fa fa-cog fa-spin"></i></div>

		return (
			<div>
				<input type="text" onChange={this.handleChange} value={this.state.searchField} />
				{stories.length === 0 ? spinner : filteredStories}
			</div>
			);
	},


});

module.exports = FrontPage;