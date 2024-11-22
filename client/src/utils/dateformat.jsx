import moment from "moment";  //for date formatting

export const dateFormat = (dateformat) => {
    return moment(dateformat).format('DD/MM/YYYY  HH:mm:ss')
}