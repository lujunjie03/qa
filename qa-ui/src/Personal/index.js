import React, { Component } from 'react';
import { Row, Col, Avatar, Icon } from 'antd';

class Personal extends Component {

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
       			<span className="userName" >{name + '卢俊杰'}</span>
       		</Col>
       	</Row>
       	<div className="personalMain" >
	       	<Row>
	       		<Col className="personalLogo" span={6}>
	       			<Icon type="question-circle" />
	       		</Col>
	       		<Col span={12} >
	       			<span>{'我的问题'}</span>
	       		</Col>
	       	</Row>
	       	<Row>
	       		<Col span={4} offset={4} >
	       			<Icon type="edit" />
	       		</Col>
	       		<Col span={12} >
	       			<span>{'我的回答'}</span>
	       		</Col>
	       	</Row>
	       	<Row>
	       		<Col span={4} offset={4} >
	       			<Icon type="edit" />
	       		</Col>
	       		<Col span={12} >
	       			<span>{'我的消息'}</span>
	       		</Col>
	       	</Row>
	       	<Row>
	       		<Col span={4} offset={4} >
	       			<Icon type="star" />
	       		</Col>
	       		<Col span={12} >
	       			<span>{'我的收藏'}</span>
	       		</Col>
	       	</Row>
	       	<Row>
	       		<Col span={4} offset={4} >
	       			<Icon type="eye" />
	       		</Col>
	       		<Col span={12} >
	       			<span>{'我的关注'}</span>
	       		</Col>
	       	</Row>
	      </div>
      </div>
    );
  }
}

export default Personal;