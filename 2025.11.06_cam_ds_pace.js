// --- H5P Iframe Resizer ---
// Loads the H5P resizer script for responsive H5P content.
function h5pIframeHeight() {
    var h5pScript = document.createElement("script");
    h5pScript.setAttribute("charset", "UTF-8");
    h5pScript.setAttribute(
        "src",
        "https://loree-h5p.crystaldelta.net/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js"
    );
    document.body.appendChild(h5pScript);
}
h5pIframeHeight();

// --- Message Listener for H5P Iframe Sizing ---
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    if (
        event.data &&
        event.data.type &&
        event.data.type === "LOREE_WINDOW_SIZE" &&
        event.data.height
    ) {
        var frames = document.getElementsByTagName("iframe");
        for (var frame of frames) {
            if (
                frame.src &&
                frame.contentWindow === event.source &&
                frame.src.startsWith(event.data.url)
            ) {
                frame.style.height = event.data.height.toString() + "px";
            }
        }
    }
}

// --- External Links - Target Blank ---
// Automatically sets external links to open in a new tab for accessibility.
// function targetBlank() {
//     var internal = location.host.replace("www.", "");
//     internal = new RegExp(internal, "i");
//
//     var a = document.getElementsByTagName("a");
//     for (var i = 0; i < a.length; i++) {
//         var href = a[i].host;
//         if (href && !internal.test(href)) {
//             a[i].setAttribute("target", "_blank");
//             a[i].setAttribute("rel", "noopener noreferrer");
//         }
//     }
// }
// targetBlank();

// --- Image Zoom Functionality ---
// Handles zooming of images on click, preventing duplication and excluding banners.
$(document).ready(function() {
    $('img').on('click', function() {
        if ($(this).hasClass('no-hover-zoom')) {
            return;
        }

        var $clickedImage = $(this);
        var imageUrl = $clickedImage.attr('src');
        var imageAlt = $clickedImage.attr('alt');

        $('.zoomable-image-overlay').remove();

        var $overlay = $('<div class="zoomable-image-overlay"></div>');
        var $image = $('<img class="zoomable-image-overlay-content" src="' + imageUrl + '" alt="' + (imageAlt || '') + '">');
        var $closeButton = $('<div class="zoomable-image-close">&times;</div>');

        $overlay.append($image).append($closeButton);
        $('body').append($overlay);
        $overlay.fadeIn('fast');

        $closeButton.on('click', function() {
            $overlay.fadeOut('fast', function() {
                $overlay.remove();
            });
        });

        $overlay.on('click', function(e) {
            if ($(e.target).hasClass('zoomable-image-overlay')) {
                $overlay.fadeOut('fast', function() {
                    $overlay.remove();
                });
            }
        });
    });
});

// --- Transcript Modal Heading Update ---
function popupHeadingUpdate() {
    $(".transcript-button").click(function () {
        var _getHeading = $(this).attr("title");
        setTimeout(function () {
            if ($(".ui-dialog .ui-dialog-titlebar span.ui-dialog-title").length) {
                $(".ui-dialog .ui-dialog-titlebar span.ui-dialog-title").html(_getHeading);
            }
        }, 300);
    });
}
popupHeadingUpdate();