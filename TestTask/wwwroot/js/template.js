'use strict';
class Template {

    static htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '`': '&#x60;'
    };

    static escapeHtmlChar = function (chr) {
        return htmlEscapes[chr];
    };

    static reUnescapedHtml = /[&<>"'`]/g;
    static reHasUnescapedHtml = new RegExp(this.reUnescapedHtml.source);

    static escape = function (string) {
        return (string && reHasUnescapedHtml.test(string))
            ? string.replace(reUnescapedHtml, escapeHtmlChar)
            : string;
    };

    constructor() {
        this.defaultTemplate
            = '<div class="item" data-id="{{id}}">'
            + '<img src="{{src}}">'
            + '</div>';
    }

    show (data) {
        var i, l;
        var view = '';

        for (i = 0, l = data.length; i < l; i++) {
            var template = this.defaultTemplate;

            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{src}}', data[i].src);

            view = view + template;
        }

        return view;
    }
}