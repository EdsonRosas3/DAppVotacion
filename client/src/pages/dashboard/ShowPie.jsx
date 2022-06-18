import React,{useState,useEffect} from "react";
import { Pie } from '@ant-design/plots';

const ShowPie = ({listCandidates,votesCast}) => {

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
      const _data = { name: '', percentage: 0};
      _data.name  = users[i].nameFront;
      _data.percentage = Number(((users[i].votesReceived)*100)/votesCast);

      array.push(_data);
    }
    return array;
    
  };




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

  return (
    <>
      {console.log(listCandidates)}
      {console.log(votesCast)}
      <Pie {...config} />
    </>
  );
};

export default ShowPie;
