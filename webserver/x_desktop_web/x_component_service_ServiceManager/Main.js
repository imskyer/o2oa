MWF.xDesktop.requireApp("service.ServiceManager", "package", null, false);
MWF.xDesktop.requireApp("Selector", "package", null, false);
MWF.require("MWF.widget.Identity", null,false);
MWF.xApplication.process = MWF.xApplication.process || {};
MWF.xApplication.process.ProcessManager = MWF.xApplication.process.ProcessManager || {};
MWF.xDesktop.requireApp("process.ProcessManager", "", null, false);
MWF.xApplication.service = MWF.xApplication.service || {};
MWF.xApplication.service.ServiceManager.Main = new Class({
	Extends: MWF.xApplication.process.ProcessManager.Main,
	Implements: [Options, Events],

	options: {
		"style": "default",
		"name": "service.ServiceManager",
		"icon": "icon.png",
		"width": "1100",
		"height": "700",
		"title": MWF.xApplication.service.ServiceManager.LP.title
	},
	onQueryLoad: function(){
		this.lp = MWF.xApplication.service.ServiceManager.LP;
		this.currentContentNode = null;
        this.restActions = MWF.Actions.get("x_program_center");
	},
    loadApplication: function(callback){
        this.createNode();
        this.loadApplicationContent();
        if (callback) callback();
    },
    loadStartMenu: function(callback){
        this.startMenuNode = new Element("div", {
            "styles": this.css.startMenuNode
        }).inject(this.node);

        this.menu = new MWF.xApplication.service.ServiceManager.Menu(this, this.startMenuNode, {
            "onPostLoad": function(){
                if (this.status){
                    if (this.status.navi!=null){
                        this.menu.doAction(this.menu.startNavis[this.status.navi]);
                    }else{
                        this.menu.doAction(this.menu.startNavis[0]);
                    }
                }else{
                    this.menu.doAction(this.menu.startNavis[0]);
                }
            }.bind(this)
        });
        this.addEvent("resize", function(){
            if (this.menu) this.menu.onResize();
        }.bind(this));
    },
    clearContent: function(){
        if (this.agentConfiguratorContent){
            if (this.agentConfigurator) delete this.agentConfigurator;
            this.agentConfiguratorContent.destroy();
            this.agentConfiguratorContent = null;
        }
        if (this.invokeConfiguratorContent){
            if (this.invokeConfigurator) delete this.invokeConfigurator;
            this.invokeConfiguratorContent.destroy();
            this.invokeConfiguratorContent = null;
        }
    },


    selectConfig: function(){
        this.clearContent();
        this.selectConfiguratorContent = new Element("div", {
            "styles": this.css.rightContentNode
        }).inject(this.node);
        this.loadSelectConfig();
    },
    loadSelectConfig: function(){
        MWF.xDesktop.requireApp("service.ServiceManager", "SelectExplorer", function(){
            this.selectConfigurator = new MWF.xApplication.service.ServiceManager.SelectExplorer(this.selectConfiguratorContent, this.restActions);
            this.selectConfigurator.app = this;
            this.selectConfigurator.load();
        }.bind(this));
    },

    agentConfig: function(){
        this.clearContent();
        this.agentConfiguratorContent = new Element("div", {
            "styles": this.css.rightContentNode
        }).inject(this.node);
        this.loadAgentConfig();
    },
    loadAgentConfig: function(){
        MWF.xDesktop.requireApp("service.ServiceManager", "AgentExplorer", function(){
            this.agentConfigurator = new MWF.xApplication.service.ServiceManager.AgentExplorer(this.agentConfiguratorContent, this.restActions);
            this.agentConfigurator.app = this;
            this.agentConfigurator.load();
        }.bind(this));
    },

    invokeConfig: function(){
        this.clearContent();
        this.invokeConfiguratorContent = new Element("div", {
            "styles": this.css.rightContentNode
        }).inject(this.node);
        this.loadInvokeConfig();
    },
    loadInvokeConfig: function(){
        MWF.xDesktop.requireApp("service.ServiceManager", "InvokeExplorer", function(){
            this.invokeConfigurator = new MWF.xApplication.service.ServiceManager.InvokeExplorer(this.invokeConfiguratorContent, this.restActions);
            this.invokeConfigurator.app = this;
            this.invokeConfigurator.load();
        }.bind(this));
    },
    recordStatus: function(){
        var idx = null;
        if (this.menu.currentNavi){
            idx = this.menu.startNavis.indexOf(this.menu.currentNavi);
        }
        return {"navi": idx};
    }
});

MWF.xApplication.service.ServiceManager.Menu = new Class({
    Extends: MWF.xApplication.process.ProcessManager.Menu,
    Implements: [Options, Events]
});