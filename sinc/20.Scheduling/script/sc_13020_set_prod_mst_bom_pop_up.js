//## ���α׷�ID		:	sc_13020_set_prod_mst_bom_pop_up.js
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
var job_id = 'sc_13020_set_prod_mst_bom_pop_up';
var GridObj ; 													// WiseGrid ��ü
var GridObj2 ; 													// WiseGrid ��ü
var GridObj3 ; 													// WiseGrid ��ü

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
 
}
     
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,60  ,false);
 	GridObj.AddHeader("SEQ"				,"SEQ"       		,"t_text" 	,400	,50  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_ID"	,"�����ȣ"       	,"t_text" 	,400	,80  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"�����"       		,"t_text" 	,400		,180 ,false); //0   
 	GridObj.AddHeader("CONS_QTY_UOM"	,"����"     		  	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("CONS_QTY"		,"����"     			,"t_number" ,20.3	,80  ,true); //0   
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	GridObj.SetNumberFormat("CONS_QTY"  , "#,##0.###");  
	

	//Hidden �÷�  
	GridObj.SetColHide("CRUD",true);
	
	
	doQuery();	
	
	

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
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;

	//alert(item_id);

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	   
	GridObj.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;
	var wo_id		=document.frm.wo_id.value;

	//alert(item_id);

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search2");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
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
		    	GridObj.SetCellBgColor('CONS_QTY', i, '255|255|0'); 
	        }
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	//GridObj.SetCellBgColor('QTY', 2, color_edit_col);
	

	
}




function GridCellClick(strColumnKey, nRow){

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	
}



function getBom(){

	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	//if(event.keyCode == "13" || event.keyCode == "9") {
		doQuery();		
	//}else{
		
	//}
}
