var HN = require('./hn');
var InfoLine = require('./infoline');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Comment = React.createClass({displayName: "Comment",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			data: {},
			collapsed: false
		};
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.itemId), "data");
	},

	toggleCollapsed: function() {
		this.setState({collapsed: !this.state.collapsed});
	},

	render: function() {
		var data = this.state.data;
		var text
		var children = !this.state.collapsed && data.kids && data.kids.map(function(id) {
			return (
				React.createElement(Comment, {key: id, itemId: id})
			);
		});
		var expand = this.state.collapsed ? "[+]" : "[-]";
		var textClass = React.addons.classSet({
			'collapsed': this.state.collapsed
		});

		return (
			React.createElement("li", null, 
				React.createElement("div", {className: "comment"}, 
					React.createElement("a", {href: "javascript:void(0);", onClick: this.toggleCollapsed, className: "expand-button"}, expand, " "), 
					React.createElement(InfoLine, {data: data, isComment: true}), 
					React.createElement("div", {className: textClass, dangerouslySetInnerHTML: {__html: (data.text || "")}})
				), 
				React.createElement(TransitionGroup, {transitionName: "fade", component: "ul"}, 
					children
				)
			)

		);

	}

});

module.exports = Comment;