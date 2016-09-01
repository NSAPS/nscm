//#############################################################
//## 프로그램명		: sc_13050_set_roh_pr_plan.js / SCM품목추적조회
//## 프로그램명      	: 유통가공 부자재 발주화면
//## 개발자         	: 권용찬
//## 개발일자        	: 2012-08-31
//##
//## 관련 job file   : 
//## 관련 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2012-08-31  권용찬      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'sc_13050_set_roh_pr_plan';
var GridObj ; 													// WiseGrid 객체
var GridObj2;
var GridObj3;
var GridObj4;
//var GridObj5;

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
            maxWidthValue	= window.innerWidth;
            maxHeightValue	= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue	= document.body.clientWidth;
            maxHeightValue	= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue		+= Number(search_h); 
            tableHeightValue	+= Number(search_h); 
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
function init6() {
	GridObj6 = document.WiseGrid6;
	setProperty(GridObj6);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader6(GridObj6);  	//해더생성 
	setDefault6();        	//화면 기본 설정 
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

	GridObj.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex	= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines			= 2;   
    
   
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor		= "170|170|170";    //선택된 행의 배경색상을 설정한다.

     GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 8.5;					// Font Size 9
	//GridObj.strCellFontName = '맑은 고딕'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible 상태바 설정 


    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj2.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //헤더의 라인수를 설정한다. 
    GridObj2.nHDLines				= 2;        
    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor	= '180|82|205';
    GridObj2.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj2.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.

	// Cell Font Setting
	GridObj2.nCellFontSize			= 8.5;					// Font Size 9
	//GridObj2.strCellFontName = '맑은 고딕'; 
	GridObj2.bStatusbarVisible		= false;				// status bar visible 상태바 설정 

}
function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj3.nHDLineSize			= 13; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj3.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj3.nCellFontSize			= 8.5;					// Font Size 9

    GridObj3.bStatusbarVisible		= false;				// status bar visible 상태바 설정 

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj4.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle"; 
    //GridObj4.bStatusbarVisible = false;				// status bar visible 상태바 설정 
    
    
    //선택된 셀의 글자색 지정한다.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj4.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj4.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault5() { 

	GridObj5.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj5.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj5.nHDLineSize			= 12; //Header Size
    GridObj5.bStatusbarVisible		= false;				// status bar visible
    
    //GridObj2.strHDClickAction    = "sortsingle";
    //선택된 셀의 글자색 지정한다.
    GridObj5.strSelectedCellFgColor = '180|82|205';
    GridObj5.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj5.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj5.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault6() { 

	GridObj6.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj6.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj6.nHDLineSize			= 13; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    GridObj6.bStatusbarVisible		= false;				// status bar visible
    //선택된 셀의 글자색 지정한다.
    GridObj6.strSelectedCellFgColor	= '180|82|205';
    GridObj6.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj6.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj6.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj7.bRowSelectorIndex		= true;				//Row Selector 영역에 Row Index를 보여준다.
    GridObj7.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //선택된 셀의 글자색 지정한다.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj7.strActiveRowBgColor	= "170|170|170";    //선택된 행의 배경색상을 설정한다.
	GridObj7.nCellFontSize			= 8.5;					// Font Size 9
	GridObj7.bStatusbarVisible		= true;				// status bar visible 상태바 설정
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0   
 	GridObj.AddHeader("IF_FLAG"			,"전송\n상태"     ,"t_text" 		,100	,38  ,false); //0   
	
	
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("ITEM_ID"			,"품목번호"		 ,"t_text" 		,20		,60  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"품목명"     	 ,"t_text" 		,100	,140 ,false); //0    
	GridObj.AddHeader("SEQ"				,"순번"       	 ,"t_text" 		,20		,40  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"구성품명"      	 ,"t_text" 		,80	,80 ,false); //0    

 	GridObj.AddHeader("BASE_UOM"		,"기본\n단위"   	 ,"t_text" 		,100	,50 ,false); //0    
 	GridObj.AddHeader("STOCK_QTY"		,"주초\n재고"		 ,"t_number" 	,100.5	,60  ,true); //0   //2012-11-14 우종균 // 
 	GridObj.AddHeader("PROD_QTY"		,"금주\n필요량"    ,"t_number" 	,100.5	,60 ,false); //0    
 	
 	GridObj.AddHeader("IPGO"			,"금주\n입고량"    ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("SIL_IPGO"		,"실제\n입고량"	,"t_number" 	,100.5	,60 ,true); //0	//2013-02-12 우종균 //
 	    
 	
 	GridObj.AddHeader("W1_STOCK"		,"차주\n예상재고" 	 ,"t_number" 	,100.5	,60  ,false); //0   //2013-02-13 저장기능 구현// 
 	
 	GridObj.AddHeader("W1_PROD_QTY"		,"차주\n필요량"    ,"t_number" 	,100.5	,60 ,false); //0    
 	
 	GridObj.AddHeader("W1_IPGO"			,"차주\n입고량"    ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("W1_SIL_IPGO"		,"차주 실제\n입고량"	,"t_number" ,100.5	,60 ,true); //0	//2013-02-12 우종균 //


 	GridObj.AddHeader("W2_STOCK"		,"차차주\n예상재고" ,"t_number" 	,100.5	,60  ,false); //0   //2013-02-04 우종균 // 


 	GridObj.AddHeader("REQ_QTY"			,"발주\n필요량"     ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("PR_QTY"			,"실제\n발주량"     ,"t_number" 	,100.5	,60  ,true); //0
 	GridObj.AddHeader("TGT_LOC"			,"입고\n저장위치"   ,"t_combo" 	,100	,60  ,true); //0
 	GridObj.AddHeader("PR_DATE"			,"납기\n요구일"     ,"t_text" 	,100	,80  ,true); //0
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"최소\n발주량"     ,"t_number" 	,100.5	,80  ,true); //0	//2012-11-14 우종균 //
 	
 	GridObj.AddHeader("LOT_SIZE"		,"발주\n단위"       ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-13 저장기능 구현 우종균//
 	GridObj.AddHeader("SAFETY_STOCK"	,"안전\n재고"       ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-13 저장기능 구현 우종균//
 	
 	GridObj.AddHeader("UNIT_COST"		,"단가"     		  ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-12 우종균 //
 	GridObj.AddHeader("CUST_CODE"		,"공급\n업체"      ,"t_text" 		,100	,70  ,true); //0
 	GridObj.AddHeader("CUST_NAME"		,"공급\n업체"      ,"t_text" 		,100	,70 ,false); //0

 	//   
 	GridObj.AddHeader("PR_NO"			,"PR 번호"     	  ,"t_text" 	,100	,60   ,true); //0   
 	GridObj.AddHeader("IF_MSGS"			,"IF 메세지"       ,"t_text" 		,100	,220  ,true); //0   
 	//GridObj.AddHeader("ITYPE"			,"ITYPE"      ,"t_text" 	,100	,0  ,true); //0   조회를 위한 히든값


	GridObj.BoundHeader();	

	GridObj.SetNumberFormat("STOCK_QTY"   		,"#,##0.##");
	GridObj.SetNumberFormat("PROD_QTY"   		,"#,##0.##");
	
	GridObj.SetNumberFormat("SIL_IPGO"   		,"#,##0.##");		//2013-02-12 우종균 //
	
	GridObj.SetNumberFormat("IPGO"   			,"#,##0.##");
	GridObj.SetNumberFormat("W1_STOCK"   		,"#,##0.####");
	GridObj.SetNumberFormat("W1_PROD_QTY"   	,"#,##0.##");
	
	GridObj.SetNumberFormat("W1_SIL_IPGO"   	,"#,##0.##");		//2013-02-12 우종균 //
	
	GridObj.SetNumberFormat("W1_IPGO"   		,"#,##0.##");
	
	GridObj.SetNumberFormat("W2_STOCK"  		,"#,##0.####");
	GridObj.SetNumberFormat("REQ_QTY"   		,"#,##0.##");
	GridObj.SetNumberFormat("PR_QTY"   			,"#,##0.##");
	GridObj.SetNumberFormat("MIN_LOT_SIZE"  	,"#,##0.##");
	GridObj.SetNumberFormat("LOT_SIZE"   		,"#,##0.##");
	GridObj.SetNumberFormat("SAFETY_STOCK"   	,"#,##0.##");
	GridObj.SetNumberFormat("UNIT_COST"  		,"#,##0.##");



    GridObj.SetColCellAlign('SELECTED','center'); 
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('ITEM_NAME','left'); 
    GridObj.SetColCellAlign('SEQ','center'); 
    GridObj.SetColCellAlign('BASE_UOM','left');
    GridObj.SetColCellAlign('PR_DATE','center'); 
    
    
    
    //GridObj.SetColCellAlign('IF_FLAG','center'); 
    
    
    //GridObj.SetColCellAlign('SEL_DMD','center'); 

	GridObj.SetColFix('CONS_ITEM_NAME');


    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
    

	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
	//GridObj.SetColHDBgColor('STD_STOCK','253|228|229');
	//GridObj.SetColHDBgColor('PR_DATE_NO','253|228|229');
	//GridObj.SetColHDBgColor('PR_QTY','253|228|229');

    
    //GridObj.bCellFontBold = true; 
	
	GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	//Hidden 컬럼
	GridObj.SetColHide("CRUD",true);
	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	
	

}

/*┌──────────────────────────────────┐
  │WiseGrid Change Combo Event
  └──────────────────────────────────┘*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	// if 진행중인 데이터는 수정 불가!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {

	}else{
		alert("확정된 항목은 수정하실수 없습니다!");
		GridObj.SetComboSelectedIndex(strColumnKey, nRow,  nOldIndex);
		return;
	}	
	
	GridObj.SetCellValue("SELECTED", nRow, "1");
	//var version			= document.all.version.value;	
    //var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    //var sel_item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
    //var sel_item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
    
    //var sel_loc_name	= GridObj.GetCellHiddenValueValue("TGT_LOC", nRow);
    //var sel_loc_name	= GridObj.GetCellValue("TGT_LOC", nRow);
    
    //document.all.sel_dmd.value			= sel_dmd;
    //document.all.sel_item_id.value		= sel_item_id;
    //document.all.sel_item_name.value	= sel_item_name;
    //document.all.sel_loc_name.value		= sel_loc_name;
    

    
   // doQuery3(nRow);
    
	//alert("calPrDateNo 시작");
    
	//calPrDateNo(nRow);
		
};

function calPrDateNo(nRow){ // 변경된 정보(기준재고,안전제고)를 반영하여 입고 시기를 조절..

	//alert("calPrDateNo 시작");

	var version				= document.all.version.value;	
    var sel_dmd				= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", nRow);
	//alert("sel_dmd="+sel_dmd);
	//alert("sel_item_id="+sel_item_id);
    document.all.sel_dmd.value		= sel_dmd;
    document.all.sel_item_id.value	= sel_item_id;

    var std_stock			= GridObj.GetCellValue("STD_STOCK", nRow); //기준재고
    var tot_stock			= GridObj.GetCellValue("TOT_STOCK", nRow); //총재고
    
	//alert("std_stock="+std_stock);
	//alert("tot_stock="+tot_stock);
    var sales_mean_3month	= GridObj.GetCellValue("SALES_MEAN_3MONTH", nRow); //3개월 평균
    var avg_qty 			= GridObj.GetCellValue("AVG_QTY", nRow); //평균 (12개월)
    var last_year			= GridObj.GetCellValue("LAST_YEAR", nRow); //전년동월
    

    var lead_time			= GridObj.GetCellValue("LEAD_TIME", nRow); //리드타임
    var tot_lead_time		= GridObj.GetCellValue("TOT_LEAD_TIME", nRow); //리드타임 일자 환산
    
    var safety_stock		= GridObj.GetCellValue("SAFETY_STOCK", nRow); //평균 (12개월)    
    var pr_date_no			= GridObj.GetCellValue("PR_DATE_NO", nRow); //발주시기     
    
    var entr_date			= GridObj.GetCellValue("ENTR_DATE", nRow); //발주시기     

    
	if(sel_dmd =="DMD03"){ //3개월평균
		std_stock = sales_mean_3month;
	}else if(sel_dmd =="DMD04"){ //전년동월
		std_stock = last_year;
	}else if(sel_dmd =="DMD05"){ //평균(12개월)
		std_stock = avg_qty;
	}else{
		
	}
	// 1) 안전재고 변경
	// 	안전재고 = 리드타임 * 변경된 기준재고 * 1
	safety_stock = Math.round(lead_time * std_stock * 1)/1;
	
	// 2) 발주시기 변경
	//    발주시기 = (총재고-안전재고)/기준재고 -> 소숫점 첫째자리까지
	// 3) 입고시기 변경
	pr_date_no = Math.round(((tot_stock-safety_stock)/std_stock)*10)/10;
	
	//alert("safety_stock="+safety_stock);
	//alert("pr_date_no="+pr_date_no);
	
		pr_date_no_temp = Math.round(tot_lead_time);
		//pr_date_no_temp = Math.round(0);		//alert("pr_date_no_temp="+pr_date_no_temp);
		var result;
		commonUtil.toDate(version,'YYYY-MM-DD','DAY', pr_date_no_temp ,{
		callback:function(result){
		// result값이 입고시기이다.
		 entr_date =  	result;
		//alert("entr_date="+entr_date);
		GridObj.SetCellValue("ENTR_DATE", nRow,  entr_date);    
		}
		});
		
	
	
	
	GridObj.SetCellValue("PR_DATE_NO",		nRow,  	   pr_date_no);    
	GridObj.SetCellValue("SAFETY_STOCK",	nRow,	 safety_stock);    
	GridObj.SetCellValue("STD_STOCK",		nRow,  		std_stock);

	GridEndQuery() // 입고 시기 별 cell 색갈 재설정

}


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	
	GridObj.SetCellValue("SELECTED", nRow, "1");

	//ENTR_DATE
	if( strColumnKey == "ENTR_DATE"){
		return;
	}

	// if 진행중인 데이터는 수정 불가!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("확정된 항목은 수정하실수 없습니다!");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
		return;
	}
	
	if( strColumnKey == "SELECTED"){
		return;
	}

    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);

    document.all.sel_item_id.value = sel_item_id;

	dw1_cal(nRow);
}

function cal_type_cal(){

	for(var i=0;i<GridObj.GetRowCount();i++) {
		//alert(i);
		dw1_cal(i);					
	} 
	
}

function dw1_cal(nRow){
	
	//alert(nRow);
	
	//var sel_data = GridObj.GetSelectedCells(); // 선택한 부분의 key와 row를 가져온다
	var i		=	0;
	var rowNo	=	nRow;

	var w1_stock		=	0;	//차주 예상재고	2013-02-13
	var stock_qty		=	0;	//주초 재고량		2013-02-13
    var ipgo			=	0;	//금주 필요량		2013-02-13
	var sil_ipgo		=	0;  //실제 입고량
	var	prod_qty		=	0;	//금주 필요량
	
	var w2_stock		=	0;	//차차주 예상재고	2013-02-13
	var w1_stock_qty	=	0;	//차주 예상재고량		2013-02-13
    var w1_ipgo			=	0;	//차주 필요량		2013-02-13
	var w1_sil_ipgo		=	0;	//차주 실제 입고량
	var	w1_prod_qty		=	0;	//차주 필요량
	
	var cal_type = "";
	
		if(document.frm.cal_type[0].checked 	  == true) cal_type = "ipgo";
		else cal_type = "sil_ipgo";
	
	
	
	for(var i=0;i<GridObj.GetRowCount();i++){
		
		var w1_stock		=	GridObj.GetCellValue("W1_STOCK", nRow);		//	차주 예상재고량
		var stock_qty		=	GridObj.GetCellValue("STOCK_QTY", nRow);	//	주초 재고량
		var ipgo			=	GridObj.GetCellValue("IPGO", nRow);			//	금주 입고량
		var sil_ipgo		=	GridObj.GetCellValue("SIL_IPGO", nRow);		//	금주 입고량
		var prod_qty		=	GridObj.GetCellValue("PROD_QTY", nRow);		//	금주 필요량
		
		var w2_stock		=	GridObj.GetCellValue("W2_STOCK", nRow);		//	차주 예상재고량

		var w1_ipgo			=	GridObj.GetCellValue("W1_IPGO", nRow);			//	차주 입고량
		var w1_sil_ipgo		=	GridObj.GetCellValue("W1_SIL_IPGO", nRow);		//	차주 입고량
		var w1_prod_qty		=	GridObj.GetCellValue("W1_PROD_QTY", nRow);		//	차주 필요량
		
		//var tgt_loc		=	GridObj.GetCellValue("TGT_LOC", nRow);		//	차주 필요량
		
		
	
			if(cal_type=="ipgo"){
			w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ strToNum(ipgo)
			w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + strToNum(w1_ipgo)
			
			GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//GridObj.SetCellValue("TGT_LOC",			nRow,  	   tgt_loc);
			
			}else if(cal_type=="sil_ipgo"){
			w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ 	strToNum(sil_ipgo)			
			w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + 	strToNum(w1_sil_ipgo)	

			GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//GridObj.SetCellValue("TGT_LOC",			nRow,  	   tgt_loc);
			}//else{
				
			//w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ 	strToNum(sil_ipgo)		- strToNum(ipgo)
			//w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + 	strToNum(w1_sil_ipgo)	- strToNum(w1_ipgo)
			//GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			//GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//1}
				
			
	}
		

	
} 

function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	
	if(nRow == 0){
		alert("재고 정보는 수정할수 없습니다");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw3()
}


   
function setHeader2(GridObj2) {        

  	GridObj2.AddHeader("ITEM_ID"	,"품목번호"      	,"t_text" 	,10			,0    ,false); //0   
  	GridObj2.AddHeader("SEQ"		,"BEDAT"       	,"t_text" 	,100		,0    ,false); //0   
  	GridObj2.AddHeader("TXZ01"		,"품목명"       	,"t_text" 	,100		,177  ,false); //0   
  	GridObj2.AddHeader("BANFN"		,"PR번호"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("BADAT"		,"신청일"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("LFDAT"		,"납품요청일"     ,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("MENGE"		,"PR수량"      	,"t_number" ,100.3		,87   ,false); //0   
  	GridObj2.AddHeader("EBELN"		,"PO번호"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("BEDAT"		,"PO일자"      	,"t_text" 	,100		,87   ,false); //0   
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    
    
    GridObj2.SetNumberFormat("MENGE"  , "#,##0.##");
    //GridObj2.SetColCellAlign('SELECTED','center'); 
    
	//GridObj2.SetColFix('PR_NO');

}
   
function setHeader3(GridObj3) {        
       

	var header_length	= 0, j;
	
	
	
	var item_id			= document.all.sel_item_id.value;
	
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_daily_header",{
		callback:function(result){


		  	
		  	GridObj3.AddHeader("ITEM_ID"	,"품목번호"      	,"t_text" 	,10			,0  ,false); //0   
		  	GridObj3.AddHeader("ITEM_NAME"	,"품목명"       	,"t_text" 	,100		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_GUBN"	,"구분코드"      	,"t_text" 	,100.3		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_NAME"	,"구분"       	,"t_text" 	,100.3		,80 ,false); //0   


			for(var i=0 ; i < 22 ; i++){  //19
				if(i < result.length) {
					GridObj3.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 22) { //19
						GridObj3.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,78  ,false);
					}
					else {
						GridObj3.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,78  ,false);
					}
				}
			}
		 	
		  	GridObj3.AddHeader("TP_FLAG"	,"타임팬스"      	,"t_number" ,100.3		,0  ,false); //0   
			
			GridObj3.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
		   //GridObj3.SetColCellAlign('SEL_NAME','center'); 
			//GridObj3.SetColFix('SEL_NAME');

			//GridObj3.SetColHDBgColor('MON_M00',		'253|228|229');
			//GridObj3.SetColCellBgColor('MON_M00',	'253|228|229');//PLT
			

			GridObj3.SetNumberFormat("DAY_P15"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P14"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P13"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P12"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P11"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P10"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P09"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P08"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P07"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P06"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D00"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D06"  , "#,##0");			
		
		}
	   
	});
}

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	GridObj4.AddHeader("ITEM_ID"	,"품목번호"      	,"t_text" 	,10		,0  ,false); //0   
  	
	if(week_flag =="M"){ //월간
		GridObj4.AddHeader("ITEM_NAME"	,"월간 사용실적"   	,"t_text" 	,100	,87 ,false); //0	
	}else if(week_flag =="W"){//W 주간 
		GridObj4.AddHeader("ITEM_NAME"	,"주간 사용실적"   	,"t_text" 	,100	,87 ,false); //0	
	}else{
		GridObj4.AddHeader("ITEM_NAME"	,"일간 사용실적"   	,"t_text" 	,100	,87 ,false); //0
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //월간
		var header_id = "op_02010_Long_Term_Planning_list_dw4_header";	
		
	}else if(week_flag =="W"){//W 주간 
		var header_id = "op_02010_Long_Term_Planning_list_dw4_weekly_header";	
	}else{
		var header_id = "op_02010_Long_Term_Planning_list_dw4_daily_header";
		//alert('op_02010_Long_Term_Planning_list_dw4_daily_header');
	}	
 	
	
	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){

			for(var i=0 ; i < 10 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader를 완료한 후 헤더를 그리드에 바인딩한다. 
			
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
				
			if(week_flag =="M"){ //월간
				GridObj4.SetColHDBgColor('MM_3_QTY','253|228|229');					
				
			}else if(week_flag =="W"){//W 주간 
				GridObj4.SetColHDBgColor('MM_9_QTY','253|228|229');	
			}else{
				GridObj4.SetColHDBgColor('MM_3_QTY','253|228|229');
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
				GridObj4.SetNumberFormat("MM_9_QTY"  , "#,##0");
			
			
			
			
			doQuery4();  	
		}


	});
	

}

function setHeader5(GridObj5) {        
       
  	GridObj5.AddHeader("ITEM_ID"	,"품목번호"  	,"t_text" 	,10		,0    ,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"	,"품목명"  	,"t_text" 	,100	,130  ,false); //0   
 	GridObj5.AddHeader("GUBN"		,"구분"      ,"t_text" 	,100	,56   ,false); //0   
 	GridObj5.AddHeader("QTY"		,"사용량"    	,"t_number" ,100.3	,86   ,false); //0   
 	GridObj5.AddHeader("YYYY_MM"	,"월"     	,"t_text" 	,1000	,56  ,false); //0   



	GridObj5.BoundHeader();	

    GridObj5.SetNumberFormat("QTY"  , "#,##0");



    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj5.SetColCellAlign('ITEM_ID','center'); 
    GridObj5.SetColCellAlign('GUBN','center'); 
    GridObj5.SetColCellAlign('YYYY_MM','center'); 
    
    

}
 
function setHeader6(GridObj6) {        
       
  	GridObj6.AddHeader("ITEM_ID"	,"품목번호"  		,"t_text" 	,10		,0   ,false); //0   
  	GridObj6.AddHeader("ITEM_NAME"	,"품목명"  		,"t_text" 	,100	,0   ,false); //0   
 	GridObj6.AddHeader("PLANT"		,"공장"  		,"t_text" 	,100	,81  ,false); //0   
 	GridObj6.AddHeader("MADE_DATE"	,"제조일자"  		,"t_text" 	,100	,0   ,false); //0   
 	GridObj6.AddHeader("END_DATE"	,"유통기한"      ,"t_text" 	,100	,85  ,false); //0   
 	GridObj6.AddHeader("TERM"		,"잔여일"   		,"t_number" ,100	,65  ,false); //0   
 	GridObj6.AddHeader("QTY"		,"재고량"			,"t_number" ,1000.3	,95  ,false); //0   
 	GridObj6.AddHeader("FLAG"		,"FLAG"			,"t_text" 	,1000	,0   ,false); //0   

	GridObj6.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj6.SetColCellAlign('ITEM_ID','center'); 
    GridObj6.SetColCellAlign('END_DATE','center'); 

    //  trim 이용해서 ##.# 가져와도 스트링이라 넘버 포멧이 안먹힘
    GridObj6.SetNumberFormat("QTY"  , "#,##0");
    //GridObj6.SetNumberFormat("PLT_QTY"  , "#,##0");
    

	//GridObj6.SetColHDBgColor('BOX_QTY','253|228|229');
	//GridObj6.SetColHDBgColor('PLT_QTY','253|228|229');

}

function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("CONS_ITEM_ID"	,"품목번호"  	,"t_text" 	,10		,0    ,false); //0   
  	GridObj7.AddHeader("CONS_ITEM_NAME"	,"품목명"  	,"t_text" 	,100	,0    ,false); //0   
  	GridObj7.AddHeader("ITEM_ID"		,"품목번호"  	,"t_text" 	,10		,60   ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"		,"품목명"  	,"t_text" 	,100	,130  ,false); //0   
 	GridObj7.AddHeader("PROD_QTY"		,"생산량"		,"t_number" ,100.6	,68   ,false); //0   
 	GridObj7.AddHeader("USE_QTY"		,"이론사용량"	,"t_number" ,100.6	,68   ,false); //0   

	GridObj7.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");
 
    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj7.SetColCellAlign('ITEM_ID','center'); 

    GridObj7.SetNumberFormat("PROD_QTY", "#,##0");
    GridObj7.SetNumberFormat("USE_QTY",  "#,##0");


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

function setGrid5(){
	//GridObj5.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
		
	//GridObj5.SetGroupMerge('ITEM_NAME');
	
}

function setGrid3(){
	//GridObj3.SetColCellBgColor('PLT_QTY',color_edit_col);//PLT
	
	
	
}


/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
    
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell색깔 변경
				//GridObj.SetCellBgColor('PR_QTY', i, '253|128|129');color_edit_col
				
				var w1_stock	=	GridObj.GetCellValue('W1_STOCK',i) 
				var stock_qty	=	GridObj.GetCellValue('STOCK_QTY',i) 
				var ipgo		=	GridObj.GetCellValue('IPGO',i) 
				
				GridObj.SetCellBgColor('PR_QTY',		i,  color_edit_col);
				GridObj.SetCellBgColor('PR_DATE',		i,  color_edit_col);
				GridObj.SetCellBgColor('TGT_LOC',		i,  color_edit_col);
				GridObj.SetCellBgColor('CUST_CODE',		i,  color_edit_col);
				GridObj.SetCellBgColor('STOCK_QTY',		i, 	color_edit_col);	//주초 재고량 저장기능 구현 2012-10-29//
				
				
				GridObj.SetCellBgColor('MIN_LOT_SIZE',	i, 	color_edit_col);	//최소 발주량 저장기능 구현 2012-10-29//
				GridObj.SetCellBgColor('UNIT_COST',		i, 	color_edit_col);	//단가 저장기능 구현 2013-02-12//
				
				GridObj.SetCellBgColor('SIL_IPGO',		i, 	color_edit_col);	//실입고량		저장기능 구현 2013-02-12//
				GridObj.SetCellBgColor('W1_SIL_IPGO',	i, 	color_edit_col);	//차주 실입고량	저장기능 구현 2013-02-12//
				
				GridObj.SetCellBgColor('LOT_SIZE',		i, 	color_edit_col);	//발주단위		저장기능 구현 2013-02-13//
				GridObj.SetCellBgColor('SAFETY_STOCK',	i, 	color_edit_col);	//안전재고		저장기능 구현 2013-02-13//
				
				
				if(GridObj.GetCellValue('PR_QTY',i) == 0 ){  // GREEN
				}else{
					GridObj.SetCellBgColor('ITEM_ID', i, '0|191|255');
					GridObj.SetCellBgColor('ITEM_NAME', i, '0|191|255');
				}					
				

				
				
					
			} 

        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else{ // 삭제, 전송 상태일시 메인그리드 제조회   
    	GoSearch();
    }
    
    /* 발주 필요량 계산*/
    cal_pr_qty();
    
	
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	//GridObj2.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'SHIP_QTY');
		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	/* 
		// cell색깔 변경  : 입고예정일이 미래인 항목들 cell색깔 = BLUE!!
		for(var i=0;i<GridObj2.GetRowCount();i++) {
			if(GridObj2.GetCellValue('DATE_FLAG',i) == Number(1) ){  // GREEN
				GridObj2.SetCellBgColor('IPGO', i, '0|191|255'); //0-191-255
			}
		}	        	               
	*/
	
	
	
}

function GridEndQuery3() {
	
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") { 
			                          
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}


	var header_length = 0, j;

	/* TP_FLAG 확인후 세팅 */
	var item_id = document.all.sel_item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_daily_header",{
	callback:function(arrList){
		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][3] == "true") {
				//alert(arrList[i][1]+"="+arrList[i][3])
				//GridObj3.SetColCellActivation(arrList[i][1],"edit");
				GridObj3.SetColCellBgColor(arrList[i][1],color_edit_col);//PLT				
			} 	
			else {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}
///////////////////////////////////////////////		
		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][4] == "true") {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellActivation(arrList[i][1],"edit");
				//GridObj3.SetColCellBgColor(arrList[i][1],color_edit_col);//PLT				
			} 	
			else {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}		
	}
	}
	);
	
	
}

function GridEndQuery4() {
	
	var mode = GridObj4.GetParam("mode");
	var error_msg = '';
	          
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
	
	var mode = GridObj5.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search5") {
		if(GridObj5.GetStatus() == "true") {      
		     GridObj5.SetGroupMerge(	'ITEM_ID,ITEM_NAME');
		}
		else { 
			error_msg = GridObj5.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	doQuery3();
	doQuery4();
	//alert("nRow="+nRow)
	setGrid5();
}

function GridEndQuery6() {
	
	var mode = GridObj6.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search6") {
		if(GridObj6.GetStatus() == "true") {
		  
		  GridObj6.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PLANT');
		  
		  //GridObj6.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'QTY');
		  //GridObj6.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);
		  
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj6.GetRowCount();i++) {
			// cell색깔 변경
					if(GridObj6.GetCellValue('FLAG',i) ==  0 ){  // GREEN
				
					//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
					GridObj6.SetCellBgColor('END_DATE', i, '253|128|129');
					GridObj6.SetCellBgColor('TERM', i, '253|128|129');
					GridObj6.SetCellBgColor('QTY', i, '253|128|129');
				}else{
					
				}  
			} 

		  
		}
		else { 
			error_msg = GridObj6.GetMessage(); 
			alert(error_msg);            
		}
	}
	
}

function GridEndQuery7() {
	
	var mode = GridObj7.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  GridObj7.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'PROD_QTY,USE_QTY');
		  GridObj7.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*┌──────────────────────────────────┐
  │DW 3 전개제고 연산
  └──────────────────────────────────┘*/
function cal_pr_qty() {
	//alert("cal_pr_qty");
	
	
	//return;
	var item_id;
	var w2_stock;
	var min_lot_size;
	var lot_size;
	var req_qty = 0;
	var safety_stock;
	
	//발주량 계산	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		
		item_id			= GridObj.GetCellValue('ITEM_ID', i);
		w2_stock		= Number(GridObj.GetCellValue('W2_STOCK', i));
		min_lot_size	= Number(GridObj.GetCellValue('MIN_LOT_SIZE', i));
		lot_size		= Number(GridObj.GetCellValue('LOT_SIZE', i));
		safety_stock	= Number(GridObj.GetCellValue('SAFETY_STOCK', i));
		 
		if (min_lot_size == 0){
			min_lot_size = 1;
		}
		
		
		if( Number(w2_stock) < Number(0) ){ //차차주 예상재고가 - 이면 발주량 산정
			if(safety_stock == Number(0)){ 
				//req_qty = Number(w2_stock)*-1
				req_qty = min_lot_size*Math.ceil((Number(w2_stock)*-1)/min_lot_size)
				//alert("w2_stock="+w2_stock);
				//alert("req_qty="+req_qty);
			}else{
				//req_qty = min_lot_size;
				req_qty = min_lot_size*Math.ceil((safety_stock+w2_stock)/min_lot_size)
			}
				
				
		}else if(w2_stock < Number(safety_stock)){
			req_qty = min_lot_size;
		}else{
			req_qty = 0;
		}
		
		if((w2_stock + req_qty) < safety_stock ){ //차차주 예상재고 + 최소발주량 이 안전재고보다 작으면 발주단위 1회분씩 증가.
			//req_qty = min_lot_size*Math.ceil(min_lot_size/safety_stock)
			
			
			//do {
				//req_qty = req_qty+lot_size
			//} while( (w2_stock+ req_qty) < safety_stock )

		}else{

		}
		
		
		GridObj.SetCellValue('REQ_QTY', i,  req_qty);
		
		//return;
	} 
	
	


}		

/*┌──────────────────────────────────┐
  │그리드의 원 클릭 이벤트
  └──────────────────────────────────┘*/
function GridCellClick(strColumnKey, nRow) {

}	


// 컬럼 축소 & 확장
function colExtension(obj){
	var GridObj3 = document.WiseGrid3;
	
	var value = document.all.btn_2.value 

	if(value == "확대"){// true => 숨김 상태
		document.all.btn_2.value = "축소";
		// 숨김 모드 해제
		GridObj3.SetColHide("DAY_P15", false);
		GridObj3.SetColHide("DAY_P14", false);
		GridObj3.SetColHide("DAY_P13", false);
		GridObj3.SetColHide("DAY_P12", false);
		GridObj3.SetColHide("DAY_P11", false);
		GridObj3.SetColHide("DAY_P10", false);
		GridObj3.SetColHide("DAY_P09", false);
		GridObj3.SetColHide("DAY_P08", false);
		GridObj3.SetColHide("DAY_P07", false);
		GridObj3.SetColHide("DAY_P06", false);
		GridObj3.SetColHide("DAY_P05", false);
		GridObj3.SetColHide("DAY_P04", false);
		GridObj3.SetColHide("DAY_P03", false);
		
		GridObj3.strScrollBars='horizontal';

	}
	else{
		//alert(22);
		document.all.btn_2.value = "확대";
		//숨김모드
		GridObj3.SetColHide("DAY_P15", true);
		GridObj3.SetColHide("DAY_P14", true);		
		GridObj3.SetColHide("DAY_P13", true);		
		GridObj3.SetColHide("DAY_P12", true);		
		GridObj3.SetColHide("DAY_P11", true);		
		GridObj3.SetColHide("DAY_P10", true);		
		GridObj3.SetColHide("DAY_P09", true);		
		GridObj3.SetColHide("DAY_P08", true);		
		GridObj3.SetColHide("DAY_P07", true);		
		GridObj3.SetColHide("DAY_P06", true);		
		GridObj3.SetColHide("DAY_P05", true);		
		GridObj3.SetColHide("DAY_P04", true);		
		GridObj3.SetColHide("DAY_P03", true);	
		
		
	}
}

               
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	
	GridObj4.ClearGrid( ); 
	setHeader4(GridObj4);	
	GridObj5.ClearGrid( ); 
	setHeader5(GridObj5);	
	GridObj6.ClearGrid( ); 
	setHeader6(GridObj6);	
	GridObj7.ClearGrid( ); 
	setHeader7(GridObj7);	
	
	//document.all.btn_2.value = "축소";
	//colExtension();
	var yyyy_mm = document.all.sysdate.value;
	
	
	
	document.all.from_mm.value = yyyy_mm;
	document.all.to_mm.value = yyyy_mm;	
	
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){     
	
	if( strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "IF_FLAG" ){
		//alert("완 반 제품 제고 팝업!!");
		var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
		var item_name	= GridObj.GetCellHiddenValue("ITEM_NAME", nRow);
		//var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
		var qty			= '1';
        var prod_ver	= '';
		
		var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_bom_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name +"&prod_ver=" + prod_ver+ "&qty=" + qty;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=430, top=200, left=200";
		var newWin = window.open(service_url, "sc_13020_set_prod_mst_bom_pop_up", pop_win_style);  
		newWin.focus();				
		
		//return;		
	}else if(strColumnKey == "REQ_QTY" ){//필요량 클릭시 발주량으로 전환!!
		//alert("필요량 클릭시 발주량으로 전환!!");
		GridObj.SetCellValue("PR_QTY", nRow, GridObj.GetCellValue("REQ_QTY", nRow) );
		//GridObj.SetCellValue("TGT_LOC", nRow, GridObj.GetCellHiddenValue("TGT_LOC", nRow) );
		GridObj.SetCellValue("SELECTED", nRow, "1");
		return;		
	}
	

	var yyyy_mm = document.all.sysdate.value;
	document.all.week_flag.value = 'D'
	document.all.from_mm.value = yyyy_mm;
	document.all.to_mm.value = yyyy_mm;		

	// DW1 재조회시 DW3 초기화

    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);

    document.all.sel_item_id.value	= sel_item_id;
    document.all.sel_item_name.value	= sel_item_name;

	document.frm.serch_flag_chk.checked=false;
	document.frm.serch_flag.value = "N";
	//document.all.week_flag.value = 'M'
	

	//document.all.btn_2.value = "축소";
	//colExtension();


	doQuery2(nRow);	
	// doQuery3 은 다이나믹 해더 때문에 DW5 번 종료후 실행
	//doQuery3(nRow);	
	//doQuery4(nRow);	
	doQuery5(nRow);	
	doQuery6(nRow);	
	doQuery7(nRow);	
	
	
	
	
    

	
}        
   
/*┌──────────────────────────────────┐
  │DW 1 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cust_code	= document.all.cust_code.value;
       var loc_id		= document.all.loc_id.value;
       var item_type	= document.all.item_type.value;
       //var edit_flag	= document.all.edit_flag.value;
       //var domain		= document.all.domain.value;
       
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("item_type"	, item_type);
       GridObj.SetParam("cust_code", cust_code);	//공급업체
       GridObj.SetParam("loc_id", 		loc_id);	//유통가공 작업장
      // GridObj.SetParam("edit_flag"	, edit_flag);
       
       GridObj.DoQuery(servlet_url);
   }

/*┌──────────────────────────────────┐
  │DW 2 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var seq		= GridObj.GetCellValue("SEQ", nRow);
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("seq", seq);

	GridObj2.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │DW 3 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= document.all.sel_item_id.value;
    //var std_stock = GridObj.GetCellValue("STD_STOCK", nRow);
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	//GridObj3.SetParam("std_stock", std_stock);
	
	GridObj3.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │DW 4 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= document.all.sel_item_id.value;
	//var itype	= document.all.sel_itype.value;
	
	//alert(itype);
	var week_flag	= document.all.week_flag.value;
	
	//setTimeout("countdown()",10);
	
	//alert(week_flag);
	
	if(week_flag =="M"){ //월간
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4");	
	}else if(week_flag =="W"){//W 주간 
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4_weekly");	
	}else {// 일간	--2013-03-26 우종균 추가 -- 
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4_daily");	
	}	
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj4.SetParam("itype", itype);
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.DoQuery(servlet_url);
}





/*┌──────────────────────────────────┐
  │DW 5 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype	= document.all.sel_itype.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj5.SetParam("itype", itype);
	GridObj5.SetParam("mode", "search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │DW 6 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery6(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype	= document.all.sel_itype.value;
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj6.SetParam("itype", itype);
	GridObj6.SetParam("mode", "search6");
	GridObj6.SetParam("item_id", item_id);
	GridObj6.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │DW 7 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery7(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var item_id	= document.all.sel_item_id.value;
	
	var from_mm	= document.all.from_mm.value;
	var to_mm	= document.all.to_mm.value;
	var serch_flag	= document.all.serch_flag.value;
	var itype	= document.all.sel_itype.value;
	

	
	
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj7.SetParam("itype", itype);
	GridObj7.SetParam("mode", "search7");
	GridObj7.SetParam("item_id", item_id);
	GridObj7.SetParam("from_mm", from_mm);
	GridObj7.SetParam("to_mm", to_mm);
	GridObj7.SetParam("serch_flag", serch_flag);
	
	
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
	
	yyyy_mm =  GridObj4.getColHDText(strColumnKey);
	
	yyyymmdd =  GridObj4.getColHDText(strColumnKey);
	
	//"자재사용실적"
	

	var week_flag = document.all.week_flag.value;

	
	if(yyyy_mm == "월간 사용실적" ||yyyy_mm == "주간 사용실적"||yyyymmdd == "일간 사용실적"){  // DW 4의 첫칸의 제품코드 선택시 week_flag 설정 변경으로 주간/월간 실적  조회
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
			
		}else if(week_flag == 'W'){
			//alert("위크 플래그 월간으로 세팅");
			document.all.week_flag.value = 'D';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
				
		}else{		//2013-03-26 우종균 추가--
			//alert("위크 플래그 일간으로 세팅");
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
				
		}
		
	} else{
		if(week_flag == 'M'){
			document.all.from_mm.value = yyyy_mm;
			document.all.to_mm.value = yyyy_mm;
			doQuery7(); // doQuery7();
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
		document.all.from_mm.value = yyyy_mm;
		document.all.to_mm.value = yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm = document.all.from_mm.value;
	var to_mm = document.all.to_mm.value;
	
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // 이전달
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2) - Number(1);
		
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
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var del_plt = GridObj2.GetCellValue("PLT_QTY", nRow);

	if(strColumnKey == "DEL_PLT"){
		if(nNewValue > 0){
			GridObj2.SetCellValue("SELECTED", nRow, "1");
		}else{
			GridObj2.SetCellValue("SELECTED", nRow, "0");
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj2.SetCellValue("DEL_PLT", nRow, del_plt)			
		}else{
			GridObj2.SetCellValue("DEL_PLT", nRow, "0")			
		}
	}
}

// 저장
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

// 저장
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "SELECTED");
 
 return;
}

function GoExePlan(){

	if(confirm("기존에 있던 당일 계획이 초기화됩니다. 중장기 자재 수급 계획을 수립하시겠습니까?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	GridObj.SetParam("mode", "ExePlan");
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.doQuery(servlet_url);

	
}

function GoDelete(){
	
			
		
		
		if(confirm("선택 하신 품목을 삭제하시겠습니까?") == 1 ) {
			
		}
		else{
			return;
		}		

	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "delete");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version", version);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


function GoIf(){

	
	/*
	//EDIT_FLAG	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		if(GridObj.GetCellValue('EDIT_FLAG',i) == 'Y' ){  // GREEN
			alert("item_id"+GridObj.GetCellValue('EDIT_FLAG',i));
				
		}else{
			
		}  
	}	

	return;
	*/ 

   var cust_code	= document.all.cust_code.value;
   var loc_id		= document.all.loc_id.value;


	if(cust_code==""||cust_code==null || loc_id==""||loc_id == null){
		alert("조건을 모두 지정하시기  바랍니다");
		return;
	} else{

		
	}

	if(confirm("선택 하신 품목을 전송하시겠습니까?") == 1 ) {
		
	}
	else{
		return;
	}		
			
	
//return;

	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var version		= document.all.version.value;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);

	GridObj.SetParam("cust_code", cust_code);	//공급업체
	GridObj.SetParam("loc_id", 		loc_id);	//유통가공 작업장


	//GridObj.SetParam("version", version);
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


// 해당 플레그에대한 선택값 할당
function doCheckFlag(obj){
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
}


function doChange2(obj){
	
	//var scm_charge = obj.value;
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			//in_div +=	"<option value="+arrList[i][0]+">"+arrList[i][1]+"</option>";
			in_div +=	"<option value="+arrList[i][0];
			if(arrList[i][1] == "Y") { // 계획 저장 품목
				in_div += " style=\"background-color:#ffffaa; \"";
			}
			
			// 저장시 combo-list가 refresh되면서 저장했던 품목을 다시 선택하도록 한다.
			if(document.frm.version.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][0]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
		}	

		divVersionCombo.innerHTML = in_div;
		// 품목cnt정보를 셋팅한다.

	}
	});
}

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

	//alert("완 반 제품 제고 팝업!!");
	//var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	//var	item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
	

	
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 


