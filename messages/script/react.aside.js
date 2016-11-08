var MessagesAside = React.createClass({
	render : function(){
		return (
			<div className="aside-inner">
				<AsideTop url="/data/userInfo" />
				<AsideBottom url="/data/socialInfo" />
				<ManageSocialBtn />
			</div>
		);
	}
});

//用户信息组件
var AsideTop = React.createClass({
	getInitialState : () => ({userInfo : {}}),
	componentDidMount : function(){
		$.ajax({
			url : this.props.url,
			type : "get",
			dataType : "json",
			success : (xhr) => {
				this.setState({
					userInfo : xhr
				});
			}
		});
	},
	render : function(){
		return (
			<div className="aside-top">
				<img className="avatar" src={this.state.userInfo.usrPhotoUrl || "../images/default-avatar.jpg"} alt="" />
				<p className="user-name">{this.state.userInfo.userName || ""}</p>
				<p className="user-role">{this.state.userInfo.userRole || ""}</p>
				<ul className="count">
					<li>
						<p className="num">{this.state.userInfo.msgCount || 0}</p>
						<p className="desc">已发送信息</p>
					</li>
					<li>
						<p className="num">{this.state.userInfo.socialCount || 0}</p>
						<p className="desc">待发布消息</p>
					</li>
				</ul>
			</div>
		);
	}
})

//社交媒体信息组件
var AsideBottom = React.createClass({
	getInitialState : () => ({socialInfo : {}}),
	componentDidMount : function(){
		$.ajax({
			url : this.props.url,
			type : "get",
			dataType : "json",
			success : (xhr) => {
				this.setState({socialInfo : xhr});
			}
		});
	},
	render : function(){
		var list = this.state.socialInfo.socialList || [],
			linkedin = [],linkedinExp = [],facebook = [],facebookExp = [],twitter = [],twitterExp = [],reorderedList = [];
		if (!!list) {
			//分六种情况重排序数据并生成虚拟DOM
			list.map(function(elem){
				if (elem.provider == "linkedin") {
					if (!elem.isExpire) {						//未过期的linkedin
						elem.klass = "linkedin";
						elem.personDesc = "CONTACTS";
						elem.iconClass = "fa fa-linkedin";
						elem.hr = false;
						linkedin.push(elem);
					} else {									//已过期的linkedin
						elem.klass = "linkedin linkedinExp";
						elem.personDesc = "CONTACTS";
						elem.iconClass = "fa fa-linkedin";
						elem.hr = false;
						linkedinExp.push(elem);
					}
				} else if (elem.provider == "facebook") {
					if (!elem.isExpire) {						//未过期的facebook
						elem.klass = "facebook";
						elem.personDesc = "FOLLOWERS";
						elem.iconClass = "fa fa-facebook";
						elem.hr = false;
						facebook.push(elem);
					} else {									//已过期的facebook
						elem.klass = "facebook facebookExp";
						elem.personDesc = "FOLLOWERS";
						elem.iconClass = "fa fa-facebook";
						elem.hr = false;
						facebookExp.push(elem);
					}
				} else if (elem.provider == "twitter") {
					if (!elem.isExpire) {						//未过期的twitter
						elem.klass = "twitter";
						elem.personDesc = "FRIENDS";
						elem.iconClass = "fa fa-twitter";
						elem.hr = false;
						twitter.push(elem);
					} else {									//已过期的twitter
						elem.klass = "twitter twitterExp";
						elem.hr = false;
						elem.personDesc = "FRIENDS";
						elem.iconClass = "fa fa-twitter";
						twitterExp.push(elem);
					}
				}
				reorderedList = [...linkedin,...linkedinExp,{"hr":true},...facebook,...facebookExp,{"hr":true},...twitter,...twitterExp];
				//console.log(reorderedList);

				// if (elem.provider == "linkedin") {
				// 	if (!elem.isExpire) {
				// 		//未过期的linkedin
				// 		linkedin.push(
				// 			<li className="linkedin" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-linkedin" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">CONTACTS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	} else {
				// 		//已过期的linkedin
				// 		linkedinExp.push(
				// 			<li className="linkedin linkedinExp" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-linkedin" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">CONTACTS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	}
				// } else if (elem.provider == "facebook") {
				// 	if (!elem.isExpire) {
				// 		//未过期的facebook
				// 		facebook.push(
				// 			<li className="facebook" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FOLLOWERS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	} else {
				// 		//已过期的facebook
				// 		facebookExp.push(
				// 			<li className="facebook facebookExp" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FOLLOWERS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	}
				// } else if (elem.provider == "twitter") {
				// 	if (!elem.isExpire) {
				// 		//未过期的twitter
				// 		twitter.push(
				// 			<li className="twitter" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-twitter" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FRIENDS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	} else {
				// 		//已过期的twitter
				// 		twitterExp.push(
				// 			<li className="twitter twitterExp" key={elem.tokenId}>
				// 				<div className="provider-url">
				// 					<span className="icon"><i className="fa fa-twitter" aria-hidden="true"></i></span>
				// 					<a href={elem.providerUrl}>{elem.showName}</a>
				// 					<p className="out-of-date">(已过期)</p>
				// 				</div>
				// 				<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FRIENDS</span></p>
				// 				<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
				// 			</li>
				// 		);
				// 	}
				// }
			});
		}
			
		return (
			<ul className="social-list">
				{
					reorderedList.map(function(elem,index){
						if (!!elem.hr) {
							// return (<li className="hr" key={index}></li>);
						} else {
							return (
								<li className={elem.klass} key={index}>
									<div className="provider-url">
										<span className="icon"><i className={elem.iconClass} aria-hidden="true"></i></span>
										<a href={elem.providerUrl}>{elem.showName}</a>
										<p className="out-of-date">已过期</p>
									</div>
									<p className="persons"><span className="num">{elem.persons}</span><span className="desc">{elem.personDesc}</span></p>
									<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
								</li>
							);
						}
					})
				}
			</ul>
		);
	}
});

//管理社交媒体账号组件
var ManageSocialBtn = React.createClass({
	getInitialState : () => ({popShow : false,checkId : "twitter"}),
	showManagePop : function(){
		this.refs.pop.style.display = "block";
		this.setState({
			popShow : true
		});
	},
	hideManagePop : function(){
		this.setState({
			popShow : false
		},function(){
			setTimeout(() => {this.refs.pop.style.display = "none";},500);
		})
	},
	tabCheck : function(ev){
		this.setState({checkId : ev.target.dataset.checkid});
	},
	connectEvent : function(ev){
		var providerId = ev.target.getAttribute("role");
		window.open('/phoenix/admin/social/connect/' + providerId);
	},
	render : function(){
		 return (
		 	<div>
		 		<a className="manage-social-btn" onClick={this.showManagePop} href="javascript:;">管理社交媒体账号</a>
		 		<div id="pop-manage" className={this.state.popShow ? "pop-manage-show" : "pop-manage-hide"} ref="pop">
		 			<div className="pop-box">
						<div className="pop-title">
							管理社交媒体帐号
							<a href="javascript:;" className="pop-close" onClick={this.hideManagePop}></a>
						</div>
						<div className="pop-main">
							<ul className="pop-nav" ref="navList">
								<li className={"twitter" + (this.state.checkId == "twitter" ? " active" : "")} onClick={this.tabCheck} data-checkid="twitter"><span data-checkid="twitter"><i data-checkid="twitter" className="fa fa-twitter fa-2x" aria-hidden="true"></i></span>Twitter</li>
								<li className={"facebook" + (this.state.checkId == "facebook" ? " active" : "")} onClick={this.tabCheck} data-checkid="facebook"><span data-checkid="facebook"><i data-checkid="facebook" className="fa fa-facebook fa-2x" aria-hidden="true"></i></span>Facebook</li>
								<li className={"linkedin" + (this.state.checkId == "linkedin" ? " active" : "")} onClick={this.tabCheck} data-checkid="linkedin"><span data-checkid="linkedin"><i data-checkid="linkedin" className="fa fa-linkedin fa-2x" aria-hidden="true"></i></span>LinkedIn</li>
							</ul>
							<ul className="pop-cont" ref="contList">
								<li className={"cont-twitter" + (this.state.checkId == "twitter" ? " active" : "")}>
										<h2>添加Twitter账号</h2>
										<p className="tip">请先授权给领动，允许领动获取以下信息：</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter个人档案</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter页面</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter群组</p>
										<a href="javascript:;" className="pop-connect func_connect" onClick={this.connectEvent} role="twitter">连接Twitter</a>				 	
												
								</li>
								<li className={"cont-facebook" + (this.state.checkId == "facebook" ? " active" : "")}>
										<h2>zhangsan</h2>
										<p className="tip"><img src="" width="80px" height="80px"/></p>
										<a href="javascript:;" className="pop-connect func_delete" role="facebook">从领动移除</a>
									
								</li>
								<li className={"cont-linkedin" + (this.state.checkId == "linkedin" ? " active" : "")}>
										<h2>添加LinkedIn账号</h2>
										<p className="tip">请先授权给领动，允许领动获取以下信息：</p>
										<p className="tip-list"><span><i className="fa fa-linkedin" aria-hidden="true"></i></span>LinkedIn个人档案</p>
										<p className="tip-list"><span><i className="fa fa-linkedin" aria-hidden="true"></i></span>LinkedIn页面</p>
										<p className="tip-list"><span><i className="fa fa-linkedin" aria-hidden="true"></i></span>LinkedIn群组</p>
										<a href="javascript:;" className="pop-connect func_connect" onClick={this.connectEvent} role="linkedin">连接LinkedIn</a>
								</li>
							</ul>
						</div>
					</div>
		 		</div>
		 	</div>
		 );
	}
});

ReactDOM.render(<MessagesAside />,document.getElementById('aside'));

