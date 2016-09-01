//############################################################
//## 프로그램ID : sc_11020_dailyProductPlan_ERP_IF_Check_popup.vm
//## 프로그램명 : 생산계획 ERP I/F 현황을 파악하고 ERP I/F 여부를 제한한다. - 주간생산계획(배포) 화면의 Popup화면으로 사용
//## 개발자  : 남웅용
//## 개발일자 : 2013-09-16 월요일
//##
//##관련 job file : job_sc_11020_dailyProductionPlan_List.xml
//##
//##관련 query file : query_sc_11020_dailyProductionPlan_List.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-09-16  남웅용          sc_11020_dailyProductPlan_ERP_IF_Check_popup.vm 개발
//##
//##
//############################################################

function check_ERP_IF_status(){
	commonUtil.getSelQeury("","","sc_11020_check_ERP_IF_status", { 
    	callback:function(arrList){
 
    		if(arrList != "") {	// 데이터가 없으면 return;
			if(arrList[0][0] == 'Y' && arrList[0][1] == '9' ){
				document.frm.btnIF_STOP.value = '  ERP전송 해제';  // 현재는 전송제한 중임!
				document.frm.ERP_status.value = 'Y';
				document.frm.btnIF_STOP.disabled = false;
			}
			else if(arrList[0][0] == 'Y' && arrList[0][1] < 9 ){
				document.frm.btnIF_STOP.value = ' ERP전송 진행중';
				document.frm.ERP_status.value = 'A';
				document.frm.btnIF_STOP.disabled = true;
			}
			else {
				document.frm.btnIF_STOP.value = ' ERP전송 제한';  // 현재는 전송해제 중임!
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
		alert(" ERP I/F 진행중입니다! 잠시 후 다시 조회하시고 진행하십시오!");
	}
}

success = function(data) {
	
	
	if (data == "SUCCESS") {
		
		if(document.frm.ERP_status.value == 'Y'){ // 생산오더 ERP전송 제한상태! 
			alert("현재 생산오더 ERP전송이 가능한 상태로 변경되었습니다!");
		}
		else if(document.frm.ERP_status.value == 'N'){ // 생산오더 ERP전송 가능상태! 
			alert("지금부터 생산오더 ERP전송이 제한됩니다! 차주 월요일에는 자동으로 해제됩니다.");
		}
		
	}else{
		alert("관리자에게 문의하세요!");
	}
	check_ERP_IF_status();
	
}	

        
  
		