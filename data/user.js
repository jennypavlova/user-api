const createDummyUsers = (userMap) => {
    userMap.set('id1', {
        id: 'id1',
        email: 'test@test.com',
        givenName: 'Anna',
        familyName: 'Smith',
        created: 1564355589220
    })
    userMap.set('id2', {
        id: 'id2',
        email: 'test@test.com',
        givenName: 'Anna',
        familyName: 'Smith',
        created: 1564355589220
    })
    console.log(userMap)
}

module.exports = createDummyUsers
