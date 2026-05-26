const API =
"http://localhost:5000/api/items";
const form =
document.getElementById("itemForm");
const tableBody =
document.getElementById("tableBody");
const addMoreBtn =
document.getElementById("addMoreBtn");
let purchaseItems = [];
async function loadItems() {
    try {
        const response =
        await fetch(API);
        const result =
        await response.json();
        console.log(result);
        tableBody.innerHTML = "";
        result.data.forEach(item => {
            tableBody.innerHTML += `
                <tr>
                   <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.type_name}</td>
                    <td>${item.purchase_date}</td>
                    <td>
                        ${
                            item.stock_available
                            ? "Available"
                            : "Out Of Stock"
                        }
                    </td>
                    <td>
                        <button
                            class="edit-btn"
                            onclick="editItem(${item.id})"
                        >
                            Edit
                        </button>
                        <button
                            class="delete-btn"
                            onclick="deleteItem(${item.id})"
                        >
                           Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}
addMoreBtn.addEventListener(
    "click",
    () => {
        const item =
        getFormData();
        if (!item) {
            return;
        }
        purchaseItems.push(item);
        console.log(purchaseItems);
        alert(
            "Item Added To Purchase"
        );
        form.reset();
    }
);


// GET FORM DATA
function getFormData() {

    const name =
    document.getElementById("name").value;

    const itemType =
    document.getElementById("itemType").value;

    const purchaseDate =
    document.getElementById("purchaseDate").value;

    const stockAvailable =
    document.getElementById(
        "stockAvailable"
    ).checked;

    // VALIDATION
    if (
        !name ||
        !itemType ||
        !purchaseDate
    ) {

        alert(
            "Please Fill All Fields"
        );

        return null;
    }

    return {

        name: name,

        purchase_date: purchaseDate,

        stock_available: stockAvailable,

        // IMPORTANT FIX
        item_type_id:
        Number(itemType)
    };
}


// SUBMIT PURCHASE
form.addEventListener(
    "submit",

    async (e) => {

        e.preventDefault();

        const currentItem =
        getFormData();

        if (currentItem) {

            purchaseItems.push(
                currentItem
            );
        }

        // CHECK EMPTY
        if (
            purchaseItems.length === 0
        ) {

            alert(
                "No Items Added"
            );

            return;
        }

        try {

            console.log(
                purchaseItems
            );

            const response =
            await fetch(
                API,

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        items:
                        purchaseItems
                    })
                }
            );

            const result =
            await response.json();

            console.log(result);

            // SUCCESS
            if (result.success) {

                alert(
                    "Purchase Saved Successfully"
                );

                purchaseItems = [];

                form.reset();

                loadItems();

            } else {

                alert(
                    result.message
                );
            }

        } catch (error) {

            console.log(error);

            alert(
                "Error While Saving Data"
            );
        }
    }
);


// DELETE ITEM
async function deleteItem(id) {

    const confirmDelete =
    confirm(
        "Are you sure?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await fetch(
            `${API}/${id}`,

            {
                method: "DELETE"
            }
        );

        alert(
            "Item Deleted Successfully"
        );

        loadItems();

    } catch (error) {

        console.log(error);
    }
}


// EDIT ITEM
function editItem(id) {

    alert(
        "Edit Functionality Coming Soon"
    );
}


// INITIAL LOAD
loadItems();