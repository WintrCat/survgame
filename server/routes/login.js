const { Router } = require("express");

const database = require("../lib/database");
const session = require("../lib/session");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/api/login", async (req, res) => {

    let { 
        username = "", 
        password = "" 
    } = req.body;

    if (!await database.accountExists(username)) {
        return res.status(400).send("No account with this username exists.");
    }

    if (!await database.comparePassword(username, password)) {
        return res.status(400).send("Incorrect password.");
    }

    let sessionToken = session.generate();
    await session.update(username, sessionToken);
    res.cookie(session.COOKIE_NAME, sessionToken);

    res.sendStatus(200);

});

module.exports = router;