import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util.service.js'



export const noteService = {
    query,
    getById,
    deleteNote,
    createNote,
    update,

}

let notes;
const KEY = 'notesDB'





function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage()
    }
    // if (filterBy) {
    // let { text, img, vid, todo } = filterBy
    // notes = notes.filter(note =>
    //         note.type.includes(text))
    // || note.type.includes(img) || note.type.includes(vid) || note.type.includes(todo)

    // }
    return Promise.resolve(notes)
}





function getById() {
    let notes = _loadFromStorage()
    if (!notes) {
        _saveToStorage()
    }
}




function deleteNote(noteid) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteid)
    _saveToStorage()
    return Promise.resolve()
}

function update(notes) {
    // let notes = _loadFromStorage()
    _saveToStorage()
    return Promise.resolve()
}


function addNote(note) {
    notes.unshift(note)
    _saveToStorage()
    return Promise.resolve(note)
}


function createNote(input, type) {
    if (!input) return;
    let note = {
        id: utilService.makeId(),
        type: type,
        isPinned: false,
        info: {
            txt: input
        },
        style: {
            backgroundColor: '#fff'
        }
    }

    addNote(note)
}






// const gNotes = [{
//         id: "n101",
//         type: "note-txt",
//         isPinned: true,
//         info: {
//             txt: "Fullstack Me Baby!"
//         },
//         style: {
//             backgroundColor: utilService.getRandomLightColor()
//         }
//     },
//     {
//         id: "LAA8N5",
//         type: "note-txt",
//         isPinned: false,
//         info: {
//             txt: "rere"
//         },
//         style: {
//             backgroundColor: "#fff"
//         }
//     }
// ]


function _createNotes() {
    let notes = _loadFromStorage()
    if (!notes || notes.length) {
        notes = [{
                    id: "n101",
                    type: "note-txt",
                    isPinned: true,
                    info: {
                        txt: "Fullstack Me Baby!"
                    },
                    style: {
                        backgroundColor: utilService.getRandomLightColor()
                    }
                },
                {
                    id: "n102",
                    type: "note-txt",
                    info: {
                        txt: "I've never used google keep!"
                    },
                    style: {
                        backgroundColor: utilService.getRandomLightColor()
                    }
                },
            ]
            // gNotes = notes
            // _saveToStorage()
    }
    return notes
}







function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}