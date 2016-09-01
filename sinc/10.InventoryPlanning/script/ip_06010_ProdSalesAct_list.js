function onclickfunc(row, col, data) {
	var pre_sel_type = document.frm.pre_sel_type.value;

	if(pre_sel_type == "10" || pre_sel_type == "20" || pre_sel_type == "30" 
		||pre_sel_type == "40"||pre_sel_type == "50"|| pre_sel_type == "60" || pre_sel_type == "70"
		||pre_sel_type == "80"){
		
		if((col == 1 || col == 2) && pre_sel_type != "20" ) { // 상위조회, 사업부단위일때는 제회
			/* 전체-영업부 => 전체-사업부(all)   */
			if(pre_sel_type == "10"){
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//영업조직코드
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//영업조직이름
				document.frm.in_sel_type.value = "20";
			}
			
			/* 상위영업지점 코드 가져온다. */
			if(pre_sel_type == "20" || pre_sel_type == "30" || pre_sel_type == "40" || pre_sel_type == "50")	{
				
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
						/* 지점-거래처 => 영업부-지점 */
						else if(pre_sel_type == "50")	{
							document.frm.in_sel_type.value = "40";
						}
					}
					GoSearch();					
				}
				});
			return;
		}
			/* 유통본부/거래처유형/배송지점인 경우 영업지점/배송지점/거래처로 연계조회 */
			if(pre_sel_type == "60" || pre_sel_type == "70" || pre_sel_type == "80")	{
				document.frm.in_sel_code.value = data.split("!%!")[0]
				GoSearch_special();	
				return;				
			}

			else return;
		}
		else if((col == 3 || col == 4)){ //하위조회
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
			/* 지점-거래처 => 거래처 담당 ALERT */
			else if(pre_sel_type == "50")	{
				commonUtil.getCodeInfo("in_cust_code", data.split("!%!")[2], "ip_06010_GetCustArea", { 
				callback:function(arrList){
					// 일치하는 CODE 없음
					if( arrList.length == 1 ) {
						alert(arrList[0][0]+"\n"+arrList[0][1]);
					}
					else {
						alert("해당거래처 담당이 존재하지 않습니다. \n 영업지원팀에 문의하세요");
					}
				}
				});
			return;
			}
			else return;
			document.frm.in_sales_loc.value = data.split("!%!")[2]; 		//영업조직코드
			document.frm.in_sales_loc_name.value = data.split("!%!")[3]; 	//영업조직이름

			GoSearch();

		}
		else if((col == 5 || col == 6) && document.frm.in_sel_type_special.value == "s01"){ //하위조회
			commonUtil.getCodeInfo("in_cust_code", data.split("!%!")[4], "ip_06010_GetCustArea", { 
			callback:function(arrList){
				// 일치하는 CODE 없음
				if( arrList.length == 1 ) {
					alert(arrList[0][0]+"\n"+arrList[0][1]);
				}
				else {
					alert("해당거래처 담당이 존재하지 않습니다. \n 영업지원팀에 문의하세요");
				}
			}
			});
			return;
		}	
		else return;

	}
			
}

function	doChange_sel_gubn(obj) {
	
	document.frm.in_item_id.value = "";
	document.frm.in_item_name.value = "";
}


// 영업조직 검색 POPUP
function openSalesLocPopup( obj ) { 	
	
	var	in_dept_grad = document.frm.in_dept_grad_code.value //document.frm.in_sel_type.value; 	//영업 GRADE	

	var service_url = "service.do?_moon_service=ip_06010_SalesLoc_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_dept_grad_code=" + in_dept_grad;
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
/*	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ) {
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
*/
	document.frm.in_sales_loc.value = "0000";
	document.frm.in_sales_loc_name.value = "전체";
	document.frm.in_dept_grad_code.value = "00";
	// 조회단위 COMBO 갱신
	sel_type_Change()	
	// 일간단위 조회
	if(document.frm.chk_sel_term.value == null || document.frm.chk_sel_term.value == "" ) {
		document.frm.chk_sel_term.value = "D";
	}
	// 조회단위 COMBO 갱신
	//sel_type_Change()	
	
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
	
	commonUtil.getCodeInfo("in_dept_grad_code",in_dept_grad_code,"ip_06010_SALES_ACT_SEL_GUBN", { 
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

	// special조회 clear!
	document.frm.in_sel_type_special.value = "";

	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("영업조직을 선택하시기 바랍니다!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //조회단위가 '품목','Top10_금액'인 경우는 제외
		alert("품목을 선택하시기 바랍니다!");
		return;
	}
	
// 속도개선으로 제외됨.	
//	if(document.frm.in_sel_type.value == "90" || document.frm.in_sel_type.value == "100") {
//		alert("품목단위 조회는 3~5분정도 소요됩니다!")
//	}
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
		
			// 전체에 대한 거래처단위로 조회시에는 일평균BOX가 1BOX를 초과하는 거래선만 조회한다.
			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("기간계가 큰 순으로 500개씩 조회합니다");
			}

			// 조회시 WAITING 이미지 보여주기
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // 조회버튼으로 조회시에는 무조건 첫페이지이다!
			document.frm._moon_service.value = "ip_06010_ProdSalesAct_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};


// 조회(special)
GoSearch_special = function() {

	// special조회 SETUP!
	document.frm.in_sel_type_special.value = "s01";
	
	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("영업조직을 선택하시기 바랍니다!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //조회단위가 '품목','Top10_금액'인 경우는 제외
		alert("품목을 선택하시기 바랍니다!");
		return;
	}
	
	if(document.frm.in_sel_type.value == "90" || document.frm.in_sel_type.value == "100") {
		alert("품목단위 조회는 3~5분정도 소요됩니다!")
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
		
			// 전체에 대한 거래처단위로 조회시에는 일평균BOX가 1BOX를 초과하는 거래선만 조회한다.
			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("기간계가 큰 순으로 500개씩 조회합니다");
			}

			// 조회시 WAITING 이미지 보여주기
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // 조회버튼으로 조회시에는 무조건 첫페이지이다!
			document.frm._moon_service.value = "ip_06010_ProdSalesAct_list"; 
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


