new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    maxAttackDamage: 10,
    minAttackDamage: 3,
    remainingSpecialAttack: 3,
    remainingHeal: 5,
    turns: [],
    playerDamage: 0,
    monsterDamage: 0
  },
  computed: {

  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.gameStatsReset();
    },
    attack: function () {
      const damage = this.calculateRandomValue(0.8, 0.8)
      this.monsterHealth -= damage;
      this.playerDamage = damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      })
      if(this.checkWin()) return;
      this.monsterAttack();
    },
    specialAttack: function () {
      const damage = this.calculateRandomValue(2, 2)
      this.monsterHealth -= damage;
      this.playerDamage = damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      })
      this.remainingSpecialAttack--;
      if(this.checkWin()) return;
      this.monsterAttack();
    },
    heal: function () {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10
        this.turns.unshift({
          isPlayer: true,
          text: 'Player Heals for 10'
        })
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: 'Player Heals for ' + (100 - this.playerHealth)
        })
        this.playerHealth = 100;
      }
      this.remainingHeal--;
      this.monsterAttack();
    },
    giveUp: function () {
      this.gameIsRunning = false;
      this.gameStatsReset();
    },
    calculateRandomValue: function (minCoefficient = 1, maxCoefficient = 1) {
      return Math.max(
        Math.floor(
          Math.random()*this.maxAttackDamage*maxCoefficient),
        Math.floor(
          this.minAttackDamage*minCoefficient));
    },
    monsterAttack: function () {
      const damage = this.calculateRandomValue();
      this.playerHealth -= damage;
      this.monsterDamage = damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      })
    },
    checkWin: function () {
      if(this.monsterHealth <= 0){
        this.monsterHealth = 0;
        if(confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if(this.playerHealth <= 0){
        this.playerHealth = 0;
        if(confirm('You lost! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else {
        return false;
      }
    },
    gameStatsReset: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.remainingSpecialAttack = 3;
      this.remainingHeal = 5;
    }
  }
})
