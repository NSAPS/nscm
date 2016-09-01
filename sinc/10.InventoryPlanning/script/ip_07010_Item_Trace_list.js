//############################################################
//## ���α׷�ID      : ip_07010_Item_Trace_list.vm
//## ���α׷���      : SCMǰ��������ȸ
//## ������          : ������
//## ��������        : 2009-07-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_07010_Item_Trace_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 

}
   
function init2() {
   		
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
	
}   

function init3() {
   		
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ���� 
	
}   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
function setDefault2() { 

    GridObj2.nHDLineSize         = 12; //Header Size
    GridObj2.strHDClickAction    = "sortsingle";
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 12; //Header Size
    GridObj3.strHDClickAction    = "sortsingle";
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	GridObj.AddHeader("INBOUND_DATE"	,"����/������"       	,"t_text" 	,20		,120  ,false); //0   
 	GridObj.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj.AddHeader("ITEM_CD"			,"ǰ���ڵ�"       	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("ITEM_NM"			,"ǰ���"       		,"t_text" 	,200	,200  ,false); //0   
 	GridObj.AddHeader("IPGO"			,"����"       		,"t_number" ,20.3	,80  ,false); //0   

 	// ��ȸ������ ���Ի�ǰ�϶��� ǥ��
 	GridObj.AddHeader("BL_NO"				,"B/L"       		,"t_text" 	,100	,200  ,false); //0   

	GridObj.BoundHeader();	

	GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('INBOUND_DATE','center'); 
    GridObj.SetColCellAlign('DC_ID','center'); 
    GridObj.SetColCellAlign('ITEM_CD','center'); 
       
}
   
function setHeader2(GridObj2) {        
       
  	GridObj2.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj2.AddHeader("IPGO"			,"���"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj2.BoundHeader();	

	GridObj2.SetNumberFormat("IPGO"  , "#,##0");

    GridObj2.SetColCellAlign('DC_ID','center'); 

}
   
function setHeader3(GridObj3) {        
       
 	GridObj3.AddHeader("OUTBOUND_DATE"	,"�����"       		,"t_text" 	,20		,80  ,false); //0   
 	GridObj3.AddHeader("CUST_ID"		,"CODE"       		,"t_text" 	,20		,0  ,false); //0   
 	GridObj3.AddHeader("CUST_NAME"		,"�ŷ�ó��"       	,"t_text" 	,200	,180  ,false); //0   
 	GridObj3.AddHeader("ADDR"			,"�ּ�"       		,"t_text" 	,1000	,250  ,false); //0   
 	GridObj3.AddHeader("TEL_NO"			,"��ȭ��ȣ"       	,"t_text" 	,200	,100  ,false); //0   
 	GridObj3.AddHeader("CHGO"			,"����"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj3.BoundHeader();	

	GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    GridObj3.SetColCellAlign('OUTBOUND_DATE','center'); 
    GridObj3.SetColCellAlign('CUST_ID','center'); 
    GridObj3.SetColCellAlign('TEL_NO','center'); 

}

  
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
   }

   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var in_fr_date = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var in_item_id  = document.all.in_item_id.value;
       var in_bl_no  = document.all.in_bl_no.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", in_fr_date);
       GridObj.SetParam("in_to_date", in_to_date);
       GridObj.SetParam("in_item_id", in_item_id);
       GridObj.SetParam("in_bl_no", in_bl_no);
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  ���ι�° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_date", sel_date);
	GridObj2.SetParam("sel_dc_id", sel_dc_id);
	GridObj2.SetParam("sel_item_id", sel_item_id);
	GridObj2.SetParam("sel_bl_no", sel_bl_no);
	GridObj2.DoQuery(servlet_url);
}
   

/*������������������������������������������������������������������������
  ������° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("sel_date", sel_date);
	GridObj3.SetParam("sel_dc_id", sel_dc_id);
	GridObj3.SetParam("sel_item_id", sel_item_id);
	GridObj3.SetParam("sel_bl_no", sel_bl_no);
	GridObj3.DoQuery(servlet_url);
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  GridObj.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'IPGO');
		  GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  GridObj2.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'IPGO'); 
		  GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery3() {
	
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			GridObj3.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'CHGO'); 
			GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridChangeCell(strColumnKey, nRow,nOldValue,nNewValue) {

}	
   	
function GridCellDblClick(strColumnKey, nRow){     

		doQuery2(nRow);	
		doQuery3(nRow);
}        

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ǰ����ȸ

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

// ǰ�� POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// BL POPUP
function openBLPopup() { 	
	
		var service_url = "service.do?_moon_service=ip_07010_BL_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_fr_date=" + document.frm.in_fr_date.value;
		service_url += "&in_to_date=" + document.frm.in_to_date.value;
		service_url += "&in_item_id=" + document.frm.in_item_id.value;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=400, height=350, top=0, left=0";
		var newWin = window.open(service_url, "BL_Search", pop_win_style);
		newWin.focus();
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
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
       // document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
    }  
    