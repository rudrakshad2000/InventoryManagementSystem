const validateItem = (req, res, next) => {
    const items = req.body.items;
    if (!items || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Items array is required"
        });
    }
    for (let item of items) {
        const {
            name,
            purchase_date,
            item_type_id
        } = item;
        if (
            !name ||
            !purchase_date ||
            !item_type_id
        ) {
            return res.status(400).json({
                success: false,
                message:
                "Name, Purchase Date and Item Type are required"
            });
        }
        if (name.length < 2) {
            return res.status(400).json({
                success: false,
                message:
                "Item name must be at least 2 characters"
            });
        }
        const date = new Date(purchase_date);
        if (isNaN(date.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid purchase date"
            });
        }
    }
    next();
};
module.exports = validateItem;