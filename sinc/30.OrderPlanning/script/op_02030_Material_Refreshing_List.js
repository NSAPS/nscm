//## ���α׷�ID      : op_02030_Material_Refreshing_List.js
//## ���α׷���      : ��ǰ�� ������Ȳ ��ȸ (�ű�)
//## ��������        : ������
//## ��������        : 2013-01-24 ȭ����
//##
//## ���� job file   : job_sinc_30_orderPlanning_03.xml
//## ���� query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2013-01-24  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id 				= 'op_02030_Material_Refreshing_List';

var GridObj ; 													// WiseGrid ��ü
var GridObj2 ;

var color_tot			= '234|234|234';	//�հ� ���� ����
var color_edit_col		= '255|253|208';


var color_sp			= '230|222|230'; 	//�÷� ���м� ����
var color_select_row	= '255|253|208';	//���� ���� ���� 



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
	setHeader(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
}   


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize				= 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines				= 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor	= '0|0|0';
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction		='page';

	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
       
}
       
function setDefault2() { 

	GridObj2.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines				= 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj2.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj2.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj2.strMouseWheelAction	='page';

	// Cell Font Setting
	GridObj2.nCellFontSize			= 9;					// Font Size 9
       
}       
       
       
       
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

    var item_id 	= document.frm.item_id.value;
    var item_name	= document.frm.item_name.value;

 		GridObj.AddHeader("GUBN"			,"�ܵ�"   			,"t_text" 		,2			,30  	,false); //0
 		GridObj.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj.AddHeader("CONS_ITEM_ID"	,"�����ڵ�"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj.AddHeader("CONS_ITEM_NAME"	,"�����"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj.AddHeader("MEINS"			,"����"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj.AddHeader("REQ_QTY"	    	,"õ\n�ҿ䷮"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj.AddHeader("TOT"	    		,"���\n����"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("CONV_QTY"	    ,"�ڽ�\nȯ��"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("PEINH"	    	,"����\n����"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj.AddHeader("NETPR"	    	,"�ܰ�"	       	    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("WAERS"	    	,"��ȭŰ"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj.AddHeader("PAY"				,"�ݾ�"				,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("QTY1"	    	,"�Ⱦ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY2"	    	,"�ȼ�"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY3"	    	,"�ȼ�(����)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY4"	    	,"�ƻ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY5"	    	,"����"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY6"	    	,"�λ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY7"	    	,"���"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("COM_STOCK"	    ,"�迭��\n���"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("PROD_CUST_NAME"	,"���޾�ü"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* ���� �ش� �߰� */
		GridObj.AddGroup("HD1",      		"���庰 ���");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD1", 	 "QTY1");
		GridObj.AppendHeader("HD1",      "QTY2");
		GridObj.AppendHeader("HD1",      "QTY3");
		GridObj.AppendHeader("HD1", 	 "QTY4");	
		GridObj.AppendHeader("HD1", 	 "QTY5");
		GridObj.AppendHeader("HD1",      "QTY6");
		GridObj.AppendHeader("HD1",      "QTY7");		
		
		/* ������ ���� ���� �� */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColFix('CONS_ITEM_NAME');
		
		GridObj.SetColCellAlign('GUBN',					'center');
		GridObj.SetColCellAlign('CONS_ITEM_ID',			'left');
		GridObj.SetColCellAlign('CONS_ITEM_NAME',		'left');		
		GridObj.SetColCellAlign('MEINS',				'center');
		GridObj.SetColCellAlign('REQ_QTY',				'right'); 
		GridObj.SetColCellAlign('TOT',					'right');
		GridObj.SetColCellAlign('CONV_QTY',				'right');		
		GridObj.SetColCellAlign('WAERS',				'center');
		GridObj.SetColCellAlign('PEINH',				'right');
		GridObj.SetColCellAlign('NETPR',				'right');
		GridObj.SetColCellAlign('PAY',					'right');		
		GridObj.SetColCellAlign('QTY1',					'right');
		GridObj.SetColCellAlign('QTY2',					'right');
		GridObj.SetColCellAlign('QTY3',					'right');
		GridObj.SetColCellAlign('QTY4',					'right');
		GridObj.SetColCellAlign('QTY5',					'right');
		GridObj.SetColCellAlign('QTY6',					'right');
		GridObj.SetColCellAlign('QTY7',					'right');		
		GridObj.SetColCellAlign('COM_STOCK',			'right');		
		GridObj.SetColCellAlign('PROD_CUST_NAME',		'left');				 
		  
		GridObj.SetNumberFormat("REQ_QTY",      "###,###.###");
		GridObj.SetNumberFormat("TOT",      	"###,###.###");
		GridObj.SetNumberFormat("CONV_QTY",    	"###,###.###");		
		GridObj.SetNumberFormat("PEINH",      	    "###,###");
		GridObj.SetNumberFormat("NETPR",      	    "###,###");
		GridObj.SetNumberFormat("PAY",    		"###,###.###");		
		GridObj.SetNumberFormat("QTY1",      	"###,###.###");
		GridObj.SetNumberFormat("QTY2",      	"###,###.###");
		GridObj.SetNumberFormat("QTY3",      	"###,###.###");
		GridObj.SetNumberFormat("QTY4",      	"###,###.###");
		GridObj.SetNumberFormat("QTY5",      	"###,###.###");
		GridObj.SetNumberFormat("QTY6",      	"###,###.###");
		GridObj.SetNumberFormat("QTY7",      	"###,###.###");		    
		GridObj.SetNumberFormat("COM_STOCK",	"###,###.###");	
		
}
		
	
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader2(GridObj2) {        

	var item_id 	= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

		GridObj2.AddHeader("GUBN"			,"�ܵ�"   			,"t_text" 		,2			,30  	,false); //0
		GridObj2.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj2.AddHeader("CONS_ITEM_ID"	,"�����ڵ�"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj2.AddHeader("CONS_ITEM_NAME"	,"�����"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj2.AddHeader("MEINS"			,"����"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj2.AddHeader("REQ_QTY"	    ,"õ�ҿ䷮"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj2.AddHeader("TOT"	    	,"������"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("CONV_QTY"	    ,"�ڽ�ȯ��"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj2.AddHeader("PEINH"	    	,"����\n����"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj2.AddHeader("NETPR"	    	,"�ܰ�"	       	    ,"t_number"	   ,100.3		,55     ,false); //0
		GridObj2.AddHeader("WAERS"	    	,"��ȭŰ"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj2.AddHeader("PAY"			,"�ݾ�"				,"t_number"	   ,100.3		,85     ,false); //0				
		GridObj2.AddHeader("QTY1"	    	,"�Ⱦ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY2"	    	,"�ȼ�"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY3"	    	,"�ȼ�(����)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY4"	    	,"�ƻ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY5"	    	,"����"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY6"	    	,"�λ�"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY7"	    	,"���"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("COM_STOCK"	    ,"�迭��\n���"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("PROD_CUST_NAME"	,"���޾�ü"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* ������ ���� ���� �� */
		
		GridObj2.BoundHeader();	
		
		GridObj2.SetColFix('CONS_ITEM_NAME');
		
		GridObj2.SetColCellAlign('GUBN',			  'center');
		GridObj2.SetColCellAlign('CONS_ITEM_ID',		'left');
		GridObj2.SetColCellAlign('CONS_ITEM_NAME',	    'left');
		GridObj2.SetColCellAlign('MEINS',			  'center');
		GridObj2.SetColCellAlign('REQ_QTY',			   'right'); 
		GridObj2.SetColCellAlign('TOT',			       'right');
		GridObj2.SetColCellAlign('CONV_QTY',		   'right');
		GridObj2.SetColCellAlign('WAERS',			  'center');
		GridObj2.SetColCellAlign('PEINH',			   'right');
		GridObj2.SetColCellAlign('NETPR',       	   'right');
		GridObj2.SetColCellAlign('PAY',        		   'right');		
		GridObj2.SetColCellAlign('QTY1',        	   'right');
		GridObj2.SetColCellAlign('QTY2',        	   'right');
		GridObj2.SetColCellAlign('QTY3',        	   'right');
		GridObj2.SetColCellAlign('QTY4',        	   'right');
		GridObj2.SetColCellAlign('QTY5',        	   'right');
		GridObj2.SetColCellAlign('QTY6',        	   'right');
		GridObj2.SetColCellAlign('QTY7',        	   'right');
		GridObj2.SetColCellAlign('PROD_CUST_NAME',	    'left');		
		GridObj2.SetColCellAlign('COM_STOCK',          'right');
		  
		
		GridObj2.SetNumberFormat("REQ_QTY",				"###,###.###");
		GridObj2.SetNumberFormat("TOT",					"###,###.###");
		GridObj2.SetNumberFormat("CONV_QTY",			"###,###.###");		
		GridObj2.SetNumberFormat("PEINH",					"###,###");
		GridObj2.SetNumberFormat("NETPR",					"###,###");
		GridObj2.SetNumberFormat("PAY",				"###,###,###.###");		
		GridObj2.SetNumberFormat("QTY1",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY2",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY3",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY4",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY5",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY6",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY7",			"###,###,###.###");		    
		GridObj2.SetNumberFormat("COM_STOCK",		"###,###,###.###");
}
	

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
	
	var mode		= GridObj.GetParam("mode");
	var error_msg	= '';
	
	
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
					
					for(var i=0;i<GridObj.GetRowCount();i++) {
								
								GridObj.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj.SetCellBgColor('CONS_ITEM_NAME',    i, '255|253|208');
								GridObj.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj.SetCellBgColor('TOT', 				i, '255|253|208');								
								GridObj.SetCellBgColor('CONV_QTY', 			i, '255|253|208');								
								GridObj.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj.SetCellBgColor('PAY', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY1', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY2', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY3', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY4', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY5', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY6', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY7', 				i, '255|253|208');								
								GridObj.SetCellBgColor('COM_STOCK',    		i, '255|253|208');
								GridObj.SetCellBgColor('PROD_CUST_NAME',    i, '255|253|208');
								
					}

                GridObj.AddSummaryBar('SUMMARY1', '��ü�հ�', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 
					
		} else { 
					error_msg = GridObj.GetMessage(); 
					alert(error_msg);            
			   }
	
	}
}

function GridEndQuery2() {
	
	var mode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {

					for(var i=0;i<GridObj2.GetRowCount();i++) {

								GridObj2.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj2.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj2.SetCellBgColor('CONS_ITEM_NAME',   i, '255|253|208');
								GridObj2.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj2.SetCellBgColor('TOT', 				i, '255|253|208');
								GridObj2.SetCellBgColor('CONV_QTY', 		i, '255|253|208');									
								GridObj2.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj2.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj2.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('PAY', 				i, '255|253|208');
								GridObj2.SetCellBgColor('QTY1', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY2', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY3', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY4', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY5', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY6', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY7', 			i, '255|253|208');
								GridObj2.SetCellBgColor('COM_STOCK',    	i, '255|253|208');
								GridObj2.SetCellBgColor('PROD_CUST_NAME',   i, '255|253|208');
								
					}

			                GridObj2.AddSummaryBar('SUMMARY2', '��ü�հ�', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
			         	    GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
 
		} else { 
					error_msg = GridObj2.GetMessage(); 
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
  function GoSearch(service){
    
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();	
	setHeader(GridObj);    
	
	GridObj2.ClearGrid();	
	setHeader(GridObj2)
	
	doQuery();
	
	
    
}
/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
 
   

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
		GridObj.SetParam("mode",			 "search");
		GridObj.SetParam("item_id",        item_id);
		GridObj.SetParam("item_name",	item_name);
		
       
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2(cons_item_id) 
   {
	
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj2.SetParam("mode",				 "search2");
	   GridObj2.SetParam("item_id",      		   item_id);
	   GridObj2.SetParam("item_name",  			 item_name);
	   GridObj2.SetParam("cons_item_id",      cons_item_id);
	   GridObj2.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )

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


function excelUpload(){
	
	var service_url = "service.do?_moon_service=op_02030_Material_Refreshing_List_excel_reg_pop";  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=450, top=200, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}

function GridChangeCell(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

function GridCellClick(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}


function Dtl_Search(){ //	����ȸ
	
	var cons_item_id="";
	var check_cnt = 0;
	
	for(var i=0;i<GridObj.GetRowCount();i++ ) {
		var chk_idx = GridObj.GetCellValue("SELECTED", i);
	
		if(chk_idx=="1"){
			check_cnt ++;
			if(check_cnt == 1){  // ���ʷ� ���õ� �ο츦 ������ ��
				cons_item_id		= GridObj.GetCellvalue('CONS_ITEM_ID',    	i);
			}
			else {
				cons_item_id	+=	','+GridObj.GetCellvalue('CONS_ITEM_ID',    i);
			}
					
		}else{
			
		}
	}
doQuery2(cons_item_id);					

}

					
// �÷� ��� & Ȯ��
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('QTY1')== 40){// true => ���� ����
		obj.value = "���";
		// ���� ��� ����
		
		GridObj.SetColWidth("QTY1", 		70);
		GridObj.SetColWidth("QTY2", 		70);		
		GridObj.SetColWidth("QTY3", 		70);
		GridObj.SetColWidth("QTY4", 		70);
		GridObj.SetColWidth("QTY5", 		70);		
		GridObj.SetColWidth("QTY6", 		70);
		GridObj.SetColWidth("QTY7", 		70);
		GridObj.SetColWidth("COM_STOCK",	70);
		
		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();

	}
	else{
		obj.value = "Ȯ��";
		//������
		
		GridObj.SetColWidth("QTY1", 		40);
		GridObj.SetColWidth("QTY2", 		40);		
		GridObj.SetColWidth("QTY3", 		40);
		GridObj.SetColWidth("QTY4", 		40);
		GridObj.SetColWidth("QTY5", 		40);		
		GridObj.SetColWidth("QTY6", 		40);
		GridObj.SetColWidth("QTY7", 		40);
		GridObj.SetColWidth("COM_STOCK",	40);
		
	}

	if(GridObj2.GetColWidth('QTY1')== 40){// true => ���� ����
		obj.value = "���";
		// ���� ��� ����
		
		GridObj2.SetColWidth("QTY1",		70);
		GridObj2.SetColWidth("QTY2",		70);		
		GridObj2.SetColWidth("QTY3",		70);
		GridObj2.SetColWidth("QTY4",		70);
		GridObj2.SetColWidth("QTY5",		70);		
		GridObj2.SetColWidth("QTY6",		70);
		GridObj2.SetColWidth("QTY7",		70);
		GridObj2.SetColWidth("COM_STOCK",	70);
		
		GridObj2.ClearSummaryBar();
		GridObj2.ClearGroupMerge();
		
	}
	else{
		obj.value = "Ȯ��";
		//������
		
		GridObj2.SetColWidth("QTY1", 		40);
		GridObj2.SetColWidth("QTY2", 		40);		
		GridObj2.SetColWidth("QTY3", 		40);
		GridObj2.SetColWidth("QTY4", 		40);
		GridObj2.SetColWidth("QTY5", 		40);		
		GridObj2.SetColWidth("QTY6", 		40);
		GridObj2.SetColWidth("QTY7", 		40);
		GridObj2.SetColWidth("COM_STOCK",	40);
	}


}
					
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid; 
       GridObj.ExcelExport("", "", true, true);
   }					
					
