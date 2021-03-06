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
			for( i = 0; i < tabLen-2; i++){			
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
			for( i = 0; i < tabLen-2; i++){
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
	}
	else{
		var cnt = 0;
		while(document.frm.lineGrp[cnt]){
			document.frm.lineGrp[cnt].checked = false;
			cnt++;
		}
	}
};

// 체크 박스 선택/해제
function checkLineGrp(obj){
	
	var cnt = 0;
	var limit = 0;
	
	if( obj.name == "noodleAll" ){
		cnt = 0;
		limit = 2;
	}	
	else if( obj.name == "snackAll" ){
		cnt = 2;
		limit = 7;
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
	var semiVersion = "";
	
	semiVersion = document.frm.selected_version.value;
	
	//alert(str);
	if( semiVersion.length > 0){
		
		opener.document.frm.plant_version.value = str;	
		opener.document.frm.version_list.value = versionList;
		opener.document.frm.plant_list.value = plantList;	
		//alert(versionList.split(',')[0]);
		
		opener.document.frm.semi_version.value = semiVersion;
		
		checkedValues(); // 라인 그룹 저장
		saveSemiPlant(); // 반제품 공장 저장
		
		this.close();
	}
	else{
		alert("공장을 하나 이상 선택을 해야 합니다.");
		return;
	}
		
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

// 반제품 버전 선택시 공장 리스트 표시
function doChangeSemiPlantList(obj){
	
	var semiVersion = obj.value;
	
	var param = "semi_version";
	var value = semiVersion;
	
	commonUtil.getCodeInfo( param, value , "semi_new_item_reg_plant_list", { 
		callback:function(arrList){
			if( arrList.length > 0){
				//<input name="check_modify" type="checkbox" value="N" class="normal" onClick="checkEvent(this)">	
				var div_semi_plant = "";
				for( i = 0 ; i < arrList.length; i++){
					div_semi_plant += "<input name=\"semi_plant\" type=\"checkbox\" value=\"" + arrList[i][0] + "\" ";
					div_semi_plant += "class=\"normal\" >";	
					div_semi_plant += arrList[i][1] + "&nbsp;&nbsp;&nbsp;";
				}
				divSemiPlant.innerHTML = div_semi_plant;
			}
			else{
				alert("선택된 버전에 공장이 없습니다.");
				divSemiPlant.innerHTML = "";
				return;
			}			
		}
	});
}

// 전체 체크 시 반제품 공장 전체 선택
function checkAllSemiPlant(obj){
	
	var i = 0;
	if(obj.checked == true){
		while(document.frm.semi_plant[i]){
			document.frm.semi_plant[i].checked = true;
			i++;
		}
	}
	else{
		while(document.frm.semi_plant[i]){
			document.frm.semi_plant[i].checked = false;
			i++;
		}
	}
}

// 반제품 공장 저장
function saveSemiPlant(){
	var i = 0;
	var semiPlant = "";
	while(document.frm.semi_plant[i]){
		if(document.frm.semi_plant[i].checked == true){
			if(semiPlant.length == 0){
				semiPlant += "AND (DS.PLANT_ID = '" + document.frm.semi_plant[i].value + "'";
			}
			else{
				semiPlant += " OR DS.PLANT_ID = '" + document.frm.semi_plant[i].value + "'";
			}
		}
		i++;
	}
	if(semiPlant.length > 0)
		semiPlant += ")";
	opener.document.frm.semi_plant.value = semiPlant;
	
}
