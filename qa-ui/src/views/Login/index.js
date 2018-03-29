import React, { Component } from 'react';
import { Button, Modal, Tabs, message } from 'antd';
import request from 'superagent';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import logo from '../../images/blackbg.png';
import { LOGIN, REGISTER } from './constants';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { saveUser } from '../../reducers/user';

const TabPane = Tabs.TabPane;

class Login extends Component {
	state = {
		visible: false,
		activeKey: LOGIN,
	}

	onLogin(data) {
		request.post('users/login').send(data).then(res => {
			if (res.body.sucMsg) {
        const url = this.props.location.state;
        const { data } = res.body;

        this.props.saveUser({ data });

        if (url) {
          this.props.history.goBack();
        } 

        this.props.history.push('/');

      } else {
        message.error(res.body.errMsg);
      }
		});	
	}

  onRegister(data) {
    request.post('users/register').send(data).then(res => {
      if (res.body.sucMsg) {
        const url = this.props.location.state;
        const { data } = res.body;

        this.props.saveUser({ data });

        if (url) {
          this.props.history.goback();
        }

        this.props.history.push('/');
      } else {
        message.error(res.body.errMsg);
      }
    });
  }

	openModal() {
		this.setState({ visible: true });
	}

	closeModal() {
		this.setState({ visible: false });
	}

	changeTabs(activeKey) {
		this.setState({ activeKey });
	}

  render() {

  	const { visible, activeKey } = this.state;

    return (
      <div className='login' >
    		<img src={logo} alt="..." />
      	<div className='homeCtn' >
      		<h3 className='name' >学生答题交流系统</h3>
        	<Button className="login-btn" type="primary" size="large" onClick={this.openModal.bind(this)} >开始使用</Button>
        </div>
        <Modal visible={visible} closable={false} mask={false} footer={null} onCancel={this.closeModal.bind(this)} >
        	<Tabs activeKey={activeKey} onChange={this.changeTabs.bind(this)} >
        		<TabPane tab='登录' key={LOGIN}>
        			<LoginForm onLogin={this.onLogin.bind(this)} />
        		</TabPane>
        		<TabPane tab='注册' key={REGISTER}>
        			<RegisterForm onRegister={this.onRegister.bind(this)} />
        		</TabPane>
        	</Tabs>
        </Modal>
      </div>
    );
  }
}


export default connect(state => ({}), (dispatch) => bindActionCreators({ saveUser }, dispatch))(Login);