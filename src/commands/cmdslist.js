/*
 * CMDLIST: Allow understanding what commands are available on the server.
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

document.addEventListener(HOOKTYPE.SOCKOPEN, c =>
{
    if (HasCapability('valware.uk/cmdslist'))
        doSend("CMDSLIST");
});

document.addEventListener(HOOKTYPE.CMDSLIST, c =>
{
    c = c.detail; // always in .detail
    console.log(c);
    let strtok = c.param[0];
    let cmd = strtok[2].substring(1);
    if (strtok[2][0] == "+")
    {
        me.server.commands.push(cmd.toLowerCase());
    }
    else if (strtok[2][0] == "-")
    {
        me.server.commands.splice(me.server.commands.indexOf(cmd.toLowerCase()));
    }
});