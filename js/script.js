window.onload = function () {

    const users = [
        {
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

    const tableBody = document.querySelector(".table__body");

    // Adds user row to table at start
    function addRow(user) {
        const row = document.createElement("tr");

        // To maintain the html consistency
        row.classList.add("table__row", "table__row--body");
        row.innerHTML = `
            <td class="table__body--cell">${user.name}</td>
            <td class="table__body--cell">${user.lastName}</td>
            <td class="table__body--cell">${user.phone}</td>
            <td class="table__body--cell">${user.email}</td>
            <td class="table__body--cell">${user.genre}</td>
            <td class="table__body--cell">${user.birthDate}</td>
            <td class="table__body--cell">${user.howMeetUs}</td>
            <td class="table__body--cell">${user.privatePolicy}</td>
            <td class="table__body--cell">${user.newsletter}</td>
            <td class="table__body--cell">
            <input type="button" value="X" onclick="deleteRow(this)"></td>
        `;

        tableBody.appendChild(row);
    }

    users.forEach(user => {
        addRow(user);
    });

    const filterInput = document.querySelector(".table__section--filter");
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
