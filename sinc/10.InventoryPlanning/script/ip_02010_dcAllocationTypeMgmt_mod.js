// ��ǰ �˻� POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//�۾�����		
	var	in_date_term = document.frm.sel_date_term.value; 					//��ȸ�Ⱓ	

	if( in_work_date == "" || in_work_date == null ) {
		alert("�۾����ڸ� �Է��Ͻʽÿ�!");
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

// �߰���û ���� POPUP
function openRequestAllocReasonListPopup(col_no, dw3_row, day_cnt) { 	
	
	var this_work_date		= document.frm.sel_work_date[col_no].value; 
	var this_dw3_sales_id 	= document.frm.sel_dw3_sales_id[dw3_row].value;
	var this_dw3_dc_id 		= document.frm.sel_dw3_dc_id[dw3_row].value;

	var in_paramKey = "sel_work_date!%!sel_sales_id!%!sel_dc_id";
	var in_paramCode = this_work_date+"!%!"+this_dw3_sales_id+"!%!"+this_dw3_dc_id;

	commonUtil.getCodeInfo(in_paramKey,in_paramCode,"ip_02030requestAllocReasonSearch", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				alert("��û�� : "+arrList[0][0]+"\n�߰���û���� :"+ arrList[0][1]);
			}
			else {
				return;
			}
		}
	});
	
}

// �����Ҵ�Ȯ�� ���θ� DWR�� Ȯ���Ѵ�.
function checkAllocFlag(this_work_date){

	commonUtil.getCodeList("sel_work_date",this_work_date,"ip_02030checkAllocFlag", { 
		callback:function(arrList){
			return arrList[0];
		}
	});
	
}

// �߰������Ҵ�Ȯ�� ���θ� DWR�� Ȯ���Ѵ�.
function checkAddAllocFlag(this_work_date){

	commonUtil.getCodeList("sel_work_date",this_work_date,"ip_02030checkAddAllocFlag", { 
		callback:function(arrList){
			return arrList[0];
		}
	});
	
}

// ��ȸ
GoSearch = function(service) {
	
	var tmp_work_date	= document.frm.in_work_date.value;
	document.frm.work_date.value = delDateDelimiter(tmp_work_date);
	var in_alloc_item = document.frm.in_alloc_item.value;
	
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("�����Ҵ� ǰ���� �����Ͻʽÿ�!");
		document.frm.in_alloc_item.select();
		return;
	} 

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = "200"; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// ����
GoSave = function(service) {

	var rowNo_DW3 = main_tbody2.rows.length;
	if(rowNo_DW3 < 1){
		alert("������ �����Ͱ� �����ϴ�!");
	}

	var in_alloc_item = document.frm.in_alloc_item.value;
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("�����Ҵ� ǰ���� �����Ͻʽÿ�!");
		document.frm.in_alloc_item.select();
		return;
	} 

	// ���� ��ȸ�ϰ� �ִ� ǰ���� ������ ���´�! �۾��߿� ǰ���� �ٲ�� �� ����!!!
	var old_alloc_item = document.frm.old_alloc_item.value;
	if(Number(in_alloc_item) != Number(old_alloc_item)){
		alert("��ȹ�߿� �ٸ�ǰ���� �����ϰ� �ֽ��ϴ�! �ٽ� ��ȸ�� �۾��Ͻʽÿ�!");	
		return;
	}

	if(confirm("�۾������� �����ϰڽ��ϱ�?") == 1 ) {

		// ��ȸ�� WAITING �̹��� �����ֱ�
		viewWait();
		document.frm._moon_service.value = service; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}

};

// ����
GoDelete = function(service,day_cnt) {
	
	var in_alloc_item = document.frm.in_alloc_item.value;
	var this_cnfm_date = "";
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("�����Ҵ� ǰ���� �����Ͻʽÿ�!");
		document.frm.in_alloc_item.select();
		return;
	} 

	var run_cnt = 0;
	for(var i = 0 ; i < day_cnt; i++){

		// �����Ҵ� �����Ͽ� ���� �����Ҵ緮�� �����Ϸ��� ��� ����
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"���� �����Ҵ��۾��� �����Ǿ����Ƿ� ������ �� �����ϴ�!");
			return;
		}

		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_gubn[i].value == "2" ){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("������ �����Ҵ����� �����ϴ�.");
		return;
	} 

	if(confirm("������ �����Ҵ����� �����Ҵ������� �����Ͻðڽ��ϱ�?") == 1 ) {

		// ��ȸ�� WAITING �̹��� �����ֱ�
		viewWait();
		document.frm._moon_service.value = service; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}
	
};

// �����Ҵ緮�� �������� checkbox���� hidden data�� �ݿ�
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
		alert("�����Ҵ� ǰ���� �����Ͻʽÿ�!");
		document.frm.in_alloc_item.select();
		return;
	} 

	var run_cnt = 0;
	for(var i = 0 ; i < day_cnt; i++){

		// �����Ҵ� �����Ͽ� ���� �����Ҵ緮�� �����Ϸ��� ��� ����
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"���� �����Ҵ��۾��� �����Ǿ����Ƿ� �����Ҵ緮������ �� �� �����ϴ�!");
			return;
		}

		if(document.frm.chk_alloc_request[i].value == "Y"){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("�Ѱ� �̻��� �����Ҵ�������� �����Ͻʽÿ�!");
		return;
	} 


	if(confirm("������ �����Ҵ����� �����Ҵ緮�� �����Ͻðڽ��ϱ�?") == 1 ) {

		// ��ȸ�� WAITING �̹��� �����ֱ�
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

		// �����Ҵ� �����Ͽ� ���� �ٽ� �����Ҵ��۾� Ȯ���� �Ϸ��� ��� ����
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"���� �����Ҵ��۾��� �̹� �����Ǿ����ϴ�!");
			return;
		}
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "N"){
			run_cnt++;	
		}
		
	}
	
	if( run_cnt == 0 ) {
		alert("Ȯ���� �����Ҵ����� �����Ͻʽÿ�!");
		return;
	}

	if(confirm("������ �����Ҵ����� �����Ҵ��۾��� Ȯ���Ͻðڽ��ϱ�? \nȮ�� �Ŀ��� NFOS�� �ٷ� ����˴ϴ�!") == 1 ) {

		// ��ȸ�� WAITING �̹��� �����ֱ�
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

		// �����Ҵ� ������ �ȵǾ��µ� �߰� �����Ҵ�Ȯ���� �Ϸ��� ��� ����
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_alloc_flag[i].value == "N"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"���� �����Ҵ��۾� ������ ���� �ʾҽ��ϴ�!");
			return;
		}
		// �߰������Ҵ� �����Ͽ� ���� �ٽ� Ȯ���� �Ϸ��� ��� ����
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_add_alloc_flag[i].value == "Y"){
			this_cnfm_date = document.frm.sel_work_date[i].value;
			alert(this_cnfm_date.substring(4,6)+"/"+this_cnfm_date.substring(6,8)+"���� �߰� �����Ҵ��۾��� �̹� �����Ǿ����ϴ�!");
			return;
		}
		if(document.frm.chk_alloc_request[i].value == "Y" && document.frm.sel_add_alloc_flag[i].value == "N"){
			run_cnt++;	
		}
	}
	
	if( run_cnt == 0 ) {
		alert("Ȯ���� �߰��������� �����Ͻʽÿ�!");
		return;
	}


	if(confirm("������ �����Ҵ����� �߰������Ҵ��۾��� Ȯ���Ͻðڽ��ϱ�? \nȮ�� �Ŀ��� NFOS�� �ٷ� ����˴ϴ�!") == 1 ) {
		// ��ȸ�� WAITING �̹��� �����ֱ�
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

// dw1�� �������,����ϼ�,�Ҵ簡������ �����Ѵ�.
function calc_dw1() {

	var this_alloc_yn;
	var this_base_stock = 0;
	var this_receipt_box = 0;
	var this_sales_plan = 0;
	var this_alloc_box = 0;
	var next_base_stock = 0;
	
	var day_term = document.frm.sel_date_term.value; // ��¥ ����
	for(var i=0 ; i < day_term ; i++){

		this_alloc_yn 		= Number(document.frm.sel_alloc_gubn[i].value);
		this_base_stock		= Number(document.frm.sel_base_stock[i].value);
		this_receipt_box	= Number(document.frm.sel_receipt_box[i].value);
		this_sales_plan		= Number(document.frm.sel_sales_plan[i].value) + Number(document.frm.sel_promo_plan[i].value);
		this_alloc_box		= Number(document.frm.sel_real_alloc_box[i].value);
		this_issue_box		= Number(document.frm.sel_issue_box[i].value);

		// ����ϼ�, �Ҵ簡����
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

		// �������� ������� setting
		if( i < day_term - 1 ) {

			if( i == 0 ){ // ó�� ������ ������� ���ô� ��� ����
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

			// ������ �������
			document.frm.sel_base_stock[i+1].value 	= next_base_stock;
			div_base_stock[i+1].innerHTML 			= numberFormat(next_base_stock);
		}
	}
}

// dw2��  �������,����ϼ�,�Ҵ簡������ �����Ѵ�.
function calc_dw2(dw2_row) {

	var this_dc_alloc_yn;
	var this_dc_base_stock = 0;
	var this_dc_receipt_box = 0;
	var this_dc_sales_plan = 0;
	var this_dc_alloc_box = 0;
	var next_dc_base_stock = 0;
	
	var day_term = document.frm.sel_date_term.value; // ��¥ ����
	for(var i=0 ; i < day_term ; i++){

		this_alloc_yn 			= Number(document.frm.sel_alloc_gubn[i].value);
		this_dc_base_stock		= Number(document.frm.sel_dc_base_stock[day_term*dw2_row+i].value);
		this_dc_receipt_box		= Number(document.frm.sel_dc_receipt_box[day_term*dw2_row+i].value);
		this_dc_sales_plan		= Number(document.frm.sel_dc_sales_plan[day_term*dw2_row+i].value) + Number(document.frm.sel_dc_promo_plan[day_term*dw2_row+i].value);
		this_dc_alloc_box		= Number(document.frm.sel_dc_alloc_box[day_term*dw2_row+i].value);
		this_dc_issue_box		= Number(document.frm.sel_dc_issue_box[day_term*dw2_row+i].value);
alert(this_dc_sales_plan);

		// ����ϼ�, �Ҵ簡����
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

		// �������� ������� setting
		if( i < day_term - 1 ) {

			if( i == 0 ){ // ó�� ������ ������� ���ô� ��� ����
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
			// ������ �������
			document.frm.sel_dc_base_stock[day_term*dw2_row+i+1].value 	= next_dc_base_stock;
			div_dc_base_stock[day_term*dw2_row+i+1].innerHTML 			= numberFormat(next_dc_base_stock);
		}
	}
}

// dw1�� �Ҵ���,�Ҵ緮�� ����� ó���Ѵ�.
// 1.�������� ���������� ������ ���
// 2.�������� �������+�԰����� ũ�� �����Ұ�
// 3.������ ���Ǹ� �����Ҵ緮�� ���� �����Ѵ� -> ���� ������� ���� ���
//   -> �����ϱ������ �����Ҵ緮�� �˼�����.
function	doChange_dw1(obj,objnum,col_no){
	
	var this_sales_plan 	= Number(document.frm.sel_sales_plan[col_no].value) + Number(document.frm.sel_promo_plan[col_no].value);
	var this_alloc_rate 	= 0;
	var this_alloc_box		= 0;
	var old_alloc_rate		= Number(document.frm.old_tot_alloc_rate[col_no].value);
	var old_alloc_box		= Number(document.frm.old_tot_alloc_box[col_no].value);

	if(objnum == 0){ // �Ҵ��� �����
		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_alloc_rate);
			return;
		}
		this_alloc_rate	= Number(obj.value);
		this_alloc_box	= Number(Math.round(this_alloc_rate*this_sales_plan/100));
	}
	else{ //�Ҵ緮 �����
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
		alert("�Ҵ緮�� (�������+�԰���)= "+this_expt_box+"�� "+this_term_box+"��ŭ �ʰ��߽��ϴ�! \n������ �� �����ϴ�!");
		
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

// dw2�� �Ҵ���,�Ҵ緮�� ����� ó���Ѵ�.
// 1. �Ҵ緮 ����� ���������� ������ ���
// 2. �Ҵ緮�� ��������� ������ ���
// 3. �Ҵ緮�� ��������� ũ�� ���� ��¥�� DC����䱸�� ���հ� �׳��� ���۰��ɷ��� ��
// 4. �Ҵ緮�� �����Ǹ� ���� �Ҵ緮�� �����Ѵ�. �ǸŰ�ȹ, �Ǵ� ��Ÿ ��������!
function	doChange_dw2(obj, objnum, col_no, dw2_row, day_cnt){

	var this_dc_alloc_rate;
	var this_dc_alloc_box;
	var old_dc_alloc_rate	= Number(document.frm.old_dc_alloc_rate[dw2_row*day_cnt+col_no].value);
	var old_dc_alloc_box 	= Number(document.frm.old_dc_alloc_box[dw2_row*day_cnt+col_no].value);

	var this_dc_sales_plan = Number(document.frm.sel_dc_sales_plan[dw2_row*day_cnt+col_no].value) + Number(document.frm.sel_dc_promo_plan[dw2_row*day_cnt+col_no].value);
	var this_dc_base_stock = Number(document.frm.sel_dc_base_stock[dw2_row*day_cnt+col_no].value); 
	
	if(objnum == 0){ // �Ҵ��� �����

		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_dc_alloc_rate);
			return;
		}
		this_dc_alloc_rate	= Number(obj.value);
		this_dc_alloc_box 	= Number(Math.round(this_dc_alloc_rate*this_dc_sales_plan/100));
	}
	else{ //�Ҵ緮 �����

		if(checkNum(obj,"BLANK_INT_UP") == false){
			obj.value = numberFormat(old_dc_alloc_box);
			return;
		}
		this_dc_alloc_box 	= Number(obj.value);
		if(this_dc_sales_plan == 0)	this_dc_alloc_rate = 0;
		else this_dc_alloc_rate 	= Number(Math.round(this_dc_alloc_box/this_dc_sales_plan*100));
	}

	if(this_dc_alloc_box > old_dc_alloc_box){ //���������� ������������ ū���!

		if(this_dc_base_stock - this_dc_alloc_box < 0){ // DC�� �������� �����Ҵ� �߰����� cover���� ���Ҷ�
			// dw1�� ���۰��ɷ��� dw2�� ����䱸���� ���� ���Ѵ�.
			var this_remn_tran_box 	= Number(delComma(document.frm.sel_remn_tran_box[col_no].value)); //dw1�� ���۰��ɷ�
			var this_tot_reqt_box = 0;
			var rowNo = main_tbody.rows.length;

			for(i=0 ; i<rowNo ; i++){ // DC�� �����ʿ䷮�� ��� ���Ѵ�

				if(i != dw2_row){ // �ٸ� DC�� ����䱸��
					this_tot_reqt_box = this_tot_reqt_box + Number(delComma(document.frm.sel_dc_receipt_box[i*day_cnt+col_no].value));
				}
				else{ // ������ ����䱸���� �߰��Ѵ�.
					this_tot_reqt_box = this_tot_reqt_box + this_dc_alloc_box
				}
			}

			if(this_tot_reqt_box > this_remn_tran_box ){
				alert("���۰��ɷ��� �ʰ��߽��ϴ�. ������ �� �����ϴ�!");
				// �Ҵ���, �Ҵ緮 ���� �Ұ�
				document.frm.sel_dc_alloc_rate[dw2_row*day_cnt+col_no].value = numberFormat(old_dc_alloc_rate);
				document.frm.sel_dc_alloc_box[dw2_row*day_cnt+col_no].value = numberFormat(old_dc_alloc_box);
				obj.select();
				return;
			}
			// ����䱸���� ����
			document.frm.sel_dc_receipt_box[dw2_row*day_cnt+col_no].value	= this_dc_alloc_box - this_dc_base_stock;
			div_dc_receipt_box[dw2_row*day_cnt+col_no].innerHTML = numberFormat(this_dc_alloc_box - this_dc_base_stock);
		}
		
	}

	// �ش� DC�� ����ϴ� ������ �ǸŰ�ȹ������ ����ϰ� �Ҵ緮�� ����Ѵ�..
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
			//���������� �ǸŰ�ȹ
			this_sl_sales_plan	= Number(document.frm.sel_sl_sales_plan[i*day_cnt+col_no].value) + Number(document.frm.sel_sl_promo_plan[i*day_cnt+col_no].value);
			if(this_dc_sales_plan == 0){ //��������� �ǸŰ�ȹ�� 0�̸� ��, �����Ҵ��� �ǸŽ����̳� ��Ÿ�� �ϸ� �޶��� �� �ִ�!
				this_sl_quota_rate	= 0;
				this_sl_alloc_box	= 0;
				this_sl_alloc_rate	= 0;
			}
			else {
				if(this_sl_sales_plan == 0){ //���������� �ǸŰ�ȹ�� 0�̸� ��, �����Ҵ��� �ǸŽ����̳� ��Ÿ�� �ϸ� �޶��� �� �ִ�!
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

			//���������� �Ҵ���,�Ҵ緮�� ���� �����Ѵ�.
			document.frm.sel_sl_alloc_rate[i*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_rate);
			document.frm.old_sl_alloc_rate[i*day_cnt+col_no].value 	= this_sl_alloc_rate;
			document.frm.sel_sl_alloc_box[i*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_box);
			document.frm.old_sl_alloc_box[i*day_cnt+col_no].value 	= this_sl_alloc_box;
		}
	}

	// ���������� ������������ ������� ����䱸���� ������Ű�� �ʾҴ� -> ���� Ȯ�� 	
	document.frm.sel_dc_alloc_rate[dw2_row*day_cnt+col_no].value 	= numberFormat(this_dc_alloc_rate);
	document.frm.sel_dc_alloc_box[dw2_row*day_cnt+col_no].value 	= numberFormat(this_dc_alloc_box);
	document.frm.old_dc_alloc_rate[dw2_row*day_cnt+col_no].value 	= this_dc_alloc_rate;
	document.frm.old_dc_alloc_box[dw2_row*day_cnt+col_no].value 	= this_dc_alloc_box;
	
	calc_dw2(dw2_row);	//dw2 ������� ����
}

// dw3�� �Ҵ���,�Ҵ緮�� ����� ó���Ѵ�.
// 1.�Ҵ緮�� ���������� ������ ���
// 2.�Ҵ緮�� ���������� ũ�� �ش�������� �������-���� DC�� ����ϴ� ������ �Ҵ緮 ���� > 0 �̸� ���
// 3.�Ҵ緮�� 2���� ���� cover���� ������ "������� ����䱸�� �߰��� �������� Ȯ���ϼ���" ǥ�� ����Ұ�   
function	doChange_dw3(obj, objnum, col_no, dw3_row, day_cnt){

	var this_sl_alloc_rate;
	var this_sl_alloc_box;
	var old_sl_alloc_rate	= Number(document.frm.old_sl_alloc_rate[dw3_row*day_cnt+col_no].value);
	var old_sl_alloc_box 	= Number(document.frm.old_sl_alloc_box[dw3_row*day_cnt+col_no].value);
	var this_sl_sales_plan	= Number(document.frm.sel_sl_sales_plan[dw3_row*day_cnt+col_no].value) + Number(document.frm.sel_sl_promo_plan[dw3_row*day_cnt+col_no].value);


	// �ǸŰ�ȹ�� 0�϶� �Ҵ緮�� �����ϸ� �Ҵ����� 0�� �Ѵ�.
	if(objnum == 0){ // �Ҵ��� �����
		
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
	else{ //�Ҵ緮 �����

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

	if(this_sl_alloc_rate > old_sl_alloc_box){ //���������� ������������ ū���!
		
		//DW3���� ���� DC�� ����ϴ� �������� �Ҵ緮�� ������ ���ϰ� DW2�� ������� ���Ѵ�
		//DW2�� ������� �������
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
		// DW3�� �������� �����Ҵ緮 ����
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

			alert("�ش� ��������� (�������+�����ʿ䷮)= "+this_dc_expt_stock+"�� "+sl_alloc_term_box+"��ŭ �ʰ��߽��ϴ�.\n������� �Ҵ緮�� Ȯ���Ͻʽÿ�!");
			// �Ҵ���, �Ҵ緮 ���� �Ұ�
			document.frm.sel_sl_alloc_rate[dw3_row*day_cnt+col_no].value = numberFormat(old_sl_alloc_rate);
			document.frm.sel_sl_alloc_box[dw3_row*day_cnt+col_no].value = numberFormat(old_sl_alloc_box);
			obj.select();
			return;
		}
	}

	//���������� �Ҵ���,�Ҵ緮�� ���� �����Ѵ�.
	document.frm.sel_sl_alloc_rate[dw3_row*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_rate);
	document.frm.old_sl_alloc_rate[dw3_row*day_cnt+col_no].value 	= this_sl_alloc_rate;
	document.frm.sel_sl_alloc_box[dw3_row*day_cnt+col_no].value 	= numberFormat(this_sl_alloc_box);
	document.frm.old_sl_alloc_box[dw3_row*day_cnt+col_no].value 	= this_sl_alloc_box;

}

// dw3�� �߰��Ҵ緮 ����� ó���Ѵ�.
// 1.�߰��Ҵ緮�� �������� ������ ���
// 2.�߰��Ҵ緮�� ���������� ũ�� �ش�������� �������-���� DC�� ����ϴ� ������ �Ҵ緮+�߰��Ҵ緮 ���� > 0 �̸� ���
// 3.�Ҵ緮�� 2���� ���� cover���� ������ "������� ����䱸�� ������� �����մϴ�." ǥ�� ����Ұ�   
function	doChange_dw3_add(obj, objnum, col_no, dw3_row, day_cnt){

	var old_add_alloc_box	= Number(document.frm.old_add_alloc_box[dw3_row*day_cnt+col_no].value);

	if(checkNum(obj,"BLANK_INT_UP") == false){
		obj.value = numberFormat(old_add_alloc_box);
		return;
	}

	var this_add_alloc_box = Number(obj.value);

	if(this_add_alloc_box > old_add_alloc_box){ //���������� ������������ ū���!
		
		//DW3���� ���� DC�� ����ϴ� �������� �Ҵ緮�� ������ ���ϰ� DW2�� ������� ���Ѵ�
		//DW2�� ������� �������
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
		// DW3�� �������� �����Ҵ緮 + �߰������Ҵ緮 ����
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

			alert("�ش� ��������� (�������+�����ʿ䷮)= "+this_dc_expt_stock+"�� "+sl_alloc_term_box+"��ŭ �ʰ��߽��ϴ�!");
			// �Ҵ���, �Ҵ緮 ���� �Ұ�
			document.frm.sel_add_alloc_box[dw3_row*day_cnt+col_no].value = numberFormat(old_add_alloc_box);
			obj.select();
			return;
		}
	}

	//���������� �߰��Ҵ緮 �ٽ� �����Ѵ�.
	document.frm.sel_add_alloc_box[dw3_row*day_cnt+col_no].value 	= numberFormat(this_add_alloc_box);
	document.frm.old_add_alloc_box[dw3_row*day_cnt+col_no].value 	= this_add_alloc_box;
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( obj, col_no, row, day_cnt ) {
	
	var objName 	= obj.name;
	var rowNo_DW2 	= main_tbody.rows.length - 1;
	var rowNo_DW3 	= main_tbody2.rows.length - 1;
	var next_row	= 0;

	// TAB(9) or ENTER(13)
	if( event.keyCode == "13" ) {
		// DW1 �Ҵ���
		if( objName == "sel_tot_alloc_rate" ) {
			document.frm.sel_tot_alloc_box[col_no].select();
			return;
		}
		// DW1 �Ҵ緮 -> doChange_dw1ȣ��
		else if( objName == "sel_tot_alloc_box" ) {
			doChange_dw1(obj,1,col_no);
			return;
		}
		// DW2 �Ҵ���
		else if( objName == "sel_dc_alloc_rate" ) {
			if(row == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_dc_alloc_rate[next_row].select();
			return;
		}
		// DW2 �Ҵ緮
		else if( objName == "sel_dc_alloc_box" ) {
			if(row == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_dc_alloc_box[next_row].select();
			return;
		}
		// DW3 �Ҵ���
		else if( objName == "sel_sl_alloc_rate" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_sl_alloc_rate[next_row].select();
			return;
		}
		// DW3 �Ҵ緮
		else if( objName == "sel_sl_alloc_box" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_sl_alloc_box[next_row].select();
			return;
		}
		// DW3 �߰��Ҵ緮
		else if( objName == "sel_add_alloc_box" ) {
			if(row == rowNo_DW3) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.sel_add_alloc_box[next_row].select();
			return;
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
	}
	
}


// HTML Grid �� X��ǥ ���� 
function scrollTopX() {
	document.all.topLineTop.scrollLeft = document.all.mainDisplayTop.scrollLeft;
}

// HTML Grid �� X��ǥ ���� 
function scroll2X() {
	document.all.topLine2.scrollLeft = document.all.mainDisplay2.scrollLeft;
}
// HTML Grid �� Y��ǥ ���� 
function scroll2Y() {
	document.all.leftDisplay2.scrollTop = document.all.mainDisplay2.scrollTop;
}

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize3( tab_h, table_h, table2_h, sel_date_term){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLine.style.height.split("px")[0]; 

//�߰�
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

//�߰�
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

//�߰�
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

	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
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

//�߰�
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
	
	tb_header_dw1.width = sel_date_term*60*12; // �ݺ��÷� ���� 12
	tb_body_dw1.width 	= sel_date_term*60*12; // �ݺ��÷� ���� 12
	tb_header_dw2.width = sel_date_term*60*9; // �ݺ��÷� ���� 9
	tb_body_dw2.width 	= sel_date_term*60*9; // �ݺ��÷� ���� 9
	tb_header_dw3.width = sel_date_term*60*8; // �ݺ��÷� ���� 8
	tb_body_dw3.width 	= sel_date_term*60*8; // �ݺ��÷� ���� 8
}

// �ڵ� String üũ
// ���� & _ (underscore) �� ���, ������ �빮�ڷ� ��ȯ
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
			// alert("����, ����, Underscore �̿��� ���ڴ� �Է��� �� �����ϴ�."); return false; 
		} 
	} 
		
	objBox.value = output;
	
}

