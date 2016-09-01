////////////////////////////////////////////////////////////
// 프로그램ID      : md_00010_controlBoardDaily_execPlan_pop.js
// 프로그램명      : 일간계획(Contol Board) 실행
// 개발자          : zionex
// 개발일자        : 2008-05-01
//
// 관련 job file   : job_sinc_70_masterData.xml
// 관련 query file : query_sinc_70_masterData.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-05-01  zionex    create
// 2.0 		  2009-10-06  남웅용	공장할당 2차 수행시 에러발생 
// 									: 엔진에서는 계획수행이 완료되었는데 엔진상태가 0로 넘어와서 실패로 판정된다
//									예를들어 24, 24, 0으로 엔진상태값이 넘어오면 condition은 3이상이 된다
// 									이때 계획수립 실패로 빠져나가게 된다.
//									의문점) 왜 24(계획수립성공)도 3번이상 상태를 check해야 했나?
//									변경사항 : 1) 24는 한번만 받아도 계획성공으로 인정!
//											   2) 원하지 않는 값인 경우 6번까지 기다림 -> 기존 3번
// 2.1 		  2009-10-20  남웅용	공장할당 2차 계획정보 로딩중 에러발생
//									supplynet이 상태값을 0로 보내는 경우가 자주 발생한다.
//									따라서 error상태를 체크하는 conditionLD 값을 6으로 함.
//									계획정보 로딩시에도 ver2.0과 같은 유형 수정
// 2.2		  2010-04-13  남웅용 공장할당 2차시에 계획정보 로딩후 계획실행이 진행안됨.
//								따라서 성공에 대한 상태를 3번정도 확인후 계획실행이 될 수 있도록 수정
//
// 2.3		  2010-05-25  남웅용 VER 2.2 변경후에도 재발함. 따라서 계획정보 로딩후 계획수립시작 후에
//								계획실행도 SUCCESS상태에 3번이상 확인할 때까지 계속 실행하도록 수정 
//
// 2.4		  2012-04-27  남웅용 현재 공장할당 수행시 발생문제 및 변경
//				1) 몇주간 계획로딩실패 계속 발생
//                                 : FAIL의 경우도 에러재시도 할 수 있도록 변경
//                                 : 에러체크는 기존 6번에서 20번까지로 수정(테스트중 0로 리턴되는것 5번 연속경우 확인)
//                              2) 가끔 계획로딩후 엔진실행 없이 계획저장 진행
//								   : 엔진실행을 6번까지 재시도, 에러체크는 20번
//                                   --> 로직상 발생경우 추적 안됨.
// 								 	
////////////////////////////////////////////////////////////
var objInterval = null;
var objSchInterval = null;

var arrStatus = new Array(15);
arrStatus = [
	/* ====================================== */
	/* 0. */  ""
	/* ====================================== */
	/* 1. */, "인터페이스 시작"
	/* 2. */, "인터페이스 진행중"
	/* 3. */, "인터페이스 오류"
	/* 4. */, "인터페이스 완료"
	/* ====================================== */
	/* 5. */, "계획수립 시작"
	/* 6. */, "계획정보 로딩 시작"
	/* 7. */, "계획정보 로딩중"
	/* 8. */, "계획정보 로딩 실패"
	/* 9. */, "계획정보 로딩 완료"
	/* ------------------------------ */
	/* 10.*/, "스케줄링 시작"
	/* 11.*/, "계획수립 진행중"
	/* 12.*/, "계획수립 실패"
	/* 13.*/, "스케줄링 완료"
	/* ------------------------------ */
	/* 14.*/, "계획결과 저장 시작"
	/* 15.*/, "계획결과 저장 진행중"
	/* 16.*/, "계획결과 저장 실패"
	/* 17.*/, "계획결과 저장 완료"
	/* ------------------------------ */
	/* 18.*/, "계획결과 컨버젼 시작"
	/* 19.*/, "계획결과 컨버젼 진행중"
	/* 20.*/, "계획결과 컨버젼 실패"
	/* 21.*/, "계획결과 컨버젼 완료"
	/* ------------------------------ */
	/* 22.*/, "계획수립 완료"
	/* ====================================== */
	/* 23.*/, "계획확정"
	/* ====================================== */
	/* 24.*/, "ERP 전송 시작"
	/* 25.*/, "ERP 전송 진행중"
	/* 26.*/, "ERP 전송 실패"
	/* 27.*/, "ERP 전송 완료"
	/* ====================================== */
]

// 계획수립 버튼 클릭
function execPlan() {
	
	// 계획수립 버튼 비활성 표시 
	setPlanBtn();
	
	setPlanningImg(); // 계획수립 이미지 표시
	objInterval = setInterval(blinkStat, 600); // 계획수립 상태 깜박임
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	
	// 메모 (COMMENT) 저장
	saveComment();
	
	// PLAN_VERSION_LOG 상태 업데이트(5) : 계획수립 시작
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '5', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (5) 계획수립 시작
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[5];
				
				// PLAN_VERSION_LOG 상태 업데이트(6) : 계획정보 로딩 시작
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '6', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (6) 계획정보 로딩 시작
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[6];
							execSchLoad(); // 계획수립 정보 로딩 시작
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
							opener.setStatus(parentRowIdx);
							displayReady(8); // 계획수립 준비상태 표시
							return false;
						}
					}
				});
			}
			// 실패
			else {
				opener.setStatus(parentRowIdx);
				displayReady(8); // 계획수립 준비상태 표시
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// ENGINE DATA LOADING START
function execSchLoad() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// PLAN_VERSION_LOG 상태 업데이트(7) : 계획정보 로딩중
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '7', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (7) 계획정보 로딩중
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[7];
	
				//if( period_type == "DAILY" && cat_id == "FA" ) {
				if( cat_id == "FA" ) {
					execSchLoadFA();
					return;
				}
				
				controlBoard.execSchLoad(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG 상태 업데이트(9) : 계획정보 로딩 완료
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '9', user_id, {
								callback:function(result){
									// 성공
									if( result == "SUCCESS" ) {
										// 부모창(control board 메인 화면)의 상태 표시 : (9) 계획정보 로딩 완료
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[9];
										execScheduling(); // 계획수립
									}
									// 실패
									else {
										// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
										opener.setStatus(parentRowIdx);
										displayReady(8); // 계획수립 준비상태 표시
										return false;
									}
								} // end callback
							});
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
							opener.setStatus(parentRowIdx);
							displayReady(8); // 계획수립 준비상태 표시
							return false;
						}
					}
				});
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
				opener.setStatus(parentRowIdx);
				displayReady(8); // 계획수립 준비상태 표시
				return false;
			}
		} // end callback
	}); // end DWR
	
}

var conditionLD = 0;
var condition_SUCCESS = 0;
// ENGINE DATA LOADING START
function execSchLoadFA() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// 로딩 진행
	controlBoard.execSchLoad(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				
/// ver2.1 변경사항 //////////////////////////////////////
//				if( conditionLD < 3 ) {
//					setTimeout(execSchLoadFA, 10000);
//					++conditionLD;
//					return;
//				}
//				conditionLD = 0;
/////////////////////////////////////////////////////////		
// ver2.2 변경사항 //////////////////////////////////////
				if( condition_SUCCESS < 3 ) {
					setTimeout(execSchLoadFA, 10000);
					++condition_SUCCESS;
					return;
				}
				condition_SUCCESS = 0;
/////////////////////////////////////////////////////////		
				
				// PLAN_VERSION_LOG 상태 업데이트(9) : 계획정보 로딩 완료
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '9', user_id, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (9) 계획정보 로딩 완료
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[9];
							execScheduling(); // 계획수립
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
							opener.setStatus(parentRowIdx);
							displayReady(8); // 계획정보 로딩 실패
							return false;
						}
					} // end callback
				});
			}
			// 진행중
			else if( result == "CONTINUE" ) {
				conditionLD = 0;
				setTimeout(execSchLoadFA, 10000);
			}
			// 실패
			else if( result == "FAIL" ) {
				// unexpected status 에 대해 세번 더 상태 체크 후, 
				// 같은 문제 반복시, 실패 후 종료
				if( conditionLD < 20 ) {
					++conditionLD;
					setTimeout(execSchLoadFA, 5000);
				}
				else
				{
					// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
					opener.setStatus(parentRowIdx);
					displayReady(8); // 계획정보 로딩 실패
					return false;
				}
			}
			// 기타 unexpected status
			else {
				// unexpected status 에 대해 세번 더 상태 체크 후, 
				// 같은 문제 반복시, 실패 후 종료
				if( conditionLD < 20 ) {
					++conditionLD;
					setTimeout(execSchLoadFA, 5000);
				}
				else {
					// 부모창(control board 메인 화면)의 상태 표시 : (8) 계획정보 로딩 실패
					opener.setStatus(parentRowIdx);
					displayReady(8); // 계획수립 실패
					return false;
				}
			}
		}
	});
	
}

// ENGINE SCHEDULING START
function execScheduling() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// PLAN_VERSION_LOG 상태 업데이트(10) : 스케줄링 시작 : 생략
	// PLAN_VERSION_LOG 상태 업데이트(11) : 계획수립 진행중
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '11', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (11) 계획수립 진행중
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[11];
	
				//if( period_type == "DAILY" && cat_id == "FA" ) {
				if( cat_id == "FA" ) {
					execSchedulingFA();
					return;
				}
				
				// 계회수립 진행
				controlBoard.execScheduling(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							
							clearInterval(objSchInterval);
							objSchInterval = null;
							
							// PLAN_VERSION_LOG 상태 업데이트(13) : 스케줄링 완료
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '13', user_id, {
								callback:function(result){
									// 성공
									if( result == "SUCCESS" ) {
										// 부모창(control board 메인 화면)의 상태 표시 : (13) 스케줄링 완료
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[13];
										execSchSave(); // 계수립결과 저장
									}
									// 실패
									else {
										// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
										opener.setStatus(parentRowIdx);
										displayReady(12); // 계획수립 준비상태 표시
										return false;
									}
								} // end callback
							});
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
							opener.setStatus(parentRowIdx);
							displayReady(12); // 계획수립 실패
							return false;
						}
					}
				});
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
				opener.setStatus(parentRowIdx);
				displayReady(12); // 계획수립 준비상태 표시
				return false;
			}
		} // end callback
	}); // end DWR
	
}

var condition = 0;
var condition_SUCCESS2 = 0;
// ENGINE SCHEDULING START
function execSchedulingFA() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// 계획수립 진행
	controlBoard.execScheduling(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				
/// ver2.0 변경사항 //////////////////////////////////////
//				if( condition < 3 ) {
//					setTimeout(execSchedulingFA, 10000);
//					++condition;
//					return;
//				}
//				condition = 0;
/////////////////////////////////////////////////////////				
// ver2.3 변경사항 //////////////////////////////////////
				if( condition_SUCCESS2 < 6 ) {
					setTimeout(execSchedulingFA, 10000);
					++condition_SUCCESS2;
					return;
				}
				condition_SUCCESS2 = 0;
/////////////////////////////////////////////////////////		
				
				// PLAN_VERSION_LOG 상태 업데이트(13) : 스케줄링 완료
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '13', user_id, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (13) 스케줄링 완료
							opener.setStatus(parentRowIdx);
							areaStat.innerHTML = arrStatus[13];
							execSchSave(); // 계수립결과 저장
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
							opener.setStatus(parentRowIdx);
							displayReady(12); // 계획수립 준비상태 표시
							return false;
						}
					} // end callback
				});
			}
			// 진행중
			else if( result == "CONTINUE" ) {
				condition = 0;
				setTimeout(execSchedulingFA, 10000);
			}
			// 실패
			else if( result == "FAIL" ) {
				// unexpected status 에 대해 세번 더 상태 체크 후, 
				// 같은 문제 반복시, 실패 후 종료
				if( condition < 20 ) {
					++condition;
					setTimeout(execSchedulingFA, 5000);
				}
				else {
					// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
					opener.setStatus(parentRowIdx);
					displayReady(12); // 계획수립 실패
					return false;
				}
			}
			// 기타 unexpected status
			else {
				// unexpected status 에 대해 세번 더 상태 체크 후, 
				// 같은 문제 반복시, 실패 후 종료
				if( condition < 20 ) {
					++condition;
					setTimeout(execSchedulingFA, 5000);
				}
				else {
					// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
					opener.setStatus(parentRowIdx);
					displayReady(12); // 계획수립 실패
					return false;
				}
			}
		}
	});
	
}

// ENGINE SAVING RESULT START
function execSchSave() {
	
	document.frm.status.value = "14"; // 계획 결과 저장 시작
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// PLAN_VERSION_LOG 상태 업데이트(14) : 계획결과 저장 시작 : 생략
	// PLAN_VERSION_LOG 상태 업데이트(15) : 계획결과 저장 진행중
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '15', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (15) 계획결과 저장 진행중
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[15];
				// 계획결과 저장 진행
				controlBoard.execSchSave(engn_ip, period_type, cat_id, pdb_user, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG 상태 업데이트(17) : 계획결과 저장 완료
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '17', user_id, {
								callback:function(result){
									// 성공
									if( result == "SUCCESS" ) {
										// 부모창(control board 메인 화면)의 상태 표시 : (17) 계획결과 저장 완료
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[17];
										convertResult(); // 계획결과 컨버전
									}
									// 실패
									else {
										// 부모창(control board 메인 화면)의 상태 표시 : (16) 계획결과 저장 실패
										opener.setStatus(parentRowIdx);
										displayReady(16); // 계획수립 준비상태 표시
										return false;
									}
								} // end callback
							});
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (16) 계획결과 저장 실패
							opener.setStatus(parentRowIdx);
							displayReady(16); // 계획결과 저장 실패
							return false;
						}
					}
				});
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시 : (16) 계획결과 저장 실패
				opener.setStatus(parentRowIdx);
				displayReady(16); // 계획수립 준비상태 표시
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// 계획결과 컨버전
function convertResult() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id.value; 		// 클릭한 버튼의 라인의 PLANT_ID
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var pdb_user 	= document.frm.pdb_user.value; 		// PDB 계정
	
	// PLAN_VERSION_LOG 상태 업데이트(18) : 계획결과 컨버젼 시작 : 생략
	// PLAN_VERSION_LOG 상태 업데이트(19) : 계획결과 컨버젼 진행중
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '19', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (19) 계획결과 컨버젼 진행중
				opener.setStatus(parentRowIdx);
				areaStat.innerHTML = arrStatus[19];
				// 계획결과 컨버젼 진행
				controlBoard.callSpConv(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// PLAN_VERSION_LOG 상태 업데이트(21) : 계획결과 컨버젼 완료
							controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '21', user_id, {
								callback:function(result){
									// 성공
									if( result == "SUCCESS" ) {
										// 부모창(control board 메인 화면)의 상태 표시 : (21) 계획결과 컨버젼 완료
										opener.setStatus(parentRowIdx);
										areaStat.innerHTML = arrStatus[21];
										completePlan(); // 계획수립 완료(22)
									}
									// 실패
									else {
										// 부모창(control board 메인 화면)의 상태 표시 : (20) 계획결과 컨버젼 실패
										opener.setStatus(parentRowIdx);
										displayReady(20); // 계획결과 컨버젼 실패
										return false;
									}
								} // end callback
							});
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (20) 계획결과 컨버젼 실패
							opener.setStatus(parentRowIdx);
							displayReady(20); // 계획결과 컨버젼 실패
							return false;
						}
					}
				});
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시 : (20) 계획결과 컨버젼 실패
				opener.setStatus(parentRowIdx);
				displayReady(20); // 계획결과 컨버젼 실패
				return false;
			}
		} // end callback
	}); // end DWR
	
}

// 계획수립 완료(22)
function completePlan() {
	
	displayReady(22);
	
	var parentRowIdx = document.frm.rowIdx.value; 	// 클릭한 버튼의 라인 인덱스
	opener.getVersions(parentRowIdx); 				// 부모창(control board) 에 생성된 버전 정보 표시
	
}

// 계획진행상태 BLINK 효과
function blinkStat() {
	
	if( areaStat.style.display == "block" ) {
		areaStat.style.display = "none";
	} else {
		areaStat.style.display = "block";
	}
	
}

// 계획진행상태 BLINK 효과 해제
// planning 이미지 숨김
function displayReady(statusIdx) {
	
	clearInterval(objInterval);
	objInterval = null;
	areaStat.style.display = "block";
	setPlanningImg();
	setPlanBtn();
	areaStat.innerHTML = arrStatus[statusIdx];
	document.frm.status.value = statusIdx.toString();
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	
	// status UPDATE
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, document.frm.status.value, user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
				endIF(); 						// 계획수립 종료
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
			}
		}
	});
	
}

// 계획 진행중 이미지 표시
function setPlanningImg() {
	
	if( waitArea.style.display == "block" ) {
		waitArea.style.display = "none";
	} else {
		waitArea.style.display = "block";
	}
	
}

// 계획수립 버튼 비활성 표시
function setPlanBtn() {
	
	// 계획수립 버튼
	if( btnExecPlan.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecPlan\" id=\"btnExecPlan\" value=\" 계획수립\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecPlan\" id=\"btnExecPlan\" value=\" 계획수립\" onClick=\"execPlan(); \" class=\"btn1_on\">";
	}
	
	/*
	// 취소버튼
	if( btnInitPlan.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnInitPlan\" id=\"btnInitPlan\" value=\" 취소\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnInitPlan\" id=\"btnInitPlan\" value=\" 취소\" onClick=\"initPlan(); \" class=\"btn1_on\">";
	}
	*/
	
	if( !document.frm.commts.readOnly ) {
		// 메모 disabled
		document.frm.commts.readOnly 	= true;
		document.frm.commts.style.color = "darkgray";
	}
	else {
		// 메모 enabled
		document.frm.commts.readOnly 	= false;
		document.frm.commts.style.color = "black";
	}
	
}

// 상태 초기화
function initPlan() {
	
	clearInterval(objInterval);
	objInterval = null;
	areaStat.style.display = "block";
	//setPlanningImg();
	//setPlanBtn();
	areaStat.innerHTML = arrStatus[4];
	document.frm.status.value = "4";
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	
	// status UPDATE
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, document.frm.status.value, user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
			}
		}
	});
		
}

// 메모(comment) 저장
function saveComment() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var engn_ip 	= document.frm.engn_ip.value;
	var commts 		= document.frm.commts.value;
	
	// status UPDATE
	controlBoard.setComment(period_type, run_date, run_seq, plan_step, commts, user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
			}
			// 실패
			else {
				// 부모창(control board 메인 화면)의 상태 표시
				opener.setStatus(parentRowIdx);
			}
		}
	});
	
}

// 메모 길이 체크
function checkLen(obj) {
	
	var len = obj.value.length;
	if( len > 66 ) {
		alert("메모의 길이가 너무 깁니다.(66자 이하)");
		obj.select();
		//obj.value = "";
	}
	
}

// batch 실행 완료
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
		/* 일괄 처리 시, 확정까지 진행하려면 아래 주석 해제 */
		//opener.confirmPlan(objBtn);
		window.close();
	}
	
}
