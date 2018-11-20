// in src/dataProvider
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import { v4 as uuid } from 'uuid';
import APIConfig from "./APIConfig.json"





const convertDataProviderRequestToHTTP = (type, resource, params) => {
    let token = localStorage.getItem('token')
    let API_URL = APIConfig[resource];


    // console.log(type)
    // console.log(resource)
    // console.log("External Data Provider")
    // console.log("APIConfig")
    // console.log(APIConfig[resource])
    let options = {}



    switch (type) {

        case GET_LIST: {

            // console.log("GET_LIST")
            // console.log(params)
            // console.log(API_URL)
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            options.headers = new Headers({ Accept: 'application/json', Authorization: token });

            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            console.log((query))
            console.log(stringify(query))
            return {
                url: `${API_URL}/${resource}?${stringify(query)}`
                , options: options

            };
        }

        case GET_ONE:

      

            options.headers = new Headers({ Accept: 'application/json', Authorization: token });
            let query = {
                id: params.id
            }
         
            if (resource == "getAssetCurrentData") {
           
            }
            return {
                url: `${API_URL}/${resource}?${stringify(query)}`
                , options: options
            };


        case GET_MANY: {
         
            options.headers = new Headers({ Accept: 'application/json', Authorization: token });
            const query = {
                filter: JSON.stringify({ id: params.ids })
            };

            return {
                url: `${API_URL}/${resource}?${stringify(query)}`,
                options: options
            };
        }


        case GET_MANY_REFERENCE: {
           
            options.headers = new Headers({ Accept: 'application/json', Authorization: token });
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            return {
                url: `${API_URL}/${resource}?${stringify(query)}`,
                options: options
            };
        }


        case UPDATE:
            if (resource == 'getListOfMaintenancePlan') {
                resource = 'updateMaintenancePlan';
            }
            //   console.log(resource)
            //  console.log(params)
            options.method = 'PUT';
            options.body = JSON.stringify(params)
            options.headers = new Headers({ Accept: 'application/json', Authorization: token });
            return {
                url: `${API_URL}/${resource}`,
                options: options,
            };


        case CREATE:
            console.log(resource)
            if (resource == 'getListOfMaintenancePlan') {
                resource = 'createMaintenancePlan';
            }
            if (resource == 'getListOfAlertConfiguration') {
                resource = 'createAlertConfiguration';
            }

            options.method = 'POST';
            options.body = JSON.stringify(params.data)
            options.headers = new Headers({ Accept: 'application/json', Authorization: token });
            // console.log(options.body)
            return {
                url: `${API_URL}/${resource}`,
                options: options,
            };


        case DELETE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'DELETE' },
            };
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};


const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    // console.log()
    const { headers, json } = response;
    switch (type) {

        case GET_ONE:
           // console.log(response)
            return {
                data: json.data
            }
            break;

        case GET_LIST:
            console.log(response)
            console.log(headers.get('content-range'))
            //  console.log(parseInt(headers.get('content-range').split('/').pop(), 10));
            if (resource == "getDailyAssetRunData" || resource == "getDetailedAssetRunData" || resource == "getAssetUtilizationSummary" || resource =="getAssetCurrentData"|| resource =="getCustomerAssets") {
                return response
            }
            else {
                return {
                    data: json.map(x => x),
                    total: parseInt(headers.get('content-range').split('/').pop(), 10),
                };
            }


        case GET_MANY:
            // console.log(response)
            let resp = {
                data: json

            }

            // console.log(resp)
            return resp
            break;

        case GET_MANY_REFERENCE:
            //  console.log(response)
            return {
                data: json.map(x => x),
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };

        case UPDATE:
            //  console.log("update response")
            // console.log(response)

            break;

        case CREATE:
            return { data: { ...params.data, id: json.id } };
        default:
            return { data: json };
    }
};


export default (type, resource, params) => {
    // let options ={};

    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
      console.log(options)
     console.log(url)


    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};