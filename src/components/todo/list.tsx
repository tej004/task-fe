
import { todoService } from '../../services/todo.service';
import { TodoCard, type Todo } from './todoCard';
import { Skeleton } from "../ui/skeleton";

export const TodoList = ({ todos, isLoading, isError, refetch }: any) => {

	const handleToggleCompleted = async (id: number, completed: boolean) => {
		try {
			await todoService.toggleCompleted(id, completed);
			refetch();
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex gap-2">
				{[...Array(3)].map((_, i) => (
					<Skeleton key={i} className="w-full max-w-md h-32 mx-auto my-4" />
				))}
			</div>
		);
	}
	if (isError) return <div className="text-center py-8 text-red-500">Error loading todos.</div>;

	const handleDelete = async (id: number) => {
		try {
			await todoService.deleteTask(id);
			refetch();
		} catch (error) {
			console.error(error);
		}
	};

	return (
        <div className="flex gap-2 flex-wrap justify-end">
			{todos && (todos as Todo[]).length > 0 ? (
				(todos as Todo[]).map((todo) => (
					<TodoCard
						key={todo.id}
						todo={todo}
						onToggleCompleted={handleToggleCompleted}
						onDelete={handleDelete}
					/>
				))
			) : (
				<div className="text-center py-8 text-gray-400">No todos found.</div>
			)}
		</div>
	);
};
