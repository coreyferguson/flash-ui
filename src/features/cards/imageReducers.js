export default {
  fetchImage: (state, action) => {
    const { id, side } = action.payload;
    return Object.assign({}, state, {
      images: Object.assign({}, state.images, {
        [id]: !state.images[id]
          ? Object.assign({ A: { isLoading: false }, B: { isLoading: false } }, { [side]: { isLoading: true } })
          : Object.assign({}, state.images[id], {
            [side]: Object.assign({}, state.images[id][side], { isLoading: true })
          })
      })
    });
  },
  fetchImageResponse: (state, action) => {
    const { id, side, source } = action.payload;
    const updatedSide = { isLoading: false, source };
    return Object.assign({}, state, {
      images: Object.assign({}, state.images, {
        [id]: Object.assign({}, state.images[id], {
          [side]: !state.images[id]
            ? Object.assign({ A: { isLoading: false }, B: { isLoading: false } }, updatedSide)
            : Object.assign({}, state.images[id][side], updatedSide)
        })
      })
    });
  },
  fetchImageError: (state, action) => {
    const { id, side, error } = action.payload;
    const updatedSide = { [side]: { isLoading: false, error } };
    state.images = Object.assign({}, state.images, {
      [id]: !state.images[id]
        ? Object.assign({ A: {}, B: {} }, updatedSide)
        : Object.assign({}, state.images[id], updatedSide)
    });
  },
};