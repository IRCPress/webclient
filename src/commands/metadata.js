
document.addEventListener(HOOKTYPE.RPL_METADATA, (e) =>
{
    console.log(e);
    var meta = e.detail;
    
    let param = meta.param[0].split(' ');
    let target = param[3];
    let type = param[4];
    let value = meta.parvstring;
    console.log("V2: "+target+value);
    if (type == "avatar")
        addUserAvatarCss(target, value);
    if (type == "theme")
    {
        if (target[0] != "#")
            addUserThemeCss(target, value);

        else
            addChannelThemeCss(target, value);
    }

});

document.addEventListener(HOOKTYPE.METADATA, (e) => {
    let param = e.detail.param[0].split(' ');
    let type = param[3];
    let target = param[2];
    let value = e.detail.parvstring;
    console.log("V1: "+value);

    if (type == "avatar")
        addUserAvatarCss(target, value);
    if (type == "theme")
    {
        if (target[0] != "#")
            addUserThemeCss(target, value);

        else
            addChannelThemeCss(target, value);
    }
});