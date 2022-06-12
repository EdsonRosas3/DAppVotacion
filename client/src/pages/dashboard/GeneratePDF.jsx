import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const GeneratePDF = () => {

  const generatePDF  = () => {
    const fecha = "12-05-2022";
    const organizacion = "OTB Colquiri";

  };

  return (
    <>
      <Button type="primary" onClick={generatePDF}>
        Generar Reporte
      </Button>
    </>
  );
};

export default GeneratePDF;
