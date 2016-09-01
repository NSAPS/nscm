/*
 * Created on 2004. 11. 4.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.common;

import java.util.ResourceBundle;


/**
 * @author zzzanga
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ServerInfo {
	
	public static String getWebServerUrl() {
		ResourceBundle rb = ResourceBundle.getBundle("server_info"); 
		String server = rb.getString("WEB_SERVER");
		
		return server;
	}
	
	public static String getWebServerRoot() {
		ResourceBundle rb = ResourceBundle.getBundle("server_info"); 
		String root = rb.getString("WEB_SERVER_ROOT");
		
		return root;
	}
	
	public static String getPath( String keyCode ) { 
		
	    ResourceBundle rb = ResourceBundle.getBundle("server_info"); 
		String path = rb.getString(keyCode);
		
		return path;
	    
	}
	
	public static void main(String[] args) {
	    // nothing
	}
}
