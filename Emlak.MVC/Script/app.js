/// <reference path="C:\Users\section-1\Source\Repos\EmlakProjesi\Emlak.MVC\Scripts/jquery-3.1.1.js" />

$('#avatar').change(function () {
    //readURL(this);
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
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.useravatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

//$('#useravatar').dragncrop({ overlay: true, overflow: true });

//initPropertyMapAndPanorama(containerMap, containerPanorama, property)



