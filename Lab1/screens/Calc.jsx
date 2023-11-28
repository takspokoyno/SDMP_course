import { View, Text, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const Calculator = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [selectedBase, setSelectedBase] = useState('2');
  const [selectedOperation, setSelectedOperation] = useState('+');
  const [result, setResult] = useState('');
  const [selectedResultBase, setSelectedResultBase] = useState('2');
  const navigation = useNavigation();

  const calculateResult = () => {
    let num1 = parseInt(number1, parseInt(selectedBase));
    let num2 = parseInt(number2, parseInt(selectedBase));
    let res = 0;
    switch (selectedOperation) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        res = num1 / num2;
        break;
      case '^':
        res = num1 ** num2;
        break;
      default:
        break;
    }
    setResult(res.toString());
  };

  const convertBase = (number) => {
    return parseInt(number, 10).toString(parseInt(selectedResultBase));
  };

  const bases = ["2", "8", "10", "16"];

  const saveToFile = async () => {
    try {
      const content = {
        number1,
        number2,
        selectedBase,
        selectedOperation,
        result,
        selectedResultBase,
      };
      const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
      console.log('Data saved to file.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadFromFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
      const content = await FileSystem.readAsStringAsync(fileUri);
      const data = JSON.parse(content);
      setNumber1(data.number1);
      setNumber2(data.number2);
      setSelectedBase(data.selectedBase);
      setSelectedOperation(data.selectedOperation);
      setResult(data.result);
      setSelectedResultBase(data.selectedResultBase);
      console.log('Data loaded from file.');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const goToAuthor = () => {
    navigation.navigate('Author'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{paddingBottom: 50}}>
      <Button  title='Author' onPress={goToAuthor}/>
      </View>
      <Picker
        selectedValue={selectedBase}
        style={{ height: 50, width: "50%" }}
        onValueChange={(itemValue) => setSelectedBase(itemValue)}
      >
        <Picker.Item label="Binary" value="2" />
        <Picker.Item label="Octal" value="8" />
        <Picker.Item label="Decimal" value="10" />
        <Picker.Item label="Hexadecimal" value="16" />
      </Picker>
      <TextInput
        style={{ height: 45, borderColor: 'blue', borderWidth: 2, margin: 10, width: 200 }}
        onChangeText={(text) => setNumber1(text)}
        value={number1}
        placeholder={`Enter number in base ${selectedBase}`}
      />
      <TextInput
        style={{ height: 45, borderColor: 'blue', borderWidth: 2, margin: 10, width: 200 }}
        onChangeText={(text) => setNumber2(text)}
        value={number2}
        placeholder={`Enter number in base ${selectedBase}`}
      />
      <Picker
        selectedValue={selectedOperation}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setSelectedOperation(itemValue)}
      >
        <Picker.Item label="+" value="+" />
        <Picker.Item label="-" value="-" />
        <Picker.Item label="*" value="*" />
        <Picker.Item label="/" value="/" />
        <Picker.Item label="^" value="^" />
      </Picker>
      <Text style={{ margin: 10 }}>Result: {result}</Text>
      <Picker
        selectedValue={selectedResultBase}
        style={{ height: 50, width: "40%" }}
        onValueChange={(itemValue) => setSelectedResultBase(itemValue)}
      >
        {bases.map((base) => (
          <Picker.Item key={base} label={`Base ${base}`} value={base} />
        ))}
      </Picker>
      <Text style={{ margin: 10 }}>
        Converted Result: {result ? convertBase(result) : ''}
      </Text >
      <View style={{display:'flex', flexDirection:'row'}}>
        <View style={{ margin:5}}>
      <Button color="#0000ff" title="Calculate" onPress={calculateResult} />
      </View>
      <View style={{ margin:5}}>
      <Button title="Save to File" onPress={saveToFile} />
      </View>
      <View style={{ margin:5}}>
      <Button title="Load from File" onPress={loadFromFile} />
      </View>
      </View>
    </View>
  );
};

export default Calculator;
