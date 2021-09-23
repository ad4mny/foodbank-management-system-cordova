window.addEventListener('load', (event) => {

    if (user_token !== null) {

        $.ajax({
            type: "POST",
            url: web_links + "api/get_order",
            data: {
                uid: user_token.ud_id
            },
            dataType: 'json',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {

                var subtotal = 0;

                if (data == false) {

                    if (orders_token !== null) {

                        $.ajax({
                            type: "POST",
                            url: web_links + "api/get_order_basket",
                            data: {
                                orders: orders_token
                            },
                            dataType: 'json',
                            beforeSend: function () {
                                $('#loadGif').show();
                            },
                            success: function (data) {

                                var subtotal = 0;

                                for (var i = 0; i < data.length; i++) {

                                    $('#display').append(
                                        ' <div class="row m-1 bg-white shadow rounded-3 p-1">' +
                                        '            <div class="col-6 m-auto">' +
                                        '                <div class="ms-md-4">' +
                                        '                    <p class="mb-0 fw-bold text-capitalize">' + data[i].cd_name + '</p>' +
                                        '                    <small class="mb-0 fw-light text-capitalize text-muted">' + data[i].ud_full_name + '\'s Shop</small>' +
                                        '                </div>' +
                                        '            </div>' +
                                        '            <div class="col-3 m-auto text-center">' +
                                        '<ul class="pagination pagination-sm mb-0">' +
                                        '                        <li class="page-item">' +
                                        '                            <button class="page-link  text-success" id="removeOrder" value="' + data[i].cd_id + '">' +
                                        '                                <i class="fas fa-minus fa-xs"></i>' +
                                        '                            </button>' +
                                        '                        </li>' +
                                        '                        <li class="page-item disabled">' +
                                        '                            <a class="page-link" href="#">' + orders_token[data[i].cd_id] + '</a>' +
                                        '                        </li>' +
                                        '                        <li class="page-item">' +
                                        '                            <button class="page-link text-success" id="addOrder" value="' + data[i].cd_id + '">' +
                                        '                                <i class="fas fa-plus fa-xs"></i>' +
                                        '                            </button>' +
                                        '                        </li>' +
                                        '                    </ul>' +
                                        '</div>' +
                                        '            <div class="col-3 m-auto text-center">' +
                                        '                <p class="mb-0">' + data[i].cd_price + '</p>' +
                                        '            </div>' +
                                        '        </div>'
                                    );

                                    subtotal += (data[i].cd_price * orders_token[data[i].cd_id]);
                                }

                                var service_charge = (subtotal * (10 / 100));
                                var total_price = subtotal + (subtotal * (10 / 100));

                                $('#display').append(
                                    ' <div class="row m-1 my-3">' +
                                    '            <div class="col-7 col-md-3 offset-md-7 ">' +
                                    '                <p class="mb-0">Subtotal</p>' +
                                    '                <p class="mb-0">Service Charge (10%)</p>' +
                                    '                <p class="mb-0">Total</p>' +
                                    '            </div>' +
                                    '            <div class="col text-end text-md-center">' +
                                    '                <p class="mb-0 text-muted">RM ' + subtotal + '</p>' +
                                    '                <p class="mb-0 text-muted">RM ' + service_charge.toFixed(2) + '</p>' +
                                    '                <h4 class="fw-bold">RM ' + total_price.toFixed(2) + ' </h4>' +
                                    '            </div>' +
                                    '        </div>' +
                                    '<div class="row m-1 my-3 pb-5">' +
                                    '            <div class="col offset-md-10 text-center ">' +
                                    '                <button class="btn btn-success" id="checkoutOrder">' +
                                    '                    <i class="fas fa-shopping-basket fa-fw fa-sm"></i>' +
                                    '                    Checkout' +
                                    '                </button>' +
                                    '            </div>' +
                                    '        </div>'
                                );

                            },
                            error: function () {
                                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
                            },
                            complete: function () {
                                $('#loadGif').hide();
                            }
                        });

                    } else {

                        $('#display').append(
                            '        <div class="row my-3">' +
                            '            <div class="col">' +
                            '                <div class="p-4 bg-white rounded-3 shadow-sm text-dark">' +
                            '                    <p class="mb-0">Your have no active orders :(</p>' +
                            '                    <small> Order some meal now.</small>' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>'
                        );
                    }
                } else {

                    for (var i = 0; i < data.length; i++) {

                        $('#display').append(
                            ' <div class="row m-1 bg-white shadow rounded-3 p-1">' +
                            '            <div class="col-6 m-auto">' +
                            '                <div class="ms-md-4">' +
                            '                    <p class="mb-0 fw-bold text-capitalize">' + data[i].cd_name + '</p>' +
                            '                    <small class="mb-0 fw-light text-capitalize text-muted">' + data[i].ud_full_name + '\'s Shop</small>' +
                            '                </div>' +
                            '            </div>' +
                            '            <div class="col-3 m-auto text-center">' +
                            data[i].od_quantity + 'x<br>' +
                            data[i].od_status + '</div>' +
                            '            <div class="col-3 m-auto text-center">' +
                            '                <p class="mb-0">' + data[i].cd_price + '</p>' +
                            '            </div>' +
                            '<div class="col-11 m-auto border-top mt-2 text-center">' +
                            '       <button class="btn btn-sm text-decoration-none text-muted" id="scanPay" value="' + data[i].cd_id + '/' + data[i].od_id + '" >' +
                            '           <i class="fas fa-qrcode text-success fa-fw"></i> Scan to Pay</button>' +
                            '        </div>' +
                            '        </div>'
                        );

                        subtotal = +(data[i].cd_price * data[i].od_quantity);
                    }

                    var service_charge = (subtotal * (10 / 100));
                    var total_price = subtotal + (subtotal * (10 / 100));

                    $('#display').append(
                        ' <div class="row m-1 my-3">' +
                        '            <div class="col-7 col-md-3 offset-md-7 ">' +
                        '                <p class="mb-0">Subtotal</p>' +
                        '                <p class="mb-0">Service Charge (10%)</p>' +
                        '                <p class="mb-0">Total</p>' +
                        '            </div>' +
                        '            <div class="col text-end text-md-center">' +
                        '                <p class="mb-0 text-muted">RM ' + subtotal + '</p>' +
                        '                <p class="mb-0 text-muted">RM ' + service_charge.toFixed(2) + '</p>' +
                        '                <h4 class="fw-bold">RM ' + total_price.toFixed(2) + ' </h4>' +
                        '            </div>' +
                        '        </div>' +
                        '        <div class="row m-1 my-3 pb-5">' +
                        '           <small class="mb-0 text-muted">Please collect your order on the corresponding cafe upon completion.</small>' +
                        '        </div>'
                    );


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
        if (orders_token !== null) {
            $.ajax({
                type: "POST",
                url: web_links + "api/get_order_basket",
                data: {
                    orders: orders_token
                },
                dataType: 'json',
                beforeSend: function () {
                    $('#loadGif').show();
                },
                success: function (data) {

                    var subtotal = 0;

                    $('#display').html(
                        '<div class="row my-3">' +
                        '            <div class="col">' +
                        '                <h1 class="fw-bold display-3 mb-0">Orders</h1>' +
                        '            </div>' +
                        '        </div>'
                    );

                    for (var i = 0; i < data.length; i++) {

                        $('#display').append(
                            ' <div class="row m-1 bg-white shadow rounded-3 p-1">' +
                            '            <div class="col-6 m-auto">' +
                            '                <div class="ms-md-4">' +
                            '                    <p class="mb-0 fw-bold text-capitalize">' + data[i].cd_name + '</p>' +
                            '                    <small class="mb-0 fw-light text-capitalize text-muted">' + data[i].ud_full_name + '\'s Shop</small>' +
                            '                </div>' +
                            '            </div>' +
                            '            <div class="col-3 m-auto text-center">' +
                            '<ul class="pagination pagination-sm mb-0">' +
                            '                        <li class="page-item">' +
                            '                            <button class="page-link  text-success" id="removeOrder" value="' + data[i].cd_id + '">' +
                            '                                <i class="fas fa-minus fa-xs"></i>' +
                            '                            </button>' +
                            '                        </li>' +
                            '                        <li class="page-item disabled">' +
                            '                            <a class="page-link" href="#">' + orders_token[data[i].cd_id] + '</a>' +
                            '                        </li>' +
                            '                        <li class="page-item">' +
                            '                            <button class="page-link text-success" id="addOrder" value="' + data[i].cd_id + '">' +
                            '                                <i class="fas fa-plus fa-xs"></i>' +
                            '                            </button>' +
                            '                        </li>' +
                            '                    </ul>' +
                            '</div>' +
                            '            <div class="col-3 m-auto text-center">' +
                            '                <p class="mb-0">' + data[i].cd_price + '</p>' +
                            '            </div>' +
                            '        </div>'
                        );

                        subtotal += (data[i].cd_price * orders_token[data[i].cd_id]);
                    }

                    var service_charge = (subtotal * (10 / 100));
                    var total_price = subtotal + (subtotal * (10 / 100));

                    $('#display').append(
                        ' <div class="row m-1 my-3">' +
                        '            <div class="col-7 col-md-3 offset-md-7 ">' +
                        '                <p class="mb-0">Subtotal</p>' +
                        '                <p class="mb-0">Service Charge (10%)</p>' +
                        '                <p class="mb-0">Total</p>' +
                        '            </div>' +
                        '            <div class="col text-end text-md-center">' +
                        '                <p class="mb-0 text-muted">RM ' + subtotal + '</p>' +
                        '                <p class="mb-0 text-muted">RM ' + service_charge.toFixed(2) + '</p>' +
                        '                <h4 class="fw-bold">RM ' + total_price.toFixed(2) + ' </h4>' +
                        '            </div>' +
                        '        </div>' +
                        '<div class="row m-1 my-3 pb-5">' +
                        '            <div class="col offset-md-10 text-center ">' +
                        '                <button class="btn btn-success" id="checkoutOrder">' +
                        '                    <i class="fas fa-shopping-basket fa-fw fa-sm"></i>' +
                        '                    Checkout' +
                        '                </button>' +
                        '            </div>' +
                        '        </div>'
                    );

                },
                error: function () {
                    $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
                },
                complete: function () {
                    $('#loadGif').hide();
                }
            });
        } else {
            $('#display').append(
                '        <div class="row my-3">' +
                '            <div class="col">' +
                '                <div class="p-4 bg-white rounded-3 shadow-sm text-dark">' +
                '                    <p class="mb-0">Your have no active orders :(</p>' +
                '                    <small> Order some meal now.</small>' +
                '                </div>' +
                '            </div>' +
                '        </div>'
            );
        }
    }


})