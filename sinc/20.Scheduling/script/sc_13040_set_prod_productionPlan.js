/************************************************************************************************************************************/
/************************************************************************************************************************************/
/*********************************  WiseGrid Java Script   **************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
var mode;					 // 서버와 통신 모드
var color01 = '246|246|246'; // 구분선, 소계, 근무편성이 안된 shift 배경색

/******************************************          Action Function         **********************************************/
// 조회
function GoSearch(service) {
	mode = "search";
	doQuery();
};

// 저장
function GoSave(service) {
	var GridObj = document.WiseGrid;
	
	
	mode = "save";
	doSave();	
};

/*******************************************   WiseGrid 초기화 및 설정  *****************************************************/

// WiseGrid 초기화
function init() {
	var GridObj = document.WiseGrid;
	
	setProperty(GridObj); 
	setDefault(GridObj);
	setHeader();
			
}

// Property 설정
function setDefault(GridObj){
	GridObj.bUserContextMenu = true;
	GridObj.bHDMoving = false;                  	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
	GridObj.bHDSwapping = false;                	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
	GridObj.bRowSelectorVisible = false;        	//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.strRowBorderStyle = "none";         	//로우의 테두리에 아무것도 나타나지 않는다.
	GridObj.nRowSpacing = 0;                    	//RowSpacing값을 정한다. 
	GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.

	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
    GridObj.strSelectedCellFgColor = '180|82|205';  //선택된 셀의 글자색 지정한다. 

    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;    
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	// Grid 행 높이
    GridObj.nRowHeight    = 16;
    
 	GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       

    //GridObj.strSelectedCellFgColor = '180|82|205'; //선택된 셀의 글자색 지정한다.
    //WiseGrid.strSelectedCellBgColor = '100|100|100'; // Drag로 선택된 셀의 배경색상을 변경할 수 있다 
    
    //GridObj.bDoQueryDynamic = true;
    
    // Context Menu 사용자 MENU 추가
	//GridObj.AddUserContextMenuItem("MENU_CELL","M01","CAPA 시간 정보");
	//GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 추가");
	//GridObj.AddUserContextMenuItem("MENU_CELL","MENU02","Row 삭제");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU03","Enter 오른쪽 이동");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU04","Enter 아래 이동");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU05","소계 적용");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU06","소계 적용 해제");
	//GridObj.AddUserContextMenuItem("MENU_CELL","MENU07","설비 추가");
	        
}

/*┌──────────────────────────────────┐
  │해더생성							 │
  └──────────────────────────────────┘*/
function setHeader() {		
     commonUtil.getCodeList("", "" , "daily_header",headerResult); //날짜형 해더를 만들어 준다.
};

function headerResult(result) {		
	var GridObj = document.WiseGrid;
	//display
	GridObj.AddHeader("CRUD",		"구분",		"t_text", 		8, 		40,		false);		
	GridObj.AddHeader("C01",		"번호",		"t_number",		10,		40,    false);
	GridObj.AddHeader("C02",		"업체코드",   "t_text",		50,		40,    false);
	GridObj.AddHeader("C03",		"업체명",  	"t_text",		50,		80,    false);
	GridObj.AddHeader("C04",		"작업장\n코드", "t_text",		50,		45,    false);
	GridObj.AddHeader("C05",		"작업장명",   "t_text",		50,		80,    false);
	
	GridObj.AddHeader("ITEM_ID",	"제품코드", 	"t_text",		50,		80,    	false);
	GridObj.AddHeader("ITEM_NAME",	"제품명",		"t_text",		50,		220, 	false);
	GridObj.AddHeader("C06",		"생산버전",   "t_text",		50,		40,    false);
	
	GridObj.AddHeader("C07",		"규격",		"t_text",		50,		110, 	false);
	GridObj.AddHeader("C08",		"설비유형",	"t_text",		50,		80, 	false);
	GridObj.AddHeader("C09",		"남",		"t_number",		50,		40,    	false);
	GridObj.AddHeader("C010",		"여",		"t_number",		50,		40,    	false);
	
	GridObj.AddHeader("C011",		"CAPA",				"t_number",		50,		65, 	false);
	GridObj.AddHeader("C012",		"작업비용\n(BOX당)",	"t_number",		50,		70, 	false);
	GridObj.AddHeader("C013",		"작업\n의뢰량",		"t_number",		50,		70, 	false);

	//-----------------------------------------------------------------------------//
	GridObj.AddHeader("SP01",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D01A",	"",		"t_number",		12,		85, 	true);//월 
	GridObj.AddHeader("SP02",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D02A",	"",		"t_number",		12,		85, 	true);//화 
	GridObj.AddHeader("SP03",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D03A",	"",		"t_number",		12,		85, 	true);//수 
	GridObj.AddHeader("SP04",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D04A",	"",		"t_number",		12,		85, 	true);//목
	GridObj.AddHeader("SP05",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D05A",	"",		"t_number",		12,		85, 	true);//금
	GridObj.AddHeader("SP06",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D06A",	"",		"t_number",		12,		85, 	true);//토 
	GridObj.AddHeader("SP07",	" ",	"t_text",		1,		1, 		false); 
	GridObj.AddHeader("D07A",	"",		"t_number",		12,		85, 	true);//일
	GridObj.AddHeader("SP08",	" ",	"t_text",		1,		1, 		false); 
	
	GridObj.AddHeader("TOT",	"합계",	"t_number",		50,		60, 	false);
	GridObj.AddHeader("DIFF",	"차이",	"t_number",		50,		60, 	false);
	
	/* 일자별 WO_ID */	
	GridObj.AddHeader("D01W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D02W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D03W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D04W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D05W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D06W",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D07W",	"",		"t_text",		120,		0, 	true);//월 
	/* 일자별 IF_FLAG */	
	GridObj.AddHeader("D01F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D02F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D03F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D04F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D05F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D06F",	"",		"t_text",		120,		0, 	true);//월 
	GridObj.AddHeader("D07F",	"",		"t_text",		120,		0, 	true);//월 
	
	
	// hidden
	

	
	
	//-- 헤더 그룹 --//
	GridObj.AddGroup("TO_INFO", "인력소요"); 
	GridObj.AppendHeader("TO_INFO", "C09"); 
	GridObj.AppendHeader("TO_INFO", "C010");  
	
	var weekNo    = ''; //화면에서 조회하는 주차가 어느 주차인다. ( 당주=1, 차주=2, 차차주=3)
    var dateArray = ''; //날짜Row를 '!%!'기준으로 배열을 만들기 위한 변수.
    var dayCount  = 1;  //날짜 순위
    if(document.frm.checked_weekly[0].checked) weekNo=1;
    if(document.frm.checked_weekly[1].checked) weekNo=2;
    if(document.frm.checked_weekly[2].checked) weekNo=3;
    
    var num = 15;
    
    for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
    {
         if( result[i].substr(0,1)==weekNo) //화면에 선택된 주차에 대한 것만 봅느다.
         {
             dateArray = '';
             dateArray = result[i].split('!%!'); //'!%!'로 구분된 데이터를 split하여 배열로 저장한다.
               
             //해더 그룹생성
             GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //날짜 그룹
                                
             GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
             dayCount++;
         } 
    }
	
	//Hearder 높이
	GridObj.nHDLineSize   = 20;
	// Grid 행 높이
    //GridObj.nRowHeight    = 30;
	
	
	//AddHeader? ??? ? ??? ???? ?????
	GridObj.BoundHeader();	

	// 컬럼숨김 : true(숨김모드)
	GridObj.SetColHide('CRUD', true); 
	

	
	GridObj.SetCRUDMode("CRUD", "추가", "수정", "삭제");
	
	GridObj.SetColFix('ITEM_NAME');
	
	GridObj.SetColCellAlign('C02','center');
	GridObj.SetColCellAlign('C03','center');
	GridObj.SetColCellAlign('C04','center');
	GridObj.SetColCellAlign('C05','center');
	GridObj.SetColCellAlign('ITEM_ID','center');
	GridObj.SetColCellAlign('C06','center');
	GridObj.SetColCellAlign('C08','center');

	GridObj.SetColCellAlign('C07','right');


	
	
	
	
	GridObj.SetNumberFormat("C011", "###,###,###"); // 숫자 형식
	GridObj.SetNumberFormat("C012", "###,###,###"); // 숫자 형식
	GridObj.SetNumberFormat("C013", "###,###,###"); // 숫자 형식
	GridObj.SetNumberFormat("TOT", "###,###,###"); // 숫자 형식
	GridObj.SetNumberFormat("DIFF", "###,###,###"); // 숫자 형식
	
	GridObj.SetNumberFormat("D01A", "###,###,###"); // 숫자 형식
	GridObj.SetNumberFormat("D02A", "###,###,###");
	GridObj.SetNumberFormat("D03A", "###,###,###");
	GridObj.SetNumberFormat("D04A", "###,###,###");
	GridObj.SetNumberFormat("D05A", "###,###,###");
	GridObj.SetNumberFormat("D06A", "###,###,###");
	GridObj.SetNumberFormat("D07A", "###,###,###");

	//GridObj.SetNumberFormat("C36", "###,###,###");
	//GridObj.SetNumberFormat("C15", "###,###,###");
	//GridObj.SetNumberFormat("C38", "###,###,###");
}

/***********************************************   WiseGrid 통신  **********************************************************/

// 조회
function doQuery() {
	var GridObj = document.WiseGrid;
		
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.sc_13040_set_prod_productionPlan";
	
	//WiseGrid? ??? ??? Param? ????.
	GridObj.SetParam("mode", mode);
	
	
	
	//라인그룹
	GridObj.SetParam("line_grp", document.frm.line_grp.value );
	//주차
	if(document.frm.checked_weekly[0].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[0].value);
		GridObj.SetParam("prod_dates", document.frm.w0.value);
	}
	else if(document.frm.checked_weekly[1].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[1].value);
		GridObj.SetParam("prod_dates", document.frm.w1.value);
	}
	else if(document.frm.checked_weekly[2].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[2].value);
		GridObj.SetParam("prod_dates", document.frm.w2.value);
	}
		
	//일반 멀티
	/* 
	if(document.frm.checked_multi[0].checked == true)
		GridObj.SetParam("checked_multi", document.frm.checked_multi[0].value);
	else if(document.frm.checked_multi[1].checked == true)
		GridObj.SetParam("checked_multi", document.frm.checked_multi[1].value);
	else if(document.frm.checked_multi[2].checked == true)
		GridObj.SetParam("checked_multi", document.frm.checked_multi[2].value);
	else if(document.frm.checked_multi[3].checked == true)
		GridObj.SetParam("checked_multi", document.frm.checked_multi[3].value);
	*/
	// 버전
	//GridObj.SetParam("plant_version", document.frm.plant_version.value);	
	
	//수출 내수
	//GridObj.SetParam("domain", document.frm.domain.value);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("proc_code", document.frm.proc_code.value);
	
			
	//WiseGrid? ??? ???? ???? ????.
	GridObj.DoQuery(servlet_url);
	
}

// 저장
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.sc_13040_set_prod_productionPlan";

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", mode);

	//주차
	if(document.frm.checked_weekly[0].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w0.value);
	}
	else if(document.frm.checked_weekly[1].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w1.value);
	}
	else if(document.frm.checked_weekly[2].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w2.value);
	}
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	GridObj.SetParam("plantList", document.frm.plant_list.value);
	GridObj.SetParam("versionList", document.frm.version_list.value);
	
	//WiseGrid가 서버와 통신시에 데이터를 전달한
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/* ?? */
function doInsert() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doUpdata() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "update");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doDelete() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "delete");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
}

/*******************************************   WiseGrid 통신 후  설정  ******************************************************/

/*  */
function GridEndQuery() {
	var GridObj = document.WiseGrid;
	
	// wiseGrid에서 이상메세지 확인용!
	if(GridObj.GetStatus() != "true") {
		var error_msg_extra = GridObj.GetMessage();// ?
		//alert("이 메세지를 보면 확인메세지 닫지 마시고!!! 남웅용 또는 권용찬에게 전화해 주세요!\n" + error_msg_extra);	
		return;
	}

	var mode = GridObj.GetParam("mode");

	if(mode == "search") {
		if(GridObj.GetStatus() == "true") { // 
			setGrid(GridObj);
			
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "save") {
		if(GridObj.GetStatus() == "true") {
			GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// ?
			alert(error_msg);			
		}
	}
}

// 마지막에 편집된 Row 저장
var rowIndex = 0;
// 작업장 구분선 적용 여부
var mergeSum = false;


/*■ 보정 했던 Row로 이동하기 위한 변수 .*/
var fos_plant_id = '';
var fos_proc_id  = '';
var fos_item_id  = '';

// 그리드 셋팅
function setGrid(GridObj){
	
	// 컬럼 그룹
	//GridObj.SetGroupMerge('C02,C03,C04,C05,C06'); 
	
	// 컬럼 고정
	//GridObj.SetColFix('C14');
	
	// 일자 구분 커럼 편집 않되게 막음
	GridObj.SetColCellActivation('SP01','disable');
	GridObj.SetColCellActivation('SP02','disable');
	GridObj.SetColCellActivation('SP03','disable');
	GridObj.SetColCellActivation('SP04','disable');
	GridObj.SetColCellActivation('SP05','disable');
	GridObj.SetColCellActivation('SP06','disable');
	GridObj.SetColCellActivation('SP07','disable');
	GridObj.SetColCellActivation('SP08','disable');
	
	/* */
	// 연장 정보
	//D01A - D07C 컬럼
	// row 수 : WiseGrid.GetRowCount() 
	var rowLeng = GridObj.GetRowCount();
	if( rowLeng > 0 ){
		var proc_id = GridObj.GetCellHiddenValue("C04", 0);
		
		var colBg01 = '255|255|153';
		var colBg02 = '255|255|255';
		var colBg = colBg01; //라인 구분 색
		
		var onBg01 = '255|255|0';
		var onBg02 = '239|239|239';
		var onBg = onBg01; //연장 구분 색
		
		var nonBg01 = '204|222|242';
		var nonBg02 = '239|239|239';
		var nonBg = nonBg01; // 근무편성이 안된 shift
		var colLen = GridObj.GetColCount();
		//alert(GridObj.GetColHDIndex("D07C"));
		
		
		var get_plant_id = '';
		var get_proc_id  = '';
		var get_item_id  = '';
		
		for( i = 0 ; i < rowLeng ; i++ ){
		    get_plant_id = GridObj.GetCellValue("C02",i);
	        get_proc_id  = GridObj.GetCellValue("C04",i);
	        get_item_id  = GridObj.GetCellValue("ITEM_ID",i);
	
			//alert("get_plant_id="+get_plant_id);
			//alert("fos_plant_id="+fos_plant_id);
	        //보정 했던 Row와 공장,작업장,제품이 동일한 곳으로 포커스를 이동한다.
		    if(get_plant_id==fos_plant_id && get_proc_id ==fos_proc_id && get_item_id==fos_item_id)
	        {
		        rowIndex = i;
	        }
		    
			//작업장별 구분(row배경색)
			if( proc_id != GridObj.GetCellValue("C04", i) ){
				
				proc_id = GridObj.GetCellValue("C04", i);
				if(colBg == colBg01) {
					colBg = colBg02;
					onBg = onBg02;
					nonBg = nonBg02;
				}
				else {
					colBg = colBg01;
					onBg = onBg01;
					nonBg = nonBg01;
				}
			}
			
			for( j = 0; j < 32; j++){
				// 컬럼구분선
				if(GridObj.GetColHDKey(j).substr(0,2) == "SP"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color01); 
				}
				// 라인 구분 배경색
				else{
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
				}
		
				
			}
	
		}
		
		// 차이컬럼 음수 일때 글자색 붉은색으로 set
		for(i = 0 ; i < rowLeng ; i++ ){
			if(GridObj.GetCellValue("DIFF",i) < 0){
				GridObj.SetCellFgColor('DIFF', i, '255|10|10');
			}
		}
	}
	
	// 셀 배경
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// 합계
	GridObj.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'D01A,D02A,D03A,D04A,D05A,D06A,D07A,TOT'); 
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
			
	// 컬럼 배경색
	GridObj.SetColCellBgColor('TOT','160|160|160');//합계
	GridObj.SetColCellBgColor('SP01',color01);//구분선
	GridObj.SetColCellBgColor('SP02',color01);
	GridObj.SetColCellBgColor('SP03',color01);
	GridObj.SetColCellBgColor('SP04',color01);
	GridObj.SetColCellBgColor('SP05',color01);
	GridObj.SetColCellBgColor('SP06',color01);
	GridObj.SetColCellBgColor('SP07',color01);
	GridObj.SetColCellBgColor('SP08',color01);
	
	// 헤더 그룹명 변경
	var weekNo    = ''; //화면에서 조회하는 주차가 어느 주차인다. ( 당주=1, 차주=2, 차차주=3)
    var dateArray = ''; //날짜Row를 '!%!'기준으로 배열을 만들기 위한 변수.
    var dayCount  = 1;  //날짜 순위
	if(document.frm.checked_weekly[0].checked) weekNo=1;
    if(document.frm.checked_weekly[1].checked) weekNo=2;
    if(document.frm.checked_weekly[2].checked) weekNo=3;
    	
	commonUtil.getCodeList("", "" , "daily_header",{
			callback:function(result){
				for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
			    {
			         if( result[i].substr(0,1)==weekNo) //화면에 선택된 주차에 대한 것만 봅느다.
			         {
			             dateArray = '';
			             dateArray = result[i].split('!%!'); //'!%!'로 구분된 데이터를 split하여 배열로 저장한다.
			             
			             GridObj.SetGroupHDText("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')'); 
			             
			             dayCount++;
			         } 
			    }
			}
		}
    ); //날짜형 해더를 만들어 준다.
    
    // 작업장 구분선이 적용이된 경우 조회 후 적용 시킴
    if(mergeSum){
    	setMergeSummary();
    }    
    
    // 마지막 변경한 Row로 이동
    if( rowIndex < GridObj.GetRowCount() ){
    	//GridObj.MoveRow(rowIndex);
    }
}
   
/*********************************************   WiseGrid Event   *********************************************************/

/* WiseGrid 셀의 값이 변경된 경우. */
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	var GridObj = document.WiseGrid;
	
	//rowIndex = nRow;
    fos_plant_id  = GridObj.GetCellValue("C02",nRow);
    fos_proc_id   = GridObj.GetCellValue("C04",nRow);
    fos_item_id   = GridObj.GetCellValue("ITEM_ID",nRow);


	/* 외부사업장은 월요일에만 생산물량 입력 */
	if(fos_plant_id == '032' || fos_plant_id == '002' || fos_plant_id == '007' ){ //(fos_plant_id == '032' || nRow == '1'|| nRow == '5'|| nRow == '6' ){ //

	}else{
		if(strColumnKey != 'D01A'){
			alert("사외 작업장은 월요일에만 생산물량을 입력할수있습니다.");
			GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
		}else{
			
		}
	}	
	
	
    
	// 제품별 합계(세로)
	var totSum = 0;
//	for( i = 15 ; i < 36 ; i++ ){
//		totSum += Number(GridObj.GetCellValue("C" + i,nRow));
//	}
	for( i = 1 ; i < 8 ; i++ ){
				var shift;
				shift = "A";
				totSum += Number(GridObj.GetCellValue("D0" + i + shift,nRow));
	}
	
	GridObj.SetCellValue('TOT',nRow,totSum);
	
	var faQty = Number(GridObj.GetCellValue("C013", nRow));
	GridObj.SetCellValue("DIFF", nRow, totSum - faQty);
}

// Message DB에 저장하기 위해 필요한 값
var cat_id;
var plant_id;
var version;
var seq;
var item_id;
var proc_id;
var start_dates;
var prod_dates_seq;
var shift_type;
var ord_no;
var ord_item_no;
var user_id;

// 셀 클릭 이벤트
function GridCellClick(strColumnKey, nRow){
		
	if(strColumnKey < "D01A" || strColumnKey > "D07A") return
	
	// 합계
	totalSum(strColumnKey, nRow);
	
	var GridObj = document.WiseGrid;
	
	//alert(GridObj.GetCellValue(strColumnKey, nRow));
	
	//D01A ==> 01A
	var colKey = strColumnKey.substr(1,3);
	
	// 컬럼key 저장 ex) 01A
	//document.frm.colKey.value = colKey;
	//alert(document.frm.colKey.value);
	// nRow 저장
	//document.frm.nRow.value = nRow;
	
	
	// DB에 Message를 저장하기 위해 필요한 값들
	cat_id = "PS";
	plant_id = GridObj.GetCellHiddenValue("C02", nRow);// 공장코드
	//seq = GridObj.GetCellHiddenValue("C37", nRow);// seq
	item_id = GridObj.GetCellValue("C08", nRow);//제품코드
	proc_id = GridObj.GetCellHiddenValue("C07", nRow);//작업장 코드
	
	if(document.frm.checked_weekly[0].checked == true){
		start_dates = document.frm.w0.value; // 주차 시작일
	}
	else if(document.frm.checked_weekly[1].checked == true){
		start_dates = document.frm.w1.value; // 주차 시작일
	}
	else if(document.frm.checked_weekly[2].checked == true){
		start_dates = document.frm.w2.value; // 주차 시작일
	}
	//alert(start_dates);
	prod_dates_seq = Number(colKey.substr(1,1))-1; // 해당 일자 seq
	
	if(strColumnKey.substr(3,1) == "A"){
		shift_type = 1;
	} // shift_type
	//alert(shift_type);	
	//ord_no = GridObj.GetCellValue("C13", nRow); 
	//ord_item_no = GridObj.GetCellValue("C14", nRow);
	user_id  = document.frm._user_id.value;
}

/*********************************************   기타 Function   **********************************************************/



// 병합 & 소계 적용
function setMergeSummary()
{
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetRowCount() == 0)
	{
		alert("먼저 조회하십시오.");
		return;
	}
		 
	GridObj.ClearSummaryBar();
	GridObj.ClearGroupMerge();
	
	GridObj.SetGroupMerge('C02,C03,C04,C05,C06,C07,C08,C09,C10');
	
	GridObj.AddSummaryBar('SUMMARY1', '소계', 'C07', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36,C38'); 
	GridObj.AddSummaryBar('SUMMARY2', '합계', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36,C38'); 
		
	GridObj.SetSummaryBarColor('SUMMARY1', '200|200|200', color01);
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '160|160|160');
		
	GridObj.SetSummaryBarFont('SUMMARY1', '돋움', '9', false, false, false, false);
	//GridObj.SetSummaryBarFont('SUMMARY2', '돋움', '10', true, false, false, false);
		
	//GridObj.MoveRow(0);
	
	mergeSum = true; // 작업장 구분선 적용 여부 체크
}


// 적용해제
function clearSummary()
{
	var GridObj = document.WiseGrid;

	if(GridObj.GetRowCount() == 0)
	{
		alert("먼저 조회하십시오.");
		return;
	}

	GridObj.ClearSummaryBar();
	GridObj.ClearGroupMerge();
	
	GridObj.SetGroupMerge('C02,C03,C04,C05,C06,C07,C08,C09,C10');
	GridObj.AddSummaryBar('SUMMARY2', '합계', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36,C38');
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '160|160|160');
	//GridObj.SetSummaryBarFont('SUMMARY2', '돋움', '10', true, false, false, false);
	
	//GridObj.MoveRow(0);
	
	mergeSum = false; // 작업장 구분선 적용 여부 해제
}

var totCnt = 0;
// 합계
function totalSum(strColumnKey, nRow){
	var maxCnt = document.frm.totCount.value;
	
	if(totCnt == maxCnt){// 합계를 10번 이상하면, 초기화
		document.frm.totalSum.value = "0";
		totCnt = 0;
		return;
	}
	
	var GridObj = document.WiseGrid;
	
	var sum = Number(document.frm.totalSum.value);
	
	var value = Number(GridObj.GetCellValue(strColumnKey, nRow));
	
	document.frm.totalSum.value = sum + value;
	
	totCnt++;
};


// 컬럼 축소 & 확장
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('C02')== 8){// true => 숨김 상태
		obj.value = "축소";
		// 숨김 모드 해제
		GridObj.SetColWidth("C02", 40);
		GridObj.SetColWidth("C04", 45);
		//GridObj.SetColWidth("C05", 80);
		GridObj.SetColWidth("C08", 80);
		GridObj.SetColWidth("C09", 40);
		GridObj.SetColWidth("C010", 40);
		//GridObj.SetColWidth("C011", 65);
		GridObj.SetColWidth("C012", 70);
		GridObj.SetColWidth("C013", 70);

		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		//GridObj.SetGroupMerge('C02,C03,C04,C05,C06,C07,C08,C09,C010');
		
		// 합계
		GridObj.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'D01A,D02A,D03A,D04A,D05A,D06A,D07A,TOT'); 
		GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
		
		
	}
	else{
		obj.value = "확대";
		//숨김모드
		GridObj.SetColWidth("C02", 8);
		GridObj.SetColWidth("C04", 8);
		//GridObj.SetColWidth("C05", 8);
		GridObj.SetColWidth("C08", 8);
		GridObj.SetColWidth("C09", 8);
		GridObj.SetColWidth("C010", 8);
		//GridObj.SetColWidth("C011", 8);
		GridObj.SetColWidth("C012", 8);
		GridObj.SetColWidth("C013", 8);
		
		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		//GridObj.SetGroupMerge('C02,C03,C04,C05,C06,C07,C08,C09,C010');
		
		// 합계
		GridObj.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'D01A,D02A,D03A,D04A,D05A,D06A,D07A,TOT'); 
		GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
	}
}

function getdatetime() {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if(month < 10)
		month = "0" + month;
		
	if(day < 10)
		day = "0" + day;

	document.frm.to_date.value = year + "" + month + "" + day;
}

function insertRow(nRow){
	var GridObj = document.WiseGrid;
	var rowCnt = GridObj.GetRowCount();
	
	//GridObj.SetCellValue("CRUD", nRow, "C");				
	//GridObj.SetCellValue("C02", nRow, GridObj.GetCellValue("C02", nRow)); //공장
	//GridObj.SetCellHiddenValue("C02", nRow, GridObj.GetCellHiddenValue("C02", nRow)); //공장코드
	//GridObj.SetCellValue("C03", nRow, GridObj.GetCellValue("C03", nRow)); //원가부문
	//GridObj.SetCellValue("C04", nRow, GridObj.GetCellValue("C04", nRow)); //인원정보 조
	//GridObj.SetCellValue("C05", nRow, GridObj.GetCellValue("C05", nRow)); //			주
	//GridObj.SetCellValue("C06", nRow, GridObj.GetCellValue("C06", nRow)); //			야
	//GridObj.SetCellValue("C07", nRow, GridObj.GetCellValue("C07", nRow)); //작업장
	//GridObj.SetComboSelectedHiddenValue("C07", nRow, GridObj.GetCellHiddenValue("C07", nRow)); //작업장
	//GridObj.SetCellHiddenValue("C07", nRow, GridObj.GetCellHiddenValue("C07", nRow)); //작업장 코드
	//GridObj.SetCellValue("C37", nRow, GridObj.GetCellValue("C37", nRow)); //버전
	//GridObj.SetCellHiddenValue("C37", nRow, GridObj.GetCellHiddenValue("C37", nRow)); //SEQ
	//GridObj.SetCellImage('ITEM_CODE', nRow, 0);
	//GridObj.SetCellActivation("ITEM_CODE", nRow, "edit");
	
	//GridObj.ClearComboList("C08");
	//plant_proc_prod_item_list
	
	
	var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // 공장 코드
	var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // 작업장 코드
	
	
	if(!GridObj.HasComboList("C08",'ITEMID' + plant_id + proc_id)){
		
		GridObj.AddComboList("C08",'ITEMID' + plant_id + proc_id);		//제품코드 콤보리스트KEY 생성
		GridObj.AddComboList("C09",'ITEMNAME' + plant_id + proc_id);	//제품명 콤보리스트KEY 생성
		GridObj.AddComboList("C10",'ITEMSPEC' + plant_id + proc_id);	//제품규격 콤보리스트KEY 생성
		GridObj.AddComboList("C11",'TOWOMAN' + plant_id + proc_id);		//TO여 콤보리스트KEY 생성
		GridObj.AddComboList("C12",'MTOMTS' + plant_id + proc_id);		//구분 콤보리스트KEY 생성
		
		
		var param = "plant_id!%!proc_id!%!item_type";
		var value = plant_id + "!%!" + proc_id + "!%!FERT" ;
		commonUtil.getSelQeury(param, value, "plant_proc_prod_item_list",{
				callback:function(arrList){
					for( i = 0 ;  i < arrList.length ; i++){
						// 해당 공장, 작업장에서 생산 가능한 제품 리스트를 콤보 리스트에 추가
						GridObj.AddComboListValue("C08", arrList[i][0],arrList[i][0], "ITEMID" + plant_id + proc_id);	//제품코드 콤보리스트 생성
						GridObj.AddComboListValue("C09", arrList[i][1],arrList[i][0], "ITEMNAME" + plant_id + proc_id);	//제품명 콤보리스트 생성
						GridObj.AddComboListValue("C10", arrList[i][2],arrList[i][0], "ITEMSPEC" + plant_id + proc_id);	//제품규격 콤보리스트 생성
						GridObj.AddComboListValue("C11", arrList[i][3],arrList[i][0], "TOWOMAN" + plant_id + proc_id);	//TO여 콤보리스트 생성
						GridObj.AddComboListValue("C12", arrList[i][4],arrList[i][0], "MTOMTS" + plant_id + proc_id);	//구분 콤보리스트 생성
					}
				}
			}
		);
	} 
					
	GridObj.SetComboSelectedHiddenValue("C08", nRow, 0, 'ITEMID' + plant_id + proc_id); 
	GridObj.SetComboSelectedHiddenValue("C09", nRow, 0, 'ITEMNAME' + plant_id + proc_id);
	GridObj.SetComboSelectedHiddenValue("C10", nRow, 0, 'ITEMSPEC' + plant_id + proc_id);
	GridObj.SetComboSelectedHiddenValue("C11", nRow, 0, 'TOWOMAN' + plant_id + proc_id);
	GridObj.SetComboSelectedHiddenValue("C12", nRow, 0, 'MTOMTS' + plant_id + proc_id);
	
}

// Event
// Mouse Over 
function handler1(strType, strColumnKey, nRow){ 
	//C15 - C35 컬럼
	// row 수 : WiseGrid.GetRowCount() 
//	var GridObj = document.WiseGrid;
//	var rowLeng = GridObj.GetRowCount();
//	if( nRow >= 0 && strColumnKey != "" && strColumnKey != null ){
//		var cellValue = GridObj.GetCellValue(strColumnKey,nRow);
//		if( strType == "cell" && strColumnKey > "C14" && strColumnKey < "C36" && nRow < rowLeng && cellValue != "" ){
//			var oPopup=window.createPopup(); 
//				
//			var oPopBody=oPopup.document.body;
//			oPopBody.style.backgroundColor='#ffffff';
//			oPopBody.style.fontSize = '10pt';
//			oPopBody.style.padding='2px';
//			oPopBody.style.border='solid 1 blue';
//			oPopBody.innerHTML=GridObj.GetCellValue(strColumnKey,nRow);
//			oPopup.show(250,150,80,20); // (x,y,w,h,obj)
//		}
//	}
};


// Context Menu 사용자 정의 Menu 선택시
function handler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	var GridObj = document.WiseGrid;
	var rowCnt = GridObj.GetRowCount();
		
	if( strMenuKey == "MENU_CELL" ){// CELL 클릭시 메뉴
		
		if( strMenuItemKey == "MENU01" ){		// ROW 추가
			
			if( rowCnt-1 == nRow ){ // 마자막 라인일 경우 
				GridObj.InsertRow(-1);
			}else{
				GridObj.InsertRow(nRow+1);
			}	
			var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // 공장 코드
			
			GridObj.SetCellValue("CRUD", nRow+1, "C");				
			GridObj.SetCellValue("C02", nRow+1, GridObj.GetCellValue("C02", nRow)); //공장
			GridObj.SetCellHiddenValue("C02", nRow+1, GridObj.GetCellHiddenValue("C02", nRow)); //공장코드
			GridObj.SetCellValue("C03", nRow+1, GridObj.GetCellValue("C03", nRow)); //원가부문
			GridObj.SetCellValue("C04", nRow+1, GridObj.GetCellValue("C04", nRow)); //인원정보 조
			GridObj.SetCellValue("C05", nRow+1, GridObj.GetCellValue("C05", nRow)); //			주
			GridObj.SetCellValue("C06", nRow+1, GridObj.GetCellValue("C06", nRow)); //			야
			//GridObj.SetCellValue("C07", nRow+1, GridObj.GetCellValue("C07", nRow)); //작업장
			
			//alert(GridObj.GetCellHiddenValue("C07", nRow)); 
			if( GridObj.HasComboList('C07','PROCLIST' + plant_id) ){ // default 외에 콤보리스트가 존재 할 경우
				GridObj.SetComboSelectedHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow), 'PROCLIST' + plant_id); //작업장
			}else{													// default 콤보리스트만 존재할 경우
				GridObj.SetComboSelectedHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow)); //작업장
			}
			//GridObj.SetCellHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow)); //작업장 코드
			//GridObj.SetCellValue("C37", nRow+1, GridObj.GetCellValue("C37", nRow)); //버전
			GridObj.SetCellHiddenValue("C37", nRow+1, GridObj.GetCellHiddenValue("C37", nRow)); //SEQ
			//GridObj.SetCellImage('ITEM_CODE', nRow+1, 0);
			//GridObj.SetCellActivation("ITEM_CODE", nRow+1, "edit");
			
			//GridObj.ClearComboList("C08");
			//plant_proc_prod_item_list
			
			
			
			var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // 작업장 코드
			
			
			if(!GridObj.HasComboList("C08",'ITEMID' + plant_id + proc_id)){
				
				GridObj.AddComboList("C08",'ITEMID' + plant_id + proc_id);		//제품코드 콤보리스트KEY 생성
				GridObj.AddComboList("C09",'ITEMNAME' + plant_id + proc_id);	//제품명 콤보리스트KEY 생성
				GridObj.AddComboList("C10",'ITEMSPEC' + plant_id + proc_id);	//제품규격 콤보리스트KEY 생성
				GridObj.AddComboList("C11",'TOWOMAN' + plant_id + proc_id);		//TO여 콤보리스트KEY 생성
				GridObj.AddComboList("C12",'MTOMTS' + plant_id + proc_id);		//구분 콤보리스트KEY 생성
				
				
				var param = "plant_id!%!proc_id!%!item_type";
				var value = plant_id + "!%!" + proc_id + "!%!FERT" ;
				commonUtil.getSelQeury(param, value, "plant_proc_prod_item_list",{
						callback:function(arrList){
							for( i = 0 ;  i < arrList.length ; i++){
								// 해당 공장, 작업장에서 생산 가능한 제품 리스트를 콤보 리스트에 추가
								GridObj.AddComboListValue("C08", arrList[i][0],arrList[i][0], "ITEMID" + plant_id + proc_id);	//제품코드 콤보리스트 생성
								GridObj.AddComboListValue("C09", arrList[i][1],arrList[i][0], "ITEMNAME" + plant_id + proc_id);	//제품명 콤보리스트 생성
								GridObj.AddComboListValue("C10", arrList[i][2],arrList[i][0], "ITEMSPEC" + plant_id + proc_id);	//제품규격 콤보리스트 생성
								GridObj.AddComboListValue("C11", arrList[i][3],arrList[i][0], "TOWOMAN" + plant_id + proc_id);	//TO여 콤보리스트 생성
								GridObj.AddComboListValue("C12", arrList[i][4],arrList[i][0], "MTOMTS" + plant_id + proc_id);	//구분 콤보리스트 생성
							}
						}
					}
				);
			} 
							
			GridObj.SetComboSelectedHiddenValue("C08", nRow+1, 0, 'ITEMID' + plant_id + proc_id); 
			GridObj.SetComboSelectedHiddenValue("C09", nRow+1, 0, 'ITEMNAME' + plant_id + proc_id);
			GridObj.SetComboSelectedHiddenValue("C10", nRow+1, 0, 'ITEMSPEC' + plant_id + proc_id);
			GridObj.SetComboSelectedHiddenValue("C11", nRow+1, 0, 'TOWOMAN' + plant_id + proc_id);
			GridObj.SetComboSelectedHiddenValue("C12", nRow+1, 0, 'MTOMTS' + plant_id + proc_id);
		}
		else if( strMenuItemKey == "MENU02" ){	// ROW 삭제
			//alert("Row 삭제");
			if(confirm("삭제 하시겠습니까?") == true){
				if(GridObj.GetCellValue("C01", nRow) == ""){
					GridObj.DeleteRow(nRow);
				}else{
					GridObj.DeleteRow(nRow);
					GridObj.SetRowHide(nRow, true); 
					//GridObj.DeleteRow(nRow, false); 
				}				
			} 
		}
		else if( strMenuItemKey == "MENU03" ){ // Enter 오른쪽 이동
			GridObj.strEnterNavigate = "nextcell";
		}
		else if( strMenuItemKey == "MENU04" ){ // Enter 아래 이동
			GridObj.strEnterNavigate = "belowcell";
		}
		else if( strMenuItemKey == "MENU05" ){ // 병합 & 소계 적용
			setMergeSummary();
		}
		else if( strMenuItemKey == "MENU06" ){ // 병합 & 소계 적용 해제
			clearSummary();
		}
		else if( strMenuItemKey == "MENU07" ){ // 설비 추가
			if( rowCnt-1 == nRow ){ // 마자막 라인일 경우 
				GridObj.InsertRow(-1);
			}else{
				GridObj.InsertRow(nRow+1);
			}
			
			GridObj.SetCellValue("CRUD", nRow+1, "C");				
			GridObj.SetCellValue("C02", nRow+1, GridObj.GetCellValue("C02", nRow)); //공장
			GridObj.SetCellHiddenValue("C02", nRow+1, GridObj.GetCellHiddenValue("C02", nRow)); //공장코드
			GridObj.SetCellValue("C03", nRow+1, GridObj.GetCellValue("C03", nRow)); //원가부문
			GridObj.SetCellValue("C04", nRow+1, GridObj.GetCellValue("C04", nRow)); //인원정보 조
			GridObj.SetCellValue("C05", nRow+1, GridObj.GetCellValue("C05", nRow)); //			주
			GridObj.SetCellValue("C06", nRow+1, GridObj.GetCellValue("C06", nRow)); //			야
			//GridObj.SetCellValue("C07", nRow+1, GridObj.GetCellValue("C07", nRow)); //작업장
			//GridObj.SetCellHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow)); //작업장 코드
			GridObj.SetCellValue("C37", nRow+1, GridObj.GetCellValue("C37", nRow)); //버전
			GridObj.SetCellHiddenValue("C37", nRow+1, GridObj.GetCellHiddenValue("C37", nRow)); //SEQ
			
			var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // 공장 코드
			//var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // 작업장 코드
			
			
			if(!GridObj.HasComboList("C07",'PROCLIST' + plant_id)){
				
				GridObj.AddComboList("C07",'PROCLIST' + plant_id);
				
//				GridObj.AddComboList("C08",'ITEMID' + plant_id + proc_id);		//제품코드 콤보리스트KEY 생성
//				GridObj.AddComboList("C09",'ITEMNAME' + plant_id + proc_id);	//제품명 콤보리스트KEY 생성
//				GridObj.AddComboList("C10",'ITEMSPEC' + plant_id + proc_id);	//제품규격 콤보리스트KEY 생성
//				GridObj.AddComboList("C11",'TOWOMAN' + plant_id + proc_id);		//TO여 콤보리스트KEY 생성
//				GridObj.AddComboList("C12",'MTOMTS' + plant_id + proc_id);		//구분 콤보리스트KEY 생성
				
				
				var param = "plant_id!%!item_type";
				var value = plant_id + "!%!FERT" ;
				commonUtil.getSelQeury(param, value, "plant_prod_proc_list",{
						callback:function(arrList){
							for( i = 0 ;  i < arrList.length ; i++){
								// 해당 공장, 작업장에서 생산 가능한 제품 리스트를 콤보 리스트에 추가
								GridObj.AddComboListValue("C07", arrList[i][0]+" "+arrList[i][1],arrList[i][0], 'PROCLIST' + plant_id);	//작업장 콤보리스트 생성
							}
						}
					}
				);
			} 
							
			GridObj.SetComboSelectedHiddenValue("C07", nRow+1, 0, 'PROCLIST' + plant_id); 
			
			GridObj.SetComboSelectedHiddenValue("C08", nRow+1, 0 ); 
			GridObj.SetComboSelectedHiddenValue("C09", nRow+1, 0);
			GridObj.SetComboSelectedHiddenValue("C10", nRow+1, 0);
			GridObj.SetComboSelectedHiddenValue("C11", nRow+1, 0);
			GridObj.SetComboSelectedHiddenValue("C12", nRow+1, 0);
			
			//insertRow(strMenuKey, strMenuItemKey, strColumnKey, nRow);

		}
		else {
			alert("존재 하지 않은 메뉴입니다.");
		}
		
	}
	
	// CAPA 시간 정보
//	if( strMenuKey == "MENU_CELL" && strMenuItemKey == "M01" && strColumnKey > "C14" && strColumnKey < "C36"){
//		
//		var param = "shift_qty!%!plant_id!%!proc_id!%!item_id";
//		var shift_qty = GridObj.GetCellValue(strColumnKey,nRow);
//		if( shift_qty == "" || shift_qty == null){
//			return;
//		}
//		var plant_id = GridObj.GetCellHiddenValue("C02",nRow);
//		var proc_id = GridObj.GetCellHiddenValue("C07",nRow);
//		var item_id = GridObj.GetCellValue("C08",nRow);
//		var value = shift_qty + "!%!" + plant_id + "!%!" + proc_id + "!%!" + item_id;
//		
//		// 물량의 시간 정보(capa)
//		commonUtil.getCodeList(param, value , "capa_info_qty_per_hour", { 
//			callback:function(arrList){
//				if( arrList.length > 0 && arrList[0] != null){	
//					alert(arrList[0]);
//					//obj.title = arrList[0];
//				}
//				else{
//					return;
//				}			
//			}
//		});
//	}
	
};

// change combo event
function changCombohandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	var GridObj = document.WiseGrid;
	if( strColumnKey != "C07" ){
		var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // 공장 코드
		var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // 작업장 코드
		var item_id = GridObj.GetComboText("C08", nNewIndex,'ITEMID' + plant_id + proc_id) 
		
		GridObj.SetComboSelectedIndex("C08", nRow, nNewIndex, 'ITEMID' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C09", nRow, nNewIndex, 'ITEMNAME' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C10", nRow, nNewIndex, 'ITEMSPEC' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C11", nRow, nNewIndex, 'TOWOMAN' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C12", nRow, nNewIndex, 'MTOMTS' + plant_id + proc_id); 
		
		GridObj.SetComboSelectedHiddenValue("C08", nRow, item_id, 'ITEMID' + plant_id + proc_id); 
		GridObj.SetComboSelectedHiddenValue("C09", nRow, item_id, 'ITEMNAME' + plant_id + proc_id);
		GridObj.SetComboSelectedHiddenValue("C10", nRow, item_id, 'ITEMSPEC' + plant_id + proc_id);
		GridObj.SetComboSelectedHiddenValue("C11", nRow, item_id, 'TOWOMAN' + plant_id + proc_id);
		GridObj.SetComboSelectedHiddenValue("C12", nRow, item_id, 'MTOMTS' + plant_id + proc_id);
	}
	else if(strColumnKey == "C07"){
		insertRow(nRow);
	}

};

var cnt = 0;
function clickBtnPlus(){
	
	var msgVer = Number(document.frm.msg_version.value);
	
	document.frm.msg_version.value = ++msgVer;

	setIn = setInterval(insertMsgVer, 50);
	
}




/************************************************************************************************************************************/
/************************************************************************************************************************************/
/*********************************   기존 Java Script   ******************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/

// version - seq 분리
//function setVersions( versions ) {
//	
//	var verArr = versions.split("!%!");
//	if( verArr.length == 2 ) {
//		document.frm.version.value = verArr[0].trim();
//		document.frm.seq.value = verArr[1].trim();
//	}
//	
//}

// 공장 & 버전 선택 
function selectPlantAndVersionPopUp() {
			
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=610, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_SELECT_PLANT_AND_VERSION_POPUP", pop_win_style); 
	newWin.focus();
};

// 변경전 값
//var oldQty;

// 변경전 값 저장
//function saveValues(obj){
//	
//	if(event.altKey) {//alt+click 이벤트 시 등록 popup 창 실행
//		altAndMouseLeftButtonClickfunc(obj);
//	}
//	
//	if(event.ctrlKey) {
//		capaInfoProcByHour(obj);
//	}
//	
//	oldQty = strToNum(obj.value); // 수량
//
//}

// 수량 변경시 합계 변경 및 수정 플래그 변경
//function changeShiftSelect(obj){
//	
//	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
//	
//	var qty = obj.value; //변경된 값
//	var itemTot = strToNum(obj.parentNode.parentNode.lastChild.childNodes(1).value); //제품별 합계
//	
//	var shiftName = obj.name; // input box name 
//	var shiftTot = strToNum(document.getElementById(shiftName + "_tot").innerHTML.replace("&nbsp;",""));// shift별 합계
//	var totTotal = strToNum(document.getElementById("divTotal_tot").innerHTML.replace("&nbsp;",""));// 합계의 총 합계
//	
//	var diff = qty - oldQty; // 차이
//	
//	itemTot = itemTot + diff; // 제품별 합계 변경
//	shiftTot = shiftTot + diff; // shift별 합계 변경
//	totTotal = totTotal + diff; // 총 합계 변경 
//	
//		
//	// 천단위 구분자
//	obj.value = numberFormat(qty);
//	
//	// 변경된 합계 입력
//	// 제품별 합계
//	obj.parentNode.parentNode.lastChild.childNodes(1).value = numberFormat(itemTot);
//	obj.parentNode.parentNode.lastChild.childNodes(0).innerHTML = numberFormat(itemTot) + "&nbsp;";
//	// shift별 합계
//	document.getElementById(shiftName + "_tot").innerHTML = numberFormat(shiftTot) + "&nbsp;";
//	// 합계의 총 합계
//	document.getElementById("divTotal_tot").innerHTML = numberFormat(totTotal) + "&nbsp;";
//	
//	//수정 플래그 체크
//	obj.nextSibling.value = "Y";
//	//alert(obj.nextSibling.value);
//	
//}

// 수정 POPUP(더블클릭)
//function doubleClickfunc( obj ) {
//	//alert(col);
//	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNew_popup&_moon_perpage=200&_moon_pagenumber=1";
//	
//	var idx = obj.parentNode.parentNode.rowIndex;
//	//alert(idx);
//	var version = document.frm.version[idx].value;
//	var plant_id = document.frm.plant_id[idx].value;
//	var proc_id = document.frm.proc_id[idx].value;
//	var item_id = document.frm.item_id[idx].value;
//	var prodDates = obj.parentNode.childNodes(2).value;
//	var shiftType = obj.parentNode.childNodes(3).value;	
//	var plant_version = document.frm.plant_version.value;
//	var ord_no = document.frm.ord_no[idx].value;
//	var cat_id = document.frm.cat_id.value;
//			
//	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&prod_dates=" + prodDates + "&shift_type=" + shiftType;
//	service_url += "&plant_version=" + plant_version + "&ord_no=" + ord_no + "&cat_id=" + cat_id;
//		
//	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1080, height=550, top=0, left=0";
//	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_POPUP", pop_win_style); 
//	newWin.focus();
//}

// 등록 POPUP(alt+마우스 왼쪽 버튼 클릭)
//function altAndMouseLeftButtonClickfunc( obj ) {
//	
//	var flag = "";
//	
//	if( obj.value != "" ) flag = "M";
//	
//	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNew_reg&_moon_perpage=200&_moon_pagenumber=1";
//	
//	var idx = obj.parentNode.parentNode.rowIndex;
//	//alert(idx);
//	var plant_id = document.frm.plant_id[idx].value;//공장 코드
//	var version = document.frm.version[idx].value;// 계획 버전
//	var seq = document.frm.seq[idx].value;// SEQ
//	var prod_dates = obj.parentNode.childNodes(2).value;// 생산일자
//	var shift_type = obj.parentNode.childNodes(3).value;// 조주야
//	var item_id = document.frm.item_id[idx].value;// 제품 코드
//	var proc_id = document.frm.proc_id[idx].value;// 작업장(포장단)
//	var plant_version = document.frm.plant_version.value;// 선택된 공장 코드와 계획 버전
//	var ord_no = document.frm.ord_no[idx].value;// 오더번호(수출)
//	var ord_item_no = document.frm.ord_item_no[idx].value;// 오더 항목 번호
//			
//	service_url += "&plant_id=" + plant_id + "&version=" + version + "&seq=" + seq + "&prod_dates=" + prod_dates;
//	service_url += "&shift_type=" + shift_type + "&item_id=" + item_id + "&proc_id=" + proc_id; 
//    service_url += "&plant_version=" + plant_version + "&date_form=YYYY MM/DD(DY)" + "&ord_no=" + ord_no + "&ord_item_no=" + ord_item_no;
//    service_url += "&flag=" + flag;
//     
//	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1130, height=300, top=0, left=0";
//	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_REG", pop_win_style); 
//	newWin.focus();
//}

// 등록
GoRegister = function(service) {
			
	var service_url = "service.do?_moon_service=" + service + "&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var version_list = document.frm.version_list.value;
	var plant_version = document.frm.plant_version.value;
	
	service_url += "&plant_list=" +plant_list + "&version_list=" + version_list + "&date_form=YYYY-MM-DD";
	service_url += "&plant_version=" + plant_version;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1280, height=300, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_ITEM_REG_POPUP", pop_win_style); 
	newWin.focus();
};

// 주차별 물량 검증 화면
function faSchQtyChkPopUp(){
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewFaSchQtyChk_popup&_moon_perpage=200&_moon_pagenumber=1";
		  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1015, height=250, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_FA_SCH_QTT_CHK_POPUP", pop_win_style); 
	newWin.focus();
}

function excelDownloadPopUp(){
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewExcelDown_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var checkedWeekly;
	if(document.frm.checked_weekly[0].checked){
		checkedWeekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checkedWeekly = document.frm.checked_weekly[1].value;
	}
	else{
		checkedWeekly = document.frm.checked_weekly[2].value;
	}
	var lineGgrp = document.frm.line_grp.value;
	var plantVersion = document.frm.plant_version.value;
	var domain = document.frm.domain.value;
	
	
	service_url += "&checked_weekly=" + checkedWeekly + "&line_grp=" + lineGgrp + "&plant_version=" + plantVersion;
	service_url += "&domain=" + domain;
		  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1015, height=250, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_EXCEL_DOWN_POPUP", pop_win_style); 
	newWin.focus();
}

// 검증
function faVsPsPopUp(){
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewFaVsPs_popup&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var plant_version = document.frm.plant_version.value;
	var checked_weekly;
	if(document.frm.checked_weekly[0].checked){
		checked_weekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checked_weekly = document.frm.checked_weekly[1].value;
	}
	else{
		checked_weekly = document.frm.checked_weekly[2].value;
	}
	
	service_url += "&plant_list=" +plant_list + "&plant_version=" + plant_version + "&checked_weekly=" + checked_weekly;
	  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=850, height=800, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_FA_VS_PS_POPUP", pop_win_style); 
	newWin.focus();

}

// 조회
//GoSearch = function(service) {
//	if( document.frm.plant_version.value == null || document.frm.plant_version.value == "" ){
//		alert("먼저 선택 버튼을 클릭하여 공장과 버전을 선택해야 합니다.");
//		return;
//	}
//	
//	if( document.frm.line_grp.value == "" || document.frm.line_grp_all.value == "Y" ){
//		var param = "plant_version";
//		var value = document.frm.plant_version.value;
//		commonUtil.getCodeList(param, value , "prod_line_grp_check", { 
//			callback:function(arrList){
//				if( arrList.length == 1 && arrList[0] != null){	
//					//alert(arrList[0]);
//					alert( "라인 그룹에서 " + arrList[0] + "이 존재하지 않습니다.\n조회 결과에서 " + arrList[0] + "이 표시 되지 않습니다.\n" + 
//							arrList[0] + "을 라인 그룹에 추가 하시기 바랍니다.(CODE_MST.CD_GRP = 'LINE_GRP')" );					
//				}
//				else if( arrList.length > 1){
//					var str = "";
//					for( i = 0 ; i < arrList.length ; i++ ){
//						if( i == 1) str += arrList[i];
//						else str += ", " + arrList[i];
//					}
//					alert( "라인 그룹에서 " + str + "이 존재하지 않습니다.\n조회 결과에서 " + str + "이 표시 되지 않습니다.\n" + 
//							str + "을 라인 그룹에 추가 하시기 바랍니다.(CODE_MST.CD_GRP = 'LINE_GRP')" );	
//				}
//			}
//		});
//	}
//	
//	// 조회시 WAITING 이미지 보여주기
//	viewWait();
//	document.frm._moon_service.value = service; 
//	//document.form1._moon_perpage.value = perpage; 
//	document.frm._moon_pagenumber.value = "1"; 
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//};

// 컬럼 숨김 기능
// 공장 : 75(tdPlant)
// 원가부문 : 70(tdTeam)
// 작업장 : 160(tdProc)
// 제품 코드 : 60(tdItemId)
// 제품 명 : 260(tdItemName)
// 규격 : 85(tdSpec)
// TO남 : 30(tdToMan)
// TO여 : 30(tdToWoman)
// 구분 : 20(tdOS)
// 오더번호 : 70(tdOrdNo)
// 오더항목번호 : 50(tdOrdItemNo)
// PO 조 : 35(tdShift1PO)
// PO 주 : 35(tdShift3PO)
// PO 야 : 35(tdShift5PO)
//function changeDisplay(obj){
//	
//	var tabLen = left_tbody.rows.length;	
//	
//	if( obj.width == 5 ){// 펼침
//		alert
//		var leftDisplayWidth = Number(leftDisplay.clientWidth);
//		var topLeftWidth = Number(topLeft.clientWidth);
//		
//		var tdWidth;
//		
//		if( obj.id == "tdPlant") tdWidth = 75;
//		else if( obj.id == "tdTeam" ) tdWidth = 70;
//		else if( obj.id == "tdProc" ) tdWidth = 160;
//		else if( obj.id == "tdItemId" ) tdWidth = 60;
//		else if( obj.id == "tdItemName" ) tdWidth = 260;
//		else if( obj.id == "tdSpec" ) tdWidth = 85;
//		else if( obj.id == "tdToMan" ) tdWidth = 30;
//		else if( obj.id == "tdToWoman" ) tdWidth = 30;
//		else if( obj.id == "tdOS" ) tdWidth = 20;
//		else if( obj.id == "tdOrdNo" ) tdWidth = 70;
//		else if( obj.id == "tdOrdItemNo" ) tdWidth = 50;
//		else if( obj.id == "tdShift1Po" ) tdWidth = 35;
//		else if( obj.id == "tdShift3Po" ) tdWidth = 35;
//		else if( obj.id == "tdShift5Po" ) tdWidth = 35;
//		
//		leftDisplay.style.width = leftDisplayWidth + tdWidth - 5;
//		topLeft.style.width = topLeftWidth + tdWidth - 5;
//		
//		var id = obj.id
//		var td = document.getElementsByName(id);
//		for( i = 0; i < (tabLen + 1); i++ ){
//			//tdPlant[i].style.display = "none";
//			td[i].width = tdWidth;
//		}
//		
//		if( obj.id == "tdPlant") document.frm.f01.value = "N";
//		else if( obj.id == "tdTeam" ) document.frm.f02.value = "N";
//		else if( obj.id == "tdProc" ) document.frm.f03.value = "N";
//		else if( obj.id == "tdItemId" ) document.frm.f04.value = "N";
//		else if( obj.id == "tdItemName" ) document.frm.f05.value = "N";
//		else if( obj.id == "tdSpec" ) document.frm.f06.value = "N";
//		else if( obj.id == "tdToWoman" ) document.frm.f07.value = "N";
//		else if( obj.id == "tdOS" ) document.frm.f08.value = "N";
//		else if( obj.id == "tdOrdNo" ) document.frm.f09.value = "N";
//		else if( obj.id == "tdOrdItemNo" ) document.frm.f10.value = "N";
//		else if( obj.id == "tdShift1Po" ) document.frm.f11.value = "N";
//		else if( obj.id == "tdShift3Po" ) document.frm.f12.value = "N";
//		else if( obj.id == "tdShift5Po" ) document.frm.f13.value = "N";
//		
//	}
//	else{ // 숨김
//		var tdWidth = Number(obj.width);
//		
//		var leftDisplayWidth = Number(leftDisplay.style.width.replace("px",""));
//		var topLeftWidth = Number(topLeft.style.width.replace("px",""));
//		
//		leftDisplay.style.width = leftDisplayWidth - tdWidth + 5;
//		topLeft.style.width = topLeftWidth - tdWidth + 5;
//		
//		var id = obj.id
//		var td = document.getElementsByName(id);
//		for( i = 0; i < (tabLen + 1); i++ ){
//			td[i].width = 5;
//		}
//		
//		if( obj.id == "tdPlant") document.frm.f01.value = "Y";
//		else if( obj.id == "tdTeam" ) document.frm.f02.value = "Y";
//		else if( obj.id == "tdProc" ) document.frm.f03.value = "Y";
//		else if( obj.id == "tdItemId" ) document.frm.f04.value = "Y";
//		else if( obj.id == "tdItemName" ) document.frm.f05.value = "Y";
//		else if( obj.id == "tdSpec" ) document.frm.f06.value = "Y";
//		else if( obj.id == "tdToWoman" ) document.frm.f07.value = "Y";
//		else if( obj.id == "tdOS" ) document.frm.f08.value = "Y";
//		else if( obj.id == "tdOrdNo" ) document.frm.f09.value = "Y";
//		else if( obj.id == "tdOrdItemNo" ) document.frm.f10.value = "Y";
//		else if( obj.id == "tdShift1Po" ) document.frm.f11.value = "Y";
//		else if( obj.id == "tdShift3Po" ) document.frm.f12.value = "Y";
//		else if( obj.id == "tdShift5Po" ) document.frm.f13.value = "Y";
//	}
//	
//	setHtmlGridAutoResize('112', '167');
//}

// 방향키 이동
//function moveFocus(obj){
//	
//	if(event.keyCode == 37){//left
//		if(obj.parentNode.previousSibling){
//			obj.parentNode.previousSibling.childNodes(0).focus();
//		}
//		else{
//			return;
//		}		
//	}
//	else if(event.keyCode == 38){// up
//		var cellIdx = Number(obj.parentNode.cellIndex);
//		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
//		
//		if(rowIdx == 0){
//			return
//		}
//		else{
//			main_tr[rowIdx-1].childNodes(cellIdx).childNodes(0).focus();
//		}
//	}
//	else if(event.keyCode == 39){// right
//		if(obj.parentNode.nextSibling){
//			obj.parentNode.nextSibling.childNodes(0).focus();
//		}
//		else{
//			return;
//		}
//	}
//	else if(event.keyCode == 40){// down
//		var cellIdx = Number(obj.parentNode.cellIndex);
//		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
//		
//		if(main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0)){
//			main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0).focus();
//		}
//		else{
//			return;
//		}
////		if(obj.parentNode.previousSibling.childNodes(0)){
////			obj.parentNode.previousSibling.childNodes(0).focus();
////		}
////		else{
////			return;
////		}
//	}
//		
//}

//function setFeildWidth(){
//	
//	if( document.frm.f01.value == "Y" ){
//		var obj = document.getElementById("tdPlant");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f02.value == "Y" ){
//		var obj = document.getElementById("tdTeam");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f03.value == "Y" ){
//		var obj = document.getElementById("tdProc");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f04.value == "Y" ){
//		var obj = document.getElementById("tdItemId");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f05.value == "Y" ){
//		var obj = document.getElementById("tdItemName");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f06.value == "Y" ){
//		var obj = document.getElementById("tdSpec");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f07.value == "Y" ){
//		var obj = document.getElementById("tdToWoman");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f08.value == "Y" ){
//		var obj = document.getElementById("tdOS");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f09.value == "Y" ){
//		var obj = document.getElementById("tdOrdNo");
//		changeDisplay(obj);
//	}
//	
//	if( document.frm.f10.value == "Y" ){
//		var obj = document.getElementById("tdOrdItemNo");
//		changeDisplay(obj);
//	}
//}

// 물량에 대한 시간 정보(capa)
//function capaInfoQtyPerHour(obj){
//	
//	if(obj.value == "") return;// 수량이 없으면 실행 안함.
//	if(obj.title != "" && obj.nextSibling.value == "N") return; // title 값이 있고, 수량이 변경 되지 않으면 실행 안함.
//	
//	var idx = obj.parentNode.parentNode.rowIndex;
//	var param = "shift_qty!%!plant_id!%!proc_id!%!item_id";
//	var value = obj.value + "!%!" + document.frm.plant_id[idx].value + "!%!"
//				+ document.frm.proc_id[idx].value + "!%!" + document.frm.item_id[idx].value;
//	
//	// 물량의 시간 정보(capa)
//	commonUtil.getCodeList(param, value , "capa_info_qty_per_hour", { 
//		callback:function(arrList){
//			if( arrList.length > 0 && arrList[0] != null){	
//				//alert(arrList[0]);
//				obj.title = arrList[0];
//			}
//			else{
//				return;
//			}			
//		}
//	});
//}

//function capaInfoProcByHour(obj){
//	
//	var tabLen = left_tbody.rows.length;
//	var idx = obj.parentNode.parentNode.rowIndex;
//	var col = obj.parentNode.cellIndex;
//	
//	if( tabLen < 2 ) return;
//	
//	var itemList = "";
//	var itemQtyList = "";
//	var plant_id = document.frm.plant_id[idx].value;
//	var proc_id = document.frm.proc_id[idx].value;
//	
//	for( i = 0 ; i < tabLen-1 ; i++ ){
//		if( document.frm.plant_id[i].value == plant_id && document.frm.proc_id[i].value == proc_id ){
//			var qty = main_tbody.childNodes(i).childNodes(col).childNodes(0).value.replace(",","");
//			
//			if(itemList.length < 1){
//				itemList += document.frm.item_id[i].value;				
//				//itemQtyList += document.frm.item_id[i].value + "','" + qty;
//				itemQtyList += "SELECT '" + document.frm.item_id[i].value + "' ITEM_ID, '" + qty + "' QTY FROM DUAL"; 
//			}
//			else{
//				itemList += "','" + document.frm.item_id[i].value;		
//				//itemQtyList += "','" + document.frm.item_id[i].value + "','" + qty;	
//				itemQtyList += " UNION ALL SELECT '" + document.frm.item_id[i].value + "' ITEM_ID, '" + qty + "' QTY FROM DUAL"; 
//			}			
//		}
//	}	
//	
//	var param = "plant_id!%!proc_id!%!item_list!%!item_qty_list";
//	var value = plant_id + "!%!" + proc_id + "!%!" + itemList + "!%!" + itemQtyList;
//	// 작업장별, shift별 물량의 시간 정보(capa)
//	commonUtil.getCodeList(param, value , "capa_info_proc_by_hour", { 
//		callback:function(arrList){
//			if( arrList.length > 0 && arrList[0] != null){	
//				alert("    " + arrList[0]);
//			}
//			else{
//				return;
//			}			
//		}
//	});
//	//alert(itemList);
//	//alert(itemQtyList);
//}

function excelDownload(){
	
	var service = "sc_11020_dailyProductionPlanAnalysisNew_list_excelDown";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var line_grp	= document.frm.line_grp.value;
	var domain		= document.frm.domain.value;
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&line_grp="+line_grp
								+"&domain="+domain;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function excelUpload(){
	
	var service = "sc_11020_dailyProductionPlanAnalysisNew_list_excelUp";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var line_grp	= document.frm.line_grp.value;
	var domain		= document.frm.domain.value;
	
	//if( document.frm.plant_list.value == "" ){
	//	alert("공장과 버전을 먼저 선택 해야 합니다.");
	//	return;
	//}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&line_grp="+line_grp
								+"&domain="+domain;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

// 변경 요인 전체 조회 팝업
function changeReasonAll(){
		
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	var paramString = "";
    paramString = "&palnVersion="  + document.frm.plant_version.value;
    
    
    var fileName = "productionPlanAnalysis_test_pop";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:900px; dialogHeight:500px ; dialogScrollbars=no");
    	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
//function bgOver( obj ) { 
//	
//	if( left_tbody.rows[obj.rowIndex] ) 
//	{ 
//		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
//		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
//		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
//		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
//	} 
//	else 
//	{ 
//		left_tbody.rows.style.backgroundColor = "#d0b8f1"; 
//		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
//		main_tbody.rows.style.backgroundColor = "#d0b8f1"; 
//		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
//	}
//	
//}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환

//function bgOut( obj ) {
//	
//	if( left_tbody.rows[obj.rowIndex] ) 
//	{ 
//		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
//		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
//		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
//		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
//	} 
//	else 
//	{ 
//		left_tbody.rows.style.backgroundColor = "#ffffff"; 
//		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
//		main_tbody.rows.style.backgroundColor = "#ffffff";
//		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
//	}
//	
//};

/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
    function setGridAutoResize( tab_h, table_h ){
    	
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
