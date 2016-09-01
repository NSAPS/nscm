//############################################################
//## ���α׷�ID : sc_11020_dailyProductionPlanAnalysisNew_reg
//## ���α׷��� : �ϰ������ȹ �м�(�籸��) - ���ȭ��(POPUP)
//## ������  : ���米
//## �������� : 2008-11-27 �����
//##
//##���� job file : job_sinc_20_scheduling_00.xml
//##
//##���� query file : query_sinc_20_scheduling_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2008-11-27  ���米          sc_11020_dailyProductionPlanAnalysisNew_reg.js ����
//##
//##
//############################################################

// ���ڿ��� ��,���� [,]�� ����
function transferChar1(){
	
	var tabLength = left_tbody.rows.length;
	
	for( i = 0; i < tabLength; i++ ){  
		if( document.frm.input_wo_id[i] ){
			var woId = document.frm.input_wo_id[i].value;
			woId = replaceAll(woId,"��","[");
			woId = replaceAll(woId,"��","]");
			divWoId[i].innerHTML = woId;			
		} 
		else{
			if( document.frm.input_wo_id ){
				var woId = document.frm.input_wo_id.value;
				woId = replaceAll(woId,"��","[");
				woId = replaceAll(woId,"��","]");
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

// ��¥ üũ
function dateFormatCheck(obj){
	
	if( obj.value != "" && obj.value != null ) {
		// ��¥ üũ
		if( chkDate(obj, 8) == 0 ) {				
			obj.focus();
			return;
		}
	}	
}

// �ð� üũ
function timeFormatCheck(obj){
	
	if(obj.value != "" && obj.value != null ){
		if( obj.value.length != 6 ){
			alert("�ð��� 6�ڸ� �Դϴ�.(�Է����� 060000:HHMISS)");
			return;
		}
	}
}

// ���� ��ư Ŭ��
GoSave = function(service) {
	
	if( document.frm.flag.value == "M" ){//����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;				
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self"; 
		document.frm.submit();				
		opener.GoSearch("sc_11020_dailyProductionPlanAnalysisNew_list");
	}
	else{
		//var tabLength = left_tbody.rows.length;
		var service = "sc_11020_dailyProductionPlanAnalysisNew_reg_save02_comp";// ���
		var param = "plant_id!%!proc_id!%!input_start_dttm_time!%!input_start_dttm_date";
		var value = document.frm.plant_id.value + "!%!" + document.frm.proc_id.value + "!%!";
		//value += document.frm.input_start_time[tabLength-1].value + "!%!" + document.frm.input_start_date[tabLength-1].value;
		value += document.frm.input_start_time.value + "!%!" + document.frm.input_start_date.value;
		commonUtil.getCodeInfo(param, value , "work_diary_check", { 
			callback:function(arrList){
				if( arrList.length < 1){	
					alert("�ش� SHIFT�� �̵� �� �� �����ϴ�(�ٹ��� ���� ���� ����).")
					return;
				}	
				else{
					var param = "plant_id!%!version!%!seq!%!item_id!%!input_proc_id!%!proc_id!%!input_start_dttm_time!%!input_start_dttm_date";
					var value = document.frm.plant_id.value + "!%!" + document.frm.version.value + "!%!"
								+ document.frm.seq.value + "!%!" + document.frm.item_id.value + "!%!"
								+ document.frm.proc_id.value + "!%!" + document.frm.proc_id.value + "!%!"
								//+ document.frm.input_start_time[tabLength-1].value + "!%!" + document.frm.input_start_date[tabLength-1].value;
								+ document.frm.input_start_time.value + "!%!" + document.frm.input_start_date.value;
					
					// �̵��� shift�� ������ �ִ��� üũ. ������ �޽��� ǥ��
					commonUtil.getCodeInfo(param, value , "move_target_check", { 
						callback:function(arrList){
							if( arrList.length > 0){	
								alert("��� �� SHIFT�� ������ �ֽ��ϴ�.");
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


// �۾��� ���� �� ��ǰ ����Ʈ ä��
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
				div_item += "<option value=\"\">����</option>";
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
				alert("��ġ�ϴ� ��ǰ�� �����ϴ�.");
				return;
			}			
		}
	});
}