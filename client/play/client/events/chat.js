setInterval(() => {
    let timeSinceLastMessage = (Date.now() - $("#chatMessageField").attr("data-cooldown"));

    if (timeSinceLastMessage >= 1000) {
        $("#chatMessageField").attr("placeholder", "Send Message...");
    } else {
        let timeLeft = (1 - timeSinceLastMessage / 1000).toFixed(1);
        $("#chatMessageField").attr("placeholder", `Send Message in ${timeLeft}s...`);
    }
}, 100);

// Serverbound
$("#sendChatMessageButton").click(() => {

    let message = $("#chatMessageField").val();
    socket.emit("chat_message", message);

});

addEventListener("keypress", event => {

    if (event.key == "Enter" && $("#chatMessageField").is(":focus")) {
        let message = $("#chatMessageField").val();
        socket.emit("chat_message", message);
    }

});

// Clientbound
socket.on("chat_message", (username, message) => {

    addPlayerChatMessage(username, message);

    let mentioned = message.toLowerCase().includes("@" + tokenUsername.toLowerCase());

    if (document.hidden) {
        if (notificationPreferences.all) {
            Notification.requestPermission().then(() => {
                new Notification(username + " sent a message to the room chat.", {"icon": "/media/favicon.ico"})
            });
        } else if (notificationPreferences.mentions && mentioned) {
            Notification.requestPermission().then(() => {
                new Notification(username + " mentioned you in the room chat.", {"icon": "/media/favicon.ico"});
            });
        }
    }

});

socket.on("chat_message_success", () => {

    $("#chatMessageField").val("");

    $("#chatMessageField").attr("data-cooldown", Date.now());

});