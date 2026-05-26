const db = require("../config/db");
const insertItems = (
    values,
    callback
) => {
  const sql = `
        INSERT INTO items
        (
            name,
            purchase_date,
            stock_available,
            item_type_id
        )
        VALUES ?
    `;
    db.query(
        sql,
        [values],
        callback
    );
};
const fetchAllItems = (
    callback
) => {
    const sql = `
        SELECT
            items.id,
            items.name,
            items.purchase_date,
            items.stock_available,
            item_types.type_name
        FROM items
        INNER JOIN item_types
        ON items.item_type_id =
        item_types.id
        ORDER BY items.id DESC
    `;
    db.query(
        sql,
        callback
    );
};
const updateItemById = (
    id,
    itemData,
    callback
) => {
 const {
        name,
        purchase_date,
        stock_available,
        item_type_id
    } = itemData;
    const sql = `
        UPDATE items
        SET
            name=?,
            purchase_date=?,
            stock_available=?,
            item_type_id=?
        WHERE id=?
    `;
    db.query(
        sql,
        [
            name,
            purchase_date,
            stock_available,
            item_type_id,
            id
        ],
        callback
    );
};
const deleteItemById = (
    id,
    callback
) => {

    const sql = `
        DELETE FROM items
        WHERE id=?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};
module.exports = {
    insertItems,
    fetchAllItems,
    updateItemById,
    deleteItemById
};