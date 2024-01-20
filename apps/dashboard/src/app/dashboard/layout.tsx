import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Navbar from "../../components/navbar";
import { ApolloWrapper } from "../../lib/apollo-wrapper";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): Promise<JSX.Element> {
    const session = await getServerSession();
    if (!session?.user) {
        redirect("/");
    }
    return (
        <ApolloWrapper>
            <Navbar />
            <>{children}</>
        </ApolloWrapper>
    )
}