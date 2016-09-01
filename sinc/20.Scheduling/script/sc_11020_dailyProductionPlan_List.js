/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//

var job_id = 'sc_11020_dailyProdectionPlan_List';
var GridObj;
var GridHeaderString = "";

var colorO = '188|210|238'; //����
var colorF = '238|180|180'; //�޵�
var color01 = '246|246|246'; // ���м�, �Ұ�, �ٹ����� �ȵ� shift ����

/******************************************          Action Function         **********************************************/

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service){
   doQuery();
}

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������*/
function init(){
   GridObj = document.WiseGrid;
   setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
   setDefault();        //ȭ�� �⺻ ���� 
   setHeader(GridObj);  //�ش����� 
   
}
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault(){
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       

}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj){        
   commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
       
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result){
   var test = '';
   var arrHeader = '';
   for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
   {
       arrHeader = result[i].split('!%!');
       GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,false);        
   }
   
   var param = "selected_date";
   var value = document.frm.selected_date.value;
   commonUtil.getCodeList(param, value, "daily_header_selected",dailyHeader); //��¥�� �ش��� ����� �ش�.
}
       
/*������������������������������������������������������������������������
  ����¥ ������ ���� �������� �κ�.
  ������������������������������������������������������������������������*/
function dailyHeader(result){
   GridObj.AddHeader("SP00"			 ," "				 , "t_text"	  ,1   ,1  ,false);
   
   GridObj.AddHeader("D01A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D01B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D01C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);  
   
   GridObj.AddHeader("SP01"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
          
   GridObj.AddHeader("D02A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D02B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D02C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP02"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D03A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D03B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D03C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP03"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D04A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D04B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D04C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP04"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D05A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D05B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D05C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP05"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D06A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D06B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D06C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP06"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D07A"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D07B"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D07C"          ,"��"               , "t_number"   ,100.3  ,45 ,false);         
                                                               
   GridObj.AddHeader("CD01A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD01B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD01C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06C"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07A"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07B"          ,"��"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07C"          ,"��"               , "t_text"   ,100  ,45 ,true);         

   var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
   var dayCount  = 1;  //��¥ ����
      
   for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
   {       
        dateArray = '';
        dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
        
        //�ش� �׷����
        GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //��¥ �׷�
                        
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 
        dayCount++;
        
   }

      GridObj.BoundHeader()    
      
      //�÷� Format�� ���� �Ѵ�.
   GridObj.SetColCellAlign('ITEM_ID',  	'center');
   GridObj.SetNumberFormat("D01A",       "###,###");
   GridObj.SetNumberFormat("D01B",       "###,###");
   GridObj.SetNumberFormat("D01C",       "###,###");
   GridObj.SetNumberFormat("D02A",       "###,###");
   GridObj.SetNumberFormat("D02B",       "###,###");
   GridObj.SetNumberFormat("D02C",       "###,###");
   GridObj.SetNumberFormat("D03A",       "###,###");
   GridObj.SetNumberFormat("D03B",       "###,###");
   GridObj.SetNumberFormat("D03C",       "###,###");
   GridObj.SetNumberFormat("D04A",       "###,###");
   
   GridObj.SetNumberFormat("D04B",       "###,###");
   GridObj.SetNumberFormat("D04C",       "###,###");
   GridObj.SetNumberFormat("D05A",       "###,###");
   GridObj.SetNumberFormat("D05B",       "###,###");
   GridObj.SetNumberFormat("D05C",       "###,###");
   GridObj.SetNumberFormat("D06A",       "###,###");
   GridObj.SetNumberFormat("D06B",       "###,###");
   GridObj.SetNumberFormat("D06C",       "###,###");
   GridObj.SetNumberFormat("D07A",       "###,###");
   GridObj.SetNumberFormat("D07B",       "###,###");
   GridObj.SetNumberFormat("D07C",       "###,###");
   //�ش� Hidden
   GridObj.SetColHide("CRUD",true);
   GridObj.SetColHide("CD01A",true);
   GridObj.SetColHide("CD01B",true);
   GridObj.SetColHide("CD01C",true);
   GridObj.SetColHide("CD02A",true);
   GridObj.SetColHide("CD02B",true);
   GridObj.SetColHide("CD02C",true);
   GridObj.SetColHide("CD03A",true);
   GridObj.SetColHide("CD03B",true);
   GridObj.SetColHide("CD03C",true);
   GridObj.SetColHide("CD04A",true);
   GridObj.SetColHide("CD04B",true);
   GridObj.SetColHide("CD04C",true);
   GridObj.SetColHide("CD05A",true);
   GridObj.SetColHide("CD05B",true);
   GridObj.SetColHide("CD05C",true);
   GridObj.SetColHide("CD06A",true);
   GridObj.SetColHide("CD06B",true);
   GridObj.SetColHide("CD06C",true);
   GridObj.SetColHide("CD07A",true);
   GridObj.SetColHide("CD07B",true);
   GridObj.SetColHide("CD07C",true);
   

   GridObj.SetCRUDMode("CRUD", "�߰�", "����", "����"); //����,����,�߰� ���� �κ�.
}               
               
/***********************************************   WiseGrid ���  **********************************************************/               
   
/*������������������������������������������������������������������������
  ����ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery(){
    var servlet_url = Project_name+"/servlet/com.wisegrid.admin.sc_11020_dailyProductionPlan_List";
    
    //����
    var selected_date = document.frm.selected_date.value;
    
    //�Ϲ�/��Ƽ
//    var checked_multi = "";
//    if(document.all.checked_multi[0].checked) checked_multi='default';
//    if(document.all.checked_multi[1].checked) checked_multi='normal';
//    if(document.all.checked_multi[2].checked) checked_multi='visual';
//    if(document.all.checked_multi[3].checked) checked_multi='multi';
   
	//���� �ڵ�
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("���õ� ������ �����ϴ�!!");
		return;
	}		   
   
    //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
    GridObj.SetParam("mode", "search");
    GridObj.SetParam("selected_date", selected_date);
    GridObj.SetParam("checked_multi", "");
    GridObj.SetParam("plant_id", str);
    
    GridObj.DoQuery(servlet_url);

    //GridObj.ClearGrid() 
    //setHeader(GridObj);  //�ش����� 
}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
	setGrid();
	
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    var arrA = '';
    var arrB = '';
    var arrC = '';
    
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
             GridObj.SetColCellAlign("D01A",'right');      
             GridObj.SetColCellAlign("D01B",'right');      
             GridObj.SetColCellAlign("D01C",'right');      
             GridObj.SetColCellAlign("D02A",'right');      
             GridObj.SetColCellAlign("D02B",'right');      
             GridObj.SetColCellAlign("D02C",'right');      
             GridObj.SetColCellAlign("D03A",'right');      
             GridObj.SetColCellAlign("D03B",'right');      
             GridObj.SetColCellAlign("D03C",'right');      
             GridObj.SetColCellAlign("D04A",'right');      
             GridObj.SetColCellAlign("D04B",'right');      
             GridObj.SetColCellAlign("D04C",'right');      
             GridObj.SetColCellAlign("D05A",'right');      
             GridObj.SetColCellAlign("D05B",'right');      
             GridObj.SetColCellAlign("D05C",'right');      
             GridObj.SetColCellAlign("D06A",'right');      
             GridObj.SetColCellAlign("D06B",'right');      
             GridObj.SetColCellAlign("D06C",'right');      
             GridObj.SetColCellAlign("D07A",'right');      
             GridObj.SetColCellAlign("D07B",'right');      
             GridObj.SetColCellAlign("D07C",'right');      
             
             // ���� ���� Ŀ�� ���� �ʵǰ� ����
            GridObj.SetColCellActivation('SP00','disable');
			GridObj.SetColCellActivation('SP01','disable');
			GridObj.SetColCellActivation('SP02','disable');
			GridObj.SetColCellActivation('SP03','disable');
			GridObj.SetColCellActivation('SP04','disable');
			GridObj.SetColCellActivation('SP05','disable');
			GridObj.SetColCellActivation('SP06','disable');			

			var rowLeng = GridObj.GetRowCount();
			if( rowLeng > 0 ){
				var proc_id = GridObj.GetCellHiddenValue("PROC_NAME", 0);
				
				var colBg01 = '255|252|192';
				var colBg02 = '255|255|255';
				var colBg = colBg01; //���� ���� ��
				
				var onBg01 = '255|255|0';
				var onBg02 = '239|239|239';
				var onBg = onBg01; //���� ���� ��
				
				var nonBg01 = '204|222|242';
				var nonBg02 = '239|239|239';
				var nonBg = nonBg01; // �ٹ����� �ȵ� shift
				var colLen = GridObj.GetColCount();		
			
				var get_plant_id = '';
				var get_proc_id  = '';
				var get_item_id  = '';
				
				for( i = 0 ; i < rowLeng ; i++ ){
				    get_plant_id = GridObj.GetCellHiddenValue("PLANT_NAME",i);
			        get_proc_id  = GridObj.GetCellHiddenValue("PROC_NAME",i);
			        get_item_id  = GridObj.GetCellValue("ITEM_ID",i);

					//�۾��庰 ����(row����)
					if( proc_id != GridObj.GetCellHiddenValue("PROC_NAME", i) ){
						
						proc_id = GridObj.GetCellHiddenValue("PROC_NAME", i);
						if(colBg == colBg01) {
							colBg = colBg02;
							onBg = onBg02;
							nonBg = nonBg02;
						}
						else {
							colBg = colBg01;
							onBg = onBg01;
							nonBg = nonBg01;
						}
					}
					
					//var colLeng = GridObj.GetColCount();
					for( j = 0; j < 38; j++){ 
						// �÷����м�
						if(GridObj.GetColHDKey(j).substr(0,3) == "SP0"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color01); 
						}
						else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue("C"+GridObj.GetColHDKey(j),i) == "F"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colorF);							
						}
						// ���� ����
						else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue(GridObj.GetColHDKey(j),i) == "O"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, onBg);							
						}
						// ���� ���� ����
						else{
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
						}
					}			
				} 
			}  
                                 
            //�����͸� �׷��� �Ѵ�.                                                     
            GridObj.SetGroupMerge("PLANT_NAME,PROC_NAME");                                                    
            
            for(var i=0 ;i<GridObj.GetRowCount() ;i++)
            {
                for(var j=1 ;j<=7 ;j++)
                {
                    arrA=GridObj.GetCellValue('CD0'+j+'A',i).split('_MSG_');
                    arrB=GridObj.GetCellValue('CD0'+j+'B',i).split('_MSG_');
                    arrC=GridObj.GetCellValue('CD0'+j+'C',i).split('_MSG_');
                    
                    //������ ��� 'O' �̴�, ������ �÷�����ȸ������ . �޵��� ��� 'F'
                    if(arrA[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'A',i,colorO) ; 
                    }else if(arrA[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'A',i,colorF) ; 
                    }
                    if(arrB[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'B',i,colorO) ;
                    }else if(arrB[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'B',i,colorF) ;
                    }
                    if(arrC[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'C',i,colorO) ;
                    }else if(arrC[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'C',i,colorF) ;
                    }
                    
                    var colorInfoBg = '64|255|64'
                    //�޽����� �ִ� �÷��� ������ ������.
                    if(arrA[0]!='' || arrA[1]!='' || arrA[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'A',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'A',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    if(arrB[0]!='' || arrB[1]!='' || arrB[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'B',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'B',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    if(arrC[0]!='' || arrC[1]!='' || arrC[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'C',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'C',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    
                }
            }
            
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}

/*����������������������������������������������������������������������������������������������������������������
  ���׸��� ���� Fnc
  ����������������������������������������������������������������������������������������������������������������*/
function setGrid(){
	// ��� �׷�� ����
	//var weekNo    = ''; //ȭ�鿡�� ��ȸ�ϴ� ������ ��� �����δ�. ( ����=1, ����=2, ������=3)
    var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
    var dayCount  = 1;  //��¥ ����
	//if(document.frm.checked_weekly[0].checked) weekNo=1;
    //if(document.frm.checked_weekly[1].checked) weekNo=2;
    //if(document.frm.checked_weekly[2].checked) weekNo=3;
    
    var param = "selected_date";
    var value = document.frm.selected_date.value;
    commonUtil.getCodeList(param, value, "daily_header_selected",{
			callback:function(result){
				for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
			    {
			         dateArray = '';
		             dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
		             
		             GridObj.SetGroupHDText("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')'); 
		             
		             dayCount++;
			    }
			}
		}
    ); //��¥�� �ش��� ����� �ش�.
}
    
/*********************************************   WiseGrid Event   *********************************************************/    
   
/*������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow){
	
}    
  
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){ 
  if(strColumnKey >= 'D01A' && strColumnKey <= 'D07C'){
      var msg=GridObj.GetCellValue('CD0'+strColumnKey.substr(2,2),nRow).split('_MSG_');
      
      document.all.msg_grp_code.value=msg[0];
	  document.all.msg_grp_detail.value=msg[1];
      document.all.msg_grp.value=msg[2];              
      document.all.msg.value=msg[3];
  }
}        
           
/*********************************************   ��Ÿ Function   **********************************************************/

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

/*������������������������������������������������������������������������
  ��Check Box ���� : ��ü Click  Fnc
  ������������������������������������������������������������������������*/
function checkSelectedPlantAll(obj){
	
	var len = document.frm.selected_plant.length;
	if( obj.checked == true ){
		//alert(document.frm.selected_plant.length);		
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = true;
		}
	}
	else{
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = false;
		}
	}
	
};


function open_ERP_IF_Check_popup() {

	var cnfm_date = document.frm.selected_date.value;
			
	//var service_url = "service.do?_moon_service=sc_11020_dailyProductPlan_ERP_IF_Check_popup&_moon_perpage=200&_moon_pagenumber=1&cnfm_date="+cnfm_date;
	var service_url = "service.do?_moon_service=sc_11020_dailyProductPlan_ERP_IF_Check_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&cnfm_date=" + cnfm_date;
	 
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=730, height=400, top=200, left=200";
	var newWin = window.open(service_url, "sc_11020_dailyProductPlan_ERP_IF_Check_popup", pop_win_style); 
	newWin.focus();
};

