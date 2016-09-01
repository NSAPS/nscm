////////////////////////////////////////////////////////////
// ���α׷�ID      : md_00010_controlBoardDaily_execPlan_pop.js
// ���α׷���      : �ϰ���ȹ(Contol Board) ����
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
// 2.0 		  2009-10-06  ������	�����Ҵ� 2�� ����� �����߻� 
// 									: ���������� ��ȹ������ �Ϸ�Ǿ��µ� �������°� 0�� �Ѿ�ͼ� ���з� �����ȴ�
//									������� 24, 24, 0���� �������°��� �Ѿ���� condition�� 3�̻��� �ȴ�
// 									�̶� ��ȹ���� ���з� ���������� �ȴ�.
//									�ǹ���) �� 24(��ȹ��������)�� 3���̻� ���¸� check�ؾ� �߳�?
//									������� : 1) 24�� �ѹ��� �޾Ƶ� ��ȹ�������� ����!
//											   2) ������ �ʴ� ���� ��� 6������ ��ٸ� -> ���� 3��
// 2.1 		  2009-10-20  ������	�����Ҵ� 2�� ��ȹ���� �ε��� �����߻�
//									supplynet�� ���°��� 0�� ������ ��찡 ���� �߻��Ѵ�.
//									���� error���¸� üũ�ϴ� conditionLD ���� 6���� ��.
//									��ȹ���� �ε��ÿ��� ver2.0�� ���� ���� ����
// 2.2		  2010-04-13  ������ �����Ҵ� 2���ÿ� ��ȹ���� �ε��� ��ȹ������ ����ȵ�.
//								���� ������ ���� ���¸� 3������ Ȯ���� ��ȹ������ �� �� �ֵ��� ����
//
// 2.3		  2010-05-25  ������ VER 2.2 �����Ŀ��� �����. ���� ��ȹ���� �ε��� ��ȹ�������� �Ŀ�
//								��ȹ���൵ SUCCESS���¿� 3���̻� Ȯ���� ������ ��� �����ϵ��� ���� 
//
// 2.4		  2012-04-27  ������ ���� �����Ҵ� ����� �߻����� �� ����
//				1) ���ְ� ��ȹ�ε����� ��� �߻�
//                                 : FAIL�� ��쵵 ������õ� �� �� �ֵ��� ����
//                                 : ����üũ�� ���� 6������ 20�������� ����(�׽�Ʈ�� 0�� ���ϵǴ°� 5�� ���Ӱ�� Ȯ��)
//                              2) ���� ��ȹ�ε��� �������� ���� ��ȹ���� ����
//								   : ���������� 6������ ��õ�, ����üũ�� 20��
//                                   --> ������ �߻���� ���� �ȵ�.
// 								 	
////////////////////////////////////////////////////////////
var objInterval = null;
var objSchInterval = null;

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

// ��ȹ���� ��ư Ŭ��
function execPlan() {
	
	// ��ȹ���� ��ư ��Ȱ�� ǥ�� 
	setPlanBtn();
	
	setPlanningImg(); // ��ȹ���� �̹��� ǥ��
	objInterval = setInterval(blinkStat, 600); // ��ȹ���� ���� ������
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	
	// �޸� (COMMENT) ����
	saveComment();
	
	// PLAN_VERSION_LOG ���� ������Ʈ(5) : ��ȹ���� ����
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '5', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (5) ��ȹ���� ����
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[5];
				
				// PLAN_VERSION_LOG ���� ������Ʈ(6) : ��ȹ���� �ε� ����
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '6', user_id, { 
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (6) ��ȹ���� �ε� ����
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[6];
							execSchLoad(); // ��ȹ���� ���� �ε� ����
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
							opener.setStatus(parentRowIdx);
							displayReady(8); // ��ȹ���� �غ���� ǥ��
							return false;
						}
					}
				});
			}
			// ����
			else {
				opener.setStatus(parentRowIdx);
				displayReady(8); // ��ȹ���� �غ���� ǥ��
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// ENGINE DATA LOADING START
function execSchLoad() {
	
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
	
	// PLAN_VERSION_LOG ���� ������Ʈ(7) : ��ȹ���� �ε���
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '7', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (7) ��ȹ���� �ε���
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[7];
	
				//if( period_type == "DAILY" && cat_id == "FA" ) {
				if( cat_id == "FA" ) {
					execSchLoadFA();
					return;
				}
				
				controlBoard.execSchLoad(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG ���� ������Ʈ(9) : ��ȹ���� �ε� �Ϸ�
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '9', user_id, {
								callback:function(result){
									// ����
									if( result == "SUCCESS" ) {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (9) ��ȹ���� �ε� �Ϸ�
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[9];
										execScheduling(); // ��ȹ����
									}
									// ����
									else {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
										opener.setStatus(parentRowIdx);
										displayReady(8); // ��ȹ���� �غ���� ǥ��
										return false;
									}
								} // end callback
							});
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
							opener.setStatus(parentRowIdx);
							displayReady(8); // ��ȹ���� �غ���� ǥ��
							return false;
						}
					}
				});
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
				opener.setStatus(parentRowIdx);
				displayReady(8); // ��ȹ���� �غ���� ǥ��
				return false;
			}
		} // end callback
	}); // end DWR
	
}

var conditionLD = 0;
var condition_SUCCESS = 0;
// ENGINE DATA LOADING START
function execSchLoadFA() {
	
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
	
	// �ε� ����
	controlBoard.execSchLoad(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				
/// ver2.1 ������� //////////////////////////////////////
//				if( conditionLD < 3 ) {
//					setTimeout(execSchLoadFA, 10000);
//					++conditionLD;
//					return;
//				}
//				conditionLD = 0;
/////////////////////////////////////////////////////////		
// ver2.2 ������� //////////////////////////////////////
				if( condition_SUCCESS < 3 ) {
					setTimeout(execSchLoadFA, 10000);
					++condition_SUCCESS;
					return;
				}
				condition_SUCCESS = 0;
/////////////////////////////////////////////////////////		
				
				// PLAN_VERSION_LOG ���� ������Ʈ(9) : ��ȹ���� �ε� �Ϸ�
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '9', user_id, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (9) ��ȹ���� �ε� �Ϸ�
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[9];
							execScheduling(); // ��ȹ����
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
							opener.setStatus(parentRowIdx);
							displayReady(8); // ��ȹ���� �ε� ����
							return false;
						}
					} // end callback
				});
			}
			// ������
			else if( result == "CONTINUE" ) {
				conditionLD = 0;
				setTimeout(execSchLoadFA, 10000);
			}
			// ����
			else if( result == "FAIL" ) {
				// unexpected status �� ���� ���� �� ���� üũ ��, 
				// ���� ���� �ݺ���, ���� �� ����
				if( conditionLD < 20 ) {
					++conditionLD;
					setTimeout(execSchLoadFA, 5000);
				}
				else
				{
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
					opener.setStatus(parentRowIdx);
					displayReady(8); // ��ȹ���� �ε� ����
					return false;
				}
			}
			// ��Ÿ unexpected status
			else {
				// unexpected status �� ���� ���� �� ���� üũ ��, 
				// ���� ���� �ݺ���, ���� �� ����
				if( conditionLD < 20 ) {
					++conditionLD;
					setTimeout(execSchLoadFA, 5000);
				}
				else {
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (8) ��ȹ���� �ε� ����
					opener.setStatus(parentRowIdx);
					displayReady(8); // ��ȹ���� ����
					return false;
				}
			}
		}
	});
	
}

// ENGINE SCHEDULING START
function execScheduling() {
	
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
	
	// PLAN_VERSION_LOG ���� ������Ʈ(10) : �����ٸ� ���� : ����
	// PLAN_VERSION_LOG ���� ������Ʈ(11) : ��ȹ���� ������
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '11', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (11) ��ȹ���� ������
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[11];
	
				//if( period_type == "DAILY" && cat_id == "FA" ) {
				if( cat_id == "FA" ) {
					execSchedulingFA();
					return;
				}
				
				// ��ȸ���� ����
				controlBoard.execScheduling(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							
							clearInterval(objSchInterval);
							objSchInterval = null;
							
							// PLAN_VERSION_LOG ���� ������Ʈ(13) : �����ٸ� �Ϸ�
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '13', user_id, {
								callback:function(result){
									// ����
									if( result == "SUCCESS" ) {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (13) �����ٸ� �Ϸ�
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[13];
										execSchSave(); // �������� ����
									}
									// ����
									else {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
										opener.setStatus(parentRowIdx);
										displayReady(12); // ��ȹ���� �غ���� ǥ��
										return false;
									}
								} // end callback
							});
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
							opener.setStatus(parentRowIdx);
							displayReady(12); // ��ȹ���� ����
							return false;
						}
					}
				});
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
				opener.setStatus(parentRowIdx);
				displayReady(12); // ��ȹ���� �غ���� ǥ��
				return false;
			}
		} // end callback
	}); // end DWR
	
}

var condition = 0;
var condition_SUCCESS2 = 0;
// ENGINE SCHEDULING START
function execSchedulingFA() {
	
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
	
	// ��ȹ���� ����
	controlBoard.execScheduling(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				
/// ver2.0 ������� //////////////////////////////////////
//				if( condition < 3 ) {
//					setTimeout(execSchedulingFA, 10000);
//					++condition;
//					return;
//				}
//				condition = 0;
/////////////////////////////////////////////////////////				
// ver2.3 ������� //////////////////////////////////////
				if( condition_SUCCESS2 < 6 ) {
					setTimeout(execSchedulingFA, 10000);
					++condition_SUCCESS2;
					return;
				}
				condition_SUCCESS2 = 0;
/////////////////////////////////////////////////////////		
				
				// PLAN_VERSION_LOG ���� ������Ʈ(13) : �����ٸ� �Ϸ�
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '13', user_id, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (13) �����ٸ� �Ϸ�
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[13];
							execSchSave(); // �������� ����
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
							opener.setStatus(parentRowIdx);
							displayReady(12); // ��ȹ���� �غ���� ǥ��
							return false;
						}
					} // end callback
				});
			}
			// ������
			else if( result == "CONTINUE" ) {
				condition = 0;
				setTimeout(execSchedulingFA, 10000);
			}
			// ����
			else if( result == "FAIL" ) {
				// unexpected status �� ���� ���� �� ���� üũ ��, 
				// ���� ���� �ݺ���, ���� �� ����
				if( condition < 20 ) {
					++condition;
					setTimeout(execSchedulingFA, 5000);
				}
				else {
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
					opener.setStatus(parentRowIdx);
					displayReady(12); // ��ȹ���� ����
					return false;
				}
			}
			// ��Ÿ unexpected status
			else {
				// unexpected status �� ���� ���� �� ���� üũ ��, 
				// ���� ���� �ݺ���, ���� �� ����
				if( condition < 20 ) {
					++condition;
					setTimeout(execSchedulingFA, 5000);
				}
				else {
					// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (12) ��ȹ���� ����
					opener.setStatus(parentRowIdx);
					displayReady(12); // ��ȹ���� ����
					return false;
				}
			}
		}
	});
	
}

// ENGINE SAVING RESULT START
function execSchSave() {
	
	document.frm.status.value = "14"; // ��ȹ ��� ���� ����
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
	
	// PLAN_VERSION_LOG ���� ������Ʈ(14) : ��ȹ��� ���� ���� : ����
	// PLAN_VERSION_LOG ���� ������Ʈ(15) : ��ȹ��� ���� ������
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '15', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (15) ��ȹ��� ���� ������
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[15];
				// ��ȹ��� ���� ����
				controlBoard.execSchSave(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG ���� ������Ʈ(17) : ��ȹ��� ���� �Ϸ�
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '17', user_id, {
								callback:function(result){
									// ����
									if( result == "SUCCESS" ) {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (17) ��ȹ��� ���� �Ϸ�
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[17];
										convertResult(); // ��ȹ��� ������
									}
									// ����
									else {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (16) ��ȹ��� ���� ����
										opener.setStatus(parentRowIdx);
										displayReady(16); // ��ȹ���� �غ���� ǥ��
										return false;
									}
								} // end callback
							});
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (16) ��ȹ��� ���� ����
							opener.setStatus(parentRowIdx);
							displayReady(16); // ��ȹ��� ���� ����
							return false;
						}
					}
				});
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (16) ��ȹ��� ���� ����
				opener.setStatus(parentRowIdx);
				displayReady(16); // ��ȹ���� �غ���� ǥ��
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// ��ȹ��� ������
function convertResult() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var plant_id 	= document.frm.plant_id.value; 		// Ŭ���� ��ư�� ������ PLANT_ID
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB ����
	
	// PLAN_VERSION_LOG ���� ������Ʈ(18) : ��ȹ��� ������ ���� : ����
	// PLAN_VERSION_LOG ���� ������Ʈ(19) : ��ȹ��� ������ ������
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '19', user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (19) ��ȹ��� ������ ������
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[19];
				// ��ȹ��� ������ ����
				controlBoard.callSpConv(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, {
					callback:function(result){
						// ����
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG ���� ������Ʈ(21) : ��ȹ��� ������ �Ϸ�
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '21', user_id, {
								callback:function(result){
									// ����
									if( result == "SUCCESS" ) {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (21) ��ȹ��� ������ �Ϸ�
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[21];
										completePlan(); // ��ȹ���� �Ϸ�(22)
									}
									// ����
									else {
										// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (20) ��ȹ��� ������ ����
										opener.setStatus(parentRowIdx);
										displayReady(20); // ��ȹ��� ������ ����
										return false;
									}
								} // end callback
							});
						}
						// ����
						else {
							// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (20) ��ȹ��� ������ ����
							opener.setStatus(parentRowIdx);
							displayReady(20); // ��ȹ��� ������ ����
							return false;
						}
					}
				});
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ�� : (20) ��ȹ��� ������ ����
				opener.setStatus(parentRowIdx);
				displayReady(20); // ��ȹ��� ������ ����
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// ��ȹ���� �Ϸ�(22)
function completePlan() {
	
	displayReady(22);
	
	var parentRowIdx = document.frm.rowIdx.value; 	// Ŭ���� ��ư�� ���� �ε���
	opener.getVersions(parentRowIdx); 				// �θ�â(control board) �� ������ ���� ���� ǥ��
	
}

// ��ȹ������� BLINK ȿ��
function blinkStat() {
	
	if( areaStat.style.display == "block" ) {
		areaStat.style.display = "none";
	} else {
		areaStat.style.display = "block";
	}
	
}

// ��ȹ������� BLINK ȿ�� ����
// planning �̹��� ����
function displayReady(statusIdx) {
	
	clearInterval(objInterval);
	objInterval = null;
	areaStat.style.display = "block";
	setPlanningImg();
	setPlanBtn();
	areaStat.innerHTML = arrStatus[statusIdx];
	document.frm.status.value = statusIdx.toString();
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	
	// status UPDATE
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, document.frm.status.value, user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
				endIF(); 						// ��ȹ���� ����
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
			}
		}
	});
	
}

// ��ȹ ������ �̹��� ǥ��
function setPlanningImg() {
	
	if( waitArea.style.display == "block" ) {
		waitArea.style.display = "none";
	} else {
		waitArea.style.display = "block";
	}
	
}

// ��ȹ���� ��ư ��Ȱ�� ǥ��
function setPlanBtn() {
	
	// ��ȹ���� ��ư
	if( btnExecPlan.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecPlan\" id=\"btnExecPlan\" value=\" ��ȹ����\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecPlan\" id=\"btnExecPlan\" value=\" ��ȹ����\" onClick=\"execPlan(); \" class=\"btn1_on\">";
	}
	
	/*
	// ��ҹ�ư
	if( btnInitPlan.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnInitPlan\" id=\"btnInitPlan\" value=\" ���\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnInitPlan\" id=\"btnInitPlan\" value=\" ���\" onClick=\"initPlan(); \" class=\"btn1_on\">";
	}
	*/
	
	if( !document.frm.commts.readOnly ) {
		// �޸� disabled
		document.frm.commts.readOnly 	= true;
		document.frm.commts.style.color = "darkgray";
	}
	else {
		// �޸� enabled
		document.frm.commts.readOnly 	= false;
		document.frm.commts.style.color = "black";
	}
	
}

// ���� �ʱ�ȭ
function initPlan() {
	
	clearInterval(objInterval);
	objInterval = null;
	areaStat.style.display = "block";
	//setPlanningImg();
	//setPlanBtn();
	areaStat.innerHTML = arrStatus[4];
	document.frm.status.value = "4";
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	
	// status UPDATE
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, document.frm.status.value, user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
			}
		}
	});
		
}

// �޸�(comment) ����
function saveComment() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// Ŭ���� ��ư�� ���� �ε���
	var cat_id 		= document.frm.cat_id.value; 		// Ŭ���� ��ư�� ������ ��ȹ�ι�
	var sub_cat 	= document.frm.sub_cat.value; 		// Ŭ���� ��ư�� ������ ������ȹ�ι�
	var period_type = document.frm.period_type.value; 	// Ŭ���� ��ư�� ������ ��ȹ�ֱ�
	var run_date 	= document.frm.run_date.value; 		// Ŭ���� ��ư�� ������ ��ȹ������
	var run_seq 	= document.frm.run_seq.value; 		// Ŭ���� ��ư�� ������ ��ȹ�����ϱ��� ����
	var plan_step 	= document.frm.plan_step.value; 	// Ŭ���� ��ư�� ������ CAT_ID - PLANT_ID - VERSION - SEQ �� ���� KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var commts 		= document.frm.commts.value;
	
	// status UPDATE
	controlBoard.setComment(period_type, run_date, run_seq, plan_step, commts, user_id, {
		callback:function(result){
			// ����
			if( result == "SUCCESS" ) {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
			}
			// ����
			else {
				// �θ�â(control board ���� ȭ��)�� ���� ǥ��
				opener.setStatus(parentRowIdx);
			}
		}
	});
	
}

// �޸� ���� üũ
function checkLen(obj) {
	
	var len = obj.value.length;
	if( len > 66 ) {
		alert("�޸��� ���̰� �ʹ� ��ϴ�.(66�� ����)");
		obj.select();
		//obj.value = "";
	}
	
}

// batch ���� �Ϸ�
function endIF() {
	
	var batOption = document.frm.batOption.value;
	if( batOption == 2 ) {
		var rowIdx = document.frm.rowIdx.value;
		if( opener.document.frm.btnConfirm[Number(rowIdx)] ) {
			var objBtn = opener.document.frm.btnConfirm[Number(rowIdx)];
		}
		else {
			var objBtn = opener.document.frm.btnConfirm;
		}
		opener.batOption = batOption;
		opener.focus();
		/* �ϰ� ó�� ��, Ȯ������ �����Ϸ��� �Ʒ� �ּ� ���� */
		//opener.confirmPlan(objBtn);
		window.close();
	}
	
}
