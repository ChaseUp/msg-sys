/*
 * 消息输入框

	<MessagesInputArea>
		//社交平台筛选按钮
		<SocialBtns url="/url" messageInputText={messageInputText} />
		//消息输入框
		<MessageInputSec onUserInput={onUserInput} />
	</MessagesInputArea>

 */
var SocialInfoList = React.createClass({
	getInitialState: function() {
		return {
			data: {}
		};
	},
	//获取用户已绑定的账号列表
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'GET',
			success: function(xhr) {
				this.setState({
					data: xhr
				});
			}.bind(this)
		});
	},
	render:function(){
		return (
			<div className="socialBtnsCheck fll">
				<div className="checkBtn facebook">
					<i className="fa fa-facebook"></i>
					<span><i className="fa fa-check"></i></span>
				</div>
				<div className="checkBtn twitter">
					<i className="fa fa-twitter"></i>
					<span className="hide"><i className="fa fa-check"></i></span>
				</div>
				<div className="checkBtn LinkedIn">
					<i className="fa fa-linkedin"></i>
					<span className="hide"><i className="fa fa-check"></i></span>
				</div>
			</div>
			)
	}
});

var SocialBtns = React.createClass({
	//社交平台输入字数验证
	textSizeCheck:function(num,type){
		if(type==="className"){
			if( ( num - parseInt( this.props.messageInputText ) ) < 0 ){
				return "error";
			}
		}else if(type==="changeResult"){
			return ( num - parseInt( this.props.messageInputText ) )
		}
	},
	render:function(){
		return (
			<div className="socialBtns fix">
				<SocialInfoList url="/phoenix/admin/social/msg/socialInfo" />

				<div className="textSizeCheck flr">
					<span className="textSizeTip">还可以输入：</span>

					<div className="checkBtn twitter small"><i className="fa fa-twitter"></i></div>
					<ins className={this.textSizeCheck(140,"className")}> {this.textSizeCheck(140,"changeResult")}</ins>

					<div className="checkBtn facebook small"><i className="fa fa-facebook"></i></div>
					<ins className={this.textSizeCheck(2000,"className")}> {this.textSizeCheck(2000,"changeResult")}</ins>

					<div className="checkBtn LinkedIn small"><i className="fa fa-linkedin"></i></div>
					<ins className={this.textSizeCheck(600,"className")}> {this.textSizeCheck(600,"changeResult")}</ins>
				</div>
			</div>
			)
	}
})

var MessageInputSec = React.createClass({
	handleChange: function() {
		this.props.onUserInput(this.refs.messageInputText.value);
	},
	submitMsg:function(){
		console.log('发送');
		// /phoenix/admin/social/msg/submitMsg
	},
	submitMsgDraft:function(){
		console.log('草稿');
		// /phoenix/admin/social/msg/submitMsg
	},
	render:function(){
		return (
			<div className="messageInputSec mt10">
				<div className="messageInputWrap">
					<textarea name="messageInput" id="messageInput" 
						ref="messageInputText" 
						onChange={this.handleChange} 
						value={this.props.messageInputText}>
					</textarea>
				</div>
				<div className="messageInputTools mt10 fix">
					<div className="toolBtns fll">
						<a href="javascript:;" className="photos"><i className="fa fa-photo" aria-hidden="true"></i> 图片</a>
						<a href="javascript:;" className="articles"><i className="fa fa-newspaper-o" aria-hidden="true"></i> 引用文章</a>
						<a href="javascript:;" className="products"><i className="fa fa-cubes" aria-hidden="true"></i> 引用产品</a>
						<a href="javascript:;" className="pages"><i className="fa fa-file-text-o" aria-hidden="true"></i> 引用页面</a>
						<a href="javascript:;" className="clockPush"><i className="fa fa-clock-o" aria-hidden="true"></i> 定时发</a>
					</div>
					<div className="postBtns flr">
						<a href="javascript:;" className="postBtns-draft" onClick={this.submitMsgDraft}>保存草稿</a>
						<a href="javascript:;" className="postBtns-push" onClick={this.submitMsg}>发布</a>
					</div>
				</div>
			</div>
			)
	}
})

var MessagesInputArea = React.createClass({
	getInitialState: function() {
		return {
			messageInputText: '',
		};
	},
	handleUserInput: function(messageInputText) {
		this.setState({
			messageInputText: messageInputText,
		});
	},
	render:function(){
		return (
				<div className="msgInputArea sections">
					<SocialBtns url="/phoenix/admin/social/msg/socialInfo" messageInputText={this.state.messageInputText.length} />
					<MessageInputSec onUserInput={this.handleUserInput} />
				</div>
			);
	}
})

/*
 * 消息列表模块
	<TabsControl>
		<TabCont name="已发布"><MessagesDataList url="" messageStatus="0" name="已发布" /></TabCont>
		<TabCont name="定时发"><MessagesDataList url="" messageStatus="1" name="定时发" /></TabCont>
		<TabCont name="草稿"><MessagesDataList url="" messageStatus="2" name="草稿" /></TabCont>
	</TabsControl>
 */

var TabsControl = React.createClass({
  getInitialState: function(){
    return {currentIndex: 0}
  },
  getTitleItemCssClasses: function(index){
    return index === this.state.currentIndex ? "on" : "";
  },
  
  getContentItemCssClasses: function(index){
    return index === this.state.currentIndex ? "msgListTabCont on" : "msgListTabCont";
  },
  
  render: function(){
    let that = this;
    let childrenLength = this.props.children.length;
    return (
      <div className="msgListTabsInner">
        <nav className="msgListTabBtns">
			{React.Children.map(this.props.children, (element, index) => {
				return (<a href="javascript:;" onClick={() => {this.setState({currentIndex: index})}} className={that.getTitleItemCssClasses(index)}>{element.props.name}</a>)
			})}
			<MsgListTabContCheck />
        </nav>
        <div className="msgListTabList">
          {React.Children.map(this.props.children, (element, index) => {
            return (<div className={that.getContentItemCssClasses(index)}>{element}</div>)
          })}  
        </div>
      </div>
    )
  }
});

var MsgListTabContCheck = React.createClass({
	handleFilter:function(){
		console.log(1);
	},
	render: function(){
		return (
			<div className="msgListTabContCheck">
				<label className="on" onClick={this.handleFilter}><input type="checkbox" value="facebook" /><i className="fa fa-check"></i> Facebook</label>
				<label onClick={this.handleFilter}><input type="checkbox" value="twitter" /><i className="fa fa-check"></i> twitter</label>
				<label onClick={this.handleFilter}><input type="checkbox" value="linkedin" /><i className="fa fa-check"></i> linkedin</label>
			</div>
		)
	}
})

var TabCont = React.createClass({
  render: function(){
    return (<div className="msgDataList">{this.props.children}</div>);
  }
});

var MessagesDataList = React.createClass({
	render:function(){
		return (
			<ul className={this.props.url}>
	          <li>{this.props.name}</li>
	        </ul>);
  }
});

var MessagesListTabs = React.createClass({
	render:function(){
		return (<div className="msgListTabs sections">
	          <TabsControl>
	            <TabCont name="已发布"><MessagesDataList url="/phoenix/admin/social/msg/contentList-0" messageStatus="0" name="已发布" /></TabCont>
	            <TabCont name="定时发"><MessagesDataList url="/phoenix/admin/social/msg/contentList-1" messageStatus="1" name="定时发" /></TabCont>
	            <TabCont name="草稿"><MessagesDataList url="/phoenix/admin/social/msg/contentList-2" messageStatus="2" name="草稿" /></TabCont>
	          </TabsControl>
	        </div>);
  }
});

/*
 * 生成页面主体模块
	<div className="mainInner">
		<MessagesInputArea />
		<MessagesListTabs />
	</div
 */
var MessagesMain = React.createClass({
	render:function(){
		return (
			<div className="mainInner">
				<MessagesInputArea />
				<MessagesListTabs />
			</div>);
	}
});

ReactDOM.render(<MessagesMain />,document.getElementById('main'));

