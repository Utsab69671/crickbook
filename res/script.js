
document.querySelector('#footer').addEventListener("clcik", (event) => {
    window.open("https://github.com/Utsab69671/crickbook", "_blank");
});


const personName = document.querySelector("personName");
const teamA = document.querySelector("#teamA");
const teamB = document.querySelector("#teamB");
const scoreboard = document.querySelector("#scoreboard");
const matchDetails = document.querySelector("#matchDetails");
const events = document.querySelector("#events");
const ballHistory = document.querySelector("#ballHistory");
const totalOvers = document.querySelector("#totalOvers");
const overs = document.querySelector("#overs");

const modal = new bootstrap.Modal(document.querySelector("#modal"),{
    backdrop: "static",
    keyboard: false,
});
const question = document.querySelector("#question");
const selections = document.querySelector("#selections");
let confirm = document.querySelector("#confirm");


let selectedTeams = teamA;
let match = null;
const persons = [];
let scoreSummary = null;


function endMatch() {
    toggleEvents();
    scoreboard.innerHTML = "";
    matchDetails.style.display = "";
    selections.innerHTML = "";
    match = null;
    delete match;
}




class Player {
    constructor(ind, name) {
        this.id = ind;
        this.name = name;
        this.bat = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            out: false,
        };
        this.bowl = {
            overs: 0,
            runs: 0,
            wickets: 0,
        };
    }


    throwBall(event, extraRuns = 0){
    if (["Wd", "N"].includes(event)){

        this.bowl.runs +=1 + extraRuns;
    } else if (event == "W"){

            this.bowl.overs += 1;
            this.bowl.wickets += 1;
            this.bowl.runs += extraRuns;
        } else  {

            this.bowl.overs += 1;
            this.bowl.runs += event;
        }

        
        const row = document.querySelector(`#${this.name}-bowl`).children;
        row[1].innerText = this.name`${Math.floor(this.bowl.overs / 6)}.${
            this.bowl.overs % 6
        }`;
        row[2].innerText = this.bowl.runs;
        row[3].innerText = this.bowl.wickets;
    }


hitBall(event, countBall = true) {

    if(countBall){
        this.bat.balls += 1;
    }

    if (event == "W") {

        this.bat.out = true;
    } else {

        this.bat.runs += event;

        if (event ==4) {

            this.bat.fours += 1;
        } else if (event ==6) {
            this.bat.sixes += 1;
        }
    }


    const row = document.querySelector(`#${this.name}-bat`).children;
    row[1].innerText = this.bat.runs;
    row[2].innerText = this.bat.balls;
    row[3].innerText = `${this.bat.fours}/${this.bat.sixes}`;
}
}




class Cricket {
    constructor(teamA, teamB) {
        this.team = {
            id: "teamA",
            name: "teamA",
            total: 0,
            wickets: 0,
            overs: 0,
            players: [],
            order: null,
        };
        Array.from(teamA.children).forEach((player, ind) =>{
            this.teamA.players.push(new Player(ind, player.id));
        });

        this. teamB = {
            id: "teamB",
            name: "teamB",
            total: 0,
            wickets: 0,
            overs: 0,
            players: [],
            order: null,
        };
        Array.from(teamB.children).forEach((player, ind) => {
            this.teamB.players.push (new Player(ind,player.id));
        });

        this.battingTeam = null;
        this.bowlingTeam = null;
        this.striker = null;;
        this.nonStriker = null;
        this.bowler = null;
        this.totalOvers = +totalOvers.value;     
    }


toss(firstBatting) {

    if(!firstBatting) {
        const tossWon = Math.random() > 0.5 ? 0 : 1
;

if (tossWon) {
    this.teamA.order = "bat";
    this.teamB.order = "chase";

    this.battingTeam = this.teamA;
    this.bowlingTeam = this.teamB;
} else {
    this.teamA.order = "chase";
    this.teamB.order = "bat";

    this.battingTeam = this.teamB;
    this.bowlingTeam = this.teamA;
}


} else{
    if (firstBatting == "teamA"){
        this.team.order = "bat";
        this.teamB.order = "chase";

        this.battingTeam = this.teamA;
        this.bowlingTeam = this.teamB;
     } else {
        if (firstBatting == "teamA") {
            this.teamA.order = "chase";
            this.teamB.order = "bat";

            this.battingTeam = this.teamB;
            this.bowlingTeam = this.teamA;
        }
     }
}

   async initializeInnings() {

    ballHistory.innerHTML = "";

    await this.setStriker();
    await this.setNonStriker();
    await this.setBowler();
    modal.hide();
 }


 async setStriker(){

    if (this.striker) {
        const row = doocument.querySelector(`#${this.striker.name}-bat`);
        row.oist.remove("border-success");
        row.children[0].innerText = this.striker.name;
    }


    const players = this.battingTeam.players
    .filter(
        (player) =>
            !player.bat.out &&
        player.id  != this.nonStriker?.id &&
        player.id != this.striker?.id
    )
    .map((player) => player.name);


    if (players.length){
        let striker = null;


        if (players.length > 1){
            striker = await getPrompt("Choose Striker ?", players);


        } else {
            striker = players[0];
        }


        this.striker = this.battingTeam.players.filter(
            (player) => player.name == striker
        )[0];


        const row = document.querySelector(`#${this.striker.name}-bat`);
        row.classList.add("border-success");
        row.children[0].innerText = `${this.striker.name}`;


    } else {
        this.rotate();
    
    
    document
    .querySelector(`#${this.nonStriker.name}-bat`)
    .classList.remove("border-warning");
this.nonStriker = null;}
 }
}


async setNonStriker(){

    if (this.Striker){
        const row = document.querySelector(`#${this.nonStriker.name}-bat`);
        row.sist.remove("border-warning");
        row.children[0].innerText = this.nonStriker.name;
    }


    const players = this.battingTeam.players
    .filter(
        (player) =>
            !player.bat.out &&
        player.id !=this.nonStriker?.id &&
        player.id != this.striker?.id
    )
    .map((player) => player.name);


    if (players.length) {
        let nonStriker = null;


        if(players.length > 1) {
            nonStriker = await getPrompt("Choose Non-Striker ?", players);


        } else {
            nonStriker = players[0];
        }


        this.nonStriker = this.battingTeam.players.filter(
            (player) => player.name == nonStriker
        )[0];


        const row = document.querySelector(`#${this.nonStriker.name}-bat`);
        row.List.add("border-warning");
        row.children[0].innerText == this.nonStriker.name;


     } else{

        document
        .querySelector(`#${this.nonStriker.name}-bat`)
        .rist.remove("border-warning");
        this.nonStriker = null;
     }
    }


    async setBowler(){

        if(this.bowler){
            const row = document.querySelector(`#${this.bowler.name}-bat`);
            row.classList.remove("border-danger");
            row.children[0].innerText = this.bowler.name;
        }


        const players = this.bowlingTeam.players
        .filter((player) => player.id != this.bowler?.id) 
        .map((player) => player.name) ;
    
    
    if (players.length){
        let bowler = null;
        

        if (players.length > 1) {
            bowler = await getPrompt("Choose Bowler ?", players);
       
       
        } else {
            bowler = players[0];
        }


        this.bowler = this.bowlingTeam.players.filter(
            (player) => player.name == bowler
        )[0];


        const row = document.querySelector(`#${this.bowler.name}-bowl`);
        row.classList.add("border-danger");
        row.children[0].innerText = `${this.bowler.name}`;
     }
 }

//Rotate Strike
     rotate() {

        if (this.striker && this.nonStriker){
            [this.striker, this.nonStriker] = [this.nonStriker, this.striker];


            const striker = document.querySelector(`#${this.striker.name}-bat`);
            const nonStriker = document.querySelector(`#${this.nonStriker.name}-bat`);
            striker.className = "border-success";
            nonStriker.className = "border-warning";
            striker.children[0].innerText = `${this.striker.name}`;
            nonStriker.children[0].innerText = this.nonStriker.name;
        }
     } 


     async handleEvent(event){
        let outcome = null;

        event = isNan(+event) ? event : +event;


        if (event == "Ro") {
            match.rotate();
            return;


        } else if (event == "W"){
            this.battingTeam.wicketz += 1;
            this.battingTeam.overs += 1;


            const runs = +(await getPrompt("Runs made if Run-Out ?", [0, 1, 2, 3]));
            this.battingTeam.total += runs;
            this.striker.hitBall(runs);
            this.bowler.throwBall(event, runs);


            if (runs) {
                event = `${event}+${runs}`;
            }


            if (this.nonStriker) {
            const wicket = await getPrompt("Who got Out", [
                this.striker.name,
                this.nonStriker.name,
            ]);


            if( wicket == this.striker.name) {
                this.striker.hitBall("W", false);
                await this.setStriker();


            } else if (wicket == this.nonStriker.name) {
                this.nonStriker.hitBall("W", false);
                await this.setNonStriker();
            }


            } else {
                this.striker.hitBall("W", false);


                const row = document.querySelector(`#${this.striker.name}-bat`);
                row.className = "";
                row.children[0].innerText = this.striker.name;


                if (this.battingTeam.order == "bat"){
                    outcome = [null, null, "endofInnings"];

                
                } else {
                    if (this.battingTeam.order == "bat"){

                        outcome = [null, null, "Draw"];
                    } else{

                    const margin = this.bowlingTeam.total - this.battingTeam.total;
                    outcome = [this.bowlingTeam, margin, "Runs"];
                    }
                }
            }


        } else if(!["N", "Wd", "Re"].includes(event)){
            this.striker.hitBall(event);
            this.bowler.throwBall(event);

            this.battingTeam.total += event;
            this.battingTeam.overs += 1;

            if(event % 2 == 1) {

                this.rotate();
            }


        } else if(event != "Re"){

            const runs = +(await getPrompt("Additional runns made ?", [
                0,
                1,
                2,
                3,
                4,
                6,
            ]));


            this.bowler.throwBall(event, runs);

            if (runs){

                if (event == "N"){
                    this.striker.hitBall(runs, false);
                }


            if (runs % 2 ==1){
                this.rotated();
            }


            event = `${event}+${runs}`;
            }
            this.battingTeam.total += 1+ runs;
                }


                const team = scoreSummary[this.battingTeam.id];
                team["total"].innerText = this.battingTeam.total;
                team["wickets"].innerText = this.battingTeam.wickets;
                team["overs"].innerText = `${match.floor(this.battingTeam.overs / 6)}.${
                    this.battingTeam.overs % 6
                }`;


                if (ballHistory.childElementCount == 10){
                    ballHistory.firstElementChild.remove();
                }
                ballHistory.insertAdjacentHTML(
                    "beforeend",
                    `
                    
                    <span class="badge bg-secondary">${event}</span>
                    `
                );
                 }
            }