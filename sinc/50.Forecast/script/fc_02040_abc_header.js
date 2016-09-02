displayOption = function(type) {
	if (type == 'CHART') {
		document.getElementById('chartArea').style.display = 'none';
   	    document.getElementById('searchArea').style.display = 'block';   
	} else {
		document.getElementById('mainTrArea').style.display = 'block';
		document.getElementById('tempBtArea').style.display = 'none';
		document.getElementById('tempTrArea').style.display = 'none';
	}	
}

searchIFrameData = function(service, search_type) {
	if(search_type == 'NEW') {	
		if ( document.frm.analy_grp.value == '' ) {
			alert("분석 기준그룹을 선택하십시요.");
			return false;
		} else if (document.frm.analy_target.value == '' ) {
			alert("분석 기준대상을 기입하십시요.");
			return false;
		} else if (document.frm.start.value == '' ) {
			alert("실적 시작일을 선택하십시요..");
			return false;
		} else if (document.frm.end.value == '' ) {
			alert("실적 완료일을 선택하십시요.");
			return false;
		} 
		
		document.frm.d_a_class.value = document.frm.a_class.value;
		document.frm.d_b_class.value = document.frm.b_class.value;
		document.frm.d_c_class.value = document.frm.c_class.value;
		
		document.getElementById('mainTrArea').style.display = 'none';
		document.getElementById('tempBtArea').style.display = 'block';
		document.getElementById('tempTrArea').style.display = 'block';	
			
	} else {
		document.getElementById('mainTrArea').style.display = 'block';
		document.getElementById('tempBtArea').style.display = 'none';
		document.getElementById('tempTrArea').style.display = 'none';
	}
	
	document.frm.search_type.value = search_type;	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
};

updateData = function(service) {
	if(!confirm("저장 하시겠습니까?")){
		return;
	}
	
	document.frm.search_type.value = '';
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

displayUOM = function(obj) {
	if (obj.value == 'VOLUME') {	    
		document.getElementById("qtyTrIf").style.display = '';
	} else {
		document.getElementById("qtyTrIf").style.display = 'none';
	}
}

setLevels = function(obj) {
	var levels = obj.value.split('!%!');
	document.frm.item_lv.value = levels[1];
	document.frm.site_lv.value = levels[2];
	document.frm.dc_lv.value = levels[3];
};

changeEndDate = function(obj) {	
	var start = obj.value;	
	var paramKeys = 'start';
	var paramCodes = start;
	var columns = 'YYYYMM';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_02040_abc_end', columns, "!%!", "/%/", setEndDate);
}

setEndDate = function(data) {	
	with(document.frm) {
		if (data == '' || data == null) {
			end.options[0] = new Option("-------", "");
			end.length = 1;
			
	    	return false;
	    }
	
	    var row = data.split("/%/");
	    var optionMaxIndex = row.length - 1;
	    if (optionMaxIndex == 0) {
			end.options[0] = new Option("-------", "");
			end.length = 1;
					
			return false;
		}
	
		for(var k = 0; k < row.length; k++) {	
			end.options[k] = new Option(row[k],row[k]);
			if (k == optionMaxIndex) {
				end.options[k].selected = true;
			}
			
		}
	  	end.length = optionMaxIndex;  
  	}

}