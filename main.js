(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = window.ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HN = require('./hn');
var TransitionGroup = require('./timeout-transition-group');

var FrontPage = require('./frontpage');
var Story = require('./story');

var App = React.createClass({displayName: "App",

	mixins: [Router.RouteHandlerMixin],

	render: function() {
		// var Handler = this.getRouteHandler();
		return (
			React.createElement("div", null, 
				React.createElement("header", null, 
					React.createElement("h1", null, React.createElement(Link, {to: "app"}, "Fixpoint"))
				), 
				React.createElement(TransitionGroup, {enterTimeout: 5000, leaveTimeout: 5000, transitionName: "fade"}, 
					React.createElement(RouteHandler, null)
				)
			)
		);
	}

});

var routes = (
	React.createElement(Route, {name: "app", path: "/", handler: App}, 
		React.createElement(Route, {name: "story", path: ":itemId", handler: Story}), 
		React.createElement(DefaultRoute, {handler: FrontPage})
	)
	);


Router.run(routes, function(Handler) {
	React.render(React.createElement(Handler, null), document.body);
});
},{"./frontpage":2,"./hn":4,"./story":5,"./timeout-transition-group":6}],2:[function(require,module,exports){
var HN = require('./hn');
var Headline = require('./headline');
var TransitionGroup = require('./timeout-transition-group');


var FrontPage = React.createClass({displayName: "FrontPage",

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
				React.createElement(Headline, {key: id, storyId: id})
			);
		});
		
		return (
			React.createElement("div", null, 
			React.createElement(TransitionGroup, {enterTimeout: 5000, leaveTimeout: 5000, transitionName: "fade"}, 
				stories
			)
			)
			);
	}

});

module.exports = FrontPage;
},{"./headline":3,"./hn":4,"./timeout-transition-group":6}],3:[function(require,module,exports){
var HN = require('./hn');
var Router = window.ReactRouter;
var Link = Router.Link;

var Headline = React.createClass({displayName: "Headline",

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {story: {} };
	},

	componentWillMount: function() {
		this.bindAsObject(HN.child("item").child(this.props.storyId), "story");
	},

	commentsCount: function() {
		var queue = this.state.story.kids || [];
		var count = 0;
		while (queue.length > 0) {
			var next = HN.child("item").child(queue.shift());
			queue.concat(next.kids);
			count++;
		}
		return count;
	},

	render: function() {
		var story = this.state.story;
		var commentsCount = story.kids ? story.kids.length : 0;
		var commentsUrl = "https://news.ycombinator.com/item?id=" + this.props.storyId;
		var url = story.url || commentsUrl;
		var domain = url.match(/https?:\/\/([^\/]+)/)[1];

		return (
			React.createElement("div", {className: "frontpage-story"}, 
				React.createElement("h3", null, React.createElement("a", {href: url, target: "_blank"}, story.title), " (", domain, ")"), 
				React.createElement("p", null, "Submitted by ", story.by, " - ", story.score, " points - ", React.createElement(Link, {to: "story", params: {itemId: String(story.id)}}, commentsCount, " comments"))
			)
		);
	}
});

module.exports = Headline;
},{"./hn":4}],4:[function(require,module,exports){
module.exports = new Firebase("https://hacker-news.firebaseio.com/v0");
},{}],5:[function(require,module,exports){
var HN = require('./hn');
var Router = window.ReactRouter;
var TransitionGroup = require('./timeout-transition-group');

var Story = React.createClass({displayName: "Story",

	mixins: [ReactFireMixin, Router.State],

	getInitialState: function() {
		return {data: {}};
	},

	componentWillMount: function() {
		var id = this.getParams().itemId;
		this.bindAsObject(HN.child("item").child(this.getParams().itemId), "data")
	},

	render: function() {
		return (
			React.createElement(TransitionGroup, {enterTimeout: 5000, leaveTimeout: 5000, transitionName: "fade"}, 
				React.createElement("div", null, 
					React.createElement("h1", null, this.state.data.title)
				)
			)
		);
	}

});

module.exports = Story;
},{"./hn":4,"./timeout-transition-group":6}],6:[function(require,module,exports){
/**
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. Currently there is only one
 * timeout specified, but in the future it would be nice to be able to specify
 * separate timeouts for enter and leave, in case the timeouts for those
 * animations differ. Even nicer would be some sort of inspection of the CSS to
 * automatically determine the duration of the animation or transition.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 */

var ReactTransitionGroup = React.addons.TransitionGroup;

var TICK = 17;

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    }
};

var endEvents = [];

(function detectEvents() {
    if (typeof window === "undefined") {
        return;
    }

    var testEl = document.createElement('div');
    var style = testEl.style;

    // On some platforms, in particular some releases of Android 4.x, the
    // un-prefixed "animation" and "transition" properties are defined on the
    // style object but the events that fire will still be prefixed, so we need
    // to check if the un-prefixed events are useable, and if not remove them
    // from the map
    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            var baseEvents = EVENT_NAME_MAP[baseEventName];
            for (var styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }

        }
    }
})();

function animationSupported() {
    return endEvents.length !== 0;
}

/**
 * Functions for element class management to replace dependency on jQuery
 * addClass, removeClass and hasClass
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else if (!hasClass(element, className)) {
        element.className = element.className + ' ' + className;
    }
    return element;
}
function removeClass(element, className) {
    if (hasClass(className)) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = (' ' + element.className + ' ')
                .replace(' ' + className + ' ', ' ').trim();
        }
    }
    return element;
}
function hasClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
}

var TimeoutTransitionGroupChild = React.createClass({displayName: "TimeoutTransitionGroupChild",
    transition: function(animationType, finishCallback) {
        var node = this.getDOMNode();
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';

        var endListener = function() {
            removeClass(node, className);
            removeClass(node, activeClassName);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            finishCallback && finishCallback();
        };

        if (!animationSupported()) {
            endListener();
        } else {
            if (animationType === "enter") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.enterTimeout);
            } else if (animationType === "leave") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.leaveTimeout);
            }
        }

        addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },

    queueClass: function(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function() {
        if (this.isMounted()) {
            this.classNameQueue.forEach(function(name) {
                addClass(this.getDOMNode(), name);
            }.bind(this));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillMount: function() {
        this.classNameQueue = [];
    },

    componentWillUnmount: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    },

    componentWillEnter: function(done) {
        if (this.props.enter) {
            this.transition('enter', done);
        } else {
            done();
        }
    },

    componentWillLeave: function(done) {
        if (this.props.leave) {
            this.transition('leave', done);
        } else {
            done();
        }
    },

    render: function() {
        return React.Children.only(this.props.children);
    }
});

var TimeoutTransitionGroup = React.createClass({displayName: "TimeoutTransitionGroup",
    propTypes: {
        enterTimeout: React.PropTypes.number.isRequired,
        leaveTimeout: React.PropTypes.number.isRequired,
        transitionName: React.PropTypes.string.isRequired,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            transitionEnter: true,
            transitionLeave: true
        };
    },

    _wrapChild: function(child) {
        return (
            React.createElement(TimeoutTransitionGroupChild, {
                    enterTimeout: this.props.enterTimeout, 
                    leaveTimeout: this.props.leaveTimeout, 
                    name: this.props.transitionName, 
                    enter: this.props.transitionEnter, 
                    leave: this.props.transitionLeave}, 
                child
            )
        );
    },

    render: function() {
        return (
            React.createElement(ReactTransitionGroup, React.__spread({}, 
                this.props, 
                {childFactory: this._wrapChild}))
        );
    }
});

module.exports = TimeoutTransitionGroup;

},{}]},{},[1]);
