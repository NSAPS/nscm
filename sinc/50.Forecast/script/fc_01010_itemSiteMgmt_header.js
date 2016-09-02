updateData = function(service) {
	var tabPageDisplayStyle = document.getElementById('tabPage2').style.display;
	if (tabPageDisplayStyle == 'none') {
		alert('현재 탭(Tab)에서는 등록 기능을 지원하지 않습니다.');
		return;
	}	
	
	if (document.frm.class_hrchy_code.value == '') {
		alert('구분을 선택하여 주십시요.');
		return;
	}	
	if (document.frm.class_code.value == '') {
		alert('Class 코드를 기입하십시요.');
		return;
	}	
	if (document.frm.class_name.value == '') {
		alert('Class 이름을 기입하십시요.');
		return;
	}
	
	if(!confirm("저장 하시겠습니까?")){
		return;
	}
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "_self";
	document.frm.submit();
}

deleteData = function(service) {
	var tabPageDisplayStyle = document.getElementById('tabPage3').style.display;
	if (tabPageDisplayStyle == 'none') {
		alert('현재 탭(Tab)에서는 등록 기능을 지원하지 않습니다.');
		return;
	}	
	
	if (document.frm.hrchy_ctl_code.value == '') {
		alert('구분을 선택하여 주십시요.');
		return;
	}	
	if (document.frm.hrchy_class_code.value == '') {
		alert('Class 명을 선택하여 주십시요.');
		return;
	}	
	
	if(!confirm("해당 Class를 삭제 하시겠습니까?")){
		return;
	}	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "_self";
	document.frm.submit();	
}

changeLevel = function(obj) {
	var hrchy_code = obj.value;
	var paramKeys = 'hrchy_code';
	var paramCodes = hrchy_code;
	var columns = 'CAT02!%!CAT05';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_select_levels', columns, "!%!", "/%/", setLevelCB);
}

setLevelCB = function(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			select_level.options[0] = new Option("-------", "");
			select_level.length = 1;
			
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			select_level.options[0] = new Option("-------", "");
			select_level.length = 1;				
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    select_level.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				select_level.options[k].selected = true;
			}			
		}
		
	  	select_level.length = optionMaxIndex;  
	  	changeItemSite();	 
  	}
}

changeItemSite = function() {
	var hrchy_code = document.frm.hrchy_code.value;
	var select_level = document.frm.select_level.value;
	var paramKeys = 'hrchy_code!%!select_level';
	var paramCodes = hrchy_code+'!%!'+select_level;
	var columns = 'HID!%!HID_NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_item_sites', columns, "!%!", "/%/", setItemSiteCB);
}

enterSelectItemSite = function() {	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			selectItemSite();
		}
	}	
}

selectItemSite = function() {
	var hrchy_code = document.frm.hrchy_code.value;
	var select_level = document.frm.select_level.value;
	
	if (hrchy_code == '') {
		alert('구분을 선택하십시요.');
		return;
	}
	if (select_level == '') {
		alert('조회계층을 선택하십시요.');
		return;
	}
	
	var item_site_code = document.frm.item_site_code.value;
	var item_site_name = document.frm.item_site_name.value;
	
	var paramKeys = 'hrchy_code!%!select_level';
	var paramCodes = hrchy_code+'!%!'+select_level;	
	if (item_site_code != '') {
		paramKeys += '!%!item_site_code';
	    paramCodes += '!%!'+item_site_code;
	}
	
	if (item_site_name != '') {
		paramKeys += '!%!item_site_name';
	    paramCodes += '!%!'+item_site_name;
	}

	var columns = 'HID!%!HID_NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_item_sites', columns, "!%!", "/%/", setItemSiteCB);
}

setItemSiteCB = function(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			item_site.options[0] = new Option("-------------------------------", "");
			item_site.length = 1;
			
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			item_site.options[0] = new Option("-------------------------------", "");
			item_site.length = 1;				
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    item_site.options[k] = new Option(cols[0]+' - '+cols[1], cols[0]+'!%!'+cols[1]);			
			if (k == optionMaxIndex) {
				item_site.options[k].selected = true;
			}
			
		}
	  	item_site.length = optionMaxIndex;  
	  	setItemSiteAttribute();	 	
  	}
}

setItemSiteAttribute = function() {
	var itemSite = document.frm.item_site.value;
	var splitData = itemSite.split('!%!');
	document.frm.item_site_code.value = splitData[0];
	document.frm.item_site_name.value = splitData[1];
}

getNewClassCode = function(obj) {
	var class_hrchy_code = obj.value;
	var paramKeys = 'class_hrchy_code';
	var paramCodes = class_hrchy_code;
	var columns = 'CLASS_CODE';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_newClass_code', columns, "!%!", "/%/", setNewClassCode);
}

setNewClassCode = function(data) {
	document.frm.class_code.value = data.split("/%/")[0];
}

changeClass = function(obj) {
	var hrchy_ctl_code = obj.value;
	var paramKeys = 'hrchy_ctl_code';
	var paramCodes = hrchy_ctl_code;
	var columns = 'CLASS_CODE!%!CLASS_NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_class_codes', columns, "!%!", "/%/", setClassCB);
}

setClassCB = function(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			hrchy_class_code.options[0] = new Option("---------------------------", "");
			hrchy_class_code.length = 1;
			
			changeItemSiteList(document.frm.hrchy_ctl_code);
	  		changeLowItemSiteList();
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			hrchy_class_code.options[0] = new Option("---------------------------", "");
			hrchy_class_code.length = 1;
			
			changeItemSiteList(document.frm.hrchy_ctl_code);
	  	    changeLowItemSiteList();			
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    hrchy_class_code.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				hrchy_class_code.options[k].selected = true;
			}
			
		}
	  	hrchy_class_code.length = optionMaxIndex;
	  	changeItemSiteList(document.frm.hrchy_ctl_code);
	  	changeLowItemSiteList();
  	}
}

changeItemSiteList = function(obj) {
	var hrchy_ctl_code = obj.value;
	var hrchy_class_code = document.frm.hrchy_class_code.value;
	
	if(hrchy_class_code == '') {
		hrchy_class_code = '*';		
	}
	
	var paramKeys = 'hrchy_ctl_code!%!hrchy_class_code';
	var paramCodes = hrchy_ctl_code+'!%!'+hrchy_class_code;	
	var columns = 'CODE!%!NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_itemSiteLevel_codes', columns, "!%!", "/%/", setItemSiteListCB);
}

setItemSiteListCB = function(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			item_site_mcb.options[0] = new Option("", "");
			item_site_mcb.length = 1;
			
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			item_site_mcb.options[0] = new Option("", "");
			item_site_mcb.length = 1;				
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    item_site_mcb.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				item_site_mcb.options[k].selected = true;
			}
			
		}
	  	item_site_mcb.length = optionMaxIndex;	  
  	}
}

changeLowItemSiteList = function() {
	var hrchy_ctl_code = document.frm.hrchy_ctl_code.value;
	var hrchy_class_code = document.frm.hrchy_class_code.value;
	
	if(hrchy_class_code == '') {
		document.frm.low_item_site_mcb.length = 0;		
		return;
	}
	
	var paramKeys = 'hrchy_ctl_code!%!hrchy_class_code';
	var paramCodes = hrchy_ctl_code+'!%!'+hrchy_class_code;
	var columns = 'HID!%!HID_NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_01010_itemSiteLowLevel_codes', columns, "!%!", "/%/", setLowItemSiteListCB);
}

setLowItemSiteListCB = function(data) {
	with(document.frm) {
	    added_item_site_key.value='';
		if (data == '' || data == null) {			
			low_item_site_mcb.length = 0;		
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1; 
	    if (optionMaxIndex == 0) {			   
			low_item_site_mcb.length = 0;		
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    low_item_site_mcb.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				low_item_site_mcb.options[k].selected = true;
			}
		   				
		    if (added_item_site_key.value == '') {
		    	added_item_site_key.value += cols[0];		    	    	
		    } else {
		    	added_item_site_key.value += ","+cols[0];		    
		    }
			
		}
	  	low_item_site_mcb.length = optionMaxIndex;	  
  	}
}

insertLowItemSiteList = function() {
	var hrchy_ctl_code = document.frm.hrchy_ctl_code.value;
	var added_item_site_key = document.frm.added_item_site_key.value;
	var hrchy_class_code = document.frm.hrchy_class_code.value;
		
	var paramKeys = 'hrchy_ctl_code!%!added_item_site_key!%!hrchy_class_code';
	var paramCodes = hrchy_ctl_code+'!%!'+added_item_site_key+'!%!'+hrchy_class_code;
	
	nongshim.updateData(paramKeys, paramCodes, 'fc_01010_itemSiteLowLevel_insert1', "!%!", isConfirm);	
}

function isConfirm(data) {
	if (data == 'true') {
		insertLowItemSiteFcstUnit();
	}
}

insertLowItemSiteFcstUnit = function() {
	var hrchy_ctl_code = document.frm.hrchy_ctl_code.value;
	var added_item_site_key = document.frm.added_item_site_key.value;
	var hrchy_class_code = document.frm.hrchy_class_code.value;
		
	var paramKeys = 'hrchy_ctl_code!%!added_item_site_key!%!hrchy_class_code';
	var paramCodes = hrchy_ctl_code+'!%!'+added_item_site_key+'!%!'+hrchy_class_code;
	document.frm.added_item_site_key.value = '';	
	
	nongshim.updateData(paramKeys, paramCodes, 'fc_01010_itemSiteLowLevel_insert2', "!%!");	
}

deleteLowItemSiteList = function() {
	var hrchy_ctl_code = document.frm.hrchy_ctl_code.value;
	var removed_item_site_key = document.frm.removed_item_site_key.value;
	var hrchy_class_code = document.frm.hrchy_class_code.value;
	document.frm.removed_item_site_key.value = '';
		
	var paramKeys = 'hrchy_ctl_code!%!removed_item_site_key!%!hrchy_class_code';
	var paramCodes = hrchy_ctl_code+'!%!'+removed_item_site_key+'!%!'+hrchy_class_code;
	
	nongshim.updateData(paramKeys, paramCodes, 'fc_01010_itemSiteLowLevel_delete1', "!%!");
	nongshim.updateData(paramKeys, paramCodes, 'fc_01010_itemSiteLowLevel_delete2', "!%!");
}

exit = function(data) {
	if (data == 'true') {		
		searchIFrameData('fc_01010_itemSiteMgmt_tailer');
	}
}

check = function(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}
}

////////////////////////////////////////////////////////////////////////////////

function add() {
	if(!confirm("등록 시, 데이터베이스에 실제 적용됩니다. 등록하시겠습니까?")){
		return;
	}
	
	var selnum = 0
	for (var j = 0; j < document.frm.item_site_mcb.options.length; j++) {
	     if ( document.frm.item_site_mcb.options[j].selected == true) {
	        selnum = selnum + 1;        
	     }
	}	
	
	if (selnum > 0) {		
        for (var i = 0; i < document.frm.item_site_mcb.options.length; i++) {
		    var opt = document.frm.item_site_mcb.options[i];
		    if (opt.selected == true) {
			    loc = document.frm.low_item_site_mcb.length;
			    
			    var temp = document.frm.item_site_mcb.options[i].text;
			    var temp2 = document.frm.item_site_mcb.options[i].value;			    
			    document.frm.low_item_site_mcb.options[loc] =  new Option(temp,temp2);
			    
			    if (document.frm.added_item_site_key.value == '') {
			    	document.frm.added_item_site_key.value += temp2;
			    	document.frm.added_item_site_value.value += temp;		    	
			    } else {
			    	document.frm.added_item_site_key.value += ","+temp2;
			    	document.frm.added_item_site_value.value += ","+temp;
			    }
		    }
        }
        insertLowItemSiteList();
        
	} else {
    	alert("추가할 객체가 선택되지 않았습니다.")
	}
	
	delOriginal();
} 

function addOriginal() {
	for (var i = 0; i < document.frm.low_item_site_mcb.options.length; i++) {
		var opt =  document.frm.low_item_site_mcb.options[i];
		if (opt.selected == true) {
			loc = document.frm.item_site_mcb.length;
			var temp = document.frm.low_item_site_mcb.options[i].text;
			var temp2 = document.frm.low_item_site_mcb.options[i].value;
			document.frm.item_site_mcb.options[loc] =  new Option(temp,temp2);
		}
	}
}

function del() {
	
	if(!confirm("삭제 시, 데이터베이스에 실제 적용됩니다. 삭제하시겠습니까?")){
		return;
	}
	
	addOriginal();
	var selnum = 0
	for (var j = 0; j < document.frm.low_item_site_mcb.options.length; j++) {
		if ( document.frm.low_item_site_mcb.options[j].selected == true) {
		   selnum = selnum + 1
		}
	}

	if (selnum > 0) {
		var keys = document.frm.added_item_site_key.value.split(",");
    	var vals = document.frm.added_item_site_value.value.split(",");
    	
    	document.frm.added_item_site_key.value = '';
    	document.frm.added_item_site_value.value = '';    	
    	var cnt = 0;
		for (var i = 0; i <  document.frm.low_item_site_mcb.options.length; i++) {
			var opt =  document.frm.low_item_site_mcb.options[i];
			if (opt.selected == true) {							   
			    if (document.frm.removed_item_site_key.value == '') {
			    	document.frm.removed_item_site_key.value += opt.value;
			     	
			    } else {
			    	document.frm.removed_item_site_key.value += ","+opt.value;			    
			    }
			    
				if (cnt <= 0) {
					document.frm.low_item_site_mcb.options[i] = null;				
					keys[i] = null;   
					vals[i] = null;
					
				} else {
					document.frm.low_item_site_mcb.options[i] = null;		
					keys[cnt] = null;   
					vals[cnt] = null;
				}
						
				i = i - 1;					
			}
			
			cnt++;			
		}
		
		for (var n = 0; n < keys.length; n++) {		
			if (keys[n] != '' && keys[n] !== null) {				
				if (document.frm.added_item_site_key.value == '') {
					document.frm.added_item_site_key.value += keys[n];
			    	document.frm.added_item_site_value.value += vals[n];			    		
				} else {
					document.frm.added_item_site_key.value += ","+keys[n];
			    	document.frm.added_item_site_value.value += ","+vals[n];		
				}
			}
		}		
		deleteLowItemSiteList();
		
	}else {
	    alert("삭제할 개체가 선택되지 않았습니다.");
	    return;
	}
}

function delOriginal() {
	for (var i = 0; i < document.frm.item_site_mcb.options.length; i++) {
		var opt =  document.frm.item_site_mcb.options[i];
		
		if (opt.selected == true) {
			document.frm.item_site_mcb.options[i] = null;        
			i = i - 1;
		}
	}
}