import axios from 'axios'

export const allSells = () => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/sale/get-all-sales`)
  
    dispatch({
      type: "gett_all_sells",
      payload: {
        data
      },
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }