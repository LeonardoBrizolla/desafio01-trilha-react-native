import React, { useState } from 'react';
import { 
  View,
  Alert,
  StyleSheet, 
} from 'react-native';

import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { Header } from '../components/Header';

export type EditTaskArgs = {
  taskId: number,
  taskNewTitle: string,
}


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (!taskWithSameTitle) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      
      setTasks([...tasks, newTask]);
    } else {
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome!");
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTask = updatedTasks.find(task => task.id === id)
    
    if (!foundTask)
      return;

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id)
            setTasks(updatedTasks);
          },
        }
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundTask = updatedTasks.find(task => task.id === taskId);

    if (!foundTask) 
      return;

    foundTask.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})