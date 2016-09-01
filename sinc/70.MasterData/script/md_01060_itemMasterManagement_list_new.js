//##############################################################
//## 프로그램ID     	: md_01060_itemMasterManagement_list_new.js
//## 프로그램명      	: 품목마스터관리
//## 개발자          	: 권용찬
//## 개발일자        	: 2011-11-01
//##
//## 관련 job file   : 
//## 관련 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-11-01  권용찬      create
//## 2.0        2013-08-27  남웅용      1.저장시 실패하는 경우로 인해 endquery에서 저장후 재조회
//##                                   2.저장후 재조회 시 그리드 위치 유지 코딩 추가
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'md_01060_itemMasterManagement_list_new';
var GridObj ; 													// WiseGrid 객체
var GridObj2;

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 변경사항 */
var rFirst = 0;							// 저장 작업후 재조회시 화면위치를 유지하기 위한 Row Index 저장 변수
var	save_nRow = '';

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
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        //document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        //document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
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


   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;   
    
   
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '맑은 고딕'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible 상태바 설정 


    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines = 2;        
    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
    GridObj.strActiveRowBgColor = "232|245|213";    //선택된 행의 배경색상을 설정한다.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '맑은 고딕'; 

}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) {        //  줄바꿈 : \n

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
	//GridObj.SetColHide("CRUD", true); 

	
	GridObj.AddHeader("ITEM_ID"				,"품목번호"				,"t_text"	,200	,66,false);//0
	GridObj.AddHeader("ITEM_NAME"			,"품목명"					,"t_text"	,200	,174,false);//0
	GridObj.AddHeader("SPEC"				,"스팩"					,"t_text"	,200	,90,false);//0
	GridObj.AddHeader("MTO_FLAG"			,"MTO/\nMTS"					,"t_text"	,200	,50,false);//0
	GridObj.AddHeader("EX_NATION"			,"국가코드"					,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("SPEC_UOM"			,"스팩\n단위"				,"t_text"	,200	,35,false);//0
	
	
	GridObj.AddHeader("ITEM_HIST"			,"품목이력\n연결"			,"t_text"	,200	,61,false);//0
	GridObj.AddHeader("BOX_PER_PALET"		,"파레트당\nBOX수"		,"t_number"	,200	,61,true);//0
	GridObj.AddHeader("CAT03"				,"수송계획\n기준정보"		,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("CAT06"				,"공장할당\n기준정보"		,"t_combo"	,200	,91,true);//0

	GridObj.AddHeader("REFE_ITEM1"			,"판매목표\n참조품목"		,"t_text"	,200	,66,true);//0
	GridObj.AddHeader("REFE_ITEM1_NAME"		,"판매목표\n참조품목명"		,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SEARCH_FLAG"			,"조회중지\nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CAT07"				,"수송중지\nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("SALES_PLAN_APPL_HIST","판매계획\n제품분류"		,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CM_GUBN"				,"CM구분"				,"t_combo"	,200	,74,true);//0

	GridObj.AddHeader("MULTI_FLAG"			,"멀티포장\n여부"			,"t_combo"	,200	,65,true);//0
	GridObj.AddHeader("QTY_PER_MULTI"		,"멀티포장\n수량"			,"t_number"	,200	,55,true);//0
	GridObj.AddHeader("QTY_PER_MULTI_UOM"	,"멀티포장\n수량단위"		,"t_text"	,200	,55,true);//0


	GridObj.AddHeader("MIN_PICK_QTY"		,"최소Picking\n수량"		,"t_number"	,200	,74,true);//0
	GridObj.AddHeader("PACK_PROC_FLAG"		,"Package\nProcess여부"	,"t_text"	,200	,84,true);//0
	GridObj.AddHeader("CAT01"				,"제품특징1"				,"t_combo"	,200	,104,true);//0
	GridObj.AddHeader("CAT02"				,"제품특징2"				,"t_combo"	,200	,134,true);//0
	GridObj.AddHeader("CAT04"				,"제품특징4"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("CAT05"				,"제품특징5"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("TRANS_ALLOC_FLAG"	,"수송비\n할당"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("PROD_ALLOC_FLAG"		,"제조비\n할당"			,"t_combo"	,200	,74,true);//0
	
	GridObj.AddHeader("DIVISION"			,"제품군"					,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("RECIPE_TYPE"			,"배합유형"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("MATERIAL_GROUP"		,"자재그룹"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT01"			,"영업품종\n그룹1"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT02"			,"영업품종\n그룹2"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT03"			,"영업품종\n그룹3"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT04"			,"영업품종\n그룹4"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT05"			,"영업품종\n그룹5"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("HR_TY1"				,"계층타입1"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY2"				,"계층타입2"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY3"				,"계층타입3"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY4"				,"계층타입4"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY5"				,"계층타입5"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("QTY"					,"기본단위내\n수량"		,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("BASE_UOM"			,"기본단위"				,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("TWGT_PER_BUOM"		,"총중량"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("NWGT_PER_BUOM"		,"순중량"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_PER_BUOM"		,"부피"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_UOM"				,"부피단위"				,"t_text"	,200	,74,false);//0

	/* 저장을 위한 히든 값 */
 	//GridObj.AddHeader("CUST_ITEM_ID"	,"CUST_ITEM_ID"		,"t_text" 	,100	,0 	,false); //0
 	//GridObj.AddHeader("CUST_STORE_CODE"	,"CUST_STORE_CODE"	,"t_text" 	,100	,0 	,false); //0

	GridObj.BoundHeader();	



    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('SPEC','right'); 
    GridObj.SetColCellAlign('SPEC_UOM','center'); 
    GridObj.SetColCellAlign('MTO_FLAG','center'); 
    GridObj.SetColCellAlign('QTY_PER_MULTI_UOM','center'); 
    GridObj.SetColCellAlign('ITEM_HIST','center'); 
    GridObj.SetColCellAlign('PACK_PROC_FLAG','right'); 
    GridObj.SetColCellAlign('EX_NATION','center'); 
    GridObj.SetColCellAlign('REFE_ITEM1','center'); 


	GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//기준재고
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	GridObj.SetColHide("CRUD",true);

}

function setHeader2(GridObj2) { // 주문정보

	
	GridObj2.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100		,0   ,false);
  	GridObj2.AddHeader("ITEM_ID"		,"ITEM_ID"     		,"t_text" 	,100		,0   ,false); //0 
  	GridObj2.AddHeader("PLANT_ID"		,"플랜트ID"      		,"t_text" 	,100		,60  ,false); //0 
  	GridObj2.AddHeader("PLANT_NAME"		,"플랜트명"     		,"t_text" 	,500		,77  ,false); //0  
  	GridObj2.AddHeader("PRIORITY"		,"생산우선순위"   		,"t_text" 	,500		,90  ,true); //0   
  	GridObj2.AddHeader("REP_ITEM_ID"	,"대표정품"			,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("REP_RATIO"		,"대표정품\n비율"     	,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("BOX_PER_PALET"	,"파레트당\nBOX수"    ,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_PICK_QTY"	,"최소PICKING\n수량" 	,"t_number" ,100.3		,88  ,true); //0   
  	GridObj2.AddHeader("ALLOC_RATE"		,"배분율"  			,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_ALLOC_QTY"	,"최소배분율"      	,"t_number" ,100.3		,77  ,true); //0    
  	GridObj2.AddHeader("DAYWEEK_PATTERN","생산선호\n요일"     	,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MC_TYPE"		,"포장유형"     		,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MIN_LOT_SIZE"	,"최소생산\n단위"		,"t_number" ,100.3		,70  ,false); //0   화면 감춤
  	GridObj2.AddHeader("MAX_LOT_SIZE"	,"최대생산\n단위"		,"t_number" ,100.3		,70  ,false); //0   화면 감춤
  	GridObj2.AddHeader("STD_FIX_COST"	,"표준원가\n고정비"	,"t_number" ,100.3		,70  ,false); //0   화면 감춤
  	GridObj2.AddHeader("STD_CHG_COST"	,"표준원가\n변동비"	,"t_number" ,100.3		,70  ,false); //0   화면 감춤
  	GridObj2.AddHeader("REAL_FIX_COST"	,"실제조원가\n고정비"	,"t_number" ,100.3		,70  ,false); //0   화면 감춤
  	GridObj2.AddHeader("REAL_CHG_COST"	,"실제조원가\n변동비"	,"t_number" ,100.3		,70  ,false); //0   화면 감춤
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    
	GridObj2.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	GridObj2.SetColHide("CRUD",true);
    
	GridObj2.SetColFix('PLANT_NAME');

}
   
	// 컬럼 고정

function setGrid(){
	//GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	GridObj.SetColFix('ITEM_NAME');
}


function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	//GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
}



/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {            
			/*edit cell색깔 변경*/         	
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell색깔 변경
				GridObj.SetCellBgColor('ITEM_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj.SetCellBgColor('CAT03', i, color_edit_col );
				GridObj.SetCellBgColor('CAT06', i, color_edit_col );
				GridObj.SetCellBgColor('EX_NATION', i, color_edit_col );
				GridObj.SetCellBgColor('CAT07', i, color_edit_col );
				GridObj.SetCellBgColor('CM_GUBN', i, color_edit_col );
				GridObj.SetCellBgColor('SALES_PLAN_APPL_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('MULTI_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI_UOM', i, color_edit_col );
				GridObj.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj.SetCellBgColor('PACK_PROC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('CAT01', i, color_edit_col );
				GridObj.SetCellBgColor('CAT02', i, color_edit_col );
				GridObj.SetCellBgColor('CAT04', i, color_edit_col );
				GridObj.SetCellBgColor('CAT05', i, color_edit_col );
				GridObj.SetCellBgColor('TRANS_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('PROD_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1_NAME', i, color_edit_col );
				GridObj.SetCellBgColor('SEARCH_FLAG', i, color_edit_col );

				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font 굵기
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font 굵기
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font 굵기
			}
		
		/* VER 2.0 변경사항 */
		if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
			GridObj.SetRowScroll(rFirst); 
		
/*			
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", 0);
	    document.all.sel_item_id.value	= sel_item_id;
	    
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", 0);
	    document.all.sel_item_name.value	= sel_item_name;			
		doQuery2(0);	
*/		
		
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save") {

		if(GridObj.GetStatus() == "true") {// 
			doQuery();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	//GridObj2.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'SHIP_QTY');
		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);
		  	
			/*edit cell색깔 변경*/         	
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell색깔 변경
				GridObj2.SetCellBgColor('PRIORITY', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_ITEM_ID', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_RATIO', i, color_edit_col );
				GridObj2.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('ALLOC_RATE', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_ALLOC_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('DAYWEEK_PATTERN', i, color_edit_col );
				GridObj2.SetCellBgColor('MC_TYPE', i, color_edit_col );
				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font 굵기
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font 굵기
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font 굵기
			}		  	  
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2") {

		if(GridObj2.GetStatus() == "true") {// 
			doQuery2(save_nRow);	
		} else {
			var error_msg = GridObj2.GetMessage();// 
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
	rFirst = 0; /* VER 2.0 변경사항 */

    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){
	
	// 참조 코드 컬럼이면 삭제여부 확인
	if( strColumnKey == "REFE_ITEM1"||strColumnKey == "REFE_ITEM1_NAME" ){
		if(GridObj.GetCellValue("REFE_ITEM1", nRow) != "") {
			if(confirm("참조품목을 삭제하시겠습니까?") == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow,"");
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, "");
				alert("저장하셔야 반영됩니다!");
			}
		}
		//openItemSearchPop( strColumnKey, nRow );
	}else if(strColumnKey == "ITEM_HIST" ){
		/* 품목이력 생성 */
		chk_item_hist(strColumnKey, nRow);
	} else{
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	    document.all.sel_item_id.value	= sel_item_id;
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);
	    document.all.sel_item_name.value	= sel_item_name;
	    
	    save_nRow = nRow;
	    
		doQuery2(nRow);		
	}     
	
}       


/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	/*
	// if 진행중인 데이터는 수정 불가!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {

	}else{
		alert("확정된 항목은 수정하실수 없습니다!");
		GridObj.SetComboSelectedIndex(strColumnKey, nRow,  nOldIndex);
		return; 
	}	
	 
	
	var version		= document.all.version.value;	
    var sel_dmd	= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
    document.all.sel_dmd.value = sel_dmd;
    document.all.sel_item_id.value = sel_item_id;
    */

    
    //doQuery3(nRow);
    
	//alert("calPrDateNo 시작");
    
	//calPrDateNo(nRow);
		
};


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	// 제품 코드 변경시 
	if( strColumnKey == "REFE_ITEM1" ){
		// 제품 명 set
		if(nNewValue != "") // 참조코드 삭제를 위해 빈칸을 만들면 팝업창을 띄우지 않는다
			getItemInfo( nRow, nNewValue );
	}	
}
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

/*┌─────────────────────────────────────────────────────┐
  │사용자 직접 입력값으로부터 제품정보 조회
  │제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색 Fnc
  └─────────────────────────────────────────────────────┘*/
function getItemInfo( nRow, nNewValue ) {
	
	var ItemId = nNewValue;
	// 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("REFE_ITEM1", nRow);
		return;
	}
	
	replenishPlan.getItemInfo('', ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
			// 일치하는 결과 1개
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow, arrList[0][0]);
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, arrList[0][1]);
			}
			else {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
		}
	});
}

/*┌──────────────────────────────────┐
  │제품 검색 POPUP  Fnc
  └──────────────────────────────────┘*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow;
	var OpenWindow = "md_01060_itemMasterManagement_list_new";
	var code_input = GridObj.GetCellValue("REFE_ITEM1", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx + "&OpenWindow=" + OpenWindow;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}

    
   
/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var domain		= document.all.domain.value;
       var item_type	= document.all.item_type.value;  
       var serch_word	= document.all.serch_word.value;  
       var sell_stop_date	= document.all.sell_stop_date.value;  
       
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("domain", domain);
       GridObj.SetParam("item_type", item_type);
       GridObj.SetParam("serch_word", serch_word);
       GridObj.SetParam("sell_stop_date", sell_stop_date);
       
       GridObj.DoQuery(servlet_url);
   }

/*┌──────────────────────────────────┐
  │DW 2 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2(nRow) { //주문정보

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);

	GridObj2.DoQuery(servlet_url);
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



//--------------------------------------   main_template 에 정의된 Event ---------------------------------------------------//
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/


/*┌──────────────────────────────────┐
  │WiseGrid Row Scroll Event
  └──────────────────────────────────┘*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
}

// 저장
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
	doSave2();
};

// 저장
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
function doSave2() {
 
	var GridObj2 = document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj2.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
 

/* 품목 이력 등록 */
function chk_item_hist(strColumnKey, nRow) {


    var item_id;
    var item_name;
    var hist_flag;
	var old_item_id;
	var old_item_name;
	var user_id = document.frm._user_id.value;
	var idx = nRow;

//alert(user_id);
		item_id 	= GridObj.GetCellValue("ITEM_ID", idx);
		item_name 	= GridObj.GetCellValue("ITEM_NAME", idx);
		hist_flag 	= GridObj.GetCellValue("ITEM_HIST", idx);
		

		
///////////////////////////////////
		if(hist_flag == "X" ){
			if(confirm(item_id+":"+item_name+" 은 품목이력이 연결되어 있지 않습니다.\n품목 이력을 생성하시겠습니다?") == 1 ) {
				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
			}
		}else{

			commonUtil.getCodeInfo("item_id", item_id, "md_01060_get_old_item_id", 
			{ 
				callback:function(arrList)
				{
					if( arrList.length == 1 )
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					else
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					
			if(confirm(item_id+"["+item_name+"] 은 "+old_item_id+"["+old_item_name+"] 품목이력이 연결되어있습니다.\n품목 이력을 다시 생성하시겠습니다?") == 1 ) {

				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
				
			}
				}
			});//commonUtil.getCodeInfo end
		}

}

