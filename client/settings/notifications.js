let preferences = getNotificationPreferences();

$("*[data-notification-type=mentions]").prop("checked", preferences.mentions);
$("*[data-notification-type=system]").prop("checked", preferences.system);
$("*[data-notification-type=all]").prop("checked", preferences.all);

document.querySelectorAll(".notificationCheckbox").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        let notificationType = $(checkbox).attr("data-notification-type");
        setCookie("survgame_notifications_" + notificationType, checkbox.checked);
    });
});