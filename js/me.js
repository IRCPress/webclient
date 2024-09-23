var me = {
    name: "Guest-" + Math.floor((Math.random() * 1000) + 1).toString(),
	ident: 'pooclient',
	gecos: 'Got Poo?',
	quitmsg: 'Don\'t Forget To Poo Today',
	toJoin: "#México",
	display_name: null,
	script: null,
	capsToRequest: [
		'sasl',
		'draft/metadata-2',
		'echo-message',
		'away-notify',
		'invite-notify',
		'extended-join',
		'multi-prefix',
		'setname',
		'chghost',
		'account-notify',
		'message-tags',
		'server-time',
		'account-tag',
		'labeled-response',
		'draft/no-implicit-names',
		'draft/metadata-notify-2',
		'valware.uk/cmdslist',
		'draft/chathistory',
	],
	sasl: {
		"account": "null",
		"password": "null"
	},
	capsAck: [
		
	],
	server: {
		name: "poo.today",
		port: "8000",
		commands: [],
		isupport: [],
		modes: {
			group1: [],
			group2: [],
			group3: [],
			group4: [],
		},
		listmodes: {}, // for key=>pair values like ~ is +q
	},
	channels: [],
	jobs: 0,
	active_window: null,
	connected: 0,
	currentWhois: null,
	toReplyTo: null,
	toReactTo: null,
};

connectWebSocket();