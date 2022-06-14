import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useParams } from "react-router-dom";

const GeneratePDF = ({data,listResults}) => {

  const { idOrganization } = useParams();

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
              [`${listResults.election.votesCast}` ,
               `${listResults.election.votesCast-listResults.election.absentVotes}`,
               `${listResults.election.absentVotes}`],
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
