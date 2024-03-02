import React, { useState } from 'react'
import Web3 from 'web3'

import ABI from "./JSON/factory.json"
import './App.css';

function App() {
  const [ accAddress, setAccAddress ] = useState('')
  const [ erc404ID, setErc404ID] = useState('')
  const [ erc404Address, setErc404Address ] = useState('')

  // Form 1 Data Structure
  const [formAddress, setFormAddress] = useState(
      {
          ownerAddress:'',
          name:'',
          symbol:'',
          decimal:''
      }
  )

  // ID Form Data Structure
  const [formID, setFormID] = useState({
      formID:"",
  })

  // Handle Change Form
  const onChange = (e) => {
      setFormAddress(
          (prevState)=>(
            {
            ...prevState,
            [e.target.name] : e.target.value
            }
          )
      )
  }

  // Handle ID Change Form
  const onIDChange = (e) => {
      setFormID(
        (prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      })
      )
  }

  // Handle Submit Form
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()

        const factory = new web3.eth.Contract(ABI, 
            '0x01b7c8a1F76307Fb5596d11DD02C03344044660d')
    
        const tx = await factory.methods.deploy(account[0], 
                                            formAddress.name, 
                                            formAddress.symbol, 
                                            formAddress.decimal.toString())
                                        .send({
                                            value:0,
                                            from: account[0],
                                            gasLimit: 8000000,
                                            })
    } catch (error) {
        alert(`Error`)
    }
  }

  // Handle ID Submit Form
  const onIDSubmit = async(e) => {
    e.preventDefault()

    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
    
        const factory = new web3.eth.Contract(ABI, 
            '0x01b7c8a1F76307Fb5596d11DD02C03344044660d')
    
        const tempErc404Address = await factory.methods.list(formID.formID).call()
        setErc404Address(tempErc404Address)
        
    } catch (error) {
        alert('Error')
    }
  }

  // Connect Wallet Async Function
  const connectWallet = async()=>{
    try {
        let provider = window.ethereum;
        let accountAddresss
    
        if(typeof provider !== 'undefined'){
        await provider.request({method: 'eth_requestAccounts'})
        .then((accounts) =>{
            console.log(`Account: ${accounts[0]}`);
            accountAddresss = accounts[0]
        }).catch((error)=>{
            console.log(error);
        })
        
        window.ethereum.on('accountsChanged', function(accounts){
            console.log(`Account changed to: ${accounts[0]}`)
            accountAddresss = accounts[0]
        })

        setAccAddress(accountAddresss)
        return
        }

        const web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();
        
        accAddress = accounts[0]
        console.log(`Account: ${accAddress}`)
        
        setAccAddress(accAddress)
        return
    }
    catch (error) {
        alert('Connect Wallet Error')
    }
  }

  // Get Address from ID Submit Form 
  const handleID = async() => {
    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
    
        const factory = new web3.eth.Contract(ABI, 
        '0x01b7c8a1F76307Fb5596d11DD02C03344044660d')
        const tempID = await factory.methods.id().call()
    
        setErc404ID(Number(tempID) ? Number(tempID)-1 : 0)
        
    } catch (error) {
        alert('Error')
    }
  }

  return (
    <div className='form-container'>
        
        {/* Form Section 1 */}
        <div className="form-section">

                <button className='btn'
                    onClick={()=>connectWallet()}
                >
                    Connect Wallet
                </button>

                <br />
                <h3>{accAddress}</h3>
        </div>

        {/* Form Section 2 */}
        <div className='form-section'>


            <form onSubmit={onSubmit}>
                <label>ownerAddress</label>
                <input 
                    type="text" 
                    name= 'ownerAddress'
                    id='ownerAddress'
                    value = {formAddress.ownerAddress}
                    placeholder="ownerAddress"
                    onChange={onChange} />

                <label>name</label>
                <input 
                    type="text" 
                    name= 'name'
                    id='name'
                    value = {formAddress.name}
                    placeholder="name"
                    autoComplete='off'
                    onChange={onChange} />
                    
                <label>symbol</label>
                <input 
                    type="text" 
                    name= 'symbol'
                    id='symbol'
                    value = {formAddress.symbol}
                    placeholder="symbol"
                    autoComplete='off'
                    onChange={onChange} />
                
                <label>decimal</label>
                <input 
                    type="number" 
                    name= 'decimal'
                    id='decimal'
                    value = {formAddress.decimal}
                    placeholder="decimal"
                    autoComplete='off'
                    onChange={onChange} />
                
                <br />
                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
            
            <br />
            
            <h3>ID: {erc404ID}</h3>
            <button className="btn"
                onClick={()=>handleID()}
            >
                Get ID
            </button>
        </div>

        {/* Form Section 3 */}
        <div className='form-section'>

            <form onSubmit={onIDSubmit}>
                <label>ID</label>
                <input type="text" 
                    name= 'formID'
                    id='formID'
                    value = {formID.formID}
                    placeholder="ID"
                    autoComplete='off'
                    onChange={onIDChange} />

                <button type="submit" className="btn">
                    Get Address
                </button>
            </form>
            
            <br />
            
            <h3>{erc404Address}</h3>

        </div>
    </div>
  );
}

export default App;
