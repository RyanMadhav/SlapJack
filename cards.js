document.addEventListener("DOMContentLoaded", function() {
    startGame();
    
    document.addEventListener('click', () => {
        click();
    });
    
    
});
var deck;
var hand1;
var hand2;
var loaded = false;
async function fetchJSON(URL){
    const response = await fetch(URL)
    const json = await response.json();
    return json;
}
var curPlayer = 0;
function getPlayer(){
    return "hand"+(curPlayer+1);
}
async function click(){
    console.log("click")
    fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${getPlayer()}/draw/?count=1`).then(json=>{
        let curCard = json['cards'][0];
        console.log(json)
        //if(curCard[''])
        curPlayer = 1 - curPlayer
    })
}
function getCodeList(json){
    let str = "";
    for (let card of json['cards']){
        str += card['code']+",";
    }
    return str.substring(0, str.length-1)
}
function startGame(){
    //alert("bruh")
    //let request = new Request('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    //console.log(request.url)
    //let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    /*
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    console.log(response)
    let json = JSON.parse(response.text)
    console.log(json)
    let deck = json['deck_id']
    console.log(deck)
    let hand1 = "hand1"
    let hand2 = "hand2"
    fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand1}/add/?cards=AS,2S`).then(json=>{
            console.log(json)
    })
    fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand2}/add/?cards=AS,2S`).then(json=>{
            console.log(json)
    })
    */
    hand1 = "hand1"
    hand2 = "hand2"
    deck = "bruh"
    console.log("hi")
    let got1 = false
    let got2 = false
    fetchJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(json=> {
        console.log(json)
        console.log(json['deck_id'])
        deck = json['deck_id']
        console.log(deck)
        
        //
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=26`).then(json=>{
            //
            //`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand2}/add/?cards=AS,2S`
            console.log(json)
            fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand1}/add/?cards=${getCodeList(json)}`)
            //let list1 = fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand1}/list`);
            //console.log(list1)
            got1 = true;
        })
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=26`).then(json=>{
            console.log(json)
            fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand2}/add/?cards=${getCodeList(json)}`)
            got2 = true;
        })
        console.log("hi")
    })
    //while(!(got1 && got2)){
    //    continue;
    //}
    
    //json = JSON.parse(response);
    
    
    /*
    fetch(request).then(function(response){
        return response.text();
    }).then(function(text) {
        console.log(text)
        deck = text.json['deck_id']
    })
    console.log(deck)
    let hand1 = "hand1"
    let hand2 = "hand2"
    var request1 = new Request(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand1}/add/?cards=AS,2S`);
    
    fetch(request1)
        .then(response => response.json())
        .then(result=>{
            console.log(result["piles"][hand1]["remaining"])
        })
    
    
    let request2 = new Request(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand2}/add/?count=26`);
    */
    /*
    fetch(request).then(function(response) {
        return response.text();
    }).then(function(text) {
        
        
    });
    */
}
function getCardArr(){

}
