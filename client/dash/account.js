fetch("/api/profile", {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
}).then(async res => {
    let profile = await res.json();

    $("#username").html("Logged in as " + profile.username);

    let joinDate = new Date(profile.joinTimestamp * 1000);
    $("#joinDate").html(`Account joined ${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear()}`);
});

$("#accountSettingsButton").click(() => {

    location.href = "/settings";

});

$("#logoutButton").click(async () => {

    try {
        await fetch("/api/logout", {
            "method": "GET"
        });
    } catch (err) {}

    location.href = "/login";

});