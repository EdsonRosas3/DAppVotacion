import React, { useEffect, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { Typography, message, Card } from "antd";
import { organizationService } from "../../services";
import { useParams } from "react-router-dom";


const { Title } = Typography;

const ListUsers = ({updateListUser}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { idOrganization } = useParams();
  
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await organizationService.getUsers(idOrganization);
        setList(res.data.users);
        setLoading(false);
      } catch (error) {
        message.error("Ocurrio un error");
      }
      setLoading(false);
    };
    fetch();
  }, [updateListUser]);
  return (
    <>
      <Title level={5}>Integrantes:</Title>
      <Card bordered={true}>
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
                  title={
                    <Title level={5}>
                      {item.name} {item.last_name}
                    </Title>
                  }
                  description={`Username: ${item.username} Email: ${item.email}`}
                />
                <div>{"Habilitado"}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ListUsers;
