
import { Button } from '@/components/ui/button';
import { Sun, Moon, Plus } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { TodoList } from '@/components/todo/list';
import { TodoDialog } from '@/components/todo/todoDialog';
import { todoService } from '@/services/todo.service';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';


export const Route = createFileRoute('/(todo)/todo')({
  component: RouteComponent,
})


function RouteComponent() {
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);


  const { data: todos, isLoading, isError, refetch } = useQuery({
		queryKey: ['list-todo'],
		queryFn: todoService.listTasks,
	});

  const handleToggle = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      return next;
    });
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await todoService.createTask({ title, description });
      setTitle('');
      setDescription('');
      setOpen(false);
      refetch();
      toast.success('Todo added successfully');
    } catch (err) {
      toast.error('Failed to add todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleToggle} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <h1 className="text-2xl font-bold ml-2">Todo List</h1>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Todo</span>
        </Button>
      </div>
      <TodoList todos={todos} isLoading={isLoading} isError={isError} refetch={refetch} />
      <TodoDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        loading={loading}
        onSubmit={handleAddTodo}
        dialogTitle="Add a new Todo"
        submitLabel="Add Todo"
      />
    </div>
  );
}
