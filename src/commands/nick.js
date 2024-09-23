document.addEventListener(HOOKTYPE.NICK, (e) =>
{
    console.log(e.detail);
    var tok = e.detail.param[0].split(" ");
    
    // it's us
    if (e.detail.from.name == me.name)
        me.name = e.detail.parvstring;
    
    nick_change(e.detail.from.name, e.detail.parvstring);
     
});

// something wrong with the nick, switch out to Guest nick
document.addEventListener(HOOKTYPE.ERR_ERRONEUSNICKNAME, (e) => 
{
    do_nick("Guest"+Math.floor(Math.random() * 9999));
});

document.addEventListener(HOOKTYPE.ERR_NICKNAMEINUSE, (e) =>
{
    do_nick(me.name+Math.floor(Math.random() * 99))
});


function do_nick(nick)
{
    doSend("NICK "+nick)
    if (me.connected == 0)
        me.name = nick;
}

function nick_change(from, to) {
    let nick = from.toLowerCase();
    let to_lower = to.toLowerCase();
    let to_escaped = to.replace("\\", "\\\\");  // fix for the variable name

    let users = document.getElementsByClassName('nicklist-user-' + nick);
    Array.from(users).forEach((user) => {
        // Update nick in attributes and classes
        user.setAttribute('irc-nick', to_lower);
        user.classList.remove('nicklist-user-' + nick);
        user.classList.add('nicklist-user-' + to_lower);
        user.id = user.id.replace(nick, to_lower);

        // Update the nickname in the innerHTML
        let nicklistNickElement = user.querySelector('.nicklistnick');
        if (nicklistNickElement) {
            let currentInnerHTML = nicklistNickElement.innerHTML;
            let updatedInnerHTML = currentInnerHTML.replace(from, to_escaped); // Replace the old nick with the new one
            nicklistNickElement.innerHTML = updatedInnerHTML;
        }
    });

    let msgs = document.getElementsByClassName('msg-from-'+nick);
    Array.from(msgs).forEach((msg) => {
        msg.classList.remove('msg-from-'+nick);
        msg.classList.add('msg-from-'+to_lower);
        msg.innerText = to_escaped;
    });
}