function saveUsername(event) {
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    console.log(username);
    
   
    setTimeout(() => {
        window.location.href = "room.html"; 
    }, 100); 
}
