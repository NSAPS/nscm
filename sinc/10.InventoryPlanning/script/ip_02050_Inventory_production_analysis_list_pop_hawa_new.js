//## 프로그램ID		:	ip_02050_Inventory_production_analysis_list_pop_hawa_new.js
//## 프로그램명		:	공급적합성 사전분석 pop_up -주차별
//## 개발자          :	이강욱 
//## 개발일자       	:	2014-10-12
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  남웅용      create
//## 2.0 		2013-10-14  남웅용		조회순서 변경
//## 3.0 		2014-07-28  남웅용		그래프 조회기능 추가
//## 4.0		2014-11-24	이강욱		주차별 팝업창 신규 추가
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_02050_Inventory_production_analysis_list_pop_hawa_new';
var GridObj ; 													// WiseGrid 객체
var GridObj2 ; 													// WiseGrid 객체
var GridObj3 ; 													// WiseGrid 객체
var GridObj4 ; 													// WiseGrid 객체  

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
	//  
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


function setDefault4() { 

	GridObj4.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj4.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj4.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj4.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj4.strSelectedCellFgColor = '0|0|0'; 
	GridObj4.strMouseWheelAction='default'; // page 단위 scroll ->기본은 'default'   
    GridObj4.bStatusbarVisible = false;				// status bar visible 상태바 설정 

	// Header Font Setting
	GridObj4.strHDFontName = '맑은 고딕';
	GridObj4.nHDFontSize = 9;				  	// Font Size 9
	GridObj4.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj4.nHDLines = 1; 
}   
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var term_gubn	= "Week"; //주차별 팝업창이므로 Default로 선언
	
	
	commonUtil.getSelQeury( "item_id!%!term_gubn", item_id+"!%!"+term_gubn, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header",{
	callback:function(result){

		  	GridObj.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3		,90  ,false); //0   
		  	   

			for(var i=0 ; i < 61 ; i++){  //11 for(var i=0 ; i < 31 ; i++){  //11
				if(i < result.length) {
					if(i<21){
						GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,true); 
					}else{
						GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,0  ,true); 	
					}
					   
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,true);
					}
				}
			}
			
		GridObj.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
		setDefault();        	//화면 기본 설정 
	 
		/*pop up 창에서 와이즈 그리드 최초 설정을 위해 
		 * GoSearch 를 init 후에 실행  %중요% */
		GoSearch(); 
	// 
    		GridObj.SetColCellAlign('GUBN','center'); 

			GridObj.SetNumberFormat("DAY_00"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_01"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_02"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_03"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_04"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_05"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_06"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_07"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_08"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_09"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_10"  , "#,##0.#"); 
			GridObj.SetNumberFormat("DAY_11"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_12"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_13"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_14"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_15"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_16"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_17"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_18"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_19"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_20"  , "#,##0.#"); 
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   

}

function setHeader2(GridObj2) {
	// 재고 및 생산 적합성 분석 pop_up hearder (DW2 과거 30일 실적)        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header2",{
		callback:function(result){

		  	GridObj2.AddHeader("GUBN"	,"구분"      	,"t_text" 	,100.3	,60  ,false); //0
		  	GridObj2.AddHeader("AVG"	,"기간평균"      	,"t_number" ,100.3	,60  ,false); //0

			for(var i=0 ; i < 31 ; i++){  //11
				if(i < result.length) {
					GridObj2.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //11
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

			GridObj2.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_10"  , "#,##0");

			GridObj2.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_20"  , "#,##0"); 

			GridObj2.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_30"  , "#,##0"); 

			GridObj2.SetColFix('AVG'); 
 
		}
		
	});   

}

function setHeader3(GridObj3) {        
      //재고 및 생산 적합성 분석 pop_up hearder (DW3 전년 동일) -->  
      
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header3",{
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
			GridObj3.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_10"  , "#,##0");
 			GridObj3.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_20"  , "#,##0"); 
			GridObj3.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_30"  , "#,##0"); 			
 
			GridObj3.SetNumberFormat("DAY_31"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_32"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_33"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_34"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_35"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_36"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_37"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_38"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_39"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_40"  , "#,##0");
 			GridObj3.SetNumberFormat("DAY_41"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_42"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_43"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_44"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_45"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_46"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_47"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_48"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_49"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_50"  , "#,##0"); 
			GridObj3.SetNumberFormat("DAY_51"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_52"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_53"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_54"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_55"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_56"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_57"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_58"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_59"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_60"  , "#,##0");
			
			GridObj3.SetColFix('AVG'); 
			 			
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
   }

/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch2(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       //doQuery2();
   }
  
/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "CRUD");

}
      
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery() 
{
	//alert("00");
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var export_flag = document.frm.export_flag.value;
	

	//Simulation 일 경우 simul_data 필수
	if(week_flag == "plan") {
		GridObj.SetParam("mode", "search_plan");
	}else{
		GridObj.SetParam("mode", "search");
	}
	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj.SetParam("mode", "search3");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("week_flag", week_flag);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("export_flag", export_flag);
	   
	GridObj.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2() 
{
	//alert("11");
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("week_flag", week_flag);
	GridObj2.SetParam("simul_data", simul_data);
	   
	GridObj2.DoQuery(servlet_url);
}
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery3() 
{
	//alert(22);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("week_flag", week_flag);
	GridObj3.SetParam("simul_data", simul_data);
	   
	GridObj3.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value; 
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 ) 
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("week_flag", week_flag); 
	GridObj4.SetParam("simul_data", simul_data);
	   
	GridObj4.DoQuery(servlet_url);
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

                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()
	GridObj.SetCellBgColor('GUBN',   2, color_edit_col);
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
	GridObj.SetCellBgColor('DAY_11', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_12', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_13', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_14', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_15', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_16', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_17', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_18', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_19', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_20', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_21', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_22', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_23', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_24', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_25', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_26', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_27', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_28', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_29', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_30', 2, color_edit_col);

	GridObj.SetCellBgColor('DAY_31', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_32', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_33', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_34', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_35', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_36', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_37', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_38', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_39', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_40', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_41', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_42', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_43', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_44', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_45', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_46', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_47', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_48', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_49', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_50', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_51', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_52', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_53', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_54', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_55', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_56', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_57', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_58', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_59', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_60', 2, color_edit_col);

	
	GridObj.SetCellBgColor('GUBN',   3, color_edit_col);
	GridObj.SetCellBgColor('DAY_00', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_11', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_12', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_13', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_14', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_15', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_16', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_17', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_18', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_19', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_20', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_21', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_22', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_23', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_24', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_25', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_26', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_27', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_28', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_29', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_30', 3, color_edit_col);
	
	GridObj.SetCellBgColor('DAY_31', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_32', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_33', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_34', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_35', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_36', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_37', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_38', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_39', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_40', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_41', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_42', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_43', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_44', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_45', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_46', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_47', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_48', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_49', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_50', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_51', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_52', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_53', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_54', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_55', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_56', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_57', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_58', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_59', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_60', 3, color_edit_col);	
	

		
	doQuery2();
	doQuery3();
	//doQuery4();  
	
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
	
	doQuery2();
	doQuery3();
	//doQuery4();
}



/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery2() 
{
//alert("GridEndQuery2");
    var endMode = GridObj2.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search2") //조회가 완료된 경우
    {
        if(GridObj2.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
	paintLineGraph2();

}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery3() 
{
//alert("GridEndQuery2");
    var endMode = GridObj3.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search3") //조회가 완료된 경우
    {

        if(GridObj3.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }

	if(GridObj3.GetRowCount() > 0) GridObj3.SetCellFocus('DAY_30', 0, false);

	paintLineGraph2();

}


function test111(){
	GridObj3.SetRowScroll(0);
	GridObj3.MoveRow(0);
	GridObj3.SetCellFocus('DAY_55', 0, true);
	GridObj3.SetCellFocus('DAY_30', 0, true);
}


/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery4() 
{
//alert("GridEndQuery4");
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
	//cal_dw1()
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if(nRow == '0' || nRow == '1'|| nRow == '5'|| nRow == '6' ){
		//alert("기초재고는 수정이 불가능합니다");
		alert("해당 칼럼은 수정할수 없습니다.");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw1()	
	
}

function GridCellClick(strColumnKey, nRow) {
/*
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var gubnName = GridObj.GetCellValueIndex(0,nRow);
	var y_legend = 'BOX'
	if(gubnName =="가용일수" || gubnName =="재고일수") {
		y_legend = 'DAY'
	}
		
	gubnName = gubnName.replace(/\+/g,"" + '＋'); // 일반적인 + 기호는 표시되지 않으므로 기호에서 '＋' 가져옴

	var title = '('+gubnName+') '+item_id + ' / ' + item_name;	

	var x_legend = 'DATE'
	
	var headerCol = "";
	var dataCol = "";
	var maxValue = 0;
	var rowCnt = GridObj.GetRowCount();
	if(rowCnt > 0){		
		for(var i=0 ; i < 21 ; i++){  
			
			if(i==0){
				headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = GridObj.GetCellValueIndex(Number(i+1),nRow);
			}
			else {
				headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = dataCol + ','+ GridObj.GetCellValueIndex(Number(i+1),nRow);
			}				
			var colValue = Number(GridObj.GetCellValueIndex(Number(i+1),nRow));			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
		}
		paintLineGraph(gubnName, title, y_legend, x_legend, headerCol, dataCol, maxValue);
	}
*/ 
}

function CellClick_DW2(strColumnKey, nRow) {

	paintLineGraph2();
}

function CellClick_DW3(strColumnKey, nRow) {

	paintLineGraph2();
}

function paintLineGraph(gubnName, title, y_legend, x_legend, headerCol, dataCol, maxValue) {
	
	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	//so.addVariable("line_dot","2,#CC3399," + "전년동일 ±1Month" + ",12,5");			
	so.addVariable("line_dot","2,#CC3399," + gubnName + ",12,5");

	valuesId = "values";
//	linksId = "links";
	so.addVariable(valuesId,dataCol);
//	so.addVariable(linksId,linkString);	


	headerCol = headerCol.replace(/월/g,"Mon");
	headerCol = headerCol.replace(/화/g,"Tue");
	headerCol = headerCol.replace(/수/g,"Wed");
	headerCol = headerCol.replace(/목/g,"Thu");
	headerCol = headerCol.replace(/금/g,"Fri");
	headerCol = headerCol.replace(/토/g,"Sat");
	headerCol = headerCol.replace(/일/g,"Sun");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph2_All() {
	
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
			
			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W1 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(header_day == '일' || i == 60){
				if (i == 60 && colValue > 0){
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
				if(colValue > 0) {
					sum_W1 = sum_W1 + colValue;
				}
			}

			// 일요일, 0 일자 제거
			if(colValue <= 0 || header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			dayCnt_W1++;

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
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var dataCol_2 = "";
	var dataCol_W2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W2 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(header_day == '일' || i == 30){
				
				if (i == 30 && colValue > 0){
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
				if(colValue > 0) {
					sum_W2 = sum_W2 + colValue;
					
				}
			}
			
			// 일요일, 0 일자 제거
			if(colValue <= 0 || header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
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
		else {
			so.addVariable("line_dot_2", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_2);
		}		
	}

	so.addVariable("line_3", "2,#EE82EE," + "전년동일 주평균" + ",12,5");			
	var valuesId_3 = "values_3";
	so.addVariable(valuesId_3,dataCol_W1);

	so.addVariable("line_4", "2,#6DD66D," + "과거30일 주평균" + ",12,5");			
	var valuesId_4 = "values_4";
	so.addVariable(valuesId_4,dataCol_W2);

	// X값을 최대값으로 치환해준다.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_5", "20,#00BBFF,"+"월구분"+",12");			
	var valuesId_5 = "values_5";
	so.addVariable(valuesId_5,dataCol_G1);

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
			//if(colValue <= 0 || header_day == '일') continue;			
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
	var dataCol_2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 일요일, 0 일자 제거
			//if(colValue <= 0 || header_day == '일') continue;			
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
		else {
			so.addVariable("line_dot_2", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_2);
		}		
	}
	// X값을 최대값으로 치환해준다.
	
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"월구분"+",12");			
	var valuesId_5 = "values_3";	
	so.addVariable(valuesId_5,dataCol_G1);

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
	var rowCnt = GridObj3.GetRowCount();
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W1 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(header_day == '일' || i == 60){
				if (i == 60 && colValue > 0){
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
				if(colValue > 0) {
					sum_W1 = sum_W1 + colValue;
				}
			}

			// 일요일, 0 일자 제거
			if(colValue <= 0 || header_day == '일') continue;			
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
		}
	}
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();

	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 주간단위 평균 그래프 구하기 위한 부분
			// 월요일부터 일자를 더해간다. 일요일을 만나면 초기화, 판매수량 < 0이면 제외
			// 주평균= 판매수량/날짜갯수
			// dataCol_W2 = 주평균,주평균,주평균,주평균,... --> 날짜갯수만큼 만든다
			if(header_day == '일' || i == 30){
				
				if (i == 30 && colValue > 0){
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
				if(colValue > 0) {
					sum_W2 = sum_W2 + colValue;
					
				}
			}
			
			// 일요일, 0 일자 제거
			if(colValue <= 0 || header_day == '일') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
		}
	}

	so.addVariable("line", "2,#CC3399," + "전년동일 주평균" + ",12,5");			
	var valuesId_3 = "values";
	so.addVariable(valuesId_3,dataCol_W1);

	so.addVariable("line_2", "2,#468024," + "과거30일 주평균" + ",12,5");			
	var valuesId_4 = "values_2";
	so.addVariable(valuesId_4,dataCol_W2);

	// X값을 최대값으로 치환해준다.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"월구분"+",12");			
	var valuesId_5 = "values_3";
	so.addVariable(valuesId_5,dataCol_G1);

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

function paintLineGraph3() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'
	
	var headerCol = "";
	var dataCol = "";
	var maxValue = 0;
	var nRow = 0;
	var vColor = "";
	
	for(var k=0 ; k < 5 ; k++){  	
		if(k == 0) {
			nRow = 0;
			vColor = '#CC3399';
			valuesId = "values";
		}
		else if(k == 1) {
			nRow = 2;
			vColor = '#468024';
			valuesId = "values_2";
		}
		else if(k == 2) {
			nRow = 3;
			vColor = '#00BBFF';
			valuesId = "values_3";
		}
		else if(k == 3) {
			nRow = 4;
			vColor = '#0000FF';
			valuesId = "values_4";
		}
		else {
			nRow = 5;
			vColor = '#FFFF00';
			valuesId = "values_5";
		}

		for(var i=0 ; i < 21 ; i++){  
			
			if(i==0){
				headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = GridObj.GetCellValueIndex(Number(i+1),nRow);
			}
			else {
				headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = dataCol + ','+ GridObj.GetCellValueIndex(Number(i+1),nRow);
			}				
			var colValue = Number(GridObj.GetCellValueIndex(Number(i+1),nRow));			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
		}
		var gubnName = GridObj.GetCellValueIndex(0,nRow);
		gubnName = gubnName.replace(/\+/g,"" + '＋'); // 일반적인 + 기호는 표시되지 않으므로 기호에서 '＋' 가져옴
		if(k==0)	so.addVariable("line_dot","2,"+ vColor+"," + gubnName + ",12,5");
		else {
			so.addVariable("line_dot_"+Number(k+1),"2,"+ vColor+"," + gubnName + ",12,5");
		}
		so.addVariable(valuesId,dataCol);

	}
	
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

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

/*┌──────────────────────────────────┐
  │DW 1 전개제고 연산
  └──────────────────────────────────┘*/
function cal_dw1() {
	
		
	var	hd_name;
	var start_idx	= 0;
	var last_idx	= 6;
	
	var base_stock	= 0; //기초재고
	var chgo_qty	= 0; //판매평균
	var ipgo_qty	= 0; //주간입고량
	
	var stock_dqy	= 0; //재고일수
	var next_stock;
	
	//var gy_base_stock	= 0; // 가용기초재고
	//var gy_stock_day	= 0; // 가용 재고일수	
	//var gy_next_stock;
	
	var start_hd_name = 'DAY_00';
	
	hd_name = start_hd_name;
	hd_name_1 = start_hd_name.substr(0,5);
	hd_name_2 = start_hd_name.substr(5,6);

// 괄호는 쿼리수행시 순서
// 1 기초재고 -> 1 기초재고
// 2 재고주수 -> 2 재고일수
// 3 판매평균 -> 3 3주+1주
// 4 주간입고량 -> 4 주간입고량



		base_stock	= Number(GridObj.GetCellValue(start_hd_name, 0)); // 원래 0
		chgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 2)); // 원래 2
		ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 3)); // 원래 3
		//gy_ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 1)); // 원래 4
		
		if(chgo_qty == 0){
			stock_dqy	= 99999;
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
		}
		
		
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
		//가용재고 전개..
		//gy_base_stock = Number(GridObj.GetCellValue(start_hd_name, 4)); // 원래 0
		//GridObj.SetCellValue(hd_name, 0,  gy_base_stock); // 원래 5
		
//		if(chgo_qty == 0){
//			gy_stock_dqy	= 99999;
//		}else{
//			gy_stock_dqy	= Math.round((gy_base_stock/chgo_qty)*10)/10;
//		}
//		
//		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + ipgo_qty);
//		

	for (i=0; i < 61 ; i++) {

		GridObj.SetCellValue(hd_name, 1,  stock_dqy); // 원래 1
		//GridObj.SetCellValue(hd_name, 1,  gy_stock_dqy); // 원래 6
		
		hd_name_2 = Number(hd_name_2)+Number(1);

		if(i == 9){
			hd_name_1 =hd_name_1.substr(0,4);
		}else{

		}
		
		hd_name = hd_name_1+hd_name_2;

		if(i == 60){  // 마지막  열은 다을 날이 없으니 루프를 종료 시킨다. 
			return; 
		}
		GridObj.SetCellValue(hd_name, 0,  next_stock);					// 원래 0
		//GridObj.SetCellValue(hd_name, 0,  gy_next_stock); //가용재고량	// 원래 5

		base_stock	= Number(GridObj.GetCellValue(hd_name, 0));	// 원래 0
		chgo_qty	= Number(GridObj.GetCellValue(hd_name, 2));	// 원래 2
		ipgo_qty	= Number(GridObj.GetCellValue(hd_name, 3));	// 원래 3
		
		//gy_base_stock	= Number(GridObj.GetCellValue(hd_name, 0)); // 원래 5
		//gy_ipgo_qty		= Number(GridObj.GetCellValue(hd_name, 3)); // 원래 4
		
		


		
		if(chgo_qty == 0){  // 출고 수량이 0 일인 날짜는 휴일이다!!!
			stock_dqy	= 0;
			//gy_stock_dqy= 0;			
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
			//gy_stock_dqy= Math.round((gy_base_stock/chgo_qty)*10)/10;
		}
		
		//alert("base_stock="+base_stock);
		//alert("chgo_qty="+chgo_qty);

		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
		//gy_next_stock	= Math.round(gy_base_stock - chgo_qty + ipgo_qty);
		
 
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

	//Simulation 일 경우 simul_data 필수
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation의 값을 입력해주십시요!"); 
			document.frm.simul_data.select();
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();
	
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
		    	    
				if(GridObj.GetCellValue(hd_name, rowNo)=="GUBN"){	
					alert(" ");
					return;
				}
				else{
				document.frm.totalSum.value = sum + value;    
				}
		}
		i++;
	}	
	

}