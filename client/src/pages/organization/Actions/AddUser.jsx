import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import { Row, Col, message } from "antd";
import { userService, organizationService } from "../../../services";
import { useParams } from "react-router-dom";

const AddUser = ({updateListUsers,electionInfo}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ids, setIds] = useState();
  const [list, setList] = useState([]);
  const {idOrganization} = useParams();

  const options = [];

  for (let i = 0; i < list.length; i++) {
    const username = list[i].username;
    options.push({
      label: `${username}`,
      value: username,
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    ids,
    options,
    onChange: (newUser) => {
      setIds(newUser);
    },
    placeholder: "Select usuario...",
    maxTagCount: "responsive",
  };

  const onFinish = async (values) => {
    try {
      let users = [];
      values.users.forEach((element) => {
        users.push(list.find((user) => user.username === element).id);
      });
      const res = await organizationService.addUsers(idOrganization, {users});
      message.success(res.data.message)
      updateListUsers();
    } catch (error) {
      if(error.response){
        message.error(error.response.data.message)
      }
    }

    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await userService.getUsers();
        setList(res.data);
      } catch (error) {
        message.error("Ocurrio un error");
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Button type="primary" disabled={electionInfo.election} onClick={showModal}>
        Agregar miembros
      </Button>
      <Modal
        title="Agregar usuarios"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="users"
            label="Seleccione participantes"
            rules={[
              {
                required: true,
                message: "¡Por favor seleccione un usuario!",
              },
            ]}
          >
            <Select {...selectProps} />
          </Form.Item>
          <Row gutter={16} style={{ margin: "2em" }}>
            <Col className="gutter-row" span={6}></Col>
            <Col className="gutter-row" span={6}>
              <Button onClick={handleCancel}>Cancelar</Button>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Guardar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
