import { storageService } from '../../../services/storage-service.js'



export const noteService = {
    query,
    getById,

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




const gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://previews.123rf.com/images/nnonthamand/nnonthamand1601/nnonthamand160100007/51360656-dark-trees-in-the-jungle.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];





function _saveToStorage(cars) {
    storageService.saveToStorage(KEY, cars)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}