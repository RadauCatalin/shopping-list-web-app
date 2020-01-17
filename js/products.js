window.products = {
    getProducts: function () {
        $.ajax({
            url: Shop.API_BASE_URL + "/products"
            // default ajax method: "GET"
        }).done(function (response) {
            console.log(response);

            Shop.displayProducts(response.content);
        });
    },
};
products.getProducts();