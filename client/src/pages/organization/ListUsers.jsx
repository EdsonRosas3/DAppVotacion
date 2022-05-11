import React, { useEffect, useContext, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Typography, message,Card } from "antd";
import { organizationService } from "../../services";
import { useParams } from "react-router-dom";
import AddUser   from "./AddUser";
import Choice    from "./Choice";
import Postulate from "./Postulate";
import { Row, Col } from 'antd';

const { Title, Text } = Typography;

const ListUsers = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { idOrganization } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await organizationService.getUsers(idOrganization);
        setList(res.data.users);
        setData(res.data);
      } catch (error) {
        message.error("Ocurrio un error");
      }
      setLoading(false);
    };
    fetch();
  }, []);
  return (
    <div>
      <Title level={3}>
          <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                {data.name} <Link to={""}>{data.reach}</Link>
              </Col>
              <Col className="gutter-row" span={4}>
                <AddUser/>
              </Col>
              <Col className="gutter-row" span={4}>
                <Choice/>
              </Col>
              <Col className="gutter-row" span={4}>
                <Postulate/>
              </Col>
          </Row>
      </Title>
      <Text type="secondary">{data.description}</Text>
      <Title level={5}>Integrantes:</Title>
      <Card  bordered={true}>
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
                <div>{"Avilitado"}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ListUsers;
