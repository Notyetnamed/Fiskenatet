$(document).ready(function () {
    var rootURL = 'http://localhost:8091/api';
    var currentProductId = sessionStorage.getItem('currentProductId');
    var currentProduct;
    var owner;

    getProductDetails();

    $(document).on("click", "#btnSwishOption", function () {
        //TODO: funktionalitet för vinst på bud istället för buyout
        document.getElementById('confirmSwishAmount').innerHTML = currentProduct.buyNowPrice;
        document.getElementById('confirmSwishPhone').innerHTML = owner.mobileNumber;
    });

    $(document).on("click", "#btnConfirmSwish", function () {
        setSellerRating();
        //setProductAsSold();
        
    });
    
    function setSellerRating() {
        var sellerRating = $("input[type='radio'][name='rating']:checked").val();
        console.log(sellerRating);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: rootURL + '/users/' + currentProduct.owner,
            data:sellerRating,
            success: function (data, textStatus, jgXHR) {
                console.log("Seller rating put:" + sellerRating);
            },
            error: function (jgXHR, textStatus, errorThrown) {
                console.log("getAllProducts error: " + textStatus);
            }
        });
        
    }
    
    

    function getProductDetails() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: rootURL + '/products/' + currentProductId,
            success: function (data, textStatus, jgXHR) {
                currentProduct = data;
                getProductOwner();
            },
            error: function (jgXHR, textStatus, errorThrown) {
                console.log("getAllProducts error: " + textStatus);
            }
        });
    }

    function getProductOwner() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: rootURL + '/users/' + currentProduct.owner,
            success: function (data, textStatus, jgXHR) {
                owner = data;
            },
            error: function (jgXHR, textStatus, errorThrown) {
                console.log("getAllProducts error: " + textStatus);
            }
        });
    }



    function setProductAsSold() {
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: rootURL + '/products/issold/' + currentProductId,
            success: function (data, textStatus, jgXHR) {
                console.log("success");
            },
            error: function(jgXHR, textStatus, errorThrown) {
                console.log("editProduct error: " + textStatus);
            }
        });
    }
});