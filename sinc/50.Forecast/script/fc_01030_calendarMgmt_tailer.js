setCalendarFactor =  function(obj) {
	var is_holiday = '';	
	var fId = 'f'+obj.id;
	
	if (obj.style.color == 'black') {	
		if(!confirm("���Ϸ� ���� �Ͻðڽ��ϱ�?")){
			return;
		}
		
		obj.style.color = 'red';
		obj.style.background = '#FFF0F5';
		is_holiday = 'Y';
		document.getElementById(fId).style.color = 'red';		
		document.getElementById(fId).value = '0.0';
				
	} else {
		if(!confirm("���Ϸ� ���� �Ͻðڽ��ϱ�?")){
			return;
		}	
		
		obj.style.color = 'black';
		obj.style.background = '#FFFFCC';
		is_holiday = 'N';
		document.getElementById(fId).style.color = 'black';	
		document.getElementById(fId).value = '1.0';	
	}
	
	var factor = document.getElementById(fId).value;
	var selected_date = obj.value;
	
	updateCalendar(is_holiday, factor, selected_date);
}

setFactor = function(id, selected_date) {
	var is_holiday = '';	
	var factor = document.getElementById(id).value;	
	if(!confirm("�ش� ������ ������ ���� �Ͻðڽ��ϱ�?")){
		return;
	}	
	updateCalendar(is_holiday, factor, selected_date);
}

updateCalendar = function(is_holiday, factor, selected_date) {
	var paramKeys = 'is_holiday!%!factor!%!selected_date';
	var paramCodes = is_holiday+'!%!'+factor+'!%!'+selected_date;	
	
	nongshim.updateData(paramKeys, paramCodes, 'fc_01030_calendarMgmt_factor_update', "!%!", success);
}

success = function(data) {
	if (data == 'true') {
		alert('����Ǿ����ϴ�.');
	}
}

setColor = function(obj) {
	if (Number(obj.value) < 1) {
		obj.style.color = 'red';
	} else if (Number(obj.value) == 1) {
		obj.style.color = 'black';
	} else {
		obj.style.color = 'blue';
	}
}