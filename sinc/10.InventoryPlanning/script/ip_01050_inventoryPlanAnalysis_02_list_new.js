//## 프로그램ID      : ip_01050_inventoryPlanAnalysis_02_list_new.js
//## 프로그램명      : 품목별 재고 추이 분석(신규)
//## 변경자자        : 우종균
//## 개발일자        : 2011-11-23 화요일
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-23  우종균      	update
//## 1.2		2014-05-02  이강욱	   	update
//## 1.3		2014-05-14  이강욱 		update
//## 1.4		2014-05-23  이강욱		update
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_01050_inventoryPlanAnalysis_02_list_new';

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
	//GridObj.bHDMoving = true;		// 컬럼 헤더 위치 이동

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

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);  	

	GridObj.AddHeader("SELECTED"			,""   					,"t_checkbox"	,2		,30  ,true); //0
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("SALES_CAT01"	       ,"대분류"	    ,"t_text"      ,100	    ,80     ,false); //0
	
 	//GridObj.AddHeader("SALES_CAT02"	       ,"자재그룹2"	    ,"t_text"      ,100	    ,80     ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"소분류"		,"t_text"	   ,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"제품코드"		,"t_text" 	   ,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"제품명"	        ,"t_text" 	   ,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"규격"	    	,"t_text"  		,100	,90     ,false); //0
 	GridObj.AddHeader("MTO_MTS_TYPE"	   ,"구분"	    	,"t_text"  		,100	,0     ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"기초재고"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"재고일수"       ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("PROD_TERM"  		   ,"유통기한\n경과일수"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("PROD_TERM_AVG"  	   ,"유통기한\n평균경과일수"	,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("STOCK_HIDDEN"  	   ,"경과일수히든"	,"t_text"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("TERM_HIDDEN"  	   ,"유통기한히든"	,"t_text"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"유통기한"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"유통기한\n경과율"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"전일계"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"일계"       ,"t_number" 	   ,100.3	,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"누계"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("PRE_MONTH_SELL"	   ,"전월계"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"예상재고"	,"t_number"    ,100.3	,70     ,false); //0
    
 	GridObj.AddHeader("RECEIPT_EXPT"       ,"금일생산계획"	,"t_number"    ,100.3   ,80     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_REM"   ,"금주잔여\n생산계획"	,"t_number"    ,100.3   ,80     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_NEXT"  ,"차주생산계획"	,"t_number"    ,100.3   ,80     ,false); //0
 	GridObj.AddHeader("TOT_SUPPLE"	       ,"총공급량"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("TOT_STOCKDAY"	    ,"총재고일수"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"생산누계"	,"t_number"    ,100.3	,70     ,false); //0
 	
  //GridObj.AddHeader("PROD_TERM"     	   ,"생산\n경과일"	,"t_number"    ,100.3	,0     ,false); //0 //추가 : 2012-04-19//
 	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1주평균"		    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3주평균"		    ,"t_number"    ,100.3   ,70     ,false) //0
 	GridObj.AddHeader("WEEK_DEV_1_3"       ,"1/3주평균\n편차"	,"t_number"    ,100.3   ,70     ,false); //0
 	GridObj.AddHeader("DEV_PER"            ,"편차비율"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SALES_SUM_PY"       ,"전년동월\n누계"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_MON"    	   ,"전년동월\n대비"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("THIS_YEAR_SUM"      ,"년누계"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"전년누계"	,"t_number"    ,100.3   ,60     ,false); //0
 	
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"전년누계\n대비"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX"          ,"판매목표"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX_RATE"     ,"판매목표\n달성률"	,"t_text"      ,100		,55     ,false); //0
 	GridObj.AddHeader("BASE_STOCK_PALLET"  ,"기초재고\n(PALLET)"	,"t_number"      ,100.3		,75     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT_PALLET"  ,"예상재고\n(PALLET)"	,"t_number"      ,100.3		,75     ,false); //0
 	GridObj.AddHeader("STOCK_USE_EXPT_RATE","재고소진완료\n경과율"	,"t_text"      ,100		,0     ,false); //0
 	GridObj.AddHeader("JGC_DUE_DATE"	   ,"장기체화\n처리기한"	,"t_text"	   ,100		,0		,true ); 	
 	GridObj.AddHeader("BASE_STOCK_2"	   ,"사외창고"	,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("REQT_QTY"	   	,"생산의뢰량"	,"t_number"    ,100.3	,0     ,false); //0
	/* 저장을 위한 히든 값 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('ITEM_NAME'); 

	GridObj.SetColCellAlign('SALES_CAT01',        'left'); //추가 : 2014-05-14
    //GridObj.SetColCellAlign('SALES_CAT02',        'left');
    GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('MTO_MTS_TYPE',       'center');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 
    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('PROD_TERM',         'right'); 
    GridObj.SetColCellAlign('PROD_TERM_AVG',     'right'); 
    GridObj.SetColCellAlign('TERM_VAL',        	 'right');
    //GridObj.SetColCellAlign('TERM_PER',          'right'); //유통기한 경과율
    GridObj.SetColCellAlign('SALES_CUR',         'right'); //누계
    GridObj.SetColCellAlign('STOCK_EXPT',        'right'); //예상재고
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right'); //전월계
    //GridObj.SetColCellAlign('SALES_SUM',         'right');
    GridObj.SetColCellAlign('RECEIPT_EXPT',      'right'); //생산 계획
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right'); //생산 누적
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');
    GridObj.SetColCellAlign('WEEK_DEV_1_3',      'right');
    GridObj.SetColCellAlign('DEV_PER',           'right'); //편차비율
    GridObj.SetColCellAlign('SALES_SUM_PY',      'right');  //추가 : 2014-05-02 전년동월 누계
    GridObj.SetColCellAlign('THIS_YEAR_SUM',     'right'); //추가 : 2014-04-30 년누계
    GridObj.SetColCellAlign('LAST_YEAR_SUM',  	 'right'); //추가 : 2014-04-30 전년누계
    GridObj.SetColCellAlign('SUB_PY_MON',   	 'right'); //전년동월 대비
    GridObj.SetColCellAlign('SUB_PY_YEAR',    	 'right'); //전년누계 대비
    GridObj.SetColCellAlign('GOALS_BOX',         'right');
    GridObj.SetColCellAlign('GOALS_BOX_RATE',    'right');
    GridObj.SetColCellAlign('BASE_STOCK_PALLET', 'right');
    GridObj.SetColCellAlign('STOCK_EXPT_PALLET', 'right');
    //GridObj.SetColCellAlign('PROD_TERM',    	 'right');	//추가 : 2012-04-19//
    GridObj.SetColCellAlign('STOCK_USE_EXPT_RATE','right'); //유통기한 경과율
    GridObj.SetColCellAlign('JGC_DUE_DATE'		 ,'right'); 	
    
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK_2",     "###,###.#");
    GridObj.SetNumberFormat("STOCK_DAY",        "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",        "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        "###,###.#");
    //GridObj.SetNumberFormat("STOCK_HIDDEN",     "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM",        "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM_AVG",        "###,###.#");
    GridObj.SetNumberFormat("TERM_VAL",       	"###,###.#");
   // GridObj.SetNumberFormat("TERM_PER",         "###,##0.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM_PY",     "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", "###,###.#");
    GridObj.SetNumberFormat("WEEK_DEV_1_3",     "###,###.#");
    GridObj.SetNumberFormat("DEV_PER",          "###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetNumberFormat("TOT_SUPPLE",   	"###,###.#");
    GridObj.SetNumberFormat("THIS_YEAR_SUM",    "###,###.#");
    GridObj.SetNumberFormat("LAST_YEAR_SUM",    "###,###.#");
    GridObj.SetNumberFormat("SUB_PY_MON",   	"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_YEAR",   	"###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK_PALLET","###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT_PALLET","###,###.#");
    GridObj.SetNumberFormat("GOALS_BOX",        "###,###.#");
    GridObj.SetNumberFormat("REQT_QTY",        	"###,###.#");
  	GridObj.SetNumberFormat("RECEIPT_EXPT_REM",        "###,###.#");
  	GridObj.SetNumberFormat("RECEIPT_EXPT_NEXT",        "###,###.#");
  	GridObj.SetNumberFormat("TOT_STOCKDAY",        "###,###.#");
	
	//GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	//GridObj.SetColHide("CRUD",true);

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
            	
            	GridSetColor();
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	
        else if( endMode =="doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		GridSetMerge();
            	}
            }
        
        else if(endMode =="Delete"){
        	doQuery();
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
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	조회유형
   	
   	if(item_type == null || item_type == ""){
		//alert("조회유형을 선택하십시요!");
   		//return
   	}
	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("조회유형을 선택하십시요!");
		return;
	}   	
   	
   	
    doQuery();
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};


      
// 저장
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}else if(document.frm.checked_button[3].checked){
		
		checked_button = document.frm.checked_button[3].value;
		
	}else{
		
		checked_button = document.frm.checked_button[4].value;
		
	}
	
	
	
	//var in_trans_unit = "";
	
	//if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	//if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";

    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("checked_button", checked_button);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "SELECTED");
	
 	
 	return;
}    




/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;
       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var in_act_type	    = document.all.in_act_type.value;   
       var search_item	    = document.all.search_item.value;
       //var in_qty_gubn		= document.all.in_qty_gubn.value;       	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      // var checked_button_mt;
       
//       if(document.frm.checked_button_mt[0].checked){
//
//			checked_button_mt = document.frm.checked_button_mt[0].value;
//			
//		}else if(document.frm.checked_button_mt[1].checked){
//				
//			checked_button_mt = document.frm.checked_button_mt[1].value;
//			
//		}else {
//		
//			checked_button_mt = document.frm.checked_button_mt[2].value;
//					
//		}
       
       if (item_type == "FERT"){
       		if (search_type == "JG" || search_type == "JG10" || search_type == "JG20" ||search_type == "JG30") {
       			alert("장기체화 검색을 위해 상품으로 변경해주십시오");
       			return;
       		}
       }
      
     
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("in_act_type", in_act_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);
	   GridObj.SetParam("in_qty_gubn",  "");
	   GridObj.SetParam("checked_button_mt", "ALL");	
	   GridObj.DoQuery(servlet_url);       
   }

/*┌──────────────────────────────────┐
  │DW 2 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )

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
	
		var item_type	= document.all.item_type.value;
		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
		var search_type = document.all.search_type.value;
		var week_flag	= 'STOCK_EXPT';
		
		
		commonUtil.getSelQeury( "item_id", item_id, "ip_01050_Inventory_plan_analysis_check_item_type",{
		callback:function(result){
			
			if(strColumnKey == 'STOCK_EXPT'){ // (1/3주 평균 편차)
				
				if(result == "FERT"){					
					
					if(search_type == "O1020" || search_type =="O10" || search_type =="O20"){
						var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
						service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
						//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
						var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
						//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
						var newWin = window.open(service_url, "", pop_win_style);
						newWin.focus();	
					}else{
						var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
						service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
						//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
						var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
						//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
						var newWin = window.open(service_url, "", pop_win_style);
						newWin.focus();
					}
					
			
					
				}else {
		
					var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
					service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
					//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
					var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
					//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
					var newWin = window.open(service_url, "", pop_win_style);
					newWin.focus();	
		
				}
		
			}  
			
		}
	});
		
		
	

}

function GoDelete(){
	
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}else if(document.frm.checked_button[3].checked){
		
		checked_button = document.frm.checked_button[3].value;
		
	}else{
		
		checked_button = document.frm.checked_button[4].value;
		
	}
	
	
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode",				"delete");
	GridObj.SetParam("user_id",	 			document.frm._user_id.value);
	GridObj.SetParam("checked_button",	 	checked_button);
	//GridObj.SetParam("checked_button",checked_button);
	
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
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
	var flag_receipt_expt = '1';
	var flag_receipt_expt_sum = '1';
	var flag_sales_mean_1week = '1';
	var flag_sales_mean_3week = '1';
	var flag_week_dev_1_3 = '1';
	var flag_dev_per = '1';
	var flag_sales_sum_py = '1';
	
	var flag_this_year_sum = '1';
	var flag_last_year_sum = '1';
	var flag_sum_py_mon = '1';
	var flag_sum_py_year = '1';
	var flag_goal_box = '1';
	var flag_goal_box_rate = '1';
	var flag_base_stock_pallet = '1';
	var flag_stock_expt_pallet = '1';
	var flag_reqt_qty = '1';

function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('BASE_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM_AVG'	,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('STOCK_EXPT'		,true);
	GridObj.SetColCellSortEnable('PRE_MONTH_SELL'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT'		,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_1WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);
	GridObj.SetColCellSortEnable('WEEK_DEV_1_3'		,true);
	GridObj.SetColCellSortEnable('DEV_PER'			,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM_PY'		,true);
	GridObj.SetColCellSortEnable('THIS_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('LAST_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('SUB_PY_MON'		,true);
	GridObj.SetColCellSortEnable('SUB_PY_YEAR'		,true);
	GridObj.SetColCellSortEnable('GOALS_BOX'		,true);
	GridObj.SetColCellSortEnable('GOALS_BOX_RATE'	,true);
	GridObj.SetColCellSortEnable('BASE_STOCK_PALLET',true);
	GridObj.SetColCellSortEnable('STOCK_EXPT_PALLET',true);
	GridObj.SetColCellSortEnable('STOCK_USE_EXPT_RATE',true);
	GridObj.SetColCellSortEnable('REQT_QTY',true);
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
	if(strColumnKey == 'RECEIPT_EXPT') {
		
		if(flag_receipt_expt =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT','descending');
			flag_receipt_expt++;
		}
		else if(flag_receipt_expt =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT','asceding');
			
			flag_receipt_expt--;	
			
		}
	}
	if(strColumnKey == 'RECEIPT_EXPT_SUM') {
		
		if(flag_receipt_expt_sum =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','descending');
			flag_receipt_expt_sum++;
		}
		else if(flag_receipt_expt_sum =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','asceding');
			
			flag_receipt_expt_sum--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_1WEEK') {
		
		if(flag_sales_mean_1week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','descending');
			flag_sales_mean_1week++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','asceding');
			
			flag_sales_mean_1week--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_3WEEK') {
		
		if(flag_sales_mean_3week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_3week++;
		}
		else if(flag_sales_mean_3week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
			flag_sales_mean_3week--;	
			
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
	if(strColumnKey == 'GOALS_BOX') {
		
		if(flag_goal_box =='1'){
		
			GridObj.SetColCellSort('GOALS_BOX','descending');
			flag_goal_box++;
		}
		else if(flag_goal_box =='2'){
			
			GridObj.SetColCellSort('GOALS_BOX','asceding');
			
			flag_goal_box--;	
			
		}
	}
	if(strColumnKey == 'GOALS_BOX_RATE') {
		
		if(flag_goal_box_rate =='1'){
		
			GridObj.SetColCellSort('GOALS_BOX_RATE','descending');
			flag_goal_box_rate++;
		}
		else if(flag_goal_box_rate =='2'){
			
			GridObj.SetColCellSort('GOALS_BOX_RATE','asceding');
			
			flag_goal_box_rate--;	
			
		}
	}
	if(strColumnKey == 'BASE_STOCK_PALLET') {
		
		if(flag_base_stock_pallet =='1'){
		
			GridObj.SetColCellSort('BASE_STOCK_PALLET','descending');
			flag_base_stock_pallet++;
		}
		else if(flag_base_stock_pallet =='2'){
			
			GridObj.SetColCellSort('BASE_STOCK_PALLET','asceding');
			
			flag_base_stock_pallet--;	
			
		}
	}
	if(strColumnKey == 'STOCK_EXPT_PALLET') {
		
		if(flag_stock_expt_pallet =='1'){
		
			GridObj.SetColCellSort('STOCK_EXPT_PALLET','descending');
			flag_stock_expt_pallet++;
		}
		else if(flag_stock_expt_pallet =='2'){
			
			GridObj.SetColCellSort('STOCK_EXPT_PALLET','asceding');
			
			flag_stock_expt_pallet--;	
			
		}
	}
		if(strColumnKey == 'REQT_QTY') {
		
		if(flag_reqt_qty =='1'){
		
			GridObj.SetColCellSort('REQT_QTY','descending');
			flag_reqt_qty++;
		}
		else if(flag_reqt_qty =='2'){
			
			GridObj.SetColCellSort('REQT_QTY','asceding');
			
			flag_reqt_qty--;	
			
		}
	}
	
		GridSetMerge();
		
}

function GridSetColor(){
	
	var rowcount = GridObj.GetRowCount();
	for(var i=0; i< rowcount; i++){
		
		var gubn = GridObj.GetCellValue('MTO_MTS_TYPE',i);
		if(gubn == "MTO") GridObj.SetCellBgColor('ITEM_NAME',i,'255|255|200');
	}
}

function GridSetMerge(){
	
				
				GridObj.SetGroupMerge('SALES_CAT01,SALES_CAT03');
              	GridObj.AddSummaryBar('SUMMARY1', '소계', 'SALES_CAT03', 'custom', 'BASE_STOCK,STOCK_DAY,PROD_TERM,PROD_TERM_AVG,STOCK_HIDDEN,TERM_HIDDEN,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,BASE_STOCK_2,PRE_MONTH_SELL,RECEIPT_EXPT,' +
              			'RECEIPT_EXPT_REM,RECEIPT_EXPT_NEXT,TOT_SUPPLE,TOT_STOCKDAY,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,SALES_SUM_PY,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_MON,SUB_PY_YEAR,GOALS_BOX,BASE_STOCK_PALLET,STOCK_EXPT_PALLET,STOCK_USE_EXPT_RATE,REQT_QTY'); 
         	   
         	   /* custom 소계에 대해 각 컬럼별로 지정 - SUMMARY1 */
         	   
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','BASE_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK_HIDDEN');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','TERM_HIDDEN');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_CUR');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','BASE_STOCK_2');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','PRE_MONTH_SELL');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','RECEIPT_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','RECEIPT_EXPT_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_MEAN_1WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_MEAN_3WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_SUM_PY');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','THIS_YEAR_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','LAST_YEAR_SUM');
//         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SUB_PY_MON"');
//         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SUB_PY_YEAR');
//         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','GOALS_BOX');
        	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','BASE_STOCK_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK_EXPT_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','REQT_QTY');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','RECEIPT_EXPT_REM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','RECEIPT_EXPT_NEXT');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','TOT_SUPPLE');
         	   	GridObj.SetSummaryBarFunction('SUMMARY1','sum','TOT_STOCKDAY');
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','TERM_PER');   
         	    
         	    var rowcount = GridObj.GetMergeCount('SALES_CAT03');   //소계 인덱스 구하기
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	 	var base_stock 		 = GridObj.GetSummaryBarValue('SUMMARY1','BASE_STOCK',i,true).replace(/,/g,"");         	   	 	
         	    	var sales_mean_1week = GridObj.GetSummaryBarValue('SUMMARY1','SALES_MEAN_1WEEK',i,true).replace(/,/g,"");
         	    	var sales_mean_3week = GridObj.GetSummaryBarValue('SUMMARY1','SALES_MEAN_3WEEK',i,true).replace(/,/g,"");
         	    	var prod_hidden		 = GridObj.GetSummaryBarValue('SUMMARY1','STOCK_HIDDEN',i,true).replace(/,/g,"");
         	    	var term_hidden		 = GridObj.GetSummaryBarValue('SUMMARY1','TERM_HIDDEN',i,true).replace(/,/g,"");
         	    	
         	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','STOCK_DAY',i, (base_stock/sales_mean_3week) );
         	    	/* 사용자 지정 계산식 추가 - 유통기한 경과일수 = SUM(유통기한경과일수 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','PROD_TERM',i, prod_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 유통기한  = SUM(유통기한 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','TERM_VAL',i, term_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 1/3주 평균편차 = 1주평균판매 - 3주평균판매 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','WEEK_DEV_1_3',i, (sales_mean_1week - sales_mean_3week) );
         	    	//GridObj.SetSummaryBarValue('SUMMARY1','TERM_PER',i, (term_hidden/ prod_hidden) );
          	    }
         	     
         	    /* custom 소계에 대해 각 컬럼별로 지정 - SUMMARY2 */
         	  
         	    GridObj.AddSummaryBar('SUMMARY2', '계', 'SALES_CAT01', 'custom', 'BASE_STOCK,STOCK_DAY,PROD_TERM,PROD_TERM_AVG,STOCK_HIDDEN,TERM_HIDDEN,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,BASE_STOCK_2,PRE_MONTH_SELL,RECEIPT_EXPT,' +
              			'RECEIPT_EXPT_REM,RECEIPT_EXPT_NEXT,TOT_SUPPLE,TOT_STOCKDAY,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,SALES_SUM_PY,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_MON,SUB_PY_YEAR,GOALS_BOX,BASE_STOCK_PALLET,STOCK_EXPT_PALLET,STOCK_USE_EXPT_RATE,REQT_QTY');
         	    
	      	 	GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK');
	      	 	GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_HIDDEN');
	      	 	GridObj.SetSummaryBarFunction('SUMMARY2','sum','TERM_HIDDEN');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_CUR');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK_2');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','PRE_MONTH_SELL');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_1WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_3WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM_PY');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','THIS_YEAR_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','LAST_YEAR_SUM');
//         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_MON"');
//         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_YEAR');
//         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','GOALS_BOX');
        	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_EXPT_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','REQT_QTY');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_REM');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_NEXT');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','TOT_SUPPLE');
         	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','TOT_STOCKDAY');
         	       
         	    //GridObj.SetSummaryBarFunction('SUMMARY2','average','TERM_VAL');   
         	    
         	    var rowcount = GridObj.GetMergeCount('SALES_CAT01');   //소계 인덱스 구하기
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	 	var base_stock 		 = GridObj.GetSummaryBarValue('SUMMARY2','BASE_STOCK',i,true).replace(/,/g,"");
         	    	var sales_mean_1week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_1WEEK',i,true).replace(/,/g,"");
         	    	var sales_mean_3week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_3WEEK',i,true).replace(/,/g,"");
         	    	var prod_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','STOCK_HIDDEN',i,true).replace(/,/g,"");
         	    	var term_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','TERM_HIDDEN',i,true).replace(/,/g,"");
         	    	
         	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
         	    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_DAY',i, (base_stock/sales_mean_3week) );
         	    	/* 사용자 지정 계산식 추가 - 유통기한 경과일수 = SUM(유통기한경과일수 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY2','PROD_TERM',i, prod_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 유통기한  = SUM(유통기한 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY2','TERM_VAL',i, term_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 1/3주 평균편차 = 1주평균판매 - 3주평균판매 */
         	    	GridObj.SetSummaryBarValue('SUMMARY2','WEEK_DEV_1_3',i, (sales_mean_1week - sales_mean_3week) );
          	    }
	      	 	
	      	 	/* custom 소계에 대해 각 컬럼별로 지정 - SUMMARY3 */
	      	 	
	      	 	GridObj.AddSummaryBar('SUMMARY3', '합계', 'summaryall', 'custom', 'BASE_STOCK,STOCK_DAY,PROD_TERM,PROD_TERM_AVG,STOCK_HIDDEN,TERM_HIDDEN,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,BASE_STOCK_2,PRE_MONTH_SELL,RECEIPT_EXPT,' +
	      	 			'RECEIPT_EXPT_REM,RECEIPT_EXPT_NEXT,TOT_SUPPLE,TOT_STOCKDAY,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,SALES_SUM_PY,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_MON,SUB_PY_YEAR,GOALS_BOX,BASE_STOCK_PALLET,STOCK_EXPT_PALLET,STOCK_USE_EXPT_RATE,REQT_QTY');
    	        
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_HIDDEN');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','TERM_HIDDEN');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_CUR');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK_2');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','PRE_MONTH_SELL');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_1WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_3WEEK');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM_PY');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','THIS_YEAR_SUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','LAST_YEAR_SUM');
//         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SUB_PY_MON"');
//         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SUB_PY_YEAR');
//         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','GOALS_BOX');
        	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_EXPT_PALLET');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','REQT_QTY');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_REM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_NEXT');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','TOT_SUPPLE');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','TOT_STOCKDAY');
         	    //GridObj.SetSummaryBarFunction('SUMMARY3','average','TERM_VAL');   
         	    
         	    	var base_stock3 		= GridObj.GetSummaryBarValue('SUMMARY3','BASE_STOCK',0,true).replace(/,/g,"");
         	    	var sales_mean_1week3 	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_1WEEK',0,true).replace(/,/g,"");
         	    	var sales_mean_3week3	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_3WEEK',0,true).replace(/,/g,"");
         	    	var prod_hidden			= GridObj.GetSummaryBarValue('SUMMARY3','STOCK_HIDDEN',i,true).replace(/,/g,"");
         	    	var term_hidden		 	= GridObj.GetSummaryBarValue('SUMMARY3','TERM_HIDDEN',i,true).replace(/,/g,"");
         	    	
         	    	/* 사용자 지정 계산식 추가 - 재고일수 = 기초재고/3주평균 */
         	    	GridObj.SetSummaryBarValue('SUMMARY3','STOCK_DAY',0, (base_stock3/sales_mean_3week3) );
         	    	/* 사용자 지정 계산식 추가 - 유통기한 경과일수 = SUM(유통기한경과일수 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY3','PROD_TERM',i, prod_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 유통기한  = SUM(유통기한 * 기초재고)/SUM 기초재고 */
         	    	GridObj.SetSummaryBarValue('SUMMARY3','TERM_VAL',i, term_hidden/base_stock );
         	    	/* 사용자 지정 계산식 추가 - 1/3주 평균편차 = 1주평균판매 - 3주평균판매 */
         	    	GridObj.SetSummaryBarValue('SUMMARY3','WEEK_DEV_1_3',0, (sales_mean_1week3 - sales_mean_3week3) );
    	        
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
    	 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
				GridObj.SetSummaryBarColor('SUMMARY3', '0|153|0', color_tot);
}

