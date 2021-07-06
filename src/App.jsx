import React, { Component } from 'react'
import Phonebook from './components/Phonebook/Phonebook'
import Contacts from './components/Contacts/Contacts'
import Filter from './components/Filter/Filter'
import { v4 as uuidv4 } from 'uuid'

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const randomId = uuidv4()
    const checkName = this.state.contacts
      .map((contact) => contact.name)
      .includes(this.state.name)
    const checkNumber = this.state.contacts
      .map((contact) => contact.number)
      .includes(this.state.number)

    if (checkName) {
      alert(`${this.state.name} is already in contacts`)
    } else if (checkNumber) {
      alert(`Number ${this.state.number} is already in contacts`)
    } else {
      this.setState({
        contacts: [
          ...this.state.contacts,
          { id: randomId, name: this.state.name, number: this.state.number },
        ],
      })
    }

    this.eraseInputs()
  }

  eraseInputs = () => {
    this.setState({ name: '', number: '' })
  }

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      }
    })
  }

  visibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase()
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    )
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('state has been updated')
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const { name, number, filter } = this.state
    return (
      <div>
        <Phonebook
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          name={name}
          number={number}
        ></Phonebook>
        <Filter filter={filter} onChange={this.handleChange}></Filter>
        <Contacts
          contactsData={this.visibleContacts()}
          onDeleteContact={this.removeContact}
        ></Contacts>
      </div>
    )
  }
}

export default App
