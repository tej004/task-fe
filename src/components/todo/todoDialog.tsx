
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TodoDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	setTitle: (val: string) => void;
	setDescription: (val: string) => void;
	loading: boolean;
	onSubmit: (e: React.FormEvent) => void;
	dialogTitle?: string;
	submitLabel?: string;
}

export const TodoDialog: React.FC<TodoDialogProps> = ({
	open,
	onOpenChange,
	title,
	description,
	setTitle,
	setDescription,
	loading,
	onSubmit,
	dialogTitle = 'Add a new Todo',
	submitLabel = 'Add Todo',
}) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{dialogTitle}</DialogTitle>
			</DialogHeader>
			<form onSubmit={onSubmit} className="space-y-4">
				<div className='space-y-2'>
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
						placeholder="Enter todo title"
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor="description">Description</Label>
						<textarea
							id="description"
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
							placeholder="Enter todo description"
							rows={4}
							className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
				</div>
				<DialogFooter>
					<Button type="submit" disabled={loading} className='cursor-pointer'>
						{loading ? 'Saving...' : submitLabel}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
);
