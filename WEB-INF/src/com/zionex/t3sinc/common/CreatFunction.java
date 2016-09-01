/*
 * Created on 2003. 4. 23.
 *
 * To change this generated comment go to 
 * Window>Preferences>Java>Code Generation>Code Template
 */

package com.zionex.t3sinc.common;

import com.sap.mw.jco.*;

/**
 * @author P.S.W
 * http://www.zionex.com
 * 
 */
public class CreatFunction {
	
	JCO.Repository mRepository;
	public CreatFunction(JCO.Repository mRepository){
		this.mRepository = mRepository;
	}
	public JCO.Function createFunction(String name) throws Exception {
		try {
			IFunctionTemplate ft =
				mRepository.getFunctionTemplate(name.toUpperCase());
			if (ft == null)
			return null;
		
			return ft.getFunction();
		}catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("Problem retrieving JCO.Function object.");
		}
	}
}
