const express = require("express");
const router = express.Router();
const {
    createItems,
    getAllItems,
    updateItem,
    deleteItem
} = require("../controllers/itemController");
const validateItem =
require("../middleware/validateItem");
router.post(
    "/",
    validateItem,
    createItems
);
router.get(
    "/",
    getAllItems
);
router.put(
    "/:id",
    updateItem
);
router.delete(
    "/:id",
    deleteItem
);
module.exports = router;