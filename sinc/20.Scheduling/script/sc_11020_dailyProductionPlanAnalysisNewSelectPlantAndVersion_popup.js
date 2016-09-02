//############################################################
//## 프로그램ID : sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup
//## 프로그램명 : 일간생산계획 분석(재구성) - 공장 & 계획버전 선택 화면(POPUP)
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
//## 1.0        2008-11-27  정재교          sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup.js 개발
//##
//##
//############################################################

// 체크 박스 전체 선택/해제
function checkAll(obj){
	//alert(obj.value);
	var tabLen = main_tbody.rows.length;
	//alert(tabLen); 
	if(obj.value == "N"){
		if( tabLen == 1){
			document.frm.check_modify.checked = true;
			document.frm.check_modify.value = "Y";	
			document.frm.checkModify.value = "Y";
		}
		else{
			for( i = 0; i < tabLen; i++){			
				document.frm.check_modify[i].checked = true;
				document.frm.check_modify[i].value = "Y";	
				document.frm.checkModify[i].value = "Y";	
			}
		}
		obj.value = "Y";	
	}
	else{
		if( tabLen == 1){
			document.frm.check_modify.checked = false;
			document.frm.check_modify.value = "N";
			document.frm.checkModify.value = "N";			
		}
		else{
			for( i = 0; i < tabLen; i++){
				document.frm.check_modify[i].checked = false;
				document.frm.check_modify[i].value = "N";
				document.frm.checkModify[i].value = "N";				
			}			
		}		
		obj.value = "N";	
			
	}
};

// 체크 박스 선택/해제
function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "Y";			
		}
		else{
			document.frm.checkModify.value = "Y";			
		}
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "N";			
		}
		else{
			document.frm.checkModify.value = "N";			
		}
	}
};
// 체크 박스 전체 선택/해제
function checkAllLine(obj){
	
	if(obj.checked == true){
		var cnt = 0;
		while(document.frm.lineGrp[cnt]){
			document.frm.lineGrp[cnt].checked = true;
			cnt++;
		}	
		opener.document.frm.line_grp_all.value = "Y";
	}
	else{
		var cnt = 0;
		while(document.frm.lineGrp[cnt]){
			document.frm.lineGrp[cnt].checked = false;
			cnt++;
		}
		opener.document.frm.line_grp_all.value = "N";
	}
};

// 체크 박스 선택/해제
function checkLineGrp(obj){
	
	var cnt = 0;
	var limit = 0;
	
	if( obj.name == "noodle1" ){
		cnt = 0;
		limit = 7;
	}	
	else if( obj.name == "noodle2" ){
		cnt = 7;
		limit = 12;
	}
	else if( obj.name == "snack"){
		cnt = 12;
		limit = 26;
	}
	else if( obj.name == "noodleAll" ){
		cnt = 0;
		limit = 12;
	}
	else if( obj.name == "noodleAndSnack" ){
		cnt = 0;
		limit = 26;
	}
	
	if( obj.checked == false ){		
		while( document.frm.lineGrp[cnt] && cnt < limit ){
			document.frm.lineGrp[cnt].checked = false;
			cnt++;
		}
	}
	else{
		while( document.frm.lineGrp[cnt] && cnt < limit ){
			document.frm.lineGrp[cnt].checked = true;
			cnt++;
		}
	}

};

// AND ( ... )   &#39;
//(DS.PLANT_ID = '1170' AND DS.VERSION = '20081119.17.02') 
// OR (DS.PLANT_ID = '1140' AND DS.VERSION = '20081118.09.50')
// &apos; (xml)
var temp;

// 선택된 변수들 저장
function saveValues(){
	
	var tabLen = main_tbody.rows.length;
	var str = "";
	var plantList = "";
	var versionList = "";
	
	for( i = 0; i < tabLen; i++){
		if( document.frm.checkModify[i].value == "Y" ){
			var plant_id = document.frm.plant_id[i].value;
			var version = document.frm.selected_version[i].value;
			
			if( str.length > 0 ){
				str += " OR (DS.PLANT_ID = '" + plant_id + "' AND DS.VERSION = '" + version + "')";
				plantList += ",'" + plant_id + "'";
				versionList += "," + version;
			}
			else{
				str += "(DS.PLANT_ID = '" + plant_id + "' AND DS.VERSION = '" + version + "')";
				plantList += "'" + plant_id + "'";
				versionList += version;
			}
		}
	}
	//alert(str);
	if( str.length > 0){
		
		opener.document.frm.plant_version.value = str;	
		opener.document.frm.version_list.value = versionList;
		opener.document.frm.plant_list.value = plantList;	
		//alert(versionList.split(',')[0]);
		
		checkedValues(); // 라인 그룹 저장
		
		this.close();
	}
	else{
		alert("공장을 하나 이상 선택을 해야 합니다.");
		return;
	}
		
}

// 내수/수출 저장
function saveDomain(obj){
	
	opener.document.frm.domain.value = obj.value;
	//alert(opener.document.frm.domain.value);
}

// 라인 그룹 저장
function checkedValues(){
	
	var cnt = 0;
	var str = "";
	
	while(document.frm.lineGrp[cnt]){
		if( document.frm.lineGrp[cnt].checked == true ){
			if(str.length > 0){
				str += ",'" + document.frm.lineGrp[cnt].value + "'";
			}
			else{
				str += "'" + document.frm.lineGrp[cnt].value + "'";
			}
		}
		cnt++;
	}
	
	opener.document.frm.line_grp.value = str;
	//alert(opener.document.frm.value);
}

