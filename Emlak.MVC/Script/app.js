$('#avatar').change(function () {
    var data = new FormData();
    var file = $('#avatar').get(0).files;
    if (file.length > 0) {
        data.append("myAvatar", file[0]);

        $.ajax({
            url: '../Account/UploadAvatar',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                if (response.success == true) {
                    $(".useravatar").attr("src", response.path);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
});