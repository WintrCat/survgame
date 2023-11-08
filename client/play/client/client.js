const roomCode = location.pathname.split("/").at(-1);
const sessionToken = getCookie("survgame_session_token");

let socket = io("wss://survsocket.wintrcat.uk/");

socket.on("disconnect", () => {
    
    alert("The server has closed your connection.");
    location.href = "/dash";

});