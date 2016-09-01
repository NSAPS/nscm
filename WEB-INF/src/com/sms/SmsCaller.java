package com.sms;

import java.rmi.RemoteException;
import javax.xml.rpc.ServiceException;
import	com.sms.*;



public class SmsCaller {

	/**
	 * @param tranPhone		수신자 전화번호
	 * @param tranCallback		송신자 전화번호
	 * @param tranMsg			전송메시지
	 * @param tranEtc1			시스템코드
	 * @param tranEtc2			전송자 사번
	 */
	public static void sendSMS(	String[] tranPhone,
									String	tranCallback,
									String	tranMsg,
									String	tranEtc1,
									String	tranEtc2
														) {
		int rows 	= 	tranPhone.length;
		System.out.println("SMS Service");
		// 연락받을사람 전화번호
		System.out.println(tranPhone[0]);
		// 메세지
		System.out.println(tranMsg);

		//전송하고자 하는 데이터 객체 생성 및 값 입력
		DT_IntraSMS request = new DT_IntraSMS();
		DT_IntraSMSRow[] request_row = new DT_IntraSMSRow[rows];
		
		for(int i=0; i<rows; i++) {
			request_row[i] = new DT_IntraSMSRow();
			request_row[i].setTRAN_PHONE(tranPhone[i]);
		}
		request.setRow(request_row);
		request.setTRAN_CALLBACK(tranCallback);
		request.setTRAN_MSG(tranMsg);
		request.setTRAN_ETC1(tranEtc1);
		request.setTRAN_ETC2(tranEtc2);
		
		
		try {
			//데이터 전송 및 response 데이터 받기
			new OA_IntraSMSServiceLocator().getOA_IntraSMSPort().OA_IntraSMS( request );

		} catch (RemoteException e) {
			e.printStackTrace();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}
}
