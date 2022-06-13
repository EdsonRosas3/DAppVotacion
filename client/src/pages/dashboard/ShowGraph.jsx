import React from "react";
import { Column } from '@ant-design/plots';

const ShowGraph = () => {
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
    xField: 'name',
    yField: 'votes',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
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
      <Column {...config} />
    </>
  );
};

export default ShowGraph;
