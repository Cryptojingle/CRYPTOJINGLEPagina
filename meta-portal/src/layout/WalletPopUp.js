import { Fragment, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { semillaToggle, walletToggle } from "../redux/actions/siteSettings";
import ReCAPTCHA from "react-google-recaptcha";
import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import decodeJwt from "../utils/decodeJwt";
import { ethers } from "ethers";
import HDWalletProvider from '@truffle/hdwallet-provider';

import TwitterLogin from 'react-twitter-login';
import TwitterLoginButton from "../utils/TwitterLogin";
// import { MetaMaskProvider } from "metamask-react";
// import { MetaMaskSDK } from '@metamask/sdk';
//npm install @react-oauth/google
//import { GoogleLogin } from 'react-google-login';
//npm install google-auth-library --save --force
//npm i react-twitter-login --force
//npm install react-google-login
//npm install metamask-react --force
//
//twitter
//bearer token
//AAAAAAAAAAAAAAAAAAAAAIs1oQEAAAAAVvpkpEHrU8cocsfnaLtz1Chfz%2FQ%3DaaA2VRtNoZ7rCMF1cZb4VuljlhcUSvvdrZUnAjsNbGcwxyeDJj

//access token
//1670996871802761216-nIJ7l2RkedcbcbDrHcgWVYeGXBdsfH
//secret token
//oDIZ2KYpzTIZOoHxZkiEhvoRiS08xbzZkN186s7XJ3fpo
//npm i @truffle/hdwallet-provider@next
//npm uninstall ethers
//npm i -S ethers@5.7.2
const Bip39 = require('bip39');
//const CLIENT_ID = '162831488516-io4v72ialp9v348p7ntqnqaijk2i3shd.apps.googleusercontent.com';
const CLIENTE_ID ='474668266322-3uvmejp2v2moqdgkq009ebemrffm0ln7.apps.googleusercontent.com';
//const KEY_CAPTCHA = '6LdBR58mAAAAAB8HaSEfrxLTvs_QUU0n40tEajss';
const KEY_CAPTCHA = '6LemyMknAAAAADJrBxfc7x39_E9RfHfg8JAcnaqY'
//6LemyMknAAAAAIZT8m7rhMJvUCBXf2PbFSo1ximk

//captcha: 6LdBR58mAAAAAB8HaSEfrxLTvs_QUU0n40tEajss
//         6LdBR58mAAAAAMxBPDm-yQTK-7g_1LgcaNPMCKtC



// useEffect (() =>{
//   const start = () => {
//     gapi.auth2.init({
//       clientId : CLIENT_ID
//     })
//   }
//   gapi.load("client:auth2", start)
// },[]);
//npm install react-google-recaptcha --force

const WalletPopUp = ({ walletToggle, wallet }) => {
  const API_URL = 'http://18.189.33.125/';
  //const API_URL = 'http://ec2-52-14-120-83.us-east-2.compute.amazonaws.com';

  const [walletAddress, setWalletAddress] = useState('');
  const recaptchaRef = React.createRef();
  const captchaRef = useRef(null);
  const [frase, setFrase] = useState('');
  const [btnGenVisible, setbtnGenVisible] = useState(true);
  const [frmVisible, setfrmVisible] = useState(false);
  const [frmMedias, setfrmMedias] = useState(true);
  const [frmJingler, setfrmJingler] = useState(false);
  const [frmGoogle, setfrmGoogle] = useState(false);
  const [frmMeta, setfrmMeta] = useState(false);
  const [frmTwitter, setfrmTwitter] = useState(false);
  const [imgLogin, setImgLogin] = useState('');
  const inputRef = useRef(null);
  const [tipoLogin, setTipoLogin] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    clave: '',
    tipo: '',
    password: ''
  });

  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {

    // Asking if metamask is already present or not
    if (window.ethereum) {

      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    console.log(ethers);
    console.log(address);
    const _address = address;
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
          address: _address
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setFormData({
      ...formData,
      tipo: 'METAID',
      clave: account
    });
    setdata({
      address: account,
    });
    setfrmJingler(true);
    setfrmVisible(true);
    setbtnGenVisible(false);

    // Setting a balance
    getbalance(account);
  };

  let onChange = (value) => {
    console.log("Captcha value:", value);
  }
  const [email, setEmail] = useState('');

  const responseTwitter = (response) => {
    console.log(response);
    // Handle the response from Twitter login
  };


  async function onSuccess(credentialResponse) {
    console.log(credentialResponse);
    if (credentialResponse.credential) {
      // const response = await fetch("/api/hello");
      // console.log(response);

      const response = await fetch('/api/hello',
        {
          method: "POST",
          body: JSON.stringify({
            token: credentialResponse.credential,
          })
        });

      const json = await response.json();
      console.log("verify ", json);
      console.log("status ", response);
      setEmail()
      if (response.status == 200) {
        const { payload } = decodeJwt(credentialResponse.credential);

        setEmail(payload.email);

        formData.id = payload.email;
        formData.name = payload.name;
        formData.email = payload.email;
        formData.tipo = 'GOOGLEID';
        formData.clave = payload.email;

        console.log('formData');
        console.log(formData);
        setImgLogin(payload.picture);
        setfrmJingler(false);
        setfrmVisible(false);
        setbtnGenVisible(false);
        guardarGoogle();
      }

    }
  }

  const onFailure = (response) => {
    console.log(response);
  }

  const handleJinglerIDClick = () => {
    setTipoLogin('JINGLEID')
    setfrmMedias(false);
    setfrmJingler(true);
    setbtnGenVisible(true);
  };

  const handleGoogleIDClick = () => {
    setTipoLogin('GOOGLEID');
    setfrmMedias(false);
    setfrmTwitter(false);
    setfrmGoogle(true);
  };


  const handleTwitterIDClick = () => {
    setfrmMedias(false);
    setfrmGoogle(false);
    setfrmTwitter(true);
  };

  const handleClick = () => {
    let _frase = Bip39.generateMnemonic();
    setFrase(_frase);
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(_frase);
    }
    setbtnGenVisible(false);
    setfrmVisible(true);
  };


  const handleMetaIDClick = () => {
    setfrmMedias(false);
    setfrmMeta(true);
    setTipoLogin('METAID');
    setbtnGenVisible(true);

  };

  const handleCopyClick = () => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(frase);
      alert('Texto copiado al portapapeles');
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validarUsuario = (e) => {

    fetch( API_URL+'/api/users/' + formData.id.toLocaleUpperCase(), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

      },
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        console.log('Id: ' + formData.id);
        if (data && data['id'] == formData.id.toLocaleUpperCase()) {
          e.target.value = '';
          alert('Usuario: ' + data['id'] + ' ya existe');
          formData.name = '';
          formData.id = '';
          inputRef.current.focus();
        }
      })
      .catch(error => console.log(error));
    console.log('datos:');
    console.log(formData);

    // Aquí puedes agregar el código que deseas ejecutar cuando se haga clic en el botón
  };

  const guardarGoogle = () => {
    // const recaptchaValue = recaptchaRef.current.getValue();
    // if (recaptchaValue == "") {
    //   alert("es necesario indicar que no es un robot");
    //   return;
    // }

    // recaptchaRef.current.reset();
    formData.tipo = tipoLogin;
    fetch(API_URL+'/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

      },
    })
      .then((res) => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipoLogin == 'JINGLEID') {
      const recaptchaValue = recaptchaRef.current.getValue();
      if (recaptchaValue == "") {
        alert("es necesario indicar que no es un robot");
        return;
      }

      recaptchaRef.current.reset();

      const seed = Bip39.mnemonicToSeedSync(frase, ""); // (mnemonic, password)
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      console.log(`Generated new KeyPair. Wallet PublicKey: seed `, `${keypair.publicKey.toBase58()}`);

      //STEP 2 - Generate a New Solana Wallet
      //const keypair = Keypair.generate();
      console.log(keypair);

      console.log(`Generated new KeyPair. Wallet PublicKey: `, keypair.publicKey.toString());
      //STEP 3 - Write Wallet Secret Key to a .JSON
      const secret_array = keypair.secretKey
        .toString() //convert secret key to string
        .split(',') //delimit string by commas and convert to an array of strings
        .map(value => Number(value)); //convert string values to numbers inside the array

      const secret = JSON.stringify(secret_array); //Covert to JSON string
      console.log(secret);

      const provider = new HDWalletProvider(
        frase,
        // RPC endpoint for the Polygon network
        'https://polygon-rpc.com'
      );

      // Create an ethers.js instance with the provider
      const ethersProvider = new ethers.providers.Web3Provider(provider);

      // Get the first account's address from the wallet
      const accounts = await ethersProvider.listAccounts();
      const address = accounts[0];
      console.log(address);
      // Update the wallet address state
      setWalletAddress(address);

      // Disconnect the wallet provider
      provider.engine.stop();
      formData.clave = address;
    }
    formData.tipo = tipoLogin;
    console.log(formData);

    fetch(API_URL+'/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

      },
    })
      .then((res) => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    console.log(formData);
  };

  const textareaStyles = {
    height: '30%',
    backgroundColor: 'white',
    color: 'black',
    // Agrega otros estilos personalizados si es necesario
  };
  const salir = (e) => {
    setFormData({
      id: '',
      name: '',
      email: '',
      clave: '',
      tipo: '',
      password: ''
    });
    setfrmMedias(true);
    setfrmJingler(false);
    setFrase("");
    setbtnGenVisible(false);
    setfrmVisible(false);
    setfrmGoogle(false);
    setfrmTwitter(false);
    setfrmMeta(false);
    walletToggle(false);

  }

  return (

    <Fragment>

      <div
        className={`metaportal_fn_wallet_closer ${wallet ? "active" : ""}`}
        onClick={() => salir(false)}
      />
      <div className={`metaportal_fn_walletbox ${wallet ? "active" : ""}`}>
        <a href="#" className="fn__closer" onClick={() => salir(false)}>
          <span />
        </a>
        <div>
          <div className="btn">
            <div>
              <img src={imgLogin} />
            </div>
            {frmGoogle && (
              <GoogleOAuthProvider clientId="474668266322-3uvmejp2v2moqdgkq009ebemrffm0ln7.apps.googleusercontent.com">
                <GoogleLogin
                  useOneTap
                  clientId='474668266322-3uvmejp2v2moqdgkq009ebemrffm0ln7.apps.googleusercontent.com'
                  buttonText="Iniciar sesión con Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </GoogleOAuthProvider>

            )}
          </div>

          <div className="btn">
            <div>
              {/* <img src={imgLogin} />*/}
            </div>
            {frmMeta && (

              <div>
                <span> <strong>Address: </strong>
                  {data.address}
                </span>

                <span>
                  <strong>Balance: </strong>
                  {data.Balance}
                </span>
                <button onClick={btnhandler}>Connect to wallet</button>

              </div>


            )}
          </div>
          {frmMedias && (
            <div className="walletbox">

              <div className="title_holder">
                <h3>let`&apos;`s play</h3>
                <p>
                  Enter the way that works best for you, we are waiting for you!
                </p>
              </div>
              <div className="list_holder">
                <ul className="metaportal_fn_items">
                  <li>
                    <div className="item">
                      <a href="#" onClick={() => handleJinglerIDClick()} />
                      <span className="icon">
                        <img src="/img/wallet/JinglerID.png" alt="" />
                      </span>
                      <span className="text">Jingler ID</span>
                    </div>
                  </li>
                  {/* <li>
                    <div className="item">
                      <a href="#" onClick={() => handleTwitterIDClick()} />
                      <span className="icon">
                        <img src="/img/wallet/coinbase.png" alt="" />
                      </span>
                      <span className="text">Twitter</span>
                    </div>
                  </li> */}
                  <li>
                    <div className="item">
                      <a href="#" onClick={() => handleGoogleIDClick()} />
                      <span className="icon">
                        <img src="/img/wallet/walletconnect.png" alt="" />
                      </span>
                      <span className="text">Google</span>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <a href="#" onClick={() => handleMetaIDClick()} />

                      <span className="icon">
                        <img src="/img/wallet/venly.png" alt="" />
                      </span>
                      <span className="text">Wallet Connect</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          {frmJingler && (
            <div className="walletbox">
               {frase && (
                <div>
                  <div className="title_holder">
                    <p className="phrase_caption"><strong>Copia las siguientes palabras para que en un futuro recuperes tu cuenta</strong></p>
                    <div className="spacer_15"></div>
                    <div>
                        <p>
                          <div className="text_phrase"><div className="spacer_10"></div>{frase}<div className="spacer_10"></div></div>
                          <div className="spacer_10"></div>
                          { window.isSecureContext &&( 
                            <div className="center_button">
                              <div onClick={handleCopyClick} className="metaportal_fn_button_popup">Copiar</div>
                            </div>
                          )}
                        </p>
                    </div>
                  </div>
                </div>)
                }
              <div>
                <div className="list_holder">
                  <div>
                    {btnGenVisible && (
                      <ul className="metaportal_fn_items">
                        <li>
                          <div className="item">
                            <a href="#"
                              onClick={() => handleClick()}
                            >
                            </a>

                            <span className="text">Generar</span>

                          </div>
                        </li>

                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  {frmVisible && (
                    <form onSubmit={handleSubmit}>

                      <div className="row">
                        <div className="col-md-3">
                          <label>
                            Id
                          </label>
                        </div>

                      </div>

                      <div className="row">

                        <div className="col-md-3">

                          <input
                            type="text"
                            name="id"
                            ref={inputRef}
                            className="form-control"
                            value={formData.id}
                            onBlur={validarUsuario}
                            onChange={handleChange}
                          />

                        </div>
                      </div>
                      {!(frmMeta) && (
                        <div>


                          <div className="row">
                            <div className="col-md-3">
                              <label>
                                Nombre
                              </label>
                            </div>

                          </div>


                          <div className="row">

                            <div className="col-md-3">

                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}

                              />

                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <label>
                                Email
                              </label>
                            </div>

                          </div>


                          <div className="row">

                            <div className="col-md-3">

                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}

                              />

                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <label>
                                Contraseña
                              </label>
                            </div>

                          </div>


                          <div className="row">

                            <div className="col-md-3">

                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}

                              />

                            </div>

                          </div>
                        </div>
                      )}
                      <div className="spacer_20"></div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="captcha">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey="6LemyMknAAAAADJrBxfc7x39_E9RfHfg8JAcnaqY"
                              theme="dark"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="spacer_15"></div>
                      <div className="row">

                        <div className="col-md-1">
                          <div className="center_button">
                            <div className="metaportal_fn_button_popup" type="submit">Registrar</div>
                          </div>
                        </div>
                      </div>

                    </form>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment >
  );
};

const mapStateToProps = (state) => ({
  wallet: state.site.wallet,
});

export default connect(mapStateToProps, { walletToggle })(WalletPopUp);
