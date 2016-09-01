// input box 를 Edit Mode 로 변환
function setEditMode1( obj ) {

	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box 를 View Mode 로 변환
function setViewMode1( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box 를 View Mode 로 변환
function setViewMode2( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"BOX"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// 셀 저장 전역변수
var objTdG;

// 클릭한 비축일자 인덱스
var clickedDateIdx = null;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {  
	clickedDateIdx = null;
}

function setEndDate( objDate ){
	var tableLen = objDate.parentNode.parentNode.parentNode.rowIndex;
	alert(tableLen);
	alert(objDate.value)
}


// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// 비축일자 셀인 경우
	if( objTd.childNodes(0).id == "divStartDate" || objTd.childNodes(0).id == "divEndDate") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"saveDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.saveDateTmp.value = objTd.childNodes(1).value;
		document.frm.saveDateTmp.focus();
		Calendar.setup({
			inputField  : "saveDateTmp", // id of the input field
			ifFormat    : "%Y-%m-%d",     // format of the input field 
			button      : "btnDate",      // trigger for the calendar (button ID)
			align       : "Tl",           // alignment (defaults to "Bl")
			singleClick : true
		});
	}
	else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
	}
	
	objTd.onclick = "";

}

// combo box 를 View Mode 로 변환
function setViewMode(objBox) {
	
	// 비축일자 셀인 경우
	if( objBox.name == "saveDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		objTd.childNodes(1).value = strVal;
		
		// start_date를 선택하면 자동으로 end_date에 셋팅되도록 설정하는 부분.
		var tableRow = objBox.parentNode.parentNode.parentNode.rowIndex;
		tableRow = tableRow-2;
		if(objTd.childNodes(1).name == "start_date"){   
			if(document.frm.start_date[tableRow]){
				var m_date = document.frm.start_date[tableRow].value;
				document.frm.end_date[tableRow].value = m_date;
				divEndDate[tableRow].innerHTML = m_date;
			}
			else{
				var m_date = document.frm.start_date.value;
				document.frm.end_date.value = m_date;
				divEndDate.innerHTML = m_date;
			}
		}
	}
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	else if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	if( objTd.align.toUpperCase() == "CENTER" ) {

		objTd.childNodes(0).innerHTML = strVal;
	}
	else if( objTd.align.toUpperCase() == "RIGHT" ) {
		objTd.childNodes(0).innerHTML = numberFormat(strVal) + "&nbsp;"+ "&nbsp;";
	}
	else {
		objTd.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	objTd.onclick = function() { setEditMode(this); };

}
// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식
function chkDate2(obj) {
	
	var separator = "-"; 
	
	var str = obj.value.trim();
	
	if( str == "" || str == null ){
		obj.value = str;
		setViewMode(obj);
		return 1;
	}
	
	str = str.replace(/\//g, '').replace(/-/g, '');
	obj.value = str.substr(0, 4) + separator + str.substr(4, 2) + separator + str.substr(6, 2);
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
	var dateType = "yyyy-MM-dd"; 
	var inputYear = input.substr(0,4); 
	var inputMonth = input.substr(5,2) - 1; 
	var inputDate = input.substr(8,2); 
	
	if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
	{ 
		separator = "invalid"; 
	}
	
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != 10 || separator == "invalid" ) 
	{ 
		obj.value = ""; 
		//obj.select(); 
		alertChkDate(input, dateType); 
		setEditMode( obj.parentNode );
		return 0; 
	} 
	else 
	{ 
		//setViewMode(obj);
		return 1; 
	} 
	
}
function doChange(obj, Idx){ //개별 로우의 수치 변경시 사용

	var Idx 			= Idx; //첫째열은1_12  둘째열은 13~24
//alert("Idx="+Idx);	

	var prdt_lt 		= "";//생산리드타임
	var inpt_lt			= "";//입고리드타임
	var safety_parm 	= "";//안전계수
	var std_dev 		= "";//표준편차
	var safety_stoc		= "";//안전재고
	var camp_stoc 		= "";//임시안전재고
	var save_stoc 		= "";//비축재고
	var opti_save_lvl	= "";//최적재고수준

	prdt_lt 		= Number(document.frm.prdt_lt[Idx].value);
	inpt_lt 		= Number(document.frm.inpt_lt[Idx].value);
	sqrt 			= Math.sqrt(prdt_lt+inpt_lt);
	safety_parm 	= Number(document.frm.safety_parm[Idx].value);
	std_dev 		= Number(document.frm.std_dev[Idx].value);
	safety_stoc 	= Number(document.frm.safety_stoc[Idx].value);
	camp_stoc 		= Number(document.frm.camp_stoc[Idx].value);
	save_stoc 		= Number(document.frm.save_stoc[Idx].value);
	opti_save_lvl 	= Number(document.frm.opti_save_lvl[Idx].value);

//alert("prdt_lt="+prdt_lt);
//alert("inpt_lt="+inpt_lt);
//alert("safety_parm="+safety_parm);
//alert("std_dev="+std_dev);
//alert("safety_stoc="+safety_stoc);
//alert("save_stoc="+save_stoc);
//alert("save_period="+save_period);
//alert("opti_save_lvl="+opti_save_lvl);

//alert("prdt_lt+inpt_lt="+(prdt_lt+inpt_lt));
//alert("sqrt="+sqrt);

	safety_stoc		= safety_parm*(sqrt*std_dev);
	opti_save_lvl	= safety_stoc+camp_stoc+save_stoc;
	
	document.frm.safety_stoc[Idx].value		= parseInt(safety_stoc);
	document.frm.opti_save_lvl[Idx].value	= parseInt(opti_save_lvl);
	
	setViewMode1( document.frm.safety_stoc[Idx]);
	setViewMode1( document.frm.opti_save_lvl[Idx]);
	
	
	var lastIdx = left_tbody.rows.length;
	
	//CalculTotal(lastIdx);
	
}	

// 
function	doChange1(obj, Idx, lastIdx){ //각 필드 최상단의 입력필드에 대한 일괄 변경시 사용

	//var Idx 		= rowIdx; //첫째열은1_12  둘째열은 13~24
	var prdt_lt 	= "";
	var objName = obj.name;
	var in_prdt_lt 			= Number(document.frm.in_prdt_lt.value);
	var in_inpt_lt 			= Number(document.frm.in_inpt_lt.value);
	var in_safety_parm 		= Number(document.frm.in_safety_parm.value);
	var in_camp_stoc 		= Number(document.frm.in_camp_stoc.value);
	var in_save_stoc 		= Number(document.frm.in_save_stoc.value);

	if( objName == "in_prdt_lt" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.prdt_lt[Idx].value		= in_prdt_lt;
			doChange( document.frm.prdt_lt[Idx], Idx);
		}
	}
	else if( objName == "in_inpt_lt" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.inpt_lt[Idx].value		= in_inpt_lt;
			doChange( document.frm.inpt_lt[Idx], Idx);
		}
	}
	else if( objName == "in_safety_parm" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.safety_parm[Idx].value		= in_safety_parm;
			doChange( document.frm.safety_parm[Idx], Idx);
		}
	}
	else if( objName == "in_camp_stoc" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.camp_stoc[Idx].value		= in_camp_stoc;
			doChange( document.frm.camp_stoc[Idx], Idx);
		}
	}
	else if( objName == "in_save_stoc" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.save_stoc[Idx].value		= in_save_stoc;
			doChange( document.frm.save_stoc[Idx], Idx);
		}
	}
	CalculTotal(lastIdx);

}

function	doChange2(obj, Idx, lastIdx){ //지정된 값을 임시 안전재고에 할당

	//var Idx 		= rowIdx; //첫째열은1_12  둘째열은 13~24
	var objName = obj.name;
	var in_safety_stoc 		= Number(document.frm.safety_stoc[Idx].value);
	var in_avg3week 		= Number(document.frm.avg3week[Idx].value);
	var in_avg1week 		= Number(document.frm.avg1week[Idx].value);
//	var checked_button		= document.frm.checked_button[Idx].value;
	var in_camp_stock 		= "";

	var rate 				= Number(document.frm.rate.value);
	var checked_button;
	


	if( document.frm.rate.value == "" ){
		alert("할당 비율을 입력하십시요.");
		return;
	}	

	if(document.frm.checked_button[0].checked){
		checked_button = document.frm.checked_button[0].value;
	}
	else if(document.frm.checked_button[1].checked){
		checked_button = document.frm.checked_button[1].value;
	}
	else if(document.frm.checked_button[2].checked){
		checked_button = document.frm.checked_button[2].value;
	}
	else{
		alert("할당 대상을 먼저 선택 해야 합니다.");
		return;
	}	
	
	
	if(checked_button == "safety"){
		for(Idx ; Idx<lastIdx ; Idx++) {
			in_camp_stock =  parseInt((document.frm.safety_stoc[Idx].value * rate)/100)
			document.frm.camp_stoc[Idx].value		=  in_camp_stock ;
			doChange( document.frm.camp_stoc[Idx], Idx);
		}
	}
	else if(checked_button == "3week"){
		for(Idx ; Idx<lastIdx ; Idx++) {
			//in_camp_stock =  (Number(document.frm.avg3week[Idx].value) * rate)/100
			in_camp_stock =  parseInt((document.frm.avg3week[Idx].value * rate)/100)
			document.frm.camp_stoc[Idx].value		=  in_camp_stock ;
			doChange( document.frm.camp_stoc[Idx], Idx);
		}
	}
	else if(checked_button == "1week"){
		for(Idx ; Idx<lastIdx ; Idx++) {
			//in_camp_stock =  (Number(document.frm.avg1week[Idx].value) * rate)/100
			in_camp_stock =  parseInt((document.frm.avg1week[Idx].value * rate)/100)
			document.frm.camp_stoc[Idx].value		=  in_camp_stock ;
			doChange( document.frm.camp_stoc[Idx], Idx);
		}
	}


	if( objName == "in_camp_stoc" ) {
		for(Idx ; Idx<lastIdx ; Idx++) {
			document.frm.camp_stoc[Idx].value		= in_camp_stoc;
			doChange( document.frm.camp_stoc[Idx], Idx);
		}
	}

	CalculTotal(lastIdx);

}


function	SetFlag(obj, Idx){
	var item_name	= document.frm.item_name.value
	var dc_name		= document.frm.dc_name[Idx].value
	var safe_stoc_flag = frm.safe_stoc_flag[Idx].value
	
	
	
	if(obj.checked){
		if(confirm(dc_name+"에 크로스도킹을  설정하겠습니까?") == 1 ) {
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_flag[Idx].value = "01";
				//document.frm.safety_parm[Idx].value		= 0;
				//doChange( document.frm.safety_parm[Idx], Idx);
			}
			else{
				document.frm.safe_stoc_flag.value = "01";
				//document.frm.safety_parm.value		= 0;
				//doChange( document.frm.safety_parm, Idx);	
			}
		}
		else{
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_chk[Idx].checked=false;
			}
			else{
				document.frm.safe_stoc_chk.checked=false;
			}		
		}
	}
	else{
		if(confirm(dc_name+"에 크로스도킹을  해제하겠습니까?") == 1 ) {
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_flag[Idx].value = "00";
				//document.frm.safety_parm[Idx].value		= 2.3;
				//doChange( document.frm.safety_parm[Idx], Idx);//	
			}
			else{
				document.frm.safe_stoc_flag.value = "00";
				//document.frm.safety_parm.value		= 2.3;
				//doChange( document.frm.safety_parm, Idx);//	
			}
		}
		else{
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_chk[Idx].checked=true;
			}
			else{
				document.frm.safe_stoc_chk.checked=true;
			}		
		}
	}
}

function	ResetDate(obj, Idx, lastIdx){
	var Idx = 0;	

	for(Idx ; Idx<lastIdx ; Idx++) {
		var r_date = "";

		document.frm.start_date[Idx].value		= r_date;
		document.frm.end_date[Idx].value		= r_date;
		document.frm.save_stoc[Idx].value		= 0;
			
		divStartDate[Idx].innerHTML = r_date;			
		divEndDate[Idx].innerHTML = r_date;	
		doChange( document.frm.save_stoc[Idx], Idx);//할당가능율	
	}
}

function CalculTotal(lastIdx){
	var Idx = 0;	

	var std_dev 		= "";
	var avg3week 		= "";
	var avg1week 		= "";
	var safety_stoc 	= "";
	var camp_stoc 		= "";
	var save_stoc 		= "";
	var opti_save_lvl 	= "";
	
	var std_dev_total	= 0;
	var avg3week_total	= 0;
	var avg1week_total	= 0;
	var safety_total	= 0;
	var camp_total		= 0;
	var save_total		= 0;
	var opti_save_total	= 0;

	for(Idx ; Idx<lastIdx ; Idx++) {
		
		//if(document.frm.std_dev[Idx]){// 변수들이 배열인지 아닌지 판별 
			std_dev 		= Number(document.frm.std_dev[Idx].value);
			avg3week 		= Number(document.frm.avg3week[Idx].value);
			avg1week 		= Number(document.frm.avg1week[Idx].value);
			safety_stoc 	= Number(document.frm.safety_stoc[Idx].value);
			camp_stoc 		= Number(document.frm.camp_stoc[Idx].value);
			save_stoc 		= Number(document.frm.save_stoc[Idx].value);
			opti_save_lvl 	= Number(document.frm.opti_save_lvl[Idx].value);
//		}else{
//			std_dev 		= Number(document.frm.std_dev.value);
//			avg3week 		= Number(document.frm.avg3week.value);
//			avg1week 		= Number(document.frm.avg1week.value);
//			safety_stoc 	= Number(document.frm.safety_stoc.value);
//			camp_stoc 		= Number(document.frm.camp_stoc.value);
//			save_stoc 		= Number(document.frm.save_stoc.value);
//			opti_save_lvl 	= Number(document.frm.opti_save_lvl.value);
//		}		
		


		std_dev_total 	= std_dev_total 	+ std_dev;
		avg3week_total 	= avg3week_total 	+ avg3week;
		avg1week_total 	= avg1week_total 	+ avg1week;
		safety_total 	= safety_total 		+ safety_stoc;
		camp_total 		= camp_total 		+ camp_stoc;
		save_total 		= save_total 		+ save_stoc;
		opti_save_total = opti_save_total 	+ opti_save_lvl;
	
	}
	divStdDev_total.innerHTML 		= numberFormat(std_dev_total)+"&nbsp;"+"&nbsp;";
	div3weekTotal.innerHTML 		= numberFormat(avg3week_total)+"&nbsp;"+"&nbsp;";
	div1weekTotal.innerHTML 		= numberFormat(avg1week_total)+"&nbsp;"+"&nbsp;";
	divSafetyTotal.innerHTML 		= numberFormat(safety_total)+"&nbsp;"+"&nbsp;";
	divCampTotal.innerHTML 			= numberFormat(camp_total)+"&nbsp;"+"&nbsp;";
	divSaveTotal.innerHTML 			= numberFormat(save_total)+"&nbsp;"+"&nbsp;";
	div_opti_save_total.innerHTML 	= numberFormat(opti_save_total)+"&nbsp;"+"&nbsp;";
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
			document.frm.item_name.value = "";
//			openItemSearchPop(input, 400, 400);
			}
			else {
//alert(33);
				return;
			}
		}
	});
	
}

// 제품 검색 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 
	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}
