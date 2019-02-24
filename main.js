const plotPerson = ({name, roles, phone, email}) => (
  `<div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${roles.map(role => 
                    `<span style="text-transform: capitalize;">${role} </span>`
                    )}</h6>
                  <a href="tel:${phone}" class="card-link">Phone</a>
                  <a href="mailto:${email}" class="card-link">Email</a>
                </div>
              </div>
            </div>`
);

const fetchPersonsFromAPI = async () => {
    const response = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-data-api/users');
    const data = await response.json();
    localStorage.setItem("persons", JSON.stringify(data));
    //document.querySelector('.row').innerHTML = data.map(person => plotPerson(person)).join('');
};

const fetchPersonsFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("persons"));
    document.querySelector('.row').innerHTML = data.map(person => plotPerson(person)).join('');
};

fetchPersonsFromLocalStorage();
//fetchPersonsFromAPI();
