var TodoManager = require("./toDo.manager");

module.exports = function (Mongoose, app) {
    var toDoManager = new TodoManager(Mongoose);
    app.post("/toDo", function (request, response) {
        toDoManager.addToDo(request.body,
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });
    app.delete("/toDo/:id", function (request, response) {
        var id = request.params.id;

        toDoManager.remove(id,
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });
    app.get("/toDo", function (request, response) {
        toDoManager.getAll(function (data) {
            response.status(200).json(data);
        }, function (error) {
            response.status(500).json(error);
        });
    })
    app.put("/toDo/:id/:title", function (request, response) {
        var id = request.params.id;
        var title = request.params.title;
        toDoManager.update(id,title,function (data) {
            response.status(200).json(data);
        }, function (error) {
            response.status(500).json(error);
        });
    })
};