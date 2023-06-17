const Label = ({ children }: { children: React.ReactNode }) => (
	<div className="pb-1">{children}</div>
);

const Input = ({
	...attributes
}: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input {...attributes} className="px-3 py-2 rounded-md" />
);

// prettier-ignore
const Button = ({ children, onClick, ...attributes }: {children: React.ReactNode, onClick: () => void}) => (
	<button className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white" onClick={onClick} {...attributes}>{children}</button>
);

export { Input, Label, Button };
