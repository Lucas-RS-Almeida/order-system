import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateOrder from '../screens/CreateOrder';
import AddItemInOrder from '../screens/AddItemInOrder';
import ConcludeOrder from '../screens/ConcludeOrder';

const Stack = createNativeStackNavigator();

export default function CanAuth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateOrder" component={CreateOrder} options={{ headerShown: false }} />
      <Stack.Screen name="AddItemInOrder" component={AddItemInOrder} options={{ headerShown: false }} />
      <Stack.Screen name="ConcludeOrder" component={ConcludeOrder} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
