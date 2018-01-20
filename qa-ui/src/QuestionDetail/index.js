import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col, Button, Avatar } from 'antd';
import request from 'superagent';

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
    console.log(this.props)
  }

	componentDidMount() {
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

  back() {
    this.props.history.goBack();
  }

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} >
        <div>
          <Avatar src={item.photo} size="small" />
          <div className="autherName" >{item.name}</div>
        </div>
      </List.Item>
    );
  }

  render() {
  	const { loading, data, title, reply } = this.state;
    const { discription } = data;

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
            <span>{`0人关注`}</span>
            <span>{`${reply.length}个回答`}</span>
          </div>
          <Row className="detail-btn-ctn" >
            <Col span={11} >
              <Button type="primary" icon="plus" >关注问题</Button>
            </Col>
            <Col offset={2} span={11} >
              <Button type="primary" icon="edit" >添加回答</Button>
            </Col>
          </Row> 
        </div>
          <List itemLayout="vertical" pagination={false} dataSource={reply} renderItem={this.renderItem.bind(this)} />
        </Spin>
      </div>
    );
  }
}

export default QuestionDetail;