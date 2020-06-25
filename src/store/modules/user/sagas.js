// * is a generator like as async
// generator > async

import { call, put, all, takeLatest } from 'redux-saga/effects'
import api from '../../../services/api'
import { addToCartSuccess } from './actions'

function* addToCart({ id }) {
    const response = yield call(api.get, `/products/${id}`)

    yield put(addToCartSuccess(response.data))
}

export default all([
    // takeLatest (take one click of user)
    takeLatest('@cart/ADD_REQUEST', addToCart)
])