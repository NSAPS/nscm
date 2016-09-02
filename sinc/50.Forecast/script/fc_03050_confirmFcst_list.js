deleteData = function(service) {
	if(document.frm.del_code.value == '') {
		alert('삭제 할 대상을 선택하여 주십시요.');
		return false;
	}
	
	if(!confirm("삭제 하시겠습니까?")){
		return;
	}
	
	viewWait(); 
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";		
	document.frm.submit();
}

doConfirm = function(service) {	
	// 계획 유형과 시작 월/주 항목은 필수 선택
	if( (document.frm.selected_plan_type.value == null || document.frm.selected_plan_type.value == "")
		|| (document.frm.selected_start_month_week.value == null || document.frm.selected_start_month_week.value == "") ){
		alert("'계획 유형' 이나 '시작 월/주' 항목을 선택하지 않았습니다.");
		return;
	}
	// 계획 유형이 '월간' 일때, 월간 수요예측 항목은 필수 선택
	else if( document.frm.selected_plan_type.value.toUpperCase() == "MONTH" 
		&& (document.frm.selected_month_fcst.value == null || document.frm.selected_month_fcst.value == "") ){
		alert("월간 수요예측을 선택하십시오.");
		return;
	}
	// 계획 유형이 '주간' 일때, 주간 수요예측 항목은 필수 선택
	else if( document.frm.selected_plan_type.value.toUpperCase() == "WEEK" 
		&& (document.frm.selected_week_fcst.value == null || document.frm.selected_week_fcst.value == "")){
		alert("주간 수요예측을 선택하십시오.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 	
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

doInterface = function(service) {	
	if(document.frm.selected_plan_type_if.value == '' ){
		alert("계획 유형을 선택하여 주십시요.");
		return;
	}
	
	if(document.frm.selected_fcst_if.value == '' ){
		alert("확정된 수요예측을 선택하여 주십시요.");
		return;
	}
	
	if(document.frm.start_if.value == '' ){
		alert("시작 월/주를 선택하여 주십시요.");
		return;
	}
		
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 	
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
};

//togle_checkbox
function togle_checkbox(obj){
	
	if(obj.value == "Y"){
		 obj.value = "N";
		 obj.checked = false;
	}
	else {obj.value = "Y";
		obj.checked = true;
	}
	//alert(obj.value);
	
}

// 계획 유형 선택시 시작 월/주 리스트 채움 & 월간 수요예측과 주간 수요예측 반영 enabled 시킴
function doChangePlanType(obj){
	
	if(!obj.value) return;
	
	var planType = document.frm.selected_plan_type.value;	
	
	startMonthWeekList(planType);	
	
	if(planType.toUpperCase() == "WEEK" ){		
		divMonthFcstTitle.style.display = "none";
		divMonthFcstBody.style.display = "none";
		divWeekFcstTitle.style.display = "none";	
		divWeekFcst.style.display = "none";				
	}
	else{		
		divMonthFcstTitle.style.display = "block";
		divMonthFcstBody.style.display = "block";
		divWeekFcstTitle.style.display = "block";	
		divWeekFcst.style.display = "block";			
	}
}

function startMonthWeekList(planType){
	
	if(!planType) return;
	
	forecast.getCodeList("selected_plan_type", planType, "conf_fcst_start_month_week", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				alert("일치하는 결과 값 리스트가  없습니다.");
			}
			else {
				var start_month_week = document.frm.selected_start_month_week_pre.value;				
				var div_start_month_week = "<select name=\"selected_start_month_week\" style=\"width:80px; \" >";				
				for( i = 0; i < arrList.length; i++){
					div_start_month_week += "<option value=\"" + arrList[i] + "\" ";
						if( arrList[i] == start_month_week)
							div_start_month_week += " selected ";
					div_start_month_week += ">" + arrList[i] + "</option>";					
				}
				div_start_month_week += "</select>";
				divStartMonthWeek.innerHTML = div_start_month_week;
			}
		}
	});
}

////////////////////////////////////////////////////////////////////////////////

function changeConfimedFcst(obj) {	
	var db_table = '';
	
	var selected_plan_type_if = obj.value;	
	if (selected_plan_type_if == 'MCONF') {
		db_table = 'FCST_PLAN_MONTHLY';	
		
	} else if (selected_plan_type_if == 'WCONF') {
		db_table = 'FCST_PLAN_WEEKLY';
		
	} 
	
	var paramKeys = 'selected_plan_type_if!%!db_table';
	var paramCodes = selected_plan_type_if+'!%!'+db_table;
	var columns = 'FCST_CODE!%!FCST_DESC';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_03050_confirmed_fcsts', columns, "!%!", "/%/", setConfimedFcstCB);
}

function setConfimedFcstCB(data) {
	var selected_fcst_if = document.frm.selected_fcst_if;
	if (hasComboBoxData(selected_fcst_if, data)) {		
		changeFcstStart(document.frm.selected_plan_type_if, selected_fcst_if);
	} else {
		document.frm.start_if.value = '';
	}	
}

function changeFcstStart(obj1, obj2) {	
	var db_table = '';
	var db_column = '';
	
	var selected_plan_type_if = obj1.value;	
	if (selected_plan_type_if == 'MCONF') {
		db_table = 'FCST_PLAN_MONTHLY';
		db_column = 'FCST_MONTH';
		
	} else if (selected_plan_type_if == 'WCONF') {
		db_table = 'FCST_PLAN_WEEKLY';
		db_column = 'FCST_WEEK';
	}
	
	var fcst_code = obj2.value;
	var paramKeys = 'db_table!%!db_column!%!fcst_code';
	var paramCodes = db_table+'!%!'+db_column+'!%!'+fcst_code;
	
	nongshim.getData(paramKeys, paramCodes, 'fc_03050_fcst_start', db_column, "!%!", "/%/", setFcstStartCB);
}

function setFcstStartCB(data) {
	if (data == '' || data == null) {
		return false;
    }
	document.frm.start_if.value = data.split("/%/")[0];
}

function hasComboBoxData(obj, data) {
	if (data == '' || data == null) {
		obj.options[0] = new Option("---------------------------", "");
		obj.length = 1;
		
    	return false;
    }

    var row = data.split("/%/");
    var optionMaxIndex = row.length - 1;
    if (optionMaxIndex == 0) {
		obj.options[0] = new Option("---------------------------", "");
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