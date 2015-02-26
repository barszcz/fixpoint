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
			stories: {},
			mounted: false
		};
	},

	componentWillMount: function() {
		this.bindAsArray(HN.child("topstories"), "storyIds");
		// a hideous kludge to make the page re-render in a timely fashion.
		window.setTimeout(function() {
			this.setState({mounted: true});
		}.bind(this), 1500)
	},

	componentWillUpdate: function() {
		this.bindStories();
	},

	componentDidMount: function() {
		this.bindStories();
	},

	handleChange: function() {
		this.setState({searchField: event.target.value});
	},


	buildStories: function() {
		var stories = [];
		this.state.storyIds.forEach(function(id) {
			var story = this.state.stories[id];
			if (story) {
				stories.push(<Headline key={id} itemId={id} data={this.state.stories[id]}/>);
			}
		}, this);

		return stories;
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
    	}.bind(this), cancelCallback);
	},

	render: function() {

		var stories = this.buildStories();

		var filteredStories = stories.filter(function(story) {
			if (this.state.searchField === '') return true;
			var re = new RegExp(this.state.searchField, 'i');
			var title = this.state.stories[story.props.itemId];
			return (!title || title.title.search(re) !== -1);
		}, this);

		var spinner = <div className="spinner"><i className="fa fa-cog fa-spin"></i></div>

		return (
			<div>
				<input type="text" onChange={this.handleChange} value={this.state.searchField} tabIndex="1" />
				{stories.length === 0 ? spinner : filteredStories}
			</div>
			);
	},


});

module.exports = FrontPage;