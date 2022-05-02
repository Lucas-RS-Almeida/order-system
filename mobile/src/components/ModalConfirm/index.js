import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ModalConfirm({ closeModal, acceptFunction }) {
  return (
    <TouchableOpacity
      onPress={closeModal}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text style={styles.title}>
          Essa mesa ainda está aberta.
          Você deseja adicionar novos pedidos para essa mesa?
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={closeModal}
          >
            <Text style={styles.textButtonCancel}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={acceptFunction}
            style={styles.buttonAccepet}
          >
            <Text style={styles.textButtonAccepet}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D1D2E',
  },
  box: {
    width: '92%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 24,
  },
  textButtonCancel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A8A8A',
  },
  buttonAccepet: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: 6,
    marginLeft: 16,
    backgroundColor: '#3FFFA3',
  },
  textButtonAccepet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
