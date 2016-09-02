updateData = function(service) {

	if (document.frm.oper_type.value == '') {
		alert('��ȹ������ �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.fcst_code.value == '') {
		alert('��ȹ ���� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.start.value == '') {
		alert('���� ��/�ָ� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
};

deleteData = function(service) {
	if (document.frm.del_code.value == '') {
		alert('������� �ڵ带 �����Ͽ� �ֽʽÿ�.');
		return;
	}
	
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
	
	document.frm.del_code.value = '';
	document.frm.del_oper_type.value = '';	
}

function changeFcstName(obj) {
	var oper_type = obj.value.split('!%!')[0];
	document.frm.f_oper_type.value = oper_type;
	var paramKeys = 'oper_type';
	var paramCodes = oper_type;
	var columns = 'FCST_CODE!%!FCST_DESC';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_03060_fcst_names', columns, "!%!", "/%/", setFcstNameCB);
}

function setFcstNameCB(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			fcst_code.options[0] = new Option("-------", "");
			fcst_code.length = 1;
			
	    	return false;
	    }
	
	    var rows = data.split("/%/");
	    var optionMaxIndex = rows.length - 1;
	    if (optionMaxIndex == 0) {
			fcst_code.options[0] = new Option("-------", "");
			fcst_code.length = 1;
			searchIFrameData('fc_03060_versionMgmt_tailer');		
			return false;
		}
		
		for(var k = 0; k < rows.length; k++) {
			var cols = rows[k].split('!%!');		
		    document.frm.fcst_code.options[k] = new Option(cols[1], cols[0]);			
			if (k == optionMaxIndex) {
				fcst_code.options[k].selected = true;
			}
			
		}
	  	fcst_code.length = optionMaxIndex;  
	  	
	 	changeStart(fcst_code, oper_type);
	 	searchIFrameData('fc_03060_versionMgmt_tailer');
  	}
  	
}

function changeStart(obj1, obj2) {
	var fcst_code = obj1.value;
	var bucket = obj2.value.split('!%!')[1];
	document.frm.f_bucket.value = bucket;
	var paramKeys = 'fcst_code!%!bucket';
	var paramCodes = fcst_code+'!%!'+bucket;
	var columns = 'START_DATE';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_03060_start_dates', columns, "!%!", "/%/", setStartCB);
}

function setStartCB(data) {
	with(document.frm) {
		if (data == '' || data == null) {
			start.options[0] = new Option("-------", "");
			start.length = 1;
			
	    	return false;
	    }
	
	    var row = data.split("/%/");
	    var optionMaxIndex = row.length - 1;
	    if (optionMaxIndex == 0) {
			start.options[0] = new Option("-------", "");
			start.length = 1;
					
			return false;
		}
		for(var k = 0; k < row.length; k++) {	
			start.options[k] = new Option(row[k],row[k]);
			if (k == optionMaxIndex) {
				start.options[k].selected = true;
			}
			
		}
	  	start.length = optionMaxIndex;  
	  	
	  //	changeEnd(oper_type, start);
  	}
}

function check(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}	
}