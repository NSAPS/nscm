package com.Nongshim.pis.pu;

import com.Nongshim.servicePrReqt.model.Purchase;
import java.rmi.RemoteException;
import java.util.List;

import javax.xml.rpc.ServiceException;


public class PU_MM_service {
	
	
	/**
	 * �뿪/���� ���ſ�û XI����
	 * @param pr
	 */
	@SuppressWarnings("finally")
	public String XIConnection(List<Purchase> list){
		
		//return �� ���ſ�û��ȣ
		String message = "";
		String msg_gubn= "";

		//�����ϰ��� �ϴ� ������ ��ü ���� �� �� �Է�
		DT_PRSERVICE request = new DT_PRSERVICE();
		
		//����ü�� input �� ����
		DT_PRSERVICEStr IN = new DT_PRSERVICEStr();
		
		//���̺�� input �� ����
		DT_PRSERVICERow[]	ROW	= new DT_PRSERVICERow[list.size()];			//XI�� ������ ��ü
		
		for (int i=0; i<list.size(); i++){
			
			Purchase pr	= (Purchase)list.get(i);

			if (i < 1){
				IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
				System.out.println(" ���ſ�û��ȣ="+pr.getPrch_reqt_no() );
			}
			
			DT_PRSERVICERow 	row	= new DT_PRSERVICERow();	//����ڴܿ��� �Ѿ�� ���ſ�û ������ ���� ����
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//ǰ���ȣ
			row.setREQT_DATE(pr.getReqt_date());
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//
			row.setPRCH_DOCU_DETL1(pr.getPrch_docu_detl());		//ǰ�񳻿�1
			row.setREQT_QTY(pr.getReqt_qty());					//����
			row.setQTY_UNIT("AU");								//����
			row.setPRCH_DOCU_DETL2(pr.getPrch_docu_detl());		//ǰ�񳻿�2
			row.setPLAN_AMT(pr.getPlan_pric());					//�ܰ�
			row.setCURRENCY(pr.getCurr_key());					//��ȭŰ
			row.setGL_ACCT(pr.getGl_acct());					//G/L����pr.getGl_acct()
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//�ڽ�Ʈ����pr.getUsed_cost_cntr()
			row.setPRCH_GRUP(pr.getPrch_grup());				//���ű׷�
			row.setMATR_GRUP("80000");							//����׷�
			row.setDELV_REQT_DATE(pr.getDelv_date());			//����䱸��
			row.setREQT_RESN(pr.getReqt_resn());				//û������
			row.setCUST_CODE(pr.getCust_code());				//�ŷ�ó �ڵ�
			row.setREQT_NAME(pr.getReqt_name());
			row.setWBS_NO(pr.getWbs_no());
			row.setACCT_FIXD(pr.getAcct_fixd());
			
			System.out.println(" pr.getWbs_no()="+pr.getWbs_no());
			
			ROW[i] = row;
		}
		
		request.setStr(IN);
		request.setRow(ROW);
		
		//response ������ ��ü ����
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
		
		//return �� ���ſ�û��ȣ
		String message = "";
		String msg_gubn= "";

		//�����ϰ��� �ϴ� ������ ��ü ���� �� �� �Է�
		DT_PRSERVICE request = new DT_PRSERVICE();
		
		//����ü�� input �� ����
		DT_PRSERVICEStr IN = new DT_PRSERVICEStr();
		
		//���̺�� input �� ����
		DT_PRSERVICERow[]	ROW	= new DT_PRSERVICERow[1];			//XI�� ������ ��ü
		
		
		

			IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
			
			DT_PRSERVICERow 	row	= new DT_PRSERVICERow();	//����ڴܿ��� �Ѿ�� ���ſ�û ������ ���� ����
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//ǰ���ȣ
			row.setREQT_DATE(pr.getReqt_date());
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//
			row.setPRCH_DOCU_DETL1(pr.getPrch_docu_detl());		//ǰ�񳻿�1
			row.setREQT_QTY(pr.getReqt_qty());					//����
			row.setQTY_UNIT("AU");								//����
			row.setPRCH_DOCU_DETL2(pr.getPrch_docu_detl());		//ǰ�񳻿�2
			row.setPLAN_AMT(pr.getPlan_amt());					//�ݾ�
			row.setCURRENCY(pr.getCurr_key());					//��ȭŰ
			row.setGL_ACCT(pr.getGl_acct());					//G/L����pr.getGl_acct()
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//�ڽ�Ʈ����pr.getUsed_cost_cntr()
			row.setPRCH_GRUP(pr.getPrch_grup());				//���ű׷�
			row.setMATR_GRUP("80000");							//����׷�
			row.setDELV_REQT_DATE(pr.getDelv_date());			//����䱸��
			row.setREQT_RESN(pr.getReqt_resn());				//û������
			row.setCUST_CODE(pr.getCust_code());				//�ŷ�ó �ڵ�
			row.setREQT_NAME(pr.getReqt_name());
			row.setWBS_NO(pr.getWbs_no());
			
			
			ROW[0] = row;
			
			
		
		request.setStr(IN);
		request.setRow(ROW);
		
		//response ������ ��ü ����
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
