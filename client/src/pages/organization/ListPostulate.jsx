import React, { useEffect ,useState} from "react";
import { Row , Col , Card , List , Checkbox , Avatar , Modal} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const data = [
    {
        description:"El Movimiento al Socialismo – Instrumento Político por la Soberanía de los Pueblos (MAS–IPSP)",
        name:"MAS-IPSP",
        imagen:"https://upload.wikimedia.org/wikipedia/commons/6/67/Movimiento_al_Socialismo.png",
    },
    {
        description:"Logo de la campaña Bolivia Dice No del referendum de 2016",
        name:"Bolivia dice no",
        imagen:"https://upload.wikimedia.org/wikipedia/commons/c/c5/Bolivia_dice_No.jpg",
        
    },
    {
        description:"Es una alianza política boliviana conformada por los partidos políticos Frente Revolucionario de Izquierda (FRI)",
        name:"Comunidad ciudadana",
        imagen:"https://upload.wikimedia.org/wikipedia/commons/c/cd/Logo_CC.png",
    },
    {
        description:"Reproducción del emblema del Partido Demócrata Cristiano de Bolivia",
        name:"PDC",
        imagen:"https://upload.wikimedia.org/wikipedia/commons/c/c5/PDC_Bolivia.png",
    },
    
]

const ListPostulante = () => {

    const { Meta } = Card;
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const toggleDisable = () => {
        setDisabled(!disabled);
    };

  return (
    <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
        <List.Item>
            <Card
                style={{ width: 200 }}
                cover={
                  <img
                    alt="example"
                    src={item.imagen}
                  />
                }
            >
                <Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={item.description}
                />
                <Row gutter={16} style={{margin:"2em"}}>
                    <Col className="gutter-row" span={6}> </Col>
                    <Col className="gutter-row" span={6}>
                        <Checkbox onClick={toggleDisable} checked={checked} disabled={disabled}>
                            Votar
                        </Checkbox>
                    </Col>
                    <Col className="gutter-row" span={6}></Col>
                </Row>
            </Card>
        </List.Item>
        )}
    />
  )
}

export default ListPostulante;