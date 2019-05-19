import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          canGoBack: false
        }
    }  
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.state.canGoBack) {
           this.refWeb.goBack();
        } else {
            BackHandler.exitApp();
        }
        return true;
    }
     
    onNavigationStateChange = (navState) => {
         this.setState({
            canGoBack: navState.canGoBack
         });
     }
                    

    renderWebView() {
        return (
            <WebView 
                source={{ uri: 'https://w3schools.com' }}   
                ref={(myWeb) => this.refWeb = myWeb}
                decelerationRate='normal'
                onNavigationStateChange={(e) => this.onNavigationStateChange(e)} 
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