import { auth } from "~/auth";
import { logoutAction } from "~/lib/server/logoutAction";

export const LogoutButton = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <form action={logoutAction}>
            {user?.image && (
                <img //
                    src={user.image}
                    alt={user.name ?? ""}
                    className="w-8 h-8 rounded-full"
                />
            )}
            {user?.name}
            <button //
                type="submit"
                className="btn btn-secondary cursor-pointer"
            >
                <span>ログアウト</span>
            </button>
        </form>
    );
};
