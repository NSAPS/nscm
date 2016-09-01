//## ���α׷�ID      : ip_01150_inventoryPlanAnalysis_md_list_pop.js
//## ���α׷���      : ���Ի�ǰ ������(�˾�)
//## ��������        : �̰���
//## ��������        : 2015-06-26
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_07.xml
//## ���� query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-26  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01150_inventoryPlanAnalysis_md_list_pop';

var GridObj ; 													// WiseGrid ��ü
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

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

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
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("SALES_CAT05"	       ,"��з�"			,"t_text"	   ,100	    ,0     ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"�Һз�"			,"t_text"	   ,100	    ,0     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ǰ���"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"�԰�"	    	,"t_text"  	   ,100		,90     ,false); //0 	
 	GridObj.AddHeader("BASE_STOCK"	       ,"�������"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("PROD_TERM"  		   ,"�԰�\n����ϼ�"			,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"����ϼ�"       ,"t_number"    ,100.3	,60     ,false); //0
   	GridObj.AddHeader("SALES_PRE"	       ,"���ϰ�"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"�ϰ�"       	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_SUM"	       ,"�������"	    ,"t_number"    ,100.3	,60     	,false); //0 
 	GridObj.AddHeader("PRE_MONTH_SELL"	   ,"������"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT"	       ,"�������"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("OUT_STOCK"	       ,"����ó\n���"	,"t_number"    ,100.3	,60     ,false); //0  
   	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1�����"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3�����"		,"t_number"    ,100.3   ,70     ,false) //0 	
 	
    GridObj.AddHeader("SALES_SUM_PY"       ,"���⵿��"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_MON"    	   ,"���⵿��\n���"	,"t_number"    ,100.3   ,60     ,false); //0   
 	GridObj.AddHeader("THIS_YEAR_SUM"      ,"�ݳ⴩��"	   		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"���⴩��"		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"���⴩��\n���"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT"   	   ,"���Կ���\nM"	,"t_number"    ,100.3	,0     ,false); //0 
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"�������\n����"		,"t_number"    ,100.3	,70     ,false); //0 
 	GridObj.AddHeader("RECEIPT_EXPT_PRE"   ,"��������"		,"t_number"    ,100.3	,70     ,false); //0 
 	
 	
 	GridObj.AddHeader("STOCK_HIDDEN"  	   ,"����ϼ�����"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_HIDDEN"  	   ,"�����������"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"�������"				,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"�������\n�����"		,"t_text"    	,100	,70     ,false); //0  	
 	GridObj.AddHeader("NWGT_PER_BUOM"  	   ,"�������\n�߷�(t)"			,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("MON_IN_CUM_BUOM"    ,"�������\n�����߷�(t)"		,"t_number"     ,100.3	,80     ,false); //0 	
 	GridObj.AddHeader("YEAR_IN_CUM"  	   ,"�ݳ����\n����"					,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_IN_CUM_BUOM"   ,"�ݳ����\n�����߷�(t)"		,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("MON_SALE_CUM"  	   ,"����Ǹ�\n�����߷�(t)"		,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_SALE_CUM_BUOM" ,"�ݳ��Ǹ�\n�����߷�(t)"		,"t_number"     ,100.3	,80     ,false); //0
 
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	
	
	GridObj.SetColHide("YEAR_IN_CUM", 	true);

	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('SALES_CAT05',        'left');
	GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('OUT_STOCK',         'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 

    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('PROD_TERM',         'right'); 
    GridObj.SetColCellAlign('TERM_VAL',        	 'right');
    GridObj.SetColCellAlign('TERM_PER',          'right'); //������� �����
    GridObj.SetColCellAlign('SALES_CUR',         'right'); //����
    GridObj.SetColCellAlign('STOCK_EXPT',        'right'); //�������
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right'); //������ 
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right'); //
    GridObj.SetColCellAlign('RECEIPT_EXPT',  	 'right'); //
    GridObj.SetColCellAlign('RECEIPT_EXPT_PRE',  'right'); //

    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');

    GridObj.SetColCellAlign('SALES_SUM_PY',      'right');  //�߰� : 2014-05-02 ���⵿�� ����
    GridObj.SetColCellAlign('THIS_YEAR_SUM',     'right'); //�߰� : 2014-04-30 �⴩��
    GridObj.SetColCellAlign('LAST_YEAR_SUM',  	 'right'); //�߰� : 2014-04-30 ���⴩��
    GridObj.SetColCellAlign('SUB_PY_MON',   	 'right'); //���⵿�� ���
    GridObj.SetColCellAlign('SUB_PY_YEAR',    	 'right'); //���⴩�� ���

    GridObj.SetColCellAlign('NWGT_PER_BUOM', 	 'right');
    GridObj.SetColCellAlign('MON_IN_CUM_BUOM', 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM', 	 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM_BUOM',  'right');
    GridObj.SetColCellAlign('MON_SALE_CUM', 	 'right');
    GridObj.SetColCellAlign('YEAR_SALE_CUM_BUOM','right');
  	
    
    GridObj.SetNumberFormat("YEAR_IN_CUM_BUOM",     "###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK",       	"###,###.#"); 
    GridObj.SetNumberFormat("OUT_STOCK",       		"###,###.#");   
    GridObj.SetNumberFormat("STOCK_DAY",        	"###,###.#");    

    GridObj.SetNumberFormat("SALES_PRE",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        	"###,###.#");

    GridObj.SetNumberFormat("PROD_TERM",       		"###,###.#");
    GridObj.SetNumberFormat("TERM_VAL",       		"###,###.#");

    GridObj.SetNumberFormat("STOCK_EXPT",       	"###,###.#");
 
    GridObj.SetNumberFormat("SALES_SUM_PY",     	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_PRE", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT", 		"###,###.#");

    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", 	"###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", 	"###,###.#");

    GridObj.SetNumberFormat("PRE_MONTH_SELL",   	"###,###.#");
    GridObj.SetNumberFormat("THIS_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("LAST_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_MON",   		"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_YEAR",   		"###,###.#");
    
    GridObj.SetNumberFormat("NWGT_PER_BUOM",   		"###,##0.##");
    GridObj.SetNumberFormat("MON_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("YEAR_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("MON_SALE_CUM",   		"###,##0.##");
    GridObj.SetNumberFormat("YEAR_SALE_CUM_BUOM",   "###,##0.##");
   
    
    
	doQuery();
	
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
            	//GridSetMerge();
             
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
   	   var item_id			= document.all.item_id.value;
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
      
 		
       
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
       GridObj.SetParam("item_id",       item_id);
       	   
	   	   
	   GridObj.DoQuery(servlet_url);           
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

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

	
