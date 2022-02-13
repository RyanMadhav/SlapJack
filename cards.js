document.addEventListener("DOMContentLoaded", function() {
    startGame();
    document.addEventListener('keyup', function (event) {
        if (event.key === ' ') {
          playerSlap();
        }
        
    });
    document.getElementById("place-button").addEventListener('mouseup', () => {
        click();
    });
    
    
});
var deck;
var hand1;
var hand2;
var pile;
var loaded = false;
var slapOpen = false;
async function fetchJSON(URL){
    const response = await fetch(URL)
    const json = await response.json();
    return json;
}
var curPlayer = 0;
var curCard;
function getPlayer(){
    return "hand"+(curPlayer+1);
}
function checkWinner(){
    fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${pile}/list/`).then(json=>{
        console.log(json)
        if(json['piles']['hand1']['remaining']==0){
            alert('Your opponent won!')
        }if(json['piles']['hand2']['remaining']==0){
            alert('You won!')
        }
    })
}
async function click(){
    slapOpen = false;
    console.log("click")
    fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${getPlayer()}/draw/?count=1`).then(json=>{
        curCard = json['cards'][0];
        console.log(curCard)
        //if(curCard[''])
        hand1cnt = json['piles']['hand1']['remaining'];
        hand2cnt = json['piles']['hand2']['remaining'];
        curLabel = document.getElementById(`p${curPlayer+1}cards`);
        if(curPlayer == 0) curLabel.innerHTML = `Your cards: ${hand1cnt}`;
        else curLabel.innerHTML = `Opponent cards: ${hand2cnt}`;
        curPlayer = 1 - curPlayer
        document.getElementById('main-card').src = curCard['image']
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${pile}/add/?cards=${curCard['code']}`).then(json=>{
            //console.log(json)
            slapOpen = true;
            
            handleOpponentAction();
        })
        
    })
    checkWinner();
}
function handleSlap(player){
    slapper = "hand"+player;
    if(curCard['value']!='JACK'){
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${slapper}/draw/?count=1`).then(json=>{
            penalty = json['cards'][0];
            fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${pile}/add/?cards=${penalty['code']}`).then(json=>{
                slappercnt = json['piles'][slapper]['remaining'];
                curLabel = document.getElementById(`p${player}cards`);
                document.getElementById('main-card').src = penalty['image']
                if(player == 1) curLabel.innerHTML = `Your cards: ${slappercnt}`;
                else curLabel.innerHTML = `Opponent cards: ${slappercnt}`;
            })
            
        })
    }else{
        fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${pile}/list/`).then(json=>{
            console.log(json)
            addition = getCodeList(json['piles']['pile']);
            console.log("addition "+addition)
            fetchJSON(`https://deckofcardsapi.com/api/deck/${deck}/pile/${slapper}/add/?cards=${addition}`).then(json=>{
                slappercnt = json['piles'][slapper]['remaining'];
                curLabel = document.getElementById(`p${player}cards`);
                document.getElementById('main-card').src = "https://deckofcardsapi.com/static/img/back.png"
                if(player == 1) curLabel.innerHTML = `Your cards: ${slappercnt}`;
                else curLabel.innerHTML = `Opponent cards: ${slappercnt}`;
            })
            
        })
    }
    
}
function getMessage(){
    if(curCard['value']!='JACK'){
        return '\nThe card was not a jack, 1 card placed in pile'
    }else{
        return '\nThe card was a jack. '
    }
}
async function playerSlap(){
    console.log('space')
    if(!slapOpen)return;
    slapOpen = false;
    handleSlap(1);
    alert('You Slapped'+getMessage());
}
async function opponentSlap(){
    console.log("Can slap: "+slapOpen)
    if(!slapOpen)return;
    slapOpen = false;
    handleSlap(2);
    alert('Opponent Slapped'+getMessage());
}
function opponentPlaces(){
    return Math.random() * 10 < 1;
}
async function handleOpponentAction(){
    console.log("Can slap: "+slapOpen)
    let isjack = (curCard['value']=='JACK');
    if(isjack || opponentPlaces()){
        timeout = 200+Math.random()*1000;
        console.log(timeout)
        setTimeout(() => {opponentSlap(timeout)}, timeout);
    }
}
function getCodeList(json){
    let str = "";
    console.log('hi')
    console.log(json['cards'])
    for (let card of json['cards']){
        str += card['code']+",";
    }
    return str.substring(0, str.length-1)
}
function startGame(){
    hand1 = "hand1"
    hand2 = "hand2"
    deck = "bruh"
    pile = "pile"
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
}
function getCardArr(){

}
