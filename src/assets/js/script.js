$('.tooltips').tooltip();

$(function () {
    function responsiveView() {
        var wSize = $(window).width();
        if (wSize <= 768) {
            $('#container').addClass('sidebar-close');
            $('#sidebar > ul').hide();
        }

        if (wSize > 768) {
            $('#container').removeClass('sidebar-close');
            $('#sidebar > ul').show();
        }
    }
    $(window).on('load', responsiveView);
    $(window).on('resize', responsiveView);
});

$('.fa-bars').click(function () {
    if ($('#sidebar > ul').is(":visible") === true) {
        $('#main-content').css({
            'margin-left': '0px'
        });
        $('#sidebar').css({
            'margin-left': '-180px'
        });
        $('#sidebar > ul').hide();
        $("#container").addClass("sidebar-closed");
    } else {
        $('#main-content').css({
            'margin-left': '180px'
        });
        $('#sidebar > ul').show();
        $('#sidebar').css({
            'margin-left': '0'
        });
        $("#container").removeClass("sidebar-closed");
    }
});

$("#sidebar").niceScroll({ styler: "fb", cursorcolor: "#4ECDC4", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled: false, cursorborder: '' });
$("html").niceScroll({ styler: "fb", cursorcolor: "#4ECDC4", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled: false, cursorborder: '', zindex: '1000' });