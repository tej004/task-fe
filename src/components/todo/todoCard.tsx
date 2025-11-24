
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { TodoDialog } from "./todoDialog";
import { toast } from "sonner";

export type Todo = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	created_at: string;
};

export const TodoCard: React.FC<any> = ({ todo, onToggleCompleted, onDelete, onEdit }) => {
	const [completed, setCompleted] = useState(todo.completed);
	const [editOpen, setEditOpen] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);
	const [editDescription, setEditDescription] = useState(todo.description);
	const [loading, setLoading] = useState(false);

	const handleEdit = () => {
		setEditTitle(todo.title);
		setEditDescription(todo.description);
		setEditOpen(true);
	};

	const handleToggle = () => {
		setCompleted((prev: boolean) => {
			const next = !prev;
			onToggleCompleted?.(todo.id, next);
			toast.success(next ? 'Todo marked as completed' : 'Todo marked as incomplete');
			return next;
		});
	};

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this todo?')) {
			onDelete?.(todo.id);
			toast.success('Todo deleted');
		}
	};

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onEdit?.(todo.id, editTitle, editDescription);
			toast.success('Todo updated');
			setEditOpen(false);
		} catch (err) {
			toast.error('Failed to update todo');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Card className={`relative w-full min-w-[320px] max-w-md mx-auto my-4 shadow-lg border ${completed ? 'bg-neutral-200 dark:bg-neutral-800' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'}`}>
				<div className="absolute top-2 right-2 flex gap-2 z-10">
					<div className="flex items-center gap-2">
						<Switch
							checked={completed}
							onCheckedChange={handleToggle}
							className={`cursor-pointer ${completed ? 'data-[state=checked]:bg-green-500' : ''}`}
							aria-label={completed ? 'Completed' : 'Mark Complete'}
						/>
						<span className={`text-xs font-semibold ${completed ? 'text-black dark:text-white' : 'text-gray-400'}`}>{completed ? 'Completed' : 'Incomplete'}</span>
					</div>
					<Button
						variant="outline"
						size="icon"
						className="cursor-pointer"
						onClick={handleEdit}
						aria-label="Edit todo"
					>
						<Pencil className="w-4 h-4" />
					</Button>
					<Button
						variant="destructive"
						size="icon"
						className="cursor-pointer"
						onClick={handleDelete}
						aria-label="Delete todo"
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>
				<CardHeader>
					<CardTitle className="flex items-center justify-between pt-8 break-word whitespace-pre-line">
						<span className={completed ? "line-through text-gray-400 break-word whitespace-pre-line" : "break-word whitespace-pre-line"}>{todo.title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className={`text-sm ${completed ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200"} break-all whitespace-pre-line overflow-auto`}>{todo.description}</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
					<span>ID: {todo.id}</span>
					<span>{new Date(todo.created_at).toLocaleString()}</span>
				</CardFooter>
			</Card>
			<TodoDialog
				open={editOpen}
				onOpenChange={setEditOpen}
				title={editTitle}
				description={editDescription}
				setTitle={setEditTitle}
				setDescription={setEditDescription}
				loading={loading}
				onSubmit={handleEditSubmit}
				dialogTitle="Edit Todo"
				submitLabel="Update Todo"
			/>
		</>
	);
};
