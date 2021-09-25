window.addEventListener('load', (event) => {

    if (ugf_user_token.user_id != null) {
        $.ajax({
            type: "POST",
            url: web_links + "api/get_history",
            data: {
                user_id: ugf_user_token.user_id
            },
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

                        $('#display').append(
                            '    <div class="row bg-white mb-2 mx-1 py-2 shadow">' +
                            '        <div class="col-5">' +
                            '            <img class="card-img-top" src="' + img + '" alt="No Image"> </div>' +
                            '        <div class="col">' +
                            '            <h5 class="mb-0">' + data[i].item_name + '</h5>' +
                            '        <small class="text-muted fw-light">' + data[i].item_location + '</small><br>' +
                            '        <small class="text-muted fw-light">' + data[i].item_status + '</small>' +
                            '        </div>' +
                            '        <div class="col-2">' +
                            '            <button class="btn btn-danger btn-sm mb-1" id="removeItem" value="' + data[i].id + '"><i class="fas fa-times fa-fw"></i></button>' +
                            '            <button class="btn btn-secondary btn-sm" id="scanItem" value="' + data[i].id + '"><i class="fas fa-qrcode fa-fw"></i></button>' +
                            '        </div>' +

                            '    </div>'
                        );
                    }

                } else {
                    $('#display').append(
                        '    <div class="row bg-white mb-2 mx-1 py-2 shadow">' +
                        '        <div class="col">' +
                        '           <p> No foodbank item history found.</p>' +
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
    } else {
        $('#display').append(
            '    <div class="row bg-white mb-2 mx-1 py-2 shadow">' +
            '        <div class="col">' +
            '           <p> Please login to view your taken item history.</p>' +
            '        </div>' +
            '    </div>'
        );
    }
})

$(document).on('click', '#scanItem', function () {

    var id = this.value;
    cordova.plugins.barcodeScanner.scan(function (result) {

        var scanned_id = result["text"];

        if (id === scanned_id) {
            $.ajax({
                type: "POST",
                url: web_links + "api/set_taken",
                data: {
                    user_id: ugf_user_token.user_id,
                    item_id: scanned_id
                },
                dataType: 'JSON',
                beforeSend: function () {
                    $('#loadGif').show();
                },
                success: function (data) {

                    if (data != false) {
                        alert('Thanks, you taken item from the foodbank has been recorded!');
                        location.replace('history.html');
                    } else {
                        alert('Scanning error! Scan the QR again.');
                        location.replace('history.html');
                    }
                },
                error: function () {
                    $('#display').html('<div class="row"><div class="col"><p class="my-3 text-white">Internal server error, please reload.</p></div></div>');
                },
                complete: function () {
                    $('#loadGif').hide();
                }
            });
        } else {
            alert('Wrong QR id!');
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

$(document).on('click', '#removeItem', function () {

    var id = this.value;

    $.ajax({
        type: "POST",
        url: web_links + "api/set_remove_item",
        data: {
            user_id: ugf_user_token.user_id,
            history_id: id
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#loadGif').show();
        },
        success: function (data) {
            if (data != false) {
                alert('Item has been removed');
                location.replace('history.html');
            } else {
                alert('Removing item failed, try again.');
                location.replace('history.html');
            }
        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-white">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#loadGif').hide();
        }
    });


});