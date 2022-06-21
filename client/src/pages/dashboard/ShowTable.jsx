import React,{useState,useEffect} from "react";
import { Bar } from '@ant-design/plots';

const ShowTable = ({listCandidates,absentVotes}) => {

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
    const _data = { name: 'Votos Nulos', votes: Number(absentVotes),};
    array.push(_data);
    return array;
    
  };


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
