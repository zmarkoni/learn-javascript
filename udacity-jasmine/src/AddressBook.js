function AddressBook() {
    this.contacts = [];
    this.initialComplete = false;
}

AddressBook.prototype.getInitialContacts = function (callBack) {
  var self = this;

  setTimeout(function () { //fake async
      self.initialComplete = true;
      if(callBack) {
          return callBack();
      }
  }, 3);
};

AddressBook.prototype.addContact = function (contact) {
    this.contacts.push(contact);
};

AddressBook.prototype.getContact = function (index) {
    return this.contacts[index];
};

AddressBook.prototype.deleteContact = function (index) {
    return this.contacts.splice(index, 1);
};