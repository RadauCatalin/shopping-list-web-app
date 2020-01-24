window.index = {
    API_BASE_URL: "http://localhost:8082",
    getShoppingLists: function () {
        $.ajax({
            url: index.API_BASE_URL + "/shoppingLists"

        }).done(function (response) {
            console.log(response);
            index.displayShoppingLists(response);
        });
    },


    getShoppingList: function (id) {
        $.ajax({url: index.API_BASE_URL + "/shoppingLists/" + id}).done(function (response) {
            console.log(response);

        })
    },


    getShoppingListsHtml: function (shoppingList) {
        return`
<a href="shoppingList.html" onclick="index.getShoppingList(${shoppingList.id})" class="author-name" style="color:Tomato;">${shoppingList.name}
                                </a> `


    },
    displayShoppingLists: function (shoppingLists) {
        let shoppingListsHtml = "";
        let oneShoppingList = new Set(shoppingLists);


        shoppingLists.forEach(oneShoppingList => shoppingListsHtml += index.getShoppingListsHtml(oneShoppingList));

        $(".section-padding .item .single-testimonial").html(shoppingListsHtml);
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
    deleteItem: function (id, done) {
        $.ajax({
            url: index.API_BASE_URL + "?id=" + id,
            method: "DELETE",
        }).done(function () {
            index.getShoppingLists();
        })

    },
    bindEvents: function () {
        $("#create-list-form").submit(function (event) {
            event.preventDefault();

            index.createShoppingList();
        });
    }
};

index.getShoppingLists();
index.bindEvents();