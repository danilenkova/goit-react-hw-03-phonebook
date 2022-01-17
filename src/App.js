import shortid from "shortid";
import React, { Component } from "react";
import Header from "./components/header";
import { HeaderSection, Section } from "./components/section";
import Container from "./components/container";
import ContactForm from "./components/form";
import Filter from "./components/filter";
import ContactList from "./components/contactList";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: "",
    };
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const savedContacts = JSON.parse(contacts);
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  getContact = (name, number) => {
    const newContact = { id: shortid.generate(), name, number };
    this.addContact(newContact);
  };

  addContact = (contact) => {
    const newName = this.getNormalizeText(contact.name);
    if (
      this.state.contacts.some(
        (contact) => this.getNormalizeText(contact.name) === newName
      )
    ) {
      toast.error(`${contact.name} is already in contacts`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
  };

  getFilteredContacts = (contacts, filter) => {
    return contacts.filter(({ name }) =>
      this.getNormalizeText(name).includes(this.getNormalizeText(filter))
    );
  };

  getNormalizeText = (text) => text.toLowerCase();

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts, filter);
    return (
      <>
        <Header>
          <HeaderSection />
        </Header>
        <main>
          <section>
            <Container>
              <Section title="Add new contact">
                <ContactForm onSubmit={this.getContact} />
              </Section>
              <Section title="Contacts">
                {filteredContacts.length ? (
                  <>
                    <Filter
                      onChange={this.handleInputChange}
                      text={this.state.filter}
                    />
                    <ContactList
                      contacts={filteredContacts}
                      onSubmit={this.deleteContact}
                    />
                  </>
                ) : (
                  <p>No contacts yet</p>
                )}
              </Section>
            </Container>
          </section>
          <ToastContainer />
        </main>
      </>
    );
  }
}

export default App;
