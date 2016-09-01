
/* *********************************************************
############################################################
## 프로그램ID : ip_06030_Prty_InOut_analysis_list.vm
## 프로그램명 : 품종군 일자별 추이현황
## 개발자  : 남웅용
## 개발일자 : 2009-09-16 
##
##관련 job file 		: job_sinc_10_inventoryPlanning_04.xml
##
##관련 query file	: query_sinc_10_inventoryPlanning_04.xml
##
## REVISIONS
## VER        DATE        AUTHOR    DESCRIPTION
## ---------  ----------  --------  ------------------------------------
## 1.0        2009-09-16  남웅용    ip_06030_Prty_InOut_analysis_list.vm 개발(SCM강병호차장 요청)
##
##
############################################################
***********************************************************/

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' 품목조회

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

// 품목 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//조회품목 상태 : '01'판매중	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}


// 품종/품목 radio 선택하면, sel_gubn 에 각각 맞는 조회 조건 값을 넣어준다
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.insel_prty.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.insel_prty.style.display = "block";
	}

}


// 더블 클릭 : 상세 팝업  //중장기 물량 점검  개발중
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;
	var item_id = '101000105';


	if(selgubn == "PRTY"){ // 품종

		var division	= document.frm.insel_prty.value;
		var week_flag	= '31week';
		

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
					
	}else{ // 품목
		alert("품종으로 선택후 조회 하여 주시기 바랍니다. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		  
		
	}
}



