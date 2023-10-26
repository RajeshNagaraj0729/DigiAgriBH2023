import moment from "moment-timezone";
// USE this methods when we call API's / for server side
const APIFORMAT = 'YYYY-MM-DDTHH:mm:ss'; //'YYYYYY-MM-DDTHH:mm:ss.sssZ';
const UIFORMAT = 'DD/MM/YYYY, h:mm:ss a';

const localToUTCStartDate = (date) => {
    let startDate = date ? moment(date).startOf('day').format(APIFORMAT) : moment().startOf('day').format(APIFORMAT);
    let startDateFiveHoursBehind =  moment(startDate).subtract(19800, 'seconds').format(APIFORMAT);
     return startDateFiveHoursBehind;
}

const localToUTCEndDate = (date) => {
    let endDate = date ? moment(date).endOf('day').format(APIFORMAT) : moment().endOf('day').format(APIFORMAT);
    let endDateFiveHoursBehind =  moment(endDate).subtract(19800, 'seconds').format(APIFORMAT);
    return endDateFiveHoursBehind;
}


// USE this methods when we display in UI 
const UTCtolocalDate = (date) => {
    if(date) {
       let displayDate = moment.tz(date, 'Asia/kolkata').format(UIFORMAT);
       return displayDate;
    }
}



export {
    localToUTCStartDate,
    localToUTCEndDate,
    UTCtolocalDate
}