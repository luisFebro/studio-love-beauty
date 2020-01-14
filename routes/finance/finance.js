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
router.post("/", create);
router.get("/list/all", readList);
router.put("/:itemId", update);
router.delete("/:itemId", remove);

// LIST
router.get("/staff/list/names", getAllStaffNames);
router.get("/cash-ops/list/:period", getCashOpsList);


module.exports = router;