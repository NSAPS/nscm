//## ���α׷�ID      : ip_01110_Baeksansu_Stock_Trace.js
//## ���α׷���      : ���� ������� ��ȸ
//## ��������        : �̰���
//## ��������        : 2015-01-07 
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-07	�̰���		�ű�
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01110_Baeksansu_Stock_Trace';

var GridObj ; 													// WiseGrid ��ü
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
	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);  	
	//GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	
		GridObj.AddHeader("CNFM_DATE"	,"����"		   ,"t_text" 	   ,100	    ,65     ,false); //0
		GridObj.AddHeader("GUBN"		,"����"		   ,"t_text" 	   ,100	    ,0      ,false); //0
		GridObj.AddHeader("ITEM_ID"  	,"ǰ���ڵ�"	   ,"t_text"       ,100		,70     ,false); //0
		GridObj.AddHeader("ITEM_NAME"   ,"ǰ���"	   ,"t_text"       ,100		,140    ,false); //0
		
		//�̵�����(����) �����׷�
		GridObj.AddHeader("STOCK_00"	,"�������"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_00"     ,"���귮"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_IN" 	,"�������" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_00" 	,"������" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		//��� �����׷�
		GridObj.AddHeader("STOCK_01"	,"�������"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_01"     ,"�԰�"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_01" 	,"���"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//���úε�
		GridObj.AddHeader("STOCK_02"	,"�������"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_02"     ,"�԰�"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_02" 	,"���"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//�λ�ε�
		GridObj.AddHeader("STOCK_03"	,"�������"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_03"     ,"�԰�"	   ,"t_number"     ,100.3   ,65    ,false); //0
		GridObj.AddHeader("ISSUE_03" 	,"���"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//���
		GridObj.AddHeader("STOCK_04"	,"�������"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_04"     ,"�԰�"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_04" 	,"�Ǹŷ�"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//�հ�
		GridObj.AddHeader("STOCK_05"	,"�������"	   ,"t_number"	   ,100.3	,0     ,false); //0
		GridObj.AddHeader("PROD_05"     ,"�԰�"	   ,"t_number"     ,100.3   ,0     ,false); //0
		GridObj.AddHeader("ISSUE_05" 	,"�԰�"	   ,"t_number"     ,100.3   ,0     ,false); //0
		
		
		
			/* ���� �ش� �߰� */
		GridObj.AddGroup	("HD0",     "�̵�����(����)");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD0", 	"STOCK_00");
		GridObj.AppendHeader("HD0",     "PROD_00");
		GridObj.AppendHeader("HD0",     "ISSUE_IN");
		GridObj.AppendHeader("HD0",     "ISSUE_00");		
		
		GridObj.AddGroup	("HD1",     "���");			
		GridObj.AppendHeader("HD1", 	"STOCK_01");
		GridObj.AppendHeader("HD1",     "PROD_01");
		GridObj.AppendHeader("HD1",     "ISSUE_01");
		
		GridObj.AddGroup	("HD2",     "����");			
		GridObj.AppendHeader("HD2", 	"STOCK_02");
		GridObj.AppendHeader("HD2",     "PROD_02");
		GridObj.AppendHeader("HD2",     "ISSUE_02");
		
		GridObj.AddGroup	("HD3",     "�λ�");			
		GridObj.AppendHeader("HD3", 	"STOCK_03");
		GridObj.AppendHeader("HD3",     "PROD_03");
		GridObj.AppendHeader("HD3",     "ISSUE_03");
		
		GridObj.AddGroup	("HD4",     "���");			
		GridObj.AppendHeader("HD4", 	"STOCK_04");
		GridObj.AppendHeader("HD4",     "PROD_04");
		GridObj.AppendHeader("HD4",     "ISSUE_04");
		
		GridObj.AddGroup	("HD5",     "�հ�");			
		GridObj.AppendHeader("HD5", 	"STOCK_05");
		GridObj.AppendHeader("HD5",     "PROD_05");
		GridObj.AppendHeader("HD5",     "ISSUE_05");
	
		GridObj.BoundHeader();	
		
		GridObj.SetColCellAlign('CNFM_DATE',     'center');
		GridObj.SetColCellAlign('GUBN',     	 'center');
		GridObj.SetColCellAlign('ITEM_ID',    	 'left');
		GridObj.SetColCellAlign('ITEM_NAME',     'left');
		
		GridObj.SetColCellAlign('STOCK_00',     'right');
		GridObj.SetColCellAlign('PROD_00',      'right');
		GridObj.SetColCellAlign('ISSUE_IN',     'right');
		GridObj.SetColCellAlign('ISSUE_00',     'right');
		GridObj.SetColCellAlign('STOCK_01',     'right');
		GridObj.SetColCellAlign('PROD_01',      'right');
		GridObj.SetColCellAlign('ISSUE_01',     'right');
		GridObj.SetColCellAlign('STOCK_02',     'right');
		GridObj.SetColCellAlign('PROD_02',      'right');
		GridObj.SetColCellAlign('ISSUE_02',     'right');
		GridObj.SetColCellAlign('STOCK_03',     'right');
		GridObj.SetColCellAlign('PROD_03',      'right');
		GridObj.SetColCellAlign('ISSUE_03',     'right');
		GridObj.SetColCellAlign('STOCK_04',     'right');
		GridObj.SetColCellAlign('PROD_04',      'right');
		GridObj.SetColCellAlign('ISSUE_04',     'right');
		GridObj.SetColCellAlign('STOCK_05',     'right');
		GridObj.SetColCellAlign('PROD_05',      'right');
		GridObj.SetColCellAlign('ISSUE_05',     'right');
		
		GridObj.SetNumberFormat("STOCK_00",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_00",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_IN",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_00",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_01",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_01",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_01",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_02",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_02",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_02",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_03",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_03",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_03",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_04",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_04",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_04",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_05",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_05",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_05",    	"###,###.#");
		
}
/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
	
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

	 if(mode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {    
            	    
            GridObj.SetGroupMerge('CNFM_DATE'); 
            //GridObj.AddSummaryBar('SUMMARY', '�Ұ�', 'CNFM_DATE', 'sum', 'STOCK_00,PROD_00,ISSUE_IN,ISSUE_00,STOCK_01,PROD_01,ISSUE_01');     
    		GridObj.AddSummaryBar('SUMMARY_ALL', '�հ�', 'summaryall', 'sum', 'PROD_00,ISSUE_IN,ISSUE_00,PROD_01,ISSUE_01,PROD_02,ISSUE_02,'+
    		'PROD_03,ISSUE_03,PROD_04,ISSUE_04,PROD_05,ISSUE_05');
    		//GridObj.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
         	GridObj.SetSummaryBarColor('SUMMARY_ALL','0|153|0', color_tot); 
         	
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
  function GoSearch(service){
  	
//    var insel_prty	    = document.all.insel_prty.value;
//    var in_item_id	    = document.all.in_item_id.value;
//    var in_item_name	= document.all.in_item_name.value;
//    var sel_gubn 	    = document.frm.sel_gubn.value;
    
//	GridObj = document.WiseGrid;
//	GridObj.ClearGrid();
//	setHeader(GridObj);    
	
    doQuery();
}
/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
 
   
// ������ ����
function GoSave  (service) {

//   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//    
//	GridObj.SetParam("mode", "save");
//	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id
//
//	GridObj.DoQuery(servlet_url, "CRUD");
//	GridObj.DoQuery(servlet_url, "CRUD");
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	// user_id
	
//	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

}

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {

       var start_date	    = document.all.start_date.value.replace(/-/g,"");   
       var end_date	        = document.all.end_date.value.replace(/-/g,"");  
       var search_item	    = document.all.search_item.value;
      
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",            		"search");
       GridObj.SetParam("start_date",     		start_date);
       GridObj.SetParam("end_date",      		end_date);
        GridObj.SetParam("search_item",      	search_item);

	   GridObj.DoQuery(servlet_url);       
   }


function GridCellClick(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

