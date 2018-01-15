import React, { Component } from 'react';
import { Button, Input, List, Modal, message, Spin, Avatar, Icon, Row, Col } from 'antd';
import request from 'superagent';

import QuestionForm from './QuestionForm';

const Search = Input.Search;
const { TextArea } = Input;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Home extends Component {
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
    request.post('reply/getReply').send({ title: value }).then(res => {
      if (res.body.sucMsg) {
        console.log(res)
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

  renderTitle() {
    return (
      <div className="questionTitle" >
        <h2>写下你的问题</h2>
        <p>描述精确的问题更容易得到解答</p>
      </div>
    );
  }

  renderItem(item) {

    const actions = [
      <IconText type="star-o" text="156" />,
      <IconText type="like-o" text="156" />,
      <IconText type="message" text="2" />
    ];

    return (
      <List.Item className="listItem" key={item.id} actions={actions} >
        <p className="listTitle" >{item.title}</p>
        <div>
          <Avatar src={item.photo} size="small" />
          <div className="autherName" >{item.name}</div>
          <div className="date" >{`回答于${item.date}`}</div>
        </div>
        {item.content}
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

export default Home;