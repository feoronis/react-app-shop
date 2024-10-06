const { error } = require('console');
const {PublicationModel} = require('../models/publication');


exports.DataService = class {
    constructor () {}

    async get () {
        const result = await PublicationModel.find();
        if (!result) {
            throw new Error('get false');
        }
        return result;
    }


    async getById (id) {
        const result = await PublicationModel.findOne({_id:id});
        if (!result) {
            throw new Error('get false');
        }
        return result;
    }


    async create (data) {
        if (! data.name && data.description && data.price && data.pathP) {
            throw new Error('incorrect data');
        }
        data.date = new Date();

        const createPost = await PublicationModel.create(data);

        if (!createPost) {
            throw new Error('create false');
        }
        return true;
    }


    async delete (id) {
        const deletePost = await PublicationModel.findByIdAndDelete(id);
        if (deletePost) {
            return true;
        }
        throw new Error('delete false');
    }
}