import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Button, Avatar, Modal, Input } from 'antd';
import request from 'superagent';
import moment from 'moment';
import { connect } from 'react-redux';

const { TextArea } = Input;

class ReplyDetail extends Component {
	state = {
		title: undefined,
		loading: true,
		data: {},
		comment: [],
		value: '',
		commenting: false,
	}

	componentWillMount() {
		const { title } = this.props.match.params;
		this.setState({ title, loading: true });
	}

	componentDidMount() {
		this.onSearch();
	}

  	onSearch() {
	    const { id } = this.props.match.params;
	    request.post('/reply/getReplyById').send({ id }).then(res => {
	    	if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				const { data } = res.body;
				const { comment } = data;
				this.setState({ loading: false, data, comment });
			} else {
				message.error(res.body.errMsg);
				this.setState({ loading: false });
			}
	    });
	}

	onComment() {
		this.setState({ commenting: true });
		const { id } = this.props.match.params;
		const { value } = this.state;
		request.post('/comment/addComment').send({ reply: id, content: value }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				this.onSearch();
				this.setState({ commenting: false, value: '' });
			} else {
				message.error(res.body.errMsg);
				this.setState({ commenting: false });
			}
	    });
	}

	deleteComment(item) {
		request.post('/comment/delComment').send({ id: item.id }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				this.onSearch();
			} else {
				message.error(res.body.errMsg);
			}
	    });
	}

	cancelUpvote() {
		const { id } = this.props.match.params;
		request.post('/upvote/delUpvote').send({ reply: id }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				const { data } = this.state;
				let { upvote, isUpvote } = data;
				upvote = upvote - 1;
				isUpvote = 0;
				this.setState({ data: { ...data, upvote, isUpvote } });
			} else {
				message.error(res.body.errMsg);
			}
	    });
	}

	onUpvote() {
		const { id } = this.props.match.params;
		request.post('/upvote/addUpvote').send({ reply: id }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				const { data } = this.state;
				let { upvote, isUpvote } = data;
				upvote = upvote + 1;
				isUpvote = 1;
				this.setState({ data: { ...data, upvote, isUpvote } });
			} else {
				message.error(res.body.errMsg);
			}
	    });
	}

	onCollect() {
		const { id } = this.props.match.params;
		request.post('/collection/addCollection').send({ reply: id }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}

			if (res.body.sucMsg) {
				const { data } = this.state;
				this.setState({ data: { ...data, isCollect: 1 } });
			} else {
				message.error(res.body.errMsg);
			}
	    });
	}

	cancelCollect() {
		const { id } = this.props.match.params;
		request.post('/collection/delCollection').send({ reply: id }).then(res => {
			if (res.body.back) {
	    		const backUrl = this.props.location.pathname;
	    		this.props.history.push('/login', backUrl);
	    	}
			
			if (res.body.sucMsg) {
				const { data } = this.state;
				this.setState({ data: { ...data, isCollect: 0 } });
			} else {
				message.error(res.body.errMsg);
			}
	    });
	}

	back() {
    	this.props.history.goBack();
	}

	edit(e) {
		let { value } = e.target;
		value = String.prototype.trim.call(value);
		this.setState({ value }, () =>{
			this.replyCtn.scrollTop = this.replyCtn.scrollHeight;
		});
	}

	focus() {
		this.textArea.textAreaRef.focus();
	}

	renderItem(item) {

	    return (
			<List.Item className="comment-item" key={item.id}>
				<Row>
					<Col span={4} >
						<Avatar src={item.photo}/>
					</Col>
					<Col span={20} >
						<div className="comment-name" >{item.name}</div>
						<div className="comment-ctn" >{item.content}</div>
						<div className="detail-info" >
							<span>{moment(item.date).fromNow()}</span>
							{
								this.props.user.id === item.commentor 
								&&
								<span onClick={this.deleteComment.bind(this, item)} >删除</span>
							}
						</div>
					</Col>
				</Row>
			</List.Item>
	    );
	}

	render() {
		const { loading, title, data, comment, value, commenting } = this.state;
		const { content, date, name, photo, upvote, isUpvote, isCollect, comments } = data;

		return (
			<div  className="detail-ctn" >
		        <Row className="titleBar title-fixed" >
					<Col onClick={this.back.bind(this)} span={4}>
						<Icon className="back-btn" type="arrow-left" />
					</Col>
					<Col className="detail-title-ctn" span={16} >{title}</Col>
		        </Row>
		        <div className="reply-ctn" ref={ref => { this.replyCtn = ref; }} >
			        <Spin spinning={loading} >
			        	<div className="auther-row">
							<Avatar src={photo} size="large" />
							<div>{name}</div>
				        </div>
			        	<div className="discription-wrp" >
							<div className="discription" >{content}</div>
							<div className="detail-footer" >
								<div>{`发布于 ${moment(date).fromNow()}`}</div>
								<div>著作权归作者所有</div>
							</div>
						</div>
						<div className="comment-head">{comments ? `评论(${comments})` : '暂无评论' }</div>
						<List itemLayout="vertical" pagination={false} dataSource={comment} renderItem={this.renderItem.bind(this)} />
						<Row className="comment-input" gutter={8} >
							<Col span={18} >
								<TextArea value={value} ref={ref => { this.textArea = ref; }} autosize onChange={this.edit.bind(this)} placeholder="写下你的评论..." />
							</Col>
							<Col span={6}>
								<Button type="primary" loading={commenting} onClick={this.onComment.bind(this)}  >评论</Button>
							</Col>
						</Row>
			        </Spin>		        	
		        </div>
		        <Row className="footer">
        			<Col span={8}>
        				{
        					isUpvote
        					?
        					<div className="like footerBtn-active" onClick={this.cancelUpvote.bind(this)} >
        						<Icon className="footerBtn" type="like" />
        						&nbsp;&nbsp;
        						{upvote}
        					</div>
        					:
        					<div className="like" >
        						<Icon className="footerBtn" type="like-o" onClick={this.onUpvote.bind(this)} />
        						&nbsp;&nbsp;
        						{upvote}
        					</div>
        				}
        			</Col>
        			<Col span={8}>
        				{
        					isCollect
        					?
        					<div className="footerBtnCtn footerBtn-active" onClick={this.cancelCollect.bind(this)} >
			        			<Icon className="footerBtn" type="star" />
			        			<p>收 藏</p>
			        		</div>
        					:
        					<div className="footerBtnCtn" onClick={this.onCollect.bind(this)} >
			        			<Icon className="footerBtn" type="star-o" />
			        			<p>收 藏</p>
			        		</div>
        				}
        			</Col>
        			<Col span={8}>
        				<div className="footerBtnCtn" onClick={this.focus.bind(this)} >
		        			<Icon className="footerBtn" type="message" />
		        			<p>{ comments >>> 0 || '评 论'}</p>
		        		</div>
        			</Col>
    			</Row>
			</div>
		);
	}

}

export default connect(state => ({ user: state.user }))(ReplyDetail);
