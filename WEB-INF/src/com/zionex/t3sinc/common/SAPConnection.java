
package com.zionex.t3sinc.common;

//import java.util.ResourceBundle;

import com.sap.mw.jco.*;


public class SAPConnection extends Object {
	JCO.Client mConnection;
	//JCO.Repository mRepository;
	public boolean connectSAP(String strKey,String userID, String pwd) {
		
		//ResourceBundle bundle = null;
		//bundle = ResourceBundle.getBundle("com.zionex.t3sinc.common.sap.sapInfo");

		String SAP_CLIENT = com.zionex.t3sinc.common.ServerInfo.getPath("SAP_CLIENT");
        String LANGUAGE = com.zionex.t3sinc.common.ServerInfo.getPath("LANGUAGE");
        String HOST_NAME = com.zionex.t3sinc.common.ServerInfo.getPath("HOST_NAME");
        String SYSTEM_NO = com.zionex.t3sinc.common.ServerInfo.getPath("SYSTEM_NO");
		
		try {
			/*
			mConnection =JCO.createClient(SAP_CLIENT, 	// SAP client
										 userID,  		// userid 
										 pwd,	 		// password 
										 LANGUAGE,   	// language
										 HOST_NAME,		// host name
										 SYSTEM_NO);	// system number 		
			*/
				
			JCO.addClientPool(	strKey,
								100,
								SAP_CLIENT, 	// SAP client
								userID,  		// userid 
								pwd,	 		// password 
								LANGUAGE,   	// language
								HOST_NAME,		// host name
								SYSTEM_NO);	// system number
			
			//mConnection = JCO.getClient(strKey,true);
			//mConnection.connect();
			//System.out.println(mConnection.getClient());
			
			return true;
			
		}catch (Exception ex) {
			ex.printStackTrace();
			return false;			
		}
				
	}
	
	
	public JCO.Function createFunction(String name, JCO.Repository repository) throws Exception {
		try {
			//System.out.println("%$$%$%%$$%$$%name="+name);
			//JCO.Repository mRepository = null;
			//JCO.Function ft = new JCO.Function("Z_BAPI_SD_ORDER_CREATE");
			IFunctionTemplate ft =
				repository.getFunctionTemplate(name.toUpperCase());
			
			//String[] funList = repository.getCachedFunctionInterfaces();
			//for(int i = 0; i <funList.length; i++){
		    //		System.out.println(funList[i]);
			//}
			if (ft == null)
				return null;
		
			return ft.getFunction();
		}catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("Problem retrieving JCO.Function object.");
		}
	}
	
	public void jcoStart(){
        System.out.println("jcoStart");
        SAPConnection connecter  = new SAPConnection();
        if (!connecter.connectSAP("ab962087","ab962087","aps2010")){
            System.out.println("connect fail.");    
            return;
        }
        connecter.mConnection = com.sap.mw.jco.JCO.getClient("ab962087");
        System.out.println(connecter.mConnection.toString());
        JCO.Repository mRepository = new JCO.Repository("Techwin_LF", connecter.mConnection);
        //ZPP_WEEK_PLAN_DISPLAY
        try {
            JCO.Function orderCreateFunc = connecter.createFunction("ZPP_WEEK_PLAN_DISPLAY",mRepository);
            if (orderCreateFunc == null) {
                System.out.println("ZPP_WEEK_PLAN_DISPLAY  not found in SAP.");
                
            }else{
                System.out.println("ZPP_WEEK_PLAN_DISPLAY  found in SAP.");
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	    
	}
	
	public static void main(String[] args){
		System.out.println("MAIN");
	    SAPConnection connecter  = new SAPConnection();
		if (!connecter.connectSAP("ab962087","ab962087","aps2010")){
			System.out.println("connect fail.");	
			return;
		}
		connecter.mConnection = com.sap.mw.jco.JCO.getClient("ab962087");
		System.out.println(connecter.mConnection.toString());
		JCO.Repository mRepository = new JCO.Repository("Techwin_LF", connecter.mConnection);
		//ZPP_WEEK_PLAN_DISPLAY
		try {
			JCO.Function orderCreateFunc = connecter.createFunction("ZPP_WEEK_PLAN_DISPLAY",mRepository);
			if (orderCreateFunc == null) {
				System.out.println("ZPP_WEEK_PLAN_DISPLAY  not found in SAP.");
				
			}else{
				System.out.println("ZPP_WEEK_PLAN_DISPLAY  found in SAP.");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}