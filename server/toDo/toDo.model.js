module.exports = function (Mongoose) {
    var toDoSchema = new Mongoose.Schema({
        title: String,

    });
    var toDos = Mongoose.model("toDos", toDoSchema);
}