//## ���α׷�ID      : ip_01150_inventoryPlanAnalysis_md_list.js
//## ���α׷���      : ���Ի�ǰ ������
//## ��������        : �̰���
//## ��������        : 2015-06-19
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_07.xml
//## ���� query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-19  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01150_inventoryPlanAnalysis_md_list';

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
	
	GridObj.AddHeader("ROWNUM"	   		   ,"����"  			,"t_number"    ,100.3	,40     ,false); //0
	GridObj.AddHeader("SALES_CAT05"	       ,"��з�"			,"t_text"	   ,100	    ,0      ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"�Һз�"			,"t_text"	   ,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ǰ���"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"�԰�"	    	,"t_text"  	   ,100		,90     ,false); //0
 	GridObj.AddHeader("BOM_FLAG"	       ,"BOM_FLAG"	    ,"t_text"  	   ,100		,0      ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"�������"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("PROD_TERM"  		   ,"�԰�\n����ϼ�"			,"t_number"    	,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("STOCK_DAY"	       ,"����ϼ�"       ,"t_number"    ,100.3	,60     ,false); //0 
 	GridObj.AddHeader("SALES_PRE"	       ,"���ϰ�"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"�ϰ�"       	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_SUM"	       ,"�������"	    	,"t_number"    ,100.3	,60     ,false); //0 
 	GridObj.AddHeader("PRE_MONTH_SELL"	   ,"������"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT"	       ,"�������"		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("OUT_STOCK"	       ,"����ó\n���"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1�����"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3�����"		,"t_number"    ,100.3   ,70     ,false) //0 	
 	
 	GridObj.AddHeader("SALES_SUM_PY"       ,"���⵿��"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_MON"    	   ,"���⵿��\n���"	,"t_number"    ,100.3   ,60     ,false); //0 	 	
 	
 	GridObj.AddHeader("THIS_YEAR_SUM"      ,"�ݳ⴩��"	   		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"���⴩��"		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"���⴩��\n���"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT"   	   ,"���Կ���\nM"	,"t_number"    ,100.3	,0     ,false); //0 
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"�������\n����"		,"t_number"    ,100.3	,70     ,false); //0
 	//�߰� �ݳ���Դ���,�ݳ��ǸŴ��� ,������Դ���,�����ǸŴ���
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
 
 //�߰� ������Դ���, �����ǸŴ���
 	
	/* ������ ���� ���� �� */
	
	
	GridObj.BoundHeader();	
	GridObj.SetColHDBgColor('STOCK_EXPT',  '225|255|54');
	GridObj.SetColHide("YEAR_IN_CUM", 	true);


	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('ROWNUM',        	  'center');
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
    
	//GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
	
	
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
            	
             	SetBomFlag();		//���밡��ǰ�� �ִ� ���ִ��ǰ���̸� ������ ǥ��            	 
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
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
       var sales_cat05		= document.all.sales_cat05.value;
 	   var sales_cat03		= document.all.sales_cat03.value;
	   var user_id			= document.all._user_id.value;
       
       var search_item	    = document.all.search_item.value;              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
       GridObj.SetParam("sales_cat05", sales_cat05);	   
	   GridObj.SetParam("sales_cat03", sales_cat03);	
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);	 
	   
	 
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

	function GridCellDblClick(strColumnKey, nRow){	
		
		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
		var start_date	= document.frm.start_date.value;
		var end_date	= document.frm.end_date.value;
		//alert(end_date);
		var gubn		= '01150';
				
		
		if(strColumnKey == 'STOCK_EXPT'){
		
			var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + end_date + "&gubn=" + gubn;  
			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1055, height=740, top=50, left=200";
			var newWin = window.open(service_url, "", pop_win_style);
			newWin.focus();	
			
		
		}else{
			var service_url = "service.do?_moon_service=ip_01150_inventoryPlanAnalysis_md_list_pop";
			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&end_date=" + end_date + "&start_date=" + start_date;  
			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1295, height=340, top=200, left=150";
			var newWin = window.open(service_url, "", pop_win_style);
			newWin.focus();	
			
			}	
		

	}

/*Sort ���� ���� */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_base_stock = '1';
	var flag_stock_day = '1';
	var flag_out_stock = '1';
	var flag_prod_term = '1';
	var flag_term_val = '1';
	var flag_term_per = '1';
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';
	var flag_sales_mean_1week = '1';
	var flag_sales_mean_3week = '1';
	var flag_sales_sum = '1';
	var flag_stock_expt = '1';
	var flag_pre_month_sell = '1';	
	var flag_receipt_expt_sum = '1';
	var flag_receipt_expt_pre = '1';
	var flag_receipt_expt 	  = '1';
	var flag_sales_sum_py = '1';	
	var flag_this_year_sum = '1';
	var flag_last_year_sum = '1';
	var flag_sum_py_mon = '1';
	var flag_sum_py_year = '1';	
	var flag_nwgt_per_buom ='1'
	var flag_mon_in_cum_buom = '1';
	var flag_mon_sale_cum = '1';
	var flag_year_sale_cum_buom = '1';	
	var flag_year_in_cum_buom = '1';	
	var flag_stock_day='1';
	

	function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('BASE_STOCK'		,true);
	GridObj.SetColCellSortEnable('OUT_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);

	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('STOCK_EXPT'		,true);
	GridObj.SetColCellSortEnable('PRE_MONTH_SELL'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT'		,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_PRE'	,true);
	
	GridObj.SetColCellSortEnable('SALES_MEAN_1WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_SUM_PY'		,true);
	GridObj.SetColCellSortEnable('THIS_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('LAST_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('SUB_PY_MON'		,true);
	GridObj.SetColCellSortEnable('SUB_PY_YEAR'		,true);	
	
	GridObj.SetColCellSortEnable('NWGT_PER_BUOM'		,true);
	GridObj.SetColCellSortEnable('MON_IN_CUM_BUOM'		,true);
	GridObj.SetColCellSortEnable('MON_SALE_CUM'			,true);
	GridObj.SetColCellSortEnable('YEAR_SALE_CUM_BUOM'	,true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}
	if(strColumnKey == 'BASE_STOCK') {
		
		if(flag_base_stock =='1'){
		
			GridObj.SetColCellSort('BASE_STOCK','descending');
			flag_base_stock++;
		}
		else if(flag_base_stock =='2'){
			
			GridObj.SetColCellSort('BASE_STOCK','asceding');
			
			flag_base_stock--;	
			
		}
	}
	if(strColumnKey == 'OUT_STOCK') {
		
		if(flag_out_stock =='1'){
		
			GridObj.SetColCellSort('OUT_STOCK','descending');
			flag_out_stock++;
		}
		else if(flag_out_stock =='2'){
			
			GridObj.SetColCellSort('OUT_STOCK','asceding');
			
			flag_out_stock--;	
			
		}
	}
	if(strColumnKey == 'STOCK_DAY') {
		
		if(flag_stock_day =='1'){
		
			GridObj.SetColCellSort('STOCK_DAY','descending');
			flag_stock_day++;
		}
		else if(flag_stock_day =='2'){
			
			GridObj.SetColCellSort('STOCK_DAY','asceding');
			
			flag_stock_day--;	
			
		}
	}
	if(strColumnKey == 'RECEIPT_EXPT') {
		
		if(flag_receipt_expt =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT','descending');
			flag_receipt_expt++;
		}
		else if(flag_receipt_expt =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT','asceding');
			
			flag_receipt_expt--;	
			
		}
	}
	if(strColumnKey == 'RECEIPT_EXPT_SUM') {
		
		if(flag_receipt_expt_sum =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','descending');
			flag_receipt_expt_sum++;
		}
		else if(flag_receipt_expt_sum =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','asceding');
			
			flag_receipt_expt_sum--;	
			
		}
	}
	if(strColumnKey == 'RECEIPT_EXPT_PRE') {
		
		if(flag_receipt_expt_pre =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_PRE','descending');
			flag_receipt_expt_pre++;
		}
		else if(flag_receipt_expt_pre =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_PRE','asceding');
			
			flag_receipt_expt_pre--;	
			
		}
	}
	if(strColumnKey == 'STOCK_EXPT') {
		
		if(flag_stock_expt =='1'){
		
			GridObj.SetColCellSort('STOCK_EXPT','descending');
			flag_stock_expt++;
		}
		else if(flag_stock_expt =='2'){
			
			GridObj.SetColCellSort('STOCK_EXPT','asceding');
			
			flag_stock_expt--;	
			
		}
	}
	if(strColumnKey == 'SALES_PRE') {
		
		if(flag_sales_pre =='1'){
		
			GridObj.SetColCellSort('SALES_PRE','descending');
			flag_sales_pre++;
		}
		else if(flag_sales_pre =='2'){
			
			GridObj.SetColCellSort('SALES_PRE','asceding');
			
			flag_sales_pre--;	
			
		}
	}
	if(strColumnKey == 'SALES_CUR') {
		
		if(flag_sales_cur =='1'){
		
			GridObj.SetColCellSort('SALES_CUR','descending');
			flag_sales_cur++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_CUR','asceding');
			
			flag_sales_cur--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM') {
		
		if(flag_sales_sum =='1'){
		
			GridObj.SetColCellSort('SALES_SUM','descending');
			flag_sales_sum++;
		}
		else if(flag_sales_sum =='2'){
			
			GridObj.SetColCellSort('SALES_SUM','asceding');
			
			flag_sales_sum--;	
			
		}
	}
	if(strColumnKey == 'PRE_MONTH_SELL') {
		
		if(flag_pre_month_sell =='1'){
		
			GridObj.SetColCellSort('PRE_MONTH_SELL','descending');
			flag_pre_month_sell++;
		}
		else if(flag_pre_month_sell =='2'){
			
			GridObj.SetColCellSort('PRE_MONTH_SELL','asceding');
			
			flag_pre_month_sell--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM_PY') {
		
		if(flag_sales_sum_py =='1'){
		
			GridObj.SetColCellSort('SALES_SUM_PY','descending');
			flag_sales_sum_py++;
		}
		else if(flag_sales_sum_py =='2'){
			
			GridObj.SetColCellSort('SALES_SUM_PY','asceding');
			
			flag_sales_sum_py--;	
			
		}
	}
	if(strColumnKey == 'THIS_YEAR_SUM') {
		
		if(flag_this_year_sum =='1'){
		
			GridObj.SetColCellSort('THIS_YEAR_SUM','descending');
			flag_this_year_sum++;
		}
		else if(flag_this_year_sum =='2'){
			
			GridObj.SetColCellSort('THIS_YEAR_SUM','asceding');
			
			flag_this_year_sum--;	
			
		}
	}
	if(strColumnKey == 'LAST_YEAR_SUM') {
		
		if(flag_last_year_sum =='1'){
		
			GridObj.SetColCellSort('LAST_YEAR_SUM','descending');
			flag_last_year_sum++;
		}
		else if(flag_last_year_sum =='2'){
			
			GridObj.SetColCellSort('LAST_YEAR_SUM','asceding');
			
			flag_last_year_sum--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_MON') {
		
		if(flag_sum_py_mon =='1'){
		
			GridObj.SetColCellSort('SUB_PY_MON','descending');
			flag_sum_py_mon++;
		}
		else if(flag_sum_py_mon =='2'){
			
			GridObj.SetColCellSort('SUB_PY_MON','asceding');
			
			flag_sum_py_mon--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_YEAR') {
		
		if(flag_sum_py_year =='1'){
		
			GridObj.SetColCellSort('SUB_PY_YEAR','descending');
			flag_sum_py_year++;
		}
		else if(flag_sum_py_year =='2'){
			
			GridObj.SetColCellSort('SUB_PY_YEAR','asceding');
			
			flag_sum_py_year--;	
			
		}
	}
	
	if(strColumnKey == 'SALES_MEAN_1WEEK') {
		
		if(flag_sales_mean_1week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','descending');
			flag_sales_mean_1week++;
		}
		else if(flag_sales_mean_1week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','asceding');
			
			flag_sales_mean_1week--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_3WEEK') {
		
		if(flag_sales_mean_3week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_3week++;
		}
		else if(flag_sales_mean_3week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
			flag_sales_mean_3week--;	
			
		}
	}
	
	if(strColumnKey == 'PROD_TERM') {
		
		if(flag_prod_term =='1'){
		
			GridObj.SetColCellSort('PROD_TERM','descending');
			flag_prod_term++;
		}
		else if(flag_prod_term =='2'){
			
			GridObj.SetColCellSort('PROD_TERM','asceding');
			
			flag_prod_term--;	
			
		}
	}
	if(strColumnKey == 'TERM_VAL') {
		
		if(flag_term_val =='1'){
		
			GridObj.SetColCellSort('TERM_VAL','descending');
			flag_term_val++;
		}
		else if(flag_term_val =='2'){
			
			GridObj.SetColCellSort('TERM_VAL','asceding');
			
			flag_term_val--;	
			
		}
	}
	if(strColumnKey == 'TERM_PER') {
		
		if(flag_term_per =='1'){
		
			GridObj.SetColCellSort('TERM_PER','descending');
			flag_term_per++;
		}
		else if(flag_term_per =='2'){
			
			GridObj.SetColCellSort('TERM_PER','asceding');
			
			flag_term_per--;	
			
		}
	}	
	if(strColumnKey == 'NWGT_PER_BUOM') {
		
		if(flag_nwgt_per_buom =='1'){
		
			GridObj.SetColCellSort('NWGT_PER_BUOM','descending');
			flag_nwgt_per_buom++;
		}
		else if(flag_nwgt_per_buom =='2'){
			
			GridObj.SetColCellSort('NWGT_PER_BUOM','asceding');
			
			flag_nwgt_per_buom--;	
			
		}
	}
	if(strColumnKey == 'YEAR_IN_CUM_BUOM') {
		
		if(flag_year_in_cum_buom =='1'){
		
			GridObj.SetColCellSort('YEAR_IN_CUM_BUOM','descending');
			flag_year_in_cum_buom++;
		}
		else if(flag_year_in_cum_buom =='2'){
			
			GridObj.SetColCellSort('YEAR_IN_CUM_BUOM','asceding');
			
			flag_year_in_cum_buom--;	
			
		}
	}
	if(strColumnKey == 'MON_IN_CUM_BUOM') {
		
		if(flag_mon_in_cum_buom =='1'){
		
			GridObj.SetColCellSort('MON_IN_CUM_BUOM','descending');
			flag_mon_in_cum_buom++;
		}
		else if(flag_mon_in_cum_buom =='2'){
			
			GridObj.SetColCellSort('MON_IN_CUM_BUOM','asceding');
			
			flag_mon_in_cum_buom--;	
			
		}
	}
	if(strColumnKey == 'MON_SALE_CUM') {
		
		if(flag_mon_sale_cum =='1'){
		
			GridObj.SetColCellSort('MON_SALE_CUM','descending');
			flag_mon_sale_cum++;
		}
		else if(flag_mon_sale_cum =='2'){
			
			GridObj.SetColCellSort('MON_SALE_CUM','asceding');
			
			flag_mon_sale_cum--;	
			
		}
	}	
	if(strColumnKey == 'YEAR_SALE_CUM_BUOM') {
		
		if(flag_year_sale_cum_buom =='1'){
		
			GridObj.SetColCellSort('YEAR_SALE_CUM_BUOM','descending');
			flag_year_sale_cum_buom++;
		}
		else if(flag_year_sale_cum_buom =='2'){
			
			GridObj.SetColCellSort('YEAR_SALE_CUM_BUOM','asceding');
			
			flag_year_sale_cum_buom--;	
			
		}
	}

	
	
		GridSetMerge();
	
		
}

function SetBomFlag(){
	
	var rowcount = GridObj.GetRowCount();
	
	for ( var i = 0; i < rowcount; i++){
		
		var flag = GridObj.GetCellValue("BOM_FLAG", i);
		if ( flag == "T"){
			GridObj.SetCellBgColor('ITEM_ID', i, '255|255|108');
			GridObj.SetCellBgColor('ITEM_NAME', i, '255|255|108');
		}
		
	}
	
	
	
	
}


function GridSetMerge(){	
				
		GridObj.SetGroupMerge('SALES_CAT03');
  	    
      	GridObj.AddSummaryBar('SUMMARY2', '�Ұ�', 'SALES_CAT03', 'custom', 'BASE_STOCK,OUT_STOCK,RECEIPT_EXPT,RECEIPT_EXPT_SUM,RECEIPT_EXPT_PRE,STOCK_EXPT,SALES_PRE,SALES_CUR,' +
      			'SALES_SUM,PRE_MONTH_SELL,SALES_SUM_PY,SUB_PY_MON,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_YEAR,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,PROD_TERM,STOCK_HIDDEN,' +
      			'TERM_HIDDEN,TERM_VAL,TERM_PER,NWGT_PER_BUOM,MON_IN_CUM_BUOM,YEAR_IN_CUM,YEAR_IN_CUM_BUOM,MON_SALE_CUM,YEAR_SALE_CUM_BUOM'); 
 	   
 	   /* custom �Ұ迡 ���� �� �÷����� ���� - SUMMARY2 */
 	   
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','BASE_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','OUT_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','RECEIPT_EXPT_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_EXPT'); 
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_CUR');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','PRE_MONTH_SELL');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_SUM_PY');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','THIS_YEAR_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','LAST_YEAR_SUM'); 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SUB_PY_YEAR');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_1WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','SALES_MEAN_3WEEK'); 	     	
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','STOCK_HIDDEN');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','TERM_HIDDEN'); 	     
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','NWGT_PER_BUOM');
	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','MON_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_IN_CUM');		
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_IN_CUM_BUOM'); 	   
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','MON_SALE_CUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','sum','YEAR_SALE_CUM_BUOM');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','STOCK_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY2','average','TERM_PER');  
 
 	    
 	    var rowcount = GridObj.GetMergeCount('SALES_CAT03');   //�Ұ� �ε��� ���ϱ�
 	   
 	    for (var i=0; i<rowcount; i++){
 	    	
 	   	 	var base_stock 		 = GridObj.GetSummaryBarValue('SUMMARY2','BASE_STOCK',i,true).replace(/,/g,"");
 	   	 	
 	    	var sales_mean_1week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_1WEEK',i,true).replace(/,/g,"");
 	    	var sales_mean_3week = GridObj.GetSummaryBarValue('SUMMARY2','SALES_MEAN_3WEEK',i,true).replace(/,/g,"");
 	    	var prod_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','STOCK_HIDDEN',i,true).replace(/,/g,"");
 	    	var term_hidden		 = GridObj.GetSummaryBarValue('SUMMARY2','TERM_HIDDEN',i,true).replace(/,/g,"");
   
 	    	
 	    	/* ����� ���� ���� �߰� - ������� ����ϼ� = SUM(������Ѱ���ϼ� * �������)/SUM ������� */
 	    	GridObj.SetSummaryBarValue('SUMMARY2','PROD_TERM',i, prod_hidden/Number(base_stock) );
 	    	/* ����� ���� ���� �߰� - �������  = SUM(������� * �������)/SUM ������� */
 	    	GridObj.SetSummaryBarValue('SUMMARY2','TERM_VAL',i, term_hidden/Number(base_stock));
 	    	
  	    }
 	  	GridObj.AddSummaryBar('SUMMARY3', '�հ�', 'summaryall', 'custom', 'BASE_STOCK,OUT_STOCK,RECEIPT_EXPT,RECEIPT_EXPT_SUM,RECEIPT_EXPT_PRE,STOCK_EXPT,SALES_PRE,SALES_CUR,' +
      			'SALES_SUM,PRE_MONTH_SELL,SALES_SUM_PY,SUB_PY_MON,THIS_YEAR_SUM,LAST_YEAR_SUM,SUB_PY_YEAR,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,PROD_TERM,STOCK_HIDDEN,' +
      			'TERM_HIDDEN,TERM_VAL,TERM_PER,NWGT_PER_BUOM,MON_IN_CUM_BUOM,YEAR_IN_CUM,YEAR_IN_CUM_BUOM,MON_SALE_CUM,YEAR_SALE_CUM_BUOM');  	
  	 	
  	 	
  	 	GridObj.SetSummaryBarFunction('SUMMARY3','sum','BASE_STOCK');
  	 	GridObj.SetSummaryBarFunction('SUMMARY3','sum','OUT_STOCK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','RECEIPT_EXPT_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_EXPT'); 
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_PRE');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_CUR');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','PRE_MONTH_SELL');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_SUM_PY');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SUB_PY_MON');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','THIS_YEAR_SUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','LAST_YEAR_SUM'); 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SUB_PY_YEAR');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_1WEEK');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_MEAN_3WEEK'); 	     	
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK_HIDDEN');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','TERM_HIDDEN'); 	     
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','NWGT_PER_BUOM');
	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','MON_IN_CUM_BUOM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_IN_CUM');		
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_IN_CUM_BUOM'); 	   
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','MON_SALE_CUM');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','YEAR_SALE_CUM_BUOM');
 	    
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','STOCK_DAY');
 	    GridObj.SetSummaryBarFunction('SUMMARY3','average','TERM_PER'); 
 	     
      
 	    
 	    	var base_stock3 		= GridObj.GetSummaryBarValue('SUMMARY3','BASE_STOCK',0,true).replace(/,/g,"");
 	    	
 	    	var sales_mean_1week3 	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_1WEEK',0,true).replace(/,/g,"");
 	    	var sales_mean_3week3	= GridObj.GetSummaryBarValue('SUMMARY3','SALES_MEAN_3WEEK',0,true).replace(/,/g,"");
 	    	var prod_hidden3		= GridObj.GetSummaryBarValue('SUMMARY3','STOCK_HIDDEN',0,true).replace(/,/g,"");
 	    	var term_hidden3		= GridObj.GetSummaryBarValue('SUMMARY3','TERM_HIDDEN',0,true).replace(/,/g,"");
   	
 	    	
 	    	/* ����� ���� ���� �߰� - ������� ����ϼ� = SUM(������Ѱ���ϼ� * �������)/SUM ������� */
 	    	GridObj.SetSummaryBarValue('SUMMARY3','PROD_TERM',0, prod_hidden3/Number(base_stock3));
 	    	/* ����� ���� ���� �߰� - �������  = SUM(������� * �������)/SUM ������� */
 	    	GridObj.SetSummaryBarValue('SUMMARY3','TERM_VAL',0, term_hidden3/Number(base_stock3) );
         
        GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY3', '0|153|0', color_tot);
 		
 		
}

function  doMoving(){

	
		GridObj.ClearGroupMerge();
		GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�
		
		
}

function  doGrouping(){

		GridObj.bHDMoving = false;		// �÷� ��� ��ġ �̵�
		
		GridSetMerge();
		
}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.sales_cat03.options;
	

	
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01150_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//�ɼ� ����� ���� select option ������ŭ
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//�ɼ� ä��� result ������ŭ��
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
			
				
		
		}
		
	});
	
	
}

