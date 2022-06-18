import React,{useState,useEffect} from "react";
import { Column } from '@ant-design/plots';

const ShowGraph = ({listCandidates}) => {
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = convertDataUsers(listCandidates);
        setData(res);
      } catch (error) {   
        console.log("Ocurrio un error");
      }
    }; 
    fetch();
    
  }, [listCandidates]);


  const convertDataUsers = (users) => {

    const array = [];

    for (const i in users) {
      const _data = { name: '', votes: 0,};

      _data.name  = users[i].nameFront;
      _data.votes = users[i].votesReceived;

      array.push(_data);
    }
    return array;
    
  };


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
