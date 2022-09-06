const app = Vue.createApp({
    data() {
        return {
            summary: [
                {
                    question: "Who invented Bitcoin (BTC)?",
                    answer: "Satoshi Nakamoto",
                    explain: "Satoshi Nakamoto is the anonymous name used by the creators of the Bitcoin cryptocurrency. While several people have claimed to be Satoshi, the true identity has never been verified nor revealed. Given the price of BTC today, Satoshi would be a billionaire."
                },
                {
                    question: "How many cryptocurrencies are there? (pick the closest answer)",
                    answer: "about 7000",
                    explain: "The aim for all these cryptocurrencies, is to leverage blockchain technology to revolutionize areas such as finance, health, energy, data storage, privacy and security, machine learning, payments, social networks, supply and logistics, and content ownership. Anyone who has the knowledge about how the technology works can use it to develop their own virtual currency. That explains why there are so many cryptocurrencies."
                },
                {
                    question: "What is cryptocurrency?",
                    answer: "Cryptocurrency consists of web-based digital assets that use cryptographic functions to conduct financial transactions.",
                    explain: "A cryptocurrency is a digital or virtual currency that is secured by cryptography, which makes it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology. A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation."
                },
                {
                    question: "How are cryptocurrency transactions recorded?",
                    answer: "Blockchain - a shared, digital ledger",
                    explain: "Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain. Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant’s ledger. The decentralised database managed by multiple participants is known as Distributed Ledger Technology (DLT)."
                },
                {
                    question: "Blockchain and cryptocurrencies are the same.",
                    answer: "False",
                    explain: "Take Bitcoin for an example of a cryptocurrency. Blockchain is the technology that underpins the cryptocurrency Bitcoin, but Bitcoin is not the only version of a blockchain distributed ledger system in the market. There are several other cryptocurrencies with their own blockchain and distributed ledger architectures."
                }
            ]
        }
    }
})

app.component ('info-grab', {
    props: ['question', 'answer', 'explain'],

    template: 
    `
    <div>
        <h4 style="display:inline; padding-right:5px">Question : {{ question }}</h4>
        <h6>Answer : {{ answer }}</h6> 
        <span style="text-decoration: underline">Learing Point</span>
        <p>{{ explain }}</p>
    </div>
    `
})
app.mount("#app")