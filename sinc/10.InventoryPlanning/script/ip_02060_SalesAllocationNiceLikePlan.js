//############################################################
//## 프로그램ID 	: ip_02060_SalesAllocationNiceLikePlan.js
//## 프로그램명 	: 공급정보입력정정
//## 개발자  	: 남웅용
//## 개발일자 	: 2010-02-18
//##
//## 관련 job file 	 : 
//##
//## 관련 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-02-18  남웅용     ip_02060_SalesAllocationNiceLikePlan.js 개발
//## 2.0		2010-06-01  남웅용	  공급할당량이 없어도 추가할당을 받기위해 모든데이터 저장처리
//##								  -> CRUD를 강제로 'U'로 셋팅한다.
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;													// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_02060_SalesAllocationNiceLikePlan';		// job id(서블릿 명, WiseGrid Header key)
var GridObj ; 												// WiseGrid 객체
var GridObj2;
var GridObj3;

var color_tot = '224|224|224';
var color_edit_col = '255|253|208';

var oldRow = 0;

var rFirst = 0;

/******************************************          Action Function         **********************************************/
/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
function GoSearch(service) {
	
	if( document.frm.cnfm_date.value == "" || document.frm.cnfm_date.value == null ) {
		alert("일자를 입력하여 주십시요.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("제품코드를 입력하여 주십시요.");
		return;
	}
	
	// 현재 조회한 작업일자,품목 저장
	document.frm.curr_item_id.value = document.frm.item_id.value;
	document.frm.curr_cnfm_date.value = document.frm.cnfm_date.value;
	
	// 화면 초기화
	document.frm.alloc_rate.value = "";
	document.frm.add_alloc_rate.value = "";
	document.frm.dc_alloc_rate.value = "";

	// 영업지점-출고장 판매지분 array조회
	getDeptStorQuota();
	
	doQuery();

	doQuery2();  
	
	GridObj3.ClearGrid();
	setHeader3();
	
};

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function GoSave() {

	// GridObj에 데이터가 없이 저장하는 경우는 NFOS전송 전체메세지만 저장할 경우이다.
	if(GridObj.GetRowCount() == 0) {
		
		saveCommonComment();
		return;
	}	
		
	var cnfm_date = document.frm.cnfm_date.value;
	var item_id = document.frm.item_id.value;
	var curr_item_id = document.frm.curr_item_id.value;
	var curr_cnfm_date = document.frm.curr_cnfm_date.value;
	
	if( cnfm_date == null || cnfm_date == ""){
		alert("수송일자를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("제품 코드를 먼저 입력하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}

	if( cnfm_date != curr_cnfm_date){
		alert("저장하려는 작업일자가 현재 작업한 작업일자와 다릅니다. 조회후 다시하십시요.");
		return;
	}	

	if( item_id != curr_item_id){
		alert("저장하려는 품목이 현재 작업한 품목과 다릅니다. 조회후 다시하십시요.");
		return;
	}	

	if( document.frm.insel_allocReason.value == "00"){
		
		alert("공급할당 사유를 등록하고 저장해주세요.");
		return;
	}	//2014-10-22 할당사유 없어도 저장 가능하게 이승용대리 요청  2014-12-19 다시 살리기 요청

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
			// 저장시 combo-list가 refresh되면서 저장했던 품목을 다시 선택하도록 한다.
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
		// 품목cnt정보를 셋팅한다.
		document.frm.item_info.value = arrList[selected_row][2];
		document.frm.box_per_palet.value = arrList[selected_row][3];
		document.frm.itype.value = arrList[selected_row][4];
		document.frm.cd_gubn.value = arrList[selected_row][5];
		
		document.frm.insel_allocReason.value = arrList[selected_row][7];
		
		// 공급할당기준을 바꿔서 조회한 경우는 저장된 데이터로 갱신하지 않는다.
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
		
		/* NFOS전송여부 확인 */
		commonUtil.getSelQeury("cnfm_date",cnfm_date,"ip_02060_CHECK_DC_ALLOC_FLAG", { 
		callback:function(arrList){
			if(arrList[0][0]=='Y') { // NFOS전송완료
				document.frm.btnAllocConf.disabled = true;
				document.frm.btnAddAllocConf.disabled = true;
				document.frm.alloc_rate.disabled = true;
				document.frm.dc_alloc_rate.disabled = true;
				
 				// 공급할당율, 할당량 입력금지
 				GridObj.SetColCellActivation("ALLOC_RATE","activatenoedit"); 
				GridObj.SetColCellActivation("ALLOC_BOX","activatenoedit"); 
			}
			else {
				document.frm.btnAllocConf.disabled = false;
				document.frm.btnAddAllocConf.disabled = false;
				document.frm.alloc_rate.disabled = false;
				document.frm.dc_alloc_rate.disabled = false;

 				// 공급할당율, 할당량 입력가능
 				GridObj.SetColCellActivation("ALLOC_RATE","edit"); 
				GridObj.SetColCellActivation("ALLOC_BOX","edit"); 
			}
			if(arrList[0][2]=='Y') { // NFOS추가작업 완료
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

	// 공급할당 유형을 사용자가 바꾸었는지 확인 중지
	QoutaType_Change = false;
}

function execute_alloc_flag_yes(){
	var cnfm_date = document.frm.cnfm_date.value;
	var user_id	= document.frm._user_id.value
	commonUtil.executeQuery("cnfm_date!%!user_id", cnfm_date+"!%!"+user_id, "ip_02060_UPDATE_DC_ALLOC_FLAG", success);
}

success = function(data) {
	if (data == "SUCCESS") {
		document.frm.btnAllocConf.value = "NFOS전송";
		document.frm.btnAllocConf.disabled = true;
		alert("변경되었습니다.");
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
		document.frm.btnAddAllocConf.value = "추가완료";
		document.frm.btnAddAllocConf.disabled = true;
//		alert("변경되었습니다.");
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
		
//		alert("변경되었습니다.");
	}
}

// 자동공급할당 여부와 기준을 저장한다. 저장은 전체메세지 저장처리시작시 진행한다.
function save_auto_alloc_info(){
	var item_id		= document.frm.item_id.value;

	if(document.frm.chk_AutoAllocCheck.checked)
		var chk_AutoAllocCheck = "Y";
	else
		var chk_AutoAllocCheck = "N";

	// 자동공급할당여부가 정정된 것인지 판단한다.
	var item_selectedIndex = document.frm.item_id.options.selectedIndex;
	var old_chk_AutoAllocCheck = document.frm.insel_auto_alloc_flag[item_selectedIndex].value;

// 자동 공급할당 유형은 사용하지 않는다.
//	var insel_AutoAllocQoutaType = document.frm.insel_AutoAllocQoutaType.value;
//	var old_auto_alloc_quota_type = document.frm.insel_auto_alloc_quota_type[item_selectedIndex].value;
var insel_AutoAllocQoutaType = '20';
var old_auto_alloc_quota_type = '20';

	// 정보가 바뀐경우만 진행한다.
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

// 숫자외 입력방지
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
	// 추가할당에서는 마이너스 일과할당이 가능하도록 마이너스 부호를 허락한다.
	if(!(key==8||key==9||key==13||key==46||key==144||key==45|| // 45는 마이너스
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
// 제품에서 'Q'입력시  조회실행
function enterShortKey() {
	var key = event.keyCode;
//alert(key);
	if(key == 81) { //'q' or 'Q'
		GoSearch("");
	}

	if(ctrl_keydown && key == 83) { // s가 눌러졌다.
		GoSave();
	}
	
	if(key == 17) {// ctrl key down
		ctrl_keydown = true;
	}
			
}

function onKeyUp() {
	ctrl_keydown = false;
}

// EDI 조회조건 comboList visible
function chk_sel_02_EDI_disabled(obj) {
	if(obj.checked == true) document.frm.chk_sel_02_EDI.disabled = false;
	else document.frm.chk_sel_02_EDI.disabled = true;
}

// 자동공급할당 comboList visible
function AutoAllocQoutaType_disabled(obj) {
	if(obj.checked == true) {
		alert("자동 공급할당은 영업일기준 모래오더부터 적용됩니다!");
		document.frm.insel_AutoAllocQoutaType.disabled = false;
	}
	else document.frm.insel_AutoAllocQoutaType.disabled = true;
}

// 공급할당 기준을 사용자가 바꿔서 조회한 경우는 저장되어 있는 공급할당 기준으로 갱신되지 않도록 방지한다.
// 왜냐하면 새로운 기준을 적용하기 위해 선택하고 조회한 경우일 것이기 때문이다.
var QoutaType_Change = false;
function	check_QoutaType_Change() {
	QoutaType_Change = true;
}

// 제품 검색 POPUP
// 품목 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//조회품목 상태 : '01'판매중	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// 할당율 일괄적용
function ApplyAllocRate_DW1() {

	var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_rate = strToNum(document.frm.alloc_rate.value);  // 적용할당율
	
	var dc_id = new Array();
	var dc_alloc_qty = new Array();
	var alloc_zone;
	
	for(i=0;i<GridObj.GetRowCount( );i++ ) {

		dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매계획
		old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
		
		if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
		  	alloc_zone = "1";  
		}
		else {
			alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
		}
		
		// 판매계획이 0보다 작거나 해당 ZONE이 아니면 할당량 0
		if(dept_plan_box <= 0 || alloc_zone != "1"	) {
			dept_alloc_box = 0;
			dept_alloc_rate = 0;
		}
		else {
			// 할당율에 따른 지점 할당량을 결정한다.
			dept_alloc_box = Math.round(dept_plan_box * alloc_rate / 100);
			// 지점의 할당율을 재계산 한다.
			dept_alloc_rate = Math.round(dept_alloc_box / dept_plan_box*100*10)/10;
		}
		
		// 중복 체크가 있으면 기존 할당량에 추가한다.
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
		GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box); // 예상누적 갱신
		GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate); // 달성율 갱신		
	}

	re_cal_DW1_rate_sum(); // DW1 비율sum재계산
	ReCalculation_DW2(); // DW2에 공급할당량 적용
}

// 추가할당율 일괄적용
function ApplyAddRate_DW1() {

	var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var add_alloc_rate = strToNum(document.frm.add_alloc_rate.value);  // 적용할당율
	var dept_add_alloc_box = 0, old_dept_add_alloc_box = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_zone;
		
	for(i=0;i<GridObj.GetRowCount( );i++ ) {

		old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
		dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매계획
		
		if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
		  	alloc_zone = "1";  
		}
		else {
			alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
		}
		
		dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i)); // 지점 공급할당량
		old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old 추가공급할당량

		// 판매계획이 0보다 작거나 해당 ZONE이 아니면 통과
		if(dept_plan_box <= 0 || alloc_zone != "1"	) {
			dept_add_alloc_box = 0;
		}	
		else {
			dept_add_alloc_box = Math.round(dept_plan_box * add_alloc_rate / 100);
		}
		
		// 중복 체크가 있으면 기존 추가공급할당량에 추가한다.
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
		GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box); // 예상누적 갱신
		GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate); // 달성율 갱신		
	}

	re_cal_DW1_rate_sum(); // DW1 비율sum재계산
	ReCalculation_DW2(); // DW2에 공급할당량 적용
}

// 달성율 일괄적용
function ApplyRate_BY_Goal_DW1() {
	
	var alloc_zone;
	
	// 공급할당 기준이 판매계획이 아닌경우만 진행한다.
	if(document.frm.insel_allocQoutaType.value == "10") {
		alert("공급할당기준이 판매계획이 아닌경우만 사용가능합니다.");
	}
	else {
		var alloc_goal_rate = strToNum(document.frm.alloc_goal_rate.value);  // 입력한 적용 달성율
		var dept_plan_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0, dept_cum_sell_box = 0;
		var today_cum_sell_box = 0, new_dept_alloc_box = 0, new_dept_alloc_rate = 0;
		var old_dept_add_alloc_box = 0, new_dept_add_alloc_box = 0;
		var new_dept_goal_box = 0, new_dept_goal_rate;
		
		if(document.frm.btnAllocConf.disabled) { // NFOS전송 OK -> 추가할당량을 정정한다.
			
			// DW1에 대해서 loop수행	
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				// 목표가 0 이상일때만 진행
				dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매목표
				dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i)); // 지점 공급할당량
				old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old 추가공급할당량
				// 누적 달성박스를 가지고 온다.
				dept_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
				
				if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
				  	alloc_zone = "1";  
				}
				else {
					alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
				}
				
				// 판매계획이 0보다 작거나 해당 ZONE이 아니면 통과
				if(dept_plan_box <= 0 || alloc_zone != "1"	) {
					new_dept_goal_box = 0;
				}	
				else {
					// 적용달성율이 되기위한 박스수를 구한다.
					new_dept_goal_box = Math.round(dept_plan_box * alloc_goal_rate  / 100);
				}
				
				// 중복 체크가 있으면 할당목표에 기존 추가공급할당량을 추가한다.
				if(document.frm.chk_add_alloc.checked == true) {
					new_dept_goal_box = new_dept_goal_box + dept_cum_sell_box;
				}
				
				// 적용할 달성율을 달성하기 위한 박스보다 당일까지의 누적판매수량이 작으면 진행한다.
				if(dept_cum_sell_box < new_dept_goal_box) {
					// 추가 공급할당량 = 적용 달성율 박스수 - old_누적예상박스수
					new_dept_add_alloc_box = old_dept_add_alloc_box + new_dept_goal_box - dept_cum_sell_box;
					
					// 공급할당량을 새로 계산한다.
					new_dept_alloc_box = dept_alloc_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					// 새로운 예상누적박스 계산
					new_dept_goal_box = dept_cum_sell_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					if(dept_plan_box <= 0) new_dept_alloc_rate = 0;
					else new_dept_alloc_rate = Math.round(new_dept_alloc_box / dept_plan_box*100*10)/10;				
	
					if(dept_plan_box <= 0) new_dept_goal_rate = 0;
					else new_dept_goal_rate = Math.round(new_dept_goal_box / dept_plan_box*100*10)/10;
				}
				else { // 달성율을 줄인경우를 감안하자!
					// 추가 공급할당량 = 적용 달성율 박스수 - (old누적예상 - old 추가공급할당량) 
					new_dept_add_alloc_box = new_dept_goal_box - (dept_cum_sell_box - old_dept_add_alloc_box);
					if(new_dept_add_alloc_box <= 0) { // 추가할당량이 필요없거나 (-)가 된 경우
						new_dept_add_alloc_box = 0;
					}
					
					// 공급할당량을 새로 계산한다.
					new_dept_alloc_box = dept_alloc_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					// 새로운 예상누적박스 계산
					new_dept_goal_box = dept_cum_sell_box - old_dept_add_alloc_box + new_dept_add_alloc_box;
					
					if(dept_plan_box <= 0) new_dept_alloc_rate = 0;
					else new_dept_alloc_rate = Math.round(new_dept_alloc_box / dept_plan_box*100*10)/10;				
	
					if(dept_plan_box <= 0) new_dept_goal_rate = 0;
					else new_dept_goal_rate = Math.round(new_dept_goal_box / dept_plan_box*100*10)/10;
				}
				// 새로운 추가할당량을 셋팅
				GridObj.SetCellValue("ADD_ALLOC_BOX", i, new_dept_add_alloc_box);
				GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", i, new_dept_add_alloc_box);
				// 새로운 공급할당량 셋팅
				GridObj.SetCellValue("ALLOC_BOX", i, new_dept_alloc_box);
				// 새로운 공급할당률 셋팅
				GridObj.SetCellValue("ALLOC_RATE", i, new_dept_alloc_rate);
				// 예상누적 갱신
				GridObj.SetCellValue("CUM_SELL_BOX", i, new_dept_goal_box);
				// 달성율 갱신
				GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);				
			}
		}
		else { // NFOS전송전 -> 할당량을 정정한다.
	
			// DW1에 대해서 loop수행			
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				// 목표가 0 이상일때만 진행
				dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매목표
				// 누적판매박스수를 구한다.
				dept_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i));
				// 기존공급할당량을 구한다.
				dept_alloc_box	= strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
				
				if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
				  	alloc_zone = "1";  
				}
				else {
					alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
				}
				
				// 판매계획이 0보다 작거나 해당 ZONE이 아니면 통과
				if(dept_plan_box <= 0 || alloc_zone != "1"	) {
					new_dept_goal_box = 0;
				}	
				else {
					// 적용달성율이 되기위한 박스수를 구한다.
					new_dept_goal_box = Math.round(dept_plan_box * alloc_goal_rate  / 100);
				}
				
				// 중복 체크가 있으면 할당목표에 기존 추가공급할당량을 추가한다.
				if(document.frm.chk_add_alloc.checked == true) {
					new_dept_goal_box = new_dept_goal_box + dept_cum_sell_box;
				}
				
				// 당일까지의 누적판매 = 누적판매 - 공급할당량
				today_cum_sell_box = dept_cum_sell_box - dept_alloc_box;
				
				// 적용할 달성율을 달성하기 위한 박스보다 당일까지의 누적판매수량이 작으면 진행한다.
				if(today_cum_sell_box < new_dept_goal_box) {
					// 공급할당량 = 적용 달성율 박스수 - 당일까지 달성한 박스수
					new_dept_alloc_box = new_dept_goal_box - today_cum_sell_box;
				}
				else {
					new_dept_alloc_box = dept_alloc_box;
					new_dept_goal_box = dept_cum_sell_box;
				}
				// 공급할당율 갱신
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
	
		re_cal_DW1_rate_sum(); // DW1 비율sum재계산
		ReCalculation_DW2(); // DW2에 일괄적용
	}
}

// EDI 할당율 일괄적용
function ApplyRate_BY_EDI_DW1() {
	var dept_edi_box = 0, dept_alloc_box = 0, dept_alloc_rate = 0;
	var alloc_by_edi = strToNum(document.frm.alloc_by_edi.value);  // 적용할당율
	var dept_add_alloc_box = 0, old_dept_add_alloc_box = 0;
	var temp_dc_id, dc_plan_box, dc_stock_expt, dc_next_stock;
	var dc_id = new Array();
	var dc_alloc_qty = new Array();
	var dc_cnt = GridObj2.GetRowCount( );
	var dept_plan_box = 0;
	var old_dept_alloc_box = 0, old_cum_sell_box = 0, new_cum_sell_box = 0, new_dept_goal_rate = 0;
	var alloc_zone;

	// DW2 id 선언 및 값 초기화
	for(i=0;i<dc_cnt;i++ ) {
		dc_id[i] = GridObj2.GetCellValue("DC_ID", i);  		
		dc_alloc_qty[i] = 0;  		
	}

	if(document.frm.btnAllocConf.disabled) { // NFOS전송 OK

		for(i=0;i<GridObj.GetRowCount( );i++ ) {

			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매계획
			old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			dept_edi_box = strToNum(GridObj.GetCellValue("EDI_00", i)); // 지점 EDI박스
			old_dept_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i)); // old 추가공급할당량

			if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
			  	alloc_zone = "1";  
			}
			else {
				alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
			}
			
			// 해당 ZONE이 아니면 통과
			if(alloc_zone != "1"	) {
				dept_add_alloc_box = 0;
			}	
			else {
				// 추가할당량을 구한다.
				dept_add_alloc_box = Math.round(dept_edi_box * alloc_by_edi / 100);
			}

			// 중복 체크가 있으면 추가공급할당량에 기존 추가공급할당량을 추가한다.
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
			// 예상누적 갱신
			GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box);
			// 달성율 갱신
			GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);	
		}
	}
	else { // NFOS전송전
		
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매계획
			old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			dept_edi_box = strToNum(GridObj.GetCellValue("EDI_00", i)); // 지점 EDI박스

			if(document.frm.insel_CAT_ALLOC_ZONE.value == 'ALLOC_ZONE_01') { // '전국'인 경우는 모두 처리
			  	alloc_zone = "1";  
			}
			else {
				alloc_zone = GridObj.GetCellValue(document.frm.insel_CAT_ALLOC_ZONE.value,i);
			}
			
			// 해당 ZONE이 아니면 통과
			if(alloc_zone != "1"	) {
				dept_alloc_box = 0;
			}	
			else {
				// 공급할당량을 구한다.
				dept_alloc_box = Math.round(dept_edi_box * alloc_by_edi / 100);
			}

			// 중복 체크가 있으면 공급할당량에 기존 공급할당량을 추가한다.
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
			
			// 예상누적 갱신
			dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i)); // 지점 판매계획
			if(dept_plan_box <= 0) {
				new_dept_goal_rate = 0;
			}
			else {
				new_dept_goal_rate = Math.round(new_cum_sell_box / dept_plan_box*100*10)/10;
			}

			GridObj.SetCellValue("ALLOC_BOX", i, dept_alloc_box);
			GridObj.SetCellValue("ALLOC_RATE", i, dept_alloc_rate);
			GridObj.SetCellValue("CUM_SELL_BOX", i, new_cum_sell_box);
			// 달성율 갱신
			GridObj.SetCellValue("GOAL_RATE", i, new_dept_goal_rate);	
		}
	}

	re_cal_DW1_rate_sum(); // DW1 비율sum재계산
	ReCalculation_DW2(); // DW2에 일괄적용

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
	

	// DW2 id 선언 및 값 초기화
	for(i=0;i<dc_cnt;i++ ) {
		dc_id[i] = GridObj2.GetCellValue("DC_ID", i);  		
		dc_alloc_qty[i] = 0;  
		// 출고가능량을 저장해놓는다.
		dw2_expt_stock[i] = strToNum(GridObj2.GetCellValue("STOCK_EXPT", i));  		
	}

	// C/D연산일 경우
	// 자기 배송지점을 우선적으로 소진한 후 CDC재고를 소진한다.
	if(document.frm.chk_sel_20.checked == true) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			
			// 지점-출고장-판매지분-CDC LOOPING
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// for loop로 지점을 검색하고 해당지점을 찾으면
				if(dept_code == document.frm.quota_dept_code[k].value) {
					// 해당 출고장 id을 저장하고
					dw1_dc_id = document.frm.quota_dc_id[k].value;
					temp_dc_id = document.frm.quota_cdc_id[k].value;
					
					// 판매지분에 의해 출고장 공급할당량을 계산한다.
					stor_alloc_box = Math.round(dept_alloc_box * strToNum(document.frm.quota_rate[k].value));
					// 1-3.판매지분에 대한 할당수량을 계산하고 dc_alloc_qty에 저장한다. 
					for(j=0;j<dc_cnt;j++ ) {
						
						// 1.우선 자신의 재고를 소진한다.
						if(dw1_dc_id == dc_id[j]) {
							if(dw2_expt_stock[j] > 0) { // DW2의 출고가능량이 0보다 클 때
								if(dw2_expt_stock[j] > stor_alloc_box) { // 출고가능량 > 할당량
									dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;
									// 출고가능량에서 할당량만큼 빼준다.
									dw2_expt_stock[j] = dw2_expt_stock[j] - stor_alloc_box;
									// 할당량은 모두 할당되었기 때문에 0
									stor_alloc_box = 0;
								}
								else { // 출고가능량 < 할당량
									dc_alloc_qty[j] = dc_alloc_qty[j] + dw2_expt_stock[j];
									// 잔여할당량 = 할당량 - 출고가능량
									stor_alloc_box = stor_alloc_box - dw2_expt_stock[j];
									// 출고가능량은 이제 0
									dw2_expt_stock[j] = 0;
								}
							}
							break;
						}   		
								
						// 2.그다음 CDC의 재고를 소진한다. 단 할당량 > 0 인 경우 실행
						if(stor_alloc_box > 0) {
							for(j=0;j<dc_cnt;j++ ) {
								if(temp_dc_id == dc_id[j]) {
									dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;  		
								}   		
							}
						}
					}
					if(k < document.frm.quota_dept_code.length && dept_code != document.frm.quota_dept_code[k+1].value) break; // 다음번 row가 다른 지점이면 끝낸다.
				}
			}
		}
	} 
	// C/D연산이 아닌경우
	else {

		for(i=0;i<GridObj.GetRowCount();i++ ) {
			dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			// DW1의 할당량을 가져온다.
			dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
			
			// 출고장(DW2)에 할당량을 동기화 한다.
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// for loop로 지점을 검색하고 해당지점을 찾으면
				if(dept_code == document.frm.quota_dept_code[k].value) {
					// 해당 출고장 id을 저장하고
					temp_dc_id = document.frm.quota_dc_id[k].value;
					// 판매지분에 의해 출고장 공급할당량을 계산한다.
					stor_alloc_box = Math.round(dept_alloc_box * strToNum(document.frm.quota_rate[k].value));
					// 1-3.판매지분에 대한 할당수량을 계산하고 dc_alloc_qty에 저장한다. 
					for(j=0;j<dc_cnt;j++ ) {
						if(temp_dc_id == dc_id[j]) {
							dc_alloc_qty[j] = dc_alloc_qty[j] + stor_alloc_box;  
							break;		
						}   		
					}
					if(k < document.frm.quota_dept_code.length && dept_code != document.frm.quota_dept_code[k+1].value) break; // 다음번 row가 다른 지점이면 끝낸다.
				}
			}
		}
	}

	// DW2에 일괄적용!
	for(i=0;i<dc_cnt;i++ ) {
		old_dc_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", i));
		GridObj2.SetCellValue("ALLOC_BOX", i, dc_alloc_qty[i]);  		
		GridObj2.SetCellHiddenValue("ALLOC_BOX", i, dc_alloc_qty[i]);  		
		dc_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", i));
		// New 예상누적박스 = 기존 예상누적박스 - old공급할당량 + new공급할당량
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
			
		// 예상재고 재계산
		dc_stock_expt = strToNum(GridObj2.GetCellValue("STOCK_EXPT", i));
		dc_next_stock = dc_stock_expt - dc_alloc_qty[i];
		GridObj2.SetCellValue("NEXT_STOCK", i, dc_next_stock);  
	}

	re_cal_DW2_rate_sum(); // DW2 비율sum재계산
}


// DW2 할당율 일괄적용 --> NFOS전송전만 가능하도록 함.
function ApplyAllocRate_DW2() {

//	gridArea.style.display = "none";
//	waitArea.style.display = "block";

alert("기능적용중입니다!");
return;

	var dw2_alloc_rate = strToNum(document.frm.dc_alloc_rate.value);
	for(j=0;j<GridObj2.GetRowCount();j++) {
		
		// DC_ID를 구한다.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", j);
		// DC판매계획을 구한다
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", j));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_new_alloc_box =0;
		var dw1_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;


		// 판매계획이 0보다 작거나 해당 ZONE이 아니면 할당량 0
		if(dw2_plan_box <= 0) {
			dw2_alloc_box = 0;
		}
		else {
			// 할당율에 따른 출고장의 할당량을 결정한다.
			dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100);
		}
		// OLD DC공급할당량을 구한다.  HIDDEN에 감춰져있다. DB에 저장된 값이다
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", j));
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;
		
		// DW1을 LOOP하면서 해당 DC의 지점들을 구한다.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D연산일 경우
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D연산이 아닌경우
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}

				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// 영업지점의 판매계획을 가져온다.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// 영업지점 공급할당량을 가져온다.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// 영업지점-출고장 판매지분을 이용하여 DW1의 공급할당량을 결정한다.
					dw1_new_alloc_box = dw1_alloc_box + Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					// 영업지점 공급할당량에  추가공급할당량을 더해서 셋팅한다.
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
					// 영업지점 공급할당율을 셋팅한다.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC공급할당량을 보정하기 위해 영업지점 공급할당량을 저장한다.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_alloc_box - dw1_alloc_box;
				}
			}
		}
		// 최종적인 DC공급할당량을 DW2에 셋팅한다.
		GridObj2.SetCellValue("ALLOC_BOX",j,temp_dc_alloc_box);
		// 최종적인 DC공급할당량을 DW2의 HIDDEN에도 셋팅한다.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",j,temp_dc_alloc_box);
		// DC판매계획과 최종적인 DC공급할당량을 이용하여 DC공급할당율을 구한다.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", j)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC공급할당율을 셋팅한다.
		GridObj2.SetCellValue("ALLOC_RATE", j, dw2_alloc_rate);
		GridObj2.SetCellValue("CUM_SELL_BOX", j, dw2_cum_sell_box );
		GridObj2.SetCellValue("GOAL_RATE", j, dw2_goal_rate );
	}
	re_cal_DW1_rate_sum();
	re_cal_DW2_rate_sum();
	
//	gridArea.style.display = "block";
//	waitArea.style.display = "none";
	
}


/*******************************************   WiseGrid 초기화 및 설정  *****************************************************/

/*┌──────────────────────────────────┐
  │WiseGrid 초기화
  └──────────────────────────────────┘*/
function init() {
	
	GridObj = document.WiseGrid;

	setProperty(GridObj); 	// 기본 property 설정
	setDefault();  			// 추가 property 설정
	setHeader();   			// Header 설정
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// 기본 property 설정
	setDefault2();  			// 추가 property 설정
	setHeader2();   			// Header 설정
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;

	setProperty(GridObj3); 	// 기본 property 설정
	setDefault3();  			// 추가 property 설정
//	setHeader3();   			// Header 설정
			
}

/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault(){
	
	GridObj.bUserContextMenu = true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj.bHDMoving = false;                  		//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj.bHDSwapping = false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 영역에 Row Index를 보여준다. 
	
	GridObj.strRowBorderStyle = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj.strHDFontName = '맑은 고딕';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder 높이
	GridObj.nHDLineSize   = 9;   //12
	
	// Grid 행 높이
    GridObj.nRowHeight    = 9;    //22
    
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2; 
	
	GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       
   
//    /* Context Menu 사용자 MENU 추가 */
//    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 추가");   
 
}

/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj2.bHDMoving = true;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj2.bHDSwapping = false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj2.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector 영역에 Row Index를 보여준다. 
	GridObj2.strRowBorderStyle = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj2.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj2.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '맑은 고딕';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder 높이
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid 행 높이
    GridObj2.nRowHeight    = 12;    //22
    
    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       
 
}

function setDefault3(){
	
	GridObj3.bUserContextMenu = true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj3.bHDMoving = true;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj3.bHDSwapping = false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj3.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex = false;				//Row Selector 영역에 Row Index를 보여준다. 
	GridObj3.strRowBorderStyle = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj3.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj3.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj3.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj3.bStatusbarVisible = false;				// status bar visible
	// Header Font Setting
	GridObj3.strHDFontName = '맑은 고딕';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj3.nCellFontSize = 9;					// Font Size 9
	
	//Hearder 높이
	GridObj3.nHDLineSize   = 12;   //12
	
	// Grid 행 높이
    GridObj3.nRowHeight    = 12;    //22
    
    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205'; 
    
    //헤더의 라인수를 설정한다. 
    GridObj3.nHDLines = 1; 
 	GridObj3.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       
 
}

var preSortKey = "ROWNUM";
// dw1의 sortting기능
function changeSortKey(obj){
	var chk_sort_descend;
	if(document.frm.chk_sort_descend.checked) chk_sort_descend = 'descending';
	else chk_sort_descend = 'asceding';

	GridObj.ClearGroupMerge();  // 병합을 제거한다.
	GridObj.SetColCellSort(preSortKey,'none');
	GridObj.SetColCellSort(obj.value,chk_sort_descend);

	if(obj.value == "ROWNUM") { // 초기화
		doGrouping();
	}
	preSortKey = obj.value; 
}

function changeSortDesc(){
	changeSortKey(document.frm.in_sort_key);
}

function doGrouping(){

	GridObj.bHDMoving = false;	// move header diasable!
	set_GroupMerge_dw1();		// 병합실행!
}


/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader() 
{        


	GridObj.AddHeader("DEPT_CODE"			,"영업지점\n코드"		,"t_text" 		,100	,40  ,false);
	GridObj.AddHeader("DEPT_NAME"			,"영업\n지점"		    ,"t_text" 		,100	,70  ,false);   

 	GridObj.AddHeader("PRE_INFO"			,"전일\n소화율"      	,"t_number" 	,100.1	,45  ,false);   
 	GridObj.AddHeader("PRE_REQT_BOX"		,"전일\n주문"     		,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("PRE_ALLOC_BOX"		,"전일\n배정"   		,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("PRE_CLOSE_RATE"		,"전일\n마감율"      	,"t_number" 	,100.1	,50  ,false);   
 	GridObj.AddHeader("PRE_USE_ALLOC_RATE"	,"전일\n소화율"     	,"t_number" 	,100.1	,50  ,false);   

 	GridObj.AddHeader("PRE_SELL_BOX"		,"전일\n마감"     		,"t_number" 	,100	,45  ,false);   

 	GridObj.AddHeader("PLAN_BOX"			,"판매\n계획"      		,"t_number" 	,100	,45  ,false);   

 	GridObj.AddHeader("CUM_SELL_BOX"		,"예상\n누적"      		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("GOAL_RATE"			,"달성\n율"      		,"t_number" 	,100.1	,40  ,false);   

  	GridObj.AddHeader("ALLOC_RATE"			,"공급\n할당율"      	,"t_number" 	,100.1	,45  ,false);  
 	GridObj.AddHeader("ALLOC_BOX"			,"공급\n할당량"     	,"t_number" 	,100	,50  ,false);   
 	GridObj.AddHeader("REQT_BOX"			,"주문\n수량"     		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("REMN_BOX"			,"배정\n잔량"     		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("USE_ALLOC_RATE"		,"배정\n소화율"     	,"t_number" 	,100.1	,45  ,false);   

	GridObj.AddHeader("EDI_00"			,"EDI"				,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_TOT"			,"EDI"				,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_22"			,"이마트"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_21"			,"HOME\n+"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_23"			,"롯데\n마트"			,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("EDI_ETC"			,"기타"				,"t_number" 	,100	,45  ,false);   
	
	GridObj.AddHeader("REQT_ALLOC_BOX"		,"추가\n요청"      		,"t_number" 	,100	,45  ,false);   
 	GridObj.AddHeader("ADD_ALLOC_BOX"		,"추가\n할당"     		,"t_number" 	,100	,50  ,true);   
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,10  ,false);
 	GridObj.AddHeader("REQT_ALLOC_REASON"	,"추가요청사유"      	,"t_text" 		,300	,200  ,false);   
// 	GridObj.AddHeader("CD_SRC_LOC"	,"C/D거점"      	,"t_text" 		,100	,200  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_02"	,"수도"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_03"	,"부산"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_04"	,"유통"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("ALLOC_ZONE_05"	,"시판"      	,"t_text" 		,10	,30  ,false);   
 	GridObj.AddHeader("CMP_ADD_ALLOC_BOX"	,"추가할당비교"      	,"t_number" 		,10	,0  ,false);   
 
	GridObj.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
	
// rotaiton 컬럼 색깔 정정 	
	GridObj.SetColHDBgColor('PRE_INFO','253|228|229');
	GridObj.SetColHDBgColor('EDI_00','253|228|229');
	
	GridObj.SetCRUDMode("CRUD"); 

	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("DEPT_CODE", true); 
	GridObj.SetColHide("PRE_REQT_BOX", true);
	GridObj.SetColHide("PRE_ALLOC_BOX", true);
	GridObj.SetColHide("PRE_CLOSE_RATE", true);
	GridObj.SetColHide("PRE_USE_ALLOC_RATE", true);

	// 전일 마감율 표시감춤 - 2011.05.19 노효국부장, 이승용대리 협의
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
	
	GridObj.SetColCellFontName('DEPT_NAME','맑은 고딕');
	GridObj.SetColCellFontBold('DEPT_NAME','true');
	
	GridObj.SetColCellBgColor('PLAN_BOX','232|232|255');//판매계획
	GridObj.SetColCellBgColor('CUM_SELL_BOX','232|232|255');//판매계획
	GridObj.SetColCellBgColor('GOAL_RATE','232|232|255');//판매계획

}


/* rotaion 컬럼 데이터 셋팅 */
var pre_info_idx = 0;
var edi_idx = 0;

function HeaderClick_DW1(strColumnKey){

	// wisegrid에 데이터가 없으면 계산하면 안된다.
	if(GridObj.GetRowCount() <= 0) return;
 
	/* 전일정보 rotation */
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
		
		if(pre_info_idx == 2 ) { // 전일마감율
			
			GridObj.SetNumberFormat("PRE_INFO"		, "###,###,##0.0");
			
			var tot_pre_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_REQT_BOX',0,false));
			var tot_pre_sell_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','PRE_SELL_BOX',0,false))
			
			if(tot_pre_reqt_box != 0) {
				GridObj.SetSummaryBarValue('SUMMARY1','PRE_INFO',0,Math.round(tot_pre_sell_box/tot_pre_reqt_box*100*10)/10);
			}
		}
		else if (pre_info_idx == 3) { // 전일소화율

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
	GridObj2.AddHeader("DC_ID"				,"출고장"		,"t_text" 		,100	,40  ,false);   
	GridObj2.AddHeader("DC_NAME"			,"출고장"		,"t_text" 		,100	,40  ,false);   
 	
 	GridObj2.AddHeader("BASE_STOCK"			,"기초\n재고"      	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("CHGO"				,"출고\n예정"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("IPGO"				,"입고\n예정"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("STOCK_EXPT"			,"출고\n가능량"   	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("PLAN_BOX"			,"판매\n계획"		,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("CUM_SELL_BOX"		,"예상\n누적"    ,"t_number" 		,100	,45  ,true);   
 	GridObj2.AddHeader("GOAL_RATE"			,"달성\n율"    ,"t_number" 		,100.1	,35  ,true);   
 	
 	GridObj2.AddHeader("ALLOC_RATE"			,"공급\n할당율"    ,"t_number" 		,100.1	,45  ,true);   
 	GridObj2.AddHeader("ALLOC_BOX"			,"공급\n할당량"    ,"t_number" 		,100	,50  ,true);   
 	GridObj2.AddHeader("NEXT_STOCK"			,"예상\n재고"		,"t_number" 	,100	,50  ,false);   
 
	GridObj2.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
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
	
	GridObj2.SetColCellFontName('DC_NAME','맑은 고딕');
	GridObj2.SetColCellFontBold('DC_NAME','true');
	
	GridObj2.SetColCellBgColor('PLAN_BOX','232|232|255');//판매계획
	GridObj2.SetColCellBgColor('CUM_SELL_BOX','232|232|255');//판매계획
	GridObj2.SetColCellBgColor('GOAL_RATE','232|232|255');//판매계획
}

function setHeader3() 
{        
	
	GridObj3.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA"		,"재고(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA_BOX"	,"재고(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("USE_CAPA_PAL"	,"재고(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj3.AddHeader("BASE_STOCK"		,"당일재고"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj3.AddHeader("CHGO_QTY"		,"출고량"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj3.AddHeader("PROD01_1"		,"조간"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("PROD01_3"		,"주간"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("CONF_STOCK"		,"출고가능"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj3.AddHeader("TRANS_QTY"		,"출고확정"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj3.AddHeader("NEXT_CHGO_QTY"	,"익일출고"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj3.AddHeader("NEXT_TRANS_QTY"	,"익일계획"       	,"t_number" 	,500.3	,50  ,false); //0   
	
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
		 	
		 	GridObj3.AddHeader("PROD_AVAILABLE"	,"생산가능"       	,"t_text" 	,500	,30  ,false); //0   
		
			GridObj3.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
			GridObj3.SetColHide("PROD_AVAILABLE", true);
			
			GridObj3.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // 숫자 형식
			GridObj3.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // 숫자 형식
			GridObj3.SetNumberFormat("PROD01_1", 		 "###,###,###"); // 숫자 형식
			GridObj3.SetNumberFormat("PROD01_3", 		 "###,###,###"); // 숫자 형식
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
			GridObj3.SetColCellFontName('DC_NAME','맑은 고딕');
			GridObj3.SetColCellFontBold('DC_NAME','true');
			
			GridObj3.SetColHDBgColor('TRANS_QTY','253|228|229');

			if(document.frm.itype.value == "HAWA") {
				GridObj3.SetColHide("PROD01_1", true);
				GridObj3.SetColHide("PROD01_3", true);
			}
			
			GridObj3.SetColHide("USE_CAPA_BOX", true);
			GridObj3.SetColHide("USE_CAPA_PAL", true);
			// CAPA추가로 한개컬럼 가린다.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery3();			
		}
	});   
}


/*
10	판매계획
11	판매목표
13	전월실적
14	과거3개월평균
17	과거3개월가중치
18	전년동월
21	실적참조품목
23	사용자
 */
function set_QuotaTypeToHeader(){
	var quotaType = document.frm.insel_allocQoutaType.value;
	var headerName;
	
	if(quotaType == "10") {
		headerName = "판매\n계획";
		GridObj.SetColHide("CUM_SELL_BOX", true); 
		GridObj.SetColHide("GOAL_RATE", true); 
		GridObj2.SetColHide("CUM_SELL_BOX", true); 
		GridObj2.SetColHide("GOAL_RATE", true); 
	}
	else {
		if(quotaType == "11") headerName = "판매\n목표";
		if(quotaType == "13") headerName = "전월\n실적";
		if(quotaType == "14") headerName = "과3\n평균";
		if(quotaType == "17") headerName = "과3\n가중";
		if(quotaType == "18") headerName = "전년\n동월";
		if(quotaType == "21") headerName = "실적\n참조";
		if(quotaType == "23") headerName = "사용\n자";
		GridObj.SetColHide("CUM_SELL_BOX", false); 
		GridObj.SetColHide("GOAL_RATE", false); 
		GridObj2.SetColHide("CUM_SELL_BOX", false); 
		GridObj2.SetColHide("GOAL_RATE", false); 
	}
	
	GridObj.SetColHDText("PLAN_BOX",headerName);
	GridObj2.SetColHDText("PLAN_BOX",headerName);
}


/***********************************************   WiseGrid 통신  **********************************************************/

/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "search");
	
	//-- 서버에 전송할 파라메터 설정 --//
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
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "CRUD");
}

function doQuery_DW1() {
	GridObj.ClearGrid();
	setHeader();

	doQuery();
}

function doQuery2() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "search_DW2");
	
	//-- 서버에 전송할 파라메터 설정 --//
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
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url);
}

function doQuery3() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + 'ip_02060_SalesAllocationNiceLikePlan';
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "search_DW3");
	
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드

	var item_id = document.frm.item_id.value;
	var today = document.frm.today.value;
	var version =  document.frm.today.value.replace("-","").replace("-","");
	var seq = "";
	var itype = document.frm.itype.value;
	//rp_01160 쿼리를 사용하지만 화면에서 받아오는 버전 데이터는 'YYYYMMDD' 형태이다. 'YYYYMMDD.HH.MM' 을 받아온다.
	commonUtil.getSelQeury( "version", document.frm.today.value, "rp_01160_replenishmentNiceLikePlan_DW2_Trans_Version",{
		callback:function(result){

		version = result;
		 			
		}});
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("trans_start", today);
	GridObj3.SetParam("version",version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("itype", itype);
	GridObj3.SetParam("check_day", "TODAY"); // 당일계획
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url);
}


/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function doSave_DW1(cnfm_date, item_id) {

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	// VER 2.0 모든 데이터를 저장하기 위해 CRUD값을 강제로 U로 만든다
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		GridObj.SetCellValue("CRUD",i,"U");
	}
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "save");
	
	//-- 서버에 전송할 파라메터 설정 --//
	GridObj.SetParam("cnfm_date",delDateDelimiter(cnfm_date));
	GridObj.SetParam("item_id",item_id);
	if(document.frm.btnAllocConf.disabled)  // NFOS전송 OK
		GridObj.SetParam("nfos_ok", "Y");
	else
		GridObj.SetParam("nfos_ok", "N");

	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "CRUD");
}


// 영업지점-출고장의 판매지분을 array에 저장한다.
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

/*******************************************   WiseGrid 통신 후  설정  ******************************************************/

/*┌──────────────────────────────────────┐
  │	WiseGrid 통신 후 Grid 설정 및 실행 Fnc
  └──────────────────────────────────────┘*/
function GridEndQuery() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj.GetStatus() != "true") {
//		var error_msg_extra = GridObj.GetMessage();// ?
//		alert("(GridObj)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	setGrid(GridObj); //WiseGrid 설정
			
	//
	var end_mode = GridObj.GetParam("mode");

	if(end_mode == "search") { //조회
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
	// 공급할당기준에 맞는 GRID헤더 이름변경
	set_QuotaTypeToHeader();
	
}

function GridEndQuery2() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	setGrid2(); //WiseGrid 설정
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //조회
		if(GridObj2.GetStatus() == "true") { // 
		}
		
	}
}

function GridEndQuery3() {
		
	setGrid3(); //WiseGrid 설정
			
	var end_mode = GridObj3.GetParam("mode");

	if(end_mode == "search_DW2") { //조회
		if(GridObj3.GetStatus() == "true") { // 
			
		}
	}

}

/*┌──────────────────────────────────┐
  │WiseGrid 설정
  └──────────────────────────────────┘*/
function setGrid(){
	
	pre_info_idx = 0;
	edi_idx = 0;

	GridObj.SetColHDText("PRE_INFO",GridObj.GetColHDText("PRE_USE_ALLOC_RATE"));
	GridObj.SetColHDText("EDI_00",GridObj.GetColHDText("EDI_TOT"));
			
	// 컬럼 배경색
	GridObj.SetColCellBgColor('ALLOC_RATE','250|250|200');
	GridObj.SetColCellBgColor('ALLOC_BOX','250|250|200');
	GridObj.SetColCellBgColor('ADD_ALLOC_BOX','250|250|200');
    
	doGrouping();
}

function set_GroupMerge_dw1() {

	// 컬럼 그룹
//	GridObj.SetColCellSort('DEPT_CODE', 'asceding');
//	GridObj.SetGroupMerge(	'DEPT_CODE,DEPT_NAME'); 
	GridObj.SetColCellSort('ALLOC_ZONE_04','asceding');
	
	GridObj.SetGroupMerge(	'ALLOC_ZONE_04'); 

	
	// 소계(시판/직판)
	GridObj.AddSummaryBar('SUMMARY2', '소계', 'ALLOC_ZONE_04', 'custom', 'DEPT_NAME,PRE_INFO,PRE_REQT_BOX,PRE_ALLOC_BOX,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,REQT_BOX,REMN_BOX,USE_ALLOC_RATE,EDI_00,REQT_ALLOC_BOX,ADD_ALLOC_BOX,REQT_ALLOC_REASON,ALLOC_ZONE_02,ALLOC_ZONE_03,ALLOC_ZONE_04,ALLOC_ZONE_05'); 

	GridObj.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'custom', 'PRE_INFO,PRE_REQT_BOX,PRE_ALLOC_BOX,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,REQT_BOX,REMN_BOX,USE_ALLOC_RATE,EDI_00,REQT_ALLOC_BOX,ADD_ALLOC_BOX'); 


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
	
//	GridObj.SetSummaryBarFont('SUMMARY1', '돋음', '11', true, false, false, false); 
//	GridObj.SetSummaryBarFont('SUMMARY2', '돋음', '11', true, false, false, false); 
	
	
}


function setGrid2(){

	GridObj2.SetColCellBgColor('ALLOC_RATE','250|250|200');
	GridObj2.SetColCellBgColor('ALLOC_BOX','250|250|200');

	// 합계
	GridObj2.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'custom', 'BASE_STOCK,CHGO,IPGO,STOCK_EXPT,PLAN_BOX,GOAL_RATE,ALLOC_RATE,ALLOC_BOX,NEXT_STOCK'); 

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
		// FERT이고 생산가능공장이면 출고가능량을 출고확정량으로 COPY한다.
		if(GridObj3.GetCellValue("PROD_AVAILABLE", i) == "Y" && document.frm.itype.value == "FERT") {
			GridObj3.SetCellBgColor('DC_NAME', i, '202|255|255');
		}
	}	

	// 합계
	GridObj3.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'BASE_STOCK,CHGO_QTY,PROD01_1,PROD01_3,CONF_STOCK,TRANS_QTY,NEXT_CHGO_QTY,NEXT_TRANS_QTY,USE_CAPA,PROD01,PROD02,PROD03,PROD04,PROD05,PROD06,PROD07,PROD08,PROD09,PROD10,PROD11,PROD12'); 
	GridObj3.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
			
}

function re_cal_DW1_rate_sum() {
	
	// wisegrid에 데이터가 없으면 계산하면 안된다.
	if(GridObj.GetRowCount() <= 0) return;

	MetgeCnt = GridObj.GetMergeCount("ALLOC_ZONE_04");

	// 전일소화율
	GridObj.SetNumberFormat("PRE_INFO"		, "###,###,##0.0");
		
	for(i=0;i<MetgeCnt;i++){
		var dept_gubn = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_ZONE_04',i,false));
		/*****************************************************************************/
		if(dept_gubn == 0) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "시판 계   ");
		}else if(dept_gubn == 1) {//유통
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "유통 계   ");
		}else if(dept_gubn == 2) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "CVS 계   ");
		}else if(dept_gubn == 3) { 
			GridObj.SetSummaryBarValue('SUMMARY2','DEPT_NAME',i, "특판 계   ");
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
		
	// 공급할당율
	for(i=0;i<MetgeCnt;i++){
		var part_plan_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','PLAN_BOX',i,false));
		var part_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_BOX',i,false)); //공급할당량
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
	
    // 배정소화율
	for(i=0;i<MetgeCnt;i++){
		var part_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','REQT_BOX',i,false)); //주문수량
		var part_alloc_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY2','ALLOC_BOX',i,false)); //공급할당량

		if(part_alloc_box != 0) {
			GridObj.SetSummaryBarValue('SUMMARY2','USE_ALLOC_RATE',i,Math.round(part_reqt_box/part_alloc_box*100*10)/10);
		}
	}
	
	var tot_reqt_box = strToNum(GridObj.GetSummaryBarValue('SUMMARY1','REQT_BOX',0,false));
	
	if(tot_alloc_box != 0) {
		GridObj.SetSummaryBarValue('SUMMARY1','USE_ALLOC_RATE',0,Math.round(tot_reqt_box/tot_alloc_box*100*10)/10);
	}
	
	// 달성율
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
	
	// wisegrid에 데이터가 없으면 계산하면 안된다.
	if(GridObj2.GetRowCount() <= 0) return;
	
	// 공급할당율
	var tot_plan_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_alloc_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','ALLOC_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj2.SetSummaryBarValue('SUMMARY1','ALLOC_RATE',0,Math.round(tot_alloc_box/tot_plan_box*100*10)/10);
	}
	// 달성율
	var tot_plan_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','PLAN_BOX',0,false));
	var tot_cum_sell_box = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','CUM_SELL_BOX',0,false))
	if(tot_plan_box != 0) {
		GridObj2.SetSummaryBarValue('SUMMARY1','GOAL_RATE',0,Math.round((tot_cum_sell_box)/tot_plan_box*100*10)/10);
	}
	
}

/*********************************************   WiseGrid Event   *********************************************************/ 
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if( strColumnKey == "ALLOC_BOX") {
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // 지점 판매계획
		//var dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // 지점 공급할당량
		var dept_alloc_box = strToNum(nNewValue); // 지점 공급할당량
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - strToNum(nOldValue) + dept_alloc_box; // 지점 누적판매

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
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // 지점 판매계획
		var old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // 지점 공급할당량
		var dept_alloc_rate = strToNum(GridObj.GetCellValue("ALLOC_RATE", nRow)); // 지점 공급할당율
		var dept_alloc_box = Math.round(dept_plan_box*dept_alloc_rate/100);				
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - old_dept_alloc_box + dept_alloc_box; // 지점 누적판매
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
		// 판매계획을 가져온다
		var dept_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", nRow)); // 지점 판매계획
		var old_dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // 지점 공급할당량
		
		// 기존 공급할당량을 가져온다
		var dept_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", nRow)); // 지점 공급할당량
		// 이전 추가할당량을 가져온다.
		var old_add_dept_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", nRow)); // 추가할당박스
		// 변경된 추가할당량을 가져온다.
		var add_dept_alloc_box = strToNum(GridObj.GetCellValue("ADD_ALLOC_BOX", nRow)); // 추가할당박스
		dept_alloc_box = dept_alloc_box - old_add_dept_alloc_box + add_dept_alloc_box;				
		var new_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", nRow)) - old_dept_alloc_box + dept_alloc_box; // 지점 누적판매
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
		GridObj.SetCellHiddenValue("ADD_ALLOC_BOX", nRow, add_dept_alloc_box); // 추가할당량 backup
		GridObj.SetCellValue("CUM_SELL_BOX", nRow, new_cum_sell_box);
		GridObj.SetCellValue("GOAL_RATE", nRow, dept_goal_rate);
	}
//	ReCalculation_DW2();
	re_cal_DW1_rate_sum();
}

/*┌──────────────────────────────────┐
  │WiseGrid2 Cell Change Event
  └──────────────────────────────────┘*/
function GridChangeCell_DW2(strColumnKey, nRow, nOldValue, nNewValue) {

	// DC기준으로 공급할당량을 배분할 경우 무조건 차이(신규할당량 - 이전할당량)수량만큼 판매지분에 의해 분배한다.
	// 단 기존 DB상에 존재하는 공급할당량도 무시하게 되고, DW1이 변경될 때는 DW2가 모두 재분배 되게 된다.

	if(document.frm.btnAllocConf.disabled) { // NFOS전송 OK
		// DC_ID를 구한다.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", nRow);
		// DC판매계획을 구한다
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", nRow));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_add_alloc_box=0, dw1_old_add_alloc_box=0, dw1_new_add_alloc_box=0;
		var dw1_alloc_rate = 0, dw2_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;
		
		if( strColumnKey == "ALLOC_BOX") {
			// DC공급할당량을 구한다.
			var dw2_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", nRow));
		}	
		else if(strColumnKey == "ALLOC_RATE") {
			// DC공급할당율을 구한다.
			var dw2_alloc_rate = strToNum(GridObj2.GetCellValue("ALLOC_RATE", nRow));
			// DC공급할당율과 DC판매계획을 이용해서 DC공급할당량을 구한다.
			var dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100);
			// OLD값과의 차이를 구한다. 이것을 추가할당량으로 사용할 것이다.
		}
		// OLD DC공급할당량을 구한다.  HIDDEN에 감춰져있다. DB에 저장된 값이다
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", nRow));
		// OLD값과의 차이를 구한다. 이것을 추가할당량으로 사용할 것이다.
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;

		// DW1을 LOOP하면서 해당 DC의 지점들을 구한다.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D연산일 경우
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D연산이 아닌경우
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}
				
				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// 영업지점의 판매계획을 가져온다.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// 영업지점 공급할당량을 가져온다.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// 영업지점 추가 공급할당량을 가져온다.
					dw1_add_alloc_box = strToNum(GridObj.GetCellValue("ADD_ALLOC_BOX", i));
					
					// 영업지점 추가 공급할당량을 가져온다.
					dw1_old_add_alloc_box = strToNum(GridObj.GetCellHiddenValue("ADD_ALLOC_BOX", i));
					
					// 영업지점-출고장 판매지분을 이용하여 DW1의 공급할당량을 결정한다.
					dw1_new_add_alloc_box = Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					// 영업지점 공급할당량에  추가공급할당량을 더해서 셋팅한다.
					GridObj.SetCellValue("ALLOC_BOX",i,dw1_alloc_box + dw1_new_add_alloc_box);
					// 추가공급할당량에 추가공급할당량을 더해서 셋팅한다.
					GridObj.SetCellValue("ADD_ALLOC_BOX",i,dw1_add_alloc_box + dw1_new_add_alloc_box);
					// 추가공급할당량을 HIDDEN에도 셋팅한다.
					GridObj.SetCellHiddenValue("ADD_ALLOC_BOX",i,dw1_add_alloc_box + dw1_new_add_alloc_box);
					// 영업지점 공급할당율을 구한다.
					
					dw1_cum_sell_box = strToNum(GridObj.GetCellValue("CUM_SELL_BOX", i)) + dw1_alloc_box + dw1_new_add_alloc_box; 
					if(dw1_plan_box > 0) {
						dw1_alloc_rate = Math.round((dw1_alloc_box + dw1_new_add_alloc_box) / dw1_plan_box*100*10)/10;
						dw1_goal_rate = Math.round(dw1_cum_sell_box/ dw1_plan_box*100*10)/10;;
					}	
					else {
						dw1_alloc_rate = 0;
						dw1_goal_rate = 0;
					}	
					// 영업지점 공급할당율을 셋팅한다.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC공급할당량을 보정하기 위해 영업지점 공급할당량을 저장한다.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_add_alloc_box;
				}
			}
		}
		// 최종적인 DC공급할당량을 DW2에 셋팅한다.
		GridObj2.SetCellValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// 최종적인 DC공급할당량을 DW2의 HIDDEN에도 셋팅한다.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// DC판매계획과 최종적인 DC공급할당량을 이용하여 DC공급할당율을 구한다.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", nRow)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC공급할당율을 셋팅한다.
		GridObj2.SetCellValue("ALLOC_RATE", nRow, dw2_alloc_rate);
		GridObj2.SetCellValue("CUM_SELL_BOX", nRow, dw2_cum_sell_box );
		GridObj2.SetCellValue("GOAL_RATE", nRow, dw2_goal_rate );
	}
	else { // NFOS전송 전
		// DC_ID를 구한다.
		var dw2_dc_id = GridObj2.GetCellValue("DC_ID", nRow);
		// DC판매계획을 구한다
		var dw2_plan_box = strToNum(GridObj2.GetCellValue("PLAN_BOX", nRow));
		var dw1_dc_id;
		var dw1_plan_box = 0, dw1_alloc_box = 0, dw1_new_alloc_box =0;
		var dw1_alloc_rate = 0, dw2_alloc_rate = 0, dw1_goal_rate = 0, dw2_goal_rate = 0;
		var dw1_cum_sell_box = 0, dw2_cum_sell_box = 0;
		var	dw1_dept_code, temp_dept_code;

		if( strColumnKey == "ALLOC_BOX") {
			// DC공급할당량을 구한다.
			var dw2_alloc_box = strToNum(GridObj2.GetCellValue("ALLOC_BOX", nRow));
		}	
		else if(strColumnKey == "ALLOC_RATE") {
			// DC공급할당율을 구한다.
			var dw2_alloc_rate = strToNum(GridObj2.GetCellValue("ALLOC_RATE", nRow));
			// DC판매계획으로 DC공급할당량을 구한다.
			var dw2_alloc_box = Math.round(dw2_plan_box * dw2_alloc_rate / 100); 
		}
		// OLD DC공급할당량을 구한다.  HIDDEN에 감춰져있다. DB에 저장된 값이다
		var dw2_old_alloc_box = strToNum(GridObj2.GetCellHiddenValue("ALLOC_BOX", nRow));
		var dw2_add_alloc_box = dw2_alloc_box - dw2_old_alloc_box;
		var temp_dc_alloc_box = dw2_old_alloc_box;
		
		// DW1을 LOOP하면서 해당 DC의 지점들을 구한다.
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			
			dw1_dept_code = GridObj.GetCellValue("DEPT_CODE", i);
			for(k=0;k<document.frm.quota_dept_code.length;k++) {
				// C/D연산일 경우
				if(document.frm.chk_sel_20.checked == true) {
					dw1_dc_id = document.frm.quota_cdc_id[k].value;
				}
				// C/D연산이 아닌경우
				else {
					dw1_dc_id = document.frm.quota_dc_id[k].value;
				}

				temp_dept_code = document.frm.quota_dept_code[k].value;
				if(dw1_dc_id == dw2_dc_id && dw1_dept_code == temp_dept_code) {
					
					// 영업지점의 판매계획을 가져온다.
					dw1_plan_box = strToNum(GridObj.GetCellValue("PLAN_BOX", i));
					// 영업지점 공급할당량을 가져온다.
					dw1_alloc_box = strToNum(GridObj.GetCellValue("ALLOC_BOX", i));
					// 영업지점-출고장 판매지분을 이용하여 DW1의 공급할당량을 결정한다.
					dw1_new_alloc_box = dw1_alloc_box + Math.round(strToNum(document.frm.quota_dc_rate[k].value) * dw2_add_alloc_box);
					
					// 영업지점 공급할당량에  추가공급할당량을 더해서 셋팅한다.
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
					// 영업지점 공급할당율을 셋팅한다.	
					GridObj.SetCellValue("ALLOC_RATE",i,dw1_alloc_rate);
					GridObj.SetCellValue("CUM_SELL_BOX", i, dw1_cum_sell_box );
					GridObj.SetCellValue("GOAL_RATE",i,dw1_goal_rate);

					// DC공급할당량을 보정하기 위해 영업지점 공급할당량을 저장한다.
					temp_dc_alloc_box = temp_dc_alloc_box + dw1_new_alloc_box - dw1_alloc_box;
				}
			}
		}
		// 최종적인 DC공급할당량을 DW2에 셋팅한다.
		GridObj2.SetCellValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// 최종적인 DC공급할당량을 DW2의 HIDDEN에도 셋팅한다.
		GridObj2.SetCellHiddenValue("ALLOC_BOX",nRow,temp_dc_alloc_box);
		// DC판매계획과 최종적인 DC공급할당량을 이용하여 DC공급할당율을 구한다.
		dw2_cum_sell_box = strToNum(GridObj2.GetCellValue("CUM_SELL_BOX", nRow)) - dw2_old_alloc_box + temp_dc_alloc_box;
		if(dw2_plan_box>0) {
			dw2_alloc_rate = Math.round(temp_dc_alloc_box/ dw2_plan_box*100*10)/10;
			dw2_goal_rate = Math.round(dw2_cum_sell_box/ dw2_plan_box*100*10)/10;
		}
		else {
			dw2_alloc_rate = 0;
			dw2_goal_rate = 0;
		}
		// DC공급할당율을 셋팅한다.
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

/*┌──────────────────────────────────┐
  │WiseGrid Cell Click Event
  └──────────────────────────────────┘*/
function GridRowActivate(nRow){
	// DW1과 DW2가 서로 영향을 줄때 이 EVENT가 동시에 호출되는 것 방지
	if(grid_move_lock) grid_move_lock = false;
	else return;

//	var dc_id = GridObj.GetCellValue("DC_ID", nRow);

	// DW2의 배송지점을 찾는다
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

/*┌──────────────────────────────────┐
  │WiseGrid Cell Click Event
  └──────────────────────────────────┘*/
function Grid2RowActivate(nRow){
	// DW1과 DW2가 서로 영향을 줄때 이 EVENT가 동시에 호출되는 것 방지
	if(grid_move_lock) grid_move_lock = false;
	else return;

/*	var dc_id = GridObj2.GetCellValue("DC_ID", nRow);

	// DW1의 배송지점을 찾는다
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

/*********************************************   기타 Function   **********************************************************/
/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
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
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
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
