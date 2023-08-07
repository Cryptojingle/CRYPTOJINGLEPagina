import { Fragment, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { semillaToggle, walletToggle } from "../redux/actions/siteSettings";
import ReCAPTCHA from "react-google-recaptcha";
import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import decodeJwt from "../utils/decodeJwt"; 
import TwitterLogin from 'react-twitter-login';
import TwitterLoginButton from "../utils/TwitterLogin";

//npm install @react-oauth/google
//import { GoogleLogin } from 'react-google-login';
//npm install google-auth-library --save --force
//npm i react-twitter-login --force
//npm install react-google-login


//twitter
//bearer token
//AAAAAAAAAAAAAAAAAAAAAIs1oQEAAAAAVvpkpEHrU8cocsfnaLtz1Chfz%2FQ%3DaaA2VRtNoZ7rCMF1cZb4VuljlhcUSvvdrZUnAjsNbGcwxyeDJj

//access token
//1670996871802761216-nIJ7l2RkedcbcbDrHcgWVYeGXBdsfH
//secret token
//oDIZ2KYpzTIZOoHxZkiEhvoRiS08xbzZkN186s7XJ3fpo

const Bip39 = require('bip39');
const CLIENT_ID = '162831488516-io4v72ialp9v348p7ntqnqaijk2i3shd.apps.googleusercontent.com';
const KEY_CAPTCHA = '6LdBR58mAAAAAB8HaSEfrxLTvs_QUU0n40tEajss';
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

  const recaptchaRef = React.createRef();
  const captchaRef = useRef(null);
  const [frase, setFrase] = useState('');
  const [btnGenVisible, setbtnGenVisible] = useState(true);
  const [frmVisible, setfrmVisible] = useState(false);
  const [frmMedias, setfrmMedias] = useState(true);
  const [frmJingler, setfrmJingler] = useState(false);
  const [frmGoogle, setfrmGoogle] = useState(false);
  const [frmTwitter, setfrmTwitter] = useState(false);
  const [imgLogin, setImgLogin] = useState('');
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    clavePrivada: '',
    clavePublica: '',
    password: ''
  });

  let onChange = (value) => {
    console.log("Captcha value:", value);
  }
  const [email, setEmail] = useState(''); 
   
  const responseTwitter = (response) => {
    console.log(response);
    // Handle the response from Twitter login
  };
 

  async function onSuccess(credentialResponse)
  {
    console.log(credentialResponse);
    if(credentialResponse.credential) {
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
      if(response.status == 200){
        const { payload } = decodeJwt(credentialResponse.credential); 
        setEmail(payload.email); 
        setImgLogin(payload.picture);
        console.log(payload);
      }
      
    }
  }

  const onFailure = (response) => {
    console.log(response);
  }

  const handleJinglerIDClick = () => {
    setfrmMedias(false);
    setfrmJingler(true);
    setbtnGenVisible(true);
  };

  const handleGoogleIDClick = () => {
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
    navigator.clipboard.writeText(_frase);
    setbtnGenVisible(false);
    setfrmVisible(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(frase);
    alert('Texto copiado al portapapeles');
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validarUsuario = (e) => {

    fetch('http://localhost:9000/api/users/' + formData.id, {
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
        if (data && data['id'] == formData.id) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue == "") {
      alert("es necesario indicar que no es un robot");
      return;
    }

    recaptchaRef.current.reset();

    //     await axios.post(inputVal, recaptchaValue)
    //     .then(res =>  console.log(res))
    //     .catch((error) => {
    //     console.log(error);
    //     })

    const endpoint = 'https://newest-frequent-haze.solana-devnet.discover.quiknode.pro/8c8d6440dc7f8aa806ebc52cf4af07d351b7968c/'; //Replace with your RPC Endpoint
    const solanaConnection = new Connection(endpoint);

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


    formData.clavePublica = keypair.publicKey.toString();
    //formData.clavePrivada = secret;
    formData.clavePrivada = '';
    fetch('http://localhost:9000/api/users', {
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
      clavePrivada: '',
      clavePublica: '',
      password: ''
    });
    setfrmMedias(true);
    setfrmJingler(false);
    setFrase("");
    setbtnGenVisible(false);
    setfrmVisible(false);
    setfrmGoogle(false);
    setfrmTwitter(false);
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
              <GoogleOAuthProvider clientId="162831488516-io4v72ialp9v348p7ntqnqaijk2i3shd.apps.googleusercontent.com">
              <GoogleLogin
                useOneTap
                clientId='162831488516-io4v72ialp9v348p7ntqnqaijk2i3shd.apps.googleusercontent.com'
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
                <img src={imgLogin} />
                </div>
            {frmTwitter && (
             <TwitterLoginButton/>
             
            )}
          </div>
          {frmMedias && (
            <div className="walletbox">

              <div className="title_holder">
                <h3>let's play</h3>
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
                  <li>
                    <div className="item">
                    <a href="#" onClick={() => handleTwitterIDClick()} />
                      <span className="icon">
                        <img src="/img/wallet/coinbase.png" alt="" />
                      </span>
                      <span className="text">Twitter</span>
                    </div>
                  </li>
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
                      <a href="#" />

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
              <div className="title_holder">
                <p><strong>Copia las siguientes palabras para que en un futuro recuperes tu cuenta</strong></p>

                <div >
                  {frase && (
                    <p>
                      <textarea value={frase} readOnly style={textareaStyles} />
                      <button onClick={handleCopyClick}>Copiar</button>
                    </p>)
                  }
                </div>

              </div>
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
                            Password
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
                      <div className="row">
                        <div className="col-md-12">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdBR58mAAAAAB8HaSEfrxLTvs_QUU0n40tEajss"
                          />
                        </div>
                      </div>

                      <div className="row">

                        <div className="col-md-1">
                          <button className="btn btn-primary" type="submit">Registrar</button>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.site.wallet,
});

export default connect(mapStateToProps, { walletToggle })(WalletPopUp);
