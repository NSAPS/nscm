function GoSearch(service) {
	// ��ȸ�� WAITING �̹��� �����ֱ�
	//var service = rp_01015_transportPlanRegistration_list_dev;
	//alert(service);
	viewWait();
	document.frm._moon_service.value = service;
	//document.form1._moon_perpage.value = perpage;
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};
function mass_plan_reg(){	
	var urlStr = "service.do?_moon_service=rp_01015_mass_trans_plan_reg";
	//urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
}

// ���� Ŭ�� : ���۰�ȹ ���� ȭ��
function onclickfunc(row, col, data) {
		
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_mod";
	//alert(data);
	var list = data.split("!%!");
	
	var brand_no = list[13];
	
	if( brand_no == "" || brand_no == null ) {  
	}else{
		alert("Ȯ���� ��ǥ�� ������ �Ұ��� �մϴ�.");
		return;		
	}
		
	var version	= document.frm.version.value;
	var seq		= document.frm.seq.value;
	
	urlStr += "&version=" 	+ version; // ������ �ڵ�
	urlStr += "&seq=" 	+ seq; // ������ �ڵ�

	urlStr += "&plan_type=" 	+ list[0]; // �÷�Ÿ��
	urlStr += "&trans_date=" 	+ list[2]; // ��������
	urlStr += "&truck_seq=" 	+ list[7]; // ��������
	urlStr += "&src_loc=" 		+ list[3]; // �����
	urlStr += "&tgt_loc=" 		+ list[5]; // �԰���


	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
		
}


// ����ȭ������ �̵�
function moveBack() {
	
	//var cd_grp_pre = document.frm.cd_grp_pre.value;

	
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_list_dev";
	//urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}


// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
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

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
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
	
}//�λ���ǰ ���� ��ư
function makeBrand2(service){						var version 	= document.frm.version.value;		var seq 		= document.frm.seq.value;		var trans_start = document.frm.trans_start.value;	var trans_end 	= document.frm.trans_end.value;			 document.frm.run_seq.value = '2';	var user_id 	= document.frm._user_id.value;	var src_loc 	= document.frm.src_loc_sel.value;	// �԰����� �������� ���� ���	if( version == null || version == "" || seq == null || seq == "" ) {		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");		return;	}	// ����, ������ �������� ���� ���	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");		return;	}		if(checkConfirm())		return;	// WAITING �̹��� �����ֱ�	viewWait();		// service_id ����	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;		document.frm._moon_service.value = service;	document.frm.action = "service.do";	document.frm.target = "_self";	document.frm.submit();	}

// ��ǥ ����
function makeBrand(service) {		commonUtil.getSelQeury( "user_id", document.frm._user_id.value, "rp_01015_transportPlanRegistration_list_dev_deptcode",{	callback:function(result){				if ( result == "5015" || document.frm._user_id.value == "ou4484189"){									var version 	= document.frm.version.value;	var seq 		= document.frm.seq.value;	var trans_start = document.frm.trans_start.value;	var trans_end 	= document.frm.trans_end.value;		document.frm.run_seq.value = '1';		var user_id 	= document.frm._user_id.value;	var src_loc 	= document.frm.src_loc_sel.value;	// �԰����� �������� ���� ���	if( version == null || version == "" || seq == null || seq == "" ) {		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");		return;	}	// ����, ������ �������� ���� ���	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");		return;	}		if(checkConfirm())		return;			// WAITING �̹��� �����ֱ�	viewWait();		// service_id ����	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;		document.frm._moon_service.value = service;	document.frm.action = "service.do";	document.frm.target = "_self";	document.frm.submit();																						}else{					alert("�ش� ������ SCM���� �����մϴ�.");					return;			}		}	})		
	
	
}
