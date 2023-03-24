import moment from 'moment';

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const cashFormat = string => (Number(string) ? string.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00');

export const dateTimeFormat = string => moment(string).format('DD MMM YYYY hh:mm a');

export const dateFormat = string => moment(string).format('DD MMM YYYY');
