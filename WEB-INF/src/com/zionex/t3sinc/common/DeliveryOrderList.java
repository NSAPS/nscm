
package com.zionex.t3sinc.common;

import com.zionex.t3sinc.common.CreatFunction;

import com.sap.mw.jco.*;
import java.util.ArrayList;

/**
* @author P.S.W
* http://www.zionex.com
*/
public class DeliveryOrderList extends Object {
	JCO.Client mConnection;
	JCO.Repository mRepository;	
	
	public DeliveryOrderList() {
	    // nothing
	}
	
	public DeliveryOrderList(JCO.Client mConnection) {
		this.mConnection = mConnection;
		mRepository = new JCO.Repository("Techwin", mConnection);
	}
	
	public ArrayList getOrderList(String sdate, String edate, String kunnr, String matnr
	                                                                                                , String salesOrder, String matnrC, String purchaseOrder){
		
	    ArrayList arrayList = new ArrayList();
	    
	    JCO.Function function;
		//JCO.Structure I_BAPI_VIEW ;
		//JCO.Field CHK;
		JCO.Table R_DLVDT, R_PERNR, R_KUNNR, R_MATNR, R_VBELN, R_CUST_MAT, R_PO_NO, ORD_TAB, DLV_TAB;
		
		CreatFunction crtFnc = new CreatFunction(mRepository);
		
		try {			
			function = crtFnc.createFunction("Z_1Z_BAPI_SD_ORDER_DLV_SCH");
			if (function == null) {
				System.out.println("Z_1Z_BAPI_SD_ORDER_DLV_SCH  not found in SAP.");
				return null;
			}
			
/* =========== data input ====================================================*/			
			
			R_DLVDT = function.getTableParameterList().getTable("R_DLVDT"); // ���Ͽ�����
			R_PERNR = function.getTableParameterList().getTable("R_PERNR"); // ��������ڻ��
			R_KUNNR = function.getTableParameterList().getTable("R_KUNNR"); // ���ڵ�
			R_MATNR = function.getTableParameterList().getTable("R_MATNR"); // ��ǰ�ڵ�
			R_VBELN = function.getTableParameterList().getTable("R_VBELN"); // �������ֿ���
			R_CUST_MAT = function.getTableParameterList().getTable("R_CUST_MAT"); // �������ڵ�
			R_PO_NO = function.getTableParameterList().getTable("R_PO_NO"); // �����ſ�����ȣ
			ORD_TAB = function.getTableParameterList().getTable("ORD_TAB"); // ���ϰ�ȹ ���� - ���ֿ��� ITEM����
			DLV_TAB = function.getTableParameterList().getTable("DLV_TAB"); // ���ϰ�ȹ ���� - ��ǰ���� ����
			
			// ���Ͽ�����
			if(((sdate!=null)&&(!sdate.equalsIgnoreCase("")))
                    ||((edate!=null)&&(!edate.equalsIgnoreCase("")))){
			    R_DLVDT.appendRow(); 
                R_DLVDT.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_DLVDT.setValue("BT", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
				System.out.println("sdate ~ edate : " + sdate + " ~ " + edate);
			}
            if((sdate!=null)&&(!sdate.equalsIgnoreCase(""))){
                R_DLVDT.setValue(sdate, "LOW"); // LOW : VALUE
            }
            if((edate!=null)&&(!edate.equalsIgnoreCase(""))){
                R_DLVDT.setValue(edate, "HIGH"); // HIGH : VALUE
            }
			
            // ���ڵ�
			if((kunnr!=null)&&(!kunnr.equalsIgnoreCase(""))){
			    R_KUNNR.appendRow();
			    R_KUNNR.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
			    R_KUNNR.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
			    R_KUNNR.setValue(kunnr,"LOW"); // LOW : VALUE
				System.out.println("kunnr : "+ kunnr);
			}
            
            // ��ǰ�ڵ�
            if( ( matnr != null ) && ( !matnr.equalsIgnoreCase("") ) ){
                R_MATNR.appendRow();
                R_MATNR.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_MATNR.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                R_MATNR.setValue(matnr,"LOW"); // LOW : VALUE
                System.out.println("matnr : "+ matnr);
            }
            
            // �������ֿ���
            if( ( salesOrder != null ) && ( !salesOrder.equalsIgnoreCase("") ) ){
                R_VBELN.appendRow();
                R_VBELN.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_VBELN.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                R_VBELN.setValue(salesOrder,"LOW"); // LOW : VALUE
                System.out.println("salesOrder : "+ salesOrder);
            }
            
            // �������ڵ�
            if( ( matnrC != null ) && ( !matnrC.equalsIgnoreCase("") ) ){
                R_CUST_MAT.appendRow();
                R_CUST_MAT.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_CUST_MAT.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                R_CUST_MAT.setValue(matnrC,"LOW"); // LOW : VALUE
                System.out.println("matnrC : "+ matnrC);
            }
            
            // �����ſ�����ȣ
            if( ( purchaseOrder != null ) && ( !purchaseOrder.equalsIgnoreCase("") ) ){
                R_PO_NO.appendRow();
                R_PO_NO.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_PO_NO.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                R_PO_NO.setValue(purchaseOrder,"LOW"); // LOW : VALUE
                System.out.println("purchaseOrder : "+ purchaseOrder);
            }
			
			mConnection.execute(function);		// ����
			
			JCO.Table baseTable = function.getTableParameterList().getTable("ORD_TAB");
			JCO.Table orderTable = function.getTableParameterList().getTable("DLV_TAB");
			
			int baseNum = baseTable.getNumRows();
			int orderNum = orderTable.getNumRows();
			System.out.println("baseNum : " + Integer.toString(baseNum) + " __ orderNum : " + Integer.toString(orderNum));
			int j = 0; // baseTable rowNum
			
			if( baseNum <= orderNum ) {
			    baseTable.setRow(j);
			    for( int i = 0 ; i < orderNum ; ++i ){
			        orderTable.setRow(i);
			        
			        ArrayList tmpList = new ArrayList();
			        
			        if( (orderTable.getString("VBELN").equals(baseTable.getString("VBELN"))) ) {
			            if( (orderTable.getString("POSNR").equals(baseTable.getString("POSNR"))) ) {
			                // do nothing
			                System.out.println("do nothing : " + Integer.toString(j));
			            }
			            else {
			                if( j < baseNum-1 ) {
			                    // baseTable ���� �߰�
			                    ++j;
			                    baseTable.setRow(j);
			                }
			            }
			        }
			        else {
                        if( j < baseNum-1 ) {
                            // baseTable ���� �߰�
                            ++j;
                            baseTable.setRow(j);
                        }
			        }
			        
			        tmpList.add(baseTable.getString("KUNNR"));  // ��
                    tmpList.add(baseTable.getString("NAME1"));  // ���ڵ��
                    tmpList.add(baseTable.getString("VBELN"));  // �Ǹſ���
                    tmpList.add( Integer.toString(Integer.parseInt(baseTable.getString("POSNR"))) );  // Item number of the SD document
                    tmpList.add(baseTable.getString("BSTKD"));  // �����ſ���
                    tmpList.add(baseTable.getString("MATNR"));  // ��ǰ�ڵ�
                    tmpList.add(baseTable.getString("KDMAT"));  // �������ڵ�
                    tmpList.add(baseTable.getString("MAKTX"));  // ��ǰ�ڵ峻��
                    tmpList.add(orderTable.getString("REQDT"));     // ����û��
                    tmpList.add(orderTable.getString("REQQY"));     // ��û����
                    tmpList.add(orderTable.getString("ETDAT"));     // Ȯ����
                    tmpList.add(orderTable.getString("BMENG"));     // Ȯ�����
                    //tmpList.add(baseTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("OLFMNG"));     // �����ܷ�
                    tmpList.add(baseTable.getString("LABST"));  // ���
                    tmpList.add(baseTable.getString("PK_QY"));  // PK���
                    tmpList.add(baseTable.getString("VI_QY"));  // VI���
                    tmpList.add(baseTable.getString("WIPQY"));  // �����
                    tmpList.add(orderTable.getString("DLV_STAT"));     // ��������
                    tmpList.add(orderTable.getString("ETENR"));     // Schedule line
                    tmpList.add(baseTable.getString("INCO2"));    // Incoterms (part 2):���ϸ��
                    tmpList.add(orderTable.getString("DLVDT"));    // ���ϰ�����
                    tmpList.add(orderTable.getString("MEINS"));    // Base Unit of Measure
                    tmpList.add(orderTable.getString("ISSDT"));    // ���Ͽ�û��
                    tmpList.add(orderTable.getString("BIGO_01"));    // �������
                    tmpList.add(orderTable.getString("BIGO_02"));    // ���
                    
                    arrayList.add(tmpList);
			        
			    }
			}
			else {
                baseTable.setRow(j);
                for( int i = 0 ; i < baseNum ; ++i ){
                    baseTable.setRow(i);
                    
                    ArrayList tmpList = new ArrayList();
                    
                    if( (orderTable.getString("VBELN").equals(baseTable.getString("VBELN"))) ) {
                        if( (orderTable.getString("POSNR").equals(baseTable.getString("POSNR"))) ) {
                            // do nothing
                            System.out.println("do nothing : " + Integer.toString(j));
                        }
                        else {
                            if( j < orderNum-1 ) {
                                // orderTable ���� �߰�
                                ++j;
                                orderTable.setRow(j);
                            }
                        }
                    }
                    else {
                        if( j < orderNum-1 ) {
                            // baseTable ���� �߰�
                            ++j;
                            orderTable.setRow(j);
                        }
                    }
                    
                    tmpList.add(baseTable.getString("KUNNR"));  // ��
                    tmpList.add(baseTable.getString("NAME1"));  // ���ڵ��
                    tmpList.add(baseTable.getString("VBELN"));  // �Ǹſ���
                    tmpList.add( Integer.toString(Integer.parseInt(baseTable.getString("POSNR"))) );  // Item number of the SD document
                    tmpList.add(baseTable.getString("BSTKD"));  // �����ſ���
                    tmpList.add(baseTable.getString("MATNR"));  // ��ǰ�ڵ�
                    tmpList.add(baseTable.getString("KDMAT"));  // �������ڵ�
                    tmpList.add(baseTable.getString("MAKTX"));  // ��ǰ�ڵ峻��
                    tmpList.add(orderTable.getString("REQDT"));     // ����û��
                    tmpList.add(orderTable.getString("REQQY"));     // ��û����
                    tmpList.add(orderTable.getString("ETDAT"));     // Ȯ����
                    tmpList.add(orderTable.getString("BMENG"));     // Ȯ�����
                    //tmpList.add(baseTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("OLFMNG"));     // �����ܷ�
                    tmpList.add(baseTable.getString("LABST"));  // ���
                    tmpList.add(baseTable.getString("PK_QY"));  // PK���
                    tmpList.add(baseTable.getString("VI_QY"));  // VI���
                    tmpList.add(baseTable.getString("WIPQY"));  // �����
                    tmpList.add(orderTable.getString("DLV_STAT"));     // ��������
                    tmpList.add(orderTable.getString("ETENR"));     // Schedule line
                    tmpList.add(baseTable.getString("INCO2"));    // Incoterms (part 2):���ϸ��
                    tmpList.add(orderTable.getString("DLVDT"));    // ���ϰ�����
                    tmpList.add(orderTable.getString("MEINS"));    // Base Unit of Measure
                    tmpList.add(orderTable.getString("ISSDT"));    // ���Ͽ�û��
                    tmpList.add(orderTable.getString("BIGO_01"));    // �������
                    tmpList.add(orderTable.getString("BIGO_02"));    // ���
                    
                    arrayList.add(tmpList);
                    
                }
			}
			System.out.println(Integer.toString(j) + "<<<<  arrayList.toString()  >>>> : " + arrayList.toString());
			
			ArrayList deliveryOrderList = new ArrayList();
			
			for(int i=0; i < baseTable.getNumRows();i++){		//��� ��
			    baseTable.setRow(i);
				ArrayList tmpList = new ArrayList();			
				tmpList.add(baseTable.getString("KUNNR"));	 // ��
                tmpList.add(baseTable.getString("AUART"));    // Sales Document Type
				tmpList.add(baseTable.getString("VTWEG"));   // Distribution Channel
				tmpList.add(baseTable.getString("MATKL"));	 // Material Group
				tmpList.add(baseTable.getString("NAME1"));    // Name
                tmpList.add(baseTable.getString("VBELN"));    // Sales and Distribution Document Number
                tmpList.add(baseTable.getString("POSNR"));    // Item number of the SD document
                tmpList.add(baseTable.getString("MATNR"));    // Material Number
                tmpList.add(baseTable.getString("VERID"));    // Production Version
                tmpList.add(baseTable.getString("SPEC_NO"));    // �系�����ȣ
                tmpList.add(baseTable.getString("REVLV"));    // Revision Level
                tmpList.add(baseTable.getString("UNAME"));    // User Name
                tmpList.add(baseTable.getString("MAKTX"));    // Material Description
                tmpList.add(baseTable.getString("KDMAT"));    // Material belonging to the customer
                tmpList.add(baseTable.getString("ERDAT"));    // Date on which the record was created
                tmpList.add(baseTable.getString("AEDAT"));    // Date of Last Change
                tmpList.add(baseTable.getString("BSTKD"));    // Customer purchase order number
                tmpList.add(baseTable.getString("INCO2"));    // Incoterms (part 2)
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(baseTable.getString("ISSQY")));    // ���ϼ���
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(baseTable.getString("LABST")));    // Valuated stock with unrestricted use
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(baseTable.getString("PK_QY")));    // PK ���
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(baseTable.getString("VI_QY")));    // VI ���
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(baseTable.getString("WIPQY")));    // �����
                tmpList.add(baseTable.getString("MEINS"));    // Base Unit of Measure
				
                deliveryOrderList.add(tmpList);
			}
            
            System.out.println("deliveryOrderList.size="+ deliveryOrderList.size());
            System.out.println("deliveryOrderList="+ deliveryOrderList.toString());

            ArrayList salesOrderList = new ArrayList();
            
            for(int i=0; i < orderTable.getNumRows();i++){     //��� ��
                orderTable.setRow(i);
                ArrayList tmpList = new ArrayList();            
                // ����!%!���ſ���!%!��!%!����!%!����Ÿ��!%!�ݾ�!%!��ȭ
                tmpList.add(orderTable.getString("VBELN"));    // Sales and Distribution Document Number
                tmpList.add(orderTable.getString("POSNR"));    // Item number of the SD document
                tmpList.add(orderTable.getString("ETENR"));     // Schedule line
                tmpList.add(orderTable.getString("DLV_STAT"));    // �������� ����(' ' / 'X')
                tmpList.add(orderTable.getString("INCO2"));   // Incoterms (part 2)
                tmpList.add(orderTable.getString("REQDT"));     // ����û��
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(orderTable.getString("REQQY")));    // ����û����
                tmpList.add(orderTable.getString("ETDAT"));    // �԰�Ȯ����
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(orderTable.getString("BMENG")));    // Confirmed quantity
                tmpList.add(orderTable.getString("DLVDT"));    // ���ϰ�����
                tmpList.add(com.zionex.t3sinc.common.CommonUtil.deleteComma(orderTable.getString("OLFMNG")));    // Open quantity to be delivered (in sales unit)
                tmpList.add(orderTable.getString("MEINS"));    // Base Unit of Measure
                
                salesOrderList.add(tmpList);
            }
            
            System.out.println("Sales order List.size="+ salesOrderList.size());
            System.out.println("Sales order List="+ salesOrderList.toString());
			
            return arrayList;
						
		}catch (Exception ex){
			ex.printStackTrace();
			return null;
		}	
	}
    
    public ArrayList getOrderList2(String sdate, String edate, String items){
        
        ArrayList arrayList = new ArrayList();
        
        JCO.Function function;
        //JCO.Structure I_BAPI_VIEW ;
        //JCO.Field CHK;
        JCO.Table R_VBELN, R_SORDKEY, R_DLVDT, ORD_TAB, DLV_TAB;
        
        CreatFunction crtFnc = new CreatFunction(mRepository);
        
        try {           
            function = crtFnc.createFunction("Z_1Z_BAPI_SD_ORDER_DLV_SCH");
            if (function == null) {
                System.out.println("Z_1Z_BAPI_SD_ORDER_DLV_SCH  not found in SAP.");
                return null;
            }
            
/* =========== data input ====================================================*/            
            
            R_VBELN = function.getTableParameterList().getTable("R_VBELN"); // �������ֿ���
            R_SORDKEY = function.getTableParameterList().getTable("R_SORDKEY"); // ����_ǰ���ȣ
            R_DLVDT = function.getTableParameterList().getTable("R_DLVDT"); // ���Ͽ�����
            ORD_TAB = function.getTableParameterList().getTable("ORD_TAB"); // ���ϰ�ȹ ���� - ���ֿ��� ITEM����
            DLV_TAB = function.getTableParameterList().getTable("DLV_TAB"); // ���ϰ�ȹ ���� - ��ǰ���� ����
            
            // ����_ǰ���ȣ
            if( (items!=null)&&(!items.equalsIgnoreCase("")) ){
                String arr[]; 
                arr = items.split(",");
                for( int i = 0 ; i < arr.length ; ++i ) {
                    R_VBELN.appendRow();
                    R_VBELN.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                    R_VBELN.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                    R_VBELN.setValue(arr[i].trim().split("_")[0], "LOW"); // LOW : VALUE
                    
                    R_SORDKEY.appendRow();
                    R_SORDKEY.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                    R_SORDKEY.setValue("EQ", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                    //R_SORDKEY.setValue(arr[i].trim(), "LOW"); // LOW : VALUE
                    R_SORDKEY.setValue(arr[i].trim().split("_")[0]+"_"+lengthFix(arr[i].trim().split("_")[1], 6), "LOW"); // LOW : VALUE
                    
                    System.out.println(Integer.toString(i) + " : VBELN : " + R_VBELN.getString("LOW") + " ___  SORDKEY : " + R_SORDKEY.getString("LOW"));
                }
            }
            
            // ���Ͽ�����
            if( edate.equalsIgnoreCase("") ){
                edate = sdate;
            }
            if(((sdate!=null)&&(!sdate.equalsIgnoreCase("")))
                    ||((edate!=null)&&(!edate.equalsIgnoreCase("")))){
                R_DLVDT.appendRow(); 
                R_DLVDT.setValue("I", "SIGN"); // SIGN : I=����(Include), E=����(Exclude)
                R_DLVDT.setValue("BT", "OPTION"); // OPTION : EQ=EQUAL, BT=BETWEEN, CP=LIKE
                System.out.println("sdate ~ edate : " + sdate + " ~ " + edate);
            }
            if((sdate!=null)&&(!sdate.equalsIgnoreCase(""))){
                R_DLVDT.setValue(sdate, "LOW"); // LOW : VALUE
            }
            if((edate!=null)&&(!edate.equalsIgnoreCase(""))){
                R_DLVDT.setValue(edate, "HIGH"); // HIGH : VALUE
            }
            
            mConnection.execute(function);      // ����
            
            JCO.Table baseTable = function.getTableParameterList().getTable("ORD_TAB");
            JCO.Table orderTable = function.getTableParameterList().getTable("DLV_TAB");
            
            int baseNum = baseTable.getNumRows();
            int orderNum = orderTable.getNumRows();
            System.out.println("baseNum : " + Integer.toString(baseNum) + " __ orderNum : " + Integer.toString(orderNum));
            int j = 0; // baseTable rowNum
            
            if( baseNum <= orderNum ) {
                baseTable.setRow(j);
                for( int i = 0 ; i < orderNum ; ++i ){
                    orderTable.setRow(i);
                    
                    ArrayList tmpList = new ArrayList();
                    
                    if( (orderTable.getString("VBELN").equals(baseTable.getString("VBELN"))) ) {
                        if( (orderTable.getString("POSNR").equals(baseTable.getString("POSNR"))) ) {
                            // do nothing
                            System.out.println("do nothing : " + Integer.toString(j));
                        }
                        else {
                            if( j < baseNum-1 ) {
                                // baseTable ���� �߰�
                                ++j;
                                baseTable.setRow(j);
                            }
                        }
                    }
                    else {
                        if( j < baseNum-1 ) {
                            // baseTable ���� �߰�
                            ++j;
                            baseTable.setRow(j);
                        }
                    }
                    
                    tmpList.add(baseTable.getString("KUNNR"));  // ��
                    tmpList.add(baseTable.getString("NAME1"));  // ���ڵ��
                    tmpList.add(baseTable.getString("VBELN"));  // �Ǹſ���
                    tmpList.add( Integer.toString(Integer.parseInt(baseTable.getString("POSNR"))) );  // Item number of the SD document
                    tmpList.add(baseTable.getString("BSTKD"));  // �����ſ���
                    tmpList.add(baseTable.getString("MATNR"));  // ��ǰ�ڵ�
                    tmpList.add(baseTable.getString("KDMAT"));  // �������ڵ�
                    tmpList.add(baseTable.getString("MAKTX"));  // ��ǰ�ڵ峻��
                    tmpList.add(orderTable.getString("REQDT"));     // ����û��
                    tmpList.add(orderTable.getString("REQQY"));     // ��û����
                    tmpList.add(orderTable.getString("ETDAT"));     // Ȯ����
                    tmpList.add(orderTable.getString("BMENG"));     // Ȯ�����
                    //tmpList.add(baseTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("OLFMNG"));     // �����ܷ�
                    tmpList.add(baseTable.getString("LABST"));  // ���
                    tmpList.add(baseTable.getString("PK_QY"));  // PK���
                    tmpList.add(baseTable.getString("VI_QY"));  // VI���
                    tmpList.add(baseTable.getString("WIPQY"));  // �����
                    tmpList.add(orderTable.getString("DLV_STAT"));     // ��������
                    tmpList.add(orderTable.getString("ETENR"));     // Schedule line
                    tmpList.add(baseTable.getString("INCO2"));    // Incoterms (part 2):���ϸ��
                    tmpList.add(orderTable.getString("DLVDT"));    // ���ϰ�����
                    tmpList.add(orderTable.getString("MEINS"));    // Base Unit of Measure
                    tmpList.add(orderTable.getString("ISSDT"));    // ���Ͽ�û��
                    tmpList.add(orderTable.getString("BIGO_01"));    // �������
                    tmpList.add(orderTable.getString("BIGO_02"));    // ���
                    
                    arrayList.add(tmpList);
                    
                }
            }
            else {
                baseTable.setRow(j);
                for( int i = 0 ; i < baseNum ; ++i ){
                    baseTable.setRow(i);
                    
                    ArrayList tmpList = new ArrayList();
                    
                    if( (orderTable.getString("VBELN").equals(baseTable.getString("VBELN"))) ) {
                        if( (orderTable.getString("POSNR").equals(baseTable.getString("POSNR"))) ) {
                            // do nothing
                            System.out.println("do nothing : " + Integer.toString(j));
                        }
                        else {
                            if( j < orderNum-1 ) {
                                // orderTable ���� �߰�
                                ++j;
                                orderTable.setRow(j);
                            }
                        }
                    }
                    else {
                        if( j < orderNum-1 ) {
                            // baseTable ���� �߰�
                            ++j;
                            orderTable.setRow(j);
                        }
                    }
                    
                    tmpList.add(baseTable.getString("KUNNR"));  // ��
                    tmpList.add(baseTable.getString("NAME1"));  // ���ڵ��
                    tmpList.add(baseTable.getString("VBELN"));  // �Ǹſ���
                    tmpList.add( Integer.toString(Integer.parseInt(baseTable.getString("POSNR"))) );  // Item number of the SD document
                    tmpList.add(baseTable.getString("BSTKD"));  // �����ſ���
                    tmpList.add(baseTable.getString("MATNR"));  // ��ǰ�ڵ�
                    tmpList.add(baseTable.getString("KDMAT"));  // �������ڵ�
                    tmpList.add(baseTable.getString("MAKTX"));  // ��ǰ�ڵ峻��
                    tmpList.add(orderTable.getString("REQDT"));     // ����û��
                    tmpList.add(orderTable.getString("REQQY"));     // ��û����
                    tmpList.add(orderTable.getString("ETDAT"));     // Ȯ����
                    tmpList.add(orderTable.getString("BMENG"));     // Ȯ�����
                    //tmpList.add(baseTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("ISSQY"));  // ���ϼ���
                    tmpList.add(orderTable.getString("OLFMNG"));     // �����ܷ�
                    tmpList.add(baseTable.getString("LABST"));  // ���
                    tmpList.add(baseTable.getString("PK_QY"));  // PK���
                    tmpList.add(baseTable.getString("VI_QY"));  // VI���
                    tmpList.add(baseTable.getString("WIPQY"));  // �����
                    tmpList.add(orderTable.getString("DLV_STAT"));     // ��������
                    tmpList.add(orderTable.getString("ETENR"));     // Schedule line
                    tmpList.add(baseTable.getString("INCO2"));    // Incoterms (part 2):���ϸ��
                    tmpList.add(orderTable.getString("DLVDT"));    // ���ϰ�����
                    tmpList.add(orderTable.getString("MEINS"));    // Base Unit of Measure
                    tmpList.add(orderTable.getString("ISSDT"));    // ���Ͽ�û��
                    tmpList.add(orderTable.getString("BIGO_01"));    // �������
                    tmpList.add(orderTable.getString("BIGO_02"));    // ���
                    
                    arrayList.add(tmpList);
                    
                }
            }
            System.out.println(Integer.toString(j) + "<<<<  arrayList.toString()  >>>> : " + arrayList.toString());
            
            return arrayList;
                        
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }   
    }
    
    // ǰ���ȣ �ڸ��� ����
    private String lengthFix(String str,int len){
        for(;str.length()< len;){
            str = "0"+str;
        }
        return str;
    }
    
}
