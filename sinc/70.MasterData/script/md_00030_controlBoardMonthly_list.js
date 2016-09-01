
/** �������� : ARRAY INDEX �� ����, ARRAY ������ DISPLAY ����
	======================================
	0.  ���ʴ� NULL
	======================================
	1.  �������̽� ����
	2.  �������̽� ������
	3.  �������̽� ����
	4.  �������̽� �Ϸ�
	======================================
	5.  ��ȹ���� ����
	------------------------------
	6.  ��ȹ���� �ε� ����
	7.  ��ȹ���� �ε���
	8.  ��ȹ���� �ε� ����
	9.  ��ȹ���� �ε� �Ϸ�
	------------------------------
	10. �����ٸ� ����(���� ���� ����)
	11. ��ȹ���� ������
	12. ��ȹ���� ����
	13. �����ٸ� �Ϸ�
	------------------------------
	14. ��ȹ��� ���� ����
	15. ��ȹ��� ���� ������
	16. ��ȹ��� ���� ����
	17. ��ȹ��� ���� �Ϸ�
	------------------------------
	18. ��ȹ��� ������ ����
	19. ��ȹ��� ������ ������
	20. ��ȹ��� ������ ����
	21. ��ȹ��� ������ �Ϸ�
	------------------------------
	22. ��ȹ���� �Ϸ�
	======================================
	23. ��ȹȮ��
	======================================
	24. ERP ���� ����
	25. ERP ���� ������
	26. ERP ���� ����
	27. ERP ���� �Ϸ�
	======================================
*/
var statusComplete 	= 23; // �Ϸ� ����
var arrStatus 		= new Array(15);
arrStatus = [
	/* ====================================== */
	/* 0. */  ""
	/* ====================================== */
	/* 1. */, "�������̽� ����"
	/* 2. */, "�������̽� ������"
	/* 3. */, "�������̽� ����"
	/* 4. */, "�������̽� �Ϸ�"
	/* ====================================== */
	/* 5. */, "��ȹ���� ����"
	/* 6. */, "��ȹ���� �ε� ����"
	/* 7. */, "��ȹ���� �ε���"
	/* 8. */, "��ȹ���� �ε� ����"
	/* 9. */, "��ȹ���� �ε� �Ϸ�"
	/* ------------------------------ */
	/* 10.*/, "�����ٸ� ����"
	/* 11.*/, "��ȹ���� ������"
	/* 12.*/, "��ȹ���� ����"
	/* 13.*/, "�����ٸ� �Ϸ�"
	/* ------------------------------ */
	/* 14.*/, "��ȹ��� ���� ����"
	/* 15.*/, "��ȹ��� ���� ������"
	/* 16.*/, "��ȹ��� ���� ����"
	/* 17.*/, "��ȹ��� ���� �Ϸ�"
	/* ------------------------------ */
	/* 18.*/, "��ȹ��� ������ ����"
	/* 19.*/, "��ȹ��� ������ ������"
	/* 20.*/, "��ȹ��� ������ ����"
	/* 21.*/, "��ȹ��� ������ �Ϸ�"
	/* ------------------------------ */
	/* 22.*/, "��ȹ���� �Ϸ�"
	/* ====================================== */
	/* 23.*/, "��ȹȮ��"
	/* ====================================== */
	/* 24.*/, "ERP ���� ����"
	/* 25.*/, "ERP ���� ������"
	/* 26.*/, "ERP ���� ����"
	/* 27.*/, "ERP ���� �Ϸ�"
	/* ====================================== */
]

// RADIO ��ư Ŭ��
function checkPlan(objRadio) {
	
	// ���� ��ư�� üũ�� ��츸 ����
	if( objRadio.checked == false ) {
		return;
	}
	
	var rowIdx = objRadio.parentNode.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	
	if( rowIdx == 0 ) {
		// �ǸŰ�ȹ ����
		document.frm.radioVal[rowIdx].value = "1";
	}
	else {
		// PLAN_VERSION_LOG �� ���� �����ʹ� ���� ����
		
		// plan_step ������ �Ǵ� : �������� ������ PLAN_VERSION_LOG �� ������ ����
		if( document.frm.cat_id[rowIdx] ) {
			var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
			var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
			var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
			var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
			var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
			var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
			var user_id 	= document.frm._user_id.value;
			var objPlanStep = document.frm.plan_step[rowIdx];
		} else {
			var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
			var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
			var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
			var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
			var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
			var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
			var user_id 	= document.frm._user_id.value;
			var objPlanStep = document.frm.plan_step;
		}
		
		if( plan_step == "" || plan_step == null ) {
			controlBoard.createPlanRec(period_type, run_date, run_seq, plan_step, cat_id, sub_cat, user_id, { 
				callback:function(result){
					// ���ο� ��ȹ ���ڵ� ���� ����
					if( result == "SUCCESS" ) {
						// ������ plan_step �� ��������
						controlBoard.getMaxPlanStep(period_type, run_date, run_seq, {
							callback:function(result){
								// �� ã�ƿ��� ����
								if( result == null || result == "" ) {
									objRadio.checked = false;
									setDisable();
									return false;
								}
								// �� ã�ƿ��� ����
								else {
									objPlanStep.value = result.trim();
								}
							}
						});
					}
					// ���ÿ� �ٸ� ����ڰ� �ٸ� ȭ�鿡�� ���� �����͸� ������ ��� ȭ�� �ٽ� �б�
					else if( result == "REFRESH" ) {
						GoSearch(document.frm._moon_service.value);
					}
					// ���ο� ��ȹ ���ڵ� ���� ����
					else {
						objRadio.checked = false;
						setDisable();
						return false;
					}
					setLineStatus(rowIdx); // ���� ���� ����
				}
			});
		}
		
		// ���� ��ȹ�ܰ谡 �Ϸ�� ��츸 ���� ����
		/*
		// ���� ��ȹ�ܰ��� ����~�� rowIdx ã��
		var i = rowIdx-1;
		var curCatId = document.frm.cat_id[rowIdx].value;
		var preCatId = document.frm.cat_id[rowIdx-1].value;
		var startIdx = rowIdx-1;
		var endIdx = rowIdx-1;
		while( i >= 0 ) {
			if( curCatId == document.frm.cat_id[i].value ) {
				--i;
				startIdx = i;
				endIdx = i;
			}
			else if( preCatId == document.frm.cat_id[i].value ) {
				startIdx = i;
				--i;
			}
			else {
				i = -1;
			}
		}
		
		// ���� ��ȹ�ܰ��� �� ���庰 ��� ��ȹ�� Ȯ�� �������� üũ
		var condition = true;
		var j = startIdx;
		while( condition && j <= endIdx ) {
			if( Number(document.frm.status[j].value) >= statusComplete ) {
				condition = true;
			}
			else {
				if( j+1 > endIdx ) {
					condition = false;
				}
				else if( j+1 <= endIdx && document.frm.plant_id[j].value != document.frm.plant_id[j+1].value ) {
					condition = false;
				}
				else if( j+1 <= endIdx && document.frm.plant_id[j].value == document.frm.plant_id[j+1].value ) {
					condition = true;
				}
			}
			j++;
		}
		
		// ���� ��ȹ�ܰ��� �� ���庰 ��� ��ȹ�� Ȯ�� �����̸�, ���డ��
		if( condition ) {
			// ���� ������ ���� �̿��� ��� ������ ��Ȱ�� ���·� ǥ���ϱ� ���� üũ ������ ����
			for( var k = 0 ; k < tabLen ; k++ ) {
				if( k == rowIdx ) {
					document.frm.radioVal[k].value = "1";
				}
				else {
					document.frm.radioVal[k].value = "0";
				}
			}
		}
		else {
			objRadio.checked = false;
			// ���� üũ�Ǿ� �ִ� radio ��ư�� ã�� üũ ���·� ǥ��
			checkPre();
		}
		*/
	}
	
	// ���� ������ ���� �̿��� ��� ������ ��Ȱ�� ���·� ǥ��
	setDisable();
	
}

// ���� üũ�Ǿ� �ִ� radio ��ư�� ã�� üũ ���·� ǥ��
function checkPre() {
	
	var tabLen = left_tbody.rows.length;
	for( var i = 0; i < tabLen; i++ ) {
		if( document.frm.radioVal[i].value == "1" ) {
			document.frm.selPlan[i].checked = true;
		}
	}
	
}

// ��Ȱ�� ǥ��
function setDisable() {
	
	var tabLen = left_tbody.rows.length;
	var status = null;
	//alert(tabLen);return;
	for( var i = 0; i < tabLen; i++ ) {
		// staus == "" �̸� 0
		if( document.frm.status[i].value == null || document.frm.status[i].value == "" ) {
			status = 0;
		}
		else {
			status = Number(document.frm.status[i].value);
		}
		
		// ��Ȱ�� ���
		if( document.frm.selPlan[i].checked == false ) {
			left_tr[i].childNodes(1).style.color = "darkgray";
			left_tr[i].childNodes(2).style.color = "darkgray";
			main_tr[i].childNodes(0).style.color = "darkgray";
			main_tr[i].childNodes(1).style.color = "darkgray";
			//left_tbody[i].childNodes(0).childNodes(1).style.color = "darkgray";
			//left_tbody[i].childNodes(0).childNodes(2).style.color = "darkgray";
			//main_tbody[i].childNodes(0).childNodes(0).style.color = "darkgray";
			//main_tbody[i].childNodes(0).childNodes(1).style.color = "darkgray";
			document.frm.btnBasic[i].disabled = true;
			document.frm.btnIF[i].disabled = true;
			document.frm.btnViewIF[i].disabled = true;
			document.frm.btnPlan[i].disabled = true;
			document.frm.btnViewPlan[i].disabled = true;
			document.frm.btnConfirm[i].disabled = true;
			document.frm.btnCancel[i].disabled = true;
			document.frm.btnAdd[i].disabled = true;
			document.frm.btnToErp[i].disabled = true;
			document.frm.btnViewToErp[i].disabled = true;
		}
		// Ȱ�� ���
		else {
			left_tr[i].childNodes(1).style.color = "#000000";
			left_tr[i].childNodes(2).style.color = "#000000";
			main_tr[i].childNodes(0).style.color = "#000000";
			main_tr[i].childNodes(1).style.color = "#000000";
			
			// �������� Ȯ���� �׻� Ȱ��
			document.frm.btnBasic[i].disabled = false;
			
			// �ǸŰ�ȹ(SP)�� ��� �������� Ȯ�θ� Ȱ��ȭ
			if( document.frm.cat_id[i].value != "SP" ) {
				// IF ���� ���� : 0 3 4 8 12 16 20 22
				if( status == 0 || status == 3 || status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnIF[i].disabled = false;
				} else {
					document.frm.btnIF[i].disabled = true;
				}
				
				// IF ���� ���� : 3~27
				if( status >= 3 && status <= 27 ) {
					document.frm.btnViewIF[i].disabled = false;
				} else {
					document.frm.btnViewIF[i].disabled = true;
				}
				
				// ��ȹ���� ���� ���� : 4 8 12 16 20 22
				if( status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnPlan[i].disabled = false;
				} else {
					document.frm.btnPlan[i].disabled = true;
				}
				
				// ��ȹ���� ���� ���� : 8 12 16 20 22~27
				if( status == 8 || status == 12 || status == 16 || status == 20 || (status >= 22 && status <= 27) ) {
					document.frm.btnViewPlan[i].disabled = false;
				} else {
					document.frm.btnViewPlan[i].disabled = true;
				}
				
				// Ȯ�� ���� : 22
				if( status == 22 ) {
					document.frm.btnConfirm[i].disabled = false;
				} else {
					document.frm.btnConfirm[i].disabled = true;
				}
				
				// ��� ���� : 8 12 16 20 22
				if( status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnCancel[i].disabled = false;
				} else {
					document.frm.btnCancel[i].disabled = true;
				}
				
				// �߰� ���� : 22 23 26 27
				if( status == 22 || status == 23 || status == 26 || status == 27 ) {
					document.frm.btnAdd[i].disabled = false;
				} else {
					document.frm.btnAdd[i].disabled = true;
				}
				
				// ERP ���� ���� : 23 26
				if( status == 23 || status == 26 ) {
					document.frm.btnToErp[i].disabled = false;
				} else {
					document.frm.btnToErp[i].disabled = true;
				}
				
				// ERP ���� ���� : 26 27
				if( status == 26 || status == 27 ) {
					document.frm.btnViewToErp[i].disabled = false;
				} else {
					document.frm.btnViewToErp[i].disabled = true;
				}
			} // end if �ǸŰ�ȹ ����
		} // end else Ȱ�� ���
	} // end for
	
}

// ���� ���� ����
function setLineStatus(rowIdx) {
	
	var status = document.frm.status[rowIdx].value;
	
	// IF ���� ���� : 0 3 4 8 12 16 20 22
	if( status == 0 || status == 3 || status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnIF[rowIdx].disabled = false;
	} else {
		document.frm.btnIF[rowIdx].disabled = true;
	}
	
	// IF ���� ���� : 3~27
	if( status >= 3 && status <= 27 ) {
		document.frm.btnViewIF[rowIdx].disabled = false;
	} else {
		document.frm.btnViewIF[rowIdx].disabled = true;
	}
	
	// ��ȹ���� ���� ���� : 4 8 12 16 20 22 
	if( status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnPlan[rowIdx].disabled = false;
	} else {
		document.frm.btnPlan[rowIdx].disabled = true;
	}
	
	// ��ȹ���� ���� ���� : 8 12 16 20 22~27
	if( status == 8 || status == 12 || status == 16 || status == 20 || (status >= 22 && status <= 27) ) {
		document.frm.btnViewPlan[rowIdx].disabled = false;
	} else {
		document.frm.btnViewPlan[rowIdx].disabled = true;
	}
	
	// Ȯ�� ���� : 22
	if( status == 22 ) {
		document.frm.btnConfirm[rowIdx].disabled = false;
	} else {
		document.frm.btnConfirm[rowIdx].disabled = true;
	}
	
	// ��� ���� : 8 12 16 20 22
	if( status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnCancel[rowIdx].disabled = false;
	} else {
		document.frm.btnCancel[rowIdx].disabled = true;
	}
	
	// �߰� ���� : 22 23 26 27
	if( status == 22 || status == 23 || status == 26 || status == 27 ) {
		document.frm.btnAdd[rowIdx].disabled = false;
	} else {
		document.frm.btnAdd[rowIdx].disabled = true;
	}
	
	// ERP ���� ���� : 23 26
	if( status == 23 || status == 26 ) {
		document.frm.btnToErp[rowIdx].disabled = false;
	} else {
		document.frm.btnToErp[rowIdx].disabled = true;
	}
	
	// ERP ���� ���� : 26 27
	if( status == 26 || status == 27 ) {
		document.frm.btnViewToErp[rowIdx].disabled = false;
	} else {
		document.frm.btnViewToErp[rowIdx].disabled = true;
	}
	
}

// �������� ���� ��ư Ŭ��
function viewBasic( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // Ŭ���� ��ư�� ���� �ε���
	var cat_id = document.frm.cat_id[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ����
	
	// CODE_MST �� �� ��ȹ�ι��� ���������� Ȯ���� ȭ����� 'DP_' + CAT_ID + '_MD' �� �ڵ�׷����� ����
	cat_id = "MP_" + cat_id + "_MD"; // MP : MONTHLY PLAN, MD : MASTER DATA
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_masterData_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&rowIdx=" + rowIdx; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=300, height=200, top=0, left=0";
	var newWin = window.open(service_url, "MD_POP", pop_win_style); // master data pop
	newWin.focus();
	
}

var execIFWin = null;
// I/F ���� ��ư Ŭ��
function execIF( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_execIf_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step
	service_url += "&plant_id=" + plant_id + "&batOption=" + batOption;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=500, height=400, top=0, left=0";
	execIFWin = window.open(service_url, "IF_POP", pop_win_style);
	execIFWin.focus();
	
}

var viewIFWin = null;
// I/F ���� ��ư Ŭ��
function viewIF( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_viewIf_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step;
	service_url += "&plant_id=" + plant_id;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=600, height=400, top=0, left=0";
	viewIFWin = window.open(service_url, "VIEW_IF", pop_win_style);
	viewIFWin.focus();
	
}

var execPlanWin = null;
// ��ȹ���� ���� ��ư Ŭ��
function execPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_execPlan_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step;
	service_url += "&plant_id=" + plant_id + "&batOption=" + batOption;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=400, height=300, top=0, left=0";
	execPlanWin = window.open(service_url, "PLAN_POP", pop_win_style);
	execPlanWin.focus();
	
}

var viewPlanWin = null;
// ��ȹ���� ���� ��ư Ŭ��
function viewPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_viewPlan_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step;
	service_url += "&plant_id=" + plant_id;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=600, height=400, top=0, left=0";
	viewPlanWin = window.open(service_url, "VIEW_PLAN", pop_win_style);
	viewPlanWin.focus();
	
}

// Ȯ�� ��ư Ŭ��
function confirmPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	var versions 	= document.frm.versions[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ ��ȹ����
	var user_id 	= document.frm._user_id.value;
	
	// �ϰ� ��ȹ ������ ���, confirm skip
	if( batOption != 2 ) {
		// ��ȹ Ȯ��
		if( !confirm(cat_id + "�� " + versions + " ������ Ȯ���մϴ�!!\n\nȮ���� ��ȹ�� ����� �� �����ϴ�!!") ) {
			return;
		}
	}
	
	// PLAN_VERSION_LOG ���� ������Ʈ(23) : ��ȹȮ��
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '23', user_id, { 
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				setStatus(rowIdx);
				setLineStatus(rowIdx); // ���� ���� ����
				// �ϰ� ��ȹ ������ ��� Ȯ�� ��, ERP ���� ����
				/*
				if( batOption == 2 ) {
					execIFErp(document.frm.btnToErp[rowIdx]);
				}
				*/
			}
			// ����
			else {
				setStatus(rowIdx);
				setLineStatus(rowIdx); // ���� ���� ����
			}
		}
	});
	
}

// ��� ��ư Ŭ��
function cancelPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ����
	var versions 	= document.frm.versions[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ ��ȹ����
	
	alert(cat_id + "�� " + versions + " ������ ����մϴ�!!");
	// ��������
	document.frm.versions[rowIdx].value = "";
	areaVer[rowIdx].innerHTML = "";
	// I/F �Ϸ� ���·� ����
	document.frm.status[rowIdx].value = 4;
	areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
	
	setLineStatus(rowIdx); // ���� ���� ����
	
}

// �߰� ��ư Ŭ��
function addPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var cat_seq 	= document.frm.cat_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�����
	var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	var versions 	= document.frm.versions[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ ��ȹ����
	var version 	= document.frm.version[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ ��ȹ ����
	var seq 		= document.frm.seq[rowIdx].value; 			// Ŭ���� ��ư�� ������ ������ ��ȹ SEQ
	var user_id 	= document.frm._user_id.value;
	
	// ���� sub_cat �� ���� plan_step �� �� ���� ��ȹ�� �ִ� �� Ȯ���Ͽ� �߰��� �Ұ��ϰ� ��
	var tabLen = left_tbody.rows.length;
	if( rowIdx + 1 < tabLen ) {
		var next_cat_id = document.frm.cat_id[rowIdx + 1].value;
		var next_sub_cat = document.frm.sub_cat[rowIdx + 1].value;
		if( cat_id == next_cat_id && sub_cat == next_sub_cat ) {
			alert("���� ��ȹ�ι��� ���� �� ���� ������ ��ȹ�� �����Ǿ� �����Ƿ� ���⼭ ���ο� ��ȹ�� �߰��� �� �����ϴ�.");
			return;
		}
	}
	
	var oRowLeft = left_tbody.insertRow(rowIdx+1);
	var oRowMain = main_tbody.insertRow(rowIdx+1);
	
	oRowLeft.id = "left_tr";
	oRowMain.id = "main_tr";
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0  = oRowLeft.insertCell(); // ����
	var oCell1  = oRowLeft.insertCell(); // ��ȹ�ι�
	var oCell2  = oRowLeft.insertCell(); // ����
	
	var oCell3  = oRowMain.insertCell(); // ����
	var oCell4  = oRowMain.insertCell(); // ����
	var oCell5  = oRowMain.insertCell(); // ��������
	var oCell6  = oRowMain.insertCell(); // I/F
	var oCell7  = oRowMain.insertCell(); // ��ȹ����
	var oCell8  = oRowMain.insertCell(); // Ȯ��
	var oCell9  = oRowMain.insertCell(); // ERP ����
	var oCell10 = oRowMain.insertCell(); // �ϰ�
	
	oCell0.align  = "center"; oCell0.width  = "30px" ; // ����
	oCell1.align  = "center"; oCell1.width  = "140px"; // ��ȹ�ι�
	oCell2.align  = "center"; oCell2.width  = "80px" ; // ����
	
	oCell3.align  = "center"; oCell3.width  = "120px"; // ����
	oCell4.align  = "center"; oCell4.width  = "150px"; // ����
	oCell5.align  = "center"; oCell5.width  = "50px" ; // ��������
	oCell6.align  = "center"; oCell6.width  = "90px" ; // I/F
	oCell7.align  = "center"; oCell7.width  = "90px" ; // ��ȹ����
	oCell8.align  = "center"; oCell8.width  = "120px"; // Ȯ��
	oCell9.align  = "center"; oCell9.width  = "90px" ; // ERP ����
	oCell10.align = "center"; oCell10.width = "90px" ; oCell10.className = "right"; // �ϰ�
	
	// ����
	oCell0.innerHTML = "<input type=\"radio\" name=\"selPlan\" onClick=\"checkPlan(this); \"> "
						+ "<input type=\"hidden\" name=\"radioVal\"> "
						+ "<input type=\"hidden\" name=\"period_type\" value=\"" + period_type + "\"> "
						+ "<input type=\"hidden\" name=\"run_date\" value=\"" + run_date + "\"> "
						+ "<input type=\"hidden\" name=\"run_seq\" value=\"" + run_seq + "\"> "
						+ "<input type=\"hidden\" name=\"plan_step\" > "
						+ "<input type=\"hidden\" name=\"cat_seq\" value=\"" + cat_seq + "\"> "
						+ "<input type=\"hidden\" name=\"sub_cat\" value=\"" + sub_cat + "\"> ";
	// ��ȹ�ι�
	oCell1.innerHTML = " <input type=\"hidden\" name=\"cat_id\" value=\"" + cat_id + "\"> ";
	// ����
	oCell2.innerHTML = " <input type=\"hidden\" name=\"plant_id\" value=\"" + plant_id + "\"> ";
	// ����
	oCell3.innerHTML = "<a id=\"areaVer\"> - </a> "
						+ "<input type=\"hidden\" name=\"versions\"> "
						+ "<input type=\"hidden\" name=\"version\"> "
						+ "<input type=\"hidden\" name=\"seq\"> ";
	// ����
	oCell4.innerHTML = "<a id=\"areaStat\"></a> "
						+ "<input type=\"hidden\" name=\"status\"> "
	// ��������
	oCell5.innerHTML = "<input name=\"btnBasic\" type=\"button\" value=\"Ȯ��\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewBasic(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// I/F
	oCell6.innerHTML = "<input name=\"btnIF\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execIF(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewIF\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewIF(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// ��ȹ����
	oCell7.innerHTML = "<input name=\"btnPlan\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewPlan\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// Ȯ��
	oCell8.innerHTML = "<input name=\"btnConfirm\" type=\"button\" value=\"Ȯ��\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); confirmPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnCancel\" type=\"button\" value=\"���\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"cancelPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnAdd\" type=\"button\" value=\"�߰�\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"addPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// ERP ����
	oCell9.innerHTML = "<input name=\"btnToErp\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execIFErp(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewToErp\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewIFErp(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// �ϰ�
	oCell10.innerHTML = "<input name=\"btnBatch\" type=\"button\" value=\"����\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"execBatch(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> ";
	
	document.recalc();
	
	// =================================================================================================================================
	controlBoard.createPlanRec(period_type, run_date, run_seq, "", cat_id, sub_cat, user_id, { 
		callback:function(result){
			// ���ο� ��ȹ ���ڵ� ���� ����
			if( result == "SUCCESS" ) {
				// ������ plan_step �� ��������
				controlBoard.getMaxPlanStep(period_type, run_date, run_seq, {
					callback:function(result){
						// �� ã�ƿ��� ����
						if( result == null || result == "" ) {
							document.frm.selPlan[rowIdx+1].checked = false;
							setDisable();
							return false;
						}
						// �� ã�ƿ��� ����
						else {
							objBtn.className = "button1_1";
							document.frm.selPlan[rowIdx].checked = false;
							document.frm.selPlan[rowIdx+1].checked = true;
							document.frm.plan_step[rowIdx+1].value = result.trim();
							setDisable();
						}
					}
				});
			}
			// ���ÿ� �ٸ� ����ڰ� �ٸ� ȭ�鿡�� ���� �����͸� ������ ��� ȭ�� �ٽ� �б�
			else if( result == "REFRESH" ) {
				GoSearch(document.frm._moon_service.value);
			}
			// ���ο� ��ȹ ���ڵ� ���� ����
			else {
				document.frm.selPlan[rowIdx+1].checked = false;
				setDisable();
				return false;
			}
			//setLineStatus(rowIdx+1); // ���� ���� ����
		}
	});
	// =================================================================================================================================
	
}

// ERP���� ���� ��ư Ŭ��
function execIFErp( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // Ŭ���� ��ư�� ���� �ε���
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var plant_id 	= document.frm.plant_id[rowIdx].value;
		var user_id 	= document.frm._user_id.value;
		var versions 	= document.frm.versions[rowIdx].value;
		var version 	= document.frm.version[rowIdx].value;
		var seq 		= document.frm.seq[rowIdx].value;
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var plant_id 	= document.frm.plant_id.value;
		var user_id 	= document.frm._user_id.value;
		var versions 	= document.frm.versions.value;
		var version 	= document.frm.version.value;
		var seq 		= document.frm.seq.value;
	}
	
	objBtn.className = "button1_1";
	
	if( cat_id == "PS" || cat_id == "SS" ) {
		// PLAN_VERSION_LOG ���� ������Ʈ(25) : ERP ���� ������
		controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '25', user_id, { 
			callback:function(result){
				// ����
				if( result == "SUCCESS" ) {
					// ���� ǥ�� : (25) ERP ���� ������
					setStatus(rowIdx);
					setLineStatus(rowIdx); // ���� ���� ����
					// SP CALL : META to LEGACY
					//callSp(sp_id, period_type, run_date, run_seq, plan_step, plant_id, rowIdx, user_id);
					callSpToLegacy(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, rowIdx, user_id);
				}
				// ����
				else {
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (26) ERP ���� ����
					controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, {
						callback:function(result){
							// ����
							if( result == "SUCCESS" ) {
								// ���� ǥ�� : (26) ERP ���� ����
								setStatus(rowIdx);
								setLineStatus(rowIdx); // ���� ���� ����
							}
							// ����
							else {
								// ���� ǥ�� : (26) ERP ���� ����
								setStatus(rowIdx);
								setLineStatus(rowIdx); // ���� ���� ����
							}
						}
					});
				}
			}
		});
	}
	else if( cat_id == "FA" ) {
		alert("�����Ҵ��ȹ�� ���⼭ ERP ������ ������ �� �����ϴ�.");
	}
	else if( cat_id == "RP" ) {
		alert("���۰�ȹ�� ERP �����ϱ� ���� ������ǥ���� ȭ������ �̵��մϴ�.");
		// trans_date ����
		var transDttm = new Date();
		var transYear = transDttm.getYear().toString();
		var transMonth = (transDttm.getMonth()+1).toString();
		if( Number(transMonth) < 10 ) {
			transMonth = "0" + transMonth;
		}
		var transDay = transDttm.getDate().toString();
		if( Number(transDay) < 10 ) {
			transDay = "0" + transDay;
		}
		var trans_date = transYear + "-" + transMonth + "-" + transDay;
		var url = "service.do?_moon_service=rp_05070_transBillPublishment_list&amp;_moon_perpage=100&amp;_moon_pagenumber=1";
		url += "&version=" + version + "&seq=" + seq + "&trans_start=" + trans_date + "&trans_end=" + trans_date;
		location.href = url;
	}
	else {
		// ERP ���� ����
		document.frm.status[rowIdx].value = 24;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		// ERP ���� ������
		document.frm.status[rowIdx].value = 25;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		alert(cat_id + "�� " + versions + " ������ ERP �� �����մϴ�.");
		// ERP ���� �Ϸ�
		document.frm.status[rowIdx].value = 27;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		
		setLineStatus(rowIdx); // ���� ���� ����
	}
	
}

// SP CALL
function callSp(sp_id, period_type, run_date, run_seq, plan_step, plant_id, rowIdx, user_id) {
	
	controlBoard.callSP(sp_id, period_type, run_date, run_seq, plan_step, plant_id, { 
		callback:function(result){
			// SP CALL ����
			if( result == "SUCCESS" ) {
				// STATUS UPDATE
				// PLAN_VERSION_LOG ���� ������Ʈ(27) : ERP ���� �Ϸ�
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '27', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// ���� ǥ�� : (27) ERP ���� �Ϸ�
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
						// ����
						else {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
					}
				});
			}
			// SP CALL ����
			else {
				// STATUS UPDATE
				// PLAN_VERSION_LOG ���� ������Ʈ(26) : ERP ���� ����
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
						// ����
						else {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
					}
				});
			}
		}
	});
	
}

// CALL SP META to LEGACY
function callSpToLegacy(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, rowIdx, user_id) {
	
	controlBoard.callSpToLegacy(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, { 
		callback:function(result){
			// SP CALL ����
			if( result == "SUCCESS" ) {
				// STATUS UPDATE
				// PLAN_VERSION_LOG ���� ������Ʈ(27) : ERP ���� �Ϸ�
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '27', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// ���� ǥ�� : (27) ERP ���� �Ϸ�
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
						// ����
						else {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
					}
				});
			}
			// SP CALL ����
			else {
				// STATUS UPDATE
				// PLAN_VERSION_LOG ���� ������Ʈ(26) : ERP ���� ����
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
						// ����
						else {
							// ���� ǥ�� : (26) ERP ���� ����
							setStatus(rowIdx);
							setLineStatus(rowIdx); // ���� ���� ����
						}
					}
				});
			}
		}
	});
	
}

var viewIFErpWin = null;
// ERP���� ���� ��ư Ŭ��
function viewIFErp( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // Ŭ���� ��ư�� ���� �ε���
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var plant_id 	= document.frm.plant_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	}
	else {
		var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var plant_id 	= document.frm.plant_id.value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	}
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_viewIFErp_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step;
	service_url += "&plant_id=" + plant_id;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=600, height=400, top=0, left=0";
	viewIFErpWin = window.open(service_url, "VIEW_ERP", pop_win_style);
	viewIFErpWin.focus();
	
}

// PLAN_VERSION_LOG ���̺��� �о ���� ǥ��
function setStatus( rowIdx ) {
	
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	}
	
	controlBoard.getStat(period_type, run_date, run_seq, plan_step, { 
		callback:function(result){
			// ���� �ҷ����� ����
			if( result == null || result == "" ) {
				// do nothing...
			}
			// ���� �ҷ����� ����
			else {
				if( document.frm.status[rowIdx] ) {
					document.frm.status[rowIdx].value = result;
					areaStat[rowIdx].innerHTML = arrStatus[Number(result)];
				} else {
					document.frm.status.value = result;
					areaStat.innerHTML = arrStatus[Number(result)];
				}
			}
			setLineStatus(rowIdx); // ���� ���� ����
		}
	});
	
}

// ��ȹ���� �Ϸ� ��, PLAN_VERSION_LOG ���̺� �о VERSION, SEQ ��������
function getVersions( rowIdx ) {
	
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	}
	
	controlBoard.getVersions(period_type, run_date, run_seq, plan_step, { 
		callback:function(result){
			// ���� �ҷ����� ����
			if( result.length == 0 || result == null ) {
				// do nothing...
			}
			// ���� �ҷ����� ����
			else {
				var version = result[0];
				var seq 	= result[1];
				var cmmt 	= result[2];
				if( document.frm.version[rowIdx] ) {
					document.frm.versions[rowIdx].value = version + " - " + seq;
					document.frm.version[rowIdx].value 	= version;
					document.frm.seq[rowIdx].value 		= seq;
					areaVer[rowIdx].innerHTML 			= version + " - " + seq;
					areaVer[rowIdx].parentNode.title 	= cmmt;
				} else {
					document.frm.versions.value = version + " - " + seq;
					document.frm.version.value 	= version;
					document.frm.seq.value 		= seq;
					areaVer.innerHTML 			= version + " - " + seq;
					areaVer.parentNode.title 	= cmmt;
				}
			}
			setLineStatus(rowIdx); // ���� ���� ����
		}
	});
	
}

// ��ȸ���� ��������
function setPeriodVer(ver) {
	
	document.frm.run_date_sel.value = ver.split(" - ")[0];
	document.frm.run_seq_sel.value = ver.split(" - ")[1];
	
}

// ��ȸ���� ����(RUN_SEQ) ����
function increaseRunSeq() {
	
	var run_date = document.frm.run_date_sel.value;
	var run_seq = document.frm.run_seq_sel.value;
	if( run_date == "" || run_date == null || run_seq == "" || run_seq == null ) {
		alert("��ȸ���� ������ ���� �����ϼ���.");
		return;
	}
	document.frm.run_seq_sel.value = Number(run_seq)+1;
	var service = "md_00010_controlBoardDaily_addRunSeq_comp";
	GoSave(service);
	
}

// ���� ���� ���̾� ��ġ���� ���� ����
var leftVal = null;
var topVal = null;

// ���� ���� ���̾� ����/����
function displayStatus(objTd, e){
	
	// �� ����
	var rowIdx = objTd.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type[rowIdx].value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var status 		= document.frm.status[rowIdx].value; 		// Ŭ���� ��ư�� ������ ����
	}
	else {
		var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
		var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
		var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
		var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
		var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
		var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
		var status 		= document.frm.status.value; 		// Ŭ���� ��ư�� ������ ����
	}
	
	// PLAN_STEP ���� ���� ��� �ƹ� ���� ���� ����
	if( plan_step == "" || plan_step == null ) {
		return;
	}
	
	// ���� ���� ���̱�/���߱�
	if( divStatus.style.display == "BLOCK" || divStatus.style.display == "block" ) {
		// div ����
		divStatus.style.display = "none";
		// ���� ���� KEY ���� �ʱ�ȭ
		document.frm.period_type_c.value = "";
		document.frm.run_date_c.value 	 = "";
		document.frm.run_seq_c.value 	 = "";
		document.frm.plan_step_c.value 	 = "";
	} else {
		// div ����
		divStatus.style.overflow = "";
		divStatus.style.display = "block";
		leftVal = e.clientX;
		topVal  = e.clientY;
		divStatus.style.left = leftVal;
		divStatus.style.top  = topVal;
		divStatus.focus();
		// ���� ���� KEY ���� ����
		document.frm.period_type_c.value = period_type;
		document.frm.run_date_c.value 	 = run_date;
		document.frm.run_seq_c.value 	 = run_seq;
		document.frm.plan_step_c.value 	 = plan_step;
	}
	
}

// ���� ���� ���̾� ����
function hideStatDiv(objDiv, e) {
	
	if( e.clientX >= (leftVal + 2) && e.clientX <= (leftVal + 228) 
		&& e.clientY >= (topVal + 2) && e.clientY <= (topVal + 98) ) {
		// nothing
	}
	else {
		objDiv.style.display = 'none';
	} 

}

// ���� ���� ���� ���� ��ư Ŭ��
function setSelStatus(objRadio) {
	
	document.frm.sel_status.value = objRadio.value;
	
}

// ���� ����
function setStat() {
	
	var service = "md_00010_controlBoardDaily_setStatus_comp";
	GoSave(service);
	
}

// �ϰ����� option
// 1 : normal
// 2 : batch
var batOption = 1;
// ��ȹ �ϰ� ����
function execBatch(objBtn) {
	
	batOption = 2;
	execIF(objBtn);
	
}

// batOption 1 �� �ʱ�ȭ
function initBatOpt() {
	
	batOption = 1;
	
}
