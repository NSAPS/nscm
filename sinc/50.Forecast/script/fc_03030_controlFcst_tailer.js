function moveDetail( row, col, data ) {		paintLineGraph(data.split("!%!")); }function displayPopupGraph() {	var data = document.frm.dataset.value;	paintLineGraph(data.split("!%!"));}function paintLineGraph(splitedData) {	var key = splitedData[0] + splitedData[1] + splitedData[2];	var title = splitedData[0] + ' / ' + splitedData[1] + ' / ' + splitedData[2];		var project = document.frm.project.value;		parent.document.frm.itemCode.value = splitedData[0].split('-')[0];	parent.document.frm.salesCode.value = splitedData[1].split('-')[0];	parent.document.frm.dcCode.value = splitedData[2].split('-')[0];	parent.document.frm.project.value = project;	parent.document.frm.title.value = title;		var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "250", "9", "#FFFFFF");                     so.addVariable("variables","true");    so.addVariable("title",title+",{font-size: 10;}");    so.addVariable("bg_colour","#FFFFFF");    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY��ǥ �� ��׶��� ����	so.addVariable("y_legend","Zionex,12,0x736AFF");    so.addVariable("y_ticks","5,10,4");		var datas = document.frm.dataset.value;	var rows = datas.split("/%/");								    var idSeq = 1;    var checkedCount = 0;    var maxValue = 0;        var linkString = "";	for(var i = 0; i < rows.length; i++) {				if (checkedCount == 2) { break;	}						var cols = rows[i].split("!%!");		var rowKey = cols[0] + cols[1] + cols[2];			if ( key == rowKey ) {						var valuesId = "";			var linksId = "";			if (idSeq == 1) {				    parent.document.frm.line1.value = cols[3];							so.addVariable("line_dot","2,#CC3399," + cols[3] + ",10,5");							valuesId = "values";				linksId = "links";							} else {					parent.document.frm.line2.value = cols[3];								so.addVariable("line_dot_" + idSeq, "2,#468024," + cols[3] + ",10,5");							valuesId = "values_" + idSeq;				linksId = "links_" + idSeq;			}									var dataCol = "";			var index = 0;			for(var j = 4; j < cols.length; j++) {				var colValue = Number(cols[j]);							if (maxValue < colValue) {					maxValue = colValue;				}											index = j - 4;				if ( j == 4 ) { 					dataCol = dataCol + cols[j];										linkString = "javascript:choicePointIndex("+String(index)+")";									} else {					dataCol = dataCol + ',' + cols[j];					linkString = linkString+ ',' +"javascript:choicePointIndex("+String(index)+")";				}			}						if (idSeq == 1) {				parent.document.frm.beforeFirstLine.value = dataCol;				parent.document.frm.firstLine.value = dataCol;								parent.document.frm.links.value = linkString;							idSeq ++;			} else {				parent.document.frm.secondLine.value = dataCol;			}									so.addVariable(valuesId,dataCol);			so.addVariable(linksId,linkString);								checkedCount++;		}		 	}		var headerCol = "";	var headers = document.frm.header.value;	var header = headers.split("!%!");	for(var k = 4; k < header.length; k++) {				if ( k == 4 ) {			headerCol = headerCol + header[k];		} else {			headerCol = headerCol + ',' + header[k];		}	}	parent.document.frm.headerCol.value = headerCol;	parent.document.frm.maxValue.value = maxValue;	parent.document.frm.fcstDate.value = '';	parent.document.frm.fcstQty.value = '';	parent.document.frm.index.value = '';	    so.addVariable("x_labels",headerCol);	so.addVariable("x_label_style","9,#000000,2"); 	so.addVariable("x_axis_steps","1");    so.addVariable("y_max",String(maxValue));    so.addParam("allowScriptAccess", "always" );//"sameDomain");     //  so.addParam("onmouseout", "onrollout();" );						     so.write(parent.document.getElementById('my_chart'));        var tab1Display = parent.document.getElementById('tabPage1').style.display;    var tab2Display = parent.document.getElementById('tabPage2').style.display;    if (tab1Display != 'none' || tab2Display != 'none') {    	parent.document.frm.tab11.value = tab1Display;    	parent.document.frm.tab22.value = tab2Display;     }            parent.document.getElementById('tabPage1').style.display = 'none';    parent.document.getElementById('tabPage2').style.display = 'none';       parent.document.getElementById('tabPage4').style.display = 'block';    parent.document.getElementById('tab1').style.display = 'none';    parent.document.getElementById('tab2').style.display = 'none';    parent.document.frm.btnApp.style.display = 'none';    }