import React, { Component } from 'react';
import { Row, Button, Form, Input, Icon } from 'antd';

const FormItem = Form.Item;

class RegisterForms extends Component {

	handleRegister() {
		this.props.form.validateFieldsAndScroll((errs, values) => {
			if (!errs) {
				this.props.onRegister(values);
			}
			
		})
	}

	checkPassword(rule, value, callback) {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')){
			callback('两次密码输入不一致！');
		} else {
			callback();
		}
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
						<Input prefix={<Icon type="user" />} placeholder="账号" />
					)}
				</FormItem>
				<FormItem>
					{
						getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码！' }],
						})(
						<Input type="password" prefix={<Icon type="lock" />} placeholder="密码" />
					)}
				</FormItem>
				<FormItem>
					{
						getFieldDecorator('confirmPassword', {
							rules: [
								{ required: true, message: '请输入密码！' },
								{ validator: this.checkPassword.bind(this) }],
						})(
						<Input type="password" prefix={<Icon type="lock" />} placeholder="密码" />
					)}
				</FormItem>
				<FormItem>
					{
						getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入昵称！' }],
						})(
						<Input prefix={<Icon type="smile-o" />} placeholder="昵称" />
					)}
				</FormItem>
				<Row className='submit-ctn'>
					<Button className="login-btn" type="primary" size="large" onClick={this.handleRegister.bind(this)}>注册</Button>
				</Row>
			</Form>
		);
	}
}

const RegisterForm = Form.create()(RegisterForms);
export default RegisterForm;