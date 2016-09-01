//## 프로그램ID		: op_02060_com_roh_cnfm_list.js
//## 프로그램명		: 계열사 발주예고량 조회 
//## 개발자			: 우종균
//## 개발일자			: 2013-07-08s
//##
//## 관련 job file	: job_sinc_30_orderPlanning_03.xml
//## 관련 query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-08  우종균      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'op_02060_com_roh_cnfm_list';
var GridObj ; 													// WiseGrid 객체

var GridObj3;
var GridObj4;
var GridObj7;

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색

var rFirst = 0;							// 저장, 합차 등의 작업후 화면 위치를 유지하기 위한 Row Index 저장 변수
var rEnd = 0;

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

function init7() {
	GridObj7 = document.WiseGrid7;
	setProperty(GridObj7);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader7(GridObj7);  	//해더생성 
	setDefault7();        	//화면 기본 설정 
}


   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	GridObj.bRowSelectorVisible		= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj.nHDLineSize				= 10;					//Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines				= 2;   
    
   
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor		= "170|170|170";		//선택된 행의 배경색상을 설정한다.

     GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 8.5;					// Font Size 9
    
}


function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj3.nHDLineSize			= 13;					//Header Size
    
    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.	
	GridObj3.nCellFontSize			= 8.5;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible 상태바 설정 
    GridObj3.nHDLines				= 2;

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj4.nHDLineSize			= 12;					//Header Size
        
    //선택된 셀의 글자색 지정한다.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	
	GridObj4.nCellFontSize			= 8.5;					// Font Size 9
}

function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        			//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj7.bRowSelectorIndex		= true;						//Row Selector 영역에 Row Index를 보여준다.
    GridObj7.nHDLineSize			= 12;						//Header Size
    
    //선택된 셀의 글자색 지정한다.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        			//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj7.strActiveRowBgColor	= "170|170|170";    		//선택된 행의 배경색상을 설정한다.
	GridObj7.nCellFontSize			= 8.5;							// Font Size 9
	GridObj7.bStatusbarVisible		= true;						// status bar visible 상태바 설정
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60		,false);		 
	GridObj.AddHeader("ITEM_ID"				,"농심 품목번호"      	,"t_text" 		,20		,90		,false); //0   
	GridObj.AddHeader("COM_MATR_CODE"		,"당사 품목번호"      	,"t_text" 		,20		,90		,false); //0
 	GridObj.AddHeader("ITEM_NAME"			,"품목명"      		,"t_text" 		,100	,240	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"기본\n단위"     	,"t_text" 		,100	,40		,false); //0  	
 	GridObj.AddHeader("STOCK"				,"농심"      		,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("COM_STOCK"			,"업체"   			,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("CNFM_STOCK"			,"기준"     			,"t_number" 	,100.3	,80		,false); //0 당주 기준재고
 	GridObj.AddHeader("SUB_TOT"				,"소계"     			,"t_number" 	,100.3	,80		,false); //0 	
	GridObj.AddHeader("ODER_QTY"			,"금주 소요량"     	,"t_number" 	,100.3	,80		,false); //0
	GridObj.AddHeader("W1_STOCK"			,"차주초 재고"     	,"t_number" 	,100.3	,80		,false); //0  	
 	GridObj.AddHeader("FC_QTY"				,"발주 예고량"     	,"t_number"		,100.3	,80		,false); //0 	
 	GridObj.AddHeader("MSG"					,"비고"				,"t_text" 		,100	,120	,false); //0   저장을 위함


	/* 이중 해더 추가 */
	GridObj.AddGroup("HD1",				   "현재고량");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("HD1", 			"STOCK");
	GridObj.AppendHeader("HD1", 		"COM_STOCK");
	GridObj.AppendHeader("HD1", 	   "CNFM_STOCK");
	GridObj.AppendHeader("HD1",			  "SUB_TOT");

	GridObj.BoundHeader();
     
    GridObj.SetColCellAlign('ITEM_ID',			'center'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',	'center');
    GridObj.SetColCellAlign('ITEM_NAME',	  	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',			'center');
    
    GridObj.SetColCellAlign('STOCK',		 'right');
    GridObj.SetColCellAlign('COM_STOCK',	 'right');
    GridObj.SetColCellAlign('CNFM_STOCK',	 'right');	//당주 기준재고
	GridObj.SetColCellAlign('SUB_TOT',		 'right');     
     
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//발주예고량
	GridObj.SetColCellAlign('MSG',		 	  'left');	//2013-09-09 추가
    
	GridObj.SetColFix('ITEM_NAME');

    GridObj.SetNumberFormat("STOCK", 				"###,###,##0");
    GridObj.SetNumberFormat("COM_STOCK", 			"###,###,##0");
    GridObj.SetNumberFormat("CNFM_STOCK", 			"###,###,##0");	//당주 기준재고
    GridObj.SetNumberFormat("SUB_TOT", 				"###,###,##0");
    GridObj.SetNumberFormat("W1_STOCK", 			"###,###,##0");

    GridObj.SetNumberFormat("ODER_QTY", 			"###,###,##0");
    GridObj.SetNumberFormat("FC_QTY", 				"###,###,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	GridObj.SetColHide("CRUD",true);	

}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

function setHeader3(GridObj3) {        

  	GridObj3.AddHeader("COM_MATR_CODE"	,"자재코드"      	,"t_text" 		,40			,80		,false); //0
  	GridObj3.AddHeader("COM_MATR_NAME"	,"자재명"      	,"t_text" 		,40			,140	,false); //0
  	   
  	GridObj3.AddHeader("UNIT"			,"단위"       	,"t_text" 		,100		,60  	,false); //0   
  	GridObj3.AddHeader("PRE_STOCK"		,"기준재고"      	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_FC_QTY"		,"발주예고"       ,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_IPGO"		,"입고"      	,"t_number" 	,100.3		,80  	,false); //0    
  	GridObj3.AddHeader("NOW_EXPT"		,"금주예상"		,"t_number" 	,100.3		,80  	,false); //0   화면 감춤
  	GridObj3.AddHeader("SIL_STOCK"		,"실재고"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("DIFF_QTY"		,"예실차"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("CNFM_STOCK"		,"확정재고" 		,"t_number" 	,100.3		,80  	,false); //0   
	 	    
	
	/* 이중 해더 추가 */
	GridObj3.AddGroup("HD1"	,"전주");			//그리드에 그룹을 등록한다. 
	GridObj3.AppendHeader("HD1",   "PRE_STOCK");
	GridObj3.AppendHeader("HD1",  "PRE_FC_QTY");
	GridObj3.AppendHeader("HD1", 	"PRE_IPGO");
	
	GridObj3.BoundHeader();	
    
    GridObj3.SetColCellAlign('COM_MATR_CODE',	'center'); 
    GridObj3.SetColCellAlign('COM_MATR_NAME',	  'left'); 
	GridObj3.SetColCellAlign('UNIT',			'center');
    GridObj3.SetColCellAlign('PRE_STOCK',		 'right'); 
    GridObj3.SetColCellAlign('PRE_FC_QTY',		 'right'); 
    GridObj3.SetColCellAlign('PRE_IPGO',		 'right'); 
    GridObj3.SetColCellAlign('NOW_EXPT',		 'right'); 
    GridObj3.SetColCellAlign('SIL_STOCK',		 'right');
    GridObj3.SetColCellAlign('DIFF_QTY',		 'right'); 
    GridObj3.SetColCellAlign('CNFM_STOCK',		 'right');    
    
    GridObj3.SetNumberFormat("PRE_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_FC_QTY", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_IPGO",	"#,##0");
    GridObj3.SetNumberFormat("NOW_EXPT",	"#,##0");
    
	GridObj3.SetNumberFormat("SIL_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("DIFF_QTY",	"#,##0");
    GridObj3.SetNumberFormat("CNFM_STOCK",	"#,##0");    

}   

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	
	if(week_flag =="M"){ //월간
	  	GridObj4.AddHeader("GUBN"		,"월간 실적"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"품목번호"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"자재명"   			,"t_text" 	,100	,60 	,false); //0	
	}else {//W 주간 
  		GridObj4.AddHeader("GUBN"		,"주간 실적"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"품목번호"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"자재명"   			,"t_text" 	,100	,60 	,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //월간
	
		var header_id = "op_02060_com_roh_cnfm_list_dw4_monthly_header";	
		
	}else {//W 주간 
			
			var header_id = "op_02060_com_roh_cnfm_list_dw4_weekly_header";	
			
		}	
	
	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){
			
			for(var i=0 ; i < 9 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
		    
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
			if(week_flag =="M"){ //월간
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}else {//W 주간 
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}	

			
			
			GridObj4.SetNumberFormat("MM_0_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_1_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_2_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_3_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_4_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_5_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_6_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_7_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_8_QTY"  , "#,##0");
			
			doQuery4();  
				
		}
			
	});
			 
}


function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("EVEN_DATE"	,"행사일자"  	,"t_text" 		,20		,70   ,false); //0
  	GridObj7.AddHeader("PROD_CODE"	,"품목코드"  	,"t_text" 		,10		,30    ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"	,"품목명"  	,"t_text" 		,100	,90   ,false); //0   
  	GridObj7.AddHeader("E_QTY"		,"이마트"  	,"t_number" 	,100.3	,60   ,false); //0   
  	GridObj7.AddHeader("H_QTY"		,"홈플러스"  	,"t_number" 	,100.3	,60   ,false); //0   
 	GridObj7.AddHeader("L_QTY"		,"롯데마트"	,"t_number" 	,100.3	,60   ,false); //0    	   

	GridObj7.BoundHeader();	
    
    GridObj7.SetColCellAlign('EVEN_DATE',	'center');
    GridObj7.SetColCellAlign('PROD_CODE',	  'left');
    GridObj7.SetColCellAlign('ITEM_NAME',	  'right');

	GridObj7.SetColCellAlign('E_QTY',		 'right');
    GridObj7.SetColCellAlign('H_QTY',		 'right');
    GridObj7.SetColCellAlign('L_QTY',		 'right');

    GridObj7.SetNumberFormat("E_QTY",	"#,##0");
    GridObj7.SetNumberFormat("H_QTY", 	"#,##0");
	GridObj7.SetNumberFormat("L_QTY",	"#,##0");

}

	// 컬럼 고정

function setGrid(){	
	GridObj.SetColFix('ITEM_NAME');
}

  
/*┌──────────────────────────────────┐
  │WiseGrid Row Scroll Event
  └──────────────────────────────────┘*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}  
  
function GridEndQuery(){
	
    var mode		= GridObj.GetParam("mode");
    var error_msg	= '';    
      
    if(mode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {   		
        
        }
         else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}

    } 
}



function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';

	
		          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") {						        	               

		}
		
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}else{
		
		doQuery();
	}
	
	
} 

function GridEndQuery4() {
	
	var mode		= GridObj4.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search4") {
		if(GridObj4.GetStatus() == "true") {                           
		}
		else { 
			error_msg = GridObj4.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	}


function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
		          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  //GridObj7.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum','E_QTY,H_QTY,L_QTY');
		  //GridObj7.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
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
   function GoSearch(service) 
   {

    var cnfm_date		= document.frm.cnfm_date.value;
    
    doQuery();
	
	GridObj3.ClearGrid(); 
	setHeader3(GridObj3);	
	
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);	

	GridObj7.ClearGrid(); 
	setHeader7(GridObj7);	

	
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){     
	
	if( strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
		
		var item_id			= GridObj.GetCellValue("ITEM_ID", 			nRow);		
		var	item_name		= GridObj.GetCellValue("ITEM_NAME", 		nRow);
		var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 	nRow);		
		
		var service_url = "service.do?_moon_service=op_02050_even_item_list_dw7";
		
		service_url += "&item_id=" + item_id +"&com_matr_code=" + com_matr_code + "&item_name=" + item_name;
		
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
		
		return;		
	}

	
	document.all.week_flag.value	= 'M'
	
    
    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", 				nRow);
    var sel_com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 		nRow);        
    var sel_item_name		= GridObj.GetCellValue("ITEM_NAME", 			nRow);	

	// doQuery3 은 다이나믹 해더 때문에 DW5 번 종료후 실행
	
	doQuery3(nRow);	//실행 정지
	
	doQuery4(nRow);		
	
	doQuery7(nRow);	//실행 정지 
	
}        
   
/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;       
       
       var cnfm_date	= document.frm.cnfm_date.value;
       var mfs_flag		= document.frm.mfs_flag.value;       
       //var com_code		= document.frm.com_code.value;
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",						"search");       
       GridObj.SetParam("cnfm_date",				cnfm_date);
       GridObj.SetParam("mfs_flag",					mfs_flag);
       //GridObj.SetParam("com_code",					com_code);
       
       GridObj.SetParam("user_id", document.frm._user_id.value);       
       GridObj.DoQuery(servlet_url);
   }



function doQuery3(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE",	nRow);	
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	
	GridObj3.SetParam("mode", 	"search3");	
	GridObj3.SetParam("cnfm_date",  		cnfm_date);
	GridObj3.SetParam("com_matr_code",  com_matr_code);
	GridObj3.DoQuery(servlet_url);
}



/*┌──────────────────────────────────┐
  │DW 4 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var nRow		= GridObj.GetActiveRowIndex( );
	if (nRow < 0) return; 
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;	
	var week_flag	= document.all.week_flag.value;
	
	
	
	if(week_flag =="M"){ //월간
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_monthly");	
		
	}else{//W 주간 
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_weekly");	
	}	
	
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj4.SetParam("itype", 	   		itype);
	GridObj4.SetParam("mode",  		"search4");
	GridObj4.SetParam("item_id", 	  item_id);
	GridObj4.SetParam("week_flag", 	week_flag);
	GridObj4.DoQuery(servlet_url);
}





/*┌──────────────────────────────────┐
  │DW 5 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
/*function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj5.SetParam("itype", 		itype);
	GridObj5.SetParam("mode",	"search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.DoQuery(servlet_url);
}



/*┌──────────────────────────────────┐
  │DW 7 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery7(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cons_item_id	= GridObj.GetCellValue("ITEM_ID", 		nRow);
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	
	GridObj7.SetParam("mode", 		 		"search7");
	GridObj7.SetParam("cons_item_id",	 cons_item_id);
	GridObj7.SetParam("cnfm_date",	 		cnfm_date);
	
	GridObj7.DoQuery(servlet_url);
}

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	//setEditMode( objTdG );
	
}


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




function DW4_DblClick(strColumnKey, nRow){
	
	yyyy_mm 		= GridObj4.getColHDText(strColumnKey);	

	var week_flag	= document.all.week_flag.value;


	if(yyyy_mm == "월간 실적" ||yyyy_mm == "주간 실적"){  // DW 4의 첫칸의 제품코드 선택시 week_flag 설정 변경으로 주간/월간 실적  조회
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
		}else{			
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
		}
		
	} else{
		if(week_flag == 'M'){
		}else{
			alert("자재 사용내역을 주간으로 변경하고 조회해주십시요.");
			return;
		}
	}
	
}



function DW5_DblClick(strColumnKey, nRow){
	
	var yyyy_mm = GridObj5.GetCellValue("YYYY_MM", nRow);

	if(yyyy_mm == null || yyyy_mm == ""){
		return;
		
	} else{
		document.all.from_mm.value	= yyyy_mm;
		document.all.to_mm.value	= yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // 이전달
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2)	- Number(1);
		
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

//--------------------------------------   main_template 에 정의된 Event ---------------------------------------------------//
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {	

	var cnfm_stock		= GridObj3.GetCellValue("CNFM_STOCK", 		nRow)
	
	if(strColumnKey == "CNFM_STOCK"){
		doSave2();
		
	}
		else{
			}

}




// 해당 플레그에대한 선택값 할당
/*function doCheckFlag(obj){
	// sale_plan_flag - 판매계획 0 이어도 조회
	if(obj.name == "serch_flag_chk" ){ 
		if(obj.checked){
				document.frm.serch_flag.value = "Y";
		}
		else{
				document.frm.serch_flag.value = "N";
		}
	}
	var serch_flag = document.frm.serch_flag.value;
	
	doQuery7(nRow);
}*/


function doChange3(obj){

	
}


var flag = "N";

var timer;



function test(){  
  if(flag == "Y"){
   try{     
     test2();      

     clearInterval(timer);
   }
   catch(e){

     timer();

   }
  }
 }

function HeaderClick_DW2(strColumnKey){ /* HeaderClick_DW2 */


	var item_id		= document.all.sel_item_id.value;
	var	item_name	= document.all.sel_item_name.value;
	
	if(item_id == null||item_id == ''){
		alert("품목을 선택후 다시 조회 하시기 바랍니다");
		return;
	}			
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 

