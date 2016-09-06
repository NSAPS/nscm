//############################################################
//## 프로그램ID 	: rp_01160_replenishmentNiceLikePlan.js
//## 프로그램명 	: 자동공급계획
//## 개발자  	: 남웅용
//## 개발일자 	: 2009-11-19
//##
//## 관련 job file 	 : 
//##
//## 관련 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-11-19  남웅용     rp_01160_replenishmentNiceLikePlan.js 개발
//##
//## 2.0		2010-05-12  남웅용	  수출 물량이 존재하는 부산배송은 보충량이 계산되지 않도록 
//##									막는다. 
//##								  ord_no를 '7'로 옮겨서 계산시 제외되도록 하고 나중에 복귀시킨다.
//##									부산배송외에 추가하려면 if문에 추가시키면 된다.
//## 3.0		2010-08-23  남웅용	  수도권/부산권 할당량 계산시 해당권역 배송지점이 아닌곳은 ord_no를 '7'으로 셋팅하고 나중에 복귀한다.
//##			
//## 3.1		2010-09-07  남웅용	  재고일수 평준화를 위해 DO WHILE문으로 배분을 반복한다.
//## 3.2		2012-01-03  남웅용	  판매계획컬럼 제거, 안전재고설정 컬럼 맨뒤 --> 이승용요청
//## 3.3		2014-09-26  이강욱	  이벤트 물량 기능 추가 -->이승용 요청
//## 3.4		2016-09-06  남웅용    거래처수 총합/CDC합계/RDC합계 구현
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;													// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// 서블릿 패키지(class 파일 경로)
var job_id = 'rp_01160_replenishmentNiceLikePlan';				// job id(서블릿 명, WiseGrid Header key)
var GridObj ; 												// WiseGrid 객체
var GridObj2;

var color_tot = '224|224|224';
var color_edit_col = '255|253|208';

var oldRow = 0;

var rFirst = 0;


/*function check_status(){
	alert("check_select_DW1 = " + check_select_DW1 + "\n" +
	"check_select_DW2 = " + check_select_DW2 + "\n" +
	"check_select_DW3 = " + check_select_DW3 + "\n" +
	"check_save_DW1 = " + check_save_DW1 + "\n" +
	"check_save_DW2 = " + check_save_DW2 + "\n" +
	"check_save_DW3 = " + check_save_DW3 + "\n");
}
*/
/******************************************          Action Function         **********************************************/
/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
function GoSearch(service) {
	

	var versions_seq = document.frm.plan_version.value;
	if( versions_seq == "" || versions_seq == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
		alert("수송일자를 입력하여 주십시요.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("제품코드를 입력하여 주십시요.");
		return;
	}

	if(check_select_DW1||check_select_DW2||check_select_DW3||check_save_DW1||check_save_DW2||check_save_DW3) {
		alert("조회작업중입니다(GoSearch)! 완료된후 다시하세요!");
		return;
	}
	check_select_DW1 = true;
	check_select_DW2 = true;
	check_select_DW3 = true;
			
	var verArr = versions_seq.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	rFirst = 0;
	// 현재 조회한 version,수송일자,품목 저장
	document.frm.curr_item_id.value 	= document.frm.item_id.value;
	document.frm.curr_version.value 	= document.frm.version.value;
	document.frm.curr_trans_start.value = document.frm.trans_start.value;
	
	// 화면 초기화
	document.frm.confirm_qty.value = "";
	document.frm.in_sort_key.value = "ROWNUM";
	document.frm.chk_sort_descend.checked = false;
	
	// FERT와 HAWA여부에 따라서 달라질 수 있으므로 다시 BOUND한다.
	//GridObj2.ClearGrid();
	//setHeader2();
	
	doQuery();
	//doQuery2();  dwr을 사용하므로 setHeader2 안에서 호출해야 한다.
	//doQuery3();

//	document.frm.btnReg.disabled = false;
	
};

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function GoSave() {

	if(check_select_DW1||check_select_DW2||check_select_DW3) {
		alert("조회작업중입니다(GoSave)! 완료된후 다시하세요!");
		return;
	}
	
	if(check_save_DW1||check_save_DW2||check_save_DW3) {
		alert("저장작업중입니다(GoSave)! 완료된후 다시하세요!");
		return;
	}
	
	var version 	 	 = document.frm.version.value;
	var seq 		 	 = document.frm.seq.value;
	var trans_date   	 = document.frm.trans_start.value;
	var item_id 		 = document.frm.item_id.value;
	var scm_charge		 = document.frm.scm_charge.value;
	var curr_item_id 	 = document.frm.curr_item_id.value;
	var curr_version 	 = document.frm.curr_version.value;
	var curr_trans_start = document.frm.curr_trans_start.value;
	var frc_qty 		 = document.frm.frc_qty.value;		// 사용자 예측량 //
	
	// 버전, 차수를 선택하지 않은 경우
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("버전을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( trans_date == null || trans_date == ""){
		alert("수송일자를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("제품 코드를 먼저 입력하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}

	if( version != curr_version){
		alert("저장하려는 version이 현재 작업한 version과 다릅니다. 조회후 다시하십시요.");
		return;
	}	

	if( trans_date != curr_trans_start){
		alert("저장하려는 수송일자가 현재 작업한 수송일자와 다릅니다. 조회후 다시하십시요.");
		return;
	}	

	if( item_id != curr_item_id){
		alert("저장하려는 품목이 현재 작업한 품목과 다릅니다. 조회후 다시하십시요.");
		return;
	}	

	// 신규 제품의 공급할당 작업을 해야할 경우 저장을 허용한다.
	if(GridObj.GetRowCount( ) == 0 && GridObj2.GetRowCount( ) == 0){
		doSave_DW3(document.frm.item_id.value);
		return;
	}
	
	var tot_require_qty=0;
	var ord_no;
	var src_loc;
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  //
		src_loc 	= GridObj.GetCellValue("SRC_LOC", i);  //
		// 사용자가 CDC까지 결정할 물량은 합산하지 않고 비교한다.
		if((ord_no == "2" || ord_no == "4") && (src_loc != null || src_loc != "")) {
			tot_require_qty = tot_require_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
		}
	}
	if(GridObj2.GetRowCount() > 0) {
		var confirm_trans_qty = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true));
	}
	else {
		var confirm_trans_qty = 0;
	}
	

// 계획삭제도 될 수 있도록 막았다.
//	if(confirm_trans_qty <= 0) {
//		alert("출고확정량이 없습니다! 확인후 다시 저장하세요!");
//		return;
//	}

//	if(tot_require_qty <= 0) {
//		alert("보충요구량이 없습니다! 확인후 다시 저장하세요!");
//		return;
//	}

	// 1. DW2에서 확정된 총량과 보충요구량과 비교해서 더 큰 박스를 진행하려고 할때는 확인 메세지를 표시한다.
	if(tot_require_qty > confirm_trans_qty) { 
		alert("출고확정량("+numberFormat(confirm_trans_qty)+")보다 보충요구량("+numberFormat(tot_require_qty)+")이 큽니다! \n 조정후 다시 저장하세요!");
		return;
	}

//	document.frm.btnReg.disabled = true;

	doSave_DW2(version, seq, trans_date, item_id);
		
};

function doChange2(obj){
	
	var scm_charge  = obj.value;
	var version 	= document.frm.version.value;
	var trans_date  = document.frm.trans_start.value;
	var in_div;
	
	
	commonUtil.getSelQeury("scm_charge!%!version!%!trans_date",scm_charge+"!%!"+version+"!%!"+trans_date,"rp_01160_replenishmentNiceLikePlan_ITEM_LIST", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"item_id\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			//in_div +=	"<option value="+arrList[i][0]+">"+arrList[i][1]+"</option>";
			in_div +=	"<option value="+arrList[i][0];
			if(arrList[i][6] == "1") { // 계획 저장 품목
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
		}	

		divItemCombo.innerHTML = in_div;
		// 품목cnt정보를 셋팅한다.
		document.frm.item_info.value 	 = arrList[selected_row][2];
		document.frm.box_per_palet.value = arrList[selected_row][3];
		document.frm.itype.value 		 = arrList[selected_row][4];
		document.frm.cd_gubn.value 	 	 = arrList[selected_row][5];

		document.frm.item_id.focus(); 
		
		doChange4();
	}
	});
}

function doChange3(obj){
	document.frm.item_info.value 		= document.frm.item_cnt_info[obj.options.selectedIndex].value;	
	document.frm.box_per_palet.value 	= document.frm.box_per_palet_cnt[obj.options.selectedIndex].value;	
	document.frm.itype.value 			= document.frm.itype_cnt[obj.options.selectedIndex].value;	
	document.frm.cd_gubn.value 			= document.frm.cd_gubn_cnt[obj.options.selectedIndex].value;
	
	doChange4();
}

function doChange4(){

	var version 	= document.frm.version.value;
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "version!%!item_id", version+"!%!"+item_id, "rp_01160_get_Leading_Indicator_qty",{
		callback:function(result){

	 		document.frm.ld_idc.value = numberFormat(result[0][0]);
	
		}
	});   
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

		if(obj == document.frm.confirm_qty) {
			Do_DC_Allocate(obj);
		}
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

function execute_scm_charge_setup(gubn){

	var item_id   = document.frm.item_id.value;
	var item_name = document.frm.item_id.options[document.frm.item_id.selectedIndex].text;
	if(gubn == "SETUP")	{
		var user_id	= document.frm._user_id.value;
		if(confirm(item_name+"을 담당품목으로 설정하시겠습니까?") == 1 ){
			commonUtil.executeQuery("item_id!%!user_id", item_id+"!%!"+user_id, "rp_01160_UPDATE_SCM_CHARGE", success);
		}
	}
	else {
		//var user_id;
		if(confirm(item_name+"을 담당품목을 해지하시겠습니까?") == 1 ){
			commonUtil.executeQuery("item_id!%!user_id", item_id+"!%!", "rp_01160_UPDATE_SCM_CHARGE", success);
		}
	}
	
}


result = function(data) {
		alert(data);

}


success = function(data) {
	if (data == "SUCCESS") {
		alert("저장되었습니다.");
	}
}

function	ChangeSize_DW1(obj) {
	
	if(obj.value == "축소") {
		// HEADER FONT SIZE
		GridObj.nHDFontSize = 8;
		// Cell FONT SIZE
		GridObj.nCellFontSize = 8;

		GridObj.SetColWidth("PRE_MONTH_SELL"		,52);
		GridObj.SetColWidth("SALES_PRE"			    ,46);
		GridObj.SetColWidth("SALES_PRE_CUM"		    ,52);
		GridObj.SetColWidth("SALES_PLAN"			,46);
		GridObj.SetColWidth("ISSUE"				    ,46);
		GridObj.SetColWidth("SALES_MEAN_1WEEK"	    ,46);
		GridObj.SetColWidth("SALES_MEAN_3WEEK"	    ,46);
		GridObj.SetColWidth("BASE_STOCK"			,50);
		GridObj.SetColWidth("RECEIPT"				,46);
		GridObj.SetColWidth("CHGO_QTY"			    ,46);
		GridObj.SetColWidth("STOCK_DAY"			    ,37);
		GridObj.SetColWidth("STOCK_TERM"			,37);
		GridObj.SetColWidth("SAFETY_STOCK"		    ,46);
		GridObj.SetColWidth("SALES_PLAN_D1"		    ,46);
		GridObj.SetColWidth("ISSUE_D1"			    ,46);
		GridObj.SetColWidth("STOCK_EXPT"			,50);
		GridObj.SetColWidth("REP_QTY"				,46);
		GridObj.SetColWidth("SRC_LOC"				,46);
		GridObj.SetColWidth("MIN_PICK_QTY"		    ,37);
		GridObj.SetColWidth("NEXT_STOCK_DAY_1W"		,37);
		GridObj.SetColWidth("NEXT_STOCK_DAY_3W"		,37);
		GridObj.SetColWidth("NEXT_STOCK_EXPT"		,50);
		GridObj.SetColWidth("EDI_00_D1"			    ,46);
		GridObj.SetColWidth("EDI_00_D2"			    ,46);
		
		obj.value = "확대";
	}
	else {
		// HEADER FONT SIZE
		GridObj.nHDFontSize = 9;
		// Cell FONT SIZE
		GridObj.nCellFontSize = 9;

		GridObj.SetColWidth("PRE_MONTH_SELL"		,55);
		GridObj.SetColWidth("SALES_PRE"			    ,55);
		GridObj.SetColWidth("SALES_PRE_CUM"		    ,55);
		GridObj.SetColWidth("SALES_PLAN"			,55);
		GridObj.SetColWidth("ISSUE"				    ,55);
		GridObj.SetColWidth("SALES_MEAN_1WEEK"	    ,55);
		GridObj.SetColWidth("SALES_MEAN_3WEEK"	    ,55);
		GridObj.SetColWidth("BASE_STOCK"			,55);
		GridObj.SetColWidth("RECEIPT"				,55);
		GridObj.SetColWidth("CHGO_QTY"			    ,55);
		GridObj.SetColWidth("STOCK_DAY"			    ,40);
		GridObj.SetColWidth("STOCK_TERM"			,40);
		GridObj.SetColWidth("SAFETY_STOCK"		    ,55);
		GridObj.SetColWidth("SALES_PLAN_D1"		    ,55);
		GridObj.SetColWidth("ISSUE_D1"			    ,55);
		GridObj.SetColWidth("STOCK_EXPT"			,55);
		GridObj.SetColWidth("REP_QTY"				,55);
		GridObj.SetColWidth("SRC_LOC"				,55);
		GridObj.SetColWidth("MIN_PICK_QTY"		    ,40);
		GridObj.SetColWidth("NEXT_STOCK_DAY_1W"		,55);
		GridObj.SetColWidth("NEXT_STOCK_DAY_3W"		,55);
		GridObj.SetColWidth("NEXT_STOCK_EXPT"		,55);
		GridObj.SetColWidth("EDI_00_D1"			    ,55);
		GridObj.SetColWidth("EDI_00_D2"			    ,55);
		
		obj.value = "축소";
	}
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
//	setHeader2();   			// Header 설정
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); 		// 기본 property 설정
	setDefault3();  			// 추가 property 설정
	setHeader3();   			// Header 설정
			
}
/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault(){
	
	GridObj.bUserContextMenu 	= true;					//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj.bHDMoving 		 	= false;                //사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj.bHDSwapping 	 	= false;                //헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex   = false;				//Row Selector 영역에 Row Index를 보여준다. 
	
	GridObj.strRowBorderStyle   = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
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
	GridObj.nCellFontSize = 9;				// Font Size 9
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
   
    ///* Context Menu 사용자 MENU 추가 */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 추가");   
 
}

/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault2(){
	
	GridObj2.bUserContextMenu 	 	= true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj2.bHDMoving 			 	= true;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj2.bHDSwapping 		 	= false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj2.bRowSelectorVisible 	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex   	= false;				//Row Selector 영역에 Row Index를 보여준다. 
	GridObj2.strRowBorderStyle   	= "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj2.strHDClickAction 		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj2.strActiveRowBgColor 	= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj2.bStatusbarVisible 		= false;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName 			= '맑은 고딕';
	GridObj2.nHDFontSize 			= 8;				  	// Font Size 9
	GridObj2.bHDFontBold 			= true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize 			= 9;					// Font Size 9
	
	//Hearder 높이
	GridObj2.nHDLineSize   			= 12;   //12
	
	// Grid 행 높이
    GridObj2.nRowHeight    			= 12;    //22
    
    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines 				= 1; 
 
}

/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault3(){
	
	GridObj3.bUserContextMenu 		= true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj3.bHDMoving 				= false;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj3.bHDSwapping 			= false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj3.bRowSelectorVisible 	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex 		= false;				//Row Selector 영역에 Row Index를 보여준다. 
	GridObj3.strRowBorderStyle 		= "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj3.nRowSpacing 			= 0;                    	//RowSpacing값을 정한다. 
	GridObj3.strHDClickAction 		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj3.strActiveRowBgColor 	= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj3.bStatusbarVisible 		= false;				// status bar visible
	// Header Font Setting
	GridObj3.strHDFontName 			= '맑은 고딕';
	GridObj3.nHDFontSize 			= 8;				  	// Font Size 9
	GridObj3.bHDFontBold 			= true; 
	
	// Cell Font Setting
	GridObj3.nCellFontSize 			= 8;					// Font Size 9
	GridObj3.strCellFontName 		= '맑은 고딕'; 
	
	//Hearder 높이
	GridObj3.nHDLineSize   			= 12;   //12
	
	// Grid 행 높이
    GridObj3.nRowHeight    			= 12;    //22
    
    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205';  
    
    //헤더의 라인수를 설정한다. 
    GridObj3.nHDLines 				= 1; 
    
    
    // Context Menu 사용자 MENU 추가 2012-05-30 SCM팀 이승용 대리 요청
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU00","안전"); 		//00//
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU01","전국"); 		//01//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU02","수도"); 		//02//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU03","부산");		//03//
	
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU04","유통");		//04//
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU05","시판");		//05//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU06","CVS");		//06//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU07","유통+CVS");	//07//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU08","CVS+시판");	//08//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU09","유통+시판");	//09//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU10","특판");		//10//		//2012-12-28 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU11","특판+시판");	//11//		//2012-12-28 SCM침 이승용 대리 요청//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU11","제주");	//11//		//2012-12-28 SCM침 이승용 대리 요청//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU12","사용자");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU13","사용자2");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU14","사용자3");	//11//		//2015-10-24 SCM침 이승용 대리 요청//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU15","사용자4");	//11//		//2015-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU14","사용자4");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU15","사용자5");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU16","사용자6");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU17","사용자7");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU18","사용자8");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU19","사용자9");	//11//		//2014-10-24 SCM침 이승용 대리 요청//
 	
 	
	/* 안전->전국(01)->유통(04)->시판(05)->수도(02)->부산(03) ->		//
	// 추가 CVS(06)-> 유통+CVS(07) -> CVS+시판(08)-> 유통+시판 (09) */

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

	if(document.frm.chk_do_grouping.checked) {
		GridObj.bHDMoving = false;	// move header diasable!
		set_GroupMerge_dw1();		// 병합실행!
	}
	else {

		GridObj.ClearGroupMerge();  // 병합을 제거한다.
		GridObj.bHDMoving = true;	// move header available! 
	}
}


/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader() 
{        

	GridObj.AddHeader("DC_ID"					,"입고장"		    		,"t_text" 		,100	,50  ,false);	//기존 //   
	GridObj.AddHeader("DC_NAME"					,"입고장"		    		,"t_text" 		,100	,60  ,false);   //기존 //

	GridObj.AddHeader("GOAL_00"					,"판매목표"      			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_11"					,"판매목표"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_13"					,"전월실적"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_14"					,"과3평균"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_17"					,"과3가중"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_18"					,"전년동월"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_21"					,"실적참조"     			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("GOAL_23"					,"사용자"      			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	
 	GridObj.AddHeader("RATE_00"					,"달성율\n(%)"      		,"t_number" 	,100.3	,42  ,false);   //기존 //
 	GridObj.AddHeader("RATE_11"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_13"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_14"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_17"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_18"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_21"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("RATE_23"					,"달성율\n(%)"      		,"t_number" 	,100.3	,45  ,false); 	//기존 //

 	GridObj.AddHeader("SUPPLY_RATE"				,"공급율\n(%)"   			,"t_number" 	,100.3	,45  ,false); 	//기존 //
 	GridObj.AddHeader("SUPPLY_RATE_BOX"			,"가감량"      			,"t_number" 	,100.3	,45  ,false); 	//기존 //

 	GridObj.AddHeader("PRE_MONTH_SELL"			,"전월판매"      			,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("PRE_MONTH_SELL_00"		,"전월판매 "      		,"t_number" 	,100.3	,60  ,false);   //기존 //
 	GridObj.AddHeader("PRE_MONTH_SELL_01"		,"전월판매 일반"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("PRE_MONTH_SELL_02"		,"전월판매\n시판  일반"     ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("PRE_MONTH_SELL_03"		,"전월판매\n유통 일반"     	,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("PRE_MONTH_SELL_04"		,"전월판매\n타계정"   		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("PRE_MONTH_SELL_05"		,"전월판매\n시판 타계정"   	,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("PRE_MONTH_SELL_06"		,"전월판매\n유통 타계정"   	,"t_number" 	,100.3	,55  ,false);   //추가 //
 	
 	GridObj.AddHeader("SALES_PLAN"				,"판매계획"      			,"t_number" 	,100.3	,0   ,false);  
 	 
 	GridObj.AddHeader("SALES_PRE_CUM"			,"판매누계"      			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_CUM_00"		,"판매누계 " 	    		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_CUM_01"		,"판매누계 일반"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_CUM_02"		,"판매누계\n시판 일반"      ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_CUM_03"		,"판매누계\n유통 일반"      ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_CUM_04"		,"판매누계\n타계정"    	,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_CUM_05"		,"판매누계\n시판 타계정"    ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_CUM_06"		,"판매누계\n유통 타계정"    ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	
 	
 	GridObj.AddHeader("SALES_PRE"				,"전일판매"      			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_00"			,"전일판매 "     			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_01"			,"전일판매 일반"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_02"			,"전일판매\n시판 일반"      ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_03"			,"전일판매\n시판 일반"      ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_04"			,"전일판매\n타계정"    	,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PRE_05"			,"전일판매\n시판 타계정"    ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("SALES_PRE_06"			,"전일판매\n유통 타계정"    ,"t_number" 	,100.3	,55  ,false);   //추가 //
 	 	
 	 
 	GridObj.AddHeader("ISSUE"					,"판매주문"      			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_00"				,"판매주문" 				,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_YO"				,"판매주문\n일반"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_YS"				,"판매주문\n회송"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_TA"				,"판매주문\n타계정"   		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_WMS"				,"판매주문\n부서타"		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_EX"				,"판매주문\n수출"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	
 	
 	GridObj.AddHeader("ISSUE_CUST_00"			,"유통채널\n총합"  		,"t_number" 	,100.3	,60  ,true);  	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_TOT"			,"유통채널\n총합"  		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_10"			,"유통채널\n특약점"   		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_11"			,"유통채널\n직거래"   		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_16"			,"유통채널\n대형마트" 		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_14"			,"유통채널\n슈퍼체인" 		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_19"			,"유통채널\n농협"   		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_18"			,"유통채널\nCVS"   		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	GridObj.AddHeader("ISSUE_CUST_99"			,"유통채널\n기타"   		,"t_number" 	,100.3	,0   ,true);   	//추가 //
 	
 	 	
 	//GridObj.AddHeader("SALES_MEAN_1"			,"1주평균"				,"t_number" 	,100.3	,50  ,false);   //2013-05-29 추가 //
 	GridObj.AddHeader("SALES_MEAN_1WEEK_1"		,"1주평균\n(타계정)"		,"t_number" 	,100.3	,50  ,false);   //기존 //
 	GridObj.AddHeader("SALES_MEAN_1WEEK_ETC"	,"1주평균\n(타계정)"		,"t_number" 	,100.3	,0  ,false);   //기존 //
 	GridObj.AddHeader("SALES_MEAN_1WEEK"		,"1주평균"				,"t_number" 	,100.3	,0  ,false);   //기존 //
 	
 	
 	GridObj.AddHeader("SALES_MEAN_3WEEK_3"		,"3주평균\n(타계정)"		,"t_number" 	,100.3	,50  ,false);   //2013-05-29 추가 //
 	GridObj.AddHeader("SALES_MEAN_3WEEK_ETC"	,"3주평균\n(타계정)"		,"t_number" 	,100.3	,0  ,false);   //기존 //
 	GridObj.AddHeader("SALES_MEAN_3WEEK"		,"3주평균	"				,"t_number" 	,100.3	,0  ,false);   //기존 //
 	
		
	GridObj.AddHeader("BASE_STOCK"				,"당일\n재고"      		,"t_number" 	,100.3	,50  ,false);   //기존 //
 	GridObj.AddHeader("RECEIPT"					,"입고\n예정"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("CHGO_QTY"				,"출고\n예정"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("CHGO"					,"출고\n예정"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("DELV"					,"배송\n출고"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	GridObj.AddHeader("TRAN"					,"수송\n출고"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	
 	GridObj.AddHeader("STOCK_DAY"				,"재고일수\n(1주타계정)"	,"t_number" 	,100.3	,70  ,false);   //기존 //
 	GridObj.AddHeader("STOCK_DAY_1W_ETC"		,"재고일수\n(1주타계정)" 	,"t_number" 	,100.3	,70  ,false);   //추가  2013-06-19//
 	GridObj.AddHeader("STOCK_DAY_1W"			,"재고일수\n(1주)"     	,"t_number" 	,100.3	,70  ,false);   //추가 //
 	GridObj.AddHeader("STOCK_DAY_3W_ETC"		,"재고일수\n(3주타계정)" 	,"t_number" 	,100.3	,70  ,false);   //추가 //
 	GridObj.AddHeader("STOCK_DAY_3W"			,"재고일수\n(3주)"     	,"t_number" 	,100.3	,70  ,false);   //추가 //
 	
 	
 	GridObj.AddHeader("STOCK_TERM"				,"입고\n경과일"      		,"t_number" 	,100.3	,45  ,false);   //기존 //
 	
 	GridObj.AddHeader("SALES_PLAN_D1"			,"판매계획\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("SALES_PLAN_00_D1"		,"판매계획\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("DC_ALLOC_PLAN_D1"		,"공급할당\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	
 	GridObj.AddHeader("ISSUE_D1"				,"판매주문\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_00_D1"				,"판매주문\nD+1" 			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_YO_D1"				,"일반\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_YS_D1"				,"회송\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_TA_D1"				,"타계정\nD+1"   			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_WMS_D1"			,"부서타\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("ISSUE_EX_D1"				,"수출\nD+1"				,"t_number" 	,100.3	,55  ,false);   //기존 //

 	GridObj.AddHeader("STOCK_EXPT"				,"예상\n재고"				,"t_number" 	,100.3	,50  ,false);   //기존 //
 	GridObj.AddHeader("REP_QTY"					,"보충\n요구량"			,"t_number" 	,100.3	,50  ,false);   //기존 //
 	GridObj.AddHeader("TRANS_PLAN_PLT"			,"PLT"      			,"t_number" 	,100.3	,40   ,true);    //기존 //
 	GridObj.AddHeader("TRANS_PLAN_QTY"			,"BOX"      			,"t_number" 	,100.3	,40   ,true);    //기존 //
 	GridObj.AddHeader("SRC_LOC"					,"출고장"    				,"t_combo" 		,100	,50   ,true);	//기존 //   
 	GridObj.AddHeader("MIN_PICK_QTY"			,"최소\n수송"		    	,"t_number" 	,100.3	,40   ,true);    //기존 //
 	
 	GridObj.AddHeader("NEXT_STOCK_DAY"			,"예상일수\n(1주)"		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("NEXT_STOCK_DAY_1W"		,"예상일수\n(1주)"		,"t_number" 	,100.3	,55  ,false);   //2012-03-23 추가 //
 	GridObj.AddHeader("NEXT_STOCK_DAY_3W"		,"예상일수\n(3주)"		,"t_number" 	,100.3	,55  ,false);   //기존 //
 	
 	GridObj.AddHeader("NEXT_STOCK_EXPT"			,"익일\n기초재고"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	
 	GridObj.AddHeader("EDI_00_D"				,"EDI\nD"				,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("EDI_TOT_D"				,"EDI\nD"				,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("EDI_22_D"				,"이마트\nD"				,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("EDI_21_D"				,"HOME+\nD"				,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("EDI_23_D"				,"롯데마트\nD"			,"t_number" 	,100.3	,55  ,false);   //추가 //
 	GridObj.AddHeader("EDI_ETC_D"				,"기타\nD"				,"t_number" 	,100.3	,55  ,false);   //추가 //
 	 	
 	GridObj.AddHeader("EDI_00_D1"				,"EDI\nD+1"				,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_TOT_D1"				,"EDI\nD+1"				,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_22_D1"				,"이마트\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_21_D1"				,"HOME+\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_23_D1"				,"롯데마트\nD+1"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_ETC_D1"				,"기타\nD+1"				,"t_number" 	,100.3	,55  ,false);   //기존 //

 	GridObj.AddHeader("EDI_00_D2"				,"EDI\nD+2"				,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_TOT_D2"				,"EDI\nD+2"				,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_22_D2"				,"이마트\nD+2"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_21_D2"				,"HOME+\nD+2"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_23_D2"				,"롯데마트\nD+2"			,"t_number" 	,100.3	,55  ,false);   //기존 //
 	GridObj.AddHeader("EDI_ETC_D2"				,"기타\nD+2"				,"t_number" 	,100.3	,55  ,false);   //기존 //
	
 	GridObj.AddHeader("CDC_CNT"					,"CDC_ROW번호"			,"t_number" 	,100.3	,20  ,false);   //기존 //
 	GridObj.AddHeader("ORD_NO"					,"ORD_NO"				,"t_number" 	,100.3	,20  ,false);   //기존 //
 	GridObj.AddHeader("ROWNUM"					,"ROWNUM"				,"t_number" 	,100.3	,20  ,false);   //기존 //

 	GridObj.AddHeader("OLD_SAFE_QTY"			,"OLD안전재고"      		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("SAFE_UPDATE_FLAG"		,"안전재고저장FLAG"      	,"t_text" 		,100	,0   ,true);    //기존 //
 	GridObj.AddHeader("UNIT_UPDATE_FLAG"		,"최소수송단위저장FLAG"   	,"t_text" 		,100	,0   ,true);    //기존 //
 	GridObj.AddHeader("BOX_PER_PLT"				,"BOX_PER_PLT"   		,"t_number" 	,100.3	,0   ,true);    //기존 //
 	GridObj.AddHeader("SAFETY_STOCK_FLAG"		,"안전재고FLAG"   		,"t_text" 		,100	,30  ,true);    //기존 //
 	GridObj.AddHeader("CD_SRC_LOC"				,"주출고장"   			,"t_text" 		,100	,30  ,true);    //기존 //

 	GridObj.AddHeader("REMN_CAPA_BOX"			,"잔여CAPA\n(BOX)"   	,"t_number" 	,100.3	,60  ,true);    //기존 //
 	GridObj.AddHeader("ZONE"					,"ZONE"   				,"t_text" 		,100	,10  ,true);    //기존 //

 	GridObj.AddHeader("CUST_00"					,"거래처수\n총합"   		,"t_number" 	,100.3	,60  ,true);  	//기존 //
 	GridObj.AddHeader("CUST_TOT"				,"거래처수\n총합"  		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_10"					,"거래처수\n특약점"   		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_11"					,"거래처수\n직거래"   		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_16"					,"거래처수\n대형마트" 		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_14"					,"거래처수\n슈퍼체인" 		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_19"					,"거래처수\n농협"   		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_18"					,"거래처수\nCVS"   		,"t_number" 	,100.3	,0   ,true);   	//기존 //
 	GridObj.AddHeader("CUST_99"					,"거래처수\n기타"   		,"t_number" 	,100.3	,0   ,true);   	//기존 //

 	GridObj.AddHeader("MAP_STOCK_BOX"			,"매핑\n품목재고"   		,"t_number" 	,100.3	,60  ,true);   	//기존 //
 	GridObj.AddHeader("SAFETY_STOCK"			,"안전\n재고"      		,"t_number" 	,100.3	,45  ,true);   	//기존 //

//	GridObj.AddGroup("TRANS_PLAN", "수송계획");			//그리드에 그룹을 등록한다. 
//	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_PLT");
//	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_QTY");

	GridObj.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
	
// rotaiton 컬럼 색깔 정정 	
	GridObj.SetColHDBgColor('GOAL_00',					'253|228|229');
	GridObj.SetColHDBgColor('RATE_00',					'253|228|229');

	GridObj.SetColHDBgColor('PRE_MONTH_SELL',			'253|228|229');
	GridObj.SetColHDBgColor('SALES_PRE',				'253|228|229');
	GridObj.SetColHDBgColor('SALES_PRE_CUM',			'253|228|229');
	GridObj.SetColHDBgColor('ISSUE',					'253|228|229');
	
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK_1',		'253|228|229');	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK',			'253|228|229');	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK_ETC',		'253|228|229');	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHDBgColor('SALES_MEAN_3WEEK_3',		'253|228|229');	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHDBgColor('SALES_MEAN_3WEEK',			'253|228|229');	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	
	GridObj.SetColHDBgColor('CHGO_QTY',					'253|228|229');

	GridObj.SetColHDBgColor('STOCK_DAY',				'253|228|229'); //(추가)//
	GridObj.SetColHDBgColor('SALES_PLAN_D1',			'253|228|229');
	GridObj.SetColHDBgColor('ISSUE_CUST_00',			'253|228|229'); //(추가)//
	GridObj.SetColHDBgColor('ISSUE_D1',					'253|228|229');
	
	GridObj.SetColHDBgColor('NEXT_STOCK_DAY',			'253|228|229'); //(추가)//
	GridObj.SetColHDBgColor('EDI_00_D',					'253|228|229'); //(추가)//
	GridObj.SetColHDBgColor('EDI_00_D1',				'253|228|229');
	GridObj.SetColHDBgColor('EDI_00_D2',				'253|228|229');

	GridObj.SetColHDBgColor('CUST_00',					'253|228|229');
	
//	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("DC_ID", 				true);

	GridObj.SetColHide("GOAL_11", 				true);
	GridObj.SetColHide("GOAL_13", 				true);
	GridObj.SetColHide("GOAL_14", 				true);
	GridObj.SetColHide("GOAL_17", 				true);
	GridObj.SetColHide("GOAL_18", 				true);
	GridObj.SetColHide("GOAL_21", 				true);
	GridObj.SetColHide("GOAL_23", 				true);
	
	GridObj.SetColHide("RATE_11", 				true);
	GridObj.SetColHide("RATE_13", 				true);
	GridObj.SetColHide("RATE_14", 				true);
	GridObj.SetColHide("RATE_17", 				true);
	GridObj.SetColHide("RATE_18", 				true);
	GridObj.SetColHide("RATE_21", 				true);
	GridObj.SetColHide("RATE_23", 				true);

	GridObj.SetColHide("SUPPLY_RATE", 	  		true);
	GridObj.SetColHide("SUPPLY_RATE_BOX", 		true);

	GridObj.SetColHide("PRE_MONTH_SELL_00", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_01", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_02", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_03", 	true);	//(추가)//
	GridObj.SetColHide("PRE_MONTH_SELL_04", 	true);	//(추가)//
	GridObj.SetColHide("PRE_MONTH_SELL_05", 	true);	//(추가)//
	GridObj.SetColHide("PRE_MONTH_SELL_06", 	true);	//(추가)//
	
	GridObj.SetColHide("SALES_PRE_00", 			true);
	GridObj.SetColHide("SALES_PRE_01", 			true);
	GridObj.SetColHide("SALES_PRE_02", 			true);
	GridObj.SetColHide("SALES_PRE_03", 			true);	//(추가)//
	GridObj.SetColHide("SALES_PRE_04", 			true);	//(추가)//
	GridObj.SetColHide("SALES_PRE_05", 			true);	//(추가)//
	GridObj.SetColHide("SALES_PRE_06", 			true);	//(추가)//
	
	GridObj.SetColHide("SALES_PRE_CUM_00", 		true);
	GridObj.SetColHide("SALES_PRE_CUM_01", 		true); 
	GridObj.SetColHide("SALES_PRE_CUM_02", 		true);
	GridObj.SetColHide("SALES_PRE_CUM_03", 		true);	//(추가)//
	GridObj.SetColHide("SALES_PRE_CUM_04", 		true); 	//(추가)//
	GridObj.SetColHide("SALES_PRE_CUM_05", 		true);	//(추가)//
	GridObj.SetColHide("SALES_PRE_CUM_06", 		true);	//(추가)//
	
	
	GridObj.SetColHide("ISSUE_00", 				true);
	GridObj.SetColHide("ISSUE_YO", 				true);
	GridObj.SetColHide("ISSUE_YS", 				true);
	GridObj.SetColHide("ISSUE_TA", 				true);
	GridObj.SetColHide("ISSUE_WMS", 			true);
	GridObj.SetColHide("ISSUE_EX", 				true);

	
	//GridObj.SetColHide("SALES_MEAN_1WEEK", 		true);	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHide("SALES_MEAN_1WEEK_ETC", 	true);	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	
	//GridObj.SetColHide("SALES_MEAN_3WEEK", 		true);	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetColHide("SALES_MEAN_3WEEK_ETC", 	true);	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	
	GridObj.SetColHide("CHGO", 					true);
	GridObj.SetColHide("DELV", 					true);
	GridObj.SetColHide("TRAN", 					true);
	
	GridObj.SetColHide("STOCK_DAY_1W", 			true);	//(추가)//
	GridObj.SetColHide("STOCK_DAY_1W_ETC", 		true);	//2013-06-19 (추가)//
	GridObj.SetColHide("STOCK_DAY_3W", 			true);	//(추가)//
	GridObj.SetColHide("STOCK_DAY_3W_ETC", 		true);	//2013-06-19 (추가)//
	
	GridObj.SetColHide("SALES_PLAN_00_D1", 		true);
	GridObj.SetColHide("DC_ALLOC_PLAN_D1", 		true);
	GridObj.SetColHide("ISSUE_00_D1", 			true);
	GridObj.SetColHide("ISSUE_YO_D1", 			true);
	GridObj.SetColHide("ISSUE_YS_D1", 			true);
	GridObj.SetColHide("ISSUE_TA_D1", 			true);
	GridObj.SetColHide("ISSUE_WMS_D1",			true);
	GridObj.SetColHide("ISSUE_EX_D1", 			true);

	GridObj.SetColHide("EDI_TOT_D", 			true);  //(추가)//
	GridObj.SetColHide("EDI_22_D",  			true);	//(추가)//
	GridObj.SetColHide("EDI_21_D",  			true);	//(추가)//
	GridObj.SetColHide("EDI_23_D",  			true);	//(추가)//
	GridObj.SetColHide("EDI_ETC_D", 			true);	//(추가)//
	
	
	GridObj.SetColHide("EDI_TOT_D1", 			true);
	GridObj.SetColHide("EDI_22_D1",  			true);
	GridObj.SetColHide("EDI_21_D1",  			true);
	GridObj.SetColHide("EDI_23_D1",  			true);
	GridObj.SetColHide("EDI_ETC_D1", 			true);
	
	GridObj.SetColHide("EDI_TOT_D2", 			true);
	GridObj.SetColHide("EDI_22_D2",  			true);
	GridObj.SetColHide("EDI_21_D2",  			true);
	GridObj.SetColHide("EDI_23_D2",  			true);
	GridObj.SetColHide("EDI_ETC_D2", 			true);

	GridObj.SetColHide("CDC_CNT", 				true);
	GridObj.SetColHide("ORD_NO",  				true);
	GridObj.SetColHide("ROWNUM",  				true);

	GridObj.SetColHide("OLD_SAFE_QTY", 			true);
	GridObj.SetColHide("SAFE_UPDATE_FLAG",  	true);
	GridObj.SetColHide("UNIT_UPDATE_FLAG",  	true);
	GridObj.SetColHide("SAFETY_STOCK_FLAG", 	true);
	GridObj.SetColHide("CD_SRC_LOC",  			true);

	GridObj.SetColHide("BOX_PER_PLT", 			true);

	GridObj.SetColHide("ZONE", 					true);

	GridObj.SetColFix('DC_NAME');

	GridObj.SetNumberFormat("GOAL_00"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_11"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_13"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_14"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_17"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_18"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_21"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_23"		 		, "###,###,###");
	GridObj.SetNumberFormat("RATE_00"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_11"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_13"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_14"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_17"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_18"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_21"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_23"				, "###,###,##0.0");

	GridObj.SetNumberFormat("REMN_CAPA_BOX"		 	, "###,###,###");
	GridObj.SetNumberFormat("MAP_STOCK_BOX"		 	, "###,###,###");

	GridObj.SetNumberFormat("PRE_MONTH_SELL"		 , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_00"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_01"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_02"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_03"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_04"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_05"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_06"	     , "###,###,###");	//(추가)//
	
	GridObj.SetNumberFormat("SALES_PRE"			     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_00"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_01"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_02"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_03"		     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_04"		     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_05"		     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_06"		     , "###,###,###");	//(추가)//
	
	GridObj.SetNumberFormat("SALES_PRE_CUM"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_00"	     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_01"	     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_02"	     , "###,###,###");	
	GridObj.SetNumberFormat("SALES_PRE_CUM_03"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_04"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_05"	     , "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_06"	     , "###,###,###");	//(추가)//
	
	GridObj.SetNumberFormat("SALES_PLAN"		     , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE"				     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_00"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YO"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YS"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_TA"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_WMS"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_EX"			     , "###,###,###");

	GridObj.SetNumberFormat("SALES_MEAN_1WEEK_1"	, "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK"		, "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK_ETC"   , "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_3"	 , "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK"	     , "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_ETC"   , "###,###,###");	//2013-05-29 SCM팀 이승용 대리 Rotation 요청

	GridObj.SetNumberFormat("BASE_STOCK"			 , "###,###,###");
	GridObj.SetNumberFormat("RECEIPT"				 , "###,###,###");
	GridObj.SetNumberFormat("CHGO_QTY"			     , "###,###,###");
	GridObj.SetNumberFormat("CHGO"				     , "###,###,###");
	GridObj.SetNumberFormat("DELV"				     , "###,###,###");
	GridObj.SetNumberFormat("TRAN"				     , "###,###,###");
	
	
	
	
	GridObj.SetNumberFormat("STOCK_DAY"			     , "###,###,##0.0");
	GridObj.SetNumberFormat("STOCK_DAY_1W_ETC"		 , "###,###,##0.0");	//2013-06-19 추가
	GridObj.SetNumberFormat("STOCK_DAY_1W"			 , "###,###,##0.0");
	GridObj.SetNumberFormat("STOCK_DAY_3W_ETC"		 , "###,###,##0.0");	//2013-06-19 추가
	GridObj.SetNumberFormat("STOCK_DAY_3W"			 , "###,###,##0.0");

	GridObj.SetNumberFormat("STOCK_TERM"			 , "###,###,###");
	GridObj.SetNumberFormat("SAFETY_STOCK"		     , "###,###,###");
	
	GridObj.SetNumberFormat("SALES_PLAN_D1"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PLAN_00_D1"		 , "###,###,###");
	GridObj.SetNumberFormat("DC_ALLOC_PLAN_D1"		 , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE_D1"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_00_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YO_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YS_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_TA_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_WMS_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_EX_D1"			 , "###,###,###");

	GridObj.SetNumberFormat("NEXT_STOCK_DAY"	     , "###,###,##0.0");
	GridObj.SetNumberFormat("NEXT_STOCK_DAY_1W"	     , "###,###,##0.0"); //2012-03-23 추가//
	GridObj.SetNumberFormat("NEXT_STOCK_DAY_3W"	     , "###,###,##0.0");
	GridObj.SetNumberFormat("NEXT_STOCK_EXPT"	     , "###,###,###");
	
	GridObj.SetNumberFormat("EDI_00_D"			 	, "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("EDI_TOT_D"				, "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("EDI_22_D"			 	, "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("EDI_21_D"			 	, "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("EDI_23_D"			 	, "###,###,###");	//(추가)//
	GridObj.SetNumberFormat("EDI_ETC_D"				, "###,###,###");	//(추가)//
	
	
	GridObj.SetNumberFormat("EDI_00_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_TOT_D1"			, "###,###,###");
	GridObj.SetNumberFormat("EDI_22_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_21_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_23_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_ETC_D1"			, "###,###,###");
	
	GridObj.SetNumberFormat("EDI_00_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_TOT_D2"			, "###,###,###");
	GridObj.SetNumberFormat("EDI_22_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_21_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_23_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_ETC_D2"			, "###,###,###");
	
	GridObj.SetNumberFormat("STOCK_EXPT"			 , "###,###,###");
	GridObj.SetNumberFormat("REP_QTY"				 , "###,###,###");
	GridObj.SetNumberFormat("TRANS_PLAN_QTY"		 , "###,###,###");
	GridObj.SetNumberFormat("TRANS_PLAN_PLT"		 , "###,###,##0.00");
	GridObj.SetNumberFormat("MIN_PICK_QTY"		     , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE_CUST_00"			, "###,###,###"); //(추가)//
	GridObj.SetNumberFormat("CUST_00"				, "###,###,###");

	GridObj.SetColCellFontName('DC_NAME','맑은 고딕');
	GridObj.SetColCellFontName('SRC_LOC','맑은 고딕');
	GridObj.SetColCellFontBold('DC_NAME','true');
	GridObj.SetColCellFontBold('SRC_LOC','true');

}

/* rotaion 컬럼 데이터 셋팅 */
var pre_month_sell_idx 		= 0;
var sales_pre_idx 	   		= 0;
var sales_pre_cum_idx  		= 0;
var issue_idx 		   		= 0;
var chgo_qty_idx 	   		= 0;
var stock_day_idx 	   		= 0;	//(추가)//
var sales_plan_d1_idx  		= 0;
var issue_d1_idx 	   		= 0;
var edi_d_idx 		   		= 0;	//(추가)//
var edi_d1_idx 		   		= 0;
var edi_d2_idx 		   		= 0;
var goal_idx 		   		= 0;
var rate_idx 		   		= 0;
var issue_cust_idx 	   		= 0;	//(추가)//
var cust_idx 		   		= 0;
var next_stock_idx			= 0;
var sales_mean_1week_idx	= 0;	//2013-05-29 SCM팀 이승용 대리 Rotation 요청	
var sales_mean_3week_idx	= 0;	//2013-05-29 SCM팀 이승용 대리 Rotation 요청

//alert(sales_mean_1week_idx);

function HeaderClick_DW1(strColumnKey){


	/* 전월판매 rotation */
	if(strColumnKey == "PRE_MONTH_SELL"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(pre_month_sell_idx == 0) {
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_01"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_01", i));
			}
			else if(pre_month_sell_idx == 1) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_02"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_02", i));
			}
			else if(pre_month_sell_idx == 2) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_03"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_03", i));
			}
			else if(pre_month_sell_idx == 3) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_04"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_04", i));
			}
			else if(pre_month_sell_idx == 4) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_05"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_05", i));
			}
			else if(pre_month_sell_idx == 5) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_06"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_00"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_00", i));
			}				
		}
		if(pre_month_sell_idx == 6) pre_month_sell_idx =0; else pre_month_sell_idx ++;
	}

	/* 전일판매 rotation */
	if(strColumnKey == "SALES_PRE"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_pre_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_01"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_01", i));
			}
			else if(sales_pre_idx == 1) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_02"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_02", i));
			}
			else if(sales_pre_idx == 2) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_03"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_03", i));
			}
			else if(sales_pre_idx == 3) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_04"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_04", i));
			}
			else if(sales_pre_idx == 4) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_05"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_05", i));
			}
			else if(sales_pre_idx == 5) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_06"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_00"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_00", i));
			}				
		}
		if(sales_pre_idx == 6) sales_pre_idx =0; else sales_pre_idx ++;
	}

	/* 판매누계 rotation */
	if(strColumnKey == "SALES_PRE_CUM"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_pre_cum_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_01"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_01", i));
			}
			else if(sales_pre_cum_idx == 1) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_02"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_02", i));
			}
			else if(sales_pre_cum_idx == 2) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_03"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_03", i));
			}
			else if(sales_pre_cum_idx == 3) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_04"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_04", i));
			}
			else if(sales_pre_cum_idx == 4) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_05"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_05", i));
			}
			else if(sales_pre_cum_idx == 5) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_06"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_00"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_00", i));
			}				
		}
		if(sales_pre_cum_idx == 6) sales_pre_cum_idx =0; else sales_pre_cum_idx ++;
	}

	/* 판매주문 rotation */
	if(strColumnKey == "ISSUE"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_YO"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_YO", i));
			}
			else if(issue_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_YS"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_YS", i));
			}
			else if(issue_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_TA"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_TA", i));
			}
			else if(issue_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_WMS"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_WMS", i));
			}
			else if(issue_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_EX"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_EX", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_00"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_00", i));
			}				
		}
		if(issue_idx == 5) issue_idx =0; else issue_idx ++;
	}

	/* 출고예정 rotation */
	if(strColumnKey == "CHGO_QTY"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(chgo_qty_idx == 0) {
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("DELV"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("DELV", i));
			}
			else if(chgo_qty_idx == 1) { 
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("TRAN"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("TRAN", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("CHGO"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("CHGO", i));
			}				
		}
		if(chgo_qty_idx == 2) chgo_qty_idx =0; else chgo_qty_idx ++;
	}


	/* 재고일수  rotation */ 
		if(strColumnKey == "STOCK_DAY"){
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				
				if(stock_day_idx == 0) {
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_1W"));
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_1W", i));
				}
				else if(stock_day_idx == 1) { 
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_3W_ETC"));	//2013-06-19 추가
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_3W_ETC", i));
				}
				else if(stock_day_idx == 2) { 
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_3W"));
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_3W", i));
				}
				else {
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_1W_ETC"));	//2013-06-19 추가
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_1W_ETC", i));
				}
			}
			if(stock_day_idx == 3) stock_day_idx =0; else stock_day_idx ++;
		}


	/* 판매계획D+1 rotation */
	if(strColumnKey == "SALES_PLAN_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_plan_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("DC_ALLOC_PLAN_D1"));
				GridObj.SetCellValue('SALES_PLAN_D1',i,GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("SALES_PLAN_00_D1"));
				GridObj.SetCellValue('SALES_PLAN_D1',i,GridObj.GetCellValue("SALES_PLAN_00_D1", i));
			}				
		}
		if(sales_plan_d1_idx == 1) sales_plan_d1_idx =0; else sales_plan_d1_idx ++;
	}

	/* 판매주문D+1 rotation */
	if(strColumnKey == "ISSUE_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_YO_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_YO_D1", i));
			}
			else if(issue_d1_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_YS_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_YS_D1", i));
			}
			else if(issue_d1_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_TA_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_TA_D1", i));
			}
			else if(issue_d1_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_WMS_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_WMS_D1", i));
			}
			else if(issue_d1_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_EX_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_EX_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_00_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_00_D1", i));
			}				
		}
		if(issue_d1_idx == 5) issue_d1_idx =0; else issue_d1_idx ++;
	}	

	/* EDI_D rotation */ //(추가)//
	if(strColumnKey == "EDI_00_D"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_22_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_22_D", i));
			}
			else if(edi_d_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_21_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_21_D", i));
			}
			else if(edi_d_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_23_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_23_D", i));
			}
			else if(edi_d_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_ETC_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_ETC_D", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_TOT_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_TOT_D", i));
			}				
		}
		if(edi_d_idx == 4) edi_d_idx =0; else edi_d_idx ++;
	}

	/* EDI_D1 rotation */
	if(strColumnKey == "EDI_00_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_22_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_22_D1", i));
			}
			else if(edi_d1_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_21_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_21_D1", i));
			}
			else if(edi_d1_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_23_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_23_D1", i));
			}
			else if(edi_d1_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_ETC_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_ETC_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_TOT_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_TOT_D1", i));
			}				
		}
		if(edi_d1_idx == 4) edi_d1_idx =0; else edi_d1_idx ++;
	}

	/* EDI_D2 rotation */
	if(strColumnKey == "EDI_00_D2"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d2_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_22_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_22_D2", i));
			}
			else if(edi_d2_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_21_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_21_D2", i));
			}
			else if(edi_d2_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_23_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_23_D2", i));
			}
			else if(edi_d2_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_ETC_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_ETC_D2", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_TOT_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_TOT_D2", i));
			}				
		}
		if(edi_d2_idx == 4) edi_d2_idx =0; else edi_d2_idx ++;
	}

	/* 판매목표&달성율 rotation -> 실적참조,사용자는 우선 제외 */
	if(strColumnKey == "GOAL_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(goal_idx == 0) {
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_13"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_13", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_13", i));
			}
			else if(goal_idx == 1) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_14"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_14", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_14", i));
			}
			else if(goal_idx == 2) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_17"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_17", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_17", i));
			}
			else if(goal_idx == 3) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_18"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_18", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_18", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_11"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_11", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_11", i));
			}				
		}
		if(goal_idx == 4) goal_idx =0; else goal_idx ++;
		
		// 공급율,공급박스 구하기
		rate_idx --;
//alert("goal_idx = "+goal_idx + " rate_idx = "+ rate_idx);
		HeaderClick_DW1("RATE_00");
	}	

	/* 달성율/공급율 rotation */
	if(strColumnKey == "RATE_00"){

		// 공급율 구하기
		setSupplyRateAndBox("normal");
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(rate_idx == 0) { // 공급율
				if(i==0) GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("SUPPLY_RATE"));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("SUPPLY_RATE", i));
			}
			else {
				if(i==0) GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("RATE_11"));
				
				if(goal_idx == 0) {
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_11", i));
				}
				else if(goal_idx == 1) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_13", i));
				}
				else if(goal_idx == 2) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_14", i));
				}
				else if(goal_idx == 3) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_17", i));
				}
				else { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_18", i));
				}				
			}
		}
		if(rate_idx == 1) {  // 달성율
			rate_idx = 0; 
		}
		else { // 공급율
			rate_idx ++;
		}
	}


/* 유통채널 rotation */ //(추가)//
	if(strColumnKey == "ISSUE_CUST_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_cust_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_10"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_10", i));
			}
			else if(issue_cust_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_11"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_11", i));
			}
			else if(issue_cust_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_16"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_16", i));
			}
			else if(issue_cust_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_14"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_14", i));
			}
			else if(issue_cust_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_19"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_19", i));
			}
			else if(issue_cust_idx == 5) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_18"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_18", i));
			}
			else if(issue_cust_idx == 6) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_99"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_99", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_TOT"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_TOT", i));
			}				
		}
		if(issue_cust_idx == 7) issue_cust_idx =0; else issue_cust_idx ++;
	}
	

	/* 거래처수 rotation */
	if(strColumnKey == "CUST_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(cust_idx == 0) {
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_10"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_10", i));
			}
			else if(cust_idx == 1) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_11"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_11", i));
			}
			else if(cust_idx == 2) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_16"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_16", i));
			}
			else if(cust_idx == 3) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_14"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_14", i));
			}
			else if(cust_idx == 4) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_19"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_19", i));
			}
			else if(cust_idx == 5) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_18"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_18", i));
			}
			else if(cust_idx == 6) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_99"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_99", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_TOT"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_TOT", i));
			}				
		}
		if(cust_idx == 7) cust_idx =0; else cust_idx ++;
	}


/* 예상일수 rotation */
	if(strColumnKey == "NEXT_STOCK_DAY"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(next_stock_idx == 0) {
				if(i==0) GridObj.SetColHDText("NEXT_STOCK_DAY",GridObj.GetColHDText("NEXT_STOCK_DAY_1W"));
				GridObj.SetCellValue('NEXT_STOCK_DAY',i,GridObj.GetCellValue("NEXT_STOCK_DAY_1W", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("NEXT_STOCK_DAY",GridObj.GetColHDText("NEXT_STOCK_DAY_3W"));
				GridObj.SetCellValue('NEXT_STOCK_DAY',i,GridObj.GetCellValue("NEXT_STOCK_DAY_3W", i));
			}			
		}
		if(next_stock_idx == 1) next_stock_idx =0; else next_stock_idx ++;
	}
	
/* 1주 평균 rotation 추가 */	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	if(strColumnKey == "SALES_MEAN_1WEEK_1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_mean_1week_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_MEAN_1WEEK_1",GridObj.GetColHDText("SALES_MEAN_1WEEK"));
				GridObj.SetCellValue('SALES_MEAN_1WEEK_1',i,GridObj.GetCellValue("SALES_MEAN_1WEEK", i));
			}
			else  { 
				if(i==0) GridObj.SetColHDText("SALES_MEAN_1WEEK_1",GridObj.GetColHDText("SALES_MEAN_1WEEK_ETC"));
				GridObj.SetCellValue('SALES_MEAN_1WEEK_1',i,GridObj.GetCellValue("SALES_MEAN_1WEEK_ETC", i));
			}
		}
		if(sales_mean_1week_idx == 1) sales_mean_1week_idx = 0; else sales_mean_1week_idx ++;
	}	
	
/* 3주 평균 rotation 추가 */	//2013-05-29 SCM팀 이승용 대리 Rotation 요청
	if(strColumnKey == "SALES_MEAN_3WEEK_3"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_mean_3week_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_MEAN_3WEEK_3",GridObj.GetColHDText("SALES_MEAN_3WEEK"));
				GridObj.SetCellValue('SALES_MEAN_3WEEK_3',i,GridObj.GetCellValue("SALES_MEAN_3WEEK", i));
			}
			else  { 
				if(i==0) GridObj.SetColHDText("SALES_MEAN_3WEEK_3",GridObj.GetColHDText("SALES_MEAN_3WEEK_ETC"));
				GridObj.SetCellValue('SALES_MEAN_3WEEK_3',i,GridObj.GetCellValue("SALES_MEAN_3WEEK_ETC", i));
			}		
				
		}
		if(sales_mean_3week_idx == 1) sales_mean_3week_idx =0; else sales_mean_3week_idx ++;
	}	


}

// init_gubn : "init" 수송계획량 미포함, "normal" 수송계획량 포함
function	setSupplyRateAndBox(init_gubn){
    var rowCnt = GridObj.GetRowCount();
    for ( i = 0 ; i < rowCnt ; i++ ){
    	var dc_name = GridObj.GetCellValue("DC_NAME", i);

	    
	    // 평균공급율 구하기 
	    if(dc_name == "전체합계") {
	    	if(strToNum(GridObj.GetCellValue("GOAL_00", i)) <= 0) break;
	    	var mean_supply_rate = Math.round(( strToNum(GridObj.GetCellValue("BASE_STOCK", i)) 
	    			+ strToNum(GridObj.GetCellValue("SALES_PRE_CUM", i))
	    			+ strToNum(GridObj.GetCellValue("DELV", i))
	    			+ strToNum(GridObj.GetCellValue("RECEIPT", i))
	    			+ strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)) )
	    			 / strToNum(GridObj.GetCellValue("GOAL_00", i)) * 100 *10)/10;
	    } 
    }
    
    // 판매목표 기준 공급율, 가감량 계산
    // 공급율 = (당일재고 + 판매누계 + 배송출고 + 입고예정 + 계획중 수송계획) / 판매목표 * 100
    // 가감량 = 평균공급율과의 차이박스 * 차이비율(%) 
    var supply_rate 	= 0, supply_rate_box = 0;
    var trans_plan_qty  = 0;
    var dc_id, t_dc_id;
    for ( i = 0 ; i < rowCnt ; i++ ){
    	if(strToNum(GridObj.GetCellValue("GOAL_00", i)) <= 0) {
    		GridObj.SetCellValue("SUPPLY_RATE", i, 0);
    		GridObj.SetCellValue("SUPPLY_RATE_BOX", i, 0);
    		continue;
    	}
    	dc_id = GridObj.GetCellValue("DC_ID", i);
    	// 수송계획량 합산
    	trans_plan_qty = 0;
    	if(init_gubn == "normal") {
	    	for ( j = 0 ; j < rowCnt ; j++ ){
	    		t_dc_id = GridObj.GetCellValue("DC_ID", j);
	    		if(dc_id == t_dc_id) {
	    			trans_plan_qty = trans_plan_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
	    		}
	    	}
    	}
    	supply_rate = Math.round(( strToNum(GridObj.GetCellValue("BASE_STOCK", i)) 
	    			+ strToNum(GridObj.GetCellValue("SALES_PRE_CUM", i))
	    			+ strToNum(GridObj.GetCellValue("DELV", i))
	    			+ strToNum(GridObj.GetCellValue("RECEIPT", i))
	    			+ trans_plan_qty )
	    			 / strToNum(GridObj.GetCellValue("GOAL_00", i)) * 100 *10)/10;
		GridObj.SetCellValue("SUPPLY_RATE", i, supply_rate);
		
		if(mean_supply_rate - supply_rate > 0) {
			supply_rate_box = Math.round(strToNum(GridObj.GetCellValue("GOAL_00", i)) * (mean_supply_rate - supply_rate) / 100 
							* (mean_supply_rate - supply_rate));
		}
		else {
			supply_rate_box = 0;
		}    	
		GridObj.SetCellValue("SUPPLY_RATE_BOX", i, supply_rate_box);
		
    }
	
}

function setHeader2() 
{        

	GridObj2.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA"		,"재고(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_BOX"	,"재고(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_PAL"	,"재고(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("BASE_STOCK"		,"당일재고"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("CHGO_QTY"		,"출고량"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_1"		,"조간"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_3"		,"주간"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("CONF_STOCK"		,"출고가능"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("TRANS_QTY"		,"출고확정"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj2.AddHeader("NEXT_CHGO_QTY"	,"익일출고"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj2.AddHeader("NEXT_TRANS_QTY"	,"익일계획"       	,"t_number" 	,500.3	,50  ,false); //0   

	var trans_start   = document.frm.trans_start.value;
	var item_id 	  = document.frm.item_id.value;
	var itype		  = document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", trans_start+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
		callback:function(result){

			for(var i=0 ; i < 20 ; i++){
				if(i < result.length) {
					GridObj2.AddHeader("PROD"+result[i][1]	,result[i][0]       	,"t_number" 	,500.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 9) {
						GridObj2.AddHeader("PROD0"+j	,"-"     	,"t_number" 	,500.3	,0  ,false);
					}
					else {
						GridObj2.AddHeader("PROD"+j		,"-"       	,"t_number" 	,500.3	,0  ,false);
					}
				}
			}
		 	
		 	GridObj2.AddHeader("PROD_AVAILABLE"	,"생산가능"       	,"t_text" 	,500	,30  ,false); //0   
			
			GridObj2.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
			GridObj2.SetColHide("PROD_AVAILABLE", true);
			
			GridObj2.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // 숫자 형식
			GridObj2.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // 숫자 형식
			GridObj2.SetNumberFormat("PROD01_1", 		 "###,###,###"); // 숫자 형식
			GridObj2.SetNumberFormat("PROD01_3", 		 "###,###,###"); // 숫자 형식
			GridObj2.SetNumberFormat("CONF_STOCK", 		 "###,###,###");
			GridObj2.SetNumberFormat("TRANS_QTY", 		 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_CHGO_QTY", 	 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_TRANS_QTY", "###,###,###.#");
			GridObj2.SetNumberFormat("USE_CAPA", 	 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_BOX", 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_PAL", 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD01", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD02", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD03", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD04", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD05", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD06", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD07", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD08", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD09", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD10", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD11", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD12", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD13", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD14", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD15", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD16", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD17", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD18", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD19", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD20", 		 	 "###,###,###");
			
			GridObj2.SetColCellAlign('DC_NAME','left');
			GridObj2.SetColCellFontName('DC_NAME','맑은 고딕');
			GridObj2.SetColCellFontBold('DC_NAME','true');
			
			GridObj2.SetColHDBgColor('TRANS_QTY','253|228|229');

			if(document.frm.itype.value == "HAWA") {
				GridObj2.SetColHide("PROD01_1", true);
				GridObj2.SetColHide("PROD01_3", true);
			}
			
			GridObj2.SetColHide("USE_CAPA_BOX", true);
			GridObj2.SetColHide("USE_CAPA_PAL", true);
			// CAPA추가로 한개컬럼 가린다.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery2();			
		}
	});   
}

var sum_cd_info_idx = 0;
var next_trans_qty  = new Array();
var use_capa_idx 	= 0;
function HeaderClick_DW2(strColumnKey) {

	// 헤더 클릭시 출고가능량을 출고확정량으로 copy한다. 
	if(strColumnKey == "TRANS_QTY"){
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
			GridObj2.SetCellValue('TRANS_QTY',i,GridObj2.GetCellValue("CONF_STOCK", i));
		}
	}

	if(strColumnKey == "NEXT_TRANS_QTY" && document.frm.cd_gubn.value == "CROSS-DOCKING"){
		var cdc_id, cd_src_loc, dc_id;
		var sum_mean3_sell 	   = new Array(), tot_mean3_sell     = 0;
		var sum_pre_month_sell = new Array(), tot_pre_month_sell = 0;
		var in_data = 0;
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
			// 배송지점이 C/D인 경우 3주평균,비율, 전월판매,비율을 ROTATION하면서 보여준다
			cdc_id = GridObj2.GetCellHiddenValue("DC_NAME", i);
			sum_mean3_sell[i] = 0;
			sum_pre_month_sell[i] = 0;
			for(j=0;j<GridObj.GetRowCount( );j++ ) {
				dc_id = GridObj.GetCellValue("DC_ID", j);
				cd_src_loc = GridObj.GetCellValue("CD_SRC_LOC", j);
				cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", j);
				// 복수개 라인일 경우 PASS!
				if(GridObj.GetCellValue("CDC_CNT", j) != "1") {
					continue;
				}
				if((cd_flag == "01" && cdc_id == cd_src_loc) || cdc_id == dc_id)	{
					sum_mean3_sell[i] = sum_mean3_sell[i] + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j));
					sum_pre_month_sell[i] = sum_pre_month_sell[i] + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", j));	
				}
			}
			tot_mean3_sell = tot_mean3_sell	+ sum_mean3_sell[i];
			tot_pre_month_sell = tot_pre_month_sell	+ sum_pre_month_sell[i];

		}
		
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
	
			if(sum_cd_info_idx == 0) { // 3주평균 집계물량
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","3주집계");
				next_trans_qty[i] = strToNum(GridObj2.GetCellValue("NEXT_TRANS_QTY", i)); // 원 정보 백업
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,sum_mean3_sell[i]);
			}
			else if(sum_cd_info_idx == 1) { // 3주평균 집계비율
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","3주(%)");
				if(tot_mean3_sell > 0) {
					in_data = Math.round(strToNum(sum_mean3_sell[i])/strToNum(tot_mean3_sell)*100*10)/10;
					GridObj2.SetCellValue("NEXT_TRANS_QTY", i,in_data);
				}
				else GridObj2.SetCellValue("NEXT_TRANS_QTY", i,0);
			}
			else if(sum_cd_info_idx == 2) { // 전월판매 집계물량
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","전월집계");
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,sum_pre_month_sell[i]);
			}
			else if(sum_cd_info_idx == 3) { // 전월판매 집계비율
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","전월(%)");
				if(tot_pre_month_sell > 0) {
					in_data = Math.round(strToNum(sum_pre_month_sell[i])/strToNum(tot_pre_month_sell)*100*10)/10;
					GridObj2.SetCellValue("NEXT_TRANS_QTY", i,in_data);
				}
				else GridObj2.SetCellValue("NEXT_TRANS_QTY", i,0);
			}
			else { // 익일계획
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","익일계획");
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,next_trans_qty[i]);
			}
		}
		
		if(sum_cd_info_idx == 4) sum_cd_info_idx =0; else sum_cd_info_idx ++;
	}
	if(strColumnKey == "USE_CAPA"){
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
	
			if(use_capa_idx == 0) { // 전체재고(PAL)
				if(i==0) GridObj2.SetColHDText("USE_CAPA",GridObj2.GetColHDText("USE_CAPA_PAL"));
				GridObj2.SetCellValue("USE_CAPA", i,strToNum(GridObj2.GetCellValue("USE_CAPA_PAL", i)));
			}
			else { // 전체재고(BOX)
				if(i==0) GridObj2.SetColHDText("USE_CAPA",GridObj2.GetColHDText("USE_CAPA_BOX"));
				GridObj2.SetCellValue("USE_CAPA", i,strToNum(GridObj2.GetCellValue("USE_CAPA_BOX", i)));
			}
		}
		
		if(use_capa_idx == 1) use_capa_idx =0; else use_capa_idx ++;
	
	}
		
}

function setHeader3() 
{        

	GridObj3.AddHeader("CRUD"			,"CRUD"		       	,"t_text" 	,100	,0   ,false); //0   
	GridObj3.AddHeader("CNFM_DATE"		,"날짜"		       	,"t_text" 	,100	,61  ,false); //0   
 	GridObj3.AddHeader("ALLOC_ZONE"		,"구분"      		,"t_text" 	,100	,58  ,false); //0   

	GridObj3.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
	GridObj3.SetColCellAlign('CNFM_DATE', 'center');
	GridObj3.SetColCellAlign('ALLOC_ZONE','center');

	GridObj3.SetColHide("CRUD", true);

	GridObj3.SetCRUDMode("CRUD");   
}


/***********************************************   WiseGrid 통신  **********************************************************/

/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
var check_select_DW1 = false;

function doQuery() {
//	if(check_select_DW1) {
//		alert("조회작업중입니다(check_select_DW1)! 완료된후 다시하세요!");
//		return;
//	}
//	check_select_DW1 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "search");
	
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드
	
	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);

	if(version.substring(0,8) == delDateDelimiter(trans_start)) {
		GridObj.SetParam("check_day", "TODAY"); // 당일계획

	}
	else {
		GridObj.SetParam("check_day", "NEXT"); // 익일계획
	}

	// query_id
	GridObj.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW1");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url);
}	 

var check_select_DW2 = false;

function doQuery2() {
		
//	if(check_select_DW2) {
//		alert("조회작업중입니다(check_select_DW2)! 완료된후 다시하세요!");
//		return;
//	}
//	check_select_DW2 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "search_DW2");
	
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드

	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	var itype 		= document.frm.itype.value;
	
	
	GridObj2.SetParam("item_id", 		 item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", 		 version);
	GridObj2.SetParam("seq", 				 seq);
	
	GridObj2.SetParam("itype", 			   itype);
	
	if(version.substring(0,8) == delDateDelimiter(trans_start)) {
		GridObj2.SetParam("check_day", "TODAY"); // 당일계획

	}
	else {
		GridObj2.SetParam("check_day", "NEXT"); // 익일계획
	}
		
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url);
}

var check_select_DW3 = false;

function doQuery3() {
		
//	if(check_select_DW3) {
//		alert("조회작업중입니다(check_select_DW3)! 완료된후 다시하세요!");
//		return;
//	}
//	check_select_DW3 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "search_DW3");
	
	//-- 서버에 전송할 파라메터 설정 --//
	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	
	GridObj3.SetParam("item_id", 		 item_id);
	GridObj3.SetParam("trans_start", trans_start);
	
	// user_id
	//GridObj3.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW3");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url);
}

var check_save_DW1 = false;

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function doSave_DW1() {
 
//	if(check_save_DW1) {
//		alert("저장작업중입니다(check_save_DW1)! 완료된후 다시하세요!");
//		return;
//	}
//	check_save_DW1 = true;

	var version       = document.frm.version.value;
	var seq 	      = document.frm.seq.value;
	var trans_date 	  = document.frm.trans_start.value;
	var item_id       = document.frm.item_id.value;
	var in_trans_unit = "";
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	else if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";
	else in_trans_unit = "usr";

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "save");
	
	//-- 서버에 전송할 파라메터 설정 --//
	GridObj.SetParam("version",			version);
	GridObj.SetParam("seq",					seq);
	GridObj.SetParam("trans_date",	 trans_date);
	GridObj.SetParam("item_id",			item_id);
	GridObj.SetParam("trans_unit",in_trans_unit);
	
	var stock_type = "";
	
	if(document.frm.stock_type[0].checked == true) stock_type = "base";		// 기본상차
	else stock_type = "prod";												// 생산상차
	GridObj.SetParam("stock_type", stock_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}

var check_save_DW2 = false;
/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function doSave_DW2(version, seq, trans_date, item_id) {
 
	if(check_save_DW2) {
		alert("저장작업중입니다(check_save_DW2)! 완료된후 다시하세요!");
		return;
	}
	check_save_DW2 = true;
	check_save_DW1 = true;
	check_save_DW3 = true;
	
	// DW2의 ROW갯수가 0이면 DW1을 바로 실행하러 간다.
	if(GridObj2.GetRowCount() == 0) {
		check_save_DW2 = false;
		doSave_DW1();
		return
	}
	
	var servlet_url 	 = Project_name+"/servlet/" + class_path + job_id;
	var frc_qty 		 = document.frm.frc_qty.value;		// 사용자 예측량 //
	var week_gubn 		 = document.frm.week_gubn.value;		// 주간 구분 //
	var event_qty		 = document.frm.event_qty.value;


	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "save_DW2");
	
	//-- 서버에 전송할 파라메터 설정 --//
	GridObj2.SetParam("version",	    version);
	GridObj2.SetParam("trans_date",  trans_date);
	GridObj2.SetParam("item_id",	    item_id);
	// user_id
	GridObj2.SetParam("frc_qty", frc_qty);				// 사용자 예측량 //
	GridObj2.SetParam("event_qty", event_qty);				// 이벤트 물량 //
	GridObj2.SetParam("week_gubn",  document.frm.week_gubn.value);
	GridObj2.SetParam("user_id",     document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	

}

var check_save_DW3 = false;

function doSave_DW3(item_id) {
 
//	if(check_save_DW3) {
//		alert("저장작업중입니다(check_save_DW3)! 완료된후 다시하세요!");
//		return;
//	}
//	check_save_DW3 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "save_DW3");
	
	//-- 서버에 전송할 파라메터 설정 --//
	GridObj3.SetParam("item_id",item_id);
	// user_id
	GridObj3.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url, "CRUD");

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
		var error_msg_extra = GridObj.GetMessage();// ?
		if (check_select_DW1 == true) {
			alert("(DW1_조회에러)다시 조회해 주십시요!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW1 == true) {
			alert("(DW1_저장에러)다시 저장해주시기 바랍니다!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}
		return;
	}

	setGrid(GridObj); //WiseGrid 설정
			
	//
	var end_mode = GridObj.GetParam("mode");
	
	if(end_mode == "search") { //조회
		check_select_DW1	= false;
//		check_save_DW1 		= false;
		// FERT와 HAWA여부에 따라서 달라질 수 있으므로 다시 BOUND한다.
		GridObj2.ClearGrid();
		setHeader2();
		if(GridObj.GetStatus() == "true") { // 
		
			var paramKey  = "item_id!%!version";
			var paramCode = document.frm.item_id.value+'!%!'+document.frm.version.value;
			var queryId   = "rp_01160_get_user_forecast_qty";
			/*************************배열로 DATA를 가져와서 setting한다 sc_13010 참조 *****************************/
				
			commonUtil.getSelQeury(paramKey, paramCode, queryId,{
				callback:function(arrList){
					// 일치하는 제품 없음
					if( arrList.length == 1 ) {
						
						document.frm.frc_qty.value   = arrList[0][0];
						document.frm.week_gubn.value = arrList[0][1];
						document.frm.event_qty.value = arrList[0][2];
					}else {
						document.frm.frc_qty.value = numberFormat(0);
						document.frm.event_qty.value = numberFormat(0);
					}
				}
			});
			/******************************************************/
				

		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	}else if(end_mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
		
			doSave_DW3(document.frm.item_id.value);
/*			// DW3를 저장해야하면 실행하고 아님 전체조회를 진행한다.
			if(document.frm.chk_alloc_save.checked == true)
				doSave_DW3(document.frm.item_id.value);
			else {
				check_save_DW1 		= false;
				check_save_DW2 		= false;
				check_save_DW3 		= false;
				GoSearch("");
			}
*/
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
	
	doChange2(document.frm.scm_charge); // 품목 컴보리스트 갱신
	compute_expt_stock_dw1(); // 예상재고일수, 예상재고 갱신
	
}

function GridEndQuery2() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj2.GetStatus() != "true") {
		var error_msg_extra = GridObj2.GetMessage();

		if (check_select_DW2 == true) {
			alert("(DW2_조회에러)다시 조회해 주십시요!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW2 == true) {
			alert("(DW2_저장에러)다시 저장해주시기 바랍니다!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}
		return;
	}

	setGrid2(); //WiseGrid 설정
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //조회
		check_select_DW2	= false;
		//check_save_DW2 = false;
		doQuery3();
		if(GridObj2.GetStatus() == "true") { // 
			
		}
		
	} else if(end_mode == "doSave_DW2") {
		if(GridObj2.GetStatus() == "true") {// 
			// DW2의 저장이 성공하면 DW1저장을 시작한다.
			doSave_DW1();
		}
	}
}

function GridEndQuery3() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj3.GetStatus() != "true") {
		var error_msg_extra = GridObj3.GetMessage();
		
		if (check_select_DW3 == true) {
			alert("(DW3_조회에러)다시 조회해 주십시요!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW3 == true) {
			alert("(DW3_저장에러)다시 저장해주시기 바랍니다!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}	
		return;
	}

	setGrid3(); //WiseGrid 설정
			
	var end_mode = GridObj3.GetParam("mode");

	if(end_mode == "search_DW3") { //조회
		check_select_DW3	= false;
		//check_save_DW3 		= false;
		if(GridObj3.GetStatus() == "true") { // 
											
		} else	{ 
			var error_msg = GridObj3.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(end_mode == "doSave_DW3") {
		check_save_DW1 		= false;
		check_save_DW2 		= false;
		check_save_DW3 		= false;
		if(GridObj3.GetStatus() == "true") {// 
			GoSearch("");
		} else {
			var error_msg = GridObj3.GetMessage();// 
			alert(error_msg);			
		}
	}
}
/*┌──────────────────────────────────┐
  │WiseGrid 설정
  └──────────────────────────────────┘*/
function setGrid(){
	
/*	pre_month_sell_idx = 0;
	sales_pre_idx = 0;
	sales_pre_cum_idx = 0;
	issue_idx = 0;
	chgo_qty_idx = 0;
	sales_plan_d1_idx = 0;
	issue_d1_idx = 0;
	edi_d1_idx = 0;
	edi_d2_idx = 0;	
	goal_idx = 0;
	rate_idx = 0;
	
	GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_00"));
	GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_00"));
	GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_00"));
	GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_00"));
	GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("CHGO"));

	GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("SALES_PLAN_00_D1"));
	GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_00_D1"));
	GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_TOT_D1"));
	GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_TOT_D2"));

	GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_11"));
	GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("RATE_11"));
*/
	/* rotaion 컬럼 기존 상태 고정 */
	pre_month_sell_idx --;
	sales_pre_idx --;
	sales_pre_cum_idx --;
	issue_idx --;
	issue_cust_idx --;  //(추가)//
	chgo_qty_idx --;
	sales_plan_d1_idx --;
	issue_d1_idx --;
	edi_d_idx --; //(추가)//
	edi_d1_idx --;
	edi_d2_idx --;
	goal_idx --;
	stock_day_idx--;
	
	sales_mean_1week_idx--;	//2013-05-29 SCM팀 이승용 대리 요청 ROTATION 추가
	sales_mean_3week_idx--;	//2013-05-29 SCM팀 이승용 대리 요청 ROTATION 추가

	next_stock_idx--;
	
	HeaderClick_DW1("PRE_MONTH_SELL");
	HeaderClick_DW1("SALES_PRE");
	HeaderClick_DW1("SALES_PRE_CUM");
	HeaderClick_DW1("ISSUE");
	HeaderClick_DW1("ISSUE_CUST_00");  //(추가)//
	HeaderClick_DW1("CHGO_QTY");
	HeaderClick_DW1("STOCK_DAY");  //(추가)//
	HeaderClick_DW1("SALES_PLAN_D1");
	HeaderClick_DW1("ISSUE_D1");
	HeaderClick_DW1("EDI_00_D");  //(추가)//
	HeaderClick_DW1("EDI_00_D1");
	HeaderClick_DW1("EDI_00_D2");
	HeaderClick_DW1("GOAL_00");
	
	HeaderClick_DW1("SALES_MEAN_1WEEK_1");	//2013-05-29 SCM팀 이승용 대리 요청 ROTATION 추가
	HeaderClick_DW1("SALES_MEAN_3WEEK_3");	//2013-05-29 SCM팀 이승용 대리 요청 ROTATION 추가

	HeaderClick_DW1("NEXT_STOCK_DAY");	
			
	// 컬럼 배경색
	GridObj.SetColCellBgColor('SAFETY_STOCK','219|219|183');//안전재고
	GridObj.SetColCellBgColor('TRANS_PLAN_PLT',color_edit_col);//PLT
	GridObj.SetColCellBgColor('TRANS_PLAN_QTY',color_edit_col);//BOX
	GridObj.SetColCellBgColor('MIN_PICK_QTY','219|219|183');//최소수송단위

	GridObj.SetColCellBgColor('PRE_MONTH_SELL','232|232|255');//전월판매
	GridObj.SetColCellBgColor('SALES_PRE_CUM','232|232|255');//판매누계
	GridObj.SetColCellBgColor('STOCK_EXPT','232|232|255');//예상재고
    
    var safety_stock_flag;
    var rowCnt = GridObj.GetRowCount();
    // VER 3.4 정정사항
    var index_tot = 0, index_cdc = 0, index_rdc = 0;
    var cum_cust_tot = 0, cum_cust_cdc = 0, cum_cust_rdc = 0;
    var cum_cust10_tot = 0, cum_cust10_cdc = 0, cum_cust10_rdc = 0;
    var cum_cust11_tot = 0, cum_cust11_cdc = 0, cum_cust11_rdc = 0;
    var cum_cust16_tot = 0, cum_cust16_cdc = 0, cum_cust16_rdc = 0;
    var cum_cust14_tot = 0, cum_cust14_cdc = 0, cum_cust14_rdc = 0;
    var cum_cust19_tot = 0, cum_cust19_cdc = 0, cum_cust19_rdc = 0;
    var cum_cust18_tot = 0, cum_cust18_cdc = 0, cum_cust18_rdc = 0;
    var cum_cust99_tot = 0, cum_cust99_cdc = 0, cum_cust99_rdc = 0;
    for ( i = 0 ; i < rowCnt ; i++ ){

    	var dc_name = GridObj.GetCellValue("DC_NAME", i);
	    if( dc_name == "전체합계" || dc_name == "CDC합계" || dc_name == "RDC합계" ){
	    	GridObj.SetRowBgColor(i, color_tot); // row 배경색
	    	GridObj.SetCellFontBold('DC_NAME', i, 'true'); // font 굵기  
	    	GridObj.SetCellActivation('SAFETY_STOCK', 	i, 'disable'); //선택할 수 없고 편집할 수 없다. 
	    	GridObj.SetCellActivation('TRANS_PLAN_PLT', i, 'disable'); //선택할 수 없고 편집할 수 없다. 
	    	GridObj.SetCellActivation('TRANS_PLAN_QTY', i, 'disable'); //선택할 수 없고 편집할 수 없다. 
	    	GridObj.SetCellActivation('SRC_LOC', 		i, 'disable'); //선택할 수 없고 편집할 수 없다. 
	    	GridObj.SetCellActivation('MIN_PICK_QTY', 	i, 'disable'); //선택할 수 없고 편집할 수 없다. 

	    	if(dc_name == "전체합계") index_tot = i;
	    	if(dc_name == "CDC합계")  index_cdc = i;
	    	if(dc_name == "RDC합계")  index_rdc = i;
	    	
	    }
	    else {
	    	safety_stock_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);
	    	if(safety_stock_flag == "01") {
				GridObj.SetCellBgColor('DC_NAME', i, '255|173|143');
	    	}
	    	
    		cum_cust_tot 	= cum_cust_tot + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
    		cum_cust10_tot = cum_cust10_tot + strToNum(GridObj.GetCellValue('CUST_10',i));	
    		cum_cust11_tot = cum_cust11_tot + strToNum(GridObj.GetCellValue('CUST_11',i));	
    		cum_cust16_tot = cum_cust16_tot + strToNum(GridObj.GetCellValue('CUST_16',i));	
    		cum_cust14_tot = cum_cust14_tot + strToNum(GridObj.GetCellValue('CUST_14',i));	
    		cum_cust19_tot = cum_cust19_tot + strToNum(GridObj.GetCellValue('CUST_19',i));	
    		cum_cust18_tot = cum_cust18_tot + strToNum(GridObj.GetCellValue('CUST_18',i));	
    		cum_cust99_tot = cum_cust99_tot + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	if(index_cdc == 0) { // From cdc row!
	    		cum_cust_cdc = cum_cust_cdc + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
	    		cum_cust10_cdc = cum_cust10_cdc + strToNum(GridObj.GetCellValue('CUST_10',i));	
	    		cum_cust11_cdc = cum_cust11_cdc + strToNum(GridObj.GetCellValue('CUST_11',i));	
	    		cum_cust16_cdc = cum_cust16_cdc + strToNum(GridObj.GetCellValue('CUST_16',i));	
	    		cum_cust14_cdc = cum_cust14_cdc + strToNum(GridObj.GetCellValue('CUST_14',i));	
	    		cum_cust19_cdc = cum_cust19_cdc + strToNum(GridObj.GetCellValue('CUST_19',i));	
	    		cum_cust18_cdc = cum_cust18_cdc + strToNum(GridObj.GetCellValue('CUST_18',i));	
	    		cum_cust99_cdc = cum_cust99_cdc + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	}
	    	else {
	    		cum_cust_rdc = cum_cust_rdc + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
	    		cum_cust10_rdc = cum_cust10_rdc + strToNum(GridObj.GetCellValue('CUST_10',i));	
	    		cum_cust11_rdc = cum_cust11_rdc + strToNum(GridObj.GetCellValue('CUST_11',i));	
	    		cum_cust16_rdc = cum_cust16_rdc + strToNum(GridObj.GetCellValue('CUST_16',i));	
	    		cum_cust14_rdc = cum_cust14_rdc + strToNum(GridObj.GetCellValue('CUST_14',i));	
	    		cum_cust19_rdc = cum_cust19_rdc + strToNum(GridObj.GetCellValue('CUST_19',i));	
	    		cum_cust18_rdc = cum_cust18_rdc + strToNum(GridObj.GetCellValue('CUST_18',i));	
	    		cum_cust99_rdc = cum_cust99_rdc + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	}
	    	
	    }
	    
    }

    // numbers of customer setting to cell
    GridObj.SetCellValue('CUST_TOT', index_tot, cum_cust_tot); GridObj.SetCellValue('CUST_00', index_tot, cum_cust_tot);
    GridObj.SetCellValue('CUST_TOT', index_cdc, cum_cust_cdc); GridObj.SetCellValue('CUST_00', index_cdc, cum_cust_cdc);
    GridObj.SetCellValue('CUST_TOT', index_rdc, cum_cust_rdc); GridObj.SetCellValue('CUST_00', index_rdc, cum_cust_rdc);
    GridObj.SetCellValue('CUST_10', index_tot, cum_cust10_tot);
    GridObj.SetCellValue('CUST_11', index_tot, cum_cust11_tot);
    GridObj.SetCellValue('CUST_16', index_tot, cum_cust16_tot);
    GridObj.SetCellValue('CUST_14', index_tot, cum_cust14_tot);
    GridObj.SetCellValue('CUST_19', index_tot, cum_cust19_tot);
    GridObj.SetCellValue('CUST_18', index_tot, cum_cust18_tot);
    GridObj.SetCellValue('CUST_99', index_tot, cum_cust99_tot);
	
    GridObj.SetCellValue('CUST_10', index_cdc, cum_cust10_cdc);
    GridObj.SetCellValue('CUST_11', index_cdc, cum_cust11_cdc);
    GridObj.SetCellValue('CUST_16', index_cdc, cum_cust16_cdc);
    GridObj.SetCellValue('CUST_14', index_cdc, cum_cust14_cdc);
    GridObj.SetCellValue('CUST_19', index_cdc, cum_cust19_cdc);
    GridObj.SetCellValue('CUST_18', index_cdc, cum_cust18_cdc);
    GridObj.SetCellValue('CUST_99', index_cdc, cum_cust99_cdc);

    GridObj.SetCellValue('CUST_10', index_rdc, cum_cust10_rdc);
    GridObj.SetCellValue('CUST_11', index_rdc, cum_cust11_rdc);
    GridObj.SetCellValue('CUST_16', index_rdc, cum_cust16_rdc);
    GridObj.SetCellValue('CUST_14', index_rdc, cum_cust14_rdc);
    GridObj.SetCellValue('CUST_19', index_rdc, cum_cust19_rdc);
    GridObj.SetCellValue('CUST_18', index_rdc, cum_cust18_rdc);
    GridObj.SetCellValue('CUST_99', index_rdc, cum_cust99_rdc);
    
    // 초기 공급율, 가감량 구하기
    setSupplyRateAndBox("normal");    
	
	doGrouping();
}

function set_GroupMerge_dw1() {

	// 컬럼 그룹
	GridObj.SetGroupMerge(	'DC_ID,DC_NAME,' +
							'GOAL_00,GOAL_11,GOAL_13,GOAL_14,GOAL_17,GOAL_18,GOAL_21,GOAL_23,RATE_00,RATE_11,RATE_13,RATE_14,RATE_17,RATE_18,RATE_21,RATE_23,' +
							'SUPPLY_RATE,SUPPLY_RATE_BOX,' +
							'PRE_MONTH_SELL,PRE_MONTH_SELL_00,PRE_MONTH_SELL_01,PRE_MONTH_SELL_02,PRE_MONTH_SELL_03,PRE_MONTH_SELL_04,PRE_MONTH_SELL_05' +
							'SALES_PLAN,' +
							'SALES_PRE_CUM,SALES_PRE_CUM_00,SALES_PRE_CUM_01,SALES_PRE_CUM_02,SALES_PRE_CUM_03,SALES_PRE_CUM_04,SALES_PRE_CUM_05' +
							'SALES_PRE,SALES_PRE_00,SALES_PRE_01,SALES_PRE_02,SALES_PRE_03,SALES_PRE_04,SALES_PRE_05' +
							'ISSUE,ISSUE_00,ISSUE_YO,ISSUE_YS,ISSUE_TA,ISSUE_WMS,ISSUE_EX,' +
							'SALES_MEAN_1WEEK,SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK,SALES_MEAN_3WEEK_ETC,' +
							'BASE_STOCK,RECEIPT,CHGO_QTY,CHGO,DELV,TRAN,STOCK_DAY,STOCK_DAY_1W, STOCK_DAY_3W,STOCK_TERM,' +
							'SALES_PLAN_D1,SALES_PLAN_00_D1,DC_ALLOC_PLAN_D1,' +
							'ISSUE_D1,ISSUE_00_D1,ISSUE_YO_D1,ISSUE_YS_D1,ISSUE_TA_D1,ISSUE_WMS_D1,ISSUE_EX_D1,' +
							'STOCK_EXPT,REP_QTY,'+
							'NEXT_STOCK_DAY,NEXT_STOCK_DAY_1W,NEXT_STOCK_DAY_3W'+
							'NEXT_STOCK_EXPT,' +
							'EDI_00_D,EDI_22_D,EDI_21_D,EDI_ETC_D,' +
							'EDI_00_D1,EDI_22_D1,EDI_21_D1,EDI_ETC_D1,' +
							'EDI_00_D2,EDI_22_D2,EDI_21_D2,EDI_ETC_D2,' +
							'REMN_CAPA_BOX,' +
							'CUST_00,CUST_TOT,CUST_10,CUST_11,CUST_16,CUST_14,CUST_19,CUST_18,CUST_99,' +
							'MAP_STOCK_BOX'); 
	
}


function setGrid2(){
		// 컬럼 그룹
	GridObj2.SetColFix('DC_NAME');
			
	// 편집 여부 설정
	//GridObj.SetColCellActivation('SP01','disable');
	
	//컬럼 글자색
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// 셀 배경
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	for(i=0;i<GridObj2.GetRowCount( );i++ ) {
		// FERT이고 생산가능공장이면 출고가능량을 출고확정량으로 COPY한다.
		if(GridObj2.GetCellValue("PROD_AVAILABLE", i) == "Y" && document.frm.itype.value == "FERT") {
//			GridObj2.SetCellValue('TRANS_QTY',i,GridObj2.GetCellValue("CONF_STOCK", i));
			GridObj2.SetCellBgColor('DC_NAME', i, '202|255|255');
		}
		else {
//			GridObj2.SetCellValue('TRANS_QTY',i,0);
		}
	}	

	// 합계
	GridObj2.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'BASE_STOCK,CHGO_QTY,PROD01_1,PROD01_3,CONF_STOCK,TRANS_QTY,NEXT_CHGO_QTY,NEXT_TRANS_QTY,USE_CAPA,PROD01,PROD02,PROD03,PROD04,PROD05,PROD06,PROD07,PROD08,PROD09,PROD10,PROD11,PROD12,PROD13,PROD14,PROD15,PROD16,PROD17,PROD18,PROD19,PROD20'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
			
	// 컬럼 배경색
	GridObj2.SetColCellBgColor('TRANS_QTY',color_edit_col);//확정량
	GridObj2.SetColHDBgColor('USE_CAPA','253|228|229'); //전체재고
 
	// cross-docking품목일 때는 익일계획이 rotation column이다!
	if(document.frm.cd_gubn.value == "CROSS-DOCKING") {
		GridObj2.SetColHDBgColor('NEXT_TRANS_QTY','253|228|229');
	}	
	
}

function setGrid3(){ 			//안전 2012-05-30 이승용 대리 요청//

	var alloc_zone;
	var rowCnt = GridObj3.GetRowCount();
	for ( i = 0 ; i < rowCnt ; i++ ){
		alloc_zone = GridObj3.GetCellValue("ALLOC_ZONE", i);
		if( alloc_zone != "안전" ){
			GridObj3.SetRowBgColor(i, '255|173|143'); // row 배경색
			//GridObj3.SetCellFontBold('CNFM_DATE', i, 'true'); // font 굵기  
			GridObj3.SetCellFontBold('ALLOC_ZONE', i, 'true'); // font 굵기  
   		}
	}
}

/*********************************************   WiseGrid Event   *********************************************************/ 

/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	
	//alert("nOldIndex="+nOldIndex);
	//alert("nNewIndex="+nNewIndex);
	
	if( strColumnKey == "SRC_LOC" ){ // CDC변경
	
		var old_box_per_plt = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
		var src_loc 		= Number(GridObj.GetComboHiddenValue('SRC_LOC',nNewIndex));
		var item_id			= document.frm.item_id.value;		
			
		commonUtil.getSelQeury( "src_loc!%!item_id", src_loc+"!%!"+item_id, "rp_01160_Get_BOX_PER_PAL",{
			callback:function(result){
//alert(Number(result[0][1]));
		 		if(old_box_per_plt != Number(result[0][1])) {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, Number(result[0][1]));
				
					if(Number(GridObj.GetCellValue("TRANS_PLAN_QTY", nRow)) > 0)
						// 공장의 기준 팔렛당 박스수가 변경되었으므로 다시 계산
						if(document.frm.in_trans_unit[0].checked == true) // 수송단위 pal
							GridChangeCell("TRANS_PLAN_PLT",nRow ); // 팔렛기준으로 정정
						else // 수송단위 box or 최소수송단위
							GridChangeCell("TRANS_PLAN_QTY",nRow ); // 수량기준으로 정정 
				}
		
			}
		});   
	}
	
};

//--------------------------------------   main_template 에 정의된 Event ---------------------------------------------------//
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/
function GridChangeCell(strColumnKey, nRow) {
//	setChangeCheckFlag(objBox);
	if( strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY" ){
		// BOX 인 경우
		if( strColumnKey == "TRANS_PLAN_QTY" ) {
			// PLT 수량 계산
			var boxQty 		= Number(GridObj.GetCellValue("TRANS_PLAN_QTY", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty   = Math.round(boxQty*100 / boxPerPalet)/100;
			GridObj.SetCellValue("TRANS_PLAN_PLT", nRow, resultQty	);

		}
		// PLT 인 경우
		if( strColumnKey == "TRANS_PLAN_PLT" ) {
			// Box 수량 계산
			var pltQty 		= Number(GridObj.GetCellValue("TRANS_PLAN_PLT", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty   = Math.round(Math.round(pltQty * boxPerPalet*100)/100,0);
			GridObj.SetCellValue("TRANS_PLAN_QTY", nRow, resultQty	);
		}
		
		// 변경 플래그
//		GridObj.SetCellValue("PLAN_UPDATE_FLAG", nRow, "Y");
		compute_expt_stock_dw1(); // 소계, 합계, 예상재고일수, 예상재고 갱신
		
		oldRow = nRow;
	}
	else if( strColumnKey == "SAFETY_STOCK" ){
		// 변경 플래그
		GridObj.SetCellValue("SAFE_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}
	else if( strColumnKey == "MIN_PICK_QTY" ){
		// 변경 플래그
		GridObj.SetCellValue("UNIT_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}

}

/*┌───────────────────────────────────────┐
  │WiseGrid User Context Menu Click Event
  └───────────────────────────────────────┘*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
	if( strMenuKey == "MENU_CELL" ){// CELL 클릭시 메뉴
		
		if( strMenuItemKey == "MENU01" ){		// ROW 추가
		
			insertRow( nRow );	
			
		}
		else {
			alert("존재 하지 않은 메뉴입니다.");
		}		
	}

};


/*┌──────────────────────────────────┐
  │WiseGrid Cell Click Event
  └──────────────────────────────────┘*/
function GridCellClick(strColumnKey, nRow){
/*
	var dc_name = GridObj.GetCellValue("DC_NAME", nRow);
	if( (strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY")
		&& ( dc_name != "전체 합계" && dc_name != "CDC 합계" && dc_name != "RDC 합계" ) ){

		// 출고장을 선택하지 않고 값을 수정하려고 한 경우..
		var dc_id = GridObj.GetCellValue("SRC_LOC", nRow);
		if( dc_id == "" || dc_id == null){
			alert("PLT, BOX값을 수정하기 전에 출고장을 먼저 선택하여 주십시요.");
			GridObj.SetCellFocus('SRC_LOC', nRow, true) 
			return;
		}

		// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
		var item_id = document.frm.item_id.value;
		if( item_id == null || item_id == "" ){
			return
		}		
		
		replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet_new", { 
		//replenishPlan.getBoxPerPalet(DC_SHORT_NAME, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
			callback:function(boxPerPalet){
				if( boxPerPalet == null || boxPerPalet == "" ) {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, '100');
				}
				else {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, boxPerPalet);
				}
			}
		});	
	}
	*/

}

function CellDblClick_DW2(strColumnKey, nRow) {
	
	
	
	

	if(strColumnKey == "DC_NAME") {
		GridObj2.SetCellValue('TRANS_QTY',nRow,GridObj2.GetCellValue("CONF_STOCK", nRow));
	}
}

function CellDblClick_DW3(strColumnKey, nRow) {

	/* 안전->전국(01)->유통(04)->시판(05)->수도(02)->부산(03) ->		//
	// 추가 CVS(06)-> 유통+CVS(07) -> CVS+시판(08)-> 유통+시판 (09) */
	
	if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "안전") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '전국');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "전국") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "유통") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '시판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "시판") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '수도');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "수도") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '부산');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "부산") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '06');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}
	///////////////////////// 공급할당 지역 추가 ////////////////////////////
	// 추가 CVS(06)-> 유통+CVS(07) -> CVS+시판(08)-> 유통+시판 (09)
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "CVS") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통+CVS');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '07');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "유통+CVS") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS+시판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '08');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "CVS+시판") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통+시판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '09');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}	
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "유통+시판") {		//2012-12-28 SCM팀 이승용 대리 요청//
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '특판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '10');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "특판") {			//2012-12-28 SCM팀 이승용 대리 요청//
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '특판+시판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '11');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기 
	}
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "특판+시판") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '안전');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  
	}	
	///////////////////////// 공급할당 지역 추가 ////////////////////////////


/*	// 안전->전국(01)->수도(02)->부산(03)->유통(04)->시판(05)
	
	if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "시판") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '안전');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "안전") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '전국');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "전국") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '수도');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "수도") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '부산');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "부산") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  

	}
	else {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '시판');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font 굵기  
	}
*/
	
/*	if(GridObj3.GetCellValue("ALLOC_GUBN", nRow) == "관리") {
		GridObj3.SetCellValue("ALLOC_GUBN", nRow, '안전');
		GridObj3.SetCellHiddenValue("ALLOC_GUBN", nRow, '1');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_GUBN', nRow, 'false'); // font 굵기  

	}
	else {

		GridObj3.SetCellValue("ALLOC_GUBN", nRow, '관리');
		GridObj3.SetCellHiddenValue("ALLOC_GUBN", nRow, '2');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
    	GridObj3.SetCellFontBold('ALLOC_GUBN', nRow, 'true'); // font 굵기  
	}
*/	
	
}

// 수송계획 소계, 합계, 익일 재고일수, 익일 예상재고 계산
function compute_expt_stock_dw1() {

	var tot_box		 = 0, tot_cdc_box		= 0, tot_rdc_box		= 0, tot_temp_box;
	var tot_tran_pl  = 0, tot_cdc_tran_pl	= 0, tot_rdc_tran_pl	= 0;
	var tot_tran_box = 0, tot_cdc_tran_box	= 0, tot_rdc_tran_box	= 0;
	var stock_expt 	 = 0, trans_plan_qty 	= 0, trans_plan_plt 	= 0, expt_stock_day = 0, expt_stock_box = 0;
	var dc_mean_sell = 0,dc_mean_sell_3w = 0, dc_mean_sell_1w = 0, cdc_chgo_box 		= 0;
	var tot_index, tot_cdc_index, tot_rdc_index;
	// 구성량/가감량/공급할당 판단
//	var in_supply_gubn = document.frm.in_supply_gubn.value;
	var in_supply_gubn = "01";
	// 3주평균/1주평균/(1+3)주/2 여부 판단
//	var in_mean_sell = document.frm.in_mean_sell.value;
	var in_mean_sell = "01";
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  // 
		cdc_cnt = GridObj.GetCellValue("CDC_CNT", i);
		dc_id 	= GridObj.GetCellValue("DC_ID", i);
		if(ord_no != '1' && ord_no != '3' && ord_no != '5') { // 합계,소계
			
			dc_mean_sell    = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);
			dc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
			dc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
			
			stock_expt 		= GridObj.GetCellValue("STOCK_EXPT", i);
			trans_plan_qty  = 0;
			trans_plan_plt  = 0;
			cdc_chgo_box	= 0;
			
			// 복수 CDC 계획이 있는 경우는 합쳐줘야 한다.
			for(j=0;j<GridObj.GetRowCount( );j++ ) {
				// 이고입고계획
				if(dc_id == GridObj.GetCellValue("DC_ID", j)) {
					trans_plan_qty = trans_plan_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
					trans_plan_plt = trans_plan_plt + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", j));
				}
				// 수송출고계획
				if(dc_id == GridObj.GetCellHiddenValue('SRC_LOC',j)) {
					cdc_chgo_box = cdc_chgo_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
				}
			}
			
			/* 기존 3주평균 재고일수 계산 */
			if(dc_mean_sell <= 0) {
				expt_stock_day = 0.0;
			
				expt_stock_box = strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
			}
			else {
				
				expt_stock_day	= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell * 10)/10;		//3주 평균 //
				expt_stock_box	= strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
								
			}
			
			/* 3주평균 재고일수 계산 */
			if(dc_mean_sell_3w <= 0) {
				expt_stock_day_3w = 0.0;
			
				expt_stock_box = strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
			}
			else {
				
				expt_stock_day_3w		= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell_3w * 10)/10;		//3주 평균 //
				expt_stock_box	= strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
								
			}
			/* 1주평균 재고일수 계산 */
			if(dc_mean_sell_1w <= 0) {
				expt_stock_day_1w = 0.0; // 1주 평균 초기화 //
			}
			else {
				expt_stock_day_1w	= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell_1w * 10)/10;
			}
			
			if(next_stock_idx == 0) {	
				GridObj.SetCellValue("NEXT_STOCK_DAY",	 i,      expt_stock_day_1w);      
			}
			else {
				GridObj.SetCellValue("NEXT_STOCK_DAY",	 i,      expt_stock_day_3w);      
			}
			GridObj.SetCellValue("NEXT_STOCK_DAY_1W",i,   expt_stock_day_1w);      //1주 평균 추가 //
			GridObj.SetCellValue("NEXT_STOCK_DAY_3W",i,   expt_stock_day_3w);			//3주 평균 //
			GridObj.SetCellValue("NEXT_STOCK_EXPT",  i,		 expt_stock_box);

			tot_box = tot_box + expt_stock_box;
			if(ord_no == '2' && cdc_cnt == 1 ) { // 중복라인은 제외
				tot_cdc_box = tot_cdc_box + expt_stock_box; // CDC이다
			}
			else if(ord_no == '4' && cdc_cnt == 1 ) { // 중복라인은 제외
				tot_rdc_box = tot_rdc_box + expt_stock_box; // RDC이다
			}
			
			// 수송량, 팔렛 소계, 총계
			tot_tran_box =	tot_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
			tot_tran_pl  =  tot_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			if(ord_no == '2') { 
				tot_cdc_tran_box = tot_cdc_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
				tot_cdc_tran_pl  = tot_cdc_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			}
			else if(ord_no == '4') {
				tot_rdc_tran_box = tot_rdc_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
				tot_rdc_tran_pl  = tot_rdc_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			}
		}
		else {  // 합계,소계부분의 index를 저장한다.
			if(ord_no == '1') tot_index = i;  //총계
			else if(ord_no == '3') tot_cdc_index = i;  //CDC합계
			else tot_rdc_index = i; // RDC합계
		}
		
		// 수량이 있는 곳은 font를 bold로 한다.
		if(strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)) > 0) {
	    	GridObj.SetCellFontBold('TRANS_PLAN_PLT', i, 'true'); // font 굵기  
	    	GridObj.SetCellFontBold('TRANS_PLAN_QTY', i, 'true'); // font 굵기  
    	}
    	else {
	    	GridObj.SetCellFontBold('TRANS_PLAN_PLT', i, 'false'); // font 굵기  
	    	GridObj.SetCellFontBold('TRANS_PLAN_QTY', i, 'false'); // font 굵기  
    	}
		
	}

	var tot_mean_sell  	  = 0, tot_mean_sell_3w  	= 0, tot_mean_sell_1w  	  = 0;
	var tot_cdc_mean_sell = 0, tot_cdc_mean_sell_3w = 0, tot_cdc_mean_sell_1w = 0;
	var tot_rdc_mean_sell = 0, tot_rdc_mean_sell_1w = 0, tot_rdc_mean_sell_1w = 0;
	
	// (익일예상재고 + 수송계획량(현재 수송버젼)) / 3주평균
		tot_mean_sell_3w 	 = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_index);
		tot_cdc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_cdc_index);
		tot_rdc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_rdc_index);	
		tot_mean_sell_1w 	 = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_index);
		tot_cdc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_cdc_index);
		tot_rdc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_rdc_index);	

if(next_stock_idx == 0) {	
	// 합계,소계부분 갱신한다. //1주 평균 추가 //
	if (tot_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, Math.round(tot_box/tot_mean_sell_1w*10)/10);
	if (tot_cdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_1w*10)/10);
	if (tot_rdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_1w*10)/10);
}
else {
	// 합계,소계부분 갱신한다. //기존 3주 평균 계산//
	if (tot_mean_sell_3w<= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, Math.round(tot_box/tot_mean_sell_3w*10)/10);
	if (tot_cdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_3w*10)/10);
	if (tot_rdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_3w*10)/10);
}
	// 합계,소계부분 갱신한다. //3주 평균 //
	if (tot_mean_sell_3w<= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_index, Math.round(tot_box/tot_mean_sell_3w*10)/10);
	if (tot_cdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_3w*10)/10);
	if (tot_rdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_3w*10)/10);
	
	// 합계,소계부분 갱신한다. //1주 평균 추가 //
	if (tot_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_index, Math.round(tot_box/tot_mean_sell_1w*10)/10);
	if (tot_cdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_1w*10)/10);
	if (tot_rdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_1w*10)/10);
	
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_index,tot_box);
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_cdc_index,tot_cdc_box);
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_rdc_index,tot_rdc_box);

	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_index,tot_tran_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_cdc_index,tot_cdc_tran_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_rdc_index,tot_rdc_tran_box);

	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_index,tot_tran_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_cdc_index,tot_cdc_tran_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_rdc_index,tot_rdc_tran_pl);
	
	next_stock_idx--;
	HeaderClick_DW1("NEXT_STOCK_DAY");	
	
	// 공급율, 가감량도 계산
	setSupplyRateAndBox("normal");
}

///////////////////////////////////////////////////////////
// 전체공급량을 배송지점으로 할당하는 함수
// ORD_NO : 총합계 1, CDC 2, CDC합계 3, RDC 4, RDC합계 5
// CDC_CNT : 복수의 CDC에서 보충되는 경우 1,2,3,...  사용자가 ROW를 추가할 경우는 CNT를 늘려주자!
///////////////////////////////////////////////////////////
function Do_DC_Allocate(obj) {

	var confirm_qty = obj.value;
	var confirm_trans_qty = GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true);

	// 1. DW2에서 확정된 총량과 CONFIRM한 수량과 비교해서 더 큰 박스를 진행하려고 할때는 확인 메세지를 표시한다.
	if(strToNum(confirm_qty) > strToNum(confirm_trans_qty) 
		&& confirm("출고확정량("+numberFormat(confirm_trans_qty)+")보다 전체공급량("+numberFormat(confirm_qty)+")이 큽니다! 계속 진행하시겠습니까?") != 1 ) {
		return;
	}

//alert(GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true));

	var dc_id, cdc_id;
	var ord_no, cdc_cnt;
	var tot_box = 0, tot_cdc_box = 0, tot_rdc_box = 0, tot_temp_box, end_tot_box=0;
	var tot_pl  = 0, tot_cdc_pl  = 0, tot_rdc_pl  = 0;
	var tot_index, tot_cdc_index, tot_rdc_index;
	var tot_mean_sell = 0, tot_stock_expt = 0;
	var dc_trans_qty, dc_pl_qty, dc_mean_sell = 0, dc_stock_expt;
	var dc_trans_usr_temp;
	var continue_flag;
	
	// C/D 취급방법 01 : C/D제거, 02 : C/D중계, 03 : 일반
	var chk_involve_CD = document.frm.chk_involve_CD.value; 
	var cd_flag = "00", cd_flag_temp = "00";
	
	// 구성량/가감량/공급할당 판단
	var in_supply_gubn = document.frm.in_supply_gubn.value;
	// 3주평균/1주평균/(1+3)주/2 여부 판단
	var in_mean_sell   = document.frm.in_mean_sell.value;
	var cdc_check_flag = false;

	var in_zone_gubn   = document.frm.in_zone_gubn.value; // 전체/수도권/부산권 구분
	
	// 가감량 초기화
	setSupplyRateAndBox("init");

	// 확정량 0는 모든계획 삭제
	if(strToNum(confirm_qty)<=0) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			GridObj.SetCellValue("TRANS_PLAN_PLT",i,0)
			GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
			GridObj.SetComboSelectedIndex('SRC_LOC',i,-1);
			// 복수개 라인일 경우 한개만 남긴다.
			if(GridObj.GetCellValue("CDC_CNT", i) != "1") {
				GridObj.DeleteRow(i);
				i--;
				continue;
			}
		}
		compute_expt_stock_dw1(); // 예상재고일수, 예상재고 갱신
		return;
	}

// VER 3.1 재고일수 평준화를 위해 DO WHILE문으로 배분을 반복한다.
do {
	
	end_tot_box    = tot_box; 
	tot_mean_sell  =  0;
	tot_stock_expt =  0;
	// 전국 예상판매와 전국 예상재고에서 공급CDC의 물량은 제거한다.
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  // 
		cdc_cnt = GridObj.GetCellValue("CDC_CNT", i);
		dc_id   = GridObj.GetCellValue("DC_ID", i);
		cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);

		// 복수개 라인일 경우 한개만 남긴다.
		if(GridObj.GetCellValue("CDC_CNT", i) != "1") {
			GridObj.DeleteRow(i);
			i--;
			continue;
		}
		// ver 2.0 부산배송은 계산시 삭제처리되도록 ord_no를 '7'로 만든다!
		if(dc_id == "7700") {
			GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
			GridObj.SetCellValue("ORD_NO", i, "7");
			continue;
		}
		
		// VER 3.0 수도권/부산권 계산시
		if(in_zone_gubn == "1"){ // 수도권
			if(GridObj.GetCellValue("ZONE", i) == "7") {
				GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
				GridObj.SetCellValue("ORD_NO", i, "7");
				continue;
			}
		}
		else if(in_zone_gubn == "7") { // 부산권
			if(GridObj.GetCellValue("ZONE", i) == "1") {
				GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
				GridObj.SetCellValue("ORD_NO", i, "7");
				continue;
			}
		}
		
		if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7' && cdc_cnt == 1) { // 합계,소계, 중복라인은 제외
			for(j=0;j<GridObj2.GetRowCount( );j++ ) {
				cdc_id = GridObj2.GetCellHiddenValue("DC_NAME", j);
				if(dc_id == cdc_id && strToNum(GridObj2.GetCellValue("TRANS_QTY", j)) > 0) {	// 공급확정량이 있는 CDC인지 여부확인

					cdc_check_flag = true;
					break;
				}
			}
			if( chk_involve_CD == "01" ) { // CD구분 : C/D제거 
				if(cdc_check_flag == false && cd_flag != "01"){ // 공급CDC가 아닌경우만 처리

					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
						tot_mean_sell = strToNum(tot_mean_sell) + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
					}
					else if(in_supply_gubn == "02"){ // 판매계획(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
					}	
					else if(in_supply_gubn == "03"){ // 공급할당(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
					}
					else if(in_supply_gubn == "04"){ // 공급율
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
					}
					tot_stock_expt = strToNum(tot_stock_expt) + strToNum(GridObj.GetCellValue("STOCK_EXPT", i));
				}
			}
			else  { // CD구분 : C/D중계, 일반

				if(cdc_check_flag == false){ // 공급CDC가 아닌경우만 처리
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
						tot_mean_sell = strToNum(tot_mean_sell) + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
					}
					else if(in_supply_gubn == "02"){ // 판매계획(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
					}	
					else if(in_supply_gubn == "03"){ // 공급할당(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
					}
					else if(in_supply_gubn == "04"){ // 공급율
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
					}
					tot_stock_expt = strToNum(tot_stock_expt) + strToNum(GridObj.GetCellValue("STOCK_EXPT", i));
				}
			
			}
			
			cdc_check_flag = false;		
		}
	}

//alert("tot_mean_sell = "+tot_mean_sell+"  tot_stock_expt = "+tot_stock_expt);

	// 젯수가 0인경우를 체크한다.
	if(tot_mean_sell<= 0) return;

	tot_box = 0;

	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);
		dc_id	= GridObj.GetCellValue("DC_ID", i);

		// PL,BOX,CDC 초기화 
		GridObj.SetCellValue("TRANS_PLAN_PLT",i,0)
		GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
		GridObj.SetComboSelectedIndex('SRC_LOC',i,-1);
		cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);
		
		continue_flag = true;
		if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외

			// 공급CDC인지 check한다.
			if(ord_no == "2") { // CDC인 경우에 대해서만 확인
				for(j=0;j<GridObj2.GetRowCount( );j++ ) {
		
					if(GridObj2.GetCellValue("TRANS_QTY", j) > 0) {
						if(dc_id == GridObj2.GetCellHiddenValue("DC_NAME", j)) {
//alert("(2)ord_no ="+ord_no+"  dc_id = "+dc_id);	
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
							continue_flag = false;  // 이하 계산을 진행하지 않는다.
							break;
						}
					}		
			
				}
			}
			
			if( chk_involve_CD == "01" ) { // CD구분 : C/D제거 
				
				if(continue_flag == true && cd_flag != "01") {	
					
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
						dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
						dc_mean_sell = GridObj.GetCellValue("PRE_MONTH_SELL", i);	
					}
					else if(in_supply_gubn == "02"){ // 판매계획(D+1)
						dc_mean_sell = GridObj.GetCellValue("SALES_PLAN_00_D1", i);
					}	
					else if(in_supply_gubn == "03"){ // 공급할당(D+1)
						dc_mean_sell = GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i);
					}
					else if(in_supply_gubn == "04"){ // 공급율
						dc_mean_sell = GridObj.GetCellValue("SUPPLY_RATE_BOX", i);
					}
	
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC 예상재고
					// DC보충량 결정
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
//if(dc_id == "8510") alert(" 3주판매 = "+dc_mean_sell+" 총판매 = "+tot_mean_sell+" 총예상재고 = "+tot_stock_expt+" 확정량 = "+confirm_qty+" 예상재고 = "+dc_stock_expt +" 보충량 = "+dc_trans_qty);
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}
				
					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
			}
			else if(chk_involve_CD == "02" ) { // CD구분 : C/D중계수송

				if(continue_flag == true && cd_flag != "01") {	
					dc_mean_sell = 0;
					if(ord_no == "2") { // CDC이다!
						for(j=0;j<GridObj.GetRowCount( );j++ ) {
							
							cd_flag_temp = GridObj.GetCellValue("SAFETY_STOCK_FLAG", j);
							if((GridObj.GetCellValue("CD_SRC_LOC",j) == dc_id  && cd_flag_temp == "01")
								|| GridObj.GetCellValue("CD_SRC_LOC",j) == dc_id ) { // 내가 주출고장이면서 C/D인 것! 
						
								if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j));	
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", j));	
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
									dc_mean_sell = dc_mean_sell + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", j)) 
													+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j)))/2);
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", j));	
								}
								else if(in_supply_gubn == "02"){ // 판매계획(D+1)
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", j));
								}	
								else if(in_supply_gubn == "03"){ // 공급할당(D+1)
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", j));
								}
								else if(in_supply_gubn == "04"){ // 공급율
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", j));
								}
							}
							
						}
					}
					else {
						
						if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
							dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
											+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
							dc_mean_sell = strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
						}
						else if(in_supply_gubn == "02"){ // 판매계획(D+1)
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
						}	
						else if(in_supply_gubn == "03"){ // 공급할당(D+1)
							dc_mean_sell = strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
						}
						else if(in_supply_gubn == "04"){ // 공급율
							dc_mean_sell = strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
						}
					}
					
//alert(dc_id+'-'+dc_mean_sell);					
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC 예상재고
					// DC보충량 결정
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}						
				
					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
				
			}
			else { // CD구분 : 일반

				if(continue_flag == true ) {	
					
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3주평균
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1주평균
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)주/2
						dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // 전월실적
						dc_mean_sell = GridObj.GetCellValue("PRE_MONTH_SELL", i);	
					}
					else if(in_supply_gubn == "02"){ // 판매계획(D+1)
						dc_mean_sell = GridObj.GetCellValue("SALES_PLAN_00_D1", i);
					}	
					else if(in_supply_gubn == "03"){ // 공급할당(D+1)
						dc_mean_sell = GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i);
					}
					else if(in_supply_gubn == "04"){ // 공급율
						dc_mean_sell = GridObj.GetCellValue("SUPPLY_RATE_BOX", i);
					}
	
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC 예상재고
					// DC보충량 결정
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}	

					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
			}	
		}
		else {  // 합계,소계부분의 index를 저장한다.
			if(ord_no == '1') tot_index = i;  //총계
			else if(ord_no == '3') tot_cdc_index = i;  //CDC합계
			else if(ord_no == '5') tot_rdc_index = i; // RDC합계
		}
				
	}
	if(end_tot_box == tot_box) break; // 무한루프 방지

} while(tot_box > strToNum(confirm_qty) )
	

/*
	// 보충단위 보정전에 총량기준으로 공급확정량을 전체공급량에 맞춰준다.
	// 이부분이 필요없을 수도 있지만 나중에 CDC를 결정할때 할당물량이 모자를 때 문제가 될 수 있다.
	if(tot_box <= 0) return;
	tot_temp_box = tot_box;

	tot_box= 0; tot_cdc_box= 0;	tot_rdc_box= 0;
//alert( strToNum(confirm_qty)/tot_temp_box);
	// 총보충요구량 > 전체공급량일때
	if(tot_temp_box > strToNum(confirm_qty) ) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외

	
				dc_trans_qty = strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));

				//변경 DC보충요구량 = (CDC공급확정량/총보충요구량)*DC보충요구량
//				dc_trans_qty = Math.round(strToNum(confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);

 				tot_box = tot_box + dc_trans_qty;
				if(ord_no == '2') {
					tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
				}
				else {
					tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
				}
			}
		}	
	}	
*/
	// 보충단위를 맞춘다.
	var in_trans_unit = "";
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	else if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";
	else in_trans_unit = "usr";
	var box_per_palet  = document.frm.box_per_palet.value; // 팔렛당 박스수
	var min_pick_qty; // 최소수송단위
	var conv_confirm_qty = 0; //변경 전체공급량

	if(strToNum(box_per_palet) <= 0) {  // box_per_palet가 0이하면 1로한다.
		box_per_palet = 1;
	}
	
	if(in_trans_unit == "pal") { // 보충단위 pallet
		tot_box = 0;    tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0;	tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		// 1) 총DC보충요구량이 확정량보다 큰지 상관없이 팔레트 환산
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외
				// 1-1) DC보충요구량 가져온다.
				dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
				// 1-2) 팔렛트로 환산한다.
				dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet));
				// 1-3) 다시 박스로 환산한다.
				dc_trans_qty = dc_pl_qty * strToNum(box_per_palet);
				
				GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
				if (dc_trans_qty > 0) {
					tot_pl = tot_pl + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC이다
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC이다
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
					}
				}
			}
		}
		// 2) 총보충요구량 > 전체공급량일때
		if(tot_box > strToNum(confirm_qty)) {
			if(tot_box <= 0) return;
			tot_temp_box = tot_box;
			for(k=1;k<10;k++){ // (총보충요구량 >= 공급확정량)가 될 수 있도록 반복한다.
				// 공급확정량이 반올림 오차에 의해서 다시 (총보충요구량 >= 공급확정량)가 될 수 있으므로 팔렛수량만큼 증가시키면서 제거한다.
				conv_confirm_qty = strToNum(confirm_qty) - strToNum(box_per_palet)*k;//(tot_box - strToNum(confirm_qty))*2;  
				tot_box = 0;    tot_cdc_box= 0;	tot_rdc_box= 0;
				tot_pl  = 0;	tot_cdc_pl= 0;	tot_rdc_pl= 0;
				for(i=0;i<GridObj.GetRowCount( );i++ ) {
					ord_no 	= GridObj.GetCellValue("ORD_NO", i);
					if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외
						dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
						if (dc_trans_qty > 0) {
							// 2-1) 변경 DC보충요구량 = (CDC공급확정량/총보충요구량)*DC보충요구량
							dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
							// 2-2) 팔렛트로 환산한다.
							dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet));
							// 2-3) 다시 박스로 환산한다.
							dc_trans_qty = dc_pl_qty * strToNum(box_per_palet);
							
							GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
							
							tot_pl = tot_pl + dc_pl_qty;
							tot_box = tot_box + dc_trans_qty;
							if(ord_no == '2') {
								tot_cdc_pl = tot_cdc_pl   + dc_pl_qty; // CDC이다
								tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
							}
							else {
								tot_rdc_pl = tot_rdc_pl   + dc_pl_qty; // RDC이다
								tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
							}
						}
					}
				}
				if(tot_box <= strToNum(confirm_qty)) break;
			}
		}
//alert("tot_box(3) = " + tot_box + " k= "+k);							
	}
	else if(in_trans_unit == "box") {  // 보충단위 BOX
		if(tot_box <= 0) return;
		tot_temp_box = tot_box;
		// 공급확정량이 반올림 오차에 의해서 다시 (총보충요구량 >= 공급확정량)가 될 수 있으므로 공급확정량*2을 넘은만큼 제거한다.
		conv_confirm_qty = strToNum(confirm_qty) - (tot_box - strToNum(confirm_qty))*2;  //- box_per_palet;//  
		tot_box = 0; tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0; tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외
				dc_trans_qty = strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)); 
				if (dc_trans_qty > 0) {
					
					// 총보충요구량 > 전체공급량일때
					if(tot_temp_box > strToNum(confirm_qty) ) {
						//변경 DC보충요구량 = (CDC공급확정량/총보충요구량)*DC보충요구량
						dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
					}
					dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
					
					GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
					GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
					tot_pl  = tot_pl + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC이다
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC이다
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
					}
				}
			}
		}
	}
	else { // 보충단위 최소수송단위

		tot_box = 0; tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0; tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		// 1) 총DC보충요구량이 확정량보다 큰지 상관없이 팔레트 환산
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외
				min_pick_qty = GridObj.GetCellValue("MIN_PICK_QTY", i); // 최소수송단위
				if(strToNum(min_pick_qty) <= 0) min_pick_qty = 1;
				// 1-1) DC보충요구량 가져온다.
				dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
				// 1-2) 최소수송단위로 환산한다.
				dc_trans_usr_temp = Math.round(strToNum(dc_trans_qty)/strToNum(min_pick_qty));
				// 1-3) 다시 박스로 환산한다.
				dc_trans_qty = dc_trans_usr_temp * strToNum(min_pick_qty);
				// 1-4) 팔렛수량 구한다.
				dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
				
				GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
				if (dc_trans_qty > 0) {
					tot_pl  = tot_pl  + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC이다
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC이다
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
					}
				}
			}
		}
		// 2) 총보충요구량 > 전체공급량일때
		if(tot_box > strToNum(confirm_qty)) {
			if(tot_box <= 0) return;
			tot_temp_box = tot_box;
			for(k=1;k<10;k++){ // (총보충요구량 >= 공급확정량)가 될 수 있도록 반복한다.
				// 공급확정량이 반올림 오차에 의해서 다시 (총보충요구량 >= 공급확정량)가 될 수 있으므로 팔렛수량만큼 증가시키면서 제거한다.
				conv_confirm_qty = strToNum(confirm_qty) - strToNum(box_per_palet)*k;//(tot_box - strToNum(confirm_qty))*2;  
				tot_box = 0;    tot_cdc_box = 0;	tot_rdc_box = 0;
				tot_pl  = 0;	tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
				for(i=0;i<GridObj.GetRowCount( );i++ ) {
					ord_no 	= GridObj.GetCellValue("ORD_NO", i);
					if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // 합계,소계부분은 제외
						min_pick_qty = GridObj.GetCellValue("MIN_PICK_QTY", i); // 최소수송단위
						if(strToNum(min_pick_qty) <= 0) min_pick_qty = 1;
						dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
						if (dc_trans_qty > 0) {
							// 2-1) 변경 DC보충요구량 = (CDC공급확정량/총보충요구량)*DC보충요구량
							dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
							// 2-2) 최소수송단위로 환산한다.
							dc_trans_usr_temp = Math.round(strToNum(dc_trans_qty)/strToNum(min_pick_qty));
							// 2-3) 다시 박스로 환산한다.
							dc_trans_qty = dc_trans_usr_temp * strToNum(min_pick_qty);
							// 2-4) 팔렛수량 구한다.
							dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
							
							GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
							
							tot_pl  = tot_pl  + dc_pl_qty;
							tot_box = tot_box + dc_trans_qty;
							if(ord_no == '2') {
								tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC이다
								tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC이다
							}
							else {
								tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC이다
								tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC이다
							}
						}
					}
				}
				if(tot_box <= strToNum(confirm_qty)) break;
			}
		}	
		
	}
	
	// 배분계산에서 제외했던 배송지점을 원래 영역으로 복귀시킨다.
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);
		if(ord_no 	== '7') {
			GridObj.SetCellValue("ORD_NO", i, GridObj.GetCellHiddenValue("ORD_NO", i));
		}
	}
	
	// 합계,소계부분 갱신한다.
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_index,tot_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_cdc_index,tot_cdc_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_rdc_index,tot_rdc_pl);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_index,tot_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_cdc_index,tot_cdc_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_rdc_index,tot_rdc_box);

	compute_expt_stock_dw1(); // 예상재고일수, 예상재고 갱신

}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
}

/*┌──────────────────────────────────┐
  │WiseGrid Insert Row Fnc
  └──────────────────────────────────┘*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // 마자막 라인일 경우 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}
	
	GridObj.SetCellValue("DC_ID"               			, nRow+1, GridObj.GetCellValue("DC_ID"                         , nRow));
	GridObj.SetCellValue("DC_NAME"             			, nRow+1, GridObj.GetCellValue("DC_NAME"                       , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL"      			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL"                , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_00"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_00"             , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_01"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_01"             , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_02"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_02"             , nRow));
	GridObj.SetCellValue("SALES_PRE"           			, nRow+1, GridObj.GetCellValue("SALES_PRE"                     , nRow));
	GridObj.SetCellValue("SALES_PRE_00"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_00"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_01"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_01"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_02"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_02"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM"       			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM"                 , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_00"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_00"              , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_01"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_01"              , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_02"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_02"              , nRow));
	GridObj.SetCellValue("SALES_PLAN"          			, nRow+1, GridObj.GetCellValue("SALES_PLAN"                    , nRow));
	GridObj.SetCellValue("ISSUE"               			, nRow+1, GridObj.GetCellValue("ISSUE"                         , nRow));
	GridObj.SetCellValue("ISSUE_00"            			, nRow+1, GridObj.GetCellValue("ISSUE_00"                      , nRow));
	GridObj.SetCellValue("ISSUE_YO"            			, nRow+1, GridObj.GetCellValue("ISSUE_YO"                      , nRow));
	GridObj.SetCellValue("ISSUE_YS"            			, nRow+1, GridObj.GetCellValue("ISSUE_YS"                      , nRow));
	GridObj.SetCellValue("ISSUE_TA"            			, nRow+1, GridObj.GetCellValue("ISSUE_TA"                      , nRow));
	GridObj.SetCellValue("ISSUE_WMS"           			, nRow+1, GridObj.GetCellValue("ISSUE_WMS"                     , nRow));
	GridObj.SetCellValue("ISSUE_EX"            			, nRow+1, GridObj.GetCellValue("ISSUE_EX"                      , nRow));
	GridObj.SetCellValue("SALES_MEAN_1WEEK"    			, nRow+1, GridObj.GetCellValue("SALES_MEAN_1WEEK"              , nRow));
	GridObj.SetCellValue("SALES_MEAN_1WEEK_ETC"			, nRow+1, GridObj.GetCellValue("SALES_MEAN_1WEEK_ETC"          , nRow));
	GridObj.SetCellValue("SALES_MEAN_3WEEK"    			, nRow+1, GridObj.GetCellValue("SALES_MEAN_3WEEK"              , nRow));
	GridObj.SetCellValue("SALES_MEAN_3WEEK_ETC"			, nRow+1, GridObj.GetCellValue("SALES_MEAN_3WEEK_ETC"          , nRow));
	GridObj.SetCellValue("BASE_STOCK"          			, nRow+1, GridObj.GetCellValue("BASE_STOCK"                    , nRow));
	GridObj.SetCellValue("RECEIPT"             			, nRow+1, GridObj.GetCellValue("RECEIPT"                       , nRow));
	GridObj.SetCellValue("CHGO_QTY"            			, nRow+1, GridObj.GetCellValue("CHGO_QTY"                      , nRow));
	GridObj.SetCellValue("CHGO"                			, nRow+1, GridObj.GetCellValue("CHGO"                          , nRow));
	GridObj.SetCellValue("DELV"                			, nRow+1, GridObj.GetCellValue("DELV"                          , nRow));
	GridObj.SetCellValue("TRAN"                			, nRow+1, GridObj.GetCellValue("TRAN"                          , nRow));
	GridObj.SetCellValue("STOCK_DAY"           			, nRow+1, GridObj.GetCellValue("STOCK_DAY"                     , nRow));
	GridObj.SetCellValue("STOCK_TERM"          			, nRow+1, GridObj.GetCellValue("STOCK_TERM"                    , nRow));
	GridObj.SetCellValue("SAFETY_STOCK"        			, nRow+1, GridObj.GetCellValue("SAFETY_STOCK"                  , nRow));
	GridObj.SetCellValue("SALES_PLAN_D1"       			, nRow+1, GridObj.GetCellValue("SALES_PLAN_D1"                 , nRow));
	GridObj.SetCellValue("SALES_PLAN_00_D1"    			, nRow+1, GridObj.GetCellValue("SALES_PLAN_00_D1"              , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLAN_D1"    			, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLAN_D1"              , nRow));
	GridObj.SetCellValue("ISSUE_D1"            			, nRow+1, GridObj.GetCellValue("ISSUE_D1"                      , nRow));
	GridObj.SetCellValue("ISSUE_00_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_00_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_YO_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_YO_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_YS_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_YS_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_TA_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_TA_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_WMS_D1"        			, nRow+1, GridObj.GetCellValue("ISSUE_WMS_D1"                  , nRow));
	GridObj.SetCellValue("ISSUE_EX_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_EX_D1"                   , nRow));
	GridObj.SetCellValue("STOCK_EXPT"          			, nRow+1, GridObj.GetCellValue("STOCK_EXPT"                    , nRow));
	GridObj.SetCellValue("REP_QTY"             			, nRow+1, GridObj.GetCellValue("REP_QTY"                       , nRow));

	GridObj.SetCellValue("TRANS_PLAN_PLT"      			, nRow+1, 0);
	GridObj.SetCellValue("TRANS_PLAN_QTY"      			, nRow+1, 0);

	GridObj.SetComboSelectedIndex('SRC_LOC',nRow+1,-1);

	GridObj.SetCellValue("MIN_PICK_QTY"        			, nRow+1, GridObj.GetCellValue("MIN_PICK_QTY"                  , nRow));
	GridObj.SetCellValue("NEXT_STOCK_DAY"      			, nRow+1, GridObj.GetCellValue("NEXT_STOCK_DAY"                , nRow));
	GridObj.SetCellValue("NEXT_STOCK_EXPT"     			, nRow+1, GridObj.GetCellValue("NEXT_STOCK_EXPT"               , nRow));
	GridObj.SetCellValue("EDI_00_D1"           			, nRow+1, GridObj.GetCellValue("EDI_00_D1"                     , nRow));
	GridObj.SetCellValue("EDI_TOT_D1"          			, nRow+1, GridObj.GetCellValue("EDI_TOT_D1"                    , nRow));
	GridObj.SetCellValue("EDI_22_D1"           			, nRow+1, GridObj.GetCellValue("EDI_22_D1"                     , nRow));
	GridObj.SetCellValue("EDI_21_D1"           			, nRow+1, GridObj.GetCellValue("EDI_21_D1"                     , nRow));
	GridObj.SetCellValue("EDI_ETC_D1"          			, nRow+1, GridObj.GetCellValue("EDI_ETC_D1"                    , nRow));
	GridObj.SetCellValue("EDI_00_D2"           			, nRow+1, GridObj.GetCellValue("EDI_00_D2"                     , nRow));
	GridObj.SetCellValue("EDI_TOT_D2"          			, nRow+1, GridObj.GetCellValue("EDI_TOT_D2"                    , nRow));
	GridObj.SetCellValue("EDI_22_D2"           			, nRow+1, GridObj.GetCellValue("EDI_22_D2"                     , nRow));
	GridObj.SetCellValue("EDI_21_D2"           			, nRow+1, GridObj.GetCellValue("EDI_21_D2"                     , nRow));
	GridObj.SetCellValue("EDI_ETC_D2"          			, nRow+1, GridObj.GetCellValue("EDI_ETC_D2"                    , nRow));

	GridObj.SetCellValue("CDC_CNT"             			, nRow+1, strToNum(GridObj.GetCellValue("CDC_CNT", nRow))+1);

	GridObj.SetCellValue("ORD_NO"              			, nRow+1, GridObj.GetCellValue("ORD_NO"                        , nRow));
	GridObj.SetCellValue("ROWNUM"              			, nRow+1, GridObj.GetCellValue("ROWNUM"                        , nRow));
	GridObj.SetCellValue("OLD_SAFE_QTY"        			, nRow+1, GridObj.GetCellValue("OLD_SAFE_QTY"                  , nRow));
	GridObj.SetCellValue("SAFE_UPDATE_FLAG"    			, nRow+1, GridObj.GetCellValue("SAFE_UPDATE_FLAG"              , nRow));
	GridObj.SetCellValue("UNIT_UPDATE_FLAG"    			, nRow+1, GridObj.GetCellValue("UNIT_UPDATE_FLAG"              , nRow));
	GridObj.SetCellValue("BOX_PER_PLT"         			, nRow+1, GridObj.GetCellValue("BOX_PER_PLT"                   , nRow));

}

function changeChecked(obj){ // 출고장 기능 구현 함수//
	
	var sel_data = GridObj.GetSelectedCells(); // 선택한 부분의 key와 row를 가져온다
	var i=0;
	var rowNo=0;

	/*  
	 * 첫번째 행번호 찾기
	 * 첫번째 행의 출고장의 히든값 찾기
	 * 
	 * 선택되어진 행들의 출고장을 첫번째 출고장 히든값으로 세팅하기
	 * */
 
	var first_rowNo   = sel_data.split(",")[i*2+1];
	var first_src_loc = GridObj.GetCellHiddenValue("SRC_LOC", first_rowNo);
	
	var first_src_new_index = GridObj.GetComboSelectedIndex("SRC_LOC", first_rowNo); 
	if(first_src_loc == "" ){
		alert("첫 번째 출고장을 입력 후, 일괄변경을 실행하여 주십시요.");
		return;
	} 


	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 더이상 데이터 없다
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//해당 row에 check를 한다
			var nOldIndex = GridObj.GetComboSelectedIndex("SRC_LOC", rowNo);
			var nNewIndex = first_src_new_index;
			
			GridObj.SetComboSelectedHiddenValue("SRC_LOC", rowNo,  first_src_loc);
			
				//GridObj.SetComboSelectedIndex("SRC_LOC", rowNo,  first_src_loc);
				//GridObj.SetComboSelectedIndex("SRC_LOC", rowNo,  nOldIndex);
			
			GridChangeComboHandler("SRC_LOC", rowNo, nOldIndex, nNewIndex)
		}
		i++;
	}	
	

}


// Context Menu 사용자 정의 Menu 선택시
function handler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	var GridObj3 = document.WiseGrid3;
	var rowCnt = GridObj3.GetRowCount();
	var alloc_zone;
		//alert("strMenuKey="+strMenuKey);
	if( strMenuKey == "MENU_CELL" ){// CELL 클릭시 메뉴
		
		if(strMenuItemKey == "MENU00" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '안전');	
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}else if(strMenuItemKey == "MENU01" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '전국');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU02" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '수도');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU03" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '부산');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU04" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU05" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '시판');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU06" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '06');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색
		}else if(strMenuItemKey == "MENU07" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통+CVS');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '07');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}else if(strMenuItemKey == "MENU08" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS+시판');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '08');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}else if(strMenuItemKey == "MENU09" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '유통+시판');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '09');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}else if(strMenuItemKey == "MENU10" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '특판');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '10');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}else if(strMenuItemKey == "MENU11" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '제주');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '11');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}
		else if(strMenuItemKey == "MENU12" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '12');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}
		else if(strMenuItemKey == "MENU13" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자2');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '13');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}
		else if(strMenuItemKey == "MENU14" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자3');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '14');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}
		else if(strMenuItemKey == "MENU15" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자4');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '15');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
		}
//		else if(strMenuItemKey == "MENU14" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자4');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '14');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		}
//		else if(strMenuItemKey == "MENU15" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자5');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '15');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		}
//		else if(strMenuItemKey == "MENU16" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자6');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '16');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		}
//		else if(strMenuItemKey == "MENU17" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자7');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '17');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		}
//		else if(strMenuItemKey == "MENU18" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자8');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '18');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		}
//		else if(strMenuItemKey == "MENU19" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '사용자9');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '19');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row 배경색	
//		} 
		
	}	else {
			alert("존재 하지 않은 메뉴입니다.");
		}
		
		   
}



    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU00","안전"); //00//
    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU01","전국"); //01//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU02","수도"); //02//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU03","부산");//03//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU04","유통");//04//
    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU05","시판");//05//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU06","CVS");//06//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU07","유통+CVS");//07//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU08","CVS+시판");//08//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU09","유통+시판");//09//













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
	
}


