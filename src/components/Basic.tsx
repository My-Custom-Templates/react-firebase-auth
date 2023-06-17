const Label = ({ children }: { children: React.ReactNode }) => (
	<div className="pb-1">{children}</div>
);

const Input = ({
	...attributes
}: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input {...attributes} className="px-3 py-2 rounded-md" />
);

const Button = ({ children, ...attributes }: {children: React.ReactNode}) => (
	<button className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white" {...attributes}>{children}</button>
);

export { Input, Label, Button };
