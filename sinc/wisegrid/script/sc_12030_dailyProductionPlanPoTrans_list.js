//############################################################
//## ���α׷�ID 	: sc_12030_dailyProductionPlanPoTrans_list.vm
//## ���α׷��� 	: �ϰ������ȹ ����(PO����)
//## ������  	: ���米
//## �������� 	: 2009-03-19 �����
//##
//## ���� job file 	 : job_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## ���� query file : query_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-03-19  ���米     sc_12030_dailyProductionPlanPoTrans_list.js ����
//##
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
var mode;													// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// ���� ��Ű��(class ���� ���)
var job_id = 'sc_12030_dailyProductionPlanPoTrans_list';	// job id(���� ��, WiseGrid Header key)
var GridObj ; 												// WiseGrid ��ü

/******************************************          Action Function         **********************************************/
/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function GoSearch(service) {
	mode = "search";
	doQuery();
};

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function GoSave() {
	mode = "save";
	doSave();	
};

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function GoTrans() {
	mode = "trans";
	
	commonUtil.getCodeList("job_id", job_id , "init_trans_status_check",getTransStatus); 
};

/*������������������������������������������������������������������������
  ������ ���°� üũ.
  ������������������������������������������������������������������������*/
   function getTransStatus(result)
   {
        var len = document.frm.selected_plant.length;
        var str = "";
        var cnt = 0;
        for( i = 0 ; i < len ; i++){
            if( document.frm.selected_plant[i].checked == true ){
                if( cnt > 0 ) str += "','";
                str += document.frm.selected_plant[i].value;		
                cnt++;	
            }
        }		

        if( cnt == 0 ){
            alert("���õ� ������ �����ϴ�!!");
            return;
        }    
        
        if(result=='Y') //���°�'Y'=���۰���, 'N'=���ۺҰ���
        {
            if(confirm("������ ���� �Ͻðڽ��ϱ�?"))
            {
                doTrans();
            } else {
                alert('���� ���');
            }
        } else {
            alert('���� ���� ���Դϴ�.');
        }
   }



/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid �ʱ�ȭ
  ������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// �⺻ property ����
	setDefault();  			// �߰� property ����
	setHeader();   			// Header ����
			
}

/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault(){
	
	GridObj.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bHDMoving = false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj.bRowSelectorVisible = false;        	//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "180|238|180";    //���õ� ���� �������� �����Ѵ�.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	// Grid �� ����
    GridObj.nRowHeight    = 20;
    
    GridObj.strSelectedCellFgColor = '180|82|205'; //���õ� ���� ���ڻ� �����Ѵ�.
   
    /* Context Menu ����� MENU �߰� */
        
}

/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	GridObj.AddGroup("SHIFT_QTY", "����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("SHIFT_QTY", "FROM_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "TO_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "MADE_TYPE");
	
	GridObj.AddGroup("REASON_MSG", "����");			
	GridObj.AppendHeader("REASON_MSG", "REASON01");
	GridObj.AppendHeader("REASON_MSG", "REASON02");
	
	GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 

    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('PROD_DATES','center'); 
    GridObj.SetColCellAlign('ORD_NO','center'); 
    GridObj.SetColCellAlign('ORD_ITEM_NO','center'); 
    GridObj.SetColCellAlign('TRANS_TYPE','center'); 
    GridObj.SetColCellAlign('MADE_DTTM','center'); 
    GridObj.SetColCellAlign('MADE_BY','center'); 
    GridObj.SetColCellAlign('PO_NO','center'); 
    GridObj.SetColCellAlign('REL_STAT','center'); 
	
	GridObj.SetNumberFormat("FROM_QTY", "###,###,###"); // ���� ����
	GridObj.SetNumberFormat("TO_QTY"  , "###,###,###");
	
	GridObj.nHDLines = 2; 
	GridObj.nHDLineSize  = 15;

	           
}

/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", mode);
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("���õ� ������ �����ϴ�!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//����
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "���� ������ �߸� �Ǿ����ϴ�!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//����
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", mode);
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("���õ� ������ �����ϴ�!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//����
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "���� ������ �߸� �Ǿ����ϴ�!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//����
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doTrans() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", mode);
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("���õ� ������ �����ϴ�!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//����
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "���� ������ �߸� �Ǿ����ϴ�!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//����
	var checked_po_type;
	
	checked_po_type = document.frm.checked_po_type[1].value; //���۰��
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);
 
}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*��������������������������������������������������������������������������������
  ��	WiseGrid ��� �� Grid ���� �� ���� Fnc
  ��������������������������������������������������������������������������������*/
function GridEndQuery() {
    var checked_po_type ='';
    
	setGrid(GridObj); //WiseGrid ����
			
	//
	var mode = GridObj.GetParam("mode");

	if(mode == "search") { //��ȸ
		if(GridObj.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
		
		
    	if( document.frm.checked_po_type[0].checked == true ){
    		checked_po_type = document.frm.checked_po_type[0].value;
    	}else if( document.frm.checked_po_type[1].checked == true ){
    		checked_po_type = document.frm.checked_po_type[1].value;
    	}else if( document.frm.checked_po_type[2].checked == true ){
    		checked_po_type = document.frm.checked_po_type[2].value;
    	}		
		
		if(checked_po_type=='03')
		{
		    GridObj.SetColHide('REASON01', true) 
		    GridObj.SetColHide('REASON02', true) 
		    GridObj.SetColHide('MADE_BY' , true)
		} else {
		    GridObj.SetColHide('REASON01', false) 
		    GridObj.SetColHide('REASON02', false) 
		    GridObj.SetColHide('MADE_BY' , false) 
	    }
	    GridObj.SetColHide('TRANS_MSG' , true) 
	    
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			//GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(mode == "trans"){ //����
		if(GridObj.GetStatus() == "true") {// 
			//document.frm.checked_po_type[1].checked = true;
			document.frm.btnSelect.disabled = true;
		} else {
			var error_msg = GridObj.GetMessage();// 
//			alert(error_msg);			
		}
	}
	
}

/*������������������������������������������������������������������������
  ��WiseGrid ����
  ������������������������������������������������������������������������*/
function setGrid(){
	
	// �÷� �׷�
	GridObj.SetGroupMerge('PLANT_NAME,PROC_NAME,ITEM_NAME'); 
	
	// �÷� ����
	//GridObj.SetColFix('C14');
	
	// ���� ���� ����
	//GridObj.SetColCellActivation('SP01','disable');
	
	//�÷� ���ڻ�
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// �� ���
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// �հ�
	//GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
	//GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
			
	// �÷� ����
	//GridObj.SetColCellBgColor('C36','160|160|160');//�հ�
    
    // ������ ������ Row�� �̵�
    //GridObj.MoveRow(rowIndex);
}



/*********************************************   WiseGrid Event   *********************************************************/ 
/*������������������������������������������������������������������������
  ��WiseGrid Mouse Over Event
  ������������������������������������������������������������������������*/
function GridMouseOverHandler(strType, strColumnKey, nRow){ 

};

/*����������������������������������������������������������������������������������
  ��WiseGrid User Context Menu Click Event
  ����������������������������������������������������������������������������������*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
//	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
//		
//		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
//			
//		}
//		else if( strMenuItemKey == "MENU02" ){	// ROW ����
//
//		}
//		else {
//			alert("���� ���� ���� �޴��Դϴ�.");
//		}		
//	}

};

/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){

};

/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) {

}

/*������������������������������������������������������������������������
  ��WiseGrid Cell Click Event
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){

}

/*********************************************   ��Ÿ Function   **********************************************************/
/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
	
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
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	
}

/*������������������������������������������������������������������������
  ������ ���� Fnc
  ������������������������������������������������������������������������*/	
function checkedWeekly(obj){

	obj.checked;
	
	if( obj.value == "01" ){
		document.frm.btnSelect.disabled = false;
	}
	else{
		document.frm.btnSelect.disabled = true;
	}

}

/*������������������������������������������������������������������������
  ������ ��¥(yyyymmdd) ����  Fnc
  ������������������������������������������������������������������������*/
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
  ��Check Box ���� : ��ü Click  Fnc
  ������������������������������������������������������������������������*/
function checkSelectedPlantAll(obj){
	
	var len = document.frm.selected_plant.length;
	if( obj.checked == true ){
		//alert(document.frm.selected_plant.length);		
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = true;
		}
	}
	else{
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = false;
		}
	}
	
};	
