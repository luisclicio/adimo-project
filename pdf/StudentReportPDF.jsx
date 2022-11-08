import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 36,
  },

  boldText: {
    fontFamily: 'Helvetica-Bold',
  },

  borderRadius: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },

  title: {
    fontSize: 16,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  studentCard: {
    marginTop: 16,
    paddingTop: 8,
  },

  studentCardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  studentCardActivity: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },

  avatar: {
    height: 96,
    objectFit: 'cover',
    minWidth: 96,
    width: 96,
  },

  footer: {
    color: 'grey',
    textAlign: 'center',
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
  },
});

function TextBold({ style, children }) {
  return <Text style={{ ...style, ...styles.boldText }}>{children}</Text>;
}

function InfoItem({ label, value, style }) {
  return (
    <Text style={{ marginTop: 6, ...style }}>
      <TextBold>{label}:</TextBold> {value}
    </Text>
  );
}

export function StudentReportPDF({ student }) {
  const dateTime = new Date().toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TextBold style={styles.title}>Grupo Cultural Adimó</TextBold>
        <Text style={styles.subtitle}>Informações do estudante</Text>

        <View key={student.id} style={styles.studentCard}>
          <View style={styles.studentCardHeader}>
            <View style={{ marginRight: 8 }}>
              <InfoItem
                label="Nome"
                value={student.fullName}
                style={{ marginTop: 0 }}
              />
              <InfoItem label="Sexo" value={student.sex} />
              <InfoItem label="CPF" value={student.cpf} />
              <InfoItem
                label="Data de nascimento"
                value={new Date(student.birthdate).toLocaleDateString()}
              />
              {student?.email && (
                <InfoItem label="E-mail" value={student.email} />
              )}
              {student?.schooling && (
                <InfoItem label="Escolaridade" value={student.schooling} />
              )}
              {student?.motherName && (
                <InfoItem label="Mãe" value={student.motherName} />
              )}
              {student?.fatherName && (
                <InfoItem label="Pai" value={student.fatherName} />
              )}
              {student?.neighborhood && (
                <InfoItem label="Bairro" value={student.neighborhood} />
              )}
              {student?.address && (
                <InfoItem label="Endereço" value={student.address} />
              )}
              {student?.observations && (
                <InfoItem label="Observações" value={student.observations} />
              )}
            </View>

            {student?.avatar?.url && (
              /* eslint-disable-next-line jsx-a11y/alt-text */
              <Image
                src={student.avatar.url}
                cache
                style={{ ...styles.avatar, ...styles.borderRadius }}
              />
            )}
          </View>

          {student?.activities.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <TextBold style={{ marginBottom: 4 }}>Atividades</TextBold>

              {student.activities.map((activity) => (
                <View key={activity.id} style={styles.studentCardActivity}>
                  <Text style={{ marginRight: 4 }}>{activity.title}</Text>
                  <View
                    style={{
                      borderBottom: 0.5,
                      borderBottomStyle: 'dotted',
                      flex: 1,
                    }}
                  />
                  <Text style={{ marginLeft: 4 }}>{activity.schedule}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text>Exportado em: {dateTime}</Text>
        </View>
      </Page>
    </Document>
  );
}
