import React from "react";
import { Bar } from '@ant-design/plots';

const ShowTable = () => {
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

  return (
    <>
      <Bar {...config} />
    </>
  );
};

export default ShowTable;
