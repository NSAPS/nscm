package com.sms;

public class OA_IntraSMSProxy implements com.sms.OA_IntraSMS {
  private String _endpoint = null;
  private com.sms.OA_IntraSMS oA_IntraSMS = null;
  
  public OA_IntraSMSProxy() {
    _initOA_IntraSMSProxy();
  }
  
  public OA_IntraSMSProxy(String endpoint) {
    _endpoint = endpoint;
    _initOA_IntraSMSProxy();
  }
  
  private void _initOA_IntraSMSProxy() {
    try {
      oA_IntraSMS = (new com.sms.OA_IntraSMSServiceLocator()).getOA_IntraSMSPort();
      if (oA_IntraSMS != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)oA_IntraSMS)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)oA_IntraSMS)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (oA_IntraSMS != null)
      ((javax.xml.rpc.Stub)oA_IntraSMS)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.sms.OA_IntraSMS getOA_IntraSMS() {
    if (oA_IntraSMS == null)
      _initOA_IntraSMSProxy();
    return oA_IntraSMS;
  }
  
  public void OA_IntraSMS(com.sms.DT_IntraSMS MT_IntraSMS) throws java.rmi.RemoteException{
    if (oA_IntraSMS == null)
      _initOA_IntraSMSProxy();
    oA_IntraSMS.OA_IntraSMS(MT_IntraSMS);
  }
  
  
}