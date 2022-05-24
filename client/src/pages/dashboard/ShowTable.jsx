import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

const ShowTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    {
      name: 'Epson Printe 3D',
      votes: 38,
    },
    {
      name: 'Franco',
      votes: 52,
    },
    {
      name: 'Agapito',
      votes: 61,
    },
    {
      name: 'Constantino',
      votes: 145,
    },
    {
      name: 'Juanito',
      votes: 48,
    },
  
  ];
  const config = {
    data,
    xField: 'votes',
    yField: 'name',
    barWidthRatio: 0.8,
    meta: {
      name: {
        alias: 'Nombre',
      },
      votes: {
        alias: 'Votos',
      },
    },
  };
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
        Mostrar tabla
      </Button>
      <Modal
        title="Tabulado"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        <Bar {...config} />
      </Modal>

    </>
  );
};

export default ShowTable;
