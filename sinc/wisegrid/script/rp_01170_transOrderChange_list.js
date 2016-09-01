//############################################################
//## 프로그램ID      : ip_07010_Item_Trace_list.vm
//## 프로그램명      : SCM품목추적조회
//## 개발자          : 남웅용
//## 개발일자        : 2009-07-16
//##
//## 관련 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 관련 query file : query_sinc_10_inventoryPlanning_04.xml
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
var job_id = 'rp_01170_transOrderChange_list';
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

	GridObj.bRowSelectorVisible = true;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.


    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor = '180|82|205';
    
    GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.

    
    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = true;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //선택된 셀의 글자색 지정한다.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    
    GridObj2.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj2.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.


}
function setDefault3() { 

	GridObj3.bRowSelectorVisible = true;        		//로우 셀렉터를 WiseGrid에서 숨긴다,. 
	GridObj3.bRowSelectorIndex = true;				//Row Selector 영역에 Row Index를 보여준다.

    GridObj3.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //선택된 셀의 글자색 지정한다.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    
    GridObj3.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	GridObj3.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
}
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {        

	GridObj.AddHeader("TRANS_DATE"		,"수송일자"       ,"t_text" 	,20		,100  ,false); //0   
 	GridObj.AddHeader("SRC_LOC"			,"SRC_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("SRC_NAME"		,"출고장"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("TGT_LOC"			,"TGT_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("TGT_NAME"		,"입고장"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"전표번호"       ,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("BOX_QTY"			,"BOX 수량"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PLT_QTY"			,"PLT 수량"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("TRANS_STATE"		,"마감구분"       ,"t_text" 	,100	,80  ,false); //0  


	GridObj.BoundHeader();	

	//GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('TRANS_DATE','center'); 
    GridObj.SetColCellAlign('SRC_NAME','center'); 
    GridObj.SetColCellAlign('TGT_NAME','center'); 
    GridObj.SetColCellAlign('BRAND_NO','center'); 
    GridObj.SetColCellAlign('TRANS_STATE','center'); 
       
}
   
function setHeader2(GridObj2) {        
       



  	GridObj2.AddHeader("CRUD"			,"구분"       		,"t_text" 		,10		,0  ,false); //0   
  	//GridObj2.AddHeader("NO"				,"번호"       		,"t_number" 	,5		,30  ,true); //0   
  	GridObj2.AddHeader("SELECTED"		,"삭제우선순위"       		,"t_checkbox" 	,2		,60  ,true); //0   

 	GridObj2.AddHeader("ITEM_ID"		,"제품코드"       	,"t_text" 		,100	,70  ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"		,"제품명"       		,"t_text" 		,100	,150  ,false); //0   
 	GridObj2.AddHeader("BOX_QTY"		,"BOX"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("PLT_QTY"		,"PLT"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("DEL_PLT"		,"삭제PLT"       	,"t_number" 	,20.3	,60  ,true); //0   
 	GridObj2.AddHeader("DEL_QTY"		,"삭제QTY"       	,"t_number" 	,20.3	,0  ,true); //0   
 	//GridObj2.AddHeader("DEL_RANK"		,"삭제우선순위"       	,"t_text" 		,100	,80  ,false); //0   

 	GridObj2.AddHeader("TRANS_DATE"		,"수송일자"       	,"t_text" 		,20		,0  ,false); //0   
 	GridObj2.AddHeader("SRC_LOC"		,"출고장"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("TGT_LOC"		,"입고장"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("BRAND_NO"		,"전표번호"       	,"t_text" 		,20		,0  ,false); //0
 	GridObj2.AddHeader("BOX_PER_PALET"	,"BOX_PER_PALET"    ,"t_number" ,200	,0   ,false); //0 	
 	GridObj2.AddHeader("CRE_GUBN"		,"CRE_GUBN"      	,"t_text" ,200	,0   ,false); //0 	
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    GridObj2.SetColCellAlign('SELECTED','center'); 
    
    GridObj2.SetNumberFormat("DEL_PLT"  , "#,##0");
    
	GridObj2.SetColHDBgColor('DEL_PLT','253|228|229');
    


}
   
function setHeader3(GridObj3) {        
       
  	GridObj3.AddHeader("CRUD"			,"구분"       		,"t_text" 		,10		,0  ,false); //0   
  	GridObj3.AddHeader("SELECTED"		,"추가우선순위"       		,"t_checkbox" 	,2		,60  ,true); //0   
	//GridObj3.AddHeader("NO"				,"번호"       	,"t_number" 	,5		,30  ,true); //0
 	GridObj3.AddHeader("ITEM_ID"		,"제품코드"       ,"t_text" 	,100	,70  ,true); //0   
 	GridObj3.AddHeader("ITEM_NAME"		,"제품명"       	,"t_text" 	,1000	,180 ,false); //0   
 	//GridObj3.AddHeader("STOCK_QTY"		,"재고수량"       ,"t_text" 	,100	,80  ,false); //0   
 	GridObj3.AddHeader("BOX_QTY"		,"BOX"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("PLT_QTY"		,"PLT"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("BOX_PER_PALET"			,"BOX_PER_PALET"      	,"t_number" ,200	,0   ,false); //0 	

	GridObj3.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj3.SetColCellAlign('ITEM_ID','center'); 

    GridObj3.SetNumberFormat("BOX_QTY"  , "#,##0");
    GridObj3.SetNumberFormat("PLT_QTY"  , "#,##0");

	GridObj3.SetColHDBgColor('BOX_QTY','253|228|229');
	GridObj3.SetColHDBgColor('PLT_QTY','253|228|229');

}

function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT

	
}
function setGrid3(){
	GridObj3.SetColCellBgColor('BOX_QTY',color_edit_col);//PLT
	GridObj3.SetColCellBgColor('PLT_QTY',color_edit_col);//PLT
	
}


/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  //GridObj.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'IPGO');
		  //GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	//alert("WD2");
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  //GridObj2.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'IPGO'); 
		  //GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd2") {
		if(GridObj2.GetStatus() == "true") {                           

		  GoTransOrderAddWd3(); 
		   
		}
	}
	setGrid2(); //WiseGrid 설정
	
}

function GridEndQuery3() {
	//alert("WD3");
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			//GridObj3.AddSummaryBar('SUMMARY', '합계', 'summaryall', 'sum', 'CHGO'); 
			//GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd3") {
		if(GridObj3.GetStatus() == "true") {                           

		  GoMakeBrandNo(); 
		   
		}
	}
	
	
	setGrid3(); //WiseGrid 설정
	
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
    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	
   }

/*┌──────────────────────────────────┐
  │하부 그리드 조회 WD1 더블클릭
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){     

	var act_gubn	= document.all.act_gubn.value; // 10(추가/정정), 20(오수송)

	doQuery2(nRow);	
	if(act_gubn == '01'){// 10(추가/정정), 20(오수송)
		doQuery3(nRow);
	}
}        
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var trans_start 		= document.all.trans_start.value;
       var trans_end   		= document.all.trans_end.value;
       var selected_src_loc	= document.all.selected_src_loc.value;
       var selected_tgt_loc	= document.all.selected_tgt_loc.value;
       var brand_no		= document.all.brand_no.value;
       var act_gubn		= document.all.act_gubn.value;
       
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end"	, trans_end);
       GridObj.SetParam("selected_src_loc", selected_src_loc);
       GridObj.SetParam("selected_tgt_loc", selected_tgt_loc);
       GridObj.SetParam("brand_no", brand_no);
       GridObj.SetParam("act_gubn", act_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*┌──────────────────────────────────┐
  │두번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(추가/정정), 20(오수송)
	
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", src_loc);
	GridObj2.SetParam("tgt_loc", tgt_loc);
	GridObj2.SetParam("brand_no", brand_no);
	GridObj2.SetParam("act_gubn", act_gubn);



	GridObj2.DoQuery(servlet_url);
}

/*┌──────────────────────────────────┐
  │두번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(추가/정정), 20(오수송)



	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("trans_date", trans_date);
	GridObj3.SetParam("src_loc", src_loc);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("brand_no", brand_no);
	GridObj3.SetParam("act_gubn", act_gubn);
	GridObj3.DoQuery(servlet_url);
}
   

/*┌──────────────────────────────────┐
  │수송오더 추가
  └──────────────────────────────────┘*/
  function GoTransOrderAdd() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 01(추가/정정), 02(오수송)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	var rc 			= GridObj2.GetRowCount();
	if(rc == 0){
		alert("수송오더를 변경할  전표를 조회후 실행하시기 바랍니다");
		return;
	}	

	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	
	

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj2.SetParam("mode", "orderAddWd2");	
	
    GridObj2.SetParam("act_gubn", act_gubn);
    GridObj2.SetParam("chng_resn", chng_resn);
    GridObj2.SetParam("plt_unit", plt_unit);
	GridObj2.SetParam("trans_date",trans_date);
	GridObj2.SetParam("src_loc",src_loc);
	GridObj2.SetParam("tgt_loc",tgt_loc);
	GridObj2.SetParam("brand_no",brand_no);
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	


	if(act_gubn == "01"){
		if(confirm("품목 추가/정정 을 실행하시겠습니까?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "02"){
		if(confirm("오수송 정정 을 실행하시겠습니까?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "03"){
		if(confirm("부족수량 추가를 실행하시겠습니까?") == 1 ) {
		}else{
			return;
		}
	}
	
	
	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.

	GridObj2.DoQuery(servlet_url, "SELECTED");
		
}

/*┌──────────────────────────────────┐
  │수송오더 추가
  └──────────────────────────────────┘*/
  function GoTransOrderAddWd3() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 10(추가/정정), 20(오수송)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "orderAddWd3");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.

	GridObj3.DoQuery(servlet_url, "SELECTED");
		
}
function GoMakeBrandNo(){

	var act_gubn	= document.all.act_gubn.value; // 10(추가/정정), 20(오수송)
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj3.SetParam("mode", "makeBrandNo");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
	GridObj3.DoQuery(servlet_url);
	
}



// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
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

// 숫자 input box 에 문자 check 
// parameter : obj - inbox object , type - default value 또는 소수점 check 유뮤 등의 type 정의 
// type - BLANK : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점 허용
//        ZERO : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점 허용 
//        BLANK_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점은 error 처리( only integer ) 
//        ZERO_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점은 error 처리( only integer ) 
//        BLANK_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ZERO_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ** type parameter 가 없으면 ZERO(default=0, 소숫점 허용) 와 같음 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "숫자만 입력하여 주세요.";
	var checkType = "POINT"; 
	
	// default value 는 공백 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// 소수점 허용하지 않음 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "자연수만 입력하여 주세요."; 
		else 
			alertMsg = "정수만 입력하여 주세요."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}

/*┌───────────────────────────────────────┐
  │행 추가/삭제 Fnc
  └───────────────────────────────────────┘*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj3.GetActiveRowIndex();
	
	if( str == "추가" ){		// ROW 추가
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// 출고장 구분 배경색 다시 지정
		//setSrcLocBgColor();		
		// 누적 계산 다시 함.
		//calAllCum();
		// 번호 set
		//setNo();
	}
	else if( str == "삭제" ){	// ROW 삭제
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("삭제할 행을 선택해 주십시오.");
//			return;
//		}
		if(confirm("삭제 하시겠습니까?") == true){
			for( i = 0 ; i < GridObj3.GetRowCount() ; i++ ){
				if( GridObj3.GetCellValue("SELECTED", i) == "1" ){
						GridObj3.DeleteRow(nRow);
						GridObj3.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					
				}
			}
			// 출고장 구분 배경색 다시 지정
			//setSrcLocBgColor();	
			// 누적 계산 다시 함.
			//calAllCum();
			// 번호 set
			//setNo()
		}
	}
	
	saved = false;
};


/*┌──────────────────────────────────┐
  │WiseGrid Insert Row Fnc
  └──────────────────────────────────┘*/
function insertRow( nRow ){
	
	var rowCnt = GridObj3.GetRowCount();
	
	
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // 마자막 라인일 경우 
		GridObj3.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj3.InsertRow(-1);//
		nRow = -1;
	}
	else{
		GridObj3.InsertRow(nRow+1);
	}
	
	// 기본 데이터 셋팅
	if(nRow == -1){
		//GridObj3.SetCellValue("NO", 0, "");
		GridObj3.SetCellValue("ITEM_ID", 0, "");
		GridObj3.SetCellValue("ITEM_NAME", 0, "");
		//GridObj3.SetCellValue("STOCK_QTY", 0, "");
		GridObj3.SetCellValue("BOX_QTY", 0, "");
		GridObj3.SetCellValue("PLT_QTY", 0, "");	
		GridObj3.SetCellValue("BOX_PER_PALET", 0, "");	
	}else{
		//GridObj3.SetCellValue("NO", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_ID", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_NAME", nRow+1, GridObj3.GetCellValue("ITEM_NAME", nRow));
		//GridObj3.SetCellValue("STOCK_QTY", nRow+1, GridObj3.GetCellHiddenValue("STOCK_QTY", nRow));
		GridObj3.SetCellValue("BOX_QTY", nRow+1, GridObj3.GetCellValue("BOX_QTY", nRow));
		GridObj3.SetCellValue("PLT_QTY", nRow+1, GridObj3.GetCellValue("PLT_QTY", nRow));
		GridObj3.SetCellValue("BOX_PER_PALET", nRow+1, GridObj3.GetCellValue("BOX_PER_PALET", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;

	
	

};

/*┌──────────────────────────────────┐
  │WiseGrid Cell Duble Click Event
  └──────────────────────────────────┘*/
function GridCellDblClickHandler(strColumnKey, nRow){
	// 제품 코드 컬럼이면 제품 검색 팝업 실행
	
	if( strColumnKey == "ITEM_ID" ){
		openItemSearchPop( strColumnKey, nRow );
	}
	
};

/*┌──────────────────────────────────┐
  │제품 검색 POPUP  Fnc
  └──────────────────────────────────┘*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
//	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj3.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc = GridObj2.GetCellValue("TGT_LOC", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_order_chng&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
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
/*┌──────────────────────────────────┐
  │WiseGrid Cell Change Event
  └──────────────────────────────────┘*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	
	// 기본재고상차, 추가재고상차, 생산상차 PLT 및 BOX 수량 변경시
	// 합계 및 누적 계산 및 PLT, BOX 수량 변경
	if(strColumnKey.lastIndexOf("PLT_QTY") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT_QTY") >= 0 ) {
			calBoxQty( strColumnKey, nRow );					 // BOX 수량 수정
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		} // 합계 및 누적합계 계산 PLT
		else {
			calPltQty( strColumnKey, nRow );					 // BOX 수량 수정
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj3.SetCellValue("PLT_QTY", nRow, "1")			
			calBoxQty( strColumnKey, nRow );					 // BOX 수량 수정
		}else{
			GridObj3.SetCellValue("PLT_QTY", nRow, "0")			
			calBoxQty( strColumnKey, nRow );					 // BOX 수량 수정
		}		
	}



	
	
	// 제품 코드 변경시 
	if( strColumnKey == "ITEM_ID" ){
		// box_per_palet 추출
		getBoxPerPalet( nRow );
		// 제품 명 set
		getItemInfo( nRow, nNewValue );
	}
	
}


/*┌──────────────────────────────────┐
  │Box 수량 계산  Fnc
  └──────────────────────────────────┘*/
function calBoxQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("PLT_QTY","");

	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj3.SetCellValue("BOX_QTY", nRow, boxQty);
	
	// 누적 상차 집계 및 합계 계산
	//changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*┌──────────────────────────────────┐
  │PLT 수량 계산  Fnc
  └──────────────────────────────────┘*/
function calPltQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("BOX_QTY","");
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;

	GridObj3.SetCellValue("PLT_QTY", nRow, pltQty);
	
	// 누적 상차 집계 및 합계 계산
	//changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*┌──────────────────────────────────┐
  │box_per_palet 추출 Fnc
  └──────────────────────────────────┘*/
function getBoxPerPalet( nRow ) {
	
	// 출고장, 제품코드 추출
	var dc_id = GridObj2.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj3.GetCellValue("ITEM_ID", nRow);
	
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}


/*┌─────────────────────────────────────────────────────┐
  │사용자 직접 입력값으로부터 제품정보 조회
  │제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색 Fnc
  └─────────────────────────────────────────────────────┘*/
function getItemInfo( nRow, nNewValue ) {


	var dc_id = GridObj2.GetCellValue("SRC_LOC", nRow);
	var ItemId = nNewValue;
	
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == "" || dc_id == null ) {
		alert("출고장을 먼저 선택하세요.");
		return;
	}
	
	// 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("ITEM_ID", nRow);
		return;
	}
	//alert(ItemId);
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// 일치하는 결과 1개
			else if( arrList.length == 1 ) {
				GridObj3.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj3.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
