import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

// Add componentDidMount to load contacts from localStorage
componentDidMount() {
  const storedContacts = localStorage.getItem('contacts');
  if (storedContacts) {
    this.setState({ contacts: JSON.parse(storedContacts) });
  }
}

// Use componentDidUpdate to save contacts to localStorage when they change
componentDidUpdate(prevProps, prevState) {
  if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};

handleSubmit = (name, number) => {
  if (name.trim() === '' || number.trim() === '') {
    alert('Name and number cannot be empty');
    return;
  }

  const isExist = this.state.contacts.some((contact) => contact.name === name);

  if (isExist) {
    alert(`${name} is already in contacts.`);
    return;
  }

  const newContact = {
    id: nanoid(),
    name,
    number,
  };

  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact],
  }));
};

handleDeleteContact = (id) => {
  this.setState((prevState) => ({
    contacts: prevState.contacts.filter((contact) => contact.id !== id),
  }));
};

render() {
  const { filter, contacts } = this.state;

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={this.handleChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
    </div>
  );
}
}

export default App;

