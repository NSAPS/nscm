//############################################################
//## ���α׷�ID      : md_10010_manugistics_master_management.vm
//## ���α׷���      : manugistics �����Ͱ���
//## ������          : ������
//## ��������        : 2010-01-27
//##
//## ���� job file   : job_md_10010_manugistics_master_management.xml
//## ���� query file : query_md_10010_manugistics_master_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-01-27  ������      create
//## 2.0        2013-08-27  ������      1.����� �����ϴ� ���� ���� endquery���� ������ ����ȸ
//##                                   2.������ ����ȸ �� �׸��� ��ġ ���� �ڵ� �߰�
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'md_10010_manugistics_master_management';
var GridObj ; 													// WiseGrid ��ü

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 ������� */
var rFirst = 0;							// ���� �۾��� ����ȸ�� ȭ����ġ�� �����ϱ� ���� Row Index ���� ����

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

    GridObj.nHDLineSize         = 16; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
 
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"       	,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"       		,"t_text" 		,200	,200 ,false); //0
 	GridObj.AddHeader("MFS_FLAG"		,"���ֱ׷�"       	,"t_combo" 		,10		,90   ,true); //0	//2013-04-18 �߰�
 	GridObj.AddHeader("USE_PR_PLAN"		,"���ֱ׷�"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("PR_FLAG"			,"���ְ���"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("ST_FLAG"			,"������"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("RC_FLAG"			,"��������"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("SEMI_FLAG"		,"�Һ�\n����"     	,"t_checkbox" 	,10		,40   ,true); //0
 	
 	GridObj.AddHeader("BS_FLAG1"		,"��ǰ"       	,"t_checkbox" 	,10		,40   ,true); //0 
 	GridObj.AddHeader("BS_FLAG3"		,"���̽�"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG2"		,"��ǰ"     		,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG4"		,"���̽�"     	,"t_checkbox" 	,10		,40   ,true); //0
 	   
 	GridObj.AddHeader("PR_TO_PO"		,"PR~PO"       		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PO_TO_LC"		,"PO~����"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("LC_TO_PORT"		,"����~����"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PORT_TO_CUST"	,"����~���"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_FR"		,"ǥ������\nFROM"    ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_TO"		,"ǥ������\nTO"      ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_FR"	,"��������"    		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_TO"	,"��պ���"      		,"t_number" 	,10.2	,60   ,true); //0   


	GridObj.AddHeader("CONTAINER_BOX"	,"�����̳ʹڽ�"      	,"t_number" 	,10.2	,50   ,true); //0                   				                              
 	GridObj.AddHeader("P1110"			,"�Ⱦ�"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1120"			,"�ȼ�"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1130"			,"�ȼ�\n����"      	,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1140"			,"�ƻ�"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1150"			,"����"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1160"			,"����"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1170"			,"�λ�"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1180"			,"���"      		,"t_number" 	,10.2	,50   ,true); //0   


 	GridObj.AddHeader("USE_DP_FLAG"		,"DP"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_DP_DATE"		,"DP������"       	,"t_text" 		,100	,80  ,false); //0   
 	GridObj.AddHeader("DPCAL"			,"DP�޷�"       		,"t_combo" 		,100	,60   ,true); //0   
 	GridObj.AddHeader("USE_TAGE_FLAG"	,"Ÿ����"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_FLAG"		,"FF"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_DATE"		,"FF������"       	,"t_text" 		,200	,80  ,false); //0   
 	GridObj.AddHeader("ORDER_FLAG"		,"����"       		,"t_checkbox" 	,200	,30   ,true); //0   
 	GridObj.AddHeader("CUSTORDERDUR"	,"����\n�Ⱓ"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MPSRULE"			,"MPSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("MPSCOVDUR"		,"Cover\n�Ⱓ"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MAXOH"			,"�ִ����"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("ALLOCCAL"		,"DRP�޷�"       	,"t_combo" 		,200	,80   ,true); //0   
 	GridObj.AddHeader("PLANDUR"			,"DRP�Ⱓ"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("TIMEFENSEDUR"	,"TP�Ⱓ\n(WEEK)"   	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("CPPPRIORITY"		,"CPP\n�켱����"     	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSRULE"			,"SSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("SSCOV"			,"SS\n�ϼ�"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MINSS"			,"�ּ�SS\n�ڽ���"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("MAXSS"			,"�ִ�SS\n�ڽ���"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSTEMPLATE"		,"SS\nTemplate"     ,"t_text" 		,200	,60  ,false); //0   
 	GridObj.AddHeader("INCMPSQTY"		,"�Ƿ�\n������"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MINMPSQTY"		,"�ּ�\n�Ƿڷ�"      	,"t_number" 	,200.6	,60   ,true); //0   
 	GridObj.AddHeader("MANU_DEL_DUR"	,"manu����\n�����Ⱓ" ,"t_number" 		,200	,70   ,true); //0   

 	GridObj.AddHeader("DOMAIN"			,"����" 				,"t_combo" 		,200	,110  ,true); //0   
 	GridObj.AddHeader("MIN_PICK_QTY"	,"�̰����" 			,"t_number" 	,200	,70   ,true); //0   
 	

	GridObj.AddGroup("PRE_YEAR", "���⵿��");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_FR");
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_TO");
	
	GridObj.AddGroup("SODA", "��ġ�Ҵ�");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("SODA", "BS_FLAG1");
	GridObj.AppendHeader("SODA", "BS_FLAG3");
	
	GridObj.AddGroup("JUICE", "��ġ�ֽ�");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("JUICE", "BS_FLAG2");
	GridObj.AppendHeader("JUICE", "BS_FLAG4");


	GridObj.BoundHeader();	
	
	GridObj.SetColFix('ITEM_NAME');	//2013-04-19 ������ �߰�

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.

	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
	
	// ���� ��ȸ�ÿ��� ����� 
	if(document.frm.itype[3].checked == true) {
	
		GridObj.SetColHide("USE_DP_FLAG"		,true);
		GridObj.SetColHide("USE_DP_DATE"		,true);
		GridObj.SetColHide("DPCAL"			    ,true);
		GridObj.SetColHide("USE_TAGE_FLAG"	    ,true);
		GridObj.SetColHide("USE_FF_FLAG"		,true);
		GridObj.SetColHide("USE_FF_DATE"		,true);
		GridObj.SetColHide("ORDER_FLAG"			,true);
		GridObj.SetColHide("CUSTORDERDUR"	    ,true);
		GridObj.SetColHide("MPSRULE"			,true);
		GridObj.SetColHide("MPSCOVDUR"		    ,true);
		GridObj.SetColHide("MAXOH"			    ,true);
		GridObj.SetColHide("ALLOCCAL"		    ,true);
		GridObj.SetColHide("PLANDUR"			,true);
		GridObj.SetColHide("TIMEFENSEDUR"	    ,true);
		GridObj.SetColHide("CPPPRIORITY"		,true);
		GridObj.SetColHide("SSRULE"				,true);
		GridObj.SetColHide("SSCOV"			    ,true);
		GridObj.SetColHide("MINSS"			    ,true);
		GridObj.SetColHide("MAXSS"			    ,true);
		GridObj.SetColHide("SSTEMPLATE"			,true);
		GridObj.SetColHide("INCMPSQTY"		    ,true);
		GridObj.SetColHide("MINMPSQTY"		    ,true);
		GridObj.SetColHide("MANU_DEL_DUR"	    ,true);

		GridObj.SetColHide("CONTAINER_BOX"	    ,true);

	}
	else {
		GridObj.SetColHide("P1110"				,true);
		GridObj.SetColHide("P1120"			    ,true);
		GridObj.SetColHide("P1130"			    ,true);
		GridObj.SetColHide("P1140"			    ,true);
		GridObj.SetColHide("P1150"				,true);
		GridObj.SetColHide("P1160"		    	,true);
		GridObj.SetColHide("P1170"		    	,true);
		GridObj.SetColHide("P1180"	    		,true);
	}

	GridObj.SetColCellAlign('ITEM_ID',		'center');
	GridObj.SetColCellAlign('USE_DP_DATE',	'center');
	GridObj.SetColCellAlign('USE_FF_DATE',	'center');
	GridObj.SetColCellAlign('DOMAIN',		'center');
	GridObj.SetColCellAlign('MFS_FLAG',		'center');

	GridObj.SetColCellBgColor('USE_PR_PLAN',	color_edit_col);
	GridObj.SetColCellBgColor('PR_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('ST_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('RC_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('SEMI_FLAG',		color_edit_col);
	
	GridObj.SetColCellBgColor('BS_FLAG1',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG2',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG3',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG4',		color_edit_col);
	GridObj.SetColCellBgColor('PR_TO_PO',		color_edit_col);
	GridObj.SetColCellBgColor('PO_TO_LC',		color_edit_col);
	GridObj.SetColCellBgColor('LC_TO_PORT',		color_edit_col);
	GridObj.SetColCellBgColor('PORT_TO_CUST',	color_edit_col);
	GridObj.SetColCellBgColor('STD_VAR_FR',		color_edit_col);
	GridObj.SetColCellBgColor('STD_VAR_TO',		color_edit_col);
	GridObj.SetColCellBgColor('PRE_MONTH_FR',	color_edit_col);
	GridObj.SetColCellBgColor('PRE_MONTH_TO',	color_edit_col);

	GridObj.SetColCellBgColor('CONTAINER_BOX',	color_edit_col);

	GridObj.SetColCellBgColor('USE_DP_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('DPCAL',			color_edit_col);
	GridObj.SetColCellBgColor('USE_TAGE_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('USE_FF_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('ORDER_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('CUSTORDERDUR',	color_edit_col);
	GridObj.SetColCellBgColor('MPSRULE',		color_edit_col);
	GridObj.SetColCellBgColor('MPSCOVDUR',		color_edit_col);
	GridObj.SetColCellBgColor('MAXOH',			color_edit_col);
	GridObj.SetColCellBgColor('ALLOCCAL',		color_edit_col);
	GridObj.SetColCellBgColor('PLANDUR',		color_edit_col);
	GridObj.SetColCellBgColor('TIMEFENSEDUR',	color_edit_col);
	GridObj.SetColCellBgColor('CPPPRIORITY',	color_edit_col);
	GridObj.SetColCellBgColor('SSRULE',			color_edit_col);
	GridObj.SetColCellBgColor('SSCOV',			color_edit_col);
	GridObj.SetColCellBgColor('MINSS',			color_edit_col);
	GridObj.SetColCellBgColor('MAXSS',			color_edit_col);
	GridObj.SetColCellBgColor('INCMPSQTY',		color_edit_col);
	GridObj.SetColCellBgColor('MINMPSQTY',		color_edit_col);
	GridObj.SetColCellBgColor('MANU_DEL_DUR',	color_edit_col);
	GridObj.SetColCellBgColor('MFS_FLAG',		color_edit_col);
	
	GridObj.SetNumberFormat("CONTAINER_BOX",	"###,###,##0");
	GridObj.SetNumberFormat("MIN_PICK_QTY",		"###,###,##0");
	
       
}
   																																																																																																																																																																																																																																																																																																																																																																																																								
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
		
		rFirst = 0; /* VER 2.0 ������� */

		doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	
	GridObj.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var in_input_gubn	= document.all.in_input_gubn.value;
	var sale_code		= document.all.sale_code.value;
	
	var com_code 		= document.all.com_code.value;

	var itype = "";
	if(document.frm.itype[0].checked == true) itype = "FERT";
	else if(document.frm.itype[1].checked == true) itype = "HAWA";
	else if(document.frm.itype[2].checked == true) itype = "EXPO";
	else itype = "ROH";
	
	
	//var com_code = "";
	//if(document.frm.com_code[0].checked == true) com_code = "0001000050";	//�°�
	//else if(document.frm.com_code[1].checked == true) com_code = "0001000021";	//����
	//else com_code = "0001000021";	//����

	GridObj.ClearGrid();
	setHeader(GridObj);
	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", 				"search");
	GridObj.SetParam("in_input_gubn",	in_input_gubn);
	GridObj.SetParam("com_code", 			com_code);
	GridObj.SetParam("sale_code", 			sale_code);
	
	GridObj.SetParam("itype", 					itype);
	
	   
	GridObj.DoQuery(servlet_url);
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
			var rowCnt = GridObj.GetRowCount();
   			for ( i = 0 ; i < rowCnt ; i++ ){
   				if(!(GridObj.GetCellValue("P1110", i) == "" || GridObj.GetCellValue("P1110", i) == null)) {
   					GridObj.SetCellBgColor('P1110', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1120", i) == "" || GridObj.GetCellValue("P1120", i) == null)) {
   					GridObj.SetCellBgColor('P1120', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1130", i) == "" || GridObj.GetCellValue("P1130", i) == null)) {
   					GridObj.SetCellBgColor('P1130', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1140", i) == "" || GridObj.GetCellValue("P1140", i) == null)) {
   					GridObj.SetCellBgColor('P1140', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1150", i) == "" || GridObj.GetCellValue("P1150", i) == null)) {
   					GridObj.SetCellBgColor('P1150', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1160", i) == "" || GridObj.GetCellValue("P1160", i) == null)) {
   					GridObj.SetCellBgColor('P1160', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1170", i) == "" || GridObj.GetCellValue("P1170", i) == null)) {
   					GridObj.SetCellBgColor('P1170', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1180", i) == "" || GridObj.GetCellValue("P1180", i) == null)) {
   					GridObj.SetCellBgColor('P1180', i, color_edit_col);	
   				}
   			}
            
            /* VER 2.0 ������� */
            if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
				GridObj.SetRowScroll(rFirst); 
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save") {

		if(GridObj.GetStatus() == "true") {// 
			doQuery();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
}


/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	GridObj.ExcelExport("", "", true, true);
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if( strColumnKey == "PRE_MONTH_FR") {
		// ���� �����̸� 0�� �ٲٰ� return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// ��պ��� = 100 - �������
		var pre_month_to = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_TO", nRow, pre_month_to);
	}
	else if(strColumnKey == "PRE_MONTH_TO") {
		// ���� �����̸� 0�� �ٲٰ� return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// ������� = 100 - ��պ���
		var pre_month_fr = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_FR", nRow, pre_month_fr);
	}
	
	if(strColumnKey == "P1110" || strColumnKey == "P1120" || strColumnKey == "P1130" || strColumnKey == "P1140" || strColumnKey == "P1150" 
		|| strColumnKey == "P1160" || strColumnKey == "P1170" || strColumnKey == "P1180") {
		// ITEM_DTL�� ���� ������ ������ ���
		if(nNewValue < 0) {
			alert("������ -���� ������� �ʽ��ϴ�!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		if(nOldValue == "" || nOldValue == null) {
			alert("�ش� ���忡���� ������� �ʴ� �����Դϴ�.");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		var tot_alloc_rate = 0;
		tot_alloc_rate =  strToNum(GridObj.GetCellValue("P1110", nRow))	+ strToNum(GridObj.GetCellValue("P1120", nRow))
						+ strToNum(GridObj.GetCellValue("P1130", nRow))	+ strToNum(GridObj.GetCellValue("P1140", nRow))
						+ strToNum(GridObj.GetCellValue("P1150", nRow))	+ strToNum(GridObj.GetCellValue("P1160", nRow))
						+ strToNum(GridObj.GetCellValue("P1170", nRow))	+ strToNum(GridObj.GetCellValue("P1180", nRow));
		if(tot_alloc_rate > 100) {
			alert("���庰 ������ ���� 100�� �ѽ��ϴ�. �������ֽʽÿ�!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		
	}

}
/*������������������������������������������������������������������������
  ��WiseGrid Row Scroll Event
  ������������������������������������������������������������������������*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
}

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
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    