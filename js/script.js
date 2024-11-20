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


let user_id;

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

function deleteUser(button) {
    const row = button.closest("tr");
    row.remove();
}

function showUser(userId) {
    user_id = userId;
    const user = users.find(user => user.id === user_id);

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

}

function saveUser(event) {
    event.preventDefault();

    // Swaps user on array
    const userIndex = users.findIndex(user => user.id === user_id);
    users[userIndex] = getUserFormData();
    console.log(users[userIndex]);
    modifyUserRow(users[userIndex])

    document.getElementById("userForm").style.display = "none";

    user_id = null;
}

function getUserFormData() {
    return {
        id: user_id,
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
}

function modifyUserRow(modifiedUser) {
    const row = document.querySelector(`.table__row--body[data-user-id="${user_id}"]`);
    const newValues = [
        modifiedUser.name,
        modifiedUser.lastName,
        modifiedUser.phone,
        modifiedUser.email,
        modifiedUser.genre,
        modifiedUser.birthDate,
        modifiedUser.howMeetUs,
        modifiedUser.privatePolicy ? "Sí" : "No",
        modifiedUser.newsletter ? "Sí" : "No"
    ];

    // Update user cell
    row.querySelectorAll('.table__body--cell').forEach((cell, index) => {
        cell.textContent = newValues[index];
    });

    // Adds row buttons on last cell
    row.lastElementChild.innerHTML =
        `<input type="button" value="Delete" onclick="deleteUser(this)">
        <input type="button" value="Modify" onclick="showUser(${modifiedUser.id})">`;
}

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
            <input type="button" value="Delete" onclick="deleteUser(this)">
            <input type="button" value="Modify" onclick="showUser(${user.id})">
        </td>
    `;

    tableBody.appendChild(row);
}

