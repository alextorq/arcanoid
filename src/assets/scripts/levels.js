export default {
    levels: [
        {
            row: 5,
            column: 10
        }
    ],
    getCurrentLevel() {
        return this.levels[this.currentLevel]; 
    },
    currentLevel: 0,
    currentScore : 0
}