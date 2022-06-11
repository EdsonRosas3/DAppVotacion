import React, { useEffect, useContext, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Typography, message } from "antd";
import Create from "./Create";
import { userService } from "../../services";
import UserContext from "../../context/user/UserContext";

const { Title } = Typography;


const Organizations = () => {
  const [list, setList] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [statusCreated, setStatusCreated] = useState(false);

  const slopeCreate = () => {
    setStatusCreated(!statusCreated);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        if(user !== undefined){
          const res = await userService.getOrganizations(user.id);
          setList(res.data.organizations);
          //message.success(" Bienvenido " + user.name+"😀! Tus organizaciones fueron cargadas correctamente.",8);
        }
       
      } catch (error) {
        message.error("Ocurrio un error 🤦‍♀️😢",4)
      }
      setLoading(false)
    };
    fetch()
  }, [statusCreated,user]);
  return (
    <div>
      <Title level={3}>Mis organizaciones</Title>
      <Create slopeCreate={slopeCreate}/>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={null}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar />}
                title={<Link to={`${item.id}`}>{item.name}</Link>}
                description={item.description}
              />
              <div>{item.reach+" - "+item.type}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Organizations;
