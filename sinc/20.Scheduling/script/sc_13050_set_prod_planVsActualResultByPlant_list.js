/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id 	   = 'sc_13050_set_prod_planVsActualResultByPlant_list';
var GridObj ; 													// WiseGrid ��ü

var color_tot 	      = '255|234|0';		//�հ� ���� ����
var color_edit_col    = '204|204|204';			//���̷� ���� ǥ�� '255|253|208', '253|228|229'//

var color_sp 	      = '230|222|230'; 		//�÷� ���м� ����
var color_select_row  = '141|232|141';		//���� ���� ����


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

    GridObj.nHDLineSize				=	26; //Header Size
    GridObj.strHDClickAction		=	"sortsingle";
 	GridObj.strActiveRowBgColor		=	"232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor	=	'232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor	=	'0|0|0'; 
	GridObj.strMouseWheelAction		=	'page'; // page ���� scroll ->�⺻�� 'default'    
	
	GridObj.strHDClickAction		=	"select";	
	
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
		
	var selected_type	= document.all.selected_type.value;
	var checked_uom 	= document.frm.checked_uom.value;

	if(selected_type=="2"){
		GridObj.AddHeader("SALES_CAT03"		,"ǰ���ڵ�"    	 ,"t_text" 	    		,100	,90   ,false); // �ߺз�// 
		GridObj.AddHeader("CD_NAME"			,"ǰ���"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"����"       	 ,"t_text" 	    		,100	,75   ,false);		
	 	GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(�Ⱦ�)"  ,"t_number" 			,100.3	,100  ,false);
	 	GridObj.AddHeader("AS_QTY"	    	,"�ȼ�"  		,"t_number" 			,100.3	,70   ,false);
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(����)"  ,"t_number" 			,100.3	,100  ,false);	  	
	  	GridObj.AddHeader("WINE_QTY"	    ,"���γ���"       ,"t_number" 			,100.3	,100  ,false); 
	  	GridObj.AddHeader("DY_QTY"	        ,"���繰��"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("MIRE_QTY"	    ,"�̷����"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("TK_QTY"	        ,"�뱸��ϴɱ�"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("HS_QTY"	        ,"�Ѽ�"         	 ,"t_number" 			,100.3	,70   ,false);
	 	GridObj.AddHeader("TOT"			    ,"��"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* ���� �ش� �߰� */
		GridObj.AddGroup("HD1",    "�۾��庰");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
		GridObj.AppendHeader("HD1",		  "AS_QTY");
		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
		GridObj.AppendHeader("HD1",   	"WINE_QTY");
		GridObj.AppendHeader("HD1",   	  "DY_QTY");
		GridObj.AppendHeader("HD1",  	"MIRE_QTY");
		GridObj.AppendHeader("HD1",    	  "TK_QTY");
		GridObj.AppendHeader("HD1",    	  "HS_QTY");	
		
		GridObj.BoundHeader();	
		
	    GridObj.SetColCellAlign('SALES_CAT03',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',	  	  'left');    
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right'); 
	    GridObj.SetColCellAlign('AS_QTY',	 	 'right');
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
	    GridObj.SetColCellAlign('WINE_QTY',	     'right');
	    GridObj.SetColCellAlign('DY_QTY',	     'right');
	    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('HS_QTY',	     'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('AS_QTY',  	   '#,##0.#');
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else if(selected_type=="3"){
		
		GridObj.AddHeader("SALES_CAT01"		,"ǰ���ڵ�"    	 ,"t_text" 	    		,100	,90   ,false); // ��з� // 
		GridObj.AddHeader("CD_NAME"			,"ǰ���"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"����"       	 ,"t_text" 	    		,100	,75   ,false);		
		GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(�Ⱦ�)"  ,"t_number" 			,100.3	,100  ,false);
		GridObj.AddHeader("AS_QTY"	    	,"�ȼ�"  		,"t_number" 			,100.3	,70  ,false);		    
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(����)"  ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("WINE_QTY"	    ,"���γ���"       ,"t_number" 			,100.3	,100  ,false); 
	  	GridObj.AddHeader("DY_QTY"	        ,"���繰��"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("MIRE_QTY"	    ,"�̷����"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("TK_QTY"	        ,"�뱸��ϴɱ�"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("HS_QTY"	        ,"�Ѽ�"         	 ,"t_number" 			,100.3	,70   ,false);
	 	GridObj.AddHeader("TOT"			    ,"��"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* ���� �ش� �߰� */
		GridObj.AddGroup("HD1",    "�۾��庰");			//�׸��忡 �׷��� ����Ѵ�. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
		GridObj.AppendHeader("HD1",		  "AS_QTY");
		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
		GridObj.AppendHeader("HD1",     "WINE_QTY");
		GridObj.AppendHeader("HD1",       "DY_QTY");
		GridObj.AppendHeader("HD1",     "MIRE_QTY");
		GridObj.AppendHeader("HD1",       "TK_QTY");
		GridObj.AppendHeader("HD1",       "HS_QTY");	
		
		GridObj.BoundHeader();	
		     
	    GridObj.SetColCellAlign('SALES_CAT01',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',		  'left');
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
		GridObj.SetColCellAlign('AS_QTY',	 	 'right');
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
	    GridObj.SetColCellAlign('WINE_QTY',	     'right');
	    GridObj.SetColCellAlign('DY_QTY',	     'right');
	    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('HS_QTY',	     'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('AS_QTY',	   '#,##0.#');
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else{
				GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"    	 ,"t_text" 	    		,100	,75   ,false); 
				GridObj.AddHeader("ITEM_NAME"		,"ǰ���"    	 	,"t_text" 	    		,100    ,190  ,false);
				GridObj.AddHeader("SPEC"			,"�԰�"       	,"t_text" 	    		,100	,110  ,false);
				GridObj.AddHeader("GUBN"			,"����"       	,"t_text" 	    		,100	,75   ,false);				
				GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(�Ⱦ�)" ,"t_number" 				,100.3	,100  ,false);    
				GridObj.AddHeader("AS_QTY"	    	,"�ȼ�"  		,"t_number" 			,100.3	,70   ,false);
				GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(����)" ,"t_number" 				,100.3	,100  ,false);
			  	GridObj.AddHeader("WINE_QTY"	    ,"���γ���"      ,"t_number" 				,100.3	,95   ,false); 
			  	GridObj.AddHeader("DY_QTY"	        ,"���繰��"      ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("MIRE_QTY"	    ,"�̷����"      ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("TK_QTY"	        ,"�뱸��ϴɱ�"   ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("HS_QTY"	        ,"�Ѽ�"         	,"t_number" 			,100.3	,70   ,false);
			 	GridObj.AddHeader("TOT"			    ,"��"       		,"t_number" 			,100.3	,90   ,false); 
				
				 /* ���� �ش� �߰� */
				GridObj.AddGroup("HD1",    "�۾��庰");			//�׸��忡 �׷��� ����Ѵ�. 
				GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
				GridObj.AppendHeader("HD1",		  "AS_QTY");
				GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
				GridObj.AppendHeader("HD1",     "WINE_QTY");
				GridObj.AppendHeader("HD1",       "DY_QTY");
				GridObj.AppendHeader("HD1",     "MIRE_QTY");
				GridObj.AppendHeader("HD1",       "TK_QTY");
				GridObj.AppendHeader("HD1",       "HS_QTY");	
				
				GridObj.BoundHeader();	
				
			    GridObj.SetColCellAlign('ITEM_ID',		  'left'); 
			    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
			    GridObj.SetColCellAlign('SPEC',			'center');
			    GridObj.SetColCellAlign('GUBN',			'center');
			    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
			    GridObj.SetColCellAlign('AS_QTY',		 'right');
			    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
			    GridObj.SetColCellAlign('WINE_QTY',	     'right');
			    GridObj.SetColCellAlign('DY_QTY',	     'right');
			    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
			    GridObj.SetColCellAlign('TK_QTY',	     'right');
			    GridObj.SetColCellAlign('HS_QTY',	     'right');
			    GridObj.SetColCellAlign('TOT',	   	     'right');
			    
				GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
				GridObj.SetNumberFormat('AS_QTY',	   '#,##0.#');
				GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
				GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
				GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
				GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('TOT',     	   '#,##0.#');		
			
	}
   
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
	    
     var in_fr_date     	= document.all.in_fr_date.value;
     var in_to_date     	= document.all.in_to_date.value;
     var selected_type	    = document.all.selected_type.value;
     var checked_uom 	    = document.frm.checked_uom.value;
     
     GridObj = document.WiseGrid;
	 GridObj.ClearGrid();
	 setHeader(GridObj);   
		
		if(selected_type=="2"){
			doQuery2();
			}else if(selected_type=="3"){
			doQuery3();
		}else{
			doQuery();
		}
	   	
   	}
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	// user_id
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
       var in_fr_date     = document.all.in_fr_date.value;
	   var in_to_date     = document.all.in_to_date.value;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       
       var selected_type  = document.all.selected_type.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       
       GridObj.DoQuery(servlet_url);
   } 
   
   /*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       var selected_type  = document.all.selected_type.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 

 /*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery3() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
              
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       var selected_type  = document.all.selected_type.value;       

       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search3");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 
/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode			= GridObj.GetParam("mode");
        var error_msg		= '';
        var selected_type	= document.all.selected_type.value;  
        var checked_uom 	= document.frm.checked_uom.value;  
        
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {                           

				if(selected_type=="2"){
					GridObj.SetGroupMerge('SALES_CAT03,CD_NAME');
				}else if(selected_type=="3"){
					GridObj.SetGroupMerge('SALES_CAT01,CD_NAME'); 
				}else{
					GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
				}								
				
				for(var i=0;i<GridObj.GetRowCount();i++) {
					if(GridObj.GetCellValue('GUBN',i) == "����"){
						GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
						GridObj.SetCellBgColor('MTS_AN_QTY',	i,	color_edit_col);
						GridObj.SetCellBgColor('AS_QTY',		i,	color_edit_col);
						GridObj.SetCellBgColor('MTS_PO_QTY',  	i,	color_edit_col);
						GridObj.SetCellBgColor('WINE_QTY', 	  	i, 	color_edit_col);
						GridObj.SetCellBgColor('DY_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('MIRE_QTY',    	i, 	color_edit_col);
						GridObj.SetCellBgColor('TK_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('HS_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('TOT',	      	i, 	color_edit_col);	
					}					
						
					}

				}    
		                    
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }

   
function excelDownload(){
	
 	 var selected_type  = document.all.selected_type.value;
		
	if(selected_type=="2"){
		GridObj.ClearGroupMerge();
	}else if(selected_type=="3"){
		GridObj.ClearGroupMerge(); 
	}else{
		GridObj.ClearGroupMerge();
	}	
	GridObj.ExcelExport('', '', true, true);
	
	if(selected_type=="2"){
		GridObj.SetGroupMerge('SALES_CAT03,CD_NAME');
	}else if(selected_type=="3"){
		GridObj.SetGroupMerge('SALES_CAT01,CD_NAME'); 
	}else{
		GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,,SPEC');
	}
			
}

// ......
function set_check_gubn(checked_uom) {
	
	document.frm.in_checked_uom.value = checked_uom;
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}

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
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h); 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h); 
        
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
        
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }