export const Input = ({
    name,
    placeholder,
    defaultValue
}: {
    name: string,
    placeholder: string,
    defaultValue: string
}) => {
    return (
        <input
            className="mb-2 py-2 border border-secondary rounded indent-2 last:mb-0"
            type="text"
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required
        />
    );
};
