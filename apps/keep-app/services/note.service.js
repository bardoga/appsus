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

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
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
    return Promise.resolve(note)
}




function deleteNote(noteid) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteid)
    _saveToStorage(notes)
    return Promise.resolve()
}

function update(notes) {
    // let notes = _loadFromStorage()
    _saveToStorage()
    return Promise.resolve()
}


function addNote(note) {
    gNotes.unshift(note)
    _saveToStorage(gNotes)
    return Promise.resolve()
}


function updateColor(color, id) {
    let note = getById(id)
    if (!note) return
    let ans = note.then(function(result) {
        console.log(result)
        result.style.backgroundColor = color
            // _saveToStorage(result)
        console.log('ans is...', ans)
        return Promise.resolve(ans)
    });


}


function createNote(input, type) {
    // console.log(type)
    // console.log(input)
    // if (!input) return;
    if (type === 'note-txt') {
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
                backgroundColor: '#fff'
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
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
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
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSop-oEcLinR6-3roGHp4Ys5AoRpisDV2JCdQ&usqp=CAU",
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
    {
        id: utilService.makeId(),
        type: "note-vid",
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/AhbCYVILusc'
        },
        style: {
            backgroundColor: utilService.getRandomLightColor()
        }
    }
]


function _createNotes() {
    let notes = gNotes
    return notes
}



function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}