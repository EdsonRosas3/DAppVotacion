import React, { useEffect ,useState} from "react";
import { Modal, Button } from 'antd';

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

  return (
    <>
        <Button type="primary" onClick={showModal} >
            Postular como candidato
        </Button>
        <Modal title="Postularme como cadidato" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>

    </>
  );
};

export default Postulate;