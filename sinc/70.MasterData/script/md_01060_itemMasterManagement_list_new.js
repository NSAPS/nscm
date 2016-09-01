//##############################################################
//## ���α׷�ID     	: md_01060_itemMasterManagement_list_new.js
//## ���α׷���      	: ǰ�񸶽��Ͱ���
//## ������          	: �ǿ���
//## ��������        	: 2011-11-01
//##
//## ���� job file   : 
//## ���� query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-11-01  �ǿ���      create
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
var job_id = 'md_01060_itemMasterManagement_list_new';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 ������� */
var rFirst = 0;							// ���� �۾��� ����ȸ�� ȭ����ġ�� �����ϱ� ���� Row Index ���� ����
var	save_nRow = '';

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
        //document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        //document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
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


   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '���� ���'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible ���¹� ���� 


    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '���� ���'; 

}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        //  �ٹٲ� : \n

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
	//GridObj.SetColHide("CRUD", true); 

	
	GridObj.AddHeader("ITEM_ID"				,"ǰ���ȣ"				,"t_text"	,200	,66,false);//0
	GridObj.AddHeader("ITEM_NAME"			,"ǰ���"					,"t_text"	,200	,174,false);//0
	GridObj.AddHeader("SPEC"				,"����"					,"t_text"	,200	,90,false);//0
	GridObj.AddHeader("MTO_FLAG"			,"MTO/\nMTS"					,"t_text"	,200	,50,false);//0
	GridObj.AddHeader("EX_NATION"			,"�����ڵ�"					,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("SPEC_UOM"			,"����\n����"				,"t_text"	,200	,35,false);//0
	
	
	GridObj.AddHeader("ITEM_HIST"			,"ǰ���̷�\n����"			,"t_text"	,200	,61,false);//0
	GridObj.AddHeader("BOX_PER_PALET"		,"�ķ�Ʈ��\nBOX��"		,"t_number"	,200	,61,true);//0
	GridObj.AddHeader("CAT03"				,"���۰�ȹ\n��������"		,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("CAT06"				,"�����Ҵ�\n��������"		,"t_combo"	,200	,91,true);//0

	GridObj.AddHeader("REFE_ITEM1"			,"�ǸŸ�ǥ\n����ǰ��"		,"t_text"	,200	,66,true);//0
	GridObj.AddHeader("REFE_ITEM1_NAME"		,"�ǸŸ�ǥ\n����ǰ���"		,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SEARCH_FLAG"			,"��ȸ����\nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CAT07"				,"��������\nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("SALES_PLAN_APPL_HIST","�ǸŰ�ȹ\n��ǰ�з�"		,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CM_GUBN"				,"CM����"				,"t_combo"	,200	,74,true);//0

	GridObj.AddHeader("MULTI_FLAG"			,"��Ƽ����\n����"			,"t_combo"	,200	,65,true);//0
	GridObj.AddHeader("QTY_PER_MULTI"		,"��Ƽ����\n����"			,"t_number"	,200	,55,true);//0
	GridObj.AddHeader("QTY_PER_MULTI_UOM"	,"��Ƽ����\n��������"		,"t_text"	,200	,55,true);//0


	GridObj.AddHeader("MIN_PICK_QTY"		,"�ּ�Picking\n����"		,"t_number"	,200	,74,true);//0
	GridObj.AddHeader("PACK_PROC_FLAG"		,"Package\nProcess����"	,"t_text"	,200	,84,true);//0
	GridObj.AddHeader("CAT01"				,"��ǰƯ¡1"				,"t_combo"	,200	,104,true);//0
	GridObj.AddHeader("CAT02"				,"��ǰƯ¡2"				,"t_combo"	,200	,134,true);//0
	GridObj.AddHeader("CAT04"				,"��ǰƯ¡4"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("CAT05"				,"��ǰƯ¡5"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("TRANS_ALLOC_FLAG"	,"���ۺ�\n�Ҵ�"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("PROD_ALLOC_FLAG"		,"������\n�Ҵ�"			,"t_combo"	,200	,74,true);//0
	
	GridObj.AddHeader("DIVISION"			,"��ǰ��"					,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("RECIPE_TYPE"			,"��������"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("MATERIAL_GROUP"		,"����׷�"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT01"			,"����ǰ��\n�׷�1"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT02"			,"����ǰ��\n�׷�2"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT03"			,"����ǰ��\n�׷�3"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT04"			,"����ǰ��\n�׷�4"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT05"			,"����ǰ��\n�׷�5"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("HR_TY1"				,"����Ÿ��1"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY2"				,"����Ÿ��2"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY3"				,"����Ÿ��3"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY4"				,"����Ÿ��4"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY5"				,"����Ÿ��5"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("QTY"					,"�⺻������\n����"		,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("BASE_UOM"			,"�⺻����"				,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("TWGT_PER_BUOM"		,"���߷�"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("NWGT_PER_BUOM"		,"���߷�"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_PER_BUOM"		,"����"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_UOM"				,"���Ǵ���"				,"t_text"	,200	,74,false);//0

	/* ������ ���� ���� �� */
 	//GridObj.AddHeader("CUST_ITEM_ID"	,"CUST_ITEM_ID"		,"t_text" 	,100	,0 	,false); //0
 	//GridObj.AddHeader("CUST_STORE_CODE"	,"CUST_STORE_CODE"	,"t_text" 	,100	,0 	,false); //0

	GridObj.BoundHeader();	



    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('SPEC','right'); 
    GridObj.SetColCellAlign('SPEC_UOM','center'); 
    GridObj.SetColCellAlign('MTO_FLAG','center'); 
    GridObj.SetColCellAlign('QTY_PER_MULTI_UOM','center'); 
    GridObj.SetColCellAlign('ITEM_HIST','center'); 
    GridObj.SetColCellAlign('PACK_PROC_FLAG','right'); 
    GridObj.SetColCellAlign('EX_NATION','center'); 
    GridObj.SetColCellAlign('REFE_ITEM1','center'); 


	GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//�������
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);

}

function setHeader2(GridObj2) { // �ֹ�����

	
	GridObj2.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100		,0   ,false);
  	GridObj2.AddHeader("ITEM_ID"		,"ITEM_ID"     		,"t_text" 	,100		,0   ,false); //0 
  	GridObj2.AddHeader("PLANT_ID"		,"�÷�ƮID"      		,"t_text" 	,100		,60  ,false); //0 
  	GridObj2.AddHeader("PLANT_NAME"		,"�÷�Ʈ��"     		,"t_text" 	,500		,77  ,false); //0  
  	GridObj2.AddHeader("PRIORITY"		,"����켱����"   		,"t_text" 	,500		,90  ,true); //0   
  	GridObj2.AddHeader("REP_ITEM_ID"	,"��ǥ��ǰ"			,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("REP_RATIO"		,"��ǥ��ǰ\n����"     	,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("BOX_PER_PALET"	,"�ķ�Ʈ��\nBOX��"    ,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_PICK_QTY"	,"�ּ�PICKING\n����" 	,"t_number" ,100.3		,88  ,true); //0   
  	GridObj2.AddHeader("ALLOC_RATE"		,"�����"  			,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_ALLOC_QTY"	,"�ּҹ����"      	,"t_number" ,100.3		,77  ,true); //0    
  	GridObj2.AddHeader("DAYWEEK_PATTERN","���꼱ȣ\n����"     	,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MC_TYPE"		,"��������"     		,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MIN_LOT_SIZE"	,"�ּһ���\n����"		,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("MAX_LOT_SIZE"	,"�ִ����\n����"		,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("STD_FIX_COST"	,"ǥ�ؿ���\n������"	,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("STD_CHG_COST"	,"ǥ�ؿ���\n������"	,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("REAL_FIX_COST"	,"����������\n������"	,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
  	GridObj2.AddHeader("REAL_CHG_COST"	,"����������\n������"	,"t_number" ,100.3		,70  ,false); //0   ȭ�� ����
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    
	GridObj2.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj2.SetColHide("CRUD",true);
    
	GridObj2.SetColFix('PLANT_NAME');

}
   
	// �÷� ����

function setGrid(){
	//GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	GridObj.SetColFix('ITEM_NAME');
}


function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	//GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
}



/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {            
			/*edit cell���� ����*/         	
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell���� ����
				GridObj.SetCellBgColor('ITEM_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj.SetCellBgColor('CAT03', i, color_edit_col );
				GridObj.SetCellBgColor('CAT06', i, color_edit_col );
				GridObj.SetCellBgColor('EX_NATION', i, color_edit_col );
				GridObj.SetCellBgColor('CAT07', i, color_edit_col );
				GridObj.SetCellBgColor('CM_GUBN', i, color_edit_col );
				GridObj.SetCellBgColor('SALES_PLAN_APPL_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('MULTI_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI_UOM', i, color_edit_col );
				GridObj.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj.SetCellBgColor('PACK_PROC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('CAT01', i, color_edit_col );
				GridObj.SetCellBgColor('CAT02', i, color_edit_col );
				GridObj.SetCellBgColor('CAT04', i, color_edit_col );
				GridObj.SetCellBgColor('CAT05', i, color_edit_col );
				GridObj.SetCellBgColor('TRANS_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('PROD_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1_NAME', i, color_edit_col );
				GridObj.SetCellBgColor('SEARCH_FLAG', i, color_edit_col );

				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font ����
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font ����
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font ����
			}
		
		/* VER 2.0 ������� */
		if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
			GridObj.SetRowScroll(rFirst); 
		
/*			
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", 0);
	    document.all.sel_item_id.value	= sel_item_id;
	    
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", 0);
	    document.all.sel_item_name.value	= sel_item_name;			
		doQuery2(0);	
*/		
		
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

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	//GridObj2.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'SHIP_QTY');
		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);
		  	
			/*edit cell���� ����*/         	
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell���� ����
				GridObj2.SetCellBgColor('PRIORITY', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_ITEM_ID', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_RATIO', i, color_edit_col );
				GridObj2.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('ALLOC_RATE', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_ALLOC_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('DAYWEEK_PATTERN', i, color_edit_col );
				GridObj2.SetCellBgColor('MC_TYPE', i, color_edit_col );
				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font ����
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font ����
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font ����
			}		  	  
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2") {

		if(GridObj2.GetStatus() == "true") {// 
			doQuery2(save_nRow);	
		} else {
			var error_msg = GridObj2.GetMessage();// 
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
	rFirst = 0; /* VER 2.0 ������� */

    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){
	
	// ���� �ڵ� �÷��̸� �������� Ȯ��
	if( strColumnKey == "REFE_ITEM1"||strColumnKey == "REFE_ITEM1_NAME" ){
		if(GridObj.GetCellValue("REFE_ITEM1", nRow) != "") {
			if(confirm("����ǰ���� �����Ͻðڽ��ϱ�?") == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow,"");
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, "");
				alert("�����ϼž� �ݿ��˴ϴ�!");
			}
		}
		//openItemSearchPop( strColumnKey, nRow );
	}else if(strColumnKey == "ITEM_HIST" ){
		/* ǰ���̷� ���� */
		chk_item_hist(strColumnKey, nRow);
	} else{
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	    document.all.sel_item_id.value	= sel_item_id;
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);
	    document.all.sel_item_name.value	= sel_item_name;
	    
	    save_nRow = nRow;
	    
		doQuery2(nRow);		
	}     
	
}       


/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	/*
	// if �������� �����ʹ� ���� �Ұ�!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {

	}else{
		alert("Ȯ���� �׸��� �����ϽǼ� �����ϴ�!");
		GridObj.SetComboSelectedIndex(strColumnKey, nRow,  nOldIndex);
		return; 
	}	
	 
	
	var version		= document.all.version.value;	
    var sel_dmd	= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
    document.all.sel_dmd.value = sel_dmd;
    document.all.sel_item_id.value = sel_item_id;
    */

    
    //doQuery3(nRow);
    
	//alert("calPrDateNo ����");
    
	//calPrDateNo(nRow);
		
};


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	// ��ǰ �ڵ� ����� 
	if( strColumnKey == "REFE_ITEM1" ){
		// ��ǰ �� set
		if(nNewValue != "") // �����ڵ� ������ ���� ��ĭ�� ����� �˾�â�� ����� �ʴ´�
			getItemInfo( nRow, nNewValue );
	}	
}
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

/*��������������������������������������������������������������������������������������������������������������
  ������� ���� �Է°����κ��� ��ǰ���� ��ȸ
  ����ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻� Fnc
  ��������������������������������������������������������������������������������������������������������������*/
function getItemInfo( nRow, nNewValue ) {
	
	var ItemId = nNewValue;
	// ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("REFE_ITEM1", nRow);
		return;
	}
	
	replenishPlan.getItemInfo('', ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
			// ��ġ�ϴ� ��� 1��
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow, arrList[0][0]);
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, arrList[0][1]);
			}
			else {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
		}
	});
}

/*������������������������������������������������������������������������
  ����ǰ �˻� POPUP  Fnc
  ������������������������������������������������������������������������*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow;
	var OpenWindow = "md_01060_itemMasterManagement_list_new";
	var code_input = GridObj.GetCellValue("REFE_ITEM1", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx + "&OpenWindow=" + OpenWindow;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}

    
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var domain		= document.all.domain.value;
       var item_type	= document.all.item_type.value;  
       var serch_word	= document.all.serch_word.value;  
       var sell_stop_date	= document.all.sell_stop_date.value;  
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("domain", domain);
       GridObj.SetParam("item_type", item_type);
       GridObj.SetParam("serch_word", serch_word);
       GridObj.SetParam("sell_stop_date", sell_stop_date);
       
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) { //�ֹ�����

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);

	GridObj2.DoQuery(servlet_url);
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



//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/


/*������������������������������������������������������������������������
  ��WiseGrid Row Scroll Event
  ������������������������������������������������������������������������*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
}

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
	doSave2();
};

// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
function doSave2() {
 
	var GridObj2 = document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
 

/* ǰ�� �̷� ��� */
function chk_item_hist(strColumnKey, nRow) {


    var item_id;
    var item_name;
    var hist_flag;
	var old_item_id;
	var old_item_name;
	var user_id = document.frm._user_id.value;
	var idx = nRow;

//alert(user_id);
		item_id 	= GridObj.GetCellValue("ITEM_ID", idx);
		item_name 	= GridObj.GetCellValue("ITEM_NAME", idx);
		hist_flag 	= GridObj.GetCellValue("ITEM_HIST", idx);
		

		
///////////////////////////////////
		if(hist_flag == "X" ){
			if(confirm(item_id+":"+item_name+" �� ǰ���̷��� ����Ǿ� ���� �ʽ��ϴ�.\nǰ�� �̷��� �����Ͻðڽ��ϴ�?") == 1 ) {
				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
			}
		}else{

			commonUtil.getCodeInfo("item_id", item_id, "md_01060_get_old_item_id", 
			{ 
				callback:function(arrList)
				{
					if( arrList.length == 1 )
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					else
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					
			if(confirm(item_id+"["+item_name+"] �� "+old_item_id+"["+old_item_name+"] ǰ���̷��� ����Ǿ��ֽ��ϴ�.\nǰ�� �̷��� �ٽ� �����Ͻðڽ��ϴ�?") == 1 ) {

				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
				
			}
				}
			});//commonUtil.getCodeInfo end
		}

}

