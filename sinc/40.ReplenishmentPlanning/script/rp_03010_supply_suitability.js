//## ���α׷�ID       	: rp_03010_supply_suitability.js
//## ���α׷���       	: ���� ���ռ� ����
//## ������           	: �̰���
//## ��������         	: 2016-08-24 
//## ���� job file   	: job_sinc_40_replenishmentPlanning_05.xml.xml
//## ���� query file 	: query_sinc_40_replenishmentPlanning_05.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2016-08-24   �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_03010_supply_suitability';

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
	
	
	var cnfm_date = document.frm.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "rp_03010_supply_suitability_header",{
	callback:function(result){
	  	
	  	GridObj.AddHeader("SALES_CAT03"	          	,"ǰ��"			,"t_text" 	   ,100	    ,70     ,false); //0   
		GridObj.AddHeader("ITEM_ID"	          		,"ǰ���ڵ�"		,"t_text" 	   ,100	    ,70     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      		,"ǰ���"	        ,"t_text" 	   ,100	    ,180    ,false); //0	 	
	 	GridObj.AddHeader("SALES_MEAN_1WEEK_ETC"  	,"1�� ���"		,"t_number"    ,100.3	,60     ,false); //0
	 	GridObj.AddHeader("SALES_MEAN_3WEEK_ETC"  	,"3�� ���"		,"t_number"    ,100.3	,60     ,false); //0
	 	GridObj.AddHeader("SALES_MEAN_13WEEK_ETC"  	,"1/3��\n���"	,"t_number"    ,100.3	,0     ,false); //0 		
 		
		for(var i=0 ; i < 21 ; i++){
			  
			if(i < result.length) {
				GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,60  	,false);    
			} 	
			else {
				j = strToNum(i)+strToNum(1);
				if(i < 21) { //11
					GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,60  	,false);
				}
				else {
					GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,60 	,false);
				}
			}
		}
		
		GridObj.AddHeader("STDDEV_POP"  			,"�Ǹ�����"		,"t_number"    ,100.3	,60    ,false); //0		
		GridObj.AddHeader("DAY_GUBN_0"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_1"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_2"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_3"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_4"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_5"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_7"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_8"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_9"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_10"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_11"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_12"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_14"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_15"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_16"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_17"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_18"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_19"	      		,"����"	        ,"t_text" 	   ,100	    ,0    ,false); //0
	
		GridObj.BoundHeader();
		
		GridObj.SetColFix('ITEM_NAME'); 
		
		GridObj.SetColCellAlign('ITEM_NAME',        	  		'left');
	    GridObj.SetNumberFormat("SALES_MEAN_1WEEK_ETC",       	"###,###.#");
	 	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_ETC",       	"###,###.#");
	 	GridObj.SetNumberFormat("SALES_MEAN_13WEEK_ETC",       	"###,###.#");	
	 	GridObj.SetNumberFormat("DAY_0",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_1",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_2",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_3",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_4",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_5",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_6",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_7",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_8",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_9",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_10",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_11",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_12",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_13",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_14",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_15",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_16",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_17",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_18",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_19",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_20",       				"###,###.#");
	 	GridObj.SetNumberFormat("STDDEV_POP",       			"###,###.#");
	 	
	 	GridObj.SetColCellBgColor('DAY_6','255|217|250');
	 	GridObj.SetColCellBgColor('DAY_13','255|217|250');
	 	GridObj.SetColCellBgColor('DAY_20','255|217|250');
		
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
            	
            	GridSetEventGubn();
            	GridSetMerge(); 
         	           	
             
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
    doQuery();
}


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var cnfm_date	    = document.frm.cnfm_date.value;      
       cnfm_date 			= cnfm_date.replace(/-/g,"");
     
	   var user_id			= document.frm._user_id.value;         
       var gubn	    		= document.frm.gubn.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("user_id",       	user_id);
       GridObj.SetParam("gubn",  			gubn);	
         
	   GridObj.DoQuery(servlet_url);       
   }


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
	
	if(strColumnKey == 'ITEM_NAME') {
	
	
	var item_id			= GridObj.GetCellValue('ITEM_ID',nRow);
	var cnfm_date	    = document.frm.cnfm_date.value;      
       cnfm_date 		= cnfm_date.replace(/-/g,"");		
	
	var service_url = "service.do?_moon_service=rp_03010_supply_suitability_pop";
		service_url += "&item_id=" + item_id  + "&cnfm_date=" + cnfm_date ;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=975, height=640, top=50, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		
	}	
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){

}	


function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03');
    GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'SALES_CAT03', 'sum', 'SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK_ETC,SALES_MEAN_13WEEK_ETC,DAY_0,DAY_1,DAY_2,DAY_3,DAY_4,DAY_5,'
    + 'DAY_6,DAY_7,DAY_8,DAY_9,DAY_10,DAY_11,DAY_12,DAY_13,DAY_14,DAY_15,DAY_16,DAY_17,DAY_18,DAY_19,DAY_20' ); 
    GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK_ETC,SALES_MEAN_13WEEK_ETC,DAY_0,DAY_1,DAY_2,DAY_3,DAY_4,DAY_5,'
    + 'DAY_6,DAY_7,DAY_8,DAY_9,DAY_10,DAY_11,DAY_12,DAY_13,DAY_14,DAY_15,DAY_16,DAY_17,DAY_18,DAY_19,DAY_20' );
   

       
	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}

function GridSetEventGubn(){
	
	var rowcount = GridObj.GetRowCount();
	for( var i =0; i < rowcount; i++){
		/* W-1 */
		var day_0 = GridObj.GetCellValue('DAY_GUBN_0',i);
		if (day_0 == 'O') GridObj.SetCellBgColor('DAY_0',i,'255|255|200');
		var day_1 = GridObj.GetCellValue('DAY_GUBN_1',i);
		if (day_1 == 'O') GridObj.SetCellBgColor('DAY_1',i,'255|255|200');
		var day_2 = GridObj.GetCellValue('DAY_GUBN_2',i);
		if (day_2 == 'O') GridObj.SetCellBgColor('DAY_2',i,'255|255|200');
		var day_3 = GridObj.GetCellValue('DAY_GUBN_3',i);
		if (day_3 == 'O') GridObj.SetCellBgColor('DAY_3',i,'255|255|200');
		var day_4 = GridObj.GetCellValue('DAY_GUBN_4',i);
		if (day_4 == 'O') GridObj.SetCellBgColor('DAY_4',i,'255|255|200');
		var day_5 = GridObj.GetCellValue('DAY_GUBN_5',i);
		if (day_5 == 'O') GridObj.SetCellBgColor('DAY_5',i,'255|255|200');
		/* W */
		var day_7 = GridObj.GetCellValue('DAY_GUBN_7',i);
		if (day_7 == 'O') GridObj.SetCellBgColor('DAY_7',i,'255|255|200');
		var day_8 = GridObj.GetCellValue('DAY_GUBN_8',i);
		if (day_8 == 'O') GridObj.SetCellBgColor('DAY_8',i,'255|255|200');
		var day_9 = GridObj.GetCellValue('DAY_GUBN_9',i);
		if (day_9 == 'O') GridObj.SetCellBgColor('DAY_9',i,'255|255|200');
		var day_10 = GridObj.GetCellValue('DAY_GUBN_10',i);
		if (day_10 == 'O') GridObj.SetCellBgColor('DAY_10',i,'255|255|200');
		var day_11 = GridObj.GetCellValue('DAY_GUBN_11',i);
		if (day_11 == 'O') GridObj.SetCellBgColor('DAY_11',i,'255|255|200');
		var day_12 = GridObj.GetCellValue('DAY_GUBN_12',i);
		if (day_12 == 'O') GridObj.SetCellBgColor('DAY_12',i,'255|255|200');
		/* W+1 */
		var day_14 = GridObj.GetCellValue('DAY_GUBN_14',i);
		if (day_14 == 'O') GridObj.SetCellBgColor('DAY_14',i,'255|255|200');
		var day_15 = GridObj.GetCellValue('DAY_GUBN_15',i);
		if (day_15 == 'O') GridObj.SetCellBgColor('DAY_15',i,'255|255|200');
		var day_16 = GridObj.GetCellValue('DAY_GUBN_16',i);
		if (day_16 == 'O') GridObj.SetCellBgColor('DAY_16',i,'255|255|200');
		var day_17 = GridObj.GetCellValue('DAY_GUBN_17',i);
		if (day_17 == 'O') GridObj.SetCellBgColor('DAY_17',i,'255|255|200');
		var day_18 = GridObj.GetCellValue('DAY_GUBN_18',i);
		if (day_18 == 'O') GridObj.SetCellBgColor('DAY_18',i,'255|255|200');
		var day_19 = GridObj.GetCellValue('DAY_GUBN_19',i);
		if (day_19 == 'O') GridObj.SetCellBgColor('DAY_19',i,'255|255|200');
		
	}
	
}

