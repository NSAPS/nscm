package com.Nongshim.pis.pu;

import java.rmi.RemoteException;
import java.util.List;

import javax.xml.rpc.ServiceException;

import com.Nongshim.servicePrReqt.model.Purchase;
//import nds.system.util.Tool;


public class PU_MM_mro {
	
	
	/**
	 * 용역/서비스 구매요청 XI연동
	 * @param pr
	 */
	@SuppressWarnings("finally")
	public String XIConnection(List<Purchase> list){
		
		//return 할 구매요청번호
		String message = "";
		String msg_gubn= "";

		//전송하고자 하는 데이터 객체 생성 및 값 입력
		DT_PRMRO request = new DT_PRMRO();
		
		//구조체로 input 값 셋팅
		DT_PRMROSTR IN = new DT_PRMROSTR();
		
		//테이블로 input 값 셋팅
		DT_PRMROROW[]	ROW	= new DT_PRMROROW[list.size()];			//XI에 전달할 객체
		for (int i=0; i<list.size(); i++){
			
			Purchase pr	= (Purchase)list.get(i);

			if (i < 1){
				IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
				IN.setDOCU_TYPE(pr.getDocu_type());	
				
			}
			DT_PRMROROW 	row	= new DT_PRMROROW();						//사용자단에서 넘어온 구매요청 정보를 담을 변수
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//품목번호
			row.setACCT_FIXD(pr.getAcct_fixd());					//계정범주
			row.setPRCH_DOCU_ATCL("0");										//품목범주
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//의뢰플랜트
			row.setREQT_DATE(pr.getReqt_date());					//입고일자
			row.setMATR_CODE(pr.getMatr_code());					//자재코드
			row.setPRCH_DOCU_DETL(pr.getPrch_docu_detl());		//품목내역
			row.setQTY_UNIT(pr.getQty_unit());					//단위
			row.setREQT_QTY(pr.getReqt_qty());					//수량
			row.setCURRENCY(pr.getCurr_key());					//통화키
			row.setPLAN_AMT(pr.getPlan_pric());					//단가
			row.setCUST_CODE(pr.getCust_code());					//추천공급업체
			row.setGL_ACCT(pr.getGl_acct());						//G/L계정
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//코스트센터
			row.setWBS_NO(pr.getWbs_no());						//WBS 번호
			row.setPRCH_GRUP(pr.getPrch_grup());					//구매그룹
			row.setMATR_GRUP(pr.getMatr_grup());					//자재그룹
			row.setDELV_REQT_DATE(pr.getDelv_date());				//납기요구일
			row.setREQT_RESN(pr.getReqt_resn());					//청구사유
			row.setREQT_NAME(pr.getReqt_name());
			row.setREAL_NAME(pr.getReal_emp_name());				//실제요청자
			
			System.out.println("실제요청자test==>"+pr.getReal_emp_name());
			ROW[i] = row;
		}
		
		request.setSTR(IN);
		request.setROW(ROW);
		
		//response 데이터 객체 선언
		DT_PRMRO_response resp_row = new DT_PRMRO_response();
		DT_PRMRO_responseSTR resStr = new DT_PRMRO_responseSTR();
		try {
			resp_row = new OS_PRMROServiceLocator().getOS_PRMROPort().OS_PRMRO(request);
			
			resStr	= resp_row.getSTR();
			message = resStr.getMESSAGE();
			msg_gubn= resStr.getMSG_GUBN();
			
		} catch (RemoteException e) {
			e.printStackTrace();
		} catch (ServiceException  e) {
			e.printStackTrace();
		} finally {
			return msg_gubn + ":" + message;
		}
	}
	
	
	
	@SuppressWarnings("finally")
	public String XIConnection(Purchase pr){
		
		//return 할 구매요청번호
		String message = "";
		String msg_gubn= "";

		//전송하고자 하는 데이터 객체 생성 및 값 입력
		DT_PRMRO request = new DT_PRMRO();
		
		//구조체로 input 값 셋팅
		DT_PRMROSTR IN = new DT_PRMROSTR();
		
		//테이블로 input 값 셋팅
		DT_PRMROROW[]	ROW	= new DT_PRMROROW[1];			//XI에 전달할 객체
		
		
		

			IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
			IN.setDOCU_TYPE(pr.getDocu_type());			
			
			
			DT_PRMROROW 	row	= new DT_PRMROROW();						//사용자단에서 넘어온 구매요청 정보를 담을 변수
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//품목번호
			row.setACCT_FIXD(pr.getAcct_fixd());					//계정범주
			row.setPRCH_DOCU_ATCL("0");										//품목범주
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//의뢰플랜트
			row.setREQT_DATE(pr.getReqt_date());					//입고일자
			row.setMATR_CODE(pr.getMatr_code());					//자재코드
			row.setPRCH_DOCU_DETL(pr.getPrch_docu_detl());		//품목내역
			row.setQTY_UNIT(pr.getQty_unit());					//단위
			row.setREQT_QTY(pr.getReqt_qty());					//수량
			row.setCURRENCY(pr.getCurr_key());					//통화키
			row.setPLAN_AMT(pr.getPlan_pric());					//단가
			row.setCUST_CODE(pr.getCust_code());					//추천공급업체
			row.setGL_ACCT(pr.getGl_acct());						//G/L계정
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//코스트센터
			row.setWBS_NO(pr.getWbs_no());						//WBS 번호
			row.setPRCH_GRUP(pr.getPrch_grup());					//구매그룹
			row.setMATR_GRUP(pr.getMatr_grup());					//자재그룹
			row.setDELV_REQT_DATE(pr.getDelv_date());				//납기요구일
			row.setREQT_RESN(pr.getReqt_resn());					//청구사유
			row.setREQT_NAME(pr.getReqt_name());
			row.setREAL_NAME(pr.getReal_emp_name());				//실제요청자
			
			System.out.println("실제요청자test==>"+pr.getReal_emp_name());
			
			ROW[0] = row;

			
		request.setSTR(IN);
		request.setROW(ROW);
		
		//response 데이터 객체 선언
		DT_PRMRO_response resp_row = new DT_PRMRO_response();
		DT_PRMRO_responseSTR resStr = new DT_PRMRO_responseSTR();
		
		try {
			resp_row = new OS_PRMROServiceLocator().getOS_PRMROPort().OS_PRMRO(request);
			
			resStr	= resp_row.getSTR();
			message = resStr.getMESSAGE();
			msg_gubn= resStr.getMSG_GUBN();
			
		} catch (RemoteException e) {
			e.printStackTrace();
		} catch (ServiceException  e) {
			e.printStackTrace();
		} finally {
			return msg_gubn + ":" + message;
		}
	}

}
