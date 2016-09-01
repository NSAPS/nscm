//############################################################
//## ���α׷�ID 	: rp_01010_dailyTransportPlanNew_list.js
//## ���α׷��� 	: ���۰�ȹ ��ȸ �� ����
//## ������  	: ���米
//## �������� 	: 2009-04-07 ȭ����
//##
//## ���� job file 	 : job_rp_01010_dailyTransportPlanNew_list.xml
//##
//## ���� query file : query_rp_01010_dailyTransportPlanNew_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-04-07  ���米     rp_01010_dailyTransportPlanNew_list.js ����
//## 1.1		2009-05-22  ������	   mult ������ check, ���� ����߰�
//## 2.0		2013-09-04  ������	   ���ʿ��� �ҽ� ���� - �����ҽ��� ������ 20130904������ ����.
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01010_dailyTransportPlanNew_list';				// job id(���� ��, WiseGrid Header key)
var job_id2 = 'rp_01120_outOrderAdjust_list02';
var job_id3 = 'rp_01010_dailyTransportPlanNewSalesInfo_list';
var job_id4 = 'rp_01010_dailyTransportPlanNewStockInfo_list';
var job_id5 = 'rp_01010_dailyTransportBookingInfo_list';

var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;
var GridObj4;
var GridObj5;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

var oldRow = "";						//���� ��� ���� Row Index ����
var oldColor = "";
var oldRowData = "";

var delRowList = "";					// ���� ��Ҹ� �ϱ����� ������ ��� ���� ����

var saved = true;						// ���� ���� 

var rFirst = 0;							// ����, ���� ���� �۾��� ȭ�� ��ġ�� �����ϱ� ���� Row Index ���� ����
var rEnd = 0;

/******************************************          Action Function         **********************************************/
/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function GoSearch(service) {
	
	// ����, �԰���, ���۱��� �˻� ������ setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	if( versions == "" || versions == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( document.frm.tgt_loc_sel.value == "" || document.frm.tgt_loc_sel.value == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc_sel.value;
	document.frm.plan_type.value 	= document.frm.plan_type_sel.value;	

	rFirst = 0;
	oldRow = 0;
	doQuery();
	doQuery5();	
};

/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function GoSearchInfo() {

	// ����, �԰���, ���۱��� �˻� ������ setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var search_type = document.frm.search_type.value;
	
	if( versions == "" || versions == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
		
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	if(GridObj.GetActiveRowIndex() == -1) {
		alert("���� ��ȸ�� Row�� ������ �ֽʽÿ�.");
		return;
	}
	
	if( GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()) == "" ){
		//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));;
		alert("������ Row�� ��ǰ�� ���õ��� �ʾҽ��ϴ�. ��ǰ�� ���� ������ �ֽʽÿ�.");
		return;
	}
	
	//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));
	doQuery2();
	doQuery3();
	doQuery4('1');
	
};

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function GoSave(service) {
	
	// ����, �԰���, ���۱��� �˻� ������ setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
	// ====================================================================== //
	// 1���� PLT ���� �������� 12�ڽ��� �ȵɶ��� CONFIRM���� �����Ұ� ���� Ȯ���ϴ� ����
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(document.frm.tgt_loc.value != document.frm.tgt_loc_sel.value){
		alert("�۾��� �԰����� ����Ǿ����ϴ�. �ٽ���ȸ �� �۾��ϼ���!");
		return;
	}

	if(tableLen == 1){ // Total Row�� �����ϴ� ���..
		if(!confirm("�����Ͻðڽ��ϱ�?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT�� �ȵǴ� ���..
	if(check_plt_flag){
		if(!confirm("12PLT �̸��� ������ �����մϴ�. �����Ͻðڽ��ϱ�?"))
			return;
	}
	else{		
		// ��� 12PLT �̻��� ���.
		if(!confirm("�����Ͻðڽ��ϱ�?"))
			return;
	}

	// ====================================================================== //
	
	doSave(version, seq, tgt_loc, plan_type);	
};

/*������������������������������������������������������������������������
  ������ ��ư Ŭ����.
  ������������������������������������������������������������������������*/
function GoSumTruck(service) {
	
	doSumTruck();		
}

/*������������������������������������������������������������������������
  ������ ���۰�ȹ �̰�
  ������������������������������������������������������������������������*/
function GoSaveEtc() {

	if( !saved ){
		
		alert("���� ������ �ϰ� �̰��� �Ͻʽÿ�.");
		return;
	}
	
	// ����, �԰���, ���۱��� �˻� ������ setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
		
	// ====================================================================== //
	// 1���� PLT ���� �������� 12�ڽ��� �ȵɶ��� CONFIRM���� �����Ұ� ���� Ȯ���ϴ� ����
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(tableLen == 1){ // Total Row�� �����ϴ� ���..
		if(!confirm("�����Ͻðڽ��ϱ�?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT�� �ȵǴ� ���..
	if(check_plt_flag){
		if(!confirm("12PLT �̸��� ������ �����մϴ�. �����Ͻðڽ��ϱ�?"))
			return;
	}
	else{		
		// ��� 12PLT �̻��� ���.
		if(!confirm("�����Ͻðڽ��ϱ�?"))
			return;
	}

	// ====================================================================== //
	
	doSaveEtc(tgt_loc, plan_type);	
};

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid �ʱ�ȭ
  ������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// �⺻ property ����
	setDefault(GridObj);  			// �߰� property ����
	setHeader();   			// Header ����
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2(GridObj2);  			// �߰� property ����
	setHeader2();   			// Header ����
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); 	// �⺻ property ����
	setDefault2(GridObj3);  			// �߰� property ����
	setHeader3();   			// Header ����
			
}

function init4() {
	
	GridObj4 = document.WiseGrid4;
	
	setProperty(GridObj4); 	// �⺻ property ����
	setDefault2(GridObj4);  			// �߰� property ����
	setHeader4();   			// Header ����			
}

function init5() {
	
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5); 	// �⺻ property ����
	setDefault2(GridObj5);  			// �߰� property ����

	GridObj5.bUserContextMenu 	= true;					//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj5.bHDMoving 		 	= false;                //����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj5.bHDSwapping 	 	= false;                //����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj5.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj5.bRowSelectorIndex   = false;				//Row Selector ������ Row Index�� �����ش�. 
	
	GridObj5.strRowBorderStyle   = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj5.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj5.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj5.bStatusbarVisible = true;				// status bar visible
    
	setHeader5();   			// Header ����	
}


/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault(GridObj){ 
	
	GridObj.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bHDMoving = false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj.bRowSelectorVisible = false;        	//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	//Hearder ����
	GridObj.nHDLineSize   = 15; //15
	
	// Grid �� ����
    GridObj.nRowHeight    = 20; 
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
    
    //����ڰ� �÷��� ����� �����ϴ� ������ �����Ѵ�.     
    GridObj.strHDSizing = 'none'; 	//[ none | free | sync ] 
    
    //����ڰ� �ο��� ����� �����ϴ� ������ �����Ѵ�. 
    GridObj.strRowSizing = 'fixed';  //[ fixed | free | sychronized | autofree | autofixed ]

	GridObj.strMouseWheelAction='default'; // page ���� scroll ->�⺻�� 'default'     
    
}
 
function setDefault2(GridObj){ 
	GridObj.bStatusbarVisible = false; 				//Statusbar�� WiseGrid���� ���� �� �ִ�. 	

	// Hearder ���� 
	GridObj.nHDLineSize   = 22; //24
	
	GridObj.strHDClickAction = 'sortsingle'; 		//Ŭ���� �÷��� ��� ���� �����Ѵ�. 

    //����ڰ� �÷��� ����� �����ϴ� ������ �����Ѵ�.     
    GridObj.strHDSizing = 'free'; 	//[ none | free | sync ] 
	
}

/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
}

function setHeader2() 
{        
    commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader2); 
}

function setHeader3() 
{        
    commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader3); 
}

function setHeader4() 
{        
    commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader4); 
}

function setHeader5() 
{        
    defaultHeader5();		
    //commonUtil.getCodeList("job_id", job_id5 , "gird_header_list",defaultHeader5); 
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	GridObj.AddGroup("CUM_TOT", "������������");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("CUM_TOT", "CUM_PLT");
	GridObj.AppendHeader("CUM_TOT", "CUM_BOX");
		
	GridObj.AddGroup("BASE_STK", "�⺻������");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("BASE_STK", "BASE_STK_PLT");
	GridObj.AppendHeader("BASE_STK", "BASE_STK_BOX");
	
	GridObj.AddGroup("ADD_STK", "�߰�����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("ADD_STK", "ADD_STK_PLT");
	GridObj.AppendHeader("ADD_STK", "ADD_STK_BOX");
	
	GridObj.AddGroup("PROD", "�������");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("PROD", "PROD_PLT");
	GridObj.AppendHeader("PROD", "PROD_BOX");
	
	GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
	
	GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	
	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("BOX_PER_PALET", true);
	GridObj.SetColHide("PLAN_TYPE", true);
	
	GridObj.SetNumberFormat("TRUCK_SEQ", "##"); // ���� ����
	GridObj.SetNumberFormat("CUM_PLT"  , "##0.00");
	GridObj.SetNumberFormat("CUM_BOX"  , "###,##0");
	GridObj.SetNumberFormat("BASE_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("BASE_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("ADD_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("ADD_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("PROD_PLT"  , "##0.00");
	GridObj.SetNumberFormat("PROD_BOX"  , "###,##0");	  
	
	GridObj.SetDateFormat("TRANS_DATE", "yyyy-MM-dd");         
	
	GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
}

function defaultHeader2(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	commonUtil.getSelQeury( "", "", "dailyTransportPlanSchPlan_dateList",{
		callback:function(result){
						
			if(result.length > 0){
				for( i = 0 ; i < result[0].length ; i++ ){
					if( i == 0 ){
						GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);
						GridObj2.AppendHeader("HEADER_DATE" + i, "D01");
					}
					else{
			    		GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);			//�׸��忡 �׷��� ����Ѵ�. 
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH1");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH3");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH5");
					}
				}
			}
			
			GridObj2.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
			GridObj2.SetColHide("ITEM", true);
			
			GridObj2.SetColFix('PLANT_NAME');		    
		}
	});           
}

function defaultHeader3(result)
{
	var arrHeader = '';
	
	
	
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj3.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}

	GridObj3.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
		
	GridObj3.SetNumberFormat('BS_STOCK'     , "###,###,###"); // ���� ����
	GridObj3.SetNumberFormat('D00_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('D00_STK'		, "###,###,###");
	GridObj3.SetNumberFormat('D01_STK'   	, "###,###,###");
	GridObj3.SetNumberFormat('ITP_QTY'		, "###,###,###");
	GridObj3.SetNumberFormat('TP_QTY'       , "###,###,###");
	GridObj3.SetNumberFormat('NUM_STK'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLR'   	, "###,###,###");
	GridObj3.SetNumberFormat('AVG_SLR'  	, "###,###,###");
	GridObj3.SetNumberFormat('SAFETY_STOCK' , "###,###,###");
        
}

function defaultHeader4(result)
{
	var arrHeader = '';
	
  	GridObj4.AddHeader("ITEM_NAME"			,"��ǰ��"      	,"t_text" 	,100		,160  ,false); //0   
  	GridObj4.AddHeader("STOCK_DAY"			,"����ϼ�"    	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("SALES_MEAN_3WEEK"	,"3�����" 		,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("STOCK_QTY"			,"�����ܷ�"      	,"t_number" ,100.3		,55  ,false); //0    �����ܷ�
  	GridObj4.AddHeader("TRQTY_EX"			,"�������"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj4.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
		
	GridObj4.SetNumberFormat("STOCK_DAY", "##0.0"); // ���� ����
	GridObj4.SetNumberFormat("STOCK_QTY", "###,###,##0");
	GridObj4.SetNumberFormat("TRQTY_EX", "###,###,##0");
        
}

function defaultHeader5(result)
{
	var arrHeader = '';
	
  	GridObj5.AddHeader("ITEM_CODE"			,"��ǰ�ڵ�"      	,"t_text" 	,100		,65  ,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"			,"��ǰ��"      	,"t_text" 	,100		,180  ,false); //0   
  	GridObj5.AddHeader("STOCK_QTY"			,"���"      	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj5.AddHeader("ORDER_DATE"			,"��������"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ETD_DATE"			,"��������"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ORDER_QTY"			,"�ֹ�����"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj5.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 

	GridObj5.SetColCellAlign('ORDER_DATE', 'center');
	GridObj5.SetColCellAlign('ITEM_CODE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
		
	GridObj5.SetNumberFormat("ORDER_QTY", "###,###,##0");
        
}


/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "search");
	
	//-- ������ ������ �Ķ���� ���� --//
		
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("plan_type", plan_type);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("trans_end", trans_end);
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj.SetParam("query_id", job_id);
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);
}

function doQuery2() {//�����ȹ
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "search");
	
	//-- ������ ������ �Ķ���� ���� --//
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", version);
	GridObj2.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url);
}

function doQuery3() {//�԰��� �Ǹ�����
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "search3");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url);
}

function doQuery4(flag) {//����� �������
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj4.SetParam("mode", "search4");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var src_loc;

	var search_type = document.frm.search_type.value; //�ϴ� �׸��� 3�� ��ȸ ����
	GridObj4.SetParam("search_type", search_type);

	src_loc = document.frm.src_loc_sel.value;
	var tgt_loc = document.frm.tgt_loc.value;
	//alert("src_loc : " + src_loc + ", tgt_loc : " + tgt_loc);
	
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("version", version);
	GridObj4.SetParam("seq", seq);
	GridObj4.SetParam("src_loc", src_loc);
	GridObj4.SetParam("tgt_loc", tgt_loc);
	
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj4.SetParam("query_id", job_id4);
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj4.DoQuery(servlet_url);
}

function doQuery5() {//���� �۾��� ��������
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj5.SetParam("mode", "search5");
	
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_start = document.frm.trans_start.value;
	
	GridObj5.SetParam("version", version);
	GridObj5.SetParam("tgt_loc", tgt_loc);
	GridObj5.SetParam("trans_start", trans_start);

	// query_id
	GridObj5.SetParam("query_id", job_id5);
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj5.DoQuery(servlet_url);
}


/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave(version, seq, tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");
	
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq",seq);
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*������������������������������������������������������������������������
  ������ ���۰�ȹ �̰�
  ������������������������������������������������������������������������*/
function doSaveEtc(tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "saveEtc");
	
	//-- ������ ������ �Ķ���� ���� --//
	GridObj.SetParam("version","20000000.01.01");
	GridObj.SetParam("seq","1");
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	
	var version2 = document.frm.version.value;
	var seq2 = document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");
 
}

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSumTruck() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "sumTruck");
	
	//-- ������ ������ �Ķ���� ���� --//
	// ���õ� ������ 
	// ��������, �����, ��������
	if( oldRow != 0 && oldRow == "" ){
		alert(" ���� ���� ����� ���� �Ͻʽÿ�.");
		return;
	}
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_date = GridObj.GetCellValue("TRANS_DATE", oldRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", oldRow);
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", oldRow);
	//var item_id = GridObj.GetCellValue("ITEM_ID", oldRow);
	var user_id = document.frm._user_id.value;
	//alert("������"+tgt_loc);
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("trans_date",trans_date);
	GridObj.SetParam("src_loc",src_loc);
	GridObj.SetParam("truck_seq",truck_seq);
	GridObj.SetParam("user_id",user_id);
		
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

/*������������������������������������������������������������������������
  ������ ��� �� �ٽ� ��ȸ
  ������������������������������������������������������������������������*/
function doQuerySumTruck(){
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "searchSumTruck");
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�

	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var user_id = document.frm._user_id.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var version = document.frm.version.value;
	
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	GridObj.SetParam("user_id", user_id);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("version", version);
	
	//alert("������"+tgt_loc);
		
	// query_id
	GridObj.SetParam("query_id", "do_sum_truck");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);	
}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*��������������������������������������������������������������������������������
  ��	WiseGrid ��� �� Grid ���� �� ���� Fnc
  ��������������������������������������������������������������������������������*/
function GridEndQuery() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj.GetStatus() != "true") {
		var error_msg_extra = GridObj.GetMessage();// ?
		//alert("(GridObj)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

	setGrid(GridObj); //WiseGrid ����
			
	//
	var endMode = GridObj.GetParam("mode");

	if(endMode == "search") { //��ȸ
		if(GridObj.GetStatus() == "true") { // 
			var paramKey = "tgt_loc";
			var paramCode = document.frm.tgt_loc.value;
			var queryId = "rp_01010_dailyTransportPlan_list_capa";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.max_capa.value = numberFormat(result);
					}			
				}
			}); 
			
			var version = document.frm.version.value;
			var seq = document.frm.seq.value;
			var tgt_loc = document.frm.tgt_loc.value;
			var plan_type = document.frm.plan_type.value;
			
			paramKey = "version!%!seq!%!tgt_loc!%!plan_type";
			paramCode = version + "!%!" + seq + "!%!"
							+ tgt_loc + "!%!" + plan_type;
			queryId = "rp_01010_dailyTransportPlan_list_stock";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.estimate_stock.value = numberFormat(result);
					}			
				}
			}); 	
			
			    
			// ������ ������ Row�� �̵�
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount())){
				//GridObj.MoveRow(rFirst);
				GridObj.SetRowScroll(rFirst);
			}			
			
			// ��ȣ set
			setNo();
			
			// ������ ����Ʈ �ʱ�ȭ
			delRowList = "";
			
			saved = true;
					
			GridObj.focus();
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(endMode == "insert") {
		
	} else if(endMode == "update") {
		
	} else if(endMode == "delete") {
		
	}else if(endMode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();	
			GridObj.focus();		
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "sumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
			doQuerySumTruck();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "searchSumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
//			alert(GridObj.GetCellHiddenValue("CRUD", 0));
//			alert(GridObj.GetCellHiddenValue("CRUD", 1));
//			alert(GridObj.GetCellHiddenValue("CRUD", 2));
			var rowCnt = GridObj.GetRowCount();
			for ( i = 0 ; i < rowCnt ; i++ ){
				var str = GridObj.GetCellHiddenValue("RTE", i);
				if( str == 'DE' ){
					//alert("!!");
					GridObj.DeleteRow(i);
					GridObj.SetRowHide(i, true); 
				}
				else if( str == 'AD' ){
					GridObj.SetCellValue("CRUD", i, "AD");
				}
				else if( str == 'UP' ){
					GridObj.SetCellValue("CRUD", i, "UP");
				}
			}
			
			// ������ ������ Row�� �̵�
			//GridObj.MoveRow(rFirst);
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
				GridObj.SetRowScroll(rFirst); 
			
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( oldRowData == GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + 
									GridObj.GetCellValue("TRUCK_SEQ", i) + GridObj.GetCellValue("ITEM_ID", i)){
					oldColor = GridObj.GetCellInfo( 'bgcolor', 'NO', i );
					
					// ������ �ο� ���� ����
					//GridObj.SetRowBgColor( i, color_select_row );
					
					// ���� ������� ���õ� Row select
					GridObj.MoveRow(i);
					
					GridObj.SetCellFocus('BASE_STK_PLT', i, false);
					
					oldRow = i;
					break;
				}
			}			
			
			// ������ ����Ʈ �ʱ�ȭ
			delRowList = "";
			
			saved = false;
			
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		
		// ��ȣ set
		setNo();

	}else if(endMode == "saveEtc") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}

	}else if(endMode == "Regen100" || endMode == "Regen200" || endMode == "Regen300"){
		if(GridObj.GetStatus() == "true") {// 
		alert("�ڵ� ���������� �Ϸ� �Ǿ����ϴ� ��ȸ�� �۾��� �������ֽñ� �ٶ��ϴ�.");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
    }
}

function GridEndQuery2() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj2.GetStatus() != "true") {
		var error_msg_extra = GridObj2.GetMessage();// ?
		//alert("(GridObj2)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

	setGrid2(GridObj2); //WiseGrid ����
			
	//
	var mode = GridObj2.GetParam("mode");

	if(mode == "search") { //��ȸ
		if(GridObj2.GetStatus() == "true") { // 
			var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", GridObj.GetActiveRowIndex());	
			var rowCnt = GridObj2.GetRowCount();
			for( i = 0 ; i < rowCnt ; i++ ){
				if( GridObj2.GetCellHiddenValue("PLANT_NAME", i) == src_loc ){
					GridObj2.MoveRow(i);
					GridObj2.SetRowScroll(i);
				}
			}		
		} else	{ 
			var error_msg = GridObj2.GetMessage(); // 
			alert(error_msg);			
		}
	} 
}

function GridEndQuery3() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj3.GetStatus() != "true") {
		var error_msg_extra = GridObj3.GetMessage();// ?
		//alert("(GridObj3)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

	setGrid3(GridObj3); //WiseGrid ����
			
	//
	var mode = GridObj3.GetParam("mode");

	if(mode == "search3") { //��ȸ
		if(GridObj3.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj3.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}
}

function GridEndQuery4() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj4.GetStatus() != "true") {
		var error_msg_extra = GridObj4.GetMessage();// ?
		//alert("(GridObj4)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

	setGrid4(GridObj4); //WiseGrid ����
			
	//
	var mode = GridObj4.GetParam("mode");

	if(mode == "search4") { //��ȸ
		if(GridObj4.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj4.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		
	}
}

function GridEndQuery5() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj5.GetStatus() != "true") {
		var error_msg_extra = GridObj5.GetMessage();// ?
		//alert("(GridObj5)�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}

//	setGrid5(GridObj5); //WiseGrid ����
			
	//
	var mode = GridObj5.GetParam("mode");

	if(mode == "search5") { //��ȸ
		if(GridObj5.GetStatus() == "true") { // 
			
			GridObj5.SetGroupMerge(	'ITEM_CODE,ITEM_NAME,STOCK_QTY');
			GridObj5.AddSummaryBar('SUMMARY', '�Ұ�', 'ITEM_NAME', 'custom', 'STOCK_QTY,ORDER_QTY'); 
			GridObj5.SetSummaryBarFunction('SUMMARY', 'max', 'STOCK_QTY');
			GridObj5.SetSummaryBarFunction('SUMMARY', 'sum', 'ORDER_QTY');
			GridObj5.SetSummaryBarColor('SUMMARY', '0|0|0', '212|212|212'); 
			 						
		} else	{ 
			var error_msg = GridObj5.GetMessage(); // 
			alert(error_msg);			
		}
		
	}
		
}

/*������������������������������������������������������������������������
  ��WiseGrid ����
  ������������������������������������������������������������������������*/
function setGrid(){
	
	// �÷� ����
	GridObj.SetColCellBgColor('SP01',color_sp);//���м�
	GridObj.SetColCellBgColor('SP02',color_sp);
	GridObj.SetColCellBgColor('SP03',color_sp);
	GridObj.SetColCellBgColor('SP04',color_sp);
	
	// �÷� ���м� ���� �ȵǰ� ����.
	GridObj.SetColCellActivation('SP01','disable'); 
	GridObj.SetColCellActivation('SP02','disable');
	GridObj.SetColCellActivation('SP03','disable');
	GridObj.SetColCellActivation('SP04','disable');
	
    // ����� ���л�
    setSrcLocBgColor();

	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
    
    // �հ� ���� �� ���� �ȵǰ� ����.
    var rowCnt = GridObj.GetRowCount();
    var str = GridObj.GetCellValue("SRC_LOC", rowCnt-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowCnt-1, color_tot); // row ����
    	GridObj.SetCellFontBold('SRC_LOC', rowCnt-1, 'true'); // font ����  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowCnt-1, 'disable'); //������ �� ���� ������ �� ����. 
    		
    	}    	
    }

}

function setGrid2(){
	
	// �հ�
	GridObj2.AddSummaryBar('SUMMARY1', '��ü�հ�', 'summaryall', 'sum', 'AVAIL,TRANS,STOCK,D01,D02SH1,D02SH3,D02SH5,D03SH1,D03SH3,D03SH5,D04SH1,D04SH3,D04SH5,D05SH1,D05SH3,D05SH5,D06SH1,D06SH3,D06SH5,D07SH1,D07SH3,D07SH5'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '223|223|223'); 
			
	GridObj2.SetNumberFormat("AVAIL", "###,###,###"); // ���� ����
	GridObj2.SetNumberFormat("TRANS", "###,###,###"); // ���� ����
	GridObj2.SetNumberFormat("STOCK", "###,###,###"); // ���� ����
	GridObj2.SetNumberFormat("D01", "###,###,###"); // ���� ����
	GridObj2.SetNumberFormat("D02SH1", "###,###,###");
	GridObj2.SetNumberFormat("D02SH3", "###,###,###");
	GridObj2.SetNumberFormat("D02SH5", "###,###,###");
	GridObj2.SetNumberFormat("D03SH1", "###,###,###");
	GridObj2.SetNumberFormat("D03SH3", "###,###,###");
	GridObj2.SetNumberFormat("D03SH5", "###,###,###");
	GridObj2.SetNumberFormat("D04SH1", "###,###,###");
	GridObj2.SetNumberFormat("D04SH3", "###,###,###");
	GridObj2.SetNumberFormat("D04SH5", "###,###,###");
	GridObj2.SetNumberFormat("D05SH1", "###,###,###");
	GridObj2.SetNumberFormat("D05SH3", "###,###,###");
	GridObj2.SetNumberFormat("D05SH5", "###,###,###");
	GridObj2.SetNumberFormat("D06SH1", "###,###,###");
	GridObj2.SetNumberFormat("D06SH3", "###,###,###");
	GridObj2.SetNumberFormat("D06SH5", "###,###,###");
	GridObj2.SetNumberFormat("D07SH1", "###,###,###");
	GridObj2.SetNumberFormat("D07SH3", "###,###,###");
	GridObj2.SetNumberFormat("D07SH5", "###,###,###");
    
}

function setGrid3(){
	
	// row ����
	GridObj3.SetRowBgColor(0, '223|223|223');
	
}

function setGrid4(){
	
	// row ����
    var rowCnt = GridObj4.GetRowCount();
	
	if(rowCnt > 0 ){
	GridObj4.SetRowBgColor(0, '223|223|223');
	GridObj4.SetColCellSortEnable('STOCK_QTY',true);
	}
	
}

/*********************************************   WiseGrid Event   *********************************************************/ 
/*������������������������������������������������������������������������
  ��WiseGrid Mouse Over Event
  ������������������������������������������������������������������������*/
function GridMouseOverHandler(strType, strColumnKey, nRow){ 

};

/*����������������������������������������������������������������������������������
  ��WiseGrid User Context Menu Click Event
  ����������������������������������������������������������������������������������*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
			insertRow( nRow );	
			// ����� ���� ���� �ٽ� ����
			setSrcLocBgColor();		
			// ���� ��� �ٽ� ��.
			calAllCum();
			// ��ȣ set
			setNo();
		}
		else if( strMenuItemKey == "MENU02" ){	// ROW ����
			if(confirm("���� �Ͻðڽ��ϱ�?") == true){
				if(GridObj.GetCellValue("NO", nRow) != ""){
					GridObj.DeleteRow(nRow);
					GridObj.SetRowHide(nRow, true); 
					//GridObj.DeleteRow(nRow, false); 		
				}else{
					GridObj.DeleteRow(nRow);
				}
				// ���� ��� �ٽ� ��.
				calAllCum();
				// ��ȣ set
				setNo()
			}
		}
		else if( strMenuItemKey == "MENU03" ){	// ���� ���

		}
		else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}		
	}

};

/*����������������������������������������������������������������������������������
  ������ ��� Fnc
  ����������������������������������������������������������������������������������*/
function unDo(){
	
	if( delRowList == "" ){
		alert("������ ���� �����ϴ�.");
		return;
	}
	var list = delRowList.split("!%!");
	//alert(list[list.length-1]); 
	var idx = list[list.length-1];
	GridObj.SetRowHide(idx, false);
	GridObj.SetCellValue("CRUD", idx, "");
	GridObj.SetCellHiddenValue("CRUD", idx, "");
	GridObj.SetCellValue("SELECTED", idx, "0" );
	var idx = delRowList.lastIndexOf("!%!");
	delRowList = delRowList.substr(0,idx);
	//alert(delRowList);
}

/*����������������������������������������������������������������������������������
  ���� �߰�/���� Fnc
  ����������������������������������������������������������������������������������*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj.GetActiveRowIndex();
	
	if( str == "�߰�" ){		// ROW �߰�
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// ����� ���� ���� �ٽ� ����
		setSrcLocBgColor();		
		// ���� ��� �ٽ� ��.
		calAllCum();
		// ��ȣ set
		setNo();
	}
	else if( str == "����" ){	// ROW ����
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("������ ���� ������ �ֽʽÿ�.");
//			return;
//		}
		if(confirm("���� �Ͻðڽ��ϱ�?") == true){
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( GridObj.GetCellValue("SELECTED", i) == "1" ){
					if(GridObj.GetCellValue("NO", i) != ""){
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					}else{
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
					}
					
					if( delRowList == "" ){// ���� ����Ʈ�� Row Index �߰�
						delRowList += "" + i;
					}else{
						delRowList += "!%!" + i;
					}					
				}
			}
			// ����� ���� ���� �ٽ� ����
			setSrcLocBgColor();	
			// ���� ��� �ٽ� ��.
			calAllCum();
			// ��ȣ set
			setNo()
		}
	}
	
	saved = false;

};

/*����������������������������������������������������������������������������������
  ���� ��Ƽ���� Fnc
  ����������������������������������������������������������������������������������*/
function rowInsSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // ������ �κ��� key�� row�� �����´�
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // ���̻� ������ ����
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//�ش� row�� check�� �Ѵ�
			GridObj.SetCellValue("SELECTED", rowNo, "1");
		}
		i++;
	}
}

/*����������������������������������������������������������������������������������
  ���� ��Ƽ���� ��� Fnc
  ����������������������������������������������������������������������������������*/
function rowInsDeSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // ������ �κ��� key�� row�� �����´�
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // ���̻� ������ ����
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//�ش� row�� check�� �Ѵ�
			GridObj.SetCellValue("SELECTED", rowNo, "0");
		}
		i++;
	}
}


/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	// ����� ���� ���� �ٽ� ����
	setSrcLocBgColor();
	
	getBoxPerPalet( nRow ); // ������ϰ�� box_per_palet ����

	// ���� ��� �ٽ� ��.
	calAllCum();
	
	saved = false;
};

/*������������������������������������������������������������������������
  ��WiseGrid4 Duble Click Event - 4�� �׸��� ��ǰ�� Ŭ���� ���� ����ȭ�鿡 �ű� �߰� 
  ������������������������������������������������������������������������*/
function GridCellDblClickHandler4(strColumnKey, nRow){
	var idx = GridObj.GetActiveRowIndex(); // ���õ� Row�� �ε���
	
	insertRow( idx ); // ���õ� Row �ؿ� ���ο� Row �߰�
	
	GridObj.SetCellValue("ITEM_ID", idx+1, GridObj4.GetCellHiddenValue("ITEM_NAME", nRow));
	GridObj.SetCellValue("ITEM_NAME", idx+1, GridObj4.GetCellValue("ITEM_NAME", nRow));

	cnt = idx+1;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", idx));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", idx));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	// ����� ���� ���� �ٽ� ����
	setSrcLocBgColor();
	
	// ���� ��� �ٽ� ��.
	calAllCum();
	// ��ȣ set
	setNo()
	
	getBoxPerPalet( idx+1 );
};
/*������������������������������������������������������������������������
  ��WiseGrid4  Click Event  �ش� ǰ�� ��ȸ  - �׽�Ʈ searchinfo
  ������������������������������������������������������������������������*/
function Grid4CellDblClickSearch(strColumnKey, nRow){
//alert(strColumnKey);

	if(strColumnKey == "ITEM_NAME" ){
		GridCellDblClickHandler4(strColumnKey, nRow);
		return
	}else{
		
	}	
	var item_id = GridObj4.GetCellHiddenValue("ITEM_NAME", nRow)
	
	doQuery10(item_id);
	doQuery11(item_id);
};

function doQuery10(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "search");
	
	var item_id ;
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", version);
	GridObj2.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url);
}

function doQuery11(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "search3");
	
	var item_id ;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��WiseGrid Row Scroll Event
  ������������������������������������������������������������������������*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}

//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	// �⺻������, �߰�������, ������� PLT �� BOX ���� �����
	// �հ� �� ���� ��� �� PLT, BOX ���� ����
	if(strColumnKey.lastIndexOf("PLT") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT") >= 0 ) {
			changePLT( strColumnKey, nRow, nOldValue, nNewValue ); // �հ� �� �����հ� ��� PLT
			calBoxQty( strColumnKey, nRow );					 // BOX ���� ����
		} // �հ� �� �����հ� ��� PLT
		else {
			changeBOX( strColumnKey, nRow, nOldValue, nNewValue ); // �հ� �� �����հ� ��� BOX
			calPltQty( strColumnKey, nRow );					 // BOX ���� ����
		}
		
		saved = false;
	}
	
	// ��������, �������� ����� 
	// ����� ���� ���� �ٽ� ���� �� ���� �� ���	
	if( strColumnKey == "TRANS_DATE" || strColumnKey == "TRUCK_SEQ"){
		
		// ����� ���� ���� �ٽ� ����
		setSrcLocBgColor();
		
		// ���� ���� ���� �ٽ� ���
		// ������  �׷�(��������, �����, ��������) ���� ��
		// ���� �׷�(��������, �����, ��������) �� �����Ѵ�.
		var next_nRow = calCum(nRow); // ����� ��������, �����, ���������� �ش��ϴ� ������ ���
		
		calCum(next_nRow);            // ����� ��������, �����, ���������� ���� ��������, �����, ���������� �ش��ϴ� ������ ���
		
		if( strColumnKey == "TRANS_DATE" ) {
			getBoxPerPalet( nRow ); // ������ϰ�� box_per_palet ����
			GridObj.SetCellHiddenValue("TRANS_DATE", nRow, nOldValue); // ���� �������� ����
		}
		
		calAllCum(); // ���� ��� �ٽ���
		// ��ȣ set
		setNo();
		
		saved = false;
	}
	
	// ��ǰ �ڵ� ����� 
	if( strColumnKey == "ITEM_ID" ){
		
		// box_per_palet ����
		getBoxPerPalet( nRow );
		
		// ��ǰ �� set
		getItemInfo( nRow, nNewValue );
		
		saved = false;
	}
	
}

/*��������������������������������������������������������������������������������������������������������������
  ������� ���� �Է°����κ��� ��ǰ���� ��ȸ
  ����ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻� Fnc
  ��������������������������������������������������������������������������������������������������������������*/
function getItemInfo( nRow, nNewValue ) {
	
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var ItemId = nNewValue;
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == "" || dc_id == null ) {
		alert("������� ���� �����ϼ���.");
		return;
	}
	
	// ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("ITEM_ID", nRow);
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// ��ġ�ϴ� ��� 1��
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
/*������������������������������������������������������������������������
  ��WiseGrid Cell Click Event
  ������������������������������������������������������������������������*/

function GridCellClick(strColumnKey, nRow){

	if( strColumnKey == "NO" ){
		GoSearchInfo();
	}	
	
	oldRowData = GridObj.GetCellValue("TRANS_DATE", nRow) + GridObj.GetCellHiddenValue("SRC_LOC", nRow)
					+ GridObj.GetCellValue("TRUCK_SEQ", nRow) + GridObj.GetCellValue("ITEM_ID", nRow);
	oldRow = nRow;
	
	// ó�� ������� ���õǾ� ���� ���� ��쿡�� �Ʒ��� ���� ó��. 
	if(document.frm.src_loc_sel.value == null || document.frm.src_loc_sel.value == ""){
		document.frm.src_loc_sel.value = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	}
	
}

/*������������������������������������������������������������������������
  ��WiseGrid Cell Duble Click Event
  ������������������������������������������������������������������������*/
function GridCellDblClickHandler(strColumnKey, nRow){

	var findrow = GridObj5.FindArea(GridObj.GetCellValue("ITEM_ID", nRow),'ITEM_CODE',0,'ITEM_CODE',GridObj5.GetrowCount()-1);
	findrow = findrow.split(",")[1];
	GridObj5.MoveRow(findrow); 
	GridObj5.SetCellFocus('ITEM_CODE', findrow, false);

	GridObj.SetCellFocus('ITEM_ID', nRow, false);
	// ��ǰ �ڵ� �÷��̸� ��ǰ �˻� �˾� ����
//	if( strColumnKey == "ITEM_ID" ){
//		openItemSearchPop( strColumnKey, nRow );
//	}
	
};

/*********************************************   ��Ÿ Function   **********************************************************/

/*������������������������������������������������������������������������
  ���԰��� select box ���� Fnc
  ������������������������������������������������������������������������*/
function doChangeVersion(){
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	
	var paramKey = "version!%!seq";
	var paramCode = version + "!%!" + seq;
	var queryId = "trans_dc_id_and_short_name_list_new";
	
	commonUtil.getSelQeury(paramKey, paramCode, queryId,{
		callback:function(result){
						
			if(result.length > 0){
				var divTgt = "<select name=\"tgt_loc_sel\" style=\"width:160px; \" >";
				divTgt += "<option value=\"\">����</option>"
				
				for( i = 0 ; i < result.length; i++ ){
					divTgt += "<option value=\"" + result[i][0] + "\" ";
					if( result[i][2] == "Y" ){// �ѹ� �̻� ����� �԰��� ��������� ǥ��
						divTgt += "style=\"background-color:#ffffaa; \" ";
					}
					
					if( tgt_loc == result[i][0]){
						divTgt += "selected>";
					}else{
						divTgt += ">";
					}
					
					divTgt += result[i][1] + "</option>";
				}				
                																
                divTgt += "</select>"
                
                divTgtLoc.innerHTML = divTgt;
				
			}else{
				alert("�԰��� ����Ʈ�� �������� ���߽��ϴ�.");
			}			
		}
	});
}

/*������������������������������������������������������������������������
  ����ȣ Fnc
  ������������������������������������������������������������������������*/
function setNo(){
	var rowCnt = GridObj.GetRowCount()-1;
	var cnt = 1;
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", 0);
	for( i = 0 ; i < rowCnt ; i++ ){
		
		if( !GridObj.IsRowHide(i) ){// ������ Row�� �ƴϸ� ��ȣ �ű�
			GridObj.SetCellValue("NO", i, cnt++);
		}
		var temp = GridObj.GetCellValue("TRUCK_SEQ", i+1);
		if( truck_seq != temp ){// ���� ������ �ٲ���
			cnt = 1; //��ȣ �ʱ�ȭ
			truck_seq = temp; // ���� ���� ����
		}
	}
}

/*������������������������������������������������������������������������
  ������ ��� ��ü Fnc
  ������������������������������������������������������������������������*/
function calAllCum(){
	var rowCnt = GridObj.GetRowCount();
	var cnt = 0;
	var pltCum = 0;
	var boxCum = 0;	
	
	do{
		if( GridObj.GetCellValue("CRUD", cnt) != 'DE' ){
			pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
			boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
			GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
			GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxCum));
			
			if(GridObj.GetCellHiddenValue("CUM_PLT", cnt) == "CUM"){
				// ���� �� ���� ���� �ʱ�ȭ
				pltCum = 0;
				boxCum = 0;
			}
		}
		cnt++;
	}
	while(cnt < rowCnt);
	
}

/*������������������������������������������������������������������������
  ������� ���� ���� set Fnc
  ������������������������������������������������������������������������*/
function setSrcLocBgColor(){
	// ����� ���л�
	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
	
	var str = GridObj.GetCellValue("TRANS_DATE", 0)
				  + GridObj.GetCellHiddenValue("SRC_LOC", 0)
				  + GridObj.GetCellValue("TRUCK_SEQ", 0);
	
	var colBg = colBg01; //���� ���� ��
	
	// ����庰 ���� �հ� flag �� ���ڻ� �ʱ�ȭ
	for( i = 0 ; i < rowLeng ; i++ ){
		GridObj.SetCellFgColor('CUM_PLT', i, '0|0|0'); 
		GridObj.SetCellFgColor('CUM_BOX', i, '0|0|0');
		GridObj.SetCellHiddenValue("CUM_PLT", i, "");
		GridObj.SetCellHiddenValue("CUM_BOX", i, "");
	}
	
	var preIdx = 0;
	for( i = 0 ; i < rowLeng ; i++ ){
		if(GridObj.GetCellHiddenValue("RTE", i) == 'DE' || GridObj.GetCellValue("CRUD", i) == 'DE'){ 
			continue; 
		}else{
			//�۾��庰 ����(row����)
			if( str != GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i) ){		
				GridObj.SetCellFgColor('CUM_PLT', preIdx, '255|10|10'); // �������� ���� ����庰 ������ ���� ���ڻ� ����
				GridObj.SetCellFgColor('CUM_BOX', preIdx, '255|10|10');
				
				GridObj.SetCellHiddenValue("CUM_PLT", preIdx, "CUM"); // ���� �հ� ���� ����ϱ� ���� flag ����
				GridObj.SetCellHiddenValue("CUM_BOX", preIdx, "CUM");
					
				str = GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i);
				if(colBg == colBg01) {
					colBg = colBg02;				
				}
				else {
					colBg = colBg01;				
				}
			}
	
			for( j = 0; j < GridObj.GetColCount(); j++){
				// �÷����м�
				if(GridObj.GetColHDKey(j).substr(0,2) == "SP"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color_sp); 
				}						
				// ���� ���� ����
				else{
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
				}			
			}
			//GridObj.SetRowBgColor(i, colBg); // row ���� ����				
			
	//		if( i == rowLeng-1 ){// �׷� �� ������ Row�� ���� ���� ��� ���� �հ� ���ڻ��� ���� �ȵǾ...
	//			var idx = rowLeng-2;
	//			//var flag = true;
	//			while(1){
	//				if(GridObj.GetCellValue("CRUD", idx) != "DE"){
	//					GridObj.SetCellFgColor('CUM_PLT', idx, '255|10|10'); // �������� ���� ����庰 ������ ���� ���ڻ� ����
	//					GridObj.SetCellFgColor('CUM_BOX', idx, '255|10|10');
	//					
	//					GridObj.SetCellHiddenValue("CUM_PLT", idx, "CUM"); // ���� �հ� ���� ����ϱ� ���� flag ����
	//					GridObj.SetCellHiddenValue("CUM_BOX", idx, "CUM");
	//					break;
	//				}
	//				idx--;
	//			}
	//		}
			preIdx = i;
		}
	}
	
	var str = GridObj.GetCellValue("SRC_LOC", rowLeng-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowLeng-1, color_tot); // row ����
    	GridObj.SetCellFontBold('SRC_LOC', rowLeng-1, 'true'); // font ����  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowLeng-1, 'disable'); //������ �� ���� ������ �� ����. 
    		
    	}    	
    }
}

/*����������������������������������������������������������������������
  ������ ���� ���� ������ ��� Fnc
  ������������������������������������������������������������������������*/
function calCum(nRow){
	// ���� ���� ���� ���
	var cnt = nRow;
	var pltCum = 0;
	var boxCum = 0;
	do{
		pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt))
				  + Number(GridObj.GetCellValue("PROD_PLT", cnt));
				  
		boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt))
				  + Number(GridObj.GetCellValue("PROD_BOX", cnt));
				  
		GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
		GridObj.SetCellValue("CUM_BOX", cnt, boxCum);
	}while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	return cnt; // ������ ���� ���� ���� row �ε��� ����
}


/*������������������������������������������������������������������������
  ��PLT ���� ���� Fnc
  ������������������������������������������������������������������������*/
function changePLT(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_PLT"; // �հ� �� �����հ� ��� PLT
	
	var diff = nNewValue - nOldValue;
	
	var rowCnt = GridObj.GetRowCount();
	
	// ���� ���� ���� �հ�
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// ����� �÷� �հ�
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, Math.round(tot + diff));
	
	// ���� ���� ���� ���
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));	

}

/*������������������������������������������������������������������������
  ��BOX ���� ���� Fnc
  ������������������������������������������������������������������������*/
function changeBOX(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_BOX"; // �հ� �� �����հ� ��� PLT
	
	var diff = nNewValue - nOldValue;
	//alert(diff);	
	var rowCnt = GridObj.GetRowCount();
	
	// ���� ���� ���� �հ�
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// ����� �÷� �հ�
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, tot + diff);
	
	// ���� ���� ���� ���
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));

}

/*������������������������������������������������������������������������
  ��Box ���� ���  Fnc
  ������������������������������������������������������������������������*/
function calBoxQty( strColumnKey, nRow ) {
	
	var col_name = strColumnKey.replace("PLT","");
	var nOldValue = GridObj.GetCellValue(col_name + "BOX", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj.SetCellValue(col_name + "BOX", nRow, boxQty);
	
	// ���� ���� ���� �� �հ� ���
	changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*������������������������������������������������������������������������
  ��PLT ���� ���  Fnc
  ������������������������������������������������������������������������*/
function calPltQty( strColumnKey, nRow ) {
	var col_name = strColumnKey.replace("BOX","");
	var nOldValue = GridObj.GetCellValue(col_name + "PLT", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
	GridObj.SetCellValue(col_name + "PLT", nRow, pltQty);
	
	// ���� ���� ���� �� �հ� ���
	changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*������������������������������������������������������������������������
  ��box_per_palet ���� Fnc
  ������������������������������������������������������������������������*/
function getBoxPerPalet( nRow ) {
	
	// �����, ��ǰ�ڵ� ����
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}

/*������������������������������������������������������������������������
  ��WiseGrid Insert Row Fnc
  ������������������������������������������������������������������������*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // ���ڸ� ������ ��� 
		GridObj.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj.InsertRow(0);
		nRow = -1;
	}
	else{
		GridObj.InsertRow(nRow+1);
	}
	
	// �⺻ ������ ����
	if(nRow == -1){
		GridObj.SetCellValue("RTE", 0, "");
		GridObj.SetCellValue("TRANS_DATE", 0, "");
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", 0, "");
		GridObj.SetCellValue("TRUCK_SEQ", 0, "");
		GridObj.SetCellValue("PLAN_TYPE", 0, "");	
	}else{
		GridObj.SetCellValue("RTE", nRow+1, GridObj.GetCellValue("RTE", nRow));
		GridObj.SetCellValue("TRANS_DATE", nRow+1, GridObj.GetCellValue("TRANS_DATE", nRow));
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", nRow+1, GridObj.GetCellHiddenValue("SRC_LOC", nRow));
		GridObj.SetCellValue("TRUCK_SEQ", nRow+1, GridObj.GetCellValue("TRUCK_SEQ", nRow));
		GridObj.SetCellValue("PLAN_TYPE", nRow+1, GridObj.GetCellValue("PLAN_TYPE", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", nRow));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", nRow));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while( (GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < rowCnt));
};

// Total Plt �ݱ�
function closeTotalPlt() {
	if( divTotalPlt.style.display == "BLOCK" 
		|| divTotalPlt.style.display == "block" ) {
		divTotalPlt.style.display = "none";
	} 
	
	// wisegrid �ٽ� ���̰� ��.
	document.WiseGrid.style.display = "block";
	document.WiseGrid2.style.display = "block";
	document.WiseGrid3.style.display = "block";
	document.WiseGrid4.style.display = "block";
}

// Total Plt ����
function openTotalPlt() {

	// wisegrid �� ���̰� ��.
	document.WiseGrid.style.display = "none";
	document.WiseGrid2.style.display = "none";
	document.WiseGrid3.style.display = "none";
	document.WiseGrid4.style.display = "none";
	
	var tableLen = GridObj.GetRowCount();
	var pltTableLen = plt_tbody.rows.length;
	var v_trans_date = null;
	var v_src_loc = null;
	var v_src_name = null;
	var v_truck_seq = 0;
	var v_cum_plt = 0;
	var insertRow = 0;
	
	// Row�� �������� �ʴ� ���.
	if(tableLen == 1){
		alert("���� PLT�� ����� ����Ÿ�� �������� �ʽ��ϴ�.");
		return;
	}	
	else{	
		// ���� ���� Row ����
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}
		// ��ü Row�� �ϳ��� �о� �����鼭 ���� �ʴ� ���� div�� �߰���.
		for(var i = 0; i< tableLen-1; i++){
			if( GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
				// �ʼ� �Է°��� �Է����� ���� ���, ���� ���� ���� ���� ����.
				if(GridObj.GetCellValue("TRANS_DATE", i) == "" || GridObj.GetCellValue("TRANS_DATE", i) == null
				|| GridObj.GetCellValue("SRC_LOC", i) == "" || GridObj.GetCellValue("SRC_LOC", i) == null
				|| GridObj.GetCellValue("TRUCK_SEQ", i) == "" || GridObj.GetCellValue("TRUCK_SEQ", i) == null){
					alert("��������, �����, ������ȣ�� ��Ȯ�� �Է��Ͻ� �� �ٽ� Ŭ���� �ֽʽÿ�.");
					return;
				}
				v_trans_date = GridObj.GetCellValue("TRANS_DATE", i);
				v_src_loc    = GridObj.GetCellHiddenValue("SRC_LOC", i);
				v_src_name   = GridObj.GetCellValue("SRC_LOC", i);
				v_truck_seq  = GridObj.GetCellValue("TRUCK_SEQ", i);
				v_cum_plt    = GridObj.GetCellValue("CUM_PLT", i);
				
				var oRowPlt = plt_tbody.insertRow(insertRow);
				insertRow ++;
				oRowPlt.height = 22; 
						
				var oCell0 = oRowPlt.insertCell(); // ��������
				var oCell1 = oRowPlt.insertCell(); // �����
				var oCell2 = oRowPlt.insertCell(); // ������ȣ
				var oCell3 = oRowPlt.insertCell(); // PLT
				
				oCell0.align = "center"; oCell0.width = "29%" ; // ��������
				oCell1.align = "center"; oCell1.width = "25%" ; // �����
				oCell2.align = "center"; oCell2.width = "25%" ; // ������ȣ
				oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
				oCell3.className = "right"; // ������� BOX
				
				// ��ȣ
				//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
				//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
				
				// ��������
				oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
								+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
				// �����
				oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
								+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
				// ������ȣ
				oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
								+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
				// PLT
				oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
								+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
				document.recalc();
			}				
		}// end for
		
	}// end if
	
	var pltTransLen = plt_tbody.rows.length;
	
	if(pltTransLen > 1){ // Row ���� 1�� �̻��� ��쿡�� �ߺ��Ǵ� ���� �ִ��� üũ
		for(var i = 0; i < pltTransLen; i++){
			for(var j = i + 1; j < pltTransLen; j++){
				if(document.frm.v_trans_date[j]){
					if(document.frm.v_trans_date[i].value == document.frm.v_trans_date[j].value
					&& document.frm.v_src_loc[i].value == document.frm.v_src_loc[j].value
					&& document.frm.v_truck_seq[i].value == document.frm.v_truck_seq[j].value){
						var cum_plt_tmp = strToNum(document.frm.v_cum_plt[i].value) + strToNum(document.frm.v_cum_plt[j].value);
						cum_plt_tmp = Math.round(numberFormat(cum_plt_tmp.toString(),2)*100)/100;
						document.frm.v_cum_plt[i].value = cum_plt_tmp;
					
						plt_tbody.deleteRow(j);
						j--;
						pltTransLen--;
					}
				}
			}
			if(strToNum(document.frm.v_cum_plt[i].value) < 12)
				document.frm.v_cum_plt[i].style.color = "red";
		}
	}
	else{
		if(document.frm.v_cum_plt[0]){
			if(strToNum(document.frm.v_cum_plt[0].value) < 12)
				document.frm.v_cum_plt[0].style.color = "red";
		}
		else{
			if(strToNum(document.frm.v_cum_plt.value) < 12)
				document.frm.v_cum_plt.style.color = "red";
		}
	}
	
	// div�� display�� block���� ����
	if( divTotalPlt.style.display == "NONE" 
		|| divTotalPlt.style.display == "none" ) {
		divTotalPlt.style.display = "block";
	} 
}

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
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
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	document.WiseGrid5.height = tableHeightValue + "px"; 
	
}

/*������������������������������������������������������������������������
  ����ǰ �˻� POPUP  Fnc
  ������������������������������������������������������������������������*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	
	if( src_loc == "" || src_loc == null ) {
		alert("������� ���� �����ϼ���.");
		return;
	}
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}


//------------------------------------------------- ������ �Լ� ------------------------------------------------------//

// Ctrl Ű�� keydown �������� üũ�ϴ� flag
var ctrlKeyDownCheck = false;

// CTRL  Ű�� �������� ȣ��
function setCtlKeyDown(e){
	if (!e) e = window.event;
	
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = true;
	}
}

// CTRL Ű, F2 Ű�� �����ٰ� �������� ȣ��
function setCrlKeyUp(e){
	if (!e) e = window.event;
	
	// F2 Ű
	if(e.keyCode == "113"){
		//clickLine(document.frm.btnSearchRow, 1);
		//GoSearchInfo();
		//rowInsDel(document.frm.btnInsertRow); // Row�߰� 
		//alert("!!");
	}
	
	// ctrl Ű 
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = false;
	}
}


// version - seq �и�
function setVersions( versions ) {

	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

/********************************************************************************************/
// divTotalPlt �κ� (���ο� divâ ó��)
/********************************************************************************************/

var checkMouseDown = false;
var dragobject = null;
var tx;
var ty;

// ���õ� ȭ�� ��ü�߿� parentNode�� �������� ã�Ƴ��� ����.
function getReal(el) {
	temp = el;

	while ((temp != null) && (temp.tagName != "BODY")) {
		if (temp.id == "totalPltHeader"){
			el = temp.parentElement;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

// Mouse ���� Ű�� �������.
function move_mousedown() {
	var el = getReal(window.event.srcElement)
	if (el.id == "divTotalPlt") {
		dragobject = el;
		checkMouseDown = true;

		ty = window.event.clientY - getTopPos(dragobject);
		tx = window.event.clientX - getLeftPos(dragobject);

		window.event.returnValue = false;
		window.event.cancelBubble = true;
		//dragobject.filters.alpha.opacity=77;
	}
	//alert(ty+" "+tx);
}

// Mouse ���� Ű�� �����.
function move_mouseup() {
	dragobject = null;
	checkMouseDown = false;
}

// Mouse ���� Ű�� �������¿��� ������ ���..
function move_mousemove() {
	if(checkMouseDown){
		if (dragobject) {
			if (window.event.clientX >= 0 && window.event.clientY >= 0) {
				dragobject.style.left = window.event.clientX - tx + "px";
				dragobject.style.top = window.event.clientY - ty + "px";
				//alert(dragobject.style.left);
				//dragobject.filters.alpha.opacity=77;
			}
			window.event.returnValue = false;
		}
	}
}

function getLeftPos(el) {
	return el.style.pixelLeft;
}

function getTopPos(el) {
	return el.style.pixelTop;
}

// �ش� �÷��׿����� �������� ���� ����
function doCheckFlag(obj){
	
	if(obj.name == "sort_type_chk" ){ 
		if(obj.checked){
				document.frm.sort_type.value = "Y";// �Ͱ��� �������� ��ȸ
		}else{
				document.frm.sort_type.value = "N";//���� �������� ��ȸ
		}
	}
	if(obj.name == "sort_stock_day_chk" ){ 
		if(obj.checked){
				document.frm.sort_stock_day.value = "Y";// ����ϼ��������� ����
		}else{
				document.frm.sort_stock_day.value = "N";// ������ ���̵� ������ ����
		}
	}
	if(obj.name == "search_type_chk" ){ // ���� �ʿ� ǰ�� ��ȸ
		if(obj.checked){
				document.frm.search_type.value = "Y";
		}else{
				document.frm.search_type.value = "N";
		}
	}

}


//������������������������������������������������������������������������
//�����۰�ȸ ���� :
//| �ܼ��� ���۰�ȹ �������� �� ����Ǿ� �ִ� trans_plan_sync ���̺��� �����͸� TRANS_PLAN�� �����Ŀ� �����Ѵ�. 2013.09.04 ������ 
//������������������������������������������������������������������������*/
function GoRepairPlan() {

	// ����, �԰���, ���۱��� �˻� ������ setting
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var seq = document.frm.seq.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var user_id = document.frm._user_id.value;
	

	if( version == "" || version == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("�԰����� ������ ��ȸ�� ���ֽʽÿ�..");
		return;
	}

	var tgt_name;
	var sync_flag;
	var in_paramKey = "version!%!tgt_loc";
	var in_paramCode = version+"!%!"+tgt_loc;

	var in_paramKey_1 = "version!%!tgt_loc!%!seq!%!plan_type!%!trans_start!%!trans_end!%!user_id";
	var in_paramCode_1 = version+"!%!"+tgt_loc+"!%!"+seq+"!%!"+plan_type+"!%!"+trans_start+"!%!"+trans_end+"!%!"+user_id;

		commonUtil.getCodeInfo(in_paramKey,in_paramCode,"Repair_Plan_Chk", 
		{ 
			callback:function(arrList)
			{
				if( arrList.length == 1 )
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
				else
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
							
				if(sync_flag == "N"){
					if(!confirm(tgt_name+"�� ���۰�ȹ�� ����ȭ ���� �ʾҽ��ϴ�. ���۰�ȹ�� ���� �Ͻðڽ��ϱ�??")){
						return;
					}
				}else{ //sync_flag == "N"�� �ƴҼ��� ����!!!!!!! �ٲٴ� �κ��� �������� ����. 2013.09.04 ������ 
					if(!confirm(tgt_name+"�� ���۰�ȹ�� ���� �Ͻðڽ��ϱ�??")){
						return;
					}
				}
				//////////////////////////////////////////////////////////
				commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_1",{
					callback:function(result){
						if(result == "SUCCESS"){
						}
						else{
							alert("��ȹ ������ ���� �Ͽ����ϴ� .");
							return;
						}
						commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_2", {
							callback:function(result){
								if(result == "SUCCESS"){
								}
								else{
									alert("��ȹ ������ ���� �Ͽ����ϴ� .");
									return;
								}
								/*  TRANS_PLAN_TEMP�� ������� �ʱ� ������ �Ʒ� Repair_Trans_Plan_3�� �����ϴ� ���� �ǹ̾��� 2013.09.04 ������
								commonUtil.executeQuery(in_paramKey_1, in_paramCode_1, "Repair_Trans_Plan_3", {
									callback:function(result){
										if(result == "SUCCESS"){
										alert(tgt_name+"�� ��ȹ ������ �����Ͽ����ϴ�. ��ȸ ��ư�� ������ �۾��� ���ֽñ� �ٶ��ϴ�");
										}
										else{
										alert("��ȹ ������ ���� �Ͽ����ϴ� .");
										return;
										}
									}
								});*/
								
							}
						});
					}
				});
				//////////////////////////////////////////////////////////
			}


		});//commonUtil.getCodeInfo end

}

/*������������������������������������������������������������������������
  ���ڵ� ���� ����
  ������������������������������������������������������������������������*/
function GoTransPlanRegen(obj) {
	var objname		= obj.name;
	// ����, �԰���, ���۱��� �˻� ������ setting
	var version		= document.frm.version.value;
	var seq			= document.frm.seq.value;
	var trans_start	= document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;

	if( version == "" || version == null ) {
		alert("������ �����ϼ���.");
		return;
	}

	if(!confirm(version+"������ �ڵ� ���� ������ �ǽ��մϴ� . ���� �۾��� �ǽ�  �Ͻðڽ��ϱ�??")){
		return;
	}
	
	doTransPlanRegen(version, seq, trans_start, trans_end, objname);	
};


/*������������������������������������������������������������������������
  ���ڵ� ���� ���� ����
  ������������������������������������������������������������������������*/
function doTransPlanRegen(version, seq, trans_start, trans_end, objname) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	if(objname == "btnTransRegen100"){
		GridObj.SetParam("mode", "Regen100");
	}else if(objname == "btnTransRegen200"){
		GridObj.SetParam("mode", "Regen200");
	}else if(objname == "btnTransRegen300"){
		GridObj.SetParam("mode", "Regen300");
	}
		
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq","1");
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	var version2	= document.frm.version.value;
	var seq2		= document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.doQuery(servlet_url);
 
}

