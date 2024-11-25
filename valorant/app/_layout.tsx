import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="characters"
        options={{
          title: 'Characters',
        }}
      />
      <Drawer.Screen
        name="weapons"
        options={{
          title: 'Weapons',
        }}
      />
    </Drawer>
  );
}

export default Layout;