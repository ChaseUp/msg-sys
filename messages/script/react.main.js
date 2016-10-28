var MessagesMain = React.createClass({
	render:function(){
		return (
			<div className="mainInner fix">
				<MessagesInputArea />
				<MessagesListTabs />
			</div>);
	}
});

var MessagesInputArea = React.createClass({
	render:function(){
		return (
			<div className="msgInputArea">消息输入框</div>
			);
	}
})

var MessagesListTabs = React.createClass({
	render:function(){
		return (
			<div className="msgListTabs">消息列表</div>
		);
	}
});

ReactDOM.render(<MessagesMain />,document.getElementById('main'));

