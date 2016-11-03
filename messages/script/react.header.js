var MessagesHeader = React.createClass({
	getInitialState : function(){		
		return {data: {}};
	},
	componentDidMount : function() {
		//组装页面中的数据
		var headerData = {
			"notice" : $("#unreadCount").text(),
			"userName" : $("#userName").text(),
			"iconUrl" : $("#imgUrl").attr("src"),
			"selectOptions" : []
		};
		$("#optionList").children("div").each(function(){
			headerData.selectOptions.push({
				"klass" : $(this).attr("class"),
				"url" : $(this).children().attr("href") || "javascript:;",
				"words" : $(this).children().text() || ""
			});
		});
		//console.log(headerData);

		this.setState({data: headerData});
	},
	render : function(){
		var numIcon = null;
		if (this.state.data.notice > 0) {
			numIcon = (<span className="num" key={this.state.data.notice}>{this.state.data.notice}</span>);
		}
		return (
			<div className="header-inner">
				<img className="logo fll" src="../images/logo.png" />
				<a className="goto-mysite fll" href="/website.html">进入我的网站</a>
				<UserSelect dataPack={this.state.data} />
				<img className="avatar flr" src={this.state.data.iconUrl} />
				<a href="/messages.html" className="notice flr">
					<i className="fa fa-bell-o" aria-hidden="true"></i>
					{numIcon}
				</a>
			</div>
		);
	}
});

//下拉框组件
var UserSelect = React.createClass({
	getInitialState : function(){
		return ({showOptions : false});
	},
	componentDidMount : function(){
		document.addEventListener("click",function(ev){
			var tar = ev.target;
			if ( !(tar.className.indexOf("user-option") >= 0) &&
				 !(tar.parentNode.className.indexOf("user-option") >= 0) &&
				 !(tar.parentNode.parentNode.className.indexOf("user-option") >= 0) ) {
				this.setState({showOptions : false});
			}
		}.bind(this));
	},
	componentWillUnmount : function(){
		document.removeEventListener("click");
	},
	optionSlide : function(){
		this.setState({showOptions : !this.state.showOptions});
	},
	render : function(){
		var option_lis = [];
		if (!!this.props.dataPack.selectOptions) {
			this.props.dataPack.selectOptions.map(function(elem,index){
				option_lis.push(
					<li className={elem.klass} key={index}>
						<a href={elem.url}>
							<span className="options-icon"></span>
							{elem.words}
						</a>
					</li>
				)
			});
		}
			
		return(
			<div className="user-option flr" onClick={this.optionSlide}>
				<span className="user-name">{this.props.dataPack.userName}</span>
				<i className="fa fa-caret-down" aria-hidden="true"></i>
				<ul className={"option-list" + (this.state.showOptions ? " option-show" : " option-hide")} ref="optionList">
					{option_lis}
				</ul>
			</div>
		);
	}
});

ReactDOM.render(<MessagesHeader url="/data/header" />,document.getElementById('header'));