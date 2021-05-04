const GAME_DATA = {
	di: {
		id: "di",
		title: "Distance Incremental",
		type: "main",
		url: "/DistInc.github.io-master/main.html",
		player: localStorage.getItem("dist-inc-saves")?JSON.parse(atob(localStorage.getItem("dist-inc-saves"))):undefined,
		lib: OmegaNum,
		endgame: OmegaNum.pow(10, 1e12),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			let um = [];
			for (let i = 0; i < data.length; i++)
				if (data[i] !== null) {
					if (um.includes(JSON.stringify(data[i].modes))) continue;
					um.push(JSON.stringify(data[i].modes));
					let modeAdd = 0;
					modeAdd += (data[i].achievements.length||0)/16
					modeAdd += new OmegaNum(data[i].distance).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(10).toNumber();
					
					if (data[i].modes.length==0) modeAdd *= 5;
					if (data[i].modes.length==1 && (data[i].modes[0]=="hikers_dream"||data[i].modes[0]=="hard")) modeAdd *= 2;
					if (data[i].modes.length==2 && data[i].modes.every(x => x=="extreme"||x=="hard")) modeAdd *= 2;
					if (data[i].modes.length==3 && data[i].modes.includes("hikers_dream")&&data[i].modes.includes("extreme")&&data[i].modes.includes("hard")) modeAdd *= 2;
					
					if (data[i].modes.includes("easy")) modeAdd /= 2;
					if (data[i].modes.includes("aau")) modeAdd /= 4;
					if (data[i].modes.includes("absurd")) modeAdd /= 3;
					s += modeAdd;
				}
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 741,
	},
	pt: {
		id: "pt",
		title: "The Prestige Tree (1.3 Beta 13)",
		type: "main",
		url: "/Prestige-Tree-1.3-Beta/",
		player: localStorage.getItem("ptr")?JSON.parse(atob(localStorage.getItem("ptr"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 1e15),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			let keys = Object.keys(this.player).filter(x => x!="set");
			for (let i = 0; i < keys.length; i++) {
				let d = data[keys[i]];
				if (d !== null) {
					let tempS = 0;
					tempS += (d.a?(d.a.achievements.length||0):0)*3
					tempS += new Decimal(d.points).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(100).toNumber();
					s = Math.max(s, tempS);
				}
			}
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 295,
	},
	ngp3c: {
		id: "ngp3c",
		title: "Antimatter Dimensions NG+++ Condensed",
		type: "main",
		url: "/NG-plus-3C-master/",
		player: localStorage.getItem("AD_aarexModifications")?(localStorage.getItem(btoa("dsAM_"+JSON.parse(atob(localStorage.getItem("AD_aarexModifications"))).current))?JSON.parse(atob(localStorage.getItem(btoa("dsAM_"+JSON.parse(atob(localStorage.getItem("AD_aarexModifications"))).current)))):undefined):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 3.5e15),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += (data.achievements.length||0)/2
			s += new Decimal(data.money).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(100).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 192,
	},
	en: {
		id: "en",
		title: "Incremenergy",
		type: "side",
		url: "/Incremenergy-main/",
		player: localStorage.getItem("exponentGoUpYay")?JSON.parse(atob(localStorage.getItem("exponentGoUpYay"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 2e13),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.energy).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(125).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 125,
	},
	rap: {
		id: "rap",
		title: "Rapture 30",
		type: "side",
		url: "/Rapture-30-main/",
		player: localStorage.getItem("raptureThingy")?JSON.parse(atob(localStorage.getItem("raptureThingy"))):undefined,
		lib: Decimal,
		endgame: new Decimal(30),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.rapture).div(this.endgame).min(1).times(67).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 67,
	},
	ptc: {
		id: "ptc",
		title: "Prestige Tree: Classic",
		type: "complete",
		url: "/Prestige-Tree-Classic-master/",
		player: localStorage.getItem("prestige-tree")?JSON.parse(atob(localStorage.getItem("prestige-tree"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 1e11),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.points).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(80).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 80,
	},
	efv: {
		id: "efv",
		title: "Escape from Vantablack",
		type: "complete",
		url: "/Escape-from-Vantablack-main/",
		player: localStorage.getItem("EfV")?JSON.parse(atob(localStorage.getItem("EfV"))):undefined,
		lib: Decimal,
		endgame: new Decimal(4e84),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			if (data.gameOver) s += this.scoreLimit;
			else s += new Decimal(data.totalPhotons).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(50).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 50,
	},
}

const OVERALL_DATA = {
	totalScore: Object.values(GAME_DATA).map(x => x.score()).reduce((a,c) => a+c),
	totalScoreLimit: Object.values(GAME_DATA).map(x => x.scoreLimit).reduce((a,c) => a+c),
}

const MAIN_GAMES = Object.values(GAME_DATA).filter(x => x.type=="main");
const SIDE_PROJECTS = Object.values(GAME_DATA).filter(x => x.type=="side");
const COMPLETED_GAMES = Object.values(GAME_DATA).filter(x => x.type=="complete");

var app;

function loadVue() {
	app = new Vue({
	    el: "#app",
	    data: {
			GAME_DATA,
			MAIN_GAMES,
			SIDE_PROJECTS,
			COMPLETED_GAMES,
			OVERALL_DATA,
        }
	})
}
