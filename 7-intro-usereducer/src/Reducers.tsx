type IAction = { type: 'INCREMENT' | 'DECREASE' }

  export const reducerCount = (state: number, action: IAction) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREASE':
        return state - 1;
      default:
        return state;
    }
  }