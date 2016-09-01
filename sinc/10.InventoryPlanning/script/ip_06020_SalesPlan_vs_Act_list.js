// grid 클릭동작
function onclickfunc(row, col, data) {
	var pre_sel_type = document.frm.pre_sel_type.value;
	var	in_sales_loc = document.frm.in_sales_loc.value;

	if(pre_sel_type == "10" || pre_sel_type == "20" || pre_sel_type == "30" 
		||pre_sel_type == "40"||pre_sel_type == "50"){
		
		if((col == 1 || col == 2) ) { // 상위조회, 사업부단위일때는 제회
			/* 전체-영업부 => 전체-사업부(all)   */
			if(pre_sel_type == "10"){
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//영업조직코드
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//영업조직이름
				document.frm.in_sel_type.value = "20";
			}

			/* 상위영업지점 코드 가져온다. */
			if(pre_sel_type == "20" || pre_sel_type == "30" || pre_sel_type == "40")	{
				
				var in_fr_date = document.frm.in_fr_date.value;
				var	in_sales_loc = data.split("!%!")[0];
				
				commonUtil.getCodeInfo("in_fr_date!%!in_sales_loc", in_fr_date+"!%!"+in_sales_loc, "ip_06010_GetPrioDept", { 
				callback:function(arrList){
					// 일치하는 CODE 없음
					if( arrList.length == 1 ) {
						document.frm.in_sales_loc.value = arrList[0][0]; 		//영업조직코드
						document.frm.in_sales_loc_name.value = arrList[0][1]; 	//영업조직이름

						/* 전체-영업부 => 전체-사업부(all)   */
						if(pre_sel_type == "20"){
							document.frm.in_sel_type.value = "20";
						}
						/* 사업부-영업부 => 전체-사업부   */
						else if(pre_sel_type == "30"){
							document.frm.in_sel_type.value = "20";
						}
						/* 영업부-지점 => 사업부-영업부 */
						else if(pre_sel_type == "40")	{
							document.frm.in_sel_type.value = "30";
						}

					}
					GoSearch();					
				}
				});
			return;
			}
			/* 지점-배송지점 => 영업부-지점  */
			if(pre_sel_type == "50")	{
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//영업조직코드
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//영업조직이름
				document.frm.in_sel_type.value = "40";
			}
		}
		else if((col == 3 || col == 4) && pre_sel_type != "50" ){ //하위조회
			document.frm.in_sales_loc.value = data.split("!%!")[2]; 		//영업조직코드
			document.frm.in_sales_loc_name.value = data.split("!%!")[3]; 	//영업조직이름
			/* 전체-사업부 => 사업부-영업부 */
			if(pre_sel_type == "20"){
				document.frm.in_sel_type.value = "30";
			}
			/* 사업부-영업부 => 영업부-지점 */
			else if(pre_sel_type == "30")	{
				document.frm.in_sel_type.value = "40";
			}
			/* 영업부-지점 => 지점-거래처 */
			else if(pre_sel_type == "40")	{
				document.frm.in_sel_type.value = "50";
			}
		}
		else return;
		GoSearch();
	}
			
}

function	doChange_sel_gubn(obj) {
	
	document.frm.in_item_id.value = "";
	document.frm.in_item_name.value = "";
}


// 영업조직 검색 POPUP
function openSalesLocPopup( obj ) { 	
	
	var	in_dept_grad = document.frm.in_sel_type.value; 	//영업 GRADE	

	var service_url = "service.do?_moon_service=ip_06010_SalesLoc_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_dept_grad=" + in_dept_grad;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "SalesLoc_Search", pop_win_style);
	newWin.focus();

}

// 품목 POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//조회품목 상태 : '01'판매중	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
	}
	else{
		var service_url = "service.do?_moon_service=ip_06010_Prty_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_sel_gubn=" + in_sel_gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();		
	}
}

// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}
function getSalesLoc_Default() {

	// 처음 조회할 경우만 1000 마켓총괄로 조회한다.
	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ) {
		commonUtil.getCodeInfo("input_value", "", "ip_06010_SalesLoc_Default", { 
			callback:function(arrList){
				// 일치하는 CODE 없음
				if( arrList.length == 1 ) {
					document.frm.in_sales_loc.value = arrList[0][0];
					document.frm.in_sales_loc_name.value = arrList[0][1];
					document.frm.in_dept_grad_code.value = "10";
					// 조회단위 COMBO 갱신
					sel_type_Change()	
					// 일간단위 조회
					document.frm.chk_sel_term.value = "D";
				}
				else if( arrList.length > 1){							
					document.frm.in_sales_loc.value = "";
					document.frm.in_sales_loc_name.value = "";
				}
				else {
					return;
				}
			}
		});
	}
	// 조회단위 COMBO 갱신
	sel_type_Change()	
	
}


function getSalesLocName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_sales_loc_name.value = "";
		return;
	}

	commonUtil.getCodeInfo("in_sales_loc", objBox.value, "ip_06010_F_GETSALESLOCNAME", { 
		callback:function(arrList){
			// 일치하는 CODE 없음
			if( arrList.length == 1 ) {
				document.frm.in_sales_loc_name.value = arrList[0][0];
				document.frm.in_dept_grad_code.value = arrList[0][1];
				// 조회단위 COMBO 갱신
				sel_type_Change()	
			}
			else if( arrList.length > 1){							
				document.frm.in_sales_loc_name.value = "";
			}
			else {
				return;
			}
		}
	});

}


function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+document.frm.in_sel_gubn.value;

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup 띄운다! 
				openItemPopup();
			}
		}
	});
}

function sel_type_Change(){
	
	var in_dept_grad_code = document.frm.in_dept_grad_code.value;
	var pre_sel_type = document.frm.pre_sel_type.value;
	var in_div;
	
	commonUtil.getCodeInfo("in_dept_grad_code",in_dept_grad_code,"ip_06020_SALES_PLAN_VS_ACT", { 
	callback:function(arrList){
		in_div = "<select name=\"in_sel_type\" OnChange=\"\">";
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<option value="+arrList[i][0]
			if(pre_sel_type == arrList[i][0]){
				in_div += " selected ";	
			}
			in_div +=	">"+arrList[i][1]+"</option>";
		}	
		in_div += "</select>";
		divSalesLoc.innerHTML = in_div;
	}
	});
}

// 해당 플레그에대한 선택값 할당
function doCheckFlag(obj){
	
	// in_sel_term - 월간,일간 조회CHECK
	if(obj.name == "in_sel_term" ){ 
		if(obj.checked){
				document.frm.chk_sel_term.value = "M"; //월간
		}
		else{
				document.frm.chk_sel_term.value = "D"; //일간
		}
	}
}

// 조회
GoSearch = function() {

	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("영업조직을 선택하시기 바랍니다!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //조회단위가 '품목','Top10_금액'인 경우는 제외
		alert("품목을 선택하시기 바랍니다!");
		return;
	}
	
	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+document.frm.chk_sel_term.value;

	// 날짜기간 무결성 check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"ip_06010_TERM_CHECK", { 
		callback:function(arrList){
			var check_return = -9;
			if( arrList.length == 1 ) {
				var check_return = arrList[0][0];
			}
			
			if (check_return == -1){
				alert("종료일이 시작일보다 빠릅니다!");
				return;
			}
			else if (check_return == -2){
				alert("일자별은 31일, 월별은 12개월로만 조회됩니다");
				return;
			}
			else if (check_return == -9){
				alert("날짜 오류입니다");
				return;
			}

			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("지점-배송지점조회는 1분이상 소요됩니다.");
			}

			// 조회시 WAITING 이미지 보여주기
			viewWait();
		
			
			document.frm._moon_service.value = "ip_06020_SalesPlan_vs_Act_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};

// enter check 용 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// 자기화면 갱신
	//		GoSearch();
		}
	} 
}

// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
function setGridAutoResize2( tab_h, table_h ){
	
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
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
} 


