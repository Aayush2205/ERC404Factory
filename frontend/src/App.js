import React, { useState } from 'react'
import Web3 from 'web3'

import ABI from "./JSON/factory.json"
import TokenABI from "./JSON/token.json"

import './App.css';

function App() {
  const [ accAddress, setAccAddress ] = useState('')
  const [ erc404ID, setErc404ID] = useState('')
  const [ erc404Address, setErc404Address ] = useState('')
  const [ tempContractAddr, setTempContarctAddr ] = useState('')
  const [ mintReturnData, setMintReturnData ] = useState({
    erc20:"",
    erc721:""
  })

  // Form 1 Data Structure
  const [formAddress, setFormAddress] = useState(
      {
        ownerAddress:'',
        name:'',
        symbol:'',
        decimal:''
      }
  )

  // Contract Address Form Data Structure
  const [contractAddressForm , setContractAddressForm] = useState({
    contractAddress:''
  })

  // ID Form Data Structure
  const [formID, setFormID] = useState({
      formID:"",
  })

  // Mint Form Data Structure
  const [mintData, setMintData] = useState({
    address:'',
    value:''
  })

  /////////////////////on Change Functions/////////////////////////////////////////////

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

  // Handle ContractAddress Change Form
  const onContractAddrChange = (e) => {
    // console.log(`val:${e.target.value}`)
    setContractAddressForm(
      (prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    })
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

// Handle ID Change Form
const onMintChange = (e) => {
    setMintData(
      (prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    })
    )
}

  /////////////////////Submit Functions/////////////////////////////////////////////

  // Handle Contract Address Submit Form
  const onContractAddrSubmit = async(e) => {
    e.preventDefault()
    // console.log(`contract Addres: ${contractAddressForm.contractAddress}`)
  }

  // Handle Submit Form
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
        // console.log(`contractAddr(from Main form): ${contractAddressForm.contractAddress}`)

        const factory = new web3.eth.Contract(ABI, 
            contractAddressForm.contractAddress,
            // '0x01b7c8a1F76307Fb5596d11DD02C03344044660d'
            )
    
        const tx = await factory.methods.deploy(
                                            // account[0],
                                            formAddress.ownerAddress, 
                                            formAddress.name, 
                                            formAddress.symbol, 
                                            formAddress.decimal.toString()
                                        )
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
            contractAddressForm.contractAddress,
            // '0x01b7c8a1F76307Fb5596d11DD02C03344044660d'
            )
    
        const tempErc404Address = await factory.methods.list(formID.formID).call()
        setErc404Address(tempErc404Address)
        
    } catch (error) {
        alert('Error')
    }
  }

  // Get Address from ID Submit Form 
  const handleID = async() => {
    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
    
        const factory = new web3.eth.Contract(ABI, 
            contractAddressForm.contractAddress,
            // '0x01b7c8a1F76307Fb5596d11DD02C03344044660d'
        )
        const tempID = await factory.methods.id().call()
    
        setErc404ID(Number(tempID) ? Number(tempID)-1 : 0)
        
    } catch (error) {
        alert('Error')
    }
  }

  // Handle Mint Submit Form
  const onMintSubmit = async(e) => {
    e.preventDefault()

    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
        // console.log(`contractAddr(from Main form): ${contractAddressForm.contractAddress}`)

        const factory = new web3.eth.Contract(TokenABI, 
            erc404Address,
            // contractAddressForm.contractAddress,
            // '0x01b7c8a1F76307Fb5596d11DD02C03344044660d'
            )
    
        await factory.methods.mintERC20(
                                mintData.address,
                                mintData.value
                            )
                            .send({
                                value:0,
                                from: account[0],
                                gasLimit: 8000000,
                                })
    } catch (error) {
        alert(`Error`)
    }
    // console.log(`Mint Form Submit:${JSON.stringify(mintData,null,4)}`)
  }

  ///////////////////////// Functions //////////////////////////////////////////

  // Connect Wallet Async Function
  const connectWallet = async()=>{
    try {
        let provider = window.ethereum;
        let accountAddresss
    
        if(typeof provider !== 'undefined'){
        await provider.request({method: 'eth_requestAccounts'})
        .then((accounts) =>{
            // console.log(`Account: ${accounts[0]}`);
            accountAddresss = accounts[0]
        }).catch((error)=>{
            alert('Error')
            // console.log(error);
        })
        
        window.ethereum.on('accountsChanged', function(accounts){
            // console.log(`Account changed to: ${accounts[0]}`)
            accountAddresss = accounts[0]
        })

        setAccAddress(accountAddresss)
        return
        }

        const web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();
        
        accAddress = accounts[0]
        // console.log(`Account: ${accAddress}`)
        
        setAccAddress(accAddress)
        return
    }
    catch (error) {
        alert('Connect Wallet Error')
    }
  }

  const getERCBalance=async()=>{
    try {
        const web3 = new Web3(window.ethereum)
        
        const account = await web3.eth.requestAccounts()
        // console.log(`contractAddr(from Main form): ${contractAddressForm.contractAddress}`)

        const factory = new web3.eth.Contract(TokenABI, 
            erc404Address,
            // contractAddressForm.contractAddress,
            // '0x01b7c8a1F76307Fb5596d11DD02C03344044660d'
            )
            const tempERC20 = await factory.methods
            .erc20BalanceOf(mintData.address)
            .call()

        const tempERC721 = await factory.methods
                    .erc721BalanceOf(mintData.address)
                    .call()

        setMintReturnData({
        erc20: Number(tempERC20),
        erc721: Number(tempERC721),
        })
    } catch (error) {
        
    }
  }

  

  return (
    <div className='form-container'>
        
        {/* Form Section Connect Wallet */}
        <div className="form-section">

                <button className='btn'
                    onClick={()=>connectWallet()}
                >
                    Connect Wallet
                </button>

                <br />
                <h3>{accAddress}</h3>
        </div>

        {/* Form Section Contract Address */}
        <div className='form-section'>
            <form onSubmit={onContractAddrSubmit}>
                <label>Contract Address</label>
                <input 
                    type="text" 
                    name= 'contractAddress'
                    id='contractAddress'
                    value = {contractAddressForm.contractAddress}
                    placeholder="contractAddress"
                    onChange={onContractAddrChange} />
                
                <br />
                    {/* <button type="submit" className="btn">
                        Submit Contract Address
                    </button> */}
            </form>

            <br />
            <h3>Contract Address: {contractAddressForm.contractAddress}</h3>
        </div>

        {/* Form Section Deploy */}
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

        {/* Form Section Get ID */}
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

        {/* Form Section Mint Function */}
        <div className='form-section'>

            <form onSubmit={onMintSubmit}>
                <label>Address</label>
                <input type="text" 
                    name= 'address'
                    id='address'
                    value = {mintData.address}
                    placeholder="Address"
                    autoComplete='off'
                    onChange={onMintChange} />

                <label>Value</label>
                <input type="text" 
                    name= 'value'
                    id='value'
                    value = {mintData.value}
                    placeholder="Value"
                    autoComplete='off'
                    onChange={onMintChange} />

                <button type="submit" className="btn">
                    Mint
                </button>
            </form>
            
            <br />
            
            <button className='btn'
                onClick={()=>getERCBalance()}
            >
                Get ERC Balance
            </button>
            
            <br />
            <h3>ERC20: {mintReturnData.erc20}</h3>
            <h3>ERC721: {mintReturnData.erc721}</h3>

        </div>
    </div>
  );
}

export default App;
