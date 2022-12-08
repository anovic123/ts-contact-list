import { Button, Form, Input, Modal } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../hook/hook';
import { ContactItem, editContact } from '../../../redux/slices/contact/contactApi';
import { selectContactStatus } from '../../../redux/slices/contact/contactSlice';
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
  const dispatch = useAppDispatch();

  const onFinish = async ({ name, phone }: EditFormValues) => {
    if (!selectedContact) return

    await dispatch(editContact({ ...selectedContact, name, phone }))

    hideEditForm()
  };

  return (
    <Modal
      title="Редактирование контакта"
      visible={isEditFormVisible}
      onCancel={hideEditForm}
      width={400}
      centered
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
