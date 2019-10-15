/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
gamePlaying =  true;

init();

//callback function: eh uma funcao que eh chamada por uma outra funcao, eh uma funcao que eh chamada como argumento de outra funcao, por exemplo a funcao button() no addEventListener
//annonymous function: eh uma funcao que nao tem um nome, nao pode ser reusada


document.querySelector('.btn-roll').addEventListener('click',function () {
    if (gamePlaying === true) {
        //1. mostrar o numero aleatorio
        var dice = Math.floor(Math.random() * 6 + 1);
        //floor serve para remover a parte decimal de um numero

        //2. mostrar o resultado
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //3. actualizar o score da rodada se o dado nao for 1
        if (dice !== 1) {
            //adiconar o score
            //roundScore = roundScore + dice;
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Funcao que ira chamar o proximo jogador
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying === true) {
        //Adicionar o current score ou roundScore na variavel Score;
        scores[activePlayer] += roundScore;

        //Actualizar o UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Verificar se o jogador ganhou o jogo
        if(scores[activePlayer]>=10){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        ///////////////////////////////////////////////////////
        /*document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';*/

        }else{
            nextPlayer();
        }
    }

});

//Funcao que chama o proximo jogador
function nextPlayer(){
    //Proximo jogador
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle remove uma classe existente, caso a classe nao exista
    //sera adicionada
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    /*document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active'); */
}
document.querySelector('.btn-new').addEventListener('click', init);

//funcao que ira por no zero os valores das variaveis
function init(){
    gamePlaying = true;
    scores = [0,0];// Array que ira guardar os scores dos jogadores, uma vez que sao dois
    roundScore = 0; //Ira guardar a rodada de cada jogador
    activePlayer = 0; //jogador activo

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    /////////////////////////////////////////////////////////
    /*document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';*/
}

/////////////////////////*Code challenge*//////////////////////////


// document.querySelector('#current-' + ac   tivePlayer).innerHTML = '<em>' + dice + '</em>';

/*var x = document.querySelector('#score-0').textContent;
console.log(x);*/
