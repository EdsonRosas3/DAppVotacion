import React, { useState,useContext,useEffect } from "react";
import { Modal, Button, message } from "antd";
import { Form, Input } from "antd";
import {postulantService} from "../../../services"
import UserContext from "../../../context/user/UserContext";
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

const Postulate = ({ electionInfo,updateOrganizationEvent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useContext(UserContext);
  const [disabledStatus, setDisabledStatus] = useState(true);
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
  const onFinish = async (values) => {
    try {
      const res = await postulantService.addPostulation(electionInfo.data.id,user.id,values)
      message.success(res.data.message)
      handleOk();
      updateOrganizationEvent();
      form.resetFields();
    } catch (error) {
      message.error("Error al postularse")
    }
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
  const handlerStatusBtn = () => {
    switch (electionInfo.status) {
      case "NO_EXISTE":
        setDisabledStatus(true);
        break;
      case "FINALIZADA":
        setDisabledStatus(true);
        break;
      case "POSTULACION":
        setDisabledStatus(false);
        break;
      case "ESPERA":
        setDisabledStatus(true);
        break;
      case "VOTACION":
        setDisabledStatus(true);
        break;
      case "DESAPROBADO":
        setDisabledStatus(true);
        break;
      default:
        setDisabledStatus(true);
        break;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      handlerStatusBtn();
      if(electionInfo.election){
        if(!electionInfo.election.statusAccept){
          setDisabledStatus(true)
        }
        const res  = await postulantService.isCandidate(electionInfo.election.id,user.id)
        if(res.data.isCandidate){ 
          setDisabledStatus(true)
        }
      }
    };
    fetchData();
  }, [electionInfo, isModalVisible, user.id]);
  return (
    <>
      <Button
        type="primary"
        disabled={disabledStatus}
        onClick={showModal}
      >
        Postular
      </Button>
      <Modal
        title="Postular como candidato"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...formItemLayout}
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
            name="description"
            label="Descripcion"
            tooltip="¿una descripcion del candidato?"
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese la descripcion!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="nameFront"
            label="Nombre de partido"
            tooltip="Nombre del partido o postulante"
            rules={[
              {
                required: true,
                message: "¡No es necesario ingresar le nombre de partido!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout} style={{ margin: "1em" }}>
            <Button onClick={handleCancel} style={{ marginRight: "1em" }}>
              Cancelar
            </Button>

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
