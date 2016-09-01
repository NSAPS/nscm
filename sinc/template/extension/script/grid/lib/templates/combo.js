Active.HTML.Combo =Active.System.HTML.subclass();

Active.HTML.Combo.create = function(){
	var obj = this.prototype;
	var _super = this.superclass.prototype;

	obj.options = new Array();
	obj.setTag("select");

	obj.addOption = function(val,txt) {
		var opts = new Array(2);
		opts[0] = val; opts[1] = txt;
		this.options[this.options.length] = opts;
	}

	obj.innerHTML = function(){
		var str = _super.innerHTML();
		for(var i=0; i < this.options.length; i++) {
			var opts = this.options[i];
			str += "<option value='" + opts[0] + "'>" + opts[1] + "</option>"
		}
		return str;
	}
}
Active.HTML.Combo.create();
