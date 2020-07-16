import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

import ScreenChat from './screens/chat';
import ScreenChooseName from './screens/chooseName';
import ScreenChooseRoom from './screens/chooseRoom';

const MainNavigator = createStackNavigator({
    ChooseName: {screen: ScreenChooseName},
    ChooseRoom: {screen: ScreenChooseRoom},
    Chat: {screen: ScreenChat},
});

const App = createAppContainer(MainNavigator);

const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
    storageBackend: AsyncStorage,
   
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,
   
    // cache data in the memory. default is true.
    enableCache: true,
   
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
});
   
   
global.storage = storage;

export default App;
