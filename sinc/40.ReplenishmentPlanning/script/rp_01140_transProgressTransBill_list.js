//## ���α׷�ID      : rp_01140_transProgressTransBill_list.js
//## ���α׷���      : ���� ��ǥ�� �������� ��Ȳ
//## ������          : ���ؼ�
//## ��������        : 2008-09-08 ������
//##
//## ���� job file   : job_sinc_40_replenishmentPlanning_00.xml
//## ���� query file : query_sinc_40_replenishmentPlanning_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2010-10-26  ������      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01140_transProgressTransBill_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;

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

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '���� ���'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible ���¹� ���� 
    
    //GridObj.bRowSelectorVisible = true   
         
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex   = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize         = 18; //Header Size
    //GridObj2.strHDClickAction  = "sortsingle";
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj2.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '���� ���'; 

}
	// status bar visible ���¹� ���� 
    
    //���õ� ���� ���ڻ� �����Ѵ�.
//    GridObj4.strSelectedCellFgColor = '180|82|205';
//    GridObj4.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj4.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
//	GridObj4.nCellFontSize = 9;					// Font Size 9
//}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
//	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,60  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0   
	
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("TRANS_DATE"		,"��������"		    ,"t_text"	    ,20		  ,80    ,false); //0   
 	GridObj.AddHeader("SRC_LOC_ID"	    ,"SRC_LOC_ID"		,"t_text" 	    ,100	   ,0    ,false); //0   
 	GridObj.AddHeader("SRC_LOC"	        ,"������"		    ,"t_text" 	    ,100	  ,65    ,false); //0   
 	GridObj.AddHeader("TGT_LOC_ID"		,"TGT_LOC_ID"	    ,"t_text" 	    ,100	   ,0    ,false); //0
 	GridObj.AddHeader("TGT_LOC"		    ,"�԰����"	        ,"t_text" 	    ,100	  ,80    ,false); //0
 	GridObj.AddHeader("TRUCK_SEQ"		,"������ȣ"	        ,"t_number" 	,100	  ,65    ,false); //0
 	GridObj.AddHeader("BRAND_NO"		,"��ǥ��ȣ"		    ,"t_text"	    ,100	  ,75    ,false); //0
 	GridObj.AddHeader("PLT_QTY"		    ,"PLT����"		    ,"t_number" 	,100.3	  ,65    ,false); //0    
 	GridObj.AddHeader("BOX_QTY"			,"BOX����"		    ,"t_number" 	,100.3	  ,65    ,false); //0
 	GridObj.AddHeader("PLAN_TYPE"		,"����"		        ,"t_text" 	    ,100	   ,0    ,false); //0
	GridObj.AddHeader("PLAN_TYPE_NAME"	,"��������"	        ,"t_text" 	    ,100	 ,100    ,false); //0 	   
 	GridObj.AddHeader("MADE_TIME"		,"����ð�"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("CHGO_TIME"		,"���ð�"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("IPGO_TIME"		,"�԰�ð�"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("LOAD_TIME"		,"�����ð�"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TRANS_TIME"		,"���۽ð�"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TOT_TIME"		,"�Ѽҿ�ð�"		    ,"t_text" 	    ,160	  ,75    ,false); //0
 	GridObj.AddHeader("TRANS_STATE"		,"��������"		    ,"t_text" 	    ,160	  ,70    ,false); //0
 	GridObj.AddHeader("MICHGO"		    ,"��������"		    ,"t_number"     ,100.3	  ,70    ,false); //0

	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

//    GridObj.SetColCellAlign('DEFAULT_GUBN','center'); 
    GridObj.SetColCellAlign('TRANS_DATE','center');
    GridObj.SetColCellAlign('SRC_LOC','center'); 
    GridObj.SetColCellAlign('TGT_LOC','center');
    GridObj.SetColCellAlign('TRUCK_SEQ','center');
    GridObj.SetColCellAlign('BRAND_NO','center');
    GridObj.SetColCellAlign('PLT_QTY','right'); 
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('PLAN_TYPE_NAME','center');
    GridObj.SetColCellAlign('MADE_TIME','center');
    GridObj.SetColCellAlign('CHGO_TIME','center');
    GridObj.SetColCellAlign('IPGO_TIME','center');
    GridObj.SetColCellAlign('LOAD_TIME','center');
    GridObj.SetColCellAlign('TRANS_TIME','center');
    GridObj.SetColCellAlign('TOT_TIME','center');
    GridObj.SetColCellAlign('TRANS_STATE','center');
    GridObj.SetColCellAlign('MICHGO','right');
    
    GridObj.SetNumberFormat("PLT_QTY", "##,##0.#");
    GridObj.SetNumberFormat("BOX_QTY", "##,##0.#");
    GridObj.SetNumberFormat("MICHGO",  "##,##0.#");
    
//    GridObj.SetColCellAlign('ALLOC_FLAG','center'); 
//	  GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//�������
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	//GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);

}




function setHeader2(GridObj2) { // ��������

  	GridObj2.AddHeader("PROD_CODE"		,"��ǰ�ڵ�"    ,"t_text"   	,100	 ,100    ,false); //0 
  	GridObj2.AddHeader("PROD_NAME"	    ,"��ǰ��"      ,"t_text" 	 	,100	 ,180    ,false); //0  
  	GridObj2.AddHeader("TP_BOX"	        ,"PLT����"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TP_PLT"	        ,"BOX����"     ,"t_number" 	,100.3	  ,70    ,false); //0
  	GridObj2.AddHeader("TA_BOX"	        ,"PLT����"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TA_PLT"	        ,"BOX����"     ,"t_number" 	,100.3	  ,70    ,false); //0
   	GridObj2.AddHeader("TRANS_STATE"	,"��������"     ,"t_text" 	,100     ,100    ,false); //0
  	GridObj2.AddHeader("MICHGO"	        ,"�����з�"   ,"t_number"  	,100.3	 ,100    ,false); //0

	/* ���� �ش� �߰� */
	GridObj2.AddGroup("HD1"	,"���۰�ȹ");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj2.AppendHeader("HD1", "TP_PLT");
	GridObj2.AppendHeader("HD1", "TP_BOX");
	GridObj2.AddGroup("HD2"	,"���۽���");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj2.AppendHeader("HD2", "TA_PLT");
	GridObj2.AppendHeader("HD2", "TA_BOX");
	 	    
	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('PROD_CODE','center'); 
    GridObj2.SetColCellAlign('PROD_NAME',  'left');
    GridObj2.SetColCellAlign('TP_PLT',    'right');
    GridObj2.SetColCellAlign('TP_BOX',	  'right');
    GridObj2.SetColCellAlign('TA_PLT',	  'right');
    GridObj2.SetColCellAlign('TA_BOX',	  'right');
    GridObj2.SetColCellAlign('TRANS_STATE','center');
    GridObj2.SetColCellAlign('MICHGO',	  'right');
   
    GridObj2.SetNumberFormat("TP_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TP_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("TA_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TA_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("MICHGO", "##,##0.#");

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
		  	GridObj.AddSummaryBar('SUMMARY', '��ü�հ�', 'summaryall', 'sum', 'PLT_QTY,BOX_QTY,MICHGO');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			GridObj2.SetGroupMerge(	'PROD_CODE,PROD_NAME');
		  	GridObj2.AddSummaryBar('SUMMARY', '��ü�հ�', 'summaryall', 'sum', 'TP_PLT,TP_BOX,TA_PLT,TA_BOX,MICHGO');
		  	GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
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
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     
	doQuery2(nRow);		
}        
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var trans_start	        = document.all.trans_start.value;
       var trans_end	        = document.all.trans_end.value;   
       
       var search_item	    	= document.all.search_item.value;
       
       //var item_id				= document.all.item_id.value;
       var selected_src_loc	    = document.all.selected_src_loc.value;
       var selected_tgt_loc	    = document.all.selected_tgt_loc.value;
       var selected_plan_type	= document.all.selected_plan_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
//       var sort_flag	= document.all.sort_flag.value;  
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start",        		  trans_start);
       GridObj.SetParam("trans_end",          		    trans_end);
       
       
       GridObj.SetParam("search_item", 				   search_item);
       
       //GridObj.SetParam("item_id",						  item_id);
	   GridObj.SetParam("selected_src_loc",   	selected_src_loc);
	   GridObj.SetParam("selected_tgt_loc",   	selected_tgt_loc);
	   GridObj.SetParam("selected_plan_type", selected_plan_type);
	   GridObj.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) { //��������

       var trans_date	    = GridObj.GetCellValue("TRANS_DATE", nRow);
       var src_loc	        = GridObj.GetCellValue("SRC_LOC_ID", nRow);
       var tgt_loc	        = GridObj.GetCellValue("TGT_LOC_ID", nRow);
       var truck_seq	    = GridObj.GetCellValue("TRUCK_SEQ",  nRow);
       var brand_no	        = GridObj.GetCellValue("BRAND_NO",  nRow);
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", 	src_loc);
	GridObj2.SetParam("tgt_loc", 	tgt_loc);
	GridObj2.SetParam("truck_seq",  truck_seq);
	GridObj2.SetParam("brand_no", 	brand_no);
	GridObj2.DoQuery(servlet_url);
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

















//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/


//