////////////////////////////////////////////////////////////
// 프로그램ID      : md_00010_controlBoardDaily_execIf_pop.js
// 프로그램명      : 일간계획(Contol Board) I/F
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
// 2.0 		  2009-11-10  남웅용	    공장할당 1차 수행시 에러발생 
// 									: 엔진에서는 계획수행이 완료되었는데 엔진상태가 0로 넘어와서 실패로 판정된다
//									예를들어 24, 24, 0으로 엔진상태값이 넘어오면 condition은 3이상이 된다
// 									이때 계획수립 실패로 빠져나가게 된다.
//									의문점) 왜 24(계획수립성공)도 3번이상 상태를 check해야 했나?
//									변경사항 : 1) 24는 한번만 받아도 계획성공으로 인정!
//											   2) 원하지 않는 값인 경우 6번까지 기다림 -> 기존 3번
////////////////////////////////////////////////////////////
var position = 1; // 프로그레스바 현재 위치
var direction = "right"; // 프로그레스바 진행 방향
var curProIdx = 0; // 현재 진행 중인 SP INDEX
var objTimer = null;
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

// 전역변수 초기화
function initValues() {
	
	position = 1; // 프로그레스바 현재 위치
	direction = "right"; // 프로그레스바 진행 방향
	curProIdx = 0; // 현재 진행 중인 SP INDEX
	objTimer = null;
	
}

// 인터페이스 실행
// 1. HORIZON INFO 저장
// 2. PLAN_VERSION_LOG.ORDER_FLAG, SAFETY_FLAG UPDATE
// 3. 인터페이스 진행(function execIFDo() 호출)
function execIF() {
	
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var user_id 	= document.frm._user_id.value;
	var horzn_start = document.frm.horzn_start.value;
	var horzn_end 	= document.frm.horzn_end.value;
	var plan_start 	= document.frm.plan_start.value;
	if( period_type == "DAILY" && cat_id == "RP" ) {
		var order_flag  = document.frm.order_flag.value;
		var safety_flag = document.frm.safety_flag.value;
		var pre_plan_add_flag = document.frm.pre_plan_add_flag.value;
	}
	
	// 일간 수송 계획인 경우
	if( period_type == "DAILY" && cat_id == "RP" ) {
		// 계획구간, 스케줄시작시간 HORIZON_INFO 테이블에 저장
		controlBoard.updateHorizonInfo(period_type, cat_id, user_id, horzn_start, horzn_end, plan_start, {
			callback:function(result){
				// 성공
				if( result == "SUCCESS" ) {
					// 오더/안전재고 반영 옵션 저장
					controlBoard.updateDailyRpOption(period_type, run_date, run_seq, plan_step, order_flag, safety_flag, pre_plan_add_flag, {
						callback:function(result){
							// 성공
							if( result == "SUCCESS" ) {
								execIFDo(); // 인터페이스 진행
							}
							// 실패
							else {
								alert("오더/안전재고 반영 옵션 저장에 실패했습니다.\n\n같은 문제가 반복될 경우 관리자에게 문의하시기 바랍니다.");
							}
						}
					});
				}
				// 실패
				else {
					alert("계획구간, 스케줄시작시간 저장에 실패했습니다.\n\n같은 문제가 반복될 경우 관리자에게 문의하시기 바랍니다.");
				}
			}
		});
	}
	// 일간 수송 계획 이외
	else {
		// 2차 공장할당 I/F 실행시 공장할당 정책 UPDATE
		if( period_type == "DAILY" && cat_id == "FA" ){

			// 비율 or 비용이 선택되었는지 확인한다.
			if(document.all.checkFaCost.checked == false && document.all.checkFaRate.checked == false){
			  	alert("비율 또는 비용을 선택해주십시요! \n 단, 비율로 공장할당을 먼저 수행해야 합니다!");
				return;
			}  

			if( document.frm.faSecondFlag.value == "RATE" ){				
				// 공장할당 정책 비율로 update
				commonUtil.executeQuery("","","plant_alloc_policy_update_rate",{
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// do nothing
						}
						// 실패
						else {
							alert("공장할당 정책 비율 적용 실패!!!");
						}
					}
				});
			}else{
				// 공장할당 정책 비용으로 update
				commonUtil.executeQuery("","","plant_alloc_policy_update_cost",{
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// do nothing
						}
						// 실패
						else {
							alert("공장할당 정책 비용 적용 실패!!!");
						}
					}
				});					
			}
		}
		
		// 계획구간, 스케줄시작시간 HORIZON_INFO 테이블에 저장
		controlBoard.updateHorizonInfo(period_type, cat_id, user_id, horzn_start, horzn_end, plan_start, {
			callback:function(result){
				// 성공
				if( result == "SUCCESS" ) {
					execIFDo(); // 인터페이스 진행
				}
				// 실패
				else {
					alert("계획구간, 스케줄시작시간 저장에 실패했습니다.\n\n같은 문제가 반복될 경우 관리자에게 문의하시기 바랍니다.");
				}
			}
		});
	}
	
}

// 인터페이스 실행 - 인터페이스 진행
// 1. PLAN_VERSION_LOG 상태 업데이트(1), (2)
// 2. 첫번째 라인부터 차례로 SP 호출
// 3. 각 SP 호출 후, SCM_IF_LOG 테이블을 확인하여 수행 중 ERROR 가 발생하지 않으면 다음단계 진행
// 4. ERROR(SP 호출 에러 & SP 수행 중 에러) 가 난 경우, PLAN_VERSION_LOG 상태 업데이트(3) 후, 작업 종료
// 5. 모든 SP 호출이 정상적으로 완료되면 PLAN_VERSION_LOG 상태 업데이트(4) 후 종료
function execIFDo() {
	
	// 전역변수 초기화
	initValues();
	
	// I/F 실행 버튼 비활성 표시 
	setIfBtn();
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var cat_id 		= document.frm.cat_id.value; 		// 클릭한 버튼의 라인의 계획부문
	var sub_cat 	= document.frm.sub_cat.value; 		// 클릭한 버튼의 라인의 하위계획부문
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var user_id 	= document.frm._user_id.value;
	var tabLen 		= main_tbody.rows.length;
	
	// 테이블 색상 DISABLED 로 변경
	disableTable();
	
	// PLAN_VERSION_LOG 상태 업데이트(1) : 인터페이스 시작
	controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '1', user_id, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// 부모창(control board 메인 화면)의 상태 표시 : (1) 인터페이스 시작
				opener.setStatus(parentRowIdx);
				
				// PLAN_VERSION_LOG 상태 업데이트(2) : 인터페이스 진행중
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '2', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (2) 인터페이스 진행중
							opener.setStatus(parentRowIdx);
							callSp();
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F 실행 버튼 활성 표시
							enableTable(); // 테이블 색상 정상상태로 변경
							return false;
						}
					}
				});
			}
			// 실패
			else {
				// PLAN_VERSION_LOG 상태 업데이트(3) : 인터페이스 실패
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '3', user_id, { 
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F 실행 버튼 활성 표시
							enableTable(); // 테이블 색상 정상상태로 변경
							return false;
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
							opener.setStatus(parentRowIdx);
							setIfBtn(); // I/F 실행 버튼 활성 표시
							enableTable(); // 테이블 색상 정상상태로 변경
							return false;
						}
					}
				}); // end DWR
			} // end else
		}
	});
	
}

// SP 호출
function callSp() {

	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	var period_type = document.frm.period_type.value; 	// 클릭한 버튼의 라인의 계획주기
	var run_date 	= document.frm.run_date.value; 		// 클릭한 버튼의 라인의 계획수행일
	var run_seq 	= document.frm.run_seq.value; 		// 클릭한 버튼의 라인의 계획수행일기준 차수
	var plan_step 	= document.frm.plan_step.value; 	// 클릭한 버튼의 라인의 CAT_ID - PLANT_ID - VERSION - SEQ 에 대한 KEY FIELD
	var plant_id 	= document.frm.plant_id.value; 		// 클릭한 버튼의 라인의 PLANT_ID
	var user_id 	= document.frm._user_id.value;
	var tabLen 		= main_tbody.rows.length;
	
	setPro();
	position = 1;
	direction = "right";
	clearTimeout(objTimer);
	displayPro();
	disableTable(); // 테이블 색상 DISABLED 로 변경
	
	if( document.frm.sp_id[0] ) {
		var sp_id = document.frm.sp_id[curProIdx].value;
		areaStatus[curProIdx].innerHTML = "<font color='blue'><b>진행중</b></font>";
	}
	else {
		var sp_id = document.frm.sp_id.value;
		areaStatus.innerHTML = "<font color='blue'><b>진행중</b></font>";
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
					// 성공
					if( document.frm.sp_id[0] ) {
						var sp_id = document.frm.sp_id[curProIdx].value;
						areaStatus[curProIdx].innerHTML = "완료";
					}
					else {
						var sp_id = document.frm.sp_id.value;
						areaStatus.innerHTML = "완료";
					}
					
					setPro();
					curProIdx++;
					if( curProIdx < tabLen ) {
							callSp();
					}
					else {
						// PLAN_VERSION_LOG 상태 업데이트(4) : 인터페이스 완료
						controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '4', user_id, { 
							callback:function(result){
								// 성공
								if( result == "SUCCESS" ) {
									// 부모창(control board 메인 화면)의 상태 표시 : (4) 인터페이스 완료
									opener.setStatus(parentRowIdx);
									setIfBtn(); 	// I/F 실행 버튼 활성 표시
									enableTable(); 	// 테이블 색상 정상상태로 변경
									endIF(); 		// IF 종료
								}
								// 실패
								else {
									// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
									opener.setStatus(parentRowIdx);
									setIfBtn(); // I/F 실행 버튼 활성 표시
									enableTable(); // 테이블 색상 정상상태로 변경
									return false;
								}
							}
						});
					return true;
					}
				}
				else {
					// 실패
					if( document.frm.sp_id[0] ) {
						var sp_id = document.frm.sp_id[curProIdx].value;
						areaStatus[curProIdx].innerHTML = "<font color='red'><b>실패</b></font>";
						alert("인터페이스 진행 중 오류가 발생했습니다.");
					}
					else {
						var sp_id = document.frm.sp_id.value;
						areaStatus.innerHTML = "<font color='red'><b>실패</b></font>";
						alert("인터페이스 진행 중 오류가 발생했습니다.");
					}
					
					// PLAN_VERSION_LOG 상태 업데이트(3) : 인터페이스 실패
					controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '3', user_id, { 
						callback:function(result){
							// 성공
							if( result == "SUCCESS" ) {
								// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
								opener.setStatus(parentRowIdx);
								setIfBtn(); // I/F 실행 버튼 활성 표시
								enableTable(); // 테이블 색상 정상상태로 변경
								setPro();
							}
							// 실패
							else {
								// 부모창(control board 메인 화면)의 상태 표시 : (3) 인터페이스 실패
								opener.setStatus(parentRowIdx);
								setIfBtn(); // I/F 실행 버튼 활성 표시
								enableTable(); // 테이블 색상 정상상태로 변경
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

// I/F 실행 버튼 비활성 표시
function setIfBtn() {
	
	if( btnExecIF.className == "btn1_on" ) {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F 실행\" class=\"btn1_off\" disabled>";
	}
	else {
		areaBtn.innerHTML = " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F 실행\" onClick=\"execIF(); \" class=\"btn1_on\">";
	}
	
}

// 테이블 색상 DISABLED 로 변경
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
	
	// 계획구간 input 창 disabled
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

// 테이블 색상 정상 상태로 변경
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
	
	// 계획구간 input 창 enabled
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

// 부모창(control board 메인 화면)의 상태 표시
// 이 함수는 사용하지 않고, control board 메인 화면에서 PLAN_VERSION_LOG 데이터를 읽어와 상태를 변경하도록 수정 
function setOpenrStatus( status ) {
	
	var parentRowIdx = document.frm.rowIdx.value; // 클릭한 버튼의 라인 인덱스
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

// 프로그레스 바 영역 활성/비활성
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

// 프로그레스 바 표시
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

// batch 실행 완료
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

// 계획수립 상태 깜박임 제어 객체
var objInterval = null;

// 일간 1차 공장할당
function execSch() {
	
	// 계획수립/IF 버튼 비활성 표시 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1차 공장 할당\" class=\"btn3_off\" disabled>"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F 실행\" class=\"btn1_off\" disabled>";
	
	// 계획수립 상태 깜박임
	objInterval = setInterval(blinkStat, 600);
	
	// 계획수립 이미지 표시
	tbMain.style.display = "none";
	waitArea.style.display = "block";
	
	execSchDo();
	
	// 공장할당 정책 비율로 update
	commonUtil.executeQuery("","","plant_alloc_policy_update_rate",{
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// do nothing
			}
			// 실패
			else {
				alert("공장할당 정책 비율 적용 실패!!!");
			}
		}
	});
	
	setTimeout(execSchBatFA, 3000);
	setTimeout(setParentStatus, 10000);
	
}

function setParentStatus() {
	
	var parentRowIdx = document.frm.rowIdx.value; 		// 클릭한 버튼의 라인 인덱스
	opener.setStatus(parentRowIdx);

}

// 서버(SupplyNet) 상태 체크 변수
var statusCondition = false;

// 일간 1차 공장할당 : 스크립트 실행
function execSchDo() {
	
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
	statusCondition = false;
	
	// 계회수립 진행
	controlBoard.execSchedulingBatFA(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				// do nothing
			}
			// 진행중
			else if( result == "CONTINUE" ) {
				// do nothing
			}
			// 실패
			else if( result == "FAIL" ) {
				// do nothing
				opener.setStatus(parentRowIdx);
			}
			// 기타 unexpected status
			else {
				// do nothing
			}
		}
	});
	
}

// 비정상적 상태 반환에 대비한 상태 체크 counting 변수
var condition = 0;

// ENGINE SCHEDULING START
function execSchBatFA() {
	
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
	
	// 계회수립 진행
	controlBoard.execCheckStatusBatFA(engn_ip, period_type, cat_id, pdb_user, {
		callback:function(result){
			// 성공
			if( result == "SUCCESS" ) {
				
/// ver2.0 변경사항 //////////////////////////////////////
//				if( condition < 3 ) {
//					setTimeout(execSchBatFA, 10000);
//					++condition;
//					return;
//				}
//				condition = 0;
/////////////////////////////////////////////////////////	

				// PLAN_VERSION_LOG 상태 업데이트(22) : 계획수립 완료
				controlBoard.updateStat(period_type, run_date, run_seq, plan_step, '22', user_id, {
					callback:function(result){
						// 성공
						if( result == "SUCCESS" ) {
							// 부모창(control board 메인 화면)의 상태 표시 : (22) 계획수립 완료
							opener.setStatus(parentRowIdx);
							opener.getVersions(parentRowIdx);
							completeSch();
						}
						// 실패
						else {
							// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
							opener.setStatus(parentRowIdx);
							failSch(); // 계획수립 실패
							return false;
						}
					} // end callback
				});
			}
			// 진행중
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
			// 실패
			else if( result == "FAIL" ) {
				condition = 0;
				// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
				opener.setStatus(parentRowIdx);
				failSch(); // 계획수립 실패
				return false;
			}
			// 기타 unexpected status
			else {
				// unexpected status 에 대해 세번 더 상태 체크 후, 
				// 같은 문제 반복시, 실패 후 종료
				if( condition < 6 ) {
					++condition;
					setTimeout(execSchBatFA, 5000);
				}
				else {
					// 부모창(control board 메인 화면)의 상태 표시 : (12) 계획수립 실패
					opener.setStatus(parentRowIdx);
					failSch(); // 계획수립 실패
					return false;
				}
			}
		}
	});
	
}

// 계획진행상태 BLINK 효과
function blinkStat() {
	
	if( areaStat.style.display == "block" ) {
		areaStat.style.display = "none";
	} else {
		areaStat.style.display = "block";
	}
	
}

// 1차 공장할당 완료
function completeSch() {
	
	// 계획수립/IF 버튼 비활성 표시 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1차 공장 할당\" onClick=\"execSch(); \" class=\"btn3_on\">"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F 실행\" onClick=\"execIF(); \" class=\"btn1_on\">";
	
	// 계획수립 상태 깜박임 해제
	objInterval = null;
	
	// 계획수립 이미지 표시
	tbMain.style.display = "block";
	waitArea.style.display = "none";
	
}

// 1차 공장할당 실패
function failSch() {
	
	// 계획수립/IF 버튼 비활성 표시 
	areaBtn.innerHTML = " <input type=\"button\" name=\"btnExecSch\" id=\"btnExecSch\" value=\" 1차 공장 할당\" onClick=\"execSch(); \" class=\"btn3_on\">"
					+ " &nbsp; <input type=\"button\" name=\"btnExecIF\" id=\"btnExecIF\" value=\" I/F 실행\" onClick=\"execIF(); \" class=\"btn1_on\">";
	
	// 계획수립 상태 깜박임 해제
	objInterval = null;
	
	// 계획수립 실패 표시
	areaStat.innerHTML = "<font color=\"RED\">1차 공장 할당 계획 수립 실패</font>";
	
}

// 2차 공장할당 checkbox CLICK
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



// 수송계획 차기계획 반영 check -> checkbox값을 hidden data에 반영
function doCheckApplYN(obj){

	if(obj.checked){
			document.frm.pre_plan_add_flag.value = "Y";
	}
	else{
			document.frm.pre_plan_add_flag.value = "N";
	}
}