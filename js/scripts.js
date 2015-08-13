function isBreakpoint(alias) {
    return $('.device-' + alias).is(':visible');
}

var waitForFinalEvent = (function() {
    var timer = 0;
    return function(callback, duration) {
        timer && clearTimeout(timer);
        timer = setTimeout(callback, duration);
    }
})();

function getDevice() {
    return isBreakpoint('xs') ? 'xs'
        : isBreakpoint('sm') ? 'sm'
        : isBreakpoint('md') ? 'md'
        : isBreakpoint('lg') ? 'lg' : '';
}

var device = getDevice();

$(window).resize(function() {
    waitForFinalEvent(function() {
        var newDevice = getDevice();
        if (device === newDevice) {
            return;
        }
        device = newDevice;
        if (device) {
            $(document).trigger({
                type: 'breakpoint',
                device: device
            });
        }
    }, 300);
});

$('.fb-like-box').attr('data-width', getFbLikeBoxWidth());

function getFbLikeBoxWidth () {
    switch (device) {
        case 'sm':
            return 220;
        case 'md':
            return 293;
        case 'lg':
            return 360;
    }
}

$(document).on('breakpoint', function(event) {
    var width = getFbLikeBoxWidth();
    $('.fb-like-box').attr('data-width', width);
    $('.fb-like-box > span, .fb-like-box > span > iframe').css('width', width);
});

$('.post-body a[href*="picasaweb.google.co.jp"] > img, .post-body a[href*="picasaweb.google.com"] > img')
    .parent()
    .on('click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
        remote: $(this).find('img').attr('src').replace(/\/s\d+(-.*)?\//, '/s1200$1/'),
        type: 'image'
    });
});

