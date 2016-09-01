
/** 상태정의 : ARRAY INDEX 가 상태, ARRAY 내용이 DISPLAY 내용
	======================================
	0.  최초는 NULL
	======================================
	1.  인터페이스 시작
	2.  인터페이스 진행중
	3.  인터페이스 오류
	4.  인터페이스 완료
	======================================
	5.  계획수립 시작
	------------------------------
	6.  계획정보 로딩 시작
	7.  계획정보 로딩중
	8.  계획정보 로딩 실패
	9.  계획정보 로딩 완료
	------------------------------
	10. 스케줄링 시작(실제 엔진 구동)
	11. 계획수립 진행중
	12. 계획수립 실패
	13. 스케줄링 완료
	------------------------------
	14. 계획결과 저장 시작
	15. 계획결과 저장 진행중
	16. 계획결과 저장 실패
	17. 계획결과 저장 완료
	------------------------------
	18. 계획결과 컨버젼 시작
	19. 계획결과 컨버젼 진행중
	20. 계획결과 컨버젼 실패
	21. 계획결과 컨버젼 완료
	------------------------------
	22. 계획수립 완료
	======================================
	23. 계획확정
	======================================
	24. ERP 전송 시작
	25. ERP 전송 진행중
	26. ERP 전송 실패
	27. ERP 전송 완료
	======================================
*/
var statusComplete 	= 23; // 완료 상태
var arrStatus 		= new Array(15);
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

// RADIO 버튼 클릭
function checkPlan(objRadio) {
	
	// 라디오 버튼이 체크된 경우만 수행
	if( objRadio.checked == false ) {
		return;
	}
	
	var rowIdx = objRadio.parentNode.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	
	if( rowIdx == 0 ) {
		// 판매계획 선택
		document.frm.radioVal[rowIdx].value = "1";
	}
	else {
		// PLAN_VERSION_LOG 에 없는 데이터는 새로 생성
		
		// plan_step 값으로 판단 : 존재하지 않으면 PLAN_VERSION_LOG 에 데이터 없음
		if( document.frm.cat_id[rowIdx] ) {
			var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
			var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
			var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
			var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
			var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
			var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
			var user_id 	= document.frm._user_id.value;
			var objPlanStep = document.frm.plan_step[rowIdx];
		} else {
			var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
			var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
			var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
			var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
			var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
			var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
			var user_id 	= document.frm._user_id.value;
			var objPlanStep = document.frm.plan_step;
		}
		
		if( plan_step == "" || plan_step == null ) {
			controlBoard.createPlanRec(period_type, run_date, run_seq, plan_step, cat_id, sub_cat, user_id, { 
				callback:function(result){
					// 새로운 계획 레코드 생성 성공
					if( result == "SUCCESS" ) {
						// 생성된 plan_step 값 가져오기
						controlBoard.getMaxPlanStep(period_type, run_date, run_seq, {
							callback:function(result){
								// 값 찾아오기 실패
								if( result == null || result == "" ) {
									objRadio.checked = false;
									setDisable();
									return false;
								}
								// 값 찾아오기 성공
								else {
									objPlanStep.value = result.trim();
								}
							}
						});
					}
					// 동시에 다른 사용자가 다른 화면에서 같은 데이터를 생성한 경우 화면 다시 읽기
					else if( result == "REFRESH" ) {
						GoSearch(document.frm._moon_service.value);
					}
					// 새로운 계획 레코드 생성 실패
					else {
						objRadio.checked = false;
						setDisable();
						return false;
					}
					setLineStatus(rowIdx); // 라인 상태 설정
				}
			});
		}
		
		// 이전 계획단계가 완료된 경우만 진행 가능
		/*
		// 이전 계획단계의 시작~끝 rowIdx 찾기
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
		
		// 이전 계획단계의 각 공장별 모든 계획이 확정 상태인지 체크
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
		
		// 이전 계획단계의 각 공장별 모든 계획이 확정 상태이면, 진행가능
		if( condition ) {
			// 현재 선택한 라인 이외의 모든 라인을 비활성 상태로 표시하기 위해 체크 구분자 설정
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
			// 원래 체크되어 있던 radio 버튼을 찾아 체크 상태로 표시
			checkPre();
		}
		*/
	}
	
	// 현재 선택한 라인 이외의 모든 라인을 비활성 상태로 표시
	setDisable();
	
}

// 원래 체크되어 있던 radio 버튼을 찾아 체크 상태로 표시
function checkPre() {
	
	var tabLen = left_tbody.rows.length;
	for( var i = 0; i < tabLen; i++ ) {
		if( document.frm.radioVal[i].value == "1" ) {
			document.frm.selPlan[i].checked = true;
		}
	}
	
}

// 비활성 표시
function setDisable() {
	
	var tabLen = left_tbody.rows.length;
	var status = null;
	//alert(tabLen);return;
	for( var i = 0; i < tabLen; i++ ) {
		// staus == "" 이면 0
		if( document.frm.status[i].value == null || document.frm.status[i].value == "" ) {
			status = 0;
		}
		else {
			status = Number(document.frm.status[i].value);
		}
		
		// 비활성 모드
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
		// 활성 모드
		else {
			left_tr[i].childNodes(1).style.color = "#000000";
			left_tr[i].childNodes(2).style.color = "#000000";
			main_tr[i].childNodes(0).style.color = "#000000";
			main_tr[i].childNodes(1).style.color = "#000000";
			
			// 기준정보 확인은 항상 활성
			document.frm.btnBasic[i].disabled = false;
			
			// 판매계획(SP)의 경우 기준정보 확인만 활성화
			if( document.frm.cat_id[i].value != "SP" ) {
				// IF 진행 가능 : 0 3 4 8 12 16 20 22
				if( status == 0 || status == 3 || status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnIF[i].disabled = false;
				} else {
					document.frm.btnIF[i].disabled = true;
				}
				
				// IF 보기 가능 : 3~27
				if( status >= 3 && status <= 27 ) {
					document.frm.btnViewIF[i].disabled = false;
				} else {
					document.frm.btnViewIF[i].disabled = true;
				}
				
				// 계획수립 진행 가능 : 4 8 12 16 20 22
				if( status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnPlan[i].disabled = false;
				} else {
					document.frm.btnPlan[i].disabled = true;
				}
				
				// 계획수립 보기 가능 : 8 12 16 20 22~27
				if( status == 8 || status == 12 || status == 16 || status == 20 || (status >= 22 && status <= 27) ) {
					document.frm.btnViewPlan[i].disabled = false;
				} else {
					document.frm.btnViewPlan[i].disabled = true;
				}
				
				// 확정 가능 : 22
				if( status == 22 ) {
					document.frm.btnConfirm[i].disabled = false;
				} else {
					document.frm.btnConfirm[i].disabled = true;
				}
				
				// 취소 가능 : 8 12 16 20 22
				if( status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
					document.frm.btnCancel[i].disabled = false;
				} else {
					document.frm.btnCancel[i].disabled = true;
				}
				
				// 추가 가능 : 22 23 26 27
				if( status == 22 || status == 23 || status == 26 || status == 27 ) {
					document.frm.btnAdd[i].disabled = false;
				} else {
					document.frm.btnAdd[i].disabled = true;
				}
				
				// ERP 전송 가능 : 23 26
				if( status == 23 || status == 26 ) {
					document.frm.btnToErp[i].disabled = false;
				} else {
					document.frm.btnToErp[i].disabled = true;
				}
				
				// ERP 보기 가능 : 26 27
				if( status == 26 || status == 27 ) {
					document.frm.btnViewToErp[i].disabled = false;
				} else {
					document.frm.btnViewToErp[i].disabled = true;
				}
			} // end if 판매계획 여부
		} // end else 활성 모드
	} // end for
	
}

// 라인 상태 변경
function setLineStatus(rowIdx) {
	
	var status = document.frm.status[rowIdx].value;
	
	// IF 진행 가능 : 0 3 4 8 12 16 20 22
	if( status == 0 || status == 3 || status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnIF[rowIdx].disabled = false;
	} else {
		document.frm.btnIF[rowIdx].disabled = true;
	}
	
	// IF 보기 가능 : 3~27
	if( status >= 3 && status <= 27 ) {
		document.frm.btnViewIF[rowIdx].disabled = false;
	} else {
		document.frm.btnViewIF[rowIdx].disabled = true;
	}
	
	// 계획수립 진행 가능 : 4 8 12 16 20 22 
	if( status == 4 || status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnPlan[rowIdx].disabled = false;
	} else {
		document.frm.btnPlan[rowIdx].disabled = true;
	}
	
	// 계획수립 보기 가능 : 8 12 16 20 22~27
	if( status == 8 || status == 12 || status == 16 || status == 20 || (status >= 22 && status <= 27) ) {
		document.frm.btnViewPlan[rowIdx].disabled = false;
	} else {
		document.frm.btnViewPlan[rowIdx].disabled = true;
	}
	
	// 확정 가능 : 22
	if( status == 22 ) {
		document.frm.btnConfirm[rowIdx].disabled = false;
	} else {
		document.frm.btnConfirm[rowIdx].disabled = true;
	}
	
	// 취소 가능 : 8 12 16 20 22
	if( status == 8 || status == 12 || status == 16 || status == 20 || status == 22 ) {
		document.frm.btnCancel[rowIdx].disabled = false;
	} else {
		document.frm.btnCancel[rowIdx].disabled = true;
	}
	
	// 추가 가능 : 22 23 26 27
	if( status == 22 || status == 23 || status == 26 || status == 27 ) {
		document.frm.btnAdd[rowIdx].disabled = false;
	} else {
		document.frm.btnAdd[rowIdx].disabled = true;
	}
	
	// ERP 전송 가능 : 23 26
	if( status == 23 || status == 26 ) {
		document.frm.btnToErp[rowIdx].disabled = false;
	} else {
		document.frm.btnToErp[rowIdx].disabled = true;
	}
	
	// ERP 보기 가능 : 26 27
	if( status == 26 || status == 27 ) {
		document.frm.btnViewToErp[rowIdx].disabled = false;
	} else {
		document.frm.btnViewToErp[rowIdx].disabled = true;
	}
	
}

// 기준정보 보기 버튼 클릭
function viewBasic( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // 클릭한 버튼의 라인 인덱스
	var cat_id = document.frm.cat_id[rowIdx].value; 	// 클릭한 버튼의 라인의 계획구분
	
	// CODE_MST 에 각 계획부문별 기준정보를 확인할 화면들을 'DP_' + CAT_ID + '_MD' 의 코드그룹으로 저장
	cat_id = "MP_" + cat_id + "_MD"; // MP : MONTHLY PLAN, MD : MASTER DATA
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_masterData_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&rowIdx=" + rowIdx; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=300, height=200, top=0, left=0";
	var newWin = window.open(service_url, "MD_POP", pop_win_style); // master data pop
	newWin.focus();
	
}

var execIFWin = null;
// I/F 진행 버튼 클릭
function execIF( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	
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
// I/F 보기 버튼 클릭
function viewIF( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	
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
// 계획수립 진행 버튼 클릭
function execPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	
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
// 계획수립 보기 버튼 클릭
function viewPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	
	var service_url = "service.do?_moon_service=md_00010_controlBoardDaily_viewPlan_pop&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&cat_id=" + cat_id + "&sub_cat=" + sub_cat + "&rowIdx=" + rowIdx; 
	service_url += "&period_type=" + period_type + "&run_date=" + run_date + "&run_seq=" + run_seq + "&plan_step=" + plan_step;
	service_url += "&plant_id=" + plant_id;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=600, height=400, top=0, left=0";
	viewPlanWin = window.open(service_url, "VIEW_PLAN", pop_win_style);
	viewPlanWin.focus();
	
}

// 확정 버튼 클릭
function confirmPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	var versions 	= document.frm.versions[rowIdx].value; 		// 클릭한 버튼의 라인의 수립된 계획버전
	var user_id 	= document.frm._user_id.value;
	
	// 일괄 계획 수립인 경우, confirm skip
	if( batOption != 2 ) {
		// 계획 확정
		if( !confirm(cat_id + "의 " + versions + " 버전을 확정합니다!!\n\n확정한 계획은 취소할 수 없습니다!!") ) {
			return;
		}
	}
	
	// PLAN_VERSION_LOG 상태 업데이트(23) : 계획확정
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '23', user_id, { 
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				setStatus(rowIdx);
				setLineStatus(rowIdx); // 라인 상태 변경
				// 일괄 계획 수립인 경우 확정 후, ERP 전송 진행
				/*
				if( batOption == 2 ) {
					execIFErp(document.frm.btnToErp[rowIdx]);
				}
				*/
			}
			// 실패
			else {
				setStatus(rowIdx);
				setLineStatus(rowIdx); // 라인 상태 변경
			}
		}
	});
	
}

// 취소 버튼 클릭
function cancelPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획구분
	var versions 	= document.frm.versions[rowIdx].value; 		// 클릭한 버튼의 라인의 수립된 계획버전
	
	alert(cat_id + "의 " + versions + " 버전을 취소합니다!!");
	// 버전삭제
	document.frm.versions[rowIdx].value = "";
	areaVer[rowIdx].innerHTML = "";
	// I/F 완료 상태로 변경
	document.frm.status[rowIdx].value = 4;
	areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
	
	setLineStatus(rowIdx); // 라인 상태 변경
	
}

// 추가 버튼 클릭
function addPlan( objBtn ) {
	
	var rowIdx 		= objBtn.parentNode.parentNode.rowIndex; 	// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
	var cat_seq 	= document.frm.cat_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문순번
	var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	var versions 	= document.frm.versions[rowIdx].value; 		// 클릭한 버튼의 라인의 수립된 계획버전
	var version 	= document.frm.version[rowIdx].value; 		// 클릭한 버튼의 라인의 수립된 계획 버전
	var seq 		= document.frm.seq[rowIdx].value; 			// 클릭한 버튼의 라인의 수립된 계획 SEQ
	var user_id 	= document.frm._user_id.value;
	
	// 같은 sub_cat 에 대해 plan_step 이 더 높은 계획이 있는 지 확인하여 추가를 불가하게 함
	var tabLen = left_tbody.rows.length;
	if( rowIdx + 1 < tabLen ) {
		var next_cat_id = document.frm.cat_id[rowIdx + 1].value;
		var next_sub_cat = document.frm.sub_cat[rowIdx + 1].value;
		if( cat_id == next_cat_id && sub_cat == next_sub_cat ) {
			alert("같은 계획부문에 대해 더 높은 차수의 계획이 생성되어 있으므로 여기서 새로운 계획을 추가할 수 없습니다.");
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
	
	var oCell0  = oRowLeft.insertCell(); // 선택
	var oCell1  = oRowLeft.insertCell(); // 계획부문
	var oCell2  = oRowLeft.insertCell(); // 공장
	
	var oCell3  = oRowMain.insertCell(); // 버전
	var oCell4  = oRowMain.insertCell(); // 상태
	var oCell5  = oRowMain.insertCell(); // 기준정보
	var oCell6  = oRowMain.insertCell(); // I/F
	var oCell7  = oRowMain.insertCell(); // 계획수립
	var oCell8  = oRowMain.insertCell(); // 확정
	var oCell9  = oRowMain.insertCell(); // ERP 전송
	var oCell10 = oRowMain.insertCell(); // 일괄
	
	oCell0.align  = "center"; oCell0.width  = "30px" ; // 선택
	oCell1.align  = "center"; oCell1.width  = "140px"; // 계획부문
	oCell2.align  = "center"; oCell2.width  = "80px" ; // 공장
	
	oCell3.align  = "center"; oCell3.width  = "120px"; // 버전
	oCell4.align  = "center"; oCell4.width  = "150px"; // 상태
	oCell5.align  = "center"; oCell5.width  = "50px" ; // 기준정보
	oCell6.align  = "center"; oCell6.width  = "90px" ; // I/F
	oCell7.align  = "center"; oCell7.width  = "90px" ; // 계획수립
	oCell8.align  = "center"; oCell8.width  = "120px"; // 확정
	oCell9.align  = "center"; oCell9.width  = "90px" ; // ERP 전송
	oCell10.align = "center"; oCell10.width = "90px" ; oCell10.className = "right"; // 일괄
	
	// 선택
	oCell0.innerHTML = "<input type=\"radio\" name=\"selPlan\" onClick=\"checkPlan(this); \"> "
						+ "<input type=\"hidden\" name=\"radioVal\"> "
						+ "<input type=\"hidden\" name=\"period_type\" value=\"" + period_type + "\"> "
						+ "<input type=\"hidden\" name=\"run_date\" value=\"" + run_date + "\"> "
						+ "<input type=\"hidden\" name=\"run_seq\" value=\"" + run_seq + "\"> "
						+ "<input type=\"hidden\" name=\"plan_step\" > "
						+ "<input type=\"hidden\" name=\"cat_seq\" value=\"" + cat_seq + "\"> "
						+ "<input type=\"hidden\" name=\"sub_cat\" value=\"" + sub_cat + "\"> ";
	// 계획부문
	oCell1.innerHTML = " <input type=\"hidden\" name=\"cat_id\" value=\"" + cat_id + "\"> ";
	// 공장
	oCell2.innerHTML = " <input type=\"hidden\" name=\"plant_id\" value=\"" + plant_id + "\"> ";
	// 버전
	oCell3.innerHTML = "<a id=\"areaVer\"> - </a> "
						+ "<input type=\"hidden\" name=\"versions\"> "
						+ "<input type=\"hidden\" name=\"version\"> "
						+ "<input type=\"hidden\" name=\"seq\"> ";
	// 상태
	oCell4.innerHTML = "<a id=\"areaStat\"></a> "
						+ "<input type=\"hidden\" name=\"status\"> "
	// 기준정보
	oCell5.innerHTML = "<input name=\"btnBasic\" type=\"button\" value=\"확인\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewBasic(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// I/F
	oCell6.innerHTML = "<input name=\"btnIF\" type=\"button\" value=\"진행\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execIF(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewIF\" type=\"button\" value=\"보기\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewIF(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 계획수립
	oCell7.innerHTML = "<input name=\"btnPlan\" type=\"button\" value=\"진행\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewPlan\" type=\"button\" value=\"보기\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 확정
	oCell8.innerHTML = "<input name=\"btnConfirm\" type=\"button\" value=\"확정\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); confirmPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnCancel\" type=\"button\" value=\"취소\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"cancelPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnAdd\" type=\"button\" value=\"추가\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"addPlan(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// ERP 전송
	oCell9.innerHTML = "<input name=\"btnToErp\" type=\"button\" value=\"진행\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"initBatOpt(); execIFErp(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> "
						+ "<input name=\"btnViewToErp\" type=\"button\" value=\"보기\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"viewIFErp(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 일괄
	oCell10.innerHTML = "<input name=\"btnBatch\" type=\"button\" value=\"진행\" class=\"button1_1\" "
						+ "style=\"width:30px; text-align:center; font-weight:bold; \" onClick=\"execBatch(this); \" "
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\"> ";
	
	document.recalc();
	
	// =================================================================================================================================
	controlBoard.createPlanRec(period_type, run_date, run_seq, "", cat_id, sub_cat, user_id, { 
		callback:function(result){
			// 새로운 계획 레코드 생성 성공
			if( result == "SUCCESS" ) {
				// 생성된 plan_step 값 가져오기
				controlBoard.getMaxPlanStep(period_type, run_date, run_seq, {
					callback:function(result){
						// 값 찾아오기 실패
						if( result == null || result == "" ) {
							document.frm.selPlan[rowIdx+1].checked = false;
							setDisable();
							return false;
						}
						// 값 찾아오기 성공
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
			// 동시에 다른 사용자가 다른 화면에서 같은 데이터를 생성한 경우 화면 다시 읽기
			else if( result == "REFRESH" ) {
				GoSearch(document.frm._moon_service.value);
			}
			// 새로운 계획 레코드 생성 실패
			else {
				document.frm.selPlan[rowIdx+1].checked = false;
				setDisable();
				return false;
			}
			//setLineStatus(rowIdx+1); // 라인 상태 설정
		}
	});
	// =================================================================================================================================
	
}

// ERP전송 진행 버튼 클릭
function execIFErp( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // 클릭한 버튼의 라인 인덱스
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var plant_id 	= document.frm.plant_id[rowIdx].value;
		var user_id 	= document.frm._user_id.value;
		var versions 	= document.frm.versions[rowIdx].value;
		var version 	= document.frm.version[rowIdx].value;
		var seq 		= document.frm.seq[rowIdx].value;
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var plant_id 	= document.frm.plant_id.value;
		var user_id 	= document.frm._user_id.value;
		var versions 	= document.frm.versions.value;
		var version 	= document.frm.version.value;
		var seq 		= document.frm.seq.value;
	}
	
	objBtn.className = "button1_1";
	
	if( cat_id == "PS" || cat_id == "SS" ) {
		// PLAN_VERSION_LOG 상태 업데이트(25) : ERP 전송 진행중
		controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '25', user_id, { 
			callback:function(result){
				// 성공
				if( result == "SUCCESS" ) {
					// 상태 표시 : (25) ERP 전송 진행중
					setStatus(rowIdx);
					setLineStatus(rowIdx); // 라인 상태 변경
					// SP CALL : META to LEGACY
					//callSp(sp_id, period_type, run_date, run_seq, plan_step, plant_id, rowIdx, user_id);
					callSpToLegacy(period_type, cat_id, sub_cat, run_date, run_seq, plan_step, plant_id, rowIdx, user_id);
				}
				// 실패
				else {
					// 부모창(control board 메인 화면)의 상태 표시 : (26) ERP 전송 실패
					controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, {
						callback:function(result){
							// 성공
							if( result == "SUCCESS" ) {
								// 상태 표시 : (26) ERP 전송 실패
								setStatus(rowIdx);
								setLineStatus(rowIdx); // 라인 상태 변경
							}
							// 실패
							else {
								// 상태 표시 : (26) ERP 전송 실패
								setStatus(rowIdx);
								setLineStatus(rowIdx); // 라인 상태 변경
							}
						}
					});
				}
			}
		});
	}
	else if( cat_id == "FA" ) {
		alert("공장할당계획은 여기서 ERP 전송을 진행할 수 없습니다.");
	}
	else if( cat_id == "RP" ) {
		alert("수송계획을 ERP 전송하기 위해 수송전표발행 화면으로 이동합니다.");
		// trans_date 생성
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
		// ERP 전송 시작
		document.frm.status[rowIdx].value = 24;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		// ERP 전송 진행중
		document.frm.status[rowIdx].value = 25;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		alert(cat_id + "의 " + versions + " 버전을 ERP 로 전송합니다.");
		// ERP 전송 완료
		document.frm.status[rowIdx].value = 27;
		areaStat[rowIdx].innerHTML = arrStatus[Number(document.frm.status[rowIdx].value)];
		
		setLineStatus(rowIdx); // 라인 상태 변경
	}
	
}

// SP CALL
function callSp(sp_id, period_type, run_date, run_seq, plan_step, plant_id, rowIdx, user_id) {
	
	controlBoard.callSP(sp_id, period_type, run_date, run_seq, plan_step, plant_id, { 
		callback:function(result){
			// SP CALL 성공
			if( result == "SUCCESS" ) {
				// STATUS UPDATE
				// PLAN_VERSION_LOG 상태 업데이트(27) : ERP 전송 완료
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '27', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 상태 표시 : (27) ERP 전송 완료
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
						// 실패
						else {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
					}
				});
			}
			// SP CALL 실패
			else {
				// STATUS UPDATE
				// PLAN_VERSION_LOG 상태 업데이트(26) : ERP 전송 실패
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
						// 실패
						else {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
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
			// SP CALL 성공
			if( result == "SUCCESS" ) {
				// STATUS UPDATE
				// PLAN_VERSION_LOG 상태 업데이트(27) : ERP 전송 완료
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '27', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 상태 표시 : (27) ERP 전송 완료
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
						// 실패
						else {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
					}
				});
			}
			// SP CALL 실패
			else {
				// STATUS UPDATE
				// PLAN_VERSION_LOG 상태 업데이트(26) : ERP 전송 실패
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '26', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
						// 실패
						else {
							// 상태 표시 : (26) ERP 전송 실패
							setStatus(rowIdx);
							setLineStatus(rowIdx); // 라인 상태 변경
						}
					}
				});
			}
		}
	});
	
}

var viewIFErpWin = null;
// ERP전송 보기 버튼 클릭
function viewIFErp( objBtn ) {
	
	var rowIdx = objBtn.parentNode.parentNode.rowIndex; // 클릭한 버튼의 라인 인덱스
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var plant_id 	= document.frm.plant_id[rowIdx].value; 		// 클릭한 버튼의 라인의 PLANT_ID
	}
	else {
		var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var plant_id 	= document.frm.plant_id.value; 		// 클릭한 버튼의 라인의 PLANT_ID
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

// PLAN_VERSION_LOG 테이블을 읽어서 상태 표시
function setStatus( rowIdx ) {
	
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	}
	
	controlBoard.getStat(period_type, run_date, run_seq, plan_step, { 
		callback:function(result){
			// 상태 불러오기 실패
			if( result == null || result == "" ) {
				// do nothing...
			}
			// 상태 불러오기 성공
			else {
				if( document.frm.status[rowIdx] ) {
					document.frm.status[rowIdx].value = result;
					areaStat[rowIdx].innerHTML = arrStatus[Number(result)];
				} else {
					document.frm.status.value = result;
					areaStat.innerHTML = arrStatus[Number(result)];
				}
			}
			setLineStatus(rowIdx); // 라인 상태 설정
		}
	});
	
}

// 계획수립 완료 후, PLAN_VERSION_LOG 테이블 읽어서 VERSION, SEQ 가져오기
function getVersions( rowIdx ) {
	
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	} else {
		var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	}
	
	controlBoard.getVersions(period_type, run_date, run_seq, plan_step, { 
		callback:function(result){
			// 버전 불러오기 실패
			if( result.length == 0 || result == null ) {
				// do nothing...
			}
			// 버전 불러오기 성공
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
			setLineStatus(rowIdx); // 라인 상태 설정
		}
	});
	
}

// 계회구간 버전선택
function setPeriodVer(ver) {
	
	document.frm.run_date_sel.value = ver.split(" - ")[0];
	document.frm.run_seq_sel.value = ver.split(" - ")[1];
	
}

// 계회구간 차수(RUN_SEQ) 증가
function increaseRunSeq() {
	
	var run_date = document.frm.run_date_sel.value;
	var run_seq = document.frm.run_seq_sel.value;
	if( run_date == "" || run_date == null || run_seq == "" || run_seq == null ) {
		alert("계회구간 버전을 먼저 선택하세요.");
		return;
	}
	document.frm.run_seq_sel.value = Number(run_seq)+1;
	var service = "md_00010_controlBoardDaily_addRunSeq_comp";
	GoSave(service);
	
}

// 상태 설정 레이어 위치정보 저장 변수
var leftVal = null;
var topVal = null;

// 상태 설정 레이어 보임/숨김
function displayStatus(objTd, e){
	
	// 값 설정
	var rowIdx = objTd.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	if( document.frm.cat_id[rowIdx] ) {
		var cat_id 		= document.frm.cat_id[rowIdx].value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat[rowIdx].value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type[rowIdx].value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq[rowIdx].value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step[rowIdx].value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var status 		= document.frm.status[rowIdx].value; 		// 클릭한 버튼의 라인의 상태
	}
	else {
		var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
		var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
		var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
		var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
		var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
		var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
		var status 		= document.frm.status.value; 		// 클릭한 버튼의 라인의 상태
	}
	
	// PLAN_STEP 값이 없는 경우 아무 동작 하지 않음
	if( plan_step == "" || plan_step == null ) {
		return;
	}
	
	// 설정 영역 보이기/감추기
	if( divStatus.style.display == "BLOCK" || divStatus.style.display == "block" ) {
		// div 숨김
		divStatus.style.display = "none";
		// 상태 설정 KEY 변수 초기화
		document.frm.period_type_c.value = "";
		document.frm.run_date_c.value 	 = "";
		document.frm.run_seq_c.value 	 = "";
		document.frm.plan_step_c.value 	 = "";
	} else {
		// div 보임
		divStatus.style.overflow = "";
		divStatus.style.display = "block";
		leftVal = e.clientX;
		topVal  = e.clientY;
		divStatus.style.left = leftVal;
		divStatus.style.top  = topVal;
		divStatus.focus();
		// 상태 설정 KEY 변수 설정
		document.frm.period_type_c.value = period_type;
		document.frm.run_date_c.value 	 = run_date;
		document.frm.run_seq_c.value 	 = run_seq;
		document.frm.plan_step_c.value 	 = plan_step;
	}
	
}

// 상태 설정 레이어 숨김
function hideStatDiv(objDiv, e) {
	
	if( e.clientX >= (leftVal + 2) && e.clientX <= (leftVal + 228) 
		&& e.clientY >= (topVal + 2) && e.clientY <= (topVal + 98) ) {
		// nothing
	}
	else {
		objDiv.style.display = 'none';
	} 

}

// 설정 상태 선택 라디오 버튼 클릭
function setSelStatus(objRadio) {
	
	document.frm.sel_status.value = objRadio.value;
	
}

// 상태 설정
function setStat() {
	
	var service = "md_00010_controlBoardDaily_setStatus_comp";
	GoSave(service);
	
}

// 일괄진행 option
// 1 : normal
// 2 : batch
var batOption = 1;
// 계획 일괄 진행
function execBatch(objBtn) {
	
	batOption = 2;
	execIF(objBtn);
	
}

// batOption 1 로 초기화
function initBatOpt() {
	
	batOption = 1;
	
}
