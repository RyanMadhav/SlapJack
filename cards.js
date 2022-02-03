document.addEventListener("DOMContentLoaded", function() {
    startGame();
    /*
    document.getElementById('start-btn').addEventListener('click', () => {
        startGame();
    });
    
    */
});
async function fetchJSON(URL){
    const response = await fetch(URL)
    const json = await response.json();
    return json;
}

function startGame(){
    //alert("bruh")
    //let request = new Request('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    //console.log(request.url)
    //let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let deck;

    fetchJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(json=> {
        console.log(json)
        console.log(json['deck_id'])
        deck = json['deck_id']
        console.log(deck)
        let hand1 = "hand1"
        let hand2 = "hand2"
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand1}/add/?cards=AS,2S`).then(json=>{
            console.log(json)
        })
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand2}/add/?cards=AS,2S`).then(json=>{
            console.log(json)
        })
    })
    
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
