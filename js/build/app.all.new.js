Ext.util.MD5 = function(s,raw,hexcase,chrsz) {
	raw = raw || false;
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_md5(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}
	function str2binl(str){
		var bin = [];
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	}
	function binl2str(bin){
		var str = "";
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	}

	function binl2hex(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	return (raw ? binl2str(core_md5(str2binl(s), s.length * chrsz)) : binl2hex(core_md5(str2binl(s), s.length * chrsz))	);
};
/**
 * @author Nils Dehl  <mail@nils-dehl.de>
 */
Ext.regApplication('App', {
	defaultTarget: 'viewport',
	defaultUrl   : 'Viewport/index',
	name         : 'App',
	useHistory   : false,
	useLoadMask : true,

	launch: function() {
		Ext.Viewport.init();
		Ext.Viewport.onOrientationChange();

		this.viewport = new App.View.Viewport({
			application: this
		});

		Ext.dispatch({
			controller: 'Viewport',
			action    : 'index'
		});
	}
});

Ext.ns('App.util');
/**
 * Socket.io  wrapper class
 * @class App.util.Socketio
 * @extends Ext.util.Observable
 */
App.util.Socketio = Ext.extend(Ext.util.Observable, {

	constructor: function(host, options){

		options = options || {};


		App.util.Socketio.superclass.constructor.call(
			this
		);
		//this.socket = io.connect(host, options);
		this.socket = io.connect();
		var that = this;

		this.socket.on('connect', function(){
			that.onConnect();
		});
		this.socket.on('message', function(data){
			that.onMessage(data);
		});
		this.socket.on('close', function(){
			that.onClose();
		});
		this.socket.on('disconnect', function(){
			that.onDisconnect();
		});

	},

	/**
	 * connect
	 */
	connect: function() {
		//this.socket.connect();
	},

	disconnect: function(){
		this.socket.disconnect();
	},

	send: function(message) {
		if (typeof message == "string")
			this.socket.send(message);
		else
			this.socket.json.send(message);
	},

	onConnect: function() {
		this.fireEvent('connect');
	},

	onDisconnect: function() {
		this.fireEvent('disconnect');
	},

	onClose: function() {
		this.fireEvent('close');
	},

	onMessage: function(message) {
		this.fireEvent('message', message);
	}
});
Ext.reg('App.util.Socketio', App.util.Socketio);
/**
 * Chat Controller
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regController('Viewport', {

	/**
	 * Index action
	 *
	 * @return {void}
	 */
	index: function() {
		var configStore = new App.Store.Config();
		configStore.load();

		if (configStore.getCount() > 0) {
			this.showChat();
		} else {
			this.showConfig();
		}
	},

	/**
	 * Show the chat view
	 *
	 */
	showChat: function() {
		Ext.dispatch({
			controller: 'Chat',
			action    : 'index'
		});
	},

	/**
	 * Show config view
	 *
	 */
	showConfig: function() {
		if (!this.viewConfig) {

			this.viewConfig = this.render({
				xtype: 'App.View.Config'

			});

			this.viewConfig.query('#backButton')[0].on(
				'tap',
				this.showChat,
				this
			);
		}
		this.application.viewport.setActiveItem(
			this.viewConfig,
			{
				type: 'slide',
				direction: 'left'
			}
		);
	}
});/**
 * Chat Controller
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regController('Chat', {
	/**
	 * Index action
	 *
	 * @return {void}
	 */
	index: function() {

		if (!this.socket) {
			this.initSocketConnection();
		}

		this.showChat();
	},

	/**
	 * init the socket connection to the node.js server
	 * using user settings
	 *
	 */
	initSocketConnection: function() {
		this.chatStore = new App.Store.Chat();
		this.configStore = Ext.StoreMgr.get('ConfigStore');
		var settings = this.configStore.getAt(0);

		this.socket = new App.util.Socketio(settings.get('server'), {port: 4000});
		this.socket.connect();

		// Event Listener
		this.socket.on(
			'connect',
			this.registerUser,
			this
		);

		this.socket.on(
			'message',
			this.addMessageToChatStore,
			this
		);

		App.on(
			'newMsg',
			this.sendMessageToServer,
			this
		);
	},

	sendMessageToServer: function(msg){
		this.socket.send(msg);
	},

	addMessageToChatStore: function(message) {
		this.chatStore.add(message);
	},

	registerUser: function() {
		var settings = this.configStore.getAt(0);
		var user = {
			nickname: settings.get('nickname'),
			gravatar: settings.get('gravatar')
		};
		this.socket.send(user);
	},

	/**
	 * Show chat view
	 */
	showChat: function() {
		if (!this.viewChat) {

			this.viewChat = this.render({
				xtype: 'App.View.Chat'
			});

			this.viewChat.query('#settingsButton')[0].on(
				'tap',
				this.showConfig,
				this
			);
		}
		this.application.viewport.setActiveItem(
			this.viewChat,
			{
				type: 'slide',
				direction: 'left'
			}
		);
	},

	/**
	 * Show config View
	 */
	showConfig: function() {
		Ext.dispatch({
			controller: 'Viewport',
			action    : 'showConfig'
		});
	}
});/**
 * Chat Message Model
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regModel('ChatMessage', {
	fields: [
		{
			name: 'user',
			type: 'string'
		},
		{
			name: 'message',
			type: 'string'
		}
	]
});/**
 * User Config Model
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regModel('Config', {
	fields: [
		{
			name: 'server',
			type: 'string'
		},
		{
			name: 'nickname',
			type: 'string'
		},
		{
			name: 'email',
			type: 'string'
		},
		{
			name: 'gravatar',
			type: 'string'
		}
	],

	proxy: {
		type: 'localstorage',
		id  : 'chat-settings'
	}

});/**
 * Chat Store
 *
 * @class App.Store.Chat
 * @namespace App.Store
 * @extends Ext.data.Store
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.ns('App.Store');
App.Store.Chat = Ext.extend(Ext.data.Store, {
	constructor:function(cfg){
		cfg = cfg || {};
		var config = Ext.apply(
			{
				model: 'ChatMessage',
				storeId: 'ChatStore'

			},
			cfg
		);
		App.Store.Chat.superclass.constructor.call(
			this,
			config
		);
	}
});
Ext.reg('App.Store.Chat', App.Store.Chat);/**
 * Config Store
 *
 * @class App.Store.Config
 * @namespace App.Store
 * @extends Ext.data.Store
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.ns('App.Store');
App.Store.Config = Ext.extend(Ext.data.Store, {
	constructor:function(cfg){
		cfg = cfg || {};
		var config = Ext.apply(
			{
				model: 'Config',
				storeId: 'ConfigStore'

			},
			cfg
		);
		App.Store.Config.superclass.constructor.call(
			this,
			config
		);
	}
});
Ext.reg('App.Store.Config', App.Store.Config);Ext.ns('App.View');

/**
 * Viewport
 *
 * @class App.View.Viewport
 * @namespace App.View
 * @extends Ext.Panel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Viewport = Ext.extend(Ext.Panel, {
	id        : 'viewport',
	layout    : 'card',
	fullscreen: true,


	initComponent: function() {
		var config = {};
		Ext.apply(this, config);
		App.View.Viewport.superclass.initComponent.call(this);

		this.addEventListener();
	},

	/**
	 * Add custom eventlistener to the component
	 *
	 * @return {void}
	 */
	addEventListener: function() {

		this.on(
			'afterrender',
			this.removeLoadingMask,
			this
		);
	},

	/**
	 * remove the loadingmask div from dom
	 */
	removeLoadingMask: function() {

		var loadmask = Ext.get('pre-loading-mask');
		if (loadmask) {
			Ext.Anim.run(loadmask, 'fade', {
				easing: 'out',
				duration: 500,
				after: function() {
					loadmask.remove();
				}
			});
		}
	}
});

Ext.reg('App.View.Viewport', App.View.Viewport);Ext.ns('App.View');

/**
 * Config View
 *
 * @class App..ViewConfig
 * @namespace App.View
 * @extends Ext.form.FormPanel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Config = Ext.extend(Ext.form.FormPanel, {

	// privat
	initComponent: function() {
		this.store = Ext.StoreMgr.get('ConfigStore');
		this.store.load();

		var config = {
			fullscreen: true,
			scroll: 'vertical',
			defaults: {

			},
			items: [
				{
					xtype: 'textfield',
					name : 'nickname',
					label: 'Nickname',
					placeHolder: 'nickname83'
				},
				{
					xtype: 'emailfield',
					name : 'email',
					label: 'Gravatar',
					placeHolder: 'gravatar@email-adress.com'
				},
				{
					xtype: 'textfield',
					name : 'server',
					label: 'Server',
					placeHolder: '192.168.178.50',
					listeners: {
						blur: function(field){
							Ext.Viewport.scrollToTop();
						}
					}
				}
			],
			dockedItems: [
				{
					dock: 'top',
					title: 'Settings',
					xtype: 'toolbar',
					items: [
						{
							ui: 'back',
							text: 'back',
							itemId: 'backButton'
						}
					]
				},
				{
					dock: 'top',
					xtype: 'panel',
					itemId: 'gravatar',
					html: '<img src="http://www.gravatar.com/avatar/?s=80&d=mm" height="80"/>',
					tpl: '<img src="http://www.gravatar.com/avatar/{gravatar}?s=80&d=mm"  height="80"/>'
				},
				{
					dock: 'bottom',
					xtype: 'toolbar',
					items: [

						{
							xtype: 'spacer'
						},
						{
							xtype: 'button',
							text: 'save',
							handler: this.saveAction,
							scope: this
						}
					]
				}
			]
		};
		Ext.apply(this, config);
		App.View.Config.superclass.initComponent.call(this);
		this.addEventListener();
	},

	/**
	 * Add custom event listener
	 */
	addEventListener: function(){
		this.on(
			'activate',
			this.loadSettings,
			this
		);
	},

	/**
	 * load user settings from store in the form
	 */
	loadSettings: function(){
		var conf = this.store.getAt(0);
		if (Ext.isObject(conf)) {
			this.load(conf);
			this.updateGravatarImg(conf);
		}
	},

	/**
	 * Save form user settings model in store
	 */
	saveAction: function() {
		var data = this.getValues();
		var conf = Ext.ModelMgr.create({
				nickname: data.nickname,
				email: data.email,
				gravatar: Ext.util.MD5(data.email),
				server: data.server
			},
			'Config'
		);
		this.updateGravatarImg(conf);
		this.store.removeAt(0);
		this.store.sync();
		this.store.add(conf);
		this.store.sync();
	},

	/**
	 * update the panel with the gravatar image
	 *
	 * @param {Object} Settings conf model
	 */
	updateGravatarImg: function(confModel){
		var panel = this.getComponent('gravatar');
		panel.update(confModel.data);
	}
});
Ext.reg('App.View.Config', App.View.Config);Ext.ns('App.View');

/**
 * View Chat
 *
 * @class App.View.Chat
 * @namespace App.View
 * @extends Ext.Panel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Chat = Ext.extend(Ext.Panel, {

	// privat
	initComponent: function() {
		this.store = Ext.StoreMgr.get('ChatStore');
		var config = {
			layout: 'fit',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					layout: 'fit',
					title: 'Chat',
					items: [
						{
							xtype: 'spacer'
						},
						{
							iconMask: true,
							ui: 'plain',
							iconCls: 'settings',
							itemId: 'settingsButton'
						}
					]
				},
				{
					xtype: 'toolbar',
					dock: 'bottom',
					itemId: 'msgToolbar',
					layout: 'fit',
					items: [
						{
							xtype: 'textfield',
							width: '96%',
							listeners: {
								blur: function(field){
									Ext.Viewport.scrollToTop();
									//Ext.Viewport.updateBodySize();
									App.fireEvent('newMsg', field.getValue());
									field.reset();

									//field.focus();
								}
							}
						}
					]
				}
			],
			items: [
				{
					xtype: 'list',
					itemId: 'chatList',
					itemTpl : new Ext.XTemplate(
						'<tpl if="xindex % 2 === 0">',
						'	<img class="odd" src="http://www.gravatar.com/avatar/{gravatar}?s=28&d=mm" />',
						'	<p class="triangle-right left"><span class="nickname">{nickname}:</span> {message}</p>',
						'</tpl>',
						'<tpl if="xindex % 2 === 1">',
						'	<p class="triangle-right right"><span class="nickname">{nickname}:</span> {message}</p>',
						'	<img class="even" src="http://www.gravatar.com/avatar/{gravatar}?s=28&d=mm" />',
						'</tpl>'
					),
					store: this.store,
					scroll: 'vertical'

				}
			]

		};
		Ext.apply(this, config);
		App.View.Chat.superclass.initComponent.call(this);
		this.addEventListener();
	},

	/**
	 * Add custom event listener
	 */
	addEventListener: function() {
		this.store.on(
			'datachanged',
			this.scrollToBottom,
			this
		);
	},

	/**
	 * Scroll to the button of the list
	 */
	scrollToBottom: function(){
		var list = this.getComponent('chatList');
		list.scroller.updateBoundary();
		list.scroller.scrollTo({x: 0, y:list.scroller.size.height}, true);
	}
});
Ext.reg('App.View.Chat', App.View.Chat);