import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import editIcon from '../assets/icons/editIcon/editIcon.png';
import trashIcon from '../assets/icons/trash/trash.png';

import { EditTaskArgs } from '../pages/Home';
import { Task } from "./TasksList"

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task, 
  index, 
  toggleTaskDone, 
  removeTask, 
  editTask
}: TasksItemProps){
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);
  
  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ 
      taskId: task.id, 
      taskNewTitle: taskNewTitleValue 
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { 
              task.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )
            }
          </View>

          <TextInput 
            //TODO - use style prop
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          >
          </TextInput>
        </TouchableOpacity>
      </View>
      
      <View style={styles.iconsContainer}>
        { 
          isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2"/>
            </TouchableOpacity>
          ) 
          : (
              <TouchableOpacity onPress={handleStartEditing}>
                <Image source={editIcon} />
              </TouchableOpacity>
            ) 
        }

          <View style={styles.iconsDivider}/>

          <TouchableOpacity 
            disabled={isEditing}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
          </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingLeft: 12,
    paddingRight: 24,
  },iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  }
})