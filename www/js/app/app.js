var web_links = "http://localhost/foodbank-management-system/";
var ugf_user_token = JSON.parse(localStorage.getItem('ugf_users'));

window.addEventListener('load', (event) => {
    if (ugf_user_token != null) {
        $('#user_button').html(
            '<a href="#" class="btn text-white" id="logout">' +
            '<i class="fas fa-sign-out-alt fa-fw fa-lg"></i>' +
            '</a>'
        );

        var nick = ugf_user_token.full_name.split(" ");
        $('#greets').html(
            '            <div class="col text-center">' +
            '                <h1 class="text-capitalize text-white">Welcome, ' + nick[0] + '.</h1>' +
            '                <p class="lead text-white">Take some meals or groceries to feed your tummy.</p><a' +
            '                    href="foodbank.html"' +
            '                    class="btn btn-outline-light rounded-0">View foodbank</a>' +
            '            </div>'
        );

    }
})

$(document).on('click', '#logout', function () {

    localStorage.clear();
    location.replace('index.html');

});