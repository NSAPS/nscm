package com.Nongshim.pis.pu;

public class OS_PRMROProxy implements com.Nongshim.pis.pu.OS_PRMRO {
  private String _endpoint = null;
  private com.Nongshim.pis.pu.OS_PRMRO oS_PRMRO = null;
  
  public OS_PRMROProxy() {
    _initOS_PRMROProxy();
  }
  
  public OS_PRMROProxy(String endpoint) {
    _endpoint = endpoint;
    _initOS_PRMROProxy();
  }
  
  private void _initOS_PRMROProxy() {
    try {
      oS_PRMRO = (new com.Nongshim.pis.pu.OS_PRMROServiceLocator()).getOS_PRMROPort();
      if (oS_PRMRO != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)oS_PRMRO)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)oS_PRMRO)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (oS_PRMRO != null)
      ((javax.xml.rpc.Stub)oS_PRMRO)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.Nongshim.pis.pu.OS_PRMRO getOS_PRMRO() {
    if (oS_PRMRO == null)
      _initOS_PRMROProxy();
    return oS_PRMRO;
  }
  
  public com.Nongshim.pis.pu.DT_PRMRO_response OS_PRMRO(com.Nongshim.pis.pu.DT_PRMRO MT_PRMRO) throws java.rmi.RemoteException{
    if (oS_PRMRO == null)
      _initOS_PRMROProxy();
    return oS_PRMRO.OS_PRMRO(MT_PRMRO);
  }
  
  
}