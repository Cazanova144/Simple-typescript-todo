/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import { v4 as uuidV4 } from 'uuid'

// console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

type Task = { 
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

const loadTasks = (): Task[] => {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON === null) return []
  return JSON.parse(taskJSON)
}

const tasks: Task[] = loadTasks()

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

list?.addEventListener("click", (e: MouseEvent) => {
  const element = e.target as HTMLElement

  if (element.tagName === "BUTTON") element.parentElement?.remove()
})

const addListItem = (task: Task) => {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const btn = document.createElement("button")

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    console.log(tasks)
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label, btn)
  list?.append(item)
}

tasks.forEach(addListItem)
