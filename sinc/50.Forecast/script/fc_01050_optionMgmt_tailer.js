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
		document.getElementById("tr2").parentElement.rows[0].style.backgroundColor = trColor;
		document.frm.row_opt_cd.disabled = bool;
		document.frm.row_cd.disabled = bool;
		document.frm.is_able.disabled = bool;
		document.frm.usable_chk.disabled = bool;
		document.frm.std1.disabled = bool;
		document.frm.std2.disabled = bool;
		document.frm.std3.disabled = bool;
		document.frm.std4.disabled = bool;
		document.frm.std5.disabled = bool;
		document.frm.std6.disabled = bool;
		document.frm.std7.disabled = bool;
		document.frm.std8.disabled = bool;
		document.frm.std9.disabled = bool;
		document.frm.std10.disabled = bool;
		document.frm.std11.disabled = bool;
		document.frm.std12.disabled = bool;
		document.frm.std13.disabled = bool;
		document.frm.std14.disabled = bool;
		document.frm.std15.disabled = bool;

	} else {
		document.getElementById("tr1").parentElement.rows[obj.id].style.backgroundColor = trColor;
		document.getElementById("tr2").parentElement.rows[obj.id].style.backgroundColor = trColor;
		
		document.frm.row_opt_cd[obj.id].disabled = bool; 
		document.frm.row_cd[obj.id].disabled = bool; 
		document.frm.is_able[obj.id].disabled = bool;
		document.frm.usable_chk[obj.id].disabled = bool;
		document.frm.std1[obj.id].disabled = bool;
		document.frm.std2[obj.id].disabled = bool;
		document.frm.std3[obj.id].disabled = bool;
		document.frm.std4[obj.id].disabled = bool;
		document.frm.std5[obj.id].disabled = bool;
		document.frm.std6[obj.id].disabled = bool;
		document.frm.std7[obj.id].disabled = bool;
		document.frm.std8[obj.id].disabled = bool;
		document.frm.std9[obj.id].disabled = bool;
		document.frm.std10[obj.id].disabled = bool;
		document.frm.std11[obj.id].disabled = bool;
		document.frm.std12[obj.id].disabled = bool;
		document.frm.std13[obj.id].disabled = bool;
		document.frm.std14[obj.id].disabled = bool;
		document.frm.std15[obj.id].disabled = bool;	
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

function check(obj) {	
	if(obj.checked == true) {
		obj.value = 'Y';
	} else {
		obj.value = 'N';
	}	
	
}

function check(count, thisObj) {

	if(Number(count) <= 1) {
		if(thisObj.checked == true) {
			thisObj.value = 'Y';
			document.frm.usable_chk.value = 'Y';
		} else {
			thisObj.value = 'N';
			document.frm.usable_chk.value = 'N';
		}		
	} else {
		if(thisObj.checked == true) {
			thisObj.value = 'Y';
			document.frm.usable_chk[thisObj.id].value = 'Y';
		} else {
			thisObj.value = 'N';
			document.frm.usable_chk[thisObj.id].value = 'N';
		}	
	}
	
}