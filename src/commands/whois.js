document.addEventListener(HOOKTYPE.WHOIS_CHANS, (e) =>
{
    let tok = e.detail.param[0].split(' ');
    let nick = tok[tok.length - 1];
    
    if (me.currentWhois && me.currentWhois == nick)
    {
        let chanslist = document.getElementById('profile-view-channels');
        let chans = e.detail.param[1].split(' ');
        Array.from(chans).forEach((c) => {
            if (c.length > 0)
            {
                let chanbadge = document.createElement('button');
                chanbadge.classList.add('badge', 'bg-primary', 'text-white', 'm-1');
                chanbadge.setAttribute('onclick', "doSend('JOIN "+c+"')");
                chanbadge.innerText = c;

                chanslist.appendChild(chanbadge);
            }
        });
    }

});

document.addEventListener(HOOKTYPE.WHOIS_GEOIP, (e) => {

    console.log(e.detail);
    let tok = e.detail.param[0].split(' ');
    let nick = tok[tok.length - 2];
    let code = tok[tok.length - 1];
    console.log(nick, code);
    if (me.currentWhois && me.currentWhois == nick)
    {
        let geo = document.getElementById('profile-view-geo');
        let flag = countryCodeToEmoji(code);
        geo.innerText = flag;
        console.log(flag);
    }
});

function visitProfile()
{
    let lookup = document.getElementById('profile-view-nick');
    let name = lookup.innerText;
    if (name.includes(' '))
        name = name.substring(2);

    window.open("/user/"+name);
}