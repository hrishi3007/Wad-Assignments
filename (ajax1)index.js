// document.addEventListener("DOMContentLoaded", function () {
//   const addUserBtn = document.getElementById("addUserBtn");
//   const modal = document.getElementById("addUserModal");
//   const closeModalBtn = document.querySelector(".close");
//   const addUserForm = document.getElementById("addUserForm");
//   const userList = document.getElementById("userList");

//   // Function to show the modal
//   function showModal() {
//     modal.style.display = "block";
//   }

//   // Function to hide the modal
//   function hideModal() {
//     modal.style.display = "none";
//   }

//   // Event listener for clicking the "Add New User" button
//   addUserBtn.addEventListener("click", showModal);

//   // Event listener for clicking the close button in the modal
//   closeModalBtn.addEventListener("click", hideModal);

//   // Event listener for submitting the form
//   addUserForm.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const email = document.getElementById("email").value;
//     const name = document.getElementById("name").value;
//     const username = document.getElementById("username").value;
//     const city = document.getElementById("city").value;
//     const phone = document.getElementById("phone").value;

//     // Create a new user object
//     const user = {
//       email,
//       name,
//       username,
//       city,
//       phone,
//     };

//     // Save user data to local storage
//     saveUser(user);

//     // Hide the modal
//     hideModal();

//     // Clear the form fields
//     addUserForm.reset();

//     // Refresh the user list
//     displayUserList();
//   });

//   // Function to save user data to local storage
//   function saveUser(user) {
//     let users = JSON.parse(localStorage.getItem("users")) || [];
//     users.push(user);
//     localStorage.setItem("users", JSON.stringify(users));
//   }

//   // Function to display the user list
//   function displayUserList() {
//     userList.innerHTML = ""; // Clear existing user list

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     users.forEach((user, index) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${user.name}</td>
//         <td>${user.username}</td>
//         <td>${user.email}</td>
//         <td>${user.phone}</td>
//         <td>${user.city}</td>
//       `;
//       userList.appendChild(row);
//     });
//   }

//   // Display the user list when the page loads
//   displayUserList();
// });

// ========================================================================================================

let fetchData = () => {
  let httprequest = new XMLHttpRequest();
  httprequest.open("GET", "https://jsonplaceholder.typicode.com/users");
  httprequest.send();
  httprequest.onload = () => {
    let res = JSON.parse(httprequest.responseText);
    console.log(res);
    localStorage.setItem("users", JSON.stringify(res));
    displayData();
  };
};

let displayData = () => {
  let userList = document.getElementById("userList");
  userList.innerHTML = "";
  let storedUser = JSON.parse(localStorage.getItem("users"));
  storedUser.map(
    (user, index) =>
      (userList.innerHTML += `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${user.name}</td>
                      <td>${user.username}</td>
                      <td>${user.email}</td>
                      <td>${user.phone}</td>
                      <td>${user.address.city}</td>
                     
                  </tr>`)
  );
};

//initial Data
fetchData();

let addUserBtn = document.getElementById("addUserBtn");
addUserBtn.addEventListener("click", () => {
  document.getElementById("addUserModal").style.display = "block";
});

let closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", () => {
  document.getElementById("addUserModal").style.display = "none";
});

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;

  let postObject = {
    email,
    name,
    phone,
    username,
    address: {
      city: city,
    },
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(postObject));

  xhr.onload = () => {
    if (xhr.status == 201) {
      let storedUser = JSON.parse(localStorage.getItem("users"));
      storedUser.unshift(postObject);
      localStorage.setItem("users", JSON.stringify(storedUser));
      displayData();
      document.getElementById("addUserModal").style.display = "none";
    }
  };
});
