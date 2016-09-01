//## ���α׷�ID		:	sc_13020_set_bom_mst_reg_pop.js
//## ���α׷���		:	�������ռ� �����м� pop_up
//## ������          :	�ǿ��� 
//## ��������       	:	2009-07-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml.xml
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
var job_id = 'sc_13060_set_bom_mst_reg_pop';
var GridObj ; 													// WiseGrid ��ü
var GridObj2 ; 													// WiseGrid ��ü

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
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


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() {

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 1; 
    GridObj.bStatusbarVisible = false;				// status bar visible ���¹� ���� 
    
 
}
   
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;

	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 	,100    ,0  ,false);
 	GridObj.AddHeader("ITEM_ID"			,"ITEM_ID"      ,"t_text" 	,400	,0  ,false); //0   
 	GridObj.AddHeader("SEQ"	,			"SEQ"       	,"t_text" 	,400	,40  ,false); //0   
 	GridObj.AddHeader("SEQ_GUBN"		,"����ǰ��"      ,"t_text" 	,400	,90  ,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"�⺻����"      ,"t_combo" 	,400	,70  ,true); //0   
 	GridObj.AddHeader("UNIT_COST"		,"�ܰ�"       	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("REQ_QTY"			,"�ҿ䷮"       	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"�ּҹ��ִ���"   	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("LEAD_TIME"		,"����Ÿ��"	    ,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("CUST_CODE"		,"�ŷ�ó�ڵ�"     ,"t_combo" 	,400	,140  ,true); //0   
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"       ,"t_combo" 	,400	,0  ,true); //0   
 	GridObj.AddHeader("SAFETY_STOCK"	,"�������"       ,"t_number"	,400.3	,70  ,true); //0   





	GridObj.BoundHeader();	


	GridObj.SetColFix('SEQ_GUBN');

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	GridObj.SetNumberFormat("UNIT_COST"  , "#,##0.###");  
	GridObj.SetNumberFormat("REQ_QTY" , "#,##0.###");  
	GridObj.SetNumberFormat("MIN_LOT_SIZE" , "#,##0.###");  
	GridObj.SetNumberFormat("SAFETY_STOCK" , "#,##0.###");  


	GridObj.SetColCellAlign('SEQ','center');
	

	//Hidden �÷�  
	GridObj.SetColHide("CRUD",true);  
	

}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;


	//alert(item_id);

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	   
	GridObj.DoQuery(servlet_url);
}



/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoReg  (service) {
	GoRegDW1(service);
	//GoRegDW2(service);
}  
  
  
function GoRegDW1  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "doReg");
	//GridObj.SetParam("item_id",		document.frm.item_id.value);
	//GridObj.SetParam("bm", 			document.frm.bm.value);
	//GridObj.SetParam("oper_type",	document.frm.oper_type.value);
	//GridObj.SetParam("oper_qty", 	document.frm.oper_qty.value);
	//GridObj.SetParam("cust_type", 	document.frm.cust_type.value);
	//GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	//GridObj.SetParam("start_date", 	document.frm.start_date.value);
	//GridObj.SetParam("end_date", 	document.frm.end_date.value);
	//GridObj.SetParam("user_id", 	document.frm._user_id.value);

	GridObj.DoQuery(servlet_url, "CRUD");
}
 


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search2") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	var row_cnt = GridObj.GetRowCount();
			var colBGColor='232|245|213';
			
			for( var i=0 ;i<row_cnt ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	        {
		    //	GridObj.SetCellBgColor('BOX_COST', i, '255|255|0'); 
//		    	GridObj.SetCellBgColor('WORK_CAPA', i, '255|255|0'); 
	        }
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "doReg"){
    	//alert("service_url="+service_url);
    	//var	idu_mode	='REG';
    	//var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_reg_pop";
    	//service_url += "&idu_mode=" + idu_mode;
		//var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("������ �Ϸ�Ǿ����ϴ�");
		window.close();  
		//var newWin = window.open(service_url, "sc_13060_set_prod_mst_reg_pop", pop_win_style);
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		//newWin.focus();
		//window.opener.document.location.reload();
		window.opener.GoSearch();
    }else{
    	window.opener.GoSearch();
    }
	//GridObj.SetCellBgColor('QTY', 2, color_edit_col);
	
	 //doQuery2();
}




/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/

function GridCellClick(strColumnKey, nRow){

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	
}



function getList(){
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		doQuery();		
	}else{
		doQuery();
	}
}

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getSelQeury("input_value", objBox.value, "get_set_prod_item_code", {    //getCodeList  getCodeInfo getSelQeury
		callback:function(arrList){
			
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
				document.frm.spec.value = arrList[0][2];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
				document.frm.spec.value = "";
			}
			else {
				return;
			}
		}
	});
	/* ��ǰ�ڵ� �Է½� �ϴ� �׸��� ��ȸ */
	getList();
}

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=sc_13010_item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
	
}

