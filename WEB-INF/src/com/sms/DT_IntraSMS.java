/**
 * DT_IntraSMS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.sms;

public class DT_IntraSMS  implements java.io.Serializable {

	private com.sms.DT_IntraSMSRow[] row;

    private java.lang.String TRAN_CALLBACK;

    private java.lang.String TRAN_MSG;

    private java.lang.String TRAN_ETC1;

    private java.lang.String TRAN_ETC2;

    public DT_IntraSMS() {
    }

    public DT_IntraSMS(
    		com.sms.DT_IntraSMSRow[] row,
           java.lang.String TRAN_CALLBACK,
           java.lang.String TRAN_MSG,
           java.lang.String TRAN_ETC1,
           java.lang.String TRAN_ETC2) {
           this.row = row;
           this.TRAN_CALLBACK = TRAN_CALLBACK;
           this.TRAN_MSG = TRAN_MSG;
           this.TRAN_ETC1 = TRAN_ETC1;
           this.TRAN_ETC2 = TRAN_ETC2;
System.out.println("DT_IntraSMS[1-2]"); 
    
    }


    /**
     * Gets the row value for this DT_IntraSMS.
     * 
     * @return row
     */
    public com.sms.DT_IntraSMSRow[] getRow() {
        return row;
    }


    /**
     * Sets the row value for this DT_IntraSMS.
     * 
     * @param row
     */
    public void setRow(com.sms.DT_IntraSMSRow[] row) {
        this.row = row;
    }

    public com.sms.DT_IntraSMSRow getRow(int i) {
        return this.row[i];
    }

    public void setRow(int i, com.sms.DT_IntraSMSRow _value) {
        this.row[i] = _value;
    }


    /**
     * Gets the TRAN_CALLBACK value for this DT_IntraSMS.
     * 
     * @return TRAN_CALLBACK
     */
    public java.lang.String getTRAN_CALLBACK() {
        return TRAN_CALLBACK;
    }


    /**
     * Sets the TRAN_CALLBACK value for this DT_IntraSMS.
     * 
     * @param TRAN_CALLBACK
     */
    public void setTRAN_CALLBACK(java.lang.String TRAN_CALLBACK) {
        this.TRAN_CALLBACK = TRAN_CALLBACK;
    }


    /**
     * Gets the TRAN_MSG value for this DT_IntraSMS.
     * 
     * @return TRAN_MSG
     */
    public java.lang.String getTRAN_MSG() {
        return TRAN_MSG;
    }


    /**
     * Sets the TRAN_MSG value for this DT_IntraSMS.
     * 
     * @param TRAN_MSG
     */
    public void setTRAN_MSG(java.lang.String TRAN_MSG) {
        this.TRAN_MSG = TRAN_MSG;
    }


    /**
     * Gets the TRAN_ETC1 value for this DT_IntraSMS.
     * 
     * @return TRAN_ETC1
     */
    public java.lang.String getTRAN_ETC1() {
        return TRAN_ETC1;
    }


    /**
     * Sets the TRAN_ETC1 value for this DT_IntraSMS.
     * 
     * @param TRAN_ETC1
     */
    public void setTRAN_ETC1(java.lang.String TRAN_ETC1) {
        this.TRAN_ETC1 = TRAN_ETC1;
    }


    /**
     * Gets the TRAN_ETC2 value for this DT_IntraSMS.
     * 
     * @return TRAN_ETC2
     */
    public java.lang.String getTRAN_ETC2() {
        return TRAN_ETC2;
    }


    /**
     * Sets the TRAN_ETC2 value for this DT_IntraSMS.
     * 
     * @param TRAN_ETC2
     */
    public void setTRAN_ETC2(java.lang.String TRAN_ETC2) {
        this.TRAN_ETC2 = TRAN_ETC2;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DT_IntraSMS)) return false;
        DT_IntraSMS other = (DT_IntraSMS) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.row==null && other.getRow()==null) || 
             (this.row!=null &&
              java.util.Arrays.equals(this.row, other.getRow()))) &&
            ((this.TRAN_CALLBACK==null && other.getTRAN_CALLBACK()==null) || 
             (this.TRAN_CALLBACK!=null &&
              this.TRAN_CALLBACK.equals(other.getTRAN_CALLBACK()))) &&
            ((this.TRAN_MSG==null && other.getTRAN_MSG()==null) || 
             (this.TRAN_MSG!=null &&
              this.TRAN_MSG.equals(other.getTRAN_MSG()))) &&
            ((this.TRAN_ETC1==null && other.getTRAN_ETC1()==null) || 
             (this.TRAN_ETC1!=null &&
              this.TRAN_ETC1.equals(other.getTRAN_ETC1()))) &&
            ((this.TRAN_ETC2==null && other.getTRAN_ETC2()==null) || 
             (this.TRAN_ETC2!=null &&
              this.TRAN_ETC2.equals(other.getTRAN_ETC2())));
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
        if (getRow() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getRow());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRow(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getTRAN_CALLBACK() != null) {
            _hashCode += getTRAN_CALLBACK().hashCode();
        }
        if (getTRAN_MSG() != null) {
            _hashCode += getTRAN_MSG().hashCode();
        }
        if (getTRAN_ETC1() != null) {
            _hashCode += getTRAN_ETC1().hashCode();
        }
        if (getTRAN_ETC2() != null) {
            _hashCode += getTRAN_ETC2().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DT_IntraSMS.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/nfos/nf", "DT_IntraSMS"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("row");
        elemField.setXmlName(new javax.xml.namespace.QName("", "row"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/nfos/nf", ">DT_IntraSMS>row"));
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("TRAN_CALLBACK");
        elemField.setXmlName(new javax.xml.namespace.QName("", "TRAN_CALLBACK"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("TRAN_MSG");
        elemField.setXmlName(new javax.xml.namespace.QName("", "TRAN_MSG"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("TRAN_ETC1");
        elemField.setXmlName(new javax.xml.namespace.QName("", "TRAN_ETC1"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("TRAN_ETC2");
        elemField.setXmlName(new javax.xml.namespace.QName("", "TRAN_ETC2"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
