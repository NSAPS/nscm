
// 이전화면으로 이동
function moveBack() {
	
	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_alloc_item_name = document.frm.in_alloc_item_name.value;

	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_list";
	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&item_name=" + in_alloc_item_name;

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	location.href = urlStr;

}

function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_alloc_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.in_alloc_item_name.value = arrList[0][1];
				document.frm.item_name.value = arrList[0][1];
				document.frm.in_alloc_reason_comment.value = "";
			}
			else if( arrList.length > 1){							
				document.frm.in_alloc_item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// 공급할당 추가요청만 조회 -> checkbox값을 hidden data에 반영
function doCheckReqtYN(obj){

	if(obj.checked){
			document.frm.chk_reqt_yn.value = "Y";
	}
	else{
			document.frm.chk_reqt_yn.value = "N";
	}
}

// 제품 검색 POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//작업일자		
	var	in_date_term = "3"; 					//조회기간	
	var	in_term_cnt	 = "0"; 												//조회일자	

	if( in_work_date == "" || in_work_date == null ) {
		alert("작업일자를 입력하십시요!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term+"&in_term_cnt=" + in_term_cnt;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();
}

// 조회
GoSearch = function() {
	
	var service		= "ip_02040_SalesAllocation_mod";

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
	
};

// 저장
GoSave = function() {

	var service		= "ip_02040_SalesAllocation_mod_comp";

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
	
};

function check_change1(obj,row) {

	document.frm.save_flag_ab[row-1].value = "Y"
}

function check_change2(obj,row) {

	document.frm.save_flag[row-1].value = "Y"
}

function alloc_rate_change(obj) {
	
	// 공급할당 NFOS전송후이므로 변경할 수 없다.
	if(document.frm.alloc_flag.value == "Y") {
		alert("NOFS전송후이므로 추가할당율만 설정이 가능합니다!");
		return; 
	}
	
	if(document.frm.old_alloc_rate.value == obj.value) return; //값이 바뀌지 않았다.

	var rowNo = main_tbody.rows.length;
	var	chang_alloc_rate	= obj.value;
	var sales_plan = 0;
	var new_alloc_box = 0;

	if(rowNo == 1){ // 판매계획이 한건만 존재할경우...
		// 영업지점의 판매계획+판촉계획을 계산한다.
		sales_plan = Number(document.frm.sel_sales_plan.value) + Number(document.frm.sel_promo_plan.value);
		
		// 판매계획이 0이 아니면...
		if(sales_plan > 0) {
			
			// 전체 할당율을 영업지점 공급할당율로 적용한다.
			document.frm.sel_alloc_rate.value 		= chang_alloc_rate;
			divAlloc_rate.innerHTML 				= numberFormat(chang_alloc_rate)+"%";
			
			// 영업지점 공급할당량을 변경한다.
			new_alloc_box = Number(Math.round(chang_alloc_rate*sales_plan/100));
			document.frm.sel_alloc_box.value 	= new_alloc_box;
			
			// 저장하도록 변경구분 정정
			document.frm.save_flag_ab.value = "Y"			
		}
		
	}
	else {

		for(var i = 0 ; i < rowNo ; i++){
			// 영업지점의 판매계획+판촉계획을 계산한다.
			sales_plan = Number(document.frm.sel_sales_plan[i].value) + Number(document.frm.sel_promo_plan[i].value);
			
			// 판매계획이 0이 아니면...
			if(sales_plan > 0) {
				
				// 전체 할당율을 영업지점 공급할당율로 적용한다.
				document.frm.sel_alloc_rate[i].value 	= chang_alloc_rate;
				divAlloc_rate[i].innerHTML 				= numberFormat(chang_alloc_rate);
				
				// 영업지점 공급할당량을 변경한다.
				new_alloc_box = Number(Math.round(chang_alloc_rate*sales_plan/100));
				document.frm.sel_alloc_box[i].value 	= new_alloc_box;

				// 저장하도록 변경구분 정정
				document.frm.save_flag_ab[i].value = "Y"			
				
			}
		}
	}
	document.frm.old_alloc_rate.value = chang_alloc_rate;
	alert(chang_alloc_rate+"%"+"로 할당완료 되었습니다! 저장하면 반영됩니다.");	
	
}

function add_alloc_rate_change(obj) {

	if(document.frm.old_add_alloc_rate.value == obj.value) return; //값이 바뀌지 않았다.

	var rowNo = main_tbody.rows.length;
	var	chang_add_alloc_rate	= obj.value;
	var sales_plan = 0;
	var new_add_alloc_box = 0;

	if(rowNo == 1){ // 판매계획이 한건만 존재할경우...
		// 영업지점의 판매계획+판촉계획을 계산한다.
		sales_plan = Number(document.frm.sel_sales_plan.value) + Number(document.frm.sel_promo_plan.value);
		
		// 판매계획이 0이 아니면...
		if(sales_plan > 0) {
			
			// 영업지점 추가 공급할당량을 변경한다.
			new_add_alloc_box = Number(Math.round(chang_add_alloc_rate*sales_plan/100));
			document.frm.sel_add_alloc_box.value 	= new_add_alloc_box;

			// 저장하도록 변경구분 정정
			document.frm.save_flag.value = "Y"			
			
		}
		
	}
	else {

		for(var i = 0 ; i < rowNo ; i++){
	
			// 영업지점의 판매계획+판촉계획을 계산한다.
			sales_plan = Number(document.frm.sel_sales_plan[i].value) + Number(document.frm.sel_promo_plan[i].value);
			
			// 판매계획이 0이 아니면...
			if(sales_plan > 0) {
				
				// 영업지점 공급할당량을 변경한다.
				new_add_alloc_box = Number(Math.round(chang_add_alloc_rate*sales_plan/100));
				document.frm.sel_add_alloc_box[i].value 	= new_add_alloc_box;

				// 저장하도록 변경구분 정정
				document.frm.save_flag[i].value = "Y"			

			}
		}
	}
	document.frm.old_add_alloc_rate.value = chang_add_alloc_rate;
	alert(chang_add_alloc_rate+"%"+"로 추가할당이 완료되었습니다! 저장하면 반영됩니다.");	
	
}

function enter_alloc(obj) {
		// TAB(9) or ENTER(13)
	if( event.keyCode == "13" ) {
		alloc_rate_change(obj);
	}
}

function enter_add_alloc(obj) {
		// TAB(9) or ENTER(13)
	if( event.keyCode == "13" ) {
		add_alloc_rate_change(obj);
	}
}

// 코드 String 체크
// 영문 & _ (underscore) 만 허용, 영문은 대문자로 변환
function chkCodeStr( objBox ) {
	
	var output = new String;
	var tmp; 
	
	var str = objBox.value.toUpperCase();
	var strSize = str.length;
	
	for (i = 0; i < strSize; i++) 
	{ 
		var charStr = str.charCodeAt(i);
		if( ( 48 <= charStr && charStr <= 57 ) // 0 ~ 9 
				|| ( 65 <= charStr && charStr <= 90 ) // A ~ Z
				|| ( 97 <= charStr && charStr <= 122 ) // a ~ z 
				|| ( charStr == 95 ) ) // _ (underscore)
		{ 
			output += String.fromCharCode( charStr ); 
		} 
		else 
		{ 
			// no action
			// alert("영문, 숫자, Underscore 이외의 문자는 입력할 수 없습니다."); return false; 
		} 
	} 
		
	objBox.value = output;
	
}


