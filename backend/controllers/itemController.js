const {
    insertItems,
    fetchAllItems,
    updateItemById,
    deleteItemById
} = require("../models/itemModel");
exports.createItems = (
    req,
    res,
    next
) => {
    const items = req.body.items;
    const values = [];
    for (let item of items) {
        values.push([
            item.name,
            item.purchase_date,
            item.stock_available,
            item.item_type_id
        ]);
    }
    insertItems(
        values,
        (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                success: true,
                message:
                "Items Added Successfully"
            });
        }
    );
};



exports.getAllItems = (
    req,
    res,
    next
) => {

    fetchAllItems(
        (err, result) => {

            if (err) {
                return next(err);
            }

            res.status(200).json({

                success: true,

                data: result
            });
        }
    );
};



exports.updateItem = (
    req,
    res,
    next
) => {

    const id = req.params.id;

    updateItemById(
        id,
        req.body,

        (err, result) => {

            if (err) {
                return next(err);
            }

            res.status(200).json({

                success: true,

                message:
                "Item Updated Successfully"
            });
        }
    );
};



exports.deleteItem = (
    req,
    res,
    next
) => {

    const id = req.params.id;

    deleteItemById(
        id,

        (err, result) => {

            if (err) {
                return next(err);
            }

            res.status(200).json({

                success: true,

                message:
                "Item Deleted Successfully"
            });
        }
    );
};