import React from 'react'
import {Link} from 'react-router-dom'
import './overview.css'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const mailchimpurl = "https://tokenhost.us6.list-manage.com/subscribe/post?u=d772b81b2c6ca565ad1fb7bff&amp;id=4e4a1b90b9";

export default function Overview() {
    return (
    <div className = 'overview'>
<div className = 'mobile-container'>
<div className = 'container'>
    <h1 className = "title"> EASILY BUILD BLOCKCHAIN APPS. FREE OF CHARGE. </h1>
    <h2 className = 'body'>Token Host makes building blockchain apps easier, faster, and cheaper with a familiar cloud-based dev platform. </h2>
    <a href = "https://app.tokenhost.com" className = 'calltoaction'> <p> Start Building</p> </a>
    <div className = 'upload-cloud-graphic'></div>

    <div className = 'wedge'></div>
    <div className = 'value-proposition-background'> 
        <div className = 'centering-container'>
            <h1 className = 'value-proposition-title'> Problem Solved </h1>
            <p className = 'value-proposition-body'> Blockchain apps require expert developers and expensive fees. 
                                                 Token host’s cloud-hosted blockchains solve common developer pain points like 
                                                 user authentication, key management, expensive fees paid for by end users and long transaction times.
            </p>
        
            <div className = 'value-proposition-graphic'></div>
            <div className = 'venn-diagram'>
                <div className = 'venn-diagram-circle'></div> 
                <div className = 'venn-diagram-title'>Cloud Platforms</div>
                <div className = 'venn-diagram-body'> • AWS <br/> • Google Cloud <br/> • Mongo DB <br/> • Microsoft Azure </div>
                <div className = 'venn-diagram-center'> Token Host </div>
                <div className = 'venn-diagram-circle' id = 'right' ></div> 
                <div className = 'venn-diagram-title'  id = 'blockchain'>Blockchain Platforms</div>
                <div className = 'venn-diagram-body'   id = 'blockchains'>• Ethereum <br /> • Polygon <br /> • Binance Chain <br /> • Hyperledger </div>
            </div>
            <div className = 'value-proposition-subtitle'> Alternatives </div>  
            <div className = 'value-proposition-subbody'>Token Host solves the end-to-end developer pain points around building a complete blockchain application. 
                                                 AWS, MongoDB, and Google Cloud provide end-to-end solutions for building apps, but lack blockchain functionality. 
                                                 Blockchain projects like Ethereum and its side chains (i.e. Polygon, Binance Chain) have complex user ID management, 
                                                 and require transactions to use the chain’s native currency.
            </div>
        </div>
    </div> 


    <div className = 'benefits'>
        <div className = 'benefits-title'> Benefits </div>
        <div className = 'benefit'>
            <div className = 'benefits-icon-1'> </div>
            <div className = 'benefits-subtitle'> Pay As You Go </div>
            <div className = 'underline'></div>
            <div className = 'benefits-body'> Serverless platforms that grow as you do. After our free beta that we’re currently offering, you’ll only pay for what you use. </div>
        </div>
        <div className = 'benefit'>
            <div className = 'benefits-icon-2'></div>
            <div className = 'benefits-subtitle'> Usability </div>
            <div className = 'underline'></div>
            <div className = 'benefits-body'    > Onboard users to your blockchain app as easily as a legacy app. Use social sign in or email without confusing gas fees. </div>
        </div>
        <div className = 'benefit'>
            <div className = 'benefits-icon-3'> </div>
            <div className = 'benefits-subtitle'> Scalability </div>
            <div className = 'underline'></div>
            <div className = 'benefits-body'> Cloud-based platforms provide better scalability than the public blockchains currently used.</div>
        </div>
    </div>

    <div className = 'comparison'>
        <div className = 'comparison-left'>    
        <div className = 'comparison-title'> Old Way</div>
        <div className = 'comparison-body'> {'>'} Users pay gas prices. <br /><br />
                                            {'>'} Users manage their own private keys. <br /><br /> 
                                            {'>'} Developers reinvent the wheel for every application
        </div></div>

        <div className = 'comparison-division'></div>
        <div className = 'comparison-right'>    
        <div className = 'comparison-title'> Our Way</div>
            <div className = 'comparison-body' > {'>'} Cloud hosting <br/><br/> 
                                                 {'>'} Cross Chain Token Bridge <br /><br />
                                                 {'>'} Open source Mobile and Web framework <br /><br /> 
                                                 {'>'} Open source Solidity smart contract ORM compiler 
            </div>
        </div>
    </div>

    <div className = 'contact'>
        <div className = 'section'>
            <a href = "https://discord.gg/4Z3gngR9Ha" target = "_blank" className = 'discord'></a>
        </div>
        <div className =  'section'>
            <div className = 'contact-title'> Stay Up To Date: </div>
						<div className="MailChimp">
										<MailchimpSubscribe url={mailchimpurl}/>
						</div>
        </div>
    </div>

    <div className = 'examples'>
        <div className = 'examples-title'> Examples </div>
        <div className = 'benefit' id = 'example'>
            <div className = 'benefits-subtitle' style = {{color: 'var(--dark-blue-021e73)',fontSize: '3rem', width: '30.5333rem'}}> Token Tweets </div>
            <div className = 'underline' style = {{left:'10rem', width:'10rem'}}> </div>
            <div className = 'benefits-body' style = {{color:'var(--dark-blue-021e73)', fontSize:'2.25rem', width: '30.5333rem', lineHeight: '3rem'}}>A twitter-like blockchain app where each “Tweet” is its own NFT.</div>
        </div>            

        <div className = 'examples-graphic'></div>        
        <a href = 'https://twitter.tokenhost.com' target ='_button'className = 'linkbutton' id = 'token'> Explore Token Tweets </a>
    </div>

    <div className = 'github'>
        <div className = 'github-graphic'></div>
        <div className = 'github-title'> Build Your First App </div>
        <div className = 'github-hoop-logo' ></div>
        <div className = 'github-body'>1. Visit Token Host’s developer documentation on Github.</div>
        <div className = 'github-body' style = {{top: '29rem'}} >2. Clone the example app and make it your own!</div>
    </div>


    <div className = 'footer'>    
        <div className = 'footer-title'>Start Building</div>
        <a href = "https://app.tokenhost.com"  target = "_blank" className = 'linkbutton' id = 'footer'> Let's Go! </a>
        <div className = 'footer-graphic'></div>
    </div>
</div>        
</div>
</div>
    )
}
