import { Svg } from "@/components/Svg";
import { IUser } from "@/globalTypes";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export const UserInfo = ({
    user,
    setUser
}: {
    user: IUser,
    setUser: Dispatch<SetStateAction<IUser | null>>
}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleChangeNickName = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const display_name = String(formData.get("display_name"));

        fetch("/api/user/change", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ display_name: display_name })
        })
            .then((res) => res.json())
            .then(
                ({
                    success,
                    message,
                    user
                }: {
                    success: boolean,
                    message: string,
                    user: IUser
                }) => {
                    if (success) {
                        setIsEditOpen(false);
                        setUser(user);
                    } else {
                        setIsEditOpen(false);
                        console.log(message);
                    }
                }
            )
            .catch((error) => console.log(error));
    };
    return (
        <div className="w-full py-4 flex flex-col items-center">
            <div
                className="w-24 h-24 rounded-full border-2 border-primary"
                style={{
                    background: `center/cover no-repeat  url(${user.avatar})`
                }}
            />
            <p className="mt-2 text-xl font-bold flex items-center">
                <div>@</div>
                <span className="mr-2">{user.display_name}</span>
                <div onClick={() => setIsEditOpen(true)}>
                    <Svg src="/assets/icons/admin/theme/edit.svg" size={17} />
                </div>
            </p>
            {isEditOpen && (
                <div className="bg-black/80 w-screen h-screen fixed top-0 flex items-center justify-center">
                    <form
                        onSubmit={handleChangeNickName}
                        className="p-2 bg-background rounded flex flex-col items-center"
                    >
                        <h1 className="font-bold text-xl">
                            Изменение имени пользователя
                        </h1>
                        <input
                            type="text"
                            className="w-full my-2 py-1 indent-2 border border-border rounded bg-background"
                            placeholder={user.display_name}
                            name="display_name"
                            required
                        />
                        <div className="w-full flex">
                            <button
                                type="submit"
                                className="w-full px-2 py-1 bg-primary font-bold rounded"
                            >
                                Сохранить
                            </button>
                            <button
                                type="button"
                                className="ml-4 text-text-secondary"
                                onClick={() => setIsEditOpen(false)}
                            >
                                отменить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
