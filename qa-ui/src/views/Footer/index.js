import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { withRouter } from "react-router-dom";

class Footer extends Component {

	componentWillMount() {
		if (!this.props.location.state) {
      this.props.history.push('/login');
    }    
	}

	go(path) {
		const { state } = this.props.location;
		this.props.history.push(path, state)
	}

  render() {
  	const { pathname } = this.props.location;
    return (
      <div>
      	{ this.props.children}
        <Row className="footer">
        	<Col span={8}>
        		<div onClick={this.go.bind(this, '/home')} className={`footerBtnCtn ${ pathname === '/home' ? 'footerBtn-active' : '' }`} >
	        		<Icon className="footerBtn" type="home" />
	        		<p>首 页</p>
        		</div>
        	</Col>
        	<Col span={8}>
        		<div onClick={this.go.bind(this, '/question')} className={`footerBtnCtn ${ pathname === '/question' ? 'footerBtn-active' : '' }`} >
        			<Icon className="footerBtn" type="question-circle-o" />
        			<p>回 答</p>
        		</div>
        	</Col>
        	<Col span={8}>
        		<div onClick={this.go.bind(this, '/personal')} className={`footerBtnCtn ${ pathname === '/personal' ? 'footerBtn-active' : '' }`} >
        			<Icon className="footerBtn" type="user" />
        			<p>我</p>
        		</div>
        	</Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Footer);