import React,{useState,useEffect} from "react";
import { Card, Tag , Typography , Row, Col} from 'antd';

const { Title, Text } = Typography;

const Winner = ({listCandidates,votesCast,absentVotes}) => {

    const [data,setData] = useState([]);
    const [winner,setWinner] = useState({});

    useEffect(() => {
      const fetch = async () => {
        try {
          const res =  convertDataUsers(listCandidates,votesCast);
          setData(res);
          const short = shortWinner(res);
          setWinner(short);
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
    
    const shortWinner= (users) => {

        const _data = { nameFront: '', description: '',votesReceived:0, percentage:0};
        var mayor = 0;
 
  
        for (const i in users) {
            if (users[i].votesReceived > mayor)
            {
                _data.nameFront     = users[i].nameFront;
                _data.description   = users[i].description;
                _data.votesReceived = Number(users[i].votesReceived);
                let porcent = Number(((users[i].votesReceived)*100)/(votesCast+absentVotes));
                _data.percentage    = porcent.toFixed(2);
                mayor = Number(users[i].votesReceived);
            }
        }
        return _data;

    }    


  return (
    <>
        <p>
            El ganador es {<b>{`${winner.nameFront}`}</b>}
            , es un partido {<b>{`${winner.description}`}</b>}
            , con {<b>{`${winner.votesReceived}`} </b> } votos recibidos
            y un porcentaje {<b>{`${winner.percentage}`+"%.  "}</b>}
        </p>
    </>
  );
};

export default Winner;
