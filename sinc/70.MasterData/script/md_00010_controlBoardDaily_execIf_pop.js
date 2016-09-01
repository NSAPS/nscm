////////////////////////////////////////////////////////////
// ���α׷�ID      : md_00010_controlBoardDaily_execIf_pop.js
// ���α׷���      : �ϰ���ȹ(Contol Board) I/F
// ������          : zionex
// ��������        : 2008-05-01
//
// ���� job file   : job_sinc_70_masterData.xml
// ���� query file : query_sinc_70_masterData.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-05-01  zionex    create
// 2.0 		  2009-11-10  ������	    �����Ҵ� 1�� ����� �����߻� 
// 									: ���������� ��ȹ������ �Ϸ�Ǿ��µ� �������°� 0�� �Ѿ�ͼ� ���з� �����ȴ�
//									������� 24, 24, 0���� �������°��� �Ѿ���� condition�� 3�̻��� �ȴ�
// 									�̶� ��ȹ���� ���з� ���������� �ȴ�.
//									�ǹ���) �� 24(��ȹ��������)�� 3���̻� ���¸� check�ؾ� �߳�?
//									������� : 1) 24�� �ѹ��� �޾Ƶ� ��ȹ�������� ����!
//											   2) ������ �ʴ� ���� ��� 6������ ��ٸ� -> ���� 3��
////////////////////////////////////////////////////////////
var position = 1; // ���α׷����� ���� ��ġ
var direction = "right"; // ���α׷����� ���� ����
var curProIdx = 0; // ���� ���� ���� SP INDEX
var objTimer = null;
var arrStatus = new Array(15);
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

// �������� �ʱ�ȭ
function initValues() {
	
	position = 1; // ���α׷����� ���� ��ġ
	direction = "right"; // ���α׷����� ���� ����
	curProIdx = 0; // ���� ���� ���� SP INDEX
	objTimer = null;
	
}

// �������̽� ����
// 1. HORIZON INFO ����
// 2. PLAN_VERSION_LOG.ORDER_FLAG, SAFETY_FLAG UPDATE
// 3. �������̽� ����(function execIFDo() ȣ��)
function execIF() {
	
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var user_id 	= document.frm._user_id.value;
	var horzn_start = document.frm.horzn_start.value;
	var horzn_end 	= document.frm.horzn_end.value;
	var plan_start 	= document.frm.plan_start.value;
	if( period_type == "DAILY" && cat_id == "RP" ) {
		var order_flag  = document.frm.order_flag.value;
		var safety_flag = document.frm.safety_flag.value;
		var pre_plan_add_flag = document.frm.pre_plan_add_flag.value;
	}
	
	// �ϰ� ���� ��ȹ�� ���
	if( period_type == "DAILY" && cat_id == "RP" ) {
		// ��ȹ����, �����ٽ��۽ð� HORIZON_INFO ���̺� ����
		controlBoard.updateHorizonInfo(period_type, cat_id, user_id, horzn_start, horzn_end, plan_start, {
			callback:function(result){
				// ����
				if( result == "SUCCESS" ) {
					// ����/������� �ݿ� �ɼ� ����
					controlBoard.updateDailyRpOption(period_type, run_date, run_seq, plan_step, order_flag, safety_flag, pre_plan_add_flag, {
						callback:function(result){
							// ����
							if( result == "SUCCESS" ) {
								execIFDo(); // �������̽� ����
							}
							// ����
							else {
								alert("����/������� �ݿ� �ɼ� ���忡 �����߽��ϴ�.\n\n���� ������ �ݺ��� ��� �����ڿ��� �����Ͻñ� �ٶ��ϴ�.");
							}
						}
					});
				}
				// ����
				else {
					alert("��ȹ����, �����ٽ��۽ð� ���忡 �����߽��ϴ�.\n\n���� ������ �ݺ��� ��� �����ڿ��� �����Ͻñ� �ٶ��ϴ�.");
				}
			}
		});
	}
	// �ϰ� ���� ��ȹ �̿�
	else {
		// 2�� �����Ҵ� I/F ����� �����Ҵ� ��å UPDATE
		if( period_type == "DAILY" && cat_id == "FA" ){

			// ���� or ����� ���õǾ����� Ȯ���Ѵ�.
			if(document.all.checkFaCost.checked == false && document.all.checkFaRate.checked == false){
			  	alert("���� �Ǵ� ����� �������ֽʽÿ�! \n ��, ������ �����Ҵ��� ���� �����ؾ� �մϴ�!");
				return;
			}  

			if( document.frm.faSecondFlag.value == "RATE" ){				
				// �����Ҵ� ��å ������ update
				commonUtil.executeQuery("","","plant_alloc_policy_update_rate",{
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// do nothing
						}
						// ����
						else {
							alert("�����Ҵ� ��å ���� ���� ����!!!");
						}
					}
				});
			}else{
				// �����Ҵ� ��å ������� update
				commonUtil.executeQuery("","","plant_alloc_policy_update_cost",{
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// do nothing
						}
						// ����
						else {
							alert("�����Ҵ� ��å ��� ���� ����!!!");
						}
					}
				});					
			}
		}
		
		// ��ȹ����, �����ٽ��۽ð� HORIZON_INFO ���̺� ����
		controlBoard.updateHorizonInfo(period_type, cat_id, user_id, horzn_start, horzn_end, plan_start, {
			callback:function(result){
				// ����
				if( result == "SUCCESS" ) {
					execIFDo(); // �������̽� ����
				}
				// ����
				else {
					alert("��ȹ����, �����ٽ��۽ð� ���忡 �����߽��ϴ�.\n\n���� ������ �ݺ��� ��� �����ڿ��� �����Ͻñ� �ٶ��ϴ�.");
				}
			}
		});
	}
	
}

// �������̽� ���� - �������̽� ����
// 1. PLAN_VERSION_LOG ���� ������Ʈ(1), (2)
// 2. ù��° ���κ��� ���ʷ� SP ȣ��
// 3. �� SP ȣ�� ��, SCM_IF_LOG ���̺��� Ȯ���Ͽ� ���� �� ERROR �� �߻����� ������ �����ܰ� ����
// 4. ERROR(SP ȣ�� ���� & SP ���� �� ����) �� �� ���, PLAN_VERSION_LOG ���� ������Ʈ(3) ��, �۾� ����
// 5. ��� SP ȣ���� ���������� �Ϸ�Ǹ� PLAN_VERSION_LOG ���� ������Ʈ(4) �� ����
function execIFDo() {
	
	// �������� �ʱ�ȭ
	initValues();
	
	// I/F ���� ��ư ��Ȱ�� ǥ�� 
	setIfBtn();
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var tabLen 		= main_tbody.rows.length;
	
	// ���̺� ���� DISABLED �� ����
	disableTable();
	
	// PLAN_VERSION_LOG ���� ������Ʈ(1) : �������̽� ����
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '1', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (1) �������̽� ����
				opener.setStatus(parentRowIdx);
				
				// PLAN_VERSION_LOG ���� ������Ʈ(2) : �������̽� ������
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '2', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (2) �������̽� ������
							opener.setStatus(parentRowIdx);
							callSp();
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
							enableTable(); // ���̺� ���� ������·� ����
							return false;
						}
					}
				});
			}
			// ����
			else {
				// PLAN_VERSION_LOG ���� ������Ʈ(3) : �������̽� ����
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '3', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
							enableTable(); // ���̺� ���� ������·� ����
							return false;
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
							enableTable(); // ���̺� ���� ������·� ����
							return false;
						}
					}
				}); // end DWR
			} // end else
		}
	});
	
}

// SP ȣ��
function callSp() {

	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id.value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	var user_id 	= document.frm._user_id.value;
	var tabLen 		= main_tbody.rows.length;
	
	setPro();
	position = 1;
	direction = "right";
	clearTimeout(objTimer);
	displayPro();
	disableTable(); // ���̺� ���� DISABLED �� ����
	
	if( document.frm.sp_id[0] ) {
		var sp_id = document.frm.sp_id[curProIdx].value;
		areaStatus[curProIdx].innerHTML = "<font color='blue'><b>������</b></font>";
	}
	else {
		var sp_id = document.frm.sp_id.value;
		areaStatus.innerHTML = "<font color='blue'><b>������</b></font>";
	}
	
	controlBoard.callSP(sp_id, period_type, run_date, run_seq, plan_step, plant_id, { 
		callback:function(result){
			var in_sel_name = "sp_id"+"!%!"+"period_type"+"!%!"+"run_date"+"!%!"+"run_seq"+"!%!"+"plan_step";
			var in_sel_value = sp_id +"!%!"+period_type+"!%!"+run_date+"!%!"+run_seq+"!%!"+plan_step;
			
			commonUtil.getCodeInfo(in_sel_name,in_sel_value,"md_00010_sp_err_status_check", { 			
				callback:function(arrList){
				var sp_status = "E";
				if( arrList.length == 1 ) {
					sp_status = arrList[0][1];
				}
				if( result == "SUCCESS" && sp_status == "S" ) {
					// ����
					if( document.frm.sp_id[0] ) {
						var sp_id = document.frm.sp_id[curProIdx].value;
						areaStatus[curProIdx].innerHTML = "�Ϸ�";
					}
					else {
						var sp_id = document.frm.sp_id.value;
						areaStatus.innerHTML = "�Ϸ�";
					}
					
					setPro();
					curProIdx++;
					if( curProIdx < tabLen ) {
							callSp();
					}
					else {
						// PLAN_VERSION_LOG ���� ������Ʈ(4) : �������̽� �Ϸ�
						controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '4', user_id, { 
							callback:function(result){
								// ����
								if( result == "SUCCESS" ) {
									// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (4) �������̽� �Ϸ�
									opener.setStatus(parentRowIdx);
									setIfBtn(); 	// I/F ���� ��ư Ȱ�� ǥ��
									enableTable(); 	// ���̺� ���� ������·� ����
									endIF(); 		// IF ����
								}
								// ����
								else {
									// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
									opener.setStatus(parentRowIdx);
									setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
									enableTable(); // ���̺� ���� ������·� ����
									return false;
								}
							}
						});
					return true;
					}
				}
				else {
					// ����
					if( document.frm.sp_id[0] ) {
						var sp_id = document.frm.sp_id[curProIdx].value;
						areaStatus[curProIdx].innerHTML = "<font color='red'><b>����</b></font>";
						alert("�������̽� ���� �� ������ �߻��߽��ϴ�.");
					}
					else {
						var sp_id = document.frm.sp_id.value;
						areaStatus.innerHTML = "<font color='red'><b>����</b></font>";
						alert("�������̽� ���� �� ������ �߻��߽��ϴ�.");
					}
					
					// PLAN_VERSION_LOG ���� ������Ʈ(3) : �������̽� ����
					controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '3', user_id, { 
						callback:function(result){
							// ����
							if( result == "SUCCESS" ) {
								// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
								opener.setStatus(parentRowIdx);
								setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
								enableTable(); // ���̺� ���� ������·� ����
								setPro();
							}
							// ����
							else {
								// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (3) �������̽� ����
								opener.setStatus(parentRowIdx);
								setIfBtn(); // I/F ���� ��ư Ȱ�� ǥ��
								enableTable(); // ���̺� ���� ������·� ����
								return false;
							}
						}
					});
					return false;
				}
			}
			});

		}
	});
	
}

// I/F ���� ��ư ��Ȱ�� ǥ��
function setIfBtn() {
	
	if( btnExecIF.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F ����\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F ����\" onClick=\"execIF(); \" class=\"btn1_on\">";
	}
	
}

// ���̺� ���� DISABLED �� ����
function disableTable() {
	
	var tabLen = main_tbody.rows.length;
	
	for( var i=0 ; i < tabLen ; i++ ) {
		if( i == curProIdx ) {
			if( main_tr[i] ) {
				main_tr[i].childNodes(0).style.color = "black";
				main_tr[i].childNodes(1).style.color = "black";
				main_tr[i].childNodes(2).style.color = "black";
			}
			else {
				main_tr.childNodes(0).style.color = "black";
				main_tr.childNodes(1).style.color = "black";
				main_tr.childNodes(2).style.color = "black";
			}
		}
		else {
			if( main_tr[i] ) {
				main_tr[i].childNodes(0).style.color = "darkgray";
				main_tr[i].childNodes(1).style.color = "darkgray";
				main_tr[i].childNodes(2).style.color = "darkgray";
			}
			else {
				main_tr.childNodes(0).style.color = "darkgray";
				main_tr.childNodes(1).style.color = "darkgray";
				main_tr.childNodes(2).style.color = "darkgray";
			}
		}
	}
	
	// ��ȹ���� input â disabled
	document.frm.horzn_start.readOnly 		= true;
	document.frm.horzn_start.style.color 	= "darkgray";
	document.frm.horzn_end.readOnly 		= true;
	document.frm.horzn_end.style.color 		= "darkgray";
	document.frm.plan_start.readOnly 		= true;
	document.frm.plan_start.style.color 	= "darkgray";
	document.frm.btnHorznStart.disabled 	= true;
	document.frm.btnHorznStart.style.cursor = "default";
	document.frm.btnHorznEnd.disabled 		= true;
	document.frm.btnHorznEnd.style.cursor 	= "default";
	document.frm.btnPlanStart.disabled 		= true;
	document.frm.btnPlanStart.style.cursor 	= "default";
	
}

// ���̺� ���� ���� ���·� ����
function enableTable() {
	
	var tabLen = main_tbody.rows.length;
	
	for( var i=0 ; i < tabLen ; i++ ) {
		if( main_tr[i] ) {
			main_tr[i].childNodes(0).style.color = "black";
			main_tr[i].childNodes(1).style.color = "black";
			main_tr[i].childNodes(2).style.color = "black";
		}
		else {
			main_tr.childNodes(0).style.color = "black";
			main_tr.childNodes(1).style.color = "black";
			main_tr.childNodes(2).style.color = "black";
		}
	}
	
	// ��ȹ���� input â enabled
	document.frm.horzn_start.readOnly 		= false;
	document.frm.horzn_start.style.color 	= "black";
	document.frm.horzn_end.readOnly 		= false;
	document.frm.horzn_end.style.color 		= "black";
	document.frm.plan_start.readOnly 		= false;
	document.frm.plan_start.style.color 	= "black";
	document.frm.btnHorznStart.disabled 	= false;
	document.frm.btnHorznStart.style.cursor = "pointer";
	document.frm.btnHorznEnd.disabled 		= false;
	document.frm.btnHorznEnd.style.cursor 	= "pointer";
	document.frm.btnPlanStart.disabled 		= false;
	document.frm.btnPlanStart.style.cursor 	= "pointer";
	
}

// �θ�â(control board ���� ȭ��)�� ���� ǥ��
// �� �Լ��� ������� �ʰ�, control board ���� ȭ�鿡�� PLAN_VERSION_LOG �����͸� �о�� ���¸� �����ϵ��� ���� 
function setOpenrStatus( status ) {
	
	var parentRowIdx = document.frm.rowIdx.value; // Ŭ���� ��ư�� ���� �ε���
	status = Number(status);
	
	if( opener.areaStat[parentRowIdx] ) {
		opener.areaStat[parentRowIdx].innerHTML = arrStatus[status];
		opener.document.frm.status[parentRowIdx].value = status;
		if( status == 3 || status == 4 ) {
			opener.document.frm.btnIF[parentRowIdx].disabled = false;
			opener.document.frm.btnViewIF[parentRowIdx].disabled = false;
		} else {
			opener.document.frm.btnIF[parentRowIdx].disabled = true;
			opener.document.frm.btnViewIF[parentRowIdx].disabled = true;
		}
	}
	else {
		opener.areaStat.innerHTML = arrStatus[status];
		opener.document.frm.status.value = status;
		if( status == 3 || status == 4 ) {
			opener.document.frm.btnIF.disabled = false;
			opener.document.frm.btnViewIF.disabled = false;
		} else {
			opener.document.frm.btnIF.disabled = true;
			opener.document.frm.btnViewIF.disabled = true;
		}
	}
	
}

// ���α׷��� �� ���� Ȱ��/��Ȱ��
function setPro() {
	
	if( divPro[0] ) {
		if( divPro[curProIdx].style.display == "none" ) {
			divPro[curProIdx].style.display = "block"
		}
		else {
			divPro[curProIdx].innerHTML = "";
			divPro[curProIdx].style.display = "none"
		}
	}
	else {
		if( divPro.style.display == "none" ) {
			divPro.style.display = "block"
		}
		else {
			divPro.innerHTML = "";
			divPro.style.display = "none"
		}
	}
	
}

// ���α׷��� �� ǥ��
function displayPro() {
	
	var tableStr = "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	tableStr += "<tr><td width=\"";
	
	if( direction == "right" ) {
		tableStr += position.toString() + "%\" ";
		tableStr += "style=\"filter=progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=white, EndColorStr=silver); \" >";
		tableStr += "</td><td width=\"" + (100 - position).toString() + "%\" >";
	}
	else {
		tableStr += (100 - position).toString() + "%\" ></td><td width=\"";
		tableStr += position.toString() + "%\" ";
		tableStr += "style=\"filter=progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=silver, EndColorStr=white); \" >";
	}
	
	tableStr += "</td></tr></table>";
	
	if( divPro[curProIdx] ) {
		divPro[curProIdx].innerHTML = tableStr;
	}
	else {
		divPro.innerHTML = tableStr;
		//return;
	}
	
	position++;
	if( position > 99 ) {
		position = 1;
		if( direction == "right" ) {
			direction = "left";
		}
		else {
			direction = "right";
		}
	}
	
	objTimer = setTimeout(displayPro, 20);
	
}

// batch ���� �Ϸ�
function endIF() {
	
	var batOption = document.frm.batOption.value;
	if( batOption == 2 ) {
		var rowIdx = document.frm.rowIdx.value;
		if( opener.document.frm.btnPlan[Number(rowIdx)] ) {
			var objBtn = opener.document.frm.btnPlan[Number(rowIdx)];
		}
		else {
			var objBtn = opener.document.frm.btnPlan;
		}
		opener.batOption = batOption;
		opener.focus();
		opener.execPlan(objBtn);
		window.close();
	}
	
}

// ��ȹ���� ���� ������ ���� ��ü
var objInterval = null;

// �ϰ� 1�� �����Ҵ�
function execSch() {
	
	// ��ȹ����/IF ��ư ��Ȱ�� ǥ�� 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1�� ���� �Ҵ�\" class=\"btn3_off\" disabled>"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F ����\" class=\"btn1_off\" disabled>";
	
	// ��ȹ���� ���� ������
	objInterval = setInterval(blinkStat, 600);
	
	// ��ȹ���� �̹��� ǥ��
	tbMain.style.display = "none";
	waitArea.style.display = "block";
	
	execSchDo();
	
	// �����Ҵ� ��å ������ update
	commonUtil.executeQuery("","","plant_alloc_policy_update_rate",{
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// do nothing
			}
			// ����
			else {
				alert("�����Ҵ� ��å ���� ���� ����!!!");
			}
		}
	});
	
	setTimeout(execSchBatFA, 3000);
	setTimeout(setParentStatus, 10000);
	
}

function setParentStatus() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	opener.setStatus(parentRowIdx);

}

// ����(SupplyNet) ���� üũ ����
var statusCondition = false;

// �ϰ� 1�� �����Ҵ� : ��ũ��Ʈ ����
function execSchDo() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB ����
	statusCondition = false;
	
	// ��ȸ���� ����
	controlBoard.execSchedulingBatFA(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// do nothing
			}
			// ������
			else if( result == "CONTINUE" ) {
				// do nothing
			}
			// ����
			else if( result == "FAIL" ) {
				// do nothing
				opener.setStatus(parentRowIdx);
			}
			// ��Ÿ unexpected status
			else {
				// do nothing
			}
		}
	});
	
}

// �������� ���� ��ȯ�� ����� ���� üũ counting ����
var condition = 0;

// ENGINE SCHEDULING START
function execSchBatFA() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB ����
	
	// ��ȸ���� ����
	controlBoard.execCheckStatusBatFA(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				
/// ver2.0 ������� //////////////////////////////////////
//				if( condition < 3 ) {
//					setTimeout(execSchBatFA, 10000);
//					++condition;
//					return;
//				}
//				condition = 0;
/////////////////////////////////////////////////////////	

				// PLAN_VERSION_LOG ���� ������Ʈ(22) : ��ȹ���� �Ϸ�
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '22', user_id, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (22) ��ȹ���� �Ϸ�
							opener.setStatus(parentRowIdx);
							opener.getVersions(parentRowIdx);
							completeSch();
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
							opener.setStatus(parentRowIdx);
							failSch(); // ��ȹ���� ����
							return false;
						}
					} // end callback
				});
			}
			// ������
			else if( result == "CONTINUE" ) {
				condition = 0;
				setTimeout(execSchBatFA, 10000);
				if( statusCondition == false ) {
					statusCondition = true;
				}
				else {
					opener.setStatus(parentRowIdx);
					statusCondition = false;
				}
			}
			// ����
			else if( result == "FAIL" ) {
				condition = 0;
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
				opener.setStatus(parentRowIdx);
				failSch(); // ��ȹ���� ����
				return false;
			}
			// ��Ÿ unexpected status
			else {
				// unexpected status �� ���� ���� �� ���� üũ ��, 
				// ���� ���� �ݺ���, ���� �� ����
				if( condition < 6 ) {
					++condition;
					setTimeout(execSchBatFA, 5000);
				}
				else {
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
					opener.setStatus(parentRowIdx);
					failSch(); // ��ȹ���� ����
					return false;
				}
			}
		}
	});
	
}

// ��ȹ������� BLINK ȿ��
function blinkStat() {
	
	if( areaStat.style.display == "block" ) {
		areaStat.style.display = "none";
	} else {
		areaStat.style.display = "block";
	}
	
}

// 1�� �����Ҵ� �Ϸ�
function completeSch() {
	
	// ��ȹ����/IF ��ư ��Ȱ�� ǥ�� 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1�� ���� �Ҵ�\" onClick=\"execSch(); \" class=\"btn3_on\">"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F ����\" onClick=\"execIF(); \" class=\"btn1_on\">";
	
	// ��ȹ���� ���� ������ ����
	objInterval = null;
	
	// ��ȹ���� �̹��� ǥ��
	tbMain.style.display = "block";
	waitArea.style.display = "none";
	
}

// 1�� �����Ҵ� ����
function failSch() {
	
	// ��ȹ����/IF ��ư ��Ȱ�� ǥ�� 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1�� ���� �Ҵ�\" onClick=\"execSch(); \" class=\"btn3_on\">"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F ����\" onClick=\"execIF(); \" class=\"btn1_on\">";
	
	// ��ȹ���� ���� ������ ����
	objInterval = null;
	
	// ��ȹ���� ���� ǥ��
	areaStat.innerHTML = "<font color=\"RED\">1�� ���� �Ҵ� ��ȹ ���� ����</font>";
	
}

// 2�� �����Ҵ� checkbox CLICK
function clickSecondFa(obj) {
	
	if(obj.name == "checkFaRate"){
		document.all.checkFaCost.checked = false;
	}
	else{
		document.all.checkFaRate.checked = false;
	}
	
	if( document.all.checkFaRate.checked == true ) {
		document.frm.faSecondFlag.value = "RATE";
	}
	else if( document.all.checkFaCost.checked == true ) {
		document.frm.faSecondFlag.value = "COST";
	}
	else {
		document.frm.faSecondFlag.value = "N";
	}
	//GoSearch(document.frm._moon_service.value);
	//document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	//alert(document.all.checkFa.value);
	
}



// ���۰�ȹ �����ȹ �ݿ� check -> checkbox���� hidden data�� �ݿ�
function doCheckApplYN(obj){

	if(obj.checked){
			document.frm.pre_plan_add_flag.value = "Y";
	}
	else{
			document.frm.pre_plan_add_flag.value = "N";
	}
}