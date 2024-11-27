import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontWeight: "bold", fontSize: 24}}>Welcome to the app</Text>
      <Text style={{fontWeight: "100", marginBottom: 20}}>This is a dummy text</Text>
      <Link href="/" replace asChild>
        <Button title='Home'/>
      </Link>
      <Link href="/(home)/screen1" replace asChild>
        <Button title='Characters'/>
      </Link>
    </View>
  );
}

export default Home;