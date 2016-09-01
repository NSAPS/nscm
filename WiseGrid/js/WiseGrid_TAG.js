
function initWiseGrid(objName, width, height)
{
	var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='/nscm/WiseGrid/WiseGrid_v5101.cab#version=5,1,0,1'";
	WISEGRID_TAG     = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
	WISEGRID_TAG     = WISEGRID_TAG + " CLASSID='CLSID:E8AA1760-8BE5-4891-B433-C53F7333710F'>";
	WISEGRID_TAG     = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='122670CA8BD07EF9CD21AC63B6EB6E08'>";
	WISEGRID_TAG     = WISEGRID_TAG + "</OBJECT>"
	document.write(WISEGRID_TAG);
}
 
 