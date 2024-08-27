function increaseCounter(letter, newContactList) {
     let hasSpan = false;
     let divLetter = document.querySelector('.element__letter[data-id=' + letter + ']');
     
     for (let i = 0; i < divLetter.children.length; i++) {
         if (divLetter.children[i].tagName == 'SPAN') {
             divLetter.children[i].textContent++;
             hasSpan = true;
             break;
         }
     }

     if (!hasSpan) {
         let span = document.createElement('span');
         span.className = 'letter__counter';
         span.textContent = newContactList.length;
         divLetter.appendChild(span);
     }

}

function decreaseCounter(letter) {
    removeCounter (letter, false);
}

function removeCounter(letter, isClear) {
    let divLetter = document.querySelector('.element__letter[data-id=' + letter + ']');
    for (let i = 0; i < divLetter.children.length; i++) {
        if (divLetter.children[i].tagName == 'SPAN') {
            if (!isClear) {
                divLetter.children[i].textContent--;
                if(divLetter.children[i].textContent == "0")
                    divLetter.children[i].remove();
                break;
            } else {
                divLetter.children[i].remove();
            }
            
        }
    }
}

function setFullContactListCounter() {
    for (let i = 0; i < localStorage.length; i++) {
        increaseCounter(localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
}

function addInfoContactToLetter(contact, letter) {
    let divLetter = document.querySelector('.element__letter[data-id=' + letter + ']');
    divLetter.after(createContactInfoDiv(contact, 'letter__info', false));
}

function createContactInfoDiv(contact, className, isSearch) {
    let div = document.createElement('div');
    div.className = className;
    div.innerText = `Name: ${contact.name}\n  Job title: ${contact.job}\n  Phone: ${contact.number}\n`;
    
    let closeWindow = document.createElement('i');
    closeWindow.className = 'fa fa-times-circle contact__delete';
    div.appendChild(closeWindow);
    
    if (isSearch) {
        let editContact = document.createElement('i');
        editContact.className = 'fa fa-edit contact__edit';
        div.appendChild(editContact);
    }

    return div;
}