fetch("/api/profile", {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
}).then(async res => {
    let profile = await res.json();

    $("#username").html(profile.username);

    let joinDate = new Date(profile.joinTimestamp * 1000);
    $("#joinDate").html(`Account joined ${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear()}`);
});

$("#deleteAccountButton").click(async () => {

    let confirmation = prompt("Are you sure you want to delete your account? Type CONFIRM below to confirm:");
    if (confirmation != "CONFIRM") return;

    try {
        await fetch("/api/delete", {
            "method": "GET"
        });
    } catch (err) {}

    location.href = "/register";

});