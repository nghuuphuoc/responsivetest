/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 */

// Some functions taken from phpjs
var phpjs = {
    // See https://github.com/kvz/phpjs/blob/master/functions/url/base64_decode.js
    base64_decode: function (data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            dec = "",
            tmp_arr = [];

        if (!data) {
            return data;
        }

        data += '';

        do {
            // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);

        dec = tmp_arr.join('');

        return dec;
    },

    // See https://github.com/kvz/phpjs/blob/master/functions/url/urldecode.js
    urldecode: function (str) {
        return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi,function () {
            // PHP tolerates poorly formed escape sequences
            return '%25';
        }).replace(/\+/g, '%20'));
    }
};

var system   = require('system'),
    url      = system.args[1],
    selector = '#' + system.args[2],
    page     = new WebPage();

url = phpjs.urldecode(url);
page.open(url, function(status) {
    var clipRect = page.evaluate(function(s) {
        try {
            return document.querySelector(s).getBoundingClientRect();
        } catch (e) {
        }
    }, selector);

    if (clipRect) {
        page.clipRect = clipRect;
    }

    // Return the png raw output to the PHP back-end
    var output = page.renderBase64('PNG');
    console.log(output);

    phantom.exit();
});