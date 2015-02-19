var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = new Firebase("https://hacker-news.firebaseio.com/v0");

var App = React.createClass({

	render: function() {
		return (
			<div>
				<header>
					<h1>Fixpoint</h1>
				</header>

				<RouteHandler/>
			</div>
		);
	}

});


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


var Headline = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {story: {} };
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "story");
	},

	render: function() {
		var story = this.state.story;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.storyId;
		var commentsCount = story.kids ? story.kids.length : 0;
		var url = story.url || commentsUrl;
		return (
			<div>
				<h3><a href={url} target="_blank">{story.title}</a></h3>
				<p>Submitted by {story.by} - {story.score} points - <a href={commentsUrl} target="_blank">{commentsCount} comments</a></p>
			</div>
		);
	}
})

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={FrontPage}/>
	</Route>
	);


Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.body);
});

// module.exports = {App: App, FrontPage: FrontPage, Headline: Headline}