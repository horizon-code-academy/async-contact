/**
 * Plot contact view.
 * @param {string, Array<string>, number, string}:person
 * @returns string
 */
const plotPerson = ({ id, name, roles, phone, email }) =>
  `<div class="col-md-4 col-xs-6">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${
                    roles
                      ? roles.map(
                          role =>
                            `<span style="text-transform: capitalize;">${role} </span>`
                        )
                      : "no roles"
                  }</h6>
                  <a href="tel:${phone}" class="card-link">Phone</a>
                  <a href="mailto:${email}" class="card-link">Email</a>
                  <button onclick="deleteContactFromLocalStorage(${id})" class="card-link btn btn-link text-danger">
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button 
                    data-toggle="modal"
                    data-target="#editContactModal"
                    onclick="showUpdateModal(${id})"
                    class="card-link btn btn-link text-warning"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>`;

/**
 * Get and Show data from fake API.
 * @returns Array<person>
 */
const fetchPersonsFromAPI = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/horizon-code-academy/fake-data-api/users"
  );
  const data = await response.json();
  localStorage.setItem("persons", JSON.stringify(data));
  document.querySelector(".row").innerHTML = data
    ? data.map(person => plotPerson(person)).join("")
    : "No data...";
};

/**
 * Get and Show data from localStorage.
 * @returns Array<person>
 */
const fetchPersonsFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("persons"));
  document.querySelector(".row").innerHTML = data
    ? data.map(person => plotPerson(person)).join("")
    : "No data...";
};

fetchPersonsFromLocalStorage();
//fetchPersonsFromAPI();

/**
 * Get data from HTML form and save it to localStorage, then reload view.
 */
const saveNewContact = () => {
  const persons = JSON.parse(localStorage.getItem("persons")) || [];
  const roles = [...document.getElementsByName("roles:checked")].map(
    item => item.value
  );
  console.log(roles);
  persons.push({
    id: persons.length !== 0 ? persons[persons.length - 1].id + 1 : 1,
    name: document.querySelector("#name").value,
    phone: document.querySelector("#phone").value,
    email: document.querySelector("#email").value
    /*'roles': document.querySelector('#roles').value */
  });
  localStorage.setItem("persons", JSON.stringify(persons));
  fetchPersonsFromLocalStorage();
  resetForms();
};

const deleteContactFromLocalStorage = id => {
  console.warn(`person n°${id} deleted.`);
  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  persons = persons.filter(person => person.id != id);
  localStorage.setItem("persons", JSON.stringify(persons));
  fetchPersonsFromLocalStorage();
};

const showUpdateModal = id => {
  resetForms();
  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  const person = persons.filter(person => person.id == id)[0];
  document.querySelector("#nameEdit").value = person.name;
  document.querySelector("#phoneEdit").value = person.phone;
  document.querySelector("#emailEdit").value = person.email;
  document.querySelector("#idEdit").value = person.id;
  // roles
};

function resetForms() {
  document.querySelector("#name").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#idEdit").value = "";
  document.querySelector("#nameEdit").value = "";
  document.querySelector("#phoneEdit").value = "";
  document.querySelector("#emailEdit").value = "";
  //document.querySelector("role").value = "";
}

function updateContact() {
  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  console.table(persons);
  for (let i = 0; i < persons.length; i += 1) {
    if (persons[i].id === parseInt(document.querySelector("#idEdit").value)) {
      console.log(document.querySelector("#phoneEdit").value);
      persons[i] = {
        id: parseInt(document.querySelector("#idEdit").value),
        name: document.querySelector("#nameEdit").value,
        phone: document.querySelector("#phoneEdit").value,
        email: document.querySelector("#emailEdit").value
        /*document.querySelector("role").value,*/
      };
      console.log(persons[i]);
    }
  }
  console.table(persons);
  localStorage.setItem("persons", JSON.stringify(persons));
  fetchPersonsFromLocalStorage();
}
