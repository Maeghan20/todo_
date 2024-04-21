var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks"); 

var createNewTaskElement = function(taskString) {
	var listItem = document.createElement("li");
	var checkBox = document.createElement("input"); //for the checkbox
	var label = document.createElement("label");
	var deleteButton = document.createElement("button");
	checkBox.type = "checkbox";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	label.innerText = taskString;
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(deleteButton);
	return listItem;
}
var addTask = function() {
	console.log("Add task...");
	var listItem = createNewTaskElement(taskInput.value);
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}
var taskCompleted = function() {
	console.log("Task complete...");
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete = function() {
	console.log("Task incomplete...");
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var deleteButton = taskListItem.querySelector("button.delete");
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}
addButton.addEventListener("click", addTask);
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}