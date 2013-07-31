_("com.hp.mit.mobiletvm", "VM", function(callback){
	this.canvas = this.initCanvas();
	if(this.canvas != null){
		callback.call(this);
	}
}, {
	initCanvas:function(){
		var canvas = document.createElement("canvas");
		canvas.width="320";
		canvas.height="480";
		document.body.appendChild(canvas);
		return canvas;
	},
	startActivity:function(activity){
		var viewTree = activity.getViewTree();
		viewTree.draw(this.canvas.getContext("2d"));
	}
})

_("com.hp.mit.mobiletvm", "ViewTree",function(){
	this.root = null;
},{
	draw:function(canvas){
		if(this.root!=null){
			this.root.draw(canvas);
		}	
	}
});

_("com.hp.mit.mobiletvm", "Activity", function(){
	this.viewTree = _("com.hp.mit.mobiletvm", "ViewTree");

},{
	getViewTree:function(){
		return this.viewTree;
	},
	setContentView:function(viewGroup){
		this.viewTree.root = viewGroup;
	}
});

_("com.hp.mit.mobiletvm", "View", function(){
	
},{
	draw:function(canvas){
		     this.onDraw(canvas);
	},
	onDraw:function(){
	}
});

_("com.hp.mit.mobiletvm", "ViewGroup", function(){
	_.getCls("com.hp.mit.mobiletvm", "View").call(this);
	this.children = [];
},_.extend({},_.getCls("com.hp.mit.mobiletvm", "View").prototype,{
	appendChild:function(child){
		this.children[this.children.length] = child;
	},
	draw:function(canvas){
		this.onDraw(canvas);
		this.drawChildren(canvas);
	},
	drawChildren:function(canvas){
		for(var i = 0; i < this.children.length; ++i){
			var child = this.children[i];
			child.draw(canvas);
		}
	}
}));

_("com.hp.mit.mobiletvm", "LinearLayout", function(){
	_.getCls("com.hp.mit.mobiletvm", "ViewGroup").call(this);
	
},_.extend({},_.getCls("com.hp.mit.mobiletvm", "ViewGroup").prototype,{
	
}));

_("com.hp.mit.mobiletvm", "TextView", function(text){
	this.text = text;

},_.extend({},_.getCls("com.hp.mit.mobiletvm", "View").prototype,{
	onDraw:function(canvas){
		canvas.fillText(this.text, 100, 100);
	}
}));
