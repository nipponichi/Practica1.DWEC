window.onload = function() {

    const users = [
        {
            name: "Ana",
            lastName: "Martínez",
            phone: "123456789",
            email: "ana@gmail.com",
            genre: "Femenino",
            birthDate: "12/04/1990",
            howMeetUs: "Amiga",
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
            howMeetUs: "Colega",
            privatePolicy: false,
            newsletter: true
        }
    ];

    const tableBody = document.querySelector(".table__body");

    // Add row to table
    function addRow(user) {
        const row = document.createElement("tr");
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
            <td class="table__body--cell"><input type="button" value="X" onclick="deleteRow(this)"></td>
        `;

        tableBody.appendChild(row);
    }

    users.forEach(user => {
        addRow(user);
    });

    const filterInput = document.getElementById("filterTable");

    filterInput.addEventListener("input", function() {
        const filterText = filterInput.value.toLowerCase();

        const rows = Array.from(document.querySelectorAll(".table__body .table__row--body"));

        // Filter from 3 letters
        if (filterText.length >= 3) {

            const matchingRows = rows.filter(row => row.textContent.toLowerCase().includes(filterText));

            rows.forEach(row => {
                row.style.display = "none";
            });

            matchingRows.forEach(row => {
                row.style.display = "";
            });

        } else {

            rows.forEach(row => {
                row.style.display = "";
            });
        }
    });
};


function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
