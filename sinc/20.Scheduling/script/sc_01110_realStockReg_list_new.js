//## ���α׷�ID      : sc_01110_realStockReg_list_new.js
//## ���α׷���      : ���� ��� ��� �� ����
//## ��������        : ������
//## ��������        : 2011-11-01 ȭ����
//##
//## ���� job file   : job_sinc_20_scheduling_03.xml
//## ���� query file : query_sinc_20_scheduling_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-01  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_01110_realStockReg_list_new';

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
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	//GridObj.SetColHide("CRUD", true); 
 	GridObj.AddHeader("PLANT_ID"	  ,"�����ȣ"	         ,"t_text"     ,100	    ,0    ,false); //0
	GridObj.AddHeader("PLANT_NAME"	  ,"����"		     ,"t_text"	   ,100	    ,100  ,false); //0
 	GridObj.AddHeader("ITEM_ID"	      ,"�����ڵ�"		     ,"t_text" 	   ,100	    ,90   ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	  ,"�����"	         ,"t_text" 	   ,100	    ,210  ,false); //0
 	GridObj.AddHeader("SPEC"		  ,"�԰�"	         ,"t_text" 	   ,100	    ,110  ,false); //0
 	GridObj.AddHeader("ERP_QTY"		  ,"ERP  ���(EA)"    ,"t_number"   ,100.3	,90   ,false); //0
 	GridObj.AddHeader("REAL_QTY"	  ,"����� ����(EA)"	 ,"t_number"   ,100.3	,110   ,true); //0
 	GridObj.AddHeader("BASE_UOM"	  ,"BASE_UOM"        ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("CONV_QTY"	  ,"ȯ�� ����"	     ,"t_number"   ,100	    ,70    ,true); //0
 	GridObj.AddHeader("CONV_UOM"	  ,"CONV_UOM"	     ,"t_text"     ,100.3   ,0    ,false); //0
 	GridObj.AddHeader("ITYPE"	      ,"���籸��"	         ,"t_text" 	   ,100	    ,0    ,false); //0
 	GridObj.AddHeader("MOD_FLAG"	  ,"ǰ�񱸺�"	         ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("BOX_QTY"	      ,"ȯ�� ����(BOX)"	 ,"t_number"   ,100.3   ,110   ,true) //0
 	GridObj.AddHeader("SAFETY_STOCK"  ,"���� ���(EA)"	 ,"t_number"   ,100.3   ,100   ,true); //0

	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_NAME','center');
    GridObj.SetColCellAlign('ITEM_ID','left'); 
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','left');
    GridObj.SetColCellAlign('ERP_QTY','right');
    GridObj.SetColCellAlign('REAL_QTY','right'); 
    GridObj.SetColCellAlign('CONV_UOM','right');
    GridObj.SetColCellAlign('CONV_QTY','right');
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('SAFETY_STOCK','right');

    
    GridObj.SetNumberFormat("ERP_QTY",      "###,###.#");
    GridObj.SetNumberFormat("REAL_QTY",     "###,###.#");
    GridObj.SetNumberFormat("CONV_QTY",     "###,###.#");
    GridObj.SetNumberFormat("BOX_QTY",      "###,###.#");
    GridObj.SetNumberFormat("SAFETY_STOCK", "###,###.#");

	
	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);

}
	// �÷� ����

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
		  	GridObj.AddSummaryBar('SUMMARY', '��ü�հ�', 'summaryall', 'sum', 'ERP_QTY,REAL_QTY,BOX_QTY');
		  	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot); 
				for(var i=0;i<GridObj.GetRowCount();i++) { 
						GridObj.SetCellBgColor('REAL_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('CONV_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('BOX_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('SAFETY_STOCK', i, color_edit_col);
				}    
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
function GridCellClick(strColumnKey, nRow) {
	
}	
               
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
 
   
// ������ ����
function GoSave  (service) {

    var in_cnfm_date	    = document.all.in_cnfm_date.value;
    var sel_plant	        = document.all.sel_plant.value;   
    var sel_halb_type	    = document.all.sel_halb_type.value;
   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
    GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
    GridObj.SetParam("sel_plant",     sel_plant);
	GridObj.SetParam("sel_halb_type", sel_halb_type);
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	if(sel_plant == 'SUM'){
	   alert("���庰�� ��ȸ�� �۾��Ͻʽÿ�.");
	   return;
	}
	GridObj.DoQuery(servlet_url, "CRUD");
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	// user_id
	
//	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

}

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var in_cnfm_date	        = document.all.in_cnfm_date.value;
       var sel_plant	        = document.all.sel_plant.value;   
       var sel_halb_type	    = document.all.sel_halb_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
  
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
       GridObj.SetParam("sel_plant",     sel_plant);
	   GridObj.SetParam("sel_halb_type", sel_halb_type);
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
//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/

//
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var sel_plant	        = document.all.sel_plant.value;
	
	/* 1 */
	if(sel_plant == 'SUM'){
	   alert("���庰�� ��ȸ�� �۾��Ͻʽÿ�.");
	   GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	   return;
	}
	if(strColumnKey == 'REAL_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'CONV_QTY'){
		cal_ea_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'BOX_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}
		
 	
}

/* EA������ �޾Ƽ� BOX �������� ȯ��*/
function cal_box_qty(nRow, strColumnKey) {


	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
	
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	box_qty = Math.round(real_qty / conv_qty);
	GridObj.SetCellValue("BOX_QTY", nRow,  box_qty);
			
}

/* BOX������ �޾Ƽ�  EA�������� ȯ��*/
function cal_ea_qty(nRow, strColumnKey) {

	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	real_qty = Math.round(conv_qty * box_qty);
	GridObj.SetCellValue("REAL_QTY", nRow,  real_qty);	
}