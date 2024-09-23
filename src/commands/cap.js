/*
 * cap.js: CAP command (Client capabilities)
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

document.addEventListener(HOOKTYPE.SOCKOPEN_PRE, (e) => {
    do_caps();
})

// document.addEventListener(HOOKTYPE.CAP, cap =>
// {
//     cap = cap.detail;

//     var tok = cap.param[0].split(" ");
//     var lcmd = tok[3];
    

//     if (lcmd == "LS")
//     {
//         me.capsToRequest.forEach(c => {
//             if (cap.parv.includes(c))
//             {
//                 console.log(c);
//                 me.capsAck.push(c);
//                 if (c == 'sasl')
//                     me.jobs++;
//             }
//         });
//         if (cap.param[1].includes('sasl'))
//         {
//             doSend("cap req :sasl");
//             doSasl();
//         }
//         let capsToSend = splitMessageIntoChunks()
//         doSend("cap req :"+me.capsAck.join(" "));
        
//     }
    
// });

function do_caps()
{
    let capsToSend = splitMessageIntoChunks(me.capsToRequest.join(' '));
    capsToSend.forEach((cap) => {
        doSend("cap req :"+cap);
    })
    doSasl();
}

function HasCapability(c)
{
    return me.capsAck.includes(c);
}