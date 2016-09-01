//## ���α׷�ID      : ip_06030_Prty_InOut_analysis_list_new.js
//## ���α׷���      : ǰ���� ���ں� ������Ȳ (�ű�)
//## ��������        : ������
//## ��������        : 2011-12-06 ȭ����
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-12-06  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_06030_Prty_InOut_analysis_list_new';

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

	 
//	var trans_start = document.frm.trans_start.value;
//	var item_id     = document.frm.item_id.value;
	var insel_prty	= document.all.insel_prty.value;
    var selgubn 	= document.frm.sel_gubn.value;
    var in_item_id 	= document.frm.in_item_id.value;
    var in_item_name= document.frm.in_item_name.value;

if(selgubn == "PRTY"){
	if(insel_prty == "01"){
     //alert("if(insel_prty == 01 && selgubn != PROD)");
		GridObj.AddHeader("CNFM_DATE"	,"����"		   ,"t_text" 	   ,100	    ,60     ,false); //0   
		GridObj.AddHeader("DAY"	        ,"����"	       ,"t_text" 	   ,100	    ,40     ,false); //0
		GridObj.AddHeader("CURR_FLAG"	,"CURR_FLAG"   ,"t_number" 	   ,100	    ,0      ,false); //0
		 
		GridObj.AddHeader("PROD_1"	    ,"����"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_1"	    ,"�Ǹ�"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_1"     ,"���"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_1" ,"����ϼ�"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_2"	    ,"����"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_2"	    ,"�Ǹ�"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_2"     ,"���"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_2" ,"����ϼ�"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_3"	    ,"����"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_3"	    ,"�Ǹ�"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_3"     ,"���"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_3" ,"����ϼ�"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("SELL_PLAN_1" ,"�ǸŰ�ȹ"	   ,"t_number"     ,100.3   ,70     ,false); //0
		
			/* ���� �ش� �߰� */
		GridObj.AddGroup("HD1",      		"���");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD1", 	 "PROD_1");
		GridObj.AppendHeader("HD1",      "SELL_1");
		GridObj.AppendHeader("HD1",     "STOCK_1");
		GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
		
		GridObj.AddGroup("HD2",    		  "������");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD2", 	 "PROD_2");
		GridObj.AppendHeader("HD2", 	 "SELL_2");
		GridObj.AppendHeader("HD2", 	"STOCK_2");
		GridObj.AppendHeader("HD2", "STOCK_DAY_2");	
		
		GridObj.AddGroup("HD3",      		"�հ�");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD3", 	 "PROD_3");
		GridObj.AppendHeader("HD3", 	 "SELL_3");
		GridObj.AppendHeader("HD3", 	"STOCK_3");
		GridObj.AppendHeader("HD3", "STOCK_DAY_3");
		GridObj.AppendHeader("HD3", "SELL_PLAN_1");
		
		/* ������ ���� ���� �� */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColCellAlign('CNFM_DATE',     'center');
		GridObj.SetColCellAlign('DAY',           'center');
		GridObj.SetColCellAlign('PROD_1',         'right');
		GridObj.SetColCellAlign('SELL_1',         'right'); 
		GridObj.SetColCellAlign('STOCK_1',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		
		GridObj.SetColCellAlign('PROD_2',         'right');
		GridObj.SetColCellAlign('SELL_2',         'right'); 
		GridObj.SetColCellAlign('STOCK_2',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_2',    'right'); 
		
		GridObj.SetColCellAlign('PROD_3',         'right');
		GridObj.SetColCellAlign('SELL_3',         'right'); 
		GridObj.SetColCellAlign('STOCK_3',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_3',    'right'); 
		   
		GridObj.SetColCellAlign('SELL_PLAN_1',    'right');   
		  
		GridObj.SetNumberFormat("PROD_1",      "###,###.#");
		GridObj.SetNumberFormat("SELL_1",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_1",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_2",      "###,###.#");
		GridObj.SetNumberFormat("SELL_2",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_2",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_3",      "###,###.#");
		GridObj.SetNumberFormat("SELL_3",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_3",     "###,###.#");
		    
		GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");   			
	}else{
		 	GridObj.AddHeader("CNFM_DATE"	  ,"����"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"����"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"����/����"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"�Ǹ�"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"���"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"����ϼ�"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"�ǸŰ�ȹ"	       ,"t_number"     ,100.3   ,100    ,false); //0
		/* ���� �ش� �߰� */
		if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "��");							//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "����");						//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "��Ÿ��ǰ");						//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "��ǰ(��ټ�, �õ� ����)");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "��ǰ(����, �õ� ����)");		//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "��ټ� 2L");					//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "���� 2L");					//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "��ټ� 0.5L");				//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "���� 0.6L");					//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "����");						//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="08"){
			GridObj.AddGroup("HD1",      "���밡��ǰ(��ǰ)");						//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="09"){
			GridObj.AddGroup("HD1",      "���밡��ǰ(��ǰ)");						//�׸��忡 �׷��� ����Ѵ�. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* ������ ���� ���� �� */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");    
		}	
} else {
	 		GridObj.AddHeader("CNFM_DATE"	  ,"����"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"����"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"����/����"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"�Ǹ�"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"���"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"����ϼ�"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"�ǸŰ�ȹ"	       ,"t_number"     ,100.3   ,100    ,false); //0
	   
		/* ���� �ش� �߰� */
		
		if(selgubn == "PROD"){
			GridObj.AddGroup("HD1",      in_item_id+" - "+in_item_name);	//�׸��忡 �׷��� ����Ѵ�. 
		}else if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "��");								//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "����");							//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "��Ÿ��ǰ");							//�׸��忡 �׷��� ����Ѵ�. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "��ǰ(��ټ�, �õ� ����)");			//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "��ǰ(����, �õ� ����)");			//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "��ټ� 2L");						//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "���� 2L");						//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "��ټ� 0.5L");					//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AddGroup("HD1",      "���� 0.6L");						//SCM�� �̽¿� �븮 ��û : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "����");							//�׸��忡 �׷��� ����Ѵ�. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* ������ ���� ���� �� */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");  
}	
}
		//GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
		//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);


	// �÷� ����

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

  	  // var sel_gubn	        = document.frm.sel_gubn.value;
  	   var selgubn 	= document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
	  		 if(selgubn=="PRTY"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
								if(insel_prty=="01"){
								GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_2', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_2', 	i, '255|255|0');
								
								GridObj.SetCellBgColor('PROD_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_3', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_3', 	i, '255|255|0');	
				  				
				  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
				  				
								GridObj.AddSummaryBar('SUMMARY','�հ�','summaryall','sum','PROD_1,SELL_1,STOCK_1,PROD_2,SELL_2,STOCK_2,PROD_3,SELL_3,STOCK_3,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
				  				
							 } else {
							 	GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
								
				        		GridObj.AddSummaryBar('SUMMARY','�հ�','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
							 }
				  		}
				  	} 
			} else if(selgubn=="PROD"){
			 		for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		
						// GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
					
						GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
						GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
						GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
						GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
		  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');

		           		GridObj.AddSummaryBar('SUMMARY','�հ�','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
		 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

				  		}
					} 
				}
					
		} else { 
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
    var insel_prty	    = document.all.insel_prty.value;
    var in_item_id	    = document.all.in_item_id.value;
    var in_item_name	= document.all.in_item_name.value;
    var sel_gubn 	    = document.frm.sel_gubn.value;

	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);    

	
    if(sel_gubn=="PRTY"){
	    if(insel_prty=="01"){
	    	doQuery();
	    }else{
	    	doQuery2();
	    }
	} 
	else if(sel_gubn=="PROD"){
		  doQuery2();
	}
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
       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",              "search");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
       GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2() 
   {

       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",             "search2");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
	   GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
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

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ǰ����ȸ

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup ����! 
				openItemPopup();
			}
		}
	});
}

// ǰ�� POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// ǰ��/ǰ�� radio �����ϸ�, sel_gubn �� ���� �´� ��ȸ ���� ���� �־��ش�
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.insel_prty.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.insel_prty.style.display = "block";
	}

}

function GridCellClick(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

// ���� Ŭ�� : �� �˾�  //����� ���� ����  ������
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;
	//var item_id = '101000105';


	if(selgubn == "PRTY"){ // ǰ��

		var division	= document.frm.insel_prty.value;
		var week_flag	= '31week';

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
					
	}else{ // ǰ��
		alert("ǰ������ ������ ��ȸ �Ͽ� �ֽñ� �ٶ��ϴ�. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		  
	}
}   