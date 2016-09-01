// 배분율/비용 체크박스 클릭시 이벤트
function checkBoxChange(obj){
	//alert(document.frm.alloc_cost_kind.length);
	var costLen = document.frm.alloc_cost_kind.length;
	if(obj.value == "ALLOC_RATE"){	// 배분율 체크시	
		document.frm.alloc_rate.checked = true;	
		document.frm.alloc_rate_cat01.value = "Y";	
		document.frm.alloc_cost.checked = false;
		document.frm.alloc_cost_cat01.value = "N";
		for(i = 0; i < costLen; i++){
			//alert(document.frm.alloc_cost_kind[i].value);			
			document.frm.alloc_cost_kind[i].checked = false;
			document.frm.alloc_cost_kind_cat01[i].value = "N";
			document.frm.alloc_cost_kind[i].disabled = true;
			//alert(document.frm.alloc_cost_kind_cat01[i].value);
		}		
	}else if(obj.value == "ALLOC_COST"){ // 비율 체크시
		document.frm.alloc_rate.checked = false;
		document.frm.alloc_rate_cat01.value = "N";		 
		document.frm.alloc_cost.checked = true;
		document.frm.alloc_cost_cat01.value = "Y";
		for(i = 0; i < costLen; i++){
			document.frm.alloc_cost_kind[i].disabled = false;
		}		
	}
}

// 비용의 하위 체크박스 클릭시 이벤트
function allocCostcheckBoxClick(idx){
	//alert(document.frm.alloc_cost_kind[Number(idx)-1].checked);
	//alert(idx);
	
	if(document.frm.alloc_cost_kind[Number(idx)-1].checked){
		document.frm.alloc_cost_kind_cat01[Number(idx)-1].value = "Y"
	}
	else{
		document.frm.alloc_cost_kind_cat01[Number(idx)-1].value = "N"
	} 
		
	//alert(document.frm.alloc_cost_kind_cat01[Number(idx)-1].value);	
	var allocCost = document.frm.alloc_cost_kind[Number(idx)-1].value;
	var allocCostLen = document.frm.alloc_cost_kind.length;
	if( (allocCost == "REAL_FIX_COST") || (allocCost == "REAL_CHG_COST") ){
		for( i = 0; i < allocCostLen; i++){
			if( (document.frm.alloc_cost_kind[i].value == "STD_CHG_COST") || (document.frm.alloc_cost_kind[i].value == "STD_FIX_COST") ){
				document.frm.alloc_cost_kind[i].checked = false;
				document.frm.alloc_cost_kind_cat01[i].value = "N";				
			}
		}
	}else if((allocCost == "STD_CHG_COST") || (allocCost == "STD_FIX_COST")){
		for( i = 0; i < allocCostLen; i++){
			if( (document.frm.alloc_cost_kind[i].value == "REAL_FIX_COST") || (document.frm.alloc_cost_kind[i].value == "REAL_CHG_COST") ){
				document.frm.alloc_cost_kind[i].checked = false;
				document.frm.alloc_cost_kind_cat01[i].value = "N";				
			}
		}
	}
}


// 저장
function GoSave( service ) {
	
	/*for(i=0;i<5;i++){
		alert(document.frm.alloc_cost_kind[i].value + "," + document.frm.alloc_cost_kind_cd[i].value + 
		"," + document.frm.alloc_cost_kind_cat01[i].value );
	}return;*/
		
	var allocCostLen = document.frm.alloc_cost_kind.length;	
	//alert(allocCostLen);
	
	if(document.frm.alloc_cost.checked){
		var allocCostCnt = 0;
		for(i = 0; i < allocCostLen; i++){
			if(document.frm.alloc_cost_kind[i].checked)
				allocCostCnt++;
		}
		// 비용을 체크하고 하위 체크박스를 체크하지 않았을 시
		if( allocCostCnt < 1 ) {
			alert("비용의 하위메뉴를 하나 이상 체크를 해야합니다.");		
			return;
		}
	}	
		
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// HTML Grid 화면 resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLine.style.height.split("px")[0]; 
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17; 
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	} 
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	if( leftDiplayHeightValue < 1 ) 
		leftDiplayHeightValue = 1; 
	if( mainDiplayHeightValue < 1 ) 
		mainDiplayHeightValue = 1; 
	
	if( tableWidthValue < 1 ) 
		tableWidthValue = 1; 
	if( topLineWidthValue < 1 ) 
		topLineWidthValue = 1; 
	if( displayWidthValue < 1 ) 
		displayWidthValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
} 

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

// 제품별 공장할당 정보 POPUP
function onclickfunc( row, col, data ) {
	
	if( col < 2 || col > 3 ) return;
	
	var itemId = data.split("!%!")[1]; 
	
	var service_url = "service.do?_moon_service=sc_03030_plantAllocationPolicy_popup&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&item_id=" + itemId;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=580, height=400, top=0, left=0";
	var newWin = window.open(service_url, "SC_PLANT_ALLOC_POP", pop_win_style); 
	newWin.focus();
	
}

// 코드 검색 POPUP
// type_input : sales_cat2 select box name
// id_input : id input box name
// name_input : name input box name
// w_size : widths of popup window
// h_size : heights of popup window
//
// 쿼리에서 id_input 을 조건으로 어떤 SQL 을 적용시킬 지를 결정
// 제품검색 : id_input = item_id
function openCodeSearchPop( type_input, id_input, name_input, w_size, h_size ) {

	// 영업품종 분류2 
	var sales_cat2 = document.getElementById(type_input).value;
	
	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup 창의 넓이, 높이를 지정하지 않은 경우, default 사이즈 설정
	if( !(w_size) ) {
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup_for_plant_alloc&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&code_input=" + code_input + "&id_input=" + id_input + "&name_input=" + name_input; 
	
	if( sales_cat2 != null && sales_cat2 != ""){
		service_url += "&sales_cat2=" + sales_cat2;
	}
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width="
						+ w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus();
	
}

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
			}
			else {
				return;
			}
		}
	});
	
}