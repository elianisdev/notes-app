const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://elianis:elianis4@cluster0.kbuzulh.mongodb.net/?retryWrites=true&w=majority';
//models
const User = require('./models/User');
const Notes = require("./models/Notes");

class Controller {
    constructor() {
        this.connect();
    }
    async connect() {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true
            })
            console.info('Connected to DB');
        } catch (err) {
            console.error(err);
        }
    }
//  Queries
    addUser(res, data) {
        User.create(data, (err, newUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Created',
                user: newUser
            })
        })
    }
    login(res, data) {
        User.findOne({
            $and:[
                {email: data.email},
                {password: data.password}
            ]
        }, (err, user) => {
            if(err) throw err;
            res.json({
                    status: 200,
                    message: 'ok',
                    user
                })
        })
    }
    updateUser(res, id, data) {
        User.updateOne({
            _id: id
        }, data, (err, updateUser) => {
            if(err) throw err;
            res.json({
                status: 200,
                message: 'Updated',
                user: updateUser
            })
        })
    }
    getUser(res, id) {
        User.findOne({
            _id: id
        }, (err, user) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Ok',
                user
            })

        })
    }
    deleteUser(res, id) {
        User.deleteOne({
            _id: id
        }, (err) => {
            if(err) throw  err;
            res.json({
                status: 200,
                message: 'Deleted',
            })
        })
    }
    //Notes Queries
    addNote(res, data) {
        Notes.create(data , (err, note) => {
            if( err) throw err;
            res.json({
                status: 200,
                message:'Created',
                note
            })
        })
    }
    getNotes(res, userId) {
        Notes.find({
            id_user: userId
        }, (err, notes) => {
            if(err) throw err;
            res.json({
                status: 200,
                message: 'ok',
                notes
            })
        })
        }
    updateNotes(res, id, data) {
     Notes.updateOne({
         _id: id
     }, data, (err, updateNote) => {
         if(err) throw err;
         res.json({
             status:200,
             message: 'Updated',
             updateNote
             })
     })
    }
    deleteNote(res, id){
        Notes.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: "Deleted"
            })
        })
    }
}

exports.db = new Controller();
