
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {

    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
    // return httpService.get(BASE_URL, filterBy) <-------
    // .then(toys => {
    //     return toys.filter(toy =>
    //         regExp.test(toy.vendor) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
    // return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return storageService.remove(STORAGE_KEY, toyId)
    // return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
        // return httpService.put(BASE_URL, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
        // return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    return {
        name: 'Barbie-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(100, 500),
        labels: labels.filter(label => utilService.getRandomIntInclusive(0, 1) ? true : false),
        createdAt: Date.now(),
        inStock: utilService.getRandomIntInclusive(0, 1) ? true : false
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}


