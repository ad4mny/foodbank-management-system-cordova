var login = function () {

    var login_username = $("#login_username").val();
    var login_password = $("#login_password").val();

    if ($.trim(login_username).length > 0 && $.trim(login_password).length > 0) {

        var input = {
            "username": login_username,
            "password": login_password
        };

        $.ajax({
            type: "POST",
            url: web_links + "api/get_login",
            data: input,
            dataType: 'JSON',
            success: function (data) {
                if (data != false) {
                    localStorage.setItem('users', JSON.stringify(data));
                    location.replace('index.html');
                } else {
                    alert('Incorrect username or password.');
                }
            }

        });

    } else {
        alert('Invalid username or password character.');

    }
};


var register = function () {

    var name = $("#name").val();
    var contact = $("#contact").val();
    var username = $("#username").val();
    var password = $("#pwd").val();

    if (comparePassword() != false) {

        var input = {
            "name": name,
            "contact": contact,
            "username": username,
            "password": password
        };

        $.ajax({
            type: "POST",
            url: web_links + "api/get_signup",
            data: input,
            dataType: 'JSON',
            success: function (data) {
                if (data == false) {
                    alert('Error signing you up.');
                } else if (data == "Username unavailable, register again.") {
                    alert(data);
                } else {
                    localStorage.setItem('users', JSON.stringify(data));
                    location.replace('index.html');
                }
            }
        });

    }

};


var comparePassword = function () {

    if ($('#pwd').val() != $('#c_pwd').val()) {
        $('#c_pwd').addClass("border border-danger");
        return false;
    } else {
        $('#c_pwd').removeClass("border border-danger");
        return true;
    }
};

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};