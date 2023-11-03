// yoinked from Nathan https://github.com/nathanaltice/FSM/blob/3203389598e757c6bcad6e16e11ddda2b4bf5458/lib/StateMachine.js#L5
// what the fuck am I looking at?


class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]){
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;
    

        for (const state of Object.values(this.possibleStates)) {
            state.stateMachine = this
        }
    }

    step() {
        if(this.state == null) {
            this.state = this.initialState;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        this.possibleStates[this.state].execute(...this.stateArgs);
    }

    transition(newState, ...enterArgs) {
        this.possibleStates[this.state].exit(...this.stateArgs);
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

class State {
    enter() {

    }
    execute(){

    }
    exit(){

    }
}