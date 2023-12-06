const covertAge = (dob, address1) => {
    const dobdata = new Date(dob)
    const currentDate = new Date()
    const age = currentDate.getFullYear() - dobdata.getFullYear()
    return age
}

export default covertAge