import React, { Component } from 'react';
import { Row, Col, Avatar, Icon, Button } from 'antd';

class Personal extends Component {

	logout() {
		this.props.history.push('/login');
	}

	go(url) {
		const { state } = this.props.location;
		this.props.history.push(url, state);
	}

  render() {
  	const { name, photo } = this.props.location.state;
    return (
      <div className="personalCtn" >
      	<div className="titleBar" >
      		{'个人中心'}
      	</div>
       	<Row className="userInfo" >
       		<Col span={8} style={{textAlign: 'center'}} >
       			<Avatar src={photo} size="large" />
       		</Col>
       		<Col span={12} >
       			<span className="userName" >{name}</span>
       		</Col>
       	</Row>
       	<div className="personalMain"  >
	       	<Row onClick={this.go.bind(this, './myQuestion')} >
	       		<Col className="personalLogo" span={6}>
	       			<Icon className="question-circle" type="question-circle" />
	       		</Col>
	       		<Col className="personalTitle" span={17} >
	       			<span>{'我的问题'}</span>
	       		</Col>
	       	</Row>
	       	<Row onClick={this.go.bind(this, './myReply')} >
	       		<Col className="personalLogo" span={6}>
	       			<Icon className="tag" type="tag" />
	       		</Col>
	       		<Col className="personalTitle" span={17} >
	       			<span>{'我的回答'}</span>
	       		</Col>
	       	</Row>
	       	<Row onClick={this.go.bind(this, './message')} >
	       		<Col className="personalLogo" span={6}>
	       			<Icon className="wechat" type="wechat" />
	       		</Col>
	       		<Col className="personalTitle" span={17} >
	       			<span>{'我的消息'}</span>
	       		</Col>
	       	</Row>
	       	<Row onClick={this.go.bind(this, './collection')} >
	       		<Col className="personalLogo" span={6}>
	       			<Icon className="star" type="star" />
	       		</Col>
	       		<Col className="personalTitle" span={17} >
	       			<span>{'我的收藏'}</span>
	       		</Col>
	       	</Row>
	       	<Row onClick={this.go.bind(this, './follow')} >
	       		<Col className="personalLogo" span={6}>
	       			<Icon className="eye" type="eye" />
	       		</Col>
	       		<Col className="personalTitle" span={17} >
	       			<span>{'我的关注'}</span>
	       		</Col>
	       	</Row>
	       	
	      </div>
	      <Row className="logout-ctn" >
       		<Button className="login-btn" type="primary" onClick={this.logout.bind(this)} >退出登录</Button>
       	</Row>
      </div>
    );
  }
}

export default Personal;