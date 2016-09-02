//## ���α׷�ID      : ip_01180_import_md_PlanAnalysis_list_month.js
//## ���α׷���       : ���� ��ǰ ���� ����(��)
//## ������           : �̰���
//## ��������         : 2016-01-11 
//## ���� job file   : job_sinc_10_inventoryPlanning_07.xml
//## ���� query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-03-18  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01180_import_md_PlanAnalysis_list_month';

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
	
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 
}   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";     //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {       
	
	
	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_01180_import_md_PlanAnalysis_list_header",{
	callback:function(result){

	  	//GridObj.AddHeader("CRUD"		   	  ,"CRUD"   			,"t_text"  	   ,100		,0  	,false); //0
	  	GridObj.AddHeader("SALES_CAT05"	      ,"��з�"	    		,"t_text"      ,100	    ,0     ,false); //0
		GridObj.AddHeader("SALES_CAT03"	      ,"�Һз�"	    		,"t_text"      ,100	    ,100     ,false); //0
		GridObj.AddHeader("ITEM_ID"	          ,"ǰ���ڵ�"			,"t_text" 	   ,100	    ,70     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      ,"ǰ���"	        	,"t_text" 	   ,100	    ,180    ,false); //0
	 	
	 	//GridObj.AddHeader("AVL_STOCK"	      ,"�Ѱ������"		,"t_number"    ,100.3	,70     ,false); //0 	
	 	//GridObj.AddHeader("NS_STOCK"	      ,"�������"	 	,"t_number"    ,100.3	,70     ,false); //0
	 	//GridObj.AddHeader("EXP_STOCK"	      ,"������"   		,"t_number"    ,100.3	,70     ,false); //0
	 	GridObj.AddHeader("GUBN"  		      ,"����"				,"t_text"      ,100		,80     ,false); //0
	 	GridObj.AddHeader("GUBN_IDX"  		  ,"���м���"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("NO_FLAG"  		  ,"��ǰ����"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("THREE_MON"  		  ,"3�������"			,"t_text"      ,100		,00      ,false); //0
	 	GridObj.AddHeader("BOX_CUM"  		  ,"����"				,"t_number"    ,100.3	,60      ,false); //0		
 

			for(var i=0 ; i < 12 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,60  	,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 12) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,60  	,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,60 	,true);
					}
				}
			}
		GridObj.AddHeader("TP_FLAG"	       	  ,"Ÿ���潺"   			,"t_number"    ,100.3	,70     ,false); //0	
		GridObj.AddHeader("TIMEFANCE_SORT"	  ,"TIMEFANCE_SORT"   	,"t_number"    ,100.3	,70     ,false); //0
		GridObj.BoundHeader();
		
		//GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
	    //GridObj.SetNumberFormat("NS_STOCK",     	"###,###.#");
	    //GridObj.SetNumberFormat("EXP_STOCK",        "###,###.#");
	    GridObj.SetNumberFormat("BOX_CUM",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_12",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_11",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_10",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_9",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_8",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_7",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_6",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_5",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_4",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_3",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_2",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_1",       	"###,###.#");
	   
	    
	    GridObj.SetColFix('ITEM_NAME'); 
		GridObj.SetColCellAlign('SALES_CAT05',        'left');
		GridObj.SetColCellAlign('SALES_CAT03',        'left');
	    GridObj.SetColCellAlign('ITEM_ID',            'left');
	  	GridObj.SetColCellAlign('ITEM_NAME',          'left');
	    
	    //���� 6����
	    GridObj.SetColCellBgColor('MONTH_12','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_11','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_10','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_9','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_8','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_7','255|253|208');
		//GridObj.SetColHide("CRUD", true); 
		//GridObj.SetCRUDMode("CRUD"); 			
		
		}
		
	});
 	
 	
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
            	
            	GridSetMerge(); 
//            	SetThreeMonth();            	
            	GridSetStock();
            	SetTimeFence();
            	CheckStock(); 
            	CalBoxCum();           	           	
             
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
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   
   	var search_type = document.frm.search_type.value;
  
//	if( search_type == "" || search_type == null || search_type == 00 ) {
//		alert("�귣�� ������ �����Ͻʽÿ�!");
//		return;
//	}   	
   	
   	
    doQuery();
   }




/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var cnfm_date	    = document.all.cnfm_date.value;      
       cnfm_date 			= cnfm_date.replace(/-/g,"");
     
	   var user_id			= document.all._user_id.value;         
       var search_type	    = document.all.search_type.value;		//�귣�� ����
       var sales_cat05		= document.all.sales_cat05.value;
       //var search_item		= document.all.search_item.value;       //�˻���
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("user_id",       	user_id);
       GridObj.SetParam("search_type",  	search_type);	
       GridObj.SetParam("sales_cat05",  	sales_cat05);	
	   //GridObj.SetParam("search_item",  	search_item);	   
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
	
	var user_id		= document.all._user_id.value; 
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	var no_flag		= GridObj.GetCellValue('NO_FLAG',nRow);	
	var three_mon   = GridObj.GetCellValue('THREE_MON',nRow);	
	
	var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date + "&no_flag=" + no_flag + "&three_mon=" + three_mon + "&user_id=" + user_id;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=740, top=50, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){
	
//	if(strColumnKey == 'WEEK_0'){
//		
//		var start_hd_name	= 'WEEK_0';
//		var hd_name 		= start_hd_name;
//		var hd_name_1 		= start_hd_name.substr(0,5);
//		var hd_name_2 		= start_hd_name.substr(5,6);
//		
//			for(var i=0; i<26; i++){
//				
//				hd_name_2 = Number(hd_name_2)+Number(1);						
//				hd_name = hd_name_1+hd_name_2;
//			
//				GridObj.SetCellValue(hd_name, nRow,  vtNewValue);
//			}
//		
//	}
	
	GridSetStock();
	
	CheckStock();
}	

/*��� �帧���� Default*/
function GridSetStock(){
	
	var cur_stock;
	var reciept_expt;
	var sales_expt;
	var next_stock;	
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //�Ұ� �ε��� ���ϱ�
	for (var i=0; i<rowcount; i++){
		
		var start_hd_name	= 'MONTH_6';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,6);
		var hd_name_2 		= start_hd_name.substr(6,7);		
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);	
		
		for(var j =0; j < 5; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			
			next_stock		= Number(cur_stock) + Number(reciept_expt) - Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)-Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj.SetCellValue(hd_name, idx,  next_stock);
			
		}			
	}		
}

/*����ǰ 3���� ��� ����*/
function SetThreeMonth(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	var date = new Date();	
	var remain_day = Number(8) - date.getDay();	
	
	for(var i=0; i<rowcount; i++){
		
		var flag = GridObj.GetCellValue('NO_FLAG',i);
		if(flag == "NEW") {
			
			GridObj.SetCellBgColor('GUBN', i , '212|244|250');
			GridObj.SetCellValue('GUBN',i,'3���� �����');
			for(var j=1; j<13; j++){
			
				hd_name = 'MONTH_' + j ;
				if(GridObj.GetCellValue(hd_name,i)==0){
					
					if(hd_name == 'MONTH_1') GridObj.SetCellValue(hd_name,i,Math.round(GridObj.GetCellValue('THREE_MON',i)/Number(7) * remain_day ,0));
					else GridObj.SetCellValue(hd_name,i,GridObj.GetCellValue('THREE_MON',i));
					
				}
			
			}
		}
	}
	
	var mergecount = GridObj.GetMergeCount('ITEM_ID');   //�Ұ� �ε��� ���ϱ�
	
    for (var i=0; i<mergecount; i++){
     	
     	var no_flag = GridObj.GetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//�� Merge ���� ù ��° Row ���� �޾ƿ´�.
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     	
     	var no_flag = GridObj.GetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//�� Merge ���� ù ��° Row ���� �޾ƿ´�.
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     
      	   
     }
     
     
}

/*Ÿ���潺 ����*/
/*���� �Ǹŷ� ���� Ÿ���潺 �մ��� */
function SetTimeFence(){		
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= GridObj.GetCellValue('TP_FLAG',i);
		
		
		for(var j=fence; j>0; j--){
			
			hd_name		= 'MONTH_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
		}
					
	}
	
}

function CheckStock(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	for( var j =0; 3*j < rowcount; j++){
			
			for (var i =0; i < 6; i++){
				
					var hd_name = 'MONTH_'+ (Number(6) - Number(i)) ;
					var stock 	 = GridObj.GetCellValue(hd_name, j * 3);
					var tp_flag  = GridObj.GetCellValue('TP_FLAG',j * 3);
					if (stock < 0) {
						
							if ( i < tp_flag) {
								GridObj.SetCellBgColor(hd_name, j * 3 , '255|54|54');
								GridObj.SetCellBgColor('ITEM_ID', j * 3 , '255|54|54');
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 , tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 , tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 , tp_flag - i );							
								
							}
							else{
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  tp_flag - i );	
							}		
						break;
								
					}
					GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  -99 );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  -99 );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  -99 );	
			}	
	}
	
	
	
}

function CheckStock2(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	for( var j =0; 3*j < rowcount; j++){
			
			for (var i =0; i < 6; i++){
				
					var hd_name = 'MONTH_'+ (Number(6) - Number(i)) ;
					
					var stock 	 = GridObj.GetCellValue(hd_name, j * 3);
					var tp_flag  = GridObj.GetCellValue('TP_FLAG',j * 3);
					if (stock < 0) {
						
						
								GridObj.SetCellBgColor(hd_name, j * 3 , '255|54|54');
								GridObj.SetCellBgColor('ITEM_ID', j * 3 , '255|54|54');
						break;
								
					}
					GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  -99 );
					GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  -99 );	
					GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  -99 );	
			}	
	}
	
	
	
}

function sort(){
	
	GridObj.ClearGroupMerge();
	GridObj.SetColCellSort('TIMEFANCE_SORT','descending');
	GridSetMerge();
}

function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'ITEM_ID', 'sum', ''); 
    GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', '');      

       
	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}


function CalBoxCum(){
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID'); 
	
	for (var i =0; i < rowcount; i ++){		
		
		var start_hd_name	= 'MONTH_12';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,6);
		var hd_name_2 		= start_hd_name.substr(6,7);
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		var box_cum			= 0;
		
		
		for(var j =0; j < 12; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			box_cum	+= Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)-Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			
			
		}			
		GridObj.SetCellValue('BOX_CUM', idx+2,  box_cum);
	}
	
}

function SafeStock(){	
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //�Ұ� �ε��� ���ϱ�
	for (var i=0; i<rowcount; i++){
		
		var start_hd_name	= 'MONTH_6';
		var pre_hd_name		= 'MONTH_7';
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);	
		
	
			
			pre_sales		= GridObj.GetCellValue(pre_hd_name,idx+2);
			cur_stock 		= GridObj.GetCellValue(start_hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(start_hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(start_hd_name,idx+2);
			
			
			GridObj.SetCellValue(start_hd_name, idx,	cur_stock -   pre_sales);
			
			
	}
	
	GridSetStock();
	//SetTimeFence();
	CheckStock(); 
	
	
}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.search_type.options;
	

	
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//�ɼ� ����� ���� select option ������ŭ
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//�ɼ� ä��� result ������ŭ��
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
			
				
		
		}
		
	});
	
	
}

