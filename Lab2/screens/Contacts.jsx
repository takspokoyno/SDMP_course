import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [knuContacts, setKnuContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data);

const knuFilteredContacts = data.filter(contact =>
    contact.emails?.some(emailObj => emailObj.email.endsWith('@knu.ua'))
  );
  setKnuContacts(knuFilteredContacts);
        }
      }
    };

    loadContacts();
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>All contacts:</Text>
      <FlatList
        style={styles.list}
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.firstName}</Text>
          </View>
        )}
      />
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>With KNU mails, "@knu.ua":</Text>
      <FlatList
        style={styles.list}
        data={knuContacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.firstName}</Text>
          </View>
        )}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      section: {
        height: "45%",
        width: '100%',
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      list: {
        width: '100%',
      },
      listItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
});
