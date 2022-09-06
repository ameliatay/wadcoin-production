const app = Vue.createApp({
    data() {
        return {
            summary: [
                { 
                    word: "Altcoin",
                    info: "Any coin that’s not Bitcoin.Altcoins can be anything from the second-most popular coin, Ethereum, to any of the thousands of coins with very minimal market value. Experts say you should largely stick to the bigger, more mainstream cryptocurrencies as an investment."
                },
                {
                    word: "Bitcoin",
                    info: "The first and most valuable cryptocurrency."
                },
                {
                    word: "Blockchain",
                    info: "A digital form of record keeping, and the underlying technology behind cryptocurrencies. A blockchain is the result of sequential blocks that build upon one another, creating a permanent and unchangeable ledger of transactions (or other data)."
                },
                {
                    word: "Coinbase",
                    info: "A popular centralized cryptocurrency exchange. Coinbase made history recently as the first cryptocurrency exchange to go public on the Nasdaq."
                },
                {
                    word: "Cold Wallet",
                    info: "A secure method of storing your cryptocurrency completely offline. Many cold wallets (also called hardware wallets) are physical devices that look similar to a USB drive. This kind of wallet can help protect your crypto from hacking and theft, though it also comes with its own risks – like losing it, along with your crypto."
                },
                {
                    word: "Decentralized Finance (DeFi)",
                    info: "Financial activities conducted without the involvement of an intermediary, like a bank, government, or other financial institution."
                },
                {
                    word: "Ethereum",
                    info: "The second largest cryptocurrency by trade volume, Ethereum is a crypto network and software platform that developers can use to create new applications, and has an associated currency called ether."
                },
                {
                    word: "Gas",
                    info: "A fee that developers have to pay to the Ethereum network in order to use the system. Gas is paid in ether, the native cryptocurrency of Ethereum."
                },
                {
                    word: "Halving",
                    info: "A feature written into Bitcoin’s code in which after a certain number of blocks are mined (typically every four years) the amount of new Bitcoin entering circulation gets halved. The halving can have an impact on Bitcoin’s price."
                },
                {
                    word: "Hash",
                    info: "A unique string of numbers and letters that identify blocks and are tied to crypto buyers and sellers."
                },
                {
                    word: "Hot Wallet",
                    info: "A software-based cryptocurrency wallet connected to the Internet. While more convenient for quickly accessing your crypto, these wallets are a bit more susceptible to hacking and cybersecurity attacks than offline wallets."
                },
                {
                    word: "Market Capitalization aka 'Market Cap'",
                    info: "For cryptocurrency, market cap refers to the total value of all the coins that have been mined. You can calculate a crypto’s market cap by multiplying the current number of coins by the current value of the coins."
                },
                {
                    word: "Mining",
                    info: "The process whereby new cryptocurrency coins are made available and the log of transactions between users is maintained. "
                },
                {
                    word: "Public Key",
                    info: "Your wallet’s address, which is similar to your bank account number. You can share your public wallet key with people or institutions so they can send you money or take money from your account when you authorize it."
                },
                {
                    word: "Private Key",
                    info: "The encrypted code that allows direct access to your cryptocurrency. Like your bank account password, you should never share your private key."
                },
                {
                    word: "Stablecoin",
                    info: "A stablecoin pegs its value to some other non-digital currency or commodity. A digital fiat represents a fiat, or government-backed currency on the blockchain. (Example: Tether, which is pegged to the U.S. dollar)"
                }
            ]
        }
    }
})

app.component ('info-grab', {
    props: ['word', 'info'],

    template: 
    `
    <div>
        <h2 style="display:inline; padding-right:5px">{{ word }}</h2>
        <button type="button" class="btn btn-secondary learn" @click="speak()" ><slot></slot></button>
        <p>{{ info }}</p> 
    </div>
    `,

    methods: {
        speak() {
            const utterance = new SpeechSynthesisUtterance(this.word);
            speechSynthesis.speak(utterance);
        }
    }
})

app.mount("#app")