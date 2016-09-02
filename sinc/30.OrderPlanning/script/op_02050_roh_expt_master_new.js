//## 프로그램ID		: op_02050_roh_expt_master_new.js
//## 프로그램명		: 발주예시 구매전용
//## 개발자			: 이강욱
//## 개발일자			: 2015-12-16
//##
//## 관련 job file	: job_sinc_30_orderPlanning_03.xml
//## 관련 query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-01-10  우종균      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'op_02050_roh_expt_master_new';
var GridObj ; 													// WiseGrid 객체

var GridObj3;
var GridObj4;


var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색

var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

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

function init5() {
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader5(GridObj5);  	//해더생성 
	setDefault5();        	//화면 기본 설정 
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
	
		//GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.
	//GridObj.bHDMoving = true;		// 컬럼 헤더 위치 이동

    GridObj.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
    
    
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor		= "232|245|213";		//선택된 행의 배경색상을 설정한다.
	GridObj.strHDClickAction		= "sortsingle";   
    
   
 

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
	

	    
}

function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj3.nHDLineSize			= 13;					//Header Size
    
    //선택된 셀의 글자색 지정한다.
    GridObj3.strActiveRowBgColor		= "232|245|213";		//선택된 행의 배경색상을 설정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj3.nCellFontSize			= 9;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible 상태바 설정 
    GridObj3.nHDLines				= 2;

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj4.nHDLineSize			= 12;					//Header Size 
    GridObj4.strActiveRowBgColor		= "232|245|213";		//선택된 행의 배경색상을 설정한다.
    //선택된 셀의 글자색 지정한다.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj4.nCellFontSize			= 9;					// Font Size 9					// Font Size 9
}
function setDefault5() { 

	GridObj5.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj5.bRowSelectorIndex		= true;					//Row Selector 영역에 Row Index를 보여준다.
    GridObj5.nHDLineSize			= 12;					//Header Size
    GridObj5.bStatusbarVisible		= false;				// status bar visible
    GridObj5.strActiveRowBgColor		= "232|245|213";		//선택된 행의 배경색상을 설정한다.
    //선택된 셀의 글자색 지정한다.
    GridObj5.strSelectedCellFgColor = '180|82|205';
    GridObj5.strHDClickAction		= "select";        		//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj5.nCellFontSize			= 9;					// Font Size 9
}

function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        			//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj7.bRowSelectorIndex		= true;						//Row Selector 영역에 Row Index를 보여준다.
    GridObj7.nHDLineSize			= 12;						//Header Size
    
    //선택된 셀의 글자색 지정한다.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        			//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj7.strActiveRowBgColor		= "232|245|213";		//선택된 행의 배경색상을 설정한다.
	GridObj7.nCellFontSize			= 9;							// Font Size 9
	GridObj7.bStatusbarVisible		= true;						// status bar visible 상태바 설정
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60  	,false);
	GridObj.AddHeader("ITEM_ID"				,"품목번호"       	,"t_text" 		,20		,60  	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"			,"품목명"      		,"t_text" 		,100	,190 	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"기본\n단위"     	,"t_text" 		,100	,0  	,false); //0
 	GridObj.AddHeader("MFS_FLAG"			,"발주\n그룹"     	,"t_text" 		,100	,0   	,false); //0	40 ->0으로 변경
 	GridObj.AddHeader("LEAD_TIME"			,"L/T"     			,"t_number" 	,100.3	,0   	,false); //0	33 ->0으로 변경
 	GridObj.AddHeader("TERM_VAL"			,"유통\n기한"     	,"t_number" 	,100.3	,0  	,false); //0   
 	GridObj.AddHeader("ANYANG"				,"안양"      		,"t_number" 	,100.3	,55  	,false); //0   
 	GridObj.AddHeader("KUMI"				,"구미"      		,"t_number" 	,100.3	,55  	,false); //0 
 	GridObj.AddHeader("PUSAN"				,"부산"      		,"t_number" 	,100.3	,55  	,false); //0  	
 	GridObj.AddHeader("SJP"					,"SJP"   			,"t_number" 	,100.3	,55  	,false); //0  
 	GridObj.AddHeader("SINHYO"				,"신효"   			,"t_number" 	,100.3	,55  	,false); //0   
 	GridObj.AddHeader("HJIN"				,"현진"   			,"t_number" 	,100.3	,55  	,false); //0  
 	GridObj.AddHeader("CNFM_STOCK"			,"기준"     			,"t_number" 	,100.3	,55  	,false); //0 당주 기준재고
 	
 	GridObj.AddHeader("SJP_GIJUN"			,"SJP"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("SINHYO_GIJUN"		,"신효"     			,"t_number"		,100.3	,55    	,true); //0 	
 	GridObj.AddHeader("HJIN_GIJUN"			,"현진"     			,"t_number"		,100.3	,55    	,true); //0
 	
 	GridObj.AddHeader("SUB_TOT"				,"소계"     			,"t_number" 	,100.3	,65  	,false); //0
	GridObj.AddHeader("ODER_QTY"			,"금주\n소요량"     	,"t_number" 	,100.3	,65  	,false); //0
	GridObj.AddHeader("W1_STOCK"			,"차주초\n재고"     	,"t_number" 	,100.3	,65  	,false); //0 	
  	GridObj.AddHeader("SEL_DMD"				,"선택"     			,"t_combo"		,100	,0    	,false); //0	
 	GridObj.AddHeader("DMD_QTY"				,"수량"     			,"t_number"		,100.3	,0    	,false); //0
 	GridObj.AddHeader("DMD03"				,"3개월\n평균"     	,"t_number"		,100.3	,65   	,false); //0 	
 	GridObj.AddHeader("DMD04"				,"전년\n동월"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD05"				,"평균\n(12개월)"    ,"t_number"		,100.3	,65   	,false); //0 	
 	GridObj.AddHeader("DMD06"				,"전주\n사용량"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD07"				,"3주\n평균"     		,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD08"				,"사용자"     		,"t_number"		,100.3	,60   	,false); //0 	   
 	GridObj.AddHeader("USE_DAY"				,"가용일"     		,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("USE_QTY"				,"발주\n필요량"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("MIN_LOT_SIZE"		,"발주\n단위"     	,"t_number"		,100.3	,0    	,false); //0
 	GridObj.AddHeader("FC_QTY"				,"발주\n예고량"     	,"t_number"		,100.3	,55    	,false); //0
 	GridObj.AddHeader("SJP_EXPT"			,"SJP"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("SINHYO_EXPT"			,"신효"     			,"t_number"		,100.3	,55    	,true); //0 	
 	GridObj.AddHeader("HJIN_EXPT"			,"현진"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("MSG"					,"비고"				,"t_text" 		,100	,90    	,false); //0   저장을 위함
 	
	/* 이중 해더 추가 */
	GridObj.AddGroup("HD1",			"농심");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("HD1", 	"ANYANG");
	GridObj.AppendHeader("HD1", 	"KUMI");
	GridObj.AppendHeader("HD1", 	"PUSAN");
	
	GridObj.AddGroup("HD2",			"업체");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("HD2", 	"HJIN");	
	GridObj.AppendHeader("HD2", 	"SJP");
	GridObj.AppendHeader("HD2", 	"SINHYO");
	GridObj.AppendHeader("HD2", 	"CNFM_STOCK");
	
	GridObj.AddGroup("HD3",			"구매팀 예고량");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("HD3", 	"SINHYO_EXPT");
	GridObj.AppendHeader("HD3", 	"SJP_EXPT");
	GridObj.AppendHeader("HD3", 	"HJIN_EXPT");	
	
	GridObj.AddGroup("HD4",			"구매팀 기준");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("HD4", 	"SINHYO_GIJUN");
	GridObj.AppendHeader("HD4", 	"SJP_GIJUN");
	GridObj.AppendHeader("HD4", 	"HJIN_GIJUN");
	
//	/* 이중 해더 추가 */
//	GridObj.AddGroup("HD2"			,"그룹별 예측량");			//그리드에 그룹을 등록한다. 
//	GridObj.AppendHeader("HD2", 		"SEL_DMD");
//	GridObj.AppendHeader("HD2", 		"DMD_QTY");
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',		'center');
    GridObj.SetColCellAlign('MFS_FLAG',		'center');
    GridObj.SetColCellAlign('LEAD_TIME',	'center');
    GridObj.SetColCellAlign('TERM_VAL',		'center');     
    GridObj.SetColCellAlign('CNFM_STOCK',	  'right');	//당주 기준재고 = 확정재고
	GridObj.SetColCellAlign('SUB_TOT',		 'right');       
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    GridObj.SetColCellAlign('SEL_DMD',		'left');
    GridObj.SetColCellAlign('DMD_QTY',		 'right');    
    GridObj.SetColCellAlign('DMD03',		 'right');
    GridObj.SetColCellAlign('DMD04',		 'right');
    GridObj.SetColCellAlign('DMD05',		 'right');    
    GridObj.SetColCellAlign('DMD06',		 'right');
    GridObj.SetColCellAlign('DMD07',		 'right');    
    GridObj.SetColCellAlign('DMD08',		 'right');
    GridObj.SetColCellAlign('USE_DAY',		 'right');	// 가용일
	GridObj.SetColCellAlign('USE_QTY',		 'right');  // 발주 필요량      
	GridObj.SetColCellAlign('MIN_LOT_SIZE',	 'right');	//발주단위
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//발주예고량
    GridObj.SetColCellAlign('MSG',		 	 'left');

	GridObj.SetColFix('ITEM_NAME');

  	GridObj.SetNumberFormat("ANYANG", 			"#,##0");	
  	GridObj.SetNumberFormat("KUMI", 			"#,##0");	
  	GridObj.SetNumberFormat("PUSAN", 			"#,##0");	
  	GridObj.SetNumberFormat("SINHYO", 			"#,##0");	
  	GridObj.SetNumberFormat("SJP", 				"#,##0");	
  	GridObj.SetNumberFormat("HJIN", 			"#,##0");	
  	GridObj.SetNumberFormat("SINHYO_EXPT", 		"#,##0");	
  	GridObj.SetNumberFormat("SJP_EXPT", 		"#,##0");	
  	GridObj.SetNumberFormat("HJIN_EXPT", 		"#,##0"); 
  	GridObj.SetNumberFormat("SINHYO_GIJUN", 	"#,##0");	
  	GridObj.SetNumberFormat("SJP_GIJUN", 		"#,##0");	
  	GridObj.SetNumberFormat("HJIN_GIJUN", 		"#,##0"); 
    GridObj.SetNumberFormat("CNFM_STOCK", 		"#,##0");	//당주 기준재고
    GridObj.SetNumberFormat("SUB_TOT", 			"#,##0");
    GridObj.SetNumberFormat("ODER_QTY", 		"#,##0");
    GridObj.SetNumberFormat("W1_STOCK", 		"#,##0");    
    GridObj.SetNumberFormat("DMD_QTY", 			"#,##0");    
    GridObj.SetNumberFormat("DMD03", 			"#,##0");
    GridObj.SetNumberFormat("DMD04", 			"#,##0");
    GridObj.SetNumberFormat("DMD05", 			"#,##0");    
    GridObj.SetNumberFormat("DMD06", 			"#,##0");
    GridObj.SetNumberFormat("DMD07", 			"#,##0");    
    GridObj.SetNumberFormat("DMD08", 			"#,##0");
	GridObj.SetNumberFormat("USE_DAY", 			"#,##0");
	GridObj.SetNumberFormat("USE_QTY", 			"#,##0");	
    GridObj.SetNumberFormat("MIN_LOT_SIZE", 	"#,##0");
    GridObj.SetNumberFormat("FC_QTY", 			"#,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.	
	GridObj.SetColHide("CRUD",true);
}

/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){

    var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", 			nRow);
    var sel_item_id		= GridObj.GetCellValue("ITEM_ID", 					nRow);
    var sel_item_name	= GridObj.GetCellValue("ITEM_NAME", 				nRow);
    var mfs_flag		= GridObj.GetCellValue("MFS_FLAG", 					nRow); //발주그룹
    var dmd_qty			= strToNum(GridObj.GetCellValue("DMD_QTY", 			nRow));
    var dmd03			= strToNum(GridObj.GetCellValue("DMD03", 			nRow)); //3개월 평균
    var dmd04			= strToNum(GridObj.GetCellValue("DMD04", 			nRow)); //전년 동원
    var dmd05			= strToNum(GridObj.GetCellValue("DMD05", 			nRow)); //과거 12개월
    var dmd06			= strToNum(GridObj.GetCellValue("DMD06", 			nRow)); //전주 사용량
    var dmd07			= strToNum(GridObj.GetCellValue("DMD07", 			nRow)); //3주 평균
    var dmd08			= strToNum(GridObj.GetCellValue("DMD08", 			nRow)); //사용자
    
				if(sel_dmd =="DMD03"){ //3개월평균
						dmd_qty = dmd03;
						
				}else if(sel_dmd =="DMD04"){ //전년동월
						dmd_qty = dmd04;
						
				}else if(sel_dmd =="DMD05"){ //평균(12개월)
						dmd_qty = dmd05;
							
				}else if(sel_dmd =="DMD06"){ //평균(12개월)
						dmd_qty = dmd06;
						
				}else if(sel_dmd =="DMD07"){
						dmd_qty = dmd07;	//3주 평균
						
				}else if(sel_dmd =="DMD08"){
						dmd_qty = dmd08;	//사용자
				}	else{
					dmd_qty =0;
				}			
		
			if(mfs_flag=="A"){
				dmd_qty	=	Math.round(dmd_qty *1);	
			} else if(mfs_flag=="B"){
				dmd_qty	=	Math.round(dmd_qty *2);
			} else{
				dmd_qty	=	Math.round(dmd_qty *3);
			}

	
		GridObj.SetCellValue("DMD_QTY",		nRow,		  dmd_qty);
	
	
	use_day_qty_cal(nRow);
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //dmd_qty
	
	if(strColumnKey == "DMD_QTY"){
		
		GridObj.SetComboSelectedIndex("SEL_DMD",		nRow,				5);	// 사용자 데이터 입력 후 SEL_DMD 값이 사용자로 자동 변경됨.
		GridObj.SetCellValue("DMD08",					nRow,		nNewValue);	//사용자 입력 값 -> DMD08에 Setting
		
	}

}


function setHeader3(GridObj3) {        

  	GridObj3.AddHeader("CONS_ITEM_ID"	,"자재코드"      	,"t_text" 		,10			,80		,false); //0   
  	GridObj3.AddHeader("CONS_ITEM_NAME"	,"자재명"       	,"t_text" 		,100		,140	,false); //0   
  	GridObj3.AddHeader("UNIT"			,"단위"       	,"t_text" 		,100		,60  	,false); //0   
  	GridObj3.AddHeader("PRE_STD_STOCK"	,"기준재고"      	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_FC_QTY"		,"발주예고"       ,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_IPGO"		,"입고"      	,"t_number" 	,100.3		,80  	,false); //0    
  	GridObj3.AddHeader("NOW_EXPT"		,"금주예상"		,"t_number" 	,100.3		,80  	,false); //0   화면 감춤
  	GridObj3.AddHeader("SIL_STOCK"		,"실재고"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("DIFF_QTY"		,"예실차"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("CNFM_STOCK"		,"확정재고" 		,"t_number" 	,100.3		,80  	,false); //0   
	 	    
	
	/* 이중 해더 추가 */
	GridObj3.AddGroup("HD1"	,"전주");			//그리드에 그룹을 등록한다. 
	GridObj3.AppendHeader("HD1",   	"PRE_STD_STOCK");
	GridObj3.AppendHeader("HD1",  	"PRE_FC_QTY");
	GridObj3.AppendHeader("HD1", 	"PRE_IPGO");	
	
	GridObj3.BoundHeader();	

    GridObj3.SetColCellAlign('CONS_ITEM_ID',	'center'); 
    GridObj3.SetColCellAlign('CONS_ITEM_NAME',	  'left'); 
	GridObj3.SetColCellAlign('UNIT',			'center');
    GridObj3.SetColCellAlign('PRE_STD_STOCK',	 'right'); 
    GridObj3.SetColCellAlign('PRE_FC_QTY',		 'right'); 
    GridObj3.SetColCellAlign('PRE_IPGO',		 'right'); 
    GridObj3.SetColCellAlign('NOW_EXPT',		 'right'); 
    GridObj3.SetColCellAlign('SIL_STOCK',		 'right'); 
    GridObj3.SetColCellAlign('DIFF_QTY',		 'right'); 
    GridObj3.SetColCellAlign('CNFM_STOCK',		 'right');     
    
    GridObj3.SetNumberFormat("PRE_STD_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_FC_QTY", 		"#,##0");
    GridObj3.SetNumberFormat("PRE_IPGO",		"#,##0");
    GridObj3.SetNumberFormat("NOW_EXPT",		"#,##0");    
	GridObj3.SetNumberFormat("SIL_STOCK", 		"#,##0");
    GridObj3.SetNumberFormat("DIFF_QTY",		"#,##0");
    GridObj3.SetNumberFormat("CNFM_STOCK",		"#,##0");

}

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	
	if(week_flag =="M"){ //월간
	  	GridObj4.AddHeader("GUBN"		,"월간 실적"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"품목번호"      	,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"자재명"   			,"t_text" 	,100	,60 	,false); //0	
	}else {//W 주간 
  		GridObj4.AddHeader("GUBN"		,"주간 실적"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"품목번호"      	,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"자재명"   			,"t_text" 	,100	,60 	,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //월간
		var header_id = "op_02050_Long_Term_Planning_list_dw4_header";	
	}else {//W 주간 
			
			var header_id = "op_02050_Long_Term_Planning_list_dw4_weekly_header";	
			
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

function setHeader5(GridObj5) {        
       
  	GridObj5.AddHeader("ITEM_ID"	,"품목번호"  	,"t_text" 	,10		,0  	,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"	,"품목명"  	,"t_text" 	,100	,130  	,false); //0   
 	GridObj5.AddHeader("GUBN"		,"구분"      ,"t_text" 	,100	,56  	,false); //0   
 	GridObj5.AddHeader("QTY"		,"사용량"    	,"t_number" ,100.3	,86  	,false); //0   
 	GridObj5.AddHeader("YYYY_MM"	,"월"     	,"t_text" 	,1000	,56 	,false); //0   

	GridObj5.BoundHeader();	

    GridObj5.SetNumberFormat("QTY"  , "#,##0");

    GridObj5.SetColCellAlign('ITEM_ID',	'center'); 
    GridObj5.SetColCellAlign('GUBN',	'center'); 
    GridObj5.SetColCellAlign('YYYY_MM',	'center');     

}

function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("EVEN_DATE"	,"행사일자"  	,"t_text" 		,20		,70   ,false); //0
  	GridObj7.AddHeader("PROD_CODE"	,"품목코드"  	,"t_text" 		,10		,30   ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"	,"품목명"  	,"t_text" 		,100	,90   ,false); //0   
  	GridObj7.AddHeader("E_QTY"		,"이마트"  	,"t_number" 	,100.3	,60   ,false); //0   
  	GridObj7.AddHeader("H_QTY"		,"홈플러스"  	,"t_number" 	,100.3	,60  ,false); //0   
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


function setGrid5(){
	
}


/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
  
function use_day_qty_cal(nRow) {
	
		var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", 		nRow);
		var mfs_flag		= GridObj.GetCellValue("MFS_FLAG", 				nRow); //발주그룹		
		var dmd_qty			= strToNum(GridObj.GetCellValue("DMD_QTY", 		nRow));
 		var use_day			= strToNum(GridObj.GetCellValue("USE_DAY", 		nRow)); //가용일
		var use_qty			= strToNum(GridObj.GetCellValue("USE_QTY", 		nRow)); //발주필요량
		var w1_stock		= strToNum(GridObj.GetCellValue("W1_STOCK", 	nRow)); //차주초 재고
		var fc_qty			= strToNum(GridObj.GetCellValue("FC_QTY", 		nRow));
		var min_lot_size	= strToNum(GridObj.GetCellValue("MIN_LOT_SIZE", nRow));
				
		if(GridObj.GetCellValue("DMD_QTY",nRow) ==  "0" ){

					dmd_qty = 1;
		}else{
			
		}
								
								
		if(mfs_flag =="A"){
			use_day = Math.round(w1_stock/((dmd_qty*4)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}	else if(mfs_flag =="B"){
			use_day = Math.round(w1_stock/((dmd_qty*2)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}	else{
			use_day = Math.round(w1_stock/(((dmd_qty/3)*4)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}								
						
		if(strToNum(use_qty) < strToNum(0)){
			use_qty	=	0;
		}else{
		}
		
		GridObj.SetCellValue("USE_DAY",		nRow,		  use_day);
		GridObj.SetCellValue("USE_QTY",		nRow,		  use_qty);

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
        	
        	
        		//EDIT_FLAG
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell색깔 변경
				
				//GridObj.SetCellBgColor('CNFM_STOCK',		i,  color_edit_col);	//당주 기준재고
				GridObj.SetCellBgColor('MIN_LOT_SIZE',		i,  color_edit_col);	//발주단위
				GridObj.SetCellBgColor('DMD_QTY',			i,  color_edit_col);	//그룹별 예측량
				GridObj.SetCellBgColor('HJIN_EXPT',			i,  color_edit_col);	//구매 예측량
				GridObj.SetCellBgColor('SJP_EXPT',			i,  color_edit_col);	//구매 예측량
				GridObj.SetCellBgColor('SINHYO_EXPT',		i,  color_edit_col);	//구매 예측량
				GridObj.SetCellBgColor('HJIN_GIJUN',		i,  color_edit_col);	
				GridObj.SetCellBgColor('SJP_GIJUN',			i,  color_edit_col);	
				GridObj.SetCellBgColor('SINHYO_GIJUN',		i,  color_edit_col);	
				//GridObj.SetCellBgColor('DMD08',				i,  color_edit_col);	//사용자 
				//GridObj.SetCellBgColor('FC_QTY',			i,  color_edit_col);	//발주예고량

				var sel_dmd		= GridObj.GetCellHiddenValue("SEL_DMD", 		i);
				var mfs_flag	= GridObj.GetCellValue("MFS_FLAG", 				i); //발주그룹
				var dmd_qty		= strToNum(GridObj.GetCellValue("DMD_QTY", 		i));
			    var dmd03		= strToNum(GridObj.GetCellValue("DMD03", 		i)); //3개월 평균
			    var dmd04		= strToNum(GridObj.GetCellValue("DMD04", 		i)); //전년 동월
			    var dmd05		= strToNum(GridObj.GetCellValue("DMD05", 		i)); //과거 12개월
				var dmd06		= strToNum(GridObj.GetCellValue("DMD06", 		i)); //전주 사용량
		    	var dmd07		= strToNum(GridObj.GetCellValue("DMD07", 		i)); //3주 평균	    
				var dmd08		= strToNum(GridObj.GetCellValue("DMD08", 		i)); //사용자								
				    
				if(GridObj.GetCellValue("DMD_QTY",nRow) ==  "0" ){
					dmd_qty = 1;
				}else{
				}
				
				if(sel_dmd =="DMD03"){ //3개월평균
						dmd_qty = dmd03;
						
				}else if(sel_dmd =="DMD04"){ //전년동월
						dmd_qty = dmd04;
						
				}else if(sel_dmd =="DMD05"){ //평균(12개월)
						dmd_qty = dmd05;
							
				}else if(sel_dmd =="DMD06"){ //평균(12개월)
						dmd_qty = dmd06;
						
				}else if(sel_dmd =="DMD07"){
						dmd_qty = dmd07;	//3주 평균
						
				}else if(sel_dmd =="DMD08"){
						dmd_qty = dmd08;	//사용자
				}	else{
					dmd_qty =0;
				}											
				
				if(mfs_flag=="A"){
					dmd_qty	=	Math.round(dmd_qty * 1);	
				} else if(mfs_flag=="B"){
					dmd_qty	=	Math.round(dmd_qty * 2);
				} else{
					dmd_qty	=	Math.round(dmd_qty * 3);
				}
				
				GridObj.SetCellValue("DMD_QTY",		i,		  dmd_qty);			

				
				use_day_qty_cal(i)				
			
			}  
			
			
    	// 마지막 변경한 Row로 이동
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount())){
				
				GridObj.SetRowScroll(rFirst);}			
        }
         else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
	

    } else if(endMocde="doSave"){
    	GoSearch();
    	
    }

		cnfm_check();
}



function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';

	
		          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") {                           
						//EDIT_FLAG	        	               
			for(var i=0;i<GridObj3.GetRowCount();i++) {
				// cell색깔 변경
				GridObj3.SetCellBgColor('CNFM_STOCK',		i,  color_edit_col);
			} 
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

function GridEndQuery5() {
	
	var mode		= GridObj5.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search5") {
		if(GridObj5.GetStatus() == "true") {      
		     GridObj5.SetGroupMerge('ITEM_ID,ITEM_NAME');
		}
		else { 
			error_msg = GridObj5.GetMessage(); 
			alert(error_msg);            
		}
	}	
	
	doQuery4();
	
	setGrid5();
}


function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
		          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  
		  
		  //GridObj7.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum','E_QTY,H_QTY,L_QTY');
		  //GridObj7.SetcolBg01('255|0|0', color_tot); 
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

	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	

	GridObj4.ClearGrid( ); 
	setHeader4(GridObj4);	

	GridObj5.ClearGrid( ); 
	setHeader5(GridObj5);	

	GridObj7.ClearGrid( ); 
	setHeader7(GridObj7);
	
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){  
	
	
		
		if( strColumnKey == "SELECTED"){
			return;
		}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
			
			var item_id		= GridObj.GetCellValue("ITEM_ID", 	nRow);
			var	item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);		
			var service_url = "service.do?_moon_service=op_02050_even_item_list_dw7";
			
			service_url += "&item_id=" + item_id + "&item_name=" + item_name;
			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
			var newWin = window.open(service_url, "", pop_win_style);  
			newWin.focus();
			
			return;		
		}
		
	
		
		document.all.week_flag.value	= 'M'
		    
	    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", 				nRow);
	    var sel_item_name		= GridObj.GetCellValue("ITEM_NAME", 			nRow);
	
		var use_qty				= strToNum(GridObj.GetCellValue("USE_QTY", 		nRow));
		var min_lot_size		= strToNum(GridObj.GetCellValue("MIN_LOT_SIZE", nRow));
		var fc_qty				= strToNum(GridObj.GetCellValue("FC_QTY", 		nRow));
		
	    
					if(min_lot_size ==  0){
		
						min_lot_size=1;
					}	else{
							}    
	    
	    if(strColumnKey=="USE_QTY" && use_qty > 0){
			
			if(use_qty >= min_lot_size){ // 
					fc_qty	=	min_lot_size * Math.ceil(use_qty / min_lot_size);	
			}else{
					fc_qty	=	min_lot_size;
			}		
			GridObj.SetCellValue("FC_QTY", nRow,	fc_qty);
			
			return;		
			
		}else{
		}
		
	
		// doQuery3 은 다이나믹 해더 때문에 DW5 번 종료후 실행
		
		doQuery3(nRow);	//실행 정지	
		
		doQuery5(nRow); //실행 정지
		
		doQuery7(nRow);	//실행 정지
	

}        
   
/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
		var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
		var com_code		= document.frm.com_code.value;
		var mfs_flag		= document.frm.mfs_flag.value;
		var cnfm_date		= document.frm.cnfm_date.value;

       
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",			 "search");
       GridObj.SetParam("cnfm_date",	cnfm_date);
       GridObj.SetParam("mfs_flag",		 mfs_flag);
       GridObj.SetParam("com_code",		 com_code);
       

       
       
       GridObj.DoQuery(servlet_url);
   }



function doQuery3(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID",	nRow);
	var cnfm_date	= document.frm.cnfm_date.value;
	
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	
	GridObj3.SetParam("mode",		"search3");
	GridObj3.SetParam("item_id",	  item_id);
	GridObj3.SetParam("cnfm_date",	cnfm_date);

	GridObj3.DoQuery(servlet_url);
}



/*┌──────────────────────────────────┐
  │DW 4 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var nRow 		= GridObj.GetActiveRowIndex();
	if (nRow < 0) return; 
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	var week_flag	= document.all.week_flag.value;
	
	if(week_flag =="M"){ //월간
		GridObj4.SetParam("query_id", "op_02050_Long_Term_Planning_list_dw4");	

	}else{//W 주간 
		GridObj4.SetParam("query_id", "op_02050_Long_Term_Planning_list_dw4_weekly");	
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
function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj5.SetParam("itype", 		itype);
	GridObj5.SetParam("mode",	"search5");
	GridObj5.SetParam("item_id",  item_id);
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
	GridObj7.SetParam("cnfm_date",	 cnfm_date);
	
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
	
	//"자재사용실적"
	

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



// 저장
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	

};

// 저장
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", 						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				 cnfm_date);
	GridObj.SetParam("com_code",				 com_code);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
		
	GridObj.DoQuery(servlet_url, "CRUD"); 
 
 return;
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
} */





function execute_fc_qty_cnfm_flag_yes_new(){
	
	var user_id		= document.frm._user_id.value;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
	commonUtil.executeQuery("user_id!%!cnfm_date!%!com_code", user_id+"!%!"+cnfm_date+"!%!"+com_code, "op_02050_MERGE INTO_FC_QTY_CNFM_FLAG_NEW", success);
}

success = function(data) {
	if (data == "SUCCESS") {
		
		document.frm.btnfc_qty_Cnfm.disabled = true;
		
		alert("확정되었습니다.");
	}else{
	}
}



function cnfm_check(){
	var user_id		= document.frm._user_id.value;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
	commonUtil.getSelQeury("user_id!%!cnfm_date!%!com_code",user_id+"!%!"+cnfm_date+"!%!"+com_code,"op_02050_FC_QTY_CNFM_FLAG_new", { 
	callback:function(arrList){

//if(arrList) return;
//else alert(arrList[0][0]);
	//if(arrList == null) return;	// 확정데이터가 없으면 return;
	//if(!arrList) return;	// 확정데이터가 없으면 return;
		//alert(arrList[0][0]);
	if(arrList != ""){ 
		if(arrList[0][0]){
			if(arrList[0][0]=='Y') { // 확정여부
				document.frm.btnfc_qty_Cnfm.disabled = true;
			}
			else {
				document.frm.btnfc_qty_Cnfm.disabled = false;
			}
		}
	}
	else 	
			document.frm.btnfc_qty_Cnfm.disabled = false;
			
	}
	});
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
 

