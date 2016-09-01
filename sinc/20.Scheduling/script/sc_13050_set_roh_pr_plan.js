//#############################################################
//## ���α׷���		: sc_13050_set_roh_pr_plan.js / SCMǰ��������ȸ
//## ���α׷���      	: ���밡�� ������ ����ȭ��
//## ������         	: �ǿ���
//## ��������        	: 2012-08-31
//##
//## ���� job file   : 
//## ���� query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2012-08-31  �ǿ���      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_13050_set_roh_pr_plan';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;
var GridObj4;
//var GridObj5;

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
            maxWidthValue	= window.innerWidth;
            maxHeightValue	= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue	= document.body.clientWidth;
            maxHeightValue	= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue		+= Number(search_h); 
            tableHeightValue	+= Number(search_h); 
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

	GridObj.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex	= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines			= 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor		= "170|170|170";    //���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 8.5;					// Font Size 9
	//GridObj.strCellFontName = '���� ���'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible ���¹� ���� 


    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines				= 2;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor	= '180|82|205';
    GridObj2.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj2.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.

	// Cell Font Setting
	GridObj2.nCellFontSize			= 8.5;					// Font Size 9
	//GridObj2.strCellFontName = '���� ���'; 
	GridObj2.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 

}
function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj3.nHDLineSize			= 13; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj3.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.nCellFontSize			= 8.5;					// Font Size 9

    GridObj3.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj4.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle"; 
    //GridObj4.bStatusbarVisible = false;				// status bar visible ���¹� ���� 
    
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj4.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj4.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault5() { 

	GridObj5.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj5.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj5.nHDLineSize			= 12; //Header Size
    GridObj5.bStatusbarVisible		= false;				// status bar visible
    
    //GridObj2.strHDClickAction    = "sortsingle";
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj5.strSelectedCellFgColor = '180|82|205';
    GridObj5.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj5.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj5.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault6() { 

	GridObj6.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj6.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj6.nHDLineSize			= 13; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    GridObj6.bStatusbarVisible		= false;				// status bar visible
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj6.strSelectedCellFgColor	= '180|82|205';
    GridObj6.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj6.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj6.nCellFontSize			= 8.5;					// Font Size 9
}
function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj7.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj7.nHDLineSize			= 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj7.strActiveRowBgColor	= "170|170|170";    //���õ� ���� �������� �����Ѵ�.
	GridObj7.nCellFontSize			= 8.5;					// Font Size 9
	GridObj7.bStatusbarVisible		= true;				// status bar visible ���¹� ����
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0   
 	GridObj.AddHeader("IF_FLAG"			,"����\n����"     ,"t_text" 		,100	,38  ,false); //0   
	
	
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("ITEM_ID"			,"ǰ���ȣ"		 ,"t_text" 		,20		,60  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"     	 ,"t_text" 		,100	,140 ,false); //0    
	GridObj.AddHeader("SEQ"				,"����"       	 ,"t_text" 		,20		,40  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"����ǰ��"      	 ,"t_text" 		,80	,80 ,false); //0    

 	GridObj.AddHeader("BASE_UOM"		,"�⺻\n����"   	 ,"t_text" 		,100	,50 ,false); //0    
 	GridObj.AddHeader("STOCK_QTY"		,"����\n���"		 ,"t_number" 	,100.5	,60  ,true); //0   //2012-11-14 ������ // 
 	GridObj.AddHeader("PROD_QTY"		,"����\n�ʿ䷮"    ,"t_number" 	,100.5	,60 ,false); //0    
 	
 	GridObj.AddHeader("IPGO"			,"����\n�԰�"    ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("SIL_IPGO"		,"����\n�԰�"	,"t_number" 	,100.5	,60 ,true); //0	//2013-02-12 ������ //
 	    
 	
 	GridObj.AddHeader("W1_STOCK"		,"����\n�������" 	 ,"t_number" 	,100.5	,60  ,false); //0   //2013-02-13 ������ ����// 
 	
 	GridObj.AddHeader("W1_PROD_QTY"		,"����\n�ʿ䷮"    ,"t_number" 	,100.5	,60 ,false); //0    
 	
 	GridObj.AddHeader("W1_IPGO"			,"����\n�԰�"    ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("W1_SIL_IPGO"		,"���� ����\n�԰�"	,"t_number" ,100.5	,60 ,true); //0	//2013-02-12 ������ //


 	GridObj.AddHeader("W2_STOCK"		,"������\n�������" ,"t_number" 	,100.5	,60  ,false); //0   //2013-02-04 ������ // 


 	GridObj.AddHeader("REQ_QTY"			,"����\n�ʿ䷮"     ,"t_number" 	,100.5	,60 ,false); //0
 	GridObj.AddHeader("PR_QTY"			,"����\n���ַ�"     ,"t_number" 	,100.5	,60  ,true); //0
 	GridObj.AddHeader("TGT_LOC"			,"�԰�\n������ġ"   ,"t_combo" 	,100	,60  ,true); //0
 	GridObj.AddHeader("PR_DATE"			,"����\n�䱸��"     ,"t_text" 	,100	,80  ,true); //0
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"�ּ�\n���ַ�"     ,"t_number" 	,100.5	,80  ,true); //0	//2012-11-14 ������ //
 	
 	GridObj.AddHeader("LOT_SIZE"		,"����\n����"       ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-13 ������ ���� ������//
 	GridObj.AddHeader("SAFETY_STOCK"	,"����\n���"       ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-13 ������ ���� ������//
 	
 	GridObj.AddHeader("UNIT_COST"		,"�ܰ�"     		  ,"t_number" 	,100.5	,70  ,true); //0	//2013-02-12 ������ //
 	GridObj.AddHeader("CUST_CODE"		,"����\n��ü"      ,"t_text" 		,100	,70  ,true); //0
 	GridObj.AddHeader("CUST_NAME"		,"����\n��ü"      ,"t_text" 		,100	,70 ,false); //0

 	//   
 	GridObj.AddHeader("PR_NO"			,"PR ��ȣ"     	  ,"t_text" 	,100	,60   ,true); //0   
 	GridObj.AddHeader("IF_MSGS"			,"IF �޼���"       ,"t_text" 		,100	,220  ,true); //0   
 	//GridObj.AddHeader("ITYPE"			,"ITYPE"      ,"t_text" 	,100	,0  ,true); //0   ��ȸ�� ���� ���簪


	GridObj.BoundHeader();	

	GridObj.SetNumberFormat("STOCK_QTY"   		,"#,##0.##");
	GridObj.SetNumberFormat("PROD_QTY"   		,"#,##0.##");
	
	GridObj.SetNumberFormat("SIL_IPGO"   		,"#,##0.##");		//2013-02-12 ������ //
	
	GridObj.SetNumberFormat("IPGO"   			,"#,##0.##");
	GridObj.SetNumberFormat("W1_STOCK"   		,"#,##0.####");
	GridObj.SetNumberFormat("W1_PROD_QTY"   	,"#,##0.##");
	
	GridObj.SetNumberFormat("W1_SIL_IPGO"   	,"#,##0.##");		//2013-02-12 ������ //
	
	GridObj.SetNumberFormat("W1_IPGO"   		,"#,##0.##");
	
	GridObj.SetNumberFormat("W2_STOCK"  		,"#,##0.####");
	GridObj.SetNumberFormat("REQ_QTY"   		,"#,##0.##");
	GridObj.SetNumberFormat("PR_QTY"   			,"#,##0.##");
	GridObj.SetNumberFormat("MIN_LOT_SIZE"  	,"#,##0.##");
	GridObj.SetNumberFormat("LOT_SIZE"   		,"#,##0.##");
	GridObj.SetNumberFormat("SAFETY_STOCK"   	,"#,##0.##");
	GridObj.SetNumberFormat("UNIT_COST"  		,"#,##0.##");



    GridObj.SetColCellAlign('SELECTED','center'); 
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('ITEM_NAME','left'); 
    GridObj.SetColCellAlign('SEQ','center'); 
    GridObj.SetColCellAlign('BASE_UOM','left');
    GridObj.SetColCellAlign('PR_DATE','center'); 
    
    
    
    //GridObj.SetColCellAlign('IF_FLAG','center'); 
    
    
    //GridObj.SetColCellAlign('SEL_DMD','center'); 

	GridObj.SetColFix('CONS_ITEM_NAME');


    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
    

	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
	//GridObj.SetColHDBgColor('STD_STOCK','253|228|229');
	//GridObj.SetColHDBgColor('PR_DATE_NO','253|228|229');
	//GridObj.SetColHDBgColor('PR_QTY','253|228|229');

    
    //GridObj.bCellFontBold = true; 
	
	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	
	

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
	
	GridObj.SetCellValue("SELECTED", nRow, "1");
	//var version			= document.all.version.value;	
    //var sel_dmd			= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    //var sel_item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
    //var sel_item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
    
    //var sel_loc_name	= GridObj.GetCellHiddenValueValue("TGT_LOC", nRow);
    //var sel_loc_name	= GridObj.GetCellValue("TGT_LOC", nRow);
    
    //document.all.sel_dmd.value			= sel_dmd;
    //document.all.sel_item_id.value		= sel_item_id;
    //document.all.sel_item_name.value	= sel_item_name;
    //document.all.sel_loc_name.value		= sel_loc_name;
    

    
   // doQuery3(nRow);
    
	//alert("calPrDateNo ����");
    
	//calPrDateNo(nRow);
		
};

function calPrDateNo(nRow){ // ����� ����(�������,��������)�� �ݿ��Ͽ� �԰� �ñ⸦ ����..

	//alert("calPrDateNo ����");

	var version				= document.all.version.value;	
    var sel_dmd				= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", nRow);
	//alert("sel_dmd="+sel_dmd);
	//alert("sel_item_id="+sel_item_id);
    document.all.sel_dmd.value		= sel_dmd;
    document.all.sel_item_id.value	= sel_item_id;

    var std_stock			= GridObj.GetCellValue("STD_STOCK", nRow); //�������
    var tot_stock			= GridObj.GetCellValue("TOT_STOCK", nRow); //�����
    
	//alert("std_stock="+std_stock);
	//alert("tot_stock="+tot_stock);
    var sales_mean_3month	= GridObj.GetCellValue("SALES_MEAN_3MONTH", nRow); //3���� ���
    var avg_qty 			= GridObj.GetCellValue("AVG_QTY", nRow); //��� (12����)
    var last_year			= GridObj.GetCellValue("LAST_YEAR", nRow); //���⵿��
    

    var lead_time			= GridObj.GetCellValue("LEAD_TIME", nRow); //����Ÿ��
    var tot_lead_time		= GridObj.GetCellValue("TOT_LEAD_TIME", nRow); //����Ÿ�� ���� ȯ��
    
    var safety_stock		= GridObj.GetCellValue("SAFETY_STOCK", nRow); //��� (12����)    
    var pr_date_no			= GridObj.GetCellValue("PR_DATE_NO", nRow); //���ֽñ�     
    
    var entr_date			= GridObj.GetCellValue("ENTR_DATE", nRow); //���ֽñ�     

    
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
	
	//alert("safety_stock="+safety_stock);
	//alert("pr_date_no="+pr_date_no);
	
		pr_date_no_temp = Math.round(tot_lead_time);
		//pr_date_no_temp = Math.round(0);		//alert("pr_date_no_temp="+pr_date_no_temp);
		var result;
		commonUtil.toDate(version,'YYYY-MM-DD','DAY', pr_date_no_temp ,{
		callback:function(result){
		// result���� �԰�ñ��̴�.
		 entr_date =  	result;
		//alert("entr_date="+entr_date);
		GridObj.SetCellValue("ENTR_DATE", nRow,  entr_date);    
		}
		});
		
	
	
	
	GridObj.SetCellValue("PR_DATE_NO",		nRow,  	   pr_date_no);    
	GridObj.SetCellValue("SAFETY_STOCK",	nRow,	 safety_stock);    
	GridObj.SetCellValue("STD_STOCK",		nRow,  		std_stock);

	GridEndQuery() // �԰� �ñ� �� cell ���� �缳��

}


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	
	GridObj.SetCellValue("SELECTED", nRow, "1");

	//ENTR_DATE
	if( strColumnKey == "ENTR_DATE"){
		return;
	}

	// if �������� �����ʹ� ���� �Ұ�!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("Ȯ���� �׸��� �����ϽǼ� �����ϴ�!");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
		return;
	}
	
	if( strColumnKey == "SELECTED"){
		return;
	}

    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);

    document.all.sel_item_id.value = sel_item_id;

	dw1_cal(nRow);
}

function cal_type_cal(){

	for(var i=0;i<GridObj.GetRowCount();i++) {
		//alert(i);
		dw1_cal(i);					
	} 
	
}

function dw1_cal(nRow){
	
	//alert(nRow);
	
	//var sel_data = GridObj.GetSelectedCells(); // ������ �κ��� key�� row�� �����´�
	var i		=	0;
	var rowNo	=	nRow;

	var w1_stock		=	0;	//���� �������	2013-02-13
	var stock_qty		=	0;	//���� ���		2013-02-13
    var ipgo			=	0;	//���� �ʿ䷮		2013-02-13
	var sil_ipgo		=	0;  //���� �԰�
	var	prod_qty		=	0;	//���� �ʿ䷮
	
	var w2_stock		=	0;	//������ �������	2013-02-13
	var w1_stock_qty	=	0;	//���� �������		2013-02-13
    var w1_ipgo			=	0;	//���� �ʿ䷮		2013-02-13
	var w1_sil_ipgo		=	0;	//���� ���� �԰�
	var	w1_prod_qty		=	0;	//���� �ʿ䷮
	
	var cal_type = "";
	
		if(document.frm.cal_type[0].checked 	  == true) cal_type = "ipgo";
		else cal_type = "sil_ipgo";
	
	
	
	for(var i=0;i<GridObj.GetRowCount();i++){
		
		var w1_stock		=	GridObj.GetCellValue("W1_STOCK", nRow);		//	���� �������
		var stock_qty		=	GridObj.GetCellValue("STOCK_QTY", nRow);	//	���� ���
		var ipgo			=	GridObj.GetCellValue("IPGO", nRow);			//	���� �԰�
		var sil_ipgo		=	GridObj.GetCellValue("SIL_IPGO", nRow);		//	���� �԰�
		var prod_qty		=	GridObj.GetCellValue("PROD_QTY", nRow);		//	���� �ʿ䷮
		
		var w2_stock		=	GridObj.GetCellValue("W2_STOCK", nRow);		//	���� �������

		var w1_ipgo			=	GridObj.GetCellValue("W1_IPGO", nRow);			//	���� �԰�
		var w1_sil_ipgo		=	GridObj.GetCellValue("W1_SIL_IPGO", nRow);		//	���� �԰�
		var w1_prod_qty		=	GridObj.GetCellValue("W1_PROD_QTY", nRow);		//	���� �ʿ䷮
		
		//var tgt_loc		=	GridObj.GetCellValue("TGT_LOC", nRow);		//	���� �ʿ䷮
		
		
	
			if(cal_type=="ipgo"){
			w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ strToNum(ipgo)
			w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + strToNum(w1_ipgo)
			
			GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//GridObj.SetCellValue("TGT_LOC",			nRow,  	   tgt_loc);
			
			}else if(cal_type=="sil_ipgo"){
			w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ 	strToNum(sil_ipgo)			
			w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + 	strToNum(w1_sil_ipgo)	

			GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//GridObj.SetCellValue("TGT_LOC",			nRow,  	   tgt_loc);
			}//else{
				
			//w1_stock	=	strToNum(stock_qty)	- strToNum(prod_qty)	+ 	strToNum(sil_ipgo)		- strToNum(ipgo)
			//w2_stock	=	strToNum(w1_stock)	- strToNum(w1_prod_qty) + 	strToNum(w1_sil_ipgo)	- strToNum(w1_ipgo)
			//GridObj.SetCellValue("W1_STOCK",		nRow,  	   w1_stock); 	
			//GridObj.SetCellValue("W2_STOCK",		nRow,  	   w2_stock);
			//1}
				
			
	}
		

	
} 

function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	
	if(nRow == 0){
		alert("��� ������ �����Ҽ� �����ϴ�");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw3()
}


   
function setHeader2(GridObj2) {        

  	GridObj2.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10			,0    ,false); //0   
  	GridObj2.AddHeader("SEQ"		,"BEDAT"       	,"t_text" 	,100		,0    ,false); //0   
  	GridObj2.AddHeader("TXZ01"		,"ǰ���"       	,"t_text" 	,100		,177  ,false); //0   
  	GridObj2.AddHeader("BANFN"		,"PR��ȣ"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("BADAT"		,"��û��"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("LFDAT"		,"��ǰ��û��"     ,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("MENGE"		,"PR����"      	,"t_number" ,100.3		,87   ,false); //0   
  	GridObj2.AddHeader("EBELN"		,"PO��ȣ"      	,"t_text" 	,100		,87   ,false); //0   
  	GridObj2.AddHeader("BEDAT"		,"PO����"      	,"t_text" 	,100		,87   ,false); //0   
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    
    
    GridObj2.SetNumberFormat("MENGE"  , "#,##0.##");
    //GridObj2.SetColCellAlign('SELECTED','center'); 
    
	//GridObj2.SetColFix('PR_NO');

}
   
function setHeader3(GridObj3) {        
       

	var header_length	= 0, j;
	
	
	
	var item_id			= document.all.sel_item_id.value;
	
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_daily_header",{
		callback:function(result){


		  	
		  	GridObj3.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10			,0  ,false); //0   
		  	GridObj3.AddHeader("ITEM_NAME"	,"ǰ���"       	,"t_text" 	,100		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_GUBN"	,"�����ڵ�"      	,"t_text" 	,100.3		,0  ,false); //0   
		  	GridObj3.AddHeader("SEL_NAME"	,"����"       	,"t_text" 	,100.3		,80 ,false); //0   


			for(var i=0 ; i < 22 ; i++){  //19
				if(i < result.length) {
					GridObj3.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 22) { //19
						GridObj3.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,78  ,false);
					}
					else {
						GridObj3.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,78  ,false);
					}
				}
			}
		 	
		  	GridObj3.AddHeader("TP_FLAG"	,"Ÿ���ҽ�"      	,"t_number" ,100.3		,0  ,false); //0   
			
			GridObj3.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		   //GridObj3.SetColCellAlign('SEL_NAME','center'); 
			//GridObj3.SetColFix('SEL_NAME');

			//GridObj3.SetColHDBgColor('MON_M00',		'253|228|229');
			//GridObj3.SetColCellBgColor('MON_M00',	'253|228|229');//PLT
			

			GridObj3.SetNumberFormat("DAY_P15"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P14"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P13"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P12"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P11"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P10"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P09"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P08"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P07"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P06"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_P01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D00"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_D06"  , "#,##0");			
		
		}
	   
	});
}

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      	,"t_text" 	,10		,0  ,false); //0   
  	
	if(week_flag =="M"){ //����
		GridObj4.AddHeader("ITEM_NAME"	,"���� ������"   	,"t_text" 	,100	,87 ,false); //0	
	}else if(week_flag =="W"){//W �ְ� 
		GridObj4.AddHeader("ITEM_NAME"	,"�ְ� ������"   	,"t_text" 	,100	,87 ,false); //0	
	}else{
		GridObj4.AddHeader("ITEM_NAME"	,"�ϰ� ������"   	,"t_text" 	,100	,87 ,false); //0
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //����
		var header_id = "op_02010_Long_Term_Planning_list_dw4_header";	
		
	}else if(week_flag =="W"){//W �ְ� 
		var header_id = "op_02010_Long_Term_Planning_list_dw4_weekly_header";	
	}else{
		var header_id = "op_02010_Long_Term_Planning_list_dw4_daily_header";
		//alert('op_02010_Long_Term_Planning_list_dw4_daily_header');
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
				
			}else if(week_flag =="W"){//W �ְ� 
				GridObj4.SetColHDBgColor('MM_9_QTY','253|228|229');	
			}else{
				GridObj4.SetColHDBgColor('MM_3_QTY','253|228|229');
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
       
  	GridObj5.AddHeader("ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 	,10		,0    ,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,130  ,false); //0   
 	GridObj5.AddHeader("GUBN"		,"����"      ,"t_text" 	,100	,56   ,false); //0   
 	GridObj5.AddHeader("QTY"		,"��뷮"    	,"t_number" ,100.3	,86   ,false); //0   
 	GridObj5.AddHeader("YYYY_MM"	,"��"     	,"t_text" 	,1000	,56  ,false); //0   



	GridObj5.BoundHeader();	

    GridObj5.SetNumberFormat("QTY"  , "#,##0");



    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj5.SetColCellAlign('ITEM_ID','center'); 
    GridObj5.SetColCellAlign('GUBN','center'); 
    GridObj5.SetColCellAlign('YYYY_MM','center'); 
    
    

}
 
function setHeader6(GridObj6) {        
       
  	GridObj6.AddHeader("ITEM_ID"	,"ǰ���ȣ"  		,"t_text" 	,10		,0   ,false); //0   
  	GridObj6.AddHeader("ITEM_NAME"	,"ǰ���"  		,"t_text" 	,100	,0   ,false); //0   
 	GridObj6.AddHeader("PLANT"		,"����"  		,"t_text" 	,100	,81  ,false); //0   
 	GridObj6.AddHeader("MADE_DATE"	,"��������"  		,"t_text" 	,100	,0   ,false); //0   
 	GridObj6.AddHeader("END_DATE"	,"�������"      ,"t_text" 	,100	,85  ,false); //0   
 	GridObj6.AddHeader("TERM"		,"�ܿ���"   		,"t_number" ,100	,65  ,false); //0   
 	GridObj6.AddHeader("QTY"		,"���"			,"t_number" ,1000.3	,95  ,false); //0   
 	GridObj6.AddHeader("FLAG"		,"FLAG"			,"t_text" 	,1000	,0   ,false); //0   

	GridObj6.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj6.SetColCellAlign('ITEM_ID','center'); 
    GridObj6.SetColCellAlign('END_DATE','center'); 

    //  trim �̿��ؼ� ##.# �����͵� ��Ʈ���̶� �ѹ� ������ �ȸ���
    GridObj6.SetNumberFormat("QTY"  , "#,##0");
    //GridObj6.SetNumberFormat("PLT_QTY"  , "#,##0");
    

	//GridObj6.SetColHDBgColor('BOX_QTY','253|228|229');
	//GridObj6.SetColHDBgColor('PLT_QTY','253|228|229');

}

function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("CONS_ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 	,10		,0    ,false); //0   
  	GridObj7.AddHeader("CONS_ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,0    ,false); //0   
  	GridObj7.AddHeader("ITEM_ID"		,"ǰ���ȣ"  	,"t_text" 	,10		,60   ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"		,"ǰ���"  	,"t_text" 	,100	,130  ,false); //0   
 	GridObj7.AddHeader("PROD_QTY"		,"���귮"		,"t_number" ,100.6	,68   ,false); //0   
 	GridObj7.AddHeader("USE_QTY"		,"�̷л�뷮"	,"t_number" ,100.6	,68   ,false); //0   

	GridObj7.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");
 
    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj7.SetColCellAlign('ITEM_ID','center'); 

    GridObj7.SetNumberFormat("PROD_QTY", "#,##0");
    GridObj7.SetNumberFormat("USE_QTY",  "#,##0");


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

function setGrid5(){
	//GridObj5.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
		
	//GridObj5.SetGroupMerge('ITEM_NAME');
	
}

function setGrid3(){
	//GridObj3.SetColCellBgColor('PLT_QTY',color_edit_col);//PLT
	
	
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
    
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell���� ����
				//GridObj.SetCellBgColor('PR_QTY', i, '253|128|129');color_edit_col
				
				var w1_stock	=	GridObj.GetCellValue('W1_STOCK',i) 
				var stock_qty	=	GridObj.GetCellValue('STOCK_QTY',i) 
				var ipgo		=	GridObj.GetCellValue('IPGO',i) 
				
				GridObj.SetCellBgColor('PR_QTY',		i,  color_edit_col);
				GridObj.SetCellBgColor('PR_DATE',		i,  color_edit_col);
				GridObj.SetCellBgColor('TGT_LOC',		i,  color_edit_col);
				GridObj.SetCellBgColor('CUST_CODE',		i,  color_edit_col);
				GridObj.SetCellBgColor('STOCK_QTY',		i, 	color_edit_col);	//���� ��� ������ ���� 2012-10-29//
				
				
				GridObj.SetCellBgColor('MIN_LOT_SIZE',	i, 	color_edit_col);	//�ּ� ���ַ� ������ ���� 2012-10-29//
				GridObj.SetCellBgColor('UNIT_COST',		i, 	color_edit_col);	//�ܰ� ������ ���� 2013-02-12//
				
				GridObj.SetCellBgColor('SIL_IPGO',		i, 	color_edit_col);	//���԰�		������ ���� 2013-02-12//
				GridObj.SetCellBgColor('W1_SIL_IPGO',	i, 	color_edit_col);	//���� ���԰�	������ ���� 2013-02-12//
				
				GridObj.SetCellBgColor('LOT_SIZE',		i, 	color_edit_col);	//���ִ���		������ ���� 2013-02-13//
				GridObj.SetCellBgColor('SAFETY_STOCK',	i, 	color_edit_col);	//�������		������ ���� 2013-02-13//
				
				
				if(GridObj.GetCellValue('PR_QTY',i) == 0 ){  // GREEN
				}else{
					GridObj.SetCellBgColor('ITEM_ID', i, '0|191|255');
					GridObj.SetCellBgColor('ITEM_NAME', i, '0|191|255');
				}					
				

				
				
					
			} 

        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else{ // ����, ���� �����Ͻ� ���α׸��� ����ȸ   
    	GoSearch();
    }
    
    /* ���� �ʿ䷮ ���*/
    cal_pr_qty();
    
	
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	//GridObj2.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'SHIP_QTY');
		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	/* 
		// cell���� ����  : �԰������� �̷��� �׸�� cell���� = BLUE!!
		for(var i=0;i<GridObj2.GetRowCount();i++) {
			if(GridObj2.GetCellValue('DATE_FLAG',i) == Number(1) ){  // GREEN
				GridObj2.SetCellBgColor('IPGO', i, '0|191|255'); //0-191-255
			}
		}	        	               
	*/
	
	
	
}

function GridEndQuery3() {
	
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") { 
			                          
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}


	var header_length = 0, j;

	/* TP_FLAG Ȯ���� ���� */
	var item_id = document.all.sel_item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "op_02010_Long_Term_Planning_list_dw3_daily_header",{
	callback:function(arrList){
		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][3] == "true") {
				//alert(arrList[i][1]+"="+arrList[i][3])
				//GridObj3.SetColCellActivation(arrList[i][1],"edit");
				GridObj3.SetColCellBgColor(arrList[i][1],color_edit_col);//PLT				
			} 	
			else {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}
///////////////////////////////////////////////		
		for(var i=0 ; i < 22 ; i++){   // for(var i=0 ; i < 22 ; i++){
			if(arrList[i][4] == "true") {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellActivation(arrList[i][1],"edit");
				//GridObj3.SetColCellBgColor(arrList[i][1],color_edit_col);//PLT				
			} 	
			else {
				//alert(arrList[i][1]+"="+arrList[i][3])
				GridObj3.SetColCellBgColor(arrList[i][1],"255|255|255");//PLT				
				GridObj3.SetColCellActivation(arrList[i][1],"activatenoedit");
			}
		}		
	}
	}
	);
	
	
}

function GridEndQuery4() {
	
	var mode = GridObj4.GetParam("mode");
	var error_msg = '';
	          
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
	
	var mode = GridObj5.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search5") {
		if(GridObj5.GetStatus() == "true") {      
		     GridObj5.SetGroupMerge(	'ITEM_ID,ITEM_NAME');
		}
		else { 
			error_msg = GridObj5.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	doQuery3();
	doQuery4();
	//alert("nRow="+nRow)
	setGrid5();
}

function GridEndQuery6() {
	
	var mode = GridObj6.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search6") {
		if(GridObj6.GetStatus() == "true") {
		  
		  GridObj6.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PLANT');
		  
		  //GridObj6.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'QTY');
		  //GridObj6.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);
		  
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj6.GetRowCount();i++) {
			// cell���� ����
					if(GridObj6.GetCellValue('FLAG',i) ==  0 ){  // GREEN
				
					//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
					GridObj6.SetCellBgColor('END_DATE', i, '253|128|129');
					GridObj6.SetCellBgColor('TERM', i, '253|128|129');
					GridObj6.SetCellBgColor('QTY', i, '253|128|129');
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
	
	var mode = GridObj7.GetParam("mode");
	var error_msg = '';
	          
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
function cal_pr_qty() {
	//alert("cal_pr_qty");
	
	
	//return;
	var item_id;
	var w2_stock;
	var min_lot_size;
	var lot_size;
	var req_qty = 0;
	var safety_stock;
	
	//���ַ� ���	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		
		item_id			= GridObj.GetCellValue('ITEM_ID', i);
		w2_stock		= Number(GridObj.GetCellValue('W2_STOCK', i));
		min_lot_size	= Number(GridObj.GetCellValue('MIN_LOT_SIZE', i));
		lot_size		= Number(GridObj.GetCellValue('LOT_SIZE', i));
		safety_stock	= Number(GridObj.GetCellValue('SAFETY_STOCK', i));
		 
		if (min_lot_size == 0){
			min_lot_size = 1;
		}
		
		
		if( Number(w2_stock) < Number(0) ){ //������ ������� - �̸� ���ַ� ����
			if(safety_stock == Number(0)){ 
				//req_qty = Number(w2_stock)*-1
				req_qty = min_lot_size*Math.ceil((Number(w2_stock)*-1)/min_lot_size)
				//alert("w2_stock="+w2_stock);
				//alert("req_qty="+req_qty);
			}else{
				//req_qty = min_lot_size;
				req_qty = min_lot_size*Math.ceil((safety_stock+w2_stock)/min_lot_size)
			}
				
				
		}else if(w2_stock < Number(safety_stock)){
			req_qty = min_lot_size;
		}else{
			req_qty = 0;
		}
		
		if((w2_stock + req_qty) < safety_stock ){ //������ ������� + �ּҹ��ַ� �� ��������� ������ ���ִ��� 1ȸ�о� ����.
			//req_qty = min_lot_size*Math.ceil(min_lot_size/safety_stock)
			
			
			//do {
				//req_qty = req_qty+lot_size
			//} while( (w2_stock+ req_qty) < safety_stock )

		}else{

		}
		
		
		GridObj.SetCellValue('REQ_QTY', i,  req_qty);
		
		//return;
	} 
	
	


}		

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	


// �÷� ��� & Ȯ��
function colExtension(obj){
	var GridObj3 = document.WiseGrid3;
	
	var value = document.all.btn_2.value 

	if(value == "Ȯ��"){// true => ���� ����
		document.all.btn_2.value = "���";
		// ���� ��� ����
		GridObj3.SetColHide("DAY_P15", false);
		GridObj3.SetColHide("DAY_P14", false);
		GridObj3.SetColHide("DAY_P13", false);
		GridObj3.SetColHide("DAY_P12", false);
		GridObj3.SetColHide("DAY_P11", false);
		GridObj3.SetColHide("DAY_P10", false);
		GridObj3.SetColHide("DAY_P09", false);
		GridObj3.SetColHide("DAY_P08", false);
		GridObj3.SetColHide("DAY_P07", false);
		GridObj3.SetColHide("DAY_P06", false);
		GridObj3.SetColHide("DAY_P05", false);
		GridObj3.SetColHide("DAY_P04", false);
		GridObj3.SetColHide("DAY_P03", false);
		
		GridObj3.strScrollBars='horizontal';

	}
	else{
		//alert(22);
		document.all.btn_2.value = "Ȯ��";
		//������
		GridObj3.SetColHide("DAY_P15", true);
		GridObj3.SetColHide("DAY_P14", true);		
		GridObj3.SetColHide("DAY_P13", true);		
		GridObj3.SetColHide("DAY_P12", true);		
		GridObj3.SetColHide("DAY_P11", true);		
		GridObj3.SetColHide("DAY_P10", true);		
		GridObj3.SetColHide("DAY_P09", true);		
		GridObj3.SetColHide("DAY_P08", true);		
		GridObj3.SetColHide("DAY_P07", true);		
		GridObj3.SetColHide("DAY_P06", true);		
		GridObj3.SetColHide("DAY_P05", true);		
		GridObj3.SetColHide("DAY_P04", true);		
		GridObj3.SetColHide("DAY_P03", true);	
		
		
	}
}

               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	
	GridObj4.ClearGrid( ); 
	setHeader4(GridObj4);	
	GridObj5.ClearGrid( ); 
	setHeader5(GridObj5);	
	GridObj6.ClearGrid( ); 
	setHeader6(GridObj6);	
	GridObj7.ClearGrid( ); 
	setHeader7(GridObj7);	
	
	//document.all.btn_2.value = "���";
	//colExtension();
	var yyyy_mm = document.all.sysdate.value;
	
	
	
	document.all.from_mm.value = yyyy_mm;
	document.all.to_mm.value = yyyy_mm;	
	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     
	
	if( strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "IF_FLAG" ){
		//alert("�� �� ��ǰ ���� �˾�!!");
		var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
		var item_name	= GridObj.GetCellHiddenValue("ITEM_NAME", nRow);
		//var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
		var qty			= '1';
        var prod_ver	= '';
		
		var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_bom_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name +"&prod_ver=" + prod_ver+ "&qty=" + qty;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=430, top=200, left=200";
		var newWin = window.open(service_url, "sc_13020_set_prod_mst_bom_pop_up", pop_win_style);  
		newWin.focus();				
		
		//return;		
	}else if(strColumnKey == "REQ_QTY" ){//�ʿ䷮ Ŭ���� ���ַ����� ��ȯ!!
		//alert("�ʿ䷮ Ŭ���� ���ַ����� ��ȯ!!");
		GridObj.SetCellValue("PR_QTY", nRow, GridObj.GetCellValue("REQ_QTY", nRow) );
		//GridObj.SetCellValue("TGT_LOC", nRow, GridObj.GetCellHiddenValue("TGT_LOC", nRow) );
		GridObj.SetCellValue("SELECTED", nRow, "1");
		return;		
	}
	

	var yyyy_mm = document.all.sysdate.value;
	document.all.week_flag.value = 'D'
	document.all.from_mm.value = yyyy_mm;
	document.all.to_mm.value = yyyy_mm;		

	// DW1 ����ȸ�� DW3 �ʱ�ȭ

    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);

    document.all.sel_item_id.value	= sel_item_id;
    document.all.sel_item_name.value	= sel_item_name;

	document.frm.serch_flag_chk.checked=false;
	document.frm.serch_flag.value = "N";
	//document.all.week_flag.value = 'M'
	

	//document.all.btn_2.value = "���";
	//colExtension();


	doQuery2(nRow);	
	// doQuery3 �� ���̳��� �ش� ������ DW5 �� ������ ����
	//doQuery3(nRow);	
	//doQuery4(nRow);	
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

       var cust_code	= document.all.cust_code.value;
       var loc_id		= document.all.loc_id.value;
       var item_type	= document.all.item_type.value;
       //var edit_flag	= document.all.edit_flag.value;
       //var domain		= document.all.domain.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("item_type"	, item_type);
       GridObj.SetParam("cust_code", cust_code);	//���޾�ü
       GridObj.SetParam("loc_id", 		loc_id);	//���밡�� �۾���
      // GridObj.SetParam("edit_flag"	, edit_flag);
       
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var seq		= GridObj.GetCellValue("SEQ", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("seq", seq);

	GridObj2.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 3 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= document.all.sel_item_id.value;
    //var std_stock = GridObj.GetCellValue("STD_STOCK", nRow);
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	//GridObj3.SetParam("std_stock", std_stock);
	
	GridObj3.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 4 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= document.all.sel_item_id.value;
	//var itype	= document.all.sel_itype.value;
	
	//alert(itype);
	var week_flag	= document.all.week_flag.value;
	
	//setTimeout("countdown()",10);
	
	//alert(week_flag);
	
	if(week_flag =="M"){ //����
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4");	
	}else if(week_flag =="W"){//W �ְ� 
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4_weekly");	
	}else {// �ϰ�	--2013-03-26 ������ �߰� -- 
		GridObj4.SetParam("query_id", "sc_13050_set_roh_pr_plan_list_dw4_daily");	
	}	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj4.SetParam("itype", itype);
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
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

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype	= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj6.SetParam("itype", itype);
	GridObj6.SetParam("mode", "search6");
	GridObj6.SetParam("item_id", item_id);
	GridObj6.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 7 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery7(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var item_id	= document.all.sel_item_id.value;
	
	var from_mm	= document.all.from_mm.value;
	var to_mm	= document.all.to_mm.value;
	var serch_flag	= document.all.serch_flag.value;
	var itype	= document.all.sel_itype.value;
	

	
	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj7.SetParam("itype", itype);
	GridObj7.SetParam("mode", "search7");
	GridObj7.SetParam("item_id", item_id);
	GridObj7.SetParam("from_mm", from_mm);
	GridObj7.SetParam("to_mm", to_mm);
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
	
	yyyymmdd =  GridObj4.getColHDText(strColumnKey);
	
	//"���������"
	

	var week_flag = document.all.week_flag.value;

	
	if(yyyy_mm == "���� ������" ||yyyy_mm == "�ְ� ������"||yyyymmdd == "�ϰ� ������"){  // DW 4�� ùĭ�� ��ǰ�ڵ� ���ý� week_flag ���� �������� �ְ�/���� ����  ��ȸ
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
			
		}else if(week_flag == 'W'){
			//alert("��ũ �÷��� �������� ����");
			document.all.week_flag.value = 'D';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
				
		}else{		//2013-03-26 ������ �߰�--
			//alert("��ũ �÷��� �ϰ����� ����");
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
				
		}
		
	} else{
		if(week_flag == 'M'){
			document.all.from_mm.value = yyyy_mm;
			document.all.to_mm.value = yyyy_mm;
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
		document.all.from_mm.value = yyyy_mm;
		document.all.to_mm.value = yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm = document.all.from_mm.value;
	var to_mm = document.all.to_mm.value;
	
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

	mode = "save";
	doSave();	
};

// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "SELECTED");
 
 return;
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

	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "delete");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version", version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


function GoIf(){

	
	/*
	//EDIT_FLAG	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		if(GridObj.GetCellValue('EDIT_FLAG',i) == 'Y' ){  // GREEN
			alert("item_id"+GridObj.GetCellValue('EDIT_FLAG',i));
				
		}else{
			
		}  
	}	

	return;
	*/ 

   var cust_code	= document.all.cust_code.value;
   var loc_id		= document.all.loc_id.value;


	if(cust_code==""||cust_code==null || loc_id==""||loc_id == null){
		alert("������ ��� �����Ͻñ�  �ٶ��ϴ�");
		return;
	} else{

		
	}

	if(confirm("���� �Ͻ� ǰ���� �����Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}		
			
	
//return;

	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);

	GridObj.SetParam("cust_code", cust_code);	//���޾�ü
	GridObj.SetParam("loc_id", 		loc_id);	//���밡�� �۾���


	//GridObj.SetParam("version", version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}


// �ش� �÷��׿����� ���ð� �Ҵ�
function doCheckFlag(obj){
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
}


function doChange2(obj){
	
	//var scm_charge = obj.value;
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			//in_div +=	"<option value="+arrList[i][0]+">"+arrList[i][1]+"</option>";
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

	//alert("�� �� ��ǰ ���� �˾�!!");
	//var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	//var	item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
	

	
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 


