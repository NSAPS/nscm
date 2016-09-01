function onclickfunc(row, col, data) {

	if(col < 2) return;
	
	if(data == null || data == "") return;
	
	var in_item_id = data.split("!%!")[0];
	
	var in_cnfm_date;
	commonUtil.toDate(document.frm.in_fr_date.value,'YYYY-MM-DD','DAY',col - 3, { 
		callback:function(result){
		in_cnfm_date =  	result;
		
		commonUtil.getSelQeury("in_item_id!%!in_cnfm_date", in_item_id+"!%!"+in_cnfm_date, "ip_02100_Daily_DC_Alloc_Plan_Analysis_detail", { 
			callback:function(arrList){
				// 일치하는 CODE 없음
				if( arrList.length == 1 ) {
					alert(	"공급할당사유   : " + arrList[0][0]+"\n"+
							"공급할당기준   : " + arrList[0][1]+"\n"+
							"공급할당메세지 : " + arrList[0][2]+"\n"+
							"공급할당량     : " + arrList[0][3]+"\n"+
							"주문(마감)량   : " + arrList[0][4]+"\n"+
							"소화율(%)       : " + arrList[0][5]);
				}
				else {
					alert("공급할당정보가 있지 않습니다!");
				}
			}
			});
		
		
		}
		});
			
}

// 조회
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+'D';

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
				alert("일자별은 31일로만 조회됩니다");
				return;
			}
			else if (check_return == -9){
				alert("날짜 오류입니다");
				return;
			}
		
			// 조회시 WAITING 이미지 보여주기
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // 조회버튼으로 조회시에는 무조건 첫페이지이다!
			document.frm._moon_service.value = "ip_02100_Daily_DC_Alloc_Plan_Analysis"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};



