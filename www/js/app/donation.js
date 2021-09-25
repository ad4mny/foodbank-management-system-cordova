window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: web_links + "api/get_donation",
        dataType: 'json',
        beforeSend: function () {
            $('#loadGif').show();
        },
        success: function (data) {

            if (data != false) {
                var value = [];

                for (var i = 0; i < data[0].length; i++) {
                    value.push({
                        values: [data[0][i]],
                        text: data[1][i]
                    });
                }

                var myConfig = {
                    title: {
                        text: "Total Availability of Foodbank"
                    },
                    "type": "pie",
                    legend: {
                        "max-items": 4,
                        "overflow": "scroll",
                        "scroll": {
                            "bar": {
                            },
                            "handle": {
                
                            }
                        },
                        x: "8%",
                        y: "8%",
                    },
                    "series": value
                };

                zingchart.render({
                    id: 'myChart',
                    data: myConfig,
                    height: 600,
                    width: '100%'
                });

            } else {
                $('#display').append(
                    '    <div class="row bg-white mb-2 mx-1 py-2 shadow">' +
                    '        <div class="col">' +
                    '           <p> No donation statistics found.</p>' +
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