window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: web_links + "api/get_foodbank",
        dataType: 'json',
        beforeSend: function () {
            $('#loadGif').show();
        },
        success: function (data) {

            if (data != false) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i].cd_img != null) {
                        var img = web_links + 'assets/catalog/' + data[i].cd_img;
                    } else {
                        var img = 'img/catalog_placeholder.png';
                    }

                    if (data[i].item_quantity != 0) {
                        var button = '<button class="btn btn-dark rounded-0" id="takeItem" value="' + data[i].item_id + '">Take</button>';
                    } else {
                        var button = '<button class="btn btn-secondary rounded-0" id="takeItem" value="" disabled>No Stock</button>';
                    }

                    $('#display').append(
                        ' <div class="col d-flex">' +
                        '                <div class="card h-100 rounded-0 border-0 shadow">' +
                        '                    <img class="card-img-top" src="' + img + '" alt="No Image">' +
                        '                    <div class="card-body">' +
                        '                        <h5 class="mb-0 fw-bold">' + data[i].item_name + '</h5>' +
                        '                        <div class="card-text">' + data[i].item_location + '</div>' +
                        '                        <div class="card-text pt-2">' + data[i].item_quantity + ' unit(s) left.</div>' +
                        '                        <div class="card-text text-muted fw-lighter"><small>Last Updated at ' + data[i].datetime + '</small>' +
                        '                        </div>' +
                        '                    </div>' +
                        button +
                        '                </div>' +
                        '            </div>'
                    );
                }
            } else {
                $('#display').append(
                    '    <div class="row bg-white mb-2 mx-1 py-2 shadow">' +
                    '        <div class="col">' +
                    '           <p> No foodbank item found.</p>' +
                    '        </div>' +
                    '    </div>'
                );
            }

        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-white">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#loadGif').hide();
        }

    });



})

$(document).on('click', '#takeItem', function () {

    var item_id = this.value;

    if (item_id != null) {
        $.ajax({
            type: "POST",
            url: web_links + "api/set_take_item",
            data: {
                item_id: item_id,
                user_id: ugf_user_token.user_id
            },
            dataType: 'json',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {
                if (data == false) {
                    alert('Error while adding the item to your list, please try again');
                } else if (data == true) {
                    alert('Item has been added successfully, please fetch at the stated foodbank location');
                    location.replace("history.html");
                } else {
                    alert('Please login first to use the foodbank system');
                }
            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-white">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#loadGif').hide();
            }

        });
    }

});