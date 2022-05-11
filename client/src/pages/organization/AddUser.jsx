import React, { useEffect ,useState} from "react";
import { Modal, Button, Select } from 'antd';
import { Row, Col } from 'antd';

const usuariosAPI =[
    {
        id:1,
        name: "Tom",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:2,
        name: "Epson",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:3,
        name: "Exson",
        last_name: "Jerry",
        username: "user",
        email: "user@user.com",
        password: "123456",
    },
    {
        id:4,
        name: "Exson",
        last_name: "Jerrasdasdy",
        username: "user",
        email: "user@user.com",
        password: "123456",
    }
]
const options = [];

for (let i = 0; i < usuariosAPI.length; i++) {
  const id =  usuariosAPI[i].id;
  const name =  usuariosAPI[i].name;
  const last =  usuariosAPI[i].last_name;
  options.push(
    {
        label: `Nombre: ${name}`+` Apellido: ${last}`,
        value:id,
    }
  );
}

const AddUser = () => {
   const [isModalVisible, setIsModalVisible] = useState(false); 
   const [users, setUsers] = useState();  

   const showModal = () => {
     setIsModalVisible(true);
   };
   
   const handleOk = () => {
     setIsModalVisible(false);
     //Guardar en la API
   };
   
   const handleCancel = () => {
     setIsModalVisible(false);
   };

   const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    users,
    options,
    onChange: (newUser) => {
      setUsers(newUser);
    },
    placeholder: 'Select usuario...',
    maxTagCount: 'responsive',
  };

  return (
    <>
      <Button type="primary" onClick={showModal} >
        Agregar Usuarios
      </Button>
      <Modal title="Agregar usuarios" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Select {...selectProps} />
        {console.log(users)}
        <Row gutter={16} style={{margin:"2em"}}>
            <Col className="gutter-row" span={6}>
                   
            </Col>
            <Col className="gutter-row" span={6}>
                <Button onClick={handleCancel}>Cancelar</Button>
            </Col>
            <Col className="gutter-row" span={6}>
                <Button type="primary" onClick={handleOk}>Guardar</Button>
            </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddUser;
