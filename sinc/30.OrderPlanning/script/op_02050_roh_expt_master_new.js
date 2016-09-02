//## ���α׷�ID		: op_02050_roh_expt_master_new.js
//## ���α׷���		: ���ֿ��� ��������
//## ������			: �̰���
//## ��������			: 2015-12-16
//##
//## ���� job file	: job_sinc_30_orderPlanning_03.xml
//## ���� query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-01-10  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'op_02050_roh_expt_master_new';
var GridObj ; 													// WiseGrid ��ü

var GridObj3;
var GridObj4;


var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����

var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

var rFirst = 0;							// ����, ���� ���� �۾��� ȭ�� ��ġ�� �����ϱ� ���� Row Index ���� ����
var rEnd = 0;

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
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
  

function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ���� 
}

function init4() {
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader4(GridObj4);  	//�ش����� 
	setDefault4();        	//ȭ�� �⺻ ���� 
}   

function init5() {
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader5(GridObj5);  	//�ش����� 
	setDefault5();        	//ȭ�� �⺻ ���� 
}

function init7() {
	GridObj7 = document.WiseGrid7;
	setProperty(GridObj7);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader7(GridObj7);  	//�ش����� 
	setDefault7();        	//ȭ�� �⺻ ���� 
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
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor		= "232|245|213";		//���õ� ���� �������� �����Ѵ�.
	GridObj.strHDClickAction		= "sortsingle";   
    
   
 

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
	

	    
}

function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj3.nHDLineSize			= 13;					//Header Size
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strActiveRowBgColor		= "232|245|213";		//���õ� ���� �������� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj3.nCellFontSize			= 9;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 
    GridObj3.nHDLines				= 2;

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj4.nHDLineSize			= 12;					//Header Size 
    GridObj4.strActiveRowBgColor		= "232|245|213";		//���õ� ���� �������� �����Ѵ�.
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj4.nCellFontSize			= 9;					// Font Size 9					// Font Size 9
}
function setDefault5() { 

	GridObj5.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj5.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj5.nHDLineSize			= 12;					//Header Size
    GridObj5.bStatusbarVisible		= false;				// status bar visible
    GridObj5.strActiveRowBgColor		= "232|245|213";		//���õ� ���� �������� �����Ѵ�.
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj5.strSelectedCellFgColor = '180|82|205';
    GridObj5.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj5.nCellFontSize			= 9;					// Font Size 9
}

function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        			//�ο� �����͸� WiseGrid���� �����,. 
	GridObj7.bRowSelectorIndex		= true;						//Row Selector ������ Row Index�� �����ش�.
    GridObj7.nHDLineSize			= 12;						//Header Size
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        			//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj7.strActiveRowBgColor		= "232|245|213";		//���õ� ���� �������� �����Ѵ�.
	GridObj7.nCellFontSize			= 9;							// Font Size 9
	GridObj7.bStatusbarVisible		= true;						// status bar visible ���¹� ����
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60  	,false);
	GridObj.AddHeader("ITEM_ID"				,"ǰ���ȣ"       	,"t_text" 		,20		,60  	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"			,"ǰ���"      		,"t_text" 		,100	,190 	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"�⺻\n����"     	,"t_text" 		,100	,0  	,false); //0
 	GridObj.AddHeader("MFS_FLAG"			,"����\n�׷�"     	,"t_text" 		,100	,0   	,false); //0	40 ->0���� ����
 	GridObj.AddHeader("LEAD_TIME"			,"L/T"     			,"t_number" 	,100.3	,0   	,false); //0	33 ->0���� ����
 	GridObj.AddHeader("TERM_VAL"			,"����\n����"     	,"t_number" 	,100.3	,0  	,false); //0   
 	GridObj.AddHeader("ANYANG"				,"�Ⱦ�"      		,"t_number" 	,100.3	,55  	,false); //0   
 	GridObj.AddHeader("KUMI"				,"����"      		,"t_number" 	,100.3	,55  	,false); //0 
 	GridObj.AddHeader("PUSAN"				,"�λ�"      		,"t_number" 	,100.3	,55  	,false); //0  	
 	GridObj.AddHeader("SJP"					,"SJP"   			,"t_number" 	,100.3	,55  	,false); //0  
 	GridObj.AddHeader("SINHYO"				,"��ȿ"   			,"t_number" 	,100.3	,55  	,false); //0   
 	GridObj.AddHeader("HJIN"				,"����"   			,"t_number" 	,100.3	,55  	,false); //0  
 	GridObj.AddHeader("CNFM_STOCK"			,"����"     			,"t_number" 	,100.3	,55  	,false); //0 ���� �������
 	
 	GridObj.AddHeader("SJP_GIJUN"			,"SJP"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("SINHYO_GIJUN"		,"��ȿ"     			,"t_number"		,100.3	,55    	,true); //0 	
 	GridObj.AddHeader("HJIN_GIJUN"			,"����"     			,"t_number"		,100.3	,55    	,true); //0
 	
 	GridObj.AddHeader("SUB_TOT"				,"�Ұ�"     			,"t_number" 	,100.3	,65  	,false); //0
	GridObj.AddHeader("ODER_QTY"			,"����\n�ҿ䷮"     	,"t_number" 	,100.3	,65  	,false); //0
	GridObj.AddHeader("W1_STOCK"			,"������\n���"     	,"t_number" 	,100.3	,65  	,false); //0 	
  	GridObj.AddHeader("SEL_DMD"				,"����"     			,"t_combo"		,100	,0    	,false); //0	
 	GridObj.AddHeader("DMD_QTY"				,"����"     			,"t_number"		,100.3	,0    	,false); //0
 	GridObj.AddHeader("DMD03"				,"3����\n���"     	,"t_number"		,100.3	,65   	,false); //0 	
 	GridObj.AddHeader("DMD04"				,"����\n����"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD05"				,"���\n(12����)"    ,"t_number"		,100.3	,65   	,false); //0 	
 	GridObj.AddHeader("DMD06"				,"����\n��뷮"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD07"				,"3��\n���"     		,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("DMD08"				,"�����"     		,"t_number"		,100.3	,60   	,false); //0 	   
 	GridObj.AddHeader("USE_DAY"				,"������"     		,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("USE_QTY"				,"����\n�ʿ䷮"     	,"t_number"		,100.3	,65   	,false); //0
 	GridObj.AddHeader("MIN_LOT_SIZE"		,"����\n����"     	,"t_number"		,100.3	,0    	,false); //0
 	GridObj.AddHeader("FC_QTY"				,"����\n����"     	,"t_number"		,100.3	,55    	,false); //0
 	GridObj.AddHeader("SJP_EXPT"			,"SJP"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("SINHYO_EXPT"			,"��ȿ"     			,"t_number"		,100.3	,55    	,true); //0 	
 	GridObj.AddHeader("HJIN_EXPT"			,"����"     			,"t_number"		,100.3	,55    	,true); //0
 	GridObj.AddHeader("MSG"					,"���"				,"t_text" 		,100	,90    	,false); //0   ������ ����
 	
	/* ���� �ش� �߰� */
	GridObj.AddGroup("HD1",			"���");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1", 	"ANYANG");
	GridObj.AppendHeader("HD1", 	"KUMI");
	GridObj.AppendHeader("HD1", 	"PUSAN");
	
	GridObj.AddGroup("HD2",			"��ü");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD2", 	"HJIN");	
	GridObj.AppendHeader("HD2", 	"SJP");
	GridObj.AppendHeader("HD2", 	"SINHYO");
	GridObj.AppendHeader("HD2", 	"CNFM_STOCK");
	
	GridObj.AddGroup("HD3",			"������ ����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD3", 	"SINHYO_EXPT");
	GridObj.AppendHeader("HD3", 	"SJP_EXPT");
	GridObj.AppendHeader("HD3", 	"HJIN_EXPT");	
	
	GridObj.AddGroup("HD4",			"������ ����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD4", 	"SINHYO_GIJUN");
	GridObj.AppendHeader("HD4", 	"SJP_GIJUN");
	GridObj.AppendHeader("HD4", 	"HJIN_GIJUN");
	
//	/* ���� �ش� �߰� */
//	GridObj.AddGroup("HD2"			,"�׷캰 ������");			//�׸��忡 �׷��� ����Ѵ�. 
//	GridObj.AppendHeader("HD2", 		"SEL_DMD");
//	GridObj.AppendHeader("HD2", 		"DMD_QTY");
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',		'center');
    GridObj.SetColCellAlign('MFS_FLAG',		'center');
    GridObj.SetColCellAlign('LEAD_TIME',	'center');
    GridObj.SetColCellAlign('TERM_VAL',		'center');     
    GridObj.SetColCellAlign('CNFM_STOCK',	  'right');	//���� ������� = Ȯ�����
	GridObj.SetColCellAlign('SUB_TOT',		 'right');       
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    GridObj.SetColCellAlign('SEL_DMD',		'left');
    GridObj.SetColCellAlign('DMD_QTY',		 'right');    
    GridObj.SetColCellAlign('DMD03',		 'right');
    GridObj.SetColCellAlign('DMD04',		 'right');
    GridObj.SetColCellAlign('DMD05',		 'right');    
    GridObj.SetColCellAlign('DMD06',		 'right');
    GridObj.SetColCellAlign('DMD07',		 'right');    
    GridObj.SetColCellAlign('DMD08',		 'right');
    GridObj.SetColCellAlign('USE_DAY',		 'right');	// ������
	GridObj.SetColCellAlign('USE_QTY',		 'right');  // ���� �ʿ䷮      
	GridObj.SetColCellAlign('MIN_LOT_SIZE',	 'right');	//���ִ���
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//���ֿ���
    GridObj.SetColCellAlign('MSG',		 	 'left');

	GridObj.SetColFix('ITEM_NAME');

  	GridObj.SetNumberFormat("ANYANG", 			"#,##0");	
  	GridObj.SetNumberFormat("KUMI", 			"#,##0");	
  	GridObj.SetNumberFormat("PUSAN", 			"#,##0");	
  	GridObj.SetNumberFormat("SINHYO", 			"#,##0");	
  	GridObj.SetNumberFormat("SJP", 				"#,##0");	
  	GridObj.SetNumberFormat("HJIN", 			"#,##0");	
  	GridObj.SetNumberFormat("SINHYO_EXPT", 		"#,##0");	
  	GridObj.SetNumberFormat("SJP_EXPT", 		"#,##0");	
  	GridObj.SetNumberFormat("HJIN_EXPT", 		"#,##0"); 
  	GridObj.SetNumberFormat("SINHYO_GIJUN", 	"#,##0");	
  	GridObj.SetNumberFormat("SJP_GIJUN", 		"#,##0");	
  	GridObj.SetNumberFormat("HJIN_GIJUN", 		"#,##0"); 
    GridObj.SetNumberFormat("CNFM_STOCK", 		"#,##0");	//���� �������
    GridObj.SetNumberFormat("SUB_TOT", 			"#,##0");
    GridObj.SetNumberFormat("ODER_QTY", 		"#,##0");
    GridObj.SetNumberFormat("W1_STOCK", 		"#,##0");    
    GridObj.SetNumberFormat("DMD_QTY", 			"#,##0");    
    GridObj.SetNumberFormat("DMD03", 			"#,##0");
    GridObj.SetNumberFormat("DMD04", 			"#,##0");
    GridObj.SetNumberFormat("DMD05", 			"#,##0");    
    GridObj.SetNumberFormat("DMD06", 			"#,##0");
    GridObj.SetNumberFormat("DMD07", 			"#,##0");    
    GridObj.SetNumberFormat("DMD08", 			"#,##0");
	GridObj.SetNumberFormat("USE_DAY", 			"#,##0");
	GridObj.SetNumberFormat("USE_QTY", 			"#,##0");	
    GridObj.SetNumberFormat("MIN_LOT_SIZE", 	"#,##0");
    GridObj.SetNumberFormat("FC_QTY", 			"#,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.	
	GridObj.SetColHide("CRUD",true);
}

/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){

    var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", 			nRow);
    var sel_item_id		= GridObj.GetCellValue("ITEM_ID", 					nRow);
    var sel_item_name	= GridObj.GetCellValue("ITEM_NAME", 				nRow);
    var mfs_flag		= GridObj.GetCellValue("MFS_FLAG", 					nRow); //���ֱ׷�
    var dmd_qty			= strToNum(GridObj.GetCellValue("DMD_QTY", 			nRow));
    var dmd03			= strToNum(GridObj.GetCellValue("DMD03", 			nRow)); //3���� ���
    var dmd04			= strToNum(GridObj.GetCellValue("DMD04", 			nRow)); //���� ����
    var dmd05			= strToNum(GridObj.GetCellValue("DMD05", 			nRow)); //���� 12����
    var dmd06			= strToNum(GridObj.GetCellValue("DMD06", 			nRow)); //���� ��뷮
    var dmd07			= strToNum(GridObj.GetCellValue("DMD07", 			nRow)); //3�� ���
    var dmd08			= strToNum(GridObj.GetCellValue("DMD08", 			nRow)); //�����
    
				if(sel_dmd =="DMD03"){ //3�������
						dmd_qty = dmd03;
						
				}else if(sel_dmd =="DMD04"){ //���⵿��
						dmd_qty = dmd04;
						
				}else if(sel_dmd =="DMD05"){ //���(12����)
						dmd_qty = dmd05;
							
				}else if(sel_dmd =="DMD06"){ //���(12����)
						dmd_qty = dmd06;
						
				}else if(sel_dmd =="DMD07"){
						dmd_qty = dmd07;	//3�� ���
						
				}else if(sel_dmd =="DMD08"){
						dmd_qty = dmd08;	//�����
				}	else{
					dmd_qty =0;
				}			
		
			if(mfs_flag=="A"){
				dmd_qty	=	Math.round(dmd_qty *1);	
			} else if(mfs_flag=="B"){
				dmd_qty	=	Math.round(dmd_qty *2);
			} else{
				dmd_qty	=	Math.round(dmd_qty *3);
			}

	
		GridObj.SetCellValue("DMD_QTY",		nRow,		  dmd_qty);
	
	
	use_day_qty_cal(nRow);
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //dmd_qty
	
	if(strColumnKey == "DMD_QTY"){
		
		GridObj.SetComboSelectedIndex("SEL_DMD",		nRow,				5);	// ����� ������ �Է� �� SEL_DMD ���� ����ڷ� �ڵ� �����.
		GridObj.SetCellValue("DMD08",					nRow,		nNewValue);	//����� �Է� �� -> DMD08�� Setting
		
	}

}


function setHeader3(GridObj3) {        

  	GridObj3.AddHeader("CONS_ITEM_ID"	,"�����ڵ�"      	,"t_text" 		,10			,80		,false); //0   
  	GridObj3.AddHeader("CONS_ITEM_NAME"	,"�����"       	,"t_text" 		,100		,140	,false); //0   
  	GridObj3.AddHeader("UNIT"			,"����"       	,"t_text" 		,100		,60  	,false); //0   
  	GridObj3.AddHeader("PRE_STD_STOCK"	,"�������"      	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_FC_QTY"		,"���ֿ���"       ,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_IPGO"		,"�԰�"      	,"t_number" 	,100.3		,80  	,false); //0    
  	GridObj3.AddHeader("NOW_EXPT"		,"���ֿ���"		,"t_number" 	,100.3		,80  	,false); //0   ȭ�� ����
  	GridObj3.AddHeader("SIL_STOCK"		,"�����"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("DIFF_QTY"		,"������"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("CNFM_STOCK"		,"Ȯ�����" 		,"t_number" 	,100.3		,80  	,false); //0   
	 	    
	
	/* ���� �ش� �߰� */
	GridObj3.AddGroup("HD1"	,"����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj3.AppendHeader("HD1",   	"PRE_STD_STOCK");
	GridObj3.AppendHeader("HD1",  	"PRE_FC_QTY");
	GridObj3.AppendHeader("HD1", 	"PRE_IPGO");	
	
	GridObj3.BoundHeader();	

    GridObj3.SetColCellAlign('CONS_ITEM_ID',	'center'); 
    GridObj3.SetColCellAlign('CONS_ITEM_NAME',	  'left'); 
	GridObj3.SetColCellAlign('UNIT',			'center');
    GridObj3.SetColCellAlign('PRE_STD_STOCK',	 'right'); 
    GridObj3.SetColCellAlign('PRE_FC_QTY',		 'right'); 
    GridObj3.SetColCellAlign('PRE_IPGO',		 'right'); 
    GridObj3.SetColCellAlign('NOW_EXPT',		 'right'); 
    GridObj3.SetColCellAlign('SIL_STOCK',		 'right'); 
    GridObj3.SetColCellAlign('DIFF_QTY',		 'right'); 
    GridObj3.SetColCellAlign('CNFM_STOCK',		 'right');     
    
    GridObj3.SetNumberFormat("PRE_STD_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_FC_QTY", 		"#,##0");
    GridObj3.SetNumberFormat("PRE_IPGO",		"#,##0");
    GridObj3.SetNumberFormat("NOW_EXPT",		"#,##0");    
	GridObj3.SetNumberFormat("SIL_STOCK", 		"#,##0");
    GridObj3.SetNumberFormat("DIFF_QTY",		"#,##0");
    GridObj3.SetNumberFormat("CNFM_STOCK",		"#,##0");

}

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	
	if(week_flag =="M"){ //����
	  	GridObj4.AddHeader("GUBN"		,"���� ����"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"�����"   			,"t_text" 	,100	,60 	,false); //0	
	}else {//W �ְ� 
  		GridObj4.AddHeader("GUBN"		,"�ְ� ����"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"�����"   			,"t_text" 	,100	,60 	,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //����
		var header_id = "op_02050_Long_Term_Planning_list_dw4_header";	
	}else {//W �ְ� 
			
			var header_id = "op_02050_Long_Term_Planning_list_dw4_weekly_header";	
			
		}	

	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){

			for(var i=0 ; i < 9 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
			if(week_flag =="M"){ //����
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}else {//W �ְ� 
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}	
			
			GridObj4.SetNumberFormat("MM_0_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_1_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_2_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_3_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_4_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_5_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_6_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_7_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_8_QTY"  , "#,##0");

			doQuery4();  			
				
		}
			
	});	
	
}

function setHeader5(GridObj5) {        
       
  	GridObj5.AddHeader("ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 	,10		,0  	,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,130  	,false); //0   
 	GridObj5.AddHeader("GUBN"		,"����"      ,"t_text" 	,100	,56  	,false); //0   
 	GridObj5.AddHeader("QTY"		,"��뷮"    	,"t_number" ,100.3	,86  	,false); //0   
 	GridObj5.AddHeader("YYYY_MM"	,"��"     	,"t_text" 	,1000	,56 	,false); //0   

	GridObj5.BoundHeader();	

    GridObj5.SetNumberFormat("QTY"  , "#,##0");

    GridObj5.SetColCellAlign('ITEM_ID',	'center'); 
    GridObj5.SetColCellAlign('GUBN',	'center'); 
    GridObj5.SetColCellAlign('YYYY_MM',	'center');     

}

function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("EVEN_DATE"	,"�������"  	,"t_text" 		,20		,70   ,false); //0
  	GridObj7.AddHeader("PROD_CODE"	,"ǰ���ڵ�"  	,"t_text" 		,10		,30   ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 		,100	,90   ,false); //0   
  	GridObj7.AddHeader("E_QTY"		,"�̸�Ʈ"  	,"t_number" 	,100.3	,60   ,false); //0   
  	GridObj7.AddHeader("H_QTY"		,"Ȩ�÷���"  	,"t_number" 	,100.3	,60  ,false); //0   
 	GridObj7.AddHeader("L_QTY"		,"�Ե���Ʈ"	,"t_number" 	,100.3	,60   ,false); //0   
 	   

	GridObj7.BoundHeader();	
    
    GridObj7.SetColCellAlign('EVEN_DATE',	'center');
    GridObj7.SetColCellAlign('PROD_CODE',	  'left');
    GridObj7.SetColCellAlign('ITEM_NAME',	  'right');

	GridObj7.SetColCellAlign('E_QTY',		 'right');
    GridObj7.SetColCellAlign('H_QTY',		 'right');
    GridObj7.SetColCellAlign('L_QTY',		 'right');

    GridObj7.SetNumberFormat("E_QTY",	"#,##0");
    GridObj7.SetNumberFormat("H_QTY", 	"#,##0");
	GridObj7.SetNumberFormat("L_QTY",	"#,##0");


}

	// �÷� ����

function setGrid(){	
	GridObj.SetColFix('ITEM_NAME');
}


function setGrid5(){
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
  
function use_day_qty_cal(nRow) {
	
		var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", 		nRow);
		var mfs_flag		= GridObj.GetCellValue("MFS_FLAG", 				nRow); //���ֱ׷�		
		var dmd_qty			= strToNum(GridObj.GetCellValue("DMD_QTY", 		nRow));
 		var use_day			= strToNum(GridObj.GetCellValue("USE_DAY", 		nRow)); //������
		var use_qty			= strToNum(GridObj.GetCellValue("USE_QTY", 		nRow)); //�����ʿ䷮
		var w1_stock		= strToNum(GridObj.GetCellValue("W1_STOCK", 	nRow)); //������ ���
		var fc_qty			= strToNum(GridObj.GetCellValue("FC_QTY", 		nRow));
		var min_lot_size	= strToNum(GridObj.GetCellValue("MIN_LOT_SIZE", nRow));
				
		if(GridObj.GetCellValue("DMD_QTY",nRow) ==  "0" ){

					dmd_qty = 1;
		}else{
			
		}
								
								
		if(mfs_flag =="A"){
			use_day = Math.round(w1_stock/((dmd_qty*4)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}	else if(mfs_flag =="B"){
			use_day = Math.round(w1_stock/((dmd_qty*2)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}	else{
			use_day = Math.round(w1_stock/(((dmd_qty/3)*4)/25));
			use_qty = Math.round(dmd_qty-w1_stock);
		}								
						
		if(strToNum(use_qty) < strToNum(0)){
			use_qty	=	0;
		}else{
		}
		
		GridObj.SetCellValue("USE_DAY",		nRow,		  use_day);
		GridObj.SetCellValue("USE_QTY",		nRow,		  use_qty);

}  
  
/*������������������������������������������������������������������������
  ��WiseGrid Row Scroll Event
  ������������������������������������������������������������������������*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}  
  
function GridEndQuery(){

    var mode		= GridObj.GetParam("mode");
    var error_msg	= '';
    
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {           
        	
        	
        		//EDIT_FLAG
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell���� ����
				
				//GridObj.SetCellBgColor('CNFM_STOCK',		i,  color_edit_col);	//���� �������
				GridObj.SetCellBgColor('MIN_LOT_SIZE',		i,  color_edit_col);	//���ִ���
				GridObj.SetCellBgColor('DMD_QTY',			i,  color_edit_col);	//�׷캰 ������
				GridObj.SetCellBgColor('HJIN_EXPT',			i,  color_edit_col);	//���� ������
				GridObj.SetCellBgColor('SJP_EXPT',			i,  color_edit_col);	//���� ������
				GridObj.SetCellBgColor('SINHYO_EXPT',		i,  color_edit_col);	//���� ������
				GridObj.SetCellBgColor('HJIN_GIJUN',		i,  color_edit_col);	
				GridObj.SetCellBgColor('SJP_GIJUN',			i,  color_edit_col);	
				GridObj.SetCellBgColor('SINHYO_GIJUN',		i,  color_edit_col);	
				//GridObj.SetCellBgColor('DMD08',				i,  color_edit_col);	//����� 
				//GridObj.SetCellBgColor('FC_QTY',			i,  color_edit_col);	//���ֿ���

				var sel_dmd		= GridObj.GetCellHiddenValue("SEL_DMD", 		i);
				var mfs_flag	= GridObj.GetCellValue("MFS_FLAG", 				i); //���ֱ׷�
				var dmd_qty		= strToNum(GridObj.GetCellValue("DMD_QTY", 		i));
			    var dmd03		= strToNum(GridObj.GetCellValue("DMD03", 		i)); //3���� ���
			    var dmd04		= strToNum(GridObj.GetCellValue("DMD04", 		i)); //���� ����
			    var dmd05		= strToNum(GridObj.GetCellValue("DMD05", 		i)); //���� 12����
				var dmd06		= strToNum(GridObj.GetCellValue("DMD06", 		i)); //���� ��뷮
		    	var dmd07		= strToNum(GridObj.GetCellValue("DMD07", 		i)); //3�� ���	    
				var dmd08		= strToNum(GridObj.GetCellValue("DMD08", 		i)); //�����								
				    
				if(GridObj.GetCellValue("DMD_QTY",nRow) ==  "0" ){
					dmd_qty = 1;
				}else{
				}
				
				if(sel_dmd =="DMD03"){ //3�������
						dmd_qty = dmd03;
						
				}else if(sel_dmd =="DMD04"){ //���⵿��
						dmd_qty = dmd04;
						
				}else if(sel_dmd =="DMD05"){ //���(12����)
						dmd_qty = dmd05;
							
				}else if(sel_dmd =="DMD06"){ //���(12����)
						dmd_qty = dmd06;
						
				}else if(sel_dmd =="DMD07"){
						dmd_qty = dmd07;	//3�� ���
						
				}else if(sel_dmd =="DMD08"){
						dmd_qty = dmd08;	//�����
				}	else{
					dmd_qty =0;
				}											
				
				if(mfs_flag=="A"){
					dmd_qty	=	Math.round(dmd_qty * 1);	
				} else if(mfs_flag=="B"){
					dmd_qty	=	Math.round(dmd_qty * 2);
				} else{
					dmd_qty	=	Math.round(dmd_qty * 3);
				}
				
				GridObj.SetCellValue("DMD_QTY",		i,		  dmd_qty);			

				
				use_day_qty_cal(i)				
			
			}  
			
			
    	// ������ ������ Row�� �̵�
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount())){
				
				GridObj.SetRowScroll(rFirst);}			
        }
         else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
	

    } else if(endMocde="doSave"){
    	GoSearch();
    	
    }

		cnfm_check();
}



function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';

	
		          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") {                           
						//EDIT_FLAG	        	               
			for(var i=0;i<GridObj3.GetRowCount();i++) {
				// cell���� ����
				GridObj3.SetCellBgColor('CNFM_STOCK',		i,  color_edit_col);
			} 
		}
		
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}else{
		
		doQuery();
	}
	
	
} 

function GridEndQuery4() {
	
	var mode		= GridObj4.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search4") {
		if(GridObj4.GetStatus() == "true") {                           
		}
		else { 
			error_msg = GridObj4.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	}

function GridEndQuery5() {
	
	var mode		= GridObj5.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search5") {
		if(GridObj5.GetStatus() == "true") {      
		     GridObj5.SetGroupMerge('ITEM_ID,ITEM_NAME');
		}
		else { 
			error_msg = GridObj5.GetMessage(); 
			alert(error_msg);            
		}
	}	
	
	doQuery4();
	
	setGrid5();
}


function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
		          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  
		  
		  //GridObj7.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum','E_QTY,H_QTY,L_QTY');
		  //GridObj7.SetcolBg01('255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
		}
	}
}


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	


               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
    var cnfm_date		= document.frm.cnfm_date.value;
    doQuery();

	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	

	GridObj4.ClearGrid( ); 
	setHeader4(GridObj4);	

	GridObj5.ClearGrid( ); 
	setHeader5(GridObj5);	

	GridObj7.ClearGrid( ); 
	setHeader7(GridObj7);
	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){  
	
	
		
		if( strColumnKey == "SELECTED"){
			return;
		}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
			
			var item_id		= GridObj.GetCellValue("ITEM_ID", 	nRow);
			var	item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);		
			var service_url = "service.do?_moon_service=op_02050_even_item_list_dw7";
			
			service_url += "&item_id=" + item_id + "&item_name=" + item_name;
			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
			var newWin = window.open(service_url, "", pop_win_style);  
			newWin.focus();
			
			return;		
		}
		
	
		
		document.all.week_flag.value	= 'M'
		    
	    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", 				nRow);
	    var sel_item_name		= GridObj.GetCellValue("ITEM_NAME", 			nRow);
	
		var use_qty				= strToNum(GridObj.GetCellValue("USE_QTY", 		nRow));
		var min_lot_size		= strToNum(GridObj.GetCellValue("MIN_LOT_SIZE", nRow));
		var fc_qty				= strToNum(GridObj.GetCellValue("FC_QTY", 		nRow));
		
	    
					if(min_lot_size ==  0){
		
						min_lot_size=1;
					}	else{
							}    
	    
	    if(strColumnKey=="USE_QTY" && use_qty > 0){
			
			if(use_qty >= min_lot_size){ // 
					fc_qty	=	min_lot_size * Math.ceil(use_qty / min_lot_size);	
			}else{
					fc_qty	=	min_lot_size;
			}		
			GridObj.SetCellValue("FC_QTY", nRow,	fc_qty);
			
			return;		
			
		}else{
		}
		
	
		// doQuery3 �� ���̳��� �ش� ������ DW5 �� ������ ����
		
		doQuery3(nRow);	//���� ����	
		
		doQuery5(nRow); //���� ����
		
		doQuery7(nRow);	//���� ����
	

}        
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
		var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
		var com_code		= document.frm.com_code.value;
		var mfs_flag		= document.frm.mfs_flag.value;
		var cnfm_date		= document.frm.cnfm_date.value;

       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",			 "search");
       GridObj.SetParam("cnfm_date",	cnfm_date);
       GridObj.SetParam("mfs_flag",		 mfs_flag);
       GridObj.SetParam("com_code",		 com_code);
       

       
       
       GridObj.DoQuery(servlet_url);
   }



function doQuery3(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID",	nRow);
	var cnfm_date	= document.frm.cnfm_date.value;
	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	GridObj3.SetParam("mode",		"search3");
	GridObj3.SetParam("item_id",	  item_id);
	GridObj3.SetParam("cnfm_date",	cnfm_date);

	GridObj3.DoQuery(servlet_url);
}



/*������������������������������������������������������������������������
  ��DW 4 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var nRow 		= GridObj.GetActiveRowIndex();
	if (nRow < 0) return; 
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	var week_flag	= document.all.week_flag.value;
	
	if(week_flag =="M"){ //����
		GridObj4.SetParam("query_id", "op_02050_Long_Term_Planning_list_dw4");	

	}else{//W �ְ� 
		GridObj4.SetParam("query_id", "op_02050_Long_Term_Planning_list_dw4_weekly");	
	}	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj4.SetParam("itype", 	   		itype);
	GridObj4.SetParam("mode",  		"search4");
	GridObj4.SetParam("item_id", 	  item_id);
	GridObj4.SetParam("week_flag", 	week_flag);
	GridObj4.DoQuery(servlet_url);
}





/*������������������������������������������������������������������������
  ��DW 5 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj5.SetParam("itype", 		itype);
	GridObj5.SetParam("mode",	"search5");
	GridObj5.SetParam("item_id",  item_id);
	GridObj5.DoQuery(servlet_url);
}



/*������������������������������������������������������������������������
  ��DW 7 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery7(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cons_item_id	= GridObj.GetCellValue("ITEM_ID", 		nRow);
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	GridObj7.SetParam("mode", 		 		"search7");
	GridObj7.SetParam("cons_item_id",	 cons_item_id);
	GridObj7.SetParam("cnfm_date",	 cnfm_date);
	
	GridObj7.DoQuery(servlet_url);
}
   


// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	//setEditMode( objTdG );
	
}


// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}



function DW4_DblClick(strColumnKey, nRow){
	
	yyyy_mm 		= GridObj4.getColHDText(strColumnKey);
	
	//"���������"
	

	var week_flag	= document.all.week_flag.value;


	if(yyyy_mm == "���� ����" ||yyyy_mm == "�ְ� ����"){  // DW 4�� ùĭ�� ��ǰ�ڵ� ���ý� week_flag ���� �������� �ְ�/���� ����  ��ȸ
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
		}else{
			
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
		}
		
	} else{
		if(week_flag == 'M'){
		}else{
			alert("���� ��볻���� �ְ����� �����ϰ� ��ȸ���ֽʽÿ�.");
			return;
		}
	}
	
}



function DW5_DblClick(strColumnKey, nRow){
	
	var yyyy_mm = GridObj5.GetCellValue("YYYY_MM", nRow);

	if(yyyy_mm == null || yyyy_mm == ""){
		return;
		
	} else{
		document.all.from_mm.value	= yyyy_mm;
		document.all.to_mm.value	= yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	
	
	if(obj.name == 'pre_mm'){ // ������
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2)	- Number(1);
		
			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 0){
				from_mm_1 = Number(from_mm_1) - Number(1);
				from_mm_2 = 12;
			}else{
				
			}
			if(to_mm_2 == 0){
				to_mm_1 = Number(to_mm_1) - Number(1);
				to_mm_2 = 12;
			}else{
				
			}
		
		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}else{ //������
		from_mm_2	= Number(from_mm_2) + Number(1);
		to_mm_2		= Number(to_mm_2) + Number(1);

			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 13){
				from_mm_1 = Number(from_mm_1) + Number(1);
				from_mm_2 = 1;
			}else{
				
			}
			if(to_mm_2 == 13){
				to_mm_1 = Number(to_mm_1) + Number(1);
				to_mm_2 = 1;
			}else{
				
			}


		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}
	
	document.all.from_mm.value = from_mm; 
	document.all.to_mm.value = to_mm; 
	
	
}

//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/



// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	

};

// ����
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", 						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				 cnfm_date);
	GridObj.SetParam("com_code",				 com_code);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
		
	GridObj.DoQuery(servlet_url, "CRUD"); 
 
 return;
}




// �ش� �÷��׿����� ���ð� �Ҵ�
/*function doCheckFlag(obj){
	// sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
	if(obj.name == "serch_flag_chk" ){ 
		if(obj.checked){
				document.frm.serch_flag.value = "Y";
		}
		else{
				document.frm.serch_flag.value = "N";
		}
	}
	var serch_flag = document.frm.serch_flag.value;
	
	doQuery7(nRow);
} */





function execute_fc_qty_cnfm_flag_yes_new(){
	
	var user_id		= document.frm._user_id.value;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
	commonUtil.executeQuery("user_id!%!cnfm_date!%!com_code", user_id+"!%!"+cnfm_date+"!%!"+com_code, "op_02050_MERGE INTO_FC_QTY_CNFM_FLAG_NEW", success);
}

success = function(data) {
	if (data == "SUCCESS") {
		
		document.frm.btnfc_qty_Cnfm.disabled = true;
		
		alert("Ȯ���Ǿ����ϴ�.");
	}else{
	}
}



function cnfm_check(){
	var user_id		= document.frm._user_id.value;
	var cnfm_date	= document.frm.cnfm_date.value;
	var com_code	= document.frm.com_code.value;
	
	commonUtil.getSelQeury("user_id!%!cnfm_date!%!com_code",user_id+"!%!"+cnfm_date+"!%!"+com_code,"op_02050_FC_QTY_CNFM_FLAG_new", { 
	callback:function(arrList){

//if(arrList) return;
//else alert(arrList[0][0]);
	//if(arrList == null) return;	// Ȯ�������Ͱ� ������ return;
	//if(!arrList) return;	// Ȯ�������Ͱ� ������ return;
		//alert(arrList[0][0]);
	if(arrList != ""){ 
		if(arrList[0][0]){
			if(arrList[0][0]=='Y') { // Ȯ������
				document.frm.btnfc_qty_Cnfm.disabled = true;
			}
			else {
				document.frm.btnfc_qty_Cnfm.disabled = false;
			}
		}
	}
	else 	
			document.frm.btnfc_qty_Cnfm.disabled = false;
			
	}
	});
}


var flag = "N";

var timer;



function test(){  
  if(flag == "Y"){
   try{     
     test2();      

     clearInterval(timer);
   }
   catch(e){

     timer();

   }
  }
 }

function HeaderClick_DW2(strColumnKey){ /* HeaderClick_DW2 */


	var item_id		= document.all.sel_item_id.value;
	var	item_name	= document.all.sel_item_name.value;
	
	if(item_id == null||item_id == ''){
		alert("ǰ���� ������ �ٽ� ��ȸ �Ͻñ� �ٶ��ϴ�");
		return;
	}		
	
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 

