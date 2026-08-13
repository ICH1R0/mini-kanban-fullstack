package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Task struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Status string `json:"status"`
}

var tasks = []Task{
	{ID: 1, Title: "Estudo GO", Status: "to-do"},
	{ID: 2, Title: "Criar API", Status: "in_progress"},
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello kanban")
}

func getTaskHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTaskHandler(w http.ResponseWriter, r *http.Request) {

	var newTask Task
	json.NewDecoder(r.Body).Decode(&newTask)

	newTask.ID = len(tasks) + 1
	tasks = append(tasks, newTask)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newTask)
}

func updateTaskHandler(w http.ResponseWriter, r *http.Request) {

	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	var updateData Task
	json.NewDecoder(r.Body).Decode(&updateData)

	for i, task := range tasks {

		if task.ID == id {

			if updateData.Title != "" {
				tasks[i].Title = updateData.Title
			}
			if updateData.Status != "" {
				tasks[i].Status = updateData.Status
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(tasks[i])
		}
	}
	
}

func deleteTaskHandler(w http.ResponseWriter, r *http.Request) {

	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			fmt.Fprintf(w, "tarefa removida!!")
		}
	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r* http.Request){
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next.ServeHTTP(w, r)
	})
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/", helloHandler)
	mux.HandleFunc("GET /tasks", getTaskHandler)
	mux.HandleFunc("POST /tasks", createTaskHandler)
	mux.HandleFunc("PATCH /tasks/{id}", updateTaskHandler)
	mux.HandleFunc("DELETE /tasks/{id}", deleteTaskHandler)

	fmt.Println("Servidor rodando em http://localhost:8080")
	http.ListenAndServe(":8080", enableCORS(mux))
}
