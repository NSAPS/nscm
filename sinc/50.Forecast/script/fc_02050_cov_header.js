displayOption = function() {
	document.getElementById('mainTrArea').style.display = 'block';
	document.getElementById('tempBtArea').style.display = 'none';
	document.getElementById('tempTrArea').style.display = 'none';
}

searchIFrameData = function(service, searchType) {
	if(searchType == 'NEW') {	
		if ( document.frm.analysis_group.value == '' ) {
			alert("분석 기준그룹을 선택하십시요.");
			return false;
		} else if (document.frm.analyze_by.value == '' ) {
			alert("분석 기준대상을 기입하십시요.");
			return false;
		} else if (document.frm.start_date.value == '' ) {
			alert("실적 시작을 선택하십시요..");
			return false;
		} else if (document.frm.end_date.value == '' ) {
			alert("실적 마감을 선택하십시요.");
			return false;
		} else if (document.frm.analysis_method.value == '' ) {
			alert("분석 방법을 선택하십시요.");
			return false;
		} else if (document.frm.cov_index.value == '' ) {
			alert("COV Index를 기입하십시요.");
			return false;
		} 
	
		document.frm.d_cov_index.value = document.frm.cov_index.value;
		document.getElementById('mainTrArea').style.display = 'none';
		document.getElementById('tempBtArea').style.display = 'block';
		document.getElementById('tempTrArea').style.display = 'block';
		
	} else {
		document.getElementById('mainTrArea').style.display = 'block';
		document.getElementById('tempBtArea').style.display = 'none';
		document.getElementById('tempTrArea').style.display = 'none';
	}
	
	iframe.frm.item_lv.value = document.frm.item_lv.value; 
	iframe.frm.site_lv.value = document.frm.site_lv.value;
	iframe.frm.dc_lv.value = document.frm.dc_lv.value;
	iframe.frm.analysis_group.value = document.frm.analysis_group.value; 
	iframe.frm.analyze_by.value = document.frm.analyze_by.value;
	iframe.frm.start_date.value = document.frm.start_date.value;
	iframe.frm.end_date.value = document.frm.end_date.value;
	iframe.frm.analysis_method.value = document.frm.analysis_method.value;
	iframe.frm.cov_index.value = document.frm.cov_index.value;
	iframe.frm.searchType.value = searchType;
	document.frm.searchType.value = searchType;
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
};

setThisTemp = function(temp, obj) {	
	for (var j = 0; j < obj.options.length; j++) {
		if ( obj.options[j].selected == true) {
			temp.value = obj.options[j].text;
		}
	}	
}

setLevels = function(obj) {
	var levels = obj.value.split('!%!');
	document.frm.item_lv.value = levels[1];
	document.frm.site_lv.value = levels[2];
	document.frm.dc_lv.value = levels[3];
};

changeEndDate = function(obj) {	
	var start_date = obj.value;
	
	var paramKeys = 'start_date';
	var paramCodes = start_date;
	var columns = 'YYYYMM';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_02050_cov_end', columns, "!%!", "/%/", setEndDate);
}

setEndDate = function(data) {
	
	with(document.frm) {
		if (data == '' || data == null) {
			end_date.options[0] = new Option("-------", "");
			end_date.length = 1;
			
	    	return false;
	    }
	
	    var row = data.split("/%/");
	    var optionMaxIndex = row.length - 1;
	    if (optionMaxIndex == 0) {
			end_date.options[0] = new Option("-------", "");
			end_date.length = 1;
					
			return false;
		}
		document.frm.d_end_date.value = row[0];
		for(var k = 0; k < row.length; k++) {	
			end_date.options[k] = new Option(row[k],row[k]);
			if (k == optionMaxIndex) {
				end_date.options[k].selected = true;
			}
			
		}
	  	end_date.length = optionMaxIndex;  
  	}

}

splitCodeName = function(codeNameObj, tCodeObj, codeObj, nameObj) {
	if (codeNameObj.value == '') {
		tCodeObj.value = '';
		codeObj.value = '';
		nameObj.value = '';
		
	} else {
		var splitedArray = codeNameObj.value.split('-');
		tCodeObj.value = splitedArray[0];
		codeObj.value = splitedArray[0];
		nameObj.value = splitedArray[1];
	}	
}

enterSearchCodeName = function(codeObj, nameObj, srcType) {	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			searchCodeName(codeObj, nameObj, srcType);
		}
	}	
}

searchCodeName = function(codeObj, nameObj, srcType) {
	var ajax_code = codeObj.value;
	var ajax_name = nameObj.value;
	
	var paramKeys = '';
	var paramCodes = '';
	
	if (ajax_code != '' && ajax_name != '') {
		paramKeys += 'ajax_code!%!ajax_name';
	    paramCodes += ajax_code+'!%!'+ajax_name;
	    
	} else if (ajax_code != '' && ajax_name == '') {
		paramKeys += 'ajax_code';
	    paramCodes += ajax_code;
	    
	} else if (ajax_code == '' && ajax_name != '') {
		paramKeys += 'ajax_name';
	    paramCodes += ajax_name;
	}
	var columns = 'CODE!%!NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01040_items', columns, "!%!", "/%/", setItemCB);
}

setItemCB = function(data) {
	with(document.frm) {
		setComboBox(data, selected_item);
		splitCodeName(selected_item, item_cd, item_code, item_name);
  	}
}

setComboBox = function(data, obj) {
	with(document.frm) {
		if (data == '' || data == null) {
			obj.options[0] = new Option("-------------------------------", "");
			obj.length = 1;
			
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			obj.options[0] = new Option("-------------------------------", "");
			obj.length = 1;				
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    obj.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				obj.options[k].selected = true;
			}			
		}
		
	  	obj.length = optionMaxIndex;	  	 
  	}
}