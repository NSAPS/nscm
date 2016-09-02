//############################################################
//## ���α׷�ID : sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup
//## ���α׷��� : �ϰ������ȹ �м�(�籸��) - ���� & ��ȹ���� ���� ȭ��(POPUP)
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
//## 1.0        2008-11-27  ���米          sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup.js ����
//##
//##
//############################################################

// üũ �ڽ� ��ü ����/����
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

// üũ �ڽ� ����/����
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
// üũ �ڽ� ��ü ����/����
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

// üũ �ڽ� ����/����
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

// ���õ� ������ ����
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
		
		checkedValues(); // ���� �׷� ����
		
		this.close();
	}
	else{
		alert("������ �ϳ� �̻� ������ �ؾ� �մϴ�.");
		return;
	}
		
}

// ����/���� ����
function saveDomain(obj){
	
	opener.document.frm.domain.value = obj.value;
	//alert(opener.document.frm.domain.value);
}

// ���� �׷� ����
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

