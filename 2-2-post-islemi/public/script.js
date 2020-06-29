$(document).ready(function() {
    $("form").on("submit", function() {
        $.ajax({
            type: "POST",
            url: "/todo",
            data: {
                gorev: $("form input").val()
            },
            success: function(data) {
                location.reload();
            }
        });
    });
});