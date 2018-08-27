export const UPDATE = 'UPDATE';

export const updateName = json => {
    return {
        type: UPDATE,
        json
    };
};