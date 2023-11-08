let tokenUsername;

fetch("/api/profile", {
    "method": "GET"
}).then(async res => {
    let profile = await res.json();

    tokenUsername = profile.username;

    $("#connectionMessage").html(`Connected to ${roomCode.toUpperCase()} as ${username}`);
});