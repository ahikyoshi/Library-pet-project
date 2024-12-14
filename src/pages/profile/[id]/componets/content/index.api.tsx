// types
import { IViewUser } from "../../index.page";

export const Content = ({ user }: { user: IViewUser }) => {
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
            </p>
        </div>
    );
};
