import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import UserContext from "../context/user/UserContext";
import Cookies from "js-cookie";
import "./Login.css";
import { useNavigate,Link } from 'react-router-dom'; 

const NormalLoginForm = () => {
  const navigate = useNavigate();
  const {signin,message,auth} = useContext(UserContext);
  const onFinish = async (values) => {
    const res = await signin(values);
    if(res){
      navigate('/auth');
    }
  };
  useEffect(() => {
    if(Cookies.get('AUTH_TOKEN')){
      navigate('/auth');
    }
  }, []);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <span style={{color:"red"}}>{message}</span>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default () => <NormalLoginForm />;