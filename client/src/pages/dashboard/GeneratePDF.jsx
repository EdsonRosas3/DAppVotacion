import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useParams } from "react-router-dom";

const GeneratePDF = ({data,listResults,listCandidates,votesCast,absentVotes}) => {

  const { idOrganization } = useParams();

  const [list,setList] = useState([]);
  const [winner,setWinner] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res =  convertDataUsers(listCandidates,votesCast);
        setList(res);
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


  const generatePDF  = () => {

    var node = document.getElementById('graph');
    var options = {
        quality: 0.95
    };

    domtoimage.toPng(node, options).then(function (dataUrl)
    {
        var title = "REPORTE DE ELECCION"; 
        var doc = new jsPDF("p", "mm", "a4");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

   
        doc.autoTable({
          styles: { fillColor: [255, 0, 0] ,fontWeight: 'bold'},
          columnStyles: { 0: { halign: 'center',fontWeight: 'bold' } }, // Cells in first column centered and green
          margin: { top: 10 },
          body: [
              [`${title}`],
          ],
        })

        doc.autoTable({
          head: [['NOMBRE DE LA ORGANIZACION', 'DESCRIPCION','ALCANCE']],
          body: [
              [`${data.name}` , `${data.description}`,`${data.reach}`],
          ],
        })
        const dateIni = new Date(listResults.election.postulation_StartDate).toLocaleDateString();
        const dateFin = new Date(listResults.election.postulation_EndDate).toLocaleDateString();
        const dayElection = new Date(listResults.election.date).toLocaleDateString();
        doc.autoTable({
          head: [['FECHA DE INICIO', 'FECHA DE FIN','DIA DE ELECCION']],
          body: [
              [`${dateIni}` 
              ,`${dateFin}`
              ,`${dayElection}`],
          ],
        })

        doc.autoTable({
          head: [['TOTAL DE VOTOS', 'VOTOS VALIDOS','VOTOS NULOS']],
          body: [
              [`${listResults.election.votesCast+listResults.election.absentVotes}` ,
               `${listResults.election.votesCast}`,
               `${listResults.election.absentVotes}`],
          ],
        })
        doc.autoTable({
          head: [['NOMBRE', 'DESCRIPCION','VOTOS RECIBIDOS','PORCENTAJE']],
          body: list.map(({ nameFront, description, votesReceived, percentage }) => {
            return [nameFront, description, votesReceived, percentage];
          }),
        })
        doc.autoTable({
          head: [['', '','','']],
          body: [
            [ "El ganador es " + `${winner.nameFront}`+
            ", es un partido " + `${winner.description}`+
            ", con " + `${winner.votesReceived}`+ " votos recibidos "+
            "y un porcentaje "+`${winner.percentage}`+"%.  "
          ],
          ],
        })
        
        doc.addPage();
        doc.addImage(dataUrl, 'PNG', 0, 0, width, height);
        doc.save(`${data.name}`+' '+`${idOrganization}`+'.pdf');
    });

  }

  return (
    <>
      <Button type="primary" onClick={generatePDF}>
        Generar Reporte
      </Button>
    </>
  );
};

export default GeneratePDF;
