import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import {
  ContactItem,
  deleteContact,
  fetchContacts,
  selectContactList,
  selectContactStatus,
} from '../../redux/slices/contact/contactSlice';
import AddForm from './AddForm/AddForm';
import EditForm from './EditForm/EditForm';
import SearchForm from './SearchForm/SearchForm';

import './ContactList.css';

const { Title } = Typography;

const ContactList: React.FC = () => {
  const dispatch = useAppDispatch();

  const contactList = useAppSelector(selectContactList);
  const [filteredList, setFiltered] = useState<ContactItem[]>([])
  const [isFiltering, setIsFiltering] = useState(false);

  const status = useAppSelector(selectContactStatus);

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const showEditForm = (contactItem: ContactItem) => {
    setIsEditFormVisible(true);
    setSelectedContact(contactItem)
  }
  const hideEditForm = () => setIsEditFormVisible(false);

  const handleDeletion = (id: string) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="contactList">
      <Title>Список контактов</Title>
      <SearchForm setFiltered={setFiltered} setIsFiltering={setIsFiltering} />
      <List
        bordered
        itemLayout="horizontal"
        dataSource={isFiltering ? filteredList : contactList}
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
