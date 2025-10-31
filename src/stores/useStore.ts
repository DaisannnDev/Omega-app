import { create } from 'zustand'

interface Todo {
  text: string
  done: boolean
}

interface AppState {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (index: number) => void
  clearTodos: () => void
  notes: string
  setNotes: (text: string) => void
}

export const useStore = create<AppState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  todos: [],
  addTodo: (text) =>
    set((state) => ({ todos: [...state.todos, { text, done: false }] })),
  toggleTodo: (index) =>
    set((state) => {
      const todos = [...state.todos]
      todos[index] = { ...todos[index], done: !todos[index].done }
      return { todos }
    }),
  clearTodos: () => set({ todos: [] }),
  notes: '',
  setNotes: (text) => set({ notes: text }),
}))
