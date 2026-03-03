import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const DEFAULT_USER_EMAIL = "guest@keywordtool.pro"

async function getOrCreateDefaultUser() {
    let user = await prisma.user.findUnique({
        where: { email: DEFAULT_USER_EMAIL }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: DEFAULT_USER_EMAIL,
                name: "Guest User",
            }
        })
    }

    return user
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, keywords } = body

        if (!name || !keywords || !Array.isArray(keywords)) {
            return new NextResponse("Invalid data", { status: 400 })
        }

        const user = await getOrCreateDefaultUser()

        const list = await prisma.keywordList.create({
            data: {
                name,
                userId: user.id,
                keywords: {
                    create: keywords.map((k: { keyword: string; searchVolume: number; competition: string; cpc: number; difficulty: number; type: string }) => ({
                        keyword: k.keyword,
                        searchVolume: k.searchVolume,
                        competition: k.competition === 'LOW' ? 0.33 : k.competition === 'MEDIUM' ? 0.66 : 0.99,
                        cpc: k.cpc,
                        difficulty: k.difficulty,
                        type: k.type as 'STANDARD' | 'QUESTION' | 'PREPOSITION' | 'COMPARISON'
                    }))
                }
            },
            include: {
                keywords: true
            }
        })

        return NextResponse.json(list)
    } catch (error) {
        console.error("[LISTS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const user = await getOrCreateDefaultUser()

        const lists = await prisma.keywordList.findMany({
            where: {
                userId: user.id
            },
            include: {
                keywords: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(lists)
    } catch (error) {
        console.error("[LISTS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getOrCreateDefaultUser()
        const url = new URL(request.url)
        const id = url.searchParams.get("id")

        if (!id) {
            return new NextResponse("Missing list id", { status: 400 })
        }

        const existing = await prisma.keywordList.findFirst({
            where: {
                id,
                userId: user.id
            }
        })

        if (!existing) {
            return new NextResponse("List not found", { status: 404 })
        }

        await prisma.keywordList.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[LISTS_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
