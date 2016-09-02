//## 프로그램ID      : op_02090_Long_Term_Planning_semi_list.vm
//## 프로그램명      : 중장기 베이스 수급 계획
//## 개발자          : 이강욱
//## 개발일자        : 2015-07-28
//##
//## 관련 job file   : job_sinc_30_orderPlanning_03.xml
//## 관련 query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2015-07-28  이강욱      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'op_02090_Long_Term_Planning_semi_list';
var GridObj ; 													// WiseGrid 객체
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색


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
        
        
        document.WiseGrid2.height = tabHeightValue - document.WiseGrid.height+ "px";
        
    }  


/*┌─────────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 							│
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.			│
  └─────────────────────────────────────────────────────────────────────┘*/
function init() { 
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader(GridObj);  	//해더생성 
	setDefault();        	//화면 기본 설정 
}
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader2(GridObj2);  	//해더생성 
	setDefault2();        	//화면 기본 설정 
}   

function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader3(GridObj3);  	//해더생성 
	setDefault3();        	//화면 기본 설정 
} 
function init4() {
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader4(GridObj4);  	//해더생성 
	setDefault4();        	//화면 기본 설정 
}

   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	//GridObj.bUserContextMenu 	= true;					//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex	= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
    
   
   
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor	= '0|0|0';
    GridObj.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor		= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strHDClickAction		= "sortsingle";   	//자동 sort 기능
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu 사용자 MENU 추가 */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 추가");   
	
    
}
function setDefault2() { 	
 
	GridObj2.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines				= 2;        
    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor	= '0|0|0';
    GridObj2.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj2.strActiveRowBgColor	= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	//GridObj2.strHDClickAction		= "sortsingle";   	//자동 sort 기능
    

	
	GridObj2.nCellFontSize			= 9;					// Font Size 9
	//GridObj2.bStatusbarVisible		= true;				// status bar visible 상태바 설정 

}

function setDefault3() { 

	//GridObj.bUserContextMenu 	= true;					//사용자 컨텍스트 메뉴의 사용 여부를 결정한다. 
	GridObj3.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex	= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj3.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj3.nHDLines = 2;   
    
   
    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor	= '0|0|0';
    GridObj3.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj3.strActiveRowBgColor	= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj3.strHDClickAction		= "sortsingle";   	//자동 sort 기능
    
	// Cell Font Setting
	GridObj3.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu 사용자 MENU 추가 */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 추가");   
	
}   
function setDefault4() { 

	GridObj4.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj4.nHDLineSize			= 12; //Header Size
    //선택된 셀의 글자색 지정한다.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj4.strActiveRowBgColor	= "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj4.nCellFontSize			= 9;					// Font Size 9
	GridObj4.bStatusbarVisible		= true;				// status bar visible 상태바 설정
	GridObj4.strHDClickAction		= "sortsingle";
}
    
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) { 
		
	  	GridObj.AddHeader("ITEM_ID"				,"품목번호"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"			,"품목명"      		,"t_text" 		,100	,200 ,false); //0 
	 	GridObj.AddHeader("SPEC"				,"규격"      		,"t_text" 		,100	,100 ,false); //0 
	 	
	 	GridObj.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,80 ,true);  
	 	GridObj.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,80 ,true);  

	 	GridObj.AddGroup	("PROD_PLAN",   "생산계획");			
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_0");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_1");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_2");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_3");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_4");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_5");
	 	
	
		GridObj.BoundHeader();	
	
	    
	    GridObj.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj.SetColCellAlign('ITEM_NAME',  'left'); 
	    GridObj.SetColCellAlign('SPEC',   'left');
	
		GridObj.SetColFix('SPEC');
	
		//GridObj.SetColCellBgColor('SEL_DMD',		color_edit_col);//기준재고
	
	    GridObj.SetNumberFormat("PROD_0",			"#,##0");
	    GridObj.SetNumberFormat("PROD_1",			"#,##0");
	    GridObj.SetNumberFormat("PROD_2",			"#,##0");
	    GridObj.SetNumberFormat("PROD_3",			"#,##0");
	    GridObj.SetNumberFormat("PROD_4",			"#,##0");
	    GridObj.SetNumberFormat("PROD_5",			"#,##0");
	
	

}

function setHeader2(GridObj2) { 
		
		GridObj2.AddHeader("SELECTED"	,""   		,"t_checkbox"	,2			,30  ,true); //0
		GridObj2.AddHeader("ITEM_ID"	,"품목번호"  	,"t_text" 		,10			,80  ,false); //0   
	  	GridObj2.AddHeader("ITEM_NAME"	,"품목명"    	,"t_text" 		,100		,200  ,false); //0 
	  	GridObj2.AddHeader("IDX"		,"순서"      ,"t_number" 	,100.3		,0  ,false); //0    
	  	GridObj2.AddHeader("GUBN"		,"구분"      ,"t_text" 		,100		,60  ,false); //0
	  	
	  	GridObj2.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,70 ,true);  
	 	GridObj2.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,70 ,true);  

	  	GridObj2.AddHeader("MINMPSQTY"	,"MOQ"			,"t_number" ,100.3		,50  ,true); //0 
	  	GridObj2.AddHeader("NTGEW"		,"단위당KG"		,"t_number" ,100.3		,60  ,true); //0
	  	GridObj2.AddHeader("READ_TIME"	,"리드타임" 		,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("MEINS"		,"발주단위"      ,"t_text" 	,100		,0  ,false); //0 
	  	GridObj2.AddHeader("QTY"		,"요구량"			,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("IPGO_QTY"	,"PR량"			,"t_number" ,100.3		,60   ,true); //0 
	  	GridObj2.AddHeader("IPGO_DATE"	,"입고요청일" 	,"t_date"   ,100		,80  ,true); //0
	  	GridObj2.AddHeader("TEXT"		,"특이사항"      ,"t_text"   ,100		,120  ,true); //0
		GridObj2.AddHeader("PR_NO"		,"PR번호"     	,"t_text" 		,100	,70   ,true); //0   
 		GridObj2.AddHeader("IF_MSGS"	,"IF 메세지"     	,"t_text" 		,100	,100   ,true); //0    
 		GridObj2.AddHeader("BASE_STOCK"	,"재고량"     	,"t_number" 		,100.3	,70   ,true); //0    	    
		GridObj2.BoundHeader();	
	 	
	 	GridObj2.SetColCellAlign('ITEM_ID',		'center'); 
	    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
	    GridObj2.SetColCellAlign('GUBN',		'center');
	    GridObj2.SetColCellAlign('TEXT',		'left'); 
	    GridObj2.SetColCellAlign('MEINS',		'center'); 
	    GridObj2.SetColCellAlign('IPGO_DATE',	'center');	   
	    
	    GridObj2.SetNumberFormat("PROD_0",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_1",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_2",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_3",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_4",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_5",	"#,##0");
	    
	    GridObj2.SetDateFormat("IPGO_DATE",'yyyy-MM-dd');
	    
	    
	    GridObj2.SetNumberFormat("MINMPSQTY",	"###,###.##");
	    GridObj2.SetNumberFormat("QTY","###,###.##");
	    GridObj2.SetNumberFormat("IPGO_QTY",	"###,###.##");
	

}

function setHeader3(GridObj3) {     
	
			
	  	GridObj3.AddHeader("ITEM_ID"			,"품목번호"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj3.AddHeader("ITEM_NAME"			,"품목명"      		,"t_text" 		,100	,0 ,false); //0 
	 	
	 	
	 	GridObj3.AddHeader("MONTH_0"				,"M-3"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_1"				,"M-2"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_2"				,"M-1"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_3"				,"LM"      		,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_4"				,"LM+1"      	,"t_number" 	,100.3	,80 ,false);  
	 	GridObj3.AddHeader("MONTH_5"				,"LM+2"      	,"t_number" 	,100.3	,80 ,false);  
	 	
	 

	 	
	 	GridObj3.AddGroup	 ("SALES_MONTH", "판매실적");			
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_0");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_1");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_2");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_3");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_4");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_5");
	 	
	
		GridObj3.BoundHeader();	
	
	    
	    GridObj3.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj3.SetColCellAlign('ITEM_NAME',  'left'); 

	
	    GridObj3.SetNumberFormat("MONTH_0",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_1",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_2",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_3",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_4",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_5",			"#,##0");
		
 
}

function setHeader4(GridObj4) {        
       
  	GridObj4.AddHeader("ITEM_ID"		,"품목번호"  	,"t_text" 	,10		,60		,false); //0   
  	GridObj4.AddHeader("ITEM_NAME"		,"품목명"  	,"t_text" 	,100	,200	,false); //0 
  	GridObj4.AddHeader("DEMAND"			,"소요량"  	,"t_number" ,100.3	,78		,false); //0    
 	GridObj4.AddHeader("PROD_QTY"		,"매입량"		,"t_number" ,100.3	,68 	,false); //0   
 	GridObj4.AddHeader("USE_QTY"		,"이론사용량"	,"t_number" ,100.3	,68		,false); //0   

	GridObj4.BoundHeader();	
 
    GridObj4.SetColCellAlign('ITEM_ID',		'center'); 

    GridObj4.SetNumberFormat("PROD_QTY",	"###,###.##");
    GridObj4.SetNumberFormat("USE_QTY",		"###,###.##");
	GridObj4.SetNumberFormat("DEMAND",		"###,###.##");

}

/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	
		
};



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  

}




/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw1();
			doQuery2();
			doQuery3();
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doSave2();
    	
		
    }else{ // 삭제, 전송 상태일시 메인그리드 제조회   
    	
    }
    
	
}

function GridEndQuery2() {
	
	var endMode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(endMode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			
			
			GridSetMerge_dw2();
			GridCal_dw2();
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2"){
    
		alert("저장하였습니다");
		doQuery();
		doQuery2();
    }	
	
}

function GridEndQuery3(){
		
    var endMode		= GridObj3.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search3") //조회가 완료된 경우
    {
        if(GridObj3.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw3();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

function GridEndQuery4(){
		
    var endMode		= GridObj4.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search4") //조회가 완료된 경우
    {
        if(GridObj4.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw4();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

/*┌──────────────────────────────────┐
  │GRID2 계산식
  └──────────────────────────────────┘*/
function GridCal_dw2(){	
	
	var cur_stock;
	var req_qty;
	var ipgo_qty;
	var next_stock;	
	
	var rowcount = GridObj2.GetMergeCount('ITEM_ID');   //소계 인덱스 구하기
	
	
	
	for (var i=0; i < rowcount; i++){
		
		var start_hd_name	= 'PROD_0';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		for(var j =0; j < 5; j++){
			
			cur_stock 		= Math.round(GridObj2.GetCellValue(hd_name,idx),0);
			req_qty 		= Math.round(GridObj2.GetCellValue(hd_name,idx+1),0);
			ipgo_qty		= Math.round(GridObj2.GetCellValue(hd_name,idx+2),0);
			
			next_stock		= Math.round(Number(cur_stock),0) - Math.round(Number(req_qty),0) + Math.round(Number(ipgo_qty),0);
			
			hd_name_2 	= Number(hd_name_2)+Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj2.SetCellValue(hd_name, idx,  next_stock);
			
		}			
	}		
	
	
}


/*┌──────────────────────────────────┐
  │그리드의 원 클릭 이벤트
  └──────────────────────────────────┘*/
function GridCellClick(strColumnKey, nRow) {

}	



               
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
function GoSearch(service){
	
    doQuery();
	
}

/*┌──────────────────────────────────┐
  │하부 그리드 조회 DW2 더블클릭
  └──────────────────────────────────┘*/
function Grid2CellDblClick(strColumnKey, nRow){ 
	
	
	var item_id		= GridObj2.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj2.GetCellValue('ITEM_NAME',nRow)
	var version		= document.frm.version.value;
	var gubn		= 'wel';
	
	
	if(strColumnKey == 'ITEM_NAME' ){
		
		var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();		
	}else if(strColumnKey == 'GUBN' ){
		
		var service_url = "service.do?_moon_service=op_02090_Long_Term_Planning_list_mat_move_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn + "&version=" + version;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1095, height=280, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
	}
	
	
	
	document.frm.item_id.value = item_id;
	
	doQuery4();	
	
}   


/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery()  {
	
   SetHeader_grid1();		
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
   GridObj.SetParam("mode", 		 "search");
   GridObj.SetParam("version", 		  version);
   GridObj.SetParam("item_type",    item_type);
  
       
   GridObj.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │DW 2 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2() {
	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
	var item_type	= document.all.item_type.value;	
	
	if(item_type == "1") item_type = '3';
	if(item_type == "2") item_type = '4';
	

	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("version", 		  version);
	GridObj2.SetParam("item_type",    item_type);

	GridObj2.DoQuery(servlet_url);
}
  
/*┌──────────────────────────────────┐
  │DW 3 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery3()  {
	
   SetHeader_grid3();	
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
   GridObj3.SetParam("mode", 		 "search3");
   GridObj3.SetParam("version", 	 version);
   GridObj3.SetParam("item_type",    item_type);
  
       
   GridObj3.DoQuery(servlet_url);
}

function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var version		= document.all.version.value;	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	
	
	GridObj4.SetParam("mode",		  "search4");
	GridObj4.SetParam("item_id",  		item_id);
	GridObj4.SetParam("from_mm",  	   from_mm);
	GridObj4.SetParam("to_mm",			 to_mm);
	GridObj4.SetParam("version", 		version);


	GridObj4.DoQuery(servlet_url);
}

// 셀 저장 전역변수
var objTdG;



// popup 조회 이미지 mouseOver
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 조회 이미지 mouseOut
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}



//--------------------------------------   main_template 에 정의된 Event ---------------------------------------------------//
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/

// 저장
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode		= "save";
	doSave();	
};

// 저장
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version",						version);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

function doSave2() {
 
	var GridObj2	= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.all.version.value;
	var Rows 		= new Array();
	var rowcount 	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');

		for(var i =0; i < mergecount ; i++){
	
		var idx		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		
		var idx_2	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		var txt		= GridObj2.GetCellValue('TEXT',idx_2);
		var req		= GridObj2.GetCellValue('QTY',idx_2);
		var pr_qty	= GridObj2.GetCellValue('IPGO_QTY',idx_2);
		var ipgo_date = GridObj2.GetCellValue('IPGO_DATE',idx_2);
		var base_stock	= GridObj2.GetCellValue('PROD_0',idx_2);		
		
		GridObj2.SetCellValue("TEXT",idx,txt);		
		GridObj2.SetCellValue("QTY",idx,req);
		GridObj2.SetCellValue("IPGO_QTY",idx,pr_qty);
		GridObj2.SetCellValue("IPGO_DATE",idx,ipgo_date);
		GridObj2.SetCellValue("BASE_STOCK",idx,base_stock);
		
			

	}
	
	for(var i =0; i < mergecount ; i++){
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		GridObj2.SetCellValue("SELECTED",idx,1);		

	}
	
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode",						 "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",					 version);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	//GridObj2.DoQuery(servlet_url, Rows);		cab 파일 버전 불일치로 사용금
	
	GridObj2.DoQuery(servlet_url, "SELECTED");
 
}





function GoIf(){

	if(confirm("선택 하신 품목의 ERP 전송을 확정하시겠습니까?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj2		= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
	 
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode",						 "doIf");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",						version);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url, "SELECTED");

	
}



function doChange2(obj){
	
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_Semi_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			
			in_div +=	"<option value="+arrList[i][0];
		
			
			// 저장시 combo-list가 refresh되면서 저장했던 품목을 다시 선택하도록 한다.
			if(document.frm.version.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][0]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
		}	

		divVersionCombo.innerHTML = in_div;
		

	}
	});
}

function Grid2ChangeCell(strColumnKey, nRow,nOldValue,nNewValue){
	
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');	
	var version		= document.frm.version.value;
	for (var i=0; i<mergecount; i++){
		
		var idx	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group의 첫번째 row index	
		if(nRow == idx || nRow == idx +1 || nRow == idx+2){
			if(strColumnKey == "QTY"){
				
				var minqty 		= GridObj2.GetCellValue('NTGEW',nRow);
				var cur_date 	= GridObj2.GetCellValue('IPGO_DATE',nRow);
				var read_time	= GridObj2.GetCellValue('READ_TIME',nRow);
				commonUtil.getSelQeury( "version!%!read_time", version +"!%!" + read_time, "op_02090_get_ipgo_date",{
				callback:function(result){
				
				
						GridObj2.SetCellValue('IPGO_DATE',nRow,result);
					}
					
				});	
				
		
				GridObj2.SetCellValue('IPGO_QTY',nRow,minqty *nNewValue );
			}
			
		}	
		
	}
	
	GridCal_dw2();
	
}



function GridSetMerge_dw1(){
	
	
	GridObj.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'PROD_0,PROD_1,PROD_2,PROD_3,PROD_4,PROD_5'); 
	GridObj.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
 	   
}

function GridSetMerge_dw2(){	
	
	GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
	var rowcount	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');		
	var bgidx		= 0 ;
	
	for (var i=0; i < mergecount; i++){
		
		var idx_start	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group의 첫번째 row index
		var idx_end		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);   //merge group의 마지막 row index
		var gap			= idx_end - idx_start;
		//GridObj2.SetRowBgColor(idx_start,'178|235|244');
		
		if(bgidx == '1') {
			for(j=idx_start; j < idx_end+1; j++){
			
				GridObj2.SetRowBgColor(j,'255|253|208');
			}
			
			bgidx = 0 ;
			
		}else		bgidx = 1;
		
		
		//재고량,소요량,입고량 세 row가 다 없을 수도 있기 떄문에 재고량 row를 제외하고는 편집불가로 설정해준다.
//		if(gap == '2') {
//			
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//			GridObj2.SetCellActivation('QTY',idx_start+2,'activatenoedit');
//		}else{
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//		}
	
	}
	
}

function GridSetMerge_dw3(){
	

	GridObj3.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'MONTH_0,MONTH_1,MONTH_2,MONTH_3,MONTH_4,MONTH_5'); 
	GridObj3.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
	

 	   
}

function GridSetMerge_dw4(){
	
	
	GridObj4.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'PROD_QTY,USE_QTY'); 
	GridObj4.SetSummaryBarColor('SUMMARY','0|153|0', color_tot);  
	

 	   
}

function SetHeader_grid1(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'PROD_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw1_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj.SetColHDText(hd_text_name,result[i][0]);
			GridObj2.SetColHDText(hd_text_name,result[i][0]);
			
		}
			 
		}
	}); 	

}

function SetHeader_grid3(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'MONTH_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw3_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj3.SetColHDText(hd_text_name,result[i][0]);
		
			
		}
			 
		}
	}); 	

}


function doChange_mm(obj){
	
	var from_mm 	= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // 이전달
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2) - Number(1);
		
			// 해가 넘어간다면...
			if(from_mm_2 == 0){
				from_mm_1 = Number(from_mm_1) - Number(1);
				from_mm_2 = 12;
			}else{
				
			}
			if(to_mm_2 == 0){
				to_mm_1 = Number(to_mm_1) - Number(1);
				to_mm_2 = 12;
			}else{
				
			}
		
		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}else{ //다음달
		from_mm_2	= Number(from_mm_2) + Number(1);
		to_mm_2		= Number(to_mm_2) + Number(1);

			// 해가 넘어간다면...
			if(from_mm_2 == 13){
				from_mm_1 = Number(from_mm_1) + Number(1);
				from_mm_2 = 1;
			}else{
				
			}
			if(to_mm_2 == 13){
				to_mm_1 = Number(to_mm_1) + Number(1);
				to_mm_2 = 1;
			}else{
				
			}


		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}
	
	document.all.from_mm.value = from_mm; 
	document.all.to_mm.value = to_mm; 
	
	
}

function CreateVersion(){
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode",						 "trans");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url);
}
	