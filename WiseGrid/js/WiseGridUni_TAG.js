function initWiseGrid(objName, width, height)
{

	//var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='../../WiseGrid/WiseGridU_v5101.cab#version=5,1,0,1'";
	var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='/scm/WiseGrid/WiseGridU_v5101.cab#version=5,1,0,1'";
	WISEGRID_TAG     = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
	WISEGRID_TAG     = WISEGRID_TAG + " CLASSID='CLSID:0CE50171-51F4-4b1e-992B-4ECC8E0BE537'>";
	WISEGRID_TAG     = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='8BA4276E9CF2E8B2BBA5F636F384FD4A'>";
	WISEGRID_TAG     = WISEGRID_TAG + "</OBJECT>"
	
	document.write(WISEGRID_TAG);
}
