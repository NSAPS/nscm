//############################################################
//## ���α׷�ID 	: ip_02060_SalesAllocationNiceLikePlan.js
//## ���α׷��� 	: ���������Է�����
//## ������  	: ������
//## �������� 	: 2010-02-18
//##
//## ���� job file 	 : 
//##
//## ���� query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-02-18  ������     ip_02060_SalesAllocationNiceLikePlan.js ����
//## 2.0		2010-06-01  ������	  �����Ҵ緮�� ��� �߰��Ҵ��� �ޱ����� ��絥���� ����ó��
//##								  -> CRUD�� ������ 'U'�� �����Ѵ�.
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;													// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// ���� ��Ű��(class ���� ���)
var job_id = 'ip_02060_SalesAllocationNiceLikePlan';		// job id(���� ��, WiseGrid Header key)
var GridObj ; 												// WiseGrid ��ü
var GridObj2;
var GridObj3;

var color_tot = '224|224|224';
var color_edit_col = '255|253|208';

var oldRow = 0;

var rFirst = 0;

/******************************************          Action Function         **********************************************/
/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function GoSearch(service) {
	
	if( document.frm.cnfm_date.value == "" || document.frm.cnfm_date.value == null ) {
		alert("���ڸ� �Է��Ͽ� �ֽʽÿ�.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("��ǰ�ڵ带 �Է��Ͽ� �ֽʽÿ�.");
		return;
	}
	
	// ���� ��ȸ�� �۾�����,ǰ�� ����
	document.frm.curr_item_id.value = document.frm.item_id.value;
	document.frm.curr_cnfm_date.value = document.frm.cnfm_date.value;
	
	// ȭ�� �ʱ�ȭ
	document.frm.alloc_rate.value = "";
	document.frm.add_alloc_rate.value = "";
	document.frm.dc_alloc_rate.value = "";

	// ��������-����� �Ǹ����� array��ȸ
	getDeptStorQuota();
	
	doQuery();

	doQuery2();  
	
	GridObj3.ClearGrid();
	setHeader3();
	
};

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function GoSave() {

	// GridObj�� �����Ͱ� ���� �����ϴ� ���� NFOS���� ��ü�޼����� ������ ����̴�.
	if(GridObj.GetRowCount() == 0) {
		
		saveCommonComment();
		return;
	}	
		
	var cnfm_date = document.frm.cnfm_date.value;
	var item_id = document.frm.item_id.value;
	var curr_item_id = document.frm.curr_item_id.value;
	var curr_cnfm_date = document.frm.curr_cnfm_date.value;
	
	if( cnfm_date == null || cnfm_date == ""){
		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("��ǰ �ڵ带 ���� �Է��ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}

	if( cnfm_date != curr_cnfm_date){
		alert("�����Ϸ��� �۾����ڰ� ���� �۾��� �۾����ڿ� �ٸ��ϴ�. ��ȸ�� �ٽ��Ͻʽÿ�.");
		return;
	}	

	if( item_id != curr_item_id){
		alert("�����Ϸ��� ǰ���� ���� �۾��� ǰ��� �ٸ��ϴ�. ��ȸ�� �ٽ��Ͻʽÿ�.");
		return;
	}	

	if( document.frm.insel_allocReason.value == "00"){
		
		alert("�����Ҵ� ������ ����ϰ� �������ּ���.");
		return;
	}	//2014-10-22 �Ҵ���� ��� ���� �����ϰ� �̽¿�븮 ��û  2014-12-19 �ٽ� �츮�� ��û

	save_auto_alloc_info();

	doSave_DW1(cnfm_date, item_id);
};

var alloc_comment_cnt = new Array();

function doChange2(){
	
	var cnfm_date = document.frm.cnfm_date.value;
	alloc_comment_cnt = new Array();
	
	commonUtil.getSelQeury("cnfm_date",cnfm_date,"ip_02060_ALLOC_ITEM_LIST", { 
	callback:function(arrList){
		var in_div;
		in_div = "<select name=\"item_id\" OnChange=\"doChange3(this);\"  >";
		var selected_row = 0;
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<option value="+arrList[i][0];
			
			if(arrList[i][6] == 'YES') {
				in_div += " style=\"background-color:#ffffaa; \"";
			}
			// ����� combo-list�� refresh�Ǹ鼭 �����ߴ� ǰ���� �ٽ� �����ϵ��� �Ѵ�.
			if(document.frm.item_id.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][1]+"</option>";
			
		}	
		in_div += "</select> \n";
		
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<input type=\"hidden\" name=\"item_cnt_info\" value="+arrList[i][2]+">";
			in_div +=	"<input type=\"hidden\" name=\"box_per_palet_cnt\" value="+arrList[i][3]+">";
			in_div +=	"<input type=\"hidden\" name=\"itype_cnt\" value="+arrList[i][4]+">";
			in_div +=	"<input type=\"hidden\" name=\"cd_gubn_cnt\" value="+arrList[i][5]+">";
			in_div +=	"<input type=\"hidden\" name=\"insel_allocReason_cnt\" value="+arrList[i][7]+">";
			in_div +=	"<input type=\"hidden\" name=\"insel_allocQoutaType_cnt\" value="+arrList[i][8]+">";
			alloc_comment_cnt[i] =	arrList[i][9];
			in_div +=	"<input type=\"hidden\" name=\"insel_auto_alloc_flag\" value="+arrList[i][10]+">";
			in_div +=	"<input type=\"hidden\" name=\"insel_auto_alloc_quota_type\" value="+arrList[i][11]+">";
		}	

		divItemCombo.innerHTML = in_div;
		// ǰ��cnt������ �����Ѵ�.
		document.frm.item_info.value = arrList[selected_row][2];
		document.frm.box_per_palet.value = arrList[selected_row][3];
		document.frm.itype.value = arrList[selected_row][4];
		document.frm.cd_gubn.value = arrList[selected_row][5];
		
		document.frm.insel_allocReason.value = arrList[selected_row][7];
		
		// �����Ҵ������ �ٲ㼭 ��ȸ�� ���� ����� �����ͷ� �������� �ʴ´�.
		if(!QoutaType_Change) {
			document.frm.insel_allocQoutaType.value = arrList[selected_row][8];
			QoutaType_Change = false;
		}
		
		//document.frm.alloc_comment.value = arrList[selected_row][9];
		document.frm.alloc_comment.value = alloc_comment_cnt[selected_row];
		
		if(arrList[selected_row][10] == "Y") {
			document.frm.chk_AutoAllocCheck.checked = true;
			//document.frm.insel_AutoAllocQoutaType.disabled = false;
		}
		else {
			document.frm.chk_AutoAllocCheck.checked = false;
			//document.frm.insel_AutoAllocQoutaType.disabled = true;
		}
		
		//document.frm.insel_AutoAllocQoutaType.value = arrList[selected_row][11];
		
		/* NFOS���ۿ��� Ȯ�� */
		commonUtil.getSelQeury("cnfm_date",cnfm_date,"ip_02060_CHECK_DC_ALLOC_FLAG", { 
		callback:function(arrList){
			if(arrList[0][0]=='Y') { // NFOS���ۿϷ�
				document.frm.btnAllocConf.disabled = true;
				document.frm.btnAddAllocConf.disabled = true;
				document.frm.alloc_rate.disabled = true;
				document.frm.dc_alloc_rate.disabled = true;
				
 				// �����Ҵ���, �Ҵ緮 �Է±���
 				GridObj.SetColCellActivation("ALLOC_RATE","activatenoedit"); 
				GridObj.SetColCellActivation("ALLOC_BOX","activatenoedit"); 
			}
			else {
				document.frm.btnAllocConf.disabled = false;
				document.frm.btnAddAllocConf.disabled = false;
				document.frm.alloc_rate.disabled = false;
				document.frm.dc_alloc_rate.disabled = false;

 				// �����Ҵ���, �Ҵ緮 �Է°���
 				GridObj.SetColCellActivation("ALLOC_RATE","edit"); 
				GridObj.SetColCellActivation("ALLOC_BOX","edit"); 
			}
			if(arrList[0][2]=='Y') { // NFOS�߰��۾� �Ϸ�
				document.frm.btnAddAllocConf.disabled = true;
			}
			else {
				document.frm.btnAddAllocConf.disabled = false;
			}

			document.frm.btnAllocConf.value = arrList[0][1];
			document.frm.btnAddAllocConf.value = arrList[0][3];
			document.frm.common_comment.value = arrList[0][4];
		}
		});

	}
	});

}

function doChange3(obj){
	document.frm.item_info.value 		= document.frm.item_cnt_info[obj.options.selectedIndex].value;	
	document.frm.box_per_palet.value 	= document.frm.box_per_palet_cnt[obj.options.selectedIndex].value;	
	document.frm.itype.value 			= document.frm.itype_cnt[obj.options.selectedIndex].value;	
	document.frm.cd_gubn.value 			= document.frm.cd_gubn_cnt[obj.options.selectedIndex].value;	

	document.frm.insel_allocReason.value 	= document.frm.insel_allocReason_cnt[obj.options.selectedIndex].value;	
	document.frm.insel_allocQoutaType.value = document.frm.insel_allocQoutaType_cnt[obj.options.selectedIndex].value;	
	document.frm.alloc_comment.value 		= alloc_comment_cnt[obj.options.selectedIndex]; //document.frm.alloc_comment_cnt[obj.options.selectedIndex].value;	
	if(document.frm.insel_auto_alloc_flag[obj.options.selectedIndex].value == "Y") {
		document.frm.chk_AutoAllocCheck.checked = true;
		//document.frm.insel_AutoAllocQoutaType.disabled = false;		
	}
	else {
		document.frm.chk_AutoAllocCheck.checked = false;
		//document.frm.insel_AutoAllocQoutaType.disabled = true;		
	}
	//document.frm.insel_AutoAllocQoutaType.value = document.frm.insel_auto_alloc_quota_type[obj.options.selectedIndex].value;	

	// �����Ҵ� ������ ����ڰ� �ٲپ����� Ȯ�� ����
	QoutaType_Change = false;
}

function execute_alloc_flag_yes(){
	var cnfm_date = document.frm.cnfm_date.value;
	var user_id	= document.frm._user_id.value
	commonUtil.executeQuery("cnfm_date!%!user_id", cnfm_date+"!%!"+user_id, "ip_02060_UPDATE_DC_ALLOC_FLAG", success);
}

success = function(data) {
	if (data == "SUCCESS") {
		document.frm.btnAllocConf.value = "NFOS����";
		document.frm.btnAllocConf.disabled = true;
		alert("����Ǿ����ϴ�.");
	}
}

function saveCommonComment(){
	var cnfm_date = document.frm.cnfm_date.value;
	var common_comment = document.frm.common_comment.value;
	commonUtil.executeQuery("cnfm_date!%!common_comment", cnfm_date+"!%!"+common_comment, "ip_02060_UPDATE_COMMON_COMMENT", success2);
}

success2 = function(data) {
	if (data == "SUCCESS") {
		return;
	}
}

function execute_add_alloc_flag_yes(){
	var cnfm_date = document.frm.cnfm_date.value;
	var user_id	= document.frm._user_id.value
	commonUtil.executeQuery("cnfm_date!%!user_id", cnfm_date+"!%!"+user_id, "ip_02060_UPDATE_DC_ADD_ALLOC_FLAG", success3);
}

success3 = function(data) {
	if (data == "SUCCESS") {
		document.frm.btnAddAllocConf.value = "�߰��Ϸ�";
		document.frm.btnAddAllocConf.disabled = true;
//		alert("����Ǿ����ϴ�.");
	}
}

function save_dc_alloc_item(){
	var cnfm_date 	= document.frm.cnfm_date.value;
	var item_id		= document.frm.item_id.value;
	var alloc_reason = document.frm.insel_allocReason.value;
	var use_quota_type = document.frm.insel_allocQoutaType.value;
	var alloc_comment = document.frm.alloc_comment.value;
	var user_id	= document.frm._user_id.value
	commonUtil.executeQuery("cnfm_date!%!item_id!%!alloc_reason!%!use_quota_type!%!alloc_comment!%!user_id", 
		cnfm_date+"!%!"+item_id+"!%!"+alloc_reason+"!%!"+use_quota_type+"!%!"+alloc_comment+"!%!"+user_id, "ip_02060_UPDATE_DC_ALLOC_ITEM", success4);
}

success4 = function(data) {
	if (data == "SUCCESS") {

		saveCommonComment();
		
//		alert("����Ǿ����ϴ�.");
	}
}

// �ڵ������Ҵ� ���ο� ������ �����Ѵ�. ������ ��ü�޼��� ����ó�����۽� �����Ѵ�.
function save_auto_alloc_info(){
	var item_id		= document.frm.item_id.value;

	if(document.frm.chk_AutoAllocCheck.checked)
		var chk_AutoAllocCheck = "Y";
	else
		var chk_AutoAllocCheck = "N";

	// �ڵ������Ҵ翩�ΰ� ������ ������ �Ǵ��Ѵ�.
	var item_selectedIndex = document.frm.item_id.options.selectedIndex;
	var old_chk_AutoAllocCheck = document.frm.insel_auto_alloc_flag[item_selectedIndex].value;

// �ڵ� �����Ҵ� ������ ������� �ʴ´�.
//	var insel_AutoAllocQoutaType = document.frm.insel_AutoAllocQoutaType.value;
//	var old_auto_alloc_quota_type = document.frm.insel_auto_alloc_quota_type[item_selectedIndex].value;
var insel_AutoAllocQoutaType = '20';
var old_auto_alloc_quota_type = '20';

	// ������ �ٲ��츸 �����Ѵ�.
	if(chk_AutoAllocCheck != old_chk_AutoAllocCheck || 
		(chk_AutoAllocCheck == "Y" && insel_AutoAllocQoutaType != old_auto_alloc_quota_type)) {
	
		commonUtil.executeQuery("item_id!%!chk_AutoAllocCheck!%!insel_allocQoutaType", 
			item_id+"!%!"+chk_AutoAllocCheck+"!%!"+insel_AutoAllocQoutaType, "ip_02060_UPDATE_AUTO_ALLOC_INFO", success5);
	}
	
}

success5 = function(data) {
	if (data == "SUCCESS") {
		return;
	}
}

// ���ڿ� �Է¹���
function checkForNumber(obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		//ApplyAllocRate_DW1(obj);
	}
}

function checkForNumber2(obj) {
	var key = event.keyCode;	
	// �߰��Ҵ翡���� ���̳ʽ� �ϰ��Ҵ��� �����ϵ��� ���̳ʽ� ��ȣ�� ����Ѵ�.
	if(!(key==8||key==9||key==13||key==46||key==144||key==45|| // 45�� ���̳ʽ�
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}

	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		//ApplyAddRate_DW1(obj);
	}
}


function enter_alloc(obj) {

	document.frm.add_alloc_rate.value = "";
	document.frm.alloc_goal_rate.value = "";
	document.frm.alloc_by_edi.value = "";
	
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		ApplyAllocRate_DW1(obj);
	}
}

function enter_add_alloc(obj) {
	document.frm.alloc_rate.value = "";
	document.frm.alloc_goal_rate.value = "";
	document.frm.alloc_by_edi.value = "";
		// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		ApplyAddRate_DW1();
	}
}

function enter_alloc_goal_rate(obj) {
	document.frm.alloc_rate.value = "";
	document.frm.add_alloc_rate.value = "";
	document.frm.alloc_by_edi.value = "";
		// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		ApplyRate_BY_Goal_DW1();
	}
}

function enter_alloc_by_edi(obj) {
	document.frm.alloc_rate.value = "";
	document.frm.add_alloc_rate.value = "";
	document.frm.alloc_goal_rate.value = "";
		// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		ApplyRate_BY_EDI_DW1();
	}
}

function enter_dc_alloc(obj) {

	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		ApplyAllocRate_DW2(obj);
	}
}

var ctrl_keydown = false;
// ��ǰ���� 'Q'�Է½�  ��ȸ����
function enterShortKey() {
	var key = event.keyCode;
//alert(key);
	if(key == 81) { //'q' or 'Q'
		GoSearch("");
	}

	if(ctrl_keydown && key == 83) { // s�� ��������.
		GoSave();
	}
	
	if(key == 17) {// ctrl key down
		ctrl_keydown = true;
	}
			
}

function onKeyUp() {
	ctrl_keydown = false;
}

// EDI ��ȸ���� comboList visible
function chk_sel_02_EDI_disabled(obj) {
	if(obj.checked == true) document.frm.chk_sel_02_EDI.disabled = false;
	else document.frm.chk_sel_02_EDI.disabled = true;
}

// �ڵ������Ҵ� comboList visible
function AutoAllocQoutaType_disabled(obj) {
	if(obj.checked == true) {
		alert("�ڵ� �����Ҵ��� �����ϱ��� �𷡿������� ����˴ϴ�!");
		document.frm.insel_AutoAllocQoutaType.disabled = false;
	}
	else document.frm.insel_AutoAllocQoutaType.disabled = true;
}

// �����Ҵ� ������ ����ڰ� �ٲ㼭 ��ȸ�� ���� ����Ǿ� �ִ� �����Ҵ� �������� ���ŵ��� �ʵ��� �����Ѵ�.
// �ֳ��ϸ� ���ο� ������ �����ϱ� ���� �����ϰ� ��ȸ�� ����� ���̱� �����̴�.
var QoutaType_Change = false;
function	check_QoutaType_Change() {
	QoutaType_Change = true;
}

// ��ǰ �˻� POPUP
// ǰ�� POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// �Ҵ��� �ϰ�����
function ApplyAllocRate_DW1() {

	var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_rate = strToNum(document.frm.alloc_rate.value);  // �����Ҵ���
	
	var dc_id = new Array();
	var dc_alloc_qty = new Array();
	var alloc_zone;
	
	for(i=0;i<GridObj.GetRowCount( );i++ ) {

		dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŰ�ȹ
		old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
		
		if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
		  	alloc_zone = "1";  
		}
		else {
			alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
		}
		
		// �ǸŰ�ȹ�� 0���� �۰ų� �ش� ZONE�� �ƴϸ� �Ҵ緮 0
		if(dept_plan_box <= 0 || alloc_zone != "1"	) {
			dept_alloc_box = 0;
			dept_alloc_rate = 0;
		}
		else {
			// �Ҵ����� ���� ���� �Ҵ緮�� �����Ѵ�.
			dept_alloc_box = Math.round(dept_plan_box * alloc_rate / 100);
			// ������ �Ҵ����� ���� �Ѵ�.
			dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;
		}
		
		// �ߺ� üũ�� ������ ���� �Ҵ緮�� �߰��Ѵ�.
		if(document.frm.chk_add_alloc.checked == true) {
			dept_alloc_box = dept_alloc_box + old_dept_alloc_box;
			if(dept_plan_box <= 0) dept_alloc_rate = 0;
			else	dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;
		}
		
		old_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
		new_cum_sell_box = old_cum_sell_box - old_dept_alloc_box + dept_alloc_box;
		
		if(dept_plan_box <= 0) new_dept_goal_rate = 0;
		else	new_dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
		
		GridObj.SetCellValue("ALLOC_BOX", i, dept_alloc_box);
		GridObj.SetCellValue("ALLOC_RATE", i, dept_alloc_rate);
		GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box); // ������ ����
		GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate); // �޼��� ����		
	}

	re_cal_DW1_rate_sum(); // DW1 ����sum����
	ReCalculation_DW2(); // DW2�� �����Ҵ緮 ����
}

// �߰��Ҵ��� �ϰ�����
function ApplyAddRate_DW1() {

	var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var add_alloc_rate = strToNum(document.frm.add_alloc_rate.value);  // �����Ҵ���
	var dept_add_alloc_box = 0, old_dept_add_alloc_box = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_zone;
		
	for(i=0;i<GridObj.GetRowCount( );i++ ) {

		old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
		dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŰ�ȹ
		
		if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
		  	alloc_zone = "1";  
		}
		else {
			alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
		}
		
		dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i)); // ���� �����Ҵ緮
		old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old �߰������Ҵ緮

		// �ǸŰ�ȹ�� 0���� �۰ų� �ش� ZONE�� �ƴϸ� ���
		if(dept_plan_box <= 0 || alloc_zone != "1"	) {
			dept_add_alloc_box = 0;
		}	
		else {
			dept_add_alloc_box = Math.round(dept_plan_box * add_alloc_rate / 100);
		}
		
		// �ߺ� üũ�� ������ ���� �߰������Ҵ緮�� �߰��Ѵ�.
		if(document.frm.chk_add_alloc.checked == true) {
			dept_add_alloc_box = dept_add_alloc_box + old_dept_add_alloc_box;
		}
		
		dept_alloc_box = dept_alloc_box - old_dept_add_alloc_box + dept_add_alloc_box;

		if(dept_plan_box <= 0) dept_alloc_rate = 0;
		else dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;				

		old_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
		new_cum_sell_box = old_cum_sell_box - old_dept_alloc_box + dept_alloc_box;
		
		if(dept_plan_box <= 0) new_dept_goal_rate = 0;
		else	new_dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;

		GridObj.SetCellValue("ADD_ALLOC_BOX", i, dept_add_alloc_box);
		GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", i, dept_add_alloc_box);
		GridObj.SetCellValue("ALLOC_BOX", i, dept_alloc_box);
		GridObj.SetCellValue("ALLOC_RATE", i, dept_alloc_rate);
		GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box); // ������ ����
		GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate); // �޼��� ����		
	}

	re_cal_DW1_rate_sum(); // DW1 ����sum����
	ReCalculation_DW2(); // DW2�� �����Ҵ緮 ����
}

// �޼��� �ϰ�����
function ApplyRate_BY_Goal_DW1() {
	
	var alloc_zone;
	
	// �����Ҵ� ������ �ǸŰ�ȹ�� �ƴѰ�츸 �����Ѵ�.
	if(document.frm.insel_allocQoutaType.value == "10") {
		alert("�����Ҵ������ �ǸŰ�ȹ�� �ƴѰ�츸 ��밡���մϴ�.");
	}
	else {
		var alloc_goal_rate = strToNum(document.frm.alloc_goal_rate.value);  // �Է��� ���� �޼���
		var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0, dept_cum_sell_box = 0;
		var today_cum_sell_box = 0, new_dept_alloc_box = 0, new_dept_alloc_rate = 0;
		var old_dept_add_alloc_box = 0, new_dept_add_alloc_box = 0;
		var new_dept_goal_box = 0, new_dept_goal_rate;
		
		if(document.frm.btnAllocConf.disabled) { // NFOS���� OK -> �߰��Ҵ緮�� �����Ѵ�.
			
			// DW1�� ���ؼ� loop����	
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				// ��ǥ�� 0 �̻��϶��� ����
				dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŸ�ǥ
				dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i)); // ���� �����Ҵ緮
				old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old �߰������Ҵ緮
				// ���� �޼��ڽ��� ������ �´�.
				dept_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
				
				if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
				  	alloc_zone = "1";  
				}
				else {
					alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
				}
				
				// �ǸŰ�ȹ�� 0���� �۰ų� �ش� ZONE�� �ƴϸ� ���
				if(dept_plan_box <= 0 || alloc_zone != "1"	) {
					new_dept_goal_box = 0;
				}	
				else {
					// ����޼����� �Ǳ����� �ڽ����� ���Ѵ�.
					new_dept_goal_box = Math.round(dept_plan_box * alloc_goal_rate  / 100);
				}
				
				// �ߺ� üũ�� ������ �Ҵ��ǥ�� ���� �߰������Ҵ緮�� �߰��Ѵ�.
				if(document.frm.chk_add_alloc.checked == true) {
					new_dept_goal_box = new_dept_goal_box + dept_cum_sell_box;
				}
				
				// ������ �޼����� �޼��ϱ� ���� �ڽ����� ���ϱ����� �����Ǹż����� ������ �����Ѵ�.
				if(dept_cum_sell_box < new_dept_goal_box) {
					// �߰� �����Ҵ緮 = ���� �޼��� �ڽ��� - old_��������ڽ���
					new_dept_add_alloc_box = old_dept_add_alloc_box + new_dept_goal_box - dept_cum_sell_box;
					
					// �����Ҵ緮�� ���� ����Ѵ�.
					new_dept_alloc_box = dept_alloc_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					// ���ο� �������ڽ� ���
					new_dept_goal_box = dept_cum_sell_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					if(dept_plan_box <= 0) new_dept_alloc_rate = 0;
					else new_dept_alloc_rate = Math.round(new_dept_alloc_box / dept_plan_box*100*10)/10;				
	
					if(dept_plan_box <= 0) new_dept_goal_rate = 0;
					else new_dept_goal_rate = Math.round(new_dept_goal_box / dept_plan_box*100*10)/10;
				}
				else { // �޼����� ���ΰ�츦 ��������!
					// �߰� �����Ҵ緮 = ���� �޼��� �ڽ��� - (old�������� - old �߰������Ҵ緮) 
					new_dept_add_alloc_box = new_dept_goal_box - (dept_cum_sell_box - old_dept_add_alloc_box);
					if(new_dept_add_alloc_box <= 0) { // �߰��Ҵ緮�� �ʿ���ų� (-)�� �� ���
						new_dept_add_alloc_box = 0;
					}
					
					// �����Ҵ緮�� ���� ����Ѵ�.
					new_dept_alloc_box = dept_alloc_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					// ���ο� �������ڽ� ���
					new_dept_goal_box = dept_cum_sell_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					if(dept_plan_box <= 0) new_dept_alloc_rate = 0;
					else new_dept_alloc_rate = Math.round(new_dept_alloc_box / dept_plan_box*100*10)/10;				
	
					if(dept_plan_box <= 0) new_dept_goal_rate = 0;
					else new_dept_goal_rate = Math.round(new_dept_goal_box / dept_plan_box*100*10)/10;
				}
				// ���ο� �߰��Ҵ緮�� ����
				GridObj.SetCellValue("ADD_ALLOC_BOX", i, new_dept_add_alloc_box);
				GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", i, new_dept_add_alloc_box);
				// ���ο� �����Ҵ緮 ����
				GridObj.SetCellValue("ALLOC_BOX", i, new_dept_alloc_box);
				// ���ο� �����Ҵ�� ����
				GridObj.SetCellValue("ALLOC_RATE", i, new_dept_alloc_rate);
				// ������ ����
				GridObj.SetCellValue("CUM_SELL_BOX", i, new_dept_goal_box);
				// �޼��� ����
				GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);				
			}
		}
		else { // NFOS������ -> �Ҵ緮�� �����Ѵ�.
	
			// DW1�� ���ؼ� loop����			
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				// ��ǥ�� 0 �̻��϶��� ����
				dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŸ�ǥ
				// �����ǸŹڽ����� ���Ѵ�.
				dept_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
				// ���������Ҵ緮�� ���Ѵ�.
				dept_alloc_box	= strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
				
				if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
				  	alloc_zone = "1";  
				}
				else {
					alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
				}
				
				// �ǸŰ�ȹ�� 0���� �۰ų� �ش� ZONE�� �ƴϸ� ���
				if(dept_plan_box <= 0 || alloc_zone != "1"	) {
					new_dept_goal_box = 0;
				}	
				else {
					// ����޼����� �Ǳ����� �ڽ����� ���Ѵ�.
					new_dept_goal_box = Math.round(dept_plan_box * alloc_goal_rate  / 100);
				}
				
				// �ߺ� üũ�� ������ �Ҵ��ǥ�� ���� �߰������Ҵ緮�� �߰��Ѵ�.
				if(document.frm.chk_add_alloc.checked == true) {
					new_dept_goal_box = new_dept_goal_box + dept_cum_sell_box;
				}
				
				// ���ϱ����� �����Ǹ� = �����Ǹ� - �����Ҵ緮
				today_cum_sell_box = dept_cum_sell_box - dept_alloc_box;
				
				// ������ �޼����� �޼��ϱ� ���� �ڽ����� ���ϱ����� �����Ǹż����� ������ �����Ѵ�.
				if(today_cum_sell_box < new_dept_goal_box) {
					// �����Ҵ緮 = ���� �޼��� �ڽ��� - ���ϱ��� �޼��� �ڽ���
					new_dept_alloc_box = new_dept_goal_box - today_cum_sell_box;
				}
				else {
					new_dept_alloc_box = dept_alloc_box;
					new_dept_goal_box = dept_cum_sell_box;
				}
				// �����Ҵ��� ����
				if(dept_plan_box <= 0) new_dept_alloc_rate = 0;
				else new_dept_alloc_rate = Math.round(new_dept_alloc_box / dept_plan_box *100*10)/10;
				
				if(dept_plan_box <= 0) new_dept_goal_rate = 0;
					else new_dept_goal_rate = Math.round(new_dept_goal_box / dept_plan_box*100*10)/10;
				
				GridObj.SetCellValue("ALLOC_BOX", i, new_dept_alloc_box);
				GridObj.SetCellValue("ALLOC_RATE", i, new_dept_alloc_rate);
				GridObj.SetCellValue("CUM_SELL_BOX", i, new_dept_goal_box);
				GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);
			}
		}
	
		re_cal_DW1_rate_sum(); // DW1 ����sum����
		ReCalculation_DW2(); // DW2�� �ϰ�����
	}
}

// EDI �Ҵ��� �ϰ�����
function ApplyRate_BY_EDI_DW1() {
	var dept_edi_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var alloc_by_edi = strToNum(document.frm.alloc_by_edi.value);  // �����Ҵ���
	var dept_add_alloc_box = 0, old_dept_add_alloc_box = 0;
	var temp_dc_id, dc_plan_box, dc_stock_expt, dc_next_stock;
	var dc_id = new Array();
	var dc_alloc_qty = new Array();
	var dc_cnt = GridObj2.GetRowCount( );
	var dept_plan_box = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_zone;

	// DW2 id ���� �� �� �ʱ�ȭ
	for(i=0;i<dc_cnt;i++ ) {
		dc_id[i] = GridObj2.GetCellValue("DC_ID", i);  		
		dc_alloc_qty[i] = 0;  		
	}

	if(document.frm.btnAllocConf.disabled) { // NFOS���� OK

		for(i=0;i<GridObj.GetRowCount( );i++ ) {

			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŰ�ȹ
			old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			dept_edi_box = strToNum(GridObj.GetCellValue("EDI_00", i)); // ���� EDI�ڽ�
			old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old �߰������Ҵ緮

			if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
			  	alloc_zone = "1";  
			}
			else {
				alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
			}
			
			// �ش� ZONE�� �ƴϸ� ���
			if(alloc_zone != "1"	) {
				dept_add_alloc_box = 0;
			}	
			else {
				// �߰��Ҵ緮�� ���Ѵ�.
				dept_add_alloc_box = Math.round(dept_edi_box * alloc_by_edi / 100);
			}

			// �ߺ� üũ�� ������ �߰������Ҵ緮�� ���� �߰������Ҵ緮�� �߰��Ѵ�.
			if(document.frm.chk_add_alloc.checked == true) {
				dept_add_alloc_box = dept_add_alloc_box + old_dept_add_alloc_box;
			}
			
			dept_alloc_box = old_dept_alloc_box - old_dept_add_alloc_box + dept_add_alloc_box;
			
			if(dept_plan_box <= 0) {
				dept_alloc_rate = 0;
			}
			else {
				dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;	
			}
			
			old_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
			new_cum_sell_box = old_cum_sell_box - old_dept_alloc_box + dept_alloc_box;
			
			if(dept_plan_box <= 0) {
				new_dept_goal_rate = 0;
			}
			else {
				new_dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
			}

			GridObj.SetCellValue("ADD_ALLOC_BOX", i, dept_add_alloc_box);
			GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", i, dept_add_alloc_box);
			GridObj.SetCellValue("ALLOC_BOX", i, dept_alloc_box);
			GridObj.SetCellValue("ALLOC_RATE", i, dept_alloc_rate);
			// ������ ����
			GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box);
			// �޼��� ����
			GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);	
		}
	}
	else { // NFOS������
		
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŰ�ȹ
			old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			dept_edi_box = strToNum(GridObj.GetCellValue("EDI_00", i)); // ���� EDI�ڽ�

			if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '����'�� ���� ��� ó��
			  	alloc_zone = "1";  
			}
			else {
				alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
			}
			
			// �ش� ZONE�� �ƴϸ� ���
			if(alloc_zone != "1"	) {
				dept_alloc_box = 0;
			}	
			else {
				// �����Ҵ緮�� ���Ѵ�.
				dept_alloc_box = Math.round(dept_edi_box * alloc_by_edi / 100);
			}

			// �ߺ� üũ�� ������ �����Ҵ緮�� ���� �����Ҵ緮�� �߰��Ѵ�.
			if(document.frm.chk_add_alloc.checked == true) {
				dept_alloc_box = dept_alloc_box + old_dept_alloc_box;
			}
			
			if(dept_plan_box <= 0) {
				dept_alloc_rate = 0;
			}
			else {
				dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box *100*10)/10;	
			}
			
			
			old_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
			new_cum_sell_box = old_cum_sell_box - old_dept_alloc_box + dept_alloc_box;
			
			// ������ ����
			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // ���� �ǸŰ�ȹ
			if(dept_plan_box <= 0) {
				new_dept_goal_rate = 0;
			}
			else {
				new_dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
			}

			GridObj.SetCellValue("ALLOC_BOX", i, dept_alloc_box);
			GridObj.SetCellValue("ALLOC_RATE", i, dept_alloc_rate);
			GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box);
			// �޼��� ����
			GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);	
		}
	}

	re_cal_DW1_rate_sum(); // DW1 ����sum����
	ReCalculation_DW2(); // DW2�� �ϰ�����

}

function	ReCalculation_DW2(){
	var dept_alloc_box = 0;
	var temp_dc_id, dc_plan_box, dc_stock_expt, dc_next_stock;
	var old_dc_alloc_box = 0,dc_cum_sell_box, dc_goal_rate;
	var dw1_dc_id;
	var dw2_expt_stock = new Array();
	var dc_id = new Array();
	var dc_alloc_qty = new Array();
	
	var	dept_code;
	var stor_alloc_box = 0;
	var dc_cnt = GridObj2.GetRowCount( );
	

	// DW2 id ���� �� �� �ʱ�ȭ
	for(i=0;i<dc_cnt;i++ ) {
		dc_id[i] = GridObj2.GetCellValue("DC_ID", i);  		
		dc_alloc_qty[i] = 0;  
		// ����ɷ��� �����س��´�.
		dw2_expt_stock[i] = strToNum(GridObj2.GetCellValue("STOCK_EXPT", i));  		
	}

	// C/D������ ���
	// �ڱ� ��������� �켱������ ������ �� CDC��� �����Ѵ�.
	if(document.frm.chk_sel_20.checked == true) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			
			// ����-�����-�Ǹ�����-CDC LOOPING
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// for loop�� ������ �˻��ϰ� �ش������� ã����
				if(dept_code == document.frm.quota_dept_code[k].value) {
					// �ش� ����� id�� �����ϰ�
					dw1_dc_id = document.frm.quota_dc_id[k].value;
					temp_dc_id = document.frm.quota_cdc_id[k].value;
					
					// �Ǹ����п� ���� ����� �����Ҵ緮�� ����Ѵ�.
					stor_alloc_box = Math.round(dept_alloc_box * strToNum(document.frm.quota_rate[k].value));
					// 1-3.�Ǹ����п� ���� �Ҵ������ ����ϰ� dc_alloc_qty�� �����Ѵ�. 
					for(j=0;j<dc_cnt;j++ ) {
						
						// 1.�켱 �ڽ��� ��� �����Ѵ�.
						if(dw1_dc_id == dc_id[j]) {
							if(dw2_expt_stock[j] > 0) { // DW2�� ����ɷ��� 0���� Ŭ ��
								if(dw2_expt_stock[j] > stor_alloc_box) { // ����ɷ� > �Ҵ緮
									dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;
									// ����ɷ����� �Ҵ緮��ŭ ���ش�.
									dw2_expt_stock[j] = dw2_expt_stock[j] - stor_alloc_box;
									// �Ҵ緮�� ��� �Ҵ�Ǿ��� ������ 0
									stor_alloc_box = 0;
								}
								else { // ����ɷ� < �Ҵ緮
									dc_alloc_qty[j] = dc_alloc_qty[j] + dw2_expt_stock[j];
									// �ܿ��Ҵ緮 = �Ҵ緮 - ����ɷ�
									stor_alloc_box = stor_alloc_box - dw2_expt_stock[j];
									// ����ɷ��� ���� 0
									dw2_expt_stock[j] = 0;
								}
							}
							break;
						}   		
								
						// 2.�״��� CDC�� ��� �����Ѵ�. �� �Ҵ緮 > 0 �� ��� ����
						if(stor_alloc_box > 0) {
							for(j=0;j<dc_cnt;j++ ) {
								if(temp_dc_id == dc_id[j]) {
									dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;  		
								}   		
							}
						}
					}
					if(k < document.frm.quota_dept_code.length && dept_code != document.frm.quota_dept_code[k+1].value) break; // ������ row�� �ٸ� �����̸� ������.
				}
			}
		}
	} 
	// C/D������ �ƴѰ��
	else {

		for(i=0;i<GridObj.GetRowCount();i++ ) {
			dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			// DW1�� �Ҵ緮�� �����´�.
			dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			
			// �����(DW2)�� �Ҵ緮�� ����ȭ �Ѵ�.
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// for loop�� ������ �˻��ϰ� �ش������� ã����
				if(dept_code == document.frm.quota_dept_code[k].value) {
					// �ش� ����� id�� �����ϰ�
					temp_dc_id = document.frm.quota_dc_id[k].value;
					// �Ǹ����п� ���� ����� �����Ҵ緮�� ����Ѵ�.
					stor_alloc_box = Math.round(dept_alloc_box * strToNum(document.frm.quota_rate[k].value));
					// 1-3.�Ǹ����п� ���� �Ҵ������ ����ϰ� dc_alloc_qty�� �����Ѵ�. 
					for(j=0;j<dc_cnt;j++ ) {
						if(temp_dc_id == dc_id[j]) {
							dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;  
							break;		
						}   		
					}
					if(k < document.frm.quota_dept_code.length && dept_code != document.frm.quota_dept_code[k+1].value) break; // ������ row�� �ٸ� �����̸� ������.
				}
			}
		}
	}

	// DW2�� �ϰ�����!
	for(i=0;i<dc_cnt;i++ ) {
		old_dc_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", i));
		GridObj2.SetCellValue("ALLOC_BOX", i, dc_alloc_qty[i]);  		
		GridObj2.SetCellHiddenValue("ALLOC_BOX", i, dc_alloc_qty[i]);  		
		dc_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", i));
		// New �������ڽ� = ���� �������ڽ� - old�����Ҵ緮 + new�����Ҵ緮
		dc_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", i)) - old_dc_alloc_box + dc_alloc_qty[i];
		GridObj2.SetCellValue("CUM_SELL_BOX", i, dc_cum_sell_box);  		
		if(dc_plan_box > 0) {
			GridObj2.SetCellValue("ALLOC_RATE", i, Math.round(dc_alloc_qty[i] / dc_plan_box*100*10)/10 );
			GridObj2.SetCellValue("GOAL_RATE", i, Math.round(dc_cum_sell_box / dc_plan_box*100*10)/10 );
		}
		else {
			GridObj2.SetCellValue("ALLOC_RATE", i, 0 );
			GridObj2.SetCellValue("GOAL_RATE", i, 0 );
		}
			
		// ������� ����
		dc_stock_expt = strToNum(GridObj2.GetCellValue("STOCK_EXPT", i));
		dc_next_stock = dc_stock_expt - dc_alloc_qty[i];
		GridObj2.SetCellValue("NEXT_STOCK", i, dc_next_stock);  
	}

	re_cal_DW2_rate_sum(); // DW2 ����sum����
}


// DW2 �Ҵ��� �ϰ����� --> NFOS�������� �����ϵ��� ��.
function ApplyAllocRate_DW2() {

//	gridArea.style.display = "none";
//	waitArea.style.display = "block";

alert("����������Դϴ�!");
return;

	var dw2_alloc_rate = strToNum(document.frm.dc_alloc_rate.value);
	for(j=0;j<GridObj2.GetRowCount();j++) {
		
		// DC_ID�� ���Ѵ�.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", j);
		// DC�ǸŰ�ȹ�� ���Ѵ�
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", j));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_new_alloc_box =0;
		var dw1_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;


		// �ǸŰ�ȹ�� 0���� �۰ų� �ش� ZONE�� �ƴϸ� �Ҵ緮 0
		if(dw2_plan_box <= 0) {
			dw2_alloc_box = 0;
		}
		else {
			// �Ҵ����� ���� ������� �Ҵ緮�� �����Ѵ�.
			dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100);
		}
		// OLD DC�����Ҵ緮�� ���Ѵ�.  HIDDEN�� �������ִ�. DB�� ����� ���̴�
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", j));
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;
		
		// DW1�� LOOP�ϸ鼭 �ش� DC�� �������� ���Ѵ�.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D������ ���
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D������ �ƴѰ��
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}

				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// ���������� �ǸŰ�ȹ�� �����´�.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// �������� �����Ҵ緮�� �����´�.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// ��������-����� �Ǹ������� �̿��Ͽ� DW1�� �����Ҵ緮�� �����Ѵ�.
					dw1_new_alloc_box = dw1_alloc_box + Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					// �������� �����Ҵ緮��  �߰������Ҵ緮�� ���ؼ� �����Ѵ�.
					GridObj.SetCellValue("ALLOC_BOX",i,dw1_new_alloc_box);
					dw1_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i)) + dw1_new_alloc_box; 
					if(dw1_plan_box > 0) {
						dw1_alloc_rate = Math.round(dw1_new_alloc_box / dw1_plan_box*100*10)/10;
						dw1_goal_rate = Math.round(dw1_cum_sell_box/ dw1_plan_box*100*10)/10;;
					}	
					else {
						dw1_alloc_rate = 0;
						dw1_goal_rate = 0;
					}	
					// �������� �����Ҵ����� �����Ѵ�.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC�����Ҵ緮�� �����ϱ� ���� �������� �����Ҵ緮�� �����Ѵ�.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_alloc_box - dw1_alloc_box;
				}
			}
		}
		// �������� DC�����Ҵ緮�� DW2�� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_BOX",j,temp_dc_alloc_box);
		// �������� DC�����Ҵ緮�� DW2�� HIDDEN���� �����Ѵ�.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",j,temp_dc_alloc_box);
		// DC�ǸŰ�ȹ�� �������� DC�����Ҵ緮�� �̿��Ͽ� DC�����Ҵ����� ���Ѵ�.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", j)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC�����Ҵ����� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_RATE", j, dw2_alloc_rate);
		GridObj2.SetCellValue("CUM_SELL_BOX", j, dw2_cum_sell_box );
		GridObj2.SetCellValue("GOAL_RATE", j, dw2_goal_rate );
	}
	re_cal_DW1_rate_sum();
	re_cal_DW2_rate_sum();
	
//	gridArea.style.display = "block";
//	waitArea.style.display = "none";
	
}


/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid �ʱ�ȭ
  ������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;

	setProperty(GridObj); 	// �⺻ property ����
	setDefault();  			// �߰� property ����
	setHeader();   			// Header ����
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2();  			// �߰� property ����
	setHeader2();   			// Header ����
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;

	setProperty(GridObj3); 	// �⺻ property ����
	setDefault3();  			// �߰� property ����
//	setHeader3();   			// Header ����
			
}

/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault(){
	
	GridObj.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bHDMoving = false;                  		//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	
	GridObj.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder ����
	GridObj.nHDLineSize   = 9;   //12
	
	// Grid �� ����
    GridObj.nRowHeight    = 9;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
	
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
   
//    /* Context Menu ����� MENU �߰� */
//    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");   
 
}

/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj2.bHDMoving = true;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj2.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj2.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '���� ���';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ����
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid �� ����
    GridObj2.nRowHeight    = 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
 
}

function setDefault3(){
	
	GridObj3.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj3.bHDMoving = true;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj3.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj3.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj3.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj3.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj3.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj3.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj3.bStatusbarVisible = false;				// status bar visible
	// Header Font Setting
	GridObj3.strHDFontName = '���� ���';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj3.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ����
	GridObj3.nHDLineSize   = 12;   //12
	
	// Grid �� ����
    GridObj3.nRowHeight    = 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj3.nHDLines = 1; 
 	GridObj3.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
 
}

var preSortKey = "ROWNUM";
// dw1�� sortting���
function changeSortKey(obj){
	var chk_sort_descend;
	if(document.frm.chk_sort_descend.checked) chk_sort_descend = 'descending';
	else chk_sort_descend = 'asceding';

	GridObj.ClearGroupMerge();  // ������ �����Ѵ�.
	GridObj.SetColCellSort(preSortKey,'none');
	GridObj.SetColCellSort(obj.value,chk_sort_descend);

	if(obj.value == "ROWNUM") { // �ʱ�ȭ
		doGrouping();
	}
	preSortKey = obj.value; 
}

function changeSortDesc(){
	changeSortKey(document.frm.in_sort_key);
}

function doGrouping(){

	GridObj.bHDMoving = false;	// move header diasable!
	set_GroupMerge_dw1();		// ���ս���!
}


/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{        


	GridObj.AddHeader("DEPT_CODE"			,"��������\n�ڵ�"		,"t_text" 		,100	,40  ,false);
	GridObj.AddHeader("DEPT_NAME"			,"����\n����"		    ,"t_text" 		,100	,70  ,false);   

 	GridObj.AddHeader("PRE_INFO"			,"����\n��ȭ��"      	,"t_number" 	,100.1	,45  ,false);   
 	GridObj.AddHeader("PRE_REQT_BOX"		,"����\n�ֹ�"     		,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("PRE_ALLOC_BOX"		,"����\n����"   		,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("PRE_CLOSE_RATE"		,"����\n������"      	,"t_number" 	,100.1	,50  ,false);   
 	GridObj.AddHeader("PRE_USE_ALLOC_RATE"	,"����\n��ȭ��"     	,"t_number" 	,100.1	,50  ,false);   

 	GridObj.AddHeader("PRE_SELL_BOX"		,"����\n����"     		,"t_number" 	,100	,45  ,false);   

 	GridObj.AddHeader("PLAN_BOX"			,"�Ǹ�\n��ȹ"      		,"t_number" 	,100	,45  ,false);   

 	GridObj.AddHeader("CUM_SELL_BOX"		,"����\n����"      		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("GOAL_RATE"			,"�޼�\n��"      		,"t_number" 	,100.1	,40  ,false);   

  	GridObj.AddHeader("ALLOC_RATE"			,"����\n�Ҵ���"      	,"t_number" 	,100.1	,45  ,false);  
 	GridObj.AddHeader("ALLOC_BOX"			,"����\n�Ҵ緮"     	,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("REQT_BOX"			,"�ֹ�\n����"     		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("REMN_BOX"			,"����\n�ܷ�"     		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("USE_ALLOC_RATE"		,"����\n��ȭ��"     	,"t_number" 	,100.1	,45  ,false);   

	GridObj.AddHeader("EDI_00"			,"EDI"				,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_TOT"			,"EDI"				,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_22"			,"�̸�Ʈ"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_21"			,"HOME\n+"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_23"			,"�Ե�\n��Ʈ"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_ETC"			,"��Ÿ"				,"t_number" 	,100	,45  ,false);   
	
	GridObj.AddHeader("REQT_ALLOC_BOX"		,"�߰�\n��û"      		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("ADD_ALLOC_BOX"		,"�߰�\n�Ҵ�"     		,"t_number" 	,100	,50  ,true);   
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,10  ,false);
 	GridObj.AddHeader("REQT_ALLOC_REASON"	,"�߰���û����"      	,"t_text" 		,300	,200  ,false);   
// 	GridObj.AddHeader("CD_SRC_LOC"	,"C/D����"      	,"t_text" 		,100	,200  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_02"	,"����"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_03"	,"�λ�"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_04"	,"����"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_05"	,"����"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("CMP_ADD_ALLOC_BOX"	,"�߰��Ҵ��"      	,"t_number" 		,10	,0  ,false);   
 
	GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
	
// rotaiton �÷� ���� ���� 	
	GridObj.SetColHDBgColor('PRE_INFO','253|228|229');
	GridObj.SetColHDBgColor('EDI_00','253|228|229');
	
	GridObj.SetCRUDMode("CRUD"); 

	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("DEPT_CODE", true); 
	GridObj.SetColHide("PRE_REQT_BOX", true);
	GridObj.SetColHide("PRE_ALLOC_BOX", true);
	GridObj.SetColHide("PRE_CLOSE_RATE", true);
	GridObj.SetColHide("PRE_USE_ALLOC_RATE", true);

	// ���� ������ ǥ�ð��� - 2011.05.19 ��ȿ������, �̽¿�븮 ����
	GridObj.SetColHide("PRE_SELL_BOX", true); 
	
	GridObj.SetColHide("EDI_TOT", true);
	GridObj.SetColHide("EDI_22", true);
	GridObj.SetColHide("EDI_21", true);
	GridObj.SetColHide("EDI_23", true); 
	GridObj.SetColHide("EDI_ETC", true);

//	GridObj.SetColHide("CD_SRC_LOC", true);


//	GridObj.SetColFix('DEPT_NAME');

	GridObj.SetNumberFormat("PRE_INFO"		 		, "###,###,###");
	GridObj.SetNumberFormat("PRE_REQT_BOX"	     	, "###,###,###");
	GridObj.SetNumberFormat("PRE_SELL_BOX"	     	, "###,###,###");
	GridObj.SetNumberFormat("PRE_ALLOC_BOX"	     	, "###,###,###");
	GridObj.SetNumberFormat("PRE_CLOSE_RATE"		, "###,###,##0.0");
	GridObj.SetNumberFormat("PRE_USE_ALLOC_RATE"	, "###,###,##0.0");
	
	GridObj.SetNumberFormat("PLAN_BOX"		     	, "###,###,###");
	GridObj.SetNumberFormat("CUM_SELL_BOX"		    , "###,###,###");
	GridObj.SetNumberFormat("GOAL_RATE"		    	, "###,###,##0.0");
	GridObj.SetNumberFormat("ALLOC_RATE"		    , "###,###,##0.0");
	GridObj.SetNumberFormat("ALLOC_BOX"		    	, "###,###,###");
	GridObj.SetNumberFormat("REQT_BOX"	     		, "###,###,###");
	GridObj.SetNumberFormat("REMN_BOX"	     		, "###,###,###");
	GridObj.SetNumberFormat("USE_ALLOC_RATE"     	, "###,###,##0.0");
	
	GridObj.SetNumberFormat("EDI_00"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_TOT"				, "###,###,###");
	GridObj.SetNumberFormat("EDI_22"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_21"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_23"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_ETC"				, "###,###,###");
	
	
	GridObj.SetNumberFormat("REQT_ALLOC_BOX"		, "###,###,###");
	GridObj.SetNumberFormat("ADD_ALLOC_BOX"			, "###,###,###");
	
	GridObj.SetColCellFontName('DEPT_NAME','���� ���');
	GridObj.SetColCellFontBold('DEPT_NAME','true');
	
	GridObj.SetColCellBgColor('PLAN_BOX','232|232|255');//�ǸŰ�ȹ
	GridObj.SetColCellBgColor('CUM_SELL_BOX','232|232|255');//�ǸŰ�ȹ
	GridObj.SetColCellBgColor('GOAL_RATE','232|232|255');//�ǸŰ�ȹ

}


/* rotaion �÷� ������ ���� */
var pre_info_idx = 0;
var edi_idx = 0;

function HeaderClick_DW1(strColumnKey){

	// wisegrid�� �����Ͱ� ������ ����ϸ� �ȵȴ�.
	if(GridObj.GetRowCount() <= 0) return;
 
	/* �������� rotation */
	if(strColumnKey == "PRE_INFO"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(pre_info_idx == 0) {
				if(i==0) GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_REQT_BOX"));
				GridObj.SetCellValue('PRE_INFO',i,GridObj.GetCellValue("PRE_REQT_BOX", i));
			}
			else if(pre_info_idx == 1) { 
				if(i==0) GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_ALLOC_BOX"));
				GridObj.SetCellValue('PRE_INFO',i,GridObj.GetCellValue("PRE_ALLOC_BOX", i));
			}
			else if(pre_info_idx == 2) { 
				if(i==0) GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_CLOSE_RATE"));
				GridObj.SetCellValue('PRE_INFO',i,GridObj.GetCellValue("PRE_CLOSE_RATE", i));
				
				
			}
			else { 
				if(i==0) GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_USE_ALLOC_RATE"));
				GridObj.SetCellValue('PRE_INFO',i,GridObj.GetCellValue("PRE_USE_ALLOC_RATE", i));
			}				
		}
		
		if(pre_info_idx == 2 ) { // ���ϸ�����
			
			GridObj.SetNumberFormat("PRE_INFO"		, "###,###,##0.0");
			
			var tot_pre_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_REQT_BOX',0,false));
			var tot_pre_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_SELL_BOX',0,false))
			
			if(tot_pre_reqt_box != 0) {
				GridObj.SetSummaryBarValue('SUMMARY1','PRE_INFO',0,Math.round(tot_pre_sell_box/tot_pre_reqt_box*100*10)/10);
			}
		}
		else if (pre_info_idx == 3) { // ���ϼ�ȭ��

			GridObj.SetNumberFormat("PRE_INFO"		, "###,###,##0.0");

			var tot_pre_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_ALLOC_BOX',0,false));
			var tot_pre_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_REQT_BOX',0,false))
			if(tot_pre_alloc_box != 0) {
				GridObj.SetSummaryBarValue('SUMMARY1','PRE_INFO',0,Math.round(tot_pre_sell_box/tot_pre_alloc_box*100*10)/10);
			}
		}
		else {
			GridObj.SetNumberFormat("PRE_INFO"		, "###,###,###");
			GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PRE_INFO');
		}
	
		if(pre_info_idx == 3) pre_info_idx =0; else pre_info_idx ++;
	}

	/* EDI rotation */
	if(strColumnKey == "EDI_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_22"));
				GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_22", i));
			}
			else if(edi_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_21"));
				GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_21", i));
			}
			else if(edi_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_23"));
				GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_23", i));
			}
			else if(edi_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00","BIG3");
				GridObj.SetCellValue('EDI_00',i,
					strToNum(GridObj.GetCellValue("EDI_22", i)) + strToNum(GridObj.GetCellValue("EDI_21", i))
					+ strToNum(GridObj.GetCellValue("EDI_23", i)) );
			}
			else if(edi_idx == 4) { 
				if(i==0) GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_ETC"));
				GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_ETC", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_TOT"));
				GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_TOT", i));
			}				
		}
		if(edi_idx == 5) edi_idx =0; else edi_idx ++;
	}

}

function setHeader_by_combo(obj) 
{        
	/* EDI rotation */
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		if( obj.value == "22") {
			if(i==0) {
				GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_22"));
				edi_idx = 1;
			}
			GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_22", i));
		}
		else if( obj.value == "21") {
			if(i==0) {
				GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_21"));
				edi_idx = 2;
			}
			GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_21", i));
		}
		else if( obj.value == "23") { 
			if(i==0) {
				GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_23"));
				edi_idx = 3;
			}
			GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_23", i));
		}
		else if( obj.value == "99") { 
			if(i==0) {
				GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_ETC"));
				edi_idx = 4;
			}
			GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_ETC", i));
		}
		else { 
			if(i==0) {
				GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_TOT"));
				edi_idx = 0;
			}
			GridObj.SetCellValue('EDI_00',i,GridObj.GetCellValue("EDI_TOT", i));
		}				
	}
}

function setHeader2() 
{        
	GridObj2.AddHeader("DC_ID"				,"�����"		,"t_text" 		,100	,40  ,false);   
	GridObj2.AddHeader("DC_NAME"			,"�����"		,"t_text" 		,100	,40  ,false);   
 	
 	GridObj2.AddHeader("BASE_STOCK"			,"����\n���"      	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("CHGO"				,"���\n����"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("IPGO"				,"�԰�\n����"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("STOCK_EXPT"			,"���\n���ɷ�"   	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("PLAN_BOX"			,"�Ǹ�\n��ȹ"		,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("CUM_SELL_BOX"		,"����\n����"    ,"t_number" 		,100	,45  ,true);   
 	GridObj2.AddHeader("GOAL_RATE"			,"�޼�\n��"    ,"t_number" 		,100.1	,35  ,true);   
 	
 	GridObj2.AddHeader("ALLOC_RATE"			,"����\n�Ҵ���"    ,"t_number" 		,100.1	,45  ,true);   
 	GridObj2.AddHeader("ALLOC_BOX"			,"����\n�Ҵ緮"    ,"t_number" 		,100	,50  ,true);   
 	GridObj2.AddHeader("NEXT_STOCK"			,"����\n���"		,"t_number" 	,100	,50  ,false);   
 
	GridObj2.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
	GridObj2.SetColHide("DC_ID", true); 
	
	GridObj2.SetNumberFormat("BASE_STOCK"	, "###,###,###");
	GridObj2.SetNumberFormat("CHGO"	     	, "###,###,###");
	GridObj2.SetNumberFormat("IPGO"	     	, "###,###,###");
	GridObj2.SetNumberFormat("STOCK_EXPT"	, "###,###,###");
	GridObj2.SetNumberFormat("PLAN_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("CUM_SELL_BOX"	, "###,###,###");
	GridObj2.SetNumberFormat("GOAL_RATE"	, "###,###,##0.0");
	GridObj2.SetNumberFormat("ALLOC_RATE"	, "###,###,##0.0");
	GridObj2.SetNumberFormat("ALLOC_BOX"	, "###,###,###");
	GridObj2.SetNumberFormat("NEXT_STOCK"	, "###,###,###");
	
	GridObj2.SetColCellFontName('DC_NAME','���� ���');
	GridObj2.SetColCellFontBold('DC_NAME','true');
	
	GridObj2.SetColCellBgColor('PLAN_BOX','232|232|255');//�ǸŰ�ȹ
	GridObj2.SetColCellBgColor('CUM_SELL_BOX','232|232|255');//�ǸŰ�ȹ
	GridObj2.SetColCellBgColor('GOAL_RATE','232|232|255');//�ǸŰ�ȹ
}

function setHeader3() 
{        
	
	GridObj3.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA"		,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA_BOX"	,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA_PAL"	,"���(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("BASE_STOCK"		,"�������"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj3.AddHeader("CHGO_QTY"		,"���"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj3.AddHeader("PROD01_1"		,"����"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("PROD01_3"		,"�ְ�"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("CONF_STOCK"		,"�����"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("TRANS_QTY"		,"���Ȯ��"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj3.AddHeader("NEXT_CHGO_QTY"	,"�������"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj3.AddHeader("NEXT_TRANS_QTY"	,"���ϰ�ȹ"       	,"t_number" 	,500.3	,50  ,false); //0   
	
	var trans_start   = document.frm.cnfm_date.value;
	var today 		= document.frm.today.value;
	var item_id 	  = document.frm.item_id.value;
	var itype		  = document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", today+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
		callback:function(result){

			for(var i=0 ; i < 20 ; i++){
				if(i < result.length) {
					GridObj3.AddHeader("PROD"+result[i][1]	,result[i][0]       	,"t_number" 	,500.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 9) {
						GridObj3.AddHeader("PROD0"+j	,"-"     	,"t_number" 	,500.3	,0  ,false);
					}
					else {
						GridObj3.AddHeader("PROD"+j		,"-"       	,"t_number" 	,500.3	,0  ,false);
					}
				}
			}
		 	
		 	GridObj3.AddHeader("PROD_AVAILABLE"	,"���갡��"       	,"t_text" 	,500	,30  ,false); //0   
		
			GridObj3.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
			GridObj3.SetColHide("PROD_AVAILABLE", true);
			
			GridObj3.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // ���� ����
			GridObj3.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // ���� ����
			GridObj3.SetNumberFormat("PROD01_1", 		 "###,###,###"); // ���� ����
			GridObj3.SetNumberFormat("PROD01_3", 		 "###,###,###"); // ���� ����
			GridObj3.SetNumberFormat("CONF_STOCK", 		 "###,###,###");
			GridObj3.SetNumberFormat("TRANS_QTY", 		 "###,###,###");
			GridObj3.SetNumberFormat("NEXT_CHGO_QTY", 	 "###,###,###");
			GridObj3.SetNumberFormat("NEXT_TRANS_QTY", "###,###,###.#");
			GridObj3.SetNumberFormat("USE_CAPA", 	 	 "###,###,###");
			GridObj3.SetNumberFormat("USE_CAPA_BOX", 	 "###,###,###");
			GridObj3.SetNumberFormat("USE_CAPA_PAL", 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD01", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD02", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD03", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD04", 			 "###,###,###");
			GridObj3.SetNumberFormat("PROD05", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD06", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD07", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD08", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD09", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD10", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD11", 			 "###,###,###");
			GridObj3.SetNumberFormat("PROD12", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD13", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD14", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD15", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD16", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD17", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD18", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD19", 		 	 "###,###,###");
			GridObj3.SetNumberFormat("PROD20", 		 	 "###,###,###");
			
			GridObj3.SetColCellAlign('DC_NAME','left');
			GridObj3.SetColCellFontName('DC_NAME','���� ���');
			GridObj3.SetColCellFontBold('DC_NAME','true');
			
			GridObj3.SetColHDBgColor('TRANS_QTY','253|228|229');

			if(document.frm.itype.value == "HAWA") {
				GridObj3.SetColHide("PROD01_1", true);
				GridObj3.SetColHide("PROD01_3", true);
			}
			
			GridObj3.SetColHide("USE_CAPA_BOX", true);
			GridObj3.SetColHide("USE_CAPA_PAL", true);
			// CAPA�߰��� �Ѱ��÷� ������.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery3();			
		}
	});   
}


/*
10	�ǸŰ�ȹ
11	�ǸŸ�ǥ
13	��������
14	����3�������
17	����3��������ġ
18	���⵿��
21	��������ǰ��
23	�����
 */
function set_QuotaTypeToHeader(){
	var quotaType = document.frm.insel_allocQoutaType.value;
	var headerName;
	
	if(quotaType == "10") {
		headerName = "�Ǹ�\n��ȹ";
		GridObj.SetColHide("CUM_SELL_BOX", true); 
		GridObj.SetColHide("GOAL_RATE", true); 
		GridObj2.SetColHide("CUM_SELL_BOX", true); 
		GridObj2.SetColHide("GOAL_RATE", true); 
	}
	else {
		if(quotaType == "11") headerName = "�Ǹ�\n��ǥ";
		if(quotaType == "13") headerName = "����\n����";
		if(quotaType == "14") headerName = "��3\n���";
		if(quotaType == "17") headerName = "��3\n����";
		if(quotaType == "18") headerName = "����\n����";
		if(quotaType == "21") headerName = "����\n����";
		if(quotaType == "23") headerName = "���\n��";
		GridObj.SetColHide("CUM_SELL_BOX", false); 
		GridObj.SetColHide("GOAL_RATE", false); 
		GridObj2.SetColHide("CUM_SELL_BOX", false); 
		GridObj2.SetColHide("GOAL_RATE", false); 
	}
	
	GridObj.SetColHDText("PLAN_BOX",headerName);
	GridObj2.SetColHDText("PLAN_BOX",headerName);
}


/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "search");
	
	//-- ������ ������ �Ķ���� ���� --//
	var item_id = document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;
	var chk_sel_01, chk_sel_02, chk_sel_03;
	var chk_sel_02_EDI;
	
	if(document.frm.chk_sel_01.checked == true) chk_sel_01 = "Y"; 
	if(document.frm.chk_sel_02.checked == true) {
		chk_sel_02 = "Y";
		chk_sel_02_EDI = document.frm.chk_sel_02_EDI.value;
	}
	if(document.frm.chk_sel_03.checked == true) chk_sel_03 = "Y";
	var insel_allocQoutaType = document.frm.insel_allocQoutaType.value;
	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("cnfm_date", cnfm_date);
	GridObj.SetParam("chk_sel_01", chk_sel_01);
	GridObj.SetParam("chk_sel_02", chk_sel_02);
	GridObj.SetParam("chk_sel_02_EDI", chk_sel_02_EDI);
	GridObj.SetParam("chk_sel_03", chk_sel_03);
	GridObj.SetParam("insel_allocQoutaType", insel_allocQoutaType);
	
	// query_id
	GridObj.SetParam("query_id", "ip_02060_SalesAllocationNiceLikePlan_DW1");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");
}

function doQuery_DW1() {
	GridObj.ClearGrid();
	setHeader();

	doQuery();
}

function doQuery2() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "search_DW2");
	
	//-- ������ ������ �Ķ���� ���� --//
	var item_id = document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;
	var chk_sel_10, chk_sel_11;
	if(document.frm.chk_sel_10.checked == true) chk_sel_10 = "Y"; 
	if(document.frm.chk_sel_11.checked == true) chk_sel_11 = "Y"; 
	var insel_allocQoutaType = document.frm.insel_allocQoutaType.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("cnfm_date", cnfm_date);
	GridObj2.SetParam("chk_sel_10", chk_sel_10);
	GridObj2.SetParam("chk_sel_11", chk_sel_11);
	GridObj2.SetParam("insel_allocQoutaType", insel_allocQoutaType);
	
	// query_id
	GridObj2.SetParam("query_id", "ip_02060_SalesAllocationNiceLikePlan_DW2");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url);
}

function doQuery3() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + 'ip_02060_SalesAllocationNiceLikePlan';
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "search_DW3");
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�

	var item_id = document.frm.item_id.value;
	var today = document.frm.today.value;
	var version =  document.frm.today.value.replace("-","").replace("-","");
	var seq = "";
	var itype = document.frm.itype.value;
	//rp_01160 ������ ��������� ȭ�鿡�� �޾ƿ��� ���� �����ʹ� 'YYYYMMDD' �����̴�. 'YYYYMMDD.HH.MM' �� �޾ƿ´�.
	commonUtil.getSelQeury( "version", document.frm.today.value, "rp_01160_replenishmentNiceLikePlan_DW2_Trans_Version",{
		callback:function(result){

		version = result;
		 			
		}});
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("trans_start", today);
	GridObj3.SetParam("version",version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("itype", itype);
	GridObj3.SetParam("check_day", "TODAY"); // ���ϰ�ȹ
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url);
}


/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave_DW1(cnfm_date, item_id) {

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	// VER 2.0 ��� �����͸� �����ϱ� ���� CRUD���� ������ U�� �����
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		GridObj.SetCellValue("CRUD",i,"U");
	}
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");
	
	//-- ������ ������ �Ķ���� ���� --//
	GridObj.SetParam("cnfm_date",delDateDelimiter(cnfm_date));
	GridObj.SetParam("item_id",item_id);
	if(document.frm.btnAllocConf.disabled)  // NFOS���� OK
		GridObj.SetParam("nfos_ok", "Y");
	else
		GridObj.SetParam("nfos_ok", "N");

	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");
}


// ��������-������� �Ǹ������� array�� �����Ѵ�.
function getDeptStorQuota(){
	
	var cnfm_date = document.frm.cnfm_date.value;
	var item_id = document.frm.item_id.value;
	
	commonUtil.getSelQeury("cnfm_date!%!item_id",cnfm_date+"!%!"+item_id,"ip_02060_getDeptStorQuota", { 
	callback:function(arrList){
		var in_div = "";
		
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<input type=\"hidden\" name=\"quota_dept_code\" value="+arrList[i][0]+">";
			in_div +=	"<input type=\"hidden\" name=\"quota_dc_id\" value="+arrList[i][1]+">";
			in_div +=	"<input type=\"hidden\" name=\"quota_rate\" value="+arrList[i][2]+">";
			in_div +=	"<input type=\"hidden\" name=\"quota_dc_rate\" value="+arrList[i][3]+">";
			in_div +=	"<input type=\"hidden\" name=\"quota_cdc_id\" value="+arrList[i][4]+">";
		}	

		divDeptStorQuota.innerHTML = in_div;
	}
	});
}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*��������������������������������������������������������������������������������
  ��	WiseGrid ��� �� Grid ���� �� ���� Fnc
  ��������������������������������������������������������������������������������*/
function GridEndQuery() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj.GetStatus() != "true") {
//		var error_msg_extra = GridObj.GetMessage();// ?
//		alert("(GridObj)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

	setGrid(GridObj); //WiseGrid ����
			
	//
	var end_mode = GridObj.GetParam("mode");

	if(end_mode == "search") { //��ȸ
		if(GridObj.GetStatus() == "true") { // 

			if(document.frm.chk_sel_02.checked == true) {
				setHeader_by_combo(document.frm.chk_sel_02_EDI);
			}
			
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
		
	}else if(end_mode == "doSave") {
		if(GridObj.GetStatus() == "true") {// 
			GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		save_dc_alloc_item();
	}
	
	doChange2();
	// �����Ҵ���ؿ� �´� GRID��� �̸�����
	set_QuotaTypeToHeader();
	
}

function GridEndQuery2() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	setGrid2(); //WiseGrid ����
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //��ȸ
		if(GridObj2.GetStatus() == "true") { // 
		}
		
	}
}

function GridEndQuery3() {
		
	setGrid3(); //WiseGrid ����
			
	var end_mode = GridObj3.GetParam("mode");

	if(end_mode == "search_DW2") { //��ȸ
		if(GridObj3.GetStatus() == "true") { // 
			
		}
	}

}

/*������������������������������������������������������������������������
  ��WiseGrid ����
  ������������������������������������������������������������������������*/
function setGrid(){
	
	pre_info_idx = 0;
	edi_idx = 0;

	GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_USE_ALLOC_RATE"));
	GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_TOT"));
			
	// �÷� ����
	GridObj.SetColCellBgColor('ALLOC_RATE','250|250|200');
	GridObj.SetColCellBgColor('ALLOC_BOX','250|250|200');
	GridObj.SetColCellBgColor('ADD_ALLOC_BOX','250|250|200');
    
	doGrouping();
}

function set_GroupMerge_dw1() {

	// �÷� �׷�
//	GridObj.SetColCellSort('DEPT_CODE', 'asceding');
//	GridObj.SetGroupMerge(	'DEPT_CODE,DEPT_NAME'); 
	GridObj.SetColCellSort('ALLOC_ZONE_04','asceding');
	
	GridObj.SetGroupMerge(	'ALLOC_ZONE_04'); 

	
	// �Ұ�(����/����)
	GridObj.AddSummaryBar('SUMMARY2', '�Ұ�', 'ALLOC_ZONE_04', 'custom', 'DEPT_NAME,PRE_INFO,PRE_REQT_BOX,PRE_ALLOC_BOX,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,REQT_BOX,REMN_BOX,USE_ALLOC_RATE,EDI_00,REQT_ALLOC_BOX,ADD_ALLOC_BOX,REQT_ALLOC_REASON,ALLOC_ZONE_02,ALLOC_ZONE_03,ALLOC_ZONE_04,ALLOC_ZONE_05'); 

	GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'custom', 'PRE_INFO,PRE_REQT_BOX,PRE_ALLOC_BOX,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,REQT_BOX,REMN_BOX,USE_ALLOC_RATE,EDI_00,REQT_ALLOC_BOX,ADD_ALLOC_BOX'); 


	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'PRE_REQT_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'PRE_ALLOC_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'PRE_SELL_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'PLAN_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'CUM_SELL_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'ALLOC_BOX');

	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'EDI_00');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'REQT_ALLOC_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'ADD_ALLOC_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'max', 'ALLOC_ZONE_04');


//	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PRE_INFO');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PRE_REQT_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PRE_ALLOC_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PRE_SELL_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'PLAN_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'CUM_SELL_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'ALLOC_BOX');
	
	

	re_cal_DW1_rate_sum();
	
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'EDI_00');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'REQT_ALLOC_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'ADD_ALLOC_BOX');
	
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '210|180|255');

/*
void SetSummaryBarFont( 
String strSummaryBarKey ,
String strName ,
Boolean nSize ,
Boolean bBold ,
Boolean bItalic ,
Boolean bUnderLine ,
Boolean bCenterLine ,
);
*/
	
//	GridObj.SetSummaryBarFont('SUMMARY1', '����', '11', true, false, false, false); 
//	GridObj.SetSummaryBarFont('SUMMARY2', '����', '11', true, false, false, false); 
	
	
}


function setGrid2(){

	GridObj2.SetColCellBgColor('ALLOC_RATE','250|250|200');
	GridObj2.SetColCellBgColor('ALLOC_BOX','250|250|200');

	// �հ�
	GridObj2.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'custom', 'BASE_STOCK,CHGO,IPGO,STOCK_EXPT,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,NEXT_STOCK'); 

	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'BASE_STOCK');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'CHGO');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'IPGO');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'STOCK_EXPT');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'PLAN_BOX');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'CUM_SELL_BOX');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'ALLOC_BOX');
	GridObj2.SetSummaryBarFunction('SUMMARY1', 'sum', 'NEXT_STOCK');
	
	re_cal_DW2_rate_sum();

	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
	
			
}

function setGrid3(){

	GridObj3.SetColFix('DC_NAME');
	
	for(i=0;i<GridObj3.GetRowCount( );i++ ) {
		// FERT�̰� ���갡�ɰ����̸� ����ɷ��� ���Ȯ�������� COPY�Ѵ�.
		if(GridObj3.GetCellValue("PROD_AVAILABLE", i) == "Y" && document.frm.itype.value == "FERT") {
			GridObj3.SetCellBgColor('DC_NAME', i, '202|255|255');
		}
	}	

	// �հ�
	GridObj3.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'BASE_STOCK,CHGO_QTY,PROD01_1,PROD01_3,CONF_STOCK,TRANS_QTY,NEXT_CHGO_QTY,NEXT_TRANS_QTY,USE_CAPA,PROD01,PROD02,PROD03,PROD04,PROD05,PROD06,PROD07,PROD08,PROD09,PROD10,PROD11,PROD12'); 
	GridObj3.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
			
}

function re_cal_DW1_rate_sum() {
	
	// wisegrid�� �����Ͱ� ������ ����ϸ� �ȵȴ�.
	if(GridObj.GetRowCount() <= 0) return;

	MetgeCnt = GridObj.GetMergeCount("ALLOC_ZONE_04");

	// ���ϼ�ȭ��
	GridObj.SetNumberFormat("PRE_INFO"		, "###,###,##0.0");
		
	for(i=0;i<MetgeCnt;i++){
		var dept_gubn = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_ZONE_04',i,false));
		/*****************************************************************************/
		if(dept_gubn == 0) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "���� ��   ");
		}else if(dept_gubn == 1) {//����
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "���� ��   ");
		}else if(dept_gubn == 2) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "CVS ��   ");
		}else if(dept_gubn == 3) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "Ư�� ��   ");
		} else{ 

		}		
		/*****************************************************************************/
		
		var part_pre_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','PRE_ALLOC_BOX',i,false));
		var part_pre_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','PRE_REQT_BOX',i,false))
		if(part_pre_alloc_box != 0) {
			GridObj.SetSummaryBarValue('SUMMARY2','PRE_INFO',i,Math.round(part_pre_sell_box/part_pre_alloc_box*100*10)/10);
		}
	}
	var tot_pre_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_ALLOC_BOX',0,false));
	var tot_pre_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_REQT_BOX',0,false))
	if(tot_pre_alloc_box != 0) {
		GridObj.SetSummaryBarValue('SUMMARY1','PRE_INFO',0,Math.round(tot_pre_sell_box/tot_pre_alloc_box*100*10)/10);
	}
		
	// �����Ҵ���
	for(i=0;i<MetgeCnt;i++){
		var part_plan_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','PLAN_BOX',i,false));
		var part_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_BOX',i,false)); //�����Ҵ緮
		if(part_plan_box != 0) {
			GridObj.SetSummaryBarValue('SUMMARY2','ALLOC_RATE',i,Math.round(part_alloc_box/part_plan_box*100*10)/10);
		}
	}
	var tot_plan_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','ALLOC_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj.SetSummaryBarValue('SUMMARY1','ALLOC_RATE',0,Math.round(tot_alloc_box/tot_plan_box*100*10)/10);
	}

	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'REQT_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY2', 'sum', 'REMN_BOX');

	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'REQT_BOX');
	GridObj.SetSummaryBarFunction('SUMMARY1', 'sum', 'REMN_BOX');
	
    // ������ȭ��
	for(i=0;i<MetgeCnt;i++){
		var part_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','REQT_BOX',i,false)); //�ֹ�����
		var part_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_BOX',i,false)); //�����Ҵ緮

		if(part_alloc_box != 0) {
			GridObj.SetSummaryBarValue('SUMMARY2','USE_ALLOC_RATE',i,Math.round(part_reqt_box/part_alloc_box*100*10)/10);
		}
	}
	
	var tot_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','REQT_BOX',0,false));
	
	if(tot_alloc_box != 0) {
		GridObj.SetSummaryBarValue('SUMMARY1','USE_ALLOC_RATE',0,Math.round(tot_reqt_box/tot_alloc_box*100*10)/10);
	}
	
	// �޼���
	for(i=0;i<MetgeCnt;i++){
		var part_plan_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','PLAN_BOX',i,false));
		var part_cum_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','CUM_SELL_BOX',i,false))
		if(part_plan_box != 0) {
			GridObj.SetSummaryBarValue('SUMMARY2','GOAL_RATE',i,Math.round((part_cum_sell_box)/part_plan_box*100*10)/10);
		}
	}
	var tot_plan_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_cum_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','CUM_SELL_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj.SetSummaryBarValue('SUMMARY1','GOAL_RATE',0,Math.round((tot_cum_sell_box)/tot_plan_box*100*10)/10);
	}
}

function re_cal_DW2_rate_sum() {
	
	// wisegrid�� �����Ͱ� ������ ����ϸ� �ȵȴ�.
	if(GridObj2.GetRowCount() <= 0) return;
	
	// �����Ҵ���
	var tot_plan_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_alloc_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','ALLOC_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj2.SetSummaryBarValue('SUMMARY1','ALLOC_RATE',0,Math.round(tot_alloc_box/tot_plan_box*100*10)/10);
	}
	// �޼���
	var tot_plan_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_cum_sell_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','CUM_SELL_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj2.SetSummaryBarValue('SUMMARY1','GOAL_RATE',0,Math.round((tot_cum_sell_box)/tot_plan_box*100*10)/10);
	}
	
}

/*********************************************   WiseGrid Event   *********************************************************/ 
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if( strColumnKey == "ALLOC_BOX") {
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // ���� �ǸŰ�ȹ
		//var dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // ���� �����Ҵ緮
		var dept_alloc_box = strToNum(nNewValue); // ���� �����Ҵ緮
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - strToNum(nOldValue) + dept_alloc_box; // ���� �����Ǹ�

		if(dept_plan_box > 0) {
			var dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;
			var dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
		}	
		else {
			var dept_alloc_rate = 0;
			var dept_goal_rate = 0;
		}				
		GridObj.SetCellValue("ALLOC_RATE", nRow, dept_alloc_rate);
		GridObj.SetCellValue("CUM_SELL_BOX", nRow, new_cum_sell_box);
		GridObj.SetCellValue("GOAL_RATE", nRow, dept_goal_rate);
	}
	else if(strColumnKey == "ALLOC_RATE") {
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // ���� �ǸŰ�ȹ
		var old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // ���� �����Ҵ緮
		var dept_alloc_rate = strToNum(GridObj.GetCellValue("ALLOC_RATE", nRow)); // ���� �����Ҵ���
		var dept_alloc_box = Math.round(dept_plan_box*dept_alloc_rate/100);				
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - old_dept_alloc_box + dept_alloc_box; // ���� �����Ǹ�
		if(dept_plan_box > 0) {
			var dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
		}	
		else {
			var dept_goal_rate = 0;
		}				
		GridObj.SetCellValue("ALLOC_BOX", nRow, dept_alloc_box);
		GridObj.SetCellValue("CUM_SELL_BOX", nRow, new_cum_sell_box);
		GridObj.SetCellValue("GOAL_RATE", nRow, dept_goal_rate);
	}
	else if(strColumnKey == "ADD_ALLOC_BOX") {
		// �ǸŰ�ȹ�� �����´�
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // ���� �ǸŰ�ȹ
		var old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // ���� �����Ҵ緮
		
		// ���� �����Ҵ緮�� �����´�
		var dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // ���� �����Ҵ緮
		// ���� �߰��Ҵ緮�� �����´�.
		var old_add_dept_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", nRow)); // �߰��Ҵ�ڽ�
		// ����� �߰��Ҵ緮�� �����´�.
		var add_dept_alloc_box = strToNum(GridObj.GetCellValue("ADD_ALLOC_BOX", nRow)); // �߰��Ҵ�ڽ�
		dept_alloc_box = dept_alloc_box - old_add_dept_alloc_box + add_dept_alloc_box;				
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - old_dept_alloc_box + dept_alloc_box; // ���� �����Ǹ�
		if(dept_plan_box > 0) { 
			var dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;
			var dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
		}
		else {
			var dept_alloc_rate = 0;
			var dept_goal_rate = 0;
		}				
		GridObj.SetCellValue("ALLOC_BOX", nRow, dept_alloc_box);
		GridObj.SetCellValue("ALLOC_RATE", nRow, dept_alloc_rate);
		GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", nRow, add_dept_alloc_box); // �߰��Ҵ緮 backup
		GridObj.SetCellValue("CUM_SELL_BOX", nRow, new_cum_sell_box);
		GridObj.SetCellValue("GOAL_RATE", nRow, dept_goal_rate);
	}
//	ReCalculation_DW2();
	re_cal_DW1_rate_sum();
}

/*������������������������������������������������������������������������
  ��WiseGrid2 Cell Change Event
  ������������������������������������������������������������������������*/
function GridChangeCell_DW2(strColumnKey, nRow, nOldValue, nNewValue) {

	// DC�������� �����Ҵ緮�� ����� ��� ������ ����(�ű��Ҵ緮 - �����Ҵ緮)������ŭ �Ǹ����п� ���� �й��Ѵ�.
	// �� ���� DB�� �����ϴ� �����Ҵ緮�� �����ϰ� �ǰ�, DW1�� ����� ���� DW2�� ��� ��й� �ǰ� �ȴ�.

	if(document.frm.btnAllocConf.disabled) { // NFOS���� OK
		// DC_ID�� ���Ѵ�.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", nRow);
		// DC�ǸŰ�ȹ�� ���Ѵ�
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", nRow));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_add_alloc_box=0, dw1_old_add_alloc_box=0, dw1_new_add_alloc_box=0;
		var dw1_alloc_rate = 0, dw2_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;
		
		if( strColumnKey == "ALLOC_BOX") {
			// DC�����Ҵ緮�� ���Ѵ�.
			var dw2_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", nRow));
		}	
		else if(strColumnKey == "ALLOC_RATE") {
			// DC�����Ҵ����� ���Ѵ�.
			var dw2_alloc_rate = strToNum(GridObj2.GetCellValue("ALLOC_RATE", nRow));
			// DC�����Ҵ����� DC�ǸŰ�ȹ�� �̿��ؼ� DC�����Ҵ緮�� ���Ѵ�.
			var dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100);
			// OLD������ ���̸� ���Ѵ�. �̰��� �߰��Ҵ緮���� ����� ���̴�.
		}
		// OLD DC�����Ҵ緮�� ���Ѵ�.  HIDDEN�� �������ִ�. DB�� ����� ���̴�
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", nRow));
		// OLD������ ���̸� ���Ѵ�. �̰��� �߰��Ҵ緮���� ����� ���̴�.
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;

		// DW1�� LOOP�ϸ鼭 �ش� DC�� �������� ���Ѵ�.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D������ ���
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D������ �ƴѰ��
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}
				
				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// ���������� �ǸŰ�ȹ�� �����´�.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// �������� �����Ҵ緮�� �����´�.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// �������� �߰� �����Ҵ緮�� �����´�.
					dw1_add_alloc_box = strToNum(GridObj.GetCellValue("ADD_ALLOC_BOX", i));
					
					// �������� �߰� �����Ҵ緮�� �����´�.
					dw1_old_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i));
					
					// ��������-����� �Ǹ������� �̿��Ͽ� DW1�� �����Ҵ緮�� �����Ѵ�.
					dw1_new_add_alloc_box = Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					// �������� �����Ҵ緮��  �߰������Ҵ緮�� ���ؼ� �����Ѵ�.
					GridObj.SetCellValue("ALLOC_BOX",i,dw1_alloc_box + dw1_new_add_alloc_box);
					// �߰������Ҵ緮�� �߰������Ҵ緮�� ���ؼ� �����Ѵ�.
					GridObj.SetCellValue("ADD_ALLOC_BOX",i,dw1_add_alloc_box + dw1_new_add_alloc_box);
					// �߰������Ҵ緮�� HIDDEN���� �����Ѵ�.
					GridObj.SetCellHiddenValue("ADD_ALLOC_BOX",i,dw1_add_alloc_box + dw1_new_add_alloc_box);
					// �������� �����Ҵ����� ���Ѵ�.
					
					dw1_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i)) + dw1_alloc_box + dw1_new_add_alloc_box; 
					if(dw1_plan_box > 0) {
						dw1_alloc_rate = Math.round((dw1_alloc_box + dw1_new_add_alloc_box) / dw1_plan_box*100*10)/10;
						dw1_goal_rate = Math.round(dw1_cum_sell_box/ dw1_plan_box*100*10)/10;;
					}	
					else {
						dw1_alloc_rate = 0;
						dw1_goal_rate = 0;
					}	
					// �������� �����Ҵ����� �����Ѵ�.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC�����Ҵ緮�� �����ϱ� ���� �������� �����Ҵ緮�� �����Ѵ�.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_add_alloc_box;
				}
			}
		}
		// �������� DC�����Ҵ緮�� DW2�� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// �������� DC�����Ҵ緮�� DW2�� HIDDEN���� �����Ѵ�.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// DC�ǸŰ�ȹ�� �������� DC�����Ҵ緮�� �̿��Ͽ� DC�����Ҵ����� ���Ѵ�.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", nRow)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC�����Ҵ����� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_RATE", nRow, dw2_alloc_rate);
		GridObj2.SetCellValue("CUM_SELL_BOX", nRow, dw2_cum_sell_box );
		GridObj2.SetCellValue("GOAL_RATE", nRow, dw2_goal_rate );
	}
	else { // NFOS���� ��
		// DC_ID�� ���Ѵ�.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", nRow);
		// DC�ǸŰ�ȹ�� ���Ѵ�
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", nRow));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_new_alloc_box =0;
		var dw1_alloc_rate = 0, dw2_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;

		if( strColumnKey == "ALLOC_BOX") {
			// DC�����Ҵ緮�� ���Ѵ�.
			var dw2_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", nRow));
		}	
		else if(strColumnKey == "ALLOC_RATE") {
			// DC�����Ҵ����� ���Ѵ�.
			var dw2_alloc_rate = strToNum(GridObj2.GetCellValue("ALLOC_RATE", nRow));
			// DC�ǸŰ�ȹ���� DC�����Ҵ緮�� ���Ѵ�.
			var dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100); 
		}
		// OLD DC�����Ҵ緮�� ���Ѵ�.  HIDDEN�� �������ִ�. DB�� ����� ���̴�
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", nRow));
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;
		
		// DW1�� LOOP�ϸ鼭 �ش� DC�� �������� ���Ѵ�.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D������ ���
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D������ �ƴѰ��
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}

				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// ���������� �ǸŰ�ȹ�� �����´�.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// �������� �����Ҵ緮�� �����´�.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// ��������-����� �Ǹ������� �̿��Ͽ� DW1�� �����Ҵ緮�� �����Ѵ�.
					dw1_new_alloc_box = dw1_alloc_box + Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					
					// �������� �����Ҵ緮��  �߰������Ҵ緮�� ���ؼ� �����Ѵ�.
					GridObj.SetCellValue("ALLOC_BOX",i,dw1_new_alloc_box);
					dw1_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i)) + dw1_new_alloc_box; 
					if(dw1_plan_box > 0) {
						dw1_alloc_rate = Math.round(dw1_new_alloc_box / dw1_plan_box*100*10)/10;
						dw1_goal_rate = Math.round(dw1_cum_sell_box/ dw1_plan_box*100*10)/10;;
					}	
					else {
						dw1_alloc_rate = 0;
						dw1_goal_rate = 0;
					}	
					// �������� �����Ҵ����� �����Ѵ�.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC�����Ҵ緮�� �����ϱ� ���� �������� �����Ҵ緮�� �����Ѵ�.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_alloc_box - dw1_alloc_box;
				}
			}
		}
		// �������� DC�����Ҵ緮�� DW2�� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// �������� DC�����Ҵ緮�� DW2�� HIDDEN���� �����Ѵ�.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// DC�ǸŰ�ȹ�� �������� DC�����Ҵ緮�� �̿��Ͽ� DC�����Ҵ����� ���Ѵ�.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", nRow)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC�����Ҵ����� �����Ѵ�.
		GridObj2.SetCellValue("ALLOC_RATE", nRow, dw2_alloc_rate);
		GridObj2.SetCellValue("CUM_SELL_BOX", nRow, dw2_cum_sell_box );
		GridObj2.SetCellValue("GOAL_RATE", nRow, dw2_goal_rate );
	}
	re_cal_DW1_rate_sum();
	re_cal_DW2_rate_sum();
}


function	GridCellClick(strColumnKey, nRow) {
	
}

var grid_move_lock = true;

/*������������������������������������������������������������������������
  ��WiseGrid Cell Click Event
  ������������������������������������������������������������������������*/
function GridRowActivate(nRow){
	// DW1�� DW2�� ���� ������ �ٶ� �� EVENT�� ���ÿ� ȣ��Ǵ� �� ����
	if(grid_move_lock) grid_move_lock = false;
	else return;

//	var dc_id = GridObj.GetCellValue("DC_ID", nRow);

	// DW2�� ��������� ã�´�
/*	for(i=0;i<GridObj2.GetRowCount( );i++ ) {
		if(dc_id == GridObj2.GetCellValue("DC_ID", i)){
			GridObj2.MoveRow(i);
			grid_move_lock = true;
			return;
		}
	}
*/ 
	grid_move_lock = true;
}

/*������������������������������������������������������������������������
  ��WiseGrid Cell Click Event
  ������������������������������������������������������������������������*/
function Grid2RowActivate(nRow){
	// DW1�� DW2�� ���� ������ �ٶ� �� EVENT�� ���ÿ� ȣ��Ǵ� �� ����
	if(grid_move_lock) grid_move_lock = false;
	else return;

/*	var dc_id = GridObj2.GetCellValue("DC_ID", nRow);

	// DW1�� ��������� ã�´�
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		if(dc_id == GridObj.GetCellValue("DC_ID", i)){
			GridObj.SetRowScroll(i);
			GridObj.MoveRow(i);
			grid_move_lock = true;
			return;
		}
	}
	*/ 

 	grid_move_lock = true;
}

/*********************************************   ��Ÿ Function   **********************************************************/
/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	document.WiseGrid2.height = tableHeightValue*0.8 + "px"; 
	document.WiseGrid3.height = tableHeightValue*0.2 + "px"; 
	
}
