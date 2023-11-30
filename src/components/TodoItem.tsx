import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { TodoProps } from './models/TodoProps';
import TodoEdit from './TodoEdit';


const Todo = ({todo, onTodoToggle, onTodoRemoval}: TodoProps) => {
    return(
        <List.Item
        actions={[
            <Tooltip
                title={todo.completed ? 'Mark as not completed' : 'Mark as completed'}>
                    <Switch 
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                    />
            </Tooltip>,
            <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} />,
            <Popconfirm
            title={'Do you really want to delete?'}
            onConfirm={() => {
                onTodoRemoval(todo);
            }}>

                <Button className="remove-todo-btn" type="primary" danger>
                    X
                </Button>
            </Popconfirm>
        ]}
        className="list-item"
        key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.completed ? 'green' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Todo;