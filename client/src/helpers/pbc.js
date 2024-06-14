import store from '../store'
import { sponserOne } from './dummyData';

// Project Basic Functions
export class pbc {

    static dummy(key) {
        let data = {}

        switch (key) {
            case 'sponsor':
                data = sponserOne
                break;

            default:
                break;
        }
        
        return process.env.REACT_APP_DUMMY_DATA === true ? data : this.setEmpty(data);

    }

    static setEmpty(obj) {
        const resetObj = {};
        
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                resetObj[key] = '';
            } else if (Array.isArray(obj[key])) {
                resetObj[key] = [];
            } else {
                resetObj[key] = '';
            }
        }
    
        return resetObj;
    }



}
