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
  console.table(data);
};

fetchPersonsFromLocalStorage();
//fetchPersonsFromAPI();

/**
 * Get data from HTML form and save it to localStorage, then reload view.
 */
const saveNewContact = () => {
  const persons = JSON.parse(localStorage.getItem("persons")) || [];
  persons.push({
    id: persons.length !== 0 ? persons[persons.length - 1].id + 1 : 1,
    name: document.querySelector("#name").value,
    phone: document.querySelector("#phone").value,
    email: document.querySelector("#email").value
    /*'roles': document.querySelector('#roles').value */
  });
  localStorage.setItem("persons", JSON.stringify(persons));
  fetchPersonsFromLocalStorage();
};

const deleteContactFromLocalStorage = id => {
  console.warn(`person n°${id} deleted.`);
  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  persons = persons.filter(person => person.id !== id);
  localStorage.setItem("persons", JSON.stringify(persons));
  fetchPersonsFromLocalStorage();
};
