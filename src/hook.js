/*
 * hook.js - HOOKTYPES
 * © Copyright 2023 Valerie Pond and the QtPiRC Team
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */

const HOOKTYPE = {
    AWAY: "away",
    PRIVMSG: "privmsg",
    TAGMSG: "tagmsg",
    JOIN: "join",
    PART: "part",
    NOTICE: "notice",
    CTCP: "ctcp",
    MODE: "mode",
    NICK: "nick",
    QUIT: "quit",
    CAP: "cap",
    CMDSLIST: "cmdslist",
    SOCKOPEN_PRE: "presockopen",
    SOCKOPEN: "sockopen",
    TYPING: "typing",
    WELCOME: "001",
    WHOIS_NUH: "311",
    WHOIS_MODES: "379",
    WHOIS_HOSTIP: "378",
    WHOIS_CHANS: "319",
    WHOIS_GEOIP: "344",
    TOPIC: "332",
    WHO: "352",
    WHOX: "354",
    WHO_END: "315",
    NAMES: "353",
    ERR_ERRONEUSNICKNAME: 432,
    ERR_NICKNAMEINUSE: 433,
    RPL_METADATA: "761",
    METADATA: "metadata",
    LOGGED_IN_AS: "900",
    LOGGED_IN: "903",
    ACTIVE: "active:change",
};

class Hook {
    static run(type, detail)
    {
        const customEvent = new CustomEvent(type, {
            detail: detail
        });
        document.dispatchEvent(customEvent);
    }
}