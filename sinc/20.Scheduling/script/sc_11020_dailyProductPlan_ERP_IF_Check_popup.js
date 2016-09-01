//############################################################
//## ���α׷�ID : sc_11020_dailyProductPlan_ERP_IF_Check_popup.vm
//## ���α׷��� : �����ȹ ERP I/F ��Ȳ�� �ľ��ϰ� ERP I/F ���θ� �����Ѵ�. - �ְ������ȹ(����) ȭ���� Popupȭ������ ���
//## ������  : ������
//## �������� : 2013-09-16 ������
//##
//##���� job file : job_sc_11020_dailyProductionPlan_List.xml
//##
//##���� query file : query_sc_11020_dailyProductionPlan_List.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-09-16  ������          sc_11020_dailyProductPlan_ERP_IF_Check_popup.vm ����
//##
//##
//############################################################

function check_ERP_IF_status(){
	commonUtil.getSelQeury("","","sc_11020_check_ERP_IF_status", { 
    	callback:function(arrList){
 
    		if(arrList != "") {	// �����Ͱ� ������ return;
			if(arrList[0][0] == 'Y' && arrList[0][1] == '9' ){
				document.frm.btnIF_STOP.value = '  ERP���� ����';  // ����� �������� ����!
				document.frm.ERP_status.value = 'Y';
				document.frm.btnIF_STOP.disabled = false;
			}
			else if(arrList[0][0] == 'Y' && arrList[0][1] < 9 ){
				document.frm.btnIF_STOP.value = ' ERP���� ������';
				document.frm.ERP_status.value = 'A';
				document.frm.btnIF_STOP.disabled = true;
			}
			else {
				document.frm.btnIF_STOP.value = ' ERP���� ����';  // ����� �������� ����!
				document.frm.ERP_status.value = 'N';
				document.frm.btnIF_STOP.disabled = false;
			}
			
		}
	}
	});
		
}	
    
function ERP_IF_status_Change(){

	var user_id	= document.frm._user_id.value;
	
	if(document.frm.ERP_status.value == 'N'){
		commonUtil.executeQuery("user_id", user_id, "sc_11020_SAVE_ERP_IF_Y", success);
	}
	else if(document.frm.ERP_status.value == 'Y'){
		commonUtil.executeQuery("user_id", user_id, "sc_11020_SAVE_ERP_IF_N", success);
	}
	else {
		alert(" ERP I/F �������Դϴ�! ��� �� �ٽ� ��ȸ�Ͻð� �����Ͻʽÿ�!");
	}
}

success = function(data) {
	
	
	if (data == "SUCCESS") {
		
		if(document.frm.ERP_status.value == 'Y'){ // ������� ERP���� ���ѻ���! 
			alert("���� ������� ERP������ ������ ���·� ����Ǿ����ϴ�!");
		}
		else if(document.frm.ERP_status.value == 'N'){ // ������� ERP���� ���ɻ���! 
			alert("���ݺ��� ������� ERP������ ���ѵ˴ϴ�! ���� �����Ͽ��� �ڵ����� �����˴ϴ�.");
		}
		
	}else{
		alert("�����ڿ��� �����ϼ���!");
	}
	check_ERP_IF_status();
	
}	

        
  
		