/*
 * PRIVMSG: Allow sending and recieving messages.
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

document.addEventListener(HOOKTYPE.PRIVMSG, privmsg =>
{
    privmsg = privmsg.detail; // always in .detail
    const nick = privmsg.from.name;
    console.log(privmsg);
    let msg = (Array.isArray(privmsg.parv)) ? privmsg.parv.join(" ") : privmsg.parv;
    let parv = privmsg.parv;
    let param = privmsg.param[0].split(" ");
    let chan = param[2][0] == '#' ? param[2] : null;
    const mtags = privmsg.mtags;
    let isDisplayNick = false;
    let display_nick = (mtags && mtags["+draft/display-name"] && (isDisplayNick = true)) ? Escape(mtags["+draft/display-name"]) + ` (`+nick+`)` : nick;
    let isCtcp = IsCtcp(msg);
    let isAction = false;
    if (isCtcp)
    {
        msg = msg.split('\u0001').join("");
    }
    parv = msg.split(" ");
    if (parv[0] == "ACTION")
    {
        isAction = true;
        parv[0] = '';
        msg = (Array.isArray(parv)) ? parv.join(" ") : parv;
        parv = msg.split(" ");
    }

    if (isDisplayNick)
        display_nick = display_nick.split('\\:').join(';').split('\\s').join(' ').split('\\\\').join('\\').split('\\r').join('<br>').split('\\n').join('<br>');
    

    if (isAction)
    {
        doMiddleBubbble("* "+Escape(display_nick) + " "+Escape(msg))
        return;
    } 

    let str = Escape(msg);
    const pattern = /(http:\/\/|https:\/\/)([^\s]+)/gi;
    let n = str.replace(pattern, 
        function(match)
        {
            return `<a href="${match}" target="_blank">${match}</a>`;
        }
    );
    
    if (str != n)
    {
        let to_add = findAndGenerateImageHTML(str);
        if (to_add)
            n+="<br>"+to_add;
        else if (mtags.msgid)
            resolveLinkToEmbed(str, mtags.msgid);

    }
    str = n;
    let content;

    if (mtags["+script-message"])
    {
        if (nick == me.name)
            me.script = null;
        let j = JSON.parse(unescapeTagString(mtags["+script-message"]));
        content = script2HTML(j);
    }
    /* Replies */
    else if (mtags["+draft/reply"])
    {
        let reply = document.createElement('div');
        reply.classList.add('text-bg-dark');
        reply.style.marginLeft = "10px";
        reply.style.padding = "5px";
        reply.style.borderRadius = "7px";
        reply.style.borderLeft = "white 4px solid";
        let replyto = document.getElementById(mtags["+draft/reply"]);
        if (replyto)
        {
            let replytodup = replyto.cloneNode(true);
            replytodup.removeAttribute('id');
            let childNode = replytodup.querySelector(".content");
            if (childNode)
            {
                childNode.parentNode.removeChild(childNode);
                reply.innerHTML = replytodup.innerHTML;
                content = reply.outerHTML;
            }
            childNode = replytodup.querySelector(".content");
            if (childNode)
            {
                childNode.parentNode.removeChild(childNode);
                reply.innerHTML = replytodup.innerHTML;
                content = reply.outerHTML;
            }
            else console.log("Failed to lookup child node for some fucking unknown reason");
        }
        else console.log("Failed to lookup by ID for some fucking unknown reason");
    }

    if (nick != me.name)
    {
        var classes = isAction ? "other-action" : "other-privmsg";
               
        writeToScreen(`
        <div class="input-group align-items-center">

            <!-- This will be the avatar when we support metadata -->
            <div class="ms-2 card align-items-middle text-center `+nick.toLowerCase()+`-avatar avatar"></div>

            <!-- Message bubble -->
            <div role="button" id="`+((mtags != null) ? mtags.msgid : "0")+`" class="rounded ms-3 mt-0 mb-0 ps-2 pb-1 pt-1 pe-4 card align-items-center privmsg ` + classes + `">` +
                (mtags && mtags.bot ? `<div class="badge bg-primary me-2">Bot</div>` : ``)+ `
                <div id="display-nick" class="display-nick msg-from-`+display_nick.toLowerCase()+` ms-0 ` + (!isAction ? `badge bg-secondary` : 'ms-1') + ` me-2">`+ ((isAction) ? `<i> * ` : ``) + (Escape(display_nick) + 
                ((isAction) ? str + `</i>` : ``)) + 
                
                ((!isAction) ? `</div>`+
                `<br>
                <div id="message_contents" class="message-contents">`+str+`</div>` : '') + `
                <div class="content">`+(content ?? "")+`</div>
                <div id="`+mtags.msgid+`-reacts" class="container-xs `+mtags.msgid+`-reacts reacts"></div>
                <div class="message-buttons-container container-xs">
                    <div class="row">
                        <div class="col badge message-buttons-choice glass" onclick="replyToMessage('`+mtags.msgid+`')"><i class="fa-solid fa-reply"></i></div>
                        <div class="col badge message-buttons-choice glass" data-bs-toggle="modal" data-bs-target="#emojiModal" onclick="reactToMessage('`+mtags.msgid+`')"><i class="fa-solid fa-heart"></i></div>
                    </div>
                </div>
            </div>
        </div>
        `, chan.substring(1));
    } else {
        
        writeToScreen(`
        <div class="text-end me-3 align-items-center" style="position:relative">
            <div class="ms-3 card text-center `+nick.toLowerCase()+`-avatar avatar self-avatar"></div>

            <div role="button" id="`+mtags.msgid+`" class="text-start rounded align-items-center me-2 mt-0 mb-0 ps-2 pb-1 pt-1 pe-4 card our-privmsg privmsg">
                <div style="left:5px;" class="display-nick msg-from-`+display_nick.toLowerCase()+` badge bg-dark me-2">`+ display_nick + `</div>
                <br>
                <div class="message-contents" id="message_contents">`+str+`</div>
                <div class="content">`+(content ?? "")+`</div>
                <div id="`+mtags.msgid+`-reacts" class="container-xs `+mtags.msgid+`-reacts reacts"></div>
                <div class="text-end message-buttons-container container-xs">
                    <div class="row">
                        <div class="col badge message-buttons-choice glass" onclick="replyToMessage('`+mtags.msgid+`')"><i class="fa-solid fa-reply"></i></div>
                        <div class="col badge message-buttons-choice glass" data-bs-toggle="modal" data-bs-target="#emojiModal" onclick="reactToMessage('`+mtags.msgid+`')"><i class="fa-solid fa-heart"></i></div>
                    </div>
                </div>
            </div>
        </div>
    `, chan.substring(1));
    }

    let last_said_text;
    let too_big = (msg.length > 26) ? true : false;
    last_said_text = ((too_big) ? Escape(msg.substring(0,26)) + "..." : Escape(msg))+"</a></b></i></u>";
    const lastsaid = document.getElementById(chan.substring(1)+"-channel-lastsaid");
    lastsaid.innerHTML = "<b>"+nick+"</b>: <i>"+last_said_text+"</i>";
    let o = document.getElementById(chan.substring(1)+"-channel-output");
    scrolldown(o);
    setTimeout(scrolldown(o), 1000);
});

function send(dest = me.active_window)
{
	var input = document.getElementById("input");
	input.focus();
	var text = document.getElementById("input").value;
	var parv = input.value.split(" ");
	if (text[0] == "/")
	{
		if (parv[0] == "/me")
		{
			parv[0] = null;
			text = parv.join(" ");
			doSend('privmsg '+me.active_window+' :\u0001ACTION'+text+'\u0001')
			input.value = "";
			return;
		}
		doSend(text.substring(1));
	}
	else {
		let mtags = new MessageTags();
		if (me.toReplyTo)
		{
			mtags.add("+draft/reply", me.toReplyTo);
			me.toReplyTo = null;
		}
        if (me.display_name)
            mtags.add("+draft/display-name", escapeTagString(me.display_name));

        if (me.script)
            mtags.add("+script-message", escapeTagString(me.script));

		send_to(me.active_window, mtags, text);
	}
	input.value = "";
}

function escapeTagString(input) {
    const escapables = {
        ' ': '\\s',
        '\\': '\\\\'
    };

    let escapedStr = '';

    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        // Skip \r and \n characters
        if (char === '\r' || char === '\n' || char === '\t') {
            continue;
        }

        // Replace escapables or leave the character as is
        escapedStr += escapables[char] || char;
    }

    return escapedStr;
}
function unescapeTagString(input) {
    return input.replace(/\\s/gi, ' ');
}

function replyToMessage(id)
{
    me.toReplyTo = id;
}
function reactToMessage(id)
{
    me.toReactTo = id;
}

