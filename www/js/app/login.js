var login = function () {

    var username = $("#username").val();
    var password = $("#password").val();

    if ($.trim(username).length > 0 && $.trim(password).length > 0) {

        $.ajax({
            type: "POST",
            url: web_links + "api/get_login",
            data: {
                "username": username,
                "password": password
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {

                if (data != false) {
                    localStorage.setItem('ugf_users', JSON.stringify(data));
                    location.replace('index.html');
                } else {
                    alert('Incorrect username or password.');
                }
            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#loadGif').hide();
            }

        });

    } else {
        alert('Invalid username or password character.');

    }
};

var signup = function () {

    var name = $("#name").val();
    var card = $("#card").val();
    var username = $("#username").val();
    var password = $("#password").val();

    if (comparePassword() != false) {

        $.ajax({
            type: "POST",
            url: web_links + "api/get_signup",
            data: {
                "name": name,
                "card": card,
                "username": username,
                "password": password
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {

                if (data == false) {
                    alert('Error signing you up.');
                } else if (data == "Username unavailable, register again.") {
                    alert(data);
                } else {
                    alert('Sign Up success, please proceed login.');
                    location.replace('login.html');
                }
            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#loadGif').hide();
            }
        });

    }

};

var comparePassword = function () {

    if ($('#password').val() != $('#c_password').val()) {
        $('#c_password').addClass("border border-danger");
        return false;
    } else {
        $('#c_password').removeClass("border border-danger");
        return true;
    }
};