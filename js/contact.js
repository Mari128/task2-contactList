let globalContactList = [];

function Contact(name, job, number) {
    this.name = name;
    this.job = job;
    this.number = number;

    toString = function() {
        return `name: ${this.name}, vacancy: ${this.job}, phone: ${this.number}`;
    }
}

function editContact(element) {
    let contact = parseContact(element.target.parentNode.textContent.split(":"));
    editContactName.value = contact.name;
    editJobTitle.value = contact.job;
    editPhoneNumber.value = contact.number;

    document.getElementById('btn__edit-save').addEventListener('click', function () {
        if (contact.name == editContactName.value && contact.job == editJobTitle.value && contact.number == editPhoneNumber.value) {
            return;
        } else {
            let newContact = new Contact(editContactName.value, editJobTitle.value, editPhoneNumber.value);
            let letter = contact.name.charAt(0).toLowerCase();
            editContactList(letter, editContactName.value.charAt(0).toLowerCase(), contact, newContact, true);
            removeLastContactDiv();
            searchContact(searchInput.value, letter);
            closeEditForm();
        }
    });
}

function showContact(inputLetters) {
    globalContactList.filter(contact => {
        contact = JSON.parse(contact);
        if (contact.name.toLowerCase().indexOf(inputLetters) == 0)
            outputSearch.appendChild(createContactInfoDiv(contact, 'letter__info letter__info_active', true));
    });
}

function hiddenContacts(letter) {
    let contactList = document.querySelector('.element__letter[data-id=' + letter + ']');
    let children = contactList.parentNode.children;
    for (let i = 1; i < children.length; i++) {
        if (children[i].className.indexOf('letter__info_active') != -1)
            children[i].classList.toggle('letter__info_active');
    }
    return children.length
}

function searchContact(inputLetters, firstLetter) {
    clearOutputSearch();
    if (globalContactList != null && globalContactList.length > 1) {
        showContact(inputLetters);
    } else if (inputLetters.length == 1){
        globalContactList = getContacts(firstLetter); showContact(inputLetters);
    } else {
        clearContact();
    }

    if (inputLetters == '')
    {
        clearContact();
        clearOutputSearch();
    }
}

function parseContact(contact) {
    return new Contact(contact[1].trim().split("Job title")[0].trim(), 
                    contact[2].trim().split("Phone")[0].trim(),
                    contact[3].trim());
}

function handleAddContactButtonClick() {
    if (isValidField()) {
        const letter = contactName.value.toString()[0].toLowerCase();
        let contact = new Contact(contactName.value, jobTitle.value, phoneNumber.value);
        
        addContact(letter, contact);

        increaseCounter(letter, globalContactList);

        if (hiddenContacts(letter) > 1) {
            addInfoContactToLetter(contact, letter);
        } else {
            for(let contact of globalContactList) {
                addInfoContactToLetter(JSON.parse(contact), letter);
            }
        }
        contactName.value = ""; 
        jobTitle.value = ""; 
        phoneNumber.value = ""; 
    }
}

function addContact(letter, contact) {
    globalContactList = JSON.parse(localStorage.getItem(letter)) ?? [];
    globalContactList.push(JSON.stringify(contact));
    localStorage.setItem(letter, JSON.stringify(globalContactList));
}

function removeContactList(letter, contact) {
    editContactList(letter, letter, contact, contact, false);
}

function editContactList(lastLetter, newLetter, oldContact, newContact, isEdit) {
    let contactList = JSON.parse(localStorage.getItem(lastLetter));
    let i = currentContactIndex(contactList, oldContact);
    if (i != null) {
        contactList.splice(i, 1);
        localStorage.removeItem(lastLetter);
        if (isEdit)
            contactList.push(JSON.stringify(newContact));
        if (contactList.length > 0) {
            localStorage.setItem(newLetter, JSON.stringify(contactList));
            globalContactList = contactList;
        }
    }
}

function getContacts(letter) {
    return JSON.parse(localStorage.getItem(letter));
}

function currentContactIndex(contactList, currentContact) {
    for(let i = 0; i < contactList.length; i++) {
        let contact = JSON.parse(contactList[i]);
        if (contact.name == currentContact.name && contact.job == currentContact.job
            && contact.number == currentContact.number) {
                return i;
            }
    }
    return null;
}

function clearContact() {
    globalContactList = [];
}