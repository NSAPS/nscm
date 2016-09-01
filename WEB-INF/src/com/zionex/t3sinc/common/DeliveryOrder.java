
package com.zionex.t3sinc.common;

import com.zionex.t3sinc.common.CreatFunction;

import com.zionex.t3sinc.common.SAPConnection;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

import com.sap.mw.jco.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

/**
* @author P.S.W
* http://www.zionex.com
*/
public class DeliveryOrder extends Object {
    JCO.Client mConnection;
    JCO.Repository mRepository;
    JCO.Field VBELN;

    public DeliveryOrder() {
        
    }
    
    public DeliveryOrder(JCO.Client mConnection) {
        this.mConnection = mConnection;
        mRepository = new JCO.Repository("Techwin", mConnection);
    }
    
    public String doOrder(ArrayList dataList, String pernr, String mailgrp){
        
        JCO.Function function = null;
        JCO.Table DLV_TAB = null;
        JCO.Field PERNR, MAILGRP = null;
        
        CreatFunction crtFnc = new CreatFunction(mRepository);
        
        try {                       
            function = crtFnc.createFunction("Z_1Z_BAPI_SD_ORDER_SAVE_DLV");
            if (function == null) {
                System.out.println("Z_1Z_BAPI_SD_ORDER_SAVE_DLV  not found in SAP.");
                return null;
            }           
            
            System.out.println("function:"+function.getName());

            PERNR = function.getImportParameterList().getField("PERNR");
            PERNR.setValue(pernr);
            MAILGRP = function.getImportParameterList().getField("MAILGRP");
            MAILGRP.setValue(mailgrp);
            
            DLV_TAB = function.getTableParameterList().getTable("DLV_TAB");
            
            for(int i=0; i < dataList.size();i++){
                ArrayList row = (ArrayList)dataList.get(i);
                DLV_TAB.appendRow();
                DLV_TAB.setValue(row.get(0), "VBELN");       // SALES AND DISTRIBUTION DOCUMENT NUMBER
                DLV_TAB.setValue(row.get(1), "POSNR");      // ITEM NUMBER OF THE SD DOCUMENT
                DLV_TAB.setValue(row.get(2), "ETENR");       // SCHEDULE LINE
                DLV_TAB.setValue(row.get(3), "DLV_STAT");  // �������� ����
                DLV_TAB.setValue(row.get(4), "INCO2");        // INCOTERMS(PART2):���ϸ��
                DLV_TAB.setValue(row.get(5), "REQDT");       // ����û��
                DLV_TAB.setValue(row.get(6), "REQQY");       // ����û����
                DLV_TAB.setValue(row.get(7), "ETDAT");        // �԰�Ȯ����
                DLV_TAB.setValue(row.get(8), "BMENG");      // CONFIRMED QUANTITY
                DLV_TAB.setValue(row.get(9), "DLVDT");      // ���ϰ�����
                DLV_TAB.setValue(row.get(10), "OLFMNG");   // OPEN QUANTITY TO BE DELIVERED(IN SALES UNIT)
                DLV_TAB.setValue(row.get(11), "ISSDT");       // ���Ͽ�û��
                DLV_TAB.setValue(row.get(12), "ISSQY");       // ���Ͽ�û����
                DLV_TAB.setValue(row.get(13), "MEINS");       // BASE UNIT OF MEASURE
                DLV_TAB.setValue(row.get(14), "BIGO_01");       // �������
                DLV_TAB.setValue(row.get(15), "BIGO_02");       // ���
                //System.out.println(DLV_TAB.getString("VBELN") + " : ���Ͽ�û���� : " + DLV_TAB.getString("ISSQY"));
                //System.out.println(DLV_TAB.getString("VBELN") + " : INCO2 : " + DLV_TAB.getString("INCO2"));
            }
            
            mConnection.execute(function);
            JCO.Table TAB = function.getTableParameterList().getTable("DLV_TAB");
            for( int i=0; i<TAB.getNumRows();++i){
                TAB.setRow(i);
                System.out.println(TAB.getString("VBELN") + " : " + TAB.getString("INCO2"));
            }
                    
            JCO.Table returnTable = function.getTableParameterList().getTable("RETURN");
            
            int resultCount=0;
            String message="";
            for(int i=0;i<returnTable.getNumRows();i++){
                returnTable.setRow(i);
                if(returnTable.getString("TYPE").equals("E")){
                    message = message +"<br>"+ returnTable.getString("MESSAGE");
                    resultCount++;
                    System.out.println("fail="+returnTable.getString("MESSAGE"));
                }else{
                    message = message +"<br>"+ returnTable.getString("MESSAGE");
                    System.out.println("success"+returnTable.getString("MESSAGE"));
                    System.out.println("Delivery Ordering,,,");
                }
            }
            
            if(resultCount > 0){                            
                return "F__"+message;
            }else{                          
                return "S";
            }
                        
        }catch(Exception ex){
            ex.printStackTrace();
            //return null;
            return "F__FUNCTION ERROR";
        }
        
    }
    
    private String lengthFix(String str,int len){
        for(;str.length()< len;){
            str = "0"+str;
        }
        return str;
    }

    public JCO.Field getVBELN()
    {
        return this.VBELN;
    }
    
    public static void main(String[] args){
        
        System.out.println("MAIN");
        
    }

}
