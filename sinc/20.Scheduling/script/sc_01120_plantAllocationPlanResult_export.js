//############################################################
//## 프로그램ID      : sc_01120_plantAllocationPlanResult_export.vm
//## 프로그램명      : 차주 수출판매계획 등록
//## 개발자          : 남웅용
//## 개발일자        : 2009-10-15
//##
//## 관련 job file   : job_sinc_20_scheduling_04.xml
//## 관련 query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-15  남웅용      create
//##
//############################################################

var job_id  = 'sc_01120_plantAllocationPlanResult_export'; //메뉴 최고 클릭시 JOB_ID
var class_path = "com.wisegrid.admin.";
//그리드 객체 전역변수 선언! 모든곳에서 GridObj 객체를 사용 함.
var GridObj;

	    
/*┌────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생함. 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └────────────────────────────────────────────────────────────────┘*/
function init() {
	
	GridObj	 = document.WiseGrid;

	setProperty(GridObj);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader(GridObj);  //해더생성
	setDefault();        
}


/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() {

	//헤더컬럼쪽 라인..사이즈 및 폰트사이즈 조절.
	GridObj.nHDLines = 2; //헤더 부분 글 출력을 2줄까지 사용함.
	GridObj.nHDLineSize = 16; //헤더 컬럼의 높이 사이즈.
//	GridObj.nHDFontSize = 8; //헤더 컬럼의 폰트 사이즈.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag로 선택된 셀의 배경색상을 변경할 수 있다 	
	GridObj.strActiveRowBgColor = "255|255|0";    //선택된 행의 배경색상을 설정한다.
 	GridObj.strSelectedCellFgColor = '0|0|0'; 

	//그리드의 헤더 클릭시 쇼팅기능 활성화. 단, 그룹병합모드에서는 사용하면 안됨.
	GridObj.strHDClickAction    = "select";
	GridObj.strHDFontName = '맑은 고딕';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder 높이
	GridObj.nHDLineSize   = 9;   //12
	// Grid 행 높이
    GridObj.nRowHeight    = 9;    //22
	GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       
	
}
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
   
function setHeader(GridObj) {

	GridObj.AddHeader("CRUD"					,"CRUD"       			,"t_text" 	,100 ,30  ,false);
	GridObj.AddHeader("GUBN"					,"GUBN"       			,"t_text" 	,100 ,40  ,false);
	GridObj.AddHeader("DIVISION"				,"DIV"       		,"t_text" 	,100 ,50  ,false);
	GridObj.AddHeader("SALES_CAT03"				,"자재\n그룹3"       		,"t_text" 	,100 ,70  ,false);
	GridObj.AddHeader("ITEM_ID"					,"제품코드"       		,"t_text" 	,100 ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"				,"제품명"       			,"t_text" 	,500 ,230 ,false);
	GridObj.AddHeader("SPEC"					,"SPEC"       			,"t_text" 	,500 ,90 ,false);

	GridObj.AddHeader("STOCK"				,"현재고"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("STOCK_8901"			,"부산CY"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MI_ORDER"			,"미출오더"      		,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_ORDER"			,"영업오더"      	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_REQT_QTY"			,"생산의뢰"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W0_PROD_PLAN"		,"생산계획"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("REMN_PROD_PLAN"		,"잔여생산"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_CLOS_STOCK"		,"기말재고"  		,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP01",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W1_ORDER"			,"영업오더"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W1_REQT_QTY"			,"생산의뢰"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W1_PROD_PLAN"		,"생산계획"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W1_CLOS_STOCK"		,"기말재고"       	,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP02",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W2_ORDER"			,"영업오더"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W2_REQT_QTY"			,"생산의뢰"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W2_PROD_PLAN"		,"생산계획"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W2_CLOS_STOCK"		,"기말재고"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W3_ORDER"			,"영업오더"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W3_CLOS_STOCK"		,"기말재고"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MINSS"				,"안전재고"      			,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("PROD_PLAN_YN"		,"생산계획확정"      		,"t_text" ,100.6 ,10  ,false);


	GridObj.AddGroup("W0", "당주");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("W0", "MI_ORDER");
	GridObj.AppendHeader("W0", "W0_ORDER");
	GridObj.AppendHeader("W0", "W0_REQT_QTY");
	GridObj.AppendHeader("W0", "W0_PROD_PLAN");
	GridObj.AppendHeader("W0", "REMN_PROD_PLAN");
	GridObj.AppendHeader("W0", "W0_CLOS_STOCK");

	GridObj.AddGroup("W1", "차주");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("W1", "W1_ORDER");
	GridObj.AppendHeader("W1", "W1_REQT_QTY");
	GridObj.AppendHeader("W1", "W1_PROD_PLAN");
	GridObj.AppendHeader("W1", "W1_CLOS_STOCK");

	GridObj.AddGroup("W2", "2주차");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("W2", "W2_ORDER");
	GridObj.AppendHeader("W2", "W2_REQT_QTY");
	GridObj.AppendHeader("W2", "W2_PROD_PLAN");
	GridObj.AppendHeader("W2", "W2_CLOS_STOCK");

	GridObj.AddGroup("W3", "3주차");			//그리드에 그룹을 등록한다. 
	GridObj.AppendHeader("W3", "W3_ORDER");
	GridObj.AppendHeader("W3", "W3_CLOS_STOCK");

	GridObj.BoundHeader();	
	
	//그리드 순서 매기기
//	GridObj.bRowSelectorVisible = true;
//	GridObj.bRowSelectorIndex = true;
	
	GridObj.SetCRUDMode("CRUD", "생성", "수정", "삭제");
	
	//Hidden 컬럼
	GridObj.SetColHide("CRUD",true);
	GridObj.SetColHide("GUBN",true);
	GridObj.SetColHide("DIVISION",true);
	GridObj.SetColHide("PROD_PLAN_YN",true);
	
	//특정컬럼 고정!!
	GridObj.SetColFix('SPEC'); 
	
    GridObj.SetColCellAlign('ITEM_ID','center');
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','center');
    
    //number포맷 설정!
    GridObj.SetNumberFormat('STOCK','###,##0');
    GridObj.SetNumberFormat('STOCK_8901','###,##0');
    GridObj.SetNumberFormat('W0_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W0_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('REMN_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('MI_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W1_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W1_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W1_ORDER','###,##0');
    GridObj.SetNumberFormat('W1_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W2_ORDER','###,##0');
    GridObj.SetNumberFormat('W2_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W2_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W2_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W3_ORDER','###,##0');
    GridObj.SetNumberFormat('W3_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('MINSS','###,##0');

}

/*┌──────────────────────────────────┐
  │조회 버튼 클릭시 실행.
  └──────────────────────────────────┘*/
GoSearch = function() {

	doQuery();
};


/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
GoSave = function() {
	
	doSave();
};

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//라디오 버튼 구분 [내수, 수출MTS, 수출MTO]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
	
	var sdate = document.all.sdate.value;
	var plant_alloc_version;
	
	// 1차공장할당 정보를 가져온다.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// 일치하는 CODE 없음
			if( arrList.length == 1 ) {
	   			
	   			plant_alloc_version = arrList[0][0];
	
				if(confirm("공장할당버젼 :"+ plant_alloc_version + " => "
							+ plant_alloc_version.substring(4,6)+"/"+plant_alloc_version.substring(6,8) + "일에 수행!"
							+"\n 조회하시겠습니까?") == true) {
					//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
					GridObj.SetParam("mode", "search");
					GridObj.SetParam("plant_alloc_version", plant_alloc_version);
					GridObj.SetParam("sdate", sdate);
					GridObj.SetParam("checked_domain", checked_domain);
					GridObj.DoQuery(servlet_url);
				}
			}
			else {
				alert("1차공장할당 버젼정보가 없습니다! 시스템관리자에게 문의하세요!");
			}
		}
	});

}

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
function doSave() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//라디오 버튼 구분 [내수, 수출MTS]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
  
   var sdate = document.all.sdate.value;
   var plant_alloc_version;

	// 1차공장할당 정보를 가져온다.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// 일치하는 CODE 없음
			if( arrList.length == 1 ) {
       			
       			plant_alloc_version = arrList[0][0];
				//user_id
				GridObj.SetParam("user_id", document.frm._user_id.value);
		
		        //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
		   		//WiseGrid가 서버에 전송할 mode를 셋팅한다.
		        GridObj.SetParam("mode", "save");

		        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
		        GridObj.SetParam("sdate", sdate);
		        GridObj.SetParam("checked_domain", checked_domain);
				
				//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
				GridObj.DoQuery(servlet_url, "CRUD");

			}
			else {
				alert("1차공장할당 버젼정보가 없습니다! 시스템관리자에게 문의하세요!");
			}
 		}
	});
	 
}

/*┌──────────────────────────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────────────────────────┘*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    var arrA = '';
    var arrB = '';
    var arrC = '';
    
    if(mode == "search") //조회가 완료된 경우
    {
        if(GridObj.GetStatus() == "true") 
        {
            //셀의 정렬을 설정

			var colBGColor='232|245|213';
			var rowLeng = GridObj.GetRowCount();
			var w1_clos_stock = 0, w2_clos_stock = 0, w3_clos_stock = 0;
			
			for( var row=0 ; row<rowLeng ; row++ ){ //row수만큼 반복
        		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W1_PROD_PLAN", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W2_PROD_PLAN", row, 'true');
        		
        		// 생산계획이 완료되었으면 차주 기말재고 = 당주 기말재고 - 차주 영업오더 + 생산계획
        		// 완료아니면 차주 기말재고 = 당주 기말재고 - 차주 영업오더 + 생산의뢰
        		// 차차주 기말재고 = 차주 기말재고 - 차차주 영업오더
        		if(GridObj.GetCellValue("PROD_PLAN_YN", row) == "Y") {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));

        		}
        		else {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));
        		}
				
				/*문제부분*/
    			w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W3_ORDER", row));
    			
    			GridObj.SetCellValue("W3_CLOS_STOCK",row,Math.round(w3_clos_stock));
				
				
				
        		// 현재고보다 당주 오더+미출고오더가 많은 경우 색깔표시
        		if(strToNum(GridObj.GetCellValue("STOCK", row)) 
        			< (strToNum(GridObj.GetCellValue("MI_ORDER", row))+strToNum(GridObj.GetCellValue("W0_ORDER", row))) ){
        			GridObj.SetCellBgColor('STOCK', row, '255|173|143');
        		}
        		        		
        		// 당주 기준재고보다 차주 오더가 많은 경우 재고 색깔표시
        		if(strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W1_ORDER", row)) ){
        			GridObj.SetCellBgColor('W0_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 차주 기준재고보다 차차주 오더가 많은 경우 색깔표시
        		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W2_ORDER", row)) ){
        			GridObj.SetCellBgColor('W1_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 차차주 기준재고가 0보다 작은경우 색깔표시
        		if(strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W3_ORDER", row)) ){
        			GridObj.SetCellBgColor('W2_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 차차주 기준재고가 0보다 작은경우 색깔표시
        		if(strToNum(GridObj.GetCellValue("W3_CLOS_STOCK", row)) < 0 ){
        			GridObj.SetCellBgColor('W3_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		
        	}  
        	
        	
        	GridObj.SetColCellBgColor('W1_REQT_QTY',colBGColor);//차주생산의뢰량
        	GridObj.SetColCellBgColor('W2_REQT_QTY',colBGColor);//2주차생산의뢰량
        	GridObj.SetColCellBgColor('STOCK','232|232|255');//재고
        	GridObj.SetColCellBgColor('W0_CLOS_STOCK','232|232|255');//당주 기말재고
        	GridObj.SetColCellBgColor('W1_CLOS_STOCK','232|232|255');//차주 기말재고
        	GridObj.SetColCellBgColor('W2_CLOS_STOCK','232|232|255');//차차주 기말재고
        	GridObj.SetColCellBgColor('W3_CLOS_STOCK','232|232|255');//차차주 기말재고
        	GridObj.SetColCellBgColor('MINSS','120|255|255');//안전재고
       
        	DW1_grouping();
        	  
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
	}else if(mode == "save"){
		if(GridObj.GetStatus() == "true") {

			alert("저장하였습니다!");
			DW1_grouping();

		} else {
			var error_msg = GridObj.GetMessage();
			alert(error_msg);			
		}
	}
}

function DW1_grouping() {
	GridObj.SetGroupMerge('GUBN,DIVISION,SALES_CAT03'); 
	
	GridObj.AddSummaryBar('SUMMARY4', '소계', 'SALES_CAT03', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY3', '소계', 'DIVISION', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY2', '소계', 'GUBN', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	GridObj.AddSummaryBar('SUMMARY1', '합계', 'summaryall', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|181|106'); 
	//GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '190|125|255'); 
	//GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '145|200|200'); 
	GridObj.SetSummaryBarColor('SUMMARY4', '0|0|0', '212|212|212'); 
}
   
/*┌──────────────────────────────────┐
  │EXCEL
  └──────────────────────────────────┘*/
/* EXCEL ???? */
function excelDown() {
   var GridObj = document.WiseGrid;
   //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
   GridObj.ExcelExport("", "", true, true);
}

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
    
    // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
    // ==> 화면이 더이상 축소되지 않음 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
    document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
    
}  
           


/*┌──────────────────────────────────┐
  │MOUSE OVER 시, ROW 색상 변환
  └──────────────────────────────────┘*/
function GridMouseOver(strType, strColumnKey, nRow){
	
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
}

/*┌──────────────────────────────────┐
  │MOUSE OUT 시, ROW 색상 복구
  └──────────────────────────────────┘*/
function GridMouseOut(strType, strColumnKey, nRow){

		// 헤더는 동작없음
		if( nRow == -1 )
			return;
}

 /*┌──────────────────────────────────┐
   │그리드 컬럼 Set 컬러 설정하기!!
   └──────────────────────────────────┘*/
function gridColSet(obj){
 
}


 /*┌──────────────────────────────────┐
   │그리드 컬럼 수정시 발생하는 이벤트!!
   └──────────────────────────────────┘*/
function GridChangeCell(strColumnKey, nRow){

	if(strColumnKey == "W1_REQT_QTY" || strColumnKey == "W2_REQT_QTY") {
		// 생산계획이 완료되었으면 차주 기말재고 = 당주 기말재고 - 차주 영업오더 + 생산계획
		if(GridObj.GetCellValue("PROD_PLAN_YN", nRow) == "Y") {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));

			// 차차주 기말재고 계산 = 차주기말재고 - 차차주 영업오더
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);

//			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
//								+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", nRow));
//			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}
		else {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			// 차차주 기말재고 계산 = 차주기말재고 - 차차주 영업오더
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}	
		
		// 차주 기준재고보다 차차주 오더가 많은 경우 색깔표시
		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) < strToNum(GridObj.GetCellValue("W2_ORDER", nRow)) ){
			GridObj.SetCellBgColor('W1_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 차차주 기말재고가 0보다 작으면 색깔표시
		if(w2_clos_stock < 0){
			GridObj.SetCellBgColor('W2_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 차차차주 기말재고 계산 = 차차주기말재고 - 차차차주 영업오더
		var w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W3_ORDER", nRow));
		GridObj.SetCellValue("W3_CLOS_STOCK",nRow,w3_clos_stock);
		// 차차주 기말재고가 0보다 작으면 색깔표시
		if(w3_clos_stock < 0){
			GridObj.SetCellBgColor('W3_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 수량이 0이상이면 BOLD
		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", nRow, 'true');
        if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", nRow, 'true');		
	}
 
}

/*┌──────────────────────────────────┐
  │그리드의 셀 원클릭 이벤트
  └──────────────────────────────────┘*/
function GridCellClick(strColumnKey, nRow){
	//alert(strColumnKey+''+nRow);
}
    
/*┌──────────────────────────────────┐
  │그리드의 셀 더블클릭 이벤트
  └──────────────────────────────────┘*/
function GridCellDblClick(strColumnKey, nRow){

	var sdate = document.all.sdate.value;

	if(strColumnKey == "MI_ORDER" || strColumnKey == "W0_ORDER") { // 당주
		var sel_week = "W0";
	}
	else if(strColumnKey == "W1_ORDER") { // 차주
		var sel_week = "W1";
	}
	else if(strColumnKey == "W2_ORDER") { // 차차주
		var sel_week = "W2";
	}
	else if(strColumnKey == "W3_ORDER") { // 차차주
		var sel_week = "W3";
	}
	else return;

	var item_id	= GridObj.GetCellValue("ITEM_ID",nRow);
	var service_url = "service.do?_moon_service=sc_01120_Export_Order_List_Popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&item_id=" + item_id + "&sel_week=" + sel_week + "&sdate=" + sdate;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Export_Order_List", pop_win_style);
	newWin.focus();
	
}  
	
	