// const { person } = require("@cloudinary/base/qualifiers/focusOn")

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title:  array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (records) => {
    let result = records.map(record => createEmployeeRecord(record))
    return result
}

const createTimeInEvent = (employee, times) => {
    let [date, time] = times.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    })
    return employee
}

const createTimeOutEvent = (employee, times) => {
    let [date, time] = times.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    let start = employee.timeInEvents.find(function(e){
        return (e.date === date)
    })
    
    let end = employee.timeOutEvents.find(function(e){
        return (e.date === date)
    })
    return (end.hour - start.hour) / 100
}

const wagesEarnedOnDate = (employee, date) => {
    let totalPay = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(totalPay.toString())
}

const allWagesFor = (employee) => {
    // console.log(employee)
    let getDates = employee.timeInEvents.map(e => e.date)
    let owedMoney = getDates.reduce((accum, current) => {
        return accum + wagesEarnedOnDate(employee, current)
    }, 0)
    return owedMoney
}

const findEmployeeByFirstName = (array, firstName) => {
    return array.find(function(e){
        return e.firstName === firstName
    })
}

const calculatePayroll = (employees) => {
    return employees.reduce((accum, current) => {
        return accum + allWagesFor(current)
    }, 0)
}