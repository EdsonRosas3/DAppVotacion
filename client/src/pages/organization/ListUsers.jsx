import React, { useEffect, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import VirtualList from "rc-virtual-list";
import { Typography, message, Card } from "antd";
import { organizationService } from "../../services";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const ContainerHeight = 550;
const ListUsers = ({ updateListUser }) => {
  const [list, setList] = useState([]);
  const { idOrganization } = useParams();

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await organizationService.getUsers(idOrganization);
        setList(res.data.users);
      } catch (error) {
        message.error("Ocurrio un error");
      }
    };
    fetch();
  }, [updateListUser]);
  return (
    <>
      <Title level={5}>Miembros de la organización:</Title>
      <Card bordered={true}>
        <List>
          <VirtualList
            data={list}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item) => (
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
          </VirtualList>
        </List>
      </Card>
    </>
  );
};

export default ListUsers;
