import React, { useState,useContext } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import { Typography } from 'antd';
import {useNavigate} from 'react-router-dom';
import UserContext from '../context/user/UserContext';
const { Title } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {signup,message} = useContext(UserContext);
  const onFinish = async (values) => {
    const res = await signup(values);
    if(res){
      navigate('/auth/organizations');
    }
  };

  return (
      <Row style = {{height:"100vh"}} justify="space-around" align="middle">
        <Col span={12} style={{ boxShadow: "rgb(179 179 179 / 85%) -4px 7px 20px"}}>
          <Title style = {{background:"#1890ff",textAlign:"center",color:'white'}} level={2}>REGISTRARSE</Title>
          <Form 
            style={{margin:"2em"}}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            scrollToFirstError
          >
            <span style = {{color:"red"}}>{message}</span>
            <Form.Item
              name="name"
              label="Nombre"
              labelCol={{span:6}}
              
              rules={[{ required: true, message: '¡Por favor ingrese su nombre!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Apellido"
              labelCol={{span:6}}
              rules={[{ required: true, message: '¡Por favor ingrese su apellido!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Nombre de usuario"
              labelCol={{span:6}}
              rules={[{ required: true, message: '¡Por favor ingrese su nombre de usuario!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Correo electronico"
              labelCol={{span:6}}
              rules={[
                {
                  type: 'email',
                  message: 'La entrada no es válida Correo electrónico!',
                },
                {
                  required: true,
                  message: '¡Por favor ingrese su correo electrónico!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              labelCol={{span:6}}
              rules={[
                {
                  required: true,
                  message: '¡Por favor ingrese su contraseña!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="confirmar Contraseña"
              labelCol={{span:6}}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '¡Por favor, confirme su contraseña!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('¡Las dos contraseñas que ingresó no coinciden!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{textAlign:"center"}}>
              <Button type="primary" htmlType="submit" size="large"> 
                Registro
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  );
};

export default () => <RegistrationForm />;