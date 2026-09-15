
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
            overs: 0,,
            players: [],
            order: null,
        };
        Array.from(teamB.children).forEach((player, ind) => {
            this.teamB.players.push (new Player(ind,player.id));
        });

        this.battingTeam = null;
        
    }
}


