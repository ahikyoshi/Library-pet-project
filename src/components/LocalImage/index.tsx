// libs
import Image from "next/image";

export const LocalImage = ({ id }: { id: string }) => {
    return (
        <Image
            src={`/api/image?id=${id}`}
            width={192}
            height={288}
            className="w-48 h-72"
            alt={id}
        />
    );
};
