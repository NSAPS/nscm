// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

function	doChange_sel_gubn(obj) {
	
	document.frm.in_item_id.value = "";
	document.frm.in_item_name.value = "";
}

// ǰ�� POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
	}
	else{
		var service_url = "service.do?_moon_service=ip_06010_Prty_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_sel_gubn=" + in_sel_gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();		
	}
}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+document.frm.in_sel_gubn.value;

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup ����! 
				openItemPopup();
			}
		}
	});
}


// enter check �� 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// �ڱ�ȭ�� ����
	//		GoSearch();
		}
	} 
}



/*������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������*/
function init() {

	var GridObj = document.WiseGrid;

	GridObj.ClearGrid(); 
	setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setDefault();        //ȭ�� �⺻ ���� 
	setHeader(GridObj);  //�ش����� 

}
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() {

	var GridObj = document.WiseGrid;

    GridObj.nHDLines         = 2; //Header LINE��
    GridObj.nHDLineSize      = 14; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
   	
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {		

	var in_sel_type		= document.frm.in_sel_type.value;
	
	if(in_sel_type == "00") { // ǰ�� 
		GridObj.AddHeader("ITEM_ID"			,"�ڵ�"       		,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"ǰ���"       		,"t_text" ,200	,200  ,false); //1   
	}
	else if(in_sel_type == "01") { // �������-ǰ�� 
		GridObj.AddHeader("DC_ID"			,"�ڵ�"       	,"t_text" ,10	,40  ,false); //0   
		GridObj.AddHeader("DC_NAME"			,"���������"		,"t_text" ,200	,100 ,false); //1   
		GridObj.AddHeader("ITEM_ID"			,"�ڵ�"       	,"t_text" ,10	,60  ,false); //2   
		GridObj.AddHeader("ITEM_NAME"		,"ǰ���"       	,"t_text" ,200	,200  ,false); //3   
	}
	else { // ǰ��-�������		
		GridObj.AddHeader("ITEM_ID"			,"�ڵ�"       	,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"ǰ���"       	,"t_text" ,200	,200  ,false); //1  
		GridObj.AddHeader("DC_ID"			,"�ڵ�"       	,"t_text" ,10	,40  ,false); //2   
		GridObj.AddHeader("DC_NAME"			,"���������"		,"t_text" ,200	,100 ,false); //3   
	}
	GridObj.AddHeader("TERM_VAL"		,"�������"       	,"t_number" ,5 ,60 ,false); //4   
	GridObj.AddHeader("GYR_RATE"		,"GYR����"       	,"t_text" ,30 ,80 ,false); //3   
	GridObj.AddHeader("Y"				,"Y"       			,"t_number" ,20 ,60 ,false); //4   
	GridObj.AddHeader("R"				,"R"       			,"t_number" ,20 ,60 ,false); //5   
	GridObj.AddHeader("Y_REMN"			,"Y_�ܷ�"        	,"t_number" ,20  ,60  ,false); //6   
	GridObj.AddHeader("R_REMN"			,"R_�ܷ�"        	,"t_number" ,20  ,60  ,false); //7   
	GridObj.AddHeader("USE_QTY"			,"������"        	,"t_number" ,20  ,60  ,false); //8   
	GridObj.AddHeader("USE_RATE"		,"������\n(%)"		,"t_number" ,20.1  ,60  ,false); //9   

	GridObj.BoundHeader();	
}
   	

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service) {

	// ��ȸ�� WAITING �̹��� �����ֱ�
//	viewWait();
	
	doQuery();

    // Waiting image ����!
//	viewWait();

}

  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {
    	
}
      
   
/*������������������������������������������������������������������������
  ����ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {

	var GridObj 		= document.WiseGrid;
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= document.frm.in_item_id.value;    
	var in_item_name	= document.frm.in_item_name.value;
	var in_dc_id		= document.frm.in_dc_id.value;    
	var in_sel_gubn		= document.frm.in_sel_gubn.value;    
	var in_sel_type		= document.frm.in_sel_type.value;    
	       
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.ip_04050_GYR_Analysis_list";

	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("in_work_date", in_work_date);
	GridObj.SetParam("in_item_id", in_item_id);
	GridObj.SetParam("in_item_name", in_item_name);
	GridObj.SetParam("in_dc_id", in_dc_id);
	GridObj.SetParam("in_sel_gubn", in_sel_gubn);
	GridObj.SetParam("in_sel_type", in_sel_type);
	GridObj.DoQuery(servlet_url);
   
	GridObj.ClearGrid(); 
	setHeader(GridObj);  //�ش����� 

}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
    
	var GridObj = document.WiseGrid;
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
	var in_sel_type		= document.frm.in_sel_type.value;    

    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                                                    
			if(in_sel_type == "00") {

			    //�÷�����
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			}
			else {

			    //�÷�����
			    GridObj.SetColCellAlign('DC_ID','center'); 
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			}

		    GridObj.SetColCellAlign('TERM_VAL','center'); 
		    GridObj.SetColCellAlign('GYR_RATE','center'); 
		    GridObj.SetColCellAlign('Y','right'); 
		    GridObj.SetColCellAlign('R','right'); 
		    GridObj.SetColCellAlign('Y_REMN','right'); 
		    GridObj.SetColCellAlign('R_REMN','right'); 
		    GridObj.SetColCellAlign('USE_QTY','right'); 
		    GridObj.SetColCellAlign('USE_RATE','right'); 

		    GridObj.SetNumberFormat('Y','#,###'); 
		    GridObj.SetNumberFormat('R','#,###'); 
		    GridObj.SetNumberFormat('Y_REMN','#,###'); 
		    GridObj.SetNumberFormat('R_REMN','#,###'); 
		    GridObj.SetNumberFormat('USE_QTY','#,###'); 
		    GridObj.SetNumberFormat('USE_RATE','#,##0.#'); 

        } else	
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);			
        }
    }
    
}
    
    
   
/*������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) {
   	/*
if(strColumnKey != "SELECTED") {
	//??? ? SELECTED ?? ??? ??? ?? ???. 
	GridObj.SetCellValue("SELECTED", nRow, "1");
}
*/
}    
    
   /* ?? */
function doInsert() {

/*	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
	   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");
	   
	   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ?? */
function doUpdata() {
/*
   	var GridObj = document.WiseGrid;
   	var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "update");
   
   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ?? */
function doDelete() {
/*
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "delete");
   
   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ??? ?????? ????. */
function chkSelected() {

}
   
   /* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
   	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
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

/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function handler(strColumnKey, nRow) {

	var GridObj = document.WiseGrid;

	var service_url 	= "service.do?_moon_service=ip_04050_GYR_Item_Detail_popup";
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= GridObj.GetCellValue("ITEM_ID",nRow); // wiseGrid���� ������ ǰ��   
	var in_item_name	= GridObj.GetCellValue("ITEM_NAME",nRow); // wiseGrid���� ������ ǰ��   
	
	service_url += "&in_work_date=" + in_work_date + "&in_item_id=" + in_item_id  + "&in_item_name=" + in_item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=840, height=500, top=0, left=0";
	var newWin = window.open(service_url, "ip_04050_GYR_Item_Detail_popup", pop_win_style);
	newWin.focus();	
}		
 
   
  
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		
   		


/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
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
	document.WiseGrid.height = tableHeightValue + "px"; 
	
} 	

