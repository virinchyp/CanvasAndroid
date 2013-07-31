(function(){
	var level = 1;
	
	function getMsg(tagName, msg){
		tagName += ":";
		var append = 11 - tagName.length;
		while(append > 0){
			tagName += " ";
			--append;
		}
		return tagName +  msg;
	}
	
	function verbose(tagName, msg){
		if(level > JSLog.LL_VERBOSE) return;
		if(typeof console != "undefined"){
			if(console.log){
				console.log(getMsg(tagName, msg));
			}
		}
	};
	
	function debug(tagName, msg){
		if(level > JSLog.LL_DEBUG) return;
		if(typeof console != "undefined"){
			if(typeof Context != "undefined" && Context.DEBUG_MODE == false){
				return;
			}
			if(console.debug){
				console.debug(getMsg(tagName, msg));
			}else if(console.log){
				console.log(getMsg(tagName, msg));
			}
		};		
	};
	
	function ddir(tagName, obj){
		if(level > JSLog.LL_DEBUG) return;
		if(typeof console != "undefined"){
			if(typeof Context != "undefined" && Context.DEBUG_MODE == false){
				return;
			}
			debug(tagName, "the struct of " + obj + " is");
			dir(obj);
		};		
	}
	
	function info(tagName, msg){
		if(level > JSLog.LL_INFO) return;
		if(typeof console != "undefined"){
			if(console.info){
				console.info(getMsg(tagName, msg));
			}else if(console.log){
				console.log(getMsg(tagName, msg));
			}
		}	
	};
	
	function warn(tagName, msg){
		if(level > JSLog.LL_WARN) return;
		if(typeof console != "undefined"){
			if(console.warn){
				console.warn(getMsg(tagName, msg));
			}else if(console.log){
				console.log(getMsg(tagName, msg));
			}
		}		
	};
	
	function error(tagName, msg){
		if(level > JSLog.LL_ERROR) return;
		if(typeof console != "undefined"){
			if(console.error){
				console.error(getMsg(tagName, msg));
			}else if(console.log){
				console.log(getMsg(tagName, msg));
			}
		}	
	};
	
	function assert(expression, msg){
		if(level > JSLog.LL_ASSERT) return;
		if(typeof console != "undefined" && console.assert){
				console.assert(expression, msg);
		}else if(expression == false){
			throw(new Error("Assertion failed:" + msg));
		}
	};
	
	function dir(object){
		if(typeof console != "undefined"){
			if(console.dir){
				console.dir(object);
			}else if(console.log){
				if($.browser.webkit){
					console.log(object);
				}else{
					for(var key in object){
						console.log(getMsg(key, object[key]));
					}
				}
			}
		}			
	};
	
	function setLogLevel(loglevel){
		level = loglevel;
	}
	
	JSLog = {
			"LL_VERBOSE" : 2,
			"LL_DEBUG" : 3,
			"LL_INFO" : 4,
			"LL_WARN" : 5,
			"LL_ERROR" : 6,
			"LL_ASSERT" : 7,
			"setLogLevel":setLogLevel,
			"verbose":verbose,
			"v":verbose,
			"debug":debug,
			"d":debug,
			"info":info,
			"i":info,
			"warn":warn,
			"w":warn,
			"error":error,
			"e":error,
			"assert":assert,
			"a":assert,
			"dir":dir,
			"ddir":ddir,
			"dd":ddir
		};
})();
