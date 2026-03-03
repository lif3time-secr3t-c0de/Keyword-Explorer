import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const DEFAULT_USER_EMAIL = "guest@keywordtool.pro"

export async function GET() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: DEFAULT_USER_EMAIL }
        })

        if (!user) {
            return NextResponse.json([])
        }

        const history = await prisma.searchHistory.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 20
        })

        return NextResponse.json(history)
    } catch (error) {
        console.error("[HISTORY_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
