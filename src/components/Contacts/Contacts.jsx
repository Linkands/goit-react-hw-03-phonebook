import React from 'react'
import { Wrapper, List, Item, DeleteButton, Header } from './Contacts.styles'

function Contacts({ contactsData, onDeleteContact }) {
  return (
    <Wrapper>
      <Header>Contacts</Header>
      <List>
        {contactsData.map((contact) => (
          <Item key={contact.id}>
            {contact.name}: {contact.number}
            <DeleteButton
              type="button"
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete contact
            </DeleteButton>
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}

export default Contacts
