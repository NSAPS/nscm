filterCB = function(service) {
	with(document.frm) {
		_moon_service.value = service;		
		_moon_pagenumber.value = "1"; 
		action = "service.do";
		target = "_self";
		submit();
	}	
};

resetTargetCB = function(service) {
	with(document.frm) {
		prod_1.value = '';
		prod_2.value = '';
		prod_3.value = '';
		prod_4.value = '';
		
		sales_1.value = '';
		sales_2.value = '';
		sales_3.value = '';
		
		delivery_1.value = '';
		
		_moon_service.value = service;	
		_moon_pagenumber.value = "1"; 
		action = "service.do";
		target = "_self";
		submit();
	}
};

resetAnlayzerCB = function(service) {
	with(document.frm) {
		item_group1.value = '';
		item_group2.value = '';
		transfer_1.value = '';
		transfer_2.value = '';
		
		_moon_service.value = service;	
		_moon_pagenumber.value = "1"; 
		action = "service.do";
		target = "_self";
		submit();
	}
};

forecast = function() {
	with(document.frm) {	
		if ( oper_type.value == '' || oper_type.value == null ) {
			alert("계획 유형을 선택하십시요.");
			return false;
		} else if (fcst_name.value == '' || fcst_name.value == null ) {
			alert("계획 명을 기입하십시요.");
			return false;
		} else if (start.value == '' || start.value == null ) {
			alert("실적 시작을 선택하십시요..");
			return false;
		} else if (end.value == '' || end.value == null ) {
			alert("실적 마감을 선택하십시요.");
			return false;
		} else if (item_lv.value == '' || item_lv.value == null ) {
			alert("품목 그룹을 선택하십시요.");
			return false;
		} else if (site_lv.value == '' || site_lv.value == null ) {
			alert("영업 그룹을 선택하십시요.");
			return false;
		} else if (dc_lv.value == '' || dc_lv.value == null ) {
			alert("배송 그룹을 선택하십시요.");
			return false;
		} else if (methods.value == '' || methods.value == null ) {
			alert("수요예측 방법을 선택하십시요..");
			return false;
		} else if (disaggr_rule.value == '' || disaggr_rule.value == null ) {
			alert("Disaggr. Rule을 선택하십시요.");
			return false;
		} 		
	
		var oper_typeP = oper_type.value;		
		var fcst_descP = fcst_name.value;		
		var hist_startP = start.value;
		var hist_endP = end.value;
		var item_lvP = item_lv.value;
		var site_lvP = site_lv.value;
		var dc_lvP = dc_lv.value;
				
		var fcst_methodP = methods.value + ',OPT';
		var disaggr_ruleP = disaggr_rule.value;
		var modify_checkP = modify_check.value;
		var selected_item_codeP = prod_4.value;
		var selected_site_codeP = sales_3.value;
		var selected_dc_codeP = delivery_1.value;
		var other_accountP = other_account.value;
		var is_analyze_dataP = is_analyze_data.value;
		var is_pos_dataP = is_pos_data.value;
		var prod_3P = prod_3.value;
		var prod_2P = prod_2.value;		
		var prod_1P = prod_1.value;
		var sales_2P = sales_2.value;		
		var sales_1P = sales_1.value;
		
		if(selected_item_codeP == '' || selected_item_codeP == null) {
			selected_item_codeP = ',';
		}		
		if(selected_site_codeP == '' || selected_site_codeP == null) {
			selected_site_codeP = ',';
		}
		if(selected_dc_codeP == '' || selected_dc_codeP == null) {
			selected_dc_codeP = ',';
		}
		if(prod_3P == '' || prod_3P == null) {
			prod_3P = ',';
		}
		if(prod_2P == '' || prod_2P == null) {
			prod_2P = ',';
		}
		if(prod_1P == '' || prod_1P == null) {
			prod_1P = ',';
		}
		if(sales_2P == '' || sales_2P == null) {
			sales_2P = ',';
		}
		if(sales_1P == '' || sales_1P == null) {
			sales_1P = ',';
		}		
		
		var paramKeys = 'oper_typeP!%!fcst_descP!%!hist_startP!%!hist_endP!%!item_lvP'
					  + '!%!site_lvP!%!dc_lvP!%!fcst_methodP!%!disaggr_ruleP'
					  + '!%!modify_checkP!%!selected_item_codeP!%!selected_site_codeP'
					  + '!%!selected_dc_codeP!%!other_accountP!%!is_analyze_dataP!%!is_pos_dataP'
					  + '!%!prod_3P!%!prod_2P!%!prod_1P!%!sales_2P!%!sales_1P';
		
		var paramCodes = oper_typeP + "!%!" + fcst_descP + "!%!" + hist_startP + "!%!" + hist_endP + "!%!" 
		               + item_lvP + "!%!" + site_lvP + "!%!" + dc_lvP + "!%!" + fcst_methodP + "!%!" 
		               + disaggr_ruleP + "!%!" + modify_checkP + "!%!" + selected_item_codeP + "!%!" 
		               + selected_site_codeP + "!%!" + selected_dc_codeP + "!%!" + other_accountP + "!%!" 
		               + is_analyze_dataP + "!%!" + is_pos_dataP + "!%!"
		               + prod_3P + "!%!" + prod_2P + "!%!" + prod_1P + "!%!" + sales_2P + "!%!" + sales_1P;
	
		var columns = 'FORECASTCODE,FORECASTNAME,FORECASTCLASS,OPERATIONTYPE,FORECASTBUCKET'
		            + ',ITEM_LV,SITE_LV,DC_LV,CUST_LV,FCST_METHOD,HIST_START,HIST_END,DISAGGR_RULE'
		            + ',FORECASTBUCKETNUM,FCST_RANGE,MOVINGPERIOD,WEIGHTEDMOVINGPERIOD,LEVELFACTOR'
		            + ',TRENDFACTOR,SEASONLFACTOR,PROCESSINGLEVEL,DAMPINGFACTOR,SMOOTHINGFACTOR'
		            + '/%/FCST_UNIT_ID,SITE_CODE,ITEM_CODE,DC_CODE,CUST_CODE,SALES_DATE,SALES_QTY'
		            + ',BUCKET_CNT,MIN_HIST,MAX_HIST,IDEAL_BUCKET_CNT,BUCKET_NUM';
		
		document.getElementById('dataArea').style.display = 'none'; 
		document.getElementById('waitArea').style.display = 'block'; 
		nongshim.loadData(paramKeys, paramCodes, 'forecasts_parameters,sales_historys,del_fcst_mast,del_fcst_result_summary,del_fcst_output,del_fcst_output_disaggr', columns, fcst_methodP, confirm);	
	}
}

function confirm(data) {
	if (data == 'true') {
		document.getElementById('dataArea').style.display = 'block'; 
		document.getElementById('waitArea').style.display = 'none'; 
		searchIFrameData('fc_03020_creationFcst_tailer');
	} else {
		document.getElementById('dataArea').style.display = 'block'; 
		document.getElementById('waitArea').style.display = 'none'; 
		alert(data);
	}
}

function changeStart(obj) {
	var oper_type = obj.value;
	var paramKeys = 'oper_type';
	var paramCodes = oper_type;
	var columns = 'START_DATE';
	
	nongshim.getData(paramKeys, paramCodes, 'act_res_start', columns, "!%!", "/%/", setStartCB);
}

function changeEnd(obj1, obj2) {
	var oper_type = obj1.value;
	var start = obj2.value;
	var paramKeys = 'oper_type!%!start';
	var paramCodes = oper_type+'!%!'+start;
	var columns = 'END_DATE';
	
	nongshim.getData(paramKeys, paramCodes, 'act_res_end', columns, "!%!", "/%/", setEndCB);
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
	  	
	  	changeEnd(oper_type, start);
  	}
}

function setEndCB(data) {
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

function setValues(cbObj, targetObj) {	
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

function selectAll(chkBoxObj, cbBoxObj, targetObj) {
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

function check(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}	
}

function checkPOS(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
		document.frm.oper_type.options[0] = new Option('분석용(월별)', 'MANALY');
		document.frm.oper_type.options[1] = new Option('분석용(주별)', 'WANALY');		
		document.frm.oper_type.length = 2;		
		
	} else {
		obj.value = 'N';
		document.frm.oper_type.options[0] = new Option('월간수요예측', 'MONTH');
		document.frm.oper_type.options[1] = new Option('주간수요예측', 'WEEK');
		document.frm.oper_type.options[2] = new Option('분석용(월별)', 'MANALY');
		document.frm.oper_type.options[3] = new Option('분석용(주별)', 'WANALY');		
		document.frm.oper_type.length = 4;
	}	
	changeStart(document.frm.oper_type);
}

////////////////////////////////////////////////////////////////////////////////
function changeTypeLevel(obj) {
	var type = obj.value;
	if (type == '품종분류') {
		document.frm.hrchy_lvl.options[0] = new Option('품목', '50');
		document.frm.hrchy_lvl.options[1] = new Option('제품3분류', '40');
		document.frm.hrchy_lvl.options[2] = new Option('제품2분류', '30');
		document.frm.hrchy_lvl.options[3] = new Option('제품1분류', '20');
		document.frm.hrchy_lvl.length = 4;
		
	} else if (type == '영업') {
		document.frm.hrchy_lvl.options[0] = new Option('영업지점', '50');
		document.frm.hrchy_lvl.options[1] = new Option('영업부', '40');
		document.frm.hrchy_lvl.options[2] = new Option('영업본부', '30');
		document.frm.hrchy_lvl.length = 3;
				
	} else {
		document.frm.hrchy_lvl.options[0] = new Option('배송지점', '30');
		document.frm.hrchy_lvl.length = 1;
	}
}

function enterChangeHrchyTypes() {	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			changeHrchyTypes();
		}
	}	
}

function changeHrchyTypes() {
	var htype = document.frm.hrchy_type.value;	
	var hrchy_lvl = document.frm.hrchy_lvl.value;
	var hrchy_name = document.frm.hrchy_name.value;

	if (htype == '' || hrchy_lvl == '' || hrchy_name == '') {
		return false;
	}
	var paramKeys = 'htype!%!hrchy_lvl!%!hrchy_name';
	var paramCodes = htype + '!%!' +hrchy_lvl + '!%!' + hrchy_name;
	var columns = 'HID';	
	
	nongshim.getData(paramKeys, paramCodes, 'hrchy_codes', columns, "!%!", "/%/", setHrchyTypes);
}

function setHrchyTypes(data) {
	if (data == '' || data == null) {		
    	return false;
    }

    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
	
	var hrchy_codes = '';
	for(var k = 0; k < optionMaxIndex; k++) {
		if (hrchy_codes == '') {
			hrchy_codes += rows[k];
		} else {
			hrchy_codes += ',' + rows[k];
		}		 	
	}
	
	var hrchy_type = document.frm.hrchy_type.value;	
	if (hrchy_type == '품종분류') {
		setProductTypes(hrchy_codes);
	} else if (hrchy_type == '영업') {
		setSalesTypes(hrchy_codes);			
	} else {
		setDcTypes(hrchy_codes);
	}	
}

function setProductTypes(item_codes) {
	document.frm.prod_1.value = '';
	document.frm.prod_2.value = '';
	document.frm.prod_3.value = '';
	document.frm.prod_4.value = '';
	
	var hrchy_lvl = document.frm.hrchy_lvl.value;
	if (hrchy_lvl == '50') {
		document.frm.prod_4.value = item_codes;		
	} else if (hrchy_lvl == '40') {
		document.frm.prod_3.value = item_codes;		
	} else if (hrchy_lvl == '30') {
		document.frm.prod_2.value = item_codes;		
	} else if (hrchy_lvl == '20') {
		document.frm.prod_1.value = item_codes;		
	} 
	changeProductType1();
}

function setSalesTypes(sales_codes) {
	document.frm.sales_1.value = '';
	document.frm.sales_2.value = '';
	document.frm.sales_3.value = '';
	
	var hrchy_lvl = document.frm.hrchy_lvl.value;
	if (hrchy_lvl == '50') {
		document.frm.sales_3.value = sales_codes;		
	} else if (hrchy_lvl == '40') {
		document.frm.sales_2.value = sales_codes;		
	} else if (hrchy_lvl == '30') {
		document.frm.sales_1.value = sales_codes;		
	} 
	changeSalesCenter();
}

function setDcTypes(dc_codes) {
	document.frm.delivery_1.value = dc_codes;	
	changeDc();
}

////////////////////////////////////////////////////////////////////////////////

function resetDc() {
	document.frm.delivery_1.value = ',';		
	changeDc();
}

function changeDc() {	
	var delivery_1 = document.frm.delivery_1.value == '' ? ',' : document.frm.delivery_1.value;
		
	var paramKeys = 'delivery_1';
	var paramCodes = delivery_1;
	var columns = 'DC_CODE!%!DC_DESC';	
	
	nongshim.getData(paramKeys, paramCodes, 'delivery_locs', columns, "!%!", "/%/", setDc);
}

function setDc(data) {
	if (data == '' || data == null) {		
    	return false;
    }
 
    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.delivery_loc.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.delivery_loc.options[k] = new Option(cols[1], cols[0]);		
	}	
}

////////////////////////////////////////////////////////////////////////////////
function resetProductType() {
	document.frm.prod_1.value = ',';
	document.frm.prod_2.value = ',';
	document.frm.prod_3.value = ',';
	document.frm.prod_4.value = ',';
	
	changeProductType1();
}

function changeProductType1() {	
	var prod_1 = document.frm.prod_1.value == '' ? ',' : document.frm.prod_1.value;
	var prod_2 = document.frm.prod_2.value == '' ? ',' : document.frm.prod_2.value;
	var prod_3 = document.frm.prod_3.value == '' ? ',' : document.frm.prod_3.value;
	var prod_4 = document.frm.prod_4.value == '' ? ',' : document.frm.prod_4.value;
	
	var paramKeys = 'prod_1!%!prod_2!%!prod_3!%!prod_4';
	var paramCodes = prod_1 + '!%!' + prod_2 + '!%!' + prod_3 + '!%!' + prod_4;
	var columns = 'P1CODE!%!P1NAME';	
	
	nongshim.getData(paramKeys, paramCodes, 'product_type1', columns, "!%!", "/%/", setProductType1);
}

function changeProductType2() {	
	var prod_1 = document.frm.prod_1.value == '' ? ',' : document.frm.prod_1.value;
	var prod_2 = document.frm.prod_2.value == '' ? ',' : document.frm.prod_2.value;
	var prod_3 = document.frm.prod_3.value == '' ? ',' : document.frm.prod_3.value;
	var prod_4 = document.frm.prod_4.value == '' ? ',' : document.frm.prod_4.value;
	
	var paramKeys = 'prod_1!%!prod_2!%!prod_3!%!prod_4';
	var paramCodes = prod_1 + '!%!' + prod_2 + '!%!' + prod_3 + '!%!' + prod_4;
	var columns = 'P2CODE!%!P2NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'product_type2', columns, "!%!", "/%/", setProductType2);
}

function changeProductType3() {	
	var prod_1 = document.frm.prod_1.value == '' ? ',' : document.frm.prod_1.value;
	var prod_2 = document.frm.prod_2.value == '' ? ',' : document.frm.prod_2.value;
	var prod_3 = document.frm.prod_3.value == '' ? ',' : document.frm.prod_3.value;
	var prod_4 = document.frm.prod_4.value == '' ? ',' : document.frm.prod_4.value;
	
	var paramKeys = 'prod_1!%!prod_2!%!prod_3!%!prod_4';
	var paramCodes = prod_1 + '!%!' + prod_2 + '!%!' + prod_3 + '!%!' + prod_4;
	var columns = 'P3CODE!%!P3NAME';	
	
	nongshim.getData(paramKeys, paramCodes, 'product_type3', columns, "!%!", "/%/", setProductType3);
}

function changeProductType4() {	
	var prod_1 = document.frm.prod_1.value == '' ? ',' : document.frm.prod_1.value;
	var prod_2 = document.frm.prod_2.value == '' ? ',' : document.frm.prod_2.value;
	var prod_3 = document.frm.prod_3.value == '' ? ',' : document.frm.prod_3.value;
	var prod_4 = document.frm.prod_4.value == '' ? ',' : document.frm.prod_4.value;
	
	var paramKeys = 'prod_1!%!prod_2!%!prod_3!%!prod_4';
	var paramCodes = prod_1 + '!%!' + prod_2 + '!%!' + prod_3 + '!%!' + prod_4;
	var columns = 'P4CODE!%!P4NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'product_type4', columns, "!%!", "/%/", setProductType4);
}

function setProductType1(data) {
	if (data == '' || data == null) {		
    	return false;
    }

    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.prod_type1.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.prod_type1.options[k] = new Option(cols[0]+' - '+cols[1], cols[0]);		
	}
	
	changeProductType2();
}

function setProductType2(data) {
	if (data == '' || data == null) {		
    	return false;
    }

    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.prod_type2.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.prod_type2.options[k] = new Option(cols[0]+' - '+cols[1], cols[0]);		
	}
	
	changeProductType3();	  	
}

function setProductType3(data) {
	if (data == '' || data == null) {		
    	return false;
    }

    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.prod_type3.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.prod_type3.options[k] = new Option(cols[0]+' - '+cols[1], cols[0]);		
	}
	
	changeProductType4();  	
}

function setProductType4(data) {
	if (data == '' || data == null) {		
    	return false;
    }

    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.prod_type4.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.prod_type4.options[k] = new Option(cols[1], cols[0]);		
	}
	  	
}

////////////////////////////////////////////////////////////////////////////////
function resetSalesType() {
	document.frm.sales_1.value = ',';
	document.frm.sales_2.value = ',';
	document.frm.sales_3.value = ',';	
	
	changeSalesCenter();
}

function changeSalesCenter() {	
	var sales_1 = document.frm.sales_1.value == '' ? ',' : document.frm.sales_1.value;
	var sales_2 = document.frm.sales_2.value == '' ? ',' : document.frm.sales_2.value;
	var sales_3 = document.frm.sales_3.value == '' ? ',' : document.frm.sales_3.value;
	
	var paramKeys = 'sales_1!%!sales_2!%!sales_3';
	var paramCodes = sales_1 + '!%!' + sales_2 + '!%!' + sales_3;
	var columns = 'P1CODE!%!P1NAME';	
	
	nongshim.getData(paramKeys, paramCodes, 'sales_centers', columns, "!%!", "/%/", setSalesCenter);
}

function changeSalesDept() {	
	var sales_1 = document.frm.sales_1.value == '' ? ',' : document.frm.sales_1.value;
	var sales_2 = document.frm.sales_2.value == '' ? ',' : document.frm.sales_2.value;
	var sales_3 = document.frm.sales_3.value == '' ? ',' : document.frm.sales_3.value;
	
	var paramKeys = 'sales_1!%!sales_2!%!sales_3';
	var paramCodes = sales_1 + '!%!' + sales_2 + '!%!' + sales_3;
	var columns = 'P2CODE!%!P2NAME';	
	
	nongshim.getData(paramKeys, paramCodes, 'sales_depts', columns, "!%!", "/%/", setSalesDept);
}

function changeSalesLoc() {	
	var sales_1 = document.frm.sales_1.value == '' ? ',' : document.frm.sales_1.value;
	var sales_2 = document.frm.sales_2.value == '' ? ',' : document.frm.sales_2.value;
	var sales_3 = document.frm.sales_3.value == '' ? ',' : document.frm.sales_3.value;
	
	var paramKeys = 'sales_1!%!sales_2!%!sales_3';
	var paramCodes = sales_1 + '!%!' + sales_2 + '!%!' + sales_3;
	var columns = 'P3CODE!%!P3NAME';	
	
	nongshim.getData(paramKeys, paramCodes, 'sales_locs', columns, "!%!", "/%/", setSalesLoc);
}

function setSalesCenter(data) {
	if (data == '' || data == null) {		
    	return false;
    }
 
    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.sales_center.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.sales_center.options[k] = new Option(cols[1], cols[0]);		
	}
	
	changeSalesDept();
}

function setSalesDept(data) {
	if (data == '' || data == null) {		
    	return false;
    }
 
    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.sales_dept.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.sales_dept.options[k] = new Option(cols[1], cols[0]);		
	}	
	
	changeSalesLoc();
}

function setSalesLoc(data) {
	if (data == '' || data == null) {		
    	return false;
    }
 
    var rows = data.split("/%/");	
    var optionMaxIndex = rows.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
		
	document.frm.sales_loc.length = optionMaxIndex;
	for(var k = 0; k < optionMaxIndex; k++) {	
		var cols = rows[k].split('!%!');		
		document.frm.sales_loc.options[k] = new Option(cols[1], cols[0]);		
	}
	
}
///////////////////////////////////////////////////////////////////////////////

function InsertList() {
	with(document.frm) {
		ShowList.options[ShowList.length] = new Option(writeBox.value, writeBox.value);
	//  ShowList.options[ShowList.length-1].selected= true;
	//  ShowList.options[ShowList.length-1].selected= false;
		writeBox.value = "";
    }
// document.myform.ShowList.options[document.myform.ShowList.length].selected = true;
}

function InsertList(val) {
	with(document.frm) {
  		ShowList.options[ShowList.length] = new Option( val, val );
 	}
}

function ListClick() {
	with(document.frm) {
  		alert(ShowList.options[ShowList.selectedIndex].text);
  		alert(ShowList.options[ShowList.selectedIndex].value);
 	}
}

function KeyDown() {
	with(document.frm) {
  		for( var i=0; i<ShowList.options.length; i++ ) {
   			if( ShowList.options[i].selected == true ) {
    			alert(ShowList.options[i].value);
   			}
  		}
	//alert(ShowList.options.length);
	//  alert(ShowList.options[ShowList.selectedIndex].text);
	//  alert(ShowList.options[ShowList.selectedIndex].value);
	 }
}

function fncGetValue() {
 	with(document.frm) {
  		for( var i=0; i<ShowList.options.length; i++ ) {
   			if( ShowList.options[i].selected == true ) {
    			alert(ShowList.options[i].value);
   			}
  		}
 	} 	
}