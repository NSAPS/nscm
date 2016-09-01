//## ���α׷�ID		: md_10020_fert_and_halb_bom_list.js
//## ���α׷���		: ��ǰ/����ǰ BOM ��ȸȭ��(�ű�) 
//## ������			:������
//## ��������			: 2013-10-24 ������
//##
//## ���� job file   : job_sinc_70_masterData.xml.xml
//## ���� query file : query_sinc_70_masterData.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2013-10-24  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'md_10020_fert_and_halb_bom_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����



/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
}     
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 1;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
   
         
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex   = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize         = 18; //Header Size

    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 1;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
 

}

//}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("PLANT_ID"		,"�����ڵ�"		,"t_text"	    ,20			,80    ,false); //0   
 	GridObj.AddHeader("PLANT_NAME"	    ,"�����"			,"t_text" 	    ,100		,80    ,false); //0   
 	GridObj.AddHeader("PROD_VER"		,"�������"		,"t_text" 	    ,100		,80    ,false); //0   
 	GridObj.AddHeader("UOM"				,"����"			,"t_text" 	    ,100		,60    ,false); //0
 	GridObj.AddHeader("QTY"		    	,"����"	        ,"t_number" 	,100.3		,80    ,false); //0
 	GridObj.AddHeader("RECIPE_TYPE"		,"�����ڵ�"		,"t_text" 		,100		,100    ,false); //0
 	GridObj.AddHeader("RECIPE_NAME"		,"������"			,"t_text"	    ,100		,140    ,false); //0

	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_ID',			'center');
    GridObj.SetColCellAlign('PLANT_NAME',		'center'); 
    GridObj.SetColCellAlign('PROD_VER',			'center');
    GridObj.SetColCellAlign('UOM',				'center');
    GridObj.SetColCellAlign('QTY',				'right');
    GridObj.SetColCellAlign('RECIPE_TYPE',		'center'); 
    GridObj.SetColCellAlign('RECIPE_NAME',		'center');
    
    GridObj.SetNumberFormat("QTY", "###,###.#0");


}

function setHeader2(GridObj2) { // ��������

  	GridObj2.AddHeader("CONS_ITEM_SEQ"		,"�׸��ȣ"		,"t_text"   	,100		,80    ,false); //0 
  	GridObj2.AddHeader("CONS_ITEM_ID"		,"�������"		,"t_text" 	 	,100		,100    ,false); //0  
  	GridObj2.AddHeader("ITEM_NAME"			,"������Ҹ�"		,"t_text" 		,100		,140    ,false); //0   
  	GridObj2.AddHeader("CONS_ITEM_TYPE"		,"������� Ÿ��"	,"t_text" 		,100		,90    ,false); //0
  	GridObj2.AddHeader("UOM"				,"����"			,"t_text" 		,100		,70    ,false); //0   
  	GridObj2.AddHeader("QTY"				,"����"			,"t_number" 	,100.3		,100    ,false); //0

	    
	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('CONS_ITEM_SEQ',		'center'); 
    GridObj2.SetColCellAlign('CONS_ITEM_ID',		  'left');
    GridObj2.SetColCellAlign('ITEM_NAME',			'center');
    GridObj2.SetColCellAlign('CONS_ITEM_TYPE',		'center');
    GridObj2.SetColCellAlign('UOM',					'center');
    GridObj2.SetColCellAlign('QTY',					 'right');
   
    GridObj2.SetNumberFormat("QTY", 	"###,###.#0");

}
	// �÷� ����

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';

    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {            
		  	
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			
		  	
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {
}	
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
    doQuery();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     
	
	var mode 			= GridObj.GetParam("mode");
	var prod_ver		= GridObj.GetCellValue("PROD_VER",			nRow); 
	var plant_id		= GridObj.GetCellValue("PLANT_ID",			nRow); 
	var item_id	    	= document.all.item_id.value;
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;   
		
		GridObj2.SetParam("mode", "search2");
		GridObj2.SetParam("item_id",					item_id);
		GridObj2.SetParam("prod_ver",				prod_ver);
		GridObj2.SetParam("plant_id",				plant_id);
		
		GridObj2.DoQuery(servlet_url); 
		
		

			
}        
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
		var item_id	    = document.all.item_id.value;
	    var item_name	= document.all.item_name.value;
		var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       
       GridObj.SetParam("item_id",					item_id);
       GridObj.SetParam("item_name",				item_name);
	   GridObj.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() { //��������

	var item_id		= document.all.item_id.value;
	var prod_ver	= GridObj.GetCellValue("PROD_VER",			nRow); 
	var plant_id	= GridObj.GetCellValue("PLANT_ID",			nRow); 
    
	var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id",				item_id);
    GridObj2.SetParam("prod_ver",				prod_ver);
    GridObj2.SetParam("plant_id",				plant_id);

}
// �� ���� ��������
var objTdG;


// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;
}

/*function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ǰ����ȸ

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
	//commonUtil.getCodeInfo(in_sel_name, in_sel_value, "search_item_id_and_item_name_by_item_input", {
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
		
}*/


// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
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
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/


//