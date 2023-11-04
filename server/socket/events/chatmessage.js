const { Socket, Server } = require("socket.io");

const Player = require("../lib/player");

const type = "chat_message";

/**
 * @param {Socket} client
 * @param {string} message
 */
async function dispatch(client, message) {

    /**
     * @type {Server}
     */
    let server = client.server;


    /**
     * @type {Player}
     */
    let player = client.player;

    // Validate message
    message = message.slice(0, 192);
    if (/[<>]|^$/g.test(message)) return;

    // Validate cooldown
    if ((Date.now() - player.lastMessageTimestamp) < process.env.ROOM_CHAT_COOLDOWN) return;

    // Log chat cooldown
    player.lastMessageTimestamp = Date.now();

    // Broadcast relay packet
    server.to(player.room).emit("chat_message", player.username, message);
    client.emit("chat_message_success");

}

module.exports = { type, dispatch };