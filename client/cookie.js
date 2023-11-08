/**
 * @description Returns an object with each cookie as a key-value pair
 */
function getCookies() {
    let pairs = document.cookie.match(/[^;].+?=.+?(?=;|$)/g);
    return Object.fromEntries(pairs.map(pair => pair.split("=")));
}

/**
 * @description Returns the value of a cookie key or a default if it doesn't exist
 */
function getCookie(key, defaultValue = null) {
    return getCookies()[key] ?? defaultValue;
}

/**
 * @description Adds a new cookie with given key and value
 */
function setCookie(key, value) {
    document.cookie = `${key}=${value}`;
}

/**
 * @description Returns object with keys notification type and values booleans
 */
function getNotificationPreferences() {
    let preferences = {};

    preferences.mentions = getCookie("survgame_notifications_mentions", "true") == "true";
    preferences.system = getCookie("survgame_notifications_mentions") == "true";
    preferences.all = getCookie("survgame_notifications_mentions") == "true";

    return preferences;
}