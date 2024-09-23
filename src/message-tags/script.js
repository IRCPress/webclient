function script2HTML(j)
{
    let q = document.createElement('div');
    q.id = Math.random().toString(36).slice(2, 7);
    q.classList.add('questions-content', 'd-flex', 'flex-column', 'alert', 'bg-secondary', 'text-white', 'p-2');
    q.role = 'alert';
    q.textContent = j.title;
    
    for (const [option, message] of Object.entries(j.buttons))
    {
        let button = document.createElement('button');
        button.setAttribute('onclick', message.onclick)
        button.classList.add('btn', 'btn-sm', 'script-button', 'rounded-pill', 'glass');
        button.style.background = message.bgColor;
        button.style.color = message.textColor;
        button.innerText = option;
        q.appendChild(button);
    }
    console.log(q);
    return q.outerHTML;
}