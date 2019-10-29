<!-- markdownlint-enable -->
# NEO Blockchain Toolkit - CNEO Sample

This repo contains the [CNEO Smart Contract sample](https://github.com/neo-ngd/CNEO-Contract)
with additional assets that can be used with the
[NEO Blockchain Toolkit](https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-blockchain-toolkit).
This readme covers the basics of how to use NEO Express,
[NEO Visual DevTracker](https://github.com/ngdseattle/neo-visual-devtracker)
and the NEO Smart Contract Debugger for Visual Studio Code.

## Prerequisites

> Note, both .NET core 2.2 and 3.0 are required.

- [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
- [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.0)
- [Visual Studio Code (v1.37 or later)](https://code.visualstudio.com/Download)
- [NEO Blockchain Toolkit for .NET](https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-blockchain-toolkit)

## Installation

Download the prerelease versions of NEO Express, NEON-DE and the NEO Smart Contract
Debugger from [Harry's OneDrive](https://vcagecom56739-my.sharepoint.com/:f:/g/personal/harrypierson_ngd_neo_org/EjpBghBNJO5IuCxKjMiOTagBCpPA1QOPngvjPx-2y9h90g?e=e9ur9l).

To install the NEO Smart Contract Debugger .VSIX file, Follow the
[official VSCode documentation](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix).

To install NEO Express and the NEON-DE compiler, open a terminal window,
switch to the directory where you downloaded the prerelease binaries and execute
the following commands to install the tools via dotnet command line:

``` shell
$ dotnet tool install neo.express -g --add-source . --version 0.9.67-preview
You can invoke the tool using the following command: neo-express
Tool 'neo.express' (version '0.9.67-preview') was successfully installed.

$ dotnet tool install neo.neon-de -g --add-source . --version 2.5.2-preview
You can invoke the tool using the following command: neon-de
Tool 'neo.neon-de' (version '2.5.2-preview') was successfully installed.
```

> Note, since these packages have -preview in their version number, the
> --version option is requied. As this release gets finalized, the version
> numbers of the nuget packages may change. Please use the version number
> from the actual files downloaded if they differ from the example above.

If this is the first time you've used
[.NET Core global tools](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools),
you will need to shutdown your terminal windows and reopen it. You may need to
log out completely and log back in again. Make sure the tools are correctly installed
and your path is correctly set up by running `neo-express --version` and `neon-de`.
The tools  should echo back the version number. It will look similar to this:

``` shell
$ neo-express --version
0.9.67-preview+191232b91a

$ neon-de
Neo.Compiler.MSIL console app v2.5.0.0
need one param for DLL filename.
[--compatible] disable nep8 function and disable SyscallInteropHash
Example:neon abc.dll --compatible
```

Once all the parts of the NEO Blockchain Toolkit are installed, launch Visual
Studio Code (aka VSCode) and open the folder where you cloned this repository.

## Repository Layout

This repository has several files and folders of note for NEO Blockchain Toolkit
users.

- default.neo-express.json file contains the NEO-Express instance used by this
  sample.
- contract folder contains the CNEO smart contract. The C# code is unchanged
  from the [original sample](https://github.com/neo-ngd/CNEO-Contract). However,
  the project build file are different, reflecting the use of .NET Core and the
  Debugger Enhancements fork of the NEON Compiler
- scripts folder contains two [NEON-JS](https://github.com/CityOfZion/neon-js) scripts
  for invoking the mintTokens and refund operations of the CNEO smart contract.
- checkpoints folder contains several checkpoints of the NEO-Express instance in
  various different states (initial configuration, after CNEO contract deployment,
  after mintTokens operation invoked and after refund operation invoked). These checkpoints
  can be run or restored, but they are of primary use by the debugger
- .vscode folder contains the [VSCode Launch Configurations](https://code.visualstudio.com/Docs/editor/debugging#_launch-configurations)
  that invoke the various operations of the CNEO smart contract in the debugger.

## Visual DevTracker

First, lets explore the NEO-Express instance using the new Visual DevTracker. In
order to have something to look at, let's first restore one of the checkpoints.
Open a terminal window, change to the root directory of this repository and execute
the following command.

``` shell
$ neo-express checkpoint restore .\checkpoints\4-refund-invoked.neo-express-checkpoint --force
Checkpoint .\checkpoints\4-refund-invoked.neo-express-checkpoint sucessfully restored
```

You open Visual DevTracker by selecting a blockchain from the NEO RPC Servers
window in the VSCode Explorer view.

![NEO-Express config detection](screenshots\visual-devtracker-1.png)

You can immediately get a feel for the tracker by selecting either MainNet or
TestNet. To inspect the CNEO sample blockchain instance, we need to start NEO Express.
We can do that from VSCode by pressing the Play arrow button for Node #1 in the
NEO RPC Servers Window. You can also right click the node and select "Start NEO
Express" from the context menu. NEO-Express output will be displayed in the VSCode
integrated terminal window. Once NEO-Express is running, you can select Node #1
to open the Block Explorer window of Visual DevTracker.

If you've ever used a blockchain tracker before, the Visual DevTracker should
feel very familiar. If you haven't, Visual DevTracker allows you to inspect
individual blocks and transactions in the blockchain. From the Blocks window, select
any block index to inspect that specific block. Within the Block window, you can
select any of the contained transactions by ID to get more information.

Note the "Hide empty blocks" checkbox in the top level Blocks window of Visual
DevTracker. Since there aren't many users of a NEO-Express instance, many of the
blocks will contain only a single Miner Transaction. These are of little interest
to a developer, so Visual DevTracker provides a way for the developer to hide them.
For the NEO-Express checkpoint we restored earlier, there are only eight non-empty
blocks, including the initial genesis block #0. Block #301 contains the InvocationTransaction
that deployed the CNEO contract to the blockchain. Block #305 contains an InvocationTransaction
of CNEO's mintTokens operation. The other non-empty blocks contain either ContractTransactions
that transfer tokens between accounts or ClaimTransactions that claim GAS needed
to deploy and invoke transactions.

Go ahead and shut down NEO-Express via the square Stop button in the NEO RPC Servers
window. If you want more information about how to use NEO-Express, please see the
[NEO Blockchain Toolkit for .NET Quickstart](https://github.com/ngdseattle/neo-blockchain-toolkit/blob/master/quickstart.md)
or the [NEO-Express Command Reference](https://github.com/neo-project/neo-debugger/blob/master/command-reference.md).

<!-- ## Smart Contract Debugger

This sample repo comes preconfigured to run each of the CNEO sample operations
in the debugger. To start, simply  -->