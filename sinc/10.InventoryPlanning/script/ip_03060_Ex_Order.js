//## ���α׷�ID		: ip_03060_Ex_Order.js
//## ���α׷���		: ������ְ�ȹ
//## ������			: �̰���
//## ��������			: 2016-04-22
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
var class_path = "com.wisegrid.admin.";							// ������ ��Ű��(class ���� ���)
var job_id = 'ip_03060_Ex_Order';

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
	
	
	GridObj.AddHeader("SELECTED"		,""   			,"t_checkbox"	,2			,30  ,true); //0
	GridObj.AddHeader("SALES_CAT03"	    ,"ǰ��"			,"t_text" 	   	,100	    ,70     ,false); //0   
	GridObj.AddHeader("SALES_CAT032"	,"ǰ��"			,"t_text" 	   	,100		,0      ,false); //0   
 	GridObj.AddHeader("ITEM_ID"	    	,"��ǰ�ڵ�"		,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"	        ,"t_text" 	   	,100	    ,200    ,false); //0
 	GridObj.AddHeader("GUBN"			,"����"			,"t_text"  		,100		,60    	,false); //0
 	GridObj.AddHeader("LEADTIME"		,"����Ÿ��"		,"t_text"  		,100		,60    	,false); //0 	
 	GridObj.AddHeader("PM_4"			,"M-1"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_3"			,"M-2"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_2"			,"M-3"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_1"			,"M-4"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_AVG"			,"�����"	    	,"t_number"  	,100.3		,60    ,false); //0 	
 	GridObj.AddHeader("M_0"				,"M"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("M_REMAIN"		,"M �ܿ�"	    ,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_1"				,"M+1"	    	,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_2"				,"M+2"	    	,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_3"				,"M+3"	    	,"t_number"  	,100.3		,60    ,true); //0 	
 	GridObj.AddHeader("M_4"				,"M+4"	    	,"t_number"  	,100.3		,60    ,true); //0 	
 	GridObj.AddHeader("SAFE_QTY"		,"�������"	    ,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("TOTAL_NEED"		,"���ʿ䷮"	    ,"t_number"  	,100.3		,70    ,false); //0
 	GridObj.AddHeader("AVL_MONTH"	   	,"�ǸŰ���\n����"	,"t_number"  	,100.3		,70    ,false); //0
 	GridObj.AddHeader("EVENT_QTY"	   	,"Event����"		,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("BASE_STOCK"	   	,"�������"		,"t_number"  	,100.3		,70    ,false); //0	
	GridObj.AddHeader("RECEIPT_EXPT"	,"M"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT2"	,"M+1"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT3"	,"M+2"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT4"	,"M+3"			,"t_number"  	,100.3		,60    ,false); //0	
	GridObj.AddHeader("RECEIPT_EXPT5"	,"M+4"			,"t_number"  	,100.3		,60    ,false); //0	
	GridObj.AddHeader("TOTAL_QTY"		,"�� �����"		,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"�ʿ� ���ַ�"		,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"���� ���ַ�"		,"t_number"  	,100.3		,70   ,true); //0
 	
	GridObj.AddGroup	("SALES_ACT",	"�����Ǹ�");
 	GridObj.AppendHeader("SALES_ACT", 	"M_0");
 	GridObj.AppendHeader("SALES_ACT",	"M_REMAIN");
 	GridObj.AppendHeader("SALES_ACT", 	"M_1");
 	GridObj.AppendHeader("SALES_ACT", 	"M_2");
 	GridObj.AppendHeader("SALES_ACT", 	"M_3");
 	GridObj.AppendHeader("SALES_ACT", 	"M_4");
 	
 	GridObj.AddGroup	("RECEIPT",		"���Կ���");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT");
 	GridObj.AppendHeader("RECEIPT",		"RECEIPT_EXPT2");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT3");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT4");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT5");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('ITEM_NAME'); 	
	
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('GUBN',  			'center');
	GridObj.SetColCellAlign('LEADTIME',  		'center');
	//GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetNumberFormat("PM_4",       	"###,###.#");
	GridObj.SetNumberFormat("PM_3",       	"###,###.#");
	GridObj.SetNumberFormat("PM_2",       	"###,###.#");
	GridObj.SetNumberFormat("PM_1",       	"###,###.#");
	GridObj.SetNumberFormat("PM_AVG",       "###,###.#");
	GridObj.SetNumberFormat("M_0",       	"###,###.#");
	GridObj.SetNumberFormat("M_REMAIN",     "###,###.#");
	GridObj.SetNumberFormat("M_1",       	"###,###.#");
	GridObj.SetNumberFormat("M_2",       	"###,###.#");
	GridObj.SetNumberFormat("M_3",       	"###,###.#");	
	GridObj.SetNumberFormat("M_4",       	"###,###.#");	
	GridObj.SetNumberFormat("SAFE_QTY",     "###,###.#");
	GridObj.SetNumberFormat("TOTAL_NEED",   "###,###.#");
	GridObj.SetNumberFormat("AVL_MONTH",    "###,###.#");
	GridObj.SetNumberFormat("EVENT_QTY",    "###,###.#");
	GridObj.SetNumberFormat("BASE_STOCK",   "###,###.#");	
	GridObj.SetNumberFormat("RECEIPT_EXPT", "###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT2","###,###.#");	
	GridObj.SetNumberFormat("RECEIPT_EXPT3","###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT4","###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT5","###,###.#");
	GridObj.SetNumberFormat("TOTAL_QTY",    "###,###.#");
	GridObj.SetNumberFormat("NEED_QTY",     "###,###.#");
	GridObj.SetNumberFormat("ORDER_QTY",    "###,###.#");
    
    //GridObj.SetColCellBgColor('ROWNUM','255|255|200');
    GridObj.SetColCellBgColor('ORDER_QTY','255|255|200');
  
	
	
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
        	
        	GridSetColor();
        	GridSetQty();
        	GridSetMerge();        
        	 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
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
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var search_type	    = document.frm.search_type.value;		//�귣�� ����
   var sales_cat05		= document.frm.sales_cat05.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           			"search");
   GridObj.SetParam("cnfm_date",   				cnfm_date);
   GridObj.SetParam("search_type",   			search_type);
   GridObj.SetParam("sales_cat05",   			sales_cat05);

   GridObj.DoQuery(servlet_url);       
}


function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};

      
// ����
function doSave() {
 
	var GridObj 	= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.frm.cnfm_date.value.replace(/-/g,"");
	version = version.substr(0,6);
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("version", version);
	
	var mergecount 	= GridObj.GetMergeCount('ITEM_ID');	
	
	for(var i =0; i < mergecount ; i++){
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		GridObj.SetCellValue("SELECTED",idx,1);		

	}
	
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.	
	GridObj.DoQuery(servlet_url, "SELECTED");	
 	
 	return;
}    


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  
	
	
	/* �����Ǹŷ� �� ������� ����� ���ʿ䷮ ���� */
	var	a = Number(nNewValue);
	var c = Number(nOldValue);
	var b = Number(GridObj.GetCellValue('TOTAL_NEED',nRow)) + a - c;	
	GridObj.SetCellValue('TOTAL_NEED',nRow,b);	
	
	
	/*�ǸŰ��ɿ��� ��� */
	var	val  = (Number(GridObj.GetCellValue('M_1',nRow)) + Number(GridObj.GetCellValue('M_2',nRow)) + Number(GridObj.GetCellValue('M_3',nRow)) + 
				Number(GridObj.GetCellValue('M_4',nRow)) + Number(GridObj.GetCellValue('M_REMAIN',nRow)))/5;	   
	var result =  Math.round(Number(GridObj.GetCellValue('TOTAL_NEED',nRow))/Number(val));	
	GridObj.SetCellValue('AVL_MONTH',nRow, result);	
	
	
	/* �ʿ� ���ַ� ��� */
	
	var need_qty = Number(GridObj.GetCellValue('TOTAL_QTY',nRow)) - Number(GridObj.GetCellValue('TOTAL_NEED',nRow));	
	if (need_qty > 0) need_qty = 0;
	GridObj.SetCellValue('NEED_QTY',nRow, need_qty );
	
	
}


function GridSetQty(){
	
	var rowcount = GridObj.GetRowCount();
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	var avl_month = 0;
	
	for(var i =0; i < rowcount; i++){
		
		a = GridObj.GetCellValue('M_REMAIN',i);
		b = GridObj.GetCellValue('M_1',i);
		c = GridObj.GetCellValue('M_2',i);
		d = GridObj.GetCellValue('M_3',i);
		f = GridObj.GetCellValue('M_4',i);
		e = GridObj.GetCellValue('SAFE_QTY',i);
		
		var qty 	= Number(a) + Number(b) + Number(c) + Number(d) + Number(f);
		var mon		= qty /5 ;
		
		if (mon === 0) mon = 1;
		var stock	= Number(GridObj.GetCellValue('RECEIPT_EXPT',i)) 	+ Number(GridObj.GetCellValue('RECEIPT_EXPT2',i)) + Number(GridObj.GetCellValue('RECEIPT_EXPT5',i)) +
				      Number(GridObj.GetCellValue('RECEIPT_EXPT3',i))	+ Number(GridObj.GetCellValue('RECEIPT_EXPT4',i)) + Number(GridObj.GetCellValue('BASE_STOCK',i));
		
		if(i%2 !== 0){
			
			 GridObj.SetCellValue('TOTAL_NEED',i,qty);
			 GridObj.SetCellValue('TOTAL_QTY',i,stock);
			 
			 var need = GridObj.GetCellValue('TOTAL_QTY',i) - GridObj.GetCellValue('TOTAL_NEED',i);
			 if (need > 0) need = 0;
			 GridObj.SetCellValue('NEED_QTY',i, need );
			 GridObj.SetCellValue('AVL_MONTH',i,GridObj.GetCellValue('TOTAL_NEED',i)/mon);
		}
		
		
		
	}
}

function GridSetColor(){
	
	var rowcount = GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		
		if(i%2 !== 0) {
			
			GridObj.SetCellBgColor('M_1', i , '255|255|200');
			GridObj.SetCellBgColor('M_2', i , '255|255|200');
			GridObj.SetCellBgColor('M_3', i , '255|255|200');
			GridObj.SetCellBgColor('M_4', i , '255|255|200');
			GridObj.SetCellBgColor('M_REMAIN', i , '255|255|200');
			GridObj.SetCellBgColor('EVENT_QTY', i , '255|255|200');
			
		}			
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,LEADTIME');
    GridObj.AddSummaryBar('SUMMARY1', 'ǰ���� ��', 'SALES_CAT03', 'sum', 'PM_4,PM_3,PM_2,PM_1,PM_AVG,M_0,M_REMAIN,M_1,M_2,M_3,M_4,SAFE_QTY,TOTAL_NEED,AVL_MONTH,'
    +'EVENT_QTY,BASE_STOCK,RECEIPT_EXPT,RECEIPT_EXPT2,RECEIPT_EXPT3,RECEIPT_EXPT4,RECEIPT_EXPT5,TOTAL_QTY,NEED_QTY,ORDER_QTY');
    
    GridObj.AddSummaryBar('SUMMARY2', '��ü ��'	, 'summaryall', 'sum', 'PM_4,PM_3,PM_2,PM_1,PM_AVG,M_0,M_REMAIN,M_1,M_2,M_3,M_4,SAFE_QTY,TOTAL_NEED,AVL_MONTH,'
    +'EVENT_QTY,BASE_STOCK,RECEIPT_EXPT,RECEIPT_EXPT2,RECEIPT_EXPT3,RECEIPT_EXPT4,RECEIPT_EXPT5,TOTAL_QTY,NEED_QTY,ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 

}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.search_type.options;
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
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
