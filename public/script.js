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

    $("li").on("click", function() {
        $.ajax({
            type: "DELETE",
            url: `/todo/${encodeURIComponent($(this).text())}`,
            success: function(data) {
                location.reload();
            }
        });
    });
});