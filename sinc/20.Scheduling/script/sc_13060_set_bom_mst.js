//############################################################
//## ���α׷�ID      : sc_13020_set_prod_mst.vm
//## ���α׷���      : ���밡�� ������� ����
//## ������          : �ǿ���
//## ��������        : 2009-07-20
//##
//## ���� job file   : job_sinc_20_scheduling_04.xml
//## ���� query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/


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


//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_13060_set_bom_mst';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

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
    //GridObj.strHDClickAction    = "sortsingle";
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;       
    
    /* SetGroupMerge */
	//GridObj.bHDMoving = false 
	//GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 
	GridObj.strRowBorderStyle = 'none' 
	GridObj.nRowSpacing = 0 
	GridObj.strHDClickAction = 'select' 
	
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'
    
    
    
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 	,100    ,0  ,false);
 	GridObj.AddHeader("ITYPE"			,"�����Ѱ�"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("DIVISION"		,"CM"   		,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT01"		,"����ǰ��1"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT02"		,"����ǰ��2"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"   	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"   		,"t_text" 	,500	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"�԰�"   		,"t_text" 	,20		,90  ,false); //0   

 	GridObj.AddHeader("SEQ"				,"SEQ"   		,"t_text" 	,20		,40  ,false); //0   
 	GridObj.AddHeader("SEQ_GUBN"		,"����ǰ��"   	,"t_text" 	,20		,110   ,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"�⺻����"   	,"t_text" 	,20		,70 ,false); //0   
 	GridObj.AddHeader("UNIT_COST"		,"�ܰ�"   		,"t_number" ,20.3	,80  ,true); //0   
 	
 	GridObj.AddHeader("REQ_QTY"			,"�ҿ䷮"   		,"t_number" ,20.4	,100  ,true); //0   
 	//GridObj.AddHeader("REQ_QTY"			,"�ҿ䷮"   		,"t_text" 	,20	,100  ,false); //0
 	
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"�ּҹ��ַ�"   	,"t_number" ,20.3	,90  ,true); //0
 	GridObj.AddHeader("LOT_SIZE"		,"���ִ���"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("LEAD_TIME"		,"����Ÿ��"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("CUST_CODE"		,"���޾�ü"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"���޾�ü"   	,"t_text" 	,20		,80  ,false); //0
 	GridObj.AddHeader("SAFETY_STOCK"	,"�������"   	,"t_number" ,20.3	,70  ,true); //0   
	



	
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	
	//GridObj.SetColFix('SPEC');
	GridObj.SetColFix('SEQ_GUBN');

	GridObj.SetNumberFormat("UNIT_COST", "###,###,##");
	GridObj.SetNumberFormat("REQ_QTY", "###,###,####0");
	GridObj.SetNumberFormat("UNIT_COST", "###,###,######");

	
	GridObj.SetColCellAlign('ITEM_ID','center');
	
	
	

	//Hidden �÷�  
	GridObj.SetColHide("CRUD",true);
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch() 
   {
       doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");

}



      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       var scm_charge	= document.all.scm_charge.value;
       var cm_gubn	= document.all.cm_gubn.value;
       var item_type	= document.all.item_type.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.SetParam("item_type", item_type);
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
	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
		        }
		        
				for(var i=0;i<GridObj.GetRowCount();i++) {
					// cell���� ����
					GridObj.SetCellBgColor('REQ_QTY', i, '255|255|0'); 
					GridObj.SetCellBgColor('UNIT_COST', i, '255|255|0'); 
					GridObj.SetCellBgColor('MIN_LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LEAD_TIME', i, '255|255|0'); 

					GridObj.SetCellBgColor('SAFETY_STOCK', i, '255|255|0');
				}		        
				
				//GridObj.SetGroupMerge(	'ITEM_ID,ITEM_NAME,SPEC'); 
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
				
                                            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
}
        }
        else if(endMode == "save") {
			if(GridObj.GetStatus() == "true") {// 
				GridObj.focus();		
			} else {
				var error_msg = GridObj.GetMessage();// 
				alert(error_msg);			
			}
			
			doQuery()   // ���� �Ϸ��� ���ƿö��� ȭ���� ����ȸ �Ѵ�. 
        }
		
    }


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

//alert("strColumnKey+"+strColumnKey);
	//var oper_type	= GridObj.GetCellHiddenValue("OPER_TYPE", nRow); //GetCellHiddenValue  GetCellValue



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


	if(confirm("���� �Ͻ� ǰ���� ERP ������ Ȯ���Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("version", version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");


}


/*������������������������������������������������������������������������
  ��ȭ�鿡 '���'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoReg  (service) {

		var item_id		= '';
		var item_name	= '';
		var wo_id		= '';
		var	idu_mode	='REG';
		//var week_flag	= document.frm.week_flag.value;


		//alert(document.frm.week_flag.value);

		var service_url = "service.do?_moon_service=sc_13060_set_bom_mst_reg_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&wo_id=" + wo_id + "&idu_mode=" + idu_mode;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=790, height=430, top=200, left=200";
//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();

}
  


/*������������������������������������������������������������������������
  ��ȭ�鿡 ǰ�� ��ȣ ����Ŭ���� ȣ��(����ȭ��)
  ������������������������������������������������������������������������*/
function BomPopUp  (nRow) {
	
		var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
		var item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
		var qty			= '1';
		
        var prod_ver	= '';

//		var	idu_flag	= GridObj.GetCellValue("IDU_FLAG", nRow);
//		var	idu_mode	='MOD';
		//var week_flag	= document.frm.week_flag.value;  
	
		//alert(item_id);
		//alert(item_name);
	
		//alert(document.frm.week_flag.value);   
		
		var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_bom_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name +"&prod_ver=" + prod_ver+ "&qty=" + qty;
		//service_url += "&if_flag=" + if_flag + "&if_msgs=" + if_msgs + "&prod_po=" + prod_po + "&idu_flag=" + idu_flag;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=430, top=200, left=200";
	//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();				
		  
		//alert("�˾��� �ٿ�����");
	
}


/*������������������������������������������������������������������������
  ���׸����� ����Ŭ��  �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		BomPopUp(nRow);
	}

}	


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {


}	


// �÷� ��� & Ȯ��
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('ITYPE')== 8){// true => ���� ����
		obj.value = "���";
		// ���� ��� ����
		GridObj.SetColWidth("ITYPE", 60);
		GridObj.SetColWidth("DIVISION", 60);
		GridObj.SetColWidth("SALES_CAT01", 60);
		GridObj.SetColWidth("SALES_CAT02", 60);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');
		
	}
	else{
		obj.value = "Ȯ��";
		//������
		GridObj.SetColWidth("ITYPE", 8);
		GridObj.SetColWidth("DIVISION", 8);
		GridObj.SetColWidth("SALES_CAT01", 8);
		GridObj.SetColWidth("SALES_CAT02", 8);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');


	}


}

    