import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Button, Avatar, Modal } from 'antd';
import request from 'superagent';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReplyForm from './ReplyForm';
import { saveQuestionDetail, cancel, follow } from '../../reducers/questionDetail';

class QuestionDetail extends Component {
	state = {
    title: undefined,
		loading: false,
	}

  componentWillMount() {
    const { title } = this.props.match.params;
    this.setState({ title });
  }

	componentDidMount() {
    const { id, match } = this.props;
    if (id !== match.params.id) {
      this.onSearch();
    }
		
	}

  onSearch() {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    request.post('/question/getQuestionById').send({ id }).then(res => {
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }

      if (res.body.sucMsg) {
        const { data } = res.body;
        const { reply } = data;
        this.setState({ loading: false });
        this.props.saveQuestionDetail({ data, reply, id });
      } else {
        message.error(res.body.errMsg);
        this.setState({ loading: false });
      }
    });
  }

  onReply(data) {
    const { id } = this.props.match.params;
    request.post('/reply/addReply').send({ ...data, question: id }).then(res => {
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }

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
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }

      if (res.body.sucMsg) {
        this.props.follow();
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

  cancelFollow() {
    const { id } = this.props.match.params;
    request.post('/follow/delFollow').send({ question: id }).then(res => {
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }
      
      if (res.body.sucMsg) {
        this.props.cancel();
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

  go(item) {
    const { title } = this.state;
    this.props.history.push(`/reply/${item.id}/${title}`);
  }

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} onClick={this.go.bind(this, item)} >
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
  	const { loading, visible, title } = this.state;
    const { data = {}, reply = [] } = this.props;
    const { discription, follow, isFollow } = data;

    return (
    	<div  className="detail-ctn" >
        <Row className="titleBar title-fixed" >
          <Col onClick={this.back.bind(this)} span={4}>
            <Icon className="back-btn" type="arrow-left" />
          </Col>
          <Col className="detail-title-ctn" span={16} >{title}</Col>
        </Row>
        <div className='question-ctn'>
          <Spin spinning={loading} >
          <div className="discription-wrp" >
            <div className="discription" >{discription}</div>
            <div className="detail-info" >
              <span>{`${(follow >>> 0).toLocaleString()}人关注`}</span>
              <span>{`${(reply.length).toLocaleString()}个回答`}</span>
            </div>
            <Row className="detail-btn-ctn" >
              <Col span={11} >
                { 
                  isFollow === 0 
                  ?
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
        </div>
        <Modal title="撰写回答" visible={visible} footer={null} onCancel={this.close.bind(this)} >
          <ReplyForm ref={ ref => { this.form = ref; }} onReply={this.onReply.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default connect(state => ({ ...state.questionDetail }), (dispatch) => bindActionCreators({ saveQuestionDetail, cancel, follow }, dispatch))(QuestionDetail);