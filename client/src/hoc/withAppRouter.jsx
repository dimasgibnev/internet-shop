
import {BrowserRouter} from "react-router-dom";

export const withAppRouter =
    (Component) =>
        ({ ...props }) => {
            return (
                <BrowserRouter >
                    <Component {...props} />
                </BrowserRouter>
            )
        }
