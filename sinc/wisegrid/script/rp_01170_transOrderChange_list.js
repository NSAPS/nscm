//############################################################
//## ���α׷�ID      : ip_07010_Item_Trace_list.vm
//## ���α׷���      : SCMǰ��������ȸ
//## ������          : ������
//## ��������        : 2009-07-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01170_transOrderChange_list';
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

function init3() {
   		
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ���� 
	
}



   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bRowSelectorVisible = true;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.


    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.

    
    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = true;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    
    GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.


}
function setDefault3() { 

	GridObj3.bRowSelectorVisible = true;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj3.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    
    GridObj3.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj3.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	GridObj.AddHeader("TRANS_DATE"		,"��������"       ,"t_text" 	,20		,100  ,false); //0   
 	GridObj.AddHeader("SRC_LOC"			,"SRC_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("SRC_NAME"		,"�����"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("TGT_LOC"			,"TGT_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("TGT_NAME"		,"�԰���"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"��ǥ��ȣ"       ,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("BOX_QTY"			,"BOX ����"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PLT_QTY"			,"PLT ����"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("TRANS_STATE"		,"��������"       ,"t_text" 	,100	,80  ,false); //0  


	GridObj.BoundHeader();	

	//GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('TRANS_DATE','center'); 
    GridObj.SetColCellAlign('SRC_NAME','center'); 
    GridObj.SetColCellAlign('TGT_NAME','center'); 
    GridObj.SetColCellAlign('BRAND_NO','center'); 
    GridObj.SetColCellAlign('TRANS_STATE','center'); 
       
}
   
function setHeader2(GridObj2) {        
       



  	GridObj2.AddHeader("CRUD"			,"����"       		,"t_text" 		,10		,0  ,false); //0   
  	//GridObj2.AddHeader("NO"				,"��ȣ"       		,"t_number" 	,5		,30  ,true); //0   
  	GridObj2.AddHeader("SELECTED"		,"�����켱����"       		,"t_checkbox" 	,2		,60  ,true); //0   

 	GridObj2.AddHeader("ITEM_ID"		,"��ǰ�ڵ�"       	,"t_text" 		,100	,70  ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"		,"��ǰ��"       		,"t_text" 		,100	,150  ,false); //0   
 	GridObj2.AddHeader("BOX_QTY"		,"BOX"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("PLT_QTY"		,"PLT"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("DEL_PLT"		,"����PLT"       	,"t_number" 	,20.3	,60  ,true); //0   
 	GridObj2.AddHeader("DEL_QTY"		,"����QTY"       	,"t_number" 	,20.3	,0  ,true); //0   
 	//GridObj2.AddHeader("DEL_RANK"		,"�����켱����"       	,"t_text" 		,100	,80  ,false); //0   

 	GridObj2.AddHeader("TRANS_DATE"		,"��������"       	,"t_text" 		,20		,0  ,false); //0   
 	GridObj2.AddHeader("SRC_LOC"		,"�����"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("TGT_LOC"		,"�԰���"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("BRAND_NO"		,"��ǥ��ȣ"       	,"t_text" 		,20		,0  ,false); //0
 	GridObj2.AddHeader("BOX_PER_PALET"	,"BOX_PER_PALET"    ,"t_number" ,200	,0   ,false); //0 	
 	GridObj2.AddHeader("CRE_GUBN"		,"CRE_GUBN"      	,"t_text" ,200	,0   ,false); //0 	
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    GridObj2.SetColCellAlign('SELECTED','center'); 
    
    GridObj2.SetNumberFormat("DEL_PLT"  , "#,##0");
    
	GridObj2.SetColHDBgColor('DEL_PLT','253|228|229');
    


}
   
function setHeader3(GridObj3) {        
       
  	GridObj3.AddHeader("CRUD"			,"����"       		,"t_text" 		,10		,0  ,false); //0   
  	GridObj3.AddHeader("SELECTED"		,"�߰��켱����"       		,"t_checkbox" 	,2		,60  ,true); //0   
	//GridObj3.AddHeader("NO"				,"��ȣ"       	,"t_number" 	,5		,30  ,true); //0
 	GridObj3.AddHeader("ITEM_ID"		,"��ǰ�ڵ�"       ,"t_text" 	,100	,70  ,true); //0   
 	GridObj3.AddHeader("ITEM_NAME"		,"��ǰ��"       	,"t_text" 	,1000	,180 ,false); //0   
 	//GridObj3.AddHeader("STOCK_QTY"		,"������"       ,"t_text" 	,100	,80  ,false); //0   
 	GridObj3.AddHeader("BOX_QTY"		,"BOX"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("PLT_QTY"		,"PLT"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("BOX_PER_PALET"			,"BOX_PER_PALET"      	,"t_number" ,200	,0   ,false); //0 	

	GridObj3.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj3.SetColCellAlign('ITEM_ID','center'); 

    GridObj3.SetNumberFormat("BOX_QTY"  , "#,##0");
    GridObj3.SetNumberFormat("PLT_QTY"  , "#,##0");

	GridObj3.SetColHDBgColor('BOX_QTY','253|228|229');
	GridObj3.SetColHDBgColor('PLT_QTY','253|228|229');

}

function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT

	
}
function setGrid3(){
	GridObj3.SetColCellBgColor('BOX_QTY',color_edit_col);//PLT
	GridObj3.SetColCellBgColor('PLT_QTY',color_edit_col);//PLT
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  //GridObj.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'IPGO');
		  //GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	//alert("WD2");
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  //GridObj2.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'IPGO'); 
		  //GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd2") {
		if(GridObj2.GetStatus() == "true") {                           

		  GoTransOrderAddWd3(); 
		   
		}
	}
	setGrid2(); //WiseGrid ����
	
}

function GridEndQuery3() {
	//alert("WD3");
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			//GridObj3.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'CHGO'); 
			//GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd3") {
		if(GridObj3.GetStatus() == "true") {                           

		  GoMakeBrandNo(); 
		   
		}
	}
	
	
	setGrid3(); //WiseGrid ����
	
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
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     

	var act_gubn	= document.all.act_gubn.value; // 10(�߰�/����), 20(������)

	doQuery2(nRow);	
	if(act_gubn == '01'){// 10(�߰�/����), 20(������)
		doQuery3(nRow);
	}
}        
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var trans_start 		= document.all.trans_start.value;
       var trans_end   		= document.all.trans_end.value;
       var selected_src_loc	= document.all.selected_src_loc.value;
       var selected_tgt_loc	= document.all.selected_tgt_loc.value;
       var brand_no		= document.all.brand_no.value;
       var act_gubn		= document.all.act_gubn.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end"	, trans_end);
       GridObj.SetParam("selected_src_loc", selected_src_loc);
       GridObj.SetParam("selected_tgt_loc", selected_tgt_loc);
       GridObj.SetParam("brand_no", brand_no);
       GridObj.SetParam("act_gubn", act_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  ���ι�° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(�߰�/����), 20(������)
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", src_loc);
	GridObj2.SetParam("tgt_loc", tgt_loc);
	GridObj2.SetParam("brand_no", brand_no);
	GridObj2.SetParam("act_gubn", act_gubn);



	GridObj2.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ���ι�° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(�߰�/����), 20(������)



	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("trans_date", trans_date);
	GridObj3.SetParam("src_loc", src_loc);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("brand_no", brand_no);
	GridObj3.SetParam("act_gubn", act_gubn);
	GridObj3.DoQuery(servlet_url);
}
   

/*������������������������������������������������������������������������
  �����ۿ��� �߰�
  ������������������������������������������������������������������������*/
  function GoTransOrderAdd() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 01(�߰�/����), 02(������)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	var rc 			= GridObj2.GetRowCount();
	if(rc == 0){
		alert("���ۿ����� ������  ��ǥ�� ��ȸ�� �����Ͻñ� �ٶ��ϴ�");
		return;
	}	

	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	
	

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "orderAddWd2");	
	
    GridObj2.SetParam("act_gubn", act_gubn);
    GridObj2.SetParam("chng_resn", chng_resn);
    GridObj2.SetParam("plt_unit", plt_unit);
	GridObj2.SetParam("trans_date",trans_date);
	GridObj2.SetParam("src_loc",src_loc);
	GridObj2.SetParam("tgt_loc",tgt_loc);
	GridObj2.SetParam("brand_no",brand_no);
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	


	if(act_gubn == "01"){
		if(confirm("ǰ�� �߰�/���� �� �����Ͻðڽ��ϱ�?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "02"){
		if(confirm("������ ���� �� �����Ͻðڽ��ϱ�?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "03"){
		if(confirm("�������� �߰��� �����Ͻðڽ��ϱ�?") == 1 ) {
		}else{
			return;
		}
	}
	
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

	GridObj2.DoQuery(servlet_url, "SELECTED");
		
}

/*������������������������������������������������������������������������
  �����ۿ��� �߰�
  ������������������������������������������������������������������������*/
  function GoTransOrderAddWd3() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 10(�߰�/����), 20(������)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "orderAddWd3");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

	GridObj3.DoQuery(servlet_url, "SELECTED");
		
}
function GoMakeBrandNo(){

	var act_gubn	= document.all.act_gubn.value; // 10(�߰�/����), 20(������)
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "makeBrandNo");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url);
	
}



// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
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

// ���� input box �� ���� check 
// parameter : obj - inbox object , type - default value �Ǵ� �Ҽ��� check ���� ���� type ���� 
// type - BLANK : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ��� ���
//        ZERO : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ��� ��� 
//        BLANK_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        ZERO_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        BLANK_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ZERO_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ** type parameter �� ������ ZERO(default=0, �Ҽ��� ���) �� ���� 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "���ڸ� �Է��Ͽ� �ּ���.";
	var checkType = "POINT"; 
	
	// default value �� ���� 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// �Ҽ��� ������� ���� 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "�ڿ����� �Է��Ͽ� �ּ���."; 
		else 
			alertMsg = "������ �Է��Ͽ� �ּ���."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}

/*����������������������������������������������������������������������������������
  ���� �߰�/���� Fnc
  ����������������������������������������������������������������������������������*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj3.GetActiveRowIndex();
	
	if( str == "�߰�" ){		// ROW �߰�
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// ����� ���� ���� �ٽ� ����
		//setSrcLocBgColor();		
		// ���� ��� �ٽ� ��.
		//calAllCum();
		// ��ȣ set
		//setNo();
	}
	else if( str == "����" ){	// ROW ����
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("������ ���� ������ �ֽʽÿ�.");
//			return;
//		}
		if(confirm("���� �Ͻðڽ��ϱ�?") == true){
			for( i = 0 ; i < GridObj3.GetRowCount() ; i++ ){
				if( GridObj3.GetCellValue("SELECTED", i) == "1" ){
						GridObj3.DeleteRow(nRow);
						GridObj3.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					
				}
			}
			// ����� ���� ���� �ٽ� ����
			//setSrcLocBgColor();	
			// ���� ��� �ٽ� ��.
			//calAllCum();
			// ��ȣ set
			//setNo()
		}
	}
	
	saved = false;
};


/*������������������������������������������������������������������������
  ��WiseGrid Insert Row Fnc
  ������������������������������������������������������������������������*/
function insertRow( nRow ){
	
	var rowCnt = GridObj3.GetRowCount();
	
	
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // ���ڸ� ������ ��� 
		GridObj3.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj3.InsertRow(-1);//
		nRow = -1;
	}
	else{
		GridObj3.InsertRow(nRow+1);
	}
	
	// �⺻ ������ ����
	if(nRow == -1){
		//GridObj3.SetCellValue("NO", 0, "");
		GridObj3.SetCellValue("ITEM_ID", 0, "");
		GridObj3.SetCellValue("ITEM_NAME", 0, "");
		//GridObj3.SetCellValue("STOCK_QTY", 0, "");
		GridObj3.SetCellValue("BOX_QTY", 0, "");
		GridObj3.SetCellValue("PLT_QTY", 0, "");	
		GridObj3.SetCellValue("BOX_PER_PALET", 0, "");	
	}else{
		//GridObj3.SetCellValue("NO", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_ID", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_NAME", nRow+1, GridObj3.GetCellValue("ITEM_NAME", nRow));
		//GridObj3.SetCellValue("STOCK_QTY", nRow+1, GridObj3.GetCellHiddenValue("STOCK_QTY", nRow));
		GridObj3.SetCellValue("BOX_QTY", nRow+1, GridObj3.GetCellValue("BOX_QTY", nRow));
		GridObj3.SetCellValue("PLT_QTY", nRow+1, GridObj3.GetCellValue("PLT_QTY", nRow));
		GridObj3.SetCellValue("BOX_PER_PALET", nRow+1, GridObj3.GetCellValue("BOX_PER_PALET", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;

	
	

};

/*������������������������������������������������������������������������
  ��WiseGrid Cell Duble Click Event
  ������������������������������������������������������������������������*/
function GridCellDblClickHandler(strColumnKey, nRow){
	// ��ǰ �ڵ� �÷��̸� ��ǰ �˻� �˾� ����
	
	if( strColumnKey == "ITEM_ID" ){
		openItemSearchPop( strColumnKey, nRow );
	}
	
};

/*������������������������������������������������������������������������
  ����ǰ �˻� POPUP  Fnc
  ������������������������������������������������������������������������*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
//	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj3.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc = GridObj2.GetCellValue("TGT_LOC", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_order_chng&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
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
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	
	// �⺻������, �߰�������, ������� PLT �� BOX ���� �����
	// �հ� �� ���� ��� �� PLT, BOX ���� ����
	if(strColumnKey.lastIndexOf("PLT_QTY") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT_QTY") >= 0 ) {
			calBoxQty( strColumnKey, nRow );					 // BOX ���� ����
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		} // �հ� �� �����հ� ��� PLT
		else {
			calPltQty( strColumnKey, nRow );					 // BOX ���� ����
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj3.SetCellValue("PLT_QTY", nRow, "1")			
			calBoxQty( strColumnKey, nRow );					 // BOX ���� ����
		}else{
			GridObj3.SetCellValue("PLT_QTY", nRow, "0")			
			calBoxQty( strColumnKey, nRow );					 // BOX ���� ����
		}		
	}



	
	
	// ��ǰ �ڵ� ����� 
	if( strColumnKey == "ITEM_ID" ){
		// box_per_palet ����
		getBoxPerPalet( nRow );
		// ��ǰ �� set
		getItemInfo( nRow, nNewValue );
	}
	
}


/*������������������������������������������������������������������������
  ��Box ���� ���  Fnc
  ������������������������������������������������������������������������*/
function calBoxQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("PLT_QTY","");

	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj3.SetCellValue("BOX_QTY", nRow, boxQty);
	
	// ���� ���� ���� �� �հ� ���
	//changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*������������������������������������������������������������������������
  ��PLT ���� ���  Fnc
  ������������������������������������������������������������������������*/
function calPltQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("BOX_QTY","");
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;

	GridObj3.SetCellValue("PLT_QTY", nRow, pltQty);
	
	// ���� ���� ���� �� �հ� ���
	//changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*������������������������������������������������������������������������
  ��box_per_palet ���� Fnc
  ������������������������������������������������������������������������*/
function getBoxPerPalet( nRow ) {
	
	// �����, ��ǰ�ڵ� ����
	var dc_id = GridObj2.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj3.GetCellValue("ITEM_ID", nRow);
	
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}


/*��������������������������������������������������������������������������������������������������������������
  ������� ���� �Է°����κ��� ��ǰ���� ��ȸ
  ����ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻� Fnc
  ��������������������������������������������������������������������������������������������������������������*/
function getItemInfo( nRow, nNewValue ) {


	var dc_id = GridObj2.GetCellValue("SRC_LOC", nRow);
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
	//alert(ItemId);
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// ��ġ�ϴ� ��� 1��
			else if( arrList.length == 1 ) {
				GridObj3.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj3.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
