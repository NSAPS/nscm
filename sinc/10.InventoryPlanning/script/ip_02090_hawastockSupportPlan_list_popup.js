//############################################################
//## ���α׷�ID		: ip_02090_hawastockSupportPlan_list_popup.js
//## ���α׷���		: ��ǰ ����� ��ȹ ���� �˾�â
//## ������			: �̰���
//## ��������		: 2014-09-29
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2014-10-01  �̰���      create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_02090_hawastockSupportPlan_list_popup';
var GridObj ; 													// WiseGrid ��ü

var color_tot			= '234|234|234';			//�հ� ���� ����
var color_edit_col		= '255|253|208';
var color_edit_col2		= '250|224|212';
var color_edit_col3		= '250|236|197';

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
	
	callGridData();
	
	
	
}
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex = true;
	GridObj.bUserContextMenu 	= true;
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
	
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�"); 
	
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) { 
	       
	       
//ERP ���̺� �ѱ� ����� ��Ī �ʿ�
	GridObj.AddHeader("SELECTED"			,""   					,"t_checkbox"	,2		,30  ,true); //0
	GridObj.AddHeader("ITEM_ID"				,"��ǰ�ڵ�"   			,"t_text" 		,100	,70  ,false); //0
	GridObj.AddHeader("ITEM_NAME"			,"��ǰ��"   				,"t_text" 		,100	,170 ,false); //0
	GridObj.AddHeader("CALOG_BOX_STOCK"		,"Ķ�α�\nBOX���"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("CALOG_PLT_STOCK"		,"Ķ�α�\nPLT���"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("DC_ALLOC"			,"���ַ�\n(BOX)"   		,"t_number" 	,100.3	,60  ,true); //0 
	GridObj.AddHeader("DC_ALLOC_PLT"		,"���ַ�\n(PLT)"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("DC_ID"				,"DC_ID"    			,"t_text" 		,100    ,0  ,false);
 	GridObj.AddHeader("DC_NAME"				,"DC��"   				,"t_text" 		,100	,130 ,false); //0   
 	GridObj.AddHeader("PAL_QTY"				,"ǰ�� PLT ����"   		,"t_text" 		,100	,0   ,false); //0
	GridObj.AddHeader("SEQ"					,"����"   				,"t_number" 	,100.3	,60  ,true); //0
	GridObj.AddHeader("IF_FLAG"				,"����"   				,"t_text" 		,100	,100 ,false); //0
	GridObj.AddHeader("RE_ORDER_FLAG"		,"�ߺ�����"   			,"t_text" 		,100	,0   ,false); //0
	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('ITEM_NAME'			  ,'left');
    GridObj.SetColCellAlign('CALOG_BOX_STOCK'	 ,'right'); 
    GridObj.SetColCellAlign('CALOG_PLT_STOCK'	 ,'right');
    GridObj.SetColCellAlign('IF_FLAG'			 ,'center');  
    GridObj.SetColCellAlign('RE_ORDER_FLAG'		 ,'center');  
   
    GridObj.SetColCellAlign('DC_ID'				,'center'); 
    GridObj.SetColCellAlign('DC_NAME'			,'center'); 
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC_PLT'		,'#,##0.00');
    GridObj.SetNumberFormat('CALOG_BOX_STOCK'	,'#,##0.#');
    GridObj.SetNumberFormat('CALOG_PLT_STOCK'	,'#,##0.#');

    GridObj.SetNumberFormat('SEQ'				,'#,##0.#');
    
   // GridObj.SetNumberFormat('SAFETY_STOCK'		,'#,##0.#');
   // GridObj.SetNumberFormat('CALOG_BOX_STOCK'	,'#,##0.#');
   // GridObj.SetNumberFormat('CALOG_PLT_STOCK'	,'#,##0.#');


	//GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
    GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);    
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   
   
function callGridData(){
	
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


	//var in_trans_unit = "";
	
	//if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	//if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";

    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	
 	
 return;
}    
      
      
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

		
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",  "search");
     
       

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
				
					
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,CALOG_BOX_STOCK,CALOG_PLT_STOCK');
				GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'ITEM_ID', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
				GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '255|255|198');				
				GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot);
				
				
			for(var i=0;i<GridObj.GetRowCount();i++) {				
					
					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
				
					
					
					var flag = GridObj.GetCellValue("IF_FLAG", 	i);
					if(flag ==""){
						GridObj.SetCellValue("IF_FLAG", i, "���۴��");
					}else if(flag =="Z"){
						GridObj.SetCellValue("IF_FLAG", i, "������");
						GridObj.SetRowBgColor(i,'255|255|126');
					}else if(flag =="C"){
						GridObj.SetCellValue("IF_FLAG", i, "���ۿϷ�");
						
					}
					
					GridObj.SetCellBgColor('CALOG_BOX_STOCK',	i,  color_edit_col2);				
					GridObj.SetCellBgColor('DC_ALLOC',			i,  color_edit_col2);
				

				
			}  
			 
				}                  
            } 	else if(endMode == "doSave"){
            	
            	doQuery();            	
            }	else if(endMode == "doIf"){
            	
            	doQuery();            	
            }	else if(endMode == "Delete"){
            	
            	doQuery();            	
            }	
            	else    
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

function HeaderClick(strColumnKey){
	
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
		
		var calogQty_box 	= Number(GridObj.GetCellValue("CALOG_BOX_STOCK", 	nRow));		
		var calogQty_plt 	= Number(GridObj.GetCellValue("CALOG_PLT_STOCK",	nRow));
		var calogQty_plt2	= Number(GridObj.GetCellValue("DC_ALLOC_PLT",	    nRow));
		
		GridObj.SetCellValue("CALOG_BOX_CAL", nRow, calogQty_box - boxQty);
		GridObj.SetCellValue("CALOG_PLT_CAL", nRow, calogQty_plt - calogQty_plt2);
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
 

function GoDelete(){
	
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var rowCount = GridObj.GetRowCount();
	
	
	
		if(confirm("���� �Ͻ� ǰ���� �����Ͻðڽ��ϱ�?") == 1 ) {
			
		}
		else{
			return;
		}		

	for(var i=0;i<GridObj.GetRowCount();i++){
		
		if( GridObj.GetCellValue("SELECTED",i)=="1") {
			if( GridObj.GetCellValue("IF_FLAG", i)=="������" || GridObj.GetCellValue("IF_FLAG", i)=="���ۿϷ�" ){
			alert("ERP ���ۿϷ� �Ǵ� �������� ������ ������ �� �����ϴ�.");
			return;
			}
		}
		
	}

    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						"delete");
	GridObj.SetParam("user_id",	 document.frm._user_id.value);
	
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}

function GoIf(){
	
	var GridObj = document.WiseGrid;	
	var leng = GridObj.GetRowCount();

	
		if(confirm("���� �Ͻ� ��ǰ�� ERP ������ Ȯ���Ͻðڽ��ϱ�?") == 1 ) {
			
		}
		else{
			
			return;
		}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date", document.frm.in_cnfm_date.value);

	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}

function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	
		
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
		
			insertRow( nRow );	
			
		}
		else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}		
	}

}

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

	GridObj.SetCellValue("SELECTED"				, nRow+1, "1");
	GridObj.SetCellValue("ITEM_ID"              , nRow+1, GridObj.GetCellValue("ITEM_ID"              , nRow));
	GridObj.SetCellValue("ITEM_NAME"            , nRow+1, GridObj.GetCellValue("ITEM_NAME"            , nRow));
	GridObj.SetCellValue("CALOG_BOX_STOCK"      , nRow+1, GridObj.GetCellValue("CALOG_BOX_STOCK"      , nRow));
	GridObj.SetCellValue("CALOG_PLT_STOCK"   	, nRow+1, GridObj.GetCellValue("CALOG_PLT_STOCK"      , nRow));
	GridObj.SetCellValue("DC_ALLOC"   			, nRow+1, GridObj.GetCellValue("DC_ALLOC"      		  , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLT"   		, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLT"         , nRow));
	GridObj.SetCellValue("DC_ID"          		, nRow+1, GridObj.GetCellValue("DC_ID"          	  , nRow));
	GridObj.SetCellValue("DC_NAME"        		, nRow+1, GridObj.GetCellValue("DC_NAME"         	  , nRow));
	GridObj.SetCellValue("PAL_QTY"        		, nRow+1, GridObj.GetCellValue("PAL_QTY"          	  , nRow));

	GridObj.SetCellValue ("SEQ"					, nRow+1, Number(GridObj.GetCellValue("SEQ"          , nRow))+1 );
	GridObj.SetCellValue ("IF_FLAG"				, nRow+1, "�űԻ���" );
	GridObj.SetCellValue ("RE_ORDER_FLAG"		, nRow+1, "Y" );


}
//SEQ ���� �ڵ� ����
function Order(){
	
	for(var i=0;i<GridObj.GetRowCount();i++) {				
					
					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
					
						//���� �ڵ� �������� ���� ��	
					if(i>0){
					var item_id2	= GridObj.GetCellValue('ITEM_ID',i-1);
					var seq2		= Number(GridObj.GetCellValue("SEQ", i-1));
						
						if( item_id == item_id2){
							
							GridObj.SetCellValue("SEQ", i, seq2+1 );
						
						}
					}
	}
}	


