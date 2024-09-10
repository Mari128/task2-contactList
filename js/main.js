let contactContainer = document.getElementsByClassName("contact-container");
let outputSearch = document.querySelector('.search-output');
let searchInput = document.querySelector(".search-input");
let search = document.getElementsByClassName("search-input");

window.onload = function() {
    setFullContactListCounter();
}

document.addEventListener("click", function (e) {
    if (e.target.parentNode.className == 'contact__element') {
        let letter = e.target.parentNode.innerText[0].toLowerCase();
        let contacts = getContacts(letter);
        let children = e.target.parentNode.children;
        if(children.length == 1 && contacts != null) {
            for(let contact of contacts) {
                addInfoContactToLetter(JSON.parse(contact), letter);
            }
        }
        for (let i = 1; i < children.length; i++) {
            children[i].classList.toggle('letter__info_active');
        }
    }
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'fa fa-times-circle contact__delete') {
        let letter;
        let parentElem;
        if (outputSearch.innerHTML != '') {
            letter = JSON.parse(globalContactList[0]).name.charAt(0).toLowerCase();
            parentElem = e.target.parentNode;
        } else {
            letter = e.target.parentNode.parentNode.innerText[0].toLowerCase();
            parentElem = e.target.closest('.letter__info');
        }

        if (!parentElem)
            return;
        parentElem.remove();

        removeContactList(letter, parseContact(parentElem.textContent.split(":")));
        decreaseCounter(letter);
    }
});

document.getElementById("btn__search-contact").addEventListener('click', function () {
    handleAddContactButtonClick();
});

document.getElementById('btn__search-contact').addEventListener('click', function () {
    document.querySelector('.search-container__item').classList.toggle('search-container__item_active');
    document.querySelector('.search-background-form').classList.toggle('search-background-form_active');
});

document.querySelector(".search-input").addEventListener('input', function (e) {
    searchContact(e.target.value.toLowerCase(), e.data)
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'fa fa-times-circle search-close') {
        document.querySelector('.search-container__item').classList.toggle('search-container__item_active');
        document.querySelector('.search-background-form').classList.toggle('search-background-form_active');
        clearContact();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'fa fa-edit contact__edit') {
        document.querySelector('.edit-contact-container__item').classList.toggle('edit-contact-container__item_active');
        document.querySelector('.edit-background-form').classList.toggle('edit-background-form_active');
        editContact(e);
    }
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'fa fa-times-circle edit-close') {
        closeEditForm();
    }
});

document.getElementById('btn__search-show-all').addEventListener('click', function () {
    for (let i = 0; i < localStorage.length; i++) {
        let contactList = JSON.parse(localStorage.getItem(localStorage.key(i)));
        for( var contact of contactList)
            outputSearch.appendChild(createContactInfoDiv(JSON.parse(contact), 'letter__info letter__info_active', true));
 
    }
});

document.getElementById('btn__add-contact').addEventListener('click', function () {
    handleAddContactButtonClick();
});

document.getElementById('btn__clear-list').addEventListener('click', function () {
    for (let i = 0; i < localStorage.length; i++) {
        removeCounter(localStorage.key(i), true);
    }
    localStorage.clear();
});

function removeLastContactDiv() {
    let lastContactDiv = document.getElementsByClassName('letter__info');
    if (lastContactDiv.length != 0) {
        for(let i = 0; i < lastContactDiv.length; i++)
            lastContactDiv[i].remove();
        lastContactDiv[0].remove();
    }
}

function closeEditForm() {
    document.querySelector('.edit-contact-container__item').classList.toggle('edit-contact-container__item_active');
    document.querySelector('.edit-background-form').classList.toggle('edit-background-form_active');
}

function clearOutputSearch() {
    outputSearch.innerHTML = '';
}