var MessagesInputArea = React.createClass({
	render:function(){
		return (
				<div className="msgInputArea sections">
					<div className="socialBtns fix">
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
						<div className="textSizeCheck flr">
							<span className="textSizeTip">还可以输入：</span>
							<div className="checkBtn facebook small"><i className="fa fa-facebook"></i></div>
							<ins className="error">140</ins>
							<div className="checkBtn twitter small"><i className="fa fa-twitter"></i></div>
							<ins>200</ins>
							<div className="checkBtn LinkedIn small"><i className="fa fa-linkedin"></i></div>
							<ins>600</ins>
						</div>
					</div>

					<div className="messageInputSec mt10">
						<div className="messageInputWrap">
							<textarea name="messageInput" id="messageInput"></textarea>
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
								<a href="javascript:;" className="postBtns-draft">保存草稿</a>
								<a href="javascript:;" className="postBtns-push">发布</a>
							</div>
						</div>
					</div>
				</div>
			);
	}
})

var MessagesListTabs = React.createClass({
	render:function(){
		return (
			<div className="msgListTabs sections">
				<div className="msgListTabBtns">
					<a href="javascript:;" className="on">已发布</a>
					<a href="javascript:;">待发布</a>
					<a href="javascript:;">草稿</a>
					<div className="msgListTabContCheck">
						<label className="on"><input type="checkbox" value="facebook" /><i className="fa fa-check"></i> Facebook</label>
						<label><input type="checkbox" value="twitter" /><i className="fa fa-check"></i> twitter</label>
						<label><input type="checkbox" value="linkedin" /><i className="fa fa-check"></i> linkedin</label>
					</div>
				</div>
				<div className="msgListTabList">
					<ul>
						<li>列表数据</li>
					</ul>
				</div>
			</div>
		);
	}
});

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

