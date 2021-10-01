import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState:'normal'
    })
  }

  getCameraPermission = async() => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState === 'clicked' && hasCameraPermissions) {
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
           />
      )
    }
    this.setState({
      hasCameraPermissions: status === "granted"
    })
  }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>

            hasCameraPermissions===true?this.state.scannedData:"Request Camera Permissions"

          </Text>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={this.getCameraPermission}>

            <Text style={styles.buttonText}> Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });