	//var mode;													// WiseGrid 통신 시 전송 모드(search, save, ... etc)
	var class_path = "com.wisegrid.admin.";						// 서블릿 패키지(class 파일 경로)
	var job_id = 'rp_01160_replenishmentNiceLikePlan';				// job id(서블릿 명, WiseGrid Header key)
	var GridObj ; 												// WiseGrid 객체
	var GridObj2;
	
	var job_id = 'sc_12020_dailySemifinishedProductPlanAnalysis_psi';
	var headerCount=0;
    
  	var GridHeaderString = "";

/*┌──────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └──────────────────────────────────┘*/
   function init() {
   		GridObj = document.WiseGrid;
   		
       setProperty(GridObj);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
       setDefault();        //화면 기본 설정 
       setHeader(GridObj);  //해더생성 
   }
   
/*┌──────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └──────────────────────────────────┘*/
   function init2() {
       GridObj2 = document.WiseGrid2;
       setProperty(GridObj2); //WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
   }       
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
   function setDefault()
   {

		GridObj.strMouseWheelAction='page'; // page 단위 scroll ->기본은 'default'       
   
   }

       
/*┌──────────────────────────────────┐
  │해더생성
  │-.fnc:해더를 가져오는 결과값이 return되면 호출되는 Fnc명
  └──────────────────────────────────┘*/
   function setHeader(GridObj) 
   {        
       commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
       
   }

/*┌──────────────────────────────────┐
  │DB에 등록된 화면 해더 정보를 가져온다.
  └──────────────────────────────────┘*/
   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
           GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
       }
       
       commonUtil.getCodeList("", "" , "daily_header",headerResult); //날짜형 해더를 만들어 준다.
   }     
  
/*┌──────────────────────────────────┐
  │날짜 형태의 해더에 명을 생성한다.
  └──────────────────────────────────┘*/
   function headerResult(result)
   {
       var dateArray = ''; //날짜Row를 '!%!'기준으로 배열을 만들기 위한 변수.
       var dayCount  = 1;  //날짜 순위
       if(document.all.checked_weekly[0].checked) weekNo=1;
       if(document.all.checked_weekly[1].checked) weekNo=2;
       if(document.all.checked_weekly[2].checked) weekNo=3;
       
       headerCount=result.length;       
       
       for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
       {
            if( result[i].substr(0,1)==weekNo) //화면에 선택된 주차에 대한 것만 봅느다.
            {
                dateArray = '';
                dateArray = result[i].split('!%!'); //'!%!'로 구분된 데이터를 split하여 배열로 저장한다.
                
                //해더 그룹생성
                GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //날짜 그룹
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 

                GridObj2.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //날짜 그룹
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 

                dayCount++;
            } 
       }
       GridObj.BoundHeader()    
       GridObj2.BoundHeader()    

       GridObj.SetColHide("CRUD", true);
       GridObj.SetColHide("PLANT_ID", true);
       GridObj.SetColHide("LINE_ID", true);
       GridObj.SetColHide("PROD_VER", true);
       GridObj.SetColHide("SEQ", true);
       GridObj.SetColHide("WEEK_START_DATE", true);
       GridObj.SetColHide("VERSION", true);
       GridObj.SetColHide("PROC_ID", true);
       GridObj.SetColHide("BG01A", true);  GridObj.SetColHide("BG02A", true);  GridObj.SetColHide("BG03A", true);  GridObj.SetColHide("BG04A", true);  GridObj.SetColHide("BG05A", true);  GridObj.SetColHide("BG06A", true);  GridObj.SetColHide("BG07A", true);
       GridObj.SetColHide("BG01B", true);  GridObj.SetColHide("BG02B", true);  GridObj.SetColHide("BG03B", true);  GridObj.SetColHide("BG04B", true);  GridObj.SetColHide("BG05B", true);  GridObj.SetColHide("BG06B", true);  GridObj.SetColHide("BG07B", true);
       GridObj.SetColHide("BG01C", true);  GridObj.SetColHide("BG02C", true);  GridObj.SetColHide("BG03C", true);  GridObj.SetColHide("BG04C", true);  GridObj.SetColHide("BG05C", true);  GridObj.SetColHide("BG06C", true);  GridObj.SetColHide("BG07C", true);
       GridObj.SetColHide("BGCOLOR", true);
       GridObj.SetColFix('DIV_NAME');
       GridObj.SetColCellAlign('W3_DEMAND_QTY','right') ;
       
       GridObj2.SetColHide("CRUD", true);
       GridObj2.SetColHide("PLANT_ID", true);
       GridObj2.SetColHide("LINE_ID", true);
       GridObj2.SetColHide("LINE_NAME", true);
       GridObj2.SetColHide("PROD_VER", true);
       GridObj2.SetColHide("SEQ", true);
       GridObj2.SetColHide("WEEK_START_DATE", true);
       GridObj2.SetColHide("VERSION", true);
       GridObj2.SetColHide("PROC_ID", true);
       GridObj2.SetColHide("IDX", true);
       GridObj2.SetColHide("SEMI_ITEM_ID", true);
       GridObj2.SetColHide("ITEM_NAME", true);
       GridObj2.SetColHide("BG01A", true);  GridObj2.SetColHide("BG02A", true);  GridObj2.SetColHide("BG03A", true);  GridObj2.SetColHide("BG04A", true);  GridObj2.SetColHide("BG05A", true);  GridObj2.SetColHide("BG06A", true);  GridObj2.SetColHide("BG07A", true);
       GridObj2.SetColHide("BG01B", true);  GridObj2.SetColHide("BG02B", true);  GridObj2.SetColHide("BG03B", true);  GridObj2.SetColHide("BG04B", true);  GridObj2.SetColHide("BG05B", true);  GridObj2.SetColHide("BG06B", true);  GridObj2.SetColHide("BG07B", true);
       GridObj2.SetColHide("BG01C", true);  GridObj2.SetColHide("BG02C", true);  GridObj2.SetColHide("BG03C", true);  GridObj2.SetColHide("BG04C", true);  GridObj2.SetColHide("BG05C", true);  GridObj2.SetColHide("BG06C", true);  GridObj2.SetColHide("BG07C", true);
       GridObj2.SetColHide("BGCOLOR", true);
       GridObj2.SetColFix('IDX');

   }
  
  
  
               
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {                   
       doQuery();
   }
  
  
  
  
/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSave  (service)
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("선택된 공장이 없습니다!!");
           return;
       }

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
    
        //WiseGrid가 서버에 전송할 mode를 셋팅한다.
        GridObj.SetParam("mode", "save");
        GridObj.Setparam("plant_name",str);
        GridObj.SetParam("checked_weekly",weekNo);
        GridObj.SetParam("_user_id",document.all._user_id.value);
    
        //WiseGrid가 서버와 통신시에 데이터를 전달한
        GridObj.DoQuery(servlet_url, "CRUD");
   }
      
   
/*┌──────────────────────────────────┐
  │화면에 '계산'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function doCal()
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
        //WiseGrid가 서버에 전송할 mode를 셋팅한다.
        GridObj.SetParam("mode", "cal");
        GridObj.SetParam("_user_id",document.all._user_id.value);
    	
        //WiseGrid가 서버와 통신시에 데이터를 전달한
        GridObj.DoQuery(servlet_url, "CRUD");
   }   
   
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("선택된 공장이 없습니다!!");
           return;
       }
       
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
       
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.Setparam("plant_name",str);
       GridObj.SetParam("checked_weekly",weekNo);
       GridObj.SetParam("mode", "search");
       GridObj.DoQuery(servlet_url);
       
       commonUtil.getCodeList("", "" , "daily_header",changeHeader); //날짜형 해더를 만들어 준다.
       
       //GridObj.ClearGrid();
       //GridObj2.ClearGrid();
       
       //setHeader(GridObj);  //해더생성         
   }
   
/*┌──────────────────────────────────┐
  │해더를 변경하는 Fnc
  └──────────────────────────────────┘*/
   function changeHeader(result)
   {
       var dateArray = ''; //날짜Row를 '!%!'기준으로 배열을 만들기 위한 변수.
       var dayCount  = 1;  //날짜 순위
       if(document.all.checked_weekly[0].checked) weekNo=1;
       if(document.all.checked_weekly[1].checked) weekNo=2;
       if(document.all.checked_weekly[2].checked) weekNo=3;
       
       headerCount=result.length;       
       
       for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
       {
            if( result[i].substr(0,1)==weekNo) //화면에 선택된 주차에 대한 것만 봅느다.
            {
                dateArray = '';
                dateArray = result[i].split('!%!'); //'!%!'로 구분된 데이터를 split하여 배열로 저장한다.
                
                GridObj.SetGroupHDText("GRP_DATE"+dayCount ,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')') 
                GridObj2.SetGroupHDText("GRP_DATE"+dayCount ,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')') 
                dayCount++;
            } 
       }       
       
       
   }

/*┌──────────────────────────────────┐
  │두번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery2() 
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("선택된 공장이 없습니다!!");
           return;
       }   

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
       

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       GridObj2.Setparam("plant_name",str);
       GridObj2.SetParam("checked_weekly",weekNo);
       GridObj2.SetParam("mode", "search2");
       GridObj2.DoQuery(servlet_url);
   }

   
/*┌──────────────────────────────────┐
  │그리드의 데이터가 변경 되었을 경우 처리되는 Fnc
  └──────────────────────────────────┘*/
   function GridChangeCell(strColumnKey, nRow) 
   {
   }    
    
    
 
 
/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
    function GridEndQuery() 
    { 
        
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
        var rowLeng = GridObj.GetRowCount();
        
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //조회가 완료된 경우
        {
            if(GridObj.GetStatus() == "true") 
            {                           
                GridObj.SetGroupMerge("PLANT_NAME,LINE_NAME,SEMI_ITEM_ID,ITEM_NAME,W3_DEMAND_QTY");                                                    
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
            
            GridValueSetting(GridObj);
            
            if(document.all.colColor.checked) //그리드 색구분이 표기된 경우에만 출력한다.
                gridColSet(GridObj);
            
           doQuery2();

        }                                 

        if(mode == "save") //저장이 완료되면
        {
            doQuery() ;
        }
    }
 
/*┌──────────────────────────────────┐
  │두번째 그리드 데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
    function GridEndQuery2() 
    { 
        
        var mode = GridObj2.GetParam("mode");
        var error_msg = '';
        var rowLeng = GridObj2.GetRowCount();
        
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search2") //조회가 완료된 경우
        {
            if(GridObj2.GetStatus() == "true") 
            {                           
                GridObj2.SetGroupMerge("PLANT_NAME,LINE_NAME,SEMI_ITEM_ID");                                                    
            }

            GridValueSetting(GridObj2);
            if(document.all.colColor.checked) //그리드 색구분이 표기된 경우에만 출력한다.
            gridColSet(GridObj2);            
        }

    }
    
    
 /*┌──────────────────────────────────┐
   │그리드 컬럼 Set
   └──────────────────────────────────┘*/
    function gridColSet(obj)
    {
        var rowLeng = obj.GetRowCount();
        if( document.all.colColor.checked && rowLeng!=0)
        {
            var plant_id='';
            var line_id = '';
            var item_id ='';
            var colBGColor='255|255|255';
            var colItemBGColor = '255|255|255';
            var work_allocation= new Array();
            var shift_qty      = new Array();
            
            plant_id= obj.GetCellValue('PLANT_ID',0);
            line_id = obj.GetCellValue('LINE_ID',0);
            item_id = obj.GetCellValue('SEMI_ITEM_ID',0);
    
            for( var row=0 ; row<rowLeng ; row++ ) //row수만큼 반복
            {
                
                //아이템 별로 컬럼 배경색을 구분한다.
                colItemBGColor = obj.GetCellValue('BGCOLOR',row);
                obj.SetCellBgColor('ITEM_NAME', row, colItemBGColor) ;
                
                if(obj.GetCellValue('SEQ',row) != '2' ) //수정되는 Row가 아닌곳은 비활성화 한다.
                {
                    for( var col=1 ;col<=7 ;col++) //보정 불가한 컬럼을 구분한다.
                    {                                                                                        
                        obj.SetCellActivation("D0"+col+"A", row, 'activatenoedit');                             
                        obj.SetCellActivation("D0"+col+"B", row, 'activatenoedit'); 
                        obj.SetCellActivation("D0"+col+"C", row, 'activatenoedit'); 
                    }
                    //seq가 2아닐 경우 일때 BOX_QTY 보정 불가
                    obj.SetCellActivation("IDX", row, 'activatenoedit');  
					if(obj.GetCellValue('SEQ',row) == '1') {
						for( var col=1 ;col<=7 ;col++) //보정가능 컬럼은 글씨를 굴게한다.
                        {
                            obj.SetCellFontBold("D0"+col+"A", row, 'true');  
                            obj.SetCellFontBold("D0"+col+"B", row, 'true'); 
                            obj.SetCellFontBold("D0"+col+"C", row, 'true'); 
                        }
					}
					
                } else {
                    for( var col=1 ;col<=7 ;col++) //보정가능 컬럼은 글씨를 굴게한다.
                    {
                        obj.SetCellFontBold("D0"+col+"A", row, 'true');  
                        obj.SetCellFontBold("D0"+col+"B", row, 'true'); 
                        obj.SetCellFontBold("D0"+col+"C", row, 'true'); 
                    }
                    //seq가 2일 경우 BOX_QTY 보정 기능 표기(굴은색 글씨)
                    obj.SetCellFontBold(  "IDX", row, 'true');    
                }
                
                //Row 단위로컬럼배경색을 구분한다.
                if(plant_id != obj.GetCellValue('PLANT_ID',row) || line_id != obj.GetCellValue('LINE_ID',row) || item_id != obj.GetCellValue('SEMI_ITEM_ID',row))
                {
                    plant_id= obj.GetCellValue('PLANT_ID',row);
                    line_id = obj.GetCellValue('LINE_ID' ,row);
                    item_id = obj.GetCellValue('SEMI_ITEM_ID' ,row);
                    
                    if(colBGColor=='255|255|255') colBGColor='233|233|233';
                    else                          colBGColor='255|255|255';
                }
                
                obj.SetCellBgColor('DIV_NAME', row, colBGColor) ;
                obj.SetCellBgColor('IDX', row, colBGColor) ;
                obj.SetCellBgColor('W3_DEMAND_QTY', row, colBGColor) ;
                
                for( var col=1 ;col<=7 ;col++) 
                {
                	  //ROW구분 컬럼 배경색을 지정한다
                    
                    if(obj.GetCellValue('SEQ',row) == '2')
                    {
                        obj.SetCellBgColor('D0'+col+'A', row, '255|250|205') ;
                        obj.SetCellBgColor('D0'+col+'B', row, '255|250|205') ;
                        obj.SetCellBgColor('D0'+col+'C', row, '255|250|205') ;
                        
                    } else 
                    {
                        obj.SetCellBgColor('D0'+col+'A', row, colBGColor) ;
                        obj.SetCellBgColor('D0'+col+'B', row, colBGColor) ;
                        obj.SetCellBgColor('D0'+col+'C', row, colBGColor) ;
                    }

                    //누계가 양수이면 파란색, 음수이면 붉은색으로 표기한다.
                    if(obj.GetCellValue('SEQ',row)=='4') {
    					if(obj.GetCellValue('D0'+col+'A',row) <'0') {
							obj.SetCellFgColor('D0'+col+'A', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'A', row, '10|10|255');
						}
    					if(obj.GetCellValue('D0'+col+'B',row) <'0') {
							obj.SetCellFgColor('D0'+col+'B', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'B', row, '10|10|255');
						}
						if(obj.GetCellValue('D0'+col+'C',row) <'0') {
							obj.SetCellFgColor('D0'+col+'C', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'C', row, '10|10|255');
						}
					}					
					if(obj.GetCellValue('SEQ',row)=='1')	// 면생산 색깔
                    {
						obj.SetCellFgColor('D0'+col+'A', row, '0|222|0');                         
                        obj.SetCellFgColor('D0'+col+'B', row, '0|222|0');                         
                        obj.SetCellFgColor('D0'+col+'C', row, '0|222|0'); 
                    } 
                    else if(obj.GetCellValue('SEQ',row)=='3')	// 스프식수 색깔
                    {
                        obj.SetCellFgColor('D0'+col+'A', row, '174|174|174');                         
                        obj.SetCellFgColor('D0'+col+'B', row, '174|174|174');                         
                        obj.SetCellFgColor('D0'+col+'C', row, '174|174|174');                         
                    } 
					
                    //보정row이지만 근무조가 없는경우는 보정 불가능
                    //단, 근무조가없지만 수량이 있는 경우는 보정 가능하다.
                    work_allocation[0]=obj.GetCellValue('BG0'+col+'A' ,row);  //근무조정보를 가져온다.
                    work_allocation[1]=obj.GetCellValue('BG0'+col+'B' ,row);
                    work_allocation[2]=obj.GetCellValue('BG0'+col+'C' ,row);
                    
                    shift_qty[0]=obj.GetCellValue('D0'+col+'A' ,row);  //근무조에 대한 계획 수량을 가져온다.
                    shift_qty[1]=obj.GetCellValue('D0'+col+'B' ,row);
                    shift_qty[2]=obj.GetCellValue('D0'+col+'C' ,row);

                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[0]=='null' && shift_qty[0]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"A", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"A", row, 'false');   
                        obj.SetCellFgColor(   'D0'+col+'A', row, '174|174|174'); 
                    }
                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[1]=='null' && shift_qty[1]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"B", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"B", row, 'false');    
                        obj.SetCellFgColor(   'D0'+col+'B', row, '174|174|174'); 
                    }
                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[2]=='null' && shift_qty[2]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"C", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"C", row, 'false');    
                        obj.SetCellFgColor(   'D0'+col+'C', row, '174|174|174'); 
                    }

                    //아래 그리드 스프식수 진하게 표기.
                    if(obj==GridObj2 && GridObj2.GetCellValue('SEQ',row) == '3')
                    {
                        GridObj2.SetCellFontBold(  "D0"+col+"A", row, 'true');
                        GridObj2.SetCellFontBold(  "D0"+col+"B", row, 'true');
                        GridObj2.SetCellFontBold(  "D0"+col+"C", row, 'true');
                        
                        GridObj2.SetCellFgColor(   'D0'+col+'A', row, '0|0|0'); 
                        GridObj2.SetCellFgColor(   'D0'+col+'B', row, '0|0|0'); 
                        GridObj2.SetCellFgColor(   'D0'+col+'C', row, '0|0|0'); 
                    }

                    
                    //수량이 0인 Row는 배경색과 같은 폰트색으로 한다.
                    if(shift_qty[0]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'A', row, '255|250|205'); 
                    else if(shift_qty[0]=='0')
                        obj.SetCellFgColor(   'D0'+col+'A', row, colBGColor); 
                    
                    if(shift_qty[1]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'B', row, '255|250|205'); 
                    else if(shift_qty[1]=='0')
                        obj.SetCellFgColor(   'D0'+col+'B', row, colBGColor); 

                    if(shift_qty[2]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'C', row, '255|250|205'); 
                    else if(shift_qty[2]=='0')
                        obj.SetCellFgColor(   'D0'+col+'C', row, colBGColor); 
                    
                }
            }        
        }
    }
 
   
   function doInsert() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "insert");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   
   function doUpdata() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "update");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   
   function doDelete() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "delete");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   

   function chkSelected() {
       var GridObj = document.WiseGrid;
       chkCount = 0;
   
       for(i = 0; i < GridObj.GetRowCount(); i++) { //??? ???? ???? ????. 
   
           if(GridObj.GetCellValue("SELECTED", i) == "1") //??? ?? ?? ????. 
               chkCount = chkCount + 1;
       }
       
       if(chkCount == 0) {
           return false;    
       }
       return true;
   }
   

   function doLineInsert() {
       var GridObj = document.WiseGrid;
       
       //???? ??? ?? ? ??? ????. 
       GridObj.AddRow();
       
       //??? ? SELECTED? Active? ??? ???? ?? ???.
       GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");
   
       //ITEM_CODE ?? ??? ????? Active? ??? ???? ???? ????. 
       GridObj.SetCellImage('ITEM_CODE', GridObj.GetActiveRowIndex(), 0);
   
       //??? ?? ? ITEM_CODE? Active? ??? ???? ??? ???? ??.
       GridObj.SetCellActivation("ITEM_CODE", GridObj.GetActiveRowIndex(), "edit");
   }
   
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

   
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
   
  
/*┌──────────────────────────────────┐
  │그리드의 원 클릭 이벤트
  └──────────────────────────────────┘*/
   function GridCellClick(strColumnKey, nRow){     
      if(strColumnKey=='R02_COUNT')
      {
          //GridObj.GetCellValue('CD0'+strColumnKey.substr(2,2),nRow).split('_MSG_');
          doQuery2(GridObj.GetCellValue("REASON02" ,nRow));
          
      }
   }        
           


/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
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
        
        // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
        // ==> 화면이 더이상 축소되지 않음 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
        document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
            
    }     

/*┌──────────────────────────────────┐
  │Check Box 공장 : 전체 Click  Fnc
  └──────────────────────────────────┘*/
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


/*┌──────────────────────────────────┐
  │계획 생성 팝업
  └──────────────────────────────────┘*/
    function semi_plan_Create()
    {
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//   document.frm.weekCnt.value = weekCnt;
 
      var paramString = "";
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "sc_12020_dailySemifinishedProductPlanAnalysis_psi_pop";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=400, top=0, left=0";
	var newWin = window.open(service_url, fileName, pop_win_style); 
	newWin.focus();
    
         
         
    }




/*┌──────────────────────────────────┐
  │데이터의 Format을 정의 한다.
  └──────────────────────────────────┘*/    
    function GridValueSetting(obj)
    {
         obj.SetCRUDMode("CRUD", "추가", "수정", "삭제");
         
         obj.SetNumberFormat("IDX", "###,###,###"); // 숫자 형식

         obj.SetNumberFormat("D01A", "###,###,###"); // 숫자 형식
         obj.SetNumberFormat("D01B", "###,###,###");
         obj.SetNumberFormat("D01C", "###,###,###");
         obj.SetNumberFormat("D02A", "###,###,###");
         obj.SetNumberFormat("D02B", "###,###,###");
         obj.SetNumberFormat("D02C", "###,###,###");
         obj.SetNumberFormat("D03A", "###,###,###");
         obj.SetNumberFormat("D03B", "###,###,###");
         obj.SetNumberFormat("D03C", "###,###,###");
         obj.SetNumberFormat("D04A", "###,###,###");
         obj.SetNumberFormat("D04B", "###,###,###");
         obj.SetNumberFormat("D04C", "###,###,###");
         obj.SetNumberFormat("D05A", "###,###,###");
         obj.SetNumberFormat("D05B", "###,###,###");
         obj.SetNumberFormat("D05C", "###,###,###");
         obj.SetNumberFormat("D06A", "###,###,###");
         obj.SetNumberFormat("D06B", "###,###,###");
         obj.SetNumberFormat("D06C", "###,###,###");
         obj.SetNumberFormat("D07A", "###,###,###");
         obj.SetNumberFormat("D07B", "###,###,###");
         obj.SetNumberFormat("D07C", "###,###,###");            
    }
    

