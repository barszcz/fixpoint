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
			stories: {}
		};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "storyIds");
		this.bindStories();
	},

	componentWillUpdate: function() {
		console.log("updating");
		this.bindStories();
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
	},


	buildStories: function() {
		return this.state.storyIds.map(function(id) {
			var story = this.state.stories[id];
			if (!story) return null;

			return (
				<Headline key={id} itemId={id} data={this.state.stories[id]}/>
			);
		}, this);
	},

	bindStories: function() {
		this.state.storyIds.forEach(function(id) {
			if (!this.firebaseRefs[String(id)]) {
				this.bindStory(HN.child("item").child(id), String(id));
			}
		}, this);
	},

	bindStory: function(firebaseRef, bindVar, cancelCallback) {
		this._validateBindVar(bindVar);

		var errorMessage, errorCode;
	    
	    if (Object.prototype.toString.call(firebaseRef) !== "[object Object]") {
	      errorMessage = "firebaseRef must be an instance of Firebase";
	      errorCode = "INVALID_FIREBASE_REF";
	    }

	    if (typeof errorMessage !== "undefined") {
	      var error = new Error("ReactFire: " + errorMessage);
	      error.code = errorCode;
	      throw error;
	    }

	    this.firebaseRefs[bindVar] = firebaseRef.ref();
		
		this.firebaseListeners[bindVar] = firebaseRef.on("value", function(dataSnapshot) {
	      	var newStories = this.state.stories;

	      	newStories[bindVar] = dataSnapshot.val();
	      	this.setState({stories: newStories});
	      	// this.forceUpdate();
    	}.bind(this), cancelCallback);
	},

	render: function() {

		var filteredStories = this.buildStories().filter(function(story) {
			if (!story) return false;
			if (this.state.searchField === '') return true;
			var re = new RegExp(this.state.searchField, 'i');
			var title = this.state.stories[story.props.itemId];
			return (!title || title.title.search(re) !== -1);
		}, this);

		return (
			<div>
				<input type="text" onChange={this.handleChange} value={this.state.searchField} />
				{filteredStories}
			</div>
			);
	},


});

module.exports = FrontPage;