// grid Ŭ������
function onclickfunc(row, col, data) {
	var pre_sel_type = document.frm.pre_sel_type.value;
	var	in_sales_loc = document.frm.in_sales_loc.value;

	if(pre_sel_type == "10" || pre_sel_type == "20" || pre_sel_type == "30" 
		||pre_sel_type == "40"||pre_sel_type == "50"){
		
		if((col == 1 || col == 2) ) { // ������ȸ, ����δ����϶��� ��ȸ
			/* ��ü-������ => ��ü-�����(all)   */
			if(pre_sel_type == "10"){
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//���������ڵ�
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//���������̸�
				document.frm.in_sel_type.value = "20";
			}

			/* ������������ �ڵ� �����´�. */
			if(pre_sel_type == "20" || pre_sel_type == "30" || pre_sel_type == "40")	{
				
				var in_fr_date = document.frm.in_fr_date.value;
				var	in_sales_loc = data.split("!%!")[0];
				
				commonUtil.getCodeInfo("in_fr_date!%!in_sales_loc", in_fr_date+"!%!"+in_sales_loc, "ip_06010_GetPrioDept", { 
				callback:function(arrList){
					// ��ġ�ϴ� CODE ����
					if( arrList.length == 1 ) {
						document.frm.in_sales_loc.value = arrList[0][0]; 		//���������ڵ�
						document.frm.in_sales_loc_name.value = arrList[0][1]; 	//���������̸�

						/* ��ü-������ => ��ü-�����(all)   */
						if(pre_sel_type == "20"){
							document.frm.in_sel_type.value = "20";
						}
						/* �����-������ => ��ü-�����   */
						else if(pre_sel_type == "30"){
							document.frm.in_sel_type.value = "20";
						}
						/* ������-���� => �����-������ */
						else if(pre_sel_type == "40")	{
							document.frm.in_sel_type.value = "30";
						}

					}
					GoSearch();					
				}
				});
			return;
			}
			/* ����-������� => ������-����  */
			if(pre_sel_type == "50")	{
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//���������ڵ�
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//���������̸�
				document.frm.in_sel_type.value = "40";
			}
		}
		else if((col == 3 || col == 4) && pre_sel_type != "50" ){ //������ȸ
			document.frm.in_sales_loc.value = data.split("!%!")[2]; 		//���������ڵ�
			document.frm.in_sales_loc_name.value = data.split("!%!")[3]; 	//���������̸�
			/* ��ü-����� => �����-������ */
			if(pre_sel_type == "20"){
				document.frm.in_sel_type.value = "30";
			}
			/* �����-������ => ������-���� */
			else if(pre_sel_type == "30")	{
				document.frm.in_sel_type.value = "40";
			}
			/* ������-���� => ����-�ŷ�ó */
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


// �������� �˻� POPUP
function openSalesLocPopup( obj ) { 	
	
	var	in_dept_grad = document.frm.in_sel_type.value; 	//���� GRADE	

	var service_url = "service.do?_moon_service=ip_06010_SalesLoc_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_dept_grad=" + in_dept_grad;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "SalesLoc_Search", pop_win_style);
	newWin.focus();

}

// ǰ�� POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
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

// ��ȸ �� waiting �̹��� �����ֱ�
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

	// ó�� ��ȸ�� ��츸 1000 �����Ѱ��� ��ȸ�Ѵ�.
	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ) {
		commonUtil.getCodeInfo("input_value", "", "ip_06010_SalesLoc_Default", { 
			callback:function(arrList){
				// ��ġ�ϴ� CODE ����
				if( arrList.length == 1 ) {
					document.frm.in_sales_loc.value = arrList[0][0];
					document.frm.in_sales_loc_name.value = arrList[0][1];
					document.frm.in_dept_grad_code.value = "10";
					// ��ȸ���� COMBO ����
					sel_type_Change()	
					// �ϰ����� ��ȸ
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
	// ��ȸ���� COMBO ����
	sel_type_Change()	
	
}


function getSalesLocName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_sales_loc_name.value = "";
		return;
	}

	commonUtil.getCodeInfo("in_sales_loc", objBox.value, "ip_06010_F_GETSALESLOCNAME", { 
		callback:function(arrList){
			// ��ġ�ϴ� CODE ����
			if( arrList.length == 1 ) {
				document.frm.in_sales_loc_name.value = arrList[0][0];
				document.frm.in_dept_grad_code.value = arrList[0][1];
				// ��ȸ���� COMBO ����
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
			else {// popup ����! 
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

// �ش� �÷��׿����� ���ð� �Ҵ�
function doCheckFlag(obj){
	
	// in_sel_term - ����,�ϰ� ��ȸCHECK
	if(obj.name == "in_sel_term" ){ 
		if(obj.checked){
				document.frm.chk_sel_term.value = "M"; //����
		}
		else{
				document.frm.chk_sel_term.value = "D"; //�ϰ�
		}
	}
}

// ��ȸ
GoSearch = function() {

	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("���������� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //��ȸ������ 'ǰ��','Top10_�ݾ�'�� ���� ����
		alert("ǰ���� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}
	
	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+document.frm.chk_sel_term.value;

	// ��¥�Ⱓ ���Ἲ check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"ip_06010_TERM_CHECK", { 
		callback:function(arrList){
			var check_return = -9;
			if( arrList.length == 1 ) {
				var check_return = arrList[0][0];
			}
			
			if (check_return == -1){
				alert("�������� �����Ϻ��� �����ϴ�!");
				return;
			}
			else if (check_return == -2){
				alert("���ں��� 31��, ������ 12�����θ� ��ȸ�˴ϴ�");
				return;
			}
			else if (check_return == -9){
				alert("��¥ �����Դϴ�");
				return;
			}

			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("����-���������ȸ�� 1���̻� �ҿ�˴ϴ�.");
			}

			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
		
			
			document.frm._moon_service.value = "ip_06020_SalesPlan_vs_Act_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};

// enter check �� 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// �ڱ�ȭ�� ����
	//		GoSearch();
		}
	} 
}

// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
} 


