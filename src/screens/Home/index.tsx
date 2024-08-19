import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  const handlePaticipanAdd = () => {
    if (participants.includes(participantName.trim())) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.');
    }

    setParticipants([participantName.trim(), ...participants])
    setParticipantName('')
  }
  const handlePaticipanRemove = (name: string) => {
    Alert.alert('Remover participante', `Tem certeza que deseja remover o participante ${name}? Esta ação não poderá ser desfeita.`, [
      {
        text: 'Remover',
        onPress: () => setParticipants(participants.filter(Participant => Participant !== name)),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Segunda, 19 de Agosto de 2024.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handlePaticipanAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => 
          <Participant name={item} onRemove={handlePaticipanRemove}/>
        }
        ListEmptyComponent={() => 
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        }
      />
      
    </View>
  )
}

