export const noteService = {
    query
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


function query() {
    let notes = gNotes
    return Promise.resolve(notes)
}