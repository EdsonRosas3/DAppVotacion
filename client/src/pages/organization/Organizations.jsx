import React from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import { useNavigate,Link} from "react-router-dom";
const list = [
  {
    id:1,
    gender: "female",
    name: "Otb Huaillany",
    email: "alena.rey@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/17.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/17.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/17.jpg",
    },
    nat: "CH",
  },
  {
    id:2,
    gender: "female",
    name:"Sindicato de Trabajadores",
    email: "alena.rey@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/17.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/17.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/17.jpg",
    },
    nat: "CH",
  },
];

const Organizations = () => {
  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        loadMore={null}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar />}
                title={<Link to={`${item.id}`}>{item.name}</Link>}
                description="Esta es la descripcion de la organizacion"
              />
              <div>Alcance</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Organizations;
