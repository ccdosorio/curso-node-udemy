const { Router } = require("express");

const {
    usersGet,
    usertsPost,
    usersPut,
    usersPatch,
    usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post("/", usertsPost);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
