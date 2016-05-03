$(document).ready(function(){

    var currentUserID = sessionStorage.getItem('currentUser');
    var currentUser;

    var rootURL = 'http://localhost:8091/api';

    getUser();

    $('#btnUpdateUser').click(function () {
        console.log("button clicked");
        updateUser();
        return false;
    });

    function getUser() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: rootURL + '/users/' + currentUserID,
            success: function (data, textStatus, jgXHR) {
                currentUser = data;
                updateForm();
            },
            error: function(jgXHR, textStatus, errorThrown) {
                console.log("getUser error: " + textStatus);
            }
        });
    }

    function updateForm() {
        document.getElementById("tfFirstName").value = currentUser['firstName'];
        document.getElementById("tfLastName").value = currentUser['lastName'];
        document.getElementById("tfUserName").value = currentUser['userName'];
        document.getElementById("tfPassword").value = currentUser['password'];
        document.getElementById("tfEmail").value = currentUser['email'];
        document.getElementById("tfMobileNumber").value = currentUser['mobileNumber'];
    }

    function updateUser() {

        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: rootURL + '/users/' + currentUserID,
            data: formToJSON(),
            success: function (data, textStatus, jgXHR) {
                console.log("success");
                location.href="../webcontent/userProfile.html";
            },
            error: function(jgXHR, textStatus, errorThrown) {
                console.log("editUser error: " + textStatus);
            }
            
        });
    }

    function formToJSON() {
        console.log("i form to json");

        var user = JSON.stringify({
            "firstName": $('#tfFirstName').val(),
            "lastName": $('#tfLastName').val(),
            "userName": $('#tfUserName').val(),
            "password": $('#tfPassword').val(),
            "email": $('#tfEmail').val(),
            "mobileNumber": $('#tfMobileNumber').val()
        });
        console.log(user);
        return user;
    }
});
