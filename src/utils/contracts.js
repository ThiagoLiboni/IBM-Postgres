export const userRequirements = (data) => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        brokerName: data.brokerName || null,
        brokerCity: data.brokerCity || null,
        brokerState: data.brokerState || null,
        brokerPhone: data.brokerPhone || null
    }
}
export const clientRequeriments = (data) => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        sellerId: data.sellerId
    }
}