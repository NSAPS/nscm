//## ���α׷�ID      : ip_01160_PurchaseRequest_Plan_pop.js
//## ���α׷���      : ���ְ�ȹ ���峻�� ��ȸ �˾�
//## ��������        : �̰���
//## ��������        : 2015-06-22
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_07.xml
//## ���� query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-22  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01160_PurchaseRequest_Plan_pop';

var GridObj ; 													// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';			//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';
var flag;


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
	
	var cnfm_date = document.frm.cnfm_date.value;
	var item_id = document.frm.item_id.value;		
	
	
	commonUtil.getSelQeury( "cnfm_date!%!item_id", cnfm_date+"!%!"+item_id, "ip_01160_PurchaseRequest_Plan_pop_header",{
	callback:function(result){
			
			flag = result[0][2];
			GridObj.AddHeader("GUBN"	       	   ,"����"			,"t_text"	   	,100	    ,80      	,false); //0
	
			for(var i=0 ; i < 31 ; i++){  
				if(i <= flag) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,90  	,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,0  	,false);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,0 	,false);
					}
				}
			}
			
			
			GridObj.AddHeader("TOT"	       	,"��"	    	,"t_number"    	,100.3		,50     	,false); //0
 			GridObj.AddHeader("GAP"	        ,"������"   		,"t_text"     	,100		,60     	,false); //0
 			GridObj.AddHeader("TERM"	    ,"�Ⱓ"   		,"t_text"     	,100		,0     	,false); //0
			
			GridObj.BoundHeader();	
			
			doQuery(); 
		   
		    GridObj.SetColCellAlign('GAP',          'right');		
		    GridObj.SetColCellAlign('GUBN',          'left');		    
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   
	


//    GridObj.SetNumberFormat("WEEK_0",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_1",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_2",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_3",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_4",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_5",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_6",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_7",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_8",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_9",  	"###,###.#");
//    GridObj.SetNumberFormat("TOT",  	"###,###.#");
//    GridObj.SetNumberFormat("GAP",      "###,###.#");    
    
	

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
            	            
           		GridObj.SetGroupMerge('GAP');
           		SetGap();
             
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
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
	function GoSave(service) {	
	
	};


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   var cnfm_date	    = document.frm.cnfm_date.value;
       var item_id	    	= document.frm.item_id.value; 
	   var user_id			= document.frm._user_id.value;
       
              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("item_id",   		item_id);
       GridObj.SetParam("cnfm_date",       cnfm_date);
      
	   GridObj.SetParam("user_id", 			user_id);	   
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

	


	function SetGap(){
		
		var tot   = 0;
		var tot_1 = 0;
		var tot_2 = 0;
		var term = GridObj.GetCellValue('TERM',0);
		var array = new Array();
		var array_sub = new Array();
		
		/* �Ǹŷ� ���� ġȯ - I */
		for(var i =0; i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			array[i] = GridObj.GetCellValue(hd_name,1);
			array_sub[term-i-1] = array[i];
			
						
		}
		
		/* �Ǹŷ� ���� ġȯ - II*/		
		for(var i =0;i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			
			GridObj.SetCellValue(hd_name,1,array_sub[i]);
						
		}
		
		/* ���̷� ��� */		
		for(var i =0;i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			var expt    = GridObj.GetCellValue(hd_name,0);
			var sale    = GridObj.GetCellValue(hd_name,1);		
			
			GridObj.SetCellValue(hd_name,2,expt-sale);
						
		}
		
		/* �� ��� */
		for(var i =0; i < term; i++){
			
			var hd_name = 'WEEK_'+i;
			tot   += Number(GridObj.GetCellValue(hd_name,0));
			tot_1 += Number(GridObj.GetCellValue(hd_name,1));
			tot_2 += Number(GridObj.GetCellValue(hd_name,2));
			
		}
		GridObj.SetCellValue('TOT',0,tot  );
		GridObj.SetCellValue('TOT',1,tot_1);
		GridObj.SetCellValue('TOT',2,tot_2);
		
		var gap_expect 	= GridObj.GetCellValue('TOT',0);
		var gap_real 	= GridObj.GetCellValue('TOT',2);
		var result		= Math.round((gap_real /gap_expect)*1000/10);
		result += '%';
		
		GridObj.SetCellValue('GAP',0,result);
		GridObj.SetCellValue('GAP',1,result);
		GridObj.SetCellValue('GAP',2,result);
		
	}


