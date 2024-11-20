const users = [
    {
        id: 1,
        name: "Ana",
        lastName: "Martínez",
        phone: "123456789",
        email: "ana@gmail.com",
        genre: "Femenino",
        birthDate: "12/04/1990",
        howMeetUs: "Google",
        privatePolicy: true,
        newsletter: true
    },
    {
        id: 2,
        name: "Juan",
        lastName: "Pérez",
        phone: "987654321",
        email: "juan@gmail.com",
        genre: "Masculino",
        birthDate: "15/02/1985",
        howMeetUs: "Amigo",
        privatePolicy: false,
        newsletter: true
    },
    {
        id: 3,
        name: "Ana Maria",
        lastName: "Martínez",
        phone: "123456789",
        email: "ana@gmail.com",
        genre: "Femenino",
        birthDate: "12/04/1990",
        howMeetUs: "Google",
        privatePolicy: true,
        newsletter: true
    },
];



window.onload = function () {

    const tableBody = document.getElementById("tableBody");

    // Initial load
    users.forEach(user => {
        addRow(user);
    });

    const filterInput = document.getElementById("inputFilter");
    filterInput.addEventListener("input", filterTable);

    // filter by input events
    function filterTable() {
        const filterText = filterInput.value.toLowerCase();

        tableBody.innerHTML = "";

        const filteredUsers = users.filter(user => {
            return (
                user.name.toLowerCase().includes(filterText) ||
                user.lastName.toLowerCase().includes(filterText) ||
                filterText.length < 3
            );
        });

        filteredUsers.forEach(user => {
            addRow(user);
        });

    }

};

// Gets closest tr element and remove it
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}

// Update users values on the row
function updateUser(userId) {

    const user = users.find(user => user.id === userId);

    document.getElementById("name").value = user.name;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("phone").value = user.phone;
    document.getElementById("email").value = user.email;
    document.getElementById("genre").value = user.genre;
    document.getElementById("birthDate").value = `${user.birthDate.split('/').reverse().join('-')}`;
    document.getElementById("howMeetUs").value = user.howMeetUs;
    document.getElementById("privatePolicy").checked = user.privatePolicy;
    document.getElementById("newsletter").checked = user.newsletter;
    document.getElementById("userForm").style.display = "block";

    window.userId = userId;
}


function saveUser(event) {
    event.preventDefault();

    const userId = window.userId;

    const updatedUser = {
        id: userId,
        name: document.getElementById("name").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        genre: document.getElementById("genre").value,
        birthDate: document.getElementById("birthDate").value.split('-').reverse().join('/'),
        howMeetUs: document.getElementById("howMeetUs").value,
        privatePolicy: document.getElementById("privatePolicy").checked,
        newsletter: document.getElementById("newsletter").checked
    };

    // Swaps user on array
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex] = updatedUser;
    

    // Update user row
    const row = document.querySelector(`.table__row--body[data-user-id="${userId}"]`);
    console.log(row)
    row.children[0].textContent = updatedUser.name;
    row.children[1].textContent = updatedUser.lastName;
    row.children[2].textContent = updatedUser.phone;
    row.children[3].textContent = updatedUser.email;
    row.children[4].textContent = updatedUser.genre;
    row.children[5].textContent = updatedUser.birthDate;
    row.children[6].textContent = updatedUser.howMeetUs;
    row.children[7].textContent = updatedUser.privatePolicy ? "Sí" : "No";
    row.children[8].textContent = updatedUser.newsletter ? "Sí" : "No";
    
    document.getElementById("userForm").style.display = "none";

    window.userId = null;
}

// Add row to table
function addRow(user) {
    const row = document.createElement("tr");
    row.classList.add("table__row", "table__row--body");

    // Adds user id to row
    row.dataset.userId = user.id;
    row.innerHTML = `
        <td class="table__body--cell">${user.name}</td>
        <td class="table__body--cell">${user.lastName}</td>
        <td class="table__body--cell">${user.phone}</td>
        <td class="table__body--cell">${user.email}</td>
        <td class="table__body--cell">${user.genre}</td>
        <td class="table__body--cell">${user.birthDate}</td>
        <td class="table__body--cell">${user.howMeetUs}</td>
        <td class="table__body--cell">${user.privatePolicy ? "Sí" : "No"}</td>
        <td class="table__body--cell">${user.newsletter ? "Sí" : "No"}</td>
        <td class="table__body--cell">
            <input type="button" value="Delete" onclick="deleteRow(this)">
            <input type="button" value="Modify" onclick="updateUser(${user.id})">
        </td>
    `;

    tableBody.appendChild(row);
}

