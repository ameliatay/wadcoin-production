const app = Vue.createApp({
    data() {
        return {
            summary: [
                { 
                    word: "Binance Coin (BNB)",
                    voice: "Binance Coin",
                    info: "<h2 style='display:inline; padding-right:5px'>Binance Coin (BNB) <img src='./img/binance.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Launched in July 2017, Binance is the biggest cryptocurrency exchange globally based on daily trading volume. Binance aims to bring cryptocurrency exchanges to the forefront of financial activity globally. The idea behind Binance’s name is to show this new paradigm in global finance — Binary Finance, or Binance. <br><br> Aside from being the largest cryptocurrency exchange globally, Binance has launched a whole ecosystem of functionalities for its users. The Binance network includes the Binance Chain, Binance Smart Chain, Binance Academy, Trust Wallet and Research projects, which all employ the powers of blockchain technology to bring new-age finance to the world. Binance Coin is an integral part of the successful functioning of many of the Binance sub-projects. <br><br><hr>"
                },
                {
                    word: "Bitcoin (BTC)",
                    voice: "Bitcoin",
                    info: "<h2 style='display:inline; padding-right:5px'>Bitcoin (BTC)<img src='./img/bitcoin.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009. <br><br> Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.” <br><br> Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the distinction of being the first-ever cryptocurrency to come into actual use. <br><br><hr>"
                },
                {
                    word: "Binance USD (BUSD)",
                    voice: "Binance USD",
                    info: "<h2 style='display:inline; padding-right:5px'>Binance USD (BUSD)<img src='./img/busd.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Binance USD (BUSD) is a 1:1 USD-backed stable coin issued by Binance (in partnership with Paxos), Approved and regulated by the New York State Department of Financial Services (NYDFS), The BUSD Monthly Audit Report can be viewed from the official website. Launched on 5 Sep 2019, BUSD aims to meld the stability of the dollar with blockchain technology. It is a digital fiat currency, issued as ERC-20 and supports BEP-2. Based on the price stability, Stablecoin plays an important role in transactions, payments and settlement, and Decentralised Finance (DeFi). Some of the BUSD use case: <ul> <li>Transfer your digital dollars (BUSD) anywhere in minutes, with low cost and on the blockchain.</li> <li>Trade BUSD on different exchanges and DEX.</li> <li>Deposit BUSD to earn an interest rate.</li> <li>Pay BUSD as payment for goods and services.</li> <li>Use BUSD as collateral and loan asset.</li> <li>Use BUSD as cross collateral in Futures.</li> <li>Store BUSD on an exchange or in a wallet.</li> </ul> <br><br><hr>"
                },
                {
                    word: "Cardano (ADA)",
                    voice: "Cardano",
                    info: "<h2 style='display:inline; padding-right:5px'>Cardano (ADA)<img src='./img/cardano.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Cardano is a proof-of-stake blockchain platform that says its goal is to allow “changemakers, innovators and visionaries” to bring about positive global change. <br><br> The open-source project also aims to “redistribute power from unaccountable structures to the margins to individuals” — helping to create a society that is more secure, transparent and fair. <br><br> Cardano was founded back in 2017, and named after the 16th century Italian polymath Gerolamo Cardano. The native ADA token takes its name from the 19th century mathematician Ada Lovelace, widely regarded as the world’s first computer programmer. The ADA token is designed to ensure that owners can participate in the operation of the network. Because of this, those who hold the cryptocurrency have the right to vote on any proposed changes to the software. <br><br> The team behind the layered blockchain say that there have already been some compelling use cases for its technology, which aims to allow decentralized apps and smart contracts to be developed with modularity. <br><br> In August 2021, Charles Hoskinson announced the launch of the Alonzo hard fork, causing Cardano price to surge, gaining 116% in the following month. On Sept. 12, 2021, the Cardano ‘Alonzo’ hard fork officially launched, bringing smart contract functionality to the blockchain. Over 100 smart contracts were deployed in the following 24 hours after the launch. <br><br> Cardano is used by agricultural companies to track fresh produce from field to fork, while other products built on the platform allow educational credentials to be stored in a tamper-proof way, and retailers to clamp down on counterfeit goods. <br><br><hr>"
                },
                {
                    word: "Dogecoin (DOGE)",
                    voice: "Dogecoin",
                    info: "<h2 style='display:inline; padding-right:5px'>Dogecoin (DOGE)<img src='./img/dogecoin.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Dogecoin (DOGE) is based on the popular \"doge\" Internet meme and features a Shiba Inu on its logo. The open-source digital currency was created by Billy Markus from Portland, Oregon and Jackson Palmer from Sydney, Australia, and was forked from Litecoin in December 2013. Dogecoin's creators envisaged it as a fun, light-hearted cryptocurrency that would have greater appeal beyond the core Bitcoin audience, since it was based on a dog meme. Tesla CEO Elon Musk posted several tweets on social media that Dogecoin is his favorite coin. <br><br><hr>"
                },
                {
                    word: "Ethereum (ETH)",
                    voice: "Ethereum",
                    info: "<h2 style='display:inline; padding-right:5px'>Ethereum (ETH)<img src='./img/ethereum.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts. <br><br> Ethereum was first described in a 2013 whitepaper by Vitalik Buterin. Buterin, along with other co-founders, secured funding for the project in an online public crowd sale in the summer of 2014. The project team managed to raise $18.3 million in Bitcoin, and Ethereum’s price in the Initial Coin Offering (ICO) was $0.311, with over 60 million Ether sold. Taking Ethereum’s price now, this puts the return on investment (ROI) at an annualized rate of over 270%, essentially almost quadrupling your investment every year since the summer of 2014. <br><br> The Ethereum Foundation officially launched the blockchain on July 30, 2015, under the prototype codenamed “Frontier.” Since then, there has been several network updates — “Constantinople” on Feb. 28, 2019, “Istanbul” on Dec. 8, 2019, “Muir Glacier” on Jan. 2, 2020, “Berlin” on April 14, 2021, and most recently on Aug. 5, 2021, the “London” hard fork. <br><br> Ethereum’s own purported goal is to become a global platform for decentralized applications, allowing users from all over the world to write and run software that is resistant to censorship, downtime and fraud. <br><br><hr>"
                },
                {
                    word: "Litecoin (LTC)",
                    voice: "Litecoin",
                    info: "<h2 style='display:inline; padding-right:5px'>Litecoin (LTC)<img src='./img/litecoin.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Litecoin (LTC) is a cryptocurrency that was designed to provide fast, secure and low-cost payments by leveraging the unique properties of blockchain technology. The cryptocurrency was created based on the Bitcoin (BTC) protocol, but it differs in terms of the hashing algorithm used, hard cap, block transaction times and a few other factors. Litecoin has a block time of just 2.5 minutes and extremely low transaction fees, making it suitable for micro-transactions and point-of-sale payments. <br><br> Litecoin was released via an open-source client on GitHub on Oct. 7, 2011, and the Litecoin Network went live five days later on Oct. 13, 2011. Since then, it has exploded in both usage and acceptance among merchants and has counted among the top ten cryptocurrencies by market capitalization for most of its existence. <br><br> The cryptocurrency was created by Charlie Lee, a former Google employee, who intended Litecoin to be a \"lite version of Bitcoin,\" in that it features many of the same properties as Bitcoin—albeit lighter in weight. <br><br><hr>"
                },
                {
                    word: "Shiba Inu (SHIB)",
                    voice: "Shiba Inu",
                    info: "<h2 style='display:inline; padding-right:5px'>Shiba Inu (SHIB)<img src='./img/shiba.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Once upon a time, there was a very special dog. That dog was a shiba inu, and this dog inspired millions of people around the world to invest money into tokens with the dog’s image on it. <br><br> According to the SHIBA INU website, SHIB is the “DOGECOIN KILLER” and will be listed on their own ShibaSwap, a decentralized exchange. <br><br> Shiba Inu coin was created anonymously in August 2020 under the pseudonym “Ryoshi.” The meme coin quickly gained speed and value as a community of investors was drawn in by the cute charm of the coin paired with headlines and Tweets from personalities like Elon Musk and Vitalik Buterin. <br><br> Shiba Inu aimed to be the Ethereum-based counterpart to Dogecoin’s Srypt-based mining algorithm. Shiba Inu and the SHIB token are part of a swarm of dog-themed cryptocurrencies, including Baby Dogecoin (BabyDoge), Dogecoin (DOGE), JINDO INU (JIND), Alaska Inu (LAS), and Alaskan Malamute Token (LASM). These lesser-valued tokens have attracted investors who missed the Dogecoin pump from 0.0002 to nearly 0.75 USD. <br><br> On Sept. 17, 2021, Coinbase, the largest US-based crypto exchange, listed Shiba Inu on their platform. This news caused Shiba Inu price to rise by over 40% in the following two days, bringing the meme dog token into the spotlight again. <br><br><hr>"
                },
                {
                    word: "Solana (SOL)",
                    voice: "Solana",
                    info: "<h2 style='display:inline; padding-right:5px'>Solana (SOL)<img src='./img/solana.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. While the idea and initial work on the project began in 2017, Solana was officially launched in March 2020 by the Solana Foundation with headquarters in Geneva, Switzerland. <br><br> The Solana protocol is designed to facilitate decentralized app (DApp) creation. It aims to improve scalability by introducing a proof-of-history (PoH) consensus combined with the underlying proof-of-stake (PoS) consensus of the blockchain. <br><br> Because of the innovative hybrid consensus model, Solana enjoys interest from small-time traders and institutional traders alike. A significant focus for the Solana Foundation is to make decentralized finance accessible on a larger scale. <br><br><hr>"
                },
                {
                    word: "Ripple (XRP)",
                    voice: "Ripple",
                    info: "<h2 style='display:inline; padding-right:5px'>Ripple (XRP)<img src='./img/xrp.png' style='width:40px; height:40px; margin-top:10px;'></h2> <br> To begin with, it’s important to understand the difference between XRP, Ripple and RippleNet. XRP is the currency that runs on a digital payment platform called RippleNet, which is on top of a distributed ledger database called XRP Ledger. While RippleNet is run by a company called Ripple, the XRP Ledger is open-source and is not based on blockchain, but rather the previously mentioned distributed ledger database. <br><br> The RippleNet payment platform is a real-time gross settlement (RTGS) system that aims to enable instant monetary transactions globally. While XRP is the cryptocurrency native to the XRP Ledger, you can actually use any currency to transact on the platform. <br><br> While the idea behind the Ripple payment platform was first voiced in 2004 by Ryan Fugger, it wasn’t until Jed McCaleb and Chris Larson took over the project in 2012 that Ripple began to be built (at the time, it was also called OpenCoin). <br><br><hr>"
                }
            ],
            voice: ""
        }
    },
    methods: {
        speak(voice) {
            const utterance = new SpeechSynthesisUtterance(voice);
            speechSynthesis.speak(utterance);
        }
    }
})



app.component ('text-speech', {
    props: ['voice'],

    template: 
    `
    <div>
        <button type="button" class="btn btn-secondary" @click="speak()" ><slot></slot></button>
    </div>
    `,

    methods: {
        speak() {
            const utterance = new SpeechSynthesisUtterance(this.voice);
            speechSynthesis.speak(utterance);
        }
    }
})

app.mount("#app")