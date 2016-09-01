//## ���α׷�ID      : ip_07070_EDI_Order_Analysis_list.js
//## ���α׷���      : EDI������ȯ�м���ȸ
//## ��������        : ������
//## ��������        : 2014-02-14
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_07070_EDI_Order_Analysis_list';

var GridObj ; 
var GridObj2;													// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';

var sum_gubn = '�Ұ�����';  // or '�Ұ����'

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
            tableHeightValue += Number(search_h);   
        } 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
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

	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2();  			// �߰� property ����
	setHeader2();   			// Header ����
			
}  
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nCellFontSize = 9;					// Font Size 9
	GridObj.bHDFontBold = true;
	//GridObj.bHDFontULine=true;				// ��� ����
       
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj2.bHDMoving = false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj2.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj2.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '���� ���';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ����
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid �� ����
    GridObj2.nRowHeight    = 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
 
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

 	GridObj.AddHeader("CNFM_DATE"	    ,"�� ��"	    ,"t_text"      ,100	    ,60     ,false); //0
	GridObj.AddHeader("PROD_CODE"	    ,"ǰ���ڵ�"	,"t_text"	   ,100	    ,60     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	    ,"ǰ���"		,"t_text" 	   ,100	    ,150     ,false); //0   
 	GridObj.AddHeader("GUBN"	       	,"����"	    ,"t_text" 	   ,100	    ,50    ,false); //0
 	GridObj.AddHeader("EDI32"	       	,"�̸�Ʈ"	    ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI21"	       	,"Ȩ\n�÷���"   ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI23"	       	,"�Ե�\n��Ʈ"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI03"	       	,"�ް�\n��Ʈ"   ,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI20"	       	,"GS\nCVS"	,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI26"	       	,"�Ե�\n����"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI33"     	   	,"�Ե�\n����"	,"t_number"    ,100.3	,50     ,false); //0 //�߰� : 2012-04-19//
 	GridObj.AddHeader("EDI27"       	,"�ٷ�\n�ڻ�"	,"t_number"    ,100.3   ,50     ,false); //0
 	GridObj.AddHeader("EDI29"   		,"����\n����"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI_TOT"   		,"��"		,"t_number"    ,100.3	,60     ,false); //0
 	
 
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

//	GridObj.SetColFix('ITEM_NAME'); 

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 
    GridObj.SetColCellAlign('EDI32',		'right');
    GridObj.SetColCellAlign('EDI21',		'right'); 
    GridObj.SetColCellAlign('EDI23',		'right');
    GridObj.SetColCellAlign('EDI03',		'right');
    GridObj.SetColCellAlign('EDI20',		'right');
    GridObj.SetColCellAlign('EDI26',		'right');
    GridObj.SetColCellAlign('EDI33',		'right');
    GridObj.SetColCellAlign('EDI27',		'right');
    GridObj.SetColCellAlign('EDI29',		'right');
    GridObj.SetColCellAlign('EDI_TOT',		'right');
    
    GridObj.SetNumberFormat("EDI32",       "###,###");
    GridObj.SetNumberFormat("EDI21",       "###,###");
    GridObj.SetNumberFormat("EDI23",       "###,###");
    GridObj.SetNumberFormat("EDI03",       "###,###");
    GridObj.SetNumberFormat("EDI20",       "###,###");
    GridObj.SetNumberFormat("EDI26",       "###,###");
    GridObj.SetNumberFormat("EDI33",       "###,###");
    GridObj.SetNumberFormat("EDI27",       "###,###");
    GridObj.SetNumberFormat("EDI29",       "###,###");
    GridObj.SetNumberFormat("EDI_TOT",       "###,###");
	
}

function setHeader2() 
{        
	GridObj2.AddHeader("CUST_NAME"			,"������"			,"t_text" 		,100	,150  ,false);   
	GridObj2.AddHeader("CUST_CODE"			,"�����ڵ�"		,"t_text" 		,100	,5  ,false);   

	GridObj2.AddHeader("ITEM_NAME"			,"ǰ���"			,"t_text" 		,100	,160  ,false);   
	GridObj2.AddHeader("PROD_CODE"			,"ǰ���ڵ�"		,"t_text" 		,100	,5  ,false);   
 	
 	GridObj2.AddHeader("ODER_BOX"			,"���ַ�"      	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("SELL_BOX"			,"��ǰ��"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("GAP"				,"�̳���"     	,"t_number" 	,100	,45  ,false);   
 
	GridObj2.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 

    GridObj2.SetColCellAlign('CUST_CODE',	'center');
    GridObj2.SetColCellAlign('CUST_NAME',	'left'); 
    GridObj2.SetColCellAlign('PROD_CODE',	'center');
    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
    GridObj2.SetColCellAlign('ODER_BOX',	'right');
    GridObj2.SetColCellAlign('SELL_BOX',	'right');
    GridObj2.SetColCellAlign('GAP',			'right');
	
	GridObj2.SetNumberFormat("ODER_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("SELL_BOX"	    , "###,###,###");
	GridObj2.SetNumberFormat("GAP"	     	, "###,###,###");
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {                           
              
            	var rowCnt = GridObj.GetRowCount();
	    		for (var i = 0 ; i < rowCnt ; i++ ){
	    			var gubn = GridObj.GetCellValue("GUBN", i);
	    			if(gubn == "�̳���") {
	    				GridObj.SetRowBgColor(i, '212|212|212');
	    			}
	    		}
              
              GridObj.SetGroupMerge('CNFM_DATE,PROD_CODE,ITEM_NAME');

            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //��ȸ
		if(GridObj2.GetStatus() == "true") { // 
			GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
			if(sum_gubn == '�Ұ�����') {
				GridObj2.AddSummaryBar('SUMMARY2', '�Ұ�', 'CUST_NAME', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
				GridObj2.SetSummaryBarColor('SUMMARY2', '0|0|0', '212|212|212'); 
			}
			GridObj2.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
			GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');			
		}
		
	}
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	��ȸ����
   	
 /*  	if(item_type == null || item_type == ""){
		//alert("��ȸ������ �����Ͻʽÿ�!");
   		//return
   	}
	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("��ȸ������ �����Ͻʽÿ�!");
		return;
	}   	
*/
	var grup_code1	    = document.all.grup_code1.value;
	
	if(grup_code1 == null || grup_code1 == "" ) {
	    GridObj.SetColHide('EDI32',		false);
	    GridObj.SetColHide('EDI21',		false); 
	    GridObj.SetColHide('EDI23',		false);
	    GridObj.SetColHide('EDI03',		false);
	    GridObj.SetColHide('EDI20',		false);
	    GridObj.SetColHide('EDI26',		false);
	    GridObj.SetColHide('EDI33',		false);
	    GridObj.SetColHide('EDI27',		false);
	    GridObj.SetColHide('EDI29',		false);
	    GridObj.SetColHide('EDI_TOT',	false);
	}
	else {
	    GridObj.SetColHide('EDI32',		true);
	    GridObj.SetColHide('EDI21',		true); 
	    GridObj.SetColHide('EDI23',		true);
	    GridObj.SetColHide('EDI03',		true);
	    GridObj.SetColHide('EDI20',		true);
	    GridObj.SetColHide('EDI26',		true);
	    GridObj.SetColHide('EDI33',		true);
	    GridObj.SetColHide('EDI27',		true);
	    GridObj.SetColHide('EDI29',		true);
	    GridObj.SetColHide('EDI_TOT',	true);

		GridObj.SetColHide('EDI'+ grup_code1,	false);	    
	}

	GridObj2.ClearGrid();
	setHeader2();
	sum_gubn = '�Ұ�����';
	
    doQuery();

   }

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
      // alert(end_date);
     //  return;

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var search_item	    = document.all.search_item.value;
       var grup_code1	    = document.all.grup_code1.value;
 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("grup_code1", grup_code1);

	   GridObj.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery2(grup_code1, search_item) 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj2.SetParam("mode",           "search_DW2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",       end_date);
	   GridObj2.SetParam("item_type",     item_type);
	   GridObj2.SetParam("search_type", search_type);
	   GridObj2.SetParam("search_item", search_item);
	   GridObj2.SetParam("grup_code1", grup_code1);
	   GridObj2.DoQuery(servlet_url);       
   }
	
// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){
	
	var search_item	    = GridObj.GetCellValue('PROD_CODE',nRow);
	var	grup_code1;

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') {
		grup_code1 = document.all.grup_code1.value;
	}
	else grup_code1	= strColumnKey.substring(3,6);
	
	sum_gubn = '�Ұ����';
	doQuery2(grup_code1, search_item);

}

function HeaderClick_DW1(strColumnKey){

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') return;
	
	var search_item	    = document.all.search_item.value;
	var	grup_code1		= strColumnKey.substring(3,6);

	sum_gubn = '�Ұ�����';
	doQuery2(grup_code1, search_item);
	
}

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
	document.WiseGrid2.height = tableHeightValue + "px"; 
 
}	