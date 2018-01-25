import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Button, Avatar, Modal } from 'antd';
import request from 'superagent';
import moment from 'moment';

import ReplyForm from './ReplyForm';

class QuestionDetail extends Component {
	state = {
    title: undefined,
		loading: false,
		data: {},
    reply: [],
	}

  componentWillMount() {
    const { title } = this.props.match.params;
    this.setState({ title });
  }

	componentDidMount() {
    console.log(this.props)
		this.onSearch();
	}

  onSearch() {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    request.post('/question/getQuestionById').send({ id }).then(res => {
      if (res.body.sucMsg) {
        const { data } = res.body;
        const { reply } = data;
        this.setState({ loading: false, data, reply });
      } else {
        message.error(res.body.errMsg);
        this.setState({ loading: false });
      }
    });
  }

  onReply(data) {
    const { id } = this.props.match.params;
    request.post('/reply/addReply').send({ ...data, question: id }).then(res => {
      if (res.body.sucMsg) {
        message.success(res.body.sucMsg);
        this.onSearch();
        this.close();
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

  followQuestion() {
    const { id } = this.props.match.params;
    request.post('/follow/addFollow').send({ question: id }).then(res => {
      if (res.body.sucMsg) {
        const { data } = this.state;
        data.follow = data.follow + 1;
        data.isFollow = 1;
        this.setState({ data });
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

  cancelFollow() {
    const { id } = this.props.match.params;
    request.post('/follow/delFollow').send({ question: id }).then(res => {
      if (res.body.sucMsg) {
        const { data } = this.state;
        data.follow = data.follow - 1;
        data.isFollow = 0;
        this.setState({ data });
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

  back() {
    this.props.history.goBack();
  }

  open() {
    this.setState({ visible: true });
  }

  close() {
    this.form && this.form.resetFields();
    this.setState({ visible: false });
  }

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} >
        <div>
          <Avatar src={item.photo} size="small" />
          <div className="autherName" >{item.name}</div>
        </div>
        <div className="reply-content" >{item.content}</div>
        <div className="detail-info" >
          <span>{`${(item.upvote>>> 0).toLocaleString()}赞同`}</span>
          <span>{`${(item.comment >>> 0).toLocaleString()}评论`}</span>
          <span>{moment(item.date).fromNow()}</span>
        </div>
      </List.Item>
    );
  }

  render() {
  	const { loading, visible, data, title, reply } = this.state;
    const { discription, follow, isFollow } = data;

    return (
    	<div  className="detail-ctn" >
        <Row className="titleBar" >
          <Col onClick={this.back.bind(this)} span={4}>
            <Icon className="back-btn" type="arrow-left" />
          </Col>
          <Col className="detail-title-ctn" span={16} >{title}</Col>
        </Row>
        <Spin spinning={loading} >
        <div className="discription-wrp" >
          <div>{discription}</div>
          <div className="detail-info" >
            <span>{`${(follow >>> 0).toLocaleString()}人关注`}</span>
            <span>{`${(reply.length).toLocaleString()}个回答`}</span>
          </div>
          <Row className="detail-btn-ctn" >
            <Col span={11} >
              { isFollow === 0 ?
                <Button type="primary" icon="plus" onClick={this.followQuestion.bind(this)} >关注问题</Button>
                :
                <Button type="primary" icon="minus" onClick={this.cancelFollow.bind(this)} >取消关注</Button>
              }
            </Col>
            <Col offset={2} span={11} >
              <Button type="primary" icon="edit" onClick={this.open.bind(this)} >添加回答</Button>
            </Col>
          </Row> 
        </div>
          <List itemLayout="vertical" pagination={false} dataSource={reply} renderItem={this.renderItem.bind(this)} />
        </Spin>
        <Modal title="撰写回答" visible={visible} footer={null} onCancel={this.close.bind(this)} >
          <ReplyForm ref={ ref => { this.form = ref; }} onReply={this.onReply.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default QuestionDetail;