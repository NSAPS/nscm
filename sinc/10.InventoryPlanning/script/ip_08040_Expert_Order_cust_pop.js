//## 프로그램ID		:	ip_08040_Expert_Order_cust_pop.js
//## 프로그램명      	 : 거래선별 주문관리
//## 변경자            	 : 이강욱
//## 개발일자        	 : 2016-03-23
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_08.xml
//##        
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_08040_Expert_Order_cust_pop';
var GridObj ; 													// WiseGrid 객체
var GridObj2 ; 													// WiseGrid 객체
var GridObj3 ; 													// WiseGrid 객체

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


/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj.nHDLineSize         = 10; //Header Size 
    //GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '맑은 고딕';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
    
    GridObj.bStatusbarVisible = true;				// status bar visible 상태바 설정 
 
}

/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {   
	
	   
    GridObj.AddHeader("CUST_CODE"		,"거래선코드"  	,"t_text" 	,100	,70 	,false); //0    
 	GridObj.AddHeader("CUST_NAME"		,"거래선명"    	,"t_text" 	,100	,240  	,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"제품코드"  		,"t_text" 	,100	,80  	,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"제품명"  		,"t_text" 	,100	,240  	,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"주문량"    		,"t_number" ,100.3	,70  	,false); //0
 	GridObj.AddHeader("PLAN_QTY"		,"주간\n생산계획량"	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("PROD_QTY"		,"생산량"			,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("EXPT_QTY"		,"생산예정량"		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOTAL_QTY"		,"총 공급량"		,"t_number"  	,100.3		,80    ,false); //0
 	
 	
 	//GridObj.AddHeader("WARE_HOUSE"		,"작업장"  		,"t_text" 	,100	,70  	,false); //0
	//GridObj.AddHeader("GUBN"			,"Closing TIME"	,"t_text" 	,100	,70  	,false); //0  
	//GridObj.AddHeader("SHIPPLAN_DATE"	,"선적일"			,"t_text" 	,100	,70  	,false); //0 
	
	GridObj.BoundHeader();		
	
	GridObj.SetColCellAlign('CUST_CODE',  	'center');
	GridObj.SetColCellAlign('ITEM_ID',  	'center');
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("PLAN_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("EXPT_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("TOTAL_QTY",       	"###,###.#");

	setDefault();        	//화면 기본 설정 	 
	GoSearch(); 			//pop up 창에서 와이즈 그리드 최초 설정을 위해 GoSearch 를 init 후에 실행  %중요%

	
}

   
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
 
       doQuery();
   }

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc  
  └──────────────────────────────────┘*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var cust_code	= document.frm.cust_code.value;
	var cust_name	= document.frm.cust_name.value;
	var cnfm_date	= document.frm.cnfm_date.value;
	var mto_gubn	= document.frm.mto_gubn.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cust_code", cust_code);
	GridObj.SetParam("cust_name", cust_name);
	GridObj.SetParam("mto_gubn",   		mto_gubn);
	GridObj.SetParam("cnfm_date", cnfm_date);
	   
	GridObj.DoQuery(servlet_url);
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
			GridSetMerge();		

                   
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}







function GridSetMerge(){	
	
         	   
 	GridObj.SetGroupMerge('CUST_CODE,CUST_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '거래선별 계', 'CUST_CODE', 'sum', 'ORDER_QTY,PLAN_QTY,PROD_QTY,EXPT_QTY,TOTAL_QTY');
    GridObj.AddSummaryBar('SUMMARY2', '전체 계'	, 'summaryall', 'sum', 'ORDER_QTY,PLAN_QTY,PROD_QTY,EXPT_QTY,TOTAL_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
         	   
}