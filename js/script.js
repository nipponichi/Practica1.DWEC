let users;
let user_id;

window.onload = async function () {

    const tableBody = document.getElementById("tableBody");



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

    createButton.addEventListener("click", function () {
        //AlertManager.showSuccess("Crear");
        showForm();
        cleanForm();
    });

    cancelButton.addEventListener("click", function () {
        cleanForm();
        user_id = null;
        hideForm();
    });

    await fetchList();
    showUsers();
};

async function tryDeleteUser(userId) {
    try {
        console.log("id " + userId);
        await deleteUser(userId);
        const row = button.closest("tr");
        row.remove();
    } catch (error) {
        console.error('Error en tryDeleteUser:', error);
    }

}

function showUsers() {
    // Initial load
    users.forEach(user => {
        addRow(user);
    });
}

function showForm() {
    document.getElementById("userForm").style.display = "block";
}
function hideForm() {
    document.getElementById("userForm").style.display = "none";
}
function cleanForm() {
    document.getElementById("name").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("email").value = '';
    document.getElementById("genre").value = '';
    document.getElementById("birthDate").value = '';
    document.getElementById("howMeetUs").value = '';
    document.getElementById("privatePolicy").checked = '';
    document.getElementById("newsletter").checked = '';
}

async function saveUser(event) {
    event.preventDefault();
    if (!user_id) {
        await createUser();

    } else {
        // Swaps user on array
        await updateUser();
        const userIndex = users.findIndex(user => user.id === user_id);
        users[userIndex] = getUserFormData();
        console.log(users[userIndex]);
        modifyUserRow(users[userIndex])

        document.getElementById("userForm").style.display = "none";

        user_id = null;
    }
}

function getUserFormData() {
    return {
        id: user_id,
        nombre: document.getElementById("name").value,
        apellidos: document.getElementById("lastName").value,
        //TODO
        password: '12345678',
        telefono: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        sexo: document.getElementById("genre").value === 'Femenino' ? 'F' : 'M',
        fecha_nacimiento: document.getElementById("birthDate").value,
        how_meet_us: document.getElementById("howMeetUs").value,
        privacy_policy: document.getElementById("privatePolicy").checked,
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
        `<input type="button" value="Delete" onclick="tryDeleteUser(${modifiedUser.id})">
        <input type="button" value="Modify" onclick="showUser(${modifiedUser.id})">`;
}

function addRow(user) {
    const row = document.createElement("tr");
    row.classList.add("table__row", "table__row--body");

    // Adds user id to row
    row.dataset.userId = user.id;
    row.innerHTML = `
        <td class="table__body--cell">${user.nombre}</td>
        <td class="table__body--cell">${user.apellidos}</td>
        <td class="table__body--cell">${user.telefono}</td>
        <td class="table__body--cell">${user.email}</td>
        <td class="table__body--cell">${user.sexo ? user.sexo === 'F' ? 'Femenino' : 'Masculino' : 'Desconocido'}</td>
        <td class="table__body--cell">${user.fecha_nacimiento}</td>
        <td class="table__body--cell">${user.how_meet_us}</td>
        <td class="table__body--cell">${user.privatePolicy ? "Sí" : "No"}</td>
        <td class="table__body--cell">${user.newsletter ? "Sí" : "No"}</td>
        <td class="table__body--cell">
            <input type="button" value="Delete" onclick="tryDeleteUser(${user.id})">
            <input type="button" value="Modify" onclick="showUser(${user.id})">
        </td>
    `;

    tableBody.appendChild(row);
}

async function fetchList() {
    try {
        const response = await fetch('ws/getUser.php');

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        users = data.data;
        console.log('Listado recibido desde PHP:', users);

    } catch (error) {
        console.error('Error al obtener el listado:', error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`ws/deleteUser.php?id=${userId}`)

        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        if (result.success) {
            console.log(`Usuario con ID ${userId} eliminado con éxito`);
        } else {
            console.error(`Error del servidor: ${result.message}`);
        }

    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

async function createUser() {

    const newUser = getUserFormData();
    console.log(newUser);

    // FormData object
    const formData = new FormData();
    Object.keys(newUser).forEach((key) => {
        formData.append(key, newUser[key]);
    });

    try {
        const response = await fetch('ws/CreateUser2.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert('Usuario creado exitosamente');
        } else {
            alert('Error: ' + result.message + '\n' + result.data.join('\n'));
        }
    } catch (error) {
        // Manejar errores de red u otros
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al enviar los datos. Verifica tu conexión o el servidor.');
    }
}

async function updateUser() {
    const modifiedUser = getUserFormData();
    console.log(modifiedUser)
    const formData = new FormData();
    Object.keys(modifiedUser).forEach((key) => {
        formData.append(key, modifiedUser[key]);
    });

    try {
        const response = await fetch(`ws/updateUser.php?id=${modifiedUser.id}`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            alert('Usuario modificado exitosamente');
        } else {
            alert('Error: ' + result.message + '\n' + result.data.join('\n'));
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al enviar los datos. Verifica tu conexión o el servidor.');
    }
}

async function showUser(userId) {
    const response = await fetch(`ws/getUser.php?id=${userId}`)
    const result = await response.json();

    document.getElementById("name").value = result.data.nombre;
    document.getElementById("lastName").value = result.data.apellidos;
    document.getElementById("phone").value = result.data.telefono;
    document.getElementById("email").value = result.data.email;
    document.getElementById("genre").value = result.data.sexo? result.data.sexo === 'F' ? 'Femenino' : 'Masculino' : 'Desconocido';
    document.getElementById("birthDate").value = `${result.data.fecha_nacimiento.split('/').reverse().join('-')}`;
    document.getElementById("howMeetUs").value = result.data.how_meet_us;
    document.getElementById("privatePolicy").checked = result.data.privatePolicy;
    document.getElementById("newsletter").checked = result.data.newsletter;
    document.getElementById("userForm").style.display = "block";
}
