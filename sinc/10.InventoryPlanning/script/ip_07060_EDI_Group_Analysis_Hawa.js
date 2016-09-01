//############################################################
//## 프로그램ID      : ip_07060_EDI_Group_Analysis_Hawa.vm
//## 프로그램명      : 일자별 유통본부별 EDI정보조회
//## 개발자          : 남웅용
//## 개발일자        : 2010-08-05
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-08-05  남웅용      create
//##
//############################################################
// 조회
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+"D";

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
				alert("31일 이내로만 조회됩니다");
				return;
			}
			else if (check_return == -9){
				alert("날짜 오류입니다");
				return;
			}
		
			// 조회시 WAITING 이미지 보여주기
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // 조회버튼으로 조회시에는 무조건 첫페이지이다!
			document.frm._moon_service.value = "ip_07060_EDI_Group_Analysis_Hawa"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};

// 더블 클릭 : 상세조회화면 popup
function onclickfunc(row, col, data) {
	
	var in_cnfm_date = data.split("!%!")[0];
	in_cnfm_date = in_cnfm_date.replace("-","").replace("-","").substr(0,8);
	
	var service_url = "service.do?_moon_service=ip_07060_EDI_Group_Item_Detail_Popup";
	service_url += "&in_cnfm_date=" + in_cnfm_date + "&in_input_gubn=" + document.frm.in_input_gubn.value;
	service_url += "&in_sell_gubn=" + document.frm.in_sell_gubn.value + "&in_qty_gubn=" + document.frm.in_qty_gubn.value;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1260, height=470, top=0, left=0";
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
}