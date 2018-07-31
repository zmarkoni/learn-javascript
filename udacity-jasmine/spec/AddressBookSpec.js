describe('Address book', function() {
    var addressBook,
        thisContact;

    beforeEach(function () {
        addressBook = new AddressBook();
        thisContact = new Contact();
    });

    it('should be able to add a contact', function () {
        addressBook.addContact(thisContact);
        expect(addressBook.getContact(0)).toBe(thisContact);
    });

    it('should be able to delete a contact', function () {
        addressBook.addContact(thisContact);
        addressBook.deleteContact(0);
        expect(addressBook.getContact(0)).not.toBeDefined();
    });
});

describe('Async Address Book', function () {
    var addressBook = new AddressBook();

    beforeEach(function (done) { // with "done" we catch async function when it finish getting the data!
        addressBook.getInitialContacts(function () {
            done(); // this will call -> it('should grab initial contacts'...
        });
    });

    it('should grab initial contacts', function (done) {
        expect(addressBook.initialComplete).toBe(true);
        done();
    });
});