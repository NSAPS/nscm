
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
				ARBPL.setValue(orderType,"LOW");	//오더 유형
				System.out.println("order type="+orderType);
			}
			
			if((custom!=null)&&(!custom.equalsIgnoreCase(""))){
				KTEXT.appendRow();			
				KTEXT.setValue(custom,"LOW");		//거래선
				System.out.println("customer="+custom);
			}
			
			if((salesMan!=null)&&(!salesMan.equalsIgnoreCase(""))){
				MATNR.appendRow();			
				MATNR.setValue(salesMan,"LOW");		//영업 사원
				System.out.println("salesMna="+salesMan);
			}
			
			if((salesMan!=null)&&(!salesMan.equalsIgnoreCase(""))){
				MAKTX.appendRow();			
				MAKTX.setValue(salesMan,"LOW");		//영업 사원
				System.out.println("salesMna="+salesMan);
			}
			
			if((orgCode !=null)&&(!orgCode.equalsIgnoreCase(""))){					
				VKORG.appendRow();
				VKORG.setValue(orgCode,"LOW");		//영업 조직
				System.out.println("영업 조직="+orgCode);
			}
			
			if((chnCode !=null)&&(!chnCode.equalsIgnoreCase(""))){
				VTWEG.appendRow();
				VTWEG.setValue(chnCode,"LOW");		//유통 경로
				System.out.println("channel="+chnCode);
			}
			if((productGroup !=null)&&(!productGroup.equalsIgnoreCase(""))){
				SPART.appendRow();
				SPART.setValue(productGroup,"LOW");		//제품군				
			}	
			
			if((salesDocNum != null)&&(!salesDocNum.equalsIgnoreCase(""))){
				VBELN.appendRow();
               // VBELN.setValue("I", "SIGN"); // SIGN : I=포함(Include), E=제외(Exclude)
                //VBELN.setValue("CP", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
				VBELN.setValue(salesDocNum, "LOW");
				System.out.println("salesDocNum="+salesDocNum);
			}
				
			mConnection.execute(function);		// 실행

			JCO.Table returnTable = function.getTableParameterList().getTable("SDHEADER");
			ArrayList salesOrderList = new ArrayList();
			
			for(int i=0; i < returnTable.getNumRows();i++){		//결과 값
				returnTable.setRow(i);
				ArrayList tmpList = new ArrayList();			
				// 오더!%!구매오더!%!고객!%!고객명!%!오더타입!%!금액!%!통화
				tmpList.add(returnTable.getString("DOC_NUMBER"));	 // 오더 번호
                tmpList.add(returnTable.getString("PURCH_NO"));      // 구매 오더
				tmpList.add(returnTable.getString("SOLD_TO"));		 // 고객
				tmpList.add(returnTable.getString("ORDERER_NA"));	 //	고객 명
				tmpList.add(returnTable.getString("DOC_TYPE"));		 //	오더 타입
				tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(returnTable.getString("SEAR_PRPR")));	 // 금액
				tmpList.add(returnTable.getString("CURRENCY"));      // 통화
				
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