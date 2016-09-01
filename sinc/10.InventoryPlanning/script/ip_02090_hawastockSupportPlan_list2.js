//############################################################
//## ���α׷�ID		: ip_02090_hawastockSupportPlan_list.js
//## ���α׷���		: ��ǰ ����� ��ȹ ����
//## ������			: ������
//## ��������			: 2011-11-28
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTIONR
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-28  ������       update
//## 1.2		2014-09-29  �̰���	    update
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_02090_hawastockSupportPlan_list2';
var GridObj ; 													// WiseGrid ��ü

var color_tot			= '234|234|234';			//�հ� ���� ����
var color_edit_col		= '255|253|208';
var color_edit_col2		= '255|228|128';
var color_edit_col3		= '255|228|146';

var color_sp			= '230|222|230'; 			//�÷� ���м� ����
var color_select_row	= '141|232|141';			//���� ���� ����
var colBg01				= '224|255|224';			//255|255|153
var colBg02				= '255|255|255';


/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	
	setDefault();        	//ȭ�� �⺻ ����
	
	setHeader(GridObj);  	//�ش����� 
}
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex = true;
	
	GridObj.bHDMoving = false ;
	GridObj.bHDSwapping = false; 
	GridObj.bRowSelectorVisible = false ;
	GridObj.strRowBorderStyle = 'none' ;
	GridObj.nRowSpacing = 0 ;
	GridObj.strHDClickAction = 'select' ;
	
 
    GridObj.nHDLineSize         	= 26; //Header Size
    //GridObj.strHDClickAction    	= "sortsingle";
 	
 	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor	= '232|232|255'; 	//Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page ���� scroll ->�⺻�� 'default'    

	GridObj.nHDLines				= 2;  
	
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) { 
	       
	GridObj.AddHeader("SELECTED"			,""   					,"t_checkbox"	,2		,30  ,true); //0
	GridObj.AddHeader("ITEM_ID"				,"��ǰ�ڵ�"   			,"t_text" 		,100	,60  ,false); //0
	GridObj.AddHeader("ITEM_NAME"			,"��ǰ��"   				,"t_text" 		,100	,155 ,false); //0
	GridObj.AddHeader("CALOG_BOX_STOCK"		,"Ķ�α�\nBOX���"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("CALOG_PLT_STOCK"		,"Ķ�α�\nPLT���"   		,"t_number" 	,100.3	,60  ,false); //0
	
	GridObj.AddHeader("DC_ID"				,"DC_ID"    			,"t_text" 		,100    ,0   ,false);
 	GridObj.AddHeader("DC_NAME"				,"DC��"   				,"t_text" 		,100	,70  ,false); //0   
 	
 	GridObj.AddHeader("CD_SRC_LOC"			,"�������"  			,"t_text" 		,100	,0  ,false); //0	//�������//
 	//GridObj.AddHeader("CD_FLAG1"			,"C/D"  				,"t_text" 		,100	,50  ,false); //0	//�������//
 	GridObj.AddHeader("SAFETY_STOCK"		,"�������"   			,"t_number" 	,100.3	,40  ,true); //0   
 	GridObj.AddHeader("SAFETY_STOCK_FLAG"	,"SAFETY_STOCK_FLAG"   	,"t_text" 		,100	,0  ,false); //0
 	GridObj.AddHeader("CD_FLAG"				,"C/D����"   			,"t_checkbox" 	,2		,30  ,true); //0
 	GridObj.AddHeader("SALES_MEAN_3MONTH"	,"3���� �� ���"   		,"t_number" 	,100.3	,50 ,false); //0
 	GridObj.AddHeader("PRE_MONTH_SELL"		,"�����Ǹ�"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("SALES_PRE_CUM"		,"�ǸŴ���"      		,"t_number" 	,100.3	,40 ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK"	,"1�� ���"   			,"t_number" 	,100.3	,35 ,false); //0   
 	GridObj.AddHeader("SALES_MEAN_3WEEK"	,"3�� ���"      		,"t_number" 	,100.3	,35 ,false); //0
 	GridObj.AddHeader("BASE_STOCK"			,"����\n���"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("IPGO_EXPT"			,"�԰�\n����"     		,"t_number" 	,100.3	,40 ,false); //0
 	GridObj.AddHeader("CHGO_EXPT"			,"���\n����"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("FINISH_STOCK"		,"����\n���"     		,"t_number" 	,100.3	,40 ,false); //0
 	
 	GridObj.AddHeader("STOCK_TERM"			,"���\n�Ⱓ"   			,"t_number" 	,100.3	,40 ,false); //0
 	GridObj.AddHeader("STOCK_DAY_1W"		,"����ϼ�\n(1��)"  		,"t_number" 	,100.3	,60	,false); //0   
 	GridObj.AddHeader("STOCK_DAY_3W"		,"����ϼ�\n(3��)"  		,"t_number" 	,100.3	,60 ,false); //0
 	
 	
 	GridObj.AddHeader("DC_ALLOC"			,"���ַ�\n(BOX)"   		,"t_number" 	,100.3	,50 ,true); //0
    GridObj.AddHeader("PAL_QTY"			    ,"ǰ�� PLT ����"   		,"t_number" 	,100.3	,0 	,false); //0
    GridObj.AddHeader("DC_ALLOC_PLT"	    ,"���ַ�\n(PLT)"   		,"t_number" 	,100.3	,45 ,true); //0
    GridObj.AddHeader("PRE_ALLOC"	   		,"����\n���ַ�" 		  	,"t_number" 	,100.3	,45 ,false); //0
    GridObj.AddHeader("D1_QTY"				,"D+1\nȮ����"   		,"t_number" 	,100.3	,45  ,true); //0		//D+1	���ַ�//
    GridObj.AddHeader("D2_QTY"				,"D+2\nȮ����"   		,"t_number" 	,100.3	,45  ,true); //0		//D+2	���ַ�//
    GridObj.AddHeader("D3_QTY"				,"D+3\nȮ����"   		,"t_number" 	,100.3	,45  ,true); //0		//D+3	���ַ�//
    GridObj.AddHeader("TOT"					,"�հ�"   				,"t_number" 	,100.3	,40 ,false); //0		//TOT	//�հ�//
    GridObj.AddHeader("SEQ"					,"SEQ"   				,"t_number" 	,100.3	,0 ,true); //0
    
    /* ���� �ش� �߰� */
	GridObj.AddGroup	("HD1",    	"����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1",	  	  "BASE_STOCK");
	GridObj.AppendHeader("HD1",   	   "IPGO_EXPT");
	GridObj.AppendHeader("HD1",		   "CHGO_EXPT");
	GridObj.AppendHeader("HD1",		"FINISH_STOCK");
	GridObj.AppendHeader("HD1",		"STOCK_DAY_1W");
	GridObj.AppendHeader("HD1",		"STOCK_DAY_3W");
	GridObj.AppendHeader("HD1",		  "STOCK_TERM");		
	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('DC_ID'				,'center'); 
    GridObj.SetColCellAlign('DC_NAME'			,'center'); 
    
    //GridObj.SetColCellAlign('CD_SRC_LOC'		,'center');
     
    //GridObj.SetColCellAlign('CD_FLAG1'			,'center');
    
    GridObj.SetColCellAlign('SAFETY_STOCK'		 ,'right'); 
    GridObj.SetColCellAlign('CALOG_BOX_STOCK'	 ,'right'); 
    GridObj.SetColCellAlign('CALOG_PLT_STOCK'	 ,'right'); 
    GridObj.SetColCellAlign('PRE_ALLOC'	 		 ,'right');

    
    GridObj.SetColCellAlign('CD_FLAG'			,'center');
    GridObj.SetColCellAlign('SALES_MEAN_3MONTH'	 ,'right'); 
    
    GridObj.SetColCellAlign('PRE_MONTH_SELL'	 ,'right'); 
    GridObj.SetColCellAlign('SALES_PRE_CUM'		 ,'right'); 
    
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK'	 ,'right'); 
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK'	 ,'right');
     
    GridObj.SetColCellAlign('BASE_STOCK'		 ,'right');    
    GridObj.SetColCellAlign('IPGO_EXPT'			 ,'right'); 
    GridObj.SetColCellAlign('CHGO_EXPT'			 ,'right');     
    GridObj.SetColCellAlign('FINISH_STOCK'		 ,'right');
     
    GridObj.SetColCellAlign('STOCK_DAY_1W'		 ,'right'); 
    GridObj.SetColCellAlign('STOCK_DAY_3W'		 ,'right');
    GridObj.SetColCellAlign('STOCK_TERM'		 ,'right');
    GridObj.SetColCellAlign('DC_ALLOC'			 ,'right');
    
    GridObj.SetColCellAlign('PAL_QTY'			 ,'right');
     
    GridObj.SetColCellAlign('D1_QTY'			 ,'right');	//D+1	���ַ�//
    GridObj.SetColCellAlign('D2_QTY'			 ,'right');	//D+2	���ַ�//
    GridObj.SetColCellAlign('D3_QTY'			 ,'right');	//D+3	���ַ�//
    GridObj.SetColCellAlign('TOT'				 ,'right');	//D+6	���ַ�//
    
    GridObj.SetNumberFormat('SAFETY_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('CALOG_BOX_STOCK'	,'#,##0.#');
    GridObj.SetNumberFormat('CALOG_PLT_STOCK'	,'#,##0.#');
    GridObj.SetNumberFormat('PRE_ALLOC'			,'#,##0.#');
  
    GridObj.SetNumberFormat('SALES_MEAN_3MONTH'	,'#,##0.#');
    GridObj.SetNumberFormat('PRE_MONTH_SELL'	,'#,##0.#');
    GridObj.SetNumberFormat('SALES_PRE_CUM'		,'#,##0.#');
    GridObj.SetNumberFormat('SALES_MEAN_1WEEK'	,'#,##0.#');
    GridObj.SetNumberFormat('SALES_MEAN_3WEEK'	,'#,##0.#');
    GridObj.SetNumberFormat('BASE_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('IPGO_EXPT'			,'#,##0.#');
    GridObj.SetNumberFormat('CHGO_EXPT'			,'#,##0.#');
    GridObj.SetNumberFormat('FINISH_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_DAY_1W'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_DAY_3W'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_TERM'		,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC_PLT'		,'#,##0.00');
    
    GridObj.SetNumberFormat('PAL_QTY'			,'#,##0.#');
    
    GridObj.SetNumberFormat('D1_QTY'			,'#,##0.#');	//D+1	���ַ�//
    GridObj.SetNumberFormat('D2_QTY'			,'#,##0.#');	//D+2	���ַ�//
    GridObj.SetNumberFormat('D3_QTY'			,'#,##0.#');	//D+3	���ַ�//
    GridObj.SetNumberFormat('TOT'				,'#,##0.#');	//D+6	���ַ�//

	//GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
    GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);    
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
		var dc_id			= document.frm.dc_id.value;
		var item_id			= document.frm.item_id.value;
		var sales_cat_02	= document.frm.sales_cat_02.value;
		var scm_charge		= document.frm.scm_charge.value;
		var cnfm_date		= document.frm.cnfm_date.value;
	
	
	//var versions_seq = document.frm.plan_version.value;
	//if( versions_seq == "" || versions_seq == null ) {
		//alert("������ �����ϼ���.");
		//return;
	//}

	// �� ����ũ �˻� ����
	if( dc_id == null || dc_id == "") {
		if( item_id == null || item_id == "" ) {
			if(sales_cat_02 == null || sales_cat_02 == "" ) {
				if(scm_charge == null || scm_charge == "" ) {
				alert("�ϳ��̻��� �˻������� �ʿ��մϴ�.");
				return;
			}
		}
	}
}    
       
       doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave(service) {

	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";
	
	//GridObj.SetParam("mode", "save");
	// user_id

	doSave();

	
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

};

   
      
// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	 
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
 return;
}    

function doSave2() {
 	
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	 
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save2");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "SELECTED");
 
 return;
}  
      
      
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

		var item_id			= document.all.item_id.value;
		var dc_id			= document.all.dc_id.value;		
		var sales_cat_02	= document.all.sales_cat_02.value;	
		var scm_charge		= document.all.scm_charge.value;
		var d_day   		= document.all.d_day.value;
		var cnfm_date		= document.frm.cnfm_date.value;
		
		var in_trans_unit = "";
	
		
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", 		   		 "search");
       GridObj.SetParam("item_id", 				  item_id);
       GridObj.SetParam("dc_id", 			  		dc_id);
       GridObj.SetParam("sales_cat_02",		 sales_cat_02);
       GridObj.SetParam("scm_charge",	 	   scm_charge);
       GridObj.SetParam("d_day",	 		  		d_day);
       GridObj.SetParam("in_trans_unit",	in_trans_unit);
       GridObj.SetParam("cnfm_date",			cnfm_date);
       
       //alert(sales_cat_02);

       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var sales_mean_1week	=	0;	//1�� ���
		var sales_mean_3week	=	0;	//3�� ���
		
		var pre_month_sell		=	0;	//���� �Ǹ�
		var sales_mean_3month	=	0;	//3���� �� ���
        
          
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {  
		
			
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell���� ����
				//GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,DC_ID,DC_NAME');
				//GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,CALOG_BOX_STOCK,CALOG_PLT,STOCK');
				
			
				GridObj.SetCellBgColor('SAFETY_STOCK',		i,  color_edit_col);
				GridObj.SetCellBgColor('CD_FLAG',			i,  color_edit_col);
				
				GridObj.SetCellBgColor('FINISH_STOCK',		i,  color_edit_col);
				GridObj.SetCellBgColor('DC_ALLOC',			i,  color_edit_col2);
				GridObj.SetCellBgColor('DC_ALLOC_PLT',		i,  color_edit_col3);
				GridObj.SetCellBgColor('PRE_MONTH_SELL',	i,  color_edit_col);				
					
			}      

			 GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,CALOG_BOX_STOCK,CALOG_PLT_STOCK');
			 //GridObj.AddSummaryBar('SUMMARY1', '��ü�հ�', 'summaryall', 'sum', 'SALES_MEAN_3MONTH,PRE_MONTH_SELL,SALES_PRE_CUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,BASE_STOCK,IPGO_EXPT,CHGO_EXPT,FINISH_STOCK,DC_ALLOC,PAL_QTY,D1_QTY,D2_QTY,D3_QTY,D4_QTY,D5_QTY,D6_QTY,TOT');
         	 //GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);
			 //GridObj.SetCellFontBold('SUMMARY1', 'true');
				
				}                  
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}


        }


   /* EXCEL ???? */
function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

function GridCellClick(strColumnKey, nRow){
	
}

function GridCellDblClick (strColumnKey, nRow){
	
	var dc_alloc	= GridObj.GetCellValue('DC_ALLOC',nRow);
	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	if( strColumnKey == "SELECTED"){		
		return;
	}
	if( strColumnKey == "DC_ALLOC"){
		var boxQty 		= Number(GridObj.GetCellValue("DC_ALLOC", nRow));
		var boxPerPalet = Number(GridObj.GetCellValue("PAL_QTY",  nRow));
		var resultQty   = Math.round(boxQty*100 / boxPerPalet)/100;
		GridObj.SetCellValue("DC_ALLOC_PLT", nRow, resultQty	);
		
		
		
	}
	
	
	Tot_Cal();
	
}


function ChangeBoxToPlt(){
	
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
    

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


// ���ڿ� �Է¹���
function (obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.stock_day) {
			Do_DC_Allocate(obj);
		}
	}
}    
    

function GoAlloc(){
	
	var stock_day			=	document.frm.stock_day.value;
	
	var in_mean_sell 		=	document.frm.in_mean_sell.value;
	
	var dc_alloc			=	0;	//���ַ�
	
	var pal_qty				=	0;	//���ַ�
	
	var	tot					=	0;
	
	var	d1_qty				=	0;
	var	d2_qty				=	0;
	var	d3_qty				=	0;
//	var	d4_qty				=	0;
//	var	d5_qty				=	0;
//	var	d6_qty				=	0;

	var sales_mean			=	0;	//1�� ���

	var sales_mean_1week	=	0;	//1�� ���
	var sales_mean_3week	=	0;	//3�� ���
	var pre_month_sell		=	0;	//���� �Ǹ�
	var sales_mean_3month	=	0;	//3���� �� ���
	
	var finish_stock		=	0;	//�������
	
	var d_day   			= document.all.d_day.value;
	
	var dc_alloc			=	0;	//���� ���ַ�
	
	var	fix_qty				=	0;
	
		for(var i=0;i<GridObj.GetRowCount();i++ ) {

			for(var i=0;i<GridObj.GetRowCount();i++ ) {

				dc_alloc	=	GridObj.SetCellValue("PRE_ALLOC", i,0);

				var cd_flag	= 	GridObj.GetCellValue("CD_FLAG", i);
					
			if(cd_flag == 1){
				
				if(document.frm.chk_sel_20.checked == true){
					
					finish_stock		=	GridObj.GetCellValue("FINISH_STOCK", 		i);		//�������
					sales_mean			=	GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1�� ���
					
					d1_qty				=	GridObj.GetCellValue("D1_QTY", 	i);
					d2_qty				=	GridObj.GetCellValue("D2_QTY", 	i);
					d3_qty				=	GridObj.GetCellValue("D3_QTY", 	i);
//					d4_qty				=	GridObj.GetCellValue("D4_QTY", 	i);
//					d5_qty				=	GridObj.GetCellValue("D5_QTY", 	i);
//					d6_qty				=	GridObj.GetCellValue("D6_QTY", 	i);
					
					pal_qty				=	GridObj.GetCellValue("PAL_QTY", 	i);
	
					if(in_mean_sell=="01"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1�� ���
					}else if(in_mean_sell=="02"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_3WEEK", 	i);		//3�� ���
						
					}else if(in_mean_sell=="03"){
						sales_mean	= GridObj.GetCellValue("PRE_MONTH_SELL", 	i);		//���� ����
						sales_mean	= sales_mean/24;
					}else if(in_mean_sell=="04"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_3MONTH", i);		//3���� �� ���
						sales_mean	= sales_mean/24;
					}
					
					if(strToNum(stock_day)*sales_mean >= finish_stock){
						dc_alloc	= strToNum(sales_mean) * strToNum(stock_day) - strToNum(finish_stock)
						GridObj.SetCellValue("DC_ALLOC", i, dc_alloc);
						}	
				}			
			}else{
				
				finish_stock		=	GridObj.GetCellValue("FINISH_STOCK", 		i);		//�������
				sales_mean			=	GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1�� ���
				
				d1_qty				=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty				=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty				=	GridObj.GetCellValue("D3_QTY", 	i);
//				d4_qty				=	GridObj.GetCellValue("D4_QTY", 	i);
//				d5_qty				=	GridObj.GetCellValue("D5_QTY", 	i);
//				d6_qty				=	GridObj.GetCellValue("D6_QTY", 	i);
				
				pal_qty				=	GridObj.GetCellValue("PAL_QTY", 	i);
	
				if(in_mean_sell=="01"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1�� ���
				}else if(in_mean_sell=="02"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_3WEEK", 	i);		//3�� ���
					
				}else if(in_mean_sell=="03"){
					sales_mean	= GridObj.GetCellValue("PRE_MONTH_SELL", 	i);		//���� ����
					sales_mean	= sales_mean/30;
				}else if(in_mean_sell=="04"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_3MONTH", i);		//3���� �� ���
					sales_mean	= sales_mean/30;
				}
				
				if(strToNum(stock_day)*sales_mean >= finish_stock){
					dc_alloc	= strToNum(sales_mean) * strToNum(stock_day) - strToNum(finish_stock)
					GridObj.SetCellValue("PRE_ALLOC", i, dc_alloc);
				}

						

			}
		
	}
	
	
}	
	
	
	CD_Cal();
	GoAlloc2();
	
}


function GoAlloc2(){ //	���ַ� ����
	
	var d_day   			= document.all.d_day.value;
	
	var dc_alloc			=	0;	//���� ���ַ�
	var	tot					=	0;
	
	var	d1_qty				=	0;
	var	d2_qty				=	0;
	var	d3_qty				=	0;
//	var	d4_qty				=	0;
//	var	d5_qty				=	0;
//	var	d6_qty				=	0;
	
	var in_trans_unit = "";
	
	var pal_qty			=	0;	//���ַ�	
	
	var finish_stock	=	0;	//�������
	
	var	fix_qty			=	0;					//���� Ȯ���� ����� ���� ����
	
	var pal_cal			=	0;					//Palet ���� ����� ���� ����
	
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "box";
	else in_trans_unit = "pal";


		for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
			
				dc_alloc	=	GridObj.GetCellValue("PRE_ALLOC", i);
			
				d1_qty		=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty		=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty		=	GridObj.GetCellValue("D3_QTY", 	i);
				//d4_qty		=	GridObj.GetCellValue("D4_QTY", 	i);
				//d5_qty		=	GridObj.GetCellValue("D5_QTY", 	i);
				//d6_qty		=	GridObj.GetCellValue("D6_QTY", 	i);
			
				pal_qty		=	GridObj.GetCellValue("PAL_QTY", i);
			
			if(dc_alloc==0){
			}
			else{
					
					if(d_day==1){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else
						{
							
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
						}

						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, 0);
						GridObj.SetCellValue("D3_QTY", i, 0);
//						GridObj.SetCellValue("D4_QTY", i, 0);
//						GridObj.SetCellValue("D5_QTY", i, 0);
//						GridObj.SetCellValue("D6_QTY", i, 0);
					


					}else if(d_day==2){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							 
						}
							GridObj.SetCellValue("D1_QTY", i, fix_qty);
							GridObj.SetCellValue("D2_QTY", i, fix_qty);
							
							GridObj.SetCellValue("D3_QTY", i, 0);
//							GridObj.SetCellValue("D4_QTY", i, 0);
//							GridObj.SetCellValue("D5_QTY", i, 0);
//							GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==3){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
							
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
									
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));
										
								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							  
							 							  		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						
//						GridObj.SetCellValue("D4_QTY", i, 0);
//						GridObj.SetCellValue("D5_QTY", i, 0);
//						GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==4){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{

							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){

										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}

							 							 		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						//GridObj.SetCellValue("D4_QTY", i, fix_qty);
						
//						GridObj.SetCellValue("D5_QTY", i, 0);
//						GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==5){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
									
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							 							 		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
//						GridObj.SetCellValue("D4_QTY", i, fix_qty);
//						GridObj.SetCellValue("D5_QTY", i, fix_qty);
//						GridObj.SetCellValue("D6_QTY", i, 0);					
						
					}else if(d_day==6){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){

										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}

							 						
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
//						GridObj.SetCellValue("D4_QTY", i, fix_qty);
//						GridObj.SetCellValue("D5_QTY", i, fix_qty);
//						GridObj.SetCellValue("D6_QTY", i, fix_qty);
						
						
					}

					}	
				
	Tot_Cal();		
		
	}
	
	
}

function Tot_Cal(){ //	���ַ� ����
	
	var d_day   				= document.all.d_day.value;
	var	tot						=	0;
	
	var	d1_qty					=	0;
	var	d2_qty					=	0;
	var	d3_qty					=	0;
//	var	d4_qty					=	0;
//	var	d5_qty					=	0;
//	var	d6_qty					=	0;	
	
		for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
		

				d1_qty		=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty		=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty		=	GridObj.GetCellValue("D3_QTY", 	i);
//				d4_qty		=	GridObj.GetCellValue("D4_QTY", 	i);
//				d5_qty		=	GridObj.GetCellValue("D5_QTY", 	i);
//				d6_qty		=	GridObj.GetCellValue("D6_QTY", 	i);

				tot			=	GridObj.GetCellValue("TOT", i);
	
				tot			=	strToNum(d1_qty) +strToNum(d2_qty)+strToNum(d3_qty);
					GridObj.SetCellValue("TOT", i, tot);
				}
	
}


function CD_Cal(){ //	C/D ���� ���� ���� ����
	
	
	var dc_id	=0;
	var cd_src_loc	=0;
	
	var	ay_row	=	0;
	var	ps_row	=	0;
	var	ku_row	=	0;
	
	
	var dc_alloc			=	0;	//���� ���ַ�
	
	var	fix_qty	=	0;
	
	
	/* ũ�ν� ��ŷ ������� row ã��, �Ⱦ�, ����, ����*/
	
	for(var i=0;i<GridObj.GetRowCount();i++ ){
		
		dc_id	=	GridObj.GetCellValue("DC_ID", i);
		
		if(dc_id=='7100'){
			
			ay_row = i;
		}
		else if(dc_id=='7500'){
			
			ps_row = i;
			
		}
		else if(dc_id=='7600'){
			
			ku_row = i;
			
		}
	}
	
	
	/* ��ü �׸��� ��� ���� ���鼭 ũ�ν���ŷ �����̸� ������� ���߷��� ���ϱ�*/
	
	
	for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
		dc_alloc	=	GridObj.GetCellValue("PRE_ALLOC", i);
		dc_id		=	GridObj.GetCellValue("DC_ID", i);
		
		var cd_flag	= GridObj.GetCellValue("CD_FLAG", i);
		if(cd_flag==1){
			
			cd_src_loc	=	GridObj.GetCellValue("CD_SRC_LOC", i);
			
			if(cd_src_loc=='7100'){
				
				var temp = GridObj.GetCellValue("DC_ALLOC", i);
				var temp2 = GridObj.GetCellValue("DC_ALLOC", ay_row);
				
				GridObj.SetCellValue("PRE_ALLOC", ay_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("PRE_ALLOC", i,0);

				
			}else if(cd_src_loc=='7500'){

				var temp = GridObj.GetCellValue("PRE_ALLOC", i);
				var temp2 = GridObj.GetCellValue("PRE_ALLOC", ps_row);
				
				GridObj.SetCellValue("PRE_ALLOC", ps_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("PRE_ALLOC", i,0);


			}else if(cd_src_loc=='7600'){

				var temp = GridObj.GetCellValue("PRE_ALLOC", i);
				var temp2 = GridObj.GetCellValue("PRE_ALLOC", ku_row);
				
				GridObj.SetCellValue("PRE_ALLOC", ku_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("PRE_ALLOC", i,0);

			}
			
		}
		
		
	}
	
	

}


function HeaderClick(strColumnKey){
	
}


	
function Showpopup() {
			
		var service_url = "service.do?_moon_service=ip_02090_hawastockSupportPlan_list_popup";
		//service_url += "&_moon_perpage=1&_moon_pagenumber=1"; 
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
	//	var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();

}

function Showpopup2() {
			
		var service_url = "service.do?_moon_service=ip_02090_hawastockSupportPlan_list_popup2";
		//service_url += "&_moon_perpage=1&_moon_pagenumber=1"; 
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
	//	var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();

}

function Calog_trans(){
		
		var service_url = "service.do?_moon_service=ip_02090_hawastockSupportPlan_list_popup_calog";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();
}



