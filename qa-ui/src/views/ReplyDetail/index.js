import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Button, Avatar, Modal, Input } from 'antd';
import request from 'superagent';
import moment from 'moment';

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
		this.setState({ title });
	}

	componentDidMount() {
		this.onSearch();
	}

  	onSearch() {
	    const { id } = this.props.match.params;
	    request.post('/reply/getReplyById').send({ id }).then(res => {
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
        					<div className="like footerBtn-active" >
        						<Icon className="footerBtn" type="like" />
        						&nbsp;&nbsp;
        					</div>
        					:
        					<div className="like" >
        						<Icon className="footerBtn" type="like-o" />
        						&nbsp;&nbsp;
        						{upvote}
        					</div>
        				}
        			</Col>
        			<Col span={8}>
        				{
        					isCollect
        					?
        					<div className="footerBtnCtn footerBtn-active" >
			        			<Icon className="footerBtn" type="star" />
			        			<p>收 藏</p>
			        		</div>
        					:
        					<div className="footerBtnCtn" >
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

export default ReplyDetail;
