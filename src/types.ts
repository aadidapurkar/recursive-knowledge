export const HIGHLIGHT_COLOUR = "#fcba03"

export type ObjectId = string

export type KnowledgeNode = {
    id: ObjectId,
    data: string,
    neighbours: KnowledgeNode[],
    parents? : ObjectId[]
}
export type KnowledgeGraph = KnowledgeNode[]
