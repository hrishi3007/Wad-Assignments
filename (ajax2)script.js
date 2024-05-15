// Add event listener to the registration form for form submission
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Create a new FormData object to collect form data
    var formData = new FormData(this);

    // Initialize an empty array to store user data
    var userData = [];

    // Check if user data already exists in localStorage
    if (localStorage.getItem("userList")) {
        // Retrieve existing user data from localStorage and parse it into an array
        userData = JSON.parse(localStorage.getItem("userList"));
    }

    // Initialize an empty object to store new user data
    var newUser = {};

    // Iterate over form data and store key-value pairs in the newUser object
    formData.forEach(function(value, key){
        newUser[key] = value;
    });
    
    // Push the new user object into the userData array
    userData.push(newUser);

    // Store updated user data back to localStorage after converting it to JSON format
    localStorage.setItem("userList", JSON.stringify(userData));

    // Create a new XMLHttpRequest object to send data to a server
    var xhr = new XMLHttpRequest();

    // Open a POST request to the specified URL (using a placeholder URL for demonstration)
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

    // Set the request header to specify the content type as JSON
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define the onload function to handle the response from the server
    xhr.onload = function () {
        // Check if the response status is successful (201: Created)
        if (xhr.status === 201) {
            // Log success message to console
            console.log("Data submitted successfully");
            // Redirect user to the data_list.html page
            window.location.href = "data_list.html";
        } else {
            // Log error message to console if data submission fails
            console.error("Failed to submit data");
        }
    };

    // Send the new user data to the server in JSON format
    xhr.send(JSON.stringify(newUser));
});
