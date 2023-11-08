let tokenUsername;

fetch("/api/profile", {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
}).then(async res => {
    let profile = await res.json();

    tokenUsername = profile.username;

    $("#connectionMessage").html(`Connected to ${roomCode.toUpperCase()} as ${tokenUsername}`);
});