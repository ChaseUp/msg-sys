/*
 * 消息输入框

	<MessagesInputArea>
		//社交平台筛选按钮
		<SocialBtns url="/url" messageInputText={messageInputText}>
			<SocialInfoList url="url" />
		</SocialBtns>
		//消息输入框
		<MessageInputSec onUserInput={onUserInput} />
	</MessagesInputArea>

 */
var SocialInfoList = React.createClass({
	getInitialState: function() {
		return {
			fbListToggle:false,
			twListToggle:false,
			LIListToggle:false,

			fbUsers:0,
			twUsers:0,
			LIUsers:0,

			loading: true,
			data: null
		};
	},
	componentDidMount() {
		$.ajax({
			url:this.props.url,
			type:'GET',
			dataType:'json',
			success:function(xhr){
				this.setState({
					loading: false,
					data: xhr
				})
			}.bind(this)
		})
	},
	handleClickToggle:function(event){
		var evtClassName = event.target.className;
		if(evtClassName.indexOf("facebook")!=-1){
			!this.state.fbListToggle?this.setState({fbListToggle: true}):this.setState({fbListToggle: false});
			this.setState({twListToggle: false});
			this.setState({LIListToggle: false});
		}
		if(evtClassName.indexOf("twitter")!=-1){
			!this.state.twListToggle?this.setState({twListToggle: true}):this.setState({twListToggle: false});
			this.setState({fbListToggle: false});
			this.setState({LIListToggle: false});
		}
		if(evtClassName.indexOf("linkedin")!=-1){
			!this.state.LIListToggle?this.setState({LIListToggle: true}):this.setState({LIListToggle: false});
			this.setState({fbListToggle: false});
			this.setState({twListToggle: false});
		};
	},
	checkNumCLick(e){
        var fb = $("input[name='fb']:checked").length;
        var tw = $("input[name='tw']:checked").length;
        var LI = $("input[name='LI']:checked").length;

        this.setState({fbUsers: fb});
        this.setState({twUsers: tw});
        this.setState({LIUsers: LI});

        $(e.target).toggleClass('checked');
    },
	render: function() {
		var handleChoosedChange = this.checkNumCLick;

		if (this.state.loading) {
			return <span> Loading... </span>;
		} else {
			var repos = this.state.data.socialList;

			var facebookUserList = repos.map(function(repo, index) {
				if (repo.provider == 'facebook') {
					return (
						<label key={index} data-tokenId={repo.tokenId} onClick={handleChoosedChange}><input name="fb" type="checkbox" /> {repo.showName}</label>
					);
				}
			});

			var twitterUserList = repos.map(function(repo, index) {
				if (repo.provider == 'twitter') {
					return (
						<label key={index} data-tokenId={repo.tokenId} onClick={handleChoosedChange}><input name="tw" type="checkbox" /> {repo.showName}</label>
					);
				}
			});

			var LinkedInUserList = repos.map(function(repo, index) {
				if (repo.provider == 'linkedin') {
					return (
						<label key={index} data-tokenId={repo.tokenId} onClick={handleChoosedChange}><input name="LI" type="checkbox" /> {repo.showName}</label>
					);
				}
			});

			var socialChoosederror = "hide";
			if(this.state.fbUsers || this.state.twUsers || this.state.LIUsers){
				socialChoosederror = "hide";
			}else{
				socialChoosederror = "show";
			}

			return (
				<div className="socialBtnsCheck fll">
					<div className="checkBtn facebook" data-toggle={this.state.fbListToggle}>
						<i className="fa fa-facebook" onClick={this.handleClickToggle}></i> 
						<span className={this.state.fbUsers?'choosedUser':'noUser'}>{this.state.fbUsers?this.state.fbUsers:"+"}</span>
						<div className="socialUserList facebookUserList"> {facebookUserList} </div>
					</div>

					<div className="checkBtn twitter" data-toggle={this.state.twListToggle}>
						<i className="fa fa-twitter" onClick={this.handleClickToggle}></i> 
						<span className={this.state.twUsers?'choosedUser':'noUser'}>{this.state.twUsers?this.state.twUsers:"+"}</span>
						<div className="socialUserList twitterUserList" > {twitterUserList} </div> 
					</div>

					<div className="checkBtn LinkedIn" data-toggle={this.state.LIListToggle}>
						<i className="fa fa-linkedin" onClick={this.handleClickToggle}></i> 
						<span className={this.state.LIUsers?'choosedUser':'noUser'}>{this.state.LIUsers?this.state.LIUsers:"+"}</span>
						<div className="socialUserList LinkedInUserList"> {LinkedInUserList} </div>
					</div>
					<p className="socialCheckError" data-hidden={socialChoosederror}>至少选择一个社交媒体</p>
				</div>
			);
		}
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
	getInitialState: function(){
		return {
			isClockPush:false,
			addPages:false
		};
	},
	handleChange: function() {
		this.props.onUserInput(this.refs.messageInputText.value);
	},
	handleAddPages:function(e){
		this.state.addPages?this.setState({addPages: false}):this.setState({addPages: true});
	},
	handleClockPush:function(e){
		this.state.isClockPush?this.setState({isClockPush: false}):this.setState({isClockPush: true});
		if(!$(".datePickerWapper .datePicker").hasClass("isLoaded")){
			$(".datePickerWapper .datePicker").addClass("isLoaded").datepicker({
				format: 'yyyy-mm-dd',
				language: 'zh-CN',
				autoHide:true,
				autoPick:true
			});
		}
	},
	timerChange:function(e){
		if(e.target.value<10){
			e.target.value=("0"+parseInt(e.target.value));
		}
	},
	submitMsg:function(e){
		//判断是否为草稿
		var type = $(e.target).attr("class");
		var isDraft = () => { 
			if(type.indexOf("draft")!=-1){
				return 0;
			}else if(type.indexOf("push")!=-1){
				return 1;
			}
		}
		//消息提交方法
		if($("#messageInput").val().length && $(".socialCheckError").attr("data-hidden")=="hide"){
			$.ajax({
				url:'/phoenix/admin/social/msg/submitMsg',
				type:"POST",
				dataType:"json",
				data:{
					"encodeTokenIds":'abc|ABC|xyz',
					"content":$("#messageInput").val(),
					"shareLinks":"baidu.com",
					"scheduleTime":"2016-11-01 10:30",
					"messageId":"asdsadasdas",
					"isDraft":isDraft()
				},
				success:function(xhr){
					console.log(xhr.responseText);
				}.bind(this),
				error:function(xhr){
					console.log(xhr.responseText);
				}.bind(this)
			})
		}else{
			alert("请填写消息内容，选择发件人！");
		}
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
					<div className={this.state.isClockPush?"timerClockPush block":"timerClockPush hide"}>
						<div className="datePickerWapper fix">
							<span>发布时间：</span>
							<input  className="datePicker" />
							<input className="hours" onChange={this.timerChange} type="number" min="0" max="23" defaultValue="00" /> <span>时</span>
							<input className="minutes" onChange={this.timerChange} type="number" min="0" max="59" defaultValue="00" /> <span>分</span>
						</div>
						<a href="javascript:;" className="closeClockPush" onClick={this.handleClockPush}><i className="fa fa-close"></i></a>
					</div>
				</div>
				<div className="messageInputTools mt10 fix">
					<div className="toolBtns fll">
						<a href="javascript:;" className="photos"><i className="fa fa-photo" aria-hidden="true"></i> 图片</a>
						<a href="javascript:;" className="articles"><i className="fa fa-newspaper-o" aria-hidden="true"></i> 引用文章</a>
						<a href="javascript:;" className="products"><i className="fa fa-cubes" aria-hidden="true"></i> 引用产品</a>
						<a href="javascript:;" className={this.state.addPages?"pages on":"pages"} onClick={this.handleAddPages}><i className="fa fa-file-text-o" aria-hidden="true"></i> 添加链接</a>
						<a href="javascript:;" className={this.state.isClockPush?"clockPush on":"clockPush"} onClick={this.handleClockPush}><i className="fa fa-clock-o" aria-hidden="true"></i> 定时发</a>
					</div>
					<div className="postBtns flr">
						<a href="javascript:;" className="postBtns-draft" onClick={this.submitMsg}>保存草稿</a>
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
 	<MessagesListTabs>
		<TabsControl>
			<MsgListTabContCheck />
			<TabCont name="已发布">
				<MessagesDataList url="" messageStatus="0" name="已发布" />{MsgSendQueue}
			</TabCont>
			<TabCont name="定时发">
				<MessagesDataList url="" messageStatus="1" name="定时发" />{MsgSendQueue}
			</TabCont>
			<TabCont name="草稿">
				<MessagesDataList url="" messageStatus="2" name="草稿" />{MsgSendQueue}
			</TabCont>
		</TabsControl>
	</MessagesListTabs>
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
	getInitialState: function() {
		return {
			error: true,
			data: null
		};
	},
	componentDidMount() {
		this.props.promise.then(
			value => this.setState({
				error: false,
				data: value
			})
		)
	},
	render: function() {
		if (this.state.error) {
			return <span> error... </span>;
		} else {
			var msgList = this.state.data.msgList;
			var msgSendQueue = this.state.data.msgSendQueue;

			var msgDataList = msgList.map(function(repo, index) {
				return (
					<li key={index} className="msgDataListInner" data-msgId={repo.encodePkId}>
						<div className="queueInfo fix">
							<div className="msgAddTime fll">
								时间：{repo.addTime.year}年{repo.addTime.month}月{repo.addTime.date}日 
								{repo.addTime.hours}:{repo.addTime.minutes} 
							</div>
							<div className="msgSendQueue fll ml20">
								<span className="fll">发布平台：</span> 
								<MsgSendQueue dataqueue={msgSendQueue[repo.encodePkId]} />
							</div>
						</div>
						<div className="msgDataListCont">{repo.content}</div>
					</li>
				);
			});

			return ( 
				<ul>
					{msgDataList}
				</ul>
			);
		}
	}
});

var MsgSendQueue = React.createClass({
	getInitialState: function() {
		return {
			fbList:false,
			twList:false,
			ldinList:false
		};
	},
	handleClickToggle:function(event){
		var evtClassName = event.target.className;
		if(evtClassName.indexOf("facebook")!=-1){
			!this.state.fbList?this.setState({fbList: true}):this.setState({fbList: false});
			this.setState({twList: false});
			this.setState({ldinList: false});
		}
		if(evtClassName.indexOf("twitter")!=-1){
			!this.state.twList?this.setState({twList: true}):this.setState({twList: false});
			this.setState({fbList: false});
			this.setState({ldinList: false});
		}
		if(evtClassName.indexOf("linkedin")!=-1){
			!this.state.ldinList?this.setState({ldinList: true}):this.setState({ldinList: false});
			this.setState({fbList: false});
			this.setState({twList: false});
		};
	},
	render:function(){
		var dataQueue = this.props.dataqueue;
		var fbDataSize = 0;
		var twDataSize = 0;
		var LIDataSize = 0;

		var facebookDataQueue = dataQueue.map(function(repo, index) {
			if(repo.provider=="facebook"){
				fbDataSize += 1;
				return (
					<li key={index} data-sendFlag={repo.sendFlag}><i className="fa"></i> {repo.dispName}</li>
					)
			}
		})
		var twitterDataQueue = dataQueue.map(function(repo, index) {
			if(repo.provider=="twitter"){
				twDataSize += 1;
				return (
					<li key={index} data-sendFlag={repo.sendFlag}><i className="fa"></i> {repo.dispName}</li>
					)
			}
		})
		var linkedinDataQueue = dataQueue.map(function(repo, index) {
			if(repo.provider=="linkedin"){
				LIDataSize += 1;
				return (
					<li key={index} data-sendFlag={repo.sendFlag}><i className="fa"></i> {repo.dispName}</li>
					)
			}
		})

		return (
			<div className="dataQueueWrapper">
				<div className="dataQueueCheck facebookDataQueue" data-tg={this.state.fbList} data-hidden={fbDataSize?'':'hide'}>
					<header onClick={this.handleClickToggle} className="facebook">facebook 
						<i className="fa fa-angle-down"></i>
					</header>
					<ul>{facebookDataQueue}</ul>
				</div>
				<div className="dataQueueCheck twitterDataQueue" data-tg={this.state.twList} data-hidden={twDataSize?'':'hide'}>
					<header onClick={this.handleClickToggle} className="twitter">twitter 
						<i className="fa fa-angle-down"></i>
					</header>
					<ul>{twitterDataQueue}</ul>
				</div>
				<div className="dataQueueCheck linkedinDataQueue" data-tg={this.state.ldinList} data-hidden={LIDataSize?'':'hide'}>
					<header onClick={this.handleClickToggle} className="linkedin">LinkedIn 
						<i className="fa fa-angle-down"></i>
					</header>
					<ul>{linkedinDataQueue}</ul>
				</div>
			</div>
			)
	}
})

var MessagesListTabs = React.createClass({
	render:function(){
		return (<div className="msgListTabs sections">
	          <TabsControl>
	            <TabCont name="已发布"><MessagesDataList promise={$.getJSON("/phoenix/admin/social/msg/contentList-0")} messageStatus="0" /></TabCont>
	            <TabCont name="定时发"><MessagesDataList promise={$.getJSON("/phoenix/admin/social/msg/contentList-1")} messageStatus="1" /></TabCont>
	            <TabCont name="草稿"><MessagesDataList promise={$.getJSON("/phoenix/admin/social/msg/contentList-2")}  messageStatus="2"/></TabCont>
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

