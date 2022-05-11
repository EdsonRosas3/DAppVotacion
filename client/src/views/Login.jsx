import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,RightOutlined } from '@ant-design/icons';
import UserContext from "../context/user/UserContext";
import Cookies from "js-cookie";
import "./Login.css";
import { useNavigate,Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Typography } from 'antd'; 

const NormalLoginForm = () => {
  const navigate = useNavigate();
  const {signin,message,auth} = useContext(UserContext);
  const onFinish = async (values) => {
    
    const res = await signin(values);
    
    if(res){
      navigate('/auth/organizations');
    }
  };
  useEffect(() => {
    if(Cookies.get('AUTH_TOKEN')){
      navigate('/auth/organizations');
    }
  }, []);

  const { Title } = Typography;

  return (

    <Row style = {{height:"100vh"}} justify="space-around" align="middle">
      <Col span={8} style={{ boxShadow: "rgb(179 179 179 / 85%) -4px 7px 20px"}}>
        <Title style = {{background:"#1890ff",textAlign:"center",color:'white'}} level={2}>INICIO DE SESION</Title>
        <Form style={{margin:"2em"}}
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
                message: '¡Por favor ingrese su nombre de usuario!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre de usuario" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese su contraseña!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item style={{textAlign:"center"}}>
            <Button type="primary" htmlType="submit" className="login-form-button" size="large" icon={<RightOutlined />}>
                Iniciar
            </Button>

          </Form.Item>
          <Form.Item style={{textAlign:"center"}}>
            <Link to="/signup">¡Regístrate ahora!</Link>
          </Form.Item>
        </Form>
        
      </Col>
    </Row>
  

    
  );
};

export default () => <NormalLoginForm />;