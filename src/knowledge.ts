import type { KnowledgeGraph, KnowledgeNode, ObjectId } from "./types";

export const knowledge : KnowledgeGraph = [
    {id: "axiom-1", data: "a implies b iff b is true whenever a is true", neighbours: []},
    {id: "axiom-2", data: "p and not q", neighbours: []},
    
    {id: "lemma-1", data: "(not y and x) implies not(x implies y)", neighbours: [], parents: ["axiom-1"]},
    {id: "corollary-1", data: "p and not q = not q and p", neighbours: [], parents: ["axiom-2"]},
    {id: "theorem-1", data: "not (p implies q)", neighbours: [], parents: ["corollary-1", "lemma-1"]},

]