import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

export default class Homepage extends Component {
    state = {
        isVisible: true
    }


    render() {

        return (
            <Appbar style={styles.top}>
                <Appbar.Action
                    icon="archive"
                    onPress={() => console.log('Pressed archive')}
                />
                <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')}/>
                <Appbar.Action icon="label" onPress={() => console.log('Pressed label')}/>
                <Appbar.Action
                    icon="delete"
                    onPress={() => console.log('Pressed delete')}
                />
            </Appbar>

        );

    };

}

const styles = StyleSheet.create({
    top: {
        position: 'absolute',

    },
});
