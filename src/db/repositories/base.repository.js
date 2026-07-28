


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

    findDocumentById(id){
       return this.model.findById(id)
    }

    findByIdAndUpdate({id, data, options}){
      return this.model.findByIdAndUpdate(id, data, options)
    }

    findDocuments(){
      return this.model.find()
    }

    deleteOneDocument(){
       return this.model.deleteOne()
    }

    deleteMultipleDocuments(){
       return this.model.deleteMany()
    }

   updatOneDocument(data){
      return this.model.updateOne()
   }

   updatManyDocument(data){
      return this.model.updateMany()
   }



}