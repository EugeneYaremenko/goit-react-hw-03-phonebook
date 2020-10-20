import React, { Component } from 'react';
import { uuidv4 } from 'uuid';
import Wrapper from './Wrapper/Wrapper';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const notEmptyContacts = localStorage.getItem('contacts');

    if (notEmptyContacts) {
      this.setState({ contacts: JSON.parse(notEmptyContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleAddContact = (text, number) => {
    const { contacts } = this.state;
    const dobleName = contacts.find(
      cont => cont.name.toLowerCase() === text.toLowerCase(),
    );

    const contact = {
      id: uuidv4(),
      name: text,
      number: number,
    };

    if (dobleName) {
      alert(`${text} is already in contacts.`);

      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  handleVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleRemoveContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId,
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.handleVisibleContact();

    return (
      <Wrapper>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter
            title="Find contacts by name"
            value={filter}
            onChangeFilter={this.handleChangeFilter}
          />

          {visibleContact.length > 0 && (
            <ContactList
              contacts={visibleContact}
              onRemoveContact={this.handleRemoveContact}
            />
          )}
        </Section>
      </Wrapper>
    );
  }
}
