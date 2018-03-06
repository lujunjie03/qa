import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ReplyForms extends Component {

	submit() {
		this.props.form.validateFields((errs, values) => {
			if (!errs) {
				this.props.onReply(values);
			}
		})
	}

	render() {
  	const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<FormItem>
					{
						getFieldDecorator('content', {
							rules: [{ required: true, message: '回答内容不能为空！' }],
						})(
						<TextArea rows={6} placeholder="写回答..." />
					)}
				</FormItem>
				<div className='questionCtn'>
					<Button type="primary" size="large" onClick={this.submit.bind(this)}>提交回答</Button>
				</div>
			</Form>
		);
	}
}

const ReplyForm = Form.create()(ReplyForms);
export default ReplyForm;