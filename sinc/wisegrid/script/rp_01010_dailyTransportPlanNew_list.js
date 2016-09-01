//############################################################
//## 프로그램ID 	: rp_01010_dailyTransportPlanNew_list.js
//## 프로그램명 	: 수송계획 조회 및 조정
//## 개발자  	: 정재교
//## 개발일자 	: 2009-04-07 화요일
//##
//## 관련 job file 	 : job_rp_01010_dailyTransportPlanNew_list.xml
//##
//## 관련 query file : query_rp_01010_dailyTransportPlanNew_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-04-07  정재교     rp_01010_dailyTransportPlanNew_list.js 개발
//## 1.1		2009-05-22  남웅용	   mult 선택후 check, 해제 기능추가
//## 2.0		2013-09-04  남웅용	   불필요한 소스 제거 - 이전소스는 서버에 20130904버젼에 있음.
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'rp_01010_dailyTransportPlanNew_list';				// job id(서블릿 명, WiseGrid Header key)
var job_id2 = 'rp_01120_outOrderAdjust_list02';
var job_id3 = 'rp_01010_dailyTransportPlanNewSalesInfo_list';
var job_id4 = 'rp_01010_dailyTransportPlanNewStockInfo_list';
var job_id5 = 'rp_01010_dailyTransportBookingInfo_list';

var GridObj ; 													// WiseGrid 객체
var GridObj2;
var GridObj3;
var GridObj4;
var GridObj5;

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

var oldRow = "";						//합차 대상 선택 Row Index 저장
var oldColor = "";
var oldRowData = "";

var delRowList = "";					// 삭제 취소를 하기위해 삭제된 목록 저장 변수

var saved = true;						// 저장 여부 

var rFirst = 0;							// 저장, 합차 등의 작업후 화면 위치를 유지하기 위한 Row Index 저장 변수
var rEnd = 0;

/******************************************          Action Function         **********************************************/
/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
function GoSearch(service) {
	
	// 버전, 입고장, 수송구분 검색 데이터 setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	if( versions == "" || versions == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( document.frm.tgt_loc_sel.value == "" || document.frm.tgt_loc_sel.value == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc_sel.value;
	document.frm.plan_type.value 	= document.frm.plan_type_sel.value;	

	rFirst = 0;
	oldRow = 0;
	doQuery();
	doQuery5();	
};

/*┌──────────────────────────────────┐
  │조회
  └──────────────────────────────────┘*/
function GoSearchInfo() {

	// 버전, 입고장, 수송구분 검색 데이터 setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var search_type = document.frm.search_type.value;
	
	if( versions == "" || versions == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
		
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	if(GridObj.GetActiveRowIndex() == -1) {
		alert("먼저 조회할 Row를 선택해 주십시오.");
		return;
	}
	
	if( GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()) == "" ){
		//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));;
		alert("선택한 Row에 제품이 선택되지 않았습니다. 제품을 먼저 선택해 주십시오.");
		return;
	}
	
	//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));
	doQuery2();
	doQuery3();
	doQuery4('1');
	
};

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function GoSave(service) {
	
	// 버전, 입고장, 수송구분 검색 데이터 setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
	// ====================================================================== //
	// 1차당 PLT 누적 최종값이 12박스가 안될때는 CONFIRM으로 저장할것 인지 확인하는 로직
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(document.frm.tgt_loc.value != document.frm.tgt_loc_sel.value){
		alert("작업할 입고장이 변경되었습니다. 다시조회 후 작업하세요!");
		return;
	}

	if(tableLen == 1){ // Total Row만 존재하는 경우..
		if(!confirm("저장하시겠습니까?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT가 안되는 경우..
	if(check_plt_flag){
		if(!confirm("12PLT 미만인 차량이 존재합니다. 저장하시겠습니까?"))
			return;
	}
	else{		
		// 모두 12PLT 이상인 경우.
		if(!confirm("저장하시겠습니까?"))
			return;
	}

	// ====================================================================== //
	
	doSave(version, seq, tgt_loc, plan_type);	
};

/*┌──────────────────────────────────┐
  │합차 버튼 클릭시.
  └──────────────────────────────────┘*/
function GoSumTruck(service) {
	
	doSumTruck();		
}

/*┌──────────────────────────────────┐
  │개별 수송계획 이관
  └──────────────────────────────────┘*/
function GoSaveEtc() {

	if( !saved ){
		
		alert("먼저 저장을 하고 이관을 하십시오.");
		return;
	}
	
	// 버전, 입고장, 수송구분 검색 데이터 setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
		
	// ====================================================================== //
	// 1차당 PLT 누적 최종값이 12박스가 안될때는 CONFIRM으로 저장할것 인지 확인하는 로직
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(tableLen == 1){ // Total Row만 존재하는 경우..
		if(!confirm("저장하시겠습니까?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT가 안되는 경우..
	if(check_plt_flag){
		if(!confirm("12PLT 미만인 차량이 존재합니다. 저장하시겠습니까?"))
			return;
	}
	else{		
		// 모두 12PLT 이상인 경우.
		if(!confirm("저장하시겠습니까?"))
			return;
	}

	// ====================================================================== //
	
	doSaveEtc(tgt_loc, plan_type);	
};

/*******************************************   WiseGrid 초기화 및 설정  *****************************************************/

/*┌──────────────────────────────────┐
  │WiseGrid 초기화
  └──────────────────────────────────┘*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// 기본 property 설정
	setDefault(GridObj);  			// 추가 property 설정
	setHeader();   			// Header 설정
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2); 	// 기본 property 설정
	setDefault2(GridObj2);  			// 추가 property 설정
	setHeader2();   			// Header 설정
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); 	// 기본 property 설정
	setDefault2(GridObj3);  			// 추가 property 설정
	setHeader3();   			// Header 설정
			
}

function init4() {
	
	GridObj4 = document.WiseGrid4;
	
	setProperty(GridObj4); 	// 기본 property 설정
	setDefault2(GridObj4);  			// 추가 property 설정
	setHeader4();   			// Header 설정			
}

function init5() {
	
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5); 	// 기본 property 설정
	setDefault2(GridObj5);  			// 추가 property 설정

	GridObj5.bUserContextMenu 	= true;					//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj5.bHDMoving 		 	= false;                //사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj5.bHDSwapping 	 	= false;                //헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj5.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj5.bRowSelectorIndex   = false;				//Row Selector 영역에 Row Index를 보여준다. 
	
	GridObj5.strRowBorderStyle   = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj5.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj5.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
    GridObj5.bStatusbarVisible = true;				// status bar visible
    
	setHeader5();   			// Header 설정	
}


/*┌──────────────────────────────────┐
  │Property 설정
  └──────────────────────────────────┘*/
function setDefault(GridObj){ 
	
	GridObj.bUserContextMenu = true;				//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj.bHDMoving = false;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj.bHDSwapping = false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj.bRowSelectorVisible = false;        	//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 영역에 Row Index를 보여준다. 
	GridObj.strRowBorderStyle = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	//Hearder 높이
	GridObj.nHDLineSize   = 15; //15
	
	// Grid 행 높이
    GridObj.nRowHeight    = 20; 
    
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2; 
    
    //사용자가 컬럼의 사이즈를 변경하는 동작을 설정한다.     
    GridObj.strHDSizing = 'none'; 	//[ none | free | sync ] 
    
    //사용자가 로우의 사이즈를 변경하는 동작을 설정한다. 
    GridObj.strRowSizing = 'fixed';  //[ fixed | free | sychronized | autofree | autofixed ]

	GridObj.strMouseWheelAction='default'; // page 단위 scroll ->기본은 'default'     
    
}
 
function setDefault2(GridObj){ 
	GridObj.bStatusbarVisible = false; 				//Statusbar를 WiseGrid에서 숨길 수 있다. 	

	// Hearder 높이 
	GridObj.nHDLineSize   = 22; //24
	
	GridObj.strHDClickAction = 'sortsingle'; 		//클릭한 컬럼의 모든 셀을 정렬한다. 

    //사용자가 컬럼의 사이즈를 변경하는 동작을 설정한다.     
    GridObj.strHDSizing = 'free'; 	//[ none | free | sync ] 
	
}

/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
}

function setHeader2() 
{        
    commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader2); 
}

function setHeader3() 
{        
    commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader3); 
}

function setHeader4() 
{        
    commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader4); 
}

function setHeader5() 
{        
    defaultHeader5();		
    //commonUtil.getCodeList("job_id", job_id5 , "gird_header_list",defaultHeader5); 
}

/*┌──────────────────────────────────┐
  │DB에 등록된 화면 해더 정보를 가져온다.
  └──────────────────────────────────┘*/
function defaultHeader(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	GridObj.AddGroup("CUM_TOT", "누적상차집계");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("CUM_TOT", "CUM_PLT");
	GridObj.AppendHeader("CUM_TOT", "CUM_BOX");
		
	GridObj.AddGroup("BASE_STK", "기본재고상차");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("BASE_STK", "BASE_STK_PLT");
	GridObj.AppendHeader("BASE_STK", "BASE_STK_BOX");
	
	GridObj.AddGroup("ADD_STK", "추가재고상");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("ADD_STK", "ADD_STK_PLT");
	GridObj.AppendHeader("ADD_STK", "ADD_STK_BOX");
	
	GridObj.AddGroup("PROD", "생산상차");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("PROD", "PROD_PLT");
	GridObj.AppendHeader("PROD", "PROD_BOX");
	
	GridObj.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
	
	GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	
	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("BOX_PER_PALET", true);
	GridObj.SetColHide("PLAN_TYPE", true);
	
	GridObj.SetNumberFormat("TRUCK_SEQ", "##"); // 숫자 형식
	GridObj.SetNumberFormat("CUM_PLT"  , "##0.00");
	GridObj.SetNumberFormat("CUM_BOX"  , "###,##0");
	GridObj.SetNumberFormat("BASE_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("BASE_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("ADD_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("ADD_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("PROD_PLT"  , "##0.00");
	GridObj.SetNumberFormat("PROD_BOX"  , "###,##0");	  
	
	GridObj.SetDateFormat("TRANS_DATE", "yyyy-MM-dd");         
	
	GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
}

function defaultHeader2(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	commonUtil.getSelQeury( "", "", "dailyTransportPlanSchPlan_dateList",{
		callback:function(result){
						
			if(result.length > 0){
				for( i = 0 ; i < result[0].length ; i++ ){
					if( i == 0 ){
						GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);
						GridObj2.AppendHeader("HEADER_DATE" + i, "D01");
					}
					else{
			    		GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);			//그리드에 그룹을 등록한다. 
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH1");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH3");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH5");
					}
				}
			}
			
			GridObj2.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
			GridObj2.SetColHide("ITEM", true);
			
			GridObj2.SetColFix('PLANT_NAME');		    
		}
	});           
}

function defaultHeader3(result)
{
	var arrHeader = '';
	
	
	
	for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj3.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}

	GridObj3.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
		
	GridObj3.SetNumberFormat('BS_STOCK'     , "###,###,###"); // 숫자 형식
	GridObj3.SetNumberFormat('D00_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('D00_STK'		, "###,###,###");
	GridObj3.SetNumberFormat('D01_STK'   	, "###,###,###");
	GridObj3.SetNumberFormat('ITP_QTY'		, "###,###,###");
	GridObj3.SetNumberFormat('TP_QTY'       , "###,###,###");
	GridObj3.SetNumberFormat('NUM_STK'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLR'   	, "###,###,###");
	GridObj3.SetNumberFormat('AVG_SLR'  	, "###,###,###");
	GridObj3.SetNumberFormat('SAFETY_STOCK' , "###,###,###");
        
}

function defaultHeader4(result)
{
	var arrHeader = '';
	
  	GridObj4.AddHeader("ITEM_NAME"			,"제품명"      	,"t_text" 	,100		,160  ,false); //0   
  	GridObj4.AddHeader("STOCK_DAY"			,"재고일수"    	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("SALES_MEAN_3WEEK"	,"3주평균" 		,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("STOCK_QTY"			,"공장잔량"      	,"t_number" ,100.3		,55  ,false); //0    공장잔량
  	GridObj4.AddHeader("TRQTY_EX"			,"익일출고"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj4.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
		
	GridObj4.SetNumberFormat("STOCK_DAY", "##0.0"); // 숫자 형식
	GridObj4.SetNumberFormat("STOCK_QTY", "###,###,##0");
	GridObj4.SetNumberFormat("TRQTY_EX", "###,###,##0");
        
}

function defaultHeader5(result)
{
	var arrHeader = '';
	
  	GridObj5.AddHeader("ITEM_CODE"			,"제품코드"      	,"t_text" 	,100		,65  ,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"			,"제품명"      	,"t_text" 	,100		,180  ,false); //0   
  	GridObj5.AddHeader("STOCK_QTY"			,"재고"      	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj5.AddHeader("ORDER_DATE"			,"상차일자"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ETD_DATE"			,"선적일자"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ORDER_QTY"			,"주문수량"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj5.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 

	GridObj5.SetColCellAlign('ORDER_DATE', 'center');
	GridObj5.SetColCellAlign('ITEM_CODE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
		
	GridObj5.SetNumberFormat("ORDER_QTY", "###,###,##0");
        
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
		
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("plan_type", plan_type);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("trans_end", trans_end);
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj.SetParam("query_id", job_id);
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url);
}

function doQuery2() {//생산계획
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "search");
	
	//-- 서버에 전송할 파라메터 설정 --//
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", version);
	GridObj2.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url);
}

function doQuery3() {//입고장 판매정보
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "search3");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url);
}

function doQuery4(flag) {//출고장 재고정보
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj4.SetParam("mode", "search4");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var src_loc;

	var search_type = document.frm.search_type.value; //하단 그리드 3번 조회 유형
	GridObj4.SetParam("search_type", search_type);

	src_loc = document.frm.src_loc_sel.value;
	var tgt_loc = document.frm.tgt_loc.value;
	//alert("src_loc : " + src_loc + ", tgt_loc : " + tgt_loc);
	
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("version", version);
	GridObj4.SetParam("seq", seq);
	GridObj4.SetParam("src_loc", src_loc);
	GridObj4.SetParam("tgt_loc", tgt_loc);
	
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj4.SetParam("query_id", job_id4);
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj4.DoQuery(servlet_url);
}

function doQuery5() {//수출 작업장 상차정보
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj5.SetParam("mode", "search5");
	
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_start = document.frm.trans_start.value;
	
	GridObj5.SetParam("version", version);
	GridObj5.SetParam("tgt_loc", tgt_loc);
	GridObj5.SetParam("trans_start", trans_start);

	// query_id
	GridObj5.SetParam("query_id", job_id5);
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj5.DoQuery(servlet_url);
}


/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function doSave(version, seq, tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "save");
	
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq",seq);
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*┌──────────────────────────────────┐
  │개별 수송계획 이관
  └──────────────────────────────────┘*/
function doSaveEtc(tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "saveEtc");
	
	//-- 서버에 전송할 파라메터 설정 --//
	GridObj.SetParam("version","20000000.01.01");
	GridObj.SetParam("seq","1");
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	
	var version2 = document.frm.version.value;
	var seq2 = document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "SELECTED");
 
}

/*┌──────────────────────────────────┐
  │합차
  └──────────────────────────────────┘*/
function doSumTruck() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "sumTruck");
	
	//-- 서버에 전송할 파라메터 설정 --//
	// 선택된 라인의 
	// 수송일자, 출고장, 차량순번
	if( oldRow != 0 && oldRow == "" ){
		alert(" 먼저 합차 대상을 선택 하십시오.");
		return;
	}
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_date = GridObj.GetCellValue("TRANS_DATE", oldRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", oldRow);
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", oldRow);
	//var item_id = GridObj.GetCellValue("ITEM_ID", oldRow);
	var user_id = document.frm._user_id.value;
	//alert("합차전"+tgt_loc);
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("trans_date",trans_date);
	GridObj.SetParam("src_loc",src_loc);
	GridObj.SetParam("truck_seq",truck_seq);
	GridObj.SetParam("user_id",user_id);
		
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

/*┌──────────────────────────────────┐
  │합차 계산 후 다시 조회
  └──────────────────────────────────┘*/
function doQuerySumTruck(){
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "searchSumTruck");
	
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드

	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var user_id = document.frm._user_id.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var version = document.frm.version.value;
	
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	GridObj.SetParam("user_id", user_id);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("version", version);
	
	//alert("합차후"+tgt_loc);
		
	// query_id
	GridObj.SetParam("query_id", "do_sum_truck");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url);	
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
		//alert("(GridObj)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	setGrid(GridObj); //WiseGrid 설정
			
	//
	var endMode = GridObj.GetParam("mode");

	if(endMode == "search") { //조회
		if(GridObj.GetStatus() == "true") { // 
			var paramKey = "tgt_loc";
			var paramCode = document.frm.tgt_loc.value;
			var queryId = "rp_01010_dailyTransportPlan_list_capa";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.max_capa.value = numberFormat(result);
					}			
				}
			}); 
			
			var version = document.frm.version.value;
			var seq = document.frm.seq.value;
			var tgt_loc = document.frm.tgt_loc.value;
			var plan_type = document.frm.plan_type.value;
			
			paramKey = "version!%!seq!%!tgt_loc!%!plan_type";
			paramCode = version + "!%!" + seq + "!%!"
							+ tgt_loc + "!%!" + plan_type;
			queryId = "rp_01010_dailyTransportPlan_list_stock";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.estimate_stock.value = numberFormat(result);
					}			
				}
			}); 	
			
			    
			// 마지막 변경한 Row로 이동
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount())){
				//GridObj.MoveRow(rFirst);
				GridObj.SetRowScroll(rFirst);
			}			
			
			// 번호 set
			setNo();
			
			// 삭제된 리스트 초기화
			delRowList = "";
			
			saved = true;
					
			GridObj.focus();
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(endMode == "insert") {
		
	} else if(endMode == "update") {
		
	} else if(endMode == "delete") {
		
	}else if(endMode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();	
			GridObj.focus();		
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "sumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
			doQuerySumTruck();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "searchSumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
//			alert(GridObj.GetCellHiddenValue("CRUD", 0));
//			alert(GridObj.GetCellHiddenValue("CRUD", 1));
//			alert(GridObj.GetCellHiddenValue("CRUD", 2));
			var rowCnt = GridObj.GetRowCount();
			for ( i = 0 ; i < rowCnt ; i++ ){
				var str = GridObj.GetCellHiddenValue("RTE", i);
				if( str == 'DE' ){
					//alert("!!");
					GridObj.DeleteRow(i);
					GridObj.SetRowHide(i, true); 
				}
				else if( str == 'AD' ){
					GridObj.SetCellValue("CRUD", i, "AD");
				}
				else if( str == 'UP' ){
					GridObj.SetCellValue("CRUD", i, "UP");
				}
			}
			
			// 마지막 변경한 Row로 이동
			//GridObj.MoveRow(rFirst);
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
				GridObj.SetRowScroll(rFirst); 
			
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( oldRowData == GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + 
									GridObj.GetCellValue("TRUCK_SEQ", i) + GridObj.GetCellValue("ITEM_ID", i)){
					oldColor = GridObj.GetCellInfo( 'bgcolor', 'NO', i );
					
					// 선택한 로우 배경색 세팅
					//GridObj.SetRowBgColor( i, color_select_row );
					
					// 합차 대상으로 선택된 Row select
					GridObj.MoveRow(i);
					
					GridObj.SetCellFocus('BASE_STK_PLT', i, false);
					
					oldRow = i;
					break;
				}
			}			
			
			// 삭제된 리스트 초기화
			delRowList = "";
			
			saved = false;
			
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		
		// 번호 set
		setNo();

	}else if(endMode == "saveEtc") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}

	}else if(endMode == "Regen100" || endMode == "Regen200" || endMode == "Regen300"){
		if(GridObj.GetStatus() == "true") {// 
		alert("자동 상차조합이 완료 되었습니다 조회후 작업을 시작해주시기 바랍니다.");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
    }
}

function GridEndQuery2() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj2.GetStatus() != "true") {
		var error_msg_extra = GridObj2.GetMessage();// ?
		//alert("(GridObj2)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	setGrid2(GridObj2); //WiseGrid 설정
			
	//
	var mode = GridObj2.GetParam("mode");

	if(mode == "search") { //조회
		if(GridObj2.GetStatus() == "true") { // 
			var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", GridObj.GetActiveRowIndex());	
			var rowCnt = GridObj2.GetRowCount();
			for( i = 0 ; i < rowCnt ; i++ ){
				if( GridObj2.GetCellHiddenValue("PLANT_NAME", i) == src_loc ){
					GridObj2.MoveRow(i);
					GridObj2.SetRowScroll(i);
				}
			}		
		} else	{ 
			var error_msg = GridObj2.GetMessage(); // 
			alert(error_msg);			
		}
	} 
}

function GridEndQuery3() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj3.GetStatus() != "true") {
		var error_msg_extra = GridObj3.GetMessage();// ?
		//alert("(GridObj3)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	setGrid3(GridObj3); //WiseGrid 설정
			
	//
	var mode = GridObj3.GetParam("mode");

	if(mode == "search3") { //조회
		if(GridObj3.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj3.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}
}

function GridEndQuery4() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj4.GetStatus() != "true") {
		var error_msg_extra = GridObj4.GetMessage();// ?
		//alert("(GridObj4)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	setGrid4(GridObj4); //WiseGrid 설정
			
	//
	var mode = GridObj4.GetParam("mode");

	if(mode == "search4") { //조회
		if(GridObj4.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj4.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		
	}
}

function GridEndQuery5() {
		
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj5.GetStatus() != "true") {
		var error_msg_extra = GridObj5.GetMessage();// ?
		//alert("(GridObj5)이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

//	setGrid5(GridObj5); //WiseGrid 설정
			
	//
	var mode = GridObj5.GetParam("mode");

	if(mode == "search5") { //조회
		if(GridObj5.GetStatus() == "true") { // 
			
			GridObj5.SetGroupMerge(	'ITEM_CODE,ITEM_NAME,STOCK_QTY');
			GridObj5.AddSummaryBar('SUMMARY', '소계', 'ITEM_NAME', 'custom', 'STOCK_QTY,ORDER_QTY'); 
			GridObj5.SetSummaryBarFunction('SUMMARY', 'max', 'STOCK_QTY');
			GridObj5.SetSummaryBarFunction('SUMMARY', 'sum', 'ORDER_QTY');
			GridObj5.SetSummaryBarColor('SUMMARY', '0|0|0', '212|212|212'); 
			 						
		} else	{ 
			var error_msg = GridObj5.GetMessage(); // 
			alert(error_msg);			
		}
		
	}
		
}

/*┌──────────────────────────────────┐
  │WiseGrid 설정
  └──────────────────────────────────┘*/
function setGrid(){
	
	// 컬럼 배경색
	GridObj.SetColCellBgColor('SP01',color_sp);//구분선
	GridObj.SetColCellBgColor('SP02',color_sp);
	GridObj.SetColCellBgColor('SP03',color_sp);
	GridObj.SetColCellBgColor('SP04',color_sp);
	
	// 컬럼 구분선 편집 안되게 막음.
	GridObj.SetColCellActivation('SP01','disable'); 
	GridObj.SetColCellActivation('SP02','disable');
	GridObj.SetColCellActivation('SP03','disable');
	GridObj.SetColCellActivation('SP04','disable');
	
    // 출고장 구분색
    setSrcLocBgColor();

	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
    
    // 합계 배경색 및 편집 안되게 막음.
    var rowCnt = GridObj.GetRowCount();
    var str = GridObj.GetCellValue("SRC_LOC", rowCnt-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowCnt-1, color_tot); // row 배경색
    	GridObj.SetCellFontBold('SRC_LOC', rowCnt-1, 'true'); // font 굵기  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowCnt-1, 'disable'); //선택할 수 없고 편집할 수 없다. 
    		
    	}    	
    }

}

function setGrid2(){
	
	// 합계
	GridObj2.AddSummaryBar('SUMMARY1', '전체합계', 'summaryall', 'sum', 'AVAIL,TRANS,STOCK,D01,D02SH1,D02SH3,D02SH5,D03SH1,D03SH3,D03SH5,D04SH1,D04SH3,D04SH5,D05SH1,D05SH3,D05SH5,D06SH1,D06SH3,D06SH5,D07SH1,D07SH3,D07SH5'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '223|223|223'); 
			
	GridObj2.SetNumberFormat("AVAIL", "###,###,###"); // 숫자 형식
	GridObj2.SetNumberFormat("TRANS", "###,###,###"); // 숫자 형식
	GridObj2.SetNumberFormat("STOCK", "###,###,###"); // 숫자 형식
	GridObj2.SetNumberFormat("D01", "###,###,###"); // 숫자 형식
	GridObj2.SetNumberFormat("D02SH1", "###,###,###");
	GridObj2.SetNumberFormat("D02SH3", "###,###,###");
	GridObj2.SetNumberFormat("D02SH5", "###,###,###");
	GridObj2.SetNumberFormat("D03SH1", "###,###,###");
	GridObj2.SetNumberFormat("D03SH3", "###,###,###");
	GridObj2.SetNumberFormat("D03SH5", "###,###,###");
	GridObj2.SetNumberFormat("D04SH1", "###,###,###");
	GridObj2.SetNumberFormat("D04SH3", "###,###,###");
	GridObj2.SetNumberFormat("D04SH5", "###,###,###");
	GridObj2.SetNumberFormat("D05SH1", "###,###,###");
	GridObj2.SetNumberFormat("D05SH3", "###,###,###");
	GridObj2.SetNumberFormat("D05SH5", "###,###,###");
	GridObj2.SetNumberFormat("D06SH1", "###,###,###");
	GridObj2.SetNumberFormat("D06SH3", "###,###,###");
	GridObj2.SetNumberFormat("D06SH5", "###,###,###");
	GridObj2.SetNumberFormat("D07SH1", "###,###,###");
	GridObj2.SetNumberFormat("D07SH3", "###,###,###");
	GridObj2.SetNumberFormat("D07SH5", "###,###,###");
    
}

function setGrid3(){
	
	// row 배경색
	GridObj3.SetRowBgColor(0, '223|223|223');
	
}

function setGrid4(){
	
	// row 배경색
    var rowCnt = GridObj4.GetRowCount();
	
	if(rowCnt > 0 ){
	GridObj4.SetRowBgColor(0, '223|223|223');
	GridObj4.SetColCellSortEnable('STOCK_QTY',true);
	}
	
}

/*********************************************   WiseGrid Event   *********************************************************/ 
/*┌──────────────────────────────────┐
  │WiseGrid Mouse Over Event
  └──────────────────────────────────┘*/
function GridMouseOverHandler(strType, strColumnKey, nRow){ 

};

/*┌───────────────────────────────────────┐
  │WiseGrid User Context Menu Click Event
  └───────────────────────────────────────┘*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	
	if( strMenuKey == "MENU_CELL" ){// CELL 클릭시 메뉴
		
		if( strMenuItemKey == "MENU01" ){		// ROW 추가
			insertRow( nRow );	
			// 출고장 구분 배경색 다시 지정
			setSrcLocBgColor();		
			// 누적 계산 다시 함.
			calAllCum();
			// 번호 set
			setNo();
		}
		else if( strMenuItemKey == "MENU02" ){	// ROW 삭제
			if(confirm("삭제 하시겠습니까?") == true){
				if(GridObj.GetCellValue("NO", nRow) != ""){
					GridObj.DeleteRow(nRow);
					GridObj.SetRowHide(nRow, true); 
					//GridObj.DeleteRow(nRow, false); 		
				}else{
					GridObj.DeleteRow(nRow);
				}
				// 누적 계산 다시 함.
				calAllCum();
				// 번호 set
				setNo()
			}
		}
		else if( strMenuItemKey == "MENU03" ){	// 삭제 취소

		}
		else {
			alert("존재 하지 않은 메뉴입니다.");
		}		
	}

};

/*┌───────────────────────────────────────┐
  │삭제 취소 Fnc
  └───────────────────────────────────────┘*/
function unDo(){
	
	if( delRowList == "" ){
		alert("삭제된 행이 없습니다.");
		return;
	}
	var list = delRowList.split("!%!");
	//alert(list[list.length-1]); 
	var idx = list[list.length-1];
	GridObj.SetRowHide(idx, false);
	GridObj.SetCellValue("CRUD", idx, "");
	GridObj.SetCellHiddenValue("CRUD", idx, "");
	GridObj.SetCellValue("SELECTED", idx, "0" );
	var idx = delRowList.lastIndexOf("!%!");
	delRowList = delRowList.substr(0,idx);
	//alert(delRowList);
}

/*┌───────────────────────────────────────┐
  │행 추가/삭제 Fnc
  └───────────────────────────────────────┘*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj.GetActiveRowIndex();
	
	if( str == "추가" ){		// ROW 추가
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// 출고장 구분 배경색 다시 지정
		setSrcLocBgColor();		
		// 누적 계산 다시 함.
		calAllCum();
		// 번호 set
		setNo();
	}
	else if( str == "삭제" ){	// ROW 삭제
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("삭제할 행을 선택해 주십시오.");
//			return;
//		}
		if(confirm("삭제 하시겠습니까?") == true){
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( GridObj.GetCellValue("SELECTED", i) == "1" ){
					if(GridObj.GetCellValue("NO", i) != ""){
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					}else{
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
					}
					
					if( delRowList == "" ){// 삭제 리스트에 Row Index 추가
						delRowList += "" + i;
					}else{
						delRowList += "!%!" + i;
					}					
				}
			}
			// 출고장 구분 배경색 다시 지정
			setSrcLocBgColor();	
			// 누적 계산 다시 함.
			calAllCum();
			// 번호 set
			setNo()
		}
	}
	
	saved = false;

};

/*┌───────────────────────────────────────┐
  │행 멀티선택 Fnc
  └───────────────────────────────────────┘*/
function rowInsSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // 선택한 부분의 key와 row를 가져온다
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 더이상 데이터 없다
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//해당 row에 check를 한다
			GridObj.SetCellValue("SELECTED", rowNo, "1");
		}
		i++;
	}
}

/*┌───────────────────────────────────────┐
  │행 멀티선택 취소 Fnc
  └───────────────────────────────────────┘*/
function rowInsDeSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // 선택한 부분의 key와 row를 가져온다
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 더이상 데이터 없다
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//해당 row에 check를 한다
			GridObj.SetCellValue("SELECTED", rowNo, "0");
		}
		i++;
	}
}


/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	// 출고장 구분 배경색 다시 지정
	setSrcLocBgColor();
	
	getBoxPerPalet( nRow ); // 출고장일경우 box_per_palet 추출

	// 누적 계산 다시 함.
	calAllCum();
	
	saved = false;
};

/*┌──────────────────────────────────┐
  │WiseGrid4 Duble Click Event - 4번 그리드 제품명 클릭시 상차 조합화면에 신규 추가 
  └──────────────────────────────────┘*/
function GridCellDblClickHandler4(strColumnKey, nRow){
	var idx = GridObj.GetActiveRowIndex(); // 선택된 Row의 인덱스
	
	insertRow( idx ); // 선택된 Row 밑에 새로운 Row 추가
	
	GridObj.SetCellValue("ITEM_ID", idx+1, GridObj4.GetCellHiddenValue("ITEM_NAME", nRow));
	GridObj.SetCellValue("ITEM_NAME", idx+1, GridObj4.GetCellValue("ITEM_NAME", nRow));

	cnt = idx+1;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", idx));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", idx));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	// 출고장 구분 배경색 다시 지정
	setSrcLocBgColor();
	
	// 누적 계산 다시 함.
	calAllCum();
	// 번호 set
	setNo()
	
	getBoxPerPalet( idx+1 );
};
/*┌──────────────────────────────────┐
  │WiseGrid4  Click Event  해당 품목 조회  - 테스트 searchinfo
  └──────────────────────────────────┘*/
function Grid4CellDblClickSearch(strColumnKey, nRow){
//alert(strColumnKey);

	if(strColumnKey == "ITEM_NAME" ){
		GridCellDblClickHandler4(strColumnKey, nRow);
		return
	}else{
		
	}	
	var item_id = GridObj4.GetCellHiddenValue("ITEM_NAME", nRow)
	
	doQuery10(item_id);
	doQuery11(item_id);
};

function doQuery10(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "search");
	
	var item_id ;
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", version);
	GridObj2.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url);
}

function doQuery11(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "search3");
	
	var item_id ;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │WiseGrid Row Scroll Event
  └──────────────────────────────────┘*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}

//--------------------------------------   main_template 에 정의된 Event ---------------------------------------------------//
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	// 기본재고상차, 추가재고상차, 생산상차 PLT 및 BOX 수량 변경시
	// 합계 및 누적 계산 및 PLT, BOX 수량 변경
	if(strColumnKey.lastIndexOf("PLT") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT") >= 0 ) {
			changePLT( strColumnKey, nRow, nOldValue, nNewValue ); // 합계 및 누적합계 계산 PLT
			calBoxQty( strColumnKey, nRow );					 // BOX 수량 수정
		} // 합계 및 누적합계 계산 PLT
		else {
			changeBOX( strColumnKey, nRow, nOldValue, nNewValue ); // 합계 및 누적합계 계산 BOX
			calPltQty( strColumnKey, nRow );					 // BOX 수량 수정
		}
		
		saved = false;
	}
	
	// 수송일자, 차량순번 변경시 
	// 출고장 구분 배경색 다시 지정 및 누적 값 계산	
	if( strColumnKey == "TRANS_DATE" || strColumnKey == "TRUCK_SEQ"){
		
		// 출고장 구분 배경색 다시 지정
		setSrcLocBgColor();
		
		// 누적 상차 집계 다시 계산
		// 변경한  그룹(수송일자, 출고장, 차량순번) 변경 후
		// 다음 그룹(수송일자, 출고장, 차량순번) 도 변경한다.
		var next_nRow = calCum(nRow); // 변경된 수송일자, 출고장, 차량순번에 해당하는 누적값 계산
		
		calCum(next_nRow);            // 변경된 수송일자, 출고장, 차량순번의 다음 수송일자, 출고장, 차량순번에 해당하는 누적값 계산
		
		if( strColumnKey == "TRANS_DATE" ) {
			getBoxPerPalet( nRow ); // 출고장일경우 box_per_palet 추출
			GridObj.SetCellHiddenValue("TRANS_DATE", nRow, nOldValue); // 기존 수송일자 저장
		}
		
		calAllCum(); // 누적 계산 다시함
		// 번호 set
		setNo();
		
		saved = false;
	}
	
	// 제품 코드 변경시 
	if( strColumnKey == "ITEM_ID" ){
		
		// box_per_palet 추출
		getBoxPerPalet( nRow );
		
		// 제품 명 set
		getItemInfo( nRow, nNewValue );
		
		saved = false;
	}
	
}

/*┌─────────────────────────────────────────────────────┐
  │사용자 직접 입력값으로부터 제품정보 조회
  │제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색 Fnc
  └─────────────────────────────────────────────────────┘*/
function getItemInfo( nRow, nNewValue ) {
	
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var ItemId = nNewValue;
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == "" || dc_id == null ) {
		alert("출고장을 먼저 선택하세요.");
		return;
	}
	
	// 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("ITEM_ID", nRow);
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// 일치하는 결과 1개
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
/*┌──────────────────────────────────┐
  │WiseGrid Cell Click Event
  └──────────────────────────────────┘*/

function GridCellClick(strColumnKey, nRow){

	if( strColumnKey == "NO" ){
		GoSearchInfo();
	}	
	
	oldRowData = GridObj.GetCellValue("TRANS_DATE", nRow) + GridObj.GetCellHiddenValue("SRC_LOC", nRow)
					+ GridObj.GetCellValue("TRUCK_SEQ", nRow) + GridObj.GetCellValue("ITEM_ID", nRow);
	oldRow = nRow;
	
	// 처음 출고장이 선택되어 있지 않은 경우에만 아래와 같이 처리. 
	if(document.frm.src_loc_sel.value == null || document.frm.src_loc_sel.value == ""){
		document.frm.src_loc_sel.value = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	}
	
}

/*┌──────────────────────────────────┐
  │WiseGrid Cell Duble Click Event
  └──────────────────────────────────┘*/
function GridCellDblClickHandler(strColumnKey, nRow){

	var findrow = GridObj5.FindArea(GridObj.GetCellValue("ITEM_ID", nRow),'ITEM_CODE',0,'ITEM_CODE',GridObj5.GetrowCount()-1);
	findrow = findrow.split(",")[1];
	GridObj5.MoveRow(findrow); 
	GridObj5.SetCellFocus('ITEM_CODE', findrow, false);

	GridObj.SetCellFocus('ITEM_ID', nRow, false);
	// 제품 코드 컬럼이면 제품 검색 팝업 실행
//	if( strColumnKey == "ITEM_ID" ){
//		openItemSearchPop( strColumnKey, nRow );
//	}
	
};

/*********************************************   기타 Function   **********************************************************/

/*┌──────────────────────────────────┐
  │입고장 select box 생성 Fnc
  └──────────────────────────────────┘*/
function doChangeVersion(){
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	
	var paramKey = "version!%!seq";
	var paramCode = version + "!%!" + seq;
	var queryId = "trans_dc_id_and_short_name_list_new";
	
	commonUtil.getSelQeury(paramKey, paramCode, queryId,{
		callback:function(result){
						
			if(result.length > 0){
				var divTgt = "<select name=\"tgt_loc_sel\" style=\"width:160px; \" >";
				divTgt += "<option value=\"\">선택</option>"
				
				for( i = 0 ; i < result.length; i++ ){
					divTgt += "<option value=\"" + result[i][0] + "\" ";
					if( result[i][2] == "Y" ){// 한번 이상 저장된 입고장 노란색으로 표시
						divTgt += "style=\"background-color:#ffffaa; \" ";
					}
					
					if( tgt_loc == result[i][0]){
						divTgt += "selected>";
					}else{
						divTgt += ">";
					}
					
					divTgt += result[i][1] + "</option>";
				}				
                																
                divTgt += "</select>"
                
                divTgtLoc.innerHTML = divTgt;
				
			}else{
				alert("입고장 리스트를 가져오지 못했습니다.");
			}			
		}
	});
}

/*┌──────────────────────────────────┐
  │번호 Fnc
  └──────────────────────────────────┘*/
function setNo(){
	var rowCnt = GridObj.GetRowCount()-1;
	var cnt = 1;
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", 0);
	for( i = 0 ; i < rowCnt ; i++ ){
		
		if( !GridObj.IsRowHide(i) ){// 숨겨진 Row가 아니면 번호 매김
			GridObj.SetCellValue("NO", i, cnt++);
		}
		var temp = GridObj.GetCellValue("TRUCK_SEQ", i+1);
		if( truck_seq != temp ){// 차량 순번이 바뀐경우
			cnt = 1; //번호 초기화
			truck_seq = temp; // 차량 순번 변경
		}
	}
}

/*┌──────────────────────────────────┐
  │누적 계산 전체 Fnc
  └──────────────────────────────────┘*/
function calAllCum(){
	var rowCnt = GridObj.GetRowCount();
	var cnt = 0;
	var pltCum = 0;
	var boxCum = 0;	
	
	do{
		if( GridObj.GetCellValue("CRUD", cnt) != 'DE' ){
			pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
			boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
			GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
			GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxCum));
			
			if(GridObj.GetCellHiddenValue("CUM_PLT", cnt) == "CUM"){
				// 누적 값 저장 변수 초기화
				pltCum = 0;
				boxCum = 0;
			}
		}
		cnt++;
	}
	while(cnt < rowCnt);
	
}

/*┌──────────────────────────────────┐
  │출고장 구분 배경색 set Fnc
  └──────────────────────────────────┘*/
function setSrcLocBgColor(){
	// 출고장 구분색
	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
	
	var str = GridObj.GetCellValue("TRANS_DATE", 0)
				  + GridObj.GetCellHiddenValue("SRC_LOC", 0)
				  + GridObj.GetCellValue("TRUCK_SEQ", 0);
	
	var colBg = colBg01; //라인 구분 색
	
	// 출고장별 누적 합계 flag 및 글자색 초기화
	for( i = 0 ; i < rowLeng ; i++ ){
		GridObj.SetCellFgColor('CUM_PLT', i, '0|0|0'); 
		GridObj.SetCellFgColor('CUM_BOX', i, '0|0|0');
		GridObj.SetCellHiddenValue("CUM_PLT", i, "");
		GridObj.SetCellHiddenValue("CUM_BOX", i, "");
	}
	
	var preIdx = 0;
	for( i = 0 ; i < rowLeng ; i++ ){
		if(GridObj.GetCellHiddenValue("RTE", i) == 'DE' || GridObj.GetCellValue("CRUD", i) == 'DE'){ 
			continue; 
		}else{
			//작업장별 구분(row배경색)
			if( str != GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i) ){		
				GridObj.SetCellFgColor('CUM_PLT', preIdx, '255|10|10'); // 누적상차 집계 출고장별 마지막 라인 글자색 지정
				GridObj.SetCellFgColor('CUM_BOX', preIdx, '255|10|10');
				
				GridObj.SetCellHiddenValue("CUM_PLT", preIdx, "CUM"); // 누적 합계 계산시 사용하기 위한 flag 셋팅
				GridObj.SetCellHiddenValue("CUM_BOX", preIdx, "CUM");
					
				str = GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i);
				if(colBg == colBg01) {
					colBg = colBg02;				
				}
				else {
					colBg = colBg01;				
				}
			}
	
			for( j = 0; j < GridObj.GetColCount(); j++){
				// 컬럼구분선
				if(GridObj.GetColHDKey(j).substr(0,2) == "SP"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color_sp); 
				}						
				// 라인 구분 배경색
				else{
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
				}			
			}
			//GridObj.SetRowBgColor(i, colBg); // row 배경색 지정				
			
	//		if( i == rowLeng-1 ){// 그룹 별 마지막 Row를 삭제 했을 경우 누적 합계 글자색이 지정 안되어서...
	//			var idx = rowLeng-2;
	//			//var flag = true;
	//			while(1){
	//				if(GridObj.GetCellValue("CRUD", idx) != "DE"){
	//					GridObj.SetCellFgColor('CUM_PLT', idx, '255|10|10'); // 누적상차 집계 출고장별 마지막 라인 글자색 지정
	//					GridObj.SetCellFgColor('CUM_BOX', idx, '255|10|10');
	//					
	//					GridObj.SetCellHiddenValue("CUM_PLT", idx, "CUM"); // 누적 합계 계산시 사용하기 위한 flag 셋팅
	//					GridObj.SetCellHiddenValue("CUM_BOX", idx, "CUM");
	//					break;
	//				}
	//				idx--;
	//			}
	//		}
			preIdx = i;
		}
	}
	
	var str = GridObj.GetCellValue("SRC_LOC", rowLeng-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowLeng-1, color_tot); // row 배경색
    	GridObj.SetCellFontBold('SRC_LOC', rowLeng-1, 'true'); // font 굵기  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowLeng-1, 'disable'); //선택할 수 없고 편집할 수 없다. 
    		
    	}    	
    }
}

/*┌─────────────────────────────────┐
  │누적 상차 집계 누적값 계산 Fnc
  └──────────────────────────────────┘*/
function calCum(nRow){
	// 누적 상차 집계 계산
	var cnt = nRow;
	var pltCum = 0;
	var boxCum = 0;
	do{
		pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt))
				  + Number(GridObj.GetCellValue("PROD_PLT", cnt));
				  
		boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt))
				  + Number(GridObj.GetCellValue("PROD_BOX", cnt));
				  
		GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
		GridObj.SetCellValue("CUM_BOX", cnt, boxCum);
	}while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	return cnt; // 마지막 누적 계산된 다음 row 인덱스 리턴
}


/*┌──────────────────────────────────┐
  │PLT 수량 변경 Fnc
  └──────────────────────────────────┘*/
function changePLT(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_PLT"; // 합계 및 누적합계 계산 PLT
	
	var diff = nNewValue - nOldValue;
	
	var rowCnt = GridObj.GetRowCount();
	
	// 누적 상차 집계 합계
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// 변경된 컬럼 합계
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, Math.round(tot + diff));
	
	// 누적 상차 집계 계산
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));	

}

/*┌──────────────────────────────────┐
  │BOX 수량 변경 Fnc
  └──────────────────────────────────┘*/
function changeBOX(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_BOX"; // 합계 및 누적합계 계산 PLT
	
	var diff = nNewValue - nOldValue;
	//alert(diff);	
	var rowCnt = GridObj.GetRowCount();
	
	// 누적 상차 집계 합계
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// 변경된 컬럼 합계
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, tot + diff);
	
	// 누적 상차 집계 계산
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));

}

/*┌──────────────────────────────────┐
  │Box 수량 계산  Fnc
  └──────────────────────────────────┘*/
function calBoxQty( strColumnKey, nRow ) {
	
	var col_name = strColumnKey.replace("PLT","");
	var nOldValue = GridObj.GetCellValue(col_name + "BOX", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj.SetCellValue(col_name + "BOX", nRow, boxQty);
	
	// 누적 상차 집계 및 합계 계산
	changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*┌──────────────────────────────────┐
  │PLT 수량 계산  Fnc
  └──────────────────────────────────┘*/
function calPltQty( strColumnKey, nRow ) {
	var col_name = strColumnKey.replace("BOX","");
	var nOldValue = GridObj.GetCellValue(col_name + "PLT", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
	GridObj.SetCellValue(col_name + "PLT", nRow, pltQty);
	
	// 누적 상차 집계 및 합계 계산
	changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*┌──────────────────────────────────┐
  │box_per_palet 추출 Fnc
  └──────────────────────────────────┘*/
function getBoxPerPalet( nRow ) {
	
	// 출고장, 제품코드 추출
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}

/*┌──────────────────────────────────┐
  │WiseGrid Insert Row Fnc
  └──────────────────────────────────┘*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // 마자막 라인일 경우 
		GridObj.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj.InsertRow(0);
		nRow = -1;
	}
	else{
		GridObj.InsertRow(nRow+1);
	}
	
	// 기본 데이터 셋팅
	if(nRow == -1){
		GridObj.SetCellValue("RTE", 0, "");
		GridObj.SetCellValue("TRANS_DATE", 0, "");
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", 0, "");
		GridObj.SetCellValue("TRUCK_SEQ", 0, "");
		GridObj.SetCellValue("PLAN_TYPE", 0, "");	
	}else{
		GridObj.SetCellValue("RTE", nRow+1, GridObj.GetCellValue("RTE", nRow));
		GridObj.SetCellValue("TRANS_DATE", nRow+1, GridObj.GetCellValue("TRANS_DATE", nRow));
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", nRow+1, GridObj.GetCellHiddenValue("SRC_LOC", nRow));
		GridObj.SetCellValue("TRUCK_SEQ", nRow+1, GridObj.GetCellValue("TRUCK_SEQ", nRow));
		GridObj.SetCellValue("PLAN_TYPE", nRow+1, GridObj.GetCellValue("PLAN_TYPE", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", nRow));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", nRow));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while( (GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < rowCnt));
};

// Total Plt 닫기
function closeTotalPlt() {
	if( divTotalPlt.style.display == "BLOCK" 
		|| divTotalPlt.style.display == "block" ) {
		divTotalPlt.style.display = "none";
	} 
	
	// wisegrid 다시 보이게 함.
	document.WiseGrid.style.display = "block";
	document.WiseGrid2.style.display = "block";
	document.WiseGrid3.style.display = "block";
	document.WiseGrid4.style.display = "block";
}

// Total Plt 열기
function openTotalPlt() {

	// wisegrid 안 보이게 함.
	document.WiseGrid.style.display = "none";
	document.WiseGrid2.style.display = "none";
	document.WiseGrid3.style.display = "none";
	document.WiseGrid4.style.display = "none";
	
	var tableLen = GridObj.GetRowCount();
	var pltTableLen = plt_tbody.rows.length;
	var v_trans_date = null;
	var v_src_loc = null;
	var v_src_name = null;
	var v_truck_seq = 0;
	var v_cum_plt = 0;
	var insertRow = 0;
	
	// Row가 존재하지 않는 경우.
	if(tableLen == 1){
		alert("누적 PLT를 계산할 데이타가 존재하지 않습니다.");
		return;
	}	
	else{	
		// 먼저 기존 Row 삭제
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}
		// 전체 Row를 하나씩 읽어 내리면서 같지 않는 값을 div에 추가함.
		for(var i = 0; i< tableLen-1; i++){
			if( GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
				// 필수 입력값을 입력하지 않은 경우, 누적 값을 보여 주지 않음.
				if(GridObj.GetCellValue("TRANS_DATE", i) == "" || GridObj.GetCellValue("TRANS_DATE", i) == null
				|| GridObj.GetCellValue("SRC_LOC", i) == "" || GridObj.GetCellValue("SRC_LOC", i) == null
				|| GridObj.GetCellValue("TRUCK_SEQ", i) == "" || GridObj.GetCellValue("TRUCK_SEQ", i) == null){
					alert("수송일자, 출고장, 차량번호를 정확히 입력하신 후 다시 클릭해 주십시요.");
					return;
				}
				v_trans_date = GridObj.GetCellValue("TRANS_DATE", i);
				v_src_loc    = GridObj.GetCellHiddenValue("SRC_LOC", i);
				v_src_name   = GridObj.GetCellValue("SRC_LOC", i);
				v_truck_seq  = GridObj.GetCellValue("TRUCK_SEQ", i);
				v_cum_plt    = GridObj.GetCellValue("CUM_PLT", i);
				
				var oRowPlt = plt_tbody.insertRow(insertRow);
				insertRow ++;
				oRowPlt.height = 22; 
						
				var oCell0 = oRowPlt.insertCell(); // 수송일자
				var oCell1 = oRowPlt.insertCell(); // 출고장
				var oCell2 = oRowPlt.insertCell(); // 차량번호
				var oCell3 = oRowPlt.insertCell(); // PLT
				
				oCell0.align = "center"; oCell0.width = "29%" ; // 수송일자
				oCell1.align = "center"; oCell1.width = "25%" ; // 출고장
				oCell2.align = "center"; oCell2.width = "25%" ; // 차량번호
				oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
				oCell3.className = "right"; // 생산상차 BOX
				
				// 번호
				//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
				//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
				
				// 수송일자
				oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
								+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
				// 출고장
				oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
								+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
				// 차량번호
				oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
								+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
				// PLT
				oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
								+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
				document.recalc();
			}				
		}// end for
		
	}// end if
	
	var pltTransLen = plt_tbody.rows.length;
	
	if(pltTransLen > 1){ // Row 수가 1개 이상일 경우에만 중복되는 것이 있는지 체크
		for(var i = 0; i < pltTransLen; i++){
			for(var j = i + 1; j < pltTransLen; j++){
				if(document.frm.v_trans_date[j]){
					if(document.frm.v_trans_date[i].value == document.frm.v_trans_date[j].value
					&& document.frm.v_src_loc[i].value == document.frm.v_src_loc[j].value
					&& document.frm.v_truck_seq[i].value == document.frm.v_truck_seq[j].value){
						var cum_plt_tmp = strToNum(document.frm.v_cum_plt[i].value) + strToNum(document.frm.v_cum_plt[j].value);
						cum_plt_tmp = Math.round(numberFormat(cum_plt_tmp.toString(),2)*100)/100;
						document.frm.v_cum_plt[i].value = cum_plt_tmp;
					
						plt_tbody.deleteRow(j);
						j--;
						pltTransLen--;
					}
				}
			}
			if(strToNum(document.frm.v_cum_plt[i].value) < 12)
				document.frm.v_cum_plt[i].style.color = "red";
		}
	}
	else{
		if(document.frm.v_cum_plt[0]){
			if(strToNum(document.frm.v_cum_plt[0].value) < 12)
				document.frm.v_cum_plt[0].style.color = "red";
		}
		else{
			if(strToNum(document.frm.v_cum_plt.value) < 12)
				document.frm.v_cum_plt.style.color = "red";
		}
	}
	
	// div의 display를 block으로 변경
	if( divTotalPlt.style.display == "NONE" 
		|| divTotalPlt.style.display == "none" ) {
		divTotalPlt.style.display = "block";
	} 
}

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
	document.WiseGrid5.height = tableHeightValue + "px"; 
	
}

/*┌──────────────────────────────────┐
  │제품 검색 POPUP  Fnc
  └──────────────────────────────────┘*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	
	if( src_loc == "" || src_loc == null ) {
		alert("출고장을 먼저 선택하세요.");
		return;
	}
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}


//------------------------------------------------- 기존의 함수 ------------------------------------------------------//

// Ctrl 키가 keydown 상태인지 체크하는 flag
var ctrlKeyDownCheck = false;

// CTRL  키를 눌렀을때 호출
function setCtlKeyDown(e){
	if (!e) e = window.event;
	
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = true;
	}
}

// CTRL 키, F2 키를 눌렀다가 놓았을때 호출
function setCrlKeyUp(e){
	if (!e) e = window.event;
	
	// F2 키
	if(e.keyCode == "113"){
		//clickLine(document.frm.btnSearchRow, 1);
		//GoSearchInfo();
		//rowInsDel(document.frm.btnInsertRow); // Row추가 
		//alert("!!");
	}
	
	// ctrl 키 
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = false;
	}
}


// version - seq 분리
function setVersions( versions ) {

	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

/********************************************************************************************/
// divTotalPlt 부분 (새로운 div창 처리)
/********************************************************************************************/

var checkMouseDown = false;
var dragobject = null;
var tx;
var ty;

// 선택된 화면 객체중에 parentNode가 무엇인지 찾아내는 로직.
function getReal(el) {
	temp = el;

	while ((temp != null) && (temp.tagName != "BODY")) {
		if (temp.id == "totalPltHeader"){
			el = temp.parentElement;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

// Mouse 왼쪽 키를 누른경우.
function move_mousedown() {
	var el = getReal(window.event.srcElement)
	if (el.id == "divTotalPlt") {
		dragobject = el;
		checkMouseDown = true;

		ty = window.event.clientY - getTopPos(dragobject);
		tx = window.event.clientX - getLeftPos(dragobject);

		window.event.returnValue = false;
		window.event.cancelBubble = true;
		//dragobject.filters.alpha.opacity=77;
	}
	//alert(ty+" "+tx);
}

// Mouse 왼쪽 키를 땐경우.
function move_mouseup() {
	dragobject = null;
	checkMouseDown = false;
}

// Mouse 왼쪽 키를 누른상태에서 움직인 경우..
function move_mousemove() {
	if(checkMouseDown){
		if (dragobject) {
			if (window.event.clientX >= 0 && window.event.clientY >= 0) {
				dragobject.style.left = window.event.clientX - tx + "px";
				dragobject.style.top = window.event.clientY - ty + "px";
				//alert(dragobject.style.left);
				//dragobject.filters.alpha.opacity=77;
			}
			window.event.returnValue = false;
		}
	}
}

function getLeftPos(el) {
	return el.style.pixelLeft;
}

function getTopPos(el) {
	return el.style.pixelTop;
}

// 해당 플레그에대한 기준으로 쿼리 정렬
function doCheckFlag(obj){
	
	if(obj.name == "sort_type_chk" ){ 
		if(obj.checked){
				document.frm.sort_type.value = "Y";// 촐고장 기준으로 조회
		}else{
				document.frm.sort_type.value = "N";//일자 기준으로 조회
		}
	}
	if(obj.name == "sort_stock_day_chk" ){ 
		if(obj.checked){
				document.frm.sort_stock_day.value = "Y";// 재고일수기준으로 정령
		}else{
				document.frm.sort_stock_day.value = "N";// 아이템 아이디 순으로 정렬
		}
	}
	if(obj.name == "search_type_chk" ){ // 공급 필요 품목 조회
		if(obj.checked){
				document.frm.search_type.value = "Y";
		}else{
				document.frm.search_type.value = "N";
		}
	}

}


//┌──────────────────────────────────┐
//│수송계회 원복 :
//| 단순히 수송계획 엔진수행 후 백업되어 있던 trans_plan_sync 테이블의 데이터를 TRANS_PLAN을 지운후에 복사한다. 2013.09.04 남웅용 
//└──────────────────────────────────┘*/
function GoRepairPlan() {

	// 버전, 입고장, 수송구분 검색 데이터 setting
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var seq = document.frm.seq.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var user_id = document.frm._user_id.value;
	

	if( version == "" || version == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("입고장을 선택후 조회를 해주십시요..");
		return;
	}

	var tgt_name;
	var sync_flag;
	var in_paramKey = "version!%!tgt_loc";
	var in_paramCode = version+"!%!"+tgt_loc;

	var in_paramKey_1 = "version!%!tgt_loc!%!seq!%!plan_type!%!trans_start!%!trans_end!%!user_id";
	var in_paramCode_1 = version+"!%!"+tgt_loc+"!%!"+seq+"!%!"+plan_type+"!%!"+trans_start+"!%!"+trans_end+"!%!"+user_id;

		commonUtil.getCodeInfo(in_paramKey,in_paramCode,"Repair_Plan_Chk", 
		{ 
			callback:function(arrList)
			{
				if( arrList.length == 1 )
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
				else
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
							
				if(sync_flag == "N"){
					if(!confirm(tgt_name+"의 수송계획이 동기화 되지 않았습니다. 수송계획을 원복 하시겠습니까??")){
						return;
					}
				}else{ //sync_flag == "N"가 아닐수가 없다!!!!!!! 바꾸는 부분이 존재하지 않음. 2013.09.04 남웅용 
					if(!confirm(tgt_name+"의 수송계획을 원복 하시겠습니까??")){
						return;
					}
				}
				//////////////////////////////////////////////////////////
				commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_1",{
					callback:function(result){
						if(result == "SUCCESS"){
						}
						else{
							alert("계획 원복을 실패 하였습니다 .");
							return;
						}
						commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_2", {
							callback:function(result){
								if(result == "SUCCESS"){
								}
								else{
									alert("계획 원복을 실패 하였습니다 .");
									return;
								}
								/*  TRANS_PLAN_TEMP를 사용하지 않기 때문에 아래 Repair_Trans_Plan_3를 실행하는 것은 의미없다 2013.09.04 남웅용
								commonUtil.executeQuery(in_paramKey_1, in_paramCode_1, "Repair_Trans_Plan_3", {
									callback:function(result){
										if(result == "SUCCESS"){
										alert(tgt_name+"의 계획 원복을 성공하였습니다. 조회 버튼을 누룬후 작업을 해주시기 바랍니다");
										}
										else{
										alert("계획 원복을 실패 하였습니다 .");
										return;
										}
									}
								});*/
								
							}
						});
					}
				});
				//////////////////////////////////////////////////////////
			}


		});//commonUtil.getCodeInfo end

}

/*┌──────────────────────────────────┐
  │자동 상차 조합
  └──────────────────────────────────┘*/
function GoTransPlanRegen(obj) {
	var objname		= obj.name;
	// 버전, 입고장, 수송구분 검색 데이터 setting
	var version		= document.frm.version.value;
	var seq			= document.frm.seq.value;
	var trans_start	= document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;

	if( version == "" || version == null ) {
		alert("버전을 선택하세요.");
		return;
	}

	if(!confirm(version+"버전의 자동 상차 조합을 실시합니다 . 상차 작업을 실시  하시겠습니까??")){
		return;
	}
	
	doTransPlanRegen(version, seq, trans_start, trans_end, objname);	
};


/*┌──────────────────────────────────┐
  │자동 상차 조합 실행
  └──────────────────────────────────┘*/
function doTransPlanRegen(version, seq, trans_start, trans_end, objname) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	if(objname == "btnTransRegen100"){
		GridObj.SetParam("mode", "Regen100");
	}else if(objname == "btnTransRegen200"){
		GridObj.SetParam("mode", "Regen200");
	}else if(objname == "btnTransRegen300"){
		GridObj.SetParam("mode", "Regen300");
	}
		
	//-- 서버에 전송할 파라메터 설정 --//
	//공장 코드
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq","1");
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	var version2	= document.frm.version.value;
	var seq2		= document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.doQuery(servlet_url);
 
}

