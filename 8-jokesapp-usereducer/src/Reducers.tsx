type IAction = { type: 'INCREMENT' | 'DECREASE' }

  export const reducerJokes = (state: number, action: IAction) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREASE':
        return state - 1;
      default:
        return state;
    }
  }