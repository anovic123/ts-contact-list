import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Typography, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import {
  ContactItem,
  deleteContact,
  fetchContacts,
  selectContactList,
  selectContactStatus,
} from '../../redux/slices/contact/contactSlice';

import './ContactList.css';
import AddForm from './AddForm/AddForm';
import EditForm from './EditForm/EditForm';

const { Search } = Input;
const { Title } = Typography;

const ContactList: React.FC = () => {

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)

  const contactList = useAppSelector(selectContactList);
  const status = useAppSelector(selectContactStatus);

  const dispatch = useAppDispatch();

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const showEditForm = (contactItem: ContactItem) => {
    setIsEditFormVisible(true);
    setSelectedContact(contactItem)
  }
  const hideEditForm = () => setIsEditFormVisible(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleDeletion = (id: string) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
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
              <Button onClick={() => showEditForm(contact)} key="list-loadmore-edit">edit</Button>,
              <Button onClick={() => handleDeletion(contact.id)} key="list-loadmore-more" danger>
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar className="avatar" src="https://picsum.photos/50/50" />}
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      <Button onClick={showAddForm} type="primary" className="add-btn">
        Добавить новый контакт
      </Button>

      {isAddFormVisible && (
        <AddForm 
          isAddFormVisible={isAddFormVisible} 
          hideAddForm={hideAddForm} 
        />
      )}
      {isEditFormVisible && (
        <EditForm
          isEditFormVisible={isEditFormVisible}
          hideEditForm={hideEditForm}
          selectedContact={selectedContact}
        />
      )}
    </div>
  );
};

export default ContactList;
