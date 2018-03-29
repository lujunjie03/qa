import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Avatar } from 'antd';
import request from 'superagent';

class Collection extends Component {
	state = {
		loading: false,
		data: [],
	}

	componentDidMount() {
		this.onSearch();
	}

  onSearch() {
    this.setState({ loading: true });
    request.post('reply/getCollectReply').send().then(res => {
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
    this.props.history.push(`/question/${item.question}/${item.title}`);
  }

  goReplyDetail(item) {
    this.props.history.push(`/reply/${item.id}/${item.title}`);
  }  

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} >
        <div className="first-avatar" >
          <Avatar src={item.photo} size="small" />
          <div className="autherName" >{item.name}</div>
        </div>
        <div className="listTitle" onClick={this.goQuestionDetail.bind(this, item)} >{item.title}</div>
        <div className="reply-content" onClick={this.goReplyDetail.bind(this, item)} >
          {item.content}
        </div>
        <div className="detail-info" >
          <span>{`${item.upvote>>> 0} 赞同`}</span>
          <span>{`${item.comment>>> 0} 评论`}</span>
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
            {'我的收藏'}
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

export default Collection;