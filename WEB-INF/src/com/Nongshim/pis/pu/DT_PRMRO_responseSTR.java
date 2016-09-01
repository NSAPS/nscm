/**
 * DT_PRMRO_responseSTR.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.Nongshim.pis.pu;

public class DT_PRMRO_responseSTR  implements java.io.Serializable {
    private java.lang.String MSG_GUBN;

    private java.lang.String MESSAGE;

    public DT_PRMRO_responseSTR() {
    }

    public DT_PRMRO_responseSTR(
           java.lang.String MSG_GUBN,
           java.lang.String MESSAGE) {
           this.MSG_GUBN = MSG_GUBN;
           this.MESSAGE = MESSAGE;
    }


    /**
     * Gets the MSG_GUBN value for this DT_PRMRO_responseSTR.
     * 
     * @return MSG_GUBN
     */
    public java.lang.String getMSG_GUBN() {
        return MSG_GUBN;
    }


    /**
     * Sets the MSG_GUBN value for this DT_PRMRO_responseSTR.
     * 
     * @param MSG_GUBN
     */
    public void setMSG_GUBN(java.lang.String MSG_GUBN) {
        this.MSG_GUBN = MSG_GUBN;
    }


    /**
     * Gets the MESSAGE value for this DT_PRMRO_responseSTR.
     * 
     * @return MESSAGE
     */
    public java.lang.String getMESSAGE() {
        return MESSAGE;
    }


    /**
     * Sets the MESSAGE value for this DT_PRMRO_responseSTR.
     * 
     * @param MESSAGE
     */
    public void setMESSAGE(java.lang.String MESSAGE) {
        this.MESSAGE = MESSAGE;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DT_PRMRO_responseSTR)) return false;
        DT_PRMRO_responseSTR other = (DT_PRMRO_responseSTR) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.MSG_GUBN==null && other.getMSG_GUBN()==null) || 
             (this.MSG_GUBN!=null &&
              this.MSG_GUBN.equals(other.getMSG_GUBN()))) &&
            ((this.MESSAGE==null && other.getMESSAGE()==null) || 
             (this.MESSAGE!=null &&
              this.MESSAGE.equals(other.getMESSAGE())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getMSG_GUBN() != null) {
            _hashCode += getMSG_GUBN().hashCode();
        }
        if (getMESSAGE() != null) {
            _hashCode += getMESSAGE().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DT_PRMRO_responseSTR.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", ">DT_PRMRO_response>STR"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("MSG_GUBN");
        elemField.setXmlName(new javax.xml.namespace.QName("", "MSG_GUBN"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("MESSAGE");
        elemField.setXmlName(new javax.xml.namespace.QName("", "MESSAGE"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
