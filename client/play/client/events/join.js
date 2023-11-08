// Clientbound
socket.emit("join", roomCode, sessionToken);

// Serverbound
socket.on("join", username => {

    addSystemChatMessage(username + " has joined the room.");
    socket.emit("player_fetch");

    if (notificationPreferences.system) {
        Notification.requestPermission().then(() => {
            new Notification(username + " joined the room.", {"icon": "/media/favicon.ico"})
        });
    }

});