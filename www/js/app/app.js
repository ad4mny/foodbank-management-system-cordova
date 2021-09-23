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

$(document).on('click', '#addOrder', function () {

    var catalog_id = this.value;

    if (catalog_id != null) {

        if (orders_token === null) {

            var cart = {};
            cart[catalog_id] = 1;
            localStorage.setItem('orders', JSON.stringify(cart));

        } else {
            if (catalog_id in orders_token) {
                orders_token[catalog_id] += 1;
            } else {
                orders_token[catalog_id] = 1;
            }
            localStorage.removeItem('orders');
            localStorage.setItem('orders', JSON.stringify(orders_token));
        }

        location.replace('checkout.html');
    }

});

$(document).on('click', '#removeOrder', function () {

    var catalog_id = this.value;

    if (catalog_id != null) {

        if (orders_token !== null) {
            if (catalog_id in orders_token) {
                if (orders_token[catalog_id] > 1) {
                    orders_token[catalog_id] -= 1;
                } else {
                    delete orders_token[catalog_id];
                }
            }
            localStorage.removeItem('orders');
            localStorage.setItem('orders', JSON.stringify(orders_token));
        }

        location.replace('checkout.html');
    }

});

$(document).on('click', '#checkoutOrder', function () {

    if (user_token !== null) {
        $.ajax({
            type: "POST",
            url: web_links + "api/set_checkout_order",
            data: {
                orders: orders_token,
                uid: user_token.ud_id
            },
            dataType: 'json',
            success: function (data) {
                alert(data);

                if (data == false) {} else {
                    // location.replace("checkout.html");
                }
            }

        });
    } else {
        alert('Please login first!')
    }

});

$(document).on('click', '#scanPay', function () {

    var id = this.value.split("/");

    cordova.plugins.barcodeScanner.scan(function (result) {

        var scanned_id = result["text"];

        if (id[0] === scanned_id) {
            $.ajax({
                type: "POST",
                url: web_links + "api/set_pay",
                data: {
                    order_id: id[1],
                },
                dataType: 'JSON',
                success: function (data) {

                    if (data != false) {
                        alert('Payment made!');
                        location.replace('checkout.html');
                    } else {
                        alert('Scanning error! Scan the barcode again.');
                        location.replace('checkout.html');
                    }
                }
            });
        } else {
            alert('Wrong menu id!');
        }
    }, function (error) {
        alert('Error!');
    }, {
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        prompt: "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS and Android
    });

});

$(document).on('click', '#logout', function () {

    localStorage.clear();
    location.replace('index.html');

});