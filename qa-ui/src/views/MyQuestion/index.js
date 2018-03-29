import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col } from 'antd';
import request from 'superagent';
import moment from 'moment';

class MyQuestion extends Component {
	state = {
		loading: false,
		data: [],
	}

	componentDidMount() {
		this.onSearch();
	}

  onSearch() {
    this.setState({ loading: true });
    request.post('question/getQuestionByUserId').send().then(res => {
      if (res.body.back) {
        const backUrl = this.props.location.pathname;
        this.props.history.push('/login', backUrl);
      }

      if (res.body.sucMsg) {
        const { data } = res.body;
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

  goQuestionDetail(item) {
    this.props.history.push(`/question/${item.id}/${item.title}`);
  }
  
  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} onClick={this.goQuestionDetail.bind(this, item)} >
        <div className="listTitle" >{item.title}</div>
        <div className="detail-info" >
          <span>{`${item.reply>>> 0}个回答`}</span>
          <span>{`${item.follow>>> 0}人关注`}</span>
          <span>{moment(item.date).fromNow()}</span>
        </div>
      </List.Item>
    );
  }

  render() {
  	const { loading, data } = this.state;

    return (
    	<div className="detail-ctn" >
        <Row className="titleBar title-fixed" >
          <Col onClick={this.back.bind(this)} span={4}>
            <Icon className="back-btn" type="arrow-left" />
          </Col>
          <Col span={16}>
            {'我的问题'}
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

export default MyQuestion;