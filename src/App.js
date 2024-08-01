import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import RootNavigator from './navigation';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {View} from 'react-native';
import Loading from './components/loader';
import {StripeProvider} from '@stripe/stripe-react-native';

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    setPublishableKey(
      'pk_live_51Mg87cJWeBEg83ilUcNIuYF9scz2FsntvXAMDkW5STMTZ6DTCo0xZnlSEYJkUKobrjeG7nSxBcTpQI11qwt8p5Fo00YWj7BXNa',
    );
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKey}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <Loading />
            {/* <NoInternetModal show={isOffline} /> */}
            <RootNavigator />
          </View>
        </PersistGate>
      </StripeProvider>
    </Provider>
  );
}

export default App;
