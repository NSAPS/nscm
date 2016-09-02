// 제품 검색 POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//작업일자		
	var	in_date_term = document.frm.sel_date_term.value; 					//조회기간	

	if( in_work_date == "" || in_work_date == null ) {
		alert("작업일자를 입력하십시요!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();
	
}

// 추가요청 사유 POPUP
function openRequestAllocReasonListPopup(col_no, dw3_row, day_cnt) { 	
	
	var this_work_date		= document.frm.sel_work_date[col_no].value; 
	var this_dw3_sales_id 	= document.frm.sel_dw3_sales_id[dw3_row].value;
	var this_dw3_dc_id 		= document.frm.sel_dw3_dc_id[dw3_row].value;

	var in_paramKey = "sel_work_date!%!sel_sales_id!%!sel_dc_id";
	var in_paramCode = this_work_date+"!%!"+this_dw3_sales_id+"!%!"+this_dw3_dc_id;

	commonUtil.getCodeInfo(in_paramKey,in_paramCode,"ip_02030requestAllocReasonSearch", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				alert("요청자 : "+arrList[0][0]+"\n추가요청사유 :"+ arrList[0][1]);
			}
			else {
				return;
			}
		}
	});
	
}

// 공급할당확정 여부를 DWR로 확인한다.
function checkAllocFlag(this_work_date){

	commonUtil.getCodeList("sel_work_date",this_work_date,"ip_02030checkAllocFlag", { 
		callback:function(arrList){
			return arrList[0];
		}
	});
	
}

// 추가공급할당확정 여부를 DWR로 확인한다.
function checkAddAllocFlag(this_work_date){

	commonUtil.getCodeList("sel_work_date",this_work_date,"ip_02030checkAddAllocFlag", { 
		callback:function(arrList){
			return arrList[0];
		}
	});
	
}

// 조회
GoSearch = function(service) {
	
	var tmp_work_date	= document.frm.in_work_date.value;
	document.frm.work_date.value = delDateDelimiter(tmp_work_date);
	var in_alloc_item = document.frm.in_alloc_item.value;
	
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("공급할당 품목을 선택하십시요!");
		document.frm.in_alloc_item.select();
		return;
	} 

	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = "200"; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 저장
GoSave = function(service) {

	var rowNo_DW3 = main_tbody2.rows.length;
	if(rowNo_DW3 < 1){
		alert("저장할 데이터가 없습니다!");
	}

	var in_alloc_item = document.frm.in_alloc_item.value;
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("공급할당 품목을 선택하십시요!");
		document.frm.in_alloc_item.select();
		return;
	} 

	// 현재 조회하고 있는 품목을 저장해 놓는다! 작업중에 품목이 바뀌는 것 방지!!!
	var old_alloc_item = document.frm.old_alloc_item.value;
	if(Number(in_alloc_item) != Number(old_alloc_item)){
		alert("계획중에 다른품목을 선택하고 있습니다! 다시 조회후 작업하십시요!");	
		return;
	}

	if(confirm("작업내용을 저장하겠습니까?") == 1 ) {

		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = service; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}

};

// 삭제
GoDelete = function(service,day_cnt) {
	
	var in_alloc_item = document.frm.in_alloc_item.value;
	var this_cnfm_date = "";
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("공급할당 품목을 선택하십시요!");
		document.frm.in_alloc_item.select();
		return;
	} 

	var run_cnt = 0;
	for(var i = 0 ; i < day_cnt; i++){

		// 공급할당 마감일에 대해 공급할당량을 삭제하려는 경우 방지
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"일은 공급할당작업이 마감되었으므로 삭제할 수 없습니다!");
			return;
		}

		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_gubn[i].value == "2" ){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("삭제할 공급할당일이 없습니다.");
		return;
	} 

	if(confirm("선택한 공급할당일의 공급할당정보를 삭제하시겠습니까?") == 1 ) {

		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = service; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}
	
};

// 공급할당량을 생성여부 checkbox값을 hidden data에 반영
function doCheckAlloc(obj, Idx){

	if(obj.checked){
		if(document.frm.chk_alloc_request[Idx]){
			document.frm.chk_alloc_request[Idx].value = "Y";
			document.frm.chk_add_alloc_request[Idx].value = "Y";
		}
		else{
			document.frm.chk_alloc_request.value = "Y";
			document.frm.chk_add_alloc_request.value = "Y";
		}
	}
	else{
		if(document.frm.chk_alloc_request[Idx]){
			document.frm.chk_alloc_request[Idx].value = "N";
			document.frm.chk_add_alloc_request[Idx].value = "N";
		}
		else{
			document.frm.chk_alloc_request.value = "N";
			document.frm.chk_add_alloc_request.value = "N";
		}
	}
	
}

function	createAllocQty(day_cnt){

	var in_alloc_item = document.frm.in_alloc_item.value
	var this_cnfm_date = "";
	
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("공급할당 품목을 선택하십시요!");
		document.frm.in_alloc_item.select();
		return;
	} 

	var run_cnt = 0;
	for(var i = 0 ; i < day_cnt; i++){

		// 공급할당 마감일에 대해 공급할당량을 생성하려는 경우 방지
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"일은 공급할당작업이 마감되었으므로 공급할당량생성을 할 수 없습니다!");
			return;
		}

		if(document.frm.chk_alloc_request[i].value == "Y"){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("한개 이상의 공급할당생성일을 선택하십시요!");
		return;
	} 


	if(confirm("선택한 공급할당일의 공급할당량을 생성하시겠습니까?") == 1 ) {

		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = "ip_02030_SP_IP_CreateAllocationQty_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}

}

function	confirmAllocPlan(day_cnt){
	var run_cnt = 0;
	var this_cnfm_date = "";
	for(var i = 0 ; i < day_cnt; i++){

		// 공급할당 마감일에 대해 다시 공급할당작업 확정을 하려는 경우 방지
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"일은 공급할당작업이 이미 마감되었습니다!");
			return;
		}
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "N"){
			run_cnt++;	
		}
		
	}
	
	if( run_cnt == 0 ) {
		alert("확정할 공급할당일을 선택하십시요!");
		return;
	}

	if(confirm("선택한 공급할당일의 공급할당작업을 확정하시겠습니까? \n확정 후에는 NFOS로 바로 연계됩니다!") == 1 ) {

		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = "ip_02030_confirmDC_ALLOC_PLAN_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}
}

function	addAllocPlan(day_cnt){
	var run_cnt = 0;
	var this_cnfm_date = "";
	for(var i = 0 ; i < day_cnt; i++){

		// 공급할당 마감이 안되었는데 추가 공급할당확정을 하려는 경우 방지
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "N"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"일은 공급할당작업 마감이 되지 않았습니다!");
			return;
		}
		// 추가공급할당 마감일에 대해 다시 확정을 하려는 경우 방지
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_add_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"일은 추가 공급할당작업이 이미 마감되었습니다!");
			return;
		}
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_add_alloc_flag[i].value == "N"){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("확정할 추가공급일을 선택하십시요!");
		return;
	}


	if(confirm("선택한 공급할당일의 추가공급할당작업을 확정하시겠습니까? \n확정 후에는 NFOS로 바로 연계됩니다!") == 1 ) {
		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = "ip_02030_addDC_ALLOC_PLAN_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}	
}

function dwClear(){
/*	main_tbodyTop.innerHTML = "";
	left_tbody.innerHTML = "";
	main_tbody.innerHTML = "";
	left_tbody2.innerHTML = "";
	main_tbody2.innerHTML = "";
	*/
}

// dw1의 기초재고,재고일수,할당가능율을 재계산한다.
function calc_dw1() {

	var this_alloc_yn;
	var this_base_stock = 0;
	var this_receipt_box = 0;
	var this_sales_plan = 0;
	var this_alloc_box = 0;
	var next_base_stock = 0;
	
	var day_term = document.frm.sel_date_term.value; // 날짜 갯수
	for(var i=0 ; i < day_term ; i++){

		this_alloc_yn 		= Number(document.frm.sel_alloc_gubn[i].value);
		this_base_stock		= Number(document.frm.sel_base_stock[i].value);
		this_receipt_box	= Number(document.frm.sel_receipt_box[i].value);
		this_sales_plan		= Number(document.frm.sel_sales_plan[i].value) + Number(document.frm.sel_promo_plan[i].value);
		this_alloc_box		= Number(document.frm.sel_real_alloc_box[i].value);
		this_issue_box		= Number(document.frm.sel_issue_box[i].value);

		// 재고일수, 할당가능율
		if(this_base_stock==0){
			document.frm.sel_stock_day[i].value			= 0;
			div_stock_day[i].innerHTML					= 0;			
			document.frm.sel_can_alloc_rate[i].value	= 0;
			div_can_alloc_rate[i].innerHTML				= 0;			
		}
		else{
			document.frm.sel_stock_day[i].value			= Math.round(this_base_stock/this_sales_plan*10)/10;
			div_stock_day[i].innerHTML					= numberFormat(Math.round(this_base_stock/this_sales_plan*10)/10);			
			document.frm.sel_can_alloc_rate[i].value	= Math.round(this_base_stock/this_sales_plan*100);
			div_can_alloc_rate[i].innerHTML				= numberFormat(Math.round(this_base_stock/this_sales_plan*100))+'%';			
		}

		// 다음날의 기초재고 setting
		if( i < day_term - 1 ) {

			if( i == 0 ){ // 처음 다음날 기초재고 계산시는 출고를 뺀다
				next_base_stock = Number(this_base_stock) + Number(this_receipt_box) - Number(this_issue_box);
			}
			else if(this_alloc_yn == "2"){
				next_base_stock = Number(this_base_stock) + Number(this_receipt_box) - Number(this_alloc_box);
			}
			else{
				if(Number(this_alloc_box) > 0 ){
					next_base_stock = Number(this_base_stock) + Number(this_receipt_box) - Number(this_alloc_box);
				}
				else{
					next_base_stock = Number(this_base_stock) + Number(this_receipt_box) - Number(this_sales_plan);
				}
			}

			// 다음날 기초재고
			document.frm.sel_base_stock[i+1].value 	= next_base_stock;
			div_base_stock[i+1].innerHTML 			= numberFormat(next_base_stock);
		}
	}
}

// dw2의  기초재고,재고일수,할당가능율을 재계산한다.
function calc_dw2(dw2_row) {

	var this_dc_alloc_yn;
	var this_dc_base_stock = 0;
	var this_dc_receipt_box = 0;
	var this_dc_sales_plan = 0;
	var this_dc_alloc_box = 0;
	var next_dc_base_stock = 0;
	
	var day_term = document.frm.sel_date_term.value; // 날짜 갯수
	for(var i=0 ; i < day_term ; i++){

		this_alloc_yn 			= Number(document.frm.sel_alloc_gubn[i].value);
		this_dc_base_stock		= Number(document.frm.sel_dc_base_stock[day_term*dw2_row+i].value);
		this_dc_receipt_box		= Number(document.frm.sel_dc_receipt_box[day_term*dw2_row+i].value);
		this_dc_sales_plan		= Number(document.frm.sel_dc_sales_plan[day_term*dw2_row+i].value) + Number(document.frm.sel_dc_promo_plan[day_term*dw2_row+i].value);
		this_dc_alloc_box		= Number(document.frm.sel_dc_alloc_box[day_term*dw2_row+i].value);
		this_dc_issue_box		= Number(document.frm.sel_dc_issue_box[day_term*dw2_row+i].value);
alert(this_dc_sales_plan);

		// 재고일수, 할당가능율
		if(this_dc_base_stock==0){
			document.frm.sel_dc_stock_day[day_term*dw2_row+i].value			= 0;
			div_dc_stock_day[day_term*dw2_row+i].innerHTML					= 0;			
			document.frm.sel_dc_can_alloc_rate[day_term*dw2_row+i].value	= 0;
			div_dc_can_alloc_rate[day_term*dw2_row+i].innerHTML				= 0;			
		}
		else if(this_dc_sales_plan == 0){
			document.frm.sel_dc_stock_day[day_term*dw2_row+i].value			= 0;
			div_dc_stock_day[day_term*dw2_row+i].innerHTML					= 0;			
			document.frm.sel_dc_can_alloc_rate[day_term*dw2_row+i].value	= 0;
			div_dc_can_alloc_rate[day_term*dw2_row+i].innerHTML				= 0;			
		}
		else{
			document.frm.sel_dc_stock_day[day_term*dw2_row+i].value			= Math.round(this_dc_base_stock/this_dc_sales_plan*10)/10;
			div_dc_stock_day[day_term*dw2_row+i].innerHTML					= numberFormat(Math.round(this_dc_base_stock/this_dc_sales_plan*10)/10);			
			document.frm.sel_dc_can_alloc_rate[day_term*dw2_row+i].value	= Math.round(this_dc_base_stock/this_dc_sales_plan*100);
			div_dc_can_alloc_rate[day_term*dw2_row+i].innerHTML				= numberFormat(Math.round(this_dc_base_stock/this_dc_sales_plan*100))+'%';			
		}

		// 다음날의 기초재고 setting
		if( i < day_term - 1 ) {

			if( i == 0 ){ // 처음 다음날 기초재고 계산시는 출고를 뺀다
				next_dc_base_stock = Number(this_dc_base_stock) + Number(this_dc_receipt_box) - Number(this_dc_issue_box);
			}
			else if(this_alloc_yn == "2"){
				next_dc_base_stock = Number(this_dc_base_stock) + Number(this_dc_receipt_box) - Number(this_dc_alloc_box);
			}
			else{
				if(Number(this_dc_alloc_box) > 0 ){
					next_dc_base_stock = Number(this_dc_base_stock) + Number(this_dc_receipt_box) - Number(this_dc_alloc_box);
				}
				else{
					next_dc_base_stock = Number(this_dc_base_stock) + Number(this_dc_receipt_box) - Number(this_dc_sales_plan);
				}
			}
			// 다음날 기초재고
			document.frm.sel_dc_base_stock[day_term*dw2_row+i+1].value 	= next_dc_base_stock;
			div_dc_base_stock[day_term*dw2_row+i+1].innerHTML 			= numberFormat(next_dc_base_stock);
		}
	}
}

// dw1의 할당율,할당량이 변경시 처리한다.
// 1.정정량이 이전량보다 작으면 통과
// 2.정정량이 기초재고+입고량보다 크면 정정불가
// 3.정정이 허용되면 실제할당량도 같이 변경한다 -> 실제 기초재고 계산시 사용
//   -> 저장하기까지는 실제할당량은 알수없다.
function	doChange_dw1(obj,objnum,col_no){
	
	var this_sales_plan 	= Number(document.frm.sel_sales_plan[col_no].value) + Number(document.frm.sel_promo_plan[col_no].value);
	var this_alloc_rate 	= 0;
	var this_alloc_box		= 0;
	var old_alloc_rate		= Number(document.frm.old_tot_alloc_rate[col_no].value);
	var old_alloc_box		= Number(document.frm.old_tot_alloc_box[col_no].value);

	if(objnum == 0){ // 할당율 변경시
		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_alloc_rate);
			return;
		}
		this_alloc_rate	= Number(obj.value);
		this_alloc_box	= Number(Math.round(this_alloc_rate*this_sales_plan/100));
	}
	else{ //할당량 변경시
		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_alloc_box);
			return;
		}
		this_alloc_box 	= Number(obj.value);
		if(this_sales_plan == 0)	this_alloc_rate = 0;
		else	this_alloc_rate	= Number(Math.round(this_alloc_box/this_sales_plan*100));
	}

	var this_base_stock 	= Number(document.frm.sel_base_stock[col_no].value);
	var this_receipt_box	= Number(document.frm.sel_receipt_box[col_no].value);
	var this_expt_box		= this_base_stock + this_receipt_box;
	var this_term_box		= this_alloc_box - this_expt_box	
	if(this_alloc_box > this_base_stock+this_receipt_box){
		alert("할당량이 (기초재고+입고예정)= "+this_expt_box+"을 "+this_term_box+"만큼 초과했습니다! \n정정할 수 없습니다!");
		
		document.frm.sel_tot_alloc_rate[col_no].value	= numberFormat(old_alloc_rate);
		document.frm.sel_tot_alloc_box[col_no].value 	= numberFormat(old_alloc_box);
		return;
	}

	document.frm.sel_tot_alloc_rate[col_no].value 	= numberFormat(this_alloc_rate);
	document.frm.sel_tot_alloc_box[col_no].value 	= numberFormat(this_alloc_box);
	document.frm.old_tot_alloc_rate[col_no].value 	= this_alloc_rate;
	document.frm.old_tot_alloc_box[col_no].value 	= this_alloc_box;

	document.frm.sel_real_alloc_rate[col_no].value	= this_alloc_rate;
	document.frm.sel_real_alloc_box[col_no].value 	= this_alloc_box;
	div_real_alloc_rate[col_no].innerHTML 			= numberFormat(this_alloc_rate);
	div_real_alloc_box[col_no].innerHTML 			= numberFormat(this_alloc_box);

	calc_dw1();	
}

// dw2의 할당율,할당량이 변경시 처리한다.
// 1. 할당량 변경시 이전량보다 작으면 통과
// 2. 할당량이 기초재고보다 작으면 통과
// 3. 할당량이 기초재고보다 크면 같은 날짜의 DC보충요구량 총합과 그날의 수송가능량과 비교
// 4. 할당량이 정정되면 지점 할당량도 변경한다. 판매계획, 또는 기타 지분으로!
function	doChange_dw2(obj, objnum, col_no, dw2_row, day_cnt){

	var this_dc_alloc_rate;
	var this_dc_alloc_box;
	var old_dc_alloc_rate	= Number(document.frm.old_dc_alloc_rate[dw2_row*day_cnt+col_no].value);
	var old_dc_alloc_box 	= Number(document.frm.old_dc_alloc_box[dw2_row*day_cnt+col_no].value);

	var this_dc_sales_plan = Number(document.frm.sel_dc_sales_plan[dw2_row*day_cnt+col_no].value) + Number(document.frm.sel_dc_promo_plan[dw2_row*day_cnt+col_no].value);
	var this_dc_base_stock = Number(document.frm.sel_dc_base_stock[dw2_row*day_cnt+col_no].value); 
	
	if(objnum == 0){ // 할당율 변경시

		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_dc_alloc_rate);
			return;
		}
		this_dc_alloc_rate	= Number(obj.value);
		this_dc_alloc_box 	= Number(Math.round(this_dc_alloc_rate*this_dc_sales_plan/100));
	}
	else{ //할당량 변경시

		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_dc_alloc_box);
			return;
		}
		this_dc_alloc_box 	= Number(obj.value);
		if(this_dc_sales_plan == 0)	this_dc_alloc_rate = 0;
		else this_dc_alloc_rate 	= Number(Math.round(this_dc_alloc_box/this_dc_sales_plan*100));
	}

	if(this_dc_alloc_box > old_dc_alloc_box){ //정정수량이 이전수량보다 큰경우!

		if(this_dc_base_stock - this_dc_alloc_box < 0){ // DC의 기초재고로 공급할당 추가량을 cover하지 못할때
			// dw1의 수송가능량과 dw2의 보충요구량의 합을 비교한다.
			var this_remn_tran_box 	= Number(delComma(document.frm.sel_remn_tran_box[col_no].value)); //dw1의 수송가능량
			var this_tot_reqt_box = 0;
			var rowNo = main_tbody.rows.length;

			for(i=0 ; i<rowNo ; i++){ // DC의 보충필요량을 모두 더한다

				if(i != dw2_row){ // 다른 DC의 보충요구량
					this_tot_reqt_box = this_tot_reqt_box + Number(delComma(document.frm.sel_dc_receipt_box[i*day_cnt+col_no].value));
				}
				else{ // 정정된 보충요구량을 추가한다.
					this_tot_reqt_box = this_tot_reqt_box + this_dc_alloc_box
				}
			}

			if(this_tot_reqt_box > this_remn_tran_box ){
				alert("수송가능량을 초과했습니다. 정정할 수 없습니다!");
				// 할당율, 할당량 변경 불가
				document.frm.sel_dc_alloc_rate[dw2_row*day_cnt+col_no].value = numberFormat(old_dc_alloc_rate);
				document.frm.sel_dc_alloc_box[dw2_row*day_cnt+col_no].value = numberFormat(old_dc_alloc_box);
				obj.select();
				return;
			}
			// 보충요구수량 정정
			document.frm.sel_dc_receipt_box[dw2_row*day_cnt+col_no].value	= this_dc_alloc_box - this_dc_base_stock;
			div_dc_receipt_box[dw2_row*day_cnt+col_no].innerHTML = numberFormat(this_dc_alloc_box - this_dc_base_stock);
		}
		
	}

	// 해당 DC를 사용하는 지점의 판매계획지분을 계산하고 할당량을 계산한다..
	var rowNo_DW3 = main_tbody2.rows.length;
	var this_dw2_dc_id = Number(document.frm.sel_dw2_dc_id[dw2_row].value);
	var comp_dw3_dc_id;
	var this_sl_sales_plan = 0;
	var this_sl_quota_rate = 0;
	var this_sl_alloc_rate = 0;
	var this_sl_alloc_box = 0;
	for(var i = 0 ; i < rowNo_DW3 ; i++){
		comp_dw3_dc_id = Number(document.frm.sel_dw3_dc_id[i].value); 
		if(this_dw2_dc_id == comp_dw3_dc_id){
			//영업지점의 판매계획
			this_sl_sales_plan	= Number(document.frm.sel_sl_sales_plan[i*day_cnt+col_no].value) + Number(document.frm.sel_sl_promo_plan[i*day_cnt+col_no].value);
			if(this_dc_sales_plan == 0){ //배송지점의 판매계획인 0이면 단, 공급할당을 판매실적이나 기타로 하면 달라질 수 있다!
				this_sl_quota_rate	= 0;
				this_sl_alloc_box	= 0;
				this_sl_alloc_rate	= 0;
			}
			else {
				if(this_sl_sales_plan == 0){ //영업지점의 판매계획이 0이면 단, 공급할당을 판매실적이나 기타로 하면 달라질 수 있다!
					this_sl_quota_rate	= 0;
					this_sl_alloc_box	= 0;
					this_sl_alloc_rate	= 0;
				}
				else{
					this_sl_quota_rate	= Number(Math.round(this_sl_sales_plan/this_dc_sales_plan*100)/100);
					this_sl_alloc_box	= Number(Math.floor(this_dc_alloc_box * this_sl_quota_rate));
					this_sl_alloc_rate	= Number(Math.round(this_sl_alloc_box/this_sl_sales_plan*100));
				}
			}

			//영업지점의 할당율,할당량을 새로 셋팅한다.
			document.frm.sel_sl_alloc_rate[i*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_rate);
			document.frm.old_sl_alloc_rate[i*day_cnt+col_no].value 	= this_sl_alloc_rate;
			document.frm.sel_sl_alloc_box[i*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_box);
			document.frm.old_sl_alloc_box[i*day_cnt+col_no].value 	= this_sl_alloc_box;
		}
	}

	// 정정수량이 원래수량보다 작은경우 보충요구량도 감량시키지 않았다 -> 추후 확인 	
	document.frm.sel_dc_alloc_rate[dw2_row*day_cnt+col_no].value 	= numberFormat(this_dc_alloc_rate);
	document.frm.sel_dc_alloc_box[dw2_row*day_cnt+col_no].value 	= numberFormat(this_dc_alloc_box);
	document.frm.old_dc_alloc_rate[dw2_row*day_cnt+col_no].value 	= this_dc_alloc_rate;
	document.frm.old_dc_alloc_box[dw2_row*day_cnt+col_no].value 	= this_dc_alloc_box;
	
	calc_dw2(dw2_row);	//dw2 기초재고 재계산
}

// dw3의 할당율,할당량이 변경시 처리한다.
// 1.할당량이 이전량보다 작으면 통과
// 2.할당량이 이전량보다 크고 해당출고장의 기초재고-같은 DC를 사용하는 지점의 할당량 총합 > 0 이면 통과
// 3.할당량이 2번의 경우로 cover되지 않으면 "출고장의 보충요구량 추가가 가능한지 확인하세요" 표시 저장불가   
function	doChange_dw3(obj, objnum, col_no, dw3_row, day_cnt){

	var this_sl_alloc_rate;
	var this_sl_alloc_box;
	var old_sl_alloc_rate	= Number(document.frm.old_sl_alloc_rate[dw3_row*day_cnt+col_no].value);
	var old_sl_alloc_box 	= Number(document.frm.old_sl_alloc_box[dw3_row*day_cnt+col_no].value);
	var this_sl_sales_plan	= Number(document.frm.sel_sl_sales_plan[dw3_row*day_cnt+col_no].value) + Number(document.frm.sel_sl_promo_plan[dw3_row*day_cnt+col_no].value);


	// 판매계획이 0일때 할당량을 셋팅하면 할당율은 0로 한다.
	if(objnum == 0){ // 할당율 변경시
		
		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_sl_alloc_rate);
			return;
		}
		this_sl_alloc_rate	= Number(obj.value);
		if(this_sl_sales_plan == 0)
			this_sl_alloc_box 	= 0;
		else
			this_sl_alloc_box 	= Number(Math.round(this_sl_alloc_rate*this_sl_sales_plan/100));
	}
	else{ //할당량 변경시

		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_sl_alloc_box);
			return;
		}
		this_sl_alloc_box 	= Number(obj.value);
		if(this_sl_sales_plan == 0)
			this_sl_alloc_rate 	= 0;
		else
			this_sl_alloc_rate 	= Number(Math.round(this_sl_alloc_box/this_sl_sales_plan*100));
	}

	if(this_sl_alloc_rate > old_sl_alloc_box){ //정정수량이 이전수량보다 큰경우!
		
		//DW3에서 같은 DC를 사용하는 영업지점 할당량의 총합을 구하고 DW2의 기초재고를 비교한다
		//DW2의 배송지점 기초재고
		var rowNo_DW2 			= main_tbody.rows.length;
		var this_dw3_dc_id		= Number(document.frm.sel_dw3_dc_id[dw3_row].value);
		var comp_dw2_dc_id;
		var this_dc_expt_stock 	= 0;
		for(var i = 0 ; i < rowNo_DW2 ; i++){
			comp_dw2_dc_id = Number(document.frm.sel_dw2_dc_id[i].value);
			if(comp_dw2_dc_id == this_dw3_dc_id){
				this_dc_expt_stock = Number(document.frm.sel_dc_base_stock[i*day_cnt+col_no].value)+Number(document.frm.sel_dc_receipt_box[i*day_cnt+col_no].value);
			}
		}

		var rowNo_DW3 = main_tbody2.rows.length;
		var tot_sl_alloc_box = 0;
		var comp_dw3_dc_id;
		// DW3의 영업지점 공급할당량 총합
		for(var i = 0 ; i < rowNo_DW3 ; i++){
			comp_dw3_dc_id = Number(document.frm.sel_dw3_dc_id[i].value);
			if(this_dw3_dc_id == comp_dw3_dc_id){
				if(i != dw3_row){
					tot_sl_alloc_box = tot_sl_alloc_box + Number(document.frm.old_sl_alloc_box[i*day_cnt+col_no].value);
				}
				else{
					tot_sl_alloc_box = tot_sl_alloc_box + this_sl_alloc_box;
				}
			}
		}
		
		if(tot_sl_alloc_box > this_dc_expt_stock){

			var sl_alloc_term_box = tot_sl_alloc_box - this_dc_expt_stock;

			alert("해당 배송지점의 (기초재고+보충필요량)= "+this_dc_expt_stock+"을 "+sl_alloc_term_box+"만큼 초과했습니다.\n배송지점 할당량을 확인하십시요!");
			// 할당율, 할당량 변경 불가
			document.frm.sel_sl_alloc_rate[dw3_row*day_cnt+col_no].value = numberFormat(old_sl_alloc_rate);
			document.frm.sel_sl_alloc_box[dw3_row*day_cnt+col_no].value = numberFormat(old_sl_alloc_box);
			obj.select();
			return;
		}
	}

	//영업지점의 할당율,할당량을 새로 셋팅한다.
	document.frm.sel_sl_alloc_rate[dw3_row*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_rate);
	document.frm.old_sl_alloc_rate[dw3_row*day_cnt+col_no].value 	= this_sl_alloc_rate;
	document.frm.sel_sl_alloc_box[dw3_row*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_box);
	document.frm.old_sl_alloc_box[dw3_row*day_cnt+col_no].value 	= this_sl_alloc_box;

}

// dw3의 추가할당량 변경시 처리한다.
// 1.추가할당량이 이전보다 작으면 통과
// 2.추가할당량이 이전량보다 크고 해당출고장의 기초재고-같은 DC를 사용하는 지점의 할당량+추가할당량 총합 > 0 이면 통과
// 3.할당량이 2번의 경우로 cover되지 않으면 "출고장의 보충요구량 기초재고가 부족합니다." 표시 저장불가   
function	doChange_dw3_add(obj, objnum, col_no, dw3_row, day_cnt){

	var old_add_alloc_box	= Number(document.frm.old_add_alloc_box[dw3_row*day_cnt+col_no].value);

	if(checkNum(obj,"BLANK_INT_UP") == false){
		obj.value = numberFormat(old_add_alloc_box);
		return;
	}

	var this_add_alloc_box = Number(obj.value);

	if(this_add_alloc_box > old_add_alloc_box){ //정정수량이 이전수량보다 큰경우!
		
		//DW3에서 같은 DC를 사용하는 영업지점 할당량의 총합을 구하고 DW2의 기초재고를 비교한다
		//DW2의 배송지점 기초재고
		var rowNo_DW2 			= main_tbody.rows.length;
		var this_dw3_dc_id		= Number(document.frm.sel_dw3_dc_id[dw3_row].value);
		var comp_dw2_dc_id;
		var this_dc_expt_stock 	= 0;
		for(var i = 0 ; i < rowNo_DW2 ; i++){
			comp_dw2_dc_id = Number(document.frm.sel_dw2_dc_id[i].value);
			if(comp_dw2_dc_id == this_dw3_dc_id){
				this_dc_expt_stock = Number(document.frm.sel_dc_base_stock[i*day_cnt+col_no].value)+Number(document.frm.sel_dc_receipt_box[i*day_cnt+col_no].value);
			}
		}

		var rowNo_DW3 = main_tbody2.rows.length;
		var tot_sl_alloc_box = 0;
		var comp_dw3_dc_id;
		// DW3의 영업지점 공급할당량 + 추가공급할당량 총합
		for(var i = 0 ; i < rowNo_DW3 ; i++){
			comp_dw3_dc_id = Number(document.frm.sel_dw3_dc_id[i].value);
			if(this_dw3_dc_id == comp_dw3_dc_id){
				if(i != dw3_row){
					tot_sl_alloc_box = tot_sl_alloc_box + Number(document.frm.old_sl_alloc_box[i*day_cnt+col_no].value)
										+ Number(document.frm.old_add_alloc_box[i*day_cnt+col_no].value);
				}
				else{
					tot_sl_alloc_box = tot_sl_alloc_box + Number(document.frm.old_sl_alloc_box[i*day_cnt+col_no].value)
										+ this_add_alloc_box;
				}
			}
		}
		
		if(tot_sl_alloc_box > this_dc_expt_stock){

			var sl_alloc_term_box = tot_sl_alloc_box - this_dc_expt_stock;

			alert("해당 배송지점의 (기초재고+보충필요량)= "+this_dc_expt_stock+"을 "+sl_alloc_term_box+"만큼 초과했습니다!");
			// 할당율, 할당량 변경 불가
			document.frm.sel_add_alloc_box[dw3_row*day_cnt+col_no].value = numberFormat(old_add_alloc_box);
			obj.select();
			return;
		}
	}

	//영업지점의 추가할당량 다시 셋팅한다.
	document.frm.sel_add_alloc_box[dw3_row*day_cnt+col_no].value 	= numberFormat(this_add_alloc_box);
	document.frm.old_add_alloc_box[dw3_row*day_cnt+col_no].value 	= this_add_alloc_box;
}

// TAB key 로 다음 항목 이동
function moveNextBox( obj, col_no, row, day_cnt ) {
	
	var objName 	= obj.name;
	var rowNo_DW2 	= main_tbody.rows.length - 1;
	var rowNo_DW3 	= main_tbody2.rows.length - 1;
	var next_row	= 0;

	// TAB(9) or ENTER(13)
	if( event.keyCode == "13" ) {
		// DW1 할당율
		if( objName == "sel_tot_alloc_rate" ) {
			document.frm.sel_tot_alloc_box[col_no].select();
			return;
		}
		// DW1 할당량 -> doChange_dw1호출
		else if( objName == "sel_tot_alloc_box" ) {
			doChange_dw1(obj,1,col_no);
			return;
		}
		// DW2 할당율
		else if( objName == "sel_dc_alloc_rate" ) {
			if(row == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_dc_alloc_rate[next_row].select();
			return;
		}
		// DW2 할당량
		else if( objName == "sel_dc_alloc_box" ) {
			if(row == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_dc_alloc_box[next_row].select();
			return;
		}
		// DW3 할당율
		else if( objName == "sel_sl_alloc_rate" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_sl_alloc_rate[next_row].select();
			return;
		}
		// DW3 할당량
		else if( objName == "sel_sl_alloc_box" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_sl_alloc_box[next_row].select();
			return;
		}
		// DW3 추가할당량
		else if( objName == "sel_add_alloc_box" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_add_alloc_box[next_row].select();
			return;
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
	}
	
}


// HTML Grid 의 X좌표 정의 
function scrollTopX() {
	document.all.topLineTop.scrollLeft = document.all.mainDisplayTop.scrollLeft;
}

// HTML Grid 의 X좌표 정의 
function scroll2X() {
	document.all.topLine2.scrollLeft = document.all.mainDisplay2.scrollLeft;
}
// HTML Grid 의 Y좌표 정의 
function scroll2Y() {
	document.all.leftDisplay2.scrollTop = document.all.mainDisplay2.scrollTop;
}

// HTML Grid 화면 resizing
function setHtmlGridAutoResize3( tab_h, table_h, table2_h, sel_date_term){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLine.style.height.split("px")[0]; 

//추가
	var leftWidthValue2 = leftDisplay2.style.width.split("px")[0]; 
	var topLineHeightValue2 = topLine2.style.height.split("px")[0]; 

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

//추가
	var tabHeightValue2 = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue2 = Number(maxHeightValue) - Number(table2_h) ; 
	var leftDiplayHeightValue2 = Number(maxHeightValue) - Number(table2_h) - Number(topLineHeightValue2) - 17; 
	var mainDiplayHeightValue2 = Number(maxHeightValue) - Number(table2_h) - Number(topLineHeightValue2) ; 

	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 

//추가
		tabHeightValue2 += Number(search_h); 
		tableHeightValue2 += Number(search_h); 
		leftDiplayHeightValue2 += Number(search_h); 
		mainDiplayHeightValue2 += Number(search_h); 

	}
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 37;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	
	var tableWidthValue2 = Number(maxWidthValue) - Number(leftWidthValue2) - 1;
	var topLineWidthValue2 = Number(maxWidthValue) - Number(leftWidthValue2) - 37;
	var displayWidthValue2 = Number(maxWidthValue) - Number(leftWidthValue2) - 20;


	var tableTopWidthValue = Number(maxWidthValue)  - 1 - 100;
	var topLineTopWidthValue = Number(maxWidthValue)  - 37 ;
	var mainDisplayTopWidthValue = Number(maxWidthValue)  - 20 ;

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

//추가
	if( tabHeightValue2 < 1 ) 
		tabHeightValue2 = 1; 
	if( tableHeightValue2 < 1 ) 
		tableHeightValue2 = 1; 
	if( leftDiplayHeightValue2 < 1 ) 
		leftDiplayHeightValue2 = 1; 
	if( mainDiplayHeightValue2 < 1 ) 
		mainDiplayHeightValue2 = 1; 

	if( tableWidthValue2 < 1 ) 
		tableWidthValue2 = 1; 
	if( topLineWidthValue2 < 1 ) 
		topLineWidthValue2 = 1; 
	if( displayWidthValue2 < 1 ) 
		displayWidthValue2 = 1; 

	if( tableTopWidthValue < 1 ) 
		tableTopWidthValue = 1; 
	if( topLineTopWidthValue < 1 ) 
		topLineTopWidthValue = 1; 
	if( mainDisplayTopWidthValue < 1 ) 
		mainDisplayTopWidthValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px"; 

	tabPage2.style.height = tabHeightValue2 + "px"; 
	tbMain2.style.height = tableHeightValue2 + "px"; 
	leftDisplay2.style.height = leftDiplayHeightValue2 + "px"; 
	mainDisplay2.style.height = mainDiplayHeightValue2 + "px"; 
	
	tbMain2.width = tableWidthValue2 + "px"; 
	topLine2.style.width = topLineWidthValue2 + "px"; 
	mainDisplay2.style.width = displayWidthValue2 + "px"; 

	tbMainTop.width = tableTopWidthValue + "px"; 
	topLineTop.style.width = topLineTopWidthValue + "px"; 
	mainDisplayTop.style.width = mainDisplayTopWidthValue + "px"; 
	
	if(sel_date_term==""||sel_date_term == null){
		sel_date_term = 3;
	}
	
	tb_header_dw1.width = sel_date_term*60*12; // 반복컬럼 갯수 12
	tb_body_dw1.width 	= sel_date_term*60*12; // 반복컬럼 갯수 12
	tb_header_dw2.width = sel_date_term*60*9; // 반복컬럼 갯수 9
	tb_body_dw2.width 	= sel_date_term*60*9; // 반복컬럼 갯수 9
	tb_header_dw3.width = sel_date_term*60*8; // 반복컬럼 갯수 8
	tb_body_dw3.width 	= sel_date_term*60*8; // 반복컬럼 갯수 8
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

