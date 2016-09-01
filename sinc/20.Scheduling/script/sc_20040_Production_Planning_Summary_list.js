//## ���α׷�ID      : sc_20040_Production_Planning_Summary_list_new.js
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
var job_id = 'sc_20040_Production_Planning_Summary_list';

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
 	GridObj.AddHeader("SPEC"	     	  	  ,"SPEC"	        ,"t_text" 	   ,100	    ,120    ,false); //0	
 	GridObj.AddHeader("GUBN"	    	   		,"����"	    	,"t_text"  	   ,100		,50     ,false); //0
	
   // ��� ����
		
	   for( var i=0 ;i<len ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.

   {

       GridObj.AddHeader("DAY"+i+"_1"	 	,"��"	,"t_number"    ,100.3	,70     ,false); //0
       GridObj.AddHeader("DAY"+i+"_2"	 	,"��"	,"t_number"    ,100.3	,70     ,false); //0
       GridObj.AddHeader("DAY"+i+"_3"	 	,"��"	,"t_number"    ,100.3	,70     ,false); //0
      

    }
	  GridObj.AddHeader("WEEK_SUM"	  ,"�ְ���"	,"t_number"    ,100.3	,80     ,false); //0
	  
	 /* ���� �ش� �߰� */
	GridObj.AddGroup	("MON",    	result[0]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("MON",	  	  "DAY0_1");
	GridObj.AppendHeader("MON",   	  "DAY0_2");
	GridObj.AppendHeader("MON",		  "DAY0_3");
	GridObj.AddGroup	("TUE",    	result[1]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("TUE",	  	  "DAY1_1");
	GridObj.AppendHeader("TUE",   	  "DAY1_2");
	GridObj.AppendHeader("TUE",		  "DAY1_3");
	GridObj.AddGroup	("WED",    	result[2]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("WED",	  	  "DAY2_1");
	GridObj.AppendHeader("WED",   	  "DAY2_2");
	GridObj.AppendHeader("WED",		  "DAY2_3");
	GridObj.AddGroup	("THR",    	result[3]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("THR",	  	  "DAY3_1");
	GridObj.AppendHeader("THR",   	  "DAY3_2");
	GridObj.AppendHeader("THR",		  "DAY3_3");
	GridObj.AddGroup	("FRI",    	result[4]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("FRI",	  	  "DAY4_1");
	GridObj.AppendHeader("FRI",   	  "DAY4_2");
	GridObj.AppendHeader("FRI",		  "DAY4_3");
	GridObj.AddGroup	("SAT",    	result[5]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("SAT",	  	  "DAY5_1");
	GridObj.AppendHeader("SAT",   	  "DAY5_2");
	GridObj.AppendHeader("SAT",		  "DAY5_3");
	GridObj.AddGroup	("SUN",    	result[6]);			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("SUN",	  	  "DAY6_1");
	GridObj.AppendHeader("SUN",   	  "DAY6_2");
	GridObj.AppendHeader("SUN",		  "DAY6_3");
	
	 
	 
      GridObj.BoundHeader();  
    
    GridObj.SetColCellAlign('PLANT_ID',              'center');  
    GridObj.SetColCellAlign('HID_NAME',              'center'); 
    GridObj.SetColCellAlign('ITEM_ID',               'center');
    GridObj.SetColCellAlign('ITEM_NAME',        	   'left');
    GridObj.SetColCellAlign('SPEC',        	  		 'center');
    GridObj.SetColCellAlign('WEEK_SUM',        	      'right');
    GridObj.SetColCellAlign('GUBN',              'center');  
    
    	for( var i=0 ;i<len ;i++) {
    		 GridObj.SetColCellAlign("DAY"+i+"_1"	,         'right');
    		 GridObj.SetColCellAlign("DAY"+i+"_2"	,         'right');
    		 GridObj.SetColCellAlign("DAY"+i+"_3"	,         'right');
       		 GridObj.SetNumberFormat("DAY"+i+"_1"	,     	  "###,###.#");
       		 GridObj.SetNumberFormat("DAY"+i+"_2"	,     	  "###,###.#");
       		 GridObj.SetNumberFormat("DAY"+i+"_3"	,     	  "###,###.#");
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
              	GridObj.AddSummaryBar('SUMMARY1', '���庰 �հ�', 'HID_NAME', 'sum', 'DAY0_1,DAY0_2,DAY0_3,DAY1_1,DAY1_2,DAY1_3,DAY2_1,DAY2_2,DAY2_3,DAY3_1,DAY3_2,DAY3_3,'
              	+'DAY4_1,DAY4_2,DAY4_3,DAY5_1,DAY5_2,DAY5_3,DAY6_1,DAY6_2,DAY6_3,WEEK_SUM');
	      	  	GridObj.AddSummaryBar('SUMMARY2', '��ü �հ�', 'summaryall', 'sum', 'DAY0_1,DAY0_2,DAY0_3,DAY1_1,DAY1_2,DAY1_3,DAY2_1,DAY2_2,DAY2_3,DAY3_1,DAY3_2,DAY3_3,'
	      	  	+'DAY4_1,DAY4_2,DAY4_3,DAY5_1,DAY5_2,DAY5_3,DAY6_1,DAY6_2,DAY6_3,WEEK_SUM');
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
       var mto_gubn			= document.all.mto_gubn.value;			//MTO/MTS
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
	   GridObj.SetParam("mto_gubn",		mto_gubn);	
	   GridObj.DoQuery(servlet_url);    
	   
	   
   }

function checkCellColor(){
	
	
	var len = GridObj.GetRowCount();

	
	for (var i=0; i<len; i++){
		
		var day0_1 =	GridObj.GetCellHiddenValue('DAY0_1',i);
		var day0_2 =	GridObj.GetCellHiddenValue('DAY0_2',i);
		var day0_3 =	GridObj.GetCellHiddenValue('DAY0_3',i);
		var day1_1 =	GridObj.GetCellHiddenValue('DAY1_1',i);
		var day1_2 =	GridObj.GetCellHiddenValue('DAY1_2',i);
		var day1_3 =	GridObj.GetCellHiddenValue('DAY1_3',i);
		var day2_1 =	GridObj.GetCellHiddenValue('DAY2_1',i);
		var day2_2 =	GridObj.GetCellHiddenValue('DAY2_2',i);
		var day2_3 =	GridObj.GetCellHiddenValue('DAY2_3',i);
		var day3_1 =	GridObj.GetCellHiddenValue('DAY3_1',i);
		var day3_2 =	GridObj.GetCellHiddenValue('DAY3_2',i);
		var day3_3 =	GridObj.GetCellHiddenValue('DAY3_3',i);
		var day4_1 =	GridObj.GetCellHiddenValue('DAY4_1',i);
		var day4_2 =	GridObj.GetCellHiddenValue('DAY4_2',i);
		var day4_3 =	GridObj.GetCellHiddenValue('DAY4_3',i);
		var day5_1 =	GridObj.GetCellHiddenValue('DAY5_1',i);
		var day5_2 =	GridObj.GetCellHiddenValue('DAY5_2',i);
		var day5_3 =	GridObj.GetCellHiddenValue('DAY5_3',i);
		var day6_1 =	GridObj.GetCellHiddenValue('DAY6_1',i);
		var day6_2 =	GridObj.GetCellHiddenValue('DAY6_2',i);
		var day6_3 =	GridObj.GetCellHiddenValue('DAY6_3',i);
	
		
		
		if( day0_1 == 'Y')
		GridObj.SetCellBgColor('DAY0_1',i,'255|228|0');
		if( day0_2 == 'Y')
		GridObj.SetCellBgColor('DAY0_2',i,'255|228|0');
		if( day0_3 == 'Y')
		GridObj.SetCellBgColor('DAY0_3',i,'255|228|0');
		if( day1_1 == 'Y')
		GridObj.SetCellBgColor('DAY1_1',i,'255|228|0');
		if( day1_2 == 'Y')
		GridObj.SetCellBgColor('DAY1_2',i,'255|228|0');
		if( day1_3 == 'Y')
		GridObj.SetCellBgColor('DAY1_3',i,'255|228|0');
		if( day2_1 == 'Y')
		GridObj.SetCellBgColor('DAY2_1',i,'255|228|0');
		if( day2_2 == 'Y')
		GridObj.SetCellBgColor('DAY2_2',i,'255|228|0');
		if( day2_3 == 'Y')
		GridObj.SetCellBgColor('DAY2_3',i,'255|228|0');
		if( day3_1 == 'Y')
		GridObj.SetCellBgColor('DAY3_1',i,'255|228|0');
		if( day3_2 == 'Y')
		GridObj.SetCellBgColor('DAY3_2',i,'255|228|0');
		if( day3_3 == 'Y')
		GridObj.SetCellBgColor('DAY3_3',i,'255|228|0');
		if( day4_1 == 'Y')
		GridObj.SetCellBgColor('DAY4_1',i,'255|228|0');
		if( day4_2 == 'Y')
		GridObj.SetCellBgColor('DAY4_2',i,'255|228|0');
		if( day4_3 == 'Y')
		GridObj.SetCellBgColor('DAY4_3',i,'255|228|0');
		if( day5_1 == 'Y')
		GridObj.SetCellBgColor('DAY5_1',i,'255|228|0');
		if( day5_2 == 'Y')
		GridObj.SetCellBgColor('DAY5_2',i,'255|228|0');
		if( day5_3 == 'Y')
		GridObj.SetCellBgColor('DAY5_3',i,'255|228|0');
		if( day6_1 == 'Y')
		GridObj.SetCellBgColor('DAY6_1',i,'255|228|0');
		if( day6_2 == 'Y')
		GridObj.SetCellBgColor('DAY6_2',i,'255|228|0');
		if( day6_3 == 'Y')
		GridObj.SetCellBgColor('DAY6_3',i,'255|228|0');

		
	}
	
}
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}

  