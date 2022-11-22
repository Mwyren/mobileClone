const overlay = document.querySelector('.overlay');
const input = document.querySelector('.input');
const hour = document.querySelector('.hour');
const message_contacts = document.querySelector('.message-navigation');
const btnContacts = document.querySelector('.fa-message');
const closeBtn = document.querySelector('.close-btn');

// ADD AND REMOVE OVERLAY

input.addEventListener('focus', () => overlay.classList.add('show'));

input.addEventListener('blur', () => overlay.classList.remove('show'));

// TIMER

const currentHours = new Date().getHours();
const currentMinutes = new Date().getMinutes();

const hours = currentHours < 10 ? '0' + currentHours : currentHours;
const minutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;

hour.innerHTML = `<span>${hours} : ${minutes}</span>`;

// TOGGLE CONTACTS OVERLAY

btnContacts.addEventListener('click', () => {
  message_contacts.classList.toggle('show');
  btnContacts.classList.toggle('active');
  input.classList.toggle('hide');
});

closeBtn.addEventListener('click', () => {
  message_contacts.classList.remove('show');
  btnContacts.classList.remove('active');
  input.classList.remove('hide');
});

// FETCH API RANDOM USERS

let dataArray;

async function getUsers(){
  try{
    const res = await fetch('https://randomuser.me/api/?nat=en&results=10')
    const {results} = await res.json()
    console.log(results);
    dataArray = results;
    createListContacts(dataArray)
  }catch(error){
    console.log(error);
  }
}

getUsers()

const list = document.querySelector('.list-contact')

function createListContacts(array){
  array.forEach(user => {
    const contact = document.createElement('li')
    contact.className = '.list-contact contacts'
    contact.innerHTML = `${user.name.first} ${user.name.last}`
    list.appendChild(contact)
  })
}

// RESEARCH CONTACTS

const searchInput = document.querySelector('.input-message input')

searchInput.addEventListener('input', filteredData)

function filteredData(e){
  list.textContent = ''

  const searchedString = e.target.value.toLowerCase().replace(/\s/g, '')

  const filteredArray = dataArray.filter(userData => searchForOccurences(userData))

  function searchForOccurences(userData){
    const searchTypes = {
      firstname: userData.name.first.toLowerCase(),
      lastname: userData.name.last.toLowerCase(),
      firstAndLast: `${userData.name.first + userData.name.last}`.toLowerCase(),
      lastAndFirst: `${userData.name.last + userData.name.first}`.toLowerCase()
    }
    for(const prop in searchTypes){
      if(searchTypes[prop].includes(searchedString)){
        return true
      }
    }
  }

  createListContacts(filteredArray)
}

