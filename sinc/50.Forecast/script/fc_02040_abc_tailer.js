function updateABC(obj1, cd) {
	var abc_value = obj1.value;
	var item_cd   = cd;
	var analy_target = parent.frm.analy_target.value;
	var paramKeys = 'abc_value!%!item_cd!%!analy_target';
	var paramCodes = abc_value+'!%!'+item_cd+'!%!'+analy_target;	
	
	nongshim.updateData(paramKeys, paramCodes, 'fc_02040_abc_update', "!%!", isConfirm);	
}

function isConfirm(data) {
	if (data == 'true') {
		alert('ABC 분류가 변경되었습니다.');
	}
}

function displayBarChart(item_grp_cd, analy_grp, analy_target) {
	var type = parent.document.frm.search_type.value;	
	if (type == 'NEW') {
		alert('현재, 데이터는 재분류 상태에 있습니다. \n저장을 하셔야만, 해당 데이터의 차트를 보실 수 있습니다.');
		return;
	}
	var paramKeys = 'item_grp_cd!%!analy_grp!%!analy_target';
	var paramCodes = item_grp_cd+'!%!'+analy_grp+'!%!'+analy_target;
	var columns = 'ITEM_DESC!%!SALESPERCENTAGE!%!CUMULATIVEPERCENTAGE';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_02040_abc_chart', columns, "!%!", "/%/", setBarData);
}

function setBarData(data) {
	var rows = data.split('/%/');
	var project = document.frm.project.value;	
	var title = 'ABC 분석';
	var category1 = '판매비율';
	var category2 = '누적 판매비율';
		
	var values1 = '';
	var values2 = '';
	var xLabels = '';		
		
	for(var i = 0; i < rows.length; i++) { 
		var cols = rows[i].split('!%!');
		
		if( i+1 == rows.length) {
			break;
		} 
				
		if ( i == 0 ) {
			xLabels = xLabels + cols[0];
			values1 = values1 + cols[1];
			values2 = values2 + cols[2];	
			
		} else {
			xLabels = xLabels + ',' + cols[0];
			values1 = values1 + ',' + cols[1];
			values2 = values2 + ',' + cols[2];			
		}
		
	}
	
	paintBar(project, title, category1, category2, values1, values2, xLabels);
}

function paintBar(project, title, category1, category2, values1, values2, xLabels) {	
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "250", "9", "#FFFFFF");                 
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 15;}");
    so.addVariable("bg_colour","#FFFFFF");                        //전체 백그라운드 색깔
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend","Zionex,12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");
    
	so.addVariable("bar_glass","50,0x3334AD,,"+category1+",10");	
	so.addVariable("area_hollow_2","3,4,25,#669900,"+category2+",10,#FFCCCC");
	//so.addVariable("line_dot_2","3,#CC3399,"+category2+",10,5"); 
	
	so.addVariable("values",values1);
	so.addVariable("values_2",values2);
	
	so.addVariable("x_labels",xLabels);
	so.addVariable("x_label_style","8,#000000,3");
	so.addVariable("x_axis_steps","1"); 
	so.addVariable("x_axis","1");
	so.addVariable("x_axis_colour","#909090","#ADB5C7");          //X좌표 수치 스틱 색깔
	so.addVariable("y_axis_colour","#909090","#ADB5C7");          //Y좌표 수치 스틱 색깔
    so.addVariable("y_max","100");                                //Y좌표 최대 수치     
   
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //so.addParam("onmouseout", "onrollout();" );
    so.write(parent.document.getElementById('my_chart'));
    
    parent.document.getElementById('chartArea').style.display = 'block';
    parent.document.getElementById('searchArea').style.display = 'none';    
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}