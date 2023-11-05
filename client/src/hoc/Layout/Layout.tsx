import { ReactNode } from "react";
import Header from "../../components/Header/Header";

interface LayoutProps {
    children: ReactNode
}

export default function Layout(props: LayoutProps) {
    return (
        <>
            <Header></Header>
            {props.children}
        </>
    )
}
