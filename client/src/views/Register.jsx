import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { Typography } from 'antd';
import { Card } from 'antd';
import {useNavigate} from 'react-router-dom';
const { Option } = Select;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { Title } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/auth');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
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
            <Form.Item
              name="name"
              label="Nombre"
              labelCol={{span:6}}
              
              rules={[{ required: true, message: '¡Por favor ingrese su nombre!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last"
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