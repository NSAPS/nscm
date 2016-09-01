//## 프로그램ID		:	ip_01130_import_md_PlanAnalysis_list_pop_check.js
//## 프로그램명		:	수입상품 재고관리 품목별 팝업창
//## 개발자          :	이강욱 
//## 개발일자       	:	2015-04-06
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_07.xml.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_07.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0       2015-04-06    이강욱      create
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_01130_import_md_PlanAnalysis_list_pop_check';

var GridObj ; 
var GridObj2 ;													// WiseGrid 객체
var GridObj3 ;

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
        //alert("tableHeightValue="+tableHeightValue); 
        
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
//        document.WiseGrid.height = tableHeightValue + "px"; 
        document.getElementById('my_chart').style.height = tableHeightValue + "px";
    }  

/*┌─────────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 							│
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.			│
  └─────────────────────────────────────────────────────────────────────┘*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader(GridObj);  	//해더생성 
	setDefault();
	
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

/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='default'; // page 단위 scroll ->기본은 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '맑은 고딕';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 1; 
    
    GridObj.bStatusbarVisible = false;				// status bar visible 상태바 설정 
 
}

function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj2.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj2.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj2.strSelectedCellFgColor = '0|0|0'; 
	GridObj2.strMouseWheelAction='default'; // page 단위 scroll ->기본은 'default'   
    GridObj2.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj2.strHDFontName = '맑은 고딕';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines = 1; 
}


function setDefault3() { 

	GridObj3.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj3.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj3.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj3.strSelectedCellFgColor = '0|0|0'; 
	GridObj3.strMouseWheelAction='default'; // page 단위 scroll ->기본은 'default'   
    GridObj3.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj3.strHDFontName = '맑은 고딕';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj3.nHDLines = 1; 
}       

/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {        
       
    
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop",{
	callback:function(result){
			
			//GridObj.AddHeader("CRUD"			  ,"CRUD"       		,"t_text" 	   ,100    ,0  		,false);  
		  	GridObj.AddHeader("GUBN"  		      ,"구분"				,"t_text"      ,100		,90     ,false); //0
	 		GridObj.AddHeader("GUBN_IDX"  		  ,"구분순서"			,"t_text"      ,100		,0      ,false); //0 
	 		GridObj.AddHeader("AVG"  		  	  ,"평균"			,"t_number"    ,100		,40      ,false); //0 

			for(var i=0 ; i < 30 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,0  	,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 30) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,0  	,false);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,0 	,false);
					}
				}
			}
			
			//GridObj.AddHeader("CNT_AVG"	       	  ,"기간평균"   			,"t_number"    ,100.3	,60     ,false); //0
			
			for(var i=30 ; i < 61 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,60  	,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,60  	,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,60 	,true);
					}
				}
			}
			
			GridObj.AddHeader("TP_FLAG"	       	  ,"타임펜스"   			,"t_number"    ,100.3	,0     ,false); //0	
			GridObj.AddHeader("TERM"	       	  ,"기간"   			,"t_number"    		,100.3	,0     ,false); //0	
			GridObj.BoundHeader();	
			//GridObj.SetCRUDMode("CRUD"); 
			GoSearch(); 
		    
		    GridObj.SetNumberFormat("WEEK_0",       	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_1",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_2",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_3",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_4",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_5",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_6",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_7",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_8",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_9",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_10",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_11",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_12",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_13",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_14",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_15",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_16",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_17",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_18",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_19",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_20",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_21",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_22",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_23",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_24",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_25",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_26",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_27",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_28",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_29",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_30",        	"###,###.#");
		 
		    
		    GridObj.SetNumberFormat("WEEK_31",       	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_32",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_33",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_34",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_35",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_36",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_37",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_38",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_39",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_40",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_41",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_42",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_43",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_44",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_45",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_46",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_47",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_48",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_49",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_50",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_51",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_52",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_53",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_54",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_55",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_56",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_57",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_58",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_59",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_60",        	"###,###.#");
		    
		    GridObj.SetNumberFormat("AVG",        		"###,###.#");
		  
		    //GridObj.SetColCellBgColor('MONTH_5','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_4','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_3','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_2','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_1','255|253|208');
		    
		    GridObj.SetColCellAlign('GUBN',          'left');		    
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   
	}


function setHeader2(GridObj2) {
	// 재고 및 생산 적합성 분석 pop_up hearder (DW2 과거 30일 실적)       
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop_dw2",{
		callback:function(result){

		  	GridObj2.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3	,60  ,false); //0
		  	GridObj2.AddHeader("AVG"	,"기간평균"      	,"t_number" ,100.3	,60  ,false); //0

			for(var i=0 ; i < 30 ; i++){  //11
				if(i < result.length) {
					GridObj2.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 30) { //11
						GridObj2.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj2.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
				
				
			}
			
			GridObj2.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 			
			
 
    		GridObj2.SetColCellAlign('GUBN','center'); 
    		GridObj2.SetColCellAlign('AVG','center'); 
    		
			GridObj2.SetNumberFormat("AVG"  , "#,##0");

			GridObj2.SetNumberFormat("WEEK_0"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_1"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_2"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_3"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_4"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_5"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_6"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_7"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_8"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_9"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_10"  , "#,##0");

			GridObj2.SetNumberFormat("WEEK_11"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_12"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_13"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_14"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_15"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_16"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_17"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_18"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_19"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_20"  , "#,##0"); 

			GridObj2.SetNumberFormat("WEEK_21"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_22"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_23"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_24"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_25"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_26"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_27"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_28"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_29"  , "#,##0");
			

			GridObj2.SetColFix('AVG'); 
 
		}
		
	});   
}


function setHeader3(GridObj3) {        
      //재고 및 생산 적합성 분석 pop_up hearder (DW3 전년 동일) -->  
      
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop",{
		callback:function(result){

		  	GridObj3.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3		,60  ,false); //0
		  	GridObj3.AddHeader("AVG"	,"기간평균"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 61 ; i++){  //31
				if(i < result.length) {
					GridObj3.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //31
						GridObj3.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj3.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj3.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
 			
    		GridObj3.SetColCellAlign('GUBN','center');
    		GridObj3.SetColCellAlign('AVG','center');
    		 
			GridObj3.SetNumberFormat("AVG"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_0"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_1"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_2"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_3"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_4"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_5"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_6"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_7"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_8"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_9"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_10"  , "#,##0"); 			
 			
 			GridObj3.SetNumberFormat("WEEK_11"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_12"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_13"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_14"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_15"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_16"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_17"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_18"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_19"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_20"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_21"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_22"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_23"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_24"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_25"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_26"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_27"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_28"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_29"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_30"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_31"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_32"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_33"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_34"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_35"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_36"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_37"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_38"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_39"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_40"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_41"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_42"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_43"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_44"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_45"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_46"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_47"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_48"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_49"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_50"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_51"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_52"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_53"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_54"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_55"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_56"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_57"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_58"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_59"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_60"  , "#,##0");
			
			GridObj3.SetColFix('AVG'); 			 			
		}
		
	});  
}
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
function GoSearch(service)  {   	
       doQuery();     
}
  
/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
function GoSave  (service) {
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	doSave();
}     

function doSave(){	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var	cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date = cnfm_date.replace(/-/g,"");
	var item_id		= document.frm.item_id.value;
	var reason		= document.frm.reason.value;
	var user_id		= document.frm.user_id.value;  
	var tp_flag		= GridObj.GetCellValue('TP_FLAG',2)
	
	var week_idx    = Number(tp_flag) + 30;	
	var hd_name 	='WEEK_'+Number(week_idx);	
	var order_qty   = GridObj.GetCellValue(hd_name,1);
	  
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "save");	
	GridObj.SetParam("cnfm_date", cnfm_date);
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("user_id", user_id);
	GridObj.SetParam("tp_flag", tp_flag);
	GridObj.SetParam("reason", 	reason);
	GridObj.SetParam("order_qty", order_qty);
	
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	
	
}
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var cnfm_date  	= document.frm.cnfm_date.value;
	cnfm_date 		= cnfm_date.replace(/-/g,"");
	var simul_data  = document.frm.simul_data.value;
	var no_flag		= document.frm.no_flag.value;
	var three_mon	= document.frm.three_mon.value;
	
	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}
	GridObj.SetParam("mode",           	"search");	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("cnfm_date", cnfm_date);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("no_flag", no_flag);
	GridObj.SetParam("three_mon", three_mon);
	GridObj.SetParam("checked_button", checked_button);
	
	GridObj.DoQuery(servlet_url);
}

//과거 30주
function doQuery2() 
{

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var	cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date = cnfm_date.replace(/-/g,"");		   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("cnfm_date", cnfm_date);
	
	   
	GridObj2.DoQuery(servlet_url);
}
// 전년동주 60주
function doQuery3() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var	cnfm_date	= document.frm.cnfm_date.value.replace(/-/g,"");	

	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_reason",{
		callback:function(result){

		  	document.frm.reason.value = result;
 
		}
		
	});   
	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("cnfm_date", cnfm_date);
	
	   
	GridObj3.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery() 
{
	
    var endMode  = GridObj.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {          
        	  
       	            	              
			  doQuery2();
			  gridSetStock();
			  setTimeFence();
			  SetGap();
			  //Add_Row(); 
			  
	            
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    else if(endMode == "doSave") {
		if(GridObj.GetStatus() == "true") 
		{// 
			doQuery();     
		} else 
		{
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		
    }	
  
	
}


function GridEndQuery2() 
{
	
    var endMode  = GridObj2.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search2") //조회가 완료된 경우
    {
        if(GridObj2.GetStatus() == "true") 
        {                           
			   setColoring();
			   doQuery3();
                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
    	
	
}

function GridEndQuery3() 
{
	
    var endMode  = GridObj3.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search3") //조회가 완료된 경우
    {
        if(GridObj3.GetStatus() == "true") 
        {               
        	       
			   paintLineGraph2();
                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }
	
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
//	if(strColumnKey == 'MONTH_5' || strColumnKey == 'MONTH_4'|| strColumnKey == 'MONTH_3'|| strColumnKey == 'MONTH_2' || strColumnKey == 'MONTH_1' || strColumnKey == 'GUBN' ){
//		
//		alert("해당 칼럼은 수정할수 없습니다.");
//		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
//	}
	
//	if(strColumnKey == 'WEEK_30'){
//		
//		
//		var start_hd_name	= 'WEEK_30';
//		var hd_name 		= start_hd_name;
//		var hd_name_1 		= start_hd_name.substr(0,5);
//		var hd_name_2 		= start_hd_name.substr(5,6);
//		
//		for(var i=0; i < 30; i++){
//			
//			hd_name_2 = Number(hd_name_2)+Number(1);						
//			hd_name = hd_name_1+hd_name_2;
//			
//			GridObj.SetCellValue(hd_name, nRow,  nNewValue);
//		}
//		
//	}
	
	gridSetStock();
	paintLineGraph2();	
	
	
}

function GridCellClick(strColumnKey, nRow) {
	
}



/*재고 흐름전개 사용자 예측 Default*/
function gridSetStock(){
		
		var cur_stock;
		var reciept_expt;
		var sales_expt;
		var next_stock;	
		
		var start_hd_name	= 'WEEK_30';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		for(var j =0; j < 30; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,0);	//기초재고
			reciept_expt 	= GridObj.GetCellValue(hd_name,1);	//입고량
			sales_expt		= GridObj.GetCellValue(hd_name,2);	//사용자 예측
			
			next_stock		= Number(cur_stock) + Number(reciept_expt) - Number(sales_expt);
			
			hd_name_2 		= Number(hd_name_2)+Number(1);	
							
			hd_name = hd_name_1+hd_name_2;			
			GridObj.SetCellValue(hd_name, 0,  next_stock);
			
		}
		
		GridObj.SetRowBgColor(2,'178|235|244');	
		
		//GridObj.SetRowActivation(2,'edit');	2015-05-13 js 오류제공자	
		
		
			
}


/*타임펜스 전개*/
function setTimeFence(){		
	
	
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= Number(GridObj.GetCellValue('TP_FLAG',i));
		
		fence = fence+Number(30);
		
		
	
		for(var j=fence; j<61; j++){
			
			hd_name		= 'WEEK_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
		}
					
	}
	
}


function paintLineGraph2() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'

	var colValue = 0;
	var header_day = "";
	var headerCol = "";
	var headerCol_tmp = "";
	var dataCol = "";
	var dataCol_temp = "";
	var maxValue = 0;
	
	var dataCol_G1 = "";
	var first_G1 = 0;
	var save_month = "";
	var cmp_month = "";
	
	var rowCnt = GridObj3.GetRowCount();
	if(rowCnt > 0) var gubnName = GridObj3.GetCellValueIndex(0,0)+' ±1Month';
	var first = 0;
	
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 일요일, 0 일자 제거
			if(header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			// 이하는 월 구분 막대를 표시하기 위한 부분이다.
			if(first_G1 == 0) { 
				first_G1 = 1;
				dataCol_G1 = '0';
				save_month = cmp_month;
			}
			else if(cmp_month != save_month){
				dataCol_G1 = dataCol_G1 + ',X';
				save_month = cmp_month;
			}
			else {
				dataCol_G1 = dataCol_G1 + ',0';			
			}
			//alert(dataCol_G1);
			

			first++; 
			if(first==1){				
				headerCol = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol_temp;
			}
			else {
				
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = dataCol + ','+ GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol + ','+ dataCol_temp;
			}		
		}
	
		so.addVariable("line_dot","2,#CC3399," + gubnName + ",12,5");
		valuesId = "values";
		so.addVariable(valuesId,dataCol);
		
		
	}
	
		
	
	var dataCol_3 = "";
	var gubnName_3 = GridObj.GetCellValueIndex(0,2);
	var rowCnt_3 = GridObj.GetRowCount();
	var first_3 = 0;
	if(rowCnt_3 > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj.GetCellValueIndex(Number(i+3),2));			
			header_day = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			
			// 일요일, 0 일자 제거
			if( header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			first_3++;
			if(first_3==1){
				if(rowCnt == 0) headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
				dataCol_3 = GridObj.GetCellValueIndex(Number(i+3),2);
			}
			else {
				if(rowCnt == 0) headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
				dataCol_3 = dataCol_3 + ','+ GridObj.GetCellValueIndex(Number(i+3),2);
			}				
		}
			
		if(rowCnt == 0) { // 1번 그래프가 없는 경우!!!!
				so.addVariable("line_dot","2,#CC3399," + gubnName_3 + ",12,5");
				valuesId = "values";
				so.addVariable(valuesId,dataCol_3);
				
				
		}else if(rowCnt_2 == 0) {
			so.addVariable("line_dot_3", "2,#468024," + gubnName_3 + ",12,5");			
			valuesId_3 = "values_3";
			so.addVariable(valuesId_3,dataCol_3);
			
		}
		else {
			
			so.addVariable("line_dot_2", "2,#0054FF," + gubnName_3 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_3);
			
			
		}	
				
	}	
	
	
	var dataCol_2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 30 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 일요일, 0 일자 제거
			if( header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			first_2++;
			if(first_2==1){
				if(rowCnt == 0) headerCol = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = GridObj2.GetCellValueIndex(Number(i+2),0);
			}
			else {
				if(rowCnt == 0) headerCol = headerCol + ','+ GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = dataCol_2 + ','+ GridObj2.GetCellValueIndex(Number(i+2),0);
			}				
		}

		if(rowCnt == 0) { // 1번 그래프가 없는 경우!!!!
				so.addVariable("line_dot","2,#CC3399," + gubnName_2 + ",12,5");
				valuesId = "values";
				so.addVariable(valuesId,dataCol_2);
				
				
		}
		else{
			so.addVariable("line_dot_3", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_3 = "values_3";
			so.addVariable(valuesId_3,dataCol_2);
			
		}
		
	}
	
	
	// X값을 최대값으로 치환해준다.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"월구분"+",12");			
	var valuesId_7 = "values_6";	
	so.addVariable(valuesId_7,dataCol_G1);

    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/월/g,"Mon");
	headerCol = headerCol.replace(/화/g,"Tue");
	headerCol = headerCol.replace(/수/g,"Wed");
	headerCol = headerCol.replace(/목/g,"Thu");
	headerCol = headerCol.replace(/금/g,"Fri");
	headerCol = headerCol.replace(/토/g,"Sat");
	headerCol = headerCol.replace(/일/g,"Sun");

	headerCol = headerCol.replace(/\(/g,"");
	headerCol = headerCol.replace(/\)/g,"");
	headerCol = headerCol.replace(/Mon/g,"");
	headerCol = headerCol.replace(/Tue/g,"");
	headerCol = headerCol.replace(/Wed/g,"");
	headerCol = headerCol.replace(/Thu/g,"");
	headerCol = headerCol.replace(/Fri/g,"");
	headerCol = headerCol.replace(/Sat/g,"");
	headerCol = headerCol.replace(/Sun/g,"");
	
    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph2_Week() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'

	var colValue = 0;
	var header_day = "";
	var headerCol = "";
	var dataCol = "";
	
	var dataCol_W1 = "";
	var dayCnt_W1 = 0;
	var mean_W1 = 0;
	var sum_W1 = 0;
	var first_W1 = 0;

	var dataCol_G1 = "";
	var first_G1 = 0;
	var save_month = "";
	var cmp_month = "";
	
	var maxValue = 0;
	var rowCnt = GridObj3.GetRowCount();   //전년동주
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W1 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			
			if( i == 4||i == 8 || i == 12 || i == 16 || i ==20 || i ==24 || i == 28 || i==32 || i ==36 || i ==40 || i ==44 || i ==48 || i== 52|| i==56 || i==60){
				if (i == 60 ){
					sum_W1 = sum_W1 + colValue;
					dayCnt_W1++;
				}
				if(dayCnt_W1 > 0) {	
							
					mean_W1 = Math.round(sum_W1 / dayCnt_W1,0);
					for(var s=0; s<dayCnt_W1; s++) {
						if(first_W1 == 0) {
							dataCol_W1 = mean_W1;
							first_W1 = 1;
						}
						else {
							dataCol_W1 = dataCol_W1 + ',' + mean_W1;
						}
					}
				}
				dayCnt_W1 = 0;
				mean_W1 = 0;
				sum_W1 = 0;
			}
			else {
					sum_W1 = sum_W1 + colValue;
				
			}
	
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			dayCnt_W1++;

			// 이하는 월 구분 막대를 표시하기 위한 부분이다.
			if(first_G1 == 0) { 
				first_G1 = 1;
				dataCol_G1 = '0';
				headerCol = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));				
				save_month = cmp_month;
			}
			else if(cmp_month != save_month){
				dataCol_G1 = dataCol_G1 + ',X';
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));				
				save_month = cmp_month;
			}
			else {
				dataCol_G1 = dataCol_G1 + ',0';			
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));				
			}
		
		
		}	//61 for 문 종료
	}
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 30 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W2 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(i == 4|| i ==8 || i ==12 || i ==16 || i== 20 || i == 24 || i==28 || i==30 ){
				
				if (i == 30 ){
					sum_W2 = sum_W2 + colValue;
					dayCnt_W2++;
				}
				if(dayCnt_W2 > 0) {			
					mean_W2 = Math.round(sum_W2 / dayCnt_W2,0);
					for(var s=0; s<dayCnt_W2; s++) {
						if(first_W2 == 0) {
							dataCol_W2 = mean_W2;
							first_W2 = 1;
						}
						else {
							dataCol_W2 = dataCol_W2 + ',' + mean_W2;
						}
					}
				}
				dayCnt_W2 = 0;
				mean_W2 = 0;
				sum_W2 = 0;
			}
			else {
				
					sum_W2 = sum_W2 + colValue;
					
				
			}
				
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
		}
	}
	
	var dataCol_W3 = "";
	var dayCnt_W3 = 0;
	var mean_W3 = 0;
	var sum_W3 = 0;
	var first_W3 = 0;

	var gubnName_3 = GridObj.GetCellValueIndex(0,0);
	var rowCnt_3 = GridObj.GetRowCount();
	
	if(rowCnt_3 > 0){		
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj.GetCellValueIndex(Number(i+2),2));			
			header_day = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W2 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(i == 4||i == 8 || i == 12 || i == 16 || i ==20 || i ==24 || i == 28 || i==32 || i ==36 || i ==40 || i ==44 || i ==48 || i== 52|| i==56 || i==60){
				
				if (i == 60 ){
					sum_W3 = sum_W3 + colValue;
					dayCnt_W3++;
				}
				if(dayCnt_W3 > 0) {			
					mean_W3 = Math.round(sum_W3 / dayCnt_W3,0);
					for(var s=0; s<dayCnt_W3; s++) {
						if(first_W3 == 0) {
							dataCol_W3 = mean_W3;
							first_W3 = 1;
						}
						else {
							dataCol_W3 = dataCol_W3 + ',' + mean_W3;
						}
					}
				}
				dayCnt_W3 = 0;
				mean_W3 = 0;
				sum_W3 = 0;
			}
			else {
				
					sum_W3 = sum_W3 + colValue;
					
				
			}
				
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W3++;
		}
	}
	
	
	so.addVariable("line", "2,#CC3399," + "전년동주 월평균" + ",12,5");			
	var valuesId_1 = "values";
	so.addVariable(valuesId_1,dataCol_W1);

	so.addVariable("line_2", "2,#468024," + "과거30주 월평균" + ",12,5");			
	var valuesId_2 = "values_2";
	so.addVariable(valuesId_2,dataCol_W2);
	
	so.addVariable("line_3", "2,#0054FF," + "사용자예측  월평균" + ",12,5");			
	var valuesId_3 = "values_3";
	so.addVariable(valuesId_3,dataCol_W3);
	
	// X값을 최대값으로 치환해준다.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_4", "20,#00BBFF,"+"월구분"+",12");			
	var valuesId_6 = "values_4";
	so.addVariable(valuesId_6,dataCol_G1);

    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/월/g,"Mon");
	headerCol = headerCol.replace(/화/g,"Tue");
	headerCol = headerCol.replace(/수/g,"Wed");
	headerCol = headerCol.replace(/목/g,"Thu");
	headerCol = headerCol.replace(/금/g,"Fri");
	headerCol = headerCol.replace(/토/g,"Sat");
	headerCol = headerCol.replace(/일/g,"Sun");

	headerCol = headerCol.replace(/\(/g,"");
	headerCol = headerCol.replace(/\)/g,"");
	headerCol = headerCol.replace(/Mon/g,"");
	headerCol = headerCol.replace(/Tue/g,"");
	headerCol = headerCol.replace(/Wed/g,"");
	headerCol = headerCol.replace(/Thu/g,"");
	headerCol = headerCol.replace(/Fri/g,"");
	headerCol = headerCol.replace(/Sat/g,"");
	headerCol = headerCol.replace(/Sun/g,"");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function refresh(week_flag) {	
	
	var item_id 	= document.frm.item_id.value;
	var	item_name 	= document.frm.item_name.value;
	var simul_data  = document.frm.simul_data.value;
	var cnfm_date   = document.frm.cnfm_date.value;
	var no_flag   = document.frm.no_flag.value;	
	var three_mon   = document.frm.three_mon.value;		
	
	var week_flag	= week_flag;	
	
	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}
	//Simulation 일 경우 simul_data 필수
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0" ) {
			alert("Simulation의 값을 입력해주십시요!"); 
			
			return;
		}
	if(checked_button ==null) {
			alert("기준년도 값을 입력해주십시요!"); 
			
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop_check";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data_org=" + simul_data + "&cnfm_date=" + cnfm_date ;
	service_url += "&checked_button=" + checked_button + "&no_flag=" + no_flag + "&three_mon=" + three_mon;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1135, height=740, top=200, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();
	
}

function setExpectData(){
	
	var expect_data = document.frm.expect_data.value;
	
	if(expect_data =="") {
		
		alert("사용자 예측값이 비었습니다.");
		return;
	}
	
	var start_hd_name	= 'WEEK_30';
	var hd_name 		= start_hd_name;
	var hd_name_1 		= start_hd_name.substr(0,5);
	var hd_name_2 		= start_hd_name.substr(5,6);
	
	for(var j =0; j < 31; j++){
		
		GridObj.SetCellValue(hd_name, 2,  expect_data);
		hd_name_2 = Number(hd_name_2)+Number(1);	
						
		hd_name = hd_name_1+hd_name_2;			
		
		
	}
	
	gridSetStock();
		paintLineGraph2();
		
}


function sel_data_sum(obj){
	
	document.frm.totalSum.value = "0";
	
	var sel_data = GridObj.GetSelectedCells(); //
	var i=0;
	var rowNo=0;
	

	var gubn;

	/*  */
	var hd_name	= sel_data.split(",")[i*2+0];
	var rowNo   = sel_data.split(",")[i*2+1];
    

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 
			return;
		else {
				var hd_name	= sel_data.split(",")[i*2+0];
				var rowNo   = sel_data.split(",")[i*2+1];
		    			    
			    var sum     = Number(document.frm.totalSum.value);
			    var value   = Number(GridObj.GetCellValue(hd_name, rowNo));
		    	    
				
				document.frm.totalSum.value = sum + value;    
				
		}
		i++;
	}	
	

}


function sel_data_avg(obj){
	
	var totalAvg =  0;
	var totalAvg_r = 0;	
	var sel_data = GridObj.GetSelectedCells(); //
	
	var i=0;
	var rowNo=0;
	

	var gubn;

	/*  */
	var hd_name	= sel_data.split(",")[i*2+0];
	var rowNo   = sel_data.split(",")[i*2+1];
    

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 
			return;
		else {
				var hd_name	= sel_data.split(",")[i*2+0];
				var rowNo   = sel_data.split(",")[i*2+1];
		    			    
			    var sum     = Number(totalAvg) ;
			    var value   = Number(GridObj.GetCellValue(hd_name, rowNo));
		    	
				totalAvg = sum + value;
				
				
				document.frm.totalAvg.value = Math.round(totalAvg / (i+1)) ; 
				 
				
				
		}
		i++;
	}	
	
	 
}

function Add_Row(){
		
	GridObj.AddRow();
	GridObj.AddRow();
		
	var start_hd_name	= 'WEEK_30';
	var hd_name 		= start_hd_name;
	var hd_name_1 		= start_hd_name.substr(0,5);
	var hd_name_2 		= start_hd_name.substr(5,6);
	
	var yyyy_f = GridObj.GetCellValue('GUBN',3);
	var yyyy_s = GridObj.GetCellValue('GUBN',4); 
	
	GridObj.SetCellValue('GUBN', 6,  yyyy_f + ' ' + '증감');
	GridObj.SetCellValue('GUBN', 7,  yyyy_s + ' ' + '증감');
	
	for(var i=0; i < 31; i++ ){

		var val_2013 = (GridObj.GetCellvalue(hd_name,3)/GridObj.GetCellvalue(hd_name,4))-Number(1);
		var val_2012 = (GridObj.GetCellvalue(hd_name,4)/GridObj.GetCellvalue(hd_name,5))-Number(1);
		
		GridObj.SetCellValue(hd_name, 6, Math.round(val_2013*1000)/10 );
		GridObj.SetCellValue(hd_name, 7, Math.round(val_2012*1000)/10 );
		
		hd_name_2 = Number(hd_name_2)+Number(1);						
		hd_name = hd_name_1+hd_name_2;		
		
	}
	
}

function HeaderClick(strColumnKey){
	
	for(var i=30; i<61; i++){
			
			hd_name		= 'WEEK_'+i;				
			GridObj.SetColHDBgColor(hd_name,'243|243|243');
		}
	
	
	var cur_hd_idx	=	GridObj.GetColHDVisibleIndex(strColumnKey);	
	
	var time_fence  = 	GridObj.GetCellValue("TP_FLAG",2);
	
	var ip_hd_idx	=	Number(cur_hd_idx) - Number(time_fence) ;
	
	
	GridObj.SetColHDBgColor(GridObj.GetColHDVisibleKey(ip_hd_idx),'250|224|212');
	
	

}

function setColoring(){
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_pop_coloring",{
		callback:function(result){
			
			
			for(var i=0; i<30; i++){
				
				var hd_name = 'WEEK_' + i;
				if(result[0][i] == 'Y') {
					
					GridObj2.SetColHDBgColor(hd_name,  '255|216|216');
				}
				
			}
			
		
 
		}
		
	});   
}


function SetGap(){
		
		
		var term = GridObj.GetCellValue('TERM',0);		
		
		var leng = Number(term) + Number(31);
		
		var array = new Array();
		var array_sub = new Array();
		
		/* 판매량 순서 치환 - I */
		for(var i =30; i <leng; i++){
			
			var hd_name = 'WEEK_'+i;
			
			array[i] = GridObj.GetCellValue(hd_name,3);
			
			array_sub[leng-i-1] = array[i];
			
			
						
		}
		
		/* 판매량 순서 치환 - II*/		
		for(var i =30;i <leng; i++){
			
			var hd_name = 'WEEK_'+i;
			
			GridObj.SetCellValue(hd_name,3,array_sub[i-30]);
						
		}
		
		/* 차이량 계산 */		
		for(var i =30;i <leng; i++){
			
			var hd_name = 'WEEK_'+i;
			var expt    = GridObj.GetCellValue(hd_name,2);
			var sale    = GridObj.GetCellValue(hd_name,3);		
			
			GridObj.SetCellValue(hd_name,4,expt-sale);
						
		}
		
	
		
	}
