//Manage Item/Site Tab
function changeRowField(count, obj) {
	var bool = obj.checked;
	var className = null;
	var trColor = null;
	if (bool == true) {
		trColor = "#FFFFFF";
		bool = false;
		document.frm.isChecked.value = Number(document.frm.isChecked.value) + 1;
		
	} else {
		trColor = "#CCCCCC";
		bool = true;		
		document.frm.isChecked.value = Number(document.frm.isChecked.value) - 1;
	}

	if(Number(count) <= 1) {
		document.getElementById("tr1").parentElement.rows[0].style.backgroundColor = trColor;		
		document.frm.fcst_method_cd.disabled = bool;
		document.frm.fcst_method_no.disabled = bool;		
		document.frm.param_value.disabled = bool;
		document.frm.etc.disabled = bool; 

	} else { 
		document.getElementById("tr1").parentElement.rows[obj.id].style.backgroundColor = trColor;		
		document.frm.fcst_method_cd[obj.id].disabled = bool;
		document.frm.fcst_method_no[obj.id].disabled = bool;		
		document.frm.param_value[obj.id].disabled = bool;
		document.frm.etc[obj.id].disabled = bool;	
	}
}

function setCheckBoxValue(count, obj) {
	var target = document.frm.modifyCheckParam;	
	if(Number(count) <= 1) {
		setCheckValue(obj.checked, target);
	} else {
		setCheckValue(obj.checked, target[obj.id]);
	}
	return;
}

function setCheckValue(bool, obj) {
	if(bool == true) {
		obj.value = '1';
	} else {
		obj.value = '0';
	}
}