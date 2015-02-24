var HN = require('./hn');
var InfoLine = require('./infoline');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Comment = React.createClass({

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
				<Comment key={id} itemId={id}/>
			);
		});
		var expand = this.state.collapsed ? "[+]" : "[-]";
		var textClass = React.addons.classSet({
			'collapsed': this.state.collapsed
		});

		return (
			<li>
				<div className="comment">
					<a href="javascript:void(0);" onClick={this.toggleCollapsed} className="expand-button">{expand} </a>
					<InfoLine data={data} isComment={true} />
					<div className={textClass} dangerouslySetInnerHTML={{__html: (data.text || "")}}/>
				</div>
				<TransitionGroup transitionName="fade" component="ul">
					{children}
				</TransitionGroup>
			</li>

		);

	}

});

module.exports = Comment;