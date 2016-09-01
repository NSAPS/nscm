package com.Nongshim.pis.pu;

import java.rmi.RemoteException;
import java.util.List;

import javax.xml.rpc.ServiceException;

import com.Nongshim.servicePrReqt.model.Purchase;
//import nds.system.util.Tool;


public class PU_MM_mro {
	
	
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
		DT_PRMRO request = new DT_PRMRO();
		
		//����ü�� input �� ����
		DT_PRMROSTR IN = new DT_PRMROSTR();
		
		//���̺�� input �� ����
		DT_PRMROROW[]	ROW	= new DT_PRMROROW[list.size()];			//XI�� ������ ��ü
		for (int i=0; i<list.size(); i++){
			
			Purchase pr	= (Purchase)list.get(i);

			if (i < 1){
				IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
				IN.setDOCU_TYPE(pr.getDocu_type());	
				
			}
			DT_PRMROROW 	row	= new DT_PRMROROW();						//����ڴܿ��� �Ѿ�� ���ſ�û ������ ���� ����
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//ǰ���ȣ
			row.setACCT_FIXD(pr.getAcct_fixd());					//��������
			row.setPRCH_DOCU_ATCL("0");										//ǰ�����
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//�Ƿ��÷�Ʈ
			row.setREQT_DATE(pr.getReqt_date());					//�԰�����
			row.setMATR_CODE(pr.getMatr_code());					//�����ڵ�
			row.setPRCH_DOCU_DETL(pr.getPrch_docu_detl());		//ǰ�񳻿�
			row.setQTY_UNIT(pr.getQty_unit());					//����
			row.setREQT_QTY(pr.getReqt_qty());					//����
			row.setCURRENCY(pr.getCurr_key());					//��ȭŰ
			row.setPLAN_AMT(pr.getPlan_pric());					//�ܰ�
			row.setCUST_CODE(pr.getCust_code());					//��õ���޾�ü
			row.setGL_ACCT(pr.getGl_acct());						//G/L����
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//�ڽ�Ʈ����
			row.setWBS_NO(pr.getWbs_no());						//WBS ��ȣ
			row.setPRCH_GRUP(pr.getPrch_grup());					//���ű׷�
			row.setMATR_GRUP(pr.getMatr_grup());					//����׷�
			row.setDELV_REQT_DATE(pr.getDelv_date());				//����䱸��
			row.setREQT_RESN(pr.getReqt_resn());					//û������
			row.setREQT_NAME(pr.getReqt_name());
			row.setREAL_NAME(pr.getReal_emp_name());				//������û��
			
			System.out.println("������û��test==>"+pr.getReal_emp_name());
			ROW[i] = row;
		}
		
		request.setSTR(IN);
		request.setROW(ROW);
		
		//response ������ ��ü ����
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
		
		//return �� ���ſ�û��ȣ
		String message = "";
		String msg_gubn= "";

		//�����ϰ��� �ϴ� ������ ��ü ���� �� �� �Է�
		DT_PRMRO request = new DT_PRMRO();
		
		//����ü�� input �� ����
		DT_PRMROSTR IN = new DT_PRMROSTR();
		
		//���̺�� input �� ����
		DT_PRMROROW[]	ROW	= new DT_PRMROROW[1];			//XI�� ������ ��ü
		
		
		

			IN.setPRCH_REQT_NO(pr.getPrch_reqt_no());
			IN.setDOCU_TYPE(pr.getDocu_type());			
			
			
			DT_PRMROROW 	row	= new DT_PRMROROW();						//����ڴܿ��� �Ѿ�� ���ſ�û ������ ���� ����
			row.setPRCH_REQT_SEQ(pr.getReqt_seq());				//ǰ���ȣ
			row.setACCT_FIXD(pr.getAcct_fixd());					//��������
			row.setPRCH_DOCU_ATCL("0");										//ǰ�����
			row.setREQT_SITE_CODE(pr.getReqt_site_code());		//�Ƿ��÷�Ʈ
			row.setREQT_DATE(pr.getReqt_date());					//�԰�����
			row.setMATR_CODE(pr.getMatr_code());					//�����ڵ�
			row.setPRCH_DOCU_DETL(pr.getPrch_docu_detl());		//ǰ�񳻿�
			row.setQTY_UNIT(pr.getQty_unit());					//����
			row.setREQT_QTY(pr.getReqt_qty());					//����
			row.setCURRENCY(pr.getCurr_key());					//��ȭŰ
			row.setPLAN_AMT(pr.getPlan_pric());					//�ܰ�
			row.setCUST_CODE(pr.getCust_code());					//��õ���޾�ü
			row.setGL_ACCT(pr.getGl_acct());						//G/L����
			row.setUSED_COST_CNTR(pr.getUsed_cost_cntr());		//�ڽ�Ʈ����
			row.setWBS_NO(pr.getWbs_no());						//WBS ��ȣ
			row.setPRCH_GRUP(pr.getPrch_grup());					//���ű׷�
			row.setMATR_GRUP(pr.getMatr_grup());					//����׷�
			row.setDELV_REQT_DATE(pr.getDelv_date());				//����䱸��
			row.setREQT_RESN(pr.getReqt_resn());					//û������
			row.setREQT_NAME(pr.getReqt_name());
			row.setREAL_NAME(pr.getReal_emp_name());				//������û��
			
			System.out.println("������û��test==>"+pr.getReal_emp_name());
			
			ROW[0] = row;

			
		request.setSTR(IN);
		request.setROW(ROW);
		
		//response ������ ��ü ����
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
