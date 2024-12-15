export const LocalImage = ({ id }: { id: string }) => {
    return (
        <div
            style={{
                background: `url(/api/image?id=${id}) no-repeat center/100% 100%`
            }}
            className="w-48 h-72"
        />
    );
};
