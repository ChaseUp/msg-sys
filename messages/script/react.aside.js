var MessagesAside = React.createClass({
	render:function(){
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
	getInitialState : function(){
		return {userInfo : {}}
	},
	componentDidMount : function(){
		$.ajax({
			url : this.props.url,
			type : "get",
			dataType : "json",
			success : function(xhr){
				this.setState({
					userInfo : xhr
				});
			}.bind(this)
		});
	},
	render : function(){
		return (
			<div className="aside-top">
				<img className="avatar" src={this.state.userInfo.usrPhotoUrl || "../images/default_avatar.png"} alt="" />
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
	getInitialState : function(){
		return {
			socialInfo : {}
		};
	},
	componentDidMount : function(){
		$.ajax({
			url : this.props.url,
			type : "get",
			dataType : "json",
			success : function(xhr){
				this.setState({socialInfo : xhr});
			}.bind(this)
		});
	},
	render : function(){
		var list = this.state.socialInfo.socialList || [],
			linkedin = [],linkedinExp = [],facebook = [],facebookExp = [],twitter = [],twitterExp = [];
		if (!!list) {
			list.map(function(elem){				//分六种情况重排序数据并生成虚拟DOM
				if (elem.provider == "linkedin") {
					if (!elem.isExpire) {
						//未过期的linkedin
						linkedin.push(
							<li className="linkedin" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-linkedin" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">CONTACTS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					} else {
						//已过期的linkedin
						linkedinExp.push(
							<li className="linkedin linkedinExp" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-linkedin" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">CONTACTS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					}
				} else if (elem.provider == "facebook") {
					if (!elem.isExpire) {
						//未过期的facebook
						facebook.push(
							<li className="facebook" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FOLLOWERS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					} else {
						//已过期的facebook
						facebookExp.push(
							<li className="facebook facebookExp" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FOLLOWERS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					}
				} else if (elem.provider == "twitter") {
					if (!elem.isExpire) {
						//未过期的twitter
						twitter.push(
							<li className="twitter" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-twitter" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FRIENDS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					} else {
						//已过期的twitter
						twitterExp.push(
							<li className="twitter twitterExp" key={elem.tokenId}>
								<div className="provider-url">
									<span className="icon"><i className="fa fa-twitter" aria-hidden="true"></i></span>
									<a href={elem.providerUrl}>{elem.showName}</a>
									<p className="out-of-date">(已过期)</p>
								</div>
								<p className="persons"><span className="num">{elem.persons}</span><span className="desc">FRIENDS</span></p>
								<p className="msg-count"><span className="num">{elem.msgCount}</span><span className="desc">已发送信息</span></p>
							</li>
						);
					}
				}
			});
		}
			
		return (
			<ul className="social-list">
				{linkedin}{linkedinExp}<li className="hr"></li>{facebook}{facebookExp}<li className="hr"></li>{twitter}{twitterExp}
			</ul>
		);
	}
});

//管理社交媒体账号
var ManageSocialBtn = React.createClass({
	showManagePop : function(){
		$(this.refs.pop).fadeIn("fast");
	},
	hideManagePop : function(){
		$(this.refs.pop).fadeOut("fast");
	},
	tabCheck : function(ev){
		var index = $(ev.target).parents("li").index();
		index = index >= 0 ? index : $(ev.target).index();
		$(this.refs.navList).find("li").removeClass("active").eq(index).addClass("active");
		$(this.refs.contList).find("li").removeClass("active").eq(index).addClass("active");
	},
	connectEvent : function(ev){
		var providerId = ev.target.getAttribute("role");
		window.open('/phoenix/admin/social/connect/' + providerId);
	},
	render : function(){
		 return (
		 	<div>
		 		<a className="manage-social-btn" onClick={this.showManagePop} href="javascript:;">管理社交媒体账号</a>
		 		<div id="pop-manage" ref="pop">
		 			<div className="pop-box">
						<div className="pop-title">
							管理社交媒体帐号
							<a href="javascript:;" className="pop-close" onClick={this.hideManagePop}></a>
						</div>
						<div className="pop-main">
							<ul className="pop-nav" ref="navList">
								<li className="twitter active" onClick={this.tabCheck}><span><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></span>Twitter</li>
								<li className="facebook" onClick={this.tabCheck}><span><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></span>Facebook</li>
								<li className="linkedin" onClick={this.tabCheck}><span><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></span>LinkedIn</li>
							</ul>
							<ul className="pop-cont" ref="contList">
								<li className="cont-twitter active">
										<h2>添加Twitter账号</h2>
										<p className="tip">请先授权给领动，允许领动获取以下信息：</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter个人档案</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter页面</p>
										<p className="tip-list"><span><i className="fa fa-twitter" aria-hidden="true"></i></span>Twitter群组</p>
										<a href="javascript:;" className="pop-connect func_connect" onClick={this.connectEvent} role="twitter">连接Twitter</a>				 	
												
								</li>
								<li className="cont-facebook">
										<h2>zhangsan</h2>
										<p className="tip"><img src="" width="80px" height="80px"/></p>
										<a href="javascript:;" className="pop-connect func_delete" role="facebook">从领动移除</a>
									
								</li>
								<li className="cont-linkedin">
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

