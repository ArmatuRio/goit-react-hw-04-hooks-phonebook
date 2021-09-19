import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );

  const [filter, setFilter] = useState('');

  useEffect(
    () => window.localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts],
  );

  const addContact = (name, number) => {
    const newContacts = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    const currentContacts = contacts.map(contact => contact.name);

    if (currentContacts.includes(newContacts.name)) {
      alert(`${newContacts.name} is already in contacts!`);
    } else {
      setContacts(prevState => [...prevState, newContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(prevState => prevState.id !== contactId),
    );
  };

  const filterContactsHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className="Wrapper">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts:</h2>
      <Filter onChange={filterContactsHandler} value={filter} />
      <ContactList
        contactList={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
