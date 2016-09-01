package com.sms;

import java.rmi.RemoteException;
import javax.xml.rpc.ServiceException;
import	com.sms.*;



public class SmsCaller {

	/**
	 * @param tranPhone		������ ��ȭ��ȣ
	 * @param tranCallback		�۽��� ��ȭ��ȣ
	 * @param tranMsg			���۸޽���
	 * @param tranEtc1			�ý����ڵ�
	 * @param tranEtc2			������ ���
	 */
	public static void sendSMS(	String[] tranPhone,
									String	tranCallback,
									String	tranMsg,
									String	tranEtc1,
									String	tranEtc2
														) {
		int rows 	= 	tranPhone.length;
		System.out.println("SMS Service");
		// ����������� ��ȭ��ȣ
		System.out.println(tranPhone[0]);
		// �޼���
		System.out.println(tranMsg);

		//�����ϰ��� �ϴ� ������ ��ü ���� �� �� �Է�
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
			//������ ���� �� response ������ �ޱ�
			new OA_IntraSMSServiceLocator().getOA_IntraSMSPort().OA_IntraSMS( request );

		} catch (RemoteException e) {
			e.printStackTrace();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}
}
