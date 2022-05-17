import React, { useEffect ,useState} from "react";
import { Modal, Button } from 'antd';
import { Row, Col } from 'antd';
import {
    Form,
    Input,
    Select
  } from 'antd';

  const { Option } = Select;

  const usuariosAPI =[
    {
        id:1,
        name: "Tom",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:2,
        name: "Epson",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:3,
        name: "Exson",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:4,
        name: "Exson",
        last_name: "Jerrasdasdy",
        username: "user",
        email: "user@user.com",
        password: "123456",
    }
  ]

  const postulantes = [];
  for (let i = 0; i <usuariosAPI.length ; i++) {
    postulantes.push(<Option key={usuariosAPI[i].id}>{usuariosAPI[i].name +" "+ usuariosAPI[i].last_name}</Option>);
  }
  
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

const Postulate = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (

    <>
        <Button type="primary" onClick={showModal} >
            Postular
        </Button>
        <Modal title="Postular como candidato" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
                {...formItemLayout}
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
                    name="description"
                    label="Descripcion"
                    tooltip="¿una descripcion del candidato?"
                    rules={[
                    {
                        required: true,
                        message: '¡Por favor ingrese la descripcion!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Nombre de partido"
                    tooltip="Nombre del partido o postulante"
                    rules={[
                    {
                        required: true,
                        message: '¡No es necesario ingresar le nombre de partido!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                
                <Form.Item {...tailFormItemLayout} style={{margin:"1em"}}>
     
                    <Button onClick={handleCancel} style={{marginRight:"1em"}}>Cancelar</Button>
     
                    <Button type="primary" htmlType="submit">
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    </>
  );
};

export default Postulate;