function onclickfunc(row, col, data) {
	var pre_sel_type = document.frm.pre_sel_type.value;

	if(pre_sel_type == "10" || pre_sel_type == "20" || pre_sel_type == "30" 
		||pre_sel_type == "40"||pre_sel_type == "50"|| pre_sel_type == "60" || pre_sel_type == "70"
		||pre_sel_type == "80"){
		
		if((col == 1 || col == 2) && pre_sel_type != "20" ) { // ������ȸ, ����δ����϶��� ��ȸ
			/* ��ü-������ => ��ü-�����(all)   */
			if(pre_sel_type == "10"){
				document.frm.in_sales_loc.value = data.split("!%!")[0]; 		//���������ڵ�
				document.frm.in_sales_loc_name.value = data.split("!%!")[1]; 	//���������̸�
				document.frm.in_sel_type.value = "20";
			}
			
			/* ������������ �ڵ� �����´�. */
			if(pre_sel_type == "20" || pre_sel_type == "30" || pre_sel_type == "40" || pre_sel_type == "50")	{
				
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
						/* ����-�ŷ�ó => ������-���� */
						else if(pre_sel_type == "50")	{
							document.frm.in_sel_type.value = "40";
						}
					}
					GoSearch();					
				}
				});
			return;
		}
			/* ���뺻��/�ŷ�ó����/��������� ��� ��������/�������/�ŷ�ó�� ������ȸ */
			if(pre_sel_type == "60" || pre_sel_type == "70" || pre_sel_type == "80")	{
				document.frm.in_sel_code.value = data.split("!%!")[0]
				GoSearch_special();	
				return;				
			}

			else return;
		}
		else if((col == 3 || col == 4)){ //������ȸ
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
			/* ����-�ŷ�ó => �ŷ�ó ��� ALERT */
			else if(pre_sel_type == "50")	{
				commonUtil.getCodeInfo("in_cust_code", data.split("!%!")[2], "ip_06010_GetCustArea", { 
				callback:function(arrList){
					// ��ġ�ϴ� CODE ����
					if( arrList.length == 1 ) {
						alert(arrList[0][0]+"\n"+arrList[0][1]);
					}
					else {
						alert("�ش�ŷ�ó ����� �������� �ʽ��ϴ�. \n ������������ �����ϼ���");
					}
				}
				});
			return;
			}
			else return;
			document.frm.in_sales_loc.value = data.split("!%!")[2]; 		//���������ڵ�
			document.frm.in_sales_loc_name.value = data.split("!%!")[3]; 	//���������̸�

			GoSearch();

		}
		else if((col == 5 || col == 6) && document.frm.in_sel_type_special.value == "s01"){ //������ȸ
			commonUtil.getCodeInfo("in_cust_code", data.split("!%!")[4], "ip_06010_GetCustArea", { 
			callback:function(arrList){
				// ��ġ�ϴ� CODE ����
				if( arrList.length == 1 ) {
					alert(arrList[0][0]+"\n"+arrList[0][1]);
				}
				else {
					alert("�ش�ŷ�ó ����� �������� �ʽ��ϴ�. \n ������������ �����ϼ���");
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


// �������� �˻� POPUP
function openSalesLocPopup( obj ) { 	
	
	var	in_dept_grad = document.frm.in_dept_grad_code.value //document.frm.in_sel_type.value; 	//���� GRADE	

	var service_url = "service.do?_moon_service=ip_06010_SalesLoc_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_dept_grad_code=" + in_dept_grad;
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
/*	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ) {
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
*/
	document.frm.in_sales_loc.value = "0000";
	document.frm.in_sales_loc_name.value = "��ü";
	document.frm.in_dept_grad_code.value = "00";
	// ��ȸ���� COMBO ����
	sel_type_Change()	
	// �ϰ����� ��ȸ
	if(document.frm.chk_sel_term.value == null || document.frm.chk_sel_term.value == "" ) {
		document.frm.chk_sel_term.value = "D";
	}
	// ��ȸ���� COMBO ����
	//sel_type_Change()	
	
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

	// special��ȸ clear!
	document.frm.in_sel_type_special.value = "";

	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("���������� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //��ȸ������ 'ǰ��','Top10_�ݾ�'�� ���� ����
		alert("ǰ���� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}
	
// �ӵ��������� ���ܵ�.	
//	if(document.frm.in_sel_type.value == "90" || document.frm.in_sel_type.value == "100") {
//		alert("ǰ����� ��ȸ�� 3~5������ �ҿ�˴ϴ�!")
//	}
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
		
			// ��ü�� ���� �ŷ�ó������ ��ȸ�ÿ��� �����BOX�� 1BOX�� �ʰ��ϴ� �ŷ����� ��ȸ�Ѵ�.
			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("�Ⱓ�谡 ū ������ 500���� ��ȸ�մϴ�");
			}

			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // ��ȸ��ư���� ��ȸ�ÿ��� ������ ù�������̴�!
			document.frm._moon_service.value = "ip_06010_ProdSalesAct_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};


// ��ȸ(special)
GoSearch_special = function() {

	// special��ȸ SETUP!
	document.frm.in_sel_type_special.value = "s01";
	
	if(document.frm.in_sales_loc.value == "" || document.frm.in_sales_loc.value == null ){
		alert("���������� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //��ȸ������ 'ǰ��','Top10_�ݾ�'�� ���� ����
		alert("ǰ���� �����Ͻñ� �ٶ��ϴ�!");
		return;
	}
	
	if(document.frm.in_sel_type.value == "90" || document.frm.in_sel_type.value == "100") {
		alert("ǰ����� ��ȸ�� 3~5������ �ҿ�˴ϴ�!")
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
		
			// ��ü�� ���� �ŷ�ó������ ��ȸ�ÿ��� �����BOX�� 1BOX�� �ʰ��ϴ� �ŷ����� ��ȸ�Ѵ�.
			if(document.frm.in_sales_loc.value == "1000" && document.frm.in_sel_type.value ==  "50" ){
				alert("�Ⱓ�谡 ū ������ 500���� ��ȸ�մϴ�");
			}

			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // ��ȸ��ư���� ��ȸ�ÿ��� ������ ù�������̴�!
			document.frm._moon_service.value = "ip_06010_ProdSalesAct_list"; 
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


