import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    flexDirection: 'column', 
    backgroundColor: '#fff', 
    padding: 40,
    fontFamily: 'Helvetica'
  },
  border: {
    border: '4px solid #1e3a8a', // Blue border
    height: '100%',
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#d97706', // Gold corner
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  subHeader: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 30,
    letterSpacing: 4,
    textTransform: 'uppercase'
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    borderBottom: '2px solid #d97706',
    paddingBottom: 5,
    minWidth: 300,
    textAlign: 'center'
  },
  text: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 1.5,
    maxWidth: 500
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  signatureBox: {
    borderTop: '1px solid #9ca3af',
    paddingTop: 10,
    alignItems: 'center',
    width: 200
  },
  seal: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    border: '3px solid #d97706',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8
  },
  sealText: {
    fontSize: 8,
    color: '#d97706',
    fontWeight: 'bold'
  },
  verification: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    fontSize: 8,
    color: '#9ca3af'
  }
});

export const CertificatePDF = ({ name, courseName }: { name: string, courseName: string }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      
      {/* Decorative Border Box */}
      <View style={styles.border}>
        
        {/* Header */}
        <Text style={styles.header}>CERTIFICATE OF MASTERY</Text>
        <Text style={styles.subHeader}>台灣 TAIWAN INSIDER ACADEMY</Text>

        {/* Content */}
        <Text style={{fontSize: 12, color: '#6b7280', marginTop: 20}}>This is to certify that</Text>
        
        <Text style={styles.name}>{name}</Text>
        
        <Text style={styles.text}>
          Has successfully passed the competence exam for <Text style={{fontWeight:'bold', color: '#1e3a8a'}}>{courseName}</Text>. 
          Demonstrating high proficiency and readiness for the Taiwan industrial standards.
        </Text>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={{fontFamily: 'Helvetica-Oblique', fontSize: 18, marginBottom: 4}}>台灣國語考試</Text>
            <Text style={{fontSize: 10, color: '#6b7280'}}>Head of Curriculum</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.seal}>
           <Text style={styles.sealText}> 100%</Text>
           <Text style={{...styles.sealText, fontSize: 14}}>Verified</Text>
           <Text style={styles.sealText}></Text>
        </View>
            <Text style={{fontSize: 12, marginBottom: 4}}>{new Date().toLocaleDateString()}</Text>
            <Text style={{fontSize: 10, color: '#6b7280'}}>Date Issued</Text>
          </View>
        </View>

        {/* SEAL CAP */}
        <View style={styles.seal}>
           <Text style={styles.sealText}>OFFICIAL</Text>
           <Text style={{...styles.sealText, fontSize: 14}}>Verified</Text>
           <Text style={styles.sealText}>TAIWAN</Text>
        </View>

        {/* Verification ID */}
        <Text style={styles.verification}>
          Credential ID: TW-{Math.random().toString(36).substr(2, 9).toUpperCase()} • Verify at taiwan.aibengkulu.com/verify
        </Text>

      </View>
    </Page>
  </Document>
);