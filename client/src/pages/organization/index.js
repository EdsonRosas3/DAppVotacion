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

import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Nacional',
          key: '1',
        },
        {
          label: 'Departamental',
          key: '2',
        },
        {
          label: 'Municipal',
          key: '3',
        },
        {
          label: 'Vecinal',
          key: '4',
        },
      ]}
    />
  );
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

        <Form.Item
          name="description"
          label="descripción"
          tooltip="¿Que deescripcion tiene?"
          rules={[{ required: true, message: '¡Por favor ingrese la descripcion!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Dropdown overlay={menu} >
          <Button>
            <Space>
              Alcance
            </Space>
          </Button>
        </Dropdown>

      </Form>
      </Modal>
    </Card>

  )
}

export default Organization