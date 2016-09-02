//## ���α׷�ID      : op_02010_Long_Term_Planning_list.vm
//## ���α׷���      : ����� ������� ��ȹ 
//## ������          : �ǿ���
//## ��������        : 2009-07-16
//##
//## ���� job file   : job_op_02010_Long_Term_Planning_list.xml
//## ���� query file : query_op_02010_Long_Term_Planning_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  �ǿ���      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'op_02010_Long_Term_Planning_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;
var GridObj4;
//var GridObj5;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����


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
        
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        
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
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
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
function init6() {
	GridObj6 = document.WiseGrid6;
	setProperty(GridObj6);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader6(GridObj6);  	//�ش����� 
	setDefault6();        	//ȭ�� �⺻ ���� 
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

	GridObj.bUserContextMenu 	= true;					//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex	= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu ����� MENU �߰� */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");   
	
    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize			= 12; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines				= 2;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj2.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.

	// Cell Font Setting
	GridObj2.nCellFontSize			= 9;					// Font Size 9
	GridObj2.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 

}
function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj3.nHDLineSize			= 13; //Header Size
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj3.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.nCellFontSize			= 9;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj4.nHDLineSize			= 12; //Header Size
    GridObj4.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj4.nCellFontSize			= 9;					// Font Size 9
}
function setDefault5() { 

	GridObj5.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj5.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj5.nHDLineSize			= 12; //Header Size
    GridObj5.bStatusbarVisible		= false;				// status bar visible
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj5.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
    GridObj5.strSelectedCellFgColor = '180|82|205';
    GridObj5.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj5.nCellFontSize			= 9;					// Font Size 9
}
function setDefault6() { 

	GridObj6.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj6.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj6.nHDLineSize			= 13; //Header Size
    GridObj6.bStatusbarVisible		= false;				// status bar visible
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj6.strSelectedCellFgColor = '180|82|205';
    GridObj6.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj6.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj6.nCellFontSize			= 9;					// Font Size 9
}
function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj7.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj7.nHDLineSize			= 12; //Header Size
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj7.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj7.nCellFontSize			= 9;					// Font Size 9
	GridObj7.bStatusbarVisible		= true;				// status bar visible ���¹� ����
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60  ,false);
  	GridObj.AddHeader("SELECTED"			," "       			,"t_checkbox" 	,2		,21   ,true); //0   
 	GridObj.AddHeader("IF_FLAG"				,"����\n����"     	,"t_text" 		,100	,38   ,true); //0   
	GridObj.AddHeader("ITEM_ID"				,"ǰ���ȣ"       	,"t_text" 		,20		,60  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"			,"ǰ���"      		,"t_text" 		,100	,140 ,false); //0    
 	GridObj.AddHeader("TERM_VAL"			,"����\n����"     	,"t_number" 	,100.3	,33  ,false); //0   
 	GridObj.AddHeader("LEAD_TIME"			,"����\nŸ��"     	,"t_number" 	,100.3	,33  ,false); //0
 	//TOT_LEAD_TIME ����Ÿ���� ���� ȯ�� 
 	GridObj.AddHeader("TOT_LEAD_TIME"		,"����\nŸ��"     	,"t_number" 	,100.3	,50   ,false); //0
 	GridObj.AddHeader("BASE_UOM"			,"�⺻\n����"     	,"t_text" 		,100	,33  ,false); //0
 	GridObj.AddHeader("BASE_STOCK"			,"�����"      		,"t_number" 	,100.3	,65  ,false); //0   
 	GridObj.AddHeader("PROG_STOCK"			,"������\n���"   	,"t_number" 	,100.3	,65  ,false); //0   
 	GridObj.AddHeader("TOT_STOCK"			,"�����"      		,"t_number" 	,100.3	,75  ,false); //0
 	GridObj.AddHeader("SEL_DMD"				,"����\n����"     	,"t_combo"		,100	,65   ,true); //0	
 	GridObj.AddHeader("STD_STOCK"			,"�������"     		,"t_number" 	,100.3	,80   ,true); //0   
 	GridObj.AddHeader("SAFETY_STOCK"		,"����\n���"     	,"t_number" 	,100.3	,55  ,false); //0   
 	GridObj.AddHeader("SAFETY_FACTOR"		,"����\n���"     	,"t_number" 	,100.3	,0    ,true); //0   
 	GridObj.AddHeader("AVG_QTY"				,"���\n(12����)" 	,"t_number" 	,100.3	,55  ,false); //0   
 	GridObj.AddHeader("STD_DEV"				,"ǥ������\n(%)"     ,"t_number" 		,100.3	,55  ,false); //0   
 	GridObj.AddHeader("SALES_MEAN_3MONTH"	,"3����\n���" 		,"t_number" 	,100.3	,55  ,false); //0   
 	GridObj.AddHeader("LAST_YEAR"			,"����\n����"     	,"t_number" 	,100.3	,55  ,false); //0   
 	GridObj.AddHeader("USE_CUM_MONTH"		,"���\n����"     	,"t_number" 	,100.3	,55  ,false); //0   
 	GridObj.AddHeader("MIN_LOT_SIZE"		,"�ּ�\n���ַ�"   	,"t_number" 	,100.3	,50   ,true); //0   
 	GridObj.AddHeader("PR_DATE_NO"			,"����\n�ñ�" 		,"t_number" 	,100.3	,38   ,true); //0   
 	GridObj.AddHeader("PR_QTY"				,"PR ����"      		,"t_number" 	,100.3	,80   ,true); //0   
 	GridObj.AddHeader("ENTR_DATE"			,"�԰���"      		,"t_text" 		,100	,65   ,true); //0   
 	GridObj.AddHeader("EDIT_FLAG"			,"EDIT_FLAG"    	,"t_text" 		,100	,0    ,true); //0 
 	GridObj.AddHeader("PR_NO"				,"PR\n��ȣ"     		,"t_text" 		,100	,60   ,true); //0   
 	GridObj.AddHeader("IF_MSGS"				,"IF �޼���"     		,"t_text" 		,100	,90   ,true); //0   
 	GridObj.AddHeader("ITYPE"				,"ITYPE"      		,"t_text" 		,100	,0    ,true); //0   ��ȸ�� ���� ���簪
 	GridObj.AddHeader("MSG"					,"ǰ��޼���"      	,"t_text" 		,100	,90   ,true); //0   ������ ����
 	GridObj.AddHeader("SEQ"					,"SEQ"      		,"t_text" 		,100	,10   ,true); //0   ������ ����

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('SELECTED', 'center'); 
    GridObj.SetColCellAlign('ITEM_ID',  'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',   'left');
    GridObj.SetColCellAlign('IF_FLAG',  'center'); 
    GridObj.SetColCellAlign('TERM_VAL', 'center'); 
    GridObj.SetColCellAlign('LEAD_TIME','center'); 
    GridObj.SetColCellAlign('BASE_UOM', 'center'); 
    GridObj.SetColCellAlign('STD_DEV',	 'right');
    GridObj.SetColCellAlign('MSG',		  'left');

	GridObj.SetColFix('ITEM_NAME');

	GridObj.SetColCellBgColor('SEL_DMD',		color_edit_col);//�������
	GridObj.SetColCellBgColor('STD_STOCK',		color_edit_col);//�������
	GridObj.SetColCellBgColor('SAFETY_FACTOR',	color_edit_col);//������� 	
	GridObj.SetColCellBgColor('MIN_LOT_SIZE',	color_edit_col);//�������
	GridObj.SetColCellBgColor('PR_DATE_NO',		color_edit_col);//������� 	
	GridObj.SetColCellBgColor('PR_QTY',			color_edit_col);//������� 	
	GridObj.SetColCellBgColor('ENTR_DATE',		color_edit_col);//�������

    GridObj.SetNumberFormat("BASE_STOCK",			"#,##0");
    GridObj.SetNumberFormat("PROG_STOCK",			"#,##0");
    GridObj.SetNumberFormat("TOT_STOCK",			"#,##0");
    GridObj.SetNumberFormat("STD_STOCK",			"#,##0");
    GridObj.SetNumberFormat("SAFETY_STOCK",			"#,##0");
    GridObj.SetNumberFormat("AVG_QTY",				"#,##0");
    GridObj.SetNumberFormat("SALES_MEAN_3MONTH", 	"#,##0");
    GridObj.SetNumberFormat("SAFETY_STOCK",			"#,##0");
    GridObj.SetNumberFormat("LAST_YEAR" ,			"#,##0");
    GridObj.SetNumberFormat("USE_CUM_MONTH" , 		"#,##0");
    GridObj.SetNumberFormat("PR_QTY" , 				"#,##0");

	GridObj.SetColHDBgColor('TOT_STOCK',	'253|228|229');
	GridObj.SetColHDBgColor('STD_STOCK',	'253|228|229');
	GridObj.SetColHDBgColor('PR_DATE_NO',	'253|228|229');
	GridObj.SetColHDBgColor('PR_QTY',		'253|228|229');

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
	GridObj.SetColHide("SEQ",true);

}

/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	// if �������� �����ʹ� ���� �Ұ�!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {

	}else{
		alert("Ȯ���� �׸��� �����ϽǼ� �����ϴ�!");
		GridObj.SetComboSelectedIndex(strColumnKey, nRow,  nOldIndex);
		return;
	}	
	
	
	var version							= document.all.version.value;	
    var sel_dmd							= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id						= GridObj.GetCellValue("ITEM_ID", nRow);
    var sel_item_name					= GridObj.GetCellValue("ITEM_NAME", nRow);
    document.all.sel_dmd.value			= sel_dmd;
    document.all.sel_item_id.value		= sel_item_id;
    document.all.sel_item_name.value	= sel_item_name;
    

    
    doQuery3(nRow);	
    
	calPrDateNo(nRow);
		
};

function calPrDateNo(nRow){ // ����� ����(�������,��������)�� �ݿ��Ͽ� �԰� �ñ⸦ ����..

	var version				= document.all.version.value;	
    var sel_dmd				= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id 		= GridObj.GetCellValue("ITEM_ID", 		nRow);
    var std_stock			= GridObj.GetCellValue("STD_STOCK", nRow); //�������
    var tot_stock			= GridObj.GetCellValue("TOT_STOCK", nRow); //�����
    var sales_mean_3month	= GridObj.GetCellValue("SALES_MEAN_3MONTH", nRow); //3���� ���
    var avg_qty				= GridObj.GetCellValue("AVG_QTY", 			nRow); //��� (12����)
    var last_year			= GridObj.GetCellValue("LAST_YEAR", 		nRow); //���⵿��
    var lead_time			= GridObj.GetCellValue("LEAD_TIME", 		nRow); //����Ÿ��
    var tot_lead_time		= GridObj.GetCellValue("TOT_LEAD_TIME", 	nRow); //����Ÿ�� ���� ȯ��
    var safety_stock		= GridObj.GetCellValue("SAFETY_STOCK", 		nRow); //��� (12����)    
    var pr_date_no			= GridObj.GetCellValue("PR_DATE_NO", 		nRow); //���ֽñ�     
    var entr_date			= GridObj.GetCellValue("ENTR_DATE", 		nRow); //���ֽñ�

    document.all.sel_dmd.value		= sel_dmd;
    document.all.sel_item_id.value	= sel_item_id;
    
	if(sel_dmd =="DMD03"){ //3�������
		std_stock = sales_mean_3month;
	}else if(sel_dmd =="DMD04"){ //���⵿��
		std_stock = last_year;
	}else if(sel_dmd =="DMD05"){ //���(12����)
		std_stock = avg_qty;
	}else{
		
	}
	// 1) ������� ����
	// 	������� = ����Ÿ�� * ����� ������� * 1
	safety_stock = Math.round(lead_time * std_stock * 1)/1;
	
	// 2) ���ֽñ� ����
	//    ���ֽñ� = (�����-�������)/������� -> �Ҽ��� ù°�ڸ�����
	// 3) �԰�ñ� ����
	pr_date_no = Math.round(((tot_stock-safety_stock)/std_stock)*10)/10;
	
		pr_date_no_temp = Math.round(tot_lead_time);
		
		var result;
		commonUtil.toDate(version,'YYYY-MM-DD','DAY', pr_date_no_temp ,{
		callback:function(result){
		// result���� �԰�ñ��̴�.
		 entr_date =  	result;
		
		GridObj.SetCellValue("ENTR_DATE", nRow,  entr_date);    
		}
		});
	
	GridObj.SetCellValue("PR_DATE_NO",		nRow,	   pr_date_no);    
	GridObj.SetCellValue("SAFETY_STOCK",	nRow,  	 safety_stock);    
	GridObj.SetCellValue("STD_STOCK",		nRow,  		std_stock);

	GridEndQuery() // �԰� �ñ� �� cell ���� �缳��

}


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	var if_flag				= GridObj.GetCellValue("IF_FLAG", 					nRow);
	var std_stock			= GridObj.GetCellValue("STD_STOCK", 				nRow); //�������
    var tot_stock			= GridObj.GetCellValue("TOT_STOCK", 				nRow); //�����
	var version				= document.all.version.value;	
    var sel_dmd				= GridObj.GetCellHiddenValue("SEL_DMD", 			nRow);
    var sel_item_id 		= GridObj.GetCellValue("ITEM_ID", 					nRow);
	var sales_mean_3month	= GridObj.GetCellValue("SALES_MEAN_3MONTH",			nRow); //3���� ���
    var avg_qty				= GridObj.GetCellValue("AVG_QTY",					nRow); //��� (12����)
    var last_year			= GridObj.GetCellValue("LAST_YEAR",					nRow); //���⵿��
    var lead_time			= GridObj.GetCellValue("LEAD_TIME", 				nRow); //����Ÿ��
    var tot_lead_time		= GridObj.GetCellValue("TOT_LEAD_TIME", 			nRow); //����Ÿ�� ���� ȯ��
    var safety_stock		= GridObj.GetCellValue("SAFETY_STOCK",				nRow); //��� (12����)    
    var pr_date_no			= GridObj.GetCellValue("PR_DATE_NO",				nRow); //���ֽñ�	
	
	GridObj.SetCellValue("SELECTED", nRow, "1");

	//ENTR_DATE
	if( strColumnKey == "ENTR_DATE"){
		return;
	}

	// if �������� �����ʹ� ���� �Ұ�!!
	
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("Ȯ���� �׸��� �����ϽǼ� �����ϴ�!");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
		return;
	}
	
	if( strColumnKey == "SELECTED"){
		return;
	}

    document.all.sel_dmd.value = sel_dmd;
    document.all.sel_item_id.value = sel_item_id;
         

	// 1) ������� ����
	// 	������� = ����Ÿ�� * ����� ������� * 1
	if(strColumnKey == "SAFETY_STOCK"){
		
	}else{
		safety_stock = Math.round(lead_time * std_stock * 1)/1;
	}
	
	
	// 2) ���ֽñ� ����
	//    ���ֽñ� = (�����-�������)/������� -> �Ҽ��� ù°�ڸ�����
	// 3) �԰�ñ� ����
		pr_date_no = Math.round(((tot_stock-safety_stock)/std_stock)*10)/10;
	
		pr_date_no_temp = Math.round(tot_lead_time);

		var result;
		commonUtil.toDate(version,'YYYY-MM-DD','DAY', pr_date_no_temp ,{
		callback:function(result){
		// result���� �԰�ñ��̴�.
		 entr_date =  	result;

		GridObj.SetCellValue("ENTR_DATE", nRow,  entr_date);    
		}
		});

	
	GridObj.SetCellValue("PR_DATE_NO",		nRow,    pr_date_no);    
	GridObj.SetCellValue("SAFETY_STOCK",	nRow,  safety_stock);    
	GridObj.SetCellValue("STD_STOCK",		nRow,     std_stock);

	GridEndQuery() // �԰� �ñ� �� cell ���� �缳��
	
	
	if( strColumnKey == "STD_STOCK"){ // STD_STOCK ������� ����� DW1/DW3 �� ��ȸ ������ ����ڷ� ����

		var version		= document.all.version.value;	
	    var sel_dmd		= 'DMD09';  //  DMD09 = �����
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);	    
	    
	    document.all.sel_dmd.value = sel_dmd;
	    document.all.sel_item_id.value = sel_item_id;
	}

	doQuery3(nRow);
	

}



function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {	
	
	if(nRow == 0){
		alert("��� ������ �����Ҽ� �����ϴ�");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw3();
}


   
function setHeader2(GridObj2) {        

  	GridObj2.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10			,0  ,false); //0   
  	GridObj2.AddHeader("ITEM_NAME"	,"ǰ���"       	,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("PR_NO"		,"PR��ȣ"       	,"t_text" 	,100		,77  ,false); //0   
  	GridObj2.AddHeader("PR_REL"		,"PR����"      	,"t_text" 	,100		,67  ,false); //0   
  	GridObj2.AddHeader("PR_QTY"		,"PR����"       	,"t_number" ,100.3		,67  ,false); //0   
  	GridObj2.AddHeader("PO_NO"		,"PO��ȣ"      	,"t_text" 	,100		,77  ,false); //0    
  	GridObj2.AddHeader("PO_SEQ"		,"PO\nǰ���ȣ"	,"t_text" 	,100		,0  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("PO_DATE"	,"PO����"       	,"t_text" 	,100		,67  ,false); //0   
  	GridObj2.AddHeader("PO_QTY"		,"PO����"       	,"t_number" ,100.3		,67  ,false); //0   
  	GridObj2.AddHeader("BL_DATE"	,"BL����\n(������)"       	,"t_number" ,100.3		,67  ,false); //0 
  	GridObj2.AddHeader("CREDIT"		,"BL��ȣ" 		,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("UNSHIP_QTY"	,"�̼�����"      	,"t_number" ,100.3		,67  ,false); //0   
  	GridObj2.AddHeader("SHIP_QTY"	,"������"       	,"t_number" ,100.3		,67  ,false); //0   
  	GridObj2.AddHeader("BL_NO"		,"HOUSE\nBL_NO" ,"t_text" 	,100		,0  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("PORT"		,"������" 		,"t_text" 	,100		,67  ,false); //0   
  	GridObj2.AddHeader("TONG"		,"�����"       	,"t_text" 	,100		,67  ,false); //0   
  	GridObj2.AddHeader("IPGO"		,"�԰�\n��û��"   ,"t_text" 	,100		,67 ,false); //0 
  	GridObj2.AddHeader("REAL_IPGO"	,"�԰�\n��û��"   ,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("DATE_FLAG"	,"DATE_FLAG"    ,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("STATUS"		,"�԰�\n�������" ,"t_text" 	,100		,67 ,false); //0   
	 	    
	GridObj2.BoundHeader();	
 
    GridObj2.SetColCellAlign('ITEM_ID',	'center'); 
    GridObj2.SetColCellAlign('PR_NO',	'center'); 
    GridObj2.SetColCellAlign('PR_REL',	'center'); 
    GridObj2.SetColCellAlign('PO_SEQ',	'center'); 
    GridObj2.SetColCellAlign('PO_DATE',	'center'); 
    GridObj2.SetColCellAlign('BL_NO',	'center'); 
    GridObj2.SetColCellAlign('CREDIT',	'center'); 
    GridObj2.SetColCellAlign('PORT',	'center'); 
    GridObj2.SetColCellAlign('TONG',	'center'); 
    GridObj2.SetColCellAlign('IPGO',	'center'); 
    GridObj2.SetColCellAlign('BL_DATE',	'center'); 
    GridObj2.SetColCellAlign('REAL_IPGO', 'center'); 
    
    GridObj2.SetNumberFormat("PR_QTY",		"#,##0");
    GridObj2.SetNumberFormat("PO_QTY",		"#,##0");
    GridObj2.SetNumberFormat("UNSHIP_QTY",	"#,##0");
    GridObj2.SetNumberFormat("SHIP_QTY",	"#,##0");


}
   
function setHeader3(GridObj3) {        
       

	var header_length = 0, j;
	
	var item_id = document.all.sel_item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_header",{
		callback:function(result){


		  	GridObj3.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10			,0  ,false); //0   
		  	GridObj3.AddHeader("ITEM_NAME"	,"ǰ���"       	,"t_text" 	,100		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_GUBN"	,"�����ڵ�"      	,"t_text" 	,100.3		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_NAME"	,"����"       	,"t_text" 	,100.3		,80 ,false); //0   


			for(var i=0 ; i < 22 ; i++){  //19
				if(i < result.length) {
					GridObj3.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,result[i][2]  ,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 22) { //19
						GridObj3.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,78  ,true);
					}
					else {
						GridObj3.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,78  ,true);
					}
				}
			}
		 	
		  	GridObj3.AddHeader("TP_FLAG"	,"Ÿ���ҽ�"      	,"t_number" ,100.3		,0  ,false); //0   
			
			GridObj3.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		    GridObj3.SetColCellAlign('SEL_NAME','center'); 
			GridObj3.SetColFix('SEL_NAME');

			GridObj3.SetColHDBgColor('MON_M00','253|228|229');
			GridObj3.SetColCellBgColor('MON_M00','253|228|229');//PLT
			
			GridObj3.SetNumberFormat("MON_P15"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P14"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P13"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P12"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P11"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P10"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P09"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P08"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P07"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P06"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P05"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P04"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P03"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P02"  , "#,##0");
			GridObj3.SetNumberFormat("MON_P01"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M00"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M01"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M02"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M03"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M04"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M05"  , "#,##0");
			GridObj3.SetNumberFormat("MON_M06"  , "#,##0");			
			
		}
	});   

}

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10		,0  ,false); //0   
  	
	if(week_flag =="M"){ //����
		GridObj4.AddHeader("ITEM_NAME"	,"���� ������"   	,"t_text" 	,100	,87 ,false); //0	
	}else {//W �ְ� 
		GridObj4.AddHeader("ITEM_NAME"	,"�ְ� ������"   	,"t_text" 	,100	,87 ,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //����
		var header_id = "op_02010_Long_Term_Planning_list_dw4_header";	
	}else {//W �ְ� 
		var header_id = "op_02010_Long_Term_Planning_list_dw4_weekly_header";	
	}	
 	
	
	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){

			for(var i=0 ; i < 10 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
			if(week_flag =="M"){ //����
				GridObj4.SetColHDBgColor('MM_3_QTY','253|228|229');	
			}else {//W �ְ� 
				GridObj4.SetColHDBgColor('MM_9_QTY','253|228|229');	
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
			GridObj4.SetNumberFormat("MM_9_QTY"  , "#,##0");
			
			doQuery4();  	
		}


	});
	

}

function setHeader5(GridObj5) {        
       
  	GridObj5.AddHeader("ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 	,10		,0		,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,130	,false); //0   
 	GridObj5.AddHeader("GUBN"		,"����"      ,"t_text" 	,100	,56		,false); //0   
 	GridObj5.AddHeader("QTY"		,"��뷮"    	,"t_number" ,100.3	,86		,false); //0   
 	GridObj5.AddHeader("YYYY_MM"	,"��"     	,"t_text" 	,1000	,56		,false); //0   


	GridObj5.BoundHeader();	

    GridObj5.SetColCellAlign('ITEM_ID',	'center'); 
    GridObj5.SetColCellAlign('GUBN',	'center'); 
    GridObj5.SetColCellAlign('YYYY_MM',	'center'); 

    GridObj5.SetNumberFormat("QTY",		"#,##0");


}
 
function setHeader6(GridObj6) {        
       
  	GridObj6.AddHeader("ITEM_ID"	,"ǰ���ȣ"  		,"t_text" 	,10		,0  ,false); //0   
  	GridObj6.AddHeader("ITEM_NAME"	,"ǰ���"  		,"t_text" 	,100	,0  ,false); //0   
 	GridObj6.AddHeader("PLANT"		,"����"  		,"t_text" 	,100	,81	,false); //0   
 	GridObj6.AddHeader("MADE_DATE"	,"��������"  		,"t_text" 	,100	,0  ,false); //0   
 	GridObj6.AddHeader("END_DATE"	,"�������"      ,"t_text" 	,100	,85 ,false); //0   
 	GridObj6.AddHeader("TERM"		,"�ܿ���"   		,"t_number" ,100	,65 ,false); //0   
 	GridObj6.AddHeader("QTY"		,"���"			,"t_number" ,1000.3	,95 ,false); //0   
 	GridObj6.AddHeader("FLAG"		,"FLAG"			,"t_text" 	,1000	,0	,false); //0   

	GridObj6.BoundHeader();	
 
    GridObj6.SetColCellAlign('ITEM_ID',	'center'); 
    GridObj6.SetColCellAlign('END_DATE','center'); 

    //  trim �̿��ؼ� ##.# �����͵� ��Ʈ���̶� �ѹ� ������ �ȸ���
    GridObj6.SetNumberFormat("QTY"  , "#,##0");


}

function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("CONS_ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 	,10		,0		,false); //0   
  	GridObj7.AddHeader("CONS_ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,0		,false); //0   
  	GridObj7.AddHeader("ITEM_ID"		,"ǰ���ȣ"  	,"t_text" 	,10		,60		,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"		,"ǰ���"  	,"t_text" 	,100	,130	,false); //0   
 	GridObj7.AddHeader("PROD_QTY"		,"���귮"		,"t_number" ,100.6	,68 	,false); //0   
 	GridObj7.AddHeader("USE_QTY"		,"�̷л�뷮"	,"t_number" ,100.6	,68		,false); //0   

	GridObj7.BoundHeader();	
 
    GridObj7.SetColCellAlign('ITEM_ID',		'center'); 

    GridObj7.SetNumberFormat("PROD_QTY",	"#,##0");
    GridObj7.SetNumberFormat("USE_QTY",		"#,##0");


}

	// �÷� ����

function setGrid(){	
	GridObj.SetColFix('ITEM_NAME');
}


function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT		
	
}

function setGrid3(){	
	
}

function setGrid5(){
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell���� ����
				if(GridObj.GetCellValue('PR_DATE_NO',i) > Number(2) ){  // GREEN
					GridObj.SetCellBgColor('PR_DATE_NO', i, '200|255|110');
				}else if(GridObj.GetCellValue('PR_DATE_NO',i) > Number(1) && GridObj.GetCellValue('PR_DATE_NO',i) <= Number(2)){  // YELLOW
					GridObj.SetCellBgColor('PR_DATE_NO', i, '255|255|0');
				}
				else if(GridObj.GetCellValue('PR_DATE_NO',i) <= Number(1)){ // RED
					GridObj.SetCellBgColor('PR_DATE_NO', i, '255|0|0'); 
				}
				
			GridObj.SetCellFontBold('TOT_STOCK',	i, 'true'); // font ����
			GridObj.SetCellFontBold('PR_DATE_NO',	i, 'true'); // font ����
			GridObj.SetCellFontBold('PR_QTY',		i, 'true'); // font ����
			GridObj.SetCellFontBold('STD_STOCK',	i, 'true'); // font ����
			}
			
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell���� ����
				if(GridObj.GetCellValue('EDIT_FLAG',i) == 'Y' ){  // GREEN
					GridObj.SetCellBgColor('ITEM_ID', 	i, '0|191|255');
					GridObj.SetCellBgColor('ITEM_NAME', i, '0|191|255');
					
				}else{
					
				}  
			}
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "ExePlan"){
		alert("����� ���� ���� ��ȹ�� �Ϸ�Ǿ����ϴ� �޴�ȭ���� �ٽ� Ŭ���� ������ֽñ� �ٶ��ϴ�");
    }else if(endMode == "save"){
		alert("�����Ͽ����ϴ�");
    }else{ // ����, ���� �����Ͻ� ���α׸��� ����ȸ   
    	GoSearch();
    }
    
	
}

function GridEndQuery2() {
	
	var mode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	GridObj2.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'SHIP_QTY');
		  	GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	
		// cell���� ����  : �԰������� �̷��� �׸�� cell���� = BLUE!!
		for(var i=0;i<GridObj2.GetRowCount();i++) {
			if(GridObj2.GetCellValue('DATE_FLAG',i) == Number(1) ){  // GREEN
				GridObj2.SetCellBgColor('IPGO', i, '0|191|255'); //0-191-255
			}
		}	        	               
	
	
	
	
}

function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';
	  
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") { 
			
			var btn = document.all.btn_2.value;
			btn = "���";
			
			colExtension(btn)	;	
			  
			cal_dw3();
			
			
			                          
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}


	var header_length	= 0, j;

	/* TP_FLAG Ȯ���� ���� */
	var item_id			= document.all.sel_item_id.value;
	
	if(GridObj3.GetRowCount() < 1  ) return;	//2013-02-27 ��ȸ�� �����Ͱ� ������ �̽��� ������
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_header",{
	callback:function(arrList){

		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][3] == "true") {

				GridObj3.SetColCellBgColor(arrList[i][1],color_edit_col);//PLT				
			} 	
			else {
				
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}
///////////////////////////////////////////////		
		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][4] == "true") {
				
				GridObj3.SetColCellActivation(arrList[i][1],"edit");
								
			} 	
			else {
				
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}		
	}
	}
	);
	
	
	
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
	
	doQuery3();
	doQuery4();
	
	setGrid5();
}

function GridEndQuery6() {
	
	var mode		= GridObj6.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search6") {
		if(GridObj6.GetStatus() == "true") {
		  
		  GridObj6.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PLANT');
		  
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj6.GetRowCount();i++) {
			// cell���� ����
					if(GridObj6.GetCellValue('FLAG',i) ==  0 ){  // GREEN
				
					GridObj6.SetCellBgColor('END_DATE',	i, '253|128|129');
					GridObj6.SetCellBgColor('TERM',		i, '253|128|129');
					GridObj6.SetCellBgColor('QTY',		i, '253|128|129');
				}else{
					
				}  
			} 

		  
		}
		else { 
			error_msg = GridObj6.GetMessage(); 
			alert(error_msg);            
		}
	}
	
}

function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
			GridObj7.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'PROD_QTY,USE_QTY');
			GridObj7.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*������������������������������������������������������������������������
  ��DW 3 �������� ����
  ������������������������������������������������������������������������*/
function cal_dw3() {
	
		
	var	hd_name;
	var start_idx	= 0;
	var last_idx	= 6;
	
	var base_stock	= 0;
	var req_qty		= 0;
	var ipgo_qty	= 0;
	var next_stock;
	
	var start_hd_name = 'MON_M00';
	
	hd_name		= start_hd_name;
	hd_name_1	= start_hd_name.substr(0,6);
	hd_name_2	= start_hd_name.substr(6,7);

	base_stock	= Number(GridObj3.GetCellValue(start_hd_name, 0));
	req_qty		= Number(GridObj3.GetCellValue(start_hd_name, 1));
	ipgo_qty	= Number(GridObj3.GetCellValue(start_hd_name, 2));
	next_stock	= Math.round(base_stock - req_qty + ipgo_qty);

	for (i=0; i < 6 ; i++) {
		hd_name_2	= Number(hd_name_2)+Number(1);
		hd_name		= hd_name_1+hd_name_2;

		GridObj3.SetCellValue(hd_name, 0,  next_stock);

		base_stock	= Number(GridObj3.GetCellValue(hd_name, 0));
		req_qty		= Number(GridObj3.GetCellValue(hd_name, 1));
		ipgo_qty	= Number(GridObj3.GetCellValue(hd_name, 2));
		next_stock	= Math.round(base_stock - req_qty + ipgo_qty);
		
 
	}


}		

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	


// �÷� ��� & Ȯ��
function colExtension(obj){
	var GridObj3	= document.WiseGrid3;
	
	var value		= document.all.btn_2.value 
	
	if(value == "Ȯ��"){// true => ���� ����
		document.all.btn_2.value = "���";
		// ���� ��� ����
		GridObj3.SetColHide("MON_P15", false);
		GridObj3.SetColHide("MON_P14", false);
		GridObj3.SetColHide("MON_P13", false);
		GridObj3.SetColHide("MON_P12", false);
		GridObj3.SetColHide("MON_P11", false);
		GridObj3.SetColHide("MON_P10", false);
		GridObj3.SetColHide("MON_P09", false);
		GridObj3.SetColHide("MON_P08", false);
		GridObj3.SetColHide("MON_P07", false);
		GridObj3.SetColHide("MON_P06", false);
		GridObj3.SetColHide("MON_P05", false);
		GridObj3.SetColHide("MON_P04", false);
		GridObj3.SetColHide("MON_P03", false);
		
		GridObj3.strScrollBars='horizontal';

	}
	else{
		
		document.all.btn_2.value = "Ȯ��";
		//������
		GridObj3.SetColHide("MON_P15", true);
		GridObj3.SetColHide("MON_P14", true);		
		GridObj3.SetColHide("MON_P13", true);		
		GridObj3.SetColHide("MON_P12", true);		
		GridObj3.SetColHide("MON_P11", true);		
		GridObj3.SetColHide("MON_P10", true);		
		GridObj3.SetColHide("MON_P09", true);		
		GridObj3.SetColHide("MON_P08", true);		
		GridObj3.SetColHide("MON_P07", true);		
		GridObj3.SetColHide("MON_P06", true);		
		GridObj3.SetColHide("MON_P05", true);		
		GridObj3.SetColHide("MON_P04", true);		
		GridObj3.SetColHide("MON_P03", true);	
		
		
	}
}

               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {

	var yyyy_mm = document.all.sysdate.value;
	
	document.all.from_mm.value = yyyy_mm;
	document.all.to_mm.value = yyyy_mm;
	
    doQuery();
	
	GridObj2.ClearGrid(); 
	setHeader2(GridObj2);	
	
	GridObj3.ClearGrid(); 
	setHeader3(GridObj3);	
	
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);	
	
	GridObj5.ClearGrid(); 
	setHeader5(GridObj5);	
	
	GridObj6.ClearGrid(); 
	setHeader6(GridObj6);	
	
	GridObj7.ClearGrid(); 
	setHeader7(GridObj7);
	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     
	
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var	item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);

	var yyyy_mm = document.all.sysdate.value;

	// DW1 ����ȸ�� DW3 �ʱ�ȭ

    var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id		= GridObj.GetCellValue("ITEM_ID",		nRow);
    var sel_item_name	= GridObj.GetCellValue("ITEM_NAME",		nRow);
    var sel_itype		= GridObj.GetCellValue("ITYPE",			nRow);

	document.all.week_flag.value		= 'M'
	document.all.from_mm.value			= yyyy_mm;
	document.all.to_mm.value			= yyyy_mm;		

    document.all.sel_dmd.value			= sel_dmd;
    document.all.sel_item_id.value		= sel_item_id;
    document.all.sel_item_name.value	= sel_item_name;
    document.all.sel_itype.value		= sel_itype;

	document.frm.serch_flag_chk.checked	=	false;
	document.frm.serch_flag.value		=	"N";
	document.all.week_flag.value		=	'M'

	if(strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
		//alert("�� �� ��ǰ ���� �˾�!!");
		
		var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_fert_halb_stock_list";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
		
		return;		
	}

	doQuery2(nRow);	

	doQuery5(nRow);	

	doQuery6(nRow);	

	doQuery7(nRow);	
	
}        
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var version		= document.all.version.value;
       var item_type	= document.all.item_type.value;
       var edit_flag	= document.all.edit_flag.value;
       var domain		= document.all.domain.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", 		 "search");
       GridObj.SetParam("version", 		  version);
       GridObj.SetParam("item_type",    item_type);
       GridObj.SetParam("domain", 		   domain);
       GridObj.SetParam("edit_flag", 	edit_flag);
       
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype	= GridObj.GetCellValue("ITYPE", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);

	GridObj2.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 3 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= document.all.sel_item_id.value;
    var version		= document.all.version.value;
    var std_stock	= GridObj.GetCellValue("STD_STOCK", nRow);
    var sel_dmd		= document.all.sel_dmd.value;
	var itype		= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj3.SetParam("mode",		"search3");
	GridObj3.SetParam("itype",			itype);
	GridObj3.SetParam("item_id",	  item_id);
	GridObj3.SetParam("version",	  version);
	GridObj3.SetParam("sel_dmd",	  sel_dmd);
	GridObj3.SetParam("std_stock",	std_stock);
	
	GridObj3.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 4 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4(nRow) {

	var servlet_url	= Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= document.all.sel_item_id.value;
	var itype		= document.all.sel_itype.value;
	var week_flag	= document.all.week_flag.value;
	
	if(item_id =='12000721' || item_id =='12000720' || item_id =='11000028') {
		
		if(week_flag =="M"){ //����
		GridObj4.SetParam("query_id", "op_02010_Long_Term_Planning_list_dw4_except");	
		}else{//W �ְ� 
			GridObj4.SetParam("query_id", "op_02010_Long_Term_Planning_list_dw4_weekly");	
		}	
		
	}else{
		
		if(week_flag =="M"){ //����
		GridObj4.SetParam("query_id", "op_02010_Long_Term_Planning_list_dw4");	
		}else{//W �ְ� 
			GridObj4.SetParam("query_id", "op_02010_Long_Term_Planning_list_dw4_weekly");	
		}	
	}
	
	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj4.SetParam("itype",		itype);
	GridObj4.SetParam("mode",	"search4");
	GridObj4.SetParam("item_id",  item_id);
	GridObj4.DoQuery(servlet_url);
}


/*������������������������������������������������������������������������
  ��DW 5 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype	= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj5.SetParam("itype", itype);
	GridObj5.SetParam("mode", "search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 6 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery6(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj6.SetParam("itype",		itype);
	GridObj6.SetParam("mode",	"search6");
	GridObj6.SetParam("item_id",  item_id);
	GridObj6.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 7 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery7(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= document.all.sel_item_id.value;
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	var serch_flag	= document.all.serch_flag.value;
	var itype		= document.all.sel_itype.value;
	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj7.SetParam("itype",			  itype);
	GridObj7.SetParam("mode",		  "search7");
	GridObj7.SetParam("item_id",  		item_id);
	GridObj7.SetParam("from_mm",  	   from_mm);
	GridObj7.SetParam("to_mm",			 to_mm);
	GridObj7.SetParam("serch_flag", serch_flag);
	
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
	
	yyyy_mm =  GridObj4.getColHDText(strColumnKey);
	
	//"���������"
	

	var week_flag = document.all.week_flag.value;

	
	if(yyyy_mm == "���� ������" ||yyyy_mm == "�ְ� ������"){  // DW 4�� ùĭ�� ��ǰ�ڵ� ���ý� week_flag ���� �������� �ְ�/���� ����  ��ȸ
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
			document.all.from_mm.value	= yyyy_mm;
			document.all.to_mm.value	= yyyy_mm;
			doQuery7(); // doQuery7();
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
	
	var from_mm 	= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // ������
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2) - Number(1);
		
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
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var del_plt = GridObj2.GetCellValue("PLT_QTY", nRow);

	if(strColumnKey == "DEL_PLT"){
		if(nNewValue > 0){
			GridObj2.SetCellValue("SELECTED", nRow, "1");
		}else{
			GridObj2.SetCellValue("SELECTED", nRow, "0");
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj2.SetCellValue("DEL_PLT", nRow, del_plt)			
		}else{
			GridObj2.SetCellValue("DEL_PLT", nRow, "0")			
		}
	}
}

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode		= "save";
	doSave();	
};

// ����
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version",						version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");
 
}

function GoExePlan(){

	if(confirm("������ �ִ� ���� ��ȹ�� �ʱ�ȭ�˴ϴ�. ����� ���� ���� ��ȹ�� �����Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	GridObj.SetParam("mode", "ExePlan");
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.doQuery(servlet_url);

	
}

function GoDelete(){
	
		if(confirm("���� �Ͻ� ǰ���� �����Ͻðڽ��ϱ�?") == 1 ) {
			
		}
		else{
			return;
		}		

	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						"delete");
	GridObj.SetParam("user_id",	 document.frm._user_id.value);
	GridObj.SetParam("version",						 version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


function GoIf(){

	if(confirm("���� �Ͻ� ǰ���� ERP ������ Ȯ���Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version",						version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


// �ش� �÷��׿����� ���ð� �Ҵ�
function doCheckFlag(obj){

	var serch_flag = document.frm.serch_flag.value;

	// sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
	if(obj.name == "serch_flag_chk" ){ 
		if(obj.checked){
				document.frm.serch_flag.value = "Y";
		}
		else{
				document.frm.serch_flag.value = "N";
		}
	}

	
	doQuery7(nRow);
}


function doChange2(obj){
	
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			
			in_div +=	"<option value="+arrList[i][0];
			if(arrList[i][1] == "Y") { // ��ȹ ���� ǰ��
				in_div += " style=\"background-color:#ffffaa; \"";
			}
			
			// ����� combo-list�� refresh�Ǹ鼭 �����ߴ� ǰ���� �ٽ� �����ϵ��� �Ѵ�.
			if(document.frm.version.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][0]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
		}	

		divVersionCombo.innerHTML = in_div;
		// ǰ��cnt������ �����Ѵ�.

	}
	});
}

function doChange3(obj){

	
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
 
/*������������������������������������������������������������������������
  ��WiseGrid Insert Row Fnc
  ������������������������������������������������������������������������*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // ���ڸ� ������ ��� 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}

// ����ü�� �����߰�
	var this_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	var new_seq = 1;
	
	for(var i=0;i<GridObj.GetRowCount();i++) {
		tmp_item_id	= GridObj.GetCellValue("ITEM_ID", i);

		if(this_item_id == tmp_item_id){
			new_seq ++;
		}
	}

	GridObj.SetCellValue("SELECTED", 			nRow+1, "1");
	GridObj.SetCellValue("ITEM_ID"              , nRow+1, GridObj.GetCellValue("ITEM_ID"              , nRow));
	GridObj.SetCellValue("ITEM_NAME"            , nRow+1, GridObj.GetCellValue("ITEM_NAME"            , nRow));
	GridObj.SetCellValue("TERM_VAL"      		, nRow+1, GridObj.GetCellValue("TERM_VAL"             , nRow));
	GridObj.SetCellValue("LEAD_TIME"   			, nRow+1, GridObj.GetCellValue("LEAD_TIME"            , nRow));
	GridObj.SetCellValue("TOT_LEAD_TIME"   		, nRow+1, GridObj.GetCellValue("TOT_LEAD_TIME"        , nRow));
	GridObj.SetCellValue("BASE_UOM"   			, nRow+1, GridObj.GetCellValue("BASE_UOM"             , nRow));
	GridObj.SetCellValue("BASE_STOCK"           , nRow+1, GridObj.GetCellValue("BASE_STOCK"           , nRow));
	GridObj.SetCellValue("PROG_STOCK"        	, nRow+1, GridObj.GetCellValue("PROG_STOCK"           , nRow));
	GridObj.SetCellValue("TOT_STOCK"        	, nRow+1, GridObj.GetCellValue("TOT_STOCK"            , nRow));

	GridObj.SetComboSelectedIndex ("SEL_DMD"	, nRow+1, GridObj.GetComboSelectedIndex ("SEL_DMD" , nRow) );
//	GridObj.SetCellHiddenValue("SEL_DMD"        , nRow+1, GridObj.GetCellHiddenValue("SEL_DMD"              , nRow));
	GridObj.SetCellValue("STD_STOCK"        	, nRow+1, GridObj.GetCellValue("STD_STOCK"            , nRow));
	GridObj.SetCellValue("SAFETY_STOCK"        	, nRow+1, GridObj.GetCellValue("SAFETY_STOCK"         , nRow));
	GridObj.SetCellValue("SAFETY_FACTOR"        , nRow+1, GridObj.GetCellValue("SAFETY_FACTOR"        , nRow));
	GridObj.SetCellValue("AVG_QTY"        		, nRow+1, GridObj.GetCellValue("AVG_QTY"              , nRow));
	GridObj.SetCellValue("STD_DEV"        		, nRow+1, GridObj.GetCellValue("STD_DEV"              , nRow));
	GridObj.SetCellValue("SALES_MEAN_3MONTH"    , nRow+1, GridObj.GetCellValue("SALES_MEAN_3MONTH"    , nRow));
	GridObj.SetCellValue("LAST_YEAR"        	, nRow+1, GridObj.GetCellValue("LAST_YEAR"            , nRow));
	GridObj.SetCellValue("USE_CUM_MONTH"        , nRow+1, GridObj.GetCellValue("USE_CUM_MONTH"        , nRow));
	GridObj.SetCellValue("MIN_LOT_SIZE"        	, nRow+1, GridObj.GetCellValue("MIN_LOT_SIZE"         , nRow));
	GridObj.SetCellValue("PR_DATE_NO"        	, nRow+1, GridObj.GetCellValue("PR_DATE_NO"           , nRow));
	GridObj.SetCellValue("LAST_YEAR"        	, nRow+1, GridObj.GetCellValue("LAST_YEAR"            , nRow));
	GridObj.SetCellValue("MSG"        			, nRow+1, GridObj.GetCellValue("MSG"            , nRow));
	GridObj.SetCellValue("SEQ"        			, nRow+1, new_seq);

}	

/*����������������������������������������������������������������������������������
  ��WiseGrid User Context Menu Click Event
  ����������������������������������������������������������������������������������*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
		
			insertRow( nRow );	
			
		}
		else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}		
	}

};

// �÷� ��� & Ȯ��
function colExtension2(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('BASE_STOCK')== 40){// true => ���� ����
		//if(obj.value == "���"){
		
		obj.value = "���";
		// ���� ��� ����
		
		GridObj.SetColWidth("BASE_STOCK",			70);
		GridObj.SetColWidth("PROG_STOCK",			70);
		GridObj.SetColWidth("TOT_STOCK", 			70);
		GridObj.SetColWidth("SEL_DMD",				70);
		GridObj.SetColWidth("STD_STOCK",			70);		
		GridObj.SetColWidth("SAFETY_STOCK", 		70);
		GridObj.SetColWidth("AVG_QTY", 				70);
		GridObj.SetColWidth("STD_DEV", 				70);		
		GridObj.SetColWidth("SALES_MEAN_3MONTH",	70);
		GridObj.SetColWidth("LAST_YEAR",			70);
		GridObj.SetColWidth("USE_CUM_MONTH", 		70);
		

		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();

	}
	else{
		
		obj.value = "Ȯ��";
		//������
		
		GridObj.SetColWidth("BASE_STOCK",			40);
		GridObj.SetColWidth("PROG_STOCK",			40);		
		GridObj.SetColWidth("TOT_STOCK",			40);
		GridObj.SetColWidth("SEL_DMD",				40);
		GridObj.SetColWidth("STD_STOCK",			40);		
		GridObj.SetColWidth("SAFETY_STOCK",			40);
		GridObj.SetColWidth("AVG_QTY", 				40);
		GridObj.SetColWidth("STD_DEV", 				40);		
		GridObj.SetColWidth("SALES_MEAN_3MONTH",	40);
		GridObj.SetColWidth("LAST_YEAR",			40);
		GridObj.SetColWidth("USE_CUM_MONTH", 		40);
		
		
	}	

}