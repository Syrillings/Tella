function saveUsername(event) {
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    console.log(username);
    
    // Use a timeout to allow the form to submit
    setTimeout(() => {
        window.location.href = "room.html"; // Navigate to the chat room page
    }, 100); // Delay for a brief moment
}
