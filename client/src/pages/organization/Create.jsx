import React, { useState, useContext } from "react";
import { Modal, Card, Form, Input, Button, Select, message } from "antd";
import UserContext from "../../context/user/UserContext";
import { organizationService } from "../../services";
const { Option } = Select;
const options = [
  {
    key: "Institucional",
    name: "Institucional",
  },
  {
    key: "Vecinal",
    name: "Vecinal",
  },
  {
    key: "Municipal",
    name: "Municipal",
  },
  {
    key: "Departamental",
    name: "Departamental",
  },
  {
    key: "Nacional",
    name: "Nacional",
  },
];
const Create = ({slopeCreate}) => {
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    onReset();
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
        await organizationService.addOrganization(user.id,values);
        message.success('Organización creada con éxito');
        slopeCreate();
        handleCancel();
    } catch (error) {
        message.error('Error al crear la organización');
    }
    
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card style={{ width: "100%" }} bordered={true}>
      <Button type="primary" onClick={showModal}>
        Crear nueva organización
      </Button>
      <Modal
        title="REGISTRO DE ORGANIZACIÓN"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Nombre"
            tooltip="¿Como se llama la organización?"
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese su apodo!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            tooltip="¿Qué deescripcion tiene?"
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese la descripción!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="reach"
            label="Alcance"
            tooltip="¿Cual es el alcance de tu organización?"
            rules={[
              {
                required: true,
                message: "Por favor selecciona el alcance!",
              },
            ]}
          >
            <Select placeholder="selecciona el alcance">
              {options.map((item) => (
                <Option value={item.key}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="Tipo de organización"
            rules={[{ required: true, message: 'Por favor ingrese el tipo de organización!' }]}
          >
            <Select placeholder="Seleccione una organización">
              <Option value="Centralizada">Centralizada</Option>
              <Option value="Descentralizada">Descentralizada</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Create;
