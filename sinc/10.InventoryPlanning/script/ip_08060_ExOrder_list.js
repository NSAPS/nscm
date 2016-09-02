//## ���α׷�ID		: ip_08060_ExOrder_list.js
//## ���α׷���		: �ؿܿ��� �ֹ�����Ʈ
//## ������			: �̰���
//## ��������			: 2016-05-10
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
var job_id = 'ip_08060_ExOrder_list';

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
	
	GridObj.AddHeader("ROWNUM"	   	,"����"  		,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("ORDER_NO"	,"�ֹ���ȣ"		,"t_text" 	    ,100	    ,80     ,false); //0  
	GridObj.AddHeader("ORDER_USER"	,"�ֹ� �Է���"  	,"t_text"     	,100		,80     ,false); //0  
 	GridObj.AddHeader("ORDER_DAY"	,"�ֹ� �Է���"		,"t_text" 	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ORDER_TIME"	,"�ֹ� �Է½ð�"	,"t_text" 	   	,100	    ,90     ,false); //0   
 	GridObj.AddHeader("BRAND_NO"	,"��ǰ��ȣ"	    ,"t_text" 	   	,100	    ,80    ,false); //0
 	GridObj.AddHeader("BRAND_DAY"	,"��ǰ �Է���"		,"t_text"  		,100		,80    	,false); //0
 	GridObj.AddHeader("BRAND_TIME"	,"��ǰ �Է½ð�"	,"t_text"  		,100		,90    	,false); //0
 	
 	
 	GridObj.AddHeader("ORDER_QTY"	,"����"			,"t_number"  	,100.3		,70    	,false); //0
 	GridObj.AddHeader("ITEM_ID"		,"ǰ���ڵ�"		,"t_text"  		,100		,80     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	,"ǰ���"			,"t_text"  		,100		,260    ,false); //0
 	GridObj.AddHeader("CUST_CODE"	,"�ŷ��� �ڵ�"		,"t_text"  		,100		,0    	,false); //0
 	GridObj.AddHeader("CUST_NAME"	,"�ŷ���"			,"t_text"  		,100		,220    ,false); //0
 	GridObj.AddHeader("ZPLDAT"		,"�����û��"		,"t_text"  		,100		,80    	,false); //0
 	

 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('ROWNUM',  		'center'); 
	GridObj.SetColCellAlign('ORDER_NO',  		'center'); 
	GridObj.SetColCellAlign('ORDER_USER',  		'center'); 
	GridObj.SetColCellAlign('ORDER_DAY',  		'center'); 
	GridObj.SetColCellAlign('ORDER_TIME',  		'center'); 
	GridObj.SetColCellAlign('BRAND_NO',  		'center'); 
	GridObj.SetColCellAlign('BRAND_DAY',  		'center'); 
	GridObj.SetColCellAlign('BRAND_TIME',  		'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center'); 
	GridObj.SetColCellAlign('ITEM_NAME',  		'left');
	GridObj.SetColCellAlign('CUST_CODE',  		'center'); 
	GridObj.SetColCellAlign('CUST_NAME',  		'left'); 
	GridObj.SetColCellAlign('ZPLDAT',  			'center'); 
	
	
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GoSave(service) {	

	
	
};



/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;   
   var search_item		= document.frm.search_item.value;
   var order_no			= document.frm.order_no.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("end_date",   		end_date);
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("domain",   		domain);
   GridObj.SetParam("search_item",		search_item);		
   GridObj.SetParam("order_no",			order_no);
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {
	
	

}



function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ORDER_NO,ORDER_USER,ORDER_DAY,ORDER_TIME,BRAND_NO,BRAND_DAY,BRAND_TIME,CUST_CODE,CUST_NAME,ZPLDAT');
	
    GridObj.AddSummaryBar('SUMMARY1', '��ǥ�� ��', 'ORDER_NO', 'sum', 'ORDER_QTY');
    GridObj.AddSummaryBar('SUMMARY2', '��ü ��'	, 'summaryall', 'sum', 'ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


