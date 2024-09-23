document.addEventListener(HOOKTYPE.PART, (e) =>
{
    console.log(e.detail);
    var chan = Array.isArray(e.detail.param[0]) ? e.detail.param[0][2] : e.detail.param[0].split(' ')[2];
    var from = e.detail.from;

    let client = {
        "chan": chan,
        "ident": from.ident,
        "host": from.host,
        "name": from.name,
        "status": "H",
        "account": e.detail.mtags.account ?? null
    };
    if (client.name == me.name)
        Channel.delete(client);
    else
        Channel.delUser(client);

    
    console.log(client);
});
