const goal = {
  "name": "Test",
  "description": "Test",
  "goalType": {
  },
  "notificationFrequency": {
  },
  "endDate": "1996/08/19"
}

const goalUpdate = {
  "name": "Test change",
  "description": "Test change",
  "goalType": {
  },
  "notificationFrequency": {
  },
  "endDate": "1996/08/19"
}

const goalInvalid = {
  "goalType": {
      "id": 1212
  },
  "notificationFrequency": {
      "id": "A"
  },
  "endDate": "199/08/19"
}

const goalInvalidCatalogue = {
  "name": "Test",
  "description": "Test",
  "goalType": {
      "id": "617b3149b1510a368b13831a"
  },
  "notificationFrequency": {
      "id": "617f7df63f4770bc77b604cd"
  },
  "endDate": "1996/08/19"
}

module.exports = {
  goal,
  goalUpdate,
  goalInvalid,
  goalInvalidCatalogue
}
