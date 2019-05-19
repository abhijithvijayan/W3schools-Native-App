import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, BackHandler, ToastAndroid  } from 'react-native';
import { WebView } from 'react-native-webview';

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.lastBackButtonPress = null;
    
        this.state = {
          canGoBack: false,
          ref: null,
        }
    }  
    
    componentDidMount() {        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
            BackHandler.exitApp();
            return true;
        }
        if (this.state.canGoBack && this.state.ref) {
            this.state.ref.goBack();
        }
        this.lastBackButtonPress = new Date().getTime();
        return true;
    }                 

    renderWebView() {
        return (
            <WebView 
                source={{ uri: 'https://w3schools.com' }}   
                ref={(webView) => this.state.ref = webView}
                decelerationRate='normal'
                onNavigationStateChange={(navState) => this.state.canGoBack = navState.canGoBack } 
                scalesPageToFit={true}                
                startInLoadingState={true}
                mixedContentMode='always'
                thirdPartyCookiesEnabled={true}
                useWebKit={true}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderWebView()}
            </View>
        );
    };
};

export default HomeScreen;