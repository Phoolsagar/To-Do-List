package com.example.todo.service;

import com.example.todo.dto.TodoRequest;
import com.example.todo.dto.TodoResponse;
import com.example.todo.entity.Todo;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(TodoResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id) {
        return TodoResponse.fromEntity(findTodo(id));
    }

    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = new Todo();
        todo.setTitle(request.getTitle().trim());
        todo.setDescription(normalizeDescription(request.getDescription()));
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = findTodo(id);
        todo.setTitle(request.getTitle().trim());
        todo.setDescription(normalizeDescription(request.getDescription()));
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public TodoResponse setCompleted(Long id, boolean completed) {
        Todo todo = findTodo(id);
        todo.setCompleted(completed);
        return TodoResponse.fromEntity(todoRepository.save(todo));
    }

    public void deleteTodo(Long id) {
        Todo todo = findTodo(id);
        todoRepository.delete(todo);
    }

    private Todo findTodo(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    private String normalizeDescription(String description) {
        if (description == null) return null;
        String value = description.trim();
        return value.isEmpty() ? null : value;
    }
}
