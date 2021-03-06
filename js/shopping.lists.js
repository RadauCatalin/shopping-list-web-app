window.index = {
    API_BASE_URL: "http://localhost:8082",
    shoppingListId: 0,
    getShoppingLists: function () {
        $.ajax({
            url: index.API_BASE_URL + "/shoppingLists"

        }).done(function (response) {
            console.log(response);
            index.displayShoppingLists(response);
        });
    },
    getShoppingList: function (id) {
        $.ajax({
            url: index.API_BASE_URL + "/shoppingLists/" + id

        }).done(function (response) {
            console.log(response);
            index.displayList(response);
            index.displayProducts(response.products);
            index.getListId(response.id);
        });
    },
    getListId: function (listID) {
        index.shoppingListId = listID;
    },
    displayListhtml: function (shoppingList) {
        return `<div><h1>${shoppingList.name}</h1>
        <h2 style="color:#627363;">${shoppingList.description}</h2>
        <a id="delete" href="#list" onclick="index.deleteList(${shoppingList.id})" class="author-name" style="color:Tomato;">Delete this list</a>\`
        <table id="budget">
                <thead>
                <tr>
                    <th>Budget</th>
                    <th>Remaining budget</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${shoppingList.budget}</td>
                    <td>${shoppingList.remainingBudget}</td>
                </tr>
                </tbody>
            </table></div>`

    },
    displayProductsHtml: function (product) {
        return `<tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><a id="delete-product" href="#list" onclick="index.deleteProduct(${product.id})" class="delete-product">
                        <i class="far fa-trash-alt"></i></a></td>
                </tr>`


    },
    getShoppingListsHtml: function (shoppingList) {
        return `
<a href="#list" onclick="index.getShoppingList(${shoppingList.id})" class="author-name" style="color:Tomato;">${shoppingList.name}
                                </a>`


    },
    displayList: function (shoppingList) {
        let shoppingListHtml = index.displayListhtml(shoppingList);
        $("#list-name").html(shoppingListHtml)
    },


    displayShoppingLists: function (shoppingLists) {
        let shoppingListsHtml = "";
        let oneShoppingList = new Set(shoppingLists);


        shoppingLists.forEach(oneShoppingList => shoppingListsHtml += index.getShoppingListsHtml(oneShoppingList));

        $(".section-padding .item .single-testimonial").html(shoppingListsHtml);
    }, displayProducts: function (products) {
        let productsHtml = "";
        let oneProduct = new Set(products);


        products.forEach(oneProduct => productsHtml += index.displayProductsHtml(oneProduct));

        $("#products tbody").html(productsHtml);
    },
    createShoppingList: function () {
        let nameValue = $("#name-field").val();
        let descriptionValue = $("#description-field").val();
        let budgetValue = $("#budget-field").val();

        let requestBody = {
            name: nameValue,
            description: descriptionValue,
            budget: budgetValue,
        };

        $.ajax({
            url: index.API_BASE_URL + "/shoppingLists",
            method: "POST",
            //MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            index.getShoppingLists();
        })
    },
    deleteList: function (id) {
        $.ajax({
            url: index.API_BASE_URL + "/shoppingLists/" + id,
            method: "DELETE",
        }).done(function () {
            index.getShoppingLists();
        })
    },
    deleteProduct: function (productIdValue) {
        //let productIdValue = 10;
        let listIdValue = index.shoppingListId;
        let requestBody = {
            productID: productIdValue,
            listID: listIdValue,
        };
        $.ajax({
            url: index.API_BASE_URL + "/products",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            index.getShoppingList(index.shoppingListId);
        })
    },
    createItem: function () {
        let descriptionValue = $("#productName-field").val();
        let deadlineValue = $("#deadline-field").val();
        let listIdValue = index.shoppingListId;

        var requestBody = {
            name: descriptionValue,
            price: deadlineValue,
            listId: listIdValue,
        };

        $.ajax({
            url: index.API_BASE_URL + "/products",
            method: "POST",
            //MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            index.getShoppingList(index.shoppingListId);
        });
    },
    markItemBought: function (id, Bought) {
        let requestBody = {
            Bought: Bought
        };
        $.ajax({
            url: index.API_BASE_URL + "products/" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            index.getShoppingList(index.shoppingListId);
        })
    },
    bindEvents: function () {
        $("#create-list-form").submit(function (event) {
            event.preventDefault();
            index.createShoppingList();
        });
        $("#testimonial").click(function (event) {
            event.preventDefault();

        });
        $("#delete").click(function (event) {
            event.preventDefault();

        });
        $("#delete-product").click(function (event) {
            event.preventDefault();
        });
        $("#create-product-form").submit(function (event) {
            event.preventDefault();
            index.createItem();
        });
        $("#check").delegate(".mark-Bought", "change", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            let checked = $(this).is(":checked");
            index.markItemBought(id, checked)
        })
    }
};

index.getShoppingLists();
index.bindEvents();