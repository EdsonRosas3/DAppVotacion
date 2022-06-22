import React,{useState,useEffect} from "react";
import { Space, Table, Tag } from 'antd';

const TableResult = ({listCandidates,votesCast,absentVotes}) => {

    const [data,setData] = useState([]);

    useEffect(() => {
      const fetch = async () => {
        try {
          const res =  convertDataUsers(listCandidates,votesCast);
          setData(res);
        } catch (error) {   
          console.log("Ocurrio un error");
        }
      }; 
      fetch();
      
    }, [listCandidates]);
  
  
    const convertDataUsers = (users,votesCast) => {
  
      const array = [];
  
      for (const i in users) {
        const _data = { nameFront: '', description: '',votesReceived:0, percentage:0};
        _data.nameFront     = users[i].nameFront;
        _data.description   = users[i].description;
        _data.votesReceived = Number(users[i].votesReceived);
        let porcent = Number(((users[i].votesReceived)*100)/(votesCast+absentVotes));
        _data.percentage    = porcent.toFixed(2);
        array.push(_data);
      }
      let porcent = Number(((absentVotes)*100)/(votesCast+absentVotes));
      const _data = { nameFront: 'Votos nulos', description: 'voto mal realizado en una elección',votesReceived:Number(absentVotes), percentage:porcent.toFixed(2)}
      array.push(_data);
      return array;
      
    };

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nameFront',
          key: 'nameFront',
          render: (text) => <b>{text}</b>,
        },
        {
          title: 'Descripcion',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Votos recibidos',
          dataIndex: 'votesReceived',
          key: 'votesReceived',
        },
        {
            title: 'Porcentaje',
            dataIndex: 'percentage',
            key: 'percentage',
        }
    ];

  return (
    <>
        <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableResult;
