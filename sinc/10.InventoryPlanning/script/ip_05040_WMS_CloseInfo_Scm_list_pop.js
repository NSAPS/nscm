//## ���α׷�ID      : ip_05040_WMS_CloseInfo_Scm_list_pop.js
//## ���α׷���      : WMS ������� �������� (�˾�)
//## ��������        : �̰���
//## ��������        : 2015-03-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0		2015-03-16	CREATOR		�ű�
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_05040_WMS_CloseInfo_Scm_list_pop';

var GridObj ; 													// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';			//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
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
	
	var test = document.frm.col_flag.value;
	var test2 = document.frm.cnfm_date.value;	
	
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 
	doQuery();
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
	GridObj.strActiveRowBgColor    = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("CRUD"		   	   ,"CRUD"   		,"t_text"  	   ,100		,0  	,false); //0
	GridObj.AddHeader("DC_ID"	           ,"DC�ڵ�"			,"t_text" 	   ,100	    ,70     ,false); //0   
	GridObj.AddHeader("DC_NAME"	           ,"DC��"			,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_ID"	           ,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ǰ���"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("GUBN_IDX"	       ,"��������"		,"t_text" 	   ,100	    ,0    	,false); //0 
 	GridObj.AddHeader("GUBN"	           ,"��������"		,"t_text" 	   ,100	    ,140    ,false); //0   
 	GridObj.AddHeader("ODER_BOX"	       ,"�ֹ�"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("SELL_BOX"	       ,"����"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("REMN_BOX"		   ,"����"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GUBN_SCM"	       ,"SCM ��������"	,"t_combo"     ,100	    ,90     ,true); //0 	
 	GridObj.AddHeader("BIGO"		       ,"���"			,"t_text" 	   ,100	    ,180    ,true); //0
 
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('DC_ID',        'center'); 
    GridObj.SetColCellAlign('DC_NAME',      'left');
    GridObj.SetColCellAlign('ITEM_ID',      'center');
    GridObj.SetColCellAlign('ITEM_NAME',    'left');
    GridObj.SetColCellAlign('GUBN',       	'center');
    GridObj.SetColCellAlign('ODER_BOX',     'right'); 
    GridObj.SetColCellAlign('SELL_BOX',     'right');
    GridObj.SetColCellAlign('REMN_BOX',     'right'); 
    GridObj.SetColCellAlign('GUBN_SCM',     'right');
    GridObj.SetColCellAlign('BIGO',        	'center');
    
    
    GridObj.SetNumberFormat("ODER_BOX",     "###,###.#");
    GridObj.SetNumberFormat("SELL_BOX",     "###,###.#");
    GridObj.SetNumberFormat("REMN_BOX",     "###,###.#");

	GridObj.SetColCellBgColor('GUBN_SCM',color_edit_col);	

	GridObj.SetColHide("CRUD", true);

	GridObj.SetCRUDMode("CRUD");   
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
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            	
            	//GridSetCombo();
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	
        else if(endMode == "doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		doQuery();
            	}
            }
        
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
function GoSave(service) {
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};


      
// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	 var cnfm_date	    = document.frm.cnfm_date.value;
     
    
  
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("cnfm_date",  cnfm_date);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	
	GridObj.DoQuery(servlet_url, "CRUD");
	
 	
 	return;
}    


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   var itype			=   document.frm.itype.value;
       var cnfm_date	    = 	document.frm.cnfm_date.value;      
       var col_flag 		=	document.frm.col_flag.value; 
       var search_type		=	document.frm.search_type.value;
       
       var reason; 		
 	   if(col_flag =='5')		reason = '1';
 	   else if(col_flag =='6')		reason = '2';
 	   else if(col_flag =='7')		reason = '3';
 	   else if(col_flag =='8')		reason = '4';
 	   else if(col_flag =='9')		reason = '5';
 	   else							reason = '0';
	 	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
  		
       GridObj.SetParam("mode",           		"search");
       GridObj.SetParam("cnfm_date",  			cnfm_date);
       GridObj.SetParam("reason",  				reason);
       GridObj.SetParam("itype",  				itype);
       GridObj.SetParam("search_type",			search_type);
	 
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

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}


/*Sort ���� ���� */

	var flag_dc_id 		 = '1';	
	var flag_dc_name	 = '1';
	var flag_item_id	 = '1';	
	var flag_item_name 	 = '1';
	
	var flag_oder_box = '1';
	var flag_sell_box = '1';
	var flag_remn_box = '1';
	

function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('DC_ID'			,true);
	GridObj.SetColCellSortEnable('DC_NAME'			,true);
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('ODER_BOX'			,true);
	GridObj.SetColCellSortEnable('SELL_BOX'			,true);
	GridObj.SetColCellSortEnable('REMN_BOX'			,true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'DC_ID') {
		
		if(flag_dc_id =='1'){
			
			GridObj.SetColCellSort('DC_ID','descending');
		
			flag_dc_id++;
		}
		else if(flag_dc_id =='2'){
			
			GridObj.SetColCellSort('DC_ID','asceding');
		
			flag_dc_id--;
		}
	}
	
	if(strColumnKey == 'DC_NAME') {
		
		if(flag_dc_name =='1'){
			
			GridObj.SetColCellSort('DC_NAME','descending');
		
			flag_dc_name++;
		}
		else if(flag_dc_name =='2'){
			
			GridObj.SetColCellSort('DC_NAME','asceding');
		
			flag_dc_name--;
		}
	}
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}
	if(strColumnKey == 'ODER_BOX') {
		
		if(flag_oder_box =='1'){
		
			GridObj.SetColCellSort('ODER_BOX','descending');
			flag_oder_box++;
		}
		else if(flag_oder_box =='2'){
			
			GridObj.SetColCellSort('ODER_BOX','asceding');
			
			flag_oder_box--;	
			
		}
	}
	if(strColumnKey == 'SELL_BOX') {
		
		if(flag_sell_box =='1'){
		
			GridObj.SetColCellSort('SELL_BOX','descending');
			flag_sell_box++;
		}
		else if(flag_sell_box =='2'){
			
			GridObj.SetColCellSort('SELL_BOX','asceding');
			
			flag_sell_box--;	
			
		}
	}
	if(strColumnKey == 'REMN_BOX') {
		
		if(flag_remn_box =='1'){
		
			GridObj.SetColCellSort('REMN_BOX','descending');
			flag_remn_box++;
		}
		else if(flag_remn_box =='2'){
			
			GridObj.SetColCellSort('REMN_BOX','asceding');
			
			flag_remn_box--;	
			
		}
	}
	
	GridSetMerge();
		
}

function Synchronize() {
      var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   
       GridObj.SetParam("mode",           		"Synchronize");      
	   GridObj.DoQuery(servlet_url);  
	
}

//function GridSetCombo(){
//	
//	var sel_gubn;
//
//	for(i=0; i<GridObj.GetRowCount(); i++){
//		
//		var gubn_val = GridObj.GetCellValue('GUBN_SCM', i);
//		GridObj.SetComboSelectedIndex('GUBN_SCM',i,gubn_val);
//	
//	}
//	
//
//	
//}

function GridSetMerge(){
	
				
		GridObj.SetGroupMerge('DC_ID');
        GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'DC_ID', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX'); 
   		GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX');
  	       
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
				
			
}

