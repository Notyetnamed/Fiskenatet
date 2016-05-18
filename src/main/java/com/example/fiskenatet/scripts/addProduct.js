
$(document).ready(function () {
    var rootURL ='http://localhost:8091/api';
    var sellerid = sessionStorage.getItem("currentUser");
    var currentUserName = sessionStorage.getItem('currentUserName');

    checkIfLoggedIn();

    function checkIfLoggedIn() {
        if(sessionStorage.getItem('currentUser') != null){
            /*användare inloggad*/

            document.getElementById("lnkProfile").style.display = "inline-block";
            document.getElementById("lnkLogOut").style.display = "inline-block";
            document.getElementById('lnkProfileUserName').innerHTML = "Inloggad som: " + currentUserName;

        }else{
            document.getElementById("lnkProfile").style.display = "none";
            document.getElementById("lnkLogOut").style.display = "none";

        }
    }

    $(document).on("click", "#lnkProfile", function () {
        location.href="../webcontent/userProfile.html";
    });

    $('#btnAddProduct').click(function () {
        console.log("klick!");
        addProduct();
    });

    $(document).on("click", "#lnkLogOut", function () {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUserName');
        location.href="../webcontent/index.html";
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

        /*
        * Sätter sluttiden för auktionen till 16:00 samma dag om nya produkten läggs till före kl15:00.
        * Om den nya produkten skapas efter kl15:00 sätts sluttiden till 16:00 nästa dag.
        */
        if(startDate.getHours() < 15) {
            endDate.setDate(startDate.getDate());
            endDate.setHours(16);
            endDate.setMinutes(0);
            endDate.setSeconds(0);
        } else {
            endDate.setDate(startDate.getDate() +1);
            endDate.setHours(16);
            endDate.setMinutes(0);
            endDate.setSeconds(0);
        }
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

