import {debounce as _debounce} from 'lodash';

export const debounce = (fn,wait=600) => _debounce(fn,wait,{
    leading: true,
    trailing: false
})