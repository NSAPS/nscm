function changeTarget(obj) {	
	var oper_type = obj.value;
	var paramKeys = 'oper_type';
	var paramCodes = oper_type;
	var columns = 'FCST_CODE!%!FCST_DESC';
	
	nongshim.getData(paramKeys, paramCodes, 'fcst_codes', columns, "!%!", "/%/", setTargetCB);
}

function setTargetCB(data) {
	if (data == '' || data == null) {
		document.frm.fcst_code.options[0] = new Option("---------------", "");
		document.frm.fcst_code.length = 1;
		
    	return false;
    }

    var row = data.split("/%/");
    var optionMaxIndex = row.length - 1;
    if (optionMaxIndex == 0) {
		document.frm.fcst_code.options[0] = new Option("-------", "");
		document.frm.fcst_code.length = 1;
				
		return false;
	}
	
	for(var k = 0; k < row.length; k++) {
		document.frm.fcst_code.options[k] = new Option(row[k].split('!%!')[1], row[k].split('!%!')[0]);
		if (k == optionMaxIndex) {
			document.frm.fcst_code.options[k].selected = true;
		}			
	}	
  	document.frm.fcst_code.length = optionMaxIndex;
  	
  	setFcstName(document.frm.fcst_code);  	
} 

setFcstName = function(obj) {
	for (var j = 0; j < obj.options.length; j++) {
		if ( obj.options[j].selected == true) {
		  document.frm.fcst_name.value = obj.options[j].text;
		}
	}	
};

setValues = function(cbObj, targetObj) {
 	var values = '';
 	var isFirst = true;
  	for( var i = 0; i < cbObj.options.length; i++ ) {
   		if( cbObj.options[i].selected == true ) {	
    		if ( isFirst ) {
    		    isFirst = false;
    			values = values + cbObj.options[i].value;			
    		} else {
    			values = values + ',' + cbObj.options[i].value;
    		}
   		}   		
  	}
  	targetObj.value = values; 
}

selectAll = function(chkBoxObj, cbBoxObj, targetObj) {
	var values = '';
 	var isFirst = true;
 	var bool = chkBoxObj.checked;
 	if(bool == true) {
		chkBoxObj.value = 'Y';
	} else {
		chkBoxObj.value = 'N';
	}
	for( var i = 0; i < cbBoxObj.options.length; i++ ) {
		cbBoxObj.options[i].selected = bool;
   		if( bool == true ) {	
    		if ( isFirst ) {
    		    isFirst = false;
    			values = values + cbBoxObj.options[i].value;    						
    		} else {
    			values = values + ',' + cbBoxObj.options[i].value;
    		}
   		} else {
   			values = '';
   		} 		
  	}
  	targetObj.value = values; 
}

check = function(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}	
}

openPopupWindow = function(popup_type){
	// popup 창의 input box 표시 data : search code
	
	var fcst_code = document.frm.fcst_code.value;
	if (fcst_code == null || fcst_code == '') {
		alert('계획명을 선택한 후, 클릭하십시요.');
		return false;
	}
	
	var w_size = 450;
	var h_size = 500;

	var service_url = "service.do?_moon_service=fc_common_codePopup_header&popup_type="+popup_type+"&fcst_code="+fcst_code+"&_moon_perpage=100&_moon_pagenumber=1";
	var newWin = window.open(service_url, "Code_Search", "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0");
	newWin.focus();
}