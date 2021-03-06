import React, { Component } from 'react';
import classes from './SiteBuilder.css';
import Aux from '../../hoc/Aux/Aux';
import Chain from '../../components/Chain/Chain';

import getWeb3 from '../../utils/getWeb3'
import cryptoValentineArtifacts from '../../../build/contracts/CryptoValentine.json';
//import LockCreation from '../../components/LockCreation/LockCreation';


//var CryptoValentine = contract(cryptoValentineArtifacts);

class SiteBuilder extends Component {
    constructor(props) {
      super(props);
        this.state = {
            message: "",
            web3: null
        }
      console.log(props);
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                //this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    sendMessage() {
        var message = "This is a test message";

        const contract = require('truffle-contract');
        const cryptoValentine = contract(cryptoValentineArtifacts);
        cryptoValentine.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        var cryptoValentineInstance;

        this.state.web3.eth.getAccounts((error, accounts) => {

            cryptoValentine.deployed().then((instance) => {
                cryptoValentineInstance = instance;

                return cryptoValentineInstance.setText(message, {
                    from: accounts[0],
                    gas: 40000,
                    amount: 0.002
                });
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                //TODO write get function in smart contract
                //That's just to try it 
                console.log(result);
            }).then((result) => {
                // TODO Update state with the result.
                console.error(result)
            })
        })
    }

    render() {
        return (
            <Aux>
                <h1 className={classes.Heading}> CryptoLove </h1>
                <Chain />
                <div className={classes.LockCreation}>
                    <textarea className={classes.TextBox}>
                        Write down a message.
                    </textarea>
                    <p></p>
                    <button onClick={this.sendMessage.bind(this)} className={classes.Button}>Engrave ❤️🔐</button>   
                </div>
                {/*<LockCreation />*/}
            </Aux>
        );
    }
}

export default SiteBuilder;