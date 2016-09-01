//## ���α׷�ID      : ip_07090_EDI_eCvan_Analysis.js
//## ���α׷���      : EDI eCvan �м� ��ȸ
//## ������	        : �̰���
//## ��������        : 2015-01-29 
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-01-29	�̰���		CREATE
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;															// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path 	 = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id		 = 'ip_07090_EDI_eCvan_Analysis';

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

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
    //�׸��� �� �β� ����
    GridObj.strCellBorderStyle='raisedsoft';
    GridObj.strHDBorderStyle='raisedsoft';
   
   
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

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	//GridObj.SetColHide("CRUD", true); 
  	
	GridObj.AddHeader("CNFM_DATE"	       ,"����"	    	,"t_text"      	,100	    ,80     ,false); //0
	GridObj.AddHeader("ODER_BOX_NS"	       ,"���ַ�"		,"t_number"	   	,100.3	    ,90     ,false); //0
	GridObj.AddHeader("ODER_BOX_NS_2"	   ,"���ַ�"		,"t_number"	   	,100.3	    ,90     ,false); //0

	GridObj.AddHeader("ODER_AMT_NS"	       ,"���־�"		,"t_number"	   	,100.3	    ,90     ,false); //0

 	
 	// EDI ��������
 	GridObj.AddHeader("EDI_SELL_BOX"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_SELL_BOX_2"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_SELL_AMT"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_BOX"	       ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_BOX_2"	   ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_AMT"	       ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	
 	GridObj.AddHeader("EDI_NS_MN"	       ,"��ɹ̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_NS_MN_2"	       ,"��ɹ̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_NS_MN_AMT"	   ,"��ɹ̳���"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN"	   ,"�̸�Ʈ�̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN_2"	   ,"�̸�Ʈ�̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN_AMT"   ,"�̸�Ʈ�̳���"	,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_RATE"	   	   ,"�̳���"	  		,"t_text" 		,100   		,80    ,false); //0
 	// eCvan ����
 	GridObj.AddHeader("ECV_SELL_BOX"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_SELL_BOX_2"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_SELL_AMT"	   ,"��ǰ��"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_BOX"	       ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_BOX_2"	   ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_AMT"	       ,"�̳���"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	
 	GridObj.AddHeader("ECV_NS_MN"	       ,"��ɹ̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0 	
 	
 	GridObj.AddHeader("ECV_EMART_MN"	   ,"�̸�Ʈ�̳�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_RATE"	   	   ,"�̳���"	  		,"t_text" 		,100   		,80    ,false); //0
 	
 	GridObj.AddHeader("MN_GAP"	      	   ,"�̳����̷�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("MN_GAP_AMT"	       ,"�̳����̾�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("MN_GAP_2"	       ,"�̳����̷�"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	// ���Ƽ �ݾ�
 	GridObj.AddHeader("EDI_PANALTY"	       ,"EDI ����"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_PANALTY"	       ,"eCvan ����"	    ,"t_number" 	,100.3	    ,80    ,false); //0
	
	/* ������� �߰� */
	GridObj.AddGroup	("EDI",     "EDI ��������");			
	GridObj.AppendHeader("EDI", 	"EDI_SELL_BOX");
	GridObj.AppendHeader("EDI", 	"EDI_SELL_BOX_2");
	GridObj.AppendHeader("EDI", 	"EDI_SELL_AMT");
	GridObj.AppendHeader("EDI",     "EDI_MN_BOX");
	GridObj.AppendHeader("EDI",     "EDI_MN_BOX_2");
	GridObj.AppendHeader("EDI",     "EDI_MN_AMT");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN_2");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN_AMT");
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN");	
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN_2");
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN_AMT");	
	GridObj.AppendHeader("EDI",     "EDI_MN_RATE");
	
	GridObj.AddGroup	("ECV",     "ECV ��������");			
	GridObj.AppendHeader("ECV", 	"ECV_SELL_BOX");
	GridObj.AppendHeader("ECV", 	"ECV_SELL_BOX_2");
	GridObj.AppendHeader("ECV", 	"ECV_SELL_AMT");
	GridObj.AppendHeader("ECV",     "ECV_MN_BOX");
	GridObj.AppendHeader("ECV",     "ECV_MN_BOX_2");
	GridObj.AppendHeader("ECV",     "ECV_MN_AMT");	
	GridObj.AppendHeader("ECV",     "ECV_NS_MN");
	GridObj.AppendHeader("ECV",     "ECV_EMART_MN");		
	GridObj.AppendHeader("ECV",     "ECV_MN_RATE");
	
	GridObj.AddGroup	("PANALTY", "���Ƽ �ݾ�");			
	GridObj.AppendHeader("PANALTY", "EDI_PANALTY");
	GridObj.AppendHeader("PANALTY", "ECV_PANALTY");
	
	GridObj.BoundHeader();	
	
	GridObj.SetColHide("ODER_BOX_NS_2", 	true);
	
	GridObj.SetColHide("ODER_AMT_NS", 		true);
	
	GridObj.SetColHide("EDI_SELL_BOX_2", 	true);
	GridObj.SetColHide("EDI_SELL_AMT", 		true);
	GridObj.SetColHide("EDI_MN_BOX_2", 		true);
	GridObj.SetColHide("EDI_MN_AMT", 		true);	
	GridObj.SetColHide("ECV_SELL_BOX_2", 	true);	
	GridObj.SetColHide("ECV_SELL_AMT", 		true);
	GridObj.SetColHide("ECV_MN_BOX_2", 		true);
	GridObj.SetColHide("ECV_MN_AMT", 		true);
	GridObj.SetColHide("MN_GAP_2", 			true);
	GridObj.SetColHide("MN_GAP_AMT", 		true);
	
	GridObj.SetColHide("EDI_NS_MN_2", 		true);
	GridObj.SetColHide("EDI_NS_MN_AMT", 	true);
	GridObj.SetColHide("EDI_EMART_MN_2", 	true);
	GridObj.SetColHide("EDI_EMART_MN_AMT", 	true);
	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center');
	GridObj.SetColCellAlign('ODER_BOX_NS', 	'right');
	
	GridObj.SetColCellAlign('EDI_SELL_BOX', 'right');	
	GridObj.SetColCellAlign('EDI_SELL_AMT', 'right');
	GridObj.SetColCellAlign('EDI_MN_BOX',   'right');
	GridObj.SetColCellAlign('EDI_MN_AMT',   'right');
	GridObj.SetColCellAlign('EDI_NS_MN',  	'right');	
	GridObj.SetColCellAlign('EDI_EMART_MN', 'right');
	GridObj.SetColCellAlign('EDI_MN_RATE',  'right');
	GridObj.SetColCellAlign('ECV_SELL_BOX', 'right');
	GridObj.SetColCellAlign('ECV_SELL_AMT', 'right');
	GridObj.SetColCellAlign('ECV_MN_BOX',   'right');
	GridObj.SetColCellAlign('ECV_MN_AMT',   'right');
	GridObj.SetColCellAlign('ECV_NS_MN',  	'right');	
	GridObj.SetColCellAlign('ECV_EMART_MN', 'right');
	GridObj.SetColCellAlign('ECV_MN_RATE',  'right');
	GridObj.SetColCellAlign('MN_GAP',  		'right');
	GridObj.SetColCellAlign('MN_GAP_AMT',  	'right');
	GridObj.SetColCellAlign('EDI_PANALTY',  'right');
	GridObj.SetColCellAlign('ECV_PANALTY',  'right');
	
	GridObj.SetNumberFormat("ODER_BOX_NS",    	"###,###.#");
	
	GridObj.SetNumberFormat("EDI_SELL_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_SELL_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_MN_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_MN_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_NS_MN",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_EMART_MN",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_SELL_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_SELL_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_MN_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_MN_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_NS_MN",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_EMART_MN",    	"###,###.#");
	GridObj.SetNumberFormat("MN_GAP",    		"###,###.#");
	GridObj.SetNumberFormat("MN_GAP_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_PANALTY",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_PANALTY",    	"###,###.#");
	
	GridObj.SetColHDBgColor('ODER_BOX_NS',		'253|228|229');
	
	GridObj.SetColHDBgColor('EDI_SELL_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('EDI_MN_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('ECV_SELL_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('ECV_MN_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('MN_GAP',			'253|228|229');
    
    GridObj.SetColHDBgColor('EDI_NS_MN',		'253|228|229');
    GridObj.SetColHDBgColor('EDI_EMART_MN',		'253|228|229');
	
	
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
            if(GridObj.GetStatus() == "true")  {     
            	
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	    
       
		
    }

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service){
   	
    doQuery();
}

function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       var item_type		= document.all.item_type.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;      
      // var in_act_type	    = document.all.in_act_type.value;   
     
      // var in_qty_gubn		= document.all.in_qty_gubn.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
        
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type", 	 item_type);

	   GridObj.SetParam("user_id", 			user_id);
	   //GridObj.SetParam("in_qty_gubn",  in_qty_gubn);	
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

function CallPop(){
	
	var start_date = document.frm.start_date.value;
	var end_date   = document.frm.end_date.value;
	var itype	   = document.frm.item_type.value;

	
	var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop_all";
		service_url += "&start_date=" + start_date + "&end_date=" + end_date + "&itype=" + itype ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1235, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
}		

function GridCellDblClick(strColumnKey, nRow){	
	
	var cnfm_date = GridObj.GetCellValue("CNFM_DATE", nRow);
	var itype	  = document.frm.item_type.value;
	var gubn;
	
	if(strColumnKey == "EDI_NS_MN"){
		
		gubn	= 1;
		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1185, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}
	else if(strColumnKey == "EDI_EMART_MN"){
		
		gubn	= 2;
		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1185, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
		
	}else{
		
		gubn	= 3;
		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1185, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}
	
	
	
}

/* ��� ��ȯ �������� ���� */
	var ODER_BOX_NS_IDX		= 0;
	
	var EDI_SELL_BOX_IDX 	= 0;
	var EDI_MN_BOX_IDX	 	= 0;
	var ECV_SELL_BOX_IDX	= 0;
	var ECV_MN_BOX_IDX	 	= 0;
	var MN_GAP_IDX	   		= 0;
	
	var EDI_NS_MN_IDX		= 0;
	var EDI_EMART_MN_IDX	= 0;	
	

function HeaderClick(strColumnKey){
	
	var GridObj = document.WiseGrid;
	
	/* EDI ���ַ�*/
	if(strColumnKey == "ODER_BOX_NS"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ODER_BOX_NS_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ODER_BOX_NS",GridObj.GetColHDText("ODER_AMT_NS"));
				GridObj.SetCellValue('ODER_BOX_NS',i,GridObj.GetCellValue("ODER_AMT_NS", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ODER_BOX_NS",GridObj.GetColHDText("ODER_BOX_NS_2"));
				GridObj.SetCellValue('ODER_BOX_NS',i,GridObj.GetCellValue("ODER_BOX_NS_2", i));
			}			
							
		}
		if(ODER_BOX_NS_IDX == '1') {
			ODER_BOX_NS_IDX =0; 
			
		}else {
			ODER_BOX_NS_IDX =1;
			
		}
	}

	
	/* EDI ��ǰ��*/
	if(strColumnKey == "EDI_SELL_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_SELL_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_SELL_BOX",GridObj.GetColHDText("EDI_SELL_AMT"));
				GridObj.SetCellValue('EDI_SELL_BOX',i,GridObj.GetCellValue("EDI_SELL_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_SELL_BOX",GridObj.GetColHDText("EDI_SELL_BOX_2"));
				GridObj.SetCellValue('EDI_SELL_BOX',i,GridObj.GetCellValue("EDI_SELL_BOX_2", i));
			}			
							
		}
		if(EDI_SELL_BOX_IDX == '1') {
			EDI_SELL_BOX_IDX =0; 
			
		}else {
			EDI_SELL_BOX_IDX =1;
			
		}
	}
	
	/* EDI �̳��� */
	if(strColumnKey == "EDI_MN_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_MN_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_MN_BOX",GridObj.GetColHDText("EDI_MN_AMT"));
				GridObj.SetCellValue('EDI_MN_BOX',i,GridObj.GetCellValue("EDI_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_MN_BOX",GridObj.GetColHDText("EDI_MN_BOX_2"));
				GridObj.SetCellValue('EDI_MN_BOX',i,GridObj.GetCellValue("EDI_MN_BOX_2", i));
			}			
							
		}
		if(EDI_MN_BOX_IDX == '1') {
			EDI_MN_BOX_IDX =0; 
			
		}else {
			EDI_MN_BOX_IDX =1;
			
		}
	}
	
	if(strColumnKey == "EDI_NS_MN"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_NS_MN_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_NS_MN",GridObj.GetColHDText("EDI_NS_MN_AMT"));
				GridObj.SetCellValue('EDI_NS_MN',i,GridObj.GetCellValue("EDI_NS_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_NS_MN",GridObj.GetColHDText("EDI_NS_MN_2"));
				GridObj.SetCellValue('EDI_NS_MN',i,GridObj.GetCellValue("EDI_NS_MN_2", i));
			}			
							
		}
		if(EDI_NS_MN_IDX == '1') {
			EDI_NS_MN_IDX =0; 
			
		}else {
			EDI_NS_MN_IDX =1;
			
		}
	}
	
		if(strColumnKey == "EDI_EMART_MN"){
		
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_EMART_MN_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_EMART_MN",GridObj.GetColHDText("EDI_EMART_MN_AMT"));
				GridObj.SetCellValue('EDI_EMART_MN',i,GridObj.GetCellValue("EDI_EMART_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_EMART_MN",GridObj.GetColHDText("EDI_EMART_MN_2"));
				GridObj.SetCellValue('EDI_EMART_MN',i,GridObj.GetCellValue("EDI_EMART_MN_2", i));
			}			
							
		}
		if(EDI_EMART_MN_IDX == '1') {
			EDI_EMART_MN_IDX =0; 
			
		}else {
			EDI_EMART_MN_IDX =1;
			
		}
	}
	
	/* eCvan ��ǰ�� */
	if(strColumnKey == "ECV_SELL_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ECV_SELL_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ECV_SELL_BOX",GridObj.GetColHDText("ECV_SELL_AMT"));
				GridObj.SetCellValue('ECV_SELL_BOX',i,GridObj.GetCellValue("ECV_SELL_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ECV_SELL_BOX",GridObj.GetColHDText("ECV_SELL_BOX_2"));
				GridObj.SetCellValue('ECV_SELL_BOX',i,GridObj.GetCellValue("ECV_SELL_BOX_2", i));
			}			
							
		}
		if(ECV_SELL_BOX_IDX == '1') {
			ECV_SELL_BOX_IDX =0; 
			
		}else {
			ECV_SELL_BOX_IDX =1;
			
		}
	}
	
	/* eCvan �̳��� */
	if(strColumnKey == "ECV_MN_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ECV_MN_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ECV_MN_BOX",GridObj.GetColHDText("ECV_MN_AMT"));
				GridObj.SetCellValue('ECV_MN_BOX',i,GridObj.GetCellValue("ECV_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ECV_MN_BOX",GridObj.GetColHDText("ECV_MN_BOX_2"));
				GridObj.SetCellValue('ECV_MN_BOX',i,GridObj.GetCellValue("ECV_MN_BOX_2", i));
			}			
							
		}
		if(ECV_MN_BOX_IDX == '1') {
			ECV_MN_BOX_IDX =0; 
			
		}else {
			ECV_MN_BOX_IDX =1;
			
		}
	}
	
	/* �̳����̷� */
	if(strColumnKey == "MN_GAP"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(MN_GAP_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("MN_GAP",GridObj.GetColHDText("MN_GAP_AMT"));
				GridObj.SetCellValue('MN_GAP',i,GridObj.GetCellValue("MN_GAP_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("MN_GAP",GridObj.GetColHDText("MN_GAP_2"));
				GridObj.SetCellValue('MN_GAP',i,GridObj.GetCellValue("MN_GAP_2", i));
			}			
							
		}
		if(MN_GAP_IDX == '1') {
			MN_GAP_IDX =0; 
			
		}else {
			MN_GAP_IDX =1;
			
		}
	}
}


function GridSetMerge(){
	
				

   GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'ODER_BOX_NS,ODER_AMT_NS,EDI_SELL_BOX,EDI_SELL_AMT,'
   						+'EDI_MN_BOX,,EDI_MN_AMT,EDI_NS_MN,EDI_EMART_MN,EDI_MN_RATE,ECV_SELL_BOX,,ECV_SELL_AMT,'
   						+'ECV_MN_BOX,,ECV_MN_AMT,ECV_NS_MN,ECV_EMART_MN,MN_GAP,EDI_PANALTY,ECV_PANALTY'); 
         	   
       	  
    	        
   GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
    	 	
}


