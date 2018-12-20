import axios from 'axios';
import CachedFetch from 'Util/CachedFetch';

function actionInProgress(actionTypeProgress, data) {
    return {
        type: actionTypeProgress,
        payload: {
            data
        }
    }
}

function actionSuccess(actionTypeSuccess, data) {
    return {
        type: actionTypeSuccess,
        payload: {
            data
        }
    }
}

function actionError(actionTypeError, error) {
    return {
        type: actionTypeError,
        payload: {
            error
        }
    }
}

function getAppropriateObjectForAxios(method, url, headers, data, dataType) {
    const axiosReadyObject = {
        method,
        url
    };
    if(headers) {
        axiosReadyObject.headers = headers;
    }
    if(data) {
        axiosReadyObject.data = data;
    }
    if(dataType && dataType !== 'json') {
        axiosReadyObject.dataType = dataType;
    }

    return axiosReadyObject;
}

function getAppropriateObjectForCashedFetch(method, url, params, cacheTimeInMs) {
    let cashedFetchReadyObject = {
        method,
        url,
        cacheTimeInMs
    };
    if(params) {
        cashedFetchReadyObject.params = params;
    }
    return cashedFetchReadyObject;
}

function axiosAsyncAction(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, headers, data, dataType) {
    return dispatch => {
        dispatch(actionInProgress(actionTypeProgress, inProgressAdditionalData));
        axios(
            getAppropriateObjectForAxios(method, url, headers, data, dataType)
        ).then(success => {
            dispatch(actionSuccess(actionTypeSuccess, success.data));
        }).catch(error => {
            dispatch(actionError(actionTypeError, error));
        });
    }
}

function cashedFetchAsyncAction(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, params, cacheTimeInMs) {
    return dispatch => {
        dispatch(actionInProgress(actionTypeProgress, inProgressAdditionalData));
        CachedFetch.get(
            getAppropriateObjectForCashedFetch(method, url, params, cacheTimeInMs)
        ).then(success => {
            dispatch(actionSuccess(actionTypeSuccess, success.data));
        }).catch(error => {
            dispatch(actionError(actionTypeError, error));
        });
    }
}

function returnAppropriateActionBasedOnMethod(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, params, headers, data, dataType, cacheTimeInMs) {
    if(method === 'GET') {
        return cashedFetchAsyncAction(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, params, cacheTimeInMs);
    }
    return axiosAsyncAction(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, headers, data, dataType);
}

export default function asyncAction (
    {
        method, url, actionTypeProgress, actionTypeSuccess, actionTypeError,
        inProgressAdditionalData=null, params=null, headers=null, data=null, dataType='json', cacheTimeInMs=null
    }
) {
    return returnAppropriateActionBasedOnMethod(method, url, actionTypeProgress, actionTypeSuccess, actionTypeError, inProgressAdditionalData, params, headers, data, dataType, cacheTimeInMs);
}

// EXAMPLE
// export function actionName(...actionParams) {
//      return asyncAction({
//          method: 'GET',
//          url: API_URL,
//          actionTypeProgress: ACTION_IN_PROGRESS,
//          actionTypeSuccess: ACTION_SUCCESS,
//          actionTypeError: ACTION_ERROR
//      });
// }