import Expo, {
  Constants,
  WebBrowser,
} from 'expo';
import React from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import qs from 'qs';

class App extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Redirect Example
        </Text>

        <Button
          onPress={this._openWebBrowserAsync}
          title="Tap here to try it out"
        />

        {this._maybeRenderRedirectData()}
      </View>
    );
  }

  _handleRedirect = (event) => {
    WebBrowser.dismissBrowser();

    let query = event.url.replace(Constants.linkingUri, '');
    let data;
    if (query) {
      data = qs.parse(query);
    } else {
      data = null;
    }

    this.setState({redirectData: data});
  }

  _openWebBrowserAsync = async () => {
    this._addLinkingListener();
    let result = await WebBrowser.openBrowserAsync(
      `https://backend-xxswjknyfi.now.sh//?linkingUri=${Constants.linkingUri}`
    );
    this._removeLinkingListener();
    this.setState({ result });

  }

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  }

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  }

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return (
      <Text>
        {JSON.stringify(this.state.redirectData)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
  },
});

Expo.registerRootComponent(App);
