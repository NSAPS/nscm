//## ���α׷�ID      : ip_01120_Jgc_inventoryPlanAnalysis_list_expert.js
//## ���α׷���       :  ���üȭ ǰ��м�
//## ������            : �̰���
//## ��������        :  2015-09-22 
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_list_expert';

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
	//GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�

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

	
	
 	GridObj.AddHeader("SALES_CAT03"	       ,"����׷�"	    ,"t_text"      ,100	    ,70     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,60     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ǰ���"	        ,"t_text" 	   ,100	    ,260    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"�԰�"	    	,"t_text"  	   ,100		,90     ,false); //0
 	GridObj.AddHeader("GUBN"	    	   ,"����"	    	,"t_text"  	   ,100		,50     ,false); //0
 	GridObj.AddHeader("JGC_OCCUR"	       ,"���üȭ\n�߻����"	,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("JGC_STOCK"	       ,"���üȭ\n�������"	,"t_number"    ,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("JGC_PROD_DATE"	   ,"���üȭ\n�߻���"	,"t_text"      ,100		,70     ,false); //0
 	GridObj.AddHeader("BUDU_QTY"	   	   ,"���üȭ\n����"		,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"�������"			,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"  		   ,"����ϼ�"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("PROD_TERM"     	   ,"�������\n����ϼ�"	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("TERM_VAL"  		   ,"�������"			,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("TERM_PER"  		   ,"�������\n�����"	,"t_number"    ,100.3	,70     ,false); //0
 	
 	
 	GridObj.AddHeader("SALES_PRE"	       ,"���ϰ�"	    		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"�ϰ�"       		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"����"	    		,"t_number"    ,100.3	,70     ,false); //0
   	GridObj.AddHeader("REMAIN_STOCK"	    ,"�ܿ����"	    	,"t_number"    ,100.3	,0     ,false); //0
    GridObj.AddHeader("SALES_MEAN_1WEEK"    ,"1�����"			,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"    ,"3�����"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GYR"    				,"GYR"				,"t_text"      ,100		,0     ,false); //0
 	
  
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
    GridObj.SetColCellAlign('SALES_CAT03',        	'left');
    GridObj.SetColCellAlign('TERM_PER',     		'right'); 
	GridObj.SetColCellAlign('GUBN',     			'center'); 
	GridObj.SetColCellAlign('JGC_PROD_DATE',     	'center'); 
    GridObj.SetNumberFormat("JGC_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("JGC_OCCUR",       "###,###.#");
    GridObj.SetNumberFormat("BUDU_QTY",        "###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK",      "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",       "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",       "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",       "###,###.#");
    GridObj.SetNumberFormat("REMAIN_STOCK",    "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM",       "###,###.#");
    

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
            	GridGYR();
             
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
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	
};





/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");
       var end_date			= document.frm.end_date.value.replace(/-/g,"");;
       var mto_gubn			= document.all.mto_gubn.value;
	   var user_id			= document.all._user_id.value;     
       var search_type	    = document.all.search_type.value;       
       var search_item	    = document.all.search_item.value;     	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
      
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);  
       GridObj.SetParam("end_date",		  end_date); 
       GridObj.SetParam("mto_gubn",		mto_gubn);	 
	   GridObj.SetParam("search_type", search_type);	   
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);
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

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		


/*Sort ���� ���� */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_jgc_stock = '1';	
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';	
	var flag_sales_sum = '1';
	
	var flag_remain_stock = '1';
	var flag_prod_term = '1';	
	var flag_term_per = '1';

	var flag_term_val = '1';
	var flag_stock_day = '1';
	var flag_sales_mean_3week = '1';
	var flag_sales_mean_1week = '1';



function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('JGC_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('REMAIN_STOCK'		,true);

	GridObj.SetColCellSortEnable('SALES_MEAN_1WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);

	
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
	if(strColumnKey == 'JGC_STOCK') {
		
		if(flag_jgc_stock =='1'){
		
			GridObj.SetColCellSort('JGC_STOCK','descending');
			flag_jgc_stock++;
		}
		else if(flag_jgc_stock =='2'){
			
			GridObj.SetColCellSort('JGC_STOCK','asceding');
			
			flag_jgc_stock--;	
			
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
	if(strColumnKey == 'REMAIN_STOCK') {
		
		if(flag_remain_stock =='1'){
		
			GridObj.SetColCellSort('REMAIN_STOCK','descending');
			flag_remain_stock++;
		}
		else if(flag_remain_stock =='2'){
			
			GridObj.SetColCellSort('REMAIN_STOCK','asceding');
			
			flag_remain_stock--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_1WEEK') {
		
		if(flag_sales_mean_1week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_1week++;
		}
		else if(flag_sales_mean_1week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
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
	
		GridSetMerge();
		
}

function GridGYR(){
	
	var rowcount = GridObj.GetRowCount();
	
	for (var i =0; i < rowcount; i ++){
		
		var gyr 		= GridObj.GetCellValue('GYR',i);
		var term_per 	= GridObj.GetCellValue('TERM_PER',i);
		
		if (gyr == "G") GridObj.SetRowBgColor(i,'207|255|36');
		if (gyr == "R") GridObj.SetRowBgColor(i,'255|216|216');
		if (gyr == "Y") {
			
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		if (term_per == "20") {
		
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		
	}
}

function GridSetMerge(){
	
				
		GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SPEC');
      	GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'SALES_CAT03', 'sum', 'JGC_STOCK,BASE_STOCK,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,REMAIN_STOCK,' +
      			'SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,JGC_OCCUR,BUDU_QTY'); 
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'JGC_STOCK,BASE_STOCK,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,REMAIN_STOCK,' +
      			'SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,JGC_OCCUR,BUDU_QTY'); 
        
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//���

}


