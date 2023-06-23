const Label = ({ children }: { children: React.ReactNode }) => (
	<div className="pb-1 text-blue-400 font-semibold">{children}</div>
);

const Input = ({
	...attributes
}: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input {...attributes} className="px-3 py-2 rounded-md outline-none w-full" />
);

// prettier-ignore
const Button = ({ children, onClick, disabled = false, ...attributes }: {children: React.ReactNode, onClick: () => void, disabled?: boolean}) => (
	<button className="bg-blue-400 py-2 px-2 rounded-md mt-2 text-white w-full" onClick={onClick} disabled={disabled} {...attributes}>{children}</button>
);

export { Input, Label, Button };
