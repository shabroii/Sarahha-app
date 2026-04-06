


export class baseRepository{

    constructor(model){
        this.model= model
    }

    createDocument(data){
      return this.model.create(data)
    }

    findOneDocument(filters, select){
      return this.model.findOne(filters).select(select)
    }

    findDocumentById(){
       return this.model.findById()
    }

    deleteOneDocument(){
       return this.model.deleteOne()
    }

    deleteMultipleDocuments(){
       return this.model.deleteMany()
    }


}