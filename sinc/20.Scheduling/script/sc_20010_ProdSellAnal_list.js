// 품목 POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//조회품목 상태 : '01'판매중	
	
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
			else {// popup 띄운다! 
				openItemPopup();
			}
		}
	});
}


function	doChange_sel_gubn(obj) {
	
	document.frm.in_item_id.value = "";
	document.frm.in_item_name.value = "";
	// 조회구분이 유형일때만 봉수입력란을 표시한다.
	if(obj.value =="06"){
		document.getElementById("td_ea").style.display = "block";
	}
	else{
		document.getElementById("td_ea").style.display = "none";
	}
}

// 조회
GoSearch = function() {

	if((document.frm.in_item_id.value == "" || document.frm.in_item_id.value == null ) && 
		(document.frm.in_sel_type.value != "90" && document.frm.in_sel_type.value != "100")){ //조회단위가 '품목','Top10_금액'인 경우는 제외
		alert("품목을 선택하시기 바랍니다!");
		return;
	}
	
	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+document.frm.in_act_gubn.value;

	// 날짜기간 무결성 check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"sc_20010_TERM_CHECK", { 
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
				alert("주간은 12주, 월별은 12개월로만 조회됩니다");
				return;
			}
			else if (check_return == -9){
				alert("날짜 오류입니다");
				return;
			}

			if(document.frm.in_sel_gubn.value == "06"){ // 유형으로 조회시 봉수가 0이면 안된다!
				if(strToNum(document.frm.in_sel_gubn.value) == 0){
					alert("봉수는 0이 될 수 없습니다!")
					return;
				}
			}
			// 조회시 WAITING 이미지 보여주기
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // 조회버튼으로 조회시에는 무조건 첫페이지이다!
			document.frm._moon_service.value = "sc_20010_ProdSellAnal_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};
