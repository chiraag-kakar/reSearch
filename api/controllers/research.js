const Document = require('../models/document');
const mongoose = require('mongoose');
const fs =require('fs')
var multer  = require('multer');

// var upload = multer({ dest: '../../uploads/' });

exports.home_get = (request, response, next) => {
    return response.render('home');
}
const tosave = async(rawText) => {
    var output = rawText.split(/(?:\r\n){2,}/);

    output.forEach(element => {
            const document = new Document({
                text: element,
                tags: element.toLowerCase().split(/\s/g)
            });

            document.save().then().catch(error => {
                return {
                    message: "Something went wrong",
                    error
                };
            });
        });

} 
exports.home_post = async(request, response, next) => {

    try {
        const rawText = request.body.documents;
        const res1 = await tosave(rawText);
        console.log(res1)
        if(!res1){
            return response.status(200).render('home');
        }
        return response.status(400).json(res1);

    } catch (error) {
        console.log(error);
    }
}

exports.search_get = (request, response, next) => {
    try {

        Document.collection.createIndex({ tags: 'text' });
        return response.status(200).render('search', {
            documents: [{
                "text": "Nothing to show here."
            }]
        });
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.search_post = (request, response, next) => {
    try {
        const query = request.body.query;
        Document.find({
            $text: {
                $search: query
            }
        }, {
            score: {
                $meta: 'textScore'
            }
        }).sort({
            score: {
                $meta: 'textScore'
            }
        }).select('_id text').limit(10).exec().
            then(documents => {
                if (documents.length === 0) {
                    return response.status(200).render('search', {
                        documents: [{
                            "text": "Not found."
                        }]
                    });
                } else {
                    return response.status(200).render('search', {
                        documents: documents
                    });
                }
            }).catch(error => {
                return response.status(404).json({
                    message: "Something went wrong",
                    error
                });
            });
    } catch (error) {
        console.log(error);
    }
}

exports.clear_get = (request, response, next) => {
    try {
        Document.deleteMany({}).exec().then(documents => {
            return response.status(200).render('infopage');
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
        /*Document.collection.drop();*/
    } catch (error) {
        console.log(error);
    }
}

/*
exports.pdf_post = (request,response,next) => {
    let uploadRef = upload.single('pdf');
    uploadRef(request,response,(error)=>{
        encodeURIComponent(request.file.path)
        fs.readFile(request.file.path,'utf8',(data,err)=>{
            if(err){
                console.log(err)
            }
            console.log(data)
        
        })
        return response.render('home')
    })
    
}
*/