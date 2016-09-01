/*****************************************************************

	ActiveWidgets Grid 0.3.0 (Free Edition).
	Copyright (C) 2004 ActiveWidgets Ltd. All Rights Reserved. 
	More information at http://www.activewidgets.com/

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

*****************************************************************/

Active.System.Object = function(){};

Active.System.Object.subclass = function(){

	var constructor = function(){this.init()};
	for (var i in this) {constructor[i] = this[i]}
	constructor.prototype = new this();
	constructor.superclass = this;
	return constructor;
};

Active.System.Object.handle = function(error){
	throw(error);
};

Active.System.Object.create = function(){

/****************************************************************

	Generic base class - root of the ActiveUI class hierarchy.

*****************************************************************/

	var obj = this.prototype;

/****************************************************************

	Creates an object clone.

	@return		A new object.

	The clone function creates a fast copy of the object. Instead of
	physically copying each property and method of the source object -
	it creates a clone as a ‘subclass’ of the source object, i.e.
	properties and methods  are inherited from the source object into
	the clone.

	Note that the clone continues to be dependent on the source
	object. Changes in the source object property or method will
	affect all the clones unless this property is already overwritten
	in the clone object itself.

*****************************************************************/

	obj.clone = function(){
		if (this._clone.prototype!==this) {
			this._clone = function(){this.init()};
			this._clone.prototype = this;
		}
		return new this._clone();
	};

	obj._clone = function(){};

/****************************************************************

	Initializes the object.

	@remarks

	This method normaly contains all object initialization code
	(instead of the constructor function).	Constructor function is
	the same for all objects and only contains object.init() call.

*****************************************************************/

	obj.init = function(){
		// overload
	};

/****************************************************************

	Handles exceptions in the ActiveUI methods.

	@param	error (Error) Error object.

	The default error handler just throws the same exception to the
	next level. Overload this function to add your own diagnostics
	and error logging.

*****************************************************************/

 	obj.handle = function(error){
		throw(error);
	};

/****************************************************************

	Calls a method after a specified time interval has elapsed.

	@param	handler (Function) Method to call.
	@param	delay (Number) Time interval in milliseconds.
	@return An identifier that can be used with window.clearTimeout
			to cancel the current method call.

	This method has the same effect as window.setTimeout except that
	the function will be evaluated not as a global function but
	as a method of the current object.

*****************************************************************/

	obj.timeout = function(handler, delay){
		var self = this;
		var wrapper = function(){handler.call(self)};
		return window.setTimeout(wrapper, delay ? delay : 0);
	};

/****************************************************************

	Converts object to string.

	@return Text or HTML representation of the object.

	This method is overloaded in ActiveUI subclasses.

*****************************************************************/

 	obj.toString = function(){
		return "";
	};

};

Active.System.Object.create();

