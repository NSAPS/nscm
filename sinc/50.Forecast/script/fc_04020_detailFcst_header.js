function searchPopupIFrame() {
	searchIFrameData('fc_04020_detailFcst_tailer');
}

function confirmForecasts() {
	var this_type = document.frm.thisType.value;
	var bf_code = document.frm.fcst_code.value;
	var c_type1 = document.frm.condition_type1.value;
	var c_type2 = document.frm.condition_type2.value;
	var c_type3 = document.frm.condition_type3.value;
	var c_lv1 = document.frm.condition_level1.value;
	var c_lv2 = document.frm.condition_level2.value;
	var c_lv3 = document.frm.condition_level3.value;
	var prod_4 = document.frm.prod_4.value;
	var prod_3 = document.frm.prod_3.value;
	var prod_2 = document.frm.prod_2.value;
	var prod_1 = document.frm.prod_1.value;
	var sales_3 = document.frm.sales_3.value;
	var sales_2 = document.frm.sales_2.value;
	var sales_1 = document.frm.sales_1.value;	
	var dc_1 = document.frm.delivery_1.value;
	var item_cd = document.frm.itemCode.value;
	var sales_cd = document.frm.salesCode.value;
	var dc_cd = document.frm.dcCode.value;
	var dates = document.frm.headerCol.value;
	var org_data = document.frm.beforeFirstLine.value;
	var adj_data = document.frm.firstLine.value;
	var _user_id = document.frm._user_id.value;
	
	//document.frm.a.value = dates;
	//document.frm.b.value = org_data;
	//document.frm.c.value = adj_data;
	var paramKeys = 'this_type!%!bf_code!%!c_type1!%!c_type2!%!c_type3!%!c_lv1!%!c_lv2!%!c_lv3!%!prod_4!%!prod_3!%!prod_2!%!prod_1!%!sales_3!%!sales_2!%!sales_1!%!dc_1!%!item_cd!%!sales_cd!%!dc_cd!%!dates!%!org_data!%!adj_data!%!_user_id';
	var paramCodes = this_type+'!%!'+bf_code+'!%!'+c_type1+'!%!'+c_type2+'!%!'+c_type3+'!%!'+c_lv1+'!%!'+c_lv2+'!%!'+c_lv3+'!%!'+prod_4+'!%!'+prod_3+'!%!'+prod_2+'!%!'+prod_1+'!%!'+sales_3+'!%!'+sales_2+'!%!'+sales_1+'!%!'+dc_1+'!%!'+item_cd+'!%!'+sales_cd+'!%!'+dc_cd+'!%!'+dates+'!%!'+org_data+'!%!'+adj_data+'!%!'+_user_id;
	
	document.getElementById('dataArea').style.display = 'none'; 
	document.getElementById('waitArea').style.display = 'block'; 
	nongshim.updateData(paramKeys, paramCodes, 'sp_fcst_sales_control', "!%!", confirm);
}

function confirm(data) {
	if (data == 'true') {
		document.getElementById('dataArea').style.display = 'block'; 
		document.getElementById('waitArea').style.display = 'none';
		document.frm.btnApp.style.display = 'none';
		searchIFrameData('fc_04020_detailFcst_tailer');
	}
}

function choicePointIndex(idx) {
	var firstLine = document.frm.firstLine.value.split(',');	
	var headerCol = document.frm.headerCol.value.split(',');
	
	document.frm.index.value = idx;
	document.frm.fcstQty.value = firstLine[Number(idx)];
	document.frm.fcstDate.value = headerCol[Number(idx)];
}

function paintLineGraph(isFirst) {	
	var project = document.frm.project.value;
	var title = document.frm.title.value;
	var line1 = document.frm.line1.value;
	var line2 = document.frm.line2.value;
	var firstLine = document.frm.firstLine.value.split(',');
	var secondLine = document.frm.secondLine.value;
	var links = document.frm.links.value.split(',');
	var headerCol = document.frm.headerCol.value;
	var maxValue = Number(document.frm.maxValue.value) < Number(document.frm.fcstQty.value)
	             ? document.frm.fcstQty.value : document.frm.maxValue.value;
	
	var index = Number(document.frm.index.value);
	var fcstQty = Number(document.frm.fcstQty.value);
	
	firstLine[index] = fcstQty;
	links[index] = "javascript:choicePointIndex("+String(index)+")";
	 	
    document.frm.firstLine.value = firstLine;
    document.frm.links.value = links;
    document.frm.maxValue.value = maxValue;
    
    paintLine(project, title, line1, line2, firstLine, secondLine, links, headerCol, maxValue, isFirst);        
}

function paintLine(project, title, line1, line2, fLine, sLine, links, hdCol, max, isFirst) {
	//if (document.frm.fcstDate.value != '') {
		var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "250", "9", "#FFFFFF");                 
	    so.addVariable("variables","true");
	    so.addVariable("title",title+",{font-size: 10;}");
	    so.addVariable("bg_colour","#FFFFFF");
		so.addVariable("y_legend","Zionex,12,0x736AFF");
	    so.addVariable("y_ticks","5,10,4");
	    so.addVariable("line_dot","2,#CC3399," + line1 + ",10,5");
	    so.addVariable("line_dot_2","2,#468024," + line2 + ",10,5");    
	    so.addVariable("values",fLine);
	    so.addVariable("values_2",sLine);
	    so.addVariable("links",links);
	    so.addVariable("x_labels",hdCol);
		so.addVariable("x_label_style","9,#000000,2");
		so.addVariable("x_axis_steps","1");
	    so.addVariable("y_max",String(max));
	    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
	    //  so.addParam("onmouseout", "onrollout();" );
	    so.write(document.getElementById('my_chart'));
	//}	
    
    document.frm.btnApp.style.display = 'block';
    if (isFirst) {   
    	regression();
    }
}

function regression() {	
	var firstLine = document.frm.firstLine.value;
	var level_ctl = document.frm.level_ctl.value;
	var trend_ctl = document.frm.trend_ctl.value;
	var smooth_ctl = document.frm.smooth_ctl.value;
	
	var paramKeys = 'firstLine!%!level_ctl!%!trend_ctl!%!smooth_ctl';
	var paramCodes = firstLine+'!%!'+level_ctl+'!%!'+trend_ctl+'!%!'+smooth_ctl;
	var columns = 'LINE_DATA';
	
	nongshim.getData(paramKeys, paramCodes, 'func_regression', columns, "!%!", "/%/", setLine);
}

function setLine(data) {
	var firstLine = data.split('/%/')[0];
	var fcstQtyArr = firstLine.split(',');
	var maxValue = Number(document.frm.maxValue.value);
	
	var beforeFcstQty = 0;
	for(var i = 0; i < fcstQtyArr.length; i++) {
		var fcstQty = Number(fcstQtyArr[i]);
		if (beforeFcstQty < fcstQty) {			
			beforeFcstQty = fcstQty;
		} 
	}
	
	if (maxValue < beforeFcstQty) {
		maxValue = beforeFcstQty;
	}
	
    document.frm.firstLine.value = firstLine;
    document.frm.maxValue.value = maxValue;    
  
	paintLineGraph(false);
}
 
////////////////////////////////////////////////////////////////////////////////

 
searchIFrameData = function(service) {	
	for (var i = 0; i < document.frm.added_list.options.length; i++) {
		var value =  document.frm.added_list.options[i].value;
		
		if (i == 0) {
			document.frm.condition_type1.value = value.split('!%!')[0];
			document.frm.condition_level1.value = value.split('!%!')[1];
		} else if (i == 1) {
			document.frm.condition_type2.value = value.split('!%!')[0];
			document.frm.condition_level2.value = value.split('!%!')[1];
		} else {
			document.frm.condition_type3.value = value.split('!%!')[0];
			document.frm.condition_level3.value = value.split('!%!')[1];
		}
		
	}
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
}

function displayOption() {
	document.getElementById('tabPage1').style.display = document.frm.tab11.value;
    document.getElementById('tabPage2').style.display = document.frm.tab22.value;  
    document.getElementById('tabPage4').style.display = 'none';
    document.getElementById('tab1').style.display = 'block';
    document.getElementById('tab2').style.display = 'block';  
}

function setOperTypeMode(obj) {	
	setTargetCB('');
	setPeriodTypeCB('');
	setStartCB('');
	//changeTarget(obj);	
	changeFcstYyyyMm(obj);
}

function changeFcstYyyyMm(obj) {
	var oper_type = obj.value;	
	var paramKeys = 'oper_type';
	var paramCodes = oper_type;
	var columns = 'YYYYMM';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_fcst_yyyymm', columns, "!%!", "/%/", setFcstYyyyMmCB);
}

function setFcstYyyyMmCB(data) {
	var fcst_yyyymm = document.frm.fcst_yyyymm;	
	if (hasComboBoxData(fcst_yyyymm, data)) {		
		changeFcstYyyyMmDd(document.frm.oper_type, fcst_yyyymm);
	}  	 	
}

function changeFcstYyyyMmDd(obj1, obj2) {
	var oper_type = obj1.value;
	var fcst_yyyymm = obj2.value;
	var paramKeys = 'oper_type!%!fcst_yyyymm';
	var paramCodes = oper_type+'!%!'+fcst_yyyymm;
	var columns = 'YYYYMMDD!%!DD';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_fcst_yyyymmdd', columns, "!%!", "/%/", setFcstYyyyMmDdCB);
}

function setFcstYyyyMmDdCB(data) {
	var fcst_yyyymmdd = document.frm.fcst_yyyymmdd;	
	if (hasComboBoxData(fcst_yyyymmdd, data)) {		
		changeTarget(document.frm.oper_type, fcst_yyyymmdd);
	}  	 	
}

function changeTarget(obj1, obj2) {
	var oper_type = obj1.value;
	var fcst_yyyymmdd = obj2.value;
	var paramKeys = 'oper_type!%!fcst_yyyymmdd';
	var paramCodes = oper_type+'!%!'+fcst_yyyymmdd;
	var columns = 'FCST_CODE!%!FCST_DESC';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_fcst_names', columns, "!%!", "/%/", setTargetCB);
}

function setTargetCB(data) {
	var fcst_code = document.frm.fcst_code;	
	if (hasComboBoxData(fcst_code, data)) {
		setFcstName(document.frm.fcst_code); 
		changePeriodType(document.frm.oper_type);
	}  	 	
} 

function changePeriodType(obj) {	
	var oper_type = obj.value;
	var paramKeys = 'oper_type';
	var paramCodes = oper_type;
	var columns = 'CD!%!CD_NAME';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_period_types', columns, "!%!", "/%/", setPeriodTypeCB);
}

function setPeriodTypeCB(data) {
	var period_type = document.frm.period_type;
	if (hasComboBoxData(period_type, data)) {
		changeStart(document.frm.oper_type);
	}
}

function changeStart(obj) {
	var db_table = '';
	var db_column = '';

	var oper_type = obj.value;	
	if (oper_type == 'MSAVE') {
		db_table = 'FCST_HIST_MONTHLY';
		db_column = 'FCST_MONTH';
		
	} else if (oper_type == 'WSAVE') {
		db_table = 'FCST_HIST_WEEKLY';
		db_column = 'FCST_WEEK';
		
	} else if (oper_type == 'MCONF') {
		db_table = 'FCST_PLAN_MONTHLY';
		db_column = 'FCST_MONTH';
		
	} else if (oper_type == 'WCONF') {
		db_table = 'FCST_PLAN_WEEKLY';
		db_column = 'FCST_WEEK';
	} else {
		setStartCB('');
		return false;
	}
	var fcst_code = document.frm.fcst_code.value == '' ? 'NULL' : document.frm.fcst_code.value;
	var paramKeys = 'db_table!%!db_column!%!fcst_code';
	var paramCodes = db_table+'!%!'+db_column+'!%!'+fcst_code;
	//var columns = db_column;
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_start', db_column, "!%!", "/%/", setStartCB);
}

function changeEnd(obj1, obj2) {
	var oper_type = obj1.value;
	if (oper_type == 'MSAVE') {
		db_table = 'FCST_HIST_MONTHLY';
		db_column = 'FCST_MONTH';
		
	} else if (oper_type == 'WSAVE') {
		db_table = 'FCST_HIST_WEEKLY';
		db_column = 'FCST_WEEK';
		
	} else if (oper_type == 'MCONF') {
		db_table = 'FCST_PLAN_MONTHLY';
		db_column = 'FCST_MONTH';
		
	} else if (oper_type == 'WCONF') {
		db_table = 'FCST_PLAN_WEEKLY';
		db_column = 'FCST_WEEK';
	}
	
	var start = obj2.value == '' ? '0' : obj2.value;
	var fcst_code = document.frm.fcst_code.value == '' ? 'NULL' : document.frm.fcst_code.value;	
	var paramKeys = 'db_table!%!db_column!%!fcst_code!%!start';
	var paramCodes = db_table+'!%!'+db_column+'!%!'+fcst_code+'!%!'+start;
	
	nongshim.getData(paramKeys, paramCodes, 'fc_04020_end', db_column, "!%!", "/%/", setEndCB);
}

setFcstName = function(obj) {
	for (var j = 0; j < obj.options.length; j++) {
		if ( obj.options[j].selected == true) {
		  document.frm.fcst_name.value = obj.options[j].text;
		}
	}	
};

function setStartCB(data) {
	var start = document.frm.start;	
//	hasComboBoxData(start, data);
	if (hasComboBoxData(start, data)) {
		changeEnd(document.frm.oper_type, document.frm.start);
	
	} else {
		document.frm.end.options[0] = new Option("--------------------", "");
		document.frm.end.length = 1;
	}	
}

function setEndCB(data) {
	var end = document.frm.end;
	return hasComboBoxData(end, data);  	
}

function hasComboBoxData(obj, data) {
	if (data == '' || data == null) {
		obj.options[0] = new Option("--------------------", "");
		obj.length = 1;
		
    	return false;
    }

    var row = data.split("/%/");
    var optionMaxIndex = row.length - 1;
    if (optionMaxIndex == 0) {
		obj.options[0] = new Option("--------------------", "");
		obj.length = 1;
				
		return false;
	}	
		
	if (row[0].split('!%!').length > 1) {
		for(var k = 0; k < row.length; k++) {
			obj.options[k] = new Option(row[k].split('!%!')[1], row[k].split('!%!')[0]);
			if (k == optionMaxIndex) {
				obj.options[k].selected = true;
			}			
		}
		
	} else {
		for(var k = 0; k < row.length; k++) {
			obj.options[k] = new Option(row[k],row[k]);
			if (k == optionMaxIndex) {
				obj.options[k].selected = true;
			}			
		}		
	}	
  	obj.length = optionMaxIndex;
  	
  	return true;
}

function setValues(cbObj, targetObj) {
 	with(document.frm) {
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
}

function check(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}	
	alert(obj.value);
}

function checkRadio(value) {
	document.frm.sales_type.value = value;
	if (value == 'ORIGIN') {
		document.frm.sales_type_name.value = '판매실적';
	} else {
		document.frm.sales_type_name.value = '조정된 판매실적';
	}	
}

////////////////////////////////////////////////////////////////////////////////
function disableText(obj) {
	var name = obj.name;
	var bool = obj.checked == true ? false : true;
	var color = bool == true ? '#CCCCCC' : '#FFFFFF';
	if (name == 'level_opt') {
		document.frm.level_ctl.disabled = bool;
		document.frm.level_ctl.style.backgroundColor = color;
		
	} else if (name == 'trend_opt') {
		document.frm.trend_ctl.disabled = bool;
		document.frm.trend_ctl.style.backgroundColor = color;
			
	} else {
		document.frm.smooth_ctl.disabled = bool;
		document.frm.smooth_ctl.style.backgroundColor = color;
	}
	
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
////////////////////////////////////////////////////////////////////////////////

function reloadMultiCB(keyObj, valObj) {
	if (keyObj.value == '' || keyObj.value == null) {		
    	return false;
    }

    var keys = keyObj.value.split("/%/");
    var vals = valObj.value.split("/%/");    
    var optionMaxIndex = keys.length - 1;
    if (optionMaxIndex == 0) {		
		return false;
	}
	
	for(var k = 0; k < keys.length; k++) {	
		loc = document.frm.added_list.length;			    
		document.frm.added_list.options[loc] = new Option(vals[k],keys[k]);		
	}
  
}

function reloadOrgCB(obj) {
	for (var i = 0; i < document.frm.select_1.options.length; i++) {
		var opt =  document.frm.select_1.options[i];
			
		var keys = obj.value.split("/%/");
		for (var n = 0; n < keys.length; n++) {
			if (keys[n] == document.frm.select_1.options[i].value) {
				document.frm.select_1.options[i] = null;				
				if ( i > 0 ) { i = i - 1; }					
			}
		}		
	}
} 

function add() {
	var selnum = 0
	for (var j = 0; j < document.frm.select_1.options.length; j++) {
	     if ( document.frm.select_1.options[j].selected == true) {
	        selnum = selnum + 1;        
	     }
	}
	
	if (selnum > 3 || document.frm.added_list.length > 2) {
		alert("3개 조건 이상 선택할 수 없습니다.");
		return;
	}
	
	if (selnum > 0) {		
        for (var i = 0; i < document.frm.select_1.options.length; i++) {
		    var opt = document.frm.select_1.options[i];
		    if (opt.selected == true) {
			    loc = document.frm.added_list.length;
			    var temp = document.frm.select_1.options[i].text;
			    var temp2 = document.frm.select_1.options[i].value;
			    document.frm.added_list.options[loc] =  new Option(temp,temp2);
			    
			    if (document.frm.added_key.value == '') {
			    	document.frm.added_key.value += temp2;
			    	document.frm.added_value.value += temp;		    	
			    } else {
			    	document.frm.added_key.value += "/%/"+temp2;
			    	document.frm.added_value.value += "/%/"+temp;
			    }
		    }
        }
	} else {
    	alert("추가할 객체가 선택되지 않았습니다.")
	}  
	
	delOriginal();
} 

function addOriginal() {
	for (var i = 0; i < document.frm.added_list.options.length; i++) {
		var opt =  document.frm.added_list.options[i];
		if (opt.selected == true) {
			loc = document.frm.select_1.length;
			var temp = document.frm.added_list.options[i].text;
			var temp2 = document.frm.added_list.options[i].value;
			document.frm.select_1.options[loc] =  new Option(temp,temp2);
		}
	}
}

function del() {
	addOriginal();
	var selnum = 0
	for (var j = 0; j < document.frm.added_list.options.length; j++) {
		if ( document.frm.added_list.options[j].selected == true) {
		   selnum = selnum + 1
		}
	}

	if (selnum > 0) {
		var keys = document.frm.added_key.value.split("/%/");
    	var vals = document.frm.added_value.value.split("/%/");
    	
    	document.frm.added_key.value = '';
    	document.frm.added_value.value = '';    	
    	var cnt = 0;
		for (var i = 0; i <  document.frm.added_list.options.length; i++) {
			var opt =  document.frm.added_list.options[i];
			if (opt.selected == true) {
				if (cnt <= 0) {
					document.frm.added_list.options[i] = null;				
					keys[i] = null;   
					vals[i] = null;
					
				} else {
					document.frm.added_list.options[i] = null;		
					keys[cnt] = null;   
					vals[cnt] = null;
				}
						
				i = i - 1;					
			}
			
			cnt++;			
		}
		
		for (var n = 0; n < keys.length; n++) {		
			if (keys[n] != '' && keys[n] !== null) {				
				if (document.frm.added_key.value == '') {
					document.frm.added_key.value += keys[n];
			    	document.frm.added_value.value += vals[n];			    		
				} else {
					document.frm.added_key.value += "/%/"+keys[n];
			    	document.frm.added_value.value += "/%/"+vals[n];		
				}
			}
		}
		
	}else {
	    alert("삭제할 개체가 선택되지 않았습니다.")
	    return;
	}
}

function delOriginal() {
	for (var i = 0; i < document.frm.select_1.options.length; i++) {
		var opt =  document.frm.select_1.options[i];
		
		if (opt.selected == true) {
			document.frm.select_1.options[i] = null;        
			i = i - 1;
		}
	}
}