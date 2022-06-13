import React, { useEffect, useContext, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Typography, message } from "antd";
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
        const res = await userService.getOrganizations(user.id);
        setList(res.data.organizations);
      } catch (error) {
        message.error("Ocurrio un error")
      }
      setLoading(false)
    };
    fetch()
  }, [statusCreated]);
  return (
    <div>
      <Title level={3}>Elecciones finalizadas</Title>
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
