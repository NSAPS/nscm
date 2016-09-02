//## 프로그램ID      : ip_01140_inventoryPlanAnalysis_md_list.js
//## 프로그램명      : 수입상품  재고 추이 분석
//## 변경자자        : 이강욱
//## 개발일자        : 2015-04-23
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-04-23  이강욱      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_01140_inventoryPlanAnalysis_md_list';

var GridObj ; 													// WiseGrid 객체
var color_tot 		 = '234|234|234';			//합계 라인 배경색
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';			//라인 선택 배경색 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
            tableHeightValue += Number(search_h);   
        } 
        
        // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
        // ==> 화면이 더이상 축소되지 않음 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
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
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj.nHDLineSize         = 10; //Header Size
     
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
    
    
    
   
    //선택된 셀의 글자색 지정한다.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다
	GridObj.strActiveRowBgColor    = "232|245|213";    //선택된 행의 배경색상을 설정한다.	
    GridObj.strHDClickAction 	   = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
    GridObj.strMouseWheelAction='page';
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("ROWNUM"	   		   ,"순서"  			,"t_number"    ,100.3	,40     ,false); //0
	GridObj.AddHeader("SALES_CAT05"	       ,"대분류"			,"t_text"	   ,100	    ,0      ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"소분류"			,"t_text"	   ,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"품목코드"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"품목명"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"규격"	    	,"t_text"  	   ,100		,90     ,false); //0
 	GridObj.AddHeader("BOM_FLAG"	       ,"BOM_FLAG"	    ,"t_text"  	   ,100		,0      ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"기초재고"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("PROD_TERM"  		   ,"통관\n경과일수"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"재고일수"       ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_DAY2"	       ,"재고일수"       ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_WEEK"	       ,"재고주수"       ,"t_number"    ,100.3	,60     ,false); //0 
 	GridObj.AddHeader("LEAD_TIME"	   	   ,"리드타임"      			,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("LEAD_TIME2"	   	   ,"리드타임"      			,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("PR_TO_PO"	   	   ,"리드타임\nPR->PO"      	,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("PO_TO_LC"	       ,"리드타임\nPO->LC"      	,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("LC_TO_PORT"	       ,"리드타임\nLC->입항"    	,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("PORT_TO_CUST"	   ,"리드타임\n입항->통관"  	,"t_number"    	,100.3	,70     ,false); //0	
 	GridObj.AddHeader("SALES_PRE"	       ,"전일계"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"일계"       	,"t_number"    ,100.3	,60     ,false); //0 	
    GridObj.AddHeader("SALES_SUM"	       ,"당월누계"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("PRE_MONTH_SELL"	   ,"전월계"	    	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"예상재고"		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("DY_STOCK"	       ,"동양재고"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("DY_STOCK2"	       ,"동양재고"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("GITA_STOCK"	       ,"기타재고"	    ,"t_number"    ,100.3	,60     ,false); //0 	
 	GridObj.AddHeader("OUT_STOCK"	       ,"사외재고"	    ,"t_number"    ,100.3	,60     ,false); //0
 	
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_M"    ,"1-10"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_M2"   ,"11-20"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_M3"   ,"21-30"	,"t_number"    ,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_1" ,"수입예정\nM+1"	,"t_number"    ,100.3	,70     ,false); //0 	
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_2" ,"수입예정\nM+2"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_3" ,"수입예정\nM+3"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_4" ,"수입예정\nM+4"	,"t_number"    ,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("TOTAL_AVL_QTY"	   ,"총공급\n가능량"	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("TOTAL_AVL_DAY"	   ,"총공급\n가능일수","t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("TOTAL_AVL_DAY2"	   ,"총공급\n가능일수","t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("TOT_STOCK_WEEK"	   ,"총공급\n가능주수","t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1MON"    ,"1개월\n주평균"	,"t_number"    ,100.3	,70     ,false); //0
	GridObj.AddHeader("SALES_MEAN_1MON2"   ,"1개월\n주평균"	,"t_number"    ,100.3	,70     ,false); //0
	GridObj.AddHeader("SALES_MEAN_3MON2"   ,"3개월\n주평균"	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3MON"    ,"3개월\n주평균"	,"t_number"    ,100.3   ,70     ,false) //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1주평균"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3주평균"		,"t_number"    ,100.3   ,70     ,false) //0 	         
   
 	GridObj.AddHeader("SALES_SUM_PY"       ,"전년동월"		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_MON"    	   ,"전년동월\n대비"	,"t_number"    ,100.3   ,60     ,false); //0 	
 	
 	GridObj.AddHeader("THIS_YEAR_SUM"      ,"금년누계"	   	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"전년누계"		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"전년누계\n대비"	,"t_number"    ,100.3   ,60     ,false); //0
	
 	GridObj.AddHeader("WEEK_DEV_1_3"       ,"1/3주평균\n편차"	,"t_number"    ,100.3   ,0     ,false); //0
 	GridObj.AddHeader("DEV_PER"            ,"편차비율"	    ,"t_number"    ,100.3   ,0     ,false); //0
 	
 	
 	GridObj.AddHeader("STOCK_HIDDEN"  	   ,"경과일수히든"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_HIDDEN"  	   ,"유통기한히든"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"유통기한"				,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"유통기한\n경과율"		,"t_text"    	,100	,70     ,false); //0
 	GridObj.AddHeader("BASE_STOCK_PALLET"  ,"기초재고\n(PALLET)"		,"t_number"     ,100.3	,75     ,false); //0
 	GridObj.AddHeader("BASE_STOCK_PALLET2" ,"기초재고\n(PALLET)"		,"t_number"     ,100.3	,75     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT_PALLET"  ,"예상재고\n(PALLET)"		,"t_number"     ,100.3	,75     ,false); //0	
 	
 	GridObj.AddHeader("NWGT_PER_BUOM"  	   ,"기초재고\n중량(t)"			,"t_number"       ,100.3	,80     ,false); //0
 	GridObj.AddHeader("MON_IN_CUM_BUOM"    ,"당월수입\n누계중량(t)"		,"t_number"       ,100.3	,80     ,false); //0
 	
 	GridObj.AddHeader("YEAR_IN_CUM"  	   ,"금년수입\n누계"			,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_IN_CUM_BUOM"   ,"금년수입\n누계중량(t)"	,"t_number"       ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_IN_CUM_BUOM2"  ,"금년수입\n누계중량"		,"t_number"       ,100.3	,80     ,false); //0
 	
 	GridObj.AddHeader("MON_SALE_CUM"  	   ,"당월판매\n누계중량(t)"		,"t_number"       ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_SALE_CUM_BUOM" ,"금년판매\n누계중량(t)"		,"t_number"       ,100.3	,80     ,false); //0
 	
 	
 
	/* 저장을 위한 히든 값 */
	
	GridObj.AddGroup	("PROD_PLAN",   "수입예정M");			
	GridObj.AppendHeader("PROD_PLAN", 	"RECEIPT_EXPT_SUM_M");
	GridObj.AppendHeader("PROD_PLAN", 	"RECEIPT_EXPT_SUM_M2");
	GridObj.AppendHeader("PROD_PLAN", 	"RECEIPT_EXPT_SUM_M3");

	GridObj.BoundHeader();	
	GridObj.SetColHDBgColor('STOCK_EXPT',  '225|255|54');
	
	GridObj.SetColHide("SALES_MEAN_1MON2", 	true);
	GridObj.SetColHide("SALES_MEAN_3MON2", 	true);
	GridObj.SetColHide("SALES_MEAN_1WEEK", 	true);
	GridObj.SetColHide("SALES_MEAN_3WEEK", 	true);
	GridObj.SetColHide("BASE_STOCK_PALLET2",true);
	GridObj.SetColHide("STOCK_EXPT_PALLET", true);
	GridObj.SetColHide("YEAR_IN_CUM", 		true);
	//GridObj.SetColHide("YEAR_IN_CUM_BUOM",  true);
	GridObj.SetColHide("YEAR_IN_CUM_BUOM2", true);
	
	GridObj.SetColHide("LEAD_TIME2", 	true);
	GridObj.SetColHide("PR_TO_PO", 		true);
	GridObj.SetColHide("PO_TO_LC", 		true);
	GridObj.SetColHide("LC_TO_PORT", 	true);
	GridObj.SetColHide("PORT_TO_CUST", 	true);
	
	GridObj.SetColHide("DY_STOCK2", 	true);
	GridObj.SetColHide("GITA_STOCK", 	true);
	GridObj.SetColHide("OUT_STOCK", 	true);
	
	GridObj.SetColHide("STOCK_DAY2", 	true);
	GridObj.SetColHide("STOCK_WEEK", 	true);
	
	GridObj.SetColHide("TOTAL_AVL_DAY2", 	true);
	GridObj.SetColHide("TOT_STOCK_WEEK", 	true);
	
	//GridObj.SetColHDBgColor('SALES_MEAN_1MON',	'253|228|229');
	//GridObj.SetColHDBgColor('SALES_MEAN_3MON',	'253|228|229');
	GridObj.SetColHDBgColor('BASE_STOCK_PALLET','253|228|229');
	//GridObj.SetColHDBgColor('YEAR_IN_CUM_BUOM',	'253|228|229');
	GridObj.SetColHDBgColor('LEAD_TIME',	'253|228|229');
	GridObj.SetColHDBgColor('DY_STOCK',		'253|228|229');
//	GridObj.SetColHDBgColor('STOCK_DAY',	'253|228|229');
//	GridObj.SetColHDBgColor('TOTAL_AVL_DAY',	'253|228|229');
	
	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('ROWNUM',        	  'center');
	GridObj.SetColCellAlign('SALES_CAT05',        'left');
	GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right');
    GridObj.SetColCellAlign('STOCK_WEEK',        'right');
    GridObj.SetColCellAlign('TOTAL_AVL_QTY',     'right'); 
    GridObj.SetColCellAlign('TOTAL_AVL_DAY',     'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right');
    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('PROD_TERM',         'right'); 
    GridObj.SetColCellAlign('TERM_VAL',        	 'right');
    GridObj.SetColCellAlign('TERM_PER',          'right'); //유통기한 경과율
    GridObj.SetColCellAlign('SALES_CUR',         'right'); //누계
    GridObj.SetColCellAlign('STOCK_EXPT',        'right'); //예상재고
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right'); //전월계
    //GridObj.SetColCellAlign('SALES_SUM',         'right');
    //GridObj.SetColCellAlign('RECEIPT_EXPT',      'right'); //생산 계획
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_M',  'right'); //생산 누적
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_1',  'right'); //생산 누적
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_2',  'right'); //생산 누적
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_3',  'right'); //생산 누적
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_4',  'right'); //생산 누적
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');
    GridObj.SetColCellAlign('WEEK_DEV_1_3',      'right');
    GridObj.SetColCellAlign('DEV_PER',           'right'); //편차비율
    GridObj.SetColCellAlign('SALES_SUM_PY',      'right');  //추가 : 2014-05-02 전년동월 누계
    GridObj.SetColCellAlign('THIS_YEAR_SUM',     'right'); //추가 : 2014-04-30 년누계
    GridObj.SetColCellAlign('LAST_YEAR_SUM',  	 'right'); //추가 : 2014-04-30 전년누계
    GridObj.SetColCellAlign('SUB_PY_MON',   	 'right'); //전년동월 대비
    GridObj.SetColCellAlign('SUB_PY_YEAR',    	 'right'); //전년누계 대비
    GridObj.SetColCellAlign('BASE_STOCK_PALLET', 'right');
    GridObj.SetColCellAlign('BASE_STOCK_PALLET2','right');
    GridObj.SetColCellAlign('STOCK_EXPT_PALLET', 'right');
    GridObj.SetColCellAlign('NWGT_PER_BUOM', 	 'right');
    GridObj.SetColCellAlign('MON_IN_CUM_BUOM', 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM', 	 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM_BUOM',  'right');
    GridObj.SetColCellAlign('MON_SALE_CUM', 	 'right');
    GridObj.SetColCellAlign('YEAR_SALE_CUM_BUOM','right');
  	
    
    GridObj.SetNumberFormat("BASE_STOCK",       	"###,###.#");    
    GridObj.SetNumberFormat("STOCK_DAY",        	"###,###.#");    
    GridObj.SetNumberFormat("STOCK_WEEK",        	"###,###.#");
    GridObj.SetNumberFormat("TOTAL_AVL_DAY",        "###,###.#");
    GridObj.SetNumberFormat("TOTAL_AVL_QTY",        "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        	"###,###.#");
    //GridObj.SetNumberFormat("STOCK_HIDDEN",     "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM",       		"###,###.#");
    GridObj.SetNumberFormat("TERM_VAL",       		"###,###.#");
    //GridObj.SetNumberFormat("TERM_PER",         	"###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       	"###,###.#");
    //GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM_PY",     	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_M", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_M3", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_M2", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_1", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_2", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_3", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_4", 	"###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", 	"###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", 	"###,###.#");
    GridObj.SetNumberFormat("WEEK_DEV_1_3",     	"###,###.#");
    GridObj.SetNumberFormat("DEV_PER",          	"###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   	"###,###.#");
    GridObj.SetNumberFormat("THIS_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("LAST_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_MON",   		"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_YEAR",   		"###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK_PALLET",	"###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK_PALLET2",	"###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT_PALLET",	"###,###.#");
    
    GridObj.SetNumberFormat("SALES_MEAN_1MON",   "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1MON2",  "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3MON",   "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3MON2",  "###,###.#");
    GridObj.SetNumberFormat("NWGT_PER_BUOM",   		"###,##0.##");
    GridObj.SetNumberFormat("MON_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("YEAR_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("YEAR_IN_CUM",   		"###,##0.##");
    GridObj.SetNumberFormat("MON_SALE_CUM",   		"###,##0.##");
    GridObj.SetNumberFormat("YEAR_SALE_CUM_BUOM",   "###,##0.##");
    
    GridObj.SetNumberFormat("LEAD_TIME",   	"###,###.#");
    GridObj.SetNumberFormat("LEAD_TIME2",   "###,###.#");
    GridObj.SetNumberFormat("PR_TO_PO",   	"###,###.#");
    GridObj.SetNumberFormat("PO_TO_LC",   	"###,###.#");
    GridObj.SetNumberFormat("LC_TO_PORT",	"###,###.#");
    GridObj.SetNumberFormat("PORT_TO_CUST",	"###,###.#");
    
    GridObj.SetNumberFormat("DY_STOCK",		"###,###.#");
    GridObj.SetNumberFormat("DY_STOCK2",	"###,###.#");	
    GridObj.SetNumberFormat("GITA_STOCK",	"###,###.#");
    GridObj.SetNumberFormat("OUT_STOCK",	"###,###.#");
	
	//GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	//GridObj.SetColHide("CRUD",true);
	
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            		GridSetMerge();
            		SetBomFlag();	
            	
            
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
    
     
		
    }


/*┌──────────────────────────────────┐
  │그리드의 원 클릭 이벤트
  └──────────────────────────────────┘*/
               
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
    	
    	doQuery();
    
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
	function GoSave(service) {	
	
	};


/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
       var sales_cat05		= document.all.sales_cat05.value;
       var sales_cat03		= document.all.sales_cat03.value;
 
	   var user_id			= document.all._user_id.value;
       
       var search_item	    = document.all.search_item.value;              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
       GridObj.SetParam("sales_cat05", sales_cat05);	   
	   GridObj.SetParam("sales_cat03", sales_cat03);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);	   
	   GridObj.DoQuery(servlet_url);       
   }


	// 셀 저장 전역변수
	var objTdG;


	// 날짜 검색 POP BTN mouseOver
	function overBtn( objBtn ) {
		clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
	}

	// 날짜 검색 POP BTN mouseOut
	function outBtn( objBtn ) {
		clickedDateIdx = null;	
	}

/*┌──────────────────────────────────┐
  │그리드의 원 클릭 이벤트
  └──────────────────────────────────┘*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

	function GridCellDblClick(strColumnKey, nRow){	
		
		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
		var cnfm_date	= document.frm.end_date.value;
		var gubn		= '1';

		
		
			if(strColumnKey == 'STOCK_EXPT'){
				
//				var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
//				service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date;  
//				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1055, height=740, top=50, left=150";
//				var newWin = window.open(service_url, "", pop_win_style);
//				newWin.focus();	
				var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop";
				service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date ;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=740, top=50, left=200";
				var newWin = window.open(service_url, "", pop_win_style);
					newWin.focus();	
				
			}else{
				
				var service_url = "service.do?_moon_service=ip_01140_inventoryPlanAnalysis_md_list_pop";
				service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date + "&gubn=" + gubn;  
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1295, height=340, top=200, left=150";
				var newWin = window.open(service_url, "", pop_win_style);
				newWin.focus();		
			}
			
			
			
		

	}

/*Sort 변수 선언 */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_base_stock = '1';
	var flag_stock_day = '1';
	var flag_prod_term = '1';
	var flag_term_val = '1';
	var flag_term_per = '1';
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';
	
	var flag_sales_sum = '1';
	var flag_stock_expt = '1';
	var flag_pre_month_sell = '1';	
	var flag_receipt_expt_sum_m = '1';
	var flag_receipt_expt_sum_m2 = '1';
	var flag_receipt_expt_sum_m3 = '1';
	var flag_receipt_expt_sum_1 = '1';
	var flag_receipt_expt_sum_2 = '1';
	var flag_receipt_expt_sum_3 = '1';
	var flag_week_dev_1_3 = '1';
	var flag_dev_per = '1';
	var flag_sales_sum_py = '1';
	
	var flag_this_year_sum = '1';
	var flag_last_year_sum = '1';
	var flag_sum_py_mon = '1';
	var flag_sum_py_year = '1';
	
	var flag_nwgt_per_buom ='1'
	var flag_mon_in_cum_buom = '1';
	var flag_mon_sale_cum = '1';
	var flag_year_sale_cum_buom = '1';
	
	var flag_year_in_cum_buom = '1';
	var flag_total_avl_day='1';
	var flag_total_avl_qty='1';
	var flag_stock_day='1';
	
	var lead_time_idx = 0 ;
	var	dy_stock_idx = 0;
	var sales_mean_1mon_idx = 0 ;
	var sales_mean_3mon_idx = 0 ;
	var total_avl_day_idx = 0;
	var base_stock_pallet_idx =0 ;
	var stock_day_idx =0 ;
	var total_avl_day_idx = 0;
	

	function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('BASE_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('TOTAL_AVL_QTY'	,true);
	GridObj.SetColCellSortEnable('TOTAL_AVL_DAY'	,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('STOCK_EXPT'		,true);
	GridObj.SetColCellSortEnable('PRE_MONTH_SELL'	,true);
	//GridObj.SetColCellSortEnable('RECEIPT_EXPT'		,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_M'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_M2'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_M3'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_1'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_2'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_3'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_1MON'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3MON'	,true);
	GridObj.SetColCellSortEnable('WEEK_DEV_1_3'		,true);
	GridObj.SetColCellSortEnable('DEV_PER'			,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM_PY'		,true);
	GridObj.SetColCellSortEnable('THIS_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('LAST_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('SUB_PY_MON'		,true);
	GridObj.SetColCellSortEnable('SUB_PY_YEAR'		,true);	
	
	GridObj.SetColCellSortEnable('NWGT_PER_BUOM'		,true);
	GridObj.SetColCellSortEnable('MON_IN_CUM_BUOM'		,true);
	GridObj.SetColCellSortEnable('MON_SALE_CUM'			,true);
	GridObj.SetColCellSortEnable('YEAR_SALE_CUM_BUOM'	,true);
	
	
	/* 리드타임 */
	if(strColumnKey == "LEAD_TIME"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(lead_time_idx == 0) {
				
				if(i==0) GridObj.SetColHDText("LEAD_TIME",GridObj.GetColHDText("PR_TO_PO"));
				GridObj.SetCellValue('LEAD_TIME',i,GridObj.GetCellValue("PR_TO_PO", i));
				
			}else if (lead_time_idx == 1){
				
				if(i==0) GridObj.SetColHDText("LEAD_TIME",GridObj.GetColHDText("PO_TO_LC"));
				GridObj.SetCellValue('LEAD_TIME',i,GridObj.GetCellValue("PO_TO_LC", i));
			}else if (lead_time_idx == 2){
				
				if(i==0) GridObj.SetColHDText("LEAD_TIME",GridObj.GetColHDText("LC_TO_PORT"));
				GridObj.SetCellValue('LEAD_TIME',i,GridObj.GetCellValue("LC_TO_PORT", i));
			}else if (lead_time_idx == 3){
				
				if(i==0) GridObj.SetColHDText("LEAD_TIME",GridObj.GetColHDText("PORT_TO_CUST"));
				GridObj.SetCellValue('LEAD_TIME',i,GridObj.GetCellValue("PORT_TO_CUST", i));
			}else if (lead_time_idx == 4){
				
				if(i==0) GridObj.SetColHDText("LEAD_TIME",GridObj.GetColHDText("LEAD_TIME2"));
				GridObj.SetCellValue('LEAD_TIME',i,GridObj.GetCellValue("LEAD_TIME2", i));
			}					
							
		}
		lead_time_idx++;
		if(lead_time_idx == 5)	lead_time_idx = 0;
		
		
		
	}
	else if(strColumnKey == "DY_STOCK"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(dy_stock_idx == 0) {
				
				if(i==0) GridObj.SetColHDText("DY_STOCK",GridObj.GetColHDText("GITA_STOCK"));
				GridObj.SetCellValue('DY_STOCK',i,GridObj.GetCellValue("GITA_STOCK", i));
				
			}else if (dy_stock_idx == 1){
				
				if(i==0) GridObj.SetColHDText("DY_STOCK",GridObj.GetColHDText("OUT_STOCK"));
				GridObj.SetCellValue('DY_STOCK',i,GridObj.GetCellValue("OUT_STOCK", i));
			}else if (dy_stock_idx == 2){
				
				if(i==0) GridObj.SetColHDText("DY_STOCK",GridObj.GetColHDText("DY_STOCK2"));
				GridObj.SetCellValue('DY_STOCK',i,GridObj.GetCellValue("DY_STOCK2", i));
			}			
							
		}
		dy_stock_idx++;
		if(dy_stock_idx == 3)	dy_stock_idx = 0;
		
	}
//	else if(strColumnKey == "SALES_MEAN_1MON"){
//		for(var i=0; i < GridObj.GetRowCount();i++ ) {
//			
//			if(sales_mean_1mon_idx == 0) {
//				
//				if(i==0) GridObj.SetColHDText("SALES_MEAN_1MON",GridObj.GetColHDText("SALES_MEAN_1WEEK"));
//				GridObj.SetCellValue('SALES_MEAN_1MON',i,GridObj.GetCellValue("SALES_MEAN_1WEEK", i));
//				
//			}else {
//				
//				if(i==0) GridObj.SetColHDText("SALES_MEAN_1MON",GridObj.GetColHDText("SALES_MEAN_1MON2"));
//				GridObj.SetCellValue('SALES_MEAN_1MON',i,GridObj.GetCellValue("SALES_MEAN_1MON2", i));
//			}	
//							
//		}
//		sales_mean_1mon_idx++;
//		if(sales_mean_1mon_idx == 2)	sales_mean_1mon_idx = 0;
//		
//	}
//	else if(strColumnKey == "SALES_MEAN_3MON"){
//		for(var i=0; i < GridObj.GetRowCount();i++ ) {
//			
//			if(sales_mean_3mon_idx == 0) {
//				
//				if(i==0) GridObj.SetColHDText("SALES_MEAN_3MON",GridObj.GetColHDText("SALES_MEAN_3WEEK"));
//				GridObj.SetCellValue('SALES_MEAN_3MON',i,GridObj.GetCellValue("SALES_MEAN_3WEEK", i));
//				
//			}else {
//				
//				if(i==0) GridObj.SetColHDText("SALES_MEAN_3MON",GridObj.GetColHDText("SALES_MEAN_3MON2"));
//				GridObj.SetCellValue('SALES_MEAN_3MON',i,GridObj.GetCellValue("SALES_MEAN_3MON2", i));
//			}	
//							
//		}
//		sales_mean_3mon_idx++;
//		if(sales_mean_3mon_idx == 2)	sales_mean_3mon_idx = 0;
//		
//	}
	else if(strColumnKey == "BASE_STOCK_PALLET"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(base_stock_pallet_idx == 0) {
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK_PALLET",GridObj.GetColHDText("STOCK_EXPT_PALLET"));
				GridObj.SetCellValue('BASE_STOCK_PALLET',i,GridObj.GetCellValue("STOCK_EXPT_PALLET", i));
				
			}else {
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK_PALLET",GridObj.GetColHDText("BASE_STOCK_PALLET2"));
				GridObj.SetCellValue('BASE_STOCK_PALLET',i,GridObj.GetCellValue("BASE_STOCK_PALLET2", i));
			}	
							
		}
		base_stock_pallet_idx++;
		if(base_stock_pallet_idx == 2)	base_stock_pallet_idx = 0;
		
	}
//	else if(strColumnKey == "STOCK_DAY"){
//		for(var i=0; i < GridObj.GetRowCount();i++ ) {
//			
//			if(stock_day_idx == 0) {
//				
//				if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_WEEK"));
//				GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_WEEK", i));
//				
//			}else {
//				
//				if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY2"));
//				GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY2", i));
//			}	
//							
//		}
//		stock_day_idx++;
//		if(stock_day_idx == 2)	stock_day_idx = 0;
//		
//	}
//	else if(strColumnKey == "TOTAL_AVL_DAY"){
//		for(var i=0; i < GridObj.GetRowCount();i++ ) {
//			
//			if(total_avl_day_idx == 0) {
//				
//				if(i==0) GridObj.SetColHDText("TOTAL_AVL_DAY",GridObj.GetColHDText("TOT_STOCK_WEEK"));
//				GridObj.SetCellValue('TOTAL_AVL_DAY',i,GridObj.GetCellValue("TOT_STOCK_WEEK", i));
//				
//			}else {
//				
//				if(i==0) GridObj.SetColHDText("TOTAL_AVL_DAY",GridObj.GetColHDText("TOTAL_AVL_DAY2"));
//				GridObj.SetCellValue('TOTAL_AVL_DAY',i,GridObj.GetCellValue("TOTAL_AVL_DAY2", i));
//			}	
//							
//		}
//		total_avl_day_idx++;
//		if(total_avl_day_idx == 2)	total_avl_day_idx = 0;
//		
//	}
//	else if(strColumnKey == "YEAR_IN_CUM_BUOM"){
//		for(var i=0; i < GridObj.GetRowCount();i++ ) {
//			
//			if(year_in_cum_buom_idx == 0) {
//				
//				if(i==0) GridObj.SetColHDText("YEAR_IN_CUM_BUOM",GridObj.GetColHDText("YEAR_IN_CUM"));
//				GridObj.SetCellValue('YEAR_IN_CUM_BUOM',i,GridObj.GetCellValue("YEAR_IN_CUM", i));
//				
//			}else {
//				
//				if(i==0) GridObj.SetColHDText("YEAR_IN_CUM_BUOM",GridObj.GetColHDText("YEAR_IN_CUM_BUOM2"));
//				GridObj.SetCellValue('YEAR_IN_CUM_BUOM',i,GridObj.GetCellValue("YEAR_IN_CUM_BUOM2", i));
//			}	
//							
//		}
//		year_in_cum_buom_idx++;
//		if(year_in_cum_buom_idx == 2)	year_in_cum_buom_idx = 0;
//		
//	}
	
	else	{			//로테이션 헤더클릭이 아니면 sort
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}
	if(strColumnKey == 'BASE_STOCK') {
		
		if(flag_base_stock =='1'){
		
			GridObj.SetColCellSort('BASE_STOCK','descending');
			flag_base_stock++;
		}
		else if(flag_base_stock =='2'){
			
			GridObj.SetColCellSort('BASE_STOCK','asceding');
			
			flag_base_stock--;	
			
		}
	}
	
	if(strColumnKey == 'PROD_TERM') {
		
		if(flag_prod_term =='1'){
		
			GridObj.SetColCellSort('PROD_TERM','descending');
			flag_prod_term++;
		}
		else if(flag_prod_term =='2'){
			
			GridObj.SetColCellSort('PROD_TERM','asceding');
			
			flag_prod_term--;	
			
		}
	}
	if(strColumnKey == 'TERM_VAL') {
		
		if(flag_term_val =='1'){
		
			GridObj.SetColCellSort('TERM_VAL','descending');
			flag_term_val++;
		}
		else if(flag_term_val =='2'){
			
			GridObj.SetColCellSort('TERM_VAL','asceding');
			
			flag_term_val--;	
			
		}
	}
	if(strColumnKey == 'TERM_PER') {
		
		if(flag_term_per =='1'){
		
			GridObj.SetColCellSort('TERM_PER','descending');
			flag_term_per++;
		}
		else if(flag_term_per =='2'){
			
			GridObj.SetColCellSort('TERM_PER','asceding');
			
			flag_term_per--;	
			
		}
	}
	if(strColumnKey == 'SALES_PRE') {
		
		if(flag_sales_pre =='1'){
		
			GridObj.SetColCellSort('SALES_PRE','descending');
			flag_sales_pre++;
		}
		else if(flag_sales_pre =='2'){
			
			GridObj.SetColCellSort('SALES_PRE','asceding');
			
			flag_sales_pre--;	
			
		}
	}
	if(strColumnKey == 'SALES_CUR') {
		
		if(flag_sales_cur =='1'){
		
			GridObj.SetColCellSort('SALES_CUR','descending');
			flag_sales_cur++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_CUR','asceding');
			
			flag_sales_cur--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM') {
		
		if(flag_sales_sum =='1'){
		
			GridObj.SetColCellSort('SALES_SUM','descending');
			flag_sales_sum++;
		}
		else if(flag_sales_sum =='2'){
			
			GridObj.SetColCellSort('SALES_SUM','asceding');
			
			flag_sales_sum--;	
			
		}
	}
	if(strColumnKey == 'STOCK_EXPT') {
		
		if(flag_stock_expt =='1'){
		
			GridObj.SetColCellSort('STOCK_EXPT','descending');
			flag_stock_expt++;
		}
		else if(flag_stock_expt =='2'){
			
			GridObj.SetColCellSort('STOCK_EXPT','asceding');
			
			flag_stock_expt--;	
			
		}
	}
	if(strColumnKey == 'PRE_MONTH_SELL') {
		
		if(flag_pre_month_sell =='1'){
		
			GridObj.SetColCellSort('PRE_MONTH_SELL','descending');
			flag_pre_month_sell++;
		}
		else if(flag_pre_month_sell =='2'){
			
			GridObj.SetColCellSort('PRE_MONTH_SELL','asceding');
			
			flag_pre_month_sell--;	
			
		}
	}

	if(strColumnKey == 'RECEIPT_EXPT_SUM_M') {
		
		if(flag_receipt_expt_sum_m =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M','descending');
			flag_receipt_expt_sum_m++;
		}
		else if(flag_receipt_expt_sum_m =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M','asceding');
			
			flag_receipt_expt_sum_m--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_M2') {
		
		if(flag_receipt_expt_sum_m2 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M2','descending');
			flag_receipt_expt_sum_m2++;
		}
		else if(flag_receipt_expt_sum_m2 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M2','asceding');
			
			flag_receipt_expt_sum_m2--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_M3') {
		
		if(flag_receipt_expt_sum_m3 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M3','descending');
			flag_receipt_expt_sum_m3++;
		}
		else if(flag_receipt_expt_sum_m3 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_M3','asceding');
			
			flag_receipt_expt_sum_m3--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_1') {
		
		if(flag_receipt_expt_sum_1 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_1','descending');
			flag_receipt_expt_sum_1++;
		}
		else if(flag_receipt_expt_sum_1 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_1','asceding');
			
			flag_receipt_expt_sum_1--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_2') {
		
		if(flag_receipt_expt_sum_2 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_2','descending');
			flag_receipt_expt_sum_2++;
		}
		else if(flag_receipt_expt_sum_2 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_2','asceding');
			
			flag_receipt_expt_sum_2--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_3') {
		
		if(flag_receipt_expt_sum_3 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_3','descending');
			flag_receipt_expt_sum_3++;
		}
		else if(flag_receipt_expt_sum_3 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_3','asceding');
			
			flag_receipt_expt_sum_3--;	
			
		}
	}
	
	if(strColumnKey == 'WEEK_DEV_1_3') {
		
		if(flag_dev_per =='1'){
		
			GridObj.SetColCellSort('WEEK_DEV_1_3','descending');
			flag_week_dev_1_3++;
		}
		else if(flag_dev_per =='2'){
			
			GridObj.SetColCellSort('WEEK_DEV_1_3','asceding');
			
			flag_week_dev_1_3--;	
			
		}
	}
	if(strColumnKey == 'DEV_PER') {
		
		if(flag_dev_per =='1'){
		
			GridObj.SetColCellSort('DEV_PER','descending');
			flag_dev_per++;
		}
		else if(flag_dev_per =='2'){
			
			GridObj.SetColCellSort('DEV_PER','asceding');
			
			flag_dev_per--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM_PY') {
		
		if(flag_sales_sum_py =='1'){
		
			GridObj.SetColCellSort('SALES_SUM_PY','descending');
			flag_sales_sum_py++;
		}
		else if(flag_sales_sum_py =='2'){
			
			GridObj.SetColCellSort('SALES_SUM_PY','asceding');
			
			flag_sales_sum_py--;	
			
		}
	}
	if(strColumnKey == 'THIS_YEAR_SUM') {
		
		if(flag_this_year_sum =='1'){
		
			GridObj.SetColCellSort('THIS_YEAR_SUM','descending');
			flag_this_year_sum++;
		}
		else if(flag_this_year_sum =='2'){
			
			GridObj.SetColCellSort('THIS_YEAR_SUM','asceding');
			
			flag_this_year_sum--;	
			
		}
	}
	if(strColumnKey == 'LAST_YEAR_SUM') {
		
		if(flag_last_year_sum =='1'){
		
			GridObj.SetColCellSort('LAST_YEAR_SUM','descending');
			flag_last_year_sum++;
		}
		else if(flag_last_year_sum =='2'){
			
			GridObj.SetColCellSort('LAST_YEAR_SUM','asceding');
			
			flag_last_year_sum--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_MON') {
		
		if(flag_sum_py_mon =='1'){
		
			GridObj.SetColCellSort('SUB_PY_MON','descending');
			flag_sum_py_mon++;
		}
		else if(flag_sum_py_mon =='2'){
			
			GridObj.SetColCellSort('SUB_PY_MON','asceding');
			
			flag_sum_py_mon--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_YEAR') {
		
		if(flag_sum_py_year =='1'){
		
			GridObj.SetColCellSort('SUB_PY_YEAR','descending');
			flag_sum_py_year++;
		}
		else if(flag_sum_py_year =='2'){
			
			GridObj.SetColCellSort('SUB_PY_YEAR','asceding');
			
			flag_sum_py_year--;	
			
		}
	}
	
	if(strColumnKey == 'NWGT_PER_BUOM') {
		
		if(flag_nwgt_per_buom =='1'){
		
			GridObj.SetColCellSort('NWGT_PER_BUOM','descending');
			flag_nwgt_per_buom++;
		}
		else if(flag_nwgt_per_buom =='2'){
			
			GridObj.SetColCellSort('NWGT_PER_BUOM','asceding');
			
			flag_nwgt_per_buom--;	
			
		}
	}
	if(strColumnKey == 'YEAR_IN_CUM_BUOM') {
		
		if(flag_year_in_cum_buom =='1'){
		
			GridObj.SetColCellSort('YEAR_IN_CUM_BUOM','descending');
			flag_year_in_cum_buom++;
		}
		else if(flag_year_in_cum_buom =='2'){
			
			GridObj.SetColCellSort('YEAR_IN_CUM_BUOM','asceding');
			
			flag_year_in_cum_buom--;	
			
		}
	}
	if(strColumnKey == 'MON_IN_CUM_BUOM') {
		
		if(flag_mon_in_cum_buom =='1'){
		
			GridObj.SetColCellSort('MON_IN_CUM_BUOM','descending');
			flag_mon_in_cum_buom++;
		}
		else if(flag_mon_in_cum_buom =='2'){
			
			GridObj.SetColCellSort('MON_IN_CUM_BUOM','asceding');
			
			flag_mon_in_cum_buom--;	
			
		}
	}
	if(strColumnKey == 'MON_SALE_CUM') {
		
		if(flag_mon_sale_cum =='1'){
		
			GridObj.SetColCellSort('MON_SALE_CUM','descending');
			flag_mon_sale_cum++;
		}
		else if(flag_mon_sale_cum =='2'){
			
			GridObj.SetColCellSort('MON_SALE_CUM','asceding');
			
			flag_mon_sale_cum--;	
			
		}
	}
	if(strColumnKey == 'STOCK_DAY') {
		
		if(flag_stock_day =='1'){
		
			GridObj.SetColCellSort('STOCK_DAY','descending');
			flag_stock_day++;
		}
		else if(flag_stock_day =='2'){
			
			GridObj.SetColCellSort('STOCK_DAY','asceding');
			
			flag_stock_day--;	
			
		}
	}
	if(strColumnKey == 'TOTAL_AVL_QTY') {
		
		if(flag_total_avl_qty =='1'){
		
			GridObj.SetColCellSort('TOTAL_AVL_QTY','descending');
			flag_total_avl_qty++;
		}
		else if(flag_total_avl_qty =='2'){
			
			GridObj.SetColCellSort('TOTAL_AVL_QTY','asceding');
			
			flag_total_avl_qty--;	
			
		}
	}
	if(strColumnKey == 'TOTAL_AVL_DAY') {
		
		if(flag_total_avl_day =='1'){
		
			GridObj.SetColCellSort('TOTAL_AVL_DAY','descending');
			flag_total_avl_day++;
		}
		else if(flag_total_avl_day =='2'){
			
			GridObj.SetColCellSort('TOTAL_AVL_DAY','asceding');
			
			flag_total_avl_day--;	
			
		}
	}
	if(strColumnKey == 'YEAR_SALE_CUM_BUOM') {
		
		if(flag_year_sale_cum_buom =='1'){
		
			GridObj.SetColCellSort('YEAR_SALE_CUM_BUOM','descending');
			flag_year_sale_cum_buom++;
		}
		else if(flag_year_sale_cum_buom =='2'){
			
			GridObj.SetColCellSort('YEAR_SALE_CUM_BUOM','asceding');
			
			flag_year_sale_cum_buom--;	
			
		}
	}

	
	
		GridSetMerge();
	}
		
}

function SetBomFlag(){
	
	var rowcount = GridObj.GetRowCount();
	
	for ( var i = 0; i < rowcount; i++){
		
		var flag = GridObj.GetCellValue("BOM_FLAG", i);
		if ( flag == "T"){
			GridObj.SetCellBgColor('ITEM_ID', i, '255|255|108');
			GridObj.SetCellBgColor('ITEM_NAME', i, '255|255|108');
		}
		
	}
	
	
	
	
}


function GridSetMerge(){	
				
		GridObj.SetGroupMerge('SALES_CAT03');

  	    
      	GridObj.AddSummaryBar('SUMMARY2', '소계', 'SALES_CAT03', 'custom', 'BASE_STOCK,DY_STOCK,DY_STOCK2,GITA_STOCK,OUT_STOCK,STOCK_DAY,STOCK_DAY2,STOCK_WEEK,PROD_TERM,STOCK_HIDDEN,TERM_HIDDEN,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,PRE_MONTH_SELL,' +
      			'PR_TO_PO,PO_TO_LC,LC_TO_PORT,PORT_TO_CUST,RECEIPT_EXPT_SUM_M,RECEIPT_EXPT_SUM_M2,RECEIPT_EXPT_SUM_M3,RECEIPT_EXPT_SUM_1,RECEIPT_EXPT_SUM_2,RECEIPT_EXPT_SUM_3,RECEIPT_EXPT_SUM_4,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,SALES_SUM_PY,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_MON,' +
      			'SUB_PY_YEAR,BASE_STOCK_PALLET,STOCK_EXPT_PALLET,SALES_MEAN_1MON,SALES_MEAN_3MON,SALES_MEAN_1MON2,SALES_MEAN_3MON2,TOTAL_AVL_QTY,TOTAL_AVL_DAY,TOTAL_AVL_DAY2,TOT_STOCK_WEEK,NWGT_PER_BUOM,MON_IN_CUM_BUOM,YEAR_IN_CUM,YEAR_IN_CUM_BUOM,YEAR_IN_CUM_BUOM2,MON_SALE_CUM,YEAR_SALE_CUM_BUOM'); 
 	   
 	   /* custom 소계에 대해 각 컬럼별로 지정 - SUMMARY1 */
 	   
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','DY_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','DY_STOCK2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','GITA_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','OUT_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_HIDDEN');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','TERM_HIDDEN');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_CUR');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_EXPT'); 	   
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','TOTAL_AVL_QTY'); 	
 	    //GridObj.SetSummaryBarFunction('SUMMARY2','sum','TOTAL_AVL_DAY'); 	 
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','PRE_MONTH_SELL');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_M');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_M2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_M3');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_1');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_3');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM_4');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_1WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_3WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_1MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_1MON2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_3MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_3MON2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM_PY');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','THIS_YEAR_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','LAST_YEAR_SUM');
	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK_PALLET');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_EXPT_PALLET');		
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_YEAR');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','NWGT_PER_BUOM');
	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','MON_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_IN_CUM');		
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_IN_CUM_BUOM2');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','MON_SALE_CUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_SALE_CUM_BUOM');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','TOTAL_AVL_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','TOT_STOCK_WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','STOCK_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','STOCK_WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','TERM_PER');  
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','PR_TO_PO');  
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','PO_TO_LC');  
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','LC_TO_PORT');  
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','PORT_TO_CUST');   
 	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','TERM_VAL');   
 	    
 	    var rowcount = GridObj.GetMergeCount('SALES_CAT03');   //소계 인덱스 구하기
 	   
 	    for (var i=0; i<rowcount; i++){
 	    	
 	   	 	var base_stock 		 = GridObj.GetSummaryBarValue('SUMMARY2','BASE_STOCK',i,true).replace(/,/g,"");
 	   	 	var out_stock 		 = GridObj.GetSummaryBarValue('SUMMARY2','OUT_STOCK',i,true).replace(/,/g,"");
 	    	var sales_mean_1week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_1WEEK',i,true).replace(/,/g,"");
 	    	var sales_mean_3week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_3WEEK',i,true).replace(/,/g,"");
 	    	var prod_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','STOCK_HIDDEN',i,true).replace(/,/g,"");
 	    	var term_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','TERM_HIDDEN',i,true).replace(/,/g,"");
 	    	var sales_mean_1mon  = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_1MON',i,true).replace(/,/g,"");
 	    	var sales_mean_3mon  = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_3MON',i,true).replace(/,/g,"");
 	  
// 	    	if(sales_mean_3week == '0')
// 	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_DAY',i, 0 );
// 	    	else if(sales_mean_3mon == '0')
// 	    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_WEEK',i, 0 );
// 	    	else{
// 	    		/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_DAY',i, ((Number(base_stock) + Number(out_stock))/sales_mean_3week));
// 	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3개월평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_DAY2',i, ((Number(base_stock) + Number(out_stock))/sales_mean_3mon));
// 	    	}	
// 	    
 	    	
 	    	/* 사용자 지정 계산식 추가 - 유통기한 경과일수 = SUM(유통기한경과일수 * 기초재고)/SUM 기초재고 */
 	    	GridObj.SetSummaryBarValue('SUMMARY2','PROD_TERM',i, prod_hidden/(Number(base_stock) + Number(out_stock)));
 	    	/* 사용자 지정 계산식 추가 - 유통기한  = SUM(유통기한 * 기초재고)/SUM 기초재고 */
 	    	GridObj.SetSummaryBarValue('SUMMARY2','TERM_VAL',i, term_hidden/(Number(base_stock) + Number(out_stock)));
 	    	/* 사용자 지정 계산식 추가 - 1/3주 평균편차 = 1주평균판매 - 3주평균판매 */
 	    	GridObj.SetSummaryBarValue('SUMMARY2','WEEK_DEV_1_3',i, (sales_mean_1week - sales_mean_3week) );
  	    }
 	  	 	
  	 	GridObj.AddSummaryBar('SUMMARY3', '합계', 'summaryall', 'custom', 'BASE_STOCK,DY_STOCK,DY_STOCK2,GITA_STOCK,OUT_STOCK,STOCK_DAY,STOCK_DAY2,STOCK_WEEK,PROD_TERM,STOCK_HIDDEN,TERM_HIDDEN,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,PRE_MONTH_SELL,' +
  	 			'RECEIPT_EXPT_SUM_M,RECEIPT_EXPT_SUM_M2,RECEIPT_EXPT_SUM_M3,RECEIPT_EXPT_SUM_1,RECEIPT_EXPT_SUM_2,RECEIPT_EXPT_SUM_3,RECEIPT_EXPT_SUM_4,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,SALES_SUM_PY,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_MON,SUB_PY_YEAR,BASE_STOCK_PALLET,' +
  	 			'STOCK_EXPT_PALLET,SALES_MEAN_1MON,SALES_MEAN_3MON,SALES_MEAN_1MON2,SALES_MEAN_3MON2,TOTAL_AVL_QTY,TOTAL_AVL_DAY,TOTAL_AVL_DAY2,TOT_STOCK_WEEK,NWGT_PER_BUOM,MON_IN_CUM_BUOM,YEAR_IN_CUM,YEAR_IN_CUM_BUOM,YEAR_IN_CUM_BUOM2,MON_SALE_CUM,YEAR_SALE_CUM_BUOM');
        
        GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK');
        GridObj.SetSummaryBarFunction('SUMMARY3','sum','DY_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','DY_STOCK2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','GITA_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','OUT_STOCK');
        GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_HIDDEN');
        GridObj.SetSummaryBarFunction('SUMMARY3','sum','TERM_HIDDEN');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_CUR');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_EXPT');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','TOTAL_AVL_QTY'); 	
 	    //GridObj.SetSummaryBarFunction('SUMMARY3','sum','TOTAL_AVL_DAY'); 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','PRE_MONTH_SELL');
 	    //GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_M');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_M2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_M3');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_1');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_3');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM_4');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_1WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_3WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_1MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_1MON2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_3MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_3MON2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM_PY');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','THIS_YEAR_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','LAST_YEAR_SUM');
	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK_PALLET');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_EXPT_PALLET');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','TOTAL_AVL_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','TOT_STOCK_WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','STOCK_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','STOCK_WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','NWGT_PER_BUOM');
	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','MON_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_IN_CUM');		
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_IN_CUM_BUOM2');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','MON_SALE_CUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_SALE_CUM_BUOM');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','TERM_PER');
 	    //GridObj.SetSummaryBarFunction('SUMMARY3','average','TERM_VAL');   
 	    
 	    	var base_stock3 		= GridObj.GetSummaryBarValue('SUMMARY3','BASE_STOCK',0,true).replace(/,/g,"");
 	    	var out_stock3 		 	= GridObj.GetSummaryBarValue('SUMMARY3','OUT_STOCK',0,true).replace(/,/g,"");
 	    	var sales_mean_1week3 	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_1WEEK',0,true).replace(/,/g,"");
 	    	var sales_mean_3week3	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_3WEEK',0,true).replace(/,/g,"");
 	    	var prod_hidden3		= GridObj.GetSummaryBarValue('SUMMARY3','STOCK_HIDDEN',0,true).replace(/,/g,"");
 	    	var term_hidden3		= GridObj.GetSummaryBarValue('SUMMARY3','TERM_HIDDEN',0,true).replace(/,/g,"");
 	    	var sales_mean_1mon3 	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_1MON',0,true).replace(/,/g,"");
 	    	var sales_mean_3mon3  	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_3MON',0,true).replace(/,/g,"");
 	    	
// 	    	if(sales_mean_3week3 == '0')
// 	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY3','STOCK_DAY',0, 0 );
// 	    	else
// 	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY3','STOCK_DAY',0, ((Number(base_stock3) + Number(out_stock3))/sales_mean_3week3));
// 	    	
// 	    	if(sales_mean_3mon3 == '0')
// 	    	GridObj.SetSummaryBarValue('SUMMARY3','STOCK_WEEK',0, 0 );
// 	    	else
// 	    	/* 사용자 지정 계산식 추가 - 재고주수 = 기초재고/3개월평균 */
// 	    	GridObj.SetSummaryBarValue('SUMMARY3','STOCK_WEEK',0, ((Number(base_stock3) + Number(out_stock3))/sales_mean_3mon3));
// 	    	
 	    	
 	    	/* 사용자 지정 계산식 추가 - 유통기한 경과일수 = SUM(유통기한경과일수 * 기초재고)/SUM 기초재고 */
 	    	GridObj.SetSummaryBarValue('SUMMARY3','PROD_TERM',0, prod_hidden3/(Number(base_stock3) + Number(out_stock3)));
 	    	/* 사용자 지정 계산식 추가 - 유통기한  = SUM(유통기한 * 기초재고)/SUM 기초재고 */
 	    	GridObj.SetSummaryBarValue('SUMMARY3','TERM_VAL',0, term_hidden3/(Number(base_stock3) + Number(out_stock3)));
 	    	/* 사용자 지정 계산식 추가 - 1/3주 평균편차 = 1주평균판매 - 3주평균판매 */
 	    	GridObj.SetSummaryBarValue('SUMMARY3','WEEK_DEV_1_3',0, (sales_mean_1week3 - sales_mean_3week3) );
        
      //  GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '206|241|121');
        GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY3', '0|153|0', color_tot);
 		
 		
}

function  doMoving(){

	
		GridObj.ClearGroupMerge();
		GridObj.bHDMoving = true;		// 컬럼 헤더 위치 이동
		
		
}

function  doGrouping(){

		GridObj.bHDMoving = false;		// 컬럼 헤더 위치 이동
		
		GridSetMerge();
		
}


function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.sales_cat03.options;
	

	
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//옵션 지우기 현재 select option 갯수만큼
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//옵션 채우기 result 갯수만큼만
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
			
				
		
		}
		
	});
	
	
}

