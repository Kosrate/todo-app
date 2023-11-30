import { List } from 'antd';
import TodoItem from './TodoItem';
import { TodosTabProps } from './models/TodosTabProps';

const TodosTab = ({todos, onTodoToggle, onTodoRemoval}: TodosTabProps) => {
    return (
        <>
        <List
            locale={{ emptyText: "You have done all your tasks!", }}
            dataSource={todos}
            renderItem={(todo) => {
                return <TodoItem 
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval={onTodoRemoval}
                />
            }}
            pagination={{
                position: 'bottom',
                pageSize: 25,
            }}
        />
        </>
    )
}

export default TodosTab;