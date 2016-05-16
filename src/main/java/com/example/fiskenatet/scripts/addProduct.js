
$(document).ready(function () {
    var rootURL ='http://localhost:8091/api';
    var sellerid = sessionStorage.getItem("currentUser");
    
    $('#btnAddProduct').click(function () {
        console.log("klick!");
        addProduct();
    });
    
    function addProduct(){
        console.log("in addProd");
        $.ajax({
            type: 'POST',
            contentType:'application/json',
            url: rootURL + '/products',
            data: formToJSON(),
            success: function (data, textStatus, jgXHR) {
                console.log("GREAT SUCCESS!");
                location.href="../webcontent/index.html";
            },
            error: function (jgXHR, textStatus, errorThrown) {
                console.log("send Error " +textStatus + "  " + errorThrown);
            },
            complete:function () {
                location.href="../webcontent/index.html";
            }
        })
        
    }
    
    function formToJSON() {
        console.log("i form to json");
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(startDate.getDate() + 1);
        console.log("startdate: " + startDate.toLocaleString() + " enddate: " + endDate.toLocaleString());
        var product = JSON.stringify({

            "category" : $( "#selectCategory option:selected" ).val(),
            "title": $('#txtProductTitle').val(),
            "image": $('#txtProductImage').val(),
            "description": $('#txtDescription').val(),
            "startPrice": $('#txtStartPrice').val(),
            "buyNowPrice": $('#txtBuyNow').val(),
            "owner": {'id' : sellerid},
            "startDate": startDate,
            "endDate": endDate
        });
        console.log(product);
        return product;
    }
});

