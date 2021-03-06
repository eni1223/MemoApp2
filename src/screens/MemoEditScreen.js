import React from 'react';
import { StyleSheet, View, Text, TextInput, InputAccessoryView, Keyboard, Button } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    key: '',
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.body,
      key: params.key,
     });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          createdOn: this.state.createdOn,
          createdOn: newDate,
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={(text) => { this.setState({ body: text }); }}
        />
        <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button
          onPress={() => Keyboard.dismiss()}
          title="完了"
          style={styles.memoEditButton}
        />
        </InputAccessoryView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
  memoEditButton: {
    alignItems: 'flex-end',
  },
});

export default MemoEditScreen;