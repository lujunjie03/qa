import React, { Component } from 'react';
import { Button, Input, message, Modal, List, Avatar, Spin, Row, Col } from 'antd';
import request from 'superagent';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import QuestionForm from '../Home/QuestionForm';
import { createQuestion } from '../../reducers/question';

const Search = Input.Search;

class Question extends Component {
	state = {
		visible: false,
		loading: false,
    keyword: '',
	}

	componentDidMount() {
    const { data, keyword } = this.props;
    if (data) {
      this.setState({ keyword });
    } else {
      this.onSearch('');
    }
	}

  onSearch(value) {
    this.setState({ loading: true });
    request.post('question/getQuestion').send({ title: value }).then(res => {
      if (res.body.sucMsg) {
        const { data } = res.body;
        this.setState({ loading: false });
        this.props.createQuestion({ data, keyword: value });
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
        this.onSearch('');
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

  edit(e) {
    const keyword = e.target.value;
    this.setState({ keyword });
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
  	const { visible, loading, keyword } = this.state;
    const { data = [] } = this.props;
  	const title = this.renderTitle();

    return (
    	<div className="home" >
        <Row className="searchBar" >
        	<Col span={19} >
        		<Search value={keyword} onChange={this.edit.bind(this)} placeholder="搜索你感兴趣的内容..." onSearch={this.onSearch.bind(this)} enterButton />
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

export default connect(state => ({ ...state.question }), (dispatch) => bindActionCreators({ createQuestion }, dispatch))(Question);