import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {},
  section: {
    margin: 10,
    padding: 10,
  },
});

export const ReportPDF = ({ title, name }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{title}</Text>
        <Text>Nome: {name}</Text>
      </View>
    </Page>
  </Document>
);
