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

  studentList: {
    marginTop: 16,
  },

  studentCard: {
    // backgroundColor: '#f5f5f5',
    borderTop: 0.5,
    marginVertical: 12,
    paddingTop: 8,
  },

  studentCardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },

  studentCardActivity: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },

  avatar: {
    height: 64,
    objectFit: 'cover',
    minWidth: 64,
    width: 64,
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

function InfoItem({ label, content, style }) {
  return (
    <Text style={{ marginTop: 4, ...style }}>
      <TextBold>{label}:</TextBold> {content}
    </Text>
  );
}

export function StudentsListPDF({ students = [] }) {
  const dateTime = new Date().toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TextBold style={styles.title}>Grupo Cultural Adimó</TextBold>
        <Text style={styles.subtitle}>Estudantes matriculados</Text>

        <View style={styles.studentList}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentCardHeader}>
                {student?.avatar?.url && (
                  /* eslint-disable-next-line jsx-a11y/alt-text */
                  <Image
                    src={student.avatar.url}
                    cache
                    style={{ ...styles.avatar, ...styles.borderRadius }}
                  />
                )}

                <View style={{ marginLeft: 8, width: '100%' }}>
                  <InfoItem
                    label="Nome"
                    content={student.fullName}
                    style={{ marginTop: 0 }}
                  />
                  <InfoItem label="CPF" content={student.cpf} />
                  <InfoItem
                    label="Data de nascimento"
                    content={new Date(student.birthdate).toLocaleDateString()}
                  />
                  {student?.email && (
                    <InfoItem label="E-mail" content={student.email} />
                  )}
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
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
            </View>
          ))}
        </View>

        <View style={styles.footer} fixed>
          <Text>Exportado em: {dateTime}</Text>
        </View>
      </Page>
    </Document>
  );
}
