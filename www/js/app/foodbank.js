window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: web_links + "api/get_foodbank",
        dataType: 'json',
        beforeSend: function () {
            $('#loadGif').show();
        },
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {

                if (data[i].cd_img != null) {
                    var img = web_links + 'assets/catalog/' + data[i].cd_img;
                } else {
                    var img = 'img/catalog_placeholder.png';
                }

                $('#display').append(
                    ' <div class="col d-flex">' +
                    '                <div class="card h-100 rounded-0 border-0 shadow">' +
                    '                    <img class="card-img-top" src="https://dummyimage.com/640x360/f0f0f0/aaa" alt="No Image">' +
                    '                    <div class="card-body">' +
                    '                        <h5 class="mb-0 fw-bold">' + data[i].item_name + '</h5>' +
                    '                        <div class="card-text">' + data[i].item_location + '</div>' +
                    '                        <div class="card-text pt-2">' + data[i].item_quantity + ' unit(s) left.</div>' +
                    '                        <div class="card-text text-muted fw-lighter"><small>Last Updated at ' + data[i].datetime + '</small>' +
                    '                        </div>' +
                    '                    </div>' +
                    '                    <button class="btn btn-primary rounded-0" id="takeItem" value="' + data[i].item_id + '">Take' +
                    '                    </button>' +
                    '                </div>' +
                    '            </div>'
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