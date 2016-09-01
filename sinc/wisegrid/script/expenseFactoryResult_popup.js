//############################################################
//## ���α׷�ID      : expenseFactoryResult_list.vm
//## ���α׷���      : ����� �����Ҵ��� ��ȸ UI ȭ��
//## ������          : �ڿ��
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



/*������������������������������������������������������������������������������������������
  ���� ��ư�� JOB_ID�� ����.
  ������������������������������������������������������������������������������������������*/    
    var job_id  = 'expenseFactoryResult_popup'; //�޴� �ְ� Ŭ���� JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    
    
    

/*������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻���. 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������������������������������������������������������������������*/
   function init() {
       setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
       setHeader(GridObj);  //�ش����� 
   }


/*������������������������������������������������������������������������
  ����ư Ŭ���� ���� �Լ� ȣ��
  ������������������������������������������������������������������������*/   
   function btn_div(btn){
   	//alert(btn+"��ưŬ��!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   	}
   	if(btn == "C"){
   		setHeader(GridObj);
   	}
   	if(btn == "D"){
   		setHeader(GridObj);
   	}
   	
   }


/*������������������������������������������������������������������������
  ����ư Ȱ��ȭ ��Ȱ��ȭ ����.
  ������������������������������������������������������������������������*/      
	function display(str){
	    var form = document.all;
	    if(str=="A"){
	        form.btn1.disabled  = true;
	        form.btn2.disabled  = false;
	        form.btn3.disabled  = false;
	        form.btn4.disabled  = false;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.btn3.disabled  = false;
             form.btn4.disabled  = false;
	    }
	    if(str=="C"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = true;
             form.btn4.disabled  = false;
	    }
	    if(str=="D"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = false;
             form.btn4.disabled  = true;
	    }
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
   
   function setHeader(GridObj) 
   {
   	
   		//�޴�Ŭ���� �⺻���� Ÿ�� ��.
   		if(B_Value == "Z"){
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//��ư�� Ŭ���� ���� ��� ���� ȣ��!   	
   	    if(B_Value == "A"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "C"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader);
   	    }   	    
   	    if(B_Value == "D"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader);
   	    }  
   }




/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
         //�ش� �׷����
//       GridObj.AddGroup("GR_REASON","����");  //��¥ �׷�
//       GridObj.AppendHeader("GR_REASON","R01_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_COUNT");
//       GridObj.AppendHeader("GR_REASON","R02_PERCENT");

	   //alert("GRidObj.....�ٿ�� ��!");
	   GridObj.BoundHeader();

         //Hidden �÷�
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }






             
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
  
  
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSave  (service)
   {
   }
      


/*������������������������������������������������������������������������
  ���׸����� �� ��Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
    function GridCellClick(strColumnKey, nRow){
		//alert(strColumnKey+''+nRow);
    }
    
    
/*������������������������������������������������������������������������
  ���׸����� �� ����Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
    function GridCellDblClick(strColumnKey, nRow){
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    	else if(B_Value == "C"){
    		//�׸����� �ش� �ο� ����Ŭ���� item_id �÷��� dcpath5 �÷��� �� ���� �Ķ���ͷ� �ѱ�.
    		//��, dcpath5 �÷��� ������ null�� ��쿡�� dcpath4 �÷��� ������ �Ķ���ͷ� �ѱ�.
    		
    		//alert("�� ����Ŭ��!!");
    		s_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("s_item_id : "+s_item_id);
    		
    		s_dcpath5_4 = GridObj.GetCellValue('dcpath5_cd',nRow);
    		//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		
    		if(s_dcpath5_4 == " "){
    			s_dcpath5_4 = GridObj.GetCellValue('dcpath4_cd',nRow);
    			//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		}
    		//alert("�� ����Ŭ�� ��!");
    		
    		//����Ŭ���� �Ķ���͸� ������ ȭ����ȯ�� �ϱ����� ������.
    		B_Value = "D";
    		display(B_Value);
			setHeader(GridObj);
    	}
    	else if(B_Value == "D"){
    		//�׸����� �ش� �ο� ����Ŭ���� item_id �÷��� tgt_loc �÷��� �� ���� �Ķ���ͷ� �ѱ�.
    		
    		//alert("D �� ����Ŭ��!!");
    		st_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("st_item_id : "+st_item_id);
    		
    		st_tgt_loc = GridObj.GetCellValue('tgt_loc',nRow);
    		//alert("st_tgt_loc : "+st_tgt_loc);
    		
    		popup(st_item_id, st_tgt_loc);
    	}

    	
    }  

   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   //�޴� Ŭ���� �⺻ ����
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //��ư�� ���� JOB ID ����.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2;
       }
       if(B_Value == "C"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id3;
       }
       if(B_Value == "D"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id4;
       }
       
       //var version = document.all.version.value;
       //var res_code = document.all.res_code.value;
       
       
       //�θ� �����ӿ��� �޾ƿ� �Ķ���͸� �˾�â���� ���.
       var p_st_item_id = opener.document.all.st_item_id.value;
       var p_st_tgt_loc = opener.document.all.st_tgt_loc.value;
       
       //alert("p_st_item_id : "+p_st_item_id);
       //alert("p_st_tgt_loc : "+p_st_tgt_loc);
       
       
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       //GridObj.SetParam("version", version);
       //GridObj.SetParam("res_code", res_code);
       
       GridObj.SetParam("s_item_id", s_item_id);
       GridObj.SetParam("s_dcpath5_4", s_dcpath5_4);
       
       //�θ� �����ӿ��� �޾ƿ� �Ķ���͸� �˾�â���� ���.
       GridObj.SetParam("p_st_item_id", p_st_item_id);
       GridObj.SetParam("p_st_tgt_loc", p_st_tgt_loc);              
              
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
   }

   
   

/*����������������������������������������������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ����������������������������������������������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {
            	//A��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "A"){
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('cat06','center')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('gubun','center')
	                GridObj.SetColCellAlign('anyang','right')
	                GridObj.SetColCellAlign('anseong','right')
	                GridObj.SetColCellAlign('anseong_u','right')
	                GridObj.SetColCellAlign('asan','right')
	                GridObj.SetColCellAlign('gumi','right')
	                GridObj.SetColCellAlign('busan','right')
	                GridObj.SetColCellAlign('noksan','right')
	                GridObj.SetColCellAlign('total','right')
            	}
            	//B��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "B"){
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("item_id,item_name");
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('plant_id','left')
	                GridObj.SetColCellAlign('plant_name','left')
	                GridObj.SetColCellAlign('real_fix_cost','right')
	                GridObj.SetColCellAlign('real_chg_cost','right')
	                GridObj.SetColCellAlign('qty_by_rate','right')
	                GridObj.SetColCellAlign('plant_ratio_by_rate','right')
	                GridObj.SetColCellAlign('qty_by_cost','right')
	                GridObj.SetColCellAlign('plant_ratio_by_cost','right')
	                GridObj.SetColCellAlign('item_qty_gap','center')
            	}
            	//C��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "C"){
            		//�����͸� �׷��� �Ѵ�.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('cat06','left')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('dcpath1','left')
	                GridObj.SetColCellAlign('dcpath2','left')
	                GridObj.SetColCellAlign('dcpath3','left')
	                GridObj.SetColCellAlign('dcpath4','left')
	                GridObj.SetColCellAlign('dcpath5','left')
	                GridObj.SetColCellAlign('qty','right')
	                GridObj.SetColCellAlign('box_amt','right')
	                GridObj.SetColCellAlign('total_amt','right')
	                GridObj.SetColCellAlign('dcpath4_cd','left')
	                GridObj.SetColCellAlign('dcpath5_cd','left')
	                
	                //�ο� ������ Ȱ��ȭ
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "D"){
            		
	                //���� ������ ����
	                GridObj.SetColCellAlign('dc_type','left')
	                GridObj.SetColCellAlign('rdc','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('res_id','left')
	                GridObj.SetColCellAlign('pre_dctype','left')
	                GridObj.SetColCellAlign('pre_dc','left')
	                GridObj.SetColCellAlign('qty','left')
	                GridObj.SetColCellAlign('src_loc','left')
	                GridObj.SetColCellAlign('src_loc_name','left')
	                GridObj.SetColCellAlign('tgt_loc','left')
	                GridObj.SetColCellAlign('tgt_loc_name','left')
	                GridObj.SetColCellAlign('cost_amt','right')
	                GridObj.SetColCellAlign('box_per_palet','right')            		
            	}
            	
            	//�޴� Ŭ���� �⺻ ����. �˾�â �⺻ ��� ����!
            	if(B_Value == "Z"){
                //�����͸� �׷��� �Ѵ�.
                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //���� ������ ����
                GridObj.SetColCellAlign('item_id','left')
                GridObj.SetColCellAlign('item_name','left')
                GridObj.SetColCellAlign('spec','left')
                GridObj.SetColCellAlign('src_loc','left')
                GridObj.SetColCellAlign('tgt_loc','left')
                GridObj.SetColCellAlign('src_loc_name','left')
                GridObj.SetColCellAlign('tgt_loc_name','left')
                GridObj.SetColCellAlign('cost','right')
                GridObj.SetColCellAlign('trans_cost','right')
                GridObj.SetColCellAlign('real_cost','right')
                
                //GridObj.SetNumberFormat("late_day", "#,##0.00");
				GridObj.SetNumberFormat("cost", "#,###");// # �̸� ���� null�̸� ����� �ȵ�, 0 �̸� ���� null�̾ ���!
 				GridObj.SetNumberFormat("trans_cost", "#,###");// # �̸� ���� null�̸� ����� �ȵ�, 0 �̸� ���� null�̾ ���!
 				GridObj.SetNumberFormat("real_cost", "#,###");// # �̸� ���� null�̸� ����� �ȵ�, 0 �̸� ���� null�̾ ���!
                
            	}                                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    
/*������������������������������������������������������������������������
  ����ȸ ��ư Ŭ���� ����.
  ������������������������������������������������������������������������*/
GoSearch = function() {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	//alert("hllo");
	doQuery();
};



   
/*������������������������������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������������������������������*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
/*������������������������������������������������������������������������
  ��EXCEL
  ������������������������������������������������������������������������*/
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

/*������������������������������������������������������������������������
  ��getdatetime
  ������������������������������������������������������������������������*/
   function getdatetime() {
       var today = new Date();
       var year = today.getYear();
       var month = today.getMonth() + 1;
       var day = today.getDate();
       
       if(month < 10)
           month = "0" + month;
           
       if(day < 10)
           day = "0" + day;
   
       document.frm.to_date.value = year + "" + month + "" + day;
   }
   

  
  


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
        
        /*
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        }
        */ 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
        
    }  
           


/*������������������������������������������������������������������������
  ��MOUSE OVER ��, ROW ���� ��ȯ
  ������������������������������������������������������������������������*/
function GridMouseOver(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '230|230|230');
	}

	 
}

/*������������������������������������������������������������������������
  ��MOUSE OUT ��, ROW ���� ����
  ������������������������������������������������������������������������*/
function GridMouseOut(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){	
	
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '255|255|255');		
		
	}
}




/*������������������������������������������������������������������������
  ���˾� �ٿ�� �ϱ�!!
  ������������������������������������������������������������������������*/
function popup(str1, str2){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//    document.frm.weekCnt.value = weekCnt;

	alert("str1 : "+str1);
	alert("str2 : "+str2);
 
    var paramString  = "";
        paramString  = "&st_item_id=" + str1;
        paramString += "&st_tgt_loc=" + str2;
        
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "expenseFactoryResult_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=400, top=0, left=0";
	var newWin = window.open(service_url, "expenseFactoryResult_popup", pop_win_style);
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}

























// ��ǰ �˻� POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//�۾�����		
	var	in_date_term = "3"; 					//��ȸ�Ⱓ	
	var	in_term_cnt	 = "0"; 												//��ȸ����	

	if( in_work_date == "" || in_work_date == null ) {
		alert("�۾����ڸ� �Է��Ͻʽÿ�!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term+"&in_term_cnt=" + in_term_cnt;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();

}

// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.in_alloc_item_name.value = arrList[0][1];
				document.frm.item_name.value = arrList[0][1];
				document.frm.in_alloc_reason_comment.value = "";
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
}

// enter check �� 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// �ڱ�ȭ�� ����
	//		GoSearch();
		}
	} 
}





// ��ȸ
/*
GoEdit = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_alloc_item_name = document.frm.in_alloc_item_name.value;

	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_mod";
	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&item_name=" + in_alloc_item_name;

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	location.href = urlStr;
	
};
*/

// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
		}
	}
	
}



