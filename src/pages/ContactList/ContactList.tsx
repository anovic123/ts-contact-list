import React, { useEffect } from 'react';
import { Avatar, Button, List, Typography, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { deleteContact, fetchContacts, selectContactList, selectContactStatus } from '../../redux/slices/contact/contactSlice';

import './ContactList.css';

const { Search } = Input;
const { Title } = Typography;

const ContactList: React.FC = () => {
  const contactList = useAppSelector(selectContactList)
  const status = useAppSelector(selectContactStatus)

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleDeletion = (id: string) => {
    dispatch(deleteContact(id))
  }


  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return (
    <div className="contactList">
      <Title>Список контактов</Title>
      <Search
        className="contactSearch"
        placeholder="Найти контакты"
        onChange={handleChange}
        enterButton
      />
      <List
        bordered
        itemLayout="horizontal"
        dataSource={contactList}
        loading={status === 'loading'}
        renderItem={(contact) => (
          <List.Item
            actions={[
              <Button key="list-loadmore-edit">edit</Button>,
              <Button onClick={() => handleDeletion(contact.id)} key="list-loadmore-more" danger>delete</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar className='avatar' src="https://picsum.photos/50/50" />}
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      <Button type="primary" className="add-btn">
        Добавить новый контакт
      </Button>
    </div>
  );
};

export default ContactList;
