import React, { useState } from "react";
import { Modal } from 'antd';
import { Card }          from 'antd';
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

const Organization = () => {

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
  return (
    <Card style={{ width: "100%" }}  bordered={true}>
      <Button type="primary" onClick={showModal}>
        Registrar Organizacion
      </Button>
      <Modal title="REGISTRO DE ORGANIZACION" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
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
          tooltip="¿Como se llama la organizacion?"
          rules={[{ required: true, message: '¡Por favor ingrese su apodo!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

      </Form>
      </Modal>
    </Card>

  )
}

export default Organization