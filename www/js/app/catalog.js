window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: web_links + "api/get_catalog",
        dataType: 'json',
        beforeSend: function () {
            $('#loadGif').show();
        },
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                if (data[i].cd_img != null) {
                    var img = web_links + 'assets/catalog/' + data[i].cd_img;
                } else {
                    var img = 'img/catalog_placeholder.png';
                }

                $('#display').append(
                    '                    <div class="col d-flex">' +
                    '                        <div class="card h-100 shadow">' +
                    '                            <img class="card-img-top"' +
                    '                                src="' + img + '"' +
                    '                                alt="No Image">' +
                    '                            <div class="card-body">' +
                    '                                <div class="card-text">' +
                    '                                    <h3 class="card-title text-capitalize mb-0">' +
                    '                                        ' + data[i].cd_name + ' </h3>' +
                    '                                </div>' +
                    '                                <div class="card-text">' +
                    '                                    <small class="card-text text-capitalize text-muted">' +
                    '                                        ' + data[i].ud_full_name + '\'s Shop </small>' +
                    '                                </div>' +
                    '                                <div class="card-text">' +
                    '                                    <p class="card-text">' +
                    '                                        ' + data[i].cd_desc + ' </p>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                            <div class="card-footer bg-white border-0 text-center my-2">' +
                    '                                <button class="btn btn-success" id="addOrder" value="' + data[i].cd_id + '">' +
                    '                                    <i class="fas fa-plus fa-fw"></i>' +
                    '                                    <span>RM ' + data[i].cd_price + '</span>' +
                    '                                </button>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>'
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



})