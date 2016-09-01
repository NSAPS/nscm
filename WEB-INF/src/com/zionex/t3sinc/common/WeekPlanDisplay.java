
package com.zionex.t3sinc.common;

//import com.zionex.ctp.bapi.CreatFunction;

import com.sap.mw.jco.*;
import java.util.ArrayList;

/**
* @author P.S.W
* http://www.zionex.com
*/
public class WeekPlanDisplay  extends Object {
	JCO.Client mConnection;
	JCO.Repository mRepository;	
	
	public WeekPlanDisplay() {
	    // nothing
	}
	
	public WeekPlanDisplay(JCO.Client mConnection) {
		this.mConnection = mConnection;
		mRepository = new JCO.Repository("Techwin", mConnection);
	}
	
	public ArrayList getWeekPlanDisplay(String orderType,String custom,
										  String salesMan,String startDate,
										  String endDate,String orgCode,
										  String chnCode,String salesDocNum,
										  String productGroup, String searchType){
		
		JCO.Function function;
		//JCO.Structure I_BAPI_VIEW ;
		JCO.Field CHK;
		JCO.Table ARBPL,KTEXT,MATNR,MAKTX,VKORG,VTWEG,VBELN,SPART ;
		
		CreatFunction crtFnc = new CreatFunction(mRepository);
		
		try {			
			function = crtFnc.createFunction("ZPP_WEEK_PLAN_DISPLAY");
			if (function == null) {
				System.out.println("ZPP_WEEK_PLAN_DISPLAY  not found in SAP.");
				return null;
			}
			
/* =========== data input ====================================================*/			
			CHK = function.getImportParameterList().getField("CHK");
			
			ARBPL = function.getTableParameterList().getTable("ARBPL");
			KTEXT = function.getTableParameterList().getTable("KTEXT");
			MATNR = function.getTableParameterList().getTable("MATNR");
			MAKTX = function.getTableParameterList().getTable("MAKTX");
			VKORG = function.getTableParameterList().getTable("VKORG");
			VTWEG = function.getTableParameterList().getTable("VTWEG");
			VBELN = function.getTableParameterList().getTable("VBELN");
			SPART = function.getTableParameterList().getTable("SPART");
			
			//CHK.setValue("1");
            CHK.setValue(searchType);
			
			if((orderType!=null)&&(!orderType.equalsIgnoreCase(""))) {
				ARBPL.appendRow();								
				ARBPL.setValue(orderType,"LOW");	//���� ����
				System.out.println("order type="+orderType);
			}
			
			if((custom!=null)&&(!custom.equalsIgnoreCase(""))){
				KTEXT.appendRow();			
				KTEXT.setValue(custom,"LOW");		//�ŷ���
				System.out.println("customer="+custom);
			}
			
			if((salesMan!=null)&&(!salesMan.equalsIgnoreCase(""))){
				MATNR.appendRow();			
				MATNR.setValue(salesMan,"LOW");		//���� ���
				System.out.println("salesMna="+salesMan);
			}
			
			if((salesMan!=null)&&(!salesMan.equalsIgnoreCase(""))){
				MAKTX.appendRow();			
				MAKTX.setValue(salesMan,"LOW");		//���� ���
				System.out.println("salesMna="+salesMan);
			}
			
			if((orgCode !=null)&&(!orgCode.equalsIgnoreCase(""))){					
				VKORG.appendRow();
				VKORG.setValue(orgCode,"LOW");		//���� ����
				System.out.println("���� ����="+orgCode);
			}
			
			if((chnCode !=null)&&(!chnCode.equalsIgnoreCase(""))){
				VTWEG.appendRow();
				VTWEG.setValue(chnCode,"LOW");		//���� ���
				System.out.println("channel="+chnCode);
			}
			if((productGroup !=null)&&(!productGroup.equalsIgnoreCase(""))){
				SPART.appendRow();
				SPART.setValue(productGroup,"LOW");		//��ǰ��				
			}	
			
			if((salesDocNum != null)&&(!salesDocNum.equalsIgnoreCase(""))){
				VBELN.appendRow();
               // VBELN.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                //VBELN.setValue("CP", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
				VBELN.setValue(salesDocNum, "LOW");
				System.out.println("salesDocNum="+salesDocNum);
			}
				
			mConnection.execute(function);		// ����

			JCO.Table returnTable = function.getTableParameterList().getTable("SDHEADER");
			ArrayList salesOrderList = new ArrayList();
			
			for(int i=0; i < returnTable.getNumRows();i++){		//��� ��
				returnTable.setRow(i);
				ArrayList tmpList = new ArrayList();			
				// ����!%!���ſ���!%!��!%!����!%!����Ÿ��!%!�ݾ�!%!��ȭ
				tmpList.add(returnTable.getString("DOC_NUMBER"));	 // ���� ��ȣ
                tmpList.add(returnTable.getString("PURCH_NO"));      // ���� ����
				tmpList.add(returnTable.getString("SOLD_TO"));		 // ��
				tmpList.add(returnTable.getString("ORDERER_NA"));	 //	�� ��
				tmpList.add(returnTable.getString("DOC_TYPE"));		 //	���� Ÿ��
				tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(returnTable.getString("SEAR_PRPR")));	 // �ݾ�
				tmpList.add(returnTable.getString("CURRENCY"));      // ��ȭ
				
				salesOrderList.add(tmpList);
			}
			
			System.out.println("Sales order List.size="+ salesOrderList.size());
            System.out.println("Sales order List="+ salesOrderList.toString());
			return salesOrderList;
						
		}catch (Exception ex){
			ex.printStackTrace();
			return null;
		}	
	}
}