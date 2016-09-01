
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
	
	// ȭ�� �ε�� ������ ǥ��
	doQuery();
}

function setHeader(GridObj) {		
	//"�׷� �ڵ�!%!�׷� ��"
	GridObj.AddHeader("CRUD",		"����",		"t_text", 		8, 		40,		true);		
//	GridObj.AddHeader("SELECTED",   "����",      "t_checkbox",	2,		30,    	true);
	GridObj.AddHeader("GROUP_ID", 	"�׷� �ڵ�",	"t_text", 		50, 	100, 	false);
	GridObj.AddHeader("GROUP_NAME", "�׷��",		"t_text", 		50, 	100, 	true);
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
	
	//AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�
	GridObj.BoundHeader();	

//	GridObj.SetColHDCheckBoxValue("SELECTED", true);
	
	//�����带 ����� �������̵�� ����Ѵ�. 	
	GridObj.SetCRUDMode("CRUD", "�߰�", "����", "����");
	

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
		alert("���õ� ���� �����ϴ�.");
		return;	
	}

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "update");

	//WiseGrid�� ������ ��Žÿ� �����͸� �����Ѵ�. ���������� üũ�� �ο츸 ���۹ް� �ȴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");
	
	
	//�����ϰ� ������ cell ���� ���ϰ� ����!
	GridObj.SetCellActivation("GROUP_ID", GridObj.GetActiveRowIndex(), "activatenoedit");
}

/* ���� */
function doSave() {
 if(nullCheck() == "isNull"){
  alert("�߰��Ͻ� ������ �� GROUP_ID �� ���� ���� ���ּ���");
 }else{
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");

	//WiseGrid�� ������ ��Žÿ� �����͸� ������
	GridObj.DoQuery(servlet_url, "CRUD");

	//doQuery()�� �ٽ� ȣ���ϱ����ؼ� �ݵ��� �ʿ�.!
	//alert("������ �Ϸ� �Ǿ����ϴ�.");

//    GridObj.SetParam("mode", "search");		
	//GridObj.DoQuery(servlet_url);
	
 
	
 }
}



/* �����忡�� ���� �÷��׸� ��� �����ϰ� �ʱ� �����ͷ� �ѹ��Ѵ�. */
function doSaveCancel() {
	var GridObj = document.WiseGrid;
	
	if(confirm("���� �÷��׸� ��� �ʱ�ȭ �մϴ�"))
		GridObj.CancelCRUD();
}



/* ���� */
function doDelete() {
	var GridObj = document.WiseGrid;
	// Active�� �ο��� �ε��� ��ġ�� ���� �����Ѵ�. 
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

/* ���� */
/*
function doDelete() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.group_list";

	if(!chkSelected()) {
		alert("���õ� ���� �����ϴ�.");
		return;

	}

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "delete");
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����Ѵ�. ���������� üũ�� �ο츸 ���۹ް� �ȴ�.
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




/* ���߰� */
function doLineInsert() {
	var GridObj = document.WiseGrid;
	
	//�׸����� ������ ���� �� �ο츦 �߰��Ѵ�. 
	GridObj.AddRow();
	
	//������ �� SELECTED�� Active�� �ο��� �ε����� ���� �ִ´�.
	//GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");

	//������ �÷� �� ITEM_CODE�� Active�� �ο��� �ε����� ������ �����ϰ� �Ѵ�.
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




/* �������� ����� ���������� �Ϸ�Ǹ� �߻��Ѵ�. */
function GridEndQuery() {
	var GridObj = document.WiseGrid;
	//�������� mode�� ������ �Ķ���͸� �����´�.
	var mode = ""; //GridObj.GetParam("mode");

	if(mode == "search") {
		if(GridObj.GetStatus() == "true") { // �������� ������ �����ڵ带 �����´�.
			//fieldset�� ������ �ʰ� �Ѵ�.
//			document.all.message.style.display="none";
			//textarea���� ����.
//			document.form.confirm.value =null;
		} else	{ 
			var error_msg = GridObj.GetMessage(); // �������� ������ �����ڵ尪�� false��� �����޼����� �����´�.
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		alert("����!!!");
		doQuery();
		if(GridObj.GetStatus() == "true") {// �������� ������ �����ڵ带 �����´�.
			//�������� insert_data ������ �Ķ���͸� �����´�.
			var insert_data = GridObj.GetParam("insert_data");				
			//fieldset�� ���̰� �Ѵ�.
//			document.all.message.style.display="";
			//textarea�� �������� ������ insert_data�� ������ �Ķ���͸� �ִ´�.
//			document.form.confirm.value = insert_data;
		} else	{
			var error_msg = GridObj.GetMessage(); // �������� ������ �����ڵ尪�� false��� �����޼����� �����´�.
			alert(error_msg);			
		}
	} else if(mode == "update") {
		alert("����");
		doQuery();
		if(GridObj.GetStatus() == "true") {// �������� ������ �����ڵ带 �����´�.
			//�������� update_data ������ �Ķ���͸� �����´�.
			var update_data = GridObj.GetParam("update_data");		
			//fieldset�� ���̰� �Ѵ�.
//			document.all.message.style.display="";
			//textarea�� �������� ������ update_data ������ �Ķ���͸� �ִ´�.
//			document.form.confirm.value = update_data;
		} else	{
			var error_msg = GridObj.GetMessage();// �������� ������ �����ڵ尪�� false��� �����޼����� �����´�.
			alert(error_msg);			
		}
	} else if(mode == "delete") {
		alert("����");
		doQuery();
		if(GridObj.GetStatus() == "true") {// �������� ������ �����ڵ带 �����´�.
			//�������� delete_data ������ �Ķ���͸� �����´�.
			var delete_data = GridObj.GetParam("delete_data");			
			//fieldset�� ���̰� �Ѵ�.
//			document.all.message.style.display="";
			//textarea�� �������� ������ delete_data ������ �Ķ���͸� �ִ´�.
//			document.form.confirm.value = delete_data;
			for( i = 0 ; i < document.WiseGrid.GetRowCount(); i ++) {				
				if(document.WiseGrid.GetCellValue('SELECTED',i) == 1) {					
					document.WiseGrid.DeleteRow(i);
					i--;					
				}
			}
		} else {
			var error_msg = GridObj.GetMessage();// �������� ������ �����ڵ尪�� false��� �����޼����� �����´�.
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
	
	
	
	
	
//�ߺ�üũ ȣ��! ���Ծ��۾�!
function integrityCheck(strColumnKey, nRow, vtOldValue, vtNewValue){
	if(strColumnKey == "GROUP_ID"){
 	integrityCheck_Java(strColumnKey, nRow, vtNewValue);
	} 
}
//�������� �ִ� ���ڴ� �Ǵٸ� �Լ� ȣ��
function integrityCheck_Java(strColumnKey, nRow, vtNewValue) {
 commonTool.integrity_Check(strColumnKey, nRow, vtNewValue, integrityCheck_result); 
}

//�ڹ� Ŭ���� ���Ͽ��� ���� �޾ƿ� ��(message)�� ���Ͽ� �޽��� ���!
function integrityCheck_result(result) {
 //�׸��� ������ �ߺ�üũ ȣ��!
 var integrityCheck_in_Grid = integrityCheckInGrid();
 if (result[0] == "ok"){
  if(integrityCheck_in_Grid != "ok"){
   alert(integrityCheck_in_Grid);
  }
 }else{
  alert(result[0]);
  var GridObj = document.WiseGrid;
  //������ �׸����� �Էµ� ���� �ٽ� �ʱ�ȭ!!  result[1], result[2]�� ���� ������ �׸����� �÷����� �ο찪�� ������ ����.
  GridObj.SetCellValue(result[1],result[2],'');
  //������ �׸����� ù��° �Է��� ���� ��Ŀ�� ����!
  GridObj.SetCellFocus(result[1], result[2], true);
 }
}

/*
function integrityCheck_result(result) {
 if (result[0] == "ok"){
 }else{
  alert(result[0]);
  var GridObj = document.WiseGrid;
  //������ �׸����� �Էµ� ���� �ٽ� �ʱ�ȭ!!  result[1], result[2]�� ���� ������ �׸����� �÷����� �ο찪�� ������ ����.
  GridObj.SetCellValue(result[1],result[2],'');
  //������ �׸����� ù��° �Է��� ���� ��Ŀ�� ����!
  GridObj.SetCellFocus(result[1], result[2], true);
 }
}
*/	
//�ߺ�üũ ��!!
	


//�׸��峻���� ������ �߰������� �ߺ�üũ!!
function integrityCheckInGrid(){
 
 setColumnColorWhite();
 
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 var columnName = 'GROUP_ID';
 
 for(var h = 0; h < count-1; h++){
  for(var i = h + 1; i < count; i++){
   if(GridObj.GetCellValue('CRUD',h)== "�߰�" && GridObj.GetCellValue(columnName,h) != ""){
    if(GridObj.GetCellValue(columnName,h) == GridObj.GetCellValue(columnName,i)){
     
     GridObj.SetCellBgColor(columnName, h, '10|200|255'); 
     
     GridObj.SetCellValue(columnName,i,''); //������ �׸����� �Էµ� ���� �ٽ� �ʱ�ȭ!! .
     GridObj.SetCellFocus(columnName, i, true); //������ �׸����� ù��° �Է��� ���� ��Ŀ�� ����!
     return "�߰��Ϸ��� GROUP_ID �� "
      + GridObj.GetCellValue(columnName,h)
      + "�� �ߺ��Ǿ����ϴ�";;
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
//�׸��峻���� ������ �߰������� �ߺ�üũ!! ��!!




	
	
	


//�� üũ!!
function nullCheck(){
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 var nullChk = ""
 for(var h = 0; h < count; h++){
  if(GridObj.GetCellValue('CRUD',h)== "�߰�"){
   if(GridObj.GetCellValue('GROUP_ID',h) == ""){
    nullChk = "isNull";
   }
  }
 }
 return nullChk;
}
//��üũ ��!!




// ���� ���� Ŭ��
function onclickfunc_ys(row, col) {
	
//	var user_id = document.frm._user_id.value;
//	var adminFlag = document.frm.adminFlag.value;
	// ����!%!���!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
//	if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
//		var perpage = document.frm._moon_perpage.value;
//		var pagenumber = document.frm._moon_pagenumber.value;
alert("����!Ŭ��!!!");
//		var urlStr = "service.do?_moon_service=user_detail&group_id=GRP001";
//		urlStr += data.split("!%!")[0];
//		urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
//		location.href = urlStr;
		GoSearch("group_detail");
//	}
	
}
// ���� ���� Ŭ�� ��!!




// ���� ���� Ŭ��
function onclickfunc(strColumnKey, nRow){
 /*
 var user_id = document.frm._user_id.value;
 var adminFlag = document.frm.adminFlag.value;
 // ����!%!���!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
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
// ���� ���� Ŭ�� ��!!





/* //user_list2
function onclickfunc(strColumnKey, nRow){
 var GridObj = document.WiseGrid;
 
   if(GridObj.GetCellValue('CRUD',nRow)== ""){
       var user_id = document.frm._user_id.value;
       var adminFlag = document.frm.adminFlag.value;
       // ����!%!���!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
  
  
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
 // ����!%!���!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
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
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};






//�׽�Ʈ ��!!!
/*
function integrityCheck2(strColumnKey, nRow, vtOldValue, vtNewValue){
 
 var GridObj = document.WiseGrid;
 var count = GridObj.GetRowCount();
 //var message = new Array();
 if(strColumnKey == "GROUP_ID"){
 
  for(var h = 0; h < count-1; h++){
  
   for(var i = h + 1; i< count; i++){
    //if(GridObj.GetCellValue('CRUD',h)== "�߰�" && GridObj.GetCellValue(columnName,h) !=""){
    if(GridObj.GetCellValue(strColumnKey,h) == GridObj.GetCellValue(strColumnKey,i)
        && GridObj.GetCellValue(strColumnKey,h) !=""){
     
     
     alert("�߰��Ϸ��� user_id �� "+ GridObj.GetCellValue(strColumnKey,h)+ "�� �ߺ��Ǿ����ϴ�");

     GridObj.SetCellValue(strColumnKey,i,'');
     GridObj.SetCellFocus(strColumnKey,i, true);
      
     return " " 
     
    }    
   }
  }
 }
}
*/
//�׽�Ʈ�� ��!!



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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	//document.grid.height = tableHeightValue + "px"; 
	
} 