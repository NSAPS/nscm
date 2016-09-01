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
var job_id = 'ip_02090_hawastockSupportPlan_list_popup_calog';
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
	GridObj.AddHeader("BASE_STOCK"			,"�������"   			,"t_number" 	,100.3	,60  ,false); //0 
	GridObj.AddHeader("DC_ALLOC"			,"���ַ�\n(BOX)"   		,"t_number" 	,100.3	,60  ,true); //0 
	GridObj.AddHeader("DC_ALLOC_PLT"		,"���ַ�\n(PLT)"   		,"t_number" 	,100.3	,60  ,false); //0
	
	GridObj.AddHeader("TGT_LOC"				,"�԰���"    			,"t_combo" 		,100	,70  ,true);
 	
 	GridObj.AddHeader("PAL_QTY"				,"ǰ�� PLT ����"   		,"t_text" 		,100	,0   ,false); //0
	GridObj.AddHeader("SEQ"					,"����"   				,"t_number" 	,100.3	,50  ,true); //0

	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('ITEM_NAME'			  ,'left');
 
     
    //GridObj.SetColCellAlign('RE_ORDER_FLAG'		 ,'center');  
   
  	GridObj.SetNumberFormat('BASE_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC_PLT'		,'#,##0.00');
  

     GridObj.SetNumberFormat('SEQ'				,'#,##0.#');
    


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
				
					
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,BASE_STOCK');
//				GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'ITEM_ID', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
				GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);				
//				GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot);
				
				
			for(var i=0;i<GridObj.GetRowCount();i++) {				
					
					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
				
					
					
//					var flag = GridObj.GetCellValue("IF_FLAG", 	i);
//					if(flag ==""){
//						GridObj.SetCellValue("IF_FLAG", i, "���۴��");
//					}else if(flag =="Z"){
//						GridObj.SetCellValue("IF_FLAG", i, "������");
//						GridObj.SetRowBgColor(i,'255|255|126');
//					}else if(flag =="C"){
//						GridObj.SetCellValue("IF_FLAG", i, "���ۿϷ�");
//						
//					}
					
					GridObj.SetCellBgColor('BASE_STOCK',			i,  color_edit_col2);				
					GridObj.SetCellBgColor('DC_ALLOC_PLT',			i,  color_edit_col2);
				

				
			}  
			 
				}                  
            } 	else if(endMode == "doSave"){
            	
            	doQuery();            	
            }	else if(endMode == "doIf"){
            	
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

	}
		
	
	
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
 


function GoIf(){	
	
	
	
		
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("trans_date", document.frm.trans_date.value); 
	GridObj.SetParam("plan_type", document.frm.plan_type.value);
	
	
	// �������� ���� DWR

	var version		= document.frm.version.value;

	var src_loc 	= "8907"

	
	var truck_seq	= document.frm.truck_seq.value;

	var trans_date 	= document.frm.trans_date.value;

	
	
	var in_paramKey = "version!%!trans_date!%!src_loc";

	var in_paramCode = version+"!%!"+trans_date+"!%!"+src_loc;


 
 	
 	
 		commonUtil.getCodeInfo(in_paramKey, in_paramCode, "rp_01015_get_truck_seq", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
			
					truck_seq = arrList[0][0];		

					document.frm.truck_seq.value = truck_seq;
					GridObj.SetParam("truck_seq", document.frm.truck_seq.value);
					GridObj.DoQuery(servlet_url, "SELECTED");
			}
			
			
			else {
				return;
			}
		}
	});
	

	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	

	
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
	GridObj.SetCellValue("ITEM_ID"              , nRow+1, GridObj.GetCellValue("ITEM_ID"             	 , nRow));
	GridObj.SetCellValue("ITEM_NAME"            , nRow+1, GridObj.GetCellValue("ITEM_NAME"           	 , nRow));
	GridObj.SetCellValue("BASE_STOCK"    		, nRow+1, GridObj.GetCellValue("BASE_STOCK"      	 	 , nRow));
	GridObj.SetCellValue("DC_ALLOC"   			, nRow+1, GridObj.GetCellValue("DC_ALLOC"      			 , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLT"   		, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLT"      		 , nRow));
	//GridObj.SetCellValue("TGT_LOC"   			, nRow+1, GridObj.GetCellValue("TGT_LOC"        		 , nRow));
	GridObj.SetCellValue("PAL_QTY"          	, nRow+1, GridObj.GetCellValue("PAL_QTY"          		 , nRow));
	GridObj.SetCellValue("SEQ"					, nRow+1, Number(GridObj.GetCellValue("SEQ"         	 , nRow)));

//	GridObj.SetCellValue ("IF_FLAG"				, nRow+1, "�űԻ���" );
//	GridObj.SetCellValue ("RE_ORDER_FLAG"		, nRow+1, "Y" );


}
//SEQ ���� �ڵ� ����
//function Order(){
//	

//	for(var i=0;i<GridObj.GetRowCount();i++) {				
//					
//					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
//					
//						//���� �ڵ� �������� ���� ��	
//					if(i>0){
//					var item_id2	= GridObj.GetCellValue('ITEM_ID',i-1);
//					var seq2		= Number(GridObj.GetCellValue("SEQ", i-1));
//						
//						if( item_id == item_id2){
//							
//							GridObj.SetCellValue("SEQ", i, seq2+1 );
//						
//						}
//					}
//	}
//}	


