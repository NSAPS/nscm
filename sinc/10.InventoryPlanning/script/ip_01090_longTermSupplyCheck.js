//## 프로그램ID		:	ip_01090_longTermSupplyCheck.js
//## 프로그램명		:	공급적합성 사전분석 pop_up
//## 개발자          :	권용찬 
//## 개발일자       	:	2009-07-16
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  남웅용      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_01090_longTermSupplyCheck';
var GridObj ; 													// WiseGrid 객체
var GridObj2 ; 													// WiseGrid 객체
var GridObj3 ; 													// WiseGrid 객체
var GridObj4 ; 													// WiseGrid 객체
var GridObj5 ; 													// WiseGrid 객체
var GridObj6 ; 													// WiseGrid 객체

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
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

/*┌─────────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 							│
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.			│
  └─────────────────────────────────────────────────────────────────────┘*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader(GridObj);  	//해더생성 
}

function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader2(GridObj2);  	//해더생성 
	setDefault2();        	//화면 기본 설정
	//  
}   
function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader3(GridObj3);  	//해더생성 
	setDefault3();        	//화면 기본 설정
	//  
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

function init6() { 
	GridObj6 = document.WiseGrid6;
	setProperty(GridObj6);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader6(GridObj6);  	//해더생성 
	setDefault6();        	//화면 기본 설정
}


/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '맑은 고딕';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 1; 
    
    GridObj.bStatusbarVisible = true;				// status bar visible 상태바 설정 
 
}

function setDefault2() { 

    GridObj2.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj2.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj2.strSelectedCellFgColor = '0|0|0'; 
	GridObj2.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   

	// Header Font Setting
	GridObj2.strHDFontName = '맑은 고딕';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines = 1; 
    
    GridObj2.bStatusbarVisible = true;				// status bar visible 상태바 설정 
 
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj3.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj3.strSelectedCellFgColor = '0|0|0'; 
	GridObj3.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   

	// Header Font Setting
	GridObj3.strHDFontName = '맑은 고딕';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj3.nHDLines = 1; 
    
    GridObj3.bStatusbarVisible = true;				// status bar visible 상태바 설정 
 
}

function setDefault4() { 

	GridObj4.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj4.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj4.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj4.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj4.strSelectedCellFgColor = '0|0|0'; 
	GridObj4.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   
    GridObj4.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj4.strHDFontName = '맑은 고딕';
	GridObj4.nHDFontSize = 9;				  	// Font Size 9
	GridObj4.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj4.nHDLines = 1;
    
     
}

function setDefault5() { 

	GridObj5.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj5.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj5.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj5.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj5.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj5.strSelectedCellFgColor = '0|0|0'; 
	GridObj5.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   
    GridObj5.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj5.strHDFontName = '맑은 고딕';
	GridObj5.nHDFontSize = 9;				  	// Font Size 9
	GridObj5.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj5.nHDLines = 1; 
}


function setDefault6() { 

	GridObj6.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj6.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj6.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj6.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj6.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj6.strSelectedCellFgColor = '0|0|0'; 
	GridObj6.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   
    GridObj6.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj6.strHDFontName = '맑은 고딕';
	GridObj6.nHDFontSize = 9;				  	// Font Size 9
	GridObj6.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj6.nHDLines = 1; 
}
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {        

  	GridObj.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj.AddHeader("DAY"				,"일   간"       	,"t_text" 	,400		,70 ,false); //0   
  	GridObj.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj.AddHeader("BASE_STOCK"		,"기초재고"     ,"t_number" ,100.3		,65 ,false); //0   
  	GridObj.AddHeader("IPGO"			,"생산량"       	,"t_number" ,100.3		,65 ,true); //0   
  	GridObj.AddHeader("CHGO"			,"판매량"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_MONTH"		,"전월동일"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_YEAR"		,"전년동일"      	,"t_number" ,100.3		,65 ,true); //0
  	
  	GridObj.AddHeader("MM"				,"월"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj.AddHeader("WEEK_NO"			,"주차"      	,"t_number" ,100.3		,0 ,true); //0
  	    
	 	    
	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj.SetColCellAlign('DAY','center'); 
    
    GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj.SetNumberFormat("IPGO"  , "#,##0");
    GridObj.SetNumberFormat("CHGO"  , "#,##0");
    GridObj.SetNumberFormat("LAST_MONTH"  , "#,##0");
    GridObj.SetNumberFormat("LAST_YEAR"  , "#,##0");
			
	setDefault();        	//화면 기본 설정 
	GoSearch(); //pop up 창에서 와이즈 그리드 최초 설정을 위해 GoSearch 를 init 후에 실행  %중요%

}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader2(GridObj) {        

  	GridObj2.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj2.AddHeader("DAY"			,"주   간"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj2.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("BASE_STOCK"		,"기초재고"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj2.AddHeader("IPGO"			,"생산량"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj2.AddHeader("CHGO"			,"판매량"      	,"t_number" ,100.3		,68 ,true); //0
  	
  	GridObj2.AddHeader("CHGO_ORG"		,"판매량"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj2.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("MM"				,"월"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("WEEK_NO"		,"주차"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('DAY','center'); 
    
    GridObj2.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj2.SetNumberFormat("IPGO"  , "#,##0");
    GridObj2.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault2();        	//화면 기본 설정 
	//GoSearch2(); //pop up 창에서 와이즈 그리드 최초 설정을 위해 GoSearch 를 init 후에 실행  %중요%

}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader3(GridObj) {        

  	GridObj3.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj3.AddHeader("DAY"			,"월   간"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj3.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj3.AddHeader("BASE_STOCK"		,"기초재고"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj3.AddHeader("IPGO"			,"생산량"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj3.AddHeader("CHGO"			,"판매량"      	,"t_number" ,100.3		,68 ,true); //0     
  	
  	GridObj3.AddHeader("CHGO_ORG"		,"판매량"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj3.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("MM"				,"월"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("WEEK_NO"		,"주차"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj3.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj3.SetColCellAlign('DAY','center'); 
    
    GridObj3.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj3.SetNumberFormat("IPGO"  , "#,##0");
    GridObj3.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault3();        	//화면 기본 설정 
	//GoSearch3(); //pop up 창에서 와이즈 그리드 최초 설정을 위해 GoSearch 를 init 후에 실행  %중요%

}


function setHeader4(GridObj4) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header2",{
		callback:function(result){

		  	GridObj4.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj4.AddHeader("AVG"	,"기간평균"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 31 ; i++){  //19
				if(i < result.length) {
					GridObj4.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //19
						GridObj4.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj4.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj4.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
 
    		//GridObj2.SetColCellAlign('GUBN','center'); 
    		
			GridObj4.SetNumberFormat("AVG"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_10"  , "#,##0");
			
			GridObj4.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_20"  , "#,##0");		

			GridObj4.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_30"  , "#,##0");
			
			GridObj4.SetColFix('AVG'); 
							
		}
		
	});   

}

function setHeader5(GridObj5) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header3",{
		callback:function(result){

		  	GridObj5.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj5.AddHeader("AVG"	,"기간평균"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 61 ; i++){  //19
				if(i < result.length) {
					GridObj5.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //19
						GridObj5.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj5.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj5.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
 
    		GridObj5.SetColCellAlign('GUBN','center');
    		 
			GridObj5.SetNumberFormat("AVG"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_10"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_20"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_30"  , "#,##0"); 			
                               
			GridObj5.SetNumberFormat("DAY_31"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_32"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_33"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_34"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_35"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_36"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_37"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_38"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_39"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_40"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_41"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_42"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_43"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_44"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_45"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_46"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_47"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_48"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_49"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_50"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_51"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_52"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_53"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_54"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_55"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_56"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_57"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_58"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_59"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_60"  , "#,##0");
			
 			GridObj5.SetColFix('AVG'); 
 
		}
	});   
}


function setHeader6(GridObj6) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header4",{
		callback:function(result){

		  	GridObj6.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3		,70  ,false); //0   

			for(var i=0 ; i < 21 ; i++){  //19
				if(i < result.length) {
					GridObj6.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 21) { //19
						GridObj6.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj6.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj6.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
 
    		GridObj6.SetColCellAlign('GUBN','center');
    		 
			GridObj6.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_10"  , "#,##0");

			GridObj6.SetNumberFormat("DAY_11"  , "#,##0");  
			GridObj6.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_20"  , "#,##0");
			
 
		}
	});   
}
   
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
       //doQuery2();
       //doQuery3();
   }

/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch2(service) 
   {
   	//alert(service);
       //doQuery();
   }
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch3(service) 
   {
   	//alert(service);
       //doQuery();
   }



/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch4(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       //doQuery2();
   }
  

      
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation 일 경우 simul_data 필수
	//if(week_flag == "plan") {
		//GridObj.SetParam("mode", "search_plan");
	//}else{
	GridObj.SetParam("mode", "search");
	//}     
	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("week_flag", week_flag);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("sel_gubn", sel_gubn);
	GridObj.SetParam("division", division);
	GridObj.SetParam("cat03", cat03);
	   
	GridObj.DoQuery(servlet_url);
}
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	GridObj2.SetParam("mode", "search2");
	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj.SetParam("mode", "search3");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("week_flag", week_flag);
	GridObj2.SetParam("simul_data", simul_data);
	GridObj2.SetParam("sel_gubn", sel_gubn);
	GridObj2.SetParam("division", division);
	GridObj2.SetParam("cat03", cat03);	   
		   
	GridObj2.DoQuery(servlet_url);
}
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery3() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj3 = document.WiseGrid3;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation 일 경우 simul_data 필수
	GridObj3.SetParam("mode", "search3");
	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("week_flag", week_flag);
	GridObj3.SetParam("simul_data", simul_data);
	GridObj3.SetParam("sel_gubn", sel_gubn);
	GridObj3.SetParam("division", division);
	GridObj3.SetParam("cat03", cat03);	   
	   
	GridObj3.DoQuery(servlet_url);
}


/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj4 = document.WiseGrid4;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("week_flag", week_flag);
	GridObj4.SetParam("simul_data", simul_data);
	GridObj4.SetParam("sel_gubn", sel_gubn);
	GridObj4.SetParam("division", division);	   
	GridObj4.SetParam("cat03", cat03);	   
	GridObj4.DoQuery(servlet_url);
}
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery5() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj5 = document.WiseGrid5;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj5.SetParam("mode", "search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.SetParam("week_flag", week_flag);
	GridObj5.SetParam("simul_data", simul_data);
	GridObj5.SetParam("sel_gubn", sel_gubn);
	GridObj5.SetParam("division", division);	   
	GridObj5.SetParam("cat03", cat03);	   
	GridObj5.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery6() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj6 = document.WiseGrid6;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj6.SetParam("mode", "search6");
	GridObj6.SetParam("item_id", item_id);
	GridObj6.SetParam("week_flag", week_flag);
	GridObj6.SetParam("simul_data", simul_data);
	GridObj6.SetParam("sel_gubn", sel_gubn);
	GridObj6.SetParam("division", division);	   
	GridObj6.SetParam("cat03", cat03);	   
	GridObj6.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell색깔 변경
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()


	doQuery2()
	doQuery3()

}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery2() 
{
    var endMode = GridObj2.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search2") //조회가 완료된 경우
    {
        if(GridObj2.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell색깔 변경
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj2.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj2.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw2()

}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery3() 
{
    var endMode = GridObj3.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search3") //조회가 완료된 경우
    {
        if(GridObj3.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj3.GetRowCount();i++) {
			// cell색깔 변경
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj3.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj3.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw3()
    
    //doQuery4()
	//doQuery5()
	//doQuery6()	
	doQuery4()
	doQuery5()
    
}



/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery_plan()  //판매계획 조회시 main grid 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search_plan") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()
	GridObj.SetCellBgColor('DAY_00', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 2, color_edit_col);
	
	doQuery2()
	doQuery3()
}



/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery4() 
{
//alert("GridEndQuery2");
    var endMode = GridObj4.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search4") //조회가 완료된 경우
    {
        if(GridObj4.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj4.GetMessage(); 
            alert(error_msg);            
		}
    }
	//doQuery3()

}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery5() 
{
//alert("GridEndQuery2");
    var endMode = GridObj5.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search5") //조회가 완료된 경우
    {
        if(GridObj5.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj5.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery6() 
{
//alert("GridEndQuery2");
    var endMode = GridObj6.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search6") //조회가 완료된 경우
    {
        if(GridObj6.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj6.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	//if(strColumnKey == 'BASE_STOCK'){
		//alert("기초재고는 수정이 불가능합니다");
		//alert("해당 칼럼은 수정할수 없습니다.");
		//GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	//}
	cal_dw1(nRow, strColumnKey)	
}

function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("기초재고는 수정이 불가능합니다");
		alert("해당 칼럼은 수정할수 없습니다.");
		GridObj2.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw2(nRow, strColumnKey)	
}

function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("기초재고는 수정이 불가능합니다");
		alert("해당 칼럼은 수정할수 없습니다.");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw3(nRow, strColumnKey)	
}



/*┌──────────────────────────────────┐
  │DW 1 전개제고 연산 일간 전개
  └──────────────────────────────────┘*/
function cal_dw1(nRow, strColumnKey) { /* 일간 전개 */
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var week_flag	= document.frm.week_flag.value;
	var holiday_flag; 		
	
		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
	/* RowCount 수 만큼 전개식 계산 */
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		holiday_flag	=	GridObj.GetCellValue("HOLIDAY_FLAG", i)
		GridObj.SetCellValue("BASE_STOCK", i,  next_stock);

		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", i));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", i));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", i));
		
		/* 
		 * 초기 chgo_qty 은 첫날만 판매량이 들어있고
		 * 나머지 날들은 0을 가져온후 휴일등을 감안한 로직을 이용하여 채워준다.
		 * 
		 * 1. holiday_flag =='Y' 이면 판매량은 0
		 * 2. 휴일이 아니라면 첫날의 판매량을 동일하게 세팅해준다.
		 * */
		if(chgo_qty == 0 ){
					
			if(holiday_flag =='Y'){
				chgo_qty	= 0;
				GridObj.SetCellValue("CHGO", i,  chgo_qty);	
			}else{
				chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
				GridObj.SetCellValue("CHGO", i,  chgo_qty);
			}
					
		}else{
			
		}
		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
	/* 일간 grid 에 입력된 값을 주별 총합으로 계산후 주간 화면에 반영한다 */
	get_week_value(nRow, strColumnKey);	
}

/* 일간 grid 에 입력된 값을 주별 총합으로 계산후 주간 화면에 반영한다 */
function get_week_value(nRow, strColumnKey){ 
	
	
	/* -화면 초기 실행시에는 nRow 가 넘오오지 않으니 실행하지 않는다  */
	if(nRow != null){
		var inpt_value	= Number(GridObj.GetCellValue(strColumnKey, nRow));
		var sum_value = 0;
		var inpt_week_no= Number(GridObj.GetCellValue("WEEK_NO", nRow));
		var week_no;
	}else{
	}
	
	/* 수정된 라인의 WEEK_NO 를 찾아 해당 칼럼의 총합을 계산한다 */
	for(var i=0;i<GridObj.GetRowCount();i++){
		dy_week_no= Number(GridObj.GetCellValue("WEEK_NO", i));
		
		if(dy_week_no == inpt_week_no ){ 
			sum_value = sum_value +  Number(GridObj.GetCellValue(strColumnKey, i));
		}else{
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"주차의 "+strColumnKey+ "의 합계는 "+sum_value )

		/* 일간 그리드에서 입력된 주차와 동일한 주차를 주간 그리드에서 찾는다. */
		var w_week_no= Number(GridObj2.GetCellValue("WEEK_NO", 0));
		w_week_no = (Number(inpt_week_no) - Number(w_week_no)); 
		//alert("주간 그리드 첫주는.. "+w_week_no)
		//alert("주간 그리드의  "+inpt_week_no+ "주차는 "+w_week_no+"번째칸!!")
		
		//alert(sum_value);
		GridObj2.SetCellValue(strColumnKey, w_week_no,  sum_value);
		cal_dw2(w_week_no, strColumnKey)
	}
}


/*┌──────────────────────────────────┐
  │DW 4 전개제고 연산 --주간전개
  └──────────────────────────────────┘*/
function cal_dw2(nRow, strColumnKey) { //주간
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj2.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj2.GetCellValue("COUNT", 0));
		
		
	if(nRow == null){ /* 처음 실행시에만 실시*/
		GridObj2.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			
	}
		
	for(var i=1;i<GridObj2.GetRowCount();i++){


		if(nRow == null){ /* 처음 실행시에만 실시*/
			
			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				
				GridObj2.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty_org	= Number(GridObj2.GetCellValue("CHGO", 0));
				count			= Number(GridObj2.GetCellValue("COUNT", i));
				
				next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);	
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}
	
		}

	}
	get_month_value(nRow, strColumnKey);	
	
}

/* 주간 grid 에 입력된 값을 월별 총합으로 계산한다 */
function get_month_value(nRow, strColumnKey){ 
	

	if(nRow != null){
		var inpt_value	= Number(GridObj2.GetCellValue(strColumnKey, nRow));
		var sum_value	= 0;
		var inpt_mm_no	= Number(GridObj2.GetCellValue("MM", nRow));
		var mm_no;
	}

	for(var i=0;i<GridObj2.GetRowCount();i++){

		w_mm_no= Number(GridObj2.GetCellValue("MM", i));
		if(w_mm_no == inpt_mm_no ){ 
			sum_value = sum_value +  Number(GridObj2.GetCellValue(strColumnKey, i));
		}else{
			
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"주차의 "+strColumnKey+ "의 합계는 "+sum_value )

		/* 일간 그리드에서 입력된 주차와 동일안 주차를 주간 그리드에서 찾는다. */
		var w_mm_no= Number(GridObj3.GetCellValue("MM", 0));
		//alert("주간 그리드 첫주는.. "+w_week_no)
		
		w_mm_no = (Number(inpt_mm_no) - Number(w_mm_no)); 
		//alert("주간 그리드의  "+inpt_week_no+ "주차는 "+w_week_no+"번째칸!!")
		
		GridObj3.SetCellValue(strColumnKey, w_mm_no,  sum_value);
		
		cal_dw3(nRow, strColumnKey)
	}
}



/*┌──────────────────────────────────┐
  │DW 1 전개제고 연산
  └──────────────────────────────────┘*/
function cal_dw3(nRow, strColumnKey) {

	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj3.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj3.GetCellValue("COUNT", 0));
		
	if(nRow == null){ /* 처음 실행시에만 실시*/
		GridObj3.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	}		

		
		
		
	for(var i=1;i<GridObj3.GetRowCount();i++){


		if(nRow == null){ /* 처음 실행시에만 실시*/
			
			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				
				GridObj3.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				GridObj3.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			count		= Number(GridObj3.GetCellValue("COUNT", i));
			GridObj3.SetCellValue("CHGO", i,  chgo_qty);
			
			next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	
		}

	}
}

function enterCheck(){
	
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		refresh("simul");		
	}else{
		
	}

}


// 더블 클릭 : 상세 팝업 재조회 - 3주평균,1주평균,3+1주평균/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;
	var division	= document.frm.division.value;
	var cat03	= document.frm.cat03.value;
	var sel_gubn	= document.frm.sel_gubn.value;

	//Simulation 일 경우 simul_data 필수
	if(week_flag == "simul") {
		alert("구현 예정!!!")
		return
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation의 값을 입력해주십시요!"); 
			document.frm.simul_data.select();
			return;
		}
	}

	var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
	service_url += "&selgubn=" + sel_gubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id+ "&cat03=" + cat03;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=700, top=200, left=200";
	var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
	//var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}


