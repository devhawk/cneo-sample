import Neon, { api, wallet } from "@cityofzion/neon-js";

const operation = "mintTokens"
const rpcUrl = "http://127.0.0.1:49332";
const testUserPrivateKey = "10bb731683dddc262d61ddd528ad27d9890c6fbc478b855a67a49cf62c136399";
const testUserAccount = new wallet.Account(testUserPrivateKey);
const contractScriptHash = "30f41a14ca6019038b055b585d002b287b5fdd47";

async function mainAsync() {
    const sb = Neon.create.scriptBuilder();
    const config = {
        api: new api.neoCli.instance(rpcUrl),
        account: testUserAccount,
        script: sb.emitAppCall(contractScriptHash, "mintTokens").str,
        intents: api.makeIntent({ NEO: 1000 }, contractScriptHash)
     };

     var result = await Neon.doInvoke(config);
     console.log("\n\n--- Response ---");
     console.log(result.response);
 }

 mainAsync().catch(err => { console.log(err); });
