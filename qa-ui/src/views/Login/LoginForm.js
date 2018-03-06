import React, { Component } from 'react';
import { Button, Form, Input, Icon, Row } from 'antd';

const FormItem = Form.Item;

class LoginForms extends Component {

	handleLogin() {
		this.props.form.validateFields((errs, values) => {
			if (!errs) {
				this.props.onLogin(values);
			}
			
		})
	}

	render() {
  	const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<FormItem>
					{
						getFieldDecorator('number', {
							rules: [{ required: true, message: '请输入账号！' }],
						})(
						<Input size="large" prefix={<Icon type="user" />} placeholder="账号" />
					)}
				</FormItem>
				<FormItem>
					{
						getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码！' }],
						})(
						<Input size="large" type="password" prefix={<Icon type="lock" />} placeholder="密码" />
					)}
				</FormItem>
				<Row className='submit-ctn'>
					<Button className="login-btn" type="primary" size="large" onClick={this.handleLogin.bind(this)}>登录</Button>
				</Row>
			</Form>
		);
	}
}

const LoginForm = Form.create()(LoginForms);
export default LoginForm;