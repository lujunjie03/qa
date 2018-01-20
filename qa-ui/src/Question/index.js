import React, { Component } from 'react';
import { Button, Input, message, Modal, List, Avatar, Spin, Row, Col } from 'antd';
import request from 'superagent';

import QuestionForm from '../Home/QuestionForm';

const Search = Input.Search;

class Question extends Component {
	state = {
		visible: false,
		loading: false,
		data: [],
	}

	componentDidMount() {
		this.onSearch('');
	}

  onSearch(value) {
    this.setState({ loading: true });
    request.post('question/getQuestion').send({ title: value }).then(res => {
      if (res.body.sucMsg) {
        const { data } = res.body;
        this.setState({ loading: false, data });
      } else {
        message.error(res.body.errMsg);
        this.setState({ loading: false });
      }
    });
  }

  onQuestion(data) {
    request.post('question/addQuestion').send(data).then(res => {
      if (res.body.sucMsg) {
        message.success(res.body.sucMsg);
        this.closeModal();
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

  openModal() {
    this.setState({ visible: true });
  }

  closeModal() {
    this.form && this.form.resetFields();
    this.setState({ visible: false });
  }

  goQuestionDetail(item) {
    this.props.history.push(`/question/${item.id}/${item.title}`);
  }

  renderTitle() {
    return (
      <div className="questionTitle" >
        <h2>写下你的问题</h2>
        <p>描述精确的问题更容易得到解答</p>
      </div>
    );
  }

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} onClick={this.goQuestionDetail.bind(this, item)} >
        <div className="listTitle" >{item.title}</div>
        <div className="itemCtn" >
          <Avatar className="autherPhoto" src={item.photo} size="small" />
          <div className="autherName" >{`${item.name}：`}</div>
          {item.discription}
        </div>
      </List.Item>
    );
  }

  render() {
  	const { visible, loading, data } = this.state;
  	const title = this.renderTitle();

    return (
    	<div className="home" >
        <Row className="searchBar" >
        	<Col span={19} >
        		<Search placeholder="搜索你感兴趣的内容..." onSearch={this.onSearch.bind(this)} enterButton />
        	</Col>
        	<Col span={4} offset={1} >
        		<Button type="primary" onClick={this.openModal.bind(this)} >提问</Button>
        	</Col>
        </Row>
        <div className="indexCtn" >
          <Spin spinning={loading} >
            <List itemLayout="vertical" pagination={false} dataSource={data} renderItem={this.renderItem.bind(this)} />
          </Spin>
        </div>
        <Modal visible={visible} title={title} footer={null} onCancel={this.closeModal.bind(this)} >
          <QuestionForm ref={ref => { this.form = ref; }} onQuestion={this.onQuestion.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default Question;