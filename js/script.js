let users;
let user_id;

window.onload = async function () {
  const tableBody = document.getElementById("tableBody");
  const buttonCancel = document.getElementById("cancelButton");
  const buttonCreate = document.getElementById("createButton");
  const buttonCreate2 = document.getElementById("createButton2");

  const filterInput = document.getElementById("inputFilter");

  if (filterInput) {
    filterInput.addEventListener("input", filterTable);
  }

  // filter by input events
  if (tableBody) {
    function filterTable() {
      const filterText = filterInput.value.toLowerCase();

      tableBody.innerHTML = "";

      const filteredUsers = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(filterText) ||
          user.lastName.toLowerCase().includes(filterText) ||
          filterText.length < 3
        );
      });

      filteredUsers.forEach((user) => {
        addRow(user);
      });
    }
  }

  if (buttonCreate) {
    buttonCreate.addEventListener("click", function () {
      console.log("button3");
      saveUser(event);
    });
  }

  if (buttonCancel) {
    buttonCancel.addEventListener("click", function () {
      cleanForm();
      user_id = null;
      hideForm();
    });
  }

  if (tableBody) {
    await fetchList();
    showUsers();
  }
};

async function tryDeleteUser(userId, button) {
  AlertManager.showWarning(
    "¿Eliminar este usuario?",
    async () => {
      try {
        await deleteUser(userId);

        // const row = button.closest("tr");
        // if (row) {
        //   row.remove();
        // }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        AlertManager.showError(
          "No se pudo eliminar el usuario. Inténtalo de nuevo."
        );
      }
    },
    () => {
      AlertManager.showCancel("Cancelada la eliminación del usuario");
    }
  );
}

function showUsers() {
  // Initial load
  users.forEach((user) => {
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
  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("birthDate").value = "";
  document.getElementById("howMeetUs").value = "";
  document.getElementById("privatePolicy").checked = "";
  document.getElementById("newsletter").checked = "";
}

async function saveUser(event) {
  event.preventDefault();
  console.log("saveuser");
  if (!user_id) {
    await createUser();
  } else {
    AlertManager.showWarning(
      "El usuario será modificado",
      async () => {
        try {
          const userIndex = users.findIndex((user) => user.id === user_id);
          userData = getUserFormData(user_id);
          console.log(userData);
          modifyUserRow(userData);
          await updateUser(userData);
          document.getElementById("userForm").style.display = "none";
          user_id = null;
        } catch (error) {
          console.error(error);
          AlertManager.showError("Error modificando usuario");
        }
      },
      () => {
        AlertManager.showCancel("Cancelada la modificación del usuario");
      }
    );
  }
}

function getUserFormData(userId) {
  console.log(
    document.getElementById("privatePolicy").checked,
    document.getElementById("newsletter").checked
  );
  return {
    id: userId,
    nombre: document.getElementById("name").value,
    apellidos: document.getElementById("lastName").value,
    password: document.getElementById("password")?.value ?? "",
    telefono: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    sexo: document.querySelector('input[name="genre"]:checked').value,
    fecha_nacimiento: document.getElementById("birthDate").value,
    how_meet_us: document.getElementById("howMeetUs").value,
    privacy_policy: document.getElementById("privatePolicy").checked ? 1 : 0,
    newsletter: document.getElementById("newsletter").checked ? 1 : 0,
  };
}

function modifyUserRow(modifiedUser) {
  const row = document.querySelector(
    `.table__row--body[data-user-id="${user_id}"]`
  );
  const newValues = [
    modifiedUser.name,
    modifiedUser.lastName,
    modifiedUser.phone,
    modifiedUser.email,
    modifiedUser.genre,
    modifiedUser.birthDate,
    modifiedUser.howMeetUs,
    modifiedUser.privatePolicy ? "Sí" : "No",
    modifiedUser.newsletter ? "Sí" : "No",
  ];

  // Update user cell
  row.querySelectorAll(".table__body--cell").forEach((cell, index) => {
    cell.textContent = newValues[index];
  });

  // Adds row buttons on last cell
  row.lastElementChild.innerHTML = `<input type="button" value="Delete" onclick="tryDeleteUser(${modifiedUser.id})">
        <input type="button" value="Modify" onclick="showUser(${modifiedUser.id})">`;
}

function addRow(user) {
  const row = document.createElement("tr");
  row.classList.add("table__row", "table__row--body");

  // Adds user id to row
  console.log(user);
  row.dataset.userId = user.id;
  row.innerHTML = `
        <td class="table__body--cell">${user.nombre ?? "--"}</td>
        <td class="table__body--cell">${user.apellidos ?? "&nbsp--"}</td>
        <td class="table__body--cell">${user.telefono ?? "&nbsp--"}</td>
        <td class="table__body--cell">${user.email ?? "&nbsp--"}</td>
        <td class="table__body--cell">${
          user.sexo ? (user.sexo === "F" ? "Femenino" : "Masculino") : "Otro"
        }</td>
        <td class="table__body--cell">${
          user.fecha_nacimiento
            ? user.fecha_nacimiento.split("-").reverse().join("/")
            : ""
        }</td>
        <td class="table__body--cell">${user.how_meet_us ?? "&nbsp--"}</td>
        <td class="table__body--cell">${user.privacy_policy ? "Sí" : "No"}</td>
        <td class="table__body--cell">${user.newsletter ? "Sí" : "No"}</td>
        <td class="table__body--cell">
            <input type="button" value="Delete" onclick="tryDeleteUser(${
              user.id
            })">
            <input type="button" value="Modify" onclick="showUser(${user.id})">
        </td>
    `;

  tableBody.appendChild(row);
}

async function fetchList() {
  try {
    const response = await fetch("ws/getUser.php");
    console.log(response);
    if (!response.ok) {
      throw new Error(
        "Error cargando listado de alumnos: Error " + response.status
      );
    }
    const result = await response.json();
    users = result.data;
    AlertManager.showTimedAlert(result.message, 1000, result.success);
  } catch (error) {
    AlertManager.showError(error.message);
  }
}

async function deleteUser(userId) {
  try {
    const response = await fetch(`ws/deleteUser.php?id=${userId}`);

    if (!response.ok) {
      throw new Error("Error eliminando el alumnos: Error " + response.status);
    }
    const result = await response.json();
    AlertManager.showTimedAlert(result.message, 1000, result.success);
  } catch (error) {
    AlertManager.showError(error.message);
  }
}

async function createUser() {
  let finalMessage = null;
  const newUser = getUserFormData();
  console.log(newUser);

  // FormData object
  const formData = new FormData();
  Object.keys(newUser).forEach((key) => {
    formData.append(key, newUser[key]);
  });

  console.log(formData);
  try {
    const response = await fetch("ws/createUser2.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error creando el alumnos: Error " + response.status);
    }

    const result = await response.json();
    console.log(result.success);
    if (!result.success) finalMessage = manageErrorResponse(result);
    AlertManager.showTimedAlert(
      finalMessage ?? result.message,
      2000,
      result.success
    );
  } catch (error) {
    AlertManager.showError(error.message);
  }
}

function manageErrorResponse(result) {
  finalMessage = result.message + ":<br>";
  result.data.forEach((data) => {
    finalMessage += "- " + data + "<br>";
  });
  return finalMessage;
}

async function showUser(userId) {
  const response = await fetch(`ws/getUser.php?id=${userId}`);
  const result = await response.json();
  console.log(result.data);
  user_id = userId;
  document.getElementById("name").value = result.data.nombre;
  document.getElementById("lastName").value = result.data.apellidos;
  document.getElementById("phone").value = result.data.telefono;
  document.getElementById("email").value = result.data.email;
  document.querySelector('input[name="genre"]:checked').value === "Femenino"
    ? "F"
    : "M";
  document.getElementById("birthDate").value = `${result.data.fecha_nacimiento
    .split("/")
    .reverse()
    .join("-")}`;
  document.getElementById("howMeetUs").value = result.data.how_meet_us;
  document.getElementById("privatePolicy").checked = result.data.privacy_policy;
  document.getElementById("newsletter").checked = result.data.newsletter;
  document.getElementById("userForm").style.display = "block";
}

async function updateUser(modifiedUser) {
  console.log(modifiedUser);
  const formData = new FormData();
  Object.keys(modifiedUser).forEach((key) => {
    formData.append(key, modifiedUser[key]);
  });

  try {
    const response = await fetch(`ws/updateUser.php?id=${modifiedUser.id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error modificando el alumnos: Error " + response.status);
    }
    const result = await response.json();
    AlertManager.showTimedAlert(result.message, 1000, result.success);
  } catch (error) {
    AlertManager.showError(error.message);
  }
}
