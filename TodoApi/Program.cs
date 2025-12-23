    using Microsoft.EntityFrameworkCore;

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("Todolist"));
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddOpenApiDocument(config =>
    {
        config.DocumentName = "TodoAPI";
        config.Title = "TodoAPI v1";
        config.Version = "v1";
    });
    var app = builder.Build();
    if (app.Environment.IsDevelopment())
    {
        app.UseOpenApi();
        app.UseSwaggerUi(config =>
        {
            config.DocumentTitle = "TodoAPI";
            config.Path = "/swagger";
            config.DocumentPath = "/swagger/{documentName}/swagger.json";
            config.DocExpansion = "list";
        });
    }

    app.MapGet("/todoitems", async (TodoDb db) =>
        await db.Todos.ToListAsync());

    app.MapGet("/todoitems/complete", async (TodoDb db) => 
        await db.Todos.Where(t => t.IsComplete).ToListAsync());

    app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
        // Gets await from db, checks if is a todo and if so assigns to todo,
        // If todo is not null send it, if null, not found
        await db.Todos.FindAsync(id)
            is Todo todo
                ? Results.Ok(todo)
                : Results.NotFound());

    app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
    {
        db.Todos.Add(todo);
        await db.SaveChangesAsync();

        return Results.Created($"/todoitems/{todo.Id}", todo);
    });

    app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
    {
        var todo = await db.Todos.FindAsync(id);

        if (todo is null) return Results.NotFound();

        todo.Name = inputTodo.Name;
        todo.IsComplete = inputTodo.IsComplete;

        await db.SaveChangesAsync();

        return Results.NoContent();
    });

    app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
    {
        if (await db.Todos.FindAsync(id) is Todo todo)
        {
            db.Todos.Remove(todo);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }

        return Results.NotFound();
    });

    app.Run();