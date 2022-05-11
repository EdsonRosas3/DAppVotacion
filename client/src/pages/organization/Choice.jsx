import React, { useEffect ,useState} from "react";
import { Modal, Button } from 'antd';

const Choice = () => {

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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Iniciar eleccion
      </Button>
      <Modal title="Inicia una eleccion" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Choice;