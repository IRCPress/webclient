document.addEventListener(HOOKTYPE.AWAY, (e) =>
{
    var from = e.detail.from;
    var reason = e.detail.parvstring ?? null;
    var nicklistitems = document.getElementsByClassName("nicklist-user-"+from.name.toLowerCase());
    Array.from(nicklistitems).forEach((item) => {
        let nicktext = item.querySelector(".nicklistnick");
        let newtext = nicktext.innerHTML;
        newtext = newtext.replace("💤 ", "");
        if (reason)
            newtext = "💤 "+newtext;

        nicktext.innerHTML = newtext;
    });
});
