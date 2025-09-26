import './style.css'
import { HIGHLIGHT_COLOUR, type KnowledgeGraph } from './types'
import {knowledge} from './knowledge'
import { fromEvent, map, merge } from 'rxjs'

// HTML elements
const knowledgeContainer = document.getElementById("knowledge")!
const helpDesc = document.getElementById("helpDesc")!

// Helper functions
const createParagaph : (t : string, id: string) => HTMLParagraphElement = (txt : string, id: string) => {
  const newParagraph = document.createElement("p")
  newParagraph.id = id
  newParagraph.textContent = txt
  return newParagraph
}

const convertKnowledgeToHTMLParagraphs : (k : KnowledgeGraph) => HTMLParagraphElement[] = (k : KnowledgeGraph) => {
  return k.map((knowledgeNode) => createParagaph(knowledgeNode.data, knowledgeNode.id))
}

const setBackgroundColours : (k : KnowledgeGraph, is : string[]) => void = (k : KnowledgeGraph, ids: string[]) => {
  k.map((kNode) => {
    const kElem = document.getElementById(kNode.id)!
    kElem.style.backgroundColor = "#fff"
  })
  ids.map((id) => {
    const e = document.getElementById(id)!
    e.style.backgroundColor = HIGHLIGHT_COLOUR
  })
}

// Main code
helpDesc.style.visibility = "hidden"

// Display knowledge in linear format
const kParas = convertKnowledgeToHTMLParagraphs(knowledge)
kParas.map((p) => knowledgeContainer?.appendChild(p))

// Create a stream for every time the user clicks on a piece of knowlege, mapping it to:
//                                                                        an object of the unsure knowledge + its parents
const kClick$ = merge(
  ...knowledge.map(k => 
    fromEvent(document.getElementById(k.id)!, 'click').pipe(
      map(() => ({child: k.id, parents: k.parents}))
    )
  )
);

// Update view, update description and highlight prerequisite knowledge if applicable
kClick$.subscribe((ids) => {

  // Prerequisite knowledge exists
  if(ids.parents) {
    setBackgroundColours(knowledge, ids.parents)
    helpDesc.style.visibility = "visible"
    helpDesc.innerHTML = `Unsure about <strong> ${ids.child}</strong>? <br> Have a look at its highlighted prerequisites: <strong>${ids.parents}</strong>`
  
  // Prerequisite knowledge doesn't exist
  } else {
    setBackgroundColours(knowledge, [])
    helpDesc.style.visibility = "visible"
    helpDesc.innerHTML = `Hmm. You clicked <strong>${ids.child}</strong>. <br> Unfortunately, this is a self-evident, bedrock axiom: I cannot highlight any prerequisite knowledge :(`
  }
})




