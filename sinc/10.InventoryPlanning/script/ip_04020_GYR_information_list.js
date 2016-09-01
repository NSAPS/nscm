// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	

	var dw_sel = document.frm.sel_dw.value;

	if(dw_sel == "2" ){ // 품목별GYR
	
		if(col == "3"){
			sel_gyr_gubn = "G";	
		}
		else if (col == "4"){
			sel_gyr_gubn = "Y";	
		}
		else if (col == "5"){
			sel_gyr_gubn = "R";	
		}
		else return; 
	
		var in_work_date	= document.frm.in_work_date.value;
		var item_id			= data.split("!%!")[0];
		var	item_name = "";
	//	var sel_gyr_gubn = document.frm.sel_gyr_gubn.value;
		
		commonUtil.getCodeInfo("input_value", item_id, "search_item_id_and_item_name_by_item_input", { 
			callback:function(arrList){
				// 일치하는 제품 없음
				if( arrList.length == 1 ) {
					item_name = arrList[0][1];
				}
				var service_url = "service.do?_moon_service=ip_04020_GYR_ItemList_popup";
				service_url += "&in_work_date=" + in_work_date + "&gyr_date=" + in_work_date + "&item_id=" + item_id + "&item_name=" + item_name + "&sel_gyr_gubn=" + sel_gyr_gubn;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=900, height=600, top=0, left=0";
				var newWin = window.open(service_url, "ip_04020_GYR_ItemList_popup", pop_win_style);
				newWin.focus();		
	
			}
		});
	}
	else if(dw_sel == "3"){ // 배송지점별GYR

		if(col == "3"){
			sel_gyr_gubn = "G";	
		}
		else if (col == "4"){
			sel_gyr_gubn = "Y";	
		}
		else if (col == "5"){
			sel_gyr_gubn = "R";	
		}
	
		var in_work_date	= document.frm.in_work_date.value;
		var dc_id			= data.split("!%!")[0];
		
		var service_url = "service.do?_moon_service=ip_04040_GYR_DC_Detail_list";
		service_url += "&in_work_date=" + in_work_date + "&insel_dc_id=" + dc_id + "&sel_gyr_gubn=" + sel_gyr_gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=900, height=600, top=0, left=0";
		var newWin = window.open(service_url, "GYR_DC_Detail_list", pop_win_style);
		newWin.focus();		
	
	}
}

// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display	= "none";
			gridArea2.style.display = "none";
			gridArea3.style.display = "none";
			gridArea4.style.display = "none";
			waitArea.style.display	= "block";
			waitArea2.style.display = "block";
			waitArea3.style.display = "block";
			waitArea4.style.display = "block";
		}
		else {
			gridArea.style.display	= "block";
			gridArea2.style.display = "block";
			gridArea3.style.display = "block";
			gridArea4.style.display = "block";
			waitArea.style.display	= "none";
			waitArea2.style.display = "none";
			waitArea3.style.display = "none";
			waitArea4.style.display = "none";
		}
	}
	
}


// 각각의 tab을 클릭하면 발생하는 event -> 이곳에서 화면단 제어를 한다.
WebFXTabPage.prototype.show = function () {
	var el	= this.tab;
	var s	= el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;
	
	this.element.style.display = "block";
	
	var tabId = this.element.id;
	if(tabId == "tabPage1"){
		document.frm.sel_dw.value = "1";
	}else if(tabId == "tabPage2"){
		document.frm.sel_dw.value = "2";
	}else if(tabId == "tabPage3"){
		document.frm.sel_dw.value = "3";
	}else if(tabId == "tabPage4"){
		document.frm.sel_dw.value = "4";
	}
};

// 조회
GoSearch = function() {

	var sel_dw		= document.frm.sel_dw.value;

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	if(sel_dw != "4") {
	document.frm._moon_service.value	= "ip_04020_GYR_information_list"; 
	document.frm.action					= "service.do";
	document.frm.target					= "_self";
	document.frm.submit();
	}
	else {
		doQuery4();
	    // Waiting image 중지!
		viewWait();
	}	
	
};

/*┌──────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └──────────────────────────────────┘*/
function init4() {

	var GridObj4 = document.WiseGrid4;

	GridObj4.ClearGrid(); 
	setProperty(GridObj4);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setDefault4();        //화면 기본 설정 
	setHeader4(GridObj4);  //해더생성 

}
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault4() {

	var GridObj4 = document.WiseGrid4;

    GridObj4.nHDLines         = 2; //Header LINE수
    GridObj4.nHDLineSize      = 14; //Header Size
    GridObj4.strHDClickAction    = "sortsingle";
}
   	
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader4(GridObj4) {		

	GridObj4.AddHeader("ITEM_ID"		,"코드"       		,"t_text"	,10		,60 	,false); //0   
	GridObj4.AddHeader("ITEM_NAME"		,"품목명"       		,"t_text"	,200	,200	,false); //1   
	GridObj4.AddHeader("TERM_VAL"		,"유통월수"       	,"t_number" ,5 		,40 	,false); //4   
	GridObj4.AddHeader("GYR_RATE"		,"GYR비율"       	,"t_text"	,30 	,80 	,false); //3   
	GridObj4.AddHeader("GYR"			,"GYR"		       	,"t_text"	,5 		,40 	,false); //4   
	GridObj4.AddHeader("PERIOD_DATE"	,"유통일자"       	,"t_text"	,20 	,80 	,false); //4   
	GridObj4.AddHeader("PERIOD_RATE"	,"경과율\n(%)"		,"t_number" ,20.3  ,60  	,false); //9   

	GridObj4.AddHeader("BOX7100"			,"안양제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7200"			,"아산제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7300"			,"안성제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7400"			,"안성음료"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7500"			,"포승배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7600"			,"구미제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7700"			,"부산제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7800"			,"녹산제품"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8000"			,"물류기획"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8110"			,"서울배송"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8120"			,"신북부배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8121"			,"화전배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8122"			,"의정부배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8123"			,"북부배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8130"			,"동부배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8140"			,"남부배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8150"			,"이천배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8160"			,"인천배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8170"			,"오산배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8310"			,"원주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8320"			,"춘천배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8330"			,"강릉배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8340"			,"속초배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8350"			,"태백배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8410"			,"대전배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8420"			,"청주배송"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8430"			,"홍성배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8440"			,"충주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8510"			,"광주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8511"			,"광주야적장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8520"			,"순천배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8530"			,"전주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8540"			,"해남배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8610"			,"대구배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8620"			,"경주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8630"			,"안동배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8710"			,"부산배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8720"			,"동래배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8730"			,"창원배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8740"			,"진주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8750"			,"언양배송"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8760"			,"제주배송"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1811"			,"동양물류"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1816"			,"조우장치장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1841"			,"경북능금"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8901"			,"부산 CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8902"			,"광양 CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8903"			,"인천 CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8904"			,"오로라C/S"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8905"			,"미래상사"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8906"			,"두솔P&P"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8907"			,"켈로그공장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8908"			,"네슬레공장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8910"			,"태경농산"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8911"			,"청원냉장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8912"			,"하남냉장"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8913"			,"동우LOGI"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8914"			,"(주)대현"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8915"			,"고려냉장"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8916"			,"현대냉동"    	,"t_number" ,20.3  ,60  ,false); //6   

	GridObj4.BoundHeader();	
}

/*┌──────────────────────────────────┐
  │조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
function doQuery4() {

	var GridObj4 		= document.WiseGrid4;
	var in_work_date	= document.frm.in_work_date.value ; 
	var sel_dw			= document.frm.sel_dw.value;  
	       
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.ip_04020_GYR_information_list";

	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj4.SetParam("mode", "search");
	GridObj4.SetParam("in_work_date", in_work_date);
	GridObj4.SetParam("sel_dw", sel_dw);
	GridObj4.DoQuery(servlet_url);
   
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);  //해더생성 

}

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
function GridEndQuery4() {
    
	var GridObj4 = document.WiseGrid4;
    var mode = GridObj4.GetParam("mode");
    var error_msg = '';

    if(mode == "search") //조회가 완료된 경우
    {
        if(GridObj4.GetStatus() == "true") 
        {                                                    
			// 컬럼 Grouping
	    	//GridObj4.SetGroupMerge("ITEM_ID,ITEM_NAME,TERM_VAL,GYR_RATE,GYR");
			// 컬럼 고정
			GridObj4.SetColFix('PERIOD_RATE');

		    //컬럼정렬
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		    GridObj4.SetColCellAlign('GYR_RATE','center'); 
		    GridObj4.SetColCellAlign('GYR','center'); 
		    GridObj4.SetColCellAlign('PERIOD_DATE','center'); 
		    
		    GridObj4.SetNumberFormat('BOX7100','#,###'); 
		    GridObj4.SetNumberFormat('BOX7200','#,###'); 
		    GridObj4.SetNumberFormat('BOX7300','#,###'); 
		    GridObj4.SetNumberFormat('BOX7400','#,###'); 
		    GridObj4.SetNumberFormat('BOX7500','#,###'); 
		    GridObj4.SetNumberFormat('BOX7600','#,###'); 
		    GridObj4.SetNumberFormat('BOX7700','#,###'); 
		    GridObj4.SetNumberFormat('BOX7800','#,###'); 
		    GridObj4.SetNumberFormat('BOX8000','#,###'); 
		    GridObj4.SetNumberFormat('BOX8110','#,###'); 
		    GridObj4.SetNumberFormat('BOX8120','#,###'); 
		    GridObj4.SetNumberFormat('BOX8121','#,###'); 
		    GridObj4.SetNumberFormat('BOX8122','#,###'); 
		    GridObj4.SetNumberFormat('BOX8123','#,###'); 
		    GridObj4.SetNumberFormat('BOX8130','#,###'); 
		    GridObj4.SetNumberFormat('BOX8140','#,###'); 
		    GridObj4.SetNumberFormat('BOX8150','#,###'); 
		    GridObj4.SetNumberFormat('BOX8160','#,###'); 
		    GridObj4.SetNumberFormat('BOX8170','#,###'); 
		    GridObj4.SetNumberFormat('BOX8310','#,###'); 
		    GridObj4.SetNumberFormat('BOX8320','#,###'); 
		    GridObj4.SetNumberFormat('BOX8330','#,###'); 
		    GridObj4.SetNumberFormat('BOX8340','#,###'); 
		    GridObj4.SetNumberFormat('BOX8350','#,###'); 
		    GridObj4.SetNumberFormat('BOX8410','#,###'); 
		    GridObj4.SetNumberFormat('BOX8420','#,###'); 
		    GridObj4.SetNumberFormat('BOX8430','#,###'); 
		    GridObj4.SetNumberFormat('BOX8440','#,###'); 
		    GridObj4.SetNumberFormat('BOX8510','#,###'); 
		    GridObj4.SetNumberFormat('BOX8511','#,###'); 
		    GridObj4.SetNumberFormat('BOX8520','#,###'); 
		    GridObj4.SetNumberFormat('BOX8530','#,###'); 
		    GridObj4.SetNumberFormat('BOX8540','#,###'); 
		    GridObj4.SetNumberFormat('BOX8610','#,###'); 
		    GridObj4.SetNumberFormat('BOX8620','#,###'); 
		    GridObj4.SetNumberFormat('BOX8630','#,###'); 
		    GridObj4.SetNumberFormat('BOX8710','#,###'); 
		    GridObj4.SetNumberFormat('BOX8720','#,###'); 
		    GridObj4.SetNumberFormat('BOX8730','#,###'); 
		    GridObj4.SetNumberFormat('BOX8740','#,###'); 
		    GridObj4.SetNumberFormat('BOX8750','#,###'); 
		    GridObj4.SetNumberFormat('BOX8760','#,###'); 
		    GridObj4.SetNumberFormat('BOX1811','#,###'); 
		    GridObj4.SetNumberFormat('BOX1816','#,###'); 
		    GridObj4.SetNumberFormat('BOX1841','#,###'); 
		    GridObj4.SetNumberFormat('BOX8901','#,###'); 
		    GridObj4.SetNumberFormat('BOX8902','#,###'); 
		    GridObj4.SetNumberFormat('BOX8903','#,###'); 
		    GridObj4.SetNumberFormat('BOX8904','#,###'); 
		    GridObj4.SetNumberFormat('BOX8905','#,###'); 
		    GridObj4.SetNumberFormat('BOX8906','#,###'); 
		    GridObj4.SetNumberFormat('BOX8907','#,###'); 
		    GridObj4.SetNumberFormat('BOX8908','#,###'); 
		    GridObj4.SetNumberFormat('BOX8910','#,###'); 
		    GridObj4.SetNumberFormat('BOX8911','#,###'); 
		    GridObj4.SetNumberFormat('BOX8912','#,###'); 
		    GridObj4.SetNumberFormat('BOX8913','#,###'); 
		    GridObj4.SetNumberFormat('BOX8914','#,###'); 
		    GridObj4.SetNumberFormat('BOX8915','#,###'); 
		    GridObj4.SetNumberFormat('BOX8916','#,###'); 

		for(var i=0;i<GridObj4.GetRowCount();i++) {
				if(GridObj4.GetCellValue('GYR',i) == "G" || GridObj4.GetCellValue('GYR',i) == "GtoY"){  // GREEN
					GridObj4.SetCellBgColor('GYR', i, '0|255|0');
				}
				else if(GridObj4.GetCellValue('GYR',i) == "Y"){ // YELLOW
					GridObj4.SetCellBgColor('GYR', i, '255|255|0'); 
				}
				else // RED
					GridObj4.SetCellBgColor('GYR', i, '255|0|0'); 
			}

        } else	
        { 
            error_msg = GridObj4.GetMessage(); 
            alert(error_msg);			
        }
    }
    
}
    
       
// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
function setGridAutoResize2( tab_h, table_h ){
	
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
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tabPage2.style.height = tabHeightValue + "px"; 
	tabPage3.style.height = tabHeightValue + "px"; 
	tabPage4.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
	document.grid3.height = tableHeightValue + "px"; 
	//document.grid4.height = tableHeightValue + "px"; 
	document.WiseGrid4.height = tableHeightValue + "px"; 
	
} 

