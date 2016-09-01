package com.Nongshim.pis.pu;

import com.Nongshim.servicePrReqt.model.Purchase;
import java.rmi.RemoteException;
import java.util.List;

import javax.xml.rpc.ServiceException;


public class PU_MM_service {
	
	
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
		DT_PRSERVICE request = new DT_PRSERVICE();
		
		//구조체로 input 값 셋팅
		DT_PRSERVICEStr IN = new DT_PRSERVICEStr();
		
		//테이블로 input 값 셋팅
		DT_PRSERVICERow[]	ROW	= new DT_PRSERVICERow[list.size()];			//XI에 전달할 객체
		
		for (int i=0; i<list.size(); i++){
			
			Purchase pr	= (Purchase)list.get(i);

			if (i < 1){
				IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
				System.out.println(" 구매요청번호="+pr.getPrch_reqt_no() );
			}
			
			DT_PRSERVICERow 	row	= new DT_PRSERVICERow();	//사용자단에서 넘어온 구매요청 정보를 담을 변수
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//품목번호
			row.setREQT_DATE(pr.getReqt_date());
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//
			row.setPRCH_DOCU_DETL1(pr.getPrch_docu_detl());		//품목내역1
			row.setREQT_QTY(pr.getReqt_qty());					//수량
			row.setQTY_UNIT("AU");								//단위
			row.setPRCH_DOCU_DETL2(pr.getPrch_docu_detl());		//품목내역2
			row.setPLAN_AMT(pr.getPlan_pric());					//단가
			row.setCURRENCY(pr.getCurr_key());					//통화키
			row.setGL_ACCT(pr.getGl_acct());					//G/L계정pr.getGl_acct()
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//코스트센터pr.getUsed_cost_cntr()
			row.setPRCH_GRUP(pr.getPrch_grup());				//구매그룹
			row.setMATR_GRUP("80000");							//자재그룹
			row.setDELV_REQT_DATE(pr.getDelv_date());			//납기요구일
			row.setREQT_RESN(pr.getReqt_resn());				//청구사유
			row.setCUST_CODE(pr.getCust_code());				//거래처 코드
			row.setREQT_NAME(pr.getReqt_name());
			row.setWBS_NO(pr.getWbs_no());
			row.setACCT_FIXD(pr.getAcct_fixd());
			
			System.out.println(" pr.getWbs_no()="+pr.getWbs_no());
			
			ROW[i] = row;
		}
		
		request.setStr(IN);
		request.setRow(ROW);
		
		//response 데이터 객체 선언
		DT_PRSERVICE_response resp_row = new DT_PRSERVICE_response();
		DT_PRSERVICE_responseSTR resStr = new DT_PRSERVICE_responseSTR();
		
		try {
			resp_row = new OS_PRSERVICEServiceLocator().getOS_PRSERVICEPort().OS_PRSERVICE(request);
			
			resStr 	= resp_row.getSTR();
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
		DT_PRSERVICE request = new DT_PRSERVICE();
		
		//구조체로 input 값 셋팅
		DT_PRSERVICEStr IN = new DT_PRSERVICEStr();
		
		//테이블로 input 값 셋팅
		DT_PRSERVICERow[]	ROW	= new DT_PRSERVICERow[1];			//XI에 전달할 객체
		
		
		

			IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
			
			DT_PRSERVICERow 	row	= new DT_PRSERVICERow();	//사용자단에서 넘어온 구매요청 정보를 담을 변수
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//품목번호
			row.setREQT_DATE(pr.getReqt_date());
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//
			row.setPRCH_DOCU_DETL1(pr.getPrch_docu_detl());		//품목내역1
			row.setREQT_QTY(pr.getReqt_qty());					//수량
			row.setQTY_UNIT("AU");								//단위
			row.setPRCH_DOCU_DETL2(pr.getPrch_docu_detl());		//품목내역2
			row.setPLAN_AMT(pr.getPlan_amt());					//금액
			row.setCURRENCY(pr.getCurr_key());					//통화키
			row.setGL_ACCT(pr.getGl_acct());					//G/L계정pr.getGl_acct()
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//코스트센터pr.getUsed_cost_cntr()
			row.setPRCH_GRUP(pr.getPrch_grup());				//구매그룹
			row.setMATR_GRUP("80000");							//자재그룹
			row.setDELV_REQT_DATE(pr.getDelv_date());			//납기요구일
			row.setREQT_RESN(pr.getReqt_resn());				//청구사유
			row.setCUST_CODE(pr.getCust_code());				//거래처 코드
			row.setREQT_NAME(pr.getReqt_name());
			row.setWBS_NO(pr.getWbs_no());
			
			
			ROW[0] = row;
			
			
		
		request.setStr(IN);
		request.setRow(ROW);
		
		//response 데이터 객체 선언
		DT_PRSERVICE_response resp_row = new DT_PRSERVICE_response();
		DT_PRSERVICE_responseSTR resStr = new DT_PRSERVICE_responseSTR();
		
		try {
			resp_row = new OS_PRSERVICEServiceLocator().getOS_PRSERVICEPort().OS_PRSERVICE(request);
			
			resStr 	= resp_row.getSTR();
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
