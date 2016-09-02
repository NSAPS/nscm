//## ���α׷�ID		: ip_08040_Expert_Order_cust.js
//## ���α׷���		: �ŷ����� �ֹ� ����
//## ������			: �̰���
//## ��������			: 2016-05-03
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_08040_Expert_Order_cust';

var GridObj ; 									// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';			//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


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
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";     //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("CNFM_DATE"	   	,"�ֹ�������"  	,"t_text"     	,100		,70     ,false); //0 
	GridObj.AddHeader("CUST_CODE"		,"�ŷ��� �ڵ�"		,"t_text" 	    ,100	    ,0     	,false); //0  
	GridObj.AddHeader("CUST_NAME"		,"�ŷ�����"  		,"t_text"     	,100		,220    ,false); //0  
 	
 	GridObj.AddHeader("ORDER_QTY"		,"�ֹ���"			,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("PLAN_QTY"		,"�ְ�\n�����ȹ��"	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("PROD_QTY"		,"���귮"			,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("EXPT_QTY"		,"���꿹����"		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOTAL_QTY"		,"�� ���޷�"		,"t_number"  	,100.3		,80    ,false); //0
 	
 	GridObj.AddHeader("WH_STOCK"		,"�۾������"	    ,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("CY_STOCK"		,"�ε����"	    ,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("BILL_QTY"		,"��������"	    ,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("ERNAM"			,"�����"  		,"t_text"     	,100		,70    ,false); //0 
 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center');
	GridObj.SetColCellAlign('ERNAM',  		'center');
	
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("PLAN_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("EXPT_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("TOTAL_QTY",       	"###,###.#");
	GridObj.SetNumberFormat("WH_STOCK",       	"###,###.#");
	GridObj.SetNumberFormat("CY_STOCK",       	"###,###.#");
	GridObj.SetNumberFormat("BILL_QTY",       	"###,###.#");
   
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
        	
        	var row = GridObj.GetRowCount();            	
        	if (row == 0) return;
        	
        	
        	GridSetMerge();       
        	
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
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
    doQuery();
}



/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
   var start_date	    = document.frm.start_date.value;
   var end_date	    	= document.frm.end_date.value; 
   var mto_gubn			= document.frm.mto_gubn.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("mto_gubn",   		mto_gubn);
   GridObj.SetParam("end_date",   		end_date);   
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {
	
	var cust_name	= GridObj.GetCellValue('CUST_NAME',nRow)
	var	cust_code	= GridObj.GetCellValue('CUST_CODE',nRow)
	var cnfm_date	= GridObj.GetCellValue('CNFM_DATE',nRow)
	var mto_gubn	= document.frm.mto_gubn.value;
	
	if(strColumnKey == 'CUST_NAME'){		
		
		var service_url = "service.do?_moon_service=ip_08040_Expert_Order_cust_pop";
		service_url += "&cust_code=" + cust_code + "&cust_name=" + cust_name + "&cnfm_date=" + cnfm_date + "&mto_gubn=" + mto_gubn ;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=440, top=50, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}

}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('CNFM_DATE');
    GridObj.AddSummaryBar('SUMMARY1', '���ں� ��', 'CNFM_DATE', 'sum', 'ORDER_QTY,PLAN_QTY,PROD_QTY,EXPT_QTY,TOTAL_QTY,WH_STOCK,CY_STOCK,BILL_QTY');
    GridObj.AddSummaryBar('SUMMARY2', '��ü ��'	, 'summaryall', 'sum', 'ORDER_QTY,PLAN_QTY,PROD_QTY,EXPT_QTY,TOTAL_QTY,WH_STOCK,CY_STOCK,BILL_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


