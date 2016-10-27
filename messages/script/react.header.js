var MessagesHeader = React.createClass({
	getInitialState:function(){		
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			type: 'get',
			dataType: 'json',
			success:function(xhr){
				this.setState({data: xhr});
			}.bind(this)
		});
	},
	render:function(){
		return (
			<div className="hederInner">
				<div>页头</div>
				<div>通知 {this.state.data.notice}</div>
				<div>用户名 {this.state.data.userName}</div>
			</div>
			);
	}
});
ReactDOM.render(<MessagesHeader url="/data/header" />,document.getElementById('header'));