import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const ShowPie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    {
      name: 'Epson Printe 3D',
      percentage: 27,
    },
    {
      name: 'Franco',
      percentage: 25,
    },
    {
      name: 'Agapito',
      percentage: 18,
    },
    {
      name: 'Constantino',
      percentage: 15,
    },
    {
      name: 'Juanito',
      percentage: 10,
    },
    {
      name: 'Estefano',
      percentage: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'percentage',
    colorField: 'name',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
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
        Mostrar Grafica torta
      </Button>
      <Modal
        title="Grafica torta"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        <Pie {...config} />
      </Modal>

    </>
  );
};

export default ShowPie;
