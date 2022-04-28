import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util.service.js'



export const noteService = {
    query,
    getById,
    remove,
    createNote,

}



const KEY = 'notesDB'


function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }
    if (filterBy) {
        // let { text, img, vid, todo } = filterBy
        // notes = notes.filter(note =>
        //         note.type.includes(text))
        // || note.type.includes(img) || note.type.includes(vid) || note.type.includes(todo)

    }
    return Promise.resolve(notes)
}


function getById() {
    let notes = _loadFromStorage()
    if (!notes) {
        _saveToStorage(notes)
    }
}


function remove(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _update(noteToAdd) {
    let notes = _loadFromStorage()
    const note = _createNote
}


function addNote(note) {
    gNotes.unshift(note)
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




const gNotes = [{
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






function _saveToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}