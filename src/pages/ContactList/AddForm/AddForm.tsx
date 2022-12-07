import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppSelector } from '../../../hook/hook';
import { selectContactStatus } from '../../../redux/slices/contact/contactSlice';
import { UserOutlined } from '@ant-design/icons';

type AddFormValue = {
  name: string;
  phone: string;
};

type Props = {
  isAddFormVisible: boolean;
  hideAddForm: () => void;
};

const AddForm = ({ isAddFormVisible, hideAddForm }: Props) => {
  const onFinish = async ({ name, phone }: AddFormValue) => {};

  const status = useAppSelector(selectContactStatus);

  return (
    <Modal
      title="Добавление контакта"
      visible={isAddFormVisible}
      onCancel={hideAddForm}
      width={400}
      footer={null}
    >
      <Form name="" initialValues={{ name: '', phone: '' }} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите имя контакта' }]}
        >
          <Input prefix={<UserOutlined className="site-form-icon" />} placeholder="Имя контакта" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите номер телефона' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-icon" />}
            placeholder="Номер телефона"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === 'loading'}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
