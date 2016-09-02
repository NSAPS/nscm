//## ���α׷�ID      : ip_01050_inventoryPlanAnalysis_02_list_new.js
//## ���α׷���      : ǰ�� ��� ���� �м�(�ű�)
//## ��������        : ������
//## ��������        : 2011-11-23 ȭ����
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-23  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01050_inventoryPlanAnalysis_02_list_new';

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

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	//GridObj.SetColHide("CRUD", true); 
 	GridObj.AddHeader("SALES_CAT02"	       ,"����׷�2"	    ,"t_text"      ,100	    ,75     ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"����׷�3"		,"t_text"	   ,100	    ,110     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ǰ���"	        ,"t_text" 	   ,100	    ,220    ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"�������"	    ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"����ϼ�"       ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"�����Ǹ�"	    ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"�����Ǹ�"       ,"t_number" 	   ,100.3	,55     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"�ǸŴ���"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"���Ͽ������"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT"       ,"����/���԰�ȹ"	,"t_number"    ,100.3   ,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"����/���Դ���"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1������Ǹ�"	    ,"t_number"    ,100.3	,75     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3������Ǹ�"	    ,"t_number"    ,100.3   ,75     ,false) //0
 	GridObj.AddHeader("WEEK_DEV_1_3"       ,"1/3���������"	,"t_number"    ,100.3   ,65     ,false); //0
 	GridObj.AddHeader("DEV_PER"            ,"��������"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("PRE_MONTH_SELL"     ,"��������"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SALES_PLAN"         ,"�ǸŰ�ȹ"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SALES_PLAN_SUM"     ,"�ǸŰ�ȹ����"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SAFETY_STOCK"       ,"�������"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX"          ,"�ǸŸ�ǥ"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX_RATE"     ,"�ǸŸ�ǥ�޼���"	,"t_text"      ,100.3   ,55     ,false); //0
 
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('SALES_CAT02',        'left');
    GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 
    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('SALES_CUR',         'right');
    GridObj.SetColCellAlign('SALES_SUM',         'right');
    GridObj.SetColCellAlign('STOCK_EXPT',        'right');
    GridObj.SetColCellAlign('RECEIPT_EXPT',      'right');
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');
    GridObj.SetColCellAlign('WEEK_DEV_1_3',      'right');
    GridObj.SetColCellAlign('DEV_PER',           'right');
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right');
    GridObj.SetColCellAlign('SALES_PLAN',        'right');
    GridObj.SetColCellAlign('SALES_PLAN_SUM',    'right');
    GridObj.SetColCellAlign('SAFETY_STOCK',      'right');
    GridObj.SetColCellAlign('GOALS_BOX',         'right');
    GridObj.SetColCellAlign('GOALS_BOX_RATE',    'right');
    
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",        "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        "###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", "###,###.#");
    GridObj.SetNumberFormat("WEEK_DEV_1_3",     "###,###.#");
    GridObj.SetNumberFormat("DEV_PER",          "###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetNumberFormat("SALES_PLAN",       "###,###.#");
    GridObj.SetNumberFormat("SALES_PLAN_SUM",   "###,###.#");
    GridObj.SetNumberFormat("SAFETY_STOCK",     "###,###.#");
    GridObj.SetNumberFormat("GOALS_BOX",        "###,###.#");
	
	//GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);

}
	// �÷� ����

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
//              GridObj.SetGroupMerge('SALES_CAT02,SALES_CAT03');
//      	  	GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'BASE_STOCK,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,RECEIPT_EXPT,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,PRE_MONTH_SELL,SALES_PLAN,SALES_PLAN_SUM,SAFETY_STOCK,GOALS_BOX');
//              GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);

                GridObj.AddSummaryBar('SUMMARY1', '��ü�հ�', 'summaryall', 'sum', 'BASE_STOCK,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,RECEIPT_EXPT,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,PRE_MONTH_SELL,SALES_PLAN,SALES_PLAN_SUM,SAFETY_STOCK,GOALS_BOX');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 
                     
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
 
   
// ������ ����
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	GridObj.DoQuery(servlet_url, "CRUD");
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	// user_id
	
//	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

}

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
        start_date = start_date.replace(/-/g,"");
        end_date = end_date.replace(/-/g,"");
      // alert(end_date);
     //  return;

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var in_act_type	    = document.all.in_act_type.value;   
       var search_item	    = document.all.search_item.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("in_act_type", in_act_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.DoQuery(servlet_url);       
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
