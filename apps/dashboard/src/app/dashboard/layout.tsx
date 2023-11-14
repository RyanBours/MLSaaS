import Navbar from "../../components/navbar"
import { ApolloWrapper } from "../../lib/apollo-wrapper"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ApolloWrapper>
                <Navbar />
                <>{children}</>
            </ApolloWrapper>
        </>
    )
}