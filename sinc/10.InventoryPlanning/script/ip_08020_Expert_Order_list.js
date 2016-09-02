//## ���α׷�ID		: ip_08020_Expert_Order_list.js
//## ���α׷���		: �ֹ����� �� 1������
//## ������			: �̰���
//## ��������			: 2016-03-23
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
var job_id = 'ip_08020_Expert_Order_list';

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
	
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 		,100    ,60  ,false);
	
	GridObj.AddHeader("ROWNUM"	   		,"����"  			,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("SALES_CAT03"		,"ǰ��"				,"t_text" 	    ,100	    ,120     ,false); //0  
	GridObj.AddHeader("MTO_MTS_GUBN"	,"����"  			,"t_text"     	,100		,60     ,false); //0  
 	//GridObj.AddHeader("ORDER_NO"	    ,"�ֹ���ȣ"			,"t_text" 	   	,100	    ,80     ,false); //0
 	//GridObj.AddHeader("DELIVERY_NO"	,"��ǰ��ȣ"			,"t_text" 	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	    	,"��ǰ�ڵ�"			,"t_text" 	   	,100	    ,80     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"	        	,"t_text" 	   	,100	    ,250    ,false); //0
 	GridObj.AddHeader("SPEC"			,"�԰�"	        	,"t_text" 	   	,100	    ,100    ,false); //0
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"������"	    		,"t_number"  	,100.3		,80    ,false); //0 	
 	GridObj.AddHeader("ORDER_QTY"		,"�ֹ���"	    		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("AVL_STOCK"		,"����\n�������"		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W2"	,"���� BOOKING\n���"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("AVL_STOCK2"		,"������\n�������"		,"t_number"  	,100.3	,80    ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W3"	,"W+2 BOOKING\n���"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W4"	,"W+3 BOOKING\n���"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W5"	,"W+4 BOOKING\n���"	,"t_number"  	,80		,100   ,false); //0
 	
 	GridObj.AddHeader("SAFE_QTY"		,"�������"	    ,"t_number"  	,100.3		,100    ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"�����ʿ䷮"	    ,"t_number"  	,100.3		,100    ,false); //0
 	GridObj.AddHeader("MOQ"	   			,"M.O.Q"	    ,"t_number"  	,100.3		,100    ,false); //0
	GridObj.AddHeader("MOQ_GAP"	   		,"M.O.Q ���̷�"	,"t_number"    	,100.3		,100    ,false); //0
	GridObj.AddHeader("PLAN_QTY"		,"���� �����ȹ��"	,"t_number"  	,100.3		,100    ,false); //0
	GridObj.AddHeader("PLAN_QTY2"		,"���� �����ȹ\nȮ����"	,"t_number"  	,100.3		,100    ,true); //0
	GridObj.AddHeader("FLAG"			,"FLAG"	,"t_text"  	,100		,0    ,true); //0
 	
	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
	GridObj.SetColCellAlign('SALES_CAT03',  	'left'); 
	GridObj.SetColCellAlign('SPEC',  	'left'); 
	GridObj.SetColCellAlign('MTO_MTS_GUBN',  	'center');
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("MOQ",       		"###,###.#");
    GridObj.SetNumberFormat("MOQ_GAP",     		"###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W2",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W3",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W4",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W5",   "###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("NEED_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("PLAN_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("PLAN_QTY2",       	"###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetColCellBgColor('ROWNUM','255|255|200');
    GridObj.SetColCellBgColor('PLAN_QTY2','255|255|200');
    
    GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
   
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
        	GridCheckMoq(); 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doQuery();
		
    }else if(endMode == "save2"){
    
    	doQuery();	
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

	var domain			= document.frm.domain.value;
	if (domain =="EX") doSave();	
	if (domain =="DO") doSave2();	
	
	
};

function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var cnfm_date	    = document.frm.cnfm_date.value;
    cnfm_date 			= cnfm_date.replace(/-/g,"");
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				  cnfm_date);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

function doSave2() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var cnfm_date	    = document.frm.cnfm_date.value;
    cnfm_date 			= cnfm_date.replace(/-/g,"");
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "save2");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				  cnfm_date);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;
   var mto_gubn	    	= document.frm.mto_gubn.value;
   //var search_item		= document.frm.search_item.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("cnfm_date",   		cnfm_date);
   GridObj.SetParam("mto_gubn",   		mto_gubn);
   GridObj.SetParam("domain",   		domain);
  // GridObj.SetParam("search_item",		search_item);	
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {
	
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date 			= cnfm_date.replace(/-/g,"");
	
	if(strColumnKey == 'ITEM_NAME'){		
		
		var service_url = "service.do?_moon_service=ip_08020_Expert_Order_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date ;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=440, top=50, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}

}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', 'ǰ���� ��', 'SALES_CAT03', 'sum', 'PRE_MONTH_SELL,AVL_STOCK,BOOKING_QTY_W2,BOOKING_QTY_W3,BOOKING_QTY_W4,BOOKING_QTY_W5,AVL_STOCK2,ORDER_QTY,SAFE_QTY,NEED_QTY,MOQ,MOQ_GAP,PLAN_QTY,PLAN_QTY2');
    GridObj.AddSummaryBar('SUMMARY2', '��ü ��'	, 'summaryall', 'sum', 'PRE_MONTH_SELL,AVL_STOCK,BOOKING_QTY_W2,BOOKING_QTY_W3,BOOKING_QTY_W4,BOOKING_QTY_W5,AVL_STOCK2,ORDER_QTY,SAFE_QTY,NEED_QTY,MOQ,MOQ_GAP,PLAN_QTY,PLAN_QTY2');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}

function GridCheckMoq(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i < rowcount; i++){
		
		var flag = GridObj.GetCellValue('FLAG',i);
		
		if(GridObj.GetCellValue('MOQ_GAP',i) < 0){
			
			GridObj.SetCellBgColor('MOQ_GAP', i , '255|54|54');
		}
		
		if( flag === 'N') {
			
			var s1 = GridObj.GetCellValue('PLAN_QTY',i);
			//var s2 = GridObj.GetCellValue('PLAN_QTY2',i);
			GridObj.SetCellValue('PLAN_QTY2',i,s1);
			
		}
	}
}

function CreatePlan(){

	if(confirm("���� �ֹ���ȹ�� �����մϴ�. �����Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}	
	
	

	var GridObj		    = document.WiseGrid;
	var max_date	    = document.frm.max_date.value;
    max_date 			= max_date.replace(/-/g,"");
    
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	GridObj.SetParam("mode", "CreatePlan");
	GridObj.SetParam("max_date",				  max_date);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.doQuery(servlet_url);

	
}

