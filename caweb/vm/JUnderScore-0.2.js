var _ = function(){
	var ns=_.getNS(), cln = null, args = null, clz = null, clp=null;
	switch(arguments.length){
		case 1:
			if(typeof arguments[0]=="string"){
				cln = arguments[0];
			}else{
				JSLog.e("JUnderScore", 
						"The namespace["+arguments[0]+"] must be a string!");
				return;
			}
			break;
		case 2:
			if(	arguments[1] instanceof Array){
				if(typeof arguments[0]=="string"){
					cln = arguments[0];
					args = arguments[1];
				}else{
					JSLog.e("JUnderScore", 
							"The classname["+arguments[0]+"] must be a string!");
					return;
				}
			}else if(	typeof arguments[0] == "string" &&
					typeof arguments[1] == "string"	){
				ns = arguments[0];
				cln = arguments[1];
			}else{
				JSLog.e("JUnderScore", 
						"The namespace["+arguments[0]+"] and" +
						"The classname["+arguments[1]+"] " +
						" must be a string!");
				return;
			}
			break;
		case 3:
			if(	arguments[2] instanceof Array){
				if(	typeof arguments[0] == "string" &&
						typeof arguments[1] == "string"	){
					ns = arguments[0];
					cln = arguments[1];
					args = arguments[2];
				}else{
					JSLog.e("JUnderScore", 
							"The namespace["+arguments[0]+"] and " +
							"The classname["+arguments[1]+"] " +
							" must be a string!");
					return;
				}
			}else if(typeof arguments[0] == "string" &&
					typeof arguments[1] == "string" &&
					typeof arguments[2] == "function")	{
				ns = arguments[0];
				cln = arguments[1],
				    clz = arguments[2];
				if(window[ns] == null) window[ns]={};
				window[ns][cln]=clz;
				return;
			}else{
				JSLog.e("JUnderScore", 
						"The namespace["+arguments[0]+"] and " +
						"The classname["+arguments[1]+"]" +
						" must be a string,"+
						"The classfun["+arguments[2]+"]" +
						" must be a function");
				return;
			}
			break;
		case 4:
			if(typeof arguments[0] == "string" &&
					typeof arguments[1] == "string" &&
					typeof arguments[2] == "function" &&
					typeof arguments[3] == "object"
			  ){
				ns = arguments[0];
				cln = arguments[1];
				clz = arguments[2];
				clp = arguments[3];
				if(window[ns] == null) window[ns]={};
				window[ns][cln]=clz;
				if(clp != null){
					clz.prototype = clp;
				}
				return;
			}else{
				JSLog.e("JUnderScore", 
						"The namespace["+arguments[0]+"] and " +
						"The classname["+arguments[1]+"]" +
						" must be a string,"+
						"The class function["+arguments[2]+"]" +
						" must be a function,"+
						"The class prototype["+arguments[3]+"]" +
						" must be an object");	
				return;
			}
			break;
	}
	if(typeof ns == "string"){
		ns = window[ns];
	}
	if(ns != null && typeof ns == "object" && cln!=null){
		var cls = ns[cln];
		if(typeof cls =="function"){
			var tmp = function (){
				this._class = cls;
				if(arguments.length > 0){
					cls.apply(this, arguments[0]);
				}else{
					cls.apply(this);
				}
			};
			tmp.prototype = cls.prototype;
			if(args==null) {
				return new tmp();
			}else{
				return new tmp(args);
			} 
		}
	}
	return {};
};

(function(context){
	var curNS = window;
	context.usingNS = function(namespace){
		if(typeof namespace == "string"){
			curNS = window[namespace];
			if(curNS == null){
				JSLog.e("JUnderScore", "The namespace ["+ namespace +"] don't exist!");
				curNS = window;
			}
		}else if(typeof namespace == "object"){
			if(namespace == null){
				JSLog.e("JUnderScore", "The namespace ["+ namespace +"] is null!");
			}else{
				curNS = namespace;
			}
		}else{
			JSLog.e("JUnderScore", "The namespace ["+ namespace +"] is an unallowable type!");
		}		
	};
	context.getNS = function(){
		return curNS;
	};

	function getClass(){
		var ns=curNS, cln = null;
		switch(arguments.length){
			case 1:
				if(typeof arguments[0] == "string"){
					cln = arguments[0];
					var cls= curNS[cln];
					if(cls != null) return cls;
					else{
						return "The class name ["+ arguments[0] +"]  don't exist!";
					}
				}else{
					return "The class name ["+ arguments[0] +"] isn't a string!";
				}
				break;
			case 2:
				if(	typeof arguments[1] == "string"){
					if(typeof arguments[0] == "string"){
						ns = window[arguments[0]];
						if(ns == null){
							return "The name space ["+ arguments[0] +"]  don't exist!";
						}
					}else if(typeof arguments[0] == "object"){
						if(arguments[0] == null){
							return "The name space is null!";
						}
						ns = arguments[0];
					}else{
						return "The namespace ["+ arguments[0] +"] is an unallowable type!";
					}
					cln = arguments[1];
					var cls= ns[cln];
					if(cls != null) return cls;
					else{
						return "The class name ["+ arguments[0] +"," + arguments[1] + "]  don't exist!";
					}
				}else{
					return "The class name ["+ arguments[0] +"," + arguments[1] + "] isn't a string!";
				}
				break;
		}
		return "The arguments should be [class] or [namespace, class]";
	};

	context.getCls = function(){
		var cls = getClass.apply(this, arguments);
		if(typeof cls == "string"){
			JSLog.e("JUnderScore", cls);
		}else{
			return cls;
		}
	};

	context.assertCls = function(){
		var cls = getClass.apply(this, arguments);
		if(typeof cls == "string") cls = null;
		if(cls == null){
			var args = [];
			for(var i = 0; i < arguments.length; ++i){
				args[args.length] = arguments[i];
			}
			JSLog.assert(false, "Assert class [" + args + "] fail!");
		}
	};

	context.checkCls=function(){
		var cls = getClass.apply(this, arguments);
		if(typeof cls == "string") cls = null;
		if(cls == null){
			var args = [];
			for(var i = 0; i < arguments.length; ++i){
				args[args.length] = arguments[i];
			}
			JSLog.warn("JUnderScore", "Check class [" + args + "] fail!");	
		}
	};

	context.singleton=function(){
		var cls = getClass.apply(this, arguments);
		if(typeof cls == "string") cls = null;
		if(cls == null){
			var args = [];
			for(var i = 0; i < arguments.length; ++i){
				args[args.length] = arguments[i];
			}
			JSLog.warn("JUnderScore", "singleton class [" + args + "] fail!");	
		}else{
			if(cls._instance == null) cls._instance = new cls();
			return cls._instance;
		}		
	};

	context.extend = function() {
		var src, copyIsArray, copy, name, options, clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

})(_);
