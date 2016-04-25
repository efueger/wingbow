module.exports = `
<%
    var
        date = new Date();
        pad  = function pad (number) {
            return Math.abs(number) < 10 ? '0' + number : number;
        },
        tz   = date.getTimezoneOffset(),
        tzm  = Math.abs(tz) % 60,
        tzc  = Math.abs((Math.abs(tz) - tzm) / 60),

        iso = '' +
            date.getFullYear()       + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate())      + ' ' +
            pad(date.getHours())     + ':' +
            pad(date.getMinutes())   + ':' +
            pad(date.getSeconds())   + ' ' +
            ((tz < 0) ? '+' : '-')         +
            pad(tzc)                       +
            pad(tzm);
%>/*!
 * <%= pkg.name %> v<%= pkg.version %>+sha.<%= sha %>
 * Copyright 2015 - <%= date.getFullYear() %> All rights reserved.
 * <%= pkg.homepage %>
 *
 * Date: <%= iso %>
 */
(function (root, factory) {
if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('moment'));
} else if (typeof define !== 'undefined' && define.amd) {
    define(['moment'], factory);
} else {
    root.<%= pkg.name %> = factory(moment);
}
})(this, function (moment, undefined) { 'use strict';

`;
