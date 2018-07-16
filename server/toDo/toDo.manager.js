module.exports = function (Mongoose) {
    var toDos = Mongoose.models.toDos;
    this.addToDo = function (title, success, fail) {
        var newToDo = new toDos(title);
        newToDo.save(function (error, result) {
            error ? fail(error) : success(result);
        });
    }
    this.getAll = function (success, fail) {
        toDos.find(function (error, result) {
            error ? fail(error) : success(result);
        });
    }
    this.remove = function ( id, success, fail) {
        toDos.deleteOne({_id:id},function (error, result) {
            error ? fail(error) : success(result);
        });
    }
    this.update = function ( id,title, success, fail) {
        toDos.findOneAndUpdate({_id:id},{title: title},function (error, result) {
            error ? fail(error) : success(result);
        });
    }
    
}