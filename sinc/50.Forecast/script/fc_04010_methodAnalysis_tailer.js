function setLineData(data) {
	var rows = data.split('/%/');
	var categorys = rows[0];
	var xLabels = rows[1];
	var values = rows[2];
	var project = document.frm.project.value;
	var title = '수요예측 방법 분석 Chart';
	
	paintLine(project, title, categorys, values, xLabels);
}

function paintLine(project, title, categorys, values, xLabels) {	
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "250", "9", "#FFFFFF");                 
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 10;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend","Zionex,12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");
    
    var max = 0; 
    var colorArray = ['#FF0033', '#468024', '#0000FF', '#FF9900', '#996600', '#CC3399', '#66CCFF', '#FF3366', '#99FF00', '#999999']; 
    var catRows = categorys.split(',');
    var valRows = values.split('!%!');    
    for (var i = 0; i < catRows.length; i++) { 
    	if (i == 0) {
    		so.addVariable("line_dot","2,#FF0033," + catRows[i] + ",10,5");
    		so.addVariable("values", valRows[i]);
    	} else {
    		so.addVariable("line_dot_"+(i+1),"2," + colorArray[i] + "," + catRows[i] + ",10,5");
    		so.addVariable("values_"+(i+1), valRows[i]);
    	}   	
    	
    	var valCols = valRows[i].split(',');		
		for(var n = 0; n < valCols.length; n++) {
			max = max < Number(valCols[n]) ? Number(valCols[n]) : max;
		}
		
    }
  
    so.addVariable("x_labels",xLabels);
	so.addVariable("x_label_style","9,#000000,2");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(max));
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );
    so.write(parent.document.getElementById('my_chart'));    
}