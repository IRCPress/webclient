document.addEventListener(HOOKTYPE.TAGMSG, (e) => {
    let mtags = e.detail.mtags;
    if (!mtags["+draft/reply"] || !mtags["+draft/react"])
        return;

    console.log(mtags["+draft/reply"]+"-reacts");
    let reactList = document.getElementById(mtags["+draft/reply"]+"-reacts");
    let newReact = reactList.querySelector("."+mtags["+draft/react"]);
    if (!newReact)
    {
        newReact = document.createElement('button');
        newReact.classList.add(mtags["+draft/react"], "badge", 'badge-sm', 'bg-dark', 'text-white', 'me-1');
        newReact.setAttribute("onclick", "quick_react('"+me.active_window+"', '"+mtags["+draft/reply"]+"', '"+mtags["+draft/react"]+"')")

        let emoji = document.createElement('span');
        emoji.innerText = mtags["+draft/react"];
        let count = document.createElement('span');
        count.innerText = 0; // initialize at 0;
        count.style.paddingLeft = "3px";
        count.classList.add('count');

        newReact.appendChild(emoji);
        newReact.appendChild(count);
        reactList.appendChild(newReact);
    }

    let count = newReact.querySelector(".count");
    count.innerText++;
});

function quick_react(target, id, react)
{
    doSend("@+draft/react="+react+";+draft/reply="+id+" TAGMSG "+me.active_window);
}