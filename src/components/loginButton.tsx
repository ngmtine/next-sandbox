import { FaTwitter } from "react-icons/fa";
import { loginAction } from "~/lib/server/loginAction";

export const LoginButton = () => (
    <form action={loginAction}>
        <button //
            type="submit"
            className="btn btn-primary cursor-pointer"
        >
            <FaTwitter size={20} />
            <span>ログイン</span>
        </button>
    </form>
);
