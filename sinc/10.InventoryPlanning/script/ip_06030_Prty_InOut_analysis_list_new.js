//## 프로그램ID      : ip_06030_Prty_InOut_analysis_list_new.js
//## 프로그램명      : 품종군 일자별 추이현황 (신규)
//## 변경자자        : 우종균
//## 개발일자        : 2011-12-06 화요일
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-12-06  우종균      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'ip_06030_Prty_InOut_analysis_list_new';

var GridObj ; 													// WiseGrid 객체
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
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
   
    //선택된 셀의 글자색 지정한다.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다
	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.	
    GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
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
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	 
//	var trans_start = document.frm.trans_start.value;
//	var item_id     = document.frm.item_id.value;
	var insel_prty	= document.all.insel_prty.value;
    var selgubn 	= document.frm.sel_gubn.value;
    var in_item_id 	= document.frm.in_item_id.value;
    var in_item_name= document.frm.in_item_name.value;

if(selgubn == "PRTY"){
	if(insel_prty == "01"){
     //alert("if(insel_prty == 01 && selgubn != PROD)");
		GridObj.AddHeader("CNFM_DATE"	,"일자"		   ,"t_text" 	   ,100	    ,60     ,false); //0   
		GridObj.AddHeader("DAY"	        ,"요일"	       ,"t_text" 	   ,100	    ,40     ,false); //0
		GridObj.AddHeader("CURR_FLAG"	,"CURR_FLAG"   ,"t_number" 	   ,100	    ,0      ,false); //0
		 
		GridObj.AddHeader("PROD_1"	    ,"생산"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_1"	    ,"판매"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_1"     ,"재고"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_1" ,"재고일수"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_2"	    ,"생산"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_2"	    ,"판매"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_2"     ,"재고"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_2" ,"재고일수"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_3"	    ,"생산"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_3"	    ,"판매"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_3"     ,"재고"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_3" ,"재고일수"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("SELL_PLAN_1" ,"판매계획"	   ,"t_number"     ,100.3   ,70     ,false); //0
		
			/* 이중 해더 추가 */
		GridObj.AddGroup("HD1",      		"면류");			//그리드에 그룹을 등록한다. 
		GridObj.AppendHeader("HD1", 	 "PROD_1");
		GridObj.AppendHeader("HD1",      "SELL_1");
		GridObj.AppendHeader("HD1",     "STOCK_1");
		GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
		
		GridObj.AddGroup("HD2",    		  "스낵류");			//그리드에 그룹을 등록한다. 
		GridObj.AppendHeader("HD2", 	 "PROD_2");
		GridObj.AppendHeader("HD2", 	 "SELL_2");
		GridObj.AppendHeader("HD2", 	"STOCK_2");
		GridObj.AppendHeader("HD2", "STOCK_DAY_2");	
		
		GridObj.AddGroup("HD3",      		"합계");			//그리드에 그룹을 등록한다. 
		GridObj.AppendHeader("HD3", 	 "PROD_3");
		GridObj.AppendHeader("HD3", 	 "SELL_3");
		GridObj.AppendHeader("HD3", 	"STOCK_3");
		GridObj.AppendHeader("HD3", "STOCK_DAY_3");
		GridObj.AppendHeader("HD3", "SELL_PLAN_1");
		
		/* 저장을 위한 히든 값 */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColCellAlign('CNFM_DATE',     'center');
		GridObj.SetColCellAlign('DAY',           'center');
		GridObj.SetColCellAlign('PROD_1',         'right');
		GridObj.SetColCellAlign('SELL_1',         'right'); 
		GridObj.SetColCellAlign('STOCK_1',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		
		GridObj.SetColCellAlign('PROD_2',         'right');
		GridObj.SetColCellAlign('SELL_2',         'right'); 
		GridObj.SetColCellAlign('STOCK_2',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_2',    'right'); 
		
		GridObj.SetColCellAlign('PROD_3',         'right');
		GridObj.SetColCellAlign('SELL_3',         'right'); 
		GridObj.SetColCellAlign('STOCK_3',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_3',    'right'); 
		   
		GridObj.SetColCellAlign('SELL_PLAN_1',    'right');   
		  
		GridObj.SetNumberFormat("PROD_1",      "###,###.#");
		GridObj.SetNumberFormat("SELL_1",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_1",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_2",      "###,###.#");
		GridObj.SetNumberFormat("SELL_2",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_2",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_3",      "###,###.#");
		GridObj.SetNumberFormat("SELL_3",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_3",     "###,###.#");
		    
		GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");   			
	}else{
		 	GridObj.AddHeader("CNFM_DATE"	  ,"일자"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"요일"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"생산/매입"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"판매"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"재고"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"재고일수"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"판매계획"	       ,"t_number"     ,100.3   ,100    ,false); //0
		/* 이중 해더 추가 */
		if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "면");							//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "스낵");						//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "기타제품");						//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "상품(삼다수, 냉동 제외)");		//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "상품(백산수, 냉동 제외)");		//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "삼다수 2L");					//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "백산수 2L");					//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "삼다수 0.5L");				//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "백산수 0.6L");					//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "수출");						//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="08"){
			GridObj.AddGroup("HD1",      "유통가공품(제품)");						//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="09"){
			GridObj.AddGroup("HD1",      "유통가공품(상품)");						//그리드에 그룹을 등록한다. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* 저장을 위한 히든 값 */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");    
		}	
} else {
	 		GridObj.AddHeader("CNFM_DATE"	  ,"일자"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"요일"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"생산/매입"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"판매"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"재고"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"재고일수"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"판매계획"	       ,"t_number"     ,100.3   ,100    ,false); //0
	   
		/* 이중 해더 추가 */
		
		if(selgubn == "PROD"){
			GridObj.AddGroup("HD1",      in_item_id+" - "+in_item_name);	//그리드에 그룹을 등록한다. 
		}else if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "면");								//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "스낵");							//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "기타제품");							//그리드에 그룹을 등록한다. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "상품(삼다수, 냉동 제외)");			//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "상품(백산수, 냉동 제외)");			//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "삼다수 2L");						//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "백산수 2L");						//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "삼다수 0.5L");					//그리드에 그룹을 등록한다. 
			GridObj.AddGroup("HD1",      "백산수 0.6L");						//SCM팀 이승용 대리 요청 : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "수출");							//그리드에 그룹을 등록한다. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* 저장을 위한 히든 값 */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");  
}	
}
		//GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
		//Hidden 컬럼
	//GridObj.SetColHide("CRUD",true);


	// 컬럼 고정

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

  	  // var sel_gubn	        = document.frm.sel_gubn.value;
  	   var selgubn 	= document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
	  		 if(selgubn=="PRTY"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
								if(insel_prty=="01"){
								GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_2', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_2', 	i, '255|255|0');
								
								GridObj.SetCellBgColor('PROD_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_3', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_3', 	i, '255|255|0');	
				  				
				  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
				  				
								GridObj.AddSummaryBar('SUMMARY','합계','summaryall','sum','PROD_1,SELL_1,STOCK_1,PROD_2,SELL_2,STOCK_2,PROD_3,SELL_3,STOCK_3,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
				  				
							 } else {
							 	GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
								
				        		GridObj.AddSummaryBar('SUMMARY','합계','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
							 }
				  		}
				  	} 
			} else if(selgubn=="PROD"){
			 		for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		
						// GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
					
						GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
						GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
						GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
						GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
		  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');

		           		GridObj.AddSummaryBar('SUMMARY','합계','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
		 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

				  		}
					} 
				}
					
		} else { 
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
  function GoSearch(service){
    var insel_prty	    = document.all.insel_prty.value;
    var in_item_id	    = document.all.in_item_id.value;
    var in_item_name	= document.all.in_item_name.value;
    var sel_gubn 	    = document.frm.sel_gubn.value;

	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);    

	
    if(sel_gubn=="PRTY"){
	    if(insel_prty=="01"){
	    	doQuery();
	    }else{
	    	doQuery2();
	    }
	} 
	else if(sel_gubn=="PROD"){
		  doQuery2();
	}
}
/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
 
   
// 데이터 저장
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	GridObj.DoQuery(servlet_url, "CRUD");
//	GridObj.DoQuery(servlet_url, "CRUD");
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	// user_id
	
//	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.

}

/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",              "search");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
       GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2() 
   {

       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode",             "search2");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
	   GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
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

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' 품목조회

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup 띄운다! 
				openItemPopup();
			}
		}
	});
}

// 품목 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//조회품목 상태 : '01'판매중	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// 품종/품목 radio 선택하면, sel_gubn 에 각각 맞는 조회 조건 값을 넣어준다
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.insel_prty.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.insel_prty.style.display = "block";
	}

}

function GridCellClick(){ //개체가 없다는 오류 해결 구문(Service.do)
	
}

// 더블 클릭 : 상세 팝업  //중장기 물량 점검  개발중
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;
	//var item_id = '101000105';


	if(selgubn == "PRTY"){ // 품종

		var division	= document.frm.insel_prty.value;
		var week_flag	= '31week';

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
					
	}else{ // 품목
		alert("품종으로 선택후 조회 하여 주시기 바랍니다. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		  
	}
}   