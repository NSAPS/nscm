//############################################################
//## ���α׷�ID      : sc_16010_dailyWorkTotalization_list.vm
//## ���α׷���      : �ϰ������ȹ �Ϻ� �ٹ� ����
//## ������          : ���米
//## ��������        : 
//##
//## ���� job file   : job_sc_16010_dailyWorkTotalization_list.xml
//## ���� query file : query_sc_16010_dailyWorkTotalization_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//

var mode = '';
var class_path = "com.wisegrid.admin.";						// ���� ��Ű��(class ���� ���)
var job_id = 'sc_16010_dailyWorkTotalization_list01';
var job_id2= 'sc_16010_dailyWorkTotalization_list02';
var job_id3= 'sc_16010_dailyWorkTotalization_list03';

var GridObj;
var GridObj2;
var GridObj3;
var GridHeaderString = "";

var color01 = '188|210|238'; // ���� ����
var color02 = '238|180|180'; // �޵� ����

var weekCnt = 1;

/******************************************          Action Function         **********************************************/

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service) 
{
    doQuery();
    doQuery2()
}
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service)
{
	doSave();
}
 

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*����������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ����������������������������������������������������������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); //WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
    //setDefault();        //ȭ�� �⺻ ���� 
    setHeader();  //�ش����� 
}

function init2() {
	
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2); //WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
    //setDefault();        //ȭ�� �⺻ ���� 
    setHeader2();  //�ش����� 
}	

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); //WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
    //setDefault();        //ȭ�� �⺻ ���� 
    setHeader3();  //�ش����� 
}

/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault()
{
}
       
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{        
	//sc_16010_dailyWorkTotalization_list_header
	var param = "sdate!%!edate!%!job_id";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value + "!%!"
			  + job_id;
 
	commonUtil.getCodeList(param, value , "sc_16010_dailyWorkTotalization_list_header",defaultHeader); 
    //commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
    
}

function setHeader2() 
{        
    
	defaultHeader2();
    
}   

function setHeader3() 
{        
    
	commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader3); 
    
} 

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result){
	
    var arrHeader = '';
    var len = result.length;
    
	GridObj.AddHeader("CRUD",	"����",		"t_text", 		8, 		40,		false);	
	
	// ��� ����
    for( var i=0 ;i<len ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
    {
        arrHeader = result[i].split('!%!');
        GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
         
	var param = "sdate!%!edate";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value;
    commonUtil.getCodeList( param, value, "daily_header2", dailyHeader);// ��¥�� �ش��׷��� ����� �ش�.
	    
}
/*������������������������������������������������������������������������
  ����¥ ������ ���� �������� �κ�.
  ������������������������������������������������������������������������*/
function dailyHeader(result){
	
	weekCnt = result.length/7;
	
   	var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
   	var dayCount  = 1;  //��¥ ����
   	
   	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{			    
		dateArray = '';
		dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
		
		//�ش� �׷����
		GridObj.AddGroup("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //��¥ �׷�
		
		var str = '';
		if( dayCount < 10) str = "D0";
		else str = "D";		                
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"A");
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"B");
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"C"); 
		dayCount++;			    
	}	
	
	var cnt = result.length/7;
	for( i = 1 ; i <= cnt ; i++){
		GridObj.AddGroup("PROD_TYPE" + i, "��������");
	   	GridObj.AppendHeader("PROD_TYPE" + i, "NORMAL" + i);
	   	GridObj.AppendHeader("PROD_TYPE" + i, "EXTENSION" + i);
	   	GridObj.AppendHeader("PROD_TYPE" + i, "DAY_OFF" + i);
	}
	
	GridObj.BoundHeader();		
	GridObj.SetColFix('WORK_TYPE');
	
	//�ش� Hidden
   	GridObj.SetColHide("CRUD",true);    

   	GridObj.SetCRUDMode("CRUD", "�߰�", "����", "����"); //����,����,�߰� ���� �κ�.
   	
   	if( mode == "search"){
	   	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
		var plant_id  = document.all.selected_plant.value;
		var sdate = document.frm.sdate.value;
		var edate = document.frm.edate.value;
	    
	    //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	    GridObj.SetParam("mode", mode);
	    GridObj.SetParam("plant_id", plant_id);
		GridObj.SetParam("sdate", sdate);
		GridObj.SetParam("edate", edate);
		GridObj.SetParam("weekCnt", weekCnt);
		
	    GridObj.DoQuery(servlet_url);
		
		//doQuery2();
   	}
   
}               

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader2(){
	var param = "sdate!%!edate";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value;
	commonUtil.getCodeList( param, value, "daily_header2",{
		callback:function(result){
			weekCnt = result.length/7;
			
			GridObj2.AddHeader("DIVISION",	"�Ѱ�",		"t_text", 		8, 		220,		false);	  
    
		    var dayCnt = 1;
		    for( i = 0 ; i < weekCnt*7 ; i++ ){
		    	var strDay = "";
		    	if( dayCnt < 10 ) strDay += "0" + dayCnt;
		    	else strDay += dayCnt;
		    	GridObj2.AddHeader("D" + strDay + "A",	"��",		"t_text", 		8, 		50,		false);
		    	GridObj2.AddHeader("D" + strDay + "B",	"��",		"t_text", 		8, 		50,		false);
		    	GridObj2.AddHeader("D" + strDay + "C",	"��",		"t_text", 		8, 		50,		false);
		    	
		    	dayCnt++;
		    }    
		    
		    var param = "sdate!%!edate";
			var value = document.frm.sdate.value + "!%!"
					  + document.frm.edate.value;
		    commonUtil.getCodeList( param, value, "daily_header2", dailyHeader2);// ��¥�� �ش��׷��� ����� �ش�.
		}
	});
	
	
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader3(result)
{
    var arrHeader = '';
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
    {
        arrHeader = result[i].split('!%!');
        GridObj3.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
    
    GridObj3.BoundHeader();   
    //�÷� Format�� ���� �Ѵ�.

    //�ش� Hidden
    //GridObj3.SetColHide("CRUD",true);    

    GridObj3.SetCRUDMode("CRUD", "�߰�", "����", "����"); //����,����,�߰� ���� �κ�.
}
     
/*������������������������������������������������������������������������
  ����¥ ������ ���� �������� �κ�. 
  ������������������������������������������������������������������������*/
function dailyHeader2(result)
{
	
   	var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
   	var dayCount  = 1;  //��¥ ����
   	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{			    
		dateArray = '';
		dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
		
		//�ش� �׷����
		GridObj2.AddGroup("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //��¥ �׷�
		
		var str = '';
		if( dayCount < 10) str = "D0";
		else str = "D";		   
		             
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"A");
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"B");
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"C"); 
		
		dayCount++;			    
	}	
	
	GridObj2.BoundHeader();		
    GridObj2.SetColFix('DIVISION');  
    	//�ش� Hidden
   	   	
   	if( mode == "search"){
	   	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
		var plant_id  = document.all.selected_plant.value;
		var sdate = document.frm.sdate.value;
		var edate = document.frm.edate.value;
	    
	    //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	    GridObj2.SetParam("mode", mode);
	    GridObj2.SetParam("plant_id", plant_id);
		GridObj2.SetParam("sdate", sdate);
		GridObj2.SetParam("edate", edate);
		GridObj2.SetParam("weekCnt", weekCnt);
		
	    GridObj2.DoQuery(servlet_url);
				
   	}
             
} 

/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {
	
	mode = "search";
	
	GridObj.ClearGrid();
	setHeader(GridObj);
	

}

/*������������������������������������������������������������������������
  ���ι�° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() 
{
	mode = "search";
	
	GridObj2.ClearGrid();
	setHeader2(GridObj2);
}

/*������������������������������������������������������������������������
  ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/	
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");
    	
    // ����
    GridObj.SetParam("weekCnt", weekCnt);
    
    // ������
    GridObj.SetParam("sdate", document.frm.sdate.value);
    	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� ������
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/* INSERT */
function doInsert() {
    
    GridObj.SetParam("mode", "insert");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* UPDATE */
function doUpdata() {
	
    GridObj.SetParam("mode", "update");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* DELETE */
function doDelete() {
    
    GridObj.SetParam("mode", "delete");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
    
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	var dayCnt = 1;
        	for( i = 1 ; i <= weekCnt ; i++ ){
        		for( j = 0 ; j < 7 ; j++ ){
        			var strDay = "";
        			if( dayCnt < 10 ) strDay += "0" + dayCnt;
        			else strDay += dayCnt;
        			
		            GridObj.SetColCellAlign("D" + strDay + "A",'right');
		            GridObj.SetColCellAlign("D" + strDay + "B",'right');
		            GridObj.SetColCellAlign("D" + strDay + "C",'right');
		            
		            dayCnt++;
        		}
	            
	            GridObj.SetColCellAlign("IDX_QTY" + i,'right');      
				
				GridObj.SetColCellAlign("NORMAL" + i,'center');
				GridObj.SetColCellAlign("EXTENSION" + i,'center');
				GridObj.SetColCellAlign("DAY_OFF" + i,'center');
				
				GridObj.SetColCellBgColor("IDX_QTY" + i,'238|238|0');
        	}

                                
            //�����͸� �׷��� �Ѵ�.                                                     
            GridObj.SetGroupMerge("PLANT_NAME");             
			
			//�޵� ���� �� ����
			var rowLeng = GridObj.GetRowCount();
        	for( i = 0 ; i < rowLeng ; i++ ){
        		for( j = 1 ; j <= weekCnt*7 ; j++ ){
        			for( m = 0 ; m < 3; m++ ){
        				var shift;
        				if(m == 0) shift = "A";
        				if(m == 1) shift = "B";
        				if(m == 2) shift = "C";
						
						var strDay = "";
						if( j < 10 ) strDay += "0" + j
						else strDay += j;
						var value = GridObj.GetCellHiddenValue("D" + strDay + shift,i);
        				// ����
        				if(value == "2" ){
        					GridObj.SetCellBgColor("D" + strDay + shift, i, color01);
        				}
						// �޵�
						else if(value == "3" ){
        					GridObj.SetCellBgColor("D" + strDay + shift, i, color02);
        				}
        			}
        		}
        	}
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
    if(mode == "save") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
            doQuery(); doQuery2();
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery2() 
{
    var mode = GridObj2.GetParam("mode");
    var error_msg = 'Grid2����';
      
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {			
        if(GridObj2.GetStatus() == "true") 
        {                           
            GridObj2.SetColCellAlign("D01A",'right');
            GridObj2.SetColCellAlign("D01B",'right');
            GridObj2.SetColCellAlign("D01C",'right');
            GridObj2.SetColCellAlign("D02A",'right');
            GridObj2.SetColCellAlign("D02B",'right');
            GridObj2.SetColCellAlign("D02C",'right');
            GridObj2.SetColCellAlign("D03A",'right');
            GridObj2.SetColCellAlign("D03B",'right');
            GridObj2.SetColCellAlign("D03C",'right');
            GridObj2.SetColCellAlign("D04A",'right');
            GridObj2.SetColCellAlign("D04B",'right');
            GridObj2.SetColCellAlign("D04C",'right');
            GridObj2.SetColCellAlign("D05A",'right');
            GridObj2.SetColCellAlign("D05B",'right');
            GridObj2.SetColCellAlign("D05C",'right');
            GridObj2.SetColCellAlign("D06A",'right');
            GridObj2.SetColCellAlign("D06B",'right');
            GridObj2.SetColCellAlign("D06C",'right');
            GridObj2.SetColCellAlign("D07A",'right');
            GridObj2.SetColCellAlign("D07B",'right');
            GridObj2.SetColCellAlign("D07C",'right');               
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
        }
    }
}
   

/*********************************************   WiseGrid Event   *********************************************************/

/*������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) 
{

} 

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){     

}        

/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/        
function GridCellDblClickHandler(strColumnKey, nRow){
	//alert(GridObj.GetCellHiddenValue(strColumnKey, nRow));
	if ((strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='A')||(strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='B')||(strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='C'))
	{
		return false;
	}
	
	if( strToNum(GridObj.GetCellValue(strColumnKey, nRow)) > 0 || GridObj.GetCellHiddenValue(strColumnKey, nRow) == "null") return;
	
	var plant_id = GridObj.GetCellHiddenValue("PLANT_NAME", nRow);
	var line_id = GridObj.GetCellHiddenValue("LINE_NAME", nRow);
	var sdate = document.frm.sdate.value;
	var edate = document.frm.edate.value;
	var date_seq = Number(strColumnKey.substr(1,2))-1;
	var shift_type;
	if( strColumnKey.substr(3,1) == "A") shift_type = '1'
	else if( strColumnKey.substr(3,1) == "B") shift_type = '3'
	else if( strColumnKey.substr(3,1) == "C") shift_type = '5'
	var day_off = "";
	var user_id = document.frm._user_id.value;
	
	var param = "plant_id!%!line_id!%!sdate!%!date_seq!%!shift_type!%!day_off!%!user_id!%!edate";
	
	if( GridObj.GetCellHiddenValue(strColumnKey, nRow) == "3"){
		
		if(confirm("�޵� ������ ���� �Ͻðڽ��ϱ�?")){
		
			day_off = "N";
			var value = plant_id + "!%!" + line_id + "!%!" + sdate + "!%!" + date_seq + "!%!"
						+ shift_type + "!%!" + day_off + "!%!" + user_id + "!%!" + edate;
			
			commonUtil.executeQuery(param, value, "daily_shift_day_off_update",{
				callback:function(result){
					if(result == "SUCCESS"){
						//alert(" ����");
						GridObj.SetCellBgColor(strColumnKey, nRow, '255|255|255');
						GridObj.SetCellHiddenValue( strColumnKey, nRow, "1" );
					}
					else{
						alert(" ����");
					}
				}
			});
		}
	}
	else{
		if(confirm("�޵����� ���� �Ͻðڽ��ϱ�?")){
			
			/*
			GridObj3.InsertRow(-1); // Hidden Gride�� Row �߰�
			var rowIdx = GridObj3.GetRowCount()-1;
			var date_seq = Number(strColumnKey.substr(1,2))-1;
			var shift_type;
			if( strColumnKey.substr(3,1) == "A") shift_type = '1'
			else if( strColumnKey.substr(3,1) == "B") shift_type = '3'
			else if( strColumnKey.substr(3,1) == "C") shift_type = '5'
			//alert(date_seq);
			
			// Set Value 
			GridObj3.SetCellValue("CRUD", rowIdx, "C" );
			GridObj3.SetCellValue("CAT_ID", rowIdx, "PS" );
			GridObj3.SetCellValue("PLANT_ID", rowIdx, GridObj.GetCellHiddenValue("PLANT_NAME", nRow) );
			GridObj3.SetCellValue("LINE_ID", rowIdx, GridObj.GetCellHiddenValue("LINE_NAME", nRow) );
			GridObj3.SetCellValue("WEEK53_NO", 0, "C" );
			GridObj3.SetCellValue("PROD_DATES", rowIdx, date_seq );
			GridObj3.SetCellValue("SHIFT_TYPE", rowIdx, shift_type ); 
			GridObj3.SetCellValue("DAY_OFF", rowIdx, "Y" ); 
			*/
			
			day_off = "Y";
			var value = plant_id + "!%!" + line_id + "!%!" + sdate + "!%!" + date_seq + "!%!"
						+ shift_type + "!%!" + day_off + "!%!" + user_id;
			
			commonUtil.executeQuery(param, value, "daily_shift_day_off_update",{
				callback:function(result){
					if(result == "SUCCESS"){
						alert(" ����");
						GridObj.SetCellBgColor(strColumnKey, nRow, color02);
						GridObj.SetCellHiddenValue( strColumnKey, nRow, "3" );
					}
					else{
						alert(" ����");
					}
				}
			});
			
		}
	}
	
}

/*********************************************   ��Ÿ Function   **********************************************************/

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
    
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
	document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
	document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
        
}     
 
/*������������������������������������������������������������������������
  ������ ���� Fnc
  ������������������������������������������������������������������������*/	
function onChangeDate(obj){
	alert("!!");
	GridObj.ClearGrid();
	setHeader(GridObj);
	//doQuery();
	//GridObj2.ClearGrid();
	//setHeader2(GridObj2);
	//doQuery2();
}

function weeklyCount(){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
    document.frm.weekCnt.value = weekCnt;
 
    var paramString = "";
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "sc_16010_dailyWorkTotalization_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=400, top=0, left=0";
	var newWin = window.open(service_url, "sc_16010_dailyWorkTotalization_popup", pop_win_style); 
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}

