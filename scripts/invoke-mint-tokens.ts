import Neon, { api, wallet, sc, nep5, rpc } from "@cityofzion/neon-js";

const testUserPrivateKey = "10bb731683dddc262d61ddd528ad27d9890c6fbc478b855a67a49cf62c136399";
const sb = Neon.create.scriptBuilder();
const rpcUrl = "http://127.0.0.1:49332";
const contractScriptHash = "30f41a14ca6019038b055b585d002b287b5fdd47";

const config = {
    api: new api.neoCli.instance(rpcUrl),
    account: new wallet.Account(testUserPrivateKey),
    script: sb.emitAppCall(contractScriptHash, "mintTokens").str,
    intents: api.makeIntent({ NEO: 1000 }, contractScriptHash)
 };
 
 Neon.doInvoke(config)
    .then(config => {
        console.log("\n\n--- Response ---");
        console.log(config.response);
    })
    .catch(config => {
        console.log(config);
    });