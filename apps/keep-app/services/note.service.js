import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util.service.js'



export const noteService = {
    query,
    getById,
    deleteNote,
    createNote,
    update,
    updateColor
}

// let notes;
const KEY = 'notesDB'
let notes;

function query(filterBy) {
    let notes = _loadFromStorage()
    console.log(notes)
    if ((!notes) || (notes.length === 0)) {
        notes = _createNotes()
        _saveToStorage(notes)
    }
    // if (filterBy) {
    // let { text, img, vid, todo } = filterBy
    // notes = notes.filter(note =>
    //         note.type.includes(text))
    // || note.type.includes(img) || note.type.includes(vid) || note.type.includes(todo)

    // }
    return Promise.resolve(notes)
}





function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return note;
}




function deleteNote(noteid) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteid)
    _saveToStorage(notes)
    return Promise.resolve()
}

function update(noteId, note) {
    // let notes = _loadFromStorage()
    let noteIDX = gNotes.findIndex((note) => note.id === noteId)
    if (noteIDX === -1) return
    gNotes[noteIDX] = note
    _saveToStorage(gNotes)
    return Promise.resolve()
}


function addNote(note) {
    notes = _loadFromStorage()

    notes.unshift(note)
    _saveToStorage(notes)
    return Promise.resolve()
}


function updateColor(color, noteid) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteid)
        note.style.backgroundColor = color
        _saveToStorage(notes)
        return notes;
    })
}






function createNote(input, type) {
    if (type === 'note-txt') {
        let note = {
            id: utilService.makeId(),
            type: type,
            isPinned: false,
            info: {
                txt: input
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        }
        addNote(note)
    } else if (type === 'note-todo') {
        let note = {
            id: utilService.makeId(),
            type: type,
            isPinned: false,
            info: {
                label: "Todos:",
                todos: spreadInfo(input)
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        }
        addNote(note)
    } else if (type === 'note-img') {
        let note = {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                title: "React",
                url: input,
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        }
        addNote(note)
    } else if (type === 'note-vid') {
        let note = {
            id: utilService.makeId(),
            type: "note-vid",
            isPinned: false,
            info: {
                url: getVideoId(input)
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        }
        addNote(note)
    }
}

function getVideoId(input) {
    console.log(input)
    let video_id = input.split("v=")[1].substring(0, 11)
    let newLink = 'https://www.youtube.com/embed/' + video_id;
    console.log(newLink)
    return newLink
}


function spreadInfo(input) {
    let todos = [];
    let texts = input.split(',')
    console.log(todos)
    let newarr = texts.forEach(text => {
        let obg = {}
        obg.txt = text
        obg.done = false
        todos.push(obg)
    });
    console.log(todos)
    return todos


}


const gNotes = [{
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        style: {
            backgroundColor: utilService.getRandomLightColor()
        }
    },
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "elon musk"
        },
        style: {
            backgroundColor: utilService.getRandomLightColor()
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        info: {
            title: "React",
            url: "https://toppng.com/uploads/preview/react-logo-icon-11609374122d9vkbptqap.png",
        },
        style: {
            backgroundColor: utilService.getRandomLightColor()
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todo",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", done: false },
                { txt: "Coding power", done: false }
            ]

        },
        style: {
            backgroundColor: utilService.getRandomLightColor()
        }
    },
    // {
    //     id: utilService.makeId(),
    //     type: "note-vid",
    //     isPinned: false,
    //     info: {
    //         url: 'https://www.youtube.com/embed/Ey_K97x15ek'
    //     },
    //     style: {
    //         backgroundColor: utilService.getRandomLightColor()
    //     }
    // }
]


function _createNotes() {
    return [{
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "elon musk"
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                title: "React",
                url: "https://toppng.com/uploads/preview/react-logo-icon-11609374122d9vkbptqap.png",
            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todo",
            isPinned: false,
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", done: false },
                    { txt: "Coding power", done: false }
                ]

            },
            style: {
                backgroundColor: utilService.getRandomLightColor()
            }
        }
    ]
}





function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}