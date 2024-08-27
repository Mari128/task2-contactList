let contactName = document.getElementById("contact-name-id");
let jobTitle = document.getElementById("job-title-id");
let phoneNumber = document.getElementById("phone-number-id");

let editContactName = document.getElementById("edit-contact-name-id");
let editJobTitle = document.getElementById("edit-job-title-id");
let editPhoneNumber = document.getElementById("edit-phone-number-id");

let inputsArr = [contactName, jobTitle, phoneNumber];

let editInputsArr = [editContactName, editJobTitle, editPhoneNumber];

inputsArr.forEach((inpt) => {
    inpt.addEventListener("input", function (event) {
        isValid(inpt);
      });
})

editInputsArr.forEach((inpt) => {
    inpt.addEventListener("input", function (event) {
        isValid(inpt);
      });
})

function isValidField() {
    let flag = true;
    for(let inpt of inputsArr) { 
        isValid(inpt) ? true : flag = false;
    }
    return flag;
}

function isValid(inpt) {
    let addError = document.getElementById(`${inpt.className}`+"-error");
    if (inpt.value != null && inpt.validity.valid) {
        addError.textContent = ""; 
        addError.className = "error";
        return true; 
    } else { 
        showError(inpt, addError);
        return false;
    }
}


function showError(inpt, addError) {
    if (inpt.validity.valueMissing) {
        addError.textContent = `You need to enter an ${inpt.className.replace("-"," ")}`;
    } else if (inpt.validity.tooShort) {
        addError.textContent = `${inpt.className.replace("-"," ")} should be at least ${inpt.minLength} characters; you entered ${inpt.value.length}.`;
    } else if (inpt.validity.patternMismatch) {
        addError.textContent = `Invalid ${inpt.className.replace("-"," ")}.`;
    }
}