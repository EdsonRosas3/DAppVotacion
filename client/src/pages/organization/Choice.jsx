import React, { useEffect ,useState} from "react";
import { Modal, Button } from 'antd';
import { Form, DatePicker } from 'antd';
import { Row, Col } from 'antd';


const Choice = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };


  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range'];
    const values = {
      ...fieldsValue,
      'range': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'date': fieldsValue['date'].format('YYYY-MM-DD'),
    };
    setIsModalVisible(false);
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Iniciar eleccion
      </Button>
      <Modal title="Inicia una eleccion" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
          
          <Form.Item name="range" label="Fecha" {...rangeConfig}>
            <RangePicker />
          </Form.Item>

          <Form.Item name="date" label="Dia de Votacion" {...config}>
            <DatePicker />
          </Form.Item>
          <Row gutter={16} style={{margin:"2em"}}>
              <Col className="gutter-row" span={6}>
                    
              </Col>
              <Col className="gutter-row" span={6}>
                  <Button onClick={handleCancel}>Cancelar</Button>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>    
              </Col>
          </Row>
      </Form>
      </Modal>
    </>
  );
};

export default Choice;