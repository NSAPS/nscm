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

Active.Templates.Box = Active.System.Template.subclass();

Active.Templates.Box.create = function(){

/****************************************************************

	Generic 'box' template.

*****************************************************************/

	var obj = this.prototype;

//	------------------------------------------------------------

	obj.setClass("templates", "box");
	obj.setClass("box", "normal");

//	------------------------------------------------------------

	var box = new Active.HTML.DIV;
	box.setClass("box", "item");
	obj.setContent("box", box);

//	------------------------------------------------------------

};

Active.Templates.Box.create();