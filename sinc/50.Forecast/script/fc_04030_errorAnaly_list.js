// 조회버튼 클릭시 tailer 리플레쉬GoSearch = function(service) {		// 조회시 WAITING 이미지 보여주기	//viewWait();		var urlStr = "service.do?_moon_service=fc_04030_errorAnalySearchResult_list&_moon_perpage=100&_moon_pagenumber=1";	//alert(data);			// 전달할 파라메터				var planType = document.frm.selected_plan_type.value; // 계획 유형	var planName = document.frm.selected_plan_name.value; // 계획 명	var errorType = document.frm.selected_error_type.value; // 오류 타입	var operMark = document.frm.selected_operation_mark.value; // 등호	var errorValue = document.frm.selected_error_value.value; // 입력 값	var checkValue = document.frm.checked_forecast.value; // 수요예측 미생성 만		urlStr += "&selected_plan_type=" + planType;	urlStr += "&selected_plan_name=" + planName;	urlStr += "&selected_error_type=" + errorType;	urlStr += "&selected_operation_mark=" + operMark;	urlStr += "&selected_error_value=" + errorValue;	urlStr += "&checked_forecast=" + checkValue;		gridDetailInfo.location.href = urlStr;	};//togle_checkboxfunction togle_checkbox(obj){		if(obj.value == "Y"){		 obj.value = "N";		 obj.checked = false;	}	else {obj.value = "Y";		obj.checked = true;	}	//alert(obj.value);	}