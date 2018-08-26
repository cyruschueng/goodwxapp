define(["jquery", window.JSON ? undefined : "json2"], function ($) {

    var ciwong = window.ciwong || {};

    ciwong.englishLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    ciwong.encoder = new function () {
        var encoder = {
            /**
             * html解码
             *
             * @param {String} html　经过htmlEncoder编码的html字符串
             * @static method {String}
             **/
            htmlDecode: function (html) {
                if (!html) {
                    return '';
                }

                html = html.replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, "\"")
                    .replace(/&apos;/g, "'")
                    .replace(/&nbsp;/g, " ");

                return html;
            },
            /**
             * html加码
             *
             * @param {String} html
             * @static method {String}
             **/
            htmlEncode: function (html) {
                if (!html) {
                    return '';
                }

                html = html.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&apos;");

                return html;
            },
            urlDecode: function (url) {

                if (!url) {
                    return '';
                }

                return decodeURIComponent(url)

            },
            urlEncode: function (url) {
                if (!url) {
                    return '';
                }

                return encodeURIComponent(url)
                    .replace(/!/g, '%21')
                    .replace(/'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29')
                    .replace(/\*/g, '%2A')
                    .replace(/%20/g, '+')
                    .replace(/%C2%A0/gi, '+');
            }
        };

        return encoder;
    };

    ciwong.koTemplateEngine = new function () {
        var allowTemplateRewriting = false;
        return {
            add: function (templateName, templateMarkup) {
                if (!allowTemplateRewriting && $("#" + templateName).length > 0) {
                    return;
                }
                $("#" + templateName).remove();
                $("body").append("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<\/script>");
            },
            allowTemplateRewriting: function (value) {
                allowTemplateRewriting = value;
            }
        }
    };

    /*
     #region 拓展函数区域
     */
    window.String.format = new function () {
        return function () {
            var args = Array.prototype.slice.call(arguments),
                str = args.shift();

            return str.replace(/\{(\d+)\}/g,
                function (m, i) {
                    return args[i];
                }
            );
        };
    };

    window.String.prototype.format = function () {
        var args = Array.prototype.slice.call(arguments)

        return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            }
        );
    }

    window.String.prototype.removeHtmlTag = function () {
        return this.replace(/<[a-zA-Z0-9]+? [^<>]*?>|<\/[a-zA-Z0-9]+?>|<[a-zA-Z0-9]+?>|<[a-zA-Z0-9]+?\/>|\r|\n/ig, "");
    }

    window.String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    
    /*
     #endregion 拓展函数区域
     */

    window.ciwong = ciwong;

    return ciwong; //对外返回
});


