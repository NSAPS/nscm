//############################################################
//## 프로그램ID : sc_11020_dailyProductionPlanAnalysisNew_reg
//## 프로그램명 : 일간생산계획 분석(재구성) - 등록화면(POPUP)
//## 개발자  : 정재교
//## 개발일자 : 2008-11-27 목요일
//##
//##관련 job file : job_sinc_20_scheduling_00.xml
//##
//##관련 query file : query_sinc_20_scheduling_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2008-11-27  정재교          sc_11020_dailyProductionPlanAnalysisNew_reg.js 개발
//##
//##
//############################################################

// 문자열의 〔,〕를 [,]로 변경
function transferChar1(){
	
	var tabLength = left_tbody.rows.length;
	
	for( i = 0; i < tabLength; i++ ){  
		if( document.frm.input_wo_id[i] ){
			var woId = document.frm.input_wo_id[i].value;
			woId = replaceAll(woId,"〔","[");
			woId = replaceAll(woId,"〕","]");
			divWoId[i].innerHTML = woId;			
		} 
		else{
			if( document.frm.input_wo_id ){
				var woId = document.frm.input_wo_id.value;
				woId = replaceAll(woId,"〔","[");
				woId = replaceAll(woId,"〕","]");
				divWoId.innerHTML = woId;	
			}
		}		
	}
}; 

//replaceAll
function replaceAll(str,re,transChar){
	var len = str.length;
	
	for(j = 0; j < len; j++){
		str = str.replace(re,transChar);
	}
	
	return str;
};

// 날짜 체크
function dateFormatCheck(obj){
	
	if( obj.value != "" && obj.value != null ) {
		// 날짜 체크
		if( chkDate(obj, 8) == 0 ) {				
			obj.focus();
			return;
		}
	}	
}

// 시간 체크
function timeFormatCheck(obj){
	
	if(obj.value != "" && obj.value != null ){
		if( obj.value.length != 6 ){
			alert("시간은 6자리 입니다.(입력형식 060000:HHMISS)");
			return;
		}
	}
}

// 저장 버튼 클릭
GoSave = function(service) {
	
	if( document.frm.flag.value == "M" ){//수정
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;				
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self"; 
		document.frm.submit();				
		opener.GoSearch("sc_11020_dailyProductionPlanAnalysisNew_list");
	}
	else{
		//var tabLength = left_tbody.rows.length;
		var service = "sc_11020_dailyProductionPlanAnalysisNew_reg_save02_comp";// 등록
		var param = "plant_id!%!proc_id!%!input_start_dttm_time!%!input_start_dttm_date";
		var value = document.frm.plant_id.value + "!%!" + document.frm.proc_id.value + "!%!";
		//value += document.frm.input_start_time[tabLength-1].value + "!%!" + document.frm.input_start_date[tabLength-1].value;
		value += document.frm.input_start_time.value + "!%!" + document.frm.input_start_date.value;
		commonUtil.getCodeInfo(param, value , "work_diary_check", { 
			callback:function(arrList){
				if( arrList.length < 1){	
					alert("해당 SHIFT로 이동 할 수 없습니다(근무조 편성에 맞지 않음).")
					return;
				}	
				else{
					var param = "plant_id!%!version!%!seq!%!item_id!%!input_proc_id!%!proc_id!%!input_start_dttm_time!%!input_start_dttm_date";
					var value = document.frm.plant_id.value + "!%!" + document.frm.version.value + "!%!"
								+ document.frm.seq.value + "!%!" + document.frm.item_id.value + "!%!"
								+ document.frm.proc_id.value + "!%!" + document.frm.proc_id.value + "!%!"
								//+ document.frm.input_start_time[tabLength-1].value + "!%!" + document.frm.input_start_date[tabLength-1].value;
								+ document.frm.input_start_time.value + "!%!" + document.frm.input_start_date.value;
					
					// 이동할 shift에 수량이 있는지 체크. 있으면 메시지 표시
					commonUtil.getCodeInfo(param, value , "move_target_check", { 
						callback:function(arrList){
							if( arrList.length > 0){	
								alert("등록 할 SHIFT에 수량이 있습니다.");
								return;											
							}
							else{
								frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;				
								document.frm._moon_service.value = service;
								document.frm.action = "service.do";
								document.frm.target = "_self"; 
								document.frm.submit();				
								opener.GoSearch("sc_11020_dailyProductionPlanAnalysisNew_list");
							}			
						}
					});	
						
				}				
			}
		});
		//alert("!!");
	}
	
	this.focus();
		
};


// 작업장 선택 시 제품 리스트 채움
function doChangeItemList(obj){
	
	var plant_id = document.frm.plant_id.value;
	var proc_id = obj.value;
	
	var param = "plant_id!%!selected_proc";
	var value = plant_id + "!%!" + proc_id;
	
	commonUtil.getCodeInfo( param, value , "input_plant_proc_of_item_list", { 
		callback:function(arrList){
			if( arrList.length > 0){
				var item_id = document.frm.stored_item.value;
					
				var div_item = "<select name=\"selected_item\" class=\"normal\">";
				div_item += "<option value=\"\">선택</option>";
				for( i = 0 ; i < arrList.length; i++){
					div_item += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == item_id)
							div_item += " selected ";
					div_item += ">" + arrList[i][1] + "</option>";	
				}
				div_item += "</select>";
				divItem.innerHTML = div_item;
			}
			else{
				alert("일치하는 제품이 없습니다.");
				return;
			}			
		}
	});
}