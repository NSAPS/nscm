
function initWiseGrid(objName, width, height)
{
alert(11);
 	
	var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='/nscm/WiseGrid/WiseGrid.cab#version=4,6,0,2'";
	WISEGRID_TAG     = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
	WISEGRID_TAG     = WISEGRID_TAG + " CLASSID='CLSID:E8AA1760-8BE5-4891-B433-C53F7333710F'>";
	WISEGRID_TAG     = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='BD27D1EE1642351F87A71282B7290FBD, CD99A87436C296726176414C93B74A4C'>";
	WISEGRID_TAG     = WISEGRID_TAG + "</OBJECT>"
	
	document.write(WISEGRID_TAG);
}
 
 