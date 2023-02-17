// importando as dependencias
const bip32 = require ('bip32')
const bip39 = require ('bip39')
const bitcoin = require ('bitcoinjs-lib')

//definir a rede 
//caso queira rodar na rede principal (mainet) substituir .testenet para .bitcoin
const  network = bitcoin.networks.testnet

//Derivação de carteiras HD 
// 1 - teste net
// 0  -main net
const path = `m/49'/1'/0'/0`

// Criando o mnemonic para seed(palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta par pvt-pub keys
let account  = root.derivePath(path)
let node = account.derive(0).derive(0)// Permite derivar contas atraves da raiz

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey, 
    network: network, 
}).address

console.log ("Carteira gerada")
console.log("Endereço: ", btcAdress)
console.log ("Chave privada:", node.toWIF()) //WIF:Wallet Import Format, permite que seja importada a carteira para um software de geranciamento
console.log("Seed:",mnemonic)

