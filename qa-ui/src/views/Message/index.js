import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Avatar } from 'antd';
import request from 'superagent';
import moment from 'moment';

class Message extends Component {
	state = {
		loading: false,
		data: [],
	}

	componentDidMount() {
    this.onSearch();
	}

  onSearch() {
    this.setState({ loading: true });
    request.post('message/getMessage').send().then(res => {
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }

      if (res.body.sucMsg) {
        const { data } = res.body;
        data.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))

        this.setState({ loading: false, data });
      } else {
        message.error(res.body.errMsg);
        this.setState({ loading: false });
      }
    });
  }

  back() {
    this.props.history.goBack();
  }

  goReplyDetail(item) {
    this.props.history.push(`/reply/${item.id}/${item.title}`);
  }

  renderItem(item) {

    return (
      <List.Item className="list-item" onClick={this.goReplyDetail.bind(this, item)} >
        <Row>
          <Col span={4} >
            <Avatar src={item.photo}/>
          </Col>
          <Col span={20} >
            {
              item.answer
              &&
              <div>
                <span>{item.name}</span>
                &nbsp;&nbsp;
                <span>回答了你的问题</span>
                &nbsp;&nbsp;
                <strong>{item.title}</strong>
              </div>
            }
            {
              item.commentor
              &&
              <div>
                <span>{item.name}</span>
                &nbsp;&nbsp;
                <span>评论了你的回答</span>
                &nbsp;&nbsp;
                <strong>{item.content}</strong>
              </div>
            }

            <div className="detail-info" >
              <span>{moment(item.date).fromNow()}</span>
            </div>
          </Col>
        </Row>
      </List.Item>
    );
  }

  render() {
  	const { loading, data } = this.state;

    return (
    	<div  className="detail-ctn" >
        <Row className="titleBar title-fixed" >
          <Col onClick={this.back.bind(this)} span={4}>
            <Icon className="back-btn" type="arrow-left" />
          </Col>
          <Col span={16}>
            {'我的消息'}
          </Col>
        </Row>
        <div className='question-ctn' >
          <Spin spinning={loading} >
            <List itemLayout="vertical" pagination={false} dataSource={data} renderItem={this.renderItem.bind(this)} />
          </Spin>
        </div>
      </div>
    );
  }
}

export default Message;