//############################################################
//## ���α׷�ID      : op_02080_fc_planVsActual_list.js
//## ���α׷���      : ���ְ�ȹ ��� ���� ��ȸ
//## ������          : ������
//## ��������        : 2013-09-25
//##
//## ���� job file	: job_sinc_30_orderPlanning_03.xml
//## ���� query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-09-25  ������      create
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id				= 'op_02080_fc_planVsActual_list';
var GridObj ; 													// WiseGrid ��ü

var color_tot 			= '234|234|234';			//�հ� ���� ����
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//�÷� ���м� ����
var color_select_row	= '141|232|141';	//���� ���� ����


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

    GridObj.nHDLineSize				= 16; //Header Size
    GridObj.nHDLines				= 2;
 	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		='page'; // page ���� scroll ->�⺻�� 'default'  
	//GridObj.strHDClickAction    	= "sortsingle";	//header sort��� �߰�   //2013-11-04
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	var mfs_flag	    = document.all.mfs_flag.value;
    var selgubn			= document.frm.sel_gubn.value;
    var in_item_id		= document.frm.in_item_id.value;
    var in_item_name	= document.frm.in_item_name.value;


//if(selgubn == "MFS_FLAG"){
	//if(mfs_flag == "A"){
		GridObj.AddHeader("COM_NAME"		,"�迭��"   		,"t_text" 		,100	,80 	,false); //0
		//GridObj.AddHeader("ITEM_ID"	    	,"��ǰ�ڵ�"    	,"t_text" 		,100    ,0 		,false);	//0	60->0���� ���� 2013-11-14 SCM�� ���¿� ��� ��û
	 	//GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"   		,"t_text" 		,100	,0 		,false); 	//0   100->0���� ���� 2013-11-14 SCM�� ���¿� ��� ��û   
	 	GridObj.AddHeader("MATR_CODE"		,"�����ڵ�"   	,"t_text" 		,100	,60 	,false); 
	 	GridObj.AddHeader("MATR_NAME"		,"�����"      	,"t_text" 		,500	,100 	,false); //0   
	 	GridObj.AddHeader("BASE_UOM"		,"�⺻\n����"     ,"t_text" 		,500	,40 	,false); //0
	
		GridObj.AddHeader("W8_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W8_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W8_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W8_PROD_AMT"		,"������(%)"     	,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W7_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W7_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W7_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W7_PROD_AMT"		,"������(%)"     	,"t_number"     ,100.3 	,55		,false); //0
		
		GridObj.AddHeader("W6_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W6_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W6_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W6_PROD_AMT"		,"������(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W5_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W5_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W5_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W5_PROD_AMT"		,"������(%)"     	,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W4_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W4_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W4_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W4_PROD_AMT"		,"������(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W3_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W3_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W3_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W3_PROD_AMT"		,"������(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W2_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W2_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W2_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W2_PROD_AMT"		,"������(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W1_FC_QTY"		,"���ַ�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W1_PROD_QTY"		,"������"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W1_DIV_QTY"		,"���̷�"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W1_PROD_AMT"		,"������(%)"     ,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("FC_QTY_TOT"		,"���ַ�"			,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("PROD_QTY_TOT"	,"������"			,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("DIV_QTY_TOT"		,"���̷�"			,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("PROD_AMT_TOT"	,"������(%)"		,"t_number"     ,100.3 	,55		,false); //0
		

		var header_length = 0, j;
		var header_id = "op_02080_fc_planVsActual_list_header";	
		var cnfm_date		= document.all.cnfm_date.value;
		
		
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, header_id,{
		callback:function(result){
			if(result.length > 0) {
				for(var i=0 ; i < 8 ; i++){
					j = i+1;
					GridObj.AddGroup("HD"+j,      		result[0][i]+"��");			//�׸��忡 �׷��� ����Ѵ�. 
					//alert("HD"+j+" : "+result[0][i]);
				}
			}
					/* ���� �ش� �߰� */
					//GridObj.AddGroup("HD1",      		"W-8��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD1",		  "W8_FC_QTY");
					GridObj.AppendHeader("HD1",		"W8_PROD_QTY");
					GridObj.AppendHeader("HD1",		 "W8_DIV_QTY");
					GridObj.AppendHeader("HD1",		"W8_PROD_AMT");	
					
					//GridObj.AddGroup("HD2",    		  "W-7��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD2",		  "W7_FC_QTY");
					GridObj.AppendHeader("HD2",		"W7_PROD_QTY");
					GridObj.AppendHeader("HD2",		 "W7_DIV_QTY");
					GridObj.AppendHeader("HD2",		"W7_PROD_AMT");	
			
					
					//GridObj.AddGroup("HD3",      		"W-6��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD3",		  "W6_FC_QTY");
					GridObj.AppendHeader("HD3",		"W6_PROD_QTY");
					GridObj.AppendHeader("HD3",		 "W6_DIV_QTY");
					GridObj.AppendHeader("HD3",		"W6_PROD_AMT");	
				
					//GridObj.AddGroup("HD4",    		  "W-5��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD4",		  "W5_FC_QTY");
					GridObj.AppendHeader("HD4",		"W5_PROD_QTY");
					GridObj.AppendHeader("HD4",		 "W5_DIV_QTY");
					GridObj.AppendHeader("HD4",		"W5_PROD_AMT");	
			
					//GridObj.AddGroup("HD5",    		  "W-4��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD5",		  "W4_FC_QTY");
					GridObj.AppendHeader("HD5",		"W4_PROD_QTY");
					GridObj.AppendHeader("HD5",		 "W4_DIV_QTY");
					GridObj.AppendHeader("HD5",		"W4_PROD_AMT");	
			
					//GridObj.AddGroup("HD6",    		  "W-3��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD6",		  "W3_FC_QTY");
					GridObj.AppendHeader("HD6",		"W3_PROD_QTY");
					GridObj.AppendHeader("HD6",		 "W3_DIV_QTY");
					GridObj.AppendHeader("HD6",		"W3_PROD_AMT");	
			
					//GridObj.AddGroup("HD7",    		  "W-2��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD7",		  "W2_FC_QTY");
					GridObj.AppendHeader("HD7",		"W2_PROD_QTY");
					GridObj.AppendHeader("HD7",		 "W2_DIV_QTY");
					GridObj.AppendHeader("HD7",		"W2_PROD_AMT");	
			
					//GridObj.AddGroup("HD8",    		  "W-1��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD8",		  "W1_FC_QTY");
					GridObj.AppendHeader("HD8",		"W1_PROD_QTY");
					GridObj.AppendHeader("HD8",		 "W1_DIV_QTY");
					GridObj.AppendHeader("HD8",		"W1_PROD_AMT");	
			
					GridObj.AddGroup("HD9",    		  "�Ⱓ ��");			//�׸��忡 �׷��� ����Ѵ�. 
					GridObj.AppendHeader("HD9",		  "FC_QTY_TOT");
					GridObj.AppendHeader("HD9",		"PROD_QTY_TOT");
					GridObj.AppendHeader("HD9",		 "DIV_QTY_TOT");
					GridObj.AppendHeader("HD9",		"PROD_AMT_TOT");	
			
					GridObj.BoundHeader();
					
					GridObj.SetColCellAlign('COM_NAME',			 'center');
					//GridObj.SetColCellAlign('ITEM_ID',           'center');
					//GridObj.SetColCellAlign('ITEM_NAME',		   'left');
					
					GridObj.SetColCellAlign('MATR_CODE',         'center'); 
					GridObj.SetColCellAlign('MATR_NAME',		   'left');
					GridObj.SetColCellAlign('BASE_UOM',   		 'center');		
					
					GridObj.SetColCellAlign('W8_FC_QTY',			'right');
					GridObj.SetColCellAlign('W8_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W8_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W8_PROD_AMT',			'right');		
					
					GridObj.SetColCellAlign('W7_FC_QTY',			'right');
					GridObj.SetColCellAlign('W7_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W7_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W7_PROD_AMT',			'right');		
					
					GridObj.SetColCellAlign('W6_FC_QTY',			'right');
					GridObj.SetColCellAlign('W6_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W6_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W6_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W5_FC_QTY',			'right');
					GridObj.SetColCellAlign('W5_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W5_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W5_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W4_FC_QTY',			'right');
					GridObj.SetColCellAlign('W4_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W4_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W4_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W3_FC_QTY',			'right');
					GridObj.SetColCellAlign('W3_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W3_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W3_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W2_FC_QTY',			'right');
					GridObj.SetColCellAlign('W2_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W2_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W2_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W1_FC_QTY',			'right');
					GridObj.SetColCellAlign('W1_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W1_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W1_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('FC_QTY_TOT',			'right');
					GridObj.SetColCellAlign('PROD_QTY_TOT',			'right'); 
					GridObj.SetColCellAlign('DIV_QTY_TOT',			'right');
					GridObj.SetColCellAlign('PROD_AMT_TOT',			'right');		
			
					GridObj.SetNumberFormat("W8_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W7_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W6_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W5_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W4_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W3_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W2_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W1_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("FC_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("PROD_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("DIV_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("PROD_AMT_TOT",		"###,###.#");			
		
		
		}
			
	});	


}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
		var mfs_flag	    = document.all.mfs_flag.value;
	    var in_item_id	    = document.all.in_item_id.value;
	    var in_item_name	= document.all.in_item_name.value;
	    var sel_gubn 	    = document.frm.sel_gubn.value;
	    var cnfm_date 	    = document.frm.cnfm_date.value;
	    var com_code 	    = document.frm.com_code.value;
       
	    		
	    	
	    	doQuery();
	    	
	    	
	    	GridObj.ClearGrid(); 
			setHeader(GridObj);
   }    	

  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {

	var in_item_id	    = document.all.in_item_id.value;   
	var in_item_name	= document.all.in_item_name.value;
	var sel_gubn	    = document.frm.sel_gubn.value;   
	var mfs_flag	    = document.all.mfs_flag.value;
	var com_code	    = document.all.com_code.value;
	var cnfm_date	    = document.all.cnfm_date.value;
	
	var servlet_url	= Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",			"search");
       
       GridObj.SetParam("sel_gubn",			sel_gubn);
	   GridObj.SetParam("mfs_flag",			mfs_flag);
       GridObj.SetParam("com_code",			com_code);
       GridObj.SetParam("cnfm_date",		cnfm_date);
       GridObj.SetParam("in_item_id",	  in_item_id);
       GridObj.SetParam("in_item_name",	in_item_name);
       
       
       GridObj.DoQuery(servlet_url);
   }



/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode			= GridObj.GetParam("mode");
        var error_msg		= '';
        
		var in_item_id	    = document.all.in_item_id.value;   
		var in_item_name	= document.all.in_item_name.value;

        var selgubn			= document.frm.sel_gubn.value;   
		var mfs_flag		= document.all.mfs_flag.value;
		var com_code		= document.all.com_code.value;
		var cnfm_date		= document.all.cnfm_date.value;
          
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {  
				
				if(com_code=="0001000050" && com_code=="0001000021" ){
						//alert(123+"123");
					if(mfs_flag=="A"){
							//alert(123+"123");
							GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					} else if(mfs_flag=="B"){
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					} else {
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					}
			}	else {
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					}	
					
				
				if(selgubn=="MFS_FLAG"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						if(mfs_flag=="A"){
							
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
	
							
							
						} else if(mfs_flag=="B"){

								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
	
							
						}else{
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
							
						}
					
					}
				}
				else if(selgubn=="PROD"){
			 		for(var i=0;i<GridObj.GetRowCount();i++) {
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);

								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
									

				  		}
					} 
				

				
				}
            		//GridObj.ClearGroupMerge();	
            
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
            maxWidthValue		= window.innerWidth;
            maxHeightValue		= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue		= document.body.clientWidth;
            maxHeightValue		= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h			= document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue		+= Number(search_h); 
            tableHeightValue	+= Number(search_h); 
        } 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
      

        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    
    
function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ǰ����ȸ

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
	//commonUtil.getCodeInfo(in_sel_name, in_sel_value, "search_item_id_and_item_name_by_item_input", {
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup ����! 
				openItemPopup();
			}
		}
	});
}

// ǰ�� POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();		
		
}





// ǰ��/ǰ�� radio �����ϸ�, sel_gubn �� ���� �´� ��ȸ ���� ���� �־��ش�
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.mfs_flag.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.mfs_flag.style.display = "block";
	}

}

function GridCellClick(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

// ���� Ŭ�� : �� �˾�  //����� ���� ����  ������
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;

	if(selgubn == "MFS_FLAG"){ // ���ֱ׷�

		var division	= document.frm.insel_prty.value;
		//var week_flag	= '31week';

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		newWin.focus();			
					
	}else{ // ǰ��
		alert("ǰ������ ������ ��ȸ �Ͽ� �ֽñ� �ٶ��ϴ�. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		//var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		newWin.focus();		  
	}
}       

