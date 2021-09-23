window.addEventListener('load', (event) => {

    $('#profile_username').html(user_token.ud_username);
    $('#profile_name').html(user_token.ud_full_name);
    $('#profile_contact').html(user_token.ud_contact);

    $.ajax({
        type: "POST",
        url: web_links + "api/get_order_history",
        data: {
            uid: user_token.ud_id
        },
        dataType: 'json',
        success: function (data) {

            if (data.length == 0) {

                $('#display').html(
                    '<div class="row ">' +
                    '           <div class="col">' +
                    '              <p class="text-capitalize mb-0 fs-sm-6">No orders history available. </p>' +
                    '             </div>' +
                    '      </div>'
                );
            } else {
                for (var i = 0; i < data.length; i++) {

                    $('#display').append(
                        '<div class="row pb-2 border-bottom mb-2">' +
                        '                        <div class="col-6 d-flex align-items-center">' +
                        '                            <div class="mx-md-2">' +
                        '                                <p class="text-capitalize mb-0 fs-sm-6">' + data[i].cd_name + ' </p>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="col text-center d-flex align-items-center justify-content-center">' +
                        '                            <p class="mb-0">x' + data[i].od_quantity + ' </p>' +
                        '                        </div>' +
                        '                        <div class="col text-end d-flex align-items-center justify-content-center">' +
                        '                            <p class="mb-0">RM ' + data[i].cd_price + ' </p>' +
                        '                        </div>' +
                        '                    </div>'
                    );
                }
            }
        }

    });
})