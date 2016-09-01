//## ���α׷�ID      : sc_20040_Production_Planning_Summary_list_harb.js
//## ���α׷���      : �����ȹ���
//## ��������        : �̰���
//## ��������        : 2014-08-18 ȭ����
//##
//## ���� job file   : job_sinc_20_scheduling_03.xml
//## ���� query file : query_sinc_20_scheduling_03.xml
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_20040_Production_Planning_Summary_list_harb';

var GridObj ; 													// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ���� 
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

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
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

function setHeader(GridObj) {        
	
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 


}

/*������������������������������������������������������������������������

  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.

  ������������������������������������������������������������������������*/

function defaultHeader(result){
	
	GridObj.ClearGrid();
	
	var len = result.length;
	
	GridObj.AddHeader("PLANT_ID"	      	  ,"�����ȣ"	    ,"t_text"      ,100	    ,0     ,false); //0
	GridObj.AddHeader("HID_NAME"	      	  ,"�������"	    ,"t_text"      ,100	    ,80     ,false); //0
	GridObj.AddHeader("ITEM_ID"	     		  ,"��ǰ��ȣ"		,"t_text"	   ,80	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	          ,"��ǰ��"			,"t_text" 	   ,100	    ,265    ,false); //0   
 	GridObj.AddHeader("SPEC"	     	  ,"SPEC"	        ,"t_text" 	   ,100	    ,120    ,false); //0

   // ��� ����
		
	   for( var i=0 ;i<len ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.

   {

       GridObj.AddHeader("DAY"+i	 	,result[i]	,"t_number"    ,100.3	,70     ,false); //0
      

    }
	  GridObj.AddHeader("WEEK_SUM"	  ,"�ְ���"	,"t_number"    ,100.3	,80     ,false); //0
	 
	 
      GridObj.BoundHeader();  
    
    GridObj.SetColCellAlign('PLANT_ID',              'center');  
    GridObj.SetColCellAlign('HID_NAME',              'center'); 
    GridObj.SetColCellAlign('ITEM_ID',               'center');
    GridObj.SetColCellAlign('ITEM_NAME',        	   'left');
    GridObj.SetColCellAlign('SPEC',        	  		 'center');
    GridObj.SetColCellAlign("WEEK_SUM",        	      'right');
    
    	for( var i=0 ;i<len ;i++) {
    		 GridObj.SetColCellAlign("DAY"+i	,         'right');
       		 GridObj.SetNumberFormat("DAY"+i	,     	  "###,###.#");
    	}
   
    GridObj.SetNumberFormat("WEEK_SUM",     	  "###,###.#");
	
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
              	GridObj.SetGroupMerge('PLANT_ID,HID_NAME'); 
              	GridObj.AddSummaryBar('SUMMARY1', '���庰 �հ�', 'HID_NAME', 'sum', 'DAY0,DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,WEEK_SUM');
	      	  	GridObj.AddSummaryBar('SUMMARY2', '��ü �հ�', 'summaryall', 'sum', 'DAY0,DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,WEEK_SUM');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);

                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
        checkCellColor();   //��ȸ �� Hidden���� Y��, �� ���� ����� ���� ����� ���� CELL�� ��� ���󺯰�
		
    }


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service) 
   {
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	��ȸ����
   	
   	if(item_type == null || item_type == ""){
		//alert("��ȸ������ �����Ͻʽÿ�!");
   		//return
   	}
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 
   	
    doQuery();
   }


// ������ ����
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	GridObj.DoQuery(servlet_url, "CRUD");
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	// user_id
	
//	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.

}

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var work_date	    = document.all.work_date.value;
       var item_type	    = document.all.item_type.value;   
       var domain			= document.all.domain.value;
       var search_type	    = document.all.search_type.value;
       var multi_flag		= document.all.multi_flag.value;
       var box_flag			= document.all.box_flag.value;
       var sum_type			= document.all.sum_type.value;   
       var search_item	    = document.all.search_item.value;
       var week				= document.all.week.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("work_date",   work_date);
       GridObj.SetParam("item_type",       item_type);
	   GridObj.SetParam("domain",     domain);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("multi_flag", multi_flag);
	   GridObj.SetParam("box_flag", box_flag);
	   GridObj.SetParam("sum_type", sum_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("week", week);
	   GridObj.DoQuery(servlet_url);    
	   
	   
   }

function checkCellColor(){
	
	
	var len = GridObj.GetRowCount();
	
	for (var i=0; i<len; i++){
		
		var day0 =	GridObj.GetCellHiddenValue('DAY0',i);
		var day1 =	GridObj.GetCellHiddenValue('DAY1',i);
		var day2 =	GridObj.GetCellHiddenValue('DAY2',i);
		var day3 =	GridObj.GetCellHiddenValue('DAY3',i);
		var day4 =	GridObj.GetCellHiddenValue('DAY4',i);
		var day5 =	GridObj.GetCellHiddenValue('DAY5',i);
		var day6 =	GridObj.GetCellHiddenValue('DAY6',i);
		
		if( day0 == 'Y')
		GridObj.SetCellBgColor('DAY0',i,'255|228|0');
		if( day1 == 'Y')
		GridObj.SetCellBgColor('DAY1',i,'255|228|0');
		if( day2 == 'Y')
		GridObj.SetCellBgColor('DAY2',i,'255|228|0');
		if( day3 == 'Y')
		GridObj.SetCellBgColor('DAY3',i,'255|228|0');
		if( day4 == 'Y')
		GridObj.SetCellBgColor('DAY4',i,'255|228|0');
		if( day5 == 'Y')
		GridObj.SetCellBgColor('DAY5',i,'255|228|0');
		if( day6 == 'Y')
		GridObj.SetCellBgColor('DAY6',i,'255|228|0');
		
	}
	
}
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}

  