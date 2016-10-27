var MessagesAside = React.createClass({
	render:function(){
		return (
			<div id="aside">
				左侧栏
			</div>
			);
	}
});

var MessagesContainer = React.createClass({
	render:function(){
		return (
			<div className="containerInner">
				<MessagesAside />
				<div id="main">
					<MessagesInputArea />
					<MessagesListTabs />
				</div>
			</div>);
	}
});

var MessagesInputArea = React.createClass({
	render:function(){
		return (
			<div className="msgInputArea"> 消息输入框！</div>
			);
	}
})

var MessagesListTabs = React.createClass({
	render:function(){
		return (
			<div className="msgListTabs">消息列表！</div>
		);
	}
});

ReactDOM.render(<MessagesContainer />,document.getElementById('container'));

