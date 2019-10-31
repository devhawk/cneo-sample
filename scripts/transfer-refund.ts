import Neon, { api, wallet, tx, sc, nep5, rpc, u } from "@cityofzion/neon-js";

const rpcUrl = "http://127.0.0.1:49332";
const testUserPrivateKey = "10bb731683dddc262d61ddd528ad27d9890c6fbc478b855a67a49cf62c136399";
const testUserAccount = new wallet.Account(testUserPrivateKey);
const contractScriptHash = "30f41a14ca6019038b055b585d002b287b5fdd47";

async function mainAsync() {

    let transferTx = new tx.ContractTransaction({
        inputs: [
            {
                prevHash: "f09af8f178fd0c5b5157e02cabd1858ad025fb82cc04848d43799ce17619189d",
                prevIndex: 0
            }
        ],
        outputs: [
            {
                assetId: Neon.CONST.ASSET_ID.NEO,
                value: 1000,
                scriptHash: testUserAccount.scriptHash
            }
        ]
    });

    // I need to emit two parameters here, but the values don't matter
    // as cneo verification doesn't use them
    
    const contractWitness = new tx.Witness({
        invocationScript: "0000",
        verificationScript: ""
    })
    contractWitness.scriptHash = contractScriptHash;
    transferTx.addWitness(contractWitness);

    console.log(JSON.stringify(transferTx.export(), null, 2));
    console.log(transferTx.hash);

    const client = new rpc.RPCClient(rpcUrl);
    var response = await client.sendRawTransaction(transferTx);

    console.log("\n\n--- Response ---");
    console.log(response);
}

mainAsync().catch(err => { console.log(err); });
