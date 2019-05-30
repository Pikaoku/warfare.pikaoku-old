const updateStateForCategory = (state, updatedCategory, updatedValues) => {
    let all = [];
    ['core', 'user', 'saved'].map(
        category => all = all.concat(category === updatedCategory ? updatedValues : state[category])
    )
    return {
        ...state,
        [updatedCategory]: updatedValues,
        all: all
    }
}

export default updateStateForCategory