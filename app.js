const Myform = document.querySelector('#my-form');


class Contact {
  constructor(sub, mas, name, gen, phone, email) {
    this.sup = sub;
    this.mas = mas;
    this.name = name;
    this.gen = gen;
    this.phone = phone;
    this.email = email;
  }
}

class UI {
  static displayContact() {
    const contacts = Store.getcontact();
    contacts.forEach((contact) => UI.addContactToList(contact));
  }


  static addContactToList(contact) {
    const list = document.querySelector('#list-contact');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${contact.sup}</td>
      <td>${contact.mas}</td>
      <td>${contact.name}</td>
      <td>${contact.gen}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(row);
  }


  static deleteContact(el) {
   
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

}


class Store {
  static getcontact() {
    let contacts;
    if(localStorage.getItem('contacts') === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    return contacts;
  }

  static addcontact(contact) {
    const contacts = Store.getcontact();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  static removecontact(isbn) {
    const contacts = Store.getcontact();

    contacts.forEach((contact, index) => {
      if(contact.isbn === isbn) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}
document.addEventListener('DOMContentLoaded', UI.displayContact);


Myform.addEventListener('submit', (e) => {
  const div = document.querySelector('.listError');
  const subInput = document.querySelector('#sub-input');
  const masInput = document.querySelector('#mas');
  const nameInput = document.querySelector('#name');
  const genderInput = document.querySelector('.form-check');
  const maleInput = document.querySelector('#gen1');
  const femaleInput = document.querySelector('#gen2')
  const phoneInput = document.querySelector('#phone');
  const emailInput = document.querySelector('#email');
  e.preventDefault();
  if (subInput.value === '' || masInput.value === '' || nameInput.value === '' || phoneInput.value === '' || emailInput.value === '') {
    //alert('Please fill in all data fields');
    div.classList.add('error');
    div.innerHTML = 'Please enter all fields';
    setTimeout(() => document.querySelector('.error').remove(), 3000);

  } else {

    if (maleInput.checked === true) {
      genderInput.value = "Male"
    } else {
      genderInput.value = "Female"
    }
    // if(genderInput.id===maleInput.id){
    //  genderInput.value = "male";
    // }else if(genderInput.id===femaleInput.id){
    //   genderInput.value = "Male";
    // }
    // console.log(maleInput.id);
    // console.log(femaleInput.id);
    // console.log(genderInput.value);
    const contact = new Contact(subInput.value, masInput.value, nameInput.value, genderInput.value, phoneInput.value, emailInput.value);
    UI.addContactToList(contact);
    Store.addcontact(contact);
    subInput.value = '';
    masInput.value = '';
    genderInput.value = '';
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    maleInput.checked = false;
    femaleInput.checked = false;
  }
});
document.querySelector('#list-contact').addEventListener('click', (e) => {
  UI.deleteContact(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// Myform.addEventListener('submit', onSubmit);
// function onSubmit(e) {
//     const subInput = document.querySelector('#sub');
//     const masInput = document.querySelector('#mas');
//     const nameInput = document.querySelector('#name');
//     const genderInput = document.querySelector('.form-check');
//     const phoneInput = document.querySelector('#phone');
//     const emailInput = document.querySelector('#email');
//     e.preventDefault();
//     if (subInput.value === '' || masInput.value === '' || nameInput.value === '' || genderInput.value === '' || phoneInput.value === '' || emailInput.value === '') {
//         //alert('Please fill in all data fields');
//         div.classList.add('error');
//         div.innerHTML = 'Please enter all fields';
//         setTimeout(() => document.querySelector('.error').remove(), 3000);

//     } else {
//         const Contact = new Contact(subInput, masInput, nameInput, genderInput, phoneInput, emailInput);
//         const list = document.querySelector('#list-contact');
//         const row = document.createElement('tr');
//         row.innerHTML =
//             `<td>${Contact.sub}</td>
//             <td>${Contact.mas}</td>
//             <td>${Contact.name}</td>
//             <td>${Contact.gen}</td>
//             <td>${Contact.phone}</td>
//             <td>${Contact.email}</td>
//             <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>`;
//         console.log(Contact);



//     }
// }




