import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class QuestionForms extends Component {

	handleQuestion() {
		this.props.form.validateFields((errs, values) => {
			if (!errs) {
				this.props.onQuestion(values);
			}
			
		})
	}

	render() {
  	const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<FormItem>
					{
						getFieldDecorator('title', {
							rules: [{ required: true, message: '请填写问题！' }],
						})(
						<TextArea rows={2} placeholder="问题标题" maxLength={50} />
					)}
				</FormItem>
				<FormItem>
					{
						getFieldDecorator('discription', {
							rules: [{ required: true, message: '请填写问题描述！' }],
						})(
						<TextArea rows={4} placeholder="问题背景、条件等详细信息" />
					)}
				</FormItem>
				<div className='questionCtn'>
					<Button type="primary" size="large" onClick={this.handleQuestion.bind(this)}>提交问题</Button>
				</div>
			</Form>
		);
	}
}

const QuestionForm = Form.create()(QuestionForms);
export default QuestionForm;