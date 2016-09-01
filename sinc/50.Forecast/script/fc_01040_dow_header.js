recreateDow = function(service) {
	/*if(document.frm.item_cd.value == '') {
		alert('품목을 선택하십시요.');
		return;
	}
	if(document.frm.site_cd.value == '') {
		alert('영업지점을 선택하십시요.');
		return;
	}
	if(document.frm.dc_cd.value == '') {
		alert('배송지점을 선택하십시요.');
		return;
	}*/
	if(document.frm.start_month.value == '') {
		alert('시작월을 선택하십시요.');
		return;
	}
	if(document.frm.end_month.value == '') {
		alert('마감월을 선택하십시요.');
		return;
	}
	if(document.frm.max_rate.value == '') {
		alert('최대허용변폭을 기입하십시요.');
		return;
	}
	
	if(!confirm('해당 조건에 대하여 재생성 합니다.')){
		return;
	}
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();	
}

updateData = function(service) {
	if (Number(iframe.document.frm.isChecked.value) < 1) {
		alert('선택된 행이 존재하지 않습니다.');
		return;
	}
	
	if(!confirm('변경된 행들을 저장 합니다.')) {
		return;
	}
	iframe.document.frm._moon_service.value = service; 
	iframe.document.frm.action = "service.do"; 
	iframe.document.frm.target = "_self";
	iframe.document.frm.submit();
	
	searchIFrameData('fc_01040_dow_tailer');
};

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
	
	if (srcType == 'ITEM') {
		nongshim.getData(paramKeys, paramCodes, 'fc_01040_items', columns, "!%!", "/%/", setItemCB);
		
	} else if (srcType == 'SITE') {
		nongshim.getData(paramKeys, paramCodes, 'fc_01040_sites', columns, "!%!", "/%/", setSiteCB);
		
	} else {
		nongshim.getData(paramKeys, paramCodes, 'fc_01040_dc', columns, "!%!", "/%/", setDcCB);
	}	
}

setItemCB = function(data) {
	with(document.frm) {
		setComboBox(data, selected_item);
		splitCodeName(selected_item, item_cd, item_code, item_name);
  	}
}

setSiteCB = function(data) {
	with(document.frm) {
		setComboBox(data, selected_site);
		splitCodeName(selected_site, site_cd, site_code, site_name);
  	}
}

setDcCB = function(data) {
	with(document.frm) {
		setComboBox(data, selected_dc);
		splitCodeName(selected_dc, dc_cd, dc_code, dc_name);
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

changeEnd = function(obj) {	
	var start_month = obj.value; 
	var paramKeys = 'start_month';
	var paramCodes = start_month;
	var columns = 'END_MONTH';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01040_end_month', columns, "!%!", "/%/", setEndCB);
}

setEndCB = function(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			end_month.options[0] = new Option("선택(재생성시)", "");
			end_month.length = 1;
			
	    	return false;
	    }
	
	    var row = data.split("/%/");
	    var optionMaxIndex = row.length - 1;
	    if (optionMaxIndex == 0) {
			end_month.options[0] = new Option("선택(재생성시)", "");
			end_month.length = 1;
					
			return false;
		}
		for(var k = 0; k < row.length; k++) {	
			end_month.options[k] = new Option(row[k],row[k]);
			if (k == optionMaxIndex) {
				end_month.options[k].selected = true;
			}
			
		}
	  	end_month.length = optionMaxIndex;
  	}
}