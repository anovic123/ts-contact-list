import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppSelector } from '../../../hook/hook';
import { ContactItem, selectContactStatus } from '../../../redux/slices/contact/contactSlice';
import { UserOutlined } from '@ant-design/icons';

type EditFormValues = {
  name: string;
  phone: string;
};

type Props = {
  isEditFormVisible: boolean;
  hideEditForm: () => void;
  selectedContact: ContactItem | null;
};

const EditForm = ({ isEditFormVisible, hideEditForm, selectedContact }: Props) => {
  const status = useAppSelector(selectContactStatus);

  const onFinish = async () => {};

  return (
    <Modal
      title="Редактирование контакта"
      visible={isEditFormVisible}
      onCancel={hideEditForm}
      width={400}
      footer={null}
    >
      <Form
        name=""
        initialValues={{ name: selectedContact?.name, phone: selectedContact?.phone }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите имя контакта' }]}
        >
          <Input prefix={<UserOutlined className="site-form-icon" />} placeholder="Имя контакта" />
        </Form.Item>

        <Form.Item
          name="phone"
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
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
