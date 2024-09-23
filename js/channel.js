
class Channel
{
    static active;
    static element = {};

    static delete(name)
    {
        let treebar = document.getElementById("treebar");
        let chanblock = document.getElementById(name.chan.substring(1)+"-chan-block");
        if (treebar && chanblock)
            treebar.removeChild(chanblock);
        
        let nicklist = document.getElementById(name.chan.substring(1)+"-nicklist");
        if (nicklist)
            nicklist.parentNode.removeChild(nicklist);

        let output = document.getElementById(name.chan.substring(1)+"-channel-output");
        if (output)
                output.parentNode.removeChild(output);

        me.channels.splice(me.channels.indexOf(name.chan.substring(1)), 1);
        if (name.chan == me.active_window)
            this.switchActive(me.channels[0] ?? null)
    }
    static addNew(name)
    {
        var chanButton = document.createElement('div');
        chanButton.id = name + "-chan-block";
        chanButton.classList.add('btn', 'btn-secondary', 'window-window', 'channel-button');
        chanButton.style.height = "100px";
        chanButton.style.marginRight = "3px";
        chanButton.style.position = "relative";
        chanButton.setAttribute('draggable', 'true');
        chanButton.innerHTML = `
                                <div>
                                    <div scope="row" class="text-start">
                                        <div id="`+name+`-channel-name" scope="col" class="pb-0 mt-0" style="padding:0px"><span class="glass">#`+name+`</span>
                                            <div id="`+name+`-channel-mention" class="badge btn-sm bg-danger text-white rounded-pill" style="position:absolute;top:5px;right:60px">5</div>
                                            <div id="`+name+`-channel-notif" class="badge btn-sm bg-primary text-white rounded-pill" style="position:absolute;top:5px;right:30px">5</div>
                                            <small type="button" class="btn-close btn-close-white" onclick="doSend('part #`+name+`')" aria-label="Close" style="width:5px;height:5px;position:absolute;top:5px;right:5px"></small>
                                        </div>
                                        <div id="`+name+`-channel-lastsaid" class="glass lastsaid" scope="col" class="text-start"></div>
                                        <div id="`+name+`-channel-users" class=""></div>
                                    </div>
                                </div>`;

        chanButton.addEventListener('click', (e)=>{
            this.switchActive(name);
        });
        document.getElementById("treebar").appendChild(chanButton);

        var output = document.createElement('div');
        output.id = name+"-channel-output";
        output.classList.add('output', 'bg-nihao');
        output.setAttribute('onclick',"focusOnInput()");

        const chatwindow = document.getElementById('chatwindow');
        chatwindow.appendChild(output);
        this.switchActive(name);

        var nicklist = document.createElement('div');
        nicklist.id = name+"-nicklist";
        nicklist.classList.add('nicklist');

        var nicklistwindow = document.getElementById('nicklistwindow');
        nicklistwindow.appendChild(nicklist);
        me.channels.push(name);
    }
    static newTopic(id, topic)
    {
        var element = document.getElementById(id + "-channel-topic") ?? null;
        if (!element)
            return console.log("Couldn't find the channel we have a topic for: #"+id);
        element.innerHTML = Escape(topic);
    }

    static switchActive(dest)
    {
        if (!dest)
        {
            document.getElementById('output').removeAttribute('hidden');
            this.active = null;
            me.active_window = null;
            return;
        }
        const outputs = document.querySelectorAll('.output');
        outputs.forEach((o) => {
            if (o.id == dest+"-channel-output")
            {
                this.active = '#'+dest;
                o.removeAttribute('hidden');
                me.active_window = '#'+dest;
                o.scrollTop = o.scrollHeight;
            }
            else
                o.setAttribute('hidden', '');
        });
        const nicklists = document.querySelectorAll('.nicklist');
        nicklists.forEach((o) => {
            if (o.id == dest+"-nicklist")
            {
                o.removeAttribute('hidden');
            }
            else
                o.setAttribute('hidden', '');
        });
    }
    static addNewUser(client)
    {
        let userList = document.getElementById(client.chan.substring(1)+'-nicklist');
        let user = document.createElement('button');
        user.style.position = 'relative';
        user.id = client.chan.substring(1)+"-"+client.name;
        user.classList.add('nicklist-user', 'row', 'nicklist-user-'+client.name.toLowerCase(), 'nicklist-theme');
        user.setAttribute("scope", "row");
        user.setAttribute('onclick',"ProfilePreview(this)");
        user.setAttribute('irc-account', client.account ?? "0");
        user.setAttribute('irc-nick', client.name);
        user.setAttribute('data-bs-toggle', 'modal');
        user.setAttribute('data-bs-target', '#profileModal');
        let status = this.getStatus(client.status);
        let badges = this.getStatusBadges(status, client.account);
        user.innerHTML = `<div class="container text-start" style="position:absolute;top:10px">
                            <div class="row pe-1" scope="row">
                                <h5 class="col-sm" style="width:fit-content"><div class="nicklistnick badge text-bg-dark">`+badges.away+client.name+`</div></h5>
                                <div class="nicklistaccount text-end col-sm">`+badges.account+`</div>
                            </div>
                          </div>
                          <div style="bottom:0;position:absolute" class="text-start">
                            `+badges.oper+badges.voice+badges.halfop+badges.op+badges.admin+badges.owner+`
                          </div>`
        
        userList.appendChild(user);

    }

    static delUser(client)
    {
        let user = document.getElementById(client.chan.substring(1)+"-"+client.name);
        if (user)
        {
            user.parentNode.removeChild(user);
        }
    }

    static getStatus(status)
    {
        let st = {
            away: status.includes('G'),
            oper: status.includes('*'),
            voice: status.includes('+'),
            halfop: status.includes('%'),
            op: status.includes('@'),
            admin: status.includes('&'),
            owner: status.includes('~'),
            bot: status.includes('B'),
        }
        return st;
    }
    static getStatusBadges(status, account = null)
    {
        let st = {
            away: status.away ? "💤 " : "",
            account: account ? "<div class='badge badge-sm bg-primary text-white nicklist-status-badge' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='Logged into account \""+account+"\"'>🔑 "+account+"</div>" : "",
            oper: status.oper ? "<span class='badge badge-sm bg-warning text-black nicklist-status-badge'>Server Operator</span>" : "",
            voice: status.voice ? "<span class='badge badge-sm bg-primary nicklist-status-badge'>Voice</span>" : "",
            halfop: status.halfop ? "<span class='badge badge-sm bg-primary nicklist-status-badge'>HalfOp</span>" : "",
            op: status.op ? "<span class='badge badge-sm bg-primary nicklist-status-badge'>Operator</span>" : "",
            admin: status.admin ? "<span class='badge badge-sm bg-primary nicklist-status-badge'>Admin</span>" : "",
            owner: status.owner ? "<span class='badge badge-sm bg-primary nicklist-status-badge'>Owner</span>" : "",
            owner: status.owner ? "<span class='badge badge-sm bg-secondary nicklist-status-badge'>Bot</span>" : "",
        }
        return st;
    }
}