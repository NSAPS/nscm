
// 조회
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.insel_fr_yyyy.value +document.frm.insel_fr_mm.value + "01" + "!%!"
						+document.frm.insel_to_yyyy.value+document.frm.insel_to_mm.value + "01" +"!%!"
						+"M";

	if(document.frm.insel_sel_gubn.value == "20" ) {
		alert("배송거래선 조회는 3~5분정도 소요됩니다!")
	}

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
				alert("기간은 12개월 이하로만 가능합니다.");
				return;
			}
			else if (check_return == -9){
				alert("날짜 오류입니다");
				return;
			}
			// 조회시 WAITING 이미지 보여주기
			viewWait();
		
			document.frm._moon_service.value = "rp_08010_DC_InOut_Volumn_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};


