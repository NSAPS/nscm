	/**************************************************************** 
	    Select Cell template. 
	*****************************************************************/ 
	Active.System.Template.Select = Active.System.Template.subclass(); 
	
	Active.System.Template.Select.create = function(){ 
	
	    var obj = this.prototype; 
	    var _super = this.superclass.prototype; 
	    var _options; 
	
	    obj.init = function(){ 
	        // do your stuff 
	        _super.init.call(this); 
	    }; 
	
	    obj.setTag("select"); 
	    obj.setClass("templates", "input"); 
	    obj.setClass("input","select"); 
	    obj.setClass("select", function(){return this.getColumnProperty("index")}); 
	
	
	    obj.getName = function() { 
	        var r = this.getRowProperty("index"); 
	        var c = this.getColumnProperty("index"); 
	        if (!r) r = 0; 
	        if (!c) c = 0; 
	        return "item_"+r+"_"+c; 
	    } 
	
	    obj.setAttribute("name", function(){ return this.getName(); } ); 
	
	
	    obj._options = new Array(); 
	
	    obj.addOption = function( text, value  ) { 
	        obj._options.push( new Array( value ? value : text, text) ); 
	    } 
	    obj.clearOptions = function() { 
	        obj._options = new Array(); 
	    } 
	    obj.getOptions = function() { 
	        return obj._options; 
	    } 
	
	    obj.setContent( "options", function() { 
	        var optionsHTML = new Array(); 
	        var textVal = this.getItemProperty("text"); 
	        var foundMe = false; 
	        for( i=0; i< obj._options.length; i++ ) { 
	            var oTag = new Active.System.HTML(); 
	            var val = obj._options[i][0]; 
	            oTag.setTag("option"); 
	            oTag.setAttribute( "value", val ); 
	            oTag.setContent("text",obj._options[i][1]); 

	            if ( val==textVal ) { 
	                oTag.setAttribute( "selected","true" ); 
	                foundMe = true; 
	            } else if(textVal =='' && val == -1){
	            	  oTag.setAttribute( "selected","true" ); 
	                foundMe = true; 
	            }
	            optionsHTML.push( oTag ); 
	        } 
	        //if (!foundMe) { 
	        //    optionsHTML.push("<option value=\""+textVal+"\" selected=\"true\">"+textVal+"</option>"); 
	        //} 
	        return optionsHTML.join(""); 
	    }); 
	
	
	    obj.setEvent( "onchange", function(event) { this.onChange( event ); } ); 
	
	    obj.onChange = function( event ) { 
	        var select = event.srcElement; 
	        var optArray = select.options; 
	        var index = select.selectedIndex; 
	        var sOption = optArray[index]; 
	        var sVal = sOption.value ? sOption.value : sOption.innerHTML; 
	        var name = select.name; 
	        var row = this.getRowProperty("index"); 
	        var col = this.getColumnProperty("index"); 
	        var originalVal = this.getItemProperty("text"); 
	        if (sVal!=originalVal) { 
	            this.onChangeAction( sVal, name, row, col ); 
	        } 
	    } 
	
	    obj.onChangeAction = function( newVal, name, row, col ) { 
	        if (this.__debug) alert("Changed "+name+" ("+row+":"+col+") to "+newVal ); 
	    } 
	
	}; 
	Active.System.Template.Select.create(); 