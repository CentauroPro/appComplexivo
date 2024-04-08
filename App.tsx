import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './src/Navigators/StackNavigator';

export default function App() {
  return (
    <PaperProvider>
      <StackNavigator />
    </PaperProvider>

  );
}

