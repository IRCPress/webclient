document.addEventListener(HOOKTYPE.LOGGED_IN_AS, (e) =>
{
    let sasl = e.detail;
    let tok = e.detail.param[0].split(" ");
    let account = tok[tok.length - 1];
    doSend("NICK "+account);
    if (!me.connected)
    {
        me.name = account;
    }
    getAboutMe();
});

