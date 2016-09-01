
function GoSearch(service) {
	doQuery();
}

function init() {
	var GridObj = document.WiseGrid;
	setHeader(GridObj);
	setProperty(GridObj);
	//GridObj.strBgImage = "../../WiseGrid/images/icompia_logo_white.gif";
	//GridObj.strBgImage = "/scm/WiseGrid/images/icompia_logo_white.gif";
	GridObj.bUserContextMenu = true;
	 
	//getdatetime();
	
	// 화면 로드시 데이터 표시
	doQuery();
}

function setHeader(GridObj) {		
	//"그룹 코드!%!그룹 명"
	GridObj.AddHeader("CRUD",		"구분",		"t_text", 		8, 		40,		true);		
//	GridObj.AddHeader("SELECTED",   "선택",      "t_checkbox",	2,		30,    	true);
	GridObj.AddHeader("GROUP_ID", 	"그룹 코드",	"t_text", 		50, 	100, 	false);
	GridObj.AddHeader("GROUP_NAME", "그룹명",		"t_text", 		50, 	100, 	true);
	/*
	GridObj.AddHeader("ITEM_FLAG", 		"????",		"t_combo", 		10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"????",		"t_text", 		50, 	80,		true);
	GridObj.AddHeader("ITEM_CODE", 		"????",		"t_imagetext", 	20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"???", 		"t_text", 		500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"??", 			"t_text", 		2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"??",			"t_combo",		10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"???", 		"t_number", 	22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"???", 		"t_number", 	22,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"???", 		"t_date", 		8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"???", 		"t_date", 		8,		85,		true);	
	GridObj.AddHeader("SEQ_NO",			"SEQ_NO", 		"t_text", 		8,		85,		true);
	*/
	
	//AddHeader를 완료한 후 헤더를 그리드에 바인딩한다
	GridObj.BoundHeader();	

//	GridObj.SetColHDCheckBoxValue("SELECTED", true);
	
	//저장모드를 사용해 서버사이드와 통신한다. 	
	GridObj.SetCRUDMode("CRUD", "추가", "수정", "삭제");
	

	// ??? ???? ??? ??? ??? ??
	//GridObj.SetScrollTip("USER_NAME");
	
	//t_checkbox ??? ??? ??? ??????.
	//GridObj.SetColHDCheckBoxVisible("SELECTED", true);
	
	/*
	//?? ??? ???.
	GridObj.SetColHide("SEQ_NO", true);
	 
	//t_combo ??? ??? Combo List ? ????. 
	GridObj.AddComboListValue("ITEM_FLAG", "????", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "????", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "?????", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "?????", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "???", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MOU");

	GridObj.AddComboListValue("UNIT", "EA", "EA");

	//??????? ??? URL? ????
	GridObj.AddImageList("ITEM_CODE", "../../images/bt_search.gif");

	//?? ???? ????.
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");	
	
	//t_number ??? ??? ??????  ????.
	GridObj.SetNumberFormat("PRICE", "#,##0.00"); 
	GridObj.SetNumberFormat("STOCK", "#,##0"); 

	//t_date ??? ??? ??????  ????.
	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
 	*/
 	
	//??? Export?? ??? ??? ????. 
	//GridObj.SetExcelHeader("????", 20, 15, "center");

	//??? Export?? ??? Footer? ????.
 	//GridObj.SetExcelFooter("Copyright 2007 iCOMPIA CORP.", 15, 10, "right");
}

/* ?? */
function doQuery() {
	var GridObj = document.WiseGrid;
	
	//GridObj.SetCellValue( "USER_ID", 0, "admin2");
	//return;
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";
	//alert(Project_name);
	//WiseGrid? ??? ??? Param? ????.
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("_board_search_condition", document.frm._board_search_condition.value );
	GridObj.SetParam("_board_search_value", document.frm._board_search_value.value);

	//WiseGrid? ??? ???? ???? ????.
	GridObj.DoQuery(servlet_url);
}

/* ?? */
function doInsert() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	//GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doUpdate() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	if(!chkSelected()) {
		alert("선택된 건이 없습니다.");
		return;	
	}

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "update");

	//WiseGrid가 서버와 통신시에 데이터를 전달한다. 서버에서는 체크된 로우만 전송받게 된다.
	GridObj.DoQuery(servlet_url, "SELECTED");
	
	
	//저장하고 나서는 cell 수정 못하게 막기!
	GridObj.SetCellActivation("GROUP_ID", GridObj.GetActiveRowIndex(), "activatenoedit");
}

/* 저장 */
function doSave() {
 if(nullCheck() == "isNull"){
  alert("추가하신 데이터 중 GROUP_ID 에 빈값이 없게 해주세요");
 }else{
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "save");

	//WiseGrid가 서버와 통신시에 데이터를 전달한
	GridObj.DoQuery(servlet_url, "CRUD");

	//doQuery()를 다시 호출하기위해선 반듯이 필요.!
	//alert("저장이 완료 되었습니다.");

//    GridObj.SetParam("mode", "search");		
	//GridObj.DoQuery(servlet_url);
	
 
	
 }
}



/* 저장모드에서 저장 플래그를 모두 삭제하고 초기 데이터로 롤백한다. */
function doSaveCancel() {
	var GridObj = document.WiseGrid;
	
	if(confirm("저장 플래그를 모두 초기화 합니다"))
		GridObj.CancelCRUD();
}



/* 삭제 */
function doDelete() {
	var GridObj = document.WiseGrid;
	// Active된 로우의 인덱스 위치의 행을 삭제한다. 
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

/* 삭제 */
/*
function doDelete() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	if(!chkSelected()) {
		alert("선택된 건이 없습니다.");
		return;

	}

	//WiseGrid가 서버에 전송할 mode를 셋팅한다.
	GridObj.SetParam("mode", "delete");
	
	//WiseGrid가 서버와 통신시에 데이터를 전달한다. 서버에서는 체크된 로우만 전송받게 된다.
	GridObj.DoQuery(servlet_url, "SELECTED");
		
}
* 
* /

/* ??? ?????? ????. */
function chkSelected() {
	var GridObj = document.WiseGrid;
	chkCount = 0;

	for(i = 0; i < GridObj.GetRowCount(); i++) { //??? ???? ???? ????. 

		if(GridObj.GetCellValue("SELECTED", i) == "1") //??? ?? ?? ????. 
			chkCount = chkCount + 1;
	}
	
	if(chkCount == 0) {
		return false;	
	}
	return true;
}




/* 행추가 */
function doLineInsert() {
	var GridObj = document.WiseGrid;
	
	//그리드의 마지막 열에 빈 로우를 추가한다. 
	GridObj.AddRow();
	
	//지정한 셀 SELECTED에 Active된 로우의 인덱스에 값을 넣는다.
	//GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");

	//지정한 컬럼 셀 ITEM_CODE에 Active된 로우의 인덱스의 편집을 가능하게 한다.
	GridObj.SetCellActivation("GROUP_ID", GridObj.GetActiveRowIndex(), "edit");
}







/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
}

/* WiseGrid? ?? ??? ?????? ????. */
function GridChangeCell(strColumnKey, nRow) {
	var GridObj = document.WiseGrid;
	if(strColumnKey != "SELECTED") {
		//??? ? SELECTED ?? ??? ??? ?? ???. 
		GridObj.SetCellValue("SELECTED", nRow, "1");
	}
}




/* 서버와의 통신이 정상적으로 완료되면 발생한다. */
function GridEndQuery() {
	var GridObj = document.WiseGrid;
	//서버에서 mode로 셋팅한 파라미터를 가져온다.
	var mode = ""; //GridObj.GetParam("mode");

	if(mode == "search") {
		if(GridObj.GetStatus() == "true") { // 서버에서 전송한 상태코드를 가져온다.
			//fieldset을 보이지 않게 한다.
//			document.all.message.style.display="none";
			//textarea값을 비운다.
//			document.form.confirm.value =null;
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 서버에서 전송한 상태코드값이 false라면 에러메세지를 가져온다.
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		alert("삽입!!!");
		doQuery();
		if(GridObj.GetStatus() == "true") {// 서버에서 전송한 상태코드를 가져온다.
			//서버에서 insert_data 셋팅한 파라미터를 가져온다.
			var insert_data = GridObj.GetParam("insert_data");				
			//fieldset을 보이게 한다.
//			document.all.message.style.display="";
			//textarea에 서버에서 가져온 insert_data에 셋팅한 파라미터를 넣는다.
//			document.form.confirm.value = insert_data;
		} else	{
			var error_msg = GridObj.GetMessage(); // 서버에서 전송한 상태코드값이 false라면 에러메세지를 가져온다.
			alert(error_msg);			
		}
	} else if(mode == "update") {
		alert("수정");
		doQuery();
		if(GridObj.GetStatus() == "true") {// 서버에서 전송한 상태코드를 가져온다.
			//서버에서 update_data 셋팅한 파라미터를 가져온다.
			var update_data = GridObj.GetParam("update_data");		
			//fieldset을 보이게 한다.
//			document.all.message.style.display="";
			//textarea에 서버에서 가져온 update_data 셋팅한 파라미터를 넣는다.
//			document.form.confirm.value = update_data;
		} else	{
			var error_msg = GridObj.GetMessage();// 서버에서 전송한 상태코드값이 false라면 에러메세지를 가져온다.
			alert(error_msg);			
		}
	} else if(mode == "delete") {
		alert("삭제");
		doQuery();
		if(GridObj.GetStatus() == "true") {// 서버에서 전송한 상태코드를 가져온다.
			//서버에서 delete_data 셋팅한 파라미터를 가져온다.
			var delete_data = GridObj.GetParam("delete_data");			
			//fieldset을 보이게 한다.
//			document.all.message.style.display="";
			//textarea에 서버에서 가져온 delete_data 셋팅한 파라미터를 넣는다.
//			document.form.confirm.value = delete_data;
			for( i = 0 ; i < document.WiseGrid.GetRowCount(); i ++) {				
				if(document.WiseGrid.GetCellValue('SELECTED',i) == 1) {					
					document.WiseGrid.DeleteRow(i);
					i--;					
				}
			}
		} else {
			var error_msg = GridObj.GetMessage();// 서버에서 전송한 상태코드값이 false라면 에러메세지를 가져온다.
			alert(error_msg);			
		}
	}
}

function GridCellClick(strColumnKey, nRow){
	return;
}


function getdatetime() {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if(month < 10)
		month = "0" + month;
		
	if(day < 10)
		day = "0" + day;

	document.frm.to_date.value = year + "" + month + "" + day;

}	
	
	
	
	
	
//중복체크 호출! 윤규씨작업!
function integrityCheck(strColumnKey, nRow, vtOldValue, vtNewValue){
	if(strColumnKey == "GROUP_ID"){
 	integrityCheck_Java(strColumnKey, nRow, vtNewValue);
	} 
}
//마지막에 있는 인자는 또다른 함수 호출
function integrityCheck_Java(strColumnKey, nRow, vtNewValue) {
 commonTool.integrity_Check(strColumnKey, nRow, vtNewValue, integrityCheck_result); 
}

//자바 클래스 파일에서 리턴 받아온 값(message)을 비교하여 메시지 출력!
function integrityCheck_result(result) {
 //그리드 내에서 중복체크 호출!
 var integrityCheck_in_Grid = integrityCheckInGrid();
 if (result[0] == "ok"){
  if(integrityCheck_in_Grid != "ok"){
   alert(integrityCheck_in_Grid);
  }
 }else{
  alert(result[0]);
  var GridObj = document.WiseGrid;
  //와이즈 그리드의 입력된 값을 다시 초기화!!  result[1], result[2]의 값은 와이즈 그리드의 컬럼값과 로우값을 가지고 있음.
  GridObj.SetCellValue(result[1],result[2],'');
  //와이즈 그리드의 첫번째 입력한 셀로 포커스 복귀!
  GridObj.SetCellFocus(result[1], result[2], true);
 }
}

/*
function integrityCheck_result(result) {
 if (result[0] == "ok"){
 }else{
  alert(result[0]);
  var GridObj = document.WiseGrid;
  //와이즈 그리드의 입력된 값을 다시 초기화!!  result[1], result[2]의 값은 와이즈 그리드의 컬럼값과 로우값을 가지고 있음.
  GridObj.SetCellValue(result[1],result[2],'');
  //와이즈 그리드의 첫번째 입력한 셀로 포커스 복귀!
  GridObj.SetCellFocus(result[1], result[2], true);
 }
}
*/	
//중복체크 끝!!
	


//그리드내에서 여러개 추가했을때 중복체크!!
function integrityCheckInGrid(){
 
 setColumnColorWhite();
 
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 var columnName = 'GROUP_ID';
 
 for(var h = 0; h < count-1; h++){
  for(var i = h + 1; i < count; i++){
   if(GridObj.GetCellValue('CRUD',h)== "추가" && GridObj.GetCellValue(columnName,h) != ""){
    if(GridObj.GetCellValue(columnName,h) == GridObj.GetCellValue(columnName,i)){
     
     GridObj.SetCellBgColor(columnName, h, '10|200|255'); 
     
     GridObj.SetCellValue(columnName,i,''); //와이즈 그리드의 입력된 값을 다시 초기화!! .
     GridObj.SetCellFocus(columnName, i, true); //와이즈 그리드의 첫번째 입력한 셀로 포커스 복귀!
     return "추가하려는 GROUP_ID 중 "
      + GridObj.GetCellValue(columnName,h)
      + "가 중복되었습니다";;
    }
   }
  }
 }
 return "ok";
}



function setColumnColorWhite(){
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 for(var h = 0; h < count; h++){
  GridObj.SetCellBgColor('GROUP_ID', h, '255|255|255'); 
 } 
}
//그리드내에서 여러개 추가했을때 중복체크!! 끝!!




	
	
	


//널 체크!!
function nullCheck(){
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 var nullChk = ""
 for(var h = 0; h < count; h++){
  if(GridObj.GetCellValue('CRUD',h)== "추가"){
   if(GridObj.GetCellValue('GROUP_ID',h) == ""){
    nullChk = "isNull";
   }
  }
 }
 return nullChk;
}
//널체크 끝!!




// 변경 더블 클릭
function onclickfunc_ys(row, col) {
	
//	var user_id = document.frm._user_id.value;
//	var adminFlag = document.frm.adminFlag.value;
	// 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
//	if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
//		var perpage = document.frm._moon_perpage.value;
//		var pagenumber = document.frm._moon_pagenumber.value;
alert("더블!클릭!!!");
//		var urlStr = "service.do?_moon_service=user_detail&group_id=GRP001";
//		urlStr += data.split("!%!")[0];
//		urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
//		location.href = urlStr;
		GoSearch("group_detail");
//	}
	
}
// 변경 더블 클릭 끝!!




// 변경 더블 클릭
function onclickfunc(strColumnKey, nRow){
 /*
 var user_id = document.frm._user_id.value;
 var adminFlag = document.frm.adminFlag.value;
 // 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
 if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
 
 }*/
 var GridObj = document.WiseGrid; 
 
//var perpage = document.frm._moon_perpage.value;
//var pagenumber = document.frm._moon_pagenumber.value;

    if(GridObj.GetCellValue('CRUD',nRow) == "")
    {

 		var cellValue = GridObj.GetCellValue(strColumnKey, nRow);

    	var  urlStr  = "service.do?_moon_service=group_modify2&group_id=";
        	 urlStr += cellValue;
         	//urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
    	location.href = urlStr;
    }
  
  //location.href = "service.do?_moon_service=user_detail&user_id=admin&_moon_perpage=100&_moon_pagenumber=1"
}
// 변경 더블 클릭 끝!!





/* //user_list2
function onclickfunc(strColumnKey, nRow){
 var GridObj = document.WiseGrid;
 
   if(GridObj.GetCellValue('CRUD',nRow)== ""){
       var user_id = document.frm._user_id.value;
       var adminFlag = document.frm.adminFlag.value;
       // 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
  
  
       if(adminFlag == "Y" ) {
          var GridObj = document.WiseGrid;
          var cellValue = GridObj.GetCellValue(strColumnKey, nRow);
          var urlStr = "service.do?_moon_service=super_user_modify&user_id=";
              urlStr += cellValue;
          location.href = urlStr;  
     }
   }
}
*/





function onclickfunc_user_list(strColumnKey, nRow){
 
 var user_id = document.frm._user_id.value;
 var adminFlag = document.frm.adminFlag.value;
 // 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
 if(adminFlag == "Y" ) {
  var GridObj = document.WiseGrid;
  var cellValue = GridObj.GetCellValue(strColumnKey, nRow);
  var urlStr = "service.do?_moon_service=user_detail&user_id=";
   urlStr += cellValue;
  location.href = urlStr;  
 }
 }




function reQuery(){
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 
 if(count > 10 || count <10 ){
   doQuery();
 }
}






GoSearch = function(service) {
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};






//테스트 중!!!
/*
function integrityCheck2(strColumnKey, nRow, vtOldValue, vtNewValue){
 
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 //var message = new Array();
 if(strColumnKey == "GROUP_ID"){
 
  for(var h = 0; h < count-1; h++){
  
   for(var i = h + 1; i< count; i++){
    //if(GridObj.GetCellValue('CRUD',h)== "추가" && GridObj.GetCellValue(columnName,h) !=""){
    if(GridObj.GetCellValue(strColumnKey,h) == GridObj.GetCellValue(strColumnKey,i)
        && GridObj.GetCellValue(strColumnKey,h) !=""){
     
     
     alert("추가하려는 user_id 중 "+ GridObj.GetCellValue(strColumnKey,h)+ "가 중복되었습니다");

     GridObj.SetCellValue(strColumnKey,i,'');
     GridObj.SetCellFocus(strColumnKey,i, true);
      
     return " " 
     
    }    
   }
  }
 }
}
*/
//테스트중 끝!!



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
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	//document.grid.height = tableHeightValue + "px"; 
	
} 