const express = require('express');
const router = express.Router();
const {
    create,
    readList,
    update,
    remove,
    getAllStaffNames,
    getCashOpsList,
} = require('../../controllers/finance');

// @ routes api/finance
// CRUD
router.post("/", create);
router.get("/cash-ops/list/:period", getCashOpsList);
router.put("/:itemId", update);
router.delete("/:itemId", remove);

// LIST
router.get("/staff/list/names", getAllStaffNames);


module.exports = router;